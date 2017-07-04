
//public公用的方法
var public=(function () {
    function toArray(likeArray) {
        try{
            return Array.prototype.slice.call(likeArray);
        }catch (e){
            var array = [];
            for (var i=0;i<likeArray.length;i++){
                array.push(likeArray[i]);
            }
        }
    }
    function toJsonObj(jsonStr) {
        try{
            return JSON.parse(jsonStr);
        }catch (e){
            return eval("("+jsonStr+")");
        }
    }
    return {
        toArray:toArray,
        toJsonObj:toJsonObj
    }
})();