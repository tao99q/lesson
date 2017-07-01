/**
 * Created by Administrator on 2017/6/20.
 */
//先导入node自带模块fs  这个模块主要是用来处理文件的
let fs=require("fs");
//导入第三方模块 less;
let less=require('less');
// less.render('@c:red;body{color:@c}',function (error,result) {
//     console.log(result.css);
// })

//"./less" day1/less
//readFile:读取文件 默认是异步读取
//readFileSync:同步读取文件
// fs.readFile("./less/less1.less","utf-8",function (error,result) {
//     console.log(result);
// });
//读取文件夹
// fs.readdir("./less",function (error,reslut) {
//     console.log(reslut);
// });

less.render(fs.readFileSync("./less/less1.less","utf-8"),function (error,res) {
    //在CSS文件夹中新建一个css1.css的文件,里面的内容就是编译好的res.css
    //换句话说就是把res.css 写入到css1.css中
    //fs.writeFileSync("./css/css1.css") 写入文件,如果没有css1.css就会自动创建css1.css
    fs.writeFileSync("./css/css1.css",res.css,"utf-8")
});