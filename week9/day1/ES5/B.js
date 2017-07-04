/**
 * Created by Administrator on 2017/6/20.
 */
//导入A模块
var A=require("./A");
//任意数 求平均数
function avg() {
    var ary=[].slice.call(arguments);
    ary.sort(function (a,b) {
        return a-b;
    });
    ary.shift();
    ary.pop();
    return (A.sum.apply(null,ary)/ary.length).toFixed(2);
}
module.exports.avg=avg;