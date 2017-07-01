/**
 * Created by Administrator on 2017/6/20.
 */
let A=require("./A");
module.exports={
    avg(...arg){
        arg.sort((a,b)=>a-b);
        arg.pop();
        arg.shift();
        return (A.sumArrow(...arg)/arg.length).toFixed(2);
    }
};