/**
 * Created by Administrator on 2017/6/21.
 */
let http=require("http"),
    url=require("url"),
    fs=require("fs");

http.createServer((request,response)=>{
    /*
    *客户端向服务器发一次请求,这个回调函数就会执行一次
    * request:他是一个对象,这里面存储了客户端的请求信息(也包含了客户端发给服务器的数据内容)
    * response:他是一个对象,这里面存储了很多方法,可以让服务器把客户端需要的内容返回给客户端
    *
    * request.url:这个就是客户端本次请求的url地址
    * */

    let{pathname,query}=url.parse(request.url);
    console.log(pathname, query);
    //http://192.168.0.27:12340/css/index.html?a=1&b=2
   // /css/index.html   a=1&b=2
    if(pathname=="/index1.html"){
       //当用户请求的是index1.html 的时候
       //服务器收到请求后将index1.html的源码读取出来(一大串字符串),返回给客户端
        let resFile=fs.readFileSync("./index1.html","utf-8");
        //把读取出来的内容resFile返回给客户端
        //response.write(resFile);
        //response.end();
        //以上两步可以合并为一步解决
        response.end(resFile)
    }
}).listen(12340,()=>{
    console.log("success!");
});