/**
 * Created by Administrator on 2017/6/24.
 */

(function () {
    //处理xhr创建方式的兼容问题
    function createXHR() {
        var xhr=null,
            ary=[
                function () {
                    return new XMLHttpRequest;
                },
                function () {
                    return new ActiveXObject("Microsoft.XMLHTTP");
                },
                function () {
                    return new ActiveXObject("Msxml2.XMLHTTP");
                },
                function () {
                    return new ActiveXObject("Msxml3.XMLHTTP");
                }
            ];
        for (var i=0;i<ary.length;i++){
            try {
                xhr=ary[i]();
                createXHR=ary[i];
                break
            }catch (e){}
        }
        return xhr;
    };
    let ajax=function (xhrObj) {
        //1.先给传递的参数设置默认值,当执行ajax的时候,穿的参数就会覆盖掉,有些属性没穿,就使用默认值;
        let _default={
            url:null,
            method:"GET",
            data:null,
            dataType:"text",//"dataType"值并不会影响服务器的返回值(服务器返回给你的数据一般就只字符串和XML格式的),这里的类型是前端封装库的时候自己对返回数据做的处理,
            cache:true,
            async:true,
            success:null
        };
        //2.将传进来的对象xhrObj跟默认的_default关联起来
        for(let key in xhrObj){
            //过滤公有属性,只保留私有属性
            if(xhrObj.hasOwnProperty(key)){
                //如果传进来的是type,就把值归属到method上即可,这俩属性的左右是一样的
                if(key=="type"){
                    _default["method"]=xhrObj["type"];
                    continue;
                }
                _default[key]=xhrObj[key];
            }
        };

        //3发送AJAX请求 get系列,post系列
        //写一个正则来匹配get系列
        let regGET=/(GET|DELETE|HEAD)/i;
        //1)创建一个AJAX对象实例
        let xhr=createXHR();
        //2) open 打开一个url
        xhr.open(_default.method,_default.url,_default.async);
        //3) 监听状态码改变情况
        xhr.onreadystatechange=function () {
          //HTTP状态码  以2或者3开头是成功的,其余是失败的,在这里失败暂时不做处理,
            if(!/^(2|3)\d{2}$/.test(xhr.status))return;
            //如果失败直接的话.直接return;
            if(xhr.readyState!==4)return;
            //下面的代码代表响应主体被客户端接收成功
            //获取响应主体,服务器返回的一般都是字符串或者XML,我们需要根据传进来的dataTYpe的值,将响应主体变成我们想要的数据类型,如果不能正常转换,返回空字符串即可
            let result=xhr.responseText;
            try {
                switch (_default.dataType.toUpperCase()){
                    case "JSON":
                        result="JSON" in window?JSON.parse(result):eval("("+result+")");
                        break;
                    case "XML":
                        result=xhr.responseXML;
                        break;
                }
            }catch (e){
                result="";
            }
            //触发成功的回调函数执行:回调函数中的this变成当前的xhr对象,将result(响应主体)这个值传给这个回调函数
            typeof  _default.success=="function"?_default.success.call(xhr,result):null;
        };
        //4) send发送
        regGET.test(_default.method)?xhr.send(null):xhr.send(_default.data);

    };
    window.ajax=ajax;
})();

//还没有处理的问题
/*
* 1.get方式参数拼接到url上 key1=value1&key2=value2
* 2.给value1,value2编码
* 3.cache:false 做清除缓存处理
* 4.post方式  send(字符串)
* */