'use strict';

let exports = {
	get Url() {
		let test = null,
			prod = null;
		return this.isTest ? test : prod;
	},
	// base url 所有接口
	get baseUrl() {

	},
	// 是否是测试环境
	get isTest() {
		return $envType.type === 0 || $envType.type === 1;
	},
	// 是否是pc环境
	get isPcTest() {
		return $envType.type === 0;
	},
	get user() {
		return {
			uid: 'hejh21', // (zhaocm4, 111111)(duanyn, @@dyn123)
			// uid: 'zhaocm4',
			// password: '@hejh2018@',
			// uid: 'fangchen',
			password: 'fc@123456',
			// password: '111111',
			ssoToken: 'TV52992857283849216',
			cn: '叶小叶',
			name: '叶小叶',
			mobile: '18888888888',
			mail: 'scp@midea.com',
			fullDeptName: '美的_美的集团_集团职能_IT_移动系统',
			// extra: {"id": "bb77012b535541fdbad8cd5b812dc58f", "type": "0"} // code 11201418000035
			// ex_xuwq2  (duanyn,111111)
			// Maiteng#12
		}
	}
};

// module.exports = exports;
export default exports
