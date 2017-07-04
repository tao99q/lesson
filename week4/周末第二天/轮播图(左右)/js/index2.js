/**
 * Created by 银鹏 on 2017/5/17.
 */
var banner=document.getElementById("banner");
var bannerInner=banner.getElementsByClassName("bannerInner")[0];
var focusList=banner.getElementsByClassName("focusList")[0];
var leftBtn=public .children(banner,"a")[0];
var rightBtn=public .children(banner,"a")[1];
var imgList=bannerInner.getElementsByTagName("img");
var list=focusList.getElementsByTagName('li');
var step=0,timer=null,isOkClick=true;
//获取数据
;(function(){
    var xhr=new  XMLHttpRequest();
    xhr.open("get","data.txt?_="+Math.random(),false);
    xhr.onreadystatechange=function(){
        if(xhr.readyState===4&&xhr.status==200){
            window.data=public.toJsonObj(xhr.responseText);
        }
    };
    xhr.send(null);
})();

//绑定数据
;(function(){
    if(window.data){
        var str1=``,str2=``;
        for(var i=0;i<data.length;i++){
            str1+= `<div><img src="" photo="${data[i].src}" alt=""/></div>`;
            str2+=i==0?`<li class="selected"></li>`:`<li></li>`;
        }
        str1+=`<div><img src="" photo="${data[0].src}" alt=""/></div>`;
        public .css(bannerInner,"width",(data.length+1)*800);
        bannerInner.innerHTML=str1;
        focusList.innerHTML=str2;
    }
})();

//图片的延迟加载
function delayLoad(){
    for(var i=0;i<imgList.length;i++){
        var curImg=document.createElement("img");
        curImg.src=imgList[i].getAttribute("photo");
        curImg.i=i;
        curImg.onload=function(){
            imgList[this.i].src=this.src;
            animation(imgList[this.i],{opacity:1},1000);
        }
    }
}
delayLoad();
//自动轮播
timer=window.setInterval(move,2000);

function move(){
    if(step==data.length){
        step=0;
        public .css(bannerInner,{left:-step*800});
    }
    step++;
    animation(bannerInner,{left:-step*800},1000,function(){
        isOkClick=true;
    });
    focusAlign();
}

//焦点对齐
function focusAlign(){
    for(var i=0;i<list.length;i++){
        if(step==4){
            list[0].className="selected";
        }
        list[i].className=i===step?"selected":"";
    }
}
//鼠标滑过事件

banner.onmouseover=function(){
    window.clearInterval(timer);
    public .css(leftBtn,{display:"block"});
    public .css(rightBtn,{display:"block"});
};
banner.onmouseout=function(){
    timer=window.setInterval(move,2000);
    public .css(leftBtn,{display:"none"});
    public .css(rightBtn,{display:"none"});
};

//左右切换事件
rightBtn.onclick=function(){
    if(isOkClick){
        isOkClick=false;
        move()
    }
};
leftBtn.onclick=function(){
    if(isOkClick){
        isOkClick=false;
        if(step==0){
            step=data.length;
            public .css(bannerInner,{left:-step*800});
        }
        step--;
        animation(bannerInner,{left:-step*800},1000,function(){
            isOkClick=true;
        });
        focusAlign();
    }
};

//焦点事件
;(function(){
    for(var i=0;i<list.length;i++){
        list[i].i=i;
        list[i].onclick=function(){
            step=this.i;
            animation(bannerInner,{left:-step*800},1000);
            focusAlign();
        }
    }
})();