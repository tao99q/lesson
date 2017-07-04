/**
 * Created by Administrator on 2017/6/22.
 */
var http=require("http"),
    url=require("url"),
    fs=require("fs");
http.createServer(function (req,res) {
    var urlObj=url.parse(req.url),
        pathName=urlObj.pathname,
        query=urlObj.query;
    console.log(pathName);
    var reg=/\.([0-9a-zA-Z]+)$/i;
    if(reg.test(pathName)){
        var path=reg.exec(pathName)[1].toUpperCase(),
            pathMIME="text/html";
        path==="CSS"?pathMIME="text/css":path==="JS"?pathMIME="text/javascript":pathMIME="text/html";
        var readFile=null,
            status=200;
        try {
            readFile=fs.readFileSync("."+pathName);
        }catch (e){
            readFile="I am sorry";
            status=404;
        }
        res.writeHead(status,{
            "content-type":pathMIME+";charset=utf-8;"
        });
        res.end(readFile);
        return;
    }
    //没有.后缀名的路径就是通过AJAX方式请求的api
    //获取数据库data中datas.json中的数据
    var userData=fs.readFileSync("./data/datas.json","utf-8");
    //userData中就是所有的用户信息数据,但是字符串
    //如果userData没有数据是个空字符串,用JSON.parse转对象的话会报错,为了防止这样的情况发生,userData.length===0,userData='[]';
    userData=userData.length===0?"[]":userData;
    //将JSON字符串变为JSON对象
    userData=JSON.parse(userData);
    //创建一个默认的返回值result 默认请求一般都是不成功的
    var result={
        code:1,
        msg:"error",
        data:null
    };
    if(pathName==="/getAllUserList"){
        //将数据库data文件夹中的datas中的数据返回给客户端
        //userData就是返回给客户端的数据
        if(userData.length>0){
            result={
                code:0,
                msg:"success",
                data:userData
            };
        }
        //写响应头 告诉浏览器你返回给他得数据是个json类型的
        res.writeHead(200,{
            "content-type":"application/json;charset=utf-8;"
        });
        //返回的数据是result,但是你要转为JSON字符串返回给人家
        res.end(JSON.stringify(result));
        return;
    }
    if(pathName==="/removeUser"){
        //console.log(query)
        //id=1&_=1498106156926
        //query["id"]
        //将query变成对象
        query=format(query);
        //获取客户端传给服务器的要删除的用户的ID
        var userId=query["id"];
        //遍历数据库中的数据userData,找到对应的这个ID的用户,删掉这条数据
        userData.forEach(function (item,index) {
            if(item["id"]==userId){
                userData.splice(index,1);
                //把改变的数据写入到数据库中,注意把userData变成JSON字符串
                fs.writeFileSync("./data/datas.json",JSON.stringify(userData),"utf-8");
                result={
                    code:0,
                    msg:"success"
                };
                return false;
            }
        });
        res.writeHead(200,{
            "content-type":"application/json;charset=utf-8;"
        });
        res.end(JSON.stringify(result));
        return;
    }
    if(pathName==="/addUserInfo"){
        //这里用的是post请求,前端请求的参数不在req.url上,那这里有他自己得到方式 req.on("data",function(){})
        var strData="";
        req.on("data",function (chunk) {
            strData+=chunk;
        });
        req.on("end",function () {
            //strData 参数,就跟query一样 是个字符串
            //strData转为JSON对象
            strData=format(strData);//{name:XXX}
            //给strData增加一个ID名
            strData["id"]=(userData[userData.length-1]["id"])+1;
            //{name:XXX,id:9}
            //向数组userData末尾中增加这个对象strData
            userData.push(strData);
            //将数组重新写入到数据库datas.json中,注意写入的是转为字符串后的数据
            fs.writeFileSync("./data/datas.json",JSON.stringify(userData),"utf-8");
            result={
                code:0,
                msg:"success"
            };
            res.writeHead(200,{
                "content-type":"application/json;charset=utf-8;"
            });
            res.end(JSON.stringify(result));
        });
        return;
    }
}).listen(1234,function () {
    console.log("listing 1234 OK");
});
function format(str) {
    var reg=/([^&]+)=([^&]+)/g,
        obj={};
    str.replace(reg,function () {
        obj[arguments[1]]=decodeURIComponent(arguments[2]);
    });
    return obj;
}

