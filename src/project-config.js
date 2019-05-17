'use strict';

let exports = {
	get Url() {
		let test = null,
			prod = null;
		return this.isTest ? test : prod;
	},
	// base url 所有接口
	get baseUrl() {
    let test ,prod;
      test = 'http://bigdataservice.midea.com/YXT_NEW';
      prod = 'http://bigdataservice.midea.com/YXT_NEW';
    return this.isTest ? test : prod;

	},
	// 是否是测试环境
	get isTest() {
		return $envType.type === 0 || $envType.type === 1;
	},
	// 是否是pc环境
	get isPcTest() {
		return $envType.type === 0;
	},
};

// module.exports = exports;
export default exports
