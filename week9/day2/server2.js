/**
 * Created by Administrator on 2017/6/21.
 */
let http=require("http"),
    fs=require("fs"),
    url=require("url");
http.createServer((req,res)=>{
   let{pathname,query}=url.parse(req.url);
   res.end(fs.readFileSync("."+pathname,"utf-8"));

   // if(pathname=="/index1.html"){
   //     res.end(fs.readFileSync("./index1.html","utf-8"));
   // }
   // if(pathname=="/css/css1.css"){
   //     res.end(fs.readFileSync("./css/css1.css","utf-8"));
   // }
   // if(pathname=="/js/1.js"){
   //     res.end(fs.readFileSync("./js/1.js","utf-8"));
   // }
}).listen(1234,()=>{
    console.log("listing OK!")
})