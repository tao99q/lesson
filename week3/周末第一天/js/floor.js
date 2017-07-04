/**
 * Created by ���� on 2017/5/13.
 */
var oDivs = document.getElementsByTagName("div");
var floor = document.getElementsByClassName("floor")[0];
var oLis = floor.getElementsByTagName("li");
var timer = null;
//ѭ�����е�div��ÿ��divһ��400-600������߶�,�������ɫ,
//��ÿ��div��ƫ����,�浽��Ӧ��Li�ϵ��Զ�����(_h)��
for (var i = 0; i < oDivs.length; i++) {
    oDivs[i].style.height = Math.round(Math.random() * (600 - 400) + 400) + "px";
    //"rgb("+m+","+m+","+m+")";
    oDivs[i].style.backgroundColor = "rgb(" + Math.round(Math.random() * (255)) + "," + Math.round(Math.random() * (255)) + "," + Math.round(Math.random() * (255)) + ")";
    oLis[i].setAttribute("_h", offset(oDivs[i]).top);
    oLis[9].setAttribute("_h", 0);
    oLis[i].onclick = function () {
        window.onscroll=null;
        select(this);
        window.clearInterval(timer);
        //this,��ǰ�����li
        // win("scrollTop",this.getAttribute("_h"));
        //��ǰ��scrollTopֵ����ǰ�����Li�д洢���Ǹ�ƫ�����Ƚ�
        //�����Ļ���scrollTopֵ��С,��֮����
        //ʵ�ֲ��������Ӻͼ�С�õ���ʱ��
        //ע��:�����ٽ�ֵ�����ʱ��
        var _H = win("scrollTop");
        var _h = this.getAttribute("_h");
        if (_H > _h) {
            timer = window.setInterval(function () {
                if (win("scrollTop") <= _h) {
                    window.clearInterval(timer);
                    window.onscroll=onFloor;
                    return;
                }
                win("scrollTop", _H -= 10);
            }, 1)
        } else {
            timer = window.setInterval(function () {
                if (win("scrollTop") >= _h) {
                    window.clearInterval(timer);
                    window.onscroll=onFloor;
                    return;
                }
                win("scrollTop", _H += 10);
            }, 1)
        }
    };
    oLis[9].onclick = function () {
        window.onscroll=null;
        window.clearInterval(timer);
        select(this);
        var _H = win("scrollTop");
        timer = window.setInterval(function () {
            if (win("scrollTop") <= 0) {
                window.clearInterval(timer);
                window.onscroll=onFloor;
                return;
            }
            win("scrollTop", _H -= 10);
        }, 1)
    }
}
//��ָ����li��ѡ����ʽ
function select(ele) {
    for (var i = 0; i < oLis.length; i++) {
        oLis[i].className = "";
    }
    ele.className = "select";
}

function win(attr, value) {
    if (arguments.length === 1) {
        return document.documentElement[attr] || document.body[attr];
    } else {
        document.documentElement[attr] = value;
        document.body[attr] = value;
    }
}
function offset(curEle) {
    //����һ�ε�ǰԪ�ص�ƫ�����͸���������
    var l = curEle.offsetLeft;
    var t = curEle.offsetTop;
    var p = curEle.offsetParent;
    while (p) {
        //��IE8�������,ƫ���������˸��� ������ı߿�
        if (window.navigator.userAgent.indexOf("MSIE 8") === -1) {
            l += p.clientLeft;
            t += p.clientTop;
        }
        l += p.offsetLeft;
        t += p.offsetTop;
        p = p.offsetParent;
    }
    return {
        left: l,
        top: t
    }
}

window.onscroll = onFloor;
//��ǰdiv©��������Ļһ����,����һ��div������Ļһ����֮�����ڵ�ǰdiv�ķ�Χ
//��ǰdiv��offsetTop-��Ļ�ߵ�һ�뵽��һ��div��offsetTop-��Ļ�ߵ�һ��
function onFloor() {
    var _H = win("scrollTop");
    var _wH=Math.floor(win("clientHeight")/2);
    for (var i = 0; i < oLis.length - 1; i++) {
        var _preTop=oLis[i].getAttribute("_h");
        var _nexTop=oLis[i+1].getAttribute("_h");
        if(_H>=_preTop-_wH&&_H<=_nexTop-_wH){
            select(oLis[i]);
        }
        if(_H>oLis[8].getAttribute("_h")-_wH){
            select(oLis[8]);
        }
    }
};

//0<_H<1,1<_H<2,.........7<H<8,���8<H
