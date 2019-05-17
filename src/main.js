import 'babel-polyfill';
import Vue from 'vue'
import FastClick from 'fastclick'
import router from './route/index.js';
import store from './store'
import App from './App.vue';
import baseVue from './pages/base/base.page.vue'
import {
  toast,
  hideToast
} from './components/toast/toast.js';
import {hasClass, addClass, removeClass} from './js/utils';
import {eventBus} from './js/eventBus'

/**
 *  vconsole 需要直接打开
 * */
// import vConsole from 'vconsole';
// let consoleTest = new vConsole();
/**
 *  全局 $toast
 * */
Vue.prototype.$toast = function (text, time) {
  toast(text, time)
};
Vue.prototype.$hideToast = function () {
  hideToast()
};
/**
 *  全局eventBUs
 * */
Vue.prototype.$eventBus = eventBus;
/**
 *  FastClick
 * */
FastClick.attach(document.body);

/**
 *  mixin 公共方法
* */
Vue.mixin(baseVue)

/**
 *  注册全局点击，点击对象赋上class，优化体验
 * */
Vue.directive('touchBg', {
  inserted: function (el) {
    console.log(el)
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
