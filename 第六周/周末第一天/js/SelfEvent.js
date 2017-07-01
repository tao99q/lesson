/**
 * Created by Administrator on 2017/6/3.
 */
/*
* 自定义事件 ，就相当于自定义属性，是你自己给他起的名字，浏览器是不认识的，那就不会自动触发，只能你去手动的触发 （那么浏览器就不会给他传一个事件对象），就写一个fire这个方法来触发自定义事件
* 自定义事件也是需要绑定方法，就写一个on来绑定
* 自定义事件中的绑定的方法也是可以移除的，off()
*
* 自定义的事件的这个几个方法，不仅仅是某个对象可以使用，我们想通过对象.on,对象.off,对象.fire, 如果私有属性，每一个对象都需要加上这三个属性，这样就失去意义了，所以我们把它当做公有属性就好了，那就写在某个类的原型上
*
* */
function SelfEvent() {}
SelfEvent.prototype.on=function (type,callback) {
   //this  实例
    if(!this[type+"Self"]){
       this[type+"Self"]=[];
    }
    var selfEvent=this[type+"Self"];
    if(selfEvent&&selfEvent.length){
        for(var i=0;i<selfEvent.length;i++){
            if(selfEvent[i]==callback)return
        }
    }
    selfEvent.push(callback);
};
SelfEvent.prototype.off=function (type,callback) {
    var selfEvent=this[type+"Self"];
    if(selfEvent&&sel.length){
        for(var i=0;i<selfEvent.length;i++){
            if(selfEvent[i]==callback){
                selfEvent.splice(i,1);
                break;
            }
        }
    }
};
SelfEvent.prototype.fire=function () {
    var selfEvent=this[type+"Self"];
    if(selfEvent&&selfEvent.length){
        for (var i=0;i<selfEvent.length;i++){
            if(typeof selfEvent[i]=="function"){
                selfEvent[i].call(this);
            }
        }
    }
};


// function changeThis(fn,context,e) {
//      return fn.bind(context,e)
// }

var obj=new SelfEvent();
function f1() {
    console.log(this);
}
obj.on("eat",f1);


