/**
 * Created by Administrator on 2017/6/4.
 */
function on(ele, type, callback, bool) {
    if (/^self/.test(type)) {
        if (!ele[type + "Event"]) {
            ele[type + 'Event'] = []
        }
        pushEvent(ele, type, callback)
    } else {
        if (ele.addEventListener) {
            bool = bool || false;
            ele.addEventListener(type, callback, bool);
        } else {
            if (!ele[type + "Event"]) {
                ele[type + "Event"] = [];
                ele.attachEvent("on" + type, function () {
                    run.call(ele, window.event);
                })
            }
            pushEvent(ele, type, callback);
        }

    }
}
function off(ele, type, callback, bool) {
    if (ele.removeEventListener && !/^self/.test(type)) {
        bool = bool || false;
        ele.removeEventListener(type, callback, bool)
    } else {
        var Event = ele[type + "Event"];
        if (Event && Event.length) {
            for (var i = 0; i < Event.length; i++) {
                if (Event[i] == callback) {
                    Event.splice(i, 1);
                    break
                }
            }
        }
    }
}
function run(e) {
    e.target = e.srcElement;
    e.pageX = (document.documentElement.scrollLeft || document.body.scrollLeft) + e.clientX;
    e.pageY = (document.documentElement.scrollTop || document.body.scrollTop) + e.clientY;
    e.preventDefault = function (e) {
        e.returnValue = false;
    };
    e.stopPropagation = function (e) {
        e.cancelBubble = true;
    }
    var Event = this[type + "Event"];
    if (Event && Event.length) {
        for (var i = 0; i < Event.length; i++) {
            if (typeof Event[i] == "function") {
                Event[i].call(this, e);
            }
        }
    }
}
function fire(ele, type, e) {
    var Event = ele[type + "Event"];
    if (Event && Event.length) {
        for (var i = 0; i < Event.length; i++) {
            if (typeof Event[i] == "function") {
                Event[i].call(this, e)
            }
        }
    }
}
function pushEvent(ele, type, callback) {
    var Event = ele[type + "Event"];
    if (Event && Event.length) {
        for (var i = 0; i < Event.length; i++) {
            if (Event[i] == callback)return
        }
    }
    Event.push(callback);
}