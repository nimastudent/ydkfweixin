(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/auth/login"],{"02b8":function(n,e,t){"use strict";var o;t.d(e,"b",(function(){return c})),t.d(e,"c",(function(){return a})),t.d(e,"a",(function(){return o}));var c=function(){var n=this,e=n.$createElement;n._self._c},a=[]},"19d4":function(n,e,t){"use strict";var o=t("20a8"),c=t.n(o);c.a},"20a8":function(n,e,t){},8583:function(n,e,t){"use strict";(function(n){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=t("7bb8"),c={data:function(){return{code:"",nickName:"",avatarUrl:""}},onLoad:function(){this.normalLogin()},methods:{submit:function(){var e=this;n.login({provider:"weixin",timeout:3e3,onlyAuthorize:!0,success:function(t){n.setStorage({key:"weixinCode",value:t.code}),console.log(t),e.code=t.code,n.getUserInfo({provider:"weixin",success:function(n){console.log(n),console.log("用户昵称为："+n.code)}})},fail:function(n){console.log(n)}})},getUserInfo:function(){var e=this;n.getUserProfile({lang:"zh_CN",desc:"获取用户信息",success:function(n){console.log(n),e.nickName=n.userInfo.nickName,e.avatarUrl=n.userInfo.avatarUrl},fail:function(n){console.log(n)}})},getphone:function(){n.getphonenumber},onGetPhoneNumber:function(n){console.log(n)},routeChange:function(){n.switchTab({url:"/pages/state/state"})},postData:function(){var e={code:this.code,nickName:this.nickName,avatarUrl:this.avatarUrl};console.log(e),(0,o.postUserCode)(e).then((function(e){e.success&&n.setStorage({key:"token",value:e.body.token,success:function(){console.log("token存储成功")}})}))},normalLogin:function(){var e={telephone:"101",password:"123456"};(0,o.login)(e).then((function(e){n.setStorageSync("token",e["JSESSIONID"]),n.switchTab({url:"/pages/state/state"})}))}}};e.default=c}).call(this,t("543d")["default"])},"9e3c":function(n,e,t){"use strict";t.r(e);var o=t("02b8"),c=t("cf87");for(var a in c)"default"!==a&&function(n){t.d(e,n,(function(){return c[n]}))}(a);t("19d4");var u,i=t("f0c5"),r=Object(i["a"])(c["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],u);e["default"]=r.exports},ad06:function(n,e,t){"use strict";(function(n){t("03fe");o(t("66fd"));var e=o(t("9e3c"));function o(n){return n&&n.__esModule?n:{default:n}}wx.__webpack_require_UNI_MP_PLUGIN__=t,n(e.default)}).call(this,t("543d")["createPage"])},cf87:function(n,e,t){"use strict";t.r(e);var o=t("8583"),c=t.n(o);for(var a in o)"default"!==a&&function(n){t.d(e,n,(function(){return o[n]}))}(a);e["default"]=c.a}},[["ad06","common/runtime","common/vendor"]]]);