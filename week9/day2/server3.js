/**
 * Created by Administrator on 2017/6/21.
 */
let http=require("http"),
    fs=require("fs"),
    url=require("url");
http.createServer((req,res)=>{
    let{pathname,query}=url.parse(req.url);
    //为了防止客户端请求的资源文件不存在,服务器就会崩溃,我们采用异常信息的捕获 try catch 当文件不存在的时候返回 "not find"
    try {
        res.end(fs.readFileSync("."+pathname,"utf-8"));
    }catch (e){
        res.end("not find");
    }
}).listen(1234,()=>{
    console.log("listing OK!")
})