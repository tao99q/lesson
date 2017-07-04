/**
 * Created by acer on 2017/4/30.
 */
var public={
    toArray: function(likeArray) {
        var ary=[];
        for (var i=0;i<likeArray.length;i++){
            ary.push(likeArray[i])
        }
        return ary
    },
    toStr:function (likeStr) {
        return likeStr.toString()
    }
};

var public=(
    function () {
        function toArray (likeArray) {
            var ary=[];
            for (var i=0;i<likeArray.length;i++){
                ary.push(likeArray[i])
            }
            return ary
        }
        function toStr (likeStr) {
            return likeStr.toString()
        }
        return{
            toArray: toArray,
            toStr:toStr
        }
    }
)();