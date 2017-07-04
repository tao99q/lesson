/**
 * Created by 银鹏 on 2017/5/9.
 */
var public=(
    function(){
        //1.将类数组转为数组
        function toArray(likeArray){
            var ary=[];
            try{
                return ary.slice.call(likeArray)
            }catch(e){
                for(var i=0;i<likeArray.length;i++){
                    ary.push(likeArray[i])
                }
                return ary;
            }
        };
        //2.将JSON字符串转为JSON对象
        function toJsonObj(jsonstr){
            try{
                return JSON.parse(jsonstr)
            }catch(e){
                return eval("("+jsonstr+")")
            }
        }
        //3.求当前元素距离body的偏移量
        function offset(curEle){
            var L=curEle.offsetLeft;
            var T=curEle.offsetTop;
            var P=curEle.offsetParent;
            while(P){
                if(window.navigator.userAgent.indexOf("MSIE 8")==-1){
                    L+= P.clientLeft;
                    T+= P.clientTop;
                }
                L+= P.offsetLeft;
                T+= P.offsetTop;
                P= P.offsetParent;
            }
            return {left:L, top:T}
        }
        //4.获取或者设置当前浏览器的盒子模型属性
        function win(attr,value){
            if(typeof value=="undefined"){
                return document.documentElement[attr]||document.body[attr];
            }else{
                document.documentElement[attr]=value;
                document.body[attr]=value;
            }
        }
        //5.获取随机数的方法
        function getRandom(n,m){
            n=Number(n);
            m=Number(m);
            if(isNaN(n)||isNaN(m)){
                return Math.random();
            }
            if(n>m){
                //n=n+m;
                //m=n-m;
                //n=n-m;
                var c=n;
                n=m;
                m=c;
                c=null;
            }
            return Math.round(Math.random()*(m-n)+n);
        }
        //6.获取元素的样式属性值
        function getCss(curEle,attr){
            var val=null;
            if("getComputedStyle" in window){
                val=window.getComputedStyle(curEle)[attr];
            }else{
                if(attr=="opacity"){
                    //filter:alpha(opacity=35.7);
                    val=curEle.currentStyle["filter"];
                    var reg1=/^alpha\(opacity=(\d+(?:\.\d+)?)\)$/;
                    val=reg1.test(val)?RegExp.$1/100:1;
                }else{
                    val=curEle.currentStyle[attr] ;
                }
            }
            var reg2=/^-?\d+(?:\.\d+)?(?:px|pt|pp|rem|em|deg)?$/g;
            if(reg2.test(val)){
                val=parseFloat(val);
            }
            return val;
        }
        //7.设置元素的样式属性
        function setCss(ele,attr,val){
            if(attr=="opacity"){
                ele.style.opacity=val;
                ele.style.filter="alpha(opacity="+val*100+")";
                return ;
            }
            if(attr=="float"){
                ele.style.cssFloat=val;
                ele.style.styleFloat=val;
            }
            var reg=/^(width|height|top|bottom|right|left|(margin|padding)(Top|Bottom|Right|Left)?)$/;
            if(reg.test(attr)&&!isNaN(val)){
                val+="px";
            }
            ele.style[attr]=val;
        }
        //8.批量设置元素的样式属性
        function setGroupCss(ele,obj){
            obj=obj||[];
            if(obj.toString()=="[object Object]"){
                for(var key in obj){
                    this.setCss(ele,key,obj[key])
                }
            }
        }
        return{
            toArray:toArray,
            toJsonObj:toJsonObj,
            offset:offset,
            win:win,
            getRandom:getRandom,
            getCss:getCss,
            setCss:setCss,
            setGroupCss:setGroupCss
        }
    }
)();