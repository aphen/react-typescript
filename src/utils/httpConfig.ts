import axios from 'axios';
import { message } from 'antd';
//import { rejects } from 'node:assert';
const $axios = axios.create({
    baseURL: 'http://localhost:3100/api/',
    timeout: 1000
});
// 请求拦截器
$axios.interceptors.request.use(
    (config) => {
        // 如果存在，则统一在http请求的header都加上token，这样后台根据token判断你的登录情况
        // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
        const token = window.localStorage.getItem('token');
        token && (config.headers.Authorization = token);
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
$axios.interceptors.response.use(
    (response) => {
        console.log(response);
        // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
        // 否则的话抛出错误
        if (response.status === 200) {
            return Promise.resolve(response);
        } else {
            return Promise.reject(response);
        }
    },
    // 服务器状态码不是2开头的的情况
    (error) => {
        console.log(error);
        if (error.response && error.response.status) {
            switch (error.response.status) {
                // 401: 未登录
                // 未登录则跳转登录页面，并携带当前页面的路径
                // 在登录成功后返回当前页面，这一步需要在登录页操作。
                case 401:
                    message.error('身份验证失败，请关闭重新进入。');
                    localStorage.removeItem('token');
                    window.location.reload();
                    break;

                // 403 token过期
                // 登录过期对用户进行提示
                // 清除本地token
                // 跳转登录页面
                case 403:
                    message.error('登录过期，请关闭重新进入。');
                    // 清除token
                    localStorage.removeItem('token');
                    window.location.reload();
                    break;

                // 404请求不存在
                case 500:
                    message.error('服务器错误');
                    break;
                // 其他错误，直接抛出错误提示
                default:
                    message.error(error.response.data.errMsg);
            }
            Promise.reject(error.response);
        } else {
            message.error('服务器或网络不正常，请重试！');
            Promise.reject(error);
        }
    }
);

export default $axios;
