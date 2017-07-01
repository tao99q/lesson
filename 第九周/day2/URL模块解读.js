/**
 * Created by Administrator on 2017/6/21.
 */
//URL也是node的内置模块
let url = require("url");
let str = "http://www.zhufengpeixun.cn:80/student/info.html?name=jzx&age=1000#video";
/*
 * url这个模块中主要是用来解析一个URL地址中的每一部分信息的
 * url.parse(str)
 * */
console.log(url.parse(str));
/*
 Url {
 protocol: 'http:',
 slashes: true,
 auth: null,
 host: 'www.zhufengpeixun.cn:80',
 port: '80',
 hostname: 'www.zhufengpeixun.cn',
 hash: '#video',
 search: '?name=jzx&age=1000',
 query: 'name=jzx&age=1000',
 pathname: '/student/info.html',
 path: '/student/info.html?name=jzx&age=1000',
 href: 'http://www.zhufengpeixun.cn:80/student/info.html?name=jzx&age=1000#video' }
 */