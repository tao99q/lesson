/**
 * Created by Administrator on 2017/6/3.
 */
//基于EventTarget原型的事件库封装
EventTarget.prototype.on=function (type,callback,bool) {
    if(this.addEventListener){
        bool=bool||false;
        this.addEventListener(type,callback,bool);
    }else {
        if(!this[type+"Event"]){
            var _this=this;
            this[type+"Event"]=[];
            this.attachEvent("on"+type,function (e) {
                e=window.event;
                run.call(_this,e)
            });
        }
        var Event=this[type+"Event"];
        if(Event&&Event.length){
            for(var i=0;i<Event.length;i++){
                if(Event[i]==callback)return;
            }
        }
        Event.push(callback);
    }
};
EventTarget.prototype.off=function (type,callback,bool) {
    if(this.removeEventListener){
        bool=bool|false;
        this.removeEventListener(type,callback,bool)
    }else {
        var Event=this[type+"Event"];
        if(Event&&Event.length){
            for(var i=0;i<Event.length;i++){
                if(Event[i]==callback){
                    Event.splice(i,1);
                       // Event[i]=null;
                    break;
                }
            }
        }
    }
};
EventTarget.prototype.run=function (e) {
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
};