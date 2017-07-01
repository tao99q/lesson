/**
 * Created by 银鹏 on 2017/5/17.
 */
var banner=document.getElementById("banner");
var bannerInner=banner.getElementsByClassName("bannerInner")[0];
var focusList=banner.getElementsByClassName("focusList")[0];
var leftBtn=public.children(banner,"a")[0];
var rightBtn=public.children(banner,"a")[1];
var imgList=bannerInner.getElementsByTagName("img");
var list=focusList.getElementsByTagName("li");

//获取数据 ajax
function getData(){
    var xhr=new XMLHttpRequest();
    xhr.open("get","data.txt?_="+Math.random(),false);
    xhr.onreadystatechange=function(){
        if(xhr.readyState===4&&xhr.status===200){
            window.data=public.toJsonObj(xhr.responseText);
        }
    };
    xhr.send(null)
};

//绑定数据
function bindData(){
    if(window.data){
        var str1=``,str2=``;
        for(var i=0;i<data.length;i++){
            //轮播区域
            str1+=`<div><img src="" photo="${data[i].src}"  alt=""/></div>`;
            //焦点区域
            str2+=i===0?`<li class="selected"></li>`:`<li></li>`;
        }
        bannerInner.innerHTML=str1;
        focusList.innerHTML=str2;
    }
}


//图片的延迟加载
function imgDelay(){
    for(var i=0;i<imgList.length;i++){
        var curImg=document.createElement("img");
        curImg.src=imgList[i].getAttribute("photo");
        curImg.i=i;
        curImg.onload=function(){
            imgList[this.i].src=this.src;
            if(this.i==0){
                //因为图片是放在div中所以我们要改变的是父级元素div的层级关系和透明度
                public .css(imgList[0].parentNode,"zIndex",1);
                animation(imgList[0].parentNode,{opacity:1},1000)
            }
        }
    }
};


//自动播放
var step=0;//记录索引
var timer=null;

function move(){
    step++;
    if(step==data.length){
        step=0;
    }
    //循环所有的图片,判断图片的索引是否等于step,等step 那张图片,先把他的层级关系设为1然后再去让他的透明度不断增加到1,
    setImg();
}
function setImg(){
    //图片的切换
    for(var i=0;i<imgList.length;i++){
        if(i==step){
            public .css(imgList[i].parentNode,{zIndex:1});
            animation(imgList[i].parentNode,{opacity:1},1000,function(){
               //获取当前元素的所有兄弟 得到一个数组,循环数组让所有的兄弟透明度都变成0
                var sib=public .siblings(this);
                for(var i=0;i<sib.length;i++){
                    public .css(sib[i],{opacity:0})
                }
                isOkClick=true;
            })
        }else{
            public .css(imgList[i].parentNode,{zIndex:0})
        }
    }
    //让焦点同步
    for(var i=0;i<list.length;i++){
        list[i].className=i==step?"selected":"";
    }
};

//鼠标滑过事件
function mouseEvent(){
    banner.onmouseover=function(){
        //停止切换 清掉定时器
        window.clearInterval(timer);
        public .css(leftBtn,"display","block");
        public .css(rightBtn,"display","block");
    };
    banner.onmouseout=function(){
        timer=window.setInterval(move,3000);
        public .css(leftBtn,"display","none");
        public .css(rightBtn,"display","none");
    };
}

//左右切换
var isOkClick=true;
function btnClick(){
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
            }
            step--;
            setImg();
        }
    };
}

//焦点绑定点击事件
function focusClick(){
    for(var i=0;i<list.length;i++){
        list[i].i=i;
        list[i].onclick=function(){
           if(isOkClick){
               isOkClick=false;
               step=this.i;
               setImg()
           }
        }
    }
}


getData();
bindData();
imgDelay();
timer=window.setInterval(move,3000);
mouseEvent();
btnClick();
focusClick();


