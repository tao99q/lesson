/**
 * Created by Administrator on 2017/6/3.
 */
function on(ele,type,callback,bool) {
    //"selfdown"
    //if(/^self/.test(type)){}
    //if(ele["on"+type]){}
    if(/^self/.test(type)){
        //自定义事件
        if(!ele[type+"Event"]) {
            ele[type + "Event"] = [];
        }
        pushCB(ele,type,callback)
    }else {
        if(ele.addEventListener){
           //标准浏览器
            bool=bool||false;
            ele.addEventListener(type,callback,bool)
        }else {
            //低版本浏览器
            if(!ele[type+"Event"]) {
                ele[type + "Event"] = [];
                ele.attachEvent("on"+type,function () {
                    run.call(ele,window.event)
                })
            }
            pushCB(ele,type,callback)
        }
    }
}
function off(ele,type,callback,bool) {
    if(ele.removeEventListener&&!/^self/.test(type)){
        //标准浏览器
        bool=bool||false;
        ele.removeEventListener(type,callback,bool)
    }else {
        //低版本
        var Event=this[type+"Event"];
        if(Event&Event.length){
            for(var i=0;i<Event.length;i++){
                if(Event[i]==callback){
                    Event.splice(i,1);
                    break;
                }
            }
        }
    }
}
function pushCB(ele,type,callback) {
    var Event=ele[type+"Event"];
    if(Event&&Event.length){
        for(var i=0;i<Event.length;i++){
            if(Event[i]==callback)return
        }
    }
    Event.push(callback);
}
function run(e) {
    e.target=e.srcElement;
    e.pageX=(document.documentElement.scrollLeft||document.body.scrollLeft)+e.clientX;
    e.pageY=(document.documentElement.scrollTop||document.body,screenTop)+e.clientY;
    e.preventDefault=function () {
        e.returnValue=false;
    };
    e.stopPropagation=function () {
        e.cancelBubble=true;
    };
    var Event=this[e.type+"Event"];
    if(Event&&Event.length){
        for(var i=0;i<Event.length;i++){
            if(typeof   Event[i]=="function"){
                Event[i].call(this,e);
            }
        }
    }
}
function fire(ele,type,e) {
    var selfEvent=ele[type+"Event"];
    if(selfEvent&&selfEvent.length){
        for (var i=0;i<selfEvent.length;i++){
            if(typeof selfEvent[i]=="function"){
                selfEvent[i].call(ele);
            }
        }
    }
}


