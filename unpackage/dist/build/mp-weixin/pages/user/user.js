(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/user/user"],{"1d69":function(n,t,e){"use strict";e.r(t);var o=e("56f1"),u=e.n(o);for(var a in o)"default"!==a&&function(n){e.d(t,n,(function(){return o[n]}))}(a);t["default"]=u.a},2016:function(n,t,e){},"55d1":function(n,t,e){"use strict";var o=e("2016"),u=e.n(o);u.a},"56f1":function(n,t,e){"use strict";(function(n){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=e("7bb8"),u={data:function(){return{login:!1,avatarUrl:"../../static/logo.png",uerInfo:{}}},onLoad:function(){this.getInfo()},methods:{goLogin:function(){this.login||console.log("点击前往登录")},getInfo:function(){var n=this;(0,o.getUserInfo)().then((function(t){console.log(t),t&&(n.uerInfo=t)}))},goChat:function(){n.navigateTo({url:"/pages/user/chat/chat"})}}};t.default=u}).call(this,e("543d")["default"])},bad3:function(n,t,e){"use strict";var o;e.d(t,"b",(function(){return u})),e.d(t,"c",(function(){return a})),e.d(t,"a",(function(){return o}));var u=function(){var n=this,t=n.$createElement;n._self._c},a=[]},bfb8:function(n,t,e){"use strict";e.r(t);var o=e("bad3"),u=e("1d69");for(var a in u)"default"!==a&&function(n){e.d(t,n,(function(){return u[n]}))}(a);e("55d1");var r,f=e("f0c5"),c=Object(f["a"])(u["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],r);t["default"]=c.exports},f975:function(n,t,e){"use strict";(function(n){e("03fe");o(e("66fd"));var t=o(e("bfb8"));function o(n){return n&&n.__esModule?n:{default:n}}wx.__webpack_require_UNI_MP_PLUGIN__=e,n(t.default)}).call(this,e("543d")["createPage"])}},[["f975","common/runtime","common/vendor"]]]);