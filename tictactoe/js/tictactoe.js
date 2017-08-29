window.onload = function () {
    var layer = document.getElementsByClassName("layer")[0];
    var close = document.getElementsByClassName("close")[0];
    var aBtns = document.getElementsByTagName("a");
    var selection = document.getElementsByClassName("selection")[0];
    var li = document.getElementsByClassName("item");
    var hdash = document.getElementsByClassName("hdash")[0];
    var vdash = document.getElementsByClassName("vdash")[0];
    var rotate1 = document.getElementsByClassName("rotate1")[0];
    var rotate2 = document.getElementsByClassName("rotate2")[0];
    var playerInfo = document.getElementsByClassName("player")[0];
    var pInfo = playerInfo.getElementsByTagName("td");
    var computerInfo = document.getElementsByClassName("computer")[0];
    var cInfo = computerInfo.getElementsByTagName("td");
    var blinkFlag = false;
    var playerWin = 0;
    var computerWin = 0;
    var peace = 0;
    var timer;
    slide(selection, 200)
    function slide(obj, target) {
        var timer = setTimeout(function () {
            clearTimeout(timer)
            var speed = (target - obj.offsetTop) / 3;
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
            if (speed != 0) {
                obj.style.top = obj.offsetTop + speed + "px";
                slide(obj, target);
            } else {
                clearTimeout(timer);
            }
        }, 30);
    }

    /** close*/
    close.addEventListener("click", function () {
        slide(selection, -200);
    })

    /**选择角色 */
    var person = {};
    var computer = {}
    var c = false;
    var p = false;
    var step1 = true;
    var step2 = true;
    for (var i = 0; i < aBtns.length; i++) {
        aBtns[i].addEventListener("click", select)
    }
    function select() {
        person[name] = this.innerHTML;
        for (var j = 0; j < aBtns.length; j++) {
            if (this !== aBtns[j]) {
                computer[name] = aBtns[j].innerHTML;
                break;
            }
        }
        layer.style.display = "none";
        step();
    }

    /**人机互动*/
    function step() {
        if (person[name] == aBtns[0].innerHTML) {//玩家先下
            c = true;
            p = true;
        } else {//电脑先下
            setTimeout(comput, 1000);
        }
    }

    var arrPerson = [];
    var arrCom = [];
    /**监听下棋位置**/
    for (var i = 0; i < li.length; i++) {
        li[i].index = i;
        li[i].addEventListener("click", function () {
            pos(this);
        })
    }
    function pos(obj) {
        var span = obj.querySelector("span");
        if (span.innerHTML == "" && c == true && blinkFlag == false) {
            span.innerHTML = person[name];
            arrPerson.push(obj.index);
            c = false;
            check("player");
            var len = arrCom.length + arrPerson.length;
            if (blinkFlag == false && len == 9) {
                setTimeout(function () {
                    alert("平局，实力不错哦");
                    peace++;
                    pInfo[2].innerHTML = cInfo[2].innerHTML = peace;
                    c = false;
                    init();
                }, 1500)
            } else setTimeout(comput, 1500);
        }
    }
    /**电脑下棋*/
    var posArr = [0, 2, 4, 6, 8];
    var posArr1 = [1, 3, 5, 7];
    function comput() {
        if (p == false) {//电脑先落棋
            var num = Math.floor(Math.random() * 5);
            var span = li[posArr[num]].querySelector("span");
            span.innerHTML = computer[name];
            arrCom.push(posArr[num]);
            c = true;
            p = true;
            step1 = false;
            step2 = false;
        } else if (step1 == true) {//电脑后落棋第一步
            //player第一手下在4位置上
            if (arrPerson[0] == 4) {
                while (c == false) {
                    var num = Math.floor(Math.random() * 5);
                    var span = li[posArr[num]].querySelector("span");
                    if (posArr[num] != 4) {
                        span.innerHTML = computer[name];
                        arrCom.push(posArr[num]);
                        c = true;
                        step1 = false;
                    }
                }
            }
            //player第一手下在0,2,6,8
            else if ((arrPerson[0] == 0 || arrPerson[0] == 2 || arrPerson[0] == 6 || arrPerson[0] == 8) && step1 == true) {
                li[4].querySelector("span").innerHTML = computer[name];
                arrCom.push(4);
                c = true;
                step1 = false;
            }
            //player第一手下在1，3，5，7
            else {
                li[4].querySelector("span").innerHTML = computer[name];
                arrCom.push(4);
                c = true;
                step1 = false;
            }

        } else if (step2 == true) {//电脑后下第2步
            //先判断需不要堵棋
            ran();

            //不需要堵棋的情况

            //第一手下在四角的位置上
            if (c == false) {
                //player第一手下在四角，小于4的位置上，第2手下载1,3,5,7位置
                if ((arrPerson[0] == 0 || arrPerson[0] == 2 || arrPerson[0] == 6 || arrPerson[0] == 8)) {
                    if (arrPerson[0] == 0) {
                        if (arrPerson[1] - 4 == 1) {
                            li[2].querySelector("span").innerHTML = computer[name];
                            arrCom.push(li[2].index);
                            step2 = false;
                            c = true;
                        } else if (arrPerson[1] - 4 == 3) {
                            li[6].querySelector("span").innerHTML = computer[name];
                            arrCom.push(li[6].index);
                            step2 = false;
                            c = true;
                        } else if (arrPerson[1] == 8) {
                            var ranN = Math.floor(Math.random() * 4);
                            li[posArr1[ranN]].querySelector("span").innerHTML = computer[name];
                            arrCom.push(posArr1[ranN]);
                            c = true;
                            step2 = false;
                        }


                    }

                    //player第一手下在对角线，大于4的位置上，第2手下载1,3,5,7位置
                    else if (arrPerson[0] == 2) {
                        if (arrPerson[1] - 4 == -1) {
                            li[0].querySelector("span").innerHTML = computer[name];
                            arrCom.push(li[0].index);
                            step2 = false;
                            c = true;
                        } else if (arrPerson[1] - 4 == 3) {
                            li[8].querySelector("span").innerHTML = computer[name];
                            arrCom.push(li[8].index);
                            step2 = false;
                            c = true;
                        } else if (arrPerson[1] == 6) {
                            var ranN = Math.floor(Math.random() * 4);
                            li[posArr1[ranN]].querySelector("span").innerHTML = computer[name];
                            arrCom.push(posArr1[ranN]);
                            step2 = false;
                            c = true;
                        }

                    }
                    //player第一手下在对角线，大于4的位置上，第2手下载1,3,5,7位置
                    else if (arrPerson[0] == 6) {
                        if (arrPerson[1] - 4 == 1) {
                            li[8].querySelector("span").innerHTML = computer[name];
                            arrCom.push(li[8].index);
                            step2 = false;
                            c = true;
                        } else if (arrPerson[1] - 4 == -3) {
                            li[0].querySelector("span").innerHTML = computer[name];
                            arrCom.push(li[0].index);
                            step2 = false;
                            c = true;
                        } else if (arrPerson[1] == 2) {
                            var ranN = Math.floor(Math.random() * 4);
                            li[posArr1[ranN]].querySelector("span").innerHTML = computer[name];
                            arrCom.push(posArr1[ranN]);
                            step2 = false;
                            c = true;
                        }

                    }

                    //player第一手下在对角线，大于4的位置上，第2手下载1,3,5,7位置
                    else if (arrPerson[0] == 8) {
                        if (arrPerson[1] - 4 == -3) {
                            li[2].querySelector("span").innerHTML = computer[name];
                            arrCom.push(li[2].index);
                            step2 = false;
                            c = true;
                        } else if (arrPerson[1] - 4 == -1) {
                            li[6].querySelector("span").innerHTML = computer[name];
                            arrCom.push(li[6].index);
                            step2 = false;
                            c = true;
                        } else if (arrPerson[1] == 0) {
                            var ranN = Math.floor(Math.random() * 4);
                            li[posArr1[ranN]].querySelector("span").innerHTML = computer[name];
                            arrCom.push(posArr1[ranN]);
                            step2 = false;
                            c = true;
                        }

                    }
                }
                //player第一手下在1，3，5，7的位置上
                else if (arrPerson[0] == 1 || arrPerson[0] == 3 || arrPerson[0] == 5 || arrPerson[0] == 7) {
                    //两手都下在1，3，5，7上
                    if ((arrPerson[0] == 1 && arrPerson[1] == 3) || (arrPerson[0] == 3 && arrPerson[1] == 1)) {
                        li[0].querySelector("span").innerHTML = computer[name];
                        arrCom.push(li[2].index);
                        step2 = false;
                        c = true;
                    }
                    else if ((arrPerson[0] == 1 && arrPerson[1] == 5) || (arrPerson[0] == 5 && arrPerson[1] == 1)) {
                        li[2].querySelector("span").innerHTML = computer[name];
                        arrCom.push(li[2].index);
                        step2 = false;
                        c = true;
                    }
                    else if ((arrPerson[0] == 3 && arrPerson[1] == 7) || (arrPerson[0] == 7 && arrPerson[1] == 3)) {
                        li[6].querySelector("span").innerHTML = computer[name];
                        arrCom.push(li[6].index);
                        step2 = false;
                        c = true;
                    }
                    else if ((arrPerson[0] == 5 && arrPerson[1] == 7) || (arrPerson[0] == 7 && arrPerson[1] == 5)) {
                        li[8].querySelector("span").innerHTML = computer[name];
                        arrCom.push(li[8].index);
                        step2 = false;
                        c = true;
                    }else if((arrPerson[0] == 1 && arrPerson[1] == 7) || (arrPerson[0] == 1 && arrPerson[1] == 7)){
                        while(c==false){
                            var ranN=Math.floor(Math.random()*5);
                            if(li[posArr[ranN]].querySelector("span").innerHTML==""){
                                li[posArr[ranN]].querySelector("span").innerHTML=computer[name];
                                arrCom.push(li[posArr[ranN]].index);
                                c=true;
                            }
                        }
                    }else if((arrPerson[0] == 3 && arrPerson[1] == 5) || (arrPerson[0] == 5 && arrPerson[1] == 3)){
                        while(c==false){
                            var ranN=Math.floor(Math.random()*5);
                            if(li[posArr[ranN]].querySelector("span").innerHTML==""){
                                li[posArr[ranN]].querySelector("span").innerHTML=computer[name];
                                arrCom.push(li[posArr[ranN]].index);
                                c=true;
                            }
                        }
                    }

                    //player第一手下在对角线，小于4的位置上，第2手下载1,3,5,7位置
                    else if (arrPerson[1] == 0) {
                        if (arrPerson[1] - 4 == 1) {
                            li[2].querySelector("span").innerHTML = computer[name];
                            arrCom.push(li[2].index);
                            step2 = false;
                            c = true;
                        } else if (arrPerson[1] - 4 == 3) {
                            li[6].querySelector("span").innerHTML = computer[name];
                            arrCom.push(li[6].index);
                            step2 = false;
                            c = true;
                        } else if (arrPerson[1] == 8) {
                            var ranN = Math.floor(Math.random() * 4);
                            li[posArr1[ranN]].querySelector("span").innerHTML = computer[name];
                            arrCom.push(posArr1[ranN]);
                            c = true;
                            step2 = false;
                        }


                    }

                    //player第一手下在对角线，大于4的位置上，第2手下载1,3,5,7位置
                    else if (arrPerson[1] == 2) {
                        if (arrPerson[0] - 4 == -1) {
                            li[0].querySelector("span").innerHTML = computer[name];
                            arrCom.push(li[0].index);
                            step2 = false;
                            c = true;
                        } else if (arrPerson[0] - 4 == 3) {
                            li[8].querySelector("span").innerHTML = computer[name];
                            arrCom.push(li[8].index);
                            step2 = false;
                            c = true;
                        } else if (arrPerson[0] == 6) {
                            var ranN = Math.floor(Math.random() * 4);
                            li[posArr1[ranN]].querySelector("span").innerHTML = computer[name];
                            arrCom.push(posArr1[ranN]);
                            step2 = false;
                            c = true;
                        }
                    }
                    //player第一手下在对角线，大于4的位置上，第2手下载1,3,5,7位置
                    else if (arrPerson[1] == 6) {
                        if (arrPerson[0] - 4 == 1) {
                            li[8].querySelector("span").innerHTML = computer[name];
                            arrCom.push(li[8].index);
                            step2 = false;
                            c = true;
                        } else if (arrPerson[0] - 4 == -3) {
                            li[0].querySelector("span").innerHTML = computer[name];
                            arrCom.push(li[0].index);
                            step2 = false;
                            c = true;
                        } else if (arrPerson[0] == 2) {
                            var ranN = Math.floor(Math.random() * 4);
                            li[posArr1[ranN]].querySelector("span").innerHTML = computer[name];
                            arrCom.push(posArr1[ranN]);
                            step2 = false;
                            c = true;
                        }

                    }

                    //player第一手下在对角线，大于4的位置上，第2手下载1,3,5,7位置
                    else if (arrPerson[1] == 8) {
                        if (arrPerson[0] - 4 == -3) {
                            li[2].querySelector("span").innerHTML = computer[name];
                            arrCom.push(li[2].index);
                            step2 = false;
                            c = true;
                        } else if (arrPerson[0] - 4 == -1) {
                            li[6].querySelector("span").innerHTML = computer[name];
                            arrCom.push(li[6].index);
                            step2 = false;
                            c = true;
                        } else if (arrPerson[0] == 0) {
                            var ranN = Math.floor(Math.random() * 4);
                            li[posArr1[ranN]].querySelector("span").innerHTML = computer[name];
                            arrCom.push(posArr1[ranN]);
                            step2 = false;
                            c = true;
                        }
                    }
                    else {
                        step2 = false;
                        ran();
                    }
                } else if (arrPerson[0] == 4 && (arrPerson[1] == 0 || arrPerson[1] == 2 || arrPerson[1] == 6 || arrPerson[1] == 8)) {
                    while (c == false) {
                        var ranN = Math.floor(Math.random() * 5);
                        if (li[posArr[ranN]].querySelector("span").innerHTML == "") {
                            li[posArr[ranN]].querySelector("span").innerHTML = computer[name];
                            step2 = false;
                            arrCom.push(posArr[ranN]);
                            c = true;
                        }
                    }
                }
            }
        }

        //当电脑不是后下棋的情况
        else {
            ran();
        }
    }
    function ran() {
        //先进攻
        var row1C = 0;
        var row2C = 0;
        var row3C = 0;
        var col1C = 0;
        var col2C = 0;
        var col3C = 0;
        var r1C = 0;
        var r2C = 0;
        arrCom.forEach(function (x) {
            if (Math.floor(x / 3) == 0) {//第一行
                row1C++;
            } else if (Math.floor(x / 3) == 1) {//第二行
                row2C++;
            } else if (Math.floor(x / 3) == 2) {//第三行
                row3C++;
            }
            if (x % 3 == 0) {//第一列
                col1C++;
            } else if (x % 3 == 1) {//第2列
                col2C++;
            } else if (x % 3 == 2) {//第3列
                col3C++;
            }
            if (x % 2 == 0 && x > 1 && x < 7) {
                r1C++;
            }
            if (x % 4 == 0) {
                r2C++;
            }
        })
        if (row1C == 2 && c == false) {
            for (var i = 0; i < 3; i++) {
                if (li[i].querySelector("span").innerHTML == "") {
                    arrCom.push(li[i].index);
                    li[i].querySelector("span").innerHTML = computer[name];
                    c = true;
                    break;
                }
            }
        } if (row2C == 2 && c == false) {
            for (var i = 3; i < 6; i++) {
                if (li[i].querySelector("span").innerHTML == "") {
                    arrCom.push(li[i].index);
                    li[i].querySelector("span").innerHTML = computer[name];
                    c = true;
                    break;
                }
            }
        } if (row3C == 2 && c == false) {
            for (var i = 6; i < 9; i++) {
                if (li[i].querySelector("span").innerHTML == "") {
                    arrCom.push(li[i].index);
                    li[i].querySelector("span").innerHTML = computer[name];
                    c = true;
                    break;
                }
            }
        } if (col1C == 2 && c == false) {
            for (var i = 0; i < 3; i++) {
                if (li[3 * i].querySelector("span").innerHTML == "") {
                    arrCom.push(li[3 * i].index);
                    li[3 * i].querySelector("span").innerHTML = computer[name];
                    c = true;
                    break;
                }
            }
        } if (col2C == 2 && c == false) {
            for (var i = 0; i < 3; i++) {
                if (li[3 * i + 1].querySelector("span").innerHTML == "") {
                    arrCom.push(li[3 * i + 1].index);
                    li[3 * i + 1].querySelector("span").innerHTML = computer[name];
                    c = true;
                    break;
                }
            }
        } if (col3C == 2 && c == false) {
            for (var i = 0; i < 3; i++) {
                if (li[3 * i + 2].querySelector("span").innerHTML == "") {
                    arrCom.push(li[3 * i + 2].index);
                    li[3 * i + 2].querySelector("span").innerHTML = computer[name];
                    c = true;
                    break;
                }
            }
        } if (r1C == 2 && c == false) {
            for (var i = 1; i < 4; i++) {
                if (li[2 * i].querySelector("span").innerHTML == "") {
                    arrCom.push(li[2 * i].index);
                    li[2 * i].querySelector("span").innerHTML = computer[name];
                    c = true;
                    break;
                }
            }
        } if (r2C == 2 && c == false) {
            for (var i = 0; i < 3; i++) {
                if (li[4 * i].querySelector("span").innerHTML == "") {
                    arrCom.push(li[4 * i].index);
                    li[4 * i].querySelector("span").innerHTML = computer[name];
                    c = true;
                    break;
                }
            }
        }
        if (c == false) {//防守
            var row1 = 0;
            var row2 = 0;
            var row3 = 0;
            var col1 = 0;
            var col2 = 0;
            var col3 = 0;
            var r1 = 0;
            var r2 = 0;
            arrPerson.forEach(function (x) {
                //判断玩家落棋情况
                if (Math.floor(x / 3) == 0) {//第一行
                    row1++;
                } if (Math.floor(x / 3) == 1) {//第二行
                    row2++;
                } if (Math.floor(x / 3) == 2) {//第三行
                    row3++;
                }
                if (x % 3 == 0) {//第一列
                    col1++;
                } if (x % 3 == 1) {//第2列
                    col2++;
                } if (x % 3 == 2) {//第3列
                    col3++;
                }
                if (x % 2 == 0 && x > 1 && x < 7) {
                    r1++;
                }
                if (x % 4 == 0) {
                    r2++;
                }
            })
            if (row1 == 2 && c == false) {
                for (var i = 0; i < 3; i++) {
                    if (li[i].querySelector("span").innerHTML == "") {
                        li[i].querySelector("span").innerHTML = computer[name];
                        arrCom.push(li[i].index);
                        c = true;
                        break;
                    }
                }
            } if (row2 == 2 && c == false) {
                for (var i = 3; i < 6; i++) {
                    if (li[i].querySelector("span").innerHTML == "") {
                        li[i].querySelector("span").innerHTML = computer[name];
                        arrCom.push(li[i].index);
                        c = true;
                        break;
                    }
                }
            } if (row3 == 2 && c == false) {
                for (var i = 6; i < 9; i++) {
                    if (li[i].querySelector("span").innerHTML == "") {
                        li[i].querySelector("span").innerHTML = computer[name];
                        arrCom.push(li[i].index);
                        c = true;
                        break;
                    }
                }
            } if (col1 == 2 && c == false) {
                for (var i = 0; i < 3; i++) {
                    if (li[3 * i].querySelector("span").innerHTML == "") {
                        li[3 * i].querySelector("span").innerHTML = computer[name];
                        arrCom.push(li[3 * i].index);
                        c = true;
                        break;
                    }
                }
            } if (col2 == 2 && c == false) {
                for (var i = 0; i < 3; i++) {
                    if (li[3 * i + 1].querySelector("span").innerHTML == "") {
                        li[3 * i + 1].querySelector("span").innerHTML = computer[name];
                        arrCom.push(li[3 * i + 1].index);
                        c = true;
                        break;
                    }
                }
            } if (col3 == 2 && c == false) {
                for (var i = 0; i < 3; i++) {
                    if (li[3 * i + 2].querySelector("span").innerHTML == "") {
                        li[3 * i + 2].querySelector("span").innerHTML = computer[name];
                        arrCom.push(li[3 * i + 2].index);
                        c = true;
                        break;
                    }
                }
            } if (r1 == 2 && c == false) {
                for (var i = 1; i < 4; i++) {
                    if (li[2 * i].querySelector("span").innerHTML == "") {
                        li[2 * i].querySelector("span").innerHTML = computer[name];
                        arrCom.push(li[2 * i].index);
                        c = true;
                        break;
                    }
                }
            } if (r2 == 2 && c == false) {
                for (var i = 0; i < 3; i++) {
                    if (li[4 * i].querySelector("span").innerHTML == "") {
                        li[4 * i].querySelector("span").innerHTML = computer[name];
                        arrCom.push(li[4 * i].index);
                        c = true;
                        break;
                    }
                }
            }
            while (c == false && step2 == false && step1 == false) {
                var num = Math.floor(Math.random() * 9);
                if (li[num].querySelector("span").innerHTML == "") {
                    arrCom.push(li[num].index);
                    li[num].querySelector("span").innerHTML = computer[name];
                    c = true;
                }
            }
        }
        check("computer");
        var len = arrCom.length + arrPerson.length;
        if (blinkFlag == false && len == 9) {
            setTimeout(function () {
                alert("平局，实力不错哦");
                peace++;
                pInfo[2].innerHTML = cInfo[2].innerHTML = peace;
                init();
            }, 1500)
        }
    }
    /*初始化*/
    function init() {
        clearTimeout(timer);
        c = false;
        p = false;
        first = true;
        blinkFlag = false;
        arrPerson = [];
        arrCom = [];
        step1 = true;
        step2 = true;
        hdash.style.top = 16.66667 + "%";
        vdash.style.left = 16.6667 + "%";
        for (var i = 0; i < li.length; i++) {
            li[i].querySelector("span").innerHTML = "";
            li[i].removeEventListener("click", pos);
        }
        step();
    }
    /***闪烁提示*/
    function blink(obj, winer) {
        var now = new Date();
        function show() {
            if (new Date - now < 3000) {
                obj.style.display = "block";
                var timer = setTimeout(function () {
                    obj.style.display = "none";
                    timer = setTimeout(show, 200)
                }, 200)
            } else {
                clearTimeout(timer);
                setTimeout(init, 1500);
                if (winer == "computer") {
                    computerWin++;
                    alert("你输了,没关系，再来")
                } else if (winer == "player") {
                    playerWin++;
                    alert("恭喜你，赢的漂亮");
                }
            }
            cInfo[1].innerHTML = pInfo[0].innerHTML = playerWin;
            cInfo[0].innerHTML = pInfo[1].innerHTML = computerWin;
        }
        show();
        blinkFlag = true;
    }
    /**判定**/
    function check(player) {
        var row1 = 0;
        var row2 = 0;
        var row3 = 0;
        var col1 = 0;
        var col2 = 0;
        var col3 = 0;
        var r1 = 0;
        var r2 = 0;
        var arr = [];
        if (player == "player") {
            arr = arrPerson;
        } else if (player == "computer") {
            arr = arrCom;
        }
        arr.forEach(function (x) {
            //判断落棋情况
            if (Math.floor(x / 3) == 0) {//第一行
                row1++;
            } if (Math.floor(x / 3) == 1) {//第二行
                row2++;
            } if (Math.floor(x / 3) == 2) {//第三行
                row3++;
            }
            if (x % 3 == 0) {//第一列
                col1++;
            } if (x % 3 == 1) {//第2列
                col2++;
            } if (x % 3 == 2) {//第3列
                col3++;
            }
            if (x % 2 == 0 && x > 1 && x < 7) {
                r1++;
            }
            if (x % 4 == 0) {
                r2++;
            }
        })
        if (row1 == 3) {
            blink(hdash, player);
        }
        else if (row2 == 3) {
            hdash.style.top = 33.333 + 16.6667 + "%";
            blink(hdash, player);

        } else if (row3 == 3) {
            hdash.style.top = 66.6667 + 16.6667 + "%";
            blink(hdash, player);
        } else if (col1 == 3) {
            blink(vdash, player);
        } else if (col2 == 3) {
            vdash.style.left = 33.333 + 16.6667 + "%";
            blink(vdash, player);
        } else if (col3 == 3) {
            vdash.style.left = 66.6667 + 16.6667 + "%";
            blink(vdash, player);
        } else if (r1 == 3) {
            blink(rotate2, player);
        } else if (r2 == 3) {
            blink(rotate1, player);
        }
    }
}