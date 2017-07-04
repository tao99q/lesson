/**
 * Created by Administrator on 2017/6/22.
 */
let bindData=function (result) {
    if(result&&result.code==0){
        let data=result.data,
            str=``;
        $.each(data,function (index,item) {
            let {id:userId,name:userName}=item;
            str+=`<li>
               <span>${userId}</span>
               <span>${userName}</span>
               <span>
                 <a href="javascript:;" data-id="${userId}">删除</a>
               </span>
               </li>`
        });
        $("#content").html(str);
    }
};
$.ajax({
    url:"/getAllUserList",
    type:"get",
    dataType:"json",
    async:false,
    data:null,
    success:function(data){
        console.log(data);
        bindData(data);
    },
    error:function (e) {
        console.log(e)
    }
});
$("li").on("click","a",function () {
    let userId=$(this).attr("data-id"),
        flag=confirm(`确定要删除ID为[ ${userId} ]的信息吗?`),
        _this=this;
    if(flag){
        $.ajax({
            url:"/removeUser",
            type:"get",
            dataType:"json",
            data:{
                id:userId
            },
            async:false,
            cache:false,
            success:function (result) {
                if(result&&result.code==0){
                    alert("亲,你把我删了,就再也回不来了");
                    $("#content")[0].removeChild(_this.parentNode.parentNode)
                }else {
                    alert("哈哈,你删不了我的!")
                }
            },
            error:function (e) {
                console.log(e)
            }
        })
    }
})