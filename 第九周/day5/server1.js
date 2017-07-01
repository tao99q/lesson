/**
 * Created by Administrator on 2017/6/25.
 */
let http=require("http"),
    url=require("url"),
    fs=require("fs");
http.createServer((request,response)=>{
    //true 会将query直接变成对象比如 name=XXX&age=1
    //{"name":"XXX","age":1}
    let{pathname,query}=url.parse(request.url,true);
    if(pathname=="/getPZX"){
        let cb=query["cb"];
        let data=null;
        data=fs.readFileSync("./json/data.json","utf-8");
        //cb(data)
        let str=cb+"("+data+")";
        response.writeHead(200,{"content-type":"text/javascript;charset=utf-8;"});
        response.end(str);
    }

}).listen(1186,()=>{console.log("1186 OK")});