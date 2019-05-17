import axios from 'axios';
import qs from 'qs';

import store from '../store/index'
console.log(store.state.isLoading)
// 添加请求拦截器

const CancelToken = axios.CancelToken;
window.CancelToken = CancelToken
window.source = CancelToken.source();
if(navigator.onLine){
  axios.defaults.timeout = 40000
}else{
  axios.defaults.timeout = 5000
}
let httpNum=0
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  httpNum++
  store.state.isLoading =true
  return config;
}, function (error) {
  store.state.isLoading =false
  httpNum=0
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么

  httpNum--
  if(httpNum <0){
    httpNum = 0
  }
  if(httpNum===0){
    store.state.isLoading =false
  }
  return response;
}, function (error) {
  httpNum--
  if(httpNum===0){
    store.state.isLoading =false
  }

  // 对响应错误做点什么
  return Promise.reject(error);
});

export default {
  http (type = 'get', url, params = {}){
   /*
   * type 请求类型 拓展post content-type 考虑到类型不多，若添加重新起名。
   * */
    switch (type) {
      case 'get':
        return axios[type]( url, {params: params}).then((res)=>{
          return res.data
        });
      case 'post':
        return axios[type](  url, qs.stringify(params), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
          },
          cancelToken: window.source.token
        }).then((res)=>{
          return res.data
        });
    }
  },

}
