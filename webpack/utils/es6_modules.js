const es6_modules = !!process.env.BUILD ? /node_modules\/(pg||pg-pool||pg-native||web3-eth-accounts||web3-utils||@sendgrid||abi-decoder)\/*/ : /Thisisasamplematch/

module.exports = es6_modules;
