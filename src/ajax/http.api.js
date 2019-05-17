import axiosConfig from '/axiosConfig.js';
import url from './http.url'

/**
 *  type 请求类型 get  post
 *  url 地址
 *  params 请求参数
 *  在请求接口之前拦截参数，可用于统一处理参数
 * */
let httpServe = function(type,url,params){

  return axiosConfig.http(type, url, params);
};

export default {
  httpServe,
  UserMenu(params){
    return httpServe('post',url.UserMenu,params)
  }

}
