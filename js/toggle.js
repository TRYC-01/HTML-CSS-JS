//获取最终样式
function getStyle(obj, attr) {
    if (obj.currentStyle) {
        return obj.currentStyle[attr];
    }
    else {
         return window.getComputedStyle(obj)[attr];
    }
}
function toggle(obj,json,fn) {
        clearInterval(obj.timer);
        var flag=true;//假设运动都到达目标值
        obj.timer = setInterval(function () {
            for(var p in json){
                var cur;
                if(p=="opacity"){
                    cur=parseFloat(getStyle(obj,p))*100;
                }else {
                    cur=parseInt(getStyle(obj,p));
                }
                var speed = (json[p] - cur) / 8;
                speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
                if (speed != 0) {
                    flag=false;
                    if (p == "opacity") {
                        obj.style[p] = (cur + speed) / 100;
                    } else  {
                            obj.style[p] = cur + speed + "px"
                    }
                }     
                 if(flag){
                    clearInterval(obj.timer)
                    if(fn){
                        fn();
                    }
                }
            }
        }, 100)
}