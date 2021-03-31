/**
 * /* eslint-disable camelcase
 *
 * @format
 */

import axios from 'axios';
import { isObject, isString } from './lib/is';
import { downloadFile } from './lib/downlodFiles';

const ErrorCodeEnum = {
    APP_SCHEMA_DATA_INVALID: 101012, // 人群透视人数小于1000的时候返回该数值
    AUDIENCE_TYPE_NOT_SUPPORT: 105006, // 不支持人群包定义的类型
    AUDIENCE_NAME_EXIST: 105002, // 人群包名称已经存在，重复
    AUDIENCE_NOT_FOUND: 105001, // 未找到人群包
    AUDIENCE_NO_AUTH: 105004, // 没有权限访问该人群包
    AUDIENCE_IS_REACHING: 105017, // 人群包正在触达，（删除失败）
    AUTH_ERP_PIN_NOT_AUTH: 100101, // Pin没有授权给Erp，运营版使用
    AUDIENCE_GENERATE_INSUFFICIENT_SOURCE: 100202 // 您的资源不足，请联系运营购买资源套餐
};

export const RequestTypeEnum = {
    GET: 'get',
    PUT: 'put',
    DELETE: 'delete',
    POST: 'post'
};

const requestSet = new Set();
let executor;
if (window.$frontend_monitor && window.$frontend_monitor.executeAfterLoad) {
    executor = window.$frontend_monitor.executeAfterLoad(5000);
}

// Add a request interceptor
axios.interceptors.request.use(
    config => {
        // Do something before request is sent
        // eslint-disable-next-line no-param-reassign
        config.st = new Date().getTime();
        let uuid;
        try {
            uuid = window.$frontend_monitor && window.$frontend_monitor.getUUID && window.$frontend_monitor.getUUID(config.url);
        } catch (e) {
            uuid = 'error';
        }
        // eslint-disable-next-line no-param-reassign
        config.headers.uuid = uuid;
        return config;
    },
    error => Promise.reject(error)
);

// Add a response interceptor
axios.interceptors.response.use(
    response => {
        function every(obj, value) {
            // eslint-disable-next-line no-restricted-syntax
            for (const key in obj) {
                if (obj[key] === value) {
                    return false;
                }
            }
            return true;
        }

        // 将参数和url拼接
        const url = response.config && response.config.url;
        let args = '';
        try {
            if (response.config) {
                if (isObject(response.config.data)) {
                    args += JSON.stringify(response.config.data);
                }
                if (isString(response.config.data)) {
                    args += response.config.data;
                }
            }
            if (response.config) {
                if (isObject(response.config.params)) {
                    args += JSON.stringify(response.config.params);
                }
                if (isString(response.config.params)) {
                    args += response.config.params;
                }
            }
            if (!requestSet.has(url + args)) {
                requestSet.add(url + args);
                const spendTime = new Date().getTime() - response.config.st;
                if (spendTime > 0 && window.$frontend_monitor && window.$frontend_monitor.ajaxSpendTime) {
                    const params = {
                        spend_time: spendTime,
                        ajax_href: url,
                        ajax_params: args,
                        uuid: response.config.headers.uuid
                    };
                    // eslint-disable-next-line max-len,no-unused-expressions
                    executor ? executor(window.$frontend_monitor.ajaxSpendTime, params) : window.$frontend_monitor.ajaxSpendTime(params);
                }
            }
        } catch (e) {
            /**/
        }
        try {
            // eslint-disable-next-line max-len
            if (response.data && Number(response.data.status) !== 0 && every(ErrorCodeEnum, Number(response.data.status))) {
                // eslint-disable-next-line no-unused-expressions
                window.$frontend_monitor &&
                    window.$frontend_monitor.ajaxErr({
                        url,
                        params: args,
                        detail: `response data status[${response.data.status}] message:[${response.data.errMsg || ''}]`,
                        uuid: response.config.headers.uuid
                    });
            }
        } catch (e) {
            /**/
        }
        // Do something with response data
        return response;
    },
    error => {
        // Do something with response error
        // 某些情况下error是一个错误对象，此时没有error.config。比如url设置为undefined
        let params = '';
        if (error.config && isObject(error.config.data)) {
            params += JSON.stringify(error.config.data);
        }
        if (error.config && isObject(error.config.params)) {
            params += JSON.stringify(error.config.params);
        }
        // eslint-disable-next-line no-unused-expressions
        window.$frontend_monitor &&
            window.$frontend_monitor.ajaxErr({
                url: error.config && error.config.url,
                params,
                detail: `http status[${error.response && error.response.status}] message:[${error.message || ''}]`,
                uuid: error.config && error.config.headers && error.config.headers.uuid
            });
        return Promise.reject(error);
    }
);

export const request = ({ method, ...options }) =>
    new Promise((resolve, reject) => {
        const { data, ...rest } = options;
        if (method === RequestTypeEnum.GET || method === RequestTypeEnum.DELETE) {
            rest.params = data;
        } else {
            rest.data = data;
        }
        axios({ ...rest, method })
            .then(res => {
                const {
                    data: { status, ...result }
                } = res;
                if (rest.resolveBody) {
                    resolve(res);
                } else if (res.status === 200 && (Number(status) === 0 || res.data.success)) {
                    resolve(result && result.result);
                } else if (/^attachment.*filename=.*/.test(res.headers['content-disposition'])) {
                    downloadFile(res.data, `${res.headers['content-disposition'].split('filename=').slice(-1)}`);
                } else {
                    console.log('请求返回异常，请检查：', options);
                    reject((res.data && (res.data.errMsg || res.data.message)) || '请求失败');
                }
            })
            .catch(e => {
                console.log('请求异常：', e.message);
                reject(e.message);
            });
    });
