var em=document.getElementsByTagName("em");
var menu=document.getElementById("menu");
for(var i=0;i<em.length;i++){
    public .addClass(em[i],"cursor");
    public .addClass(public .next(em[i]),"cursor");
}
menu.addEventListener("click",function (e) {
    e=e||window.event;
    e.target=e.target||e.srcElement;
    if(e.target.nodeName=="EM"){
        menuDisplay(public.next(e.target));
        return;
    }else if(e.target.nodeName=="SPAN"){
        menuDisplay(e.target);
    }
});
var flag=null;
function menuDisplay(ele) {
    ele//span
    var ul=public.next(ele);
    var em=public.prev(ele);
    flag=public.css(ul,"display");
    if(flag=="none"){
        public.css(ul,"display","block");
        public .addClass(em,"open");
    }else {
        public.css(ul,"display","none");
        public .removeClass(em,"open");
        var ems=ul.getElementsByTagName("em");
        for(var i=0;i<ems.length;i++){
            var uli=public.next(public.next(ems[i]));
            public .removeClass(ems[i],"open");
            public .css(uli,"display","none");
        }
    }

}
