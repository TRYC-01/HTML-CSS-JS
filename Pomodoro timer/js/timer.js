window.onload = function () {
    //+ - dom
    var setTimeBtn = document.getElementsByClassName('setTime');
    //时间dom
    var number = document.getElementsByClassName('number');
    //倒计时 时间dom
    var delayTime = document.getElementsByClassName('delayTime');
    //session break divs
    var colorDiv = document.getElementsByClassName('pic');
    //显示倒计时div
    var picContainer = document.getElementsByClassName('picContainer')[0];
    //定时器
    var timer = null;
    //中途设置时间
    var canset = true;
    //点击色块的次数
    var clicktimes = 0;
    //设置改变
    var setChanged = false;
    //暂停
    var pause = false;
    //载入显示的时间块
    var curArea = ['session', 'break'];
    //暂停情况下设置哪个色块的数组
    var changeTarget = [];
    //点击+ -进行相应时间设置

    setTime(setTimeBtn)
    function setTime(obj) {

        for (var i = 0; i < obj.length; i++) {

            obj[i].index = i;
            obj[i].onclick = function () {

                if (canset || pause) {

                    if (this.index === 0) {//break 减时间

                        if (parseInt(number[0].innerHTML) > 1) {

                            delayTime[1].innerHTML = number[0].innerHTML = parseInt(number[0].innerHTML) - 1;
                        }
                    } else if (this.index === 1) {//break 加时间

                        delayTime[1].innerHTML = number[0].innerHTML = parseInt(number[0].innerHTML) + 1;

                    } else if (this.index === 2) {//session 减时间

                        if (parseInt(number[1].innerHTML) > 1) {

                            delayTime[0].innerHTML = number[1].innerHTML = parseInt(number[1].innerHTML) - 1;
                        }
                    } else if (this.index === 3) {//session 加时间

                        delayTime[0].innerHTML = number[1].innerHTML = parseInt(number[1].innerHTML) + 1;
                    }
                    //暂停
                    if (pause) {

                        if (this.index === 0 || this.index === 1) {//pause》break 加减时间

                            if (changeTarget.indexOf('break') === -1) {

                                changeTarget.push('break');
                            }
                        } else if (this.index === 2 || this.index === 3) {//pause》session 加减时间

                            if (changeTarget.indexOf('session') === -1) {

                                changeTarget.push('session');
                            }
                        }
                        setChanged = true;
                    }
                }
            }
        }
    }


    //点击 picContainer 容器进行倒计时
    //显示色块的顺序
    var showTurn = 0;
    var num = function () { return (showTurn % 2); };
    //倒计时计数
    var interVal = 0;
    //没有更改当前块的总时间的基数
    var base = number[num() === 0 ? 1 : 0].innerHTML;

    //点击色块
    picContainer.onclick = function () {
        if (clicktimes % 2 === 0) {//开始倒计时
            canset = false;
            pause = false;

            if (setChanged) {//设置时间暂停后更改了

                if (changeTarget.indexOf(curArea[num()]) !== -1) {//更改的是当前显示的时间块
                    //清除计数
                    interVal = 0;
                }
                //中途设置时间数组清空,标记为没有更改
                changeTarget = [];
                setChanged = false;
            }
            //倒计时当前色块时间
            showTimer(number[num() === 0 ? 1 : 0].innerHTML);
        } else {//暂停
            clearInterval(timer)
            canset = true;
            pause = true;
        }
        clicktimes++;
    }

    //倒计时
    function showTimer(base) {
        //当前倒计时dom
        var cur = delayTime[num()];
        //当前倒计时色块
        var curDiv = colorDiv[num()];
        //等待色块
        var nextDiv = colorDiv[(num() === 0 ? 1 : 0)];
        var curTime = cur.innerHTML;
        //总时间M
        var total = base;
        //首次点击 将时间参数改成H:M:S格式
        var t = change(curTime);
        var S = t.S;
        var M = t.M;
        var H = t.H;
        timer = setInterval(function () {
            //显示背景图像所占的百分比
            ratio(total, interVal, curDiv);
            interVal++;
            if (S === '00') {//秒

                if (M !== '0:') {
                    S = 59;
                    M = parseInt(M) - 1;

                    if (M < 0) {// M<0

                        if (H !== '') {
                            M = 59 + ':';
                            H = parseInt(H) - 1;

                            if (H === 0) {
                                H = '';
                            } else {
                                H = H + ":";
                            }
                        } else {
                            M = '0:';
                        }
                    } else {//  M>0
                        M = H ? (M < 10 ? ('0' + M + ':') : (M + ':')) : (M + ':');
                    }
                } else {//没有H M的情况下S==='00'
                    interVal = 0;
                    clearInterval(timer);
                    cur.innerHTML = base;
                    curDiv.style.display = 'none';
                    nextDiv.style.display = 'block';
                    showTurn++;
                    showTimer(number[num() === 0 ? 1 : 0].innerHTML);
                }
            } else {// S不等于0
                S--;
                if (S < 10) {
                    S = '0' + S;
                }
            }
            cur.innerHTML = H + M + S;
            if (cur.innerHTML === '0:00') {
                cur.innerHTML = base;
            }
        }, 1000)
    }

    //时间转换
    function change(curTime) {
        var reg = /\d+/g;
        var T = curTime.match(reg);
        if (T.length === 1) {
            var H = parseInt(T[0] / 60) >= 1 ? parseInt(T[0] / 60) + ':' : '';
            var M = T[0] % 60
            M = H ? (M < 10 ? '0' + M + ':' : M + ':') : M + ':';
            var S = '00';
        } else if (T.length === 3) {
            var H = T[0] + ':';
            var M = T[1] < 10 ? '0' + T[1] + ':' : T[1] + ':';
            var S = T[2] < 10 ? '0' + T[2] : T[2];
        } else if (T.length === 2) {
            var H = '';
            var M = T[0] + ':';
            var S = T[1];
        }
        return {
            H: H,
            M: M,
            S: S
        }
    }

    //背景颜色百分比
    function ratio(total, interVal, objDiv) {
        var H = objDiv.offsetHeight;
        var rat = 1 - (interVal / (total * 60))
        if (rat > 0) {
            objDiv.style.backgroundPositionY = rat * H + 'px';
        } else {
            objDiv.style.backgroundPositionY = H + 'px';
            interVal = 0;
        }
    }
}
