/**
 * Created by ���� on 2017/5/6.
 */
//1.获取数据 ajax
var xhr=new XMLHttpRequest(),jsonData=null;
xhr.open("GET","json/product.json",false);
xhr.onreadystatechange=function(){
    if(xhr.readyState===4&&xhr.status===200){
        jsonData=public.toJsonObj(xhr.responseText);
    }
};
xhr.send(null);
console.log(jsonData);

//2.绑定数据，使用ES6模板字符串
var HTMLStr=``;
for(var i=0;i<jsonData.length;i++){
    HTMLStr+=`
    <li data-time="${jsonData[i].time}" data-price="${jsonData[i].price}" data-hot="${jsonData[i].hot}">
    <a href="javascript:;">
    <img src="${jsonData[i].img}" alt=""/>
    <p>${jsonData[i].title}</p>
    <p class="time">上架时间:${jsonData[i].time}</p>
    <del>$10000</del>
    <span>价格:${jsonData[i].price}</span>
    <p class="hot">热度:${jsonData[i].hot}</p>
    </a>
    </li>
    `;
}
var oList=document.getElementById("list");
oList.innerHTML=HTMLStr;

//3.给三个排序的a标签绑定事件
var header=document.getElementById("header");
var linkList=header.getElementsByTagName("a");

for (var j=0;j<linkList.length;j++){
    linkList[j].setAttribute("data-flag",-1);
    linkList[j].onclick=function(){
        //this 点击的的那个标签
        //1排序
        productSort.call(this);
        //2.点击的那个元素小三角的高亮样式
        changeArrow.call(this);
        //3.清除其他的样式
        clearOther.call(this);
    }
}

//排序的方法
function productSort(){
    //this=你点击的那个元素了
    var _this=this;
    var oLis=oList.getElementsByTagName("li");
    var dataFlag=this.getAttribute("data-flag");
    dataFlag*=-1;
    this.setAttribute("data-flag",dataFlag);
    //将oLis变为数组
    oLis=public.toArray(oLis);
    oLis.sort(function(a,b){
        //_this
        var sortAttr=_this.getAttribute("sort-attr");
        //sortAttr="data-time",sortAttr="data-price",sortAttr="data-hot"
        //var curTime=a.getAttribute("data-time");
        //var nexTime=b.getAttribute("data-time");
        var cur=a.getAttribute(sortAttr);
        var nex=b.getAttribute(sortAttr);
        cur=cur.replace(/-/g,"");//"20170513"
        nex=nex.replace(/-/g,"");//"20180102"
        //字符串遇到除了+以外的运算,先转为number,再运算
        return (cur-nex)*dataFlag;
    });
    //如果dom 结构发生改变(增加元素,删除元素,移动元素),页面就会重新渲染一次,这就做回流
    var  frg=document.createDocumentFragment();//文档碎片,就是一个dom容器
    for(var i=0;i<oLis.length;i++){
        frg.appendChild(oLis[i]);
    }
    oList.appendChild(frg);
    frg=null;
}

//

function changeArrow(){
    //this当前点击的那个元素
    var dataFlag=this.getAttribute("data-flag");
    var arrows=this.getElementsByTagName("i");
    if(dataFlag==="1"){
        arrows[0].className="up bg";
        arrows[1].className="down";
        return;
    }
    arrows[0].className="up";
    arrows[1].className="down bg";
}

function clearOther(){
    //1.data-flag变成初始状态
    //2.其他的箭头变为初始状态
    for(var i=0;i<linkList.length;i++){
        if(linkList[i]==this){
            continue;
        }
        linkList[i].setAttribute("data-flag",-1);
        var arrows=linkList[i].getElementsByTagName("i");
        arrows[0].className="up";
        arrows[1].className="down";
    }
}