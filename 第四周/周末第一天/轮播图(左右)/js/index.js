/**
 * Created by 银鹏 on 2017/5/20.
 */
var banner=document.getElementById("banner");
var bannerInner=banner.getElementsByClassName("bannerInner")[0];
var focusList=banner.getElementsByClassName("focusList")[0];
//var left=banner.getElementsByTagName("a")[0];
//var right=banner.getElementsByTagName("a")[1];
var leftBtn=public.children(banner,"a")[0];
var rightBtn=public.children(banner,"a")[1];

var imgList=bannerInner.getElementsByTagName("img");
var list=focusList.getElementsByTagName("li");

//获取数据
function getData(){
    var xhr=new XMLHttpRequest();
    xhr.open("get","data.txt?ss="+Math.random(),false);
    xhr.onreadystatechange=function(){
        if(xhr.readyState==4&&xhr.status==200){
            window.data=public .toJsonObj(xhr.responseText);
        }
    };
    xhr.send(null);
}
getData();

//循环绑定数据
function bindData(){
    if(window.data&&window.data.length>0){
        var str1=``,str2=``;
        for(var i=0;i<data.length;i++){
            //轮播区域
            str1+=`<div><img src="" photo="${data[i].src}" alt=""/></div>`;
            //焦点区域,判断为第一个的时候加上默认选中的样式
            str2+=i===0?`<li class="selected"></li>`:`<li></li>`;
        }
        //为了实现无缝滚动,在最后添加一个跟第一张一样的内容
        str1+=`<div><img src="" photo="${data[0].src}" alt=""/></div>`;
        //先给bannerInner设置宽度
        public .css(bannerInner,{width:(data.length+1)*800});
        bannerInner.innerHTML=str1;
        focusList.innerHTML=str2;
    }
}
bindData();

//延迟加载图片
function delayLoad(){
    for(var i=0;i<imgList.length;i++){
        var curImg=document.createElement("img");
        curImg.src=imgList[i].getAttribute("photo");
        curImg.i=i;
        curImg.onload=function(){
            imgList[this.i].src=this.src;
            animation(imgList[this.i],{opacity:1},1000)
        }
    }
}
delayLoad();

//自动轮播
var step=0;
var timer=window.setInterval(move,2000);
function move(){
    if(step==data.length){
        step=0;
        public .css(bannerInner,"left",-step*800);
        //public .css(bannerInner,"left",0)
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
        step==data.length?list[0].className="selected":null;
        list[i].className=i==step?"selected":"";
    }
}

//鼠标滑过事件
banner.onmouseover=function(){
    window.clearInterval(timer);
    public .css(leftBtn,{display:"block"});
    public .css(rightBtn,{display:"block"});
};
banner.onmouseout=function(){
   timer=window.setInterval(move,2000) ;
    public .css(leftBtn,{display:"none"});
    public .css(rightBtn,{display:"none"});
};
//左右切换事件
var isOkClick=true;
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
            public.css(bannerInner,{left:-step*800});
        }
        step--;
        animation(bannerInner,{left:-step*800},1000,function(){
            isOkClick=true;
        });
        focusAlign();
    }
};

//焦点点击
for(var i=0;i<list.length;i++){
    //step=i;
    list[i].i=i;
    list[i].onclick=function(){
        if(isOkClick){
            isOkClick=false;
            step=this.i;
            animation(bannerInner,{left:-step*800},1000,function(){
                isOkClick=true;
            });
            focusAlign();
        }
    }
}

