/**
 * Created by 银鹏 on 2017/5/17.
 */
//创建一个Banner类
function Banner(id,url,interval){
    //this是个实例
    //var banner=document.getElementById("banner");
    this.banner=document.getElementById(id);
    this.bannerInner=this.banner.getElementsByClassName("bannerInner")[0];
    this.focusList=this.banner.getElementsByClassName("focusList")[0];
    this.leftBtn=public.children(this.banner,"a")[0];
    this.rightBtn=public.children(this.banner,"a")[1];
    this.imgList=this.bannerInner.getElementsByTagName("img");
    this.list=this.focusList.getElementsByTagName("li");
    this.url=url;
    this.data=null;
    this.step=0;
    this.timer=null;
    this.isOkClick=true;
    this.interval=interval||2000;
}

//公有属性方法
//获取数据:getData
Banner.prototype.getData=function(){
    //this 如果是实例去执行这个方法,this就是实例
    var _this=this;
    var xhr=new XMLHttpRequest();
    xhr.open("GET",this.url+"?_="+Math.random(),false);
    xhr.onreadystatechange=function(){
        //this==xhr
        if(xhr.readyState==4&&xhr.status==200){
            _this.data=public .toJsonObj(xhr.responseText)
        }
    };
    xhr.send(null);
} ;

//公有方法bindData 绑定数据
Banner.prototype.bindData=function(){
    if(this.data){
        var str1=``,str2=``;
        for(var i=0;i<this.data.length;i++){
            str1+=`<div><img src="" photo="${this.data[i].src}" alt=""/></div>`;
            str2+=i===0?`<li class="selected"></li>`:`<li></li>`
        }
    }
    this.bannerInner.innerHTML=str1;
    this.focusList.innerHTML=str2;
};

//公有方法imgDelay 延迟加载
Banner.prototype.imgDelay=function(){
    var _this=this;
    for(var i=0;i<this.imgList.length;i++){
        var curImg=document.createElement("img");
        curImg.i=i;
        curImg.src=this.imgList[i].getAttribute("photo");
        curImg.onload=function(){
            _this.imgList[this.i].src=this.src;
            if(this.i==0){
                public .css(_this.imgList[0].parentNode,"zIndex",1);
                animation(_this.imgList[0].parentNode,{opacity:1},1000);
            }
        }
    }
};

//公有方法move
Banner.prototype.move=function(){
    console.log(this);
    this.step++;
    if(this.step==this.data.length){
        this.step=0;
    }
    this.setImg();
};

//公有方法setImg
Banner.prototype.setImg=function(){
    var _this=this;
    for(var i=0;i<this.imgList.length;i++){
        if(i==this.step){
            public .css(this.imgList[i].parentNode,"zIndex",1);
            animation(this.imgList[i].parentNode,{opacity:1},1000,function(){
                var sib=public .siblings(this);
                for(var i=0;i<sib.length;i++){
                    public .css(sib[i],{opacity:0});
                }
                _this.isOkClick=true;
            })
        }else{
            public .css(this.imgList[i].parentNode,"zIndex",0);
        }
    }
    for(var i=0;i<this.list.length;i++){
        this.list[i].className=i==this.step?"selected":"";
    }
};

//公有方法mouseEvent
Banner.prototype.mouseEvent=function(){
    //this
    var _this=this;
    this.banner.onmouseover=function(){
        //this==this.banner
        window.clearInterval(_this.timer);
        _this.leftBtn.style.display="block";
        _this.rightBtn.style.display="block";
    };
    this.banner.onmouseout=function(){
        _this.timer=window.setInterval(function(){
            _this.move();
        },_this.interval);
        _this.leftBtn.style.display="none";
        _this.rightBtn.style.display="none";
    }
};

//公有方法 btnClick 左右切换
Banner.prototype.btnClick=function(){
    var _this=this;
    this.rightBtn.onclick=function(){
        //this==this.rightBtn
        if(_this.isOkClick){
            _this.isOkClick=false;
            _this.move();
        }
    };
    this.leftBtn.onclick=function(){
        if(_this.isOkClick){
            _this.isOkClick=false;
            if(_this.step==0){
                _this.step=_this.data.length
            }
            _this.step--;
            _this.setImg();
        }
    }
};

//公有方法 focusClick
Banner.prototype.focusClick=function(){
    var _this=this;
    for(var i=0;i<this.list.length;i++){
        this.list[i].i=i;
        this.list[i].onclick=function(){
            if(_this.isOkClick){
                _this.isOkClick=false;
                _this.step=this.i;
                _this.setImg();
            }
        }
    }
};

//公有方法 init初始化
Banner.prototype.init=function(){
    var _this=this;
    this.getData();
    this.bindData();
    this.imgDelay();
    this.timer=window.setInterval(function(){
        //this->window
        _this.move();
    },this.interval);
    this.mouseEvent();
    this.btnClick();
    this.focusClick();
};