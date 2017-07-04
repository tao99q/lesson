

//1.获取数据 用ajax

var xhr = new XMLHttpRequest();
var jsonData = null;
xhr.open("GET","json/data.json",false);
xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status ==200) {
        jsonData = public.toJsonObj(xhr.responseText);
    }
}
xhr.send(null);
//2绑定数据，ＥＳ６模板字符串
var htmlStr=``;
for(var i=0;i<jsonData.length;i++){
    htmlStr +=`
    <li data-time="${jsonData[i].time}" data-price="${jsonData[i].price}" data-hot="${jsonData[i].sales}">
        <a href="javascript:;">
            <img src="${jsonData[i].img}"/>
            <p>${jsonData[i].title}</p>
            <p class="time">上架时间:${jsonData[i].time}</p>
            <del>10000</del>
            <span>价格:${jsonData[i].price}</span>
            <p class="hot">热度:${jsonData[i].sales}</p>
        </a>
    </li>
    `;
}
var oList = document.getElementById("list");
oList.innerHTML = htmlStr;



//3给三个排序标签绑定事件
var header=document.getElementById("header");
var linkList=header.getElementsByTagName("a");
for(var i=0;i<linkList.length;i++){
    linkList[i].setAttribute("data-flag",-1);
    linkList[i].onclick = function () {
        productSort.call(this);
        changeArrow.call(this);
        clearOther.call(this);
    }
}
//排序的方法
function productSort() {
    var _this = this;
    var dataFlag = this.getAttribute("data-flag");
    dataFlag *=-1;
    this.setAttribute("data-flag",dataFlag);
    var oLis = oList.getElementsByTagName("li");
    oLis = public.toArray(oLis);
    oLis.sort(function (a,b) {
        var sortAttr = _this.getAttribute("sort-attr");
        var cur = a.getAttribute(sortAttr);
        var nex = b.getAttribute(sortAttr);
        cur = cur.replace(/-/g,"");
        nex = nex.replace(/-/g,"");
        return (cur-nex)*dataFlag;
    });
    var frg = document.createDocumentFragment();
    for(var i=0;i<oLis.length;i++){
        frg.appendChild(oLis[i]);
    }
    oList.appendChild(frg);
    frg = null;
}
//实现箭头的切换
function changeArrow() {
    var dataFlag = this.getAttribute("data-flag");
    var arrows = this.getElementsByTagName("i");
   if (dataFlag === "1"){
       arrows[0].className = "up bg";
       arrows[1].className = "down";
       return;
   }
    arrows[0].className = "up";
    arrows[1].className = "down bg";

}
//清除其他A标签中的样式（排序的初始状态，被选中i的样式）
function clearOther() {
    for (var i=0;i < linkList.length;i++){
        if (linkList[i] === this){
            continue;
        }
        linkList[i].setAttribute("data-flag",-1);
        var arrows = linkList[i].getElementsByTagName("i");
        arrows[0].className = "up";
        arrows[1].className = "down";
    }
}
