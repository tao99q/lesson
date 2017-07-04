/**
 * Created by Administrator on 2017/6/21.
 */
//客户端向服务器发请求,不仅仅是通过url或者文件路径的方式来请求资源文件,更多时候是通过数据接口来请求相应的数据比如通过AJAX的方式请求,请求的接口API是后台给你的,这两种方式原理是不一样的,我们现在写的只是来处理资源文件的请求(html/css/js/png/jpg/gif.....)
//如果请求的路径pathname中有文件的后缀名,请求的就是资源文件
//let pathREg=/\.[0-9a-zA-Z]+$/i;

let http=require("http"),
    url=require("url"),
    fs=require("fs");
http.createServer((req,res)=>{
    let {pathname,query}=url.parse(req.url);
    let pathReg=/\.[0-9a-zA-Z]+$/i;
    if(pathReg.test(pathname)){
        let readF=null;
        try {
            readF=fs.readFileSync("."+pathname,"utf-8");
        }catch (e){
            readF="not found~";
        }
        res.end(readF);
    };
    res.end("The requested file is not a resource file")
}).listen(1234,()=>{
    console.log("listing OK!");
});