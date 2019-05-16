/*import axios from 'axios'*/
let axios = require('axios');
let ProjectConfig = require('../project-config');
let instance = axios.create({
	timeout: 40000,
	// headers: {'X-Custom-Header': 'foobar'}
});

const CancelToken = axios.CancelToken;
window.CancelToken = CancelToken
window.source = CancelToken.source();

// 添加请求拦截器
/*axios.interceptors.request.use(function (config) {
	// 在发送请求之前做些什么
	return config;
}, function (error) {
	// 对请求错误做些什么
	return Promise.reject(error);
});*/

// 添加响应拦截器
/*axios.interceptors.response.use(function (response) {
	// 对响应数据做点什么
	return response;
}, function (error) {
	console.log(error);
	// 对响应错误做点什么
	return Promise.reject(error);
});*/

function get(params, opts) {

	let _opts = opts || {};
	//params.data.ssoTokenName = params.ssoToken || '';
	return instance({
		url: params.url,
		method: 'get',
		baseURL: _opts.baseUrl || ProjectConfig.baseUrl,
		headers: {
			'Content-Type': _opts.contentType || 'application/json',
			'x-auth-token': params.token
		},
		cancelToken: window.source.token,
		params: params.data
	});
}

/**
 * @param {url, token, ssoToken, data} params
 * @param {contentType} opts
 */
function post(params, opts) {
	let url = '';
	for (let attr in params.data) {
		url += attr + '=' + params.data[attr] + '&';
	}
	let _opts = opts || {},
		option = {
			url: params.url + '?' + url,
			method: 'post',
			baseURL: _opts.baseUrl || ProjectConfig.baseUrl,
			headers: {
				'Content-Type': _opts.contentType || 'application/json',
				'x-auth-token': params.token
			},
			cancelToken: window.source.token,
			data: params.data
		};

	return instance(option);
}

/**
 * @param {url, token, ssoToken, data} params
 * @param {contentType} opts
 */
function del(params, opts) {
	let _opts = opts || {},
		option = {
			url: params.url,
			method: 'delete',
			baseURL: params.baseUrl,
			headers: {
				'Content-Type': _opts.contentType || 'application/json',
				'x-auth-token': params.token
			},
			cancelToken: window.source.token,
			data: params.data
		};

	return instance(option);
}


function resolve(rep, clback) {
	var data = rep.data;

	if (rep.status == 200) {
		clback && clback(data);
	}
	return data;
}

module.exports = {
	get,
	post,
	resolve,
	del
};
