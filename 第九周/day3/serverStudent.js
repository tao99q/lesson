/**
 * Created by Administrator on 2017/6/22.
 */
var http=require("http"),
    url=require("url"),
    fs=require("fs");
http.createServer(function (request,response) {
    var urlObj=url.parse(request.url),
        pathName=urlObj.pathname;
    var reg=/\.([0-9a-zA-Z]+)$/i;
    if(reg.test(pathName)){
        var path=reg.exec(pathName)[1].toUpperCase(),
            pathMIME="text/html";
        path==="CSS"?pathMIME="text/css":path==="JS"?pathMIME="text/javascript":null;
        var readFile=null,status=200;
        try {
            readFile=fs.readFileSync("."+pathName);
        }catch(e){
            readFile="I am so sorry";
            status=404;
        }
        response.writeHead(status,{
            "content-type":pathMIME+";charset=utf-8;"
        });
        response.end(readFile);
        return;
    }
    //将数据库中的数据读取出来

}).listen(666,function () {
    console.log("OK 666!")
});