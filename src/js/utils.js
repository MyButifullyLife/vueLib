export function hasClass(el, className) {
	let reg = new RegExp('(^|\\s)' + className + '(\\s|$)');
	return reg.test(el.className);
}

export function addClass(el, className) {
	if (hasClass(el, className)) {
		return;
	}

	let newClass = el.className.split(' ');
	newClass.push(className);
	el.className = newClass.join(' ');
}

export function removeClass(el, className) {
	if (!hasClass(el, className)) {
		return;
	}

	let reg = new RegExp('(^|\\s)' + className + '(\\s|$)', 'g');
	el.className = el.className.replace(reg, ' ');
}

/**
 * @desc 对浮点数精准操作
 * @author GAOJH
 * @lastModify GAOJH
 * @param {Number} num 需要转换操作的数字
 * @return 将数值转换为带有, 符号的字符串 9800 => 9,800
 */
export const formatNumber = function (number) {
    let value = Number(number);
    if (!isNaN(value)) {
        return String(value).split('').reverse()
            .reduce((p, n, i, {
                length
            }) => {
                p.push(n);
                if (i % 3 === 2 && i < length - 1) p.push(',');
                return p;
            }, [])
            .reverse().join('');
    } else {
        return number;
    }
};


/**
 * @desc 生成随机数
 * @author GAOJH
 * @lastModify GAOJH
 * @param {Number} l 多少位数
 * @return 随机数
 */
export const randomChar = function (l) {
    const x = '0123456789qwertyuioplkjhgfdsazxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM';
    let tmp = '';
    for (let i = 0; i < l; i++) {
        tmp += x.charAt(Math.ceil(Math.random() * 100000000) % x.length);
    }
    return tmp;
}

export function getRect(el) {
    if (el instanceof window.SVGElement) {
        let rect = el.getBoundingClientRect();
        return {
            top: rect.top,
            left: rect.left,
            width: rect.width,
            height: rect.height
        }
    } else {
        return {
            top: el.offsetTop,
            left: el.offsetLeft,
            width: el.offsetWidth,
            height: el.offsetHeight
        }
    }
}
