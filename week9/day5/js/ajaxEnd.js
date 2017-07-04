/**
 * Created by Administrator on 2017/6/24.
 */
(function () {
    let codeData=(data)=>{
        //key1=value1&key2=value2
        if(typeof data=="object"){
            let temp=``;
            for (let key in data){
                if (data.hasOwnProperty(key)){
                    temp+=`${key}=${encodeURIComponent(data[key])}&`;
                }
            }
            //将最后的& 去掉
            data=temp.replace(/&$/,"");
            //data:key1=value1&key2=value2
        }
        //将value值编码
        return data;
    };
    //检测原来的url中是否有?,如果有&,没有返回?
    let checkMark=(url)=>(url.indexOf("?")>-1?"&":"?");
   let ajax=function (xhrObj) {
       let _default={
           url:null,
           method:"GET",
           data:null,
           dataType:"text",
           cache:true,
           async:true,
           success:null
       };
       for(let key in xhrObj){
           if(xhrObj.hasOwnProperty(key)){
               if(key == "type"){
                   _default["method"]=xhrObj["type"];
                   continue;
               }
               _default[key]=xhrObj[key];
           }
       };
       let regGET=/(GET|DELETE|HEAD)/i;
       if(regGET.test(_default.method)){
           //在这里面做一些处理,参数,缓存的问题
           if(_default.data!==null){
               _default.url+=`${checkMark(_default.url)}${codeData(_default.data)}`;
           }
           //缓存
           if(_default.cache==false){
               //这里也需要判断之前的url有没有问号
               _default.url+=`${checkMark(_default.url)}_=${new Date().getTime()}`
           }
       }
       let xhr=new XMLHttpRequest;
       xhr.open(_default.method,_default.url,_default.async);
       xhr.onreadystatechange=function () {
           if(!/^(2|3)\d{2}$/.test(xhr.status))return;
           if(xhr.readyState!==4)return;
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
               result=""
           }
           typeof _default.success=="function"?_default.success.call(xhr,result):null;
       };
       if(regGET.test(_default.method)){
           xhr.send(null)
       }else {
           _default.data=codeData(_default.data);
           xhr.send(_default.data);
       }
   } ;
   window.ajax=ajax;
})();