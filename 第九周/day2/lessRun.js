/**
 * Created by Administrator on 2017/6/21.
 */
let fs=require("fs"),
    less=require("less");
//读取less 文件夹
let lessDir=fs.readdirSync("./less");
console.log(lessDir.constructor);
//[ 'a1.less', 'a2.less', 'less1.less' ]
//[Function: Array]
lessDir.forEach((item,index)=>{
    if(!/\.less$/i.test(item))return;
    //./less/a1.less
    let lessFile=fs.readFileSync("./less/"+item,"utf-8");
    less.render(lessFile,(error,result)=>{
        var res=result.css;
        item=item.replace(/\.less$/i,".css");
        fs.writeFileSync("./css/"+item,res,"utf-8");
    });
});
