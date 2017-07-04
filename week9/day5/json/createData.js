/**
 * Created by Administrator on 2017/6/25.
 */
function ran(n,m) {
    return Math.round(Math.random()*(m-n)+n);
}
var str1="赵钱孙李周吴郑王冯陈褚卫蒋沈韩杨朱秦尤许何吕施张孔曹严华金魏陶姜戚谢邹喻柏水窦章云苏潘葛奚范彭郎鲁韦昌马苗凤花方俞任袁柳酆鲍史唐";
var str2="丽秀鑫文凯翰杰峰倩慧明兴瑜天楠斌雷香晨冬";
var ary=[];
//[{"id":1,"name":"赵兴","sex":1,"score":19}]
for(var i=1;i<=88;i++){
   if(i%2){
       var obj={
           id:i,
           name:str1[ran(0,str1.length)]+str2[ran(0,19)],
           sex:ran(0,1),
           score:ran(0,100)
       }
   }else {
       var obj={
           id:i,
           name:str1[ran(0,str1.length)]+str2[ran(0,19)]+str2[ran(0,19)],
           sex:ran(0,1),
           score:ran(0,100)
       }
   }
   ary.push(obj);
}
var fs=require("fs");
fs.writeFileSync("./userList.json",JSON.stringify(ary),"utf-8");

