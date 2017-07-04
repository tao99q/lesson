/**
 * Created by 银鹏 on 2017/5/21.
 */
(function(){
    function banner(url,interval){
        //this 是当前执行轮播的JQ对象
        var $inner=this.children(".bannerInner");
        var $tip=this.children(".bannerTip");
        var $left=this.children("a").eq(0);
        var $right=this.children("a").eq(1);
        var $data=null;
        var $imgList=null;
        var $list=null;
        var $divList=null;
        var $step=0;
        var $interval = interval||3000;
        var $timer=null;
        //1.获取数据
        $.ajax({
            type:"get",
            url:url+"?$="+new Date().getTime(),
            dataType:"json",
            async :false,
            data:null,
            success:function(data){
                $data=data;
                console.log($data);
            },
            error:function(){
                console.log("error!")
            }
        });
        //2.数据绑定
        ;(function(){
            if($data&&$data.length>0){
                var str1=``,str2=``;
                $.each($data,function(index,item){
                    str1+=`<div><img src="" trueImg="${item['img']}" alt=""/></div>`;
                    str2+=index===0?`<li class="bg"></li>`:`<li></li>`;
                });
                $inner.html(str1);
                $tip.html(str2);
                $imgList=$inner.find("img");
                $list=$tip.children("li");
                $divList=$inner.children("div");
            }
        })();

        //3延迟加载 在第一屏幕的时候一般都是给他一个定时器,到点了再加载
        function delayLoad(){
            $imgList.each(function(index,item){
                //item==this 原生的对象
                var _this=this;
                var curImg=new Image;
                //var curImg=document.createElement("img");
                curImg.src=$(this).attr("trueImg");
                curImg.onload=function(){
                    $(_this).prop("src",this.src).css({display:"block"});
                }
            });
            $divList.eq(0).css({zIndex:1}).stop().animate({opacity:1},1000);
        };
        window.setTimeout(delayLoad,500);

        //4.封装个轮播效果
        function changeBanner(){
            //$step就是当前要显示的那个div的索引
            var $div=$divList.eq($step);
            $div.css({zIndex:10}).siblings().css({zIndex:0});
            $div.stop().animate({opacity:1},500,function(){
                $(this).siblings().css({opacity:0});
            });
            //焦点对齐
            $list.eq($step).addClass("bg").siblings().removeClass("bg");
        }
        //5 自动轮播
        function move(){
            if($step==$data.length-1){
                $step=-1;
            }
            $step++;
            changeBanner();
        }
        $timer=window.setInterval(move,$interval);
        //6 鼠标滑过事件
        this.mouseover(function(){
            window.clearInterval($timer);
            $left.css({display:"block"});
            $right.css({display:"block"});
        }).mouseout(function(){
            $timer=window.setInterval(move,$interval);
            $left.css({display:"none"});
            $right.css({display:"none"});
        });

        //7.左右切换事件
        $right.click(function(){
            move();
        });
        $left.click(function(){
            if($step==0){
                $step=$data.length;
            }
            $step--;
            changeBanner();
        });

        //8.焦点切换
        $list.click(function(){
            //this -->li
            $step=$(this).index();
            changeBanner();
        })

    };

    //将banner方法扩展到JQ的原型上
    jQuery.fn.extend({
        banner:banner
    })
})();
