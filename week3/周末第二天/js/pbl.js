/**
 * Created by 银鹏 on 2017/5/14.
 */
var oUls=document.getElementsByTagName("ul");
oUlAry=public.toArray(oUls);
function appendToUl(){
    for(var i=0;i<25;i++){
        oUlAry.sort(function(a,b){
            return public.css(a,"height")-public.css(b,"height")
        });
        oUlAry[0].appendChild(createLi())

    }
}
appendToUl();
function createLi(){
    var li=document.createElement("li");
    var img=document.createElement("img");
    var p=document.createElement("p");
    p.innerHTML="你好!这张图片不错,收藏一下吧!嘿嘿嘿嘿嘿嘿~~~";
    img.src="img/"+public .getRandom(1,33)+".jpg";
    public .css(li,"height",public.getRandom(250,500));
    li.appendChild(img);
    li.appendChild(p);
    fadeIn(img);
    return li;
}

window.onscroll=function(){
    var sT=public.win("scrollTop");
    if(sT>=public.win("scrollHeight")-(public.win("clientHeight")*1.5)){
        appendToUl();
    }
};

function fadeIn(ele){
    ele.timer=window.setInterval(function(){
        var opacity=public .css(ele,"opacity");
        if(opacity>=1){
            window.clearInterval(ele.timer);
            public .css(ele,"opacity",1);
            return;
        }
        public .css(ele,"opacity",opacity+=0.01);
    },1)
}