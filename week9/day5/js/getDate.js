/**
 * Created by Administrator on 2017/6/25.
 */
//new Date获取的是本机的时间,这个是不准确的,我们应该统一获取服务器的时间
//1.通过AJAX获取服务器时间
let serverTime=null;
let getServerTime=(callBack)=>{
    if(serverTime==null){
        let xhr=new XMLHttpRequest;
        xhr.open("GET","json/data.json");
        xhr.onreadystatechange=function () {
            if(xhr.readyState===2&&xhr.status==200){
                serverTime=xhr.getResponseHeader("date");
                //这个时间是格林尼治时间将它转为北京时间
                serverTime=new Date(serverTime);
                callBack&&callBack(serverTime);
            }
        };
        xhr.send(null);
        return;
    }
    //服务器的时间只需要获取一次即可,从第二次开始设置定时器每一秒加一
    serverTime=new Date(serverTime.getTime()+1000);
    callBack&&callBack(serverTime);
};

let addZero=(val)=>(val<10?"0"+val:val);

let dataFn=()=>{
    let tarTime=new Date("2017/6/25 11:00:00");
    getServerTime((nowTime)=>{
        let spanTime=tarTime-nowTime;
        let result=``;
        if(spanTime>0){
            let h=Math.floor(spanTime/(1000*60*60));
            spanTime=spanTime-h*1000*60*60;
            let m=Math.floor(spanTime/(1000*60));
            spanTime=spanTime-m*1000*60;
            let s=Math.floor(spanTime/1000);
            result=`${addZero(h)}:${addZero(m)}:${addZero(s)}`;
        }else {
            result="00:00:00";
           // 清掉定时器
            window.clearInterval(autoTimer);
        }
        document.querySelector(".box>span").innerHTML=result;
    });
};
dataFn();
let autoTimer=window.setInterval(dataFn,1000);

