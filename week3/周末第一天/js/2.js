/**
 * Created by 银鹏 on 2017/5/13.
 */
var oDivs=document.getElementsByTagName("div");
var floor=document.getElementsByClassName("floor")[0];
var oLis=floor.getElementsByTagName("li");
var timer=null;

function setHtml(){
    for(var i=0;i<oDivs.length;i++){
        oDivs[i].style.height=Math.round(Math.random()*(600-400)+400)+"px";
        //Math.round(Math.random()*255)
        oDivs[i].style.backgroundColor="rab("+Math.round(Math.random()*255)+","+Math.round(Math.random()*255)+","+Math.round(Math.random()*255)+")";
        oLis[i].setAttribute("_h",offset(oDivs[i]).top);
        oLis[i].onclick=function(){
            select(this);
            window.clearInterval(timer);
            var _h=this.getAttribute("_h");
            var _H=win("scrollTop");
            if(_H>_h){
                timer=window.setInterval(function(){
                    if(win("scrollTop")<=_h){
                        window.clearInterval(timer);
                    }
                    win("scrollTop",_H-=10)
                },1)
            }else{
                timer=window.setInterval(function(){
                    if(win("scrollTop")>=_h){
                        window.clearInterval(timer);
                    }
                    win("scrollTop",_H+=10)
                },1)
            }
        }
    }
}
setHtml();
function select(ele){
    //ele就是当前点击的那个li
    for(var i=0;i<oLis.length;i++){
        oLis[i].className="";
    }
    ele.className="select";
}

function offset(ele){
    var l=ele.offsetLeft;
    var t=ele.offsetTop;
    var p=ele.offsetParent;
    while(p){
        if(window.navigator.userAgent.indexOf("MSIE 8")===-1){
            l+=p.clientLeft;
            t+=p.clientTop;
        }
        l+=p.offsetLeft;
        t+=p.offsetTop;
        p=p.offsetParent;
    }
    return {
        left:l,
        top:t
    }
}
function win(attr,val){
    if(arguments.length==1){
        return document.documentElement[attr]||document.body[attr];
    }else{
        document.documentElement[attr]=val;
        document.body[attr]=val;
    }
}