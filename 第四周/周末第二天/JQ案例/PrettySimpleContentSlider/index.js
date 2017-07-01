/**
 * Created by mengqian on 2017/5/20.
 */
$(function () {
    $.ajax({
        type: 'get',
        url: 'data.txt?_=' + Math.random(),
        dataType: 'json', // html text
        async: true, // true/false
        cache: true, // true/false 缓存
        data: null, // 参数, 提交给后台的参数
        success: function (data) {
            // data: 成功之后获取到的数据
            window.data = data;
        },
        error: function () {

        }
    });
    console.log($("#rotmenu").children("li").length);
    var step = 0;
    display($("#rotmenu li:first"));
    function move() {
        if (step == $("#rotmenu").children().length) {
            step = 0;
            display($("#rotmenu li[class=li" + (step) + "]"));
            return;
        }
        step++;
        display($("#rotmenu li[class=li" + step + "]"));
    }

    window.timer = window.setInterval(move, 3000);

    $("#rotmenu li a").click(function () {
        window.clearInterval(window.timer);
        step=$(this).index();
        display(this);
        return false;
    });
    function display($ele) {
        $ele.children("a").stop().animate({marginRight: 20}, 400, function () {
            $(this).animate({opacity: 1}, 700);
            $('#rot1 .heading').animate({'left': '-420px'}, 700, 'easeOutCirc', function () {
                $('h1', $(this)).html(data[step].heading);
                $(this).animate({'left': '0px'}, 400, 'easeInOutQuad');
            });
            $('#rot1 .description').animate({'bottom': '-270px'}, 700, 'easeOutCirc', function () {
                $('p', $(this)).html(data[step]["description"]);
                $(this).animate({'bottom': '0px'}, 400, 'easeInOutQuad');
            });
            $("#rot1").children("img").attr("src",data[step]["image"]).css("opacity",0).animate({opacity:1},2000)

        }).parent().siblings().find("a").animate({marginRight: -20}, 300, function () {
            $(this).animate({opacity: 0.6}, 700);
        })
    };

});
