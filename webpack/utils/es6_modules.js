const es6_modules = !!process.env.BUILD ? /node_modules\/(koa-passport)\/*/ : /Thisisasamplematch/

module.exports = es6_modules;
