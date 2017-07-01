/**
 * Created by 银鹏 on 2017/5/20.
 */
window.Banner=(function(){
    return function (id,url,duration){
        duration=duration||2000;
        var banner=document.getElementById(id);
        var bannerInner=public .children(banner,"div")[0];
        var focusList=public .children(banner,"ul")[0];
        var btnLeft=public .children(banner,"a")[0];
        var btnRight=public .children(banner,"a")[1];
        var imgList=bannerInner.getElementsByTagName("img");
        var list=focusList.getElementsByTagName("li");

        //获取数据
        ;(function(){
            var xhr=new XMLHttpRequest();
            xhr.open("get",url+"?$="+(new Date).getTime(),false);
            xhr.onreadystatechange=function(){
                if(xhr.readyState==4&&xhr.status==200){
                    banner.data=public.toJsonObj(xhr.responseText);
                }
            };
            xhr.send(null);
        })();

        //绑定数据
        ;(function(){
            if(banner.data&&banner.data.length>0){
                var str1=``,str2=``;
                for(var i=0;i<banner.data.length;i++){
                    str1+=`<div><img src="" photo="${banner.data[i].src}" alt=""/></div>`;
                    str2+=i===0?`<li class="selected"></li>`:`<li></li>`;
                    console.log(str1);
                }
                str1+=`<div><img src="" photo="${banner.data[0].src}" alt=""/></div>`;
                public .css(bannerInner,{width:(banner.data.length+1)*800});
                bannerInner.innerHTML=str1;
                focusList.innerHTML=str2;
            }
        })();
        //延迟加载
        ;(function(){
            for(var i=0;i<imgList.length;i++){
                var curImg=document.createElement("img");
                curImg.src=imgList[i].getAttribute("photo");
                curImg.i=i;
                curImg.onload=function(){
                    imgList[this.i].src=this.src;
                    animation(imgList[this.i],{opacity:1},1000)
                }
            }
        })();
        banner.step=0;
        banner.isOkClick=true;

        //自动轮播
        function autoMove(){
            banner.auto=true;
            banner.timer=window.setInterval(function(){
                move();
            },duration)
        }
        function move(){
            if(banner.step==banner.data.length){
                banner.step=0;
                public .css(bannerInner,{left:-banner.step*800});
            }
            banner.step++;
            animation(bannerInner,{left:-banner.step*800},1000,function(){
                banner.isOkClick=true;
            });
            focusAlign();
        }
        banner.onmouseover=function(){
            window.clearInterval(this.timer);
            btnLeft.style.display="block";
            btnRight.style.display="block";
        };
        banner.onmouseout=function(){
            this.timer=window.setInterval(move,duration);
            btnLeft.style.display="none";
            btnRight.style.display="none";
        };


        function hasAuto(){
            if(!banner.auto){
                banner.onmouseout=function(){
                    btnLeft.style.display="none";
                    btnRight.style.display="none";
                }
            }
        }
        //焦点对齐
        function focusAlign(){
            for(var i=0;i<list.length;i++){
                banner.step==banner.data.length?list[0].className="selected":null;
                list[i].className=i===banner.step?"selected":"";
            }
        }

        //绑定左右切换事件

        function btnClick(){
            btnRight.onclick=function(){
                if(banner.isOkClick){
                    banner.isOkClick=false;
                    move()
                }
                hasAuto();
            };
            btnLeft.onclick=function(){
                if(banner.isOkClick){
                    banner.isOkClick=false;
                    if(banner.step==0){
                        banner.step=banner.data.length;
                        public .css(bannerInner,{left:-banner.step*800})
                    }
                    banner.step--;
                    animation(bannerInner,{left:-banner.step*800},1000,function(){
                        banner.isOkClick=true;
                    });
                    focusAlign();

                }
                hasAuto();
            }
        }

        //焦点点击
        function focusClick(){
            for(var i=0;i<list.length;i++){
                list[i].i=i;
                list[i].onclick=function(){
                    if(banner.isOkClick){
                        banner.isOkClick=false;
                        banner.step=this.i;
                        animation(bannerInner,{left:-banner.step*800},1000,function(){
                            banner.isOkClick=true;
                        });
                        focusAlign();
                    }
                    hasAuto();
                }
            }
        }
        return{
            autoMove:autoMove,
            focusClick:focusClick,
            btnClick:btnClick
        }


    };
})();