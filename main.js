import App from './App'
import uView from '@/uni_modules/uview-ui'
import {getUserIsLogin} from '@/api/auth.js'

// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false

// uni.$u.setIsUpdate = function(key,value){
// 	if(key == 'isUpdate'){
// 		 var newStorageEvent = document.createEvent('StorageEvent');
// 		  const storage = {
// 		       setItem: function (k, val) {
// 		         uni.setStorageSync(k,val);
// 		         // 初始化创建的事件
// 		         newStorageEvent.initStorageEvent('setItem', false, false, k, null, val, null, null);
// 		         // 派发对象
// 		         window.dispatchEvent(newStorageEvent)
// 		       }
		
// 	}
// 	return storage.setItem(key, value);
// 	}
// }

App.mpType = 'app'
Vue.use(uView)
const app = new Vue({
    ...App
})
require('./utils/request.js')(app)
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif