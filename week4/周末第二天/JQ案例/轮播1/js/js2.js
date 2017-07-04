/**
 * Created by 银鹏 on 2017/5/21.
 */
$(function(){
    //获取数据
    $.ajax({
            type:"GET",
            url:"data.txt?_="+new  Date().getTime(),
            dataType:"json",
            async:false,
            data:null,
            success:function(data){
                window.data=data;
            },
            error:function(){
                console.log("error!!");
            }
        });

    window.timer=null;
    window.step=0;
    function move(){
        step++;
        if(step==$("#rotmenu").children().size()){
            step=0;
        }
        display($("#rotmenu li[class=li"+step+"]"));
    };

    function display($ele){
        $("a",$ele).stop().animate({marginRight:20},500,function(){
            $(this).stop().animate({opacity:1},700);
            //图片切换
            $("#rot1").children("img").prop("src",data[step]["image"]).css({opacity:0}).stop().animate({opacity:1},2000);

            //heading
            $("#rot1 .heading").stop().animate({left:-420},700,"easeOutCirc",function(){
                $("h1",$(this)).html(data[step]["heading"]);
                $(this).stop().animate({left:0},500,"easeInOutQuad")
            });

            //description
            $("#rot1 .description").stop().animate({bottom:-270},700,"easeOutCirc",function(){
                $("p",$(this)).html(data[step]["description"]);
                $(this).stop().animate({bottom:0},400,"easeInOutQuad");
            })
        }).parent().siblings().find("a").stop().animate({marginRight:-20},400,function(){
            $(this).stop().animate({opacity:0.6},700);
        })
    };

    display($("#rotmenu li:first"));
    timer=window.setInterval(move,3000);
});