/**
 * ????
 */
//1.
var news = document.getElementById("news");


//2.???????
var xhr = new XMLHttpRequest();
xhr.open("GET", "js/data.txt", false);
var dataAry = null;
xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
        dataAry = public.toJsonObj(xhr.responseText);
    }
}
xhr.send(null);

//3.??????
var htmlStr = ``;

for (var i = 0; i < dataAry.length; i++) {
    htmlStr += `
        <li>
        <div><img src="" alt="" data-src="${dataAry[i].src}"></div>
        <div>
        <h2>${dataAry[i].title}</h2>
        <p>${dataAry[i].desc}</p>
        </div>
        </li>
    `;
}
news.innerHTML = htmlStr;


//4????????
function delayLoad() {
    var _this = this;
    if (this.isLoad) {
        returnj;
    }
    var _h = public.win("scrollTop") + public.win("clientHeight");
    var _H = this.offsetHeight + public.offset(this).top;

    if (_h > _H) {
        this.isLoad = true;
        var curImg = document.createElement("img");
        curImg.src = this.getAttribute("data-src");
        curImg.onload = function () {
            _this.src = _this.getAttribute("data-src");
            fadeIn.call(_this);
        }
    }
}
function fadeIn() {
    var _this = this;
    this.timer = window.setInterval(function () {
        var opacity = public.getCss(_this, "opacity");
        if (opacity >= 1) {
            window.clearInterval(_this.timer);
            public.setCss(_this, "opacity", 1);
            return;
        }
        public.setCss(_this, "opacity", opacity += 0.1);
    }, 17)

}
function allLoad() {
    var imgList = document.getElementsByTagName("img");
    for(var i=0;i<imgList.length;i++){
        imgList[i].isLoad = false;
        delayLoad.call(imgList[i]);
    }
}
//???????????????????????
allLoad();
window.onscroll = allLoad;
