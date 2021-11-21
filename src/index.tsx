import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { registerMicroApps, start, addGlobalUncaughtErrorHandler } from 'qiankun';

// const getActiveRule = (hash: any) => (location: any) => location.hash.startsWith(hash);
const loader = (loading: boolean) => {
    // 此处可以获取微应用是否加载成功,可以用来触发全局的 loading
    console.log('loading', loading);
};
registerMicroApps([
    {
        name: 'road-distress-detection',
        entry: '//10.80.23.112:8000',
        container: '#subContainer',
        activeRule: '/reactapp',
        loader
    },
    {
        name: 'vueapp',
        entry: '//10.80.23.112:8080',
        container: '#subContainer',
        activeRule: '/vueapp',
        loader,
        props: {
            test: 'test'
        }
    }
]);
// 启动 qiankun
start({
    prefetch: true // 开启预加载
    // sandbox: {
    //     experimentalStyleIsolation: true //   开启沙箱严格模式,实验性方案
    // }
});

// 添加全局异常捕获
addGlobalUncaughtErrorHandler((handler) => {
    console.log('异常捕获', handler);
});

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
            <div id="root2"></div>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
