/**
 * Created by Administrator on 2017/6/4.
 */
function EventEmitter() {}
EventEmitter.prototype.on = function (type, fn) {
    if (!this[type + "Event"]) {
        this[type + "Event"] = []
    }
    var Event = this[type + "Event"];
    if (Event && Event.length) {
        for (var i = 0; i < Event.length; i++) {
            if (Event[i] == fn)return;
        }
    }
    Event.push(fn);
    return this;
};
EventEmitter.prototype.off = function (type, fn) {
    var Event = this[type + "Event"];
    if (Event && Event.length) {
        for (var i = 0; i < Event.length; i++) {
            if (Event[i] == fn) {
                Event.splice(i, 1)
            }
        }
    }
    return this
};
EventEmitter.prototype.fire = function (type, e) {
    var Event = this[type + "Event"];
    if (Event && Event.length) {
        for (var i = 0; i < Event.length; i++) {
            if (typeof Event[i] == "function") {
                Event[i].call(this, e)
            }
        }
    }
    return this;
};

Drag.prototype = new EventEmitter;
Drag.prototype.constructor = Drag;
function Drag(ele) {
    this.ele = ele;
    var _this = this;
    this._down = function (e) {
        _this.down.call(_this, e)
    };
    this._move = function (e) {
        _this.move.call(_this, e);
    };
    this._up = function (e) {
        _this.up.call(_this, e);
    };
    on(this.ele, "mousedown", this._down);
}
Drag.prototype.down = function (e) {
    this.x = e.clientX - this.ele.offsetLeft;
    this.y = e.clientY - this.ele.offsetTop;
    on(document, "mousemove", this._move);
    on(document, "mouseup", this._up);
    e.preventDefault();
    this.fire("selfDown");
};
Drag.prototype.move = function (e) {
    this.ele.style.left = e.clientX - this.x + "px";
    this.ele.style.top = e.clientY - this.y + "px";
    this.fire("selfMove", e);
};
Drag.prototype.up = function (e) {
    off(document, "mousemove", this._move);
    off(document, "mouseup", this._up);
    this.fire("selfUp");
};

//增加限定范围
Drag.prototype.range = function (objRange) {
    this.objRange = objRange;
    this.on("selfMove", this.addRange);
};
Drag.prototype.addRange = function (e) {
    console.log(this.objRange.minL);
    var l = e.clientX - this.x;
    var t = e.clientY - this.y;
    if (l <= this.objRange.minL) {
        l = this.objRange.minL;
    } else if (l >= this.objRange.maxL) {
        l = this.objRange.maxL;
    }
    if (t <= this.objRange.minT) {
        t = this.objRange.minT;
    } else if (t >= this.objRange.maxT) {
        t = this.objRange.maxT;
    }
    console.log(l,t);
    this.ele.style.left = l + "px";
    this.ele.style.top = t + "px";
};

//增加/删除 边框
Drag.prototype.border=function (e) {
    //鼠标按下的时候给this 的自定义事件selfDown绑定方法addBorder
    this.on("selfDown",this.addBorder);
    //鼠标抬起的时候给this 的自定义事件selfUp绑定方法removeBorder
    this.on("selfUp",this.removeBorder);
};
Drag.prototype.addBorder=function (e) {
    this.img=this.ele.getElementsByTagName("img")[0];
    this.ele.removeChild(this.img);
    this.bg=window.getComputedStyle(this.ele).background;
    this.ele.style.background="none";
    this.ele.style.border="2px dashed red";
};
Drag.prototype.removeBorder=function (e) {
    this.ele.appendChild(this.img);
    this.ele.style.border="none";
    this.ele.style.background=this.bg;
};


//扮演开发者，在以上的版本上进行升级，加上弹跳

Drag.prototype.jump=function () {
    //在抓住的阶段down中要停掉drop和fly的定时器
    this.on("selfDown",stopEvent);
    //在move 阶段给fly获取初速度
    this.on("selfMove",getSpeedX);
    this.on("selfUp",drop);
    this.on("selfUp",fly);
};

function stopEvent() {
    clearTimeout(this.dropTimer);
    clearTimeout(this.flyTimer);
};

function getSpeedX(e) {
    if(!this.prevSpeedX){
        this.prevSpeedX=e.clientX;
    }else {
        this.speedX=e.clientX-this.prevSpeedX;
        this.prevSpeedX=e.clientX;
    }
};

function drop() {
    clearTimeout(this.dropTimer);
    var _this=this;
    if(!this.speedY){
        this.speedY=9.8;
    }else {
        this.speedY+=9.8;
    }
    this.speedY*=0.93;
    var t=this.ele.offsetTop+this.speedY;
    var maxT=(document.documentElement.clientHeight||document.body.clientHeight)-this.ele.offsetHeight;
    if(t>=maxT){
        t=maxT;
        this.speedY*=-1;
        this.flg++;
    }else {
        this.flg=0;
    }
    this.ele.style.top=t+"px";
    if(this.flg<2){
        this.dropTimer=setTimeout(function () {
            //window===this
            drop.call(_this);
        },20)
    }
};

function fly() {
    clearTimeout(this.flyTimer);
    this.speedX*=0.93;
    var l=this.ele.offsetLeft+this.speedX;
    var maxL=(document.documentElement.offsetWidth||document.body.offsetWidth)-this.ele.offsetWidth;
    if(l<=0){
        l=0;
        this.speedX*=-1;
    }else if(l>maxL){
        l=maxL;
        this.speedX*=-1
    }
    this.ele.style.left=l+"px";
    var _this=this;
    if(Math.abs(this.speedX)>=0.5){
        this.flyTimer=setTimeout(function () {
            fly.call(_this);
        },20)
    }
};




