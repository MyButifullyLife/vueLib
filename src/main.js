import 'babel-polyfill';
import Vue from 'vue'
import FastClick from 'fastclick'
import router from './route/index.js';
import store from './store'
import App from './App.vue';
import {
	toast,
	hideToast
} from './components/toast/toast.js';
import { hasClass, addClass, removeClass } from './js/utils';
import { eventBus } from './js/eventBus'
// import vConsole from 'vconsole';
// let consoleTest = new vConsole();
// 或者umd方式
// 引入构建的js文件
Vue.prototype.$toast = function(text, time) {
	toast(text, time)
};
Vue.prototype.$hideToast = function() {
	hideToast()
};
// 全局eventBUs
Vue.prototype.$eventBus = eventBus;
// 引入路由

FastClick.attach(document.body);

// 注册一个全局改变背景颜色
Vue.directive('touchBg', {
	inserted: function(el) {
		el.addEventListener('touchstart', (e) => {
			addClass(el, 'actived-bg');
		});
		el.addEventListener('touchend', (e) => {
			removeClass(el, 'actived-bg');
		});
	}
});
 new Vue({
   router,
	 store,
	 render: h => h(App)
}).$mount('#app');
