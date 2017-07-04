/**
 * Created by Administrator on 2017/6/3.
 */
//面向对象版的订阅发布（自定义事件）
//创建一个EventEmitter类
function EventEmitter() {}
//这里绑定的是自定义事件
EventEmitter.prototype.on=function (type,fn) {
    //订阅 自定义事件的绑定
    //this 实例
    if(!this[type+"Event"]){
        this[type+"Event"]=[];
        //1.把所有跟该行为有关的函数方法放到一个数组中，这个数组存在这个实例的自定义属性type+“Event”上
    }
    //2.根据传进来的类型type，找到对应的数组
    var eventArray=this[type+"Event"];
    //3.eventArray存在并且length>0的时候循环数组，
    if(eventArray&&eventArray.length){
        for(var i=0;i<eventArray.length;i++){
            //4.添加之前判断如果数组中有了fn，直接return
            if(eventArray[i]==fn)return
        }
    }
    //5.如果能执行到这，说明数组中没有fn，push到数组中
    eventArray.push(fn);
};
EventEmitter.prototype.off=function (type,fn) {
    //1.根据你传进来的type找到对应的数组(你增加的时候起的什么名字，这里获取就用什么名字)
    var eventArray=this[type+"Event"];
    //2.eventArray存在并且length>0的时候循环数组，找到fn，从数组中删除这一项，也可以赋值为null（如果这样赋值后，千万记得在fire中让函数执行的时候一定要判断一下，只有是函数才让他执行，否则会报错 null is not a function ）
    if(eventArray&&eventArray.length){
        for(var i=0;i<eventArray.length;i++){
            if(eventArray[i]==fn){
                eventArray.splice(i,1);
                break;
            }
        }
    }
};
EventEmitter.prototype.fire=function (type,e) {
    //1.根据你传进来的type找到对应的数组(你增加的时候起的什么名字，这里获取就用什么名字)
    var eventArray=this[type+"Event"];
    //2.eventArray存在并且length>0的时候循环数组,让数组中每一个函数执行，执行之前先判断当前这一项是不是个函数（typeof）,执行的时候将里面的this变成当前实例。
    if(eventArray&&eventArray.length){
        for(var i=0;i<eventArray.length;i++){
            if(typeof eventArray[i]=="function"){
                eventArray[i].call(this,e);
            }
        }
    }
};

//面向对象版拖拽
Drag.prototype=new EventEmitter();
//原来的constructor没有了
Drag.prototype.constructor=Drag;
//Drag.prototype.__proto__=EventEmitter.prototype
//Drag的实例.on
//Drag的实例.__proto__.__proto__=EventEmitter.prototype.on
function Drag(ele) {
    //ele被拖拽的元素
    this.ele=ele;
    this.x=this.y=this.maxL=this.maxT=null;
    var _this=this;
    this._down=function (e) {
        //this==this.ele
        _this.down.call(_this,e);
    };
    this._move=function (e) {
        _this.move.call(_this,e);
    };
    this._up=function (e) {
        _this.up.call(_this,e);
    };
    //on(this.ele,"mousedown",this.down) down中的this就是this.ele
    //把down中的this变成当前实例
    on(this.ele,"mousedown",this._down)
}
Drag.prototype.down=function (e) {
    //this 就是当前实例,this.ele是被拖拽的元素
    this.x=e.clientX-this.ele.offsetLeft;
    this.y=e.clientY-this.ele.offsetTop;
    this.maxL=this.ele.parentNode.offsetWidth-this.ele.offsetWidth;
    this.maxT=this.ele.parentNode.offsetHeight-this.ele.offsetHeight;
    on(document,"mousemove",this._move);
    on(document,"mouseup",this._up);
    e.preventDefault();
};
Drag.prototype.move=function (e) {
    var l=e.clientX-this.x;
    var t=e.clientY-this.y;
    l=l<0?0:(l>this.maxL?this.maxL:l);
    t=t<0?0:(t>this.maxT?this.maxT:t);
    this.ele.style.left=l+"px";
    this.ele.style.top=t+"px";
};
Drag.prototype.up=function (e) {
    off(document,"mousemove",this._move);
    off(document,"mouseup",this._up);
};



