/**
 * Created by Administrator on 2017/6/4.
 */
//布局由浮动转为定位
var oLis = document.getElementsByTagName("li");
for (var i = oLis.length - 1; i >= 0; i--) {
    oLis[i].style.left = (oLis[i].l=oLis[i].offsetLeft) + "px";
    oLis[i].style.top = (oLis[i].t=oLis[i].offsetTop) + "px";
    oLis[i].style.position = "absolute";
    oLis[i].style.margin = 0;
    new Drag(oLis[i]).on("selfDown",addZIndex).on("selfMove",touchChange).on("selfUp",changePos);
}
//按下去的时候，提高他的层级关系
var zIndex=0;
function addZIndex() {
    this.ele.style.zIndex=++zIndex;
}
//拖动的时候判断是否跟其他li发生碰撞
function isTouch(cur,other) {
    //cur 是当前拖拽的元素
    if(cur.offsetLeft+cur.offsetWidth<other.offsetLeft||cur.offsetLeft>other.offsetLeft+other.offsetWidth||cur.offsetTop+cur.offsetHeight<other.offsetTop||cur.offsetTop>other.offsetTop+other.offsetHeight){
        return false;
    }else {
        return true;
    }
}
//让发生碰撞的元素变色
function touchChange() {
    //创建一个数组，将所有发生碰撞的元素存起来，方便后面交换位置用
    this.touchAry=[];
    for(var i=0;i<oLis.length;i++){
        if(oLis[i]==this.ele) continue;
        if(isTouch(this.ele,oLis[i])){
            this.touchAry.push(oLis[i]);
           oLis[i].style.backgroundColor="yellow";
        }else {
            oLis[i].style.backgroundColor=null;
        }
    }
    //console.log(this.touchAry.length);
}
function changePos() {
    //this.touchAry
    var a=this.touchAry;
    if(a&&a.length){
        //循环a,从跟他发生碰撞的元素中找到距离最近的
        //先把每个元素距离当前被拖拽的元素的距离求出来，存在每个元素的自定义属性上
        for(var i=0;i<a.length;i++){
            a[i].distance=Math.sqrt(Math.pow(this.ele.offsetTop-a[i].offsetTop,2)+Math.pow(a[i].offsetLeft-this.ele.offsetLeft,2));
            a[i].style.backgroundColor=null;
        }
        a.sort(function (a,b) {
            return a.distance-b.distance;
        });
        //选出最近的那个元素a[0] 交换位置 以的动画形式
        animation(a[0],{left:this.ele.l,top:this.ele.t},500,2);
        animation(this.ele,{left:a[0].l,top:a[0].t},500,2);
        this.ele.style.backgroundColor="orange";
        a[0].style.backgroundColor="orange";
        //再把元素自定义属性存储坐标值，交换过来
        var l=this.ele.l,t=this.ele.t;
        this.ele.l=a[0].l;
        this.ele.t=a[0].t;
        a[0].l=l;
        a[0].t=t;
    }else {
        //回到自己的位置
        animation(this.ele,{left:this.ele.l,top:this.ele.t},500,2)
    }
}



