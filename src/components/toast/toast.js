/**
 * Created by 黄山淋 on 2017-5-16.
 */
import Vue from 'vue'
import toastModel from './toast.vue'
const ToastConstructor = Vue.extend(toastModel);
let removeDom = event => {
    event.target.parentNode.removeChild(event.target);
};
ToastConstructor.prototype.close = function() {
    this.show = false;
    this.$el.addEventListener('transitionend', removeDom);
};
const toast = (options,time) => {
    let toast = document.getElementById('toast');
    if(toast){
        toast.parentNode.removeChild(toast);
    }
    // document.body.removeChild(instance);
    let instance = new ToastConstructor().$mount();
    let duration = time||3000;
    instance.text = options;
    document.body.appendChild(instance.$el);
    instance.show = true;
    Vue.nextTick(() => {
        instance.timer = setTimeout(function() {
            instance.close();
        },duration);
    });
    return instance
};
const hideToast = ()=>{
    let toast = document.getElementById('toast');
    if(toast){
        toast.parentNode.removeChild(toast);
    }
};
export {toast,hideToast}