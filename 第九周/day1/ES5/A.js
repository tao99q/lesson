/**
 * Created by Administrator on 2017/6/20.
 */
//任意数求和
function sum() {
    var total=0;
    for(var i=0;i<arguments.length;i++){
        var cur=Number(arguments[i]);
        if(!isNaN(cur)){
            total+=cur;
        }
    }
    return total;
}
//把A模块暴露出去
module.exports.sum=sum;