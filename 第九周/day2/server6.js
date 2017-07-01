/**
 * Created by Administrator on 2017/6/21.
 */
//客户端向服务器发请求,不仅仅是通过url或者文件路径的方式来请求资源文件,更多时候是通过数据接口来请求相应的数据比如通过AJAX的方式请求,请求的接口API是后台给你的,这两种方式原理是不一样的,我们现在写的只是来处理资源文件的请求(html/css/js/png/jpg/gif.....)
// 如果请求的路径pathname中有文件的后缀名,请求的就是资源文件
//let pathREg=/\.[0-9a-zA-Z]+$/i;

let http = require("http"),
    url = require("url"),
    fs = require("fs");
http.createServer((req, res) => {
    let {pathname, query} = url.parse(req.url);
    let pathReg = /\.[0-9a-zA-Z]+$/i;
    if (pathReg.test(pathname)) {
        let readF = null;
        try {
            readF = fs.readFileSync("." + pathname);
            //我们获取的内容大部分都是字符串格式的数据,返回给客户端的数据基本都是字符串格格式的(部分IE浏览器,我们返回给客户端的数据内容大部分都是字符串,导致部分IE浏览器识别不出是HTML还是CSS,JS,只有IE存在这个问题,其余的像谷歌,火狐等都会帮助我们识别)
            //所以服务器在返回数据给客户端的时候,告诉客户端返回数据的类型(MIME类型) "重写响应头"
            /*
            * 不同文件的MIME类型
            * HTML  text/html
            * CSS   text/css
            * JS    text/javascript
            * PNG   image/png
            * JPG   image/jpeg
            * GIF   image/gif
            * .....
            * */
        } catch (e) {
            readF = "not found~";
        }
        //当网络状态码是200的时候我们写响应头
        res.writeHead(200,{"content-type":"text/css;charset=utf-8"});
        res.end(readF);
    }
    res.end("The requested file is not a resource file");
}).listen(1234, () => {
    console.log("listing OK!")
});
