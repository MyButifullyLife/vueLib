/**
 * Created by Administrator on 2017-6-2.
 */
// import keepAlive from '../router/keepAlive'
let storage = {
    get(key, isLocalStorage = false) {
        if (!key) return null
        let _storage = isLocalStorage ? localStorage : sessionStorage,
            props = key.split('.'),
            k = props.shift(),
            itemStr = _storage.getItem(k),
            itemObj = null
        try {
            itemObj = JSON.parse(itemStr)
            if (typeof itemObj != 'object')
                throw ('Not an object!')
        } catch (e) {
            return props.length ? null : itemStr
        }
        while (props.length && itemObj) {
            itemObj = itemObj[props.shift()]
        }
        return itemObj
    },
    set(key, value, isLocalStorage = false) {
        if (!key) return
        let _storage = isLocalStorage ? localStorage : sessionStorage,
            props = key.split('.'),
            k = props.shift()
        if (!props.length) {
            if (typeof value === 'object') value = JSON.stringify(value)
            _storage.setItem(k, value)
            return
        }
        let itemStr = _storage.getItem(k),
            itemObj = null
        if (itemStr) {
            try {
                itemObj = JSON.parse(itemStr)
                if (typeof itemObj != 'object')
                    throw ('Not an object!')
            } catch (e) {
                throw ('storage.set: key ' + k + ' 已被占用并且不是一个对象，无法为其设置属性值')
            }
        }
        let copy = itemObj = itemObj || {}
        while (props.length > 1) {
            let p = props.shift()
            copy[p] = copy[p] || {}
            copy = copy[p]
        }
        copy[props[0]] = value
        _storage.setItem(k, JSON.stringify(itemObj))
    },
    del(key, isLocalStorage = false) {
        if (!key) return
        let _storage = isLocalStorage ? localStorage : sessionStorage
        _storage.removeItem(key)
    },
    clear(isLocalStorage = false) {
        let _storage = isLocalStorage ? localStorage : sessionStorage
        _storage.clear()
    }
}
/**
 * 处理错误，传入不规则的错误，输出可以在页面显示的错误信息
 * @param  {Object} [err={}]   错误对象，如果传入字符串，则会将字符串视为错误信息，如果传入既非对象也非字符串，则视为无效参数
 * @param  {String} defaultMsg 如果错误对象errorMsg属性为空，则将该值作为errorMsg
 * @return {Object}            输出一个带有errorMsg属性的对象
 */
function handleError(err = {}, defaultMsg) {
    if (typeof err === 'string') {
        err = {
            errorMsg: err
        }
    }
    if (typeof err != 'object') {
        err = {}
    }
    if (!err.errorMsg || typeof err.errorMsg != 'string') {
        err.errorMsg = defaultMsg
    }
    return err
}
function famaterTime(day = 0, showYear = true, showHoursMinu = false) {
    let date = new Date();
    date.setTime(date.getTime() + 1000*60*60*24*day);
    let Y = date.getFullYear();
    let M = date.getMonth() + 1;
    let D = date.getDate();
    let str ='';
    let ten = res => {
        return res <= 9 ? '0' + res: res;
    };
    if (showYear) {
        str = Y + '-'+ ten(M) + '-' + ten(D);
    } else {
        str = ten(M) + '-' + ten(D);
    }
    return str;
}
export {
    storage,
    handleError,
    famaterTime
}
// export default methods
