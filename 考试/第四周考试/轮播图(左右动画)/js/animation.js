/**
 * Created by 银鹏 on 2017/5/16.
 */
(function () {
    function animation(ele, target) {
        var sport, duration, callBack, effectAry = [], time = 0, begin = {};
        target = target || [];
        var funAry = [], numAry = [];
        for (var i = 2; i < arguments.length; i++) {
            if (typeof  arguments[i] == "function") {
                funAry.push(arguments[i]);
            }
            if (typeof arguments[i] == "number") {
                numAry.push(arguments[i])
            }
        }
        callBack = funAry.length > 0 ? funAry[0] : function () {
        };
        if (numAry.length == 0) {
            duration = 1000;
            sport = 0
        } else if (numAry.length == 1) {
            duration = numAry[0];
            sport = 0;
        } else {
            duration = numAry[0];
            sport = numAry[1];
        }
        if (target.toString() == "[object Object]") {
            for (var key in target) {
                if (target.hasOwnProperty(key)) {
                    begin[key] = public.css(ele, key)
                }
            }
        }
        ;
        function linear(b, t, d, s) {
            //return t-((d-s)*(t-b)/d);
            return b + (t - b) / d * s;
        };
        effectAry.push(linear);
        window.clearInterval(ele.timer);
        ele.timer = window.setInterval(function () {
            if (time + 10 >= duration) {
                window.clearInterval(ele.timer);
                for (var key in target) {
                    public.css(ele, key, target[key]);
                }
                callBack.call(ele);
                return;
            }
            time += 10;
            for (var key in target) {
                public.css(ele, key, effectAry[sport](begin[key], target[key], duration, time))
            }
        }, 13);
    }

    window.animation = animation;
})();