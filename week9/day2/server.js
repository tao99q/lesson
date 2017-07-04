/**
 * Created by Administrator on 2017/6/21.
 */
//注意这里跟前端代码没有关系,我们写的是后台,服务器语言
//node内置模块  http

let http=require("http");
//创建一个服务
let server1=http.createServer(()=>{
    //当这个服务监听的端口被请求服务了,就会触发这个函数
    //当前客户端向当前这个服务发出请求,比如:用户在地址栏中输入
    //http://localhost:80
    //http://192.168.0.27:80
    console.log("OK!马上过来");
});
//让这个服务去监听一个端口
server1.listen(80,()=>{
    console.log("server1 服务员开始工作,为80号桌服务")
});

/*
* 在同一个局域网下,你们之间就可以相互访问了
* 1.在同一个wifi下
* 2.子网掩码,默认网关,DNS相同,IP地址类似但不相同
* 3.如果再同一个局域网下不能相互访问,把电脑的防火墙关掉
* */

//path c:/windows/system32/