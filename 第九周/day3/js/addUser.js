/**
 * Created by Administrator on 2017/6/22.
 */
$("#submit").click(function () {
    $.ajax({
        url:"/addUserInfo",
        type:"post",
        dataType:"json",
        async:false,
        data:{
            name:$("#userName").val()
        },
        cache:false,
        success:function (result) {
            console.log(result);
            if (result&&result.code===0){
                alert("亲!你增加了一个用户信息哦!");
                window.location.href="index.html";
            }else {
                alert("哎!增加失败了哦!")
            }
        },
        error:function (e) {
            console.log(e)
        }
    })
})