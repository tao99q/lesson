/**
 * Created by Administrator on 2017/6/25.
 */
let http=require("http"),
    url=require("url"),
    fs=require("fs");
http.createServer((request,response)=>{
    let {pathname,query}=url.parse(request.url,true),
        regPath=/\.([0-9a-zA-Z]+)$/i;
    /*资源文件的请求*/
    if(regPath.test(pathname)){
        let path=regPath.exec(pathname)[1].toUpperCase(),
            pathMIME="text/plain";
        switch (path){
            case "HTML":
                pathMIME="text/html";
                break;
            case "CSS":
                pathMIME="text/css";
                break;
            case "JS":
                pathMIME="text/javascript";
                break
        }
        let  readFile="NOT FOUND",status=404;
        try {
            readFile=fs.readFileSync("."+pathname,"utf-8");
            status=200;
        }catch (e){};
        response.writeHead(status,{"content-type":pathMIME+";charset=utf-8;"});
        response.end(readFile);
        return;
    };
    /*API请求数据*/
    //把数据读取出来,并转为JSON对象
    let allData=JSON.parse(fs.readFileSync("./json/userList.json","utf-8"));
    if(pathname=="/getUserList"){
        //获取客户端请求是传的参数page
       let page=query["page"],
           result={
               code:0,
               msg:"success",
               total:Math.ceil(allData.length/10),
               data:[]
           };
       // (page-1)*10 ~ page*10-1
       for (var i=(page-1)*10;i<page*10;i++) {
           //注意最后一页的时候有可能不足10条数据
           if(i>allData.length-1)break;
           result.data.push(allData[i]);
       }
       response.writeHead(200,{"content-type":"application/json;charset=utf-8;"});
       response.end(JSON.stringify(result));
       return;
    }
}).listen(12345,()=>{
    console.log("12345 listing OK")
});