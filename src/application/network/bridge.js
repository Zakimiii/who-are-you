// @0.2.x
import { ApiError } from '@extension/Error';
import reward_config from '@constants/reward_config';
import * as Extend from '@extension';
import { Decimal } from 'decimal.js';
import models from '@models';
import data_config from '@constants/data_config';
import blockchain_config from '@constants/blockchain_config';
import bridge_config from '@constants/bridge_config';
import Contracter from '@network/web3';
import { logger } from '@extension/log';

export var keythereum = require('keythereum');
export const Tx = require('ethereumjs-tx');
const env = require('@env/env.json');

export const Web3 = require('web3');

const rpc_url = `https://${
    process.env.NODE_ENV == 'development' ? 'ropsten' : 'mainnet'
}.infura.io/v3/${env.INFURA_API_KEY}`;

export const web3 = new Web3(new Web3.providers.HttpProvider(rpc_url));

web3.eth.defaultAccount = env.MAINNET.OWNER;

export const BigNumber = require('bignumber.js');

export const abi = require('@network/abi.json');

export let tokenContract = web3.eth
    .contract(abi)
    .at(env.MAINNET.CONTRACT_ADDRESS);

export const decimals = new BigNumber(env.MAINNET.CONTRACT_DECIMALS);

export const abiDecoder = require('abi-decoder');
abiDecoder.addABI(abi);

export const Wallet = require('ethereumjs-wallet');

const contracter = new Contracter();

export default class Bridge {
    static toInteger = uint => {
        uint = typeof uint.toNumber == 'function' ? uint.toNumber() : uint;
        return uint / 10 ** decimals;
        // return typeof result.toNumber == 'function' ? result.toNumber() : result;
    };

    static toEth = integer => {
        integer =
            typeof integer.toNumber == 'function'
                ? integer.toNumber()
                : integer;
        return web3.toWei(`${web3.toBigNumber(integer)}`, 'ether');
    };

    //FIXME: Dynamical change gas
    static gasTokenPrice = bridge_config.gasTokenPrice;

    static getGasPrice(size) {
        switch (size) {
            case 'S':
                return Bridge.toEth(5);
            case 'M':
                return Bridge.toEth(50);
            case 'L':
                return Bridge.toEth(100);
        }
    }

    rawTransaction({ from, data /*gasPrice = Bridge.getGasPrice('L')*/ }) {
        return {
            to: env.MAINNET.CONTRACT_ADDRESS,
            nonce: web3.toHex(
                web3.eth.getTransactionCount(web3.eth.defaultAccount, 'pending')
            ),
            gasPrice: web3.toHex(80 /*gasPrice*/),
            gasLimit: web3.toHex(
                process.env.NODE_ENV == 'development' ? 4700000 : 8000000
            ),
            from,
            value: web3.toHex(0),
            data,
            chainId: web3.toHex(
                process.env.NODE_ENV == 'development' ? 0x03 : 0x01
            ),
        };
    }

    sign(rT, privateKey) {
        const privKey = new Buffer(privateKey, 'hex'),
            tx = new Tx(rT);
        tx.sign(privKey);
        const serializedTx = tx.serialize();
        return '0x' + serializedTx.toString('hex');
    }

    async sendRawTransaction(transaction) {
        return new Promise((resolve, reject) => {
            web3.eth.sendRawTransaction(transaction, (error, result) => {
                if (error) {
                    if (
                        error.message.includes('known transaction:') ||
                        error.message.includes(
                            'replacement transaction underpriced'
                        ) ||
                        error.message.includes('nonce too low')
                    ) {
                        reject(
                            new ApiError({
                                error: error,
                                tt_key: 'errors.wait_while',
                            })
                        );
                    } else {
                        reject(
                            new ApiError({
                                error: error,
                                tt_key: 'errors.invalid_response_from_server',
                            })
                        );
                    }
                    return;
                }
                resolve(result);
            });
        });
    }

    async getTokenBalanceOf(walletAddress) {
        return new Promise((resolve, reject) => {
            tokenContract.balanceOf(walletAddress, (error, balance) => {
                if (error) {
                    reject(
                        new ApiError({
                            error: error,
                            tt_key: 'errors.invalid_response_from_server',
                        })
                    );
                    return;
                }
                resolve(Bridge.toInteger(balance));
            });
        });
    }

    async transferToken(toAddress, amount) {
        return await this.sendRawTransaction(
            this.sign(
                this.rawTransaction({
                    from: env.MAINNET.OWNER,
                    data: tokenContract.transfer.getData(
                        toAddress,
                        Contracter.toEth(amount)
                    ),
                }),
                env.MAINNET.OWNER_PRIVATE_KEY
            )
        );

        // MEMO: Can use without connecting INFRA
        // return new Promise((resolve, reject) => {
        //     tokenContract.transfer(
        //         toAddress,
        //         Contracter.toEth(amount),
        //         (error, result) => {
        //             error &&
        //                 reject(
        //                     new ApiError({
        //                         error: error,
        //                         tt_key: 'errors.invalid_response_from_server',
        //                     })
        //                 );
        //             resolve(result);
        //         }
        //     )
        // });
    }

    async totalSupply() {
        return new Promise((resolve, reject) => {
            tokenContract.totalSupply((error, result) => {
                error &&
                    reject(
                        new ApiError({
                            error: error,
                            tt_key: 'errors.invalid_response_from_server',
                        })
                    );
                logger('Mainnet Total Balance', Contracter.toInteger(result));
                resolve(Contracter.toInteger(result));
            });
        });
    }

    async run({ user, walletAddress, amount }) {
        amount = amount instanceof Decimal ? amount : new Decimal(amount);
        if (!walletAddress) return false;
        if (
            amount.lessThan(new Decimal(bridge_config.min_send_token)) ||
            amount.greaterThan(new Decimal(bridge_config.max_send_token))
        ) {
            return false;
        }

        const quantity = amount.minus(Bridge.gasTokenPrice);

        const txnHashMain = await this.transferToken(
            walletAddress,
            quantity
        ).catch(e => {
            throw new ApiError({
                error: e,
                tt_key: 'errors.is_not_correct',
                tt_params: { data: 'user' },
            });
        });

        const txnHashPrivate = await contracter
            .burnFrom(user.eth_address, quantity)
            .catch(e => {
                throw new ApiError({
                    error: e,
                    tt_key: 'errors.is_not_correct',
                    tt_params: { data: 'user' },
                });
            });

        const result = await models.Bridge.create({
            user_id: user.id,
            amount: amount.toFixed(data_config.min_decimal_range),
            country_code: user.country_code,
            gasTokenPrice: Bridge.gasTokenPrice.toFixed(
                data_config.min_decimal_range
            ),
            txnHashPrivate,
            txnHashMain,
            isSuccess: false,
            isPending: true,
        }).catch(e => {
            throw new ApiError({
                error: e,
                tt_key: 'errors.invalid_response_from_server',
            });
        });
    }

    async revart(bridge) {
        if (!bridge) return false;
    }
}

new Bridge().totalSupply();
