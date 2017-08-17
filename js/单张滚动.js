function getStyle(obj, attr) {
            if (obj.currentStyle) {
                return obj.currentStyle[attr];
            }
            else if (window.getComputedStyle) {
                return window.getComputedStyle(obj)[attr];
            }
        }
        window.onload = function () {
            var imgList = document.getElementsByClassName("imgs")[0];
            var pre = document.getElementsByClassName("pre")[0];
            var next = document.getElementsByClassName("next")[0];
            var btns = document.getElementsByClassName("btn");
            var len=5;
            var num=5;
            var index = 0;
            var timer;
            var animated=false;
            next.onclick = function () {
                if(animated){
                    return;
                }
                if (index == 4) {
                    index = 0;
                } else {
                    index++;
                }
                    animate(-600); 
            }
            pre.onclick = function () {
                if(animated){
                    return;
                }
                if (index == 0) {
                    index = 4;
                } else {
                    index--;
                }
                    animate(600);     
            }
            function animate(offset) {
                var timer=null;
                clearTimeout(timer);
                animated=true;
                var cur = parseInt(getStyle(imgList, "left"));
                var target = cur + offset;
                function go() {
                    var speed = (target - parseInt(getStyle(imgList, "left"))) / 5;
                    speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
                    var curL = parseInt(getStyle(imgList, "left"));
                    if (speed != 0) {
                        imgList.style.left = curL + speed + "px";
                        timer=setTimeout(go, 30)
                    }
                    else {
                        animated=false;
                        clearTimeout(timer);
                        if (curL < -600*len) {
                            imgList.style.left = -600*len/num + "px";
                        }
                        else if (curL > -600*len/num) {
                            imgList.style.left = -600*len + "px";
                        }
                    }
                }
                go();
                showBtn(index)
            }
            function showBtn(index) {
                for (var i = 0; i < btns.length; i++) {
                    btns[i].className = "btn";
                }
                btns[index].className = "btn active";
            }

            for (var i = 0; i < btns.length; i++) {
                btns[i].index = i;
                btns[i].onclick = function () {
                    var offset = (this.index -index) * (-600)
                    if(animated||this.index==index){
                        return;
                    }
                        index=this.index;
                        animate(offset);
                }
            }
            function play() {
                timer = setInterval(function () {
                    next.onclick();
                }, 5000);
            }
            function stop(){
                clearInterval(timer);
            }
            imgList.onmouseover=stop;
            imgList.onmouseout=play;
            play();
        }