/**
 * Created by Administrator on 2017/6/3.
 */
var box = document.getElementById("box");
box.on("mousedown", down, false);

function down(e) {
    //this==box
    this.startX = e.clientX - this.offsetLeft;
    this.startY = e.clientY - this.offsetTop;
    this.minL = this.minT = 0;
    this.maxL = this.parentNode.offsetWidth - this.offsetWidth;
    this.maxT = this.parentNode.offsetHeight - this.offsetHeight;
    var _this = this;
    this._move = function (e) {
        //this= document
        move.call(_this, e)
    };
    this._up = function () {
        up.call(_this)
    };
    document.on("mousemove", this._move);
    document.on("mouseup", this._up);
    window.clearTimeout(this.dropTimer);
    window.clearTimeout(this.fryTimer);
    e.preventDefault();
    border.call(this);
}
function move(e) {
    var l = e.clientX - this.startX;
    var t = e.clientY - this.startY;
    l = l < this.minL ? this.minL : (l > this.maxL ? this.maxL : l);
    t = t < this.minT ? this.minT : (t > this.maxT ? this.maxT : t);
    this.style.left = l + "px";
    this.style.top = t + "px";
    //console.log(new Date().getTime());
    //每次一次执行move会有个时间差，记录当前的鼠标的位置和上一次的位置差，代表水平的速度
    if(!this.prevSpeedX){
       this.prevSpeedX=e. clientX;
    }else {
        this.speedX=e.clientX-this.prevSpeedX;
        this.prevSpeedX=e.clientX;
    }
    //console.log(this.speedX);
}
function up() {
    document.off("mousemove", this._move);
    document.off("mouseup", this._up);
    setImg.call(this);
    drop.call(this);
    fry.call(this);
}

var flg=0;
function drop() {
    window.clearTimeout(this.dropTimer);
    //this==box
    var _this = this;
    if (!this.speedY) {
        this.speedY = 9.8;
    } else {
        this.speedY += 9.8;
    }
    var l = this.offsetTop + this.speedY;
    //this.speedY *= 0.98;
    if (l >= this.maxT) {
        l = this.maxT;
        this.speedY *= -1;
        flg++;
        //console.log(flg);
    }else {
        flg=0;
        //console.log(flg);
    }
    this.style.top = l + "px";
    if(flg<2){
        this.dropTimer=window.setTimeout(function () {
            drop.call(_this);
        }, 20)
    }

}
function  fry() {
    window.clearTimeout(this.fryTimer);
    //this box
    var _this=this;
    if(!this.speedX){
        this.speedX=0;
    }else {
        this.speedX*=0.98;
        var l=this.offsetLeft+this.speedX;
    }
    console.log(this.offsetLeft);
    if(l>this.maxL){
        l=this.maxL;
        this.speedX*=-1;
    }else  if(l<this.minL){
        l=this.minL;
        this.speedX*=-1;
    }
    this.style.left=l+"px";

    if(Math.abs(this.speedX)>=0.5){
        this.fryTimer=window.setTimeout(function () {
            fry.call(_this);
        },20);
    }
}
function border() {
    //this  box
    this.Img=this.getElementsByTagName("img")[0];
    this.removeChild(this.Img);
    this.style.border="2px dashed green";
    this.style.backgroundColor="#feffe7"
}
function setImg () {
    this.appendChild(this.Img);
    this.style.border="none";
}