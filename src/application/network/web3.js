// @0.2.x
import { ApiError } from '@extension/Error';
import reward_config from '@constants/reward_config';
import * as Extend from '@extension';
import { Decimal } from 'decimal.js';
import models from '@models';
import data_config from '@constants/data_config';
import blockchain_config from '@constants/blockchain_config';
import { logger } from '@extension/log';

export var keythereum = require('keythereum');
export const Tx = require('ethereumjs-tx');
const env = require('@env/env.json');

export const Web3 = require('web3');

const rpc_url =
    blockchain_config.current_mode == blockchain_config.mode.INFRA
        ? `https://${
              process.env.NODE_ENV == 'development' ? 'ropsten' : 'ropsten' //'mainnet'
          }.infura.io/v3/${env.INFURA_API_KEY}`
        : env.PRIVATE_CHAIN.URL;

export const web3 = new Web3(new Web3.providers.HttpProvider(rpc_url));

web3.eth.defaultAccount = env.SELFTOKEN.OWNER;

export const BigNumber = require('bignumber.js');

export const abi = require('@network/abi.json');

export let tokenContract = web3.eth
    .contract(abi)
    .at(env.SELFTOKEN.CONTRACT_ADDRESS);

export const decimals = new BigNumber(env.SELFTOKEN.CONTRACT_DECIMALS);

export const abiDecoder = require('abi-decoder');
abiDecoder.addABI(abi);

export const Wallet = require('ethereumjs-wallet');

export default class Contracter {
    static toInteger = uint => {
        if (!uint) return 0;
        uint = typeof uint.toNumber == 'function' ? uint.toNumber() : uint;
        return uint / 10 ** decimals;
        // return typeof result.toNumber == 'function' ? result.toNumber() : result;
    };

    static toEth = integer => {
        if (!integer) return 0;
        integer =
            typeof integer.toNumber == 'function'
                ? integer.toNumber()
                : integer;
        return web3.toWei(`${web3.toBigNumber(integer)}`, 'ether');
    };

    static isAddress = address => web3.isAddress(address);

    rawTransaction({ from, data }) {
        return {
            to: env.SELFTOKEN.CONTRACT_ADDRESS,
            nonce: web3.toHex(
                web3.eth.getTransactionCount(env.SELFTOKEN.OWNER, 'pending')
            ),
            gasPrice: web3.toHex(80),
            gasLimit: web3.toHex(4700000),
            from,
            value: web3.toHex(0),
            data,
            chainId: web3.toHex(env.SELFTOKEN.NETWORK_ID),
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
                resolve(Contracter.toInteger(balance));
            });
        });
    }

    async supplyableBalance() {
        const base = await this.getTokenBalanceOf(env.SELFTOKEN.OWNER).catch(
            e => {
                throw e;
            }
        );

        logger('Sppulyable Balance', base);

        return new Decimal(base).times(
            new Decimal(reward_config.interest_rate)
        );
    }

    //MEMO: this method's lange is in this year.
    async supplyableBalancePerDay() {
        let leftDays = new Date().getLeftDays();
        const base = await this.supplyableBalance().catch(e => {
            throw e;
        });
        return base.dividedBy(new Decimal(leftDays++));
    }

    async supplyableBalanceInDays(interval) {
        const base = await this.supplyableBalancePerDay().catch(e => {
            throw e;
        });
        const total = await this.supplyableBalance().catch(e => {
            throw e;
        });
        const result = base.times(new Decimal(interval));
        return total.greaterThan(result) ? result : total;
    }

    async reward({
        user,
        account,
        score,
        pure_score,
        totalScore,
        totalPureScore,
        interval,
    }) {
        user = await models.User.findOne({
            where: {
                id: Number(user.id),
                username: user.username,
            },
        }).catch(e => {
            throw new ApiError({
                error: e,
                tt_key: 'errors.is_not_correct',
                tt_params: { data: 'user' },
            });
        });

        if (!user)
            throw new ApiError({
                error: new Error('user is not correct format'),
                tt_key: 'errors.is_not_correct',
                tt_params: { data: 'user' },
            });
        // interval > 0 && total > per score
        const base = await this.supplyableBalanceInDays(interval).catch(e => {
            throw e;
        });

        const score_rate = new Decimal(score).dividedBy(
                new Decimal(totalScore)
            ),
            pure_score_rate = new Decimal(pure_score).dividedBy(
                new Decimal(totalPureScore)
            ),
            amount = base
                .times(reward_config.pure_mode ? pure_score_rate : score_rate)
                .toNumber();

        if (amount < 0) return;

        const txnHash = await this.transferToken(
            user.eth_address,
            amount
        ).catch(e => {
            throw new ApiError({
                error: e,
                tt_key: 'errors.is_not_correct',
                tt_params: { data: 'user' },
            });
        });

        const token_balance = await this.getTokenBalanceOf(
            user.eth_address
        ).catch(e => {
            throw new ApiError({
                error: e,
                tt_key: 'errors.is_not_correct',
                tt_params: { data: 'user' },
            });
        });

        return await Promise.all([
            models.Reward.create({
                user_id: user.id,
                amount: amount.toFixed(data_config.min_decimal_range),
                totalScore: totalScore.toFixed(data_config.min_decimal_range),
                totalPureScore: totalPureScore.toFixed(
                    data_config.min_decimal_range
                ),
                score: score.toFixed(data_config.min_decimal_range),
                pure_score: pure_score.toFixed(data_config.min_decimal_range),
                score_rate: score_rate.toFixed(data_config.min_decimal_range),
                pure_score_rate: pure_score_rate.toFixed(
                    data_config.min_decimal_range
                ),
                interval: interval.toFixed(data_config.min_decimal_range),
                intervalSupply: base.toFixed(data_config.min_decimal_range),
                country_code: user.country_code,
                txnHash,
                isSuccess: false,
                isPending: true,
            }),
            user.update({
                score: new Decimal(user.score)
                    .plus(amount)
                    .toFixed(data_config.min_decimal_range),
                pure_score: new Decimal(user.pure_score)
                    .plus(amount)
                    .toFixed(data_config.min_decimal_range),
                token_balance: new Decimal(token_balance).toFixed(
                    data_config.min_decimal_range
                ),
            }),
        ]).catch(e => {
            throw new ApiError({
                error: e,
                tt_key: 'errors.invalid_response_from_server',
            });
        });
    }

    async bid({ request }) {
        request = await models.Request.findOne({
            where: {
                id: request.id,
            },
        });

        const voter = await models.User.findOne({
            where: {
                id: Number(request.VoterId),
            },
        }).catch(e => {
            throw new ApiError({
                error: e,
                tt_key: 'errors.is_not_correct',
                tt_params: { data: 'user' },
            });
        });

        const votered = await models.User.findOne({
            where: {
                id: Number(request.VoteredId),
            },
        }).catch(e => {
            throw new ApiError({
                error: e,
                tt_key: 'errors.is_not_correct',
                tt_params: { data: 'user' },
            });
        });

        if (bid_amount < 0) return;

        const bid_amount = new Decimal(request.bid_amount);

        const txnHashBid = await this.sendToken(
            env.SELFTOKEN.OWNER,
            voter.eth_address,
            bid_amount
        ).catch(e => {
            throw new ApiError({
                error: e,
                tt_key: 'errors.is_not_correct',
                tt_params: { data: 'user' },
            });
        });

        const token_balance = await this.getTokenBalanceOf(
            voter.eth_address
        ).catch(e => {
            throw new ApiError({
                error: e,
                tt_key: 'errors.is_not_correct',
                tt_params: { data: 'user' },
            });
        });

        await Promise.all([
            models.BidTransaction.create({
                request_id: request.id,
                fromAddress: voter.eth_address,
                toAddress: votered.eth_address,
                amount: bid_amount.toFixed(data_config.min_decimal_range),
                country_code: voter.country_code,
                txnHashBid,
                isSuccess: false,
                isPending: true,
            }),
            voter.update({
                token_balance: new Decimal(token_balance).toFixed(
                    data_config.min_decimal_range
                ),
            }),
            request.update({
                hasPendingSuccessfulBid: true,
            }),
        ]).catch(e => {
            throw new ApiError({
                error: e,
                tt_key: 'errors.invalid_response_from_server',
            });
        });
    }

    async successBid({ request }) {
        request = await models.Request.findOne({
            where: {
                id: request.id,
            },
        });

        const bidTransaction = await models.BidTransaction.findOne({
            where: {
                request_id: request.id,
            },
        });

        const voter = await models.User.findOne({
            where: {
                id: Number(request.VoterId),
            },
        }).catch(e => {
            throw new ApiError({
                error: e,
                tt_key: 'errors.is_not_correct',
                tt_params: { data: 'user' },
            });
        });

        const votered = await models.User.findOne({
            where: {
                id: Number(request.VoteredId),
            },
        }).catch(e => {
            throw new ApiError({
                error: e,
                tt_key: 'errors.is_not_correct',
                tt_params: { data: 'user' },
            });
        });

        const bid_amount = new Decimal(request.bid_amount);

        const txnHashResult = await this.transferToken(
            votered.eth_address,
            bid_amount
        ).catch(e => {
            throw new ApiError({
                error: e,
                tt_key: 'errors.is_not_correct',
                tt_params: { data: 'user' },
            });
        });

        const token_balance = await this.getTokenBalanceOf(
            votered.eth_address
        ).catch(e => {
            throw new ApiError({
                error: e,
                tt_key: 'errors.is_not_correct',
                tt_params: { data: 'user' },
            });
        });

        await Promise.all([
            bidTransaction.update({
                txnHashResult,
            }),
            votered.update({
                token_balance: new Decimal(token_balance).toFixed(
                    data_config.min_decimal_range
                ),
            }),
            request.update({
                hasPendingSuccessfulBid: false,
            }),
        ]).catch(e => {
            throw new ApiError({
                error: e,
                tt_key: 'errors.invalid_response_from_server',
            });
        });
    }

    async denyBid({ request }) {
        request = await models.Request.findOne({
            where: {
                id: request.id,
            },
        });

        const bidTransaction = await models.BidTransaction.findOne({
            where: {
                request_id: request.id,
            },
        });

        const voter = await models.User.findOne({
            where: {
                id: Number(request.VoterId),
            },
        }).catch(e => {
            throw new ApiError({
                error: e,
                tt_key: 'errors.is_not_correct',
                tt_params: { data: 'user' },
            });
        });

        const votered = await models.User.findOne({
            where: {
                id: Number(request.VoteredId),
            },
        }).catch(e => {
            throw new ApiError({
                error: e,
                tt_key: 'errors.is_not_correct',
                tt_params: { data: 'user' },
            });
        });

        const bid_amount = new Decimal(request.bid_amount);

        const txnHashResult = await this.transferToken(
            voter.eth_address,
            bid_amount
        ).catch(e => {
            throw new ApiError({
                error: e,
                tt_key: 'errors.is_not_correct',
                tt_params: { data: 'user' },
            });
        });

        const token_balance = await this.getTokenBalanceOf(
            voter.eth_address
        ).catch(e => {
            throw new ApiError({
                error: e,
                tt_key: 'errors.is_not_correct',
                tt_params: { data: 'user' },
            });
        });

        await Promise.all([
            bidTransaction.update({
                txnHashResult,
            }),
            voter.update({
                token_balance: new Decimal(token_balance).toFixed(
                    data_config.min_decimal_range
                ),
            }),
            request.update({
                hasPendingSuccessfulBid: false,
            }),
        ]).catch(e => {
            throw new ApiError({
                error: e,
                tt_key: 'errors.invalid_response_from_server',
            });
        });
    }

    async getRewardAmount({
        score,
        pure_score,
        totalScore,
        totalPureScore,
        interval,
    }) {
        const base = await this.supplyableBalanceInDays(interval).catch(e => {
            throw e;
        });

        const score_rate = new Decimal(score).dividedBy(
                new Decimal(totalScore)
            ),
            pure_score_rate = new Decimal(pure_score).dividedBy(
                new Decimal(totalPureScore)
            ),
            amount = base
                .times(reward_config.pure_mode ? pure_score_rate : score_rate)
                .toNumber();

        return amount;
    }

    async sendToken(fromAddress, toAddress, amount) {
        return await this.sendRawTransaction(
            this.sign(
                this.rawTransaction({
                    from: env.SELFTOKEN.OWNER,
                    data: tokenContract.transferFrom.getData(
                        fromAddress,
                        toAddress,
                        Contracter.toEth(amount)
                    ),
                }),
                env.SELFTOKEN.OWNER_PRIVATE_KEY
            )
        );

        // MEMO: Can use without connecting INFRA
        // return new Promise((resolve, reject) => {
        //     tokenContract.transferFrom(
        //         fromAddress,
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
        //     );
        // });
    }

    async transferToken(toAddress, amount) {
        return await this.sendRawTransaction(
            this.sign(
                this.rawTransaction({
                    from: env.SELFTOKEN.OWNER,
                    data: tokenContract.transfer.getData(
                        toAddress,
                        Contracter.toEth(amount)
                    ),
                }),
                env.SELFTOKEN.OWNER_PRIVATE_KEY
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
                logger('Total Balance', Contracter.toInteger(result));
                resolve(Contracter.toInteger(result));
            });
        });
    }

    async mint(amount) {
        return new Promise((resolve, reject) => {
            tokenContract.mint(
                env.SELFTOKEN.OWNER,
                Contracter.toEth(amount),
                (error, result) => {
                    error &&
                        reject(
                            new ApiError({
                                error: error,
                                tt_key: 'errors.invalid_response_from_server',
                            })
                        );
                    resolve(result);
                }
            );
        });
    }

    async burn(amount) {
        return new Promise((resolve, reject) => {
            tokenContract.burn(
                env.SELFTOKEN.OWNER,
                Contracter.toEth(amount),
                (error, result) => {
                    error &&
                        reject(
                            new ApiError({
                                error: error,
                                tt_key: 'errors.invalid_response_from_server',
                            })
                        );
                    resolve(result);
                }
            );
        });
    }

    async burnFrom(amount, from) {
        return await this.sendRawTransaction(
            this.sign(
                this.rawTransaction({
                    from: env.SELFTOKEN.OWNER,
                    data: tokenContract.burn.getData(
                        from,
                        Contracter.toEth(amount)
                    ),
                }),
                env.SELFTOKEN.OWNER_PRIVATE_KEY
            )
        );
        // MEMO: Can use without connecting INFRA
        // return new Promise((resolve, reject) => {
        //     tokenContract.burn(
        //         from,
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
        //     );
        // });
    }
}
//MEMO: Initial Log
new Contracter().supplyableBalance();
new Contracter().totalSupply();

/*
 @1.0.x

export var keythereum = require('keythereum');
export const Tx = require('ethereumjs-tx');
const env = require('@env/env.json');

export const Web3 = require('web3');
export const web3 = new Web3(
    new Web3.providers.WebsocketProvider(
        `wss://ropsten.infura.io/ws/v3/${env.INFURA_API_KEY}`
    )
);

export const BigNumber = require('bignumber.js');
export const decimals = new BigNumber(18);
export const amount = new BigNumber(100);

export const contractAddress = env.RXTOKEN_CONTRACT_ADDRESS;

export const abi = [require('@network/abi.json')];

// @1.0.x
export const tokenContract = new web3.eth.Contract(abi, contractAddress);

export const abiDecoder = require('abi-decoder');
abiDecoder.addABI(abi);
*/
