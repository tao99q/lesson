/**
 * Created by Administrator on 2017/6/21.
 */
let http=require("http"),
    url=require("url"),
    fs=require("fs");
http.createServer((req,res)=>{
    let {pathname,query}=url.parse(req.url);
    var pathReg=/\.([0-9a-zA-Z]+)$/i;
    if(pathReg.test(pathname)){
        let readF=null,
            status=200;
        try {
            readF=fs.readFileSync("."+pathname);
        }catch (e){
            readF="not found~";
            status=404;
        }
        //通过路径信息获取MIME类型
        let suffix=pathReg.exec(pathname)[1].toUpperCase(),
            suffixMIME="text/plain";
        switch (suffix){
            case "HTML":
                suffixMIME="text/html";
                break;
            case "JS":
                suffixMIME="text/javascript";
                break;
            case "CSS":
                suffixMIME="text/css";
                break;
            case "PNG":
                suffixMIME="image/png";
                break;
            case "GIF":
                suffixMIME="image/gif";
                break;
            case "JPG":
                suffixMIME="image/jpeg";
                break;
            case "JPEG":
                suffixMIME="image/jpeg";
                break;
        }
        //overWrite response header
        res.writeHead(status,{
            "content-type":suffixMIME+";charset=utf-8;"
        });
        res.end(readF);
    }
    res.end("The requested file is not a resource file!")
}).listen(4321,()=>{
    console.log("OK!");
});