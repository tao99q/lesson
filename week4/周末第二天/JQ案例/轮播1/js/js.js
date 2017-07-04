/**
 * Created by 银鹏 on 2017/5/21.
 */
$(function(){
    $.ajax({
        type:"GET",
        url:"data.txt?$="+new Date().getTime(),
        dataType:"json",
        async :false,
        data:null,
        success:function(data){
            console.log("success!");
            window.data=data;
        },
        error:function(){
            console.log("error!!");
        }
    });
    console.log(data);

    //默认让第一个显示
    display($("#rotmenu li:first"));
    //自动轮播
    window.step=0;
    window.timer=window.setInterval(move,3000);
    function move(){
        step++;
        if(step==$("#rotmenu").children().length){
            //step==$("#rotmenu").children().size()
            step=0;
            //display($("#rotmenu li[class=li"+step+"]"));
            //return;
        }
        //每次执行动画的那个Li传进来,索引为step的那个li,正好他的class="li"+step;
        display($("#rotmenu li[class=li"+step+"]"));
    }
    function display($ele){
        //要求你传进来的是个JQ对象
        //$ele就是对应的那个执行动画的li,但是是个JQ对象

        //让当前li中的a标签执行动画(marginRight:20px).然后再让其他的li中的a标签变为,默认状态
        //现在的JQ对象是A标签,我们先找到a标签的父亲li,再找li的兄弟们,然后兄弟们下面的a标签,让他们回到初始状态
        $ele.children("a").stop().animate({marginRight:20},400,function(){
            $(this).animate({opacity:1},700);
            //切换图片,找到rot1下面的img将他的src属性改变成当前对应的data中的image属性中的值,先让他的opacity变成0 ,在逐渐变成1
            $("#rot1").children("img").prop("src",data[step]["image"]).css({opacity:0}).stop().animate({opacity:1},2000);
            //heading显示,先让heading出去,然后在将里面的h1标签中文字加上(在data中的"heading"属性中),再让他从左边运动过来
            $("#rot1 .heading").stop().animate({left:-420},700,"easeOutCirc",function(){
                //获取$this中的h标签
                $("h1",$(this)).html(data[step]["heading"]);
                //"easeInOutQuad"JQ中的动画
                $(this).animate({left:0},400,"easeInOutQuad")
            });
            //description 显示: 先让他下去,然后在他的p标签上加上文字(data["description"]),再让他上来
            $("#rot1 .description").stop().animate({bottom:-270},700,"easeOutCirc",function(){
                $("p",$(this)).html(data[step]["description"]);
                $(this).stop().animate({bottom:0},400,"easeInOutQuad")
            })

        }).parent().siblings().find("a").stop().animate({marginRight:-20},400,function(){
            $(this).animate({opacity:0.6},700);
        })
    }
});