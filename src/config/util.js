import axios from 'axios'
import config from '@/config/axios-config'


var util = {};
util.title = function (title) {
    title = title || '企业服务平台';
    window.document.title = title;
};
util.ajax = axios.create({
    baseURL: config.serverUrl + '/' + config.serverContext,
    timeout: config.serverTimeout,//超时时间
    headers: {'Content-Type': 'application/json;charset=utf-8;'}
});

util.ajax.interceptors.request.use(ai.requestInterceptors, ai.requestError);
util.ajax.interceptors.response.use(ai.responseInterceptors, ai.responseError);

util.params = function (obj) {
    return qs.stringify(obj);
}

util.isJson = function (arg) {
    return typeof (arg) == "object" && Object.prototype.toString.call(arg).toLowerCase() == "[object object]" && !arg.length
}
//添加缓存
util.setItem = function (key, value) {
    if (key == "" || key == undefined || key == null) {
    } else {
        if (value == undefined || value == null) {
            value = "";
        }
        return window.localStorage.setItem(key, JSON.stringify(value));
    }
}
//查询缓存
util.getItem = function (key) {
    if (key == "" || key == undefined || key == null || localStorage.getItem(key) == undefined) {
        return "";
    } else {
        if (localStorage.getItem(key) == null || localStorage.getItem(key) == undefined) {
            return "";
        } else {
            return JSON.parse(window.localStorage.getItem(key));
        }
    }
}
//删除缓存
util.delItem = function (key) {
    if (key == "" || key == null || key == undefined) {
    } else {
        return window.localStorage.removeItem(key);
    }
}

export default util;
