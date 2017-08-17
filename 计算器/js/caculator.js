window.onload = function () {
    //取消M- M+ MR MC功能键按钮
    var off = document.getElementsByClassName("off")[0];
    //caculator开/关机按钮
    var on = document.getElementsByClassName("ON/C")[0];
    //M-等功能按钮及GT按钮
    var M = document.getElementsByClassName("m-btn")[0];
    //screen显示屏
    var text = document.getElementsByClassName("result-text")[0];
    //clear功能按键
    var clearBtns = document.getElementsByClassName("clear-btn");
    //number按钮
    var numberBtns = document.getElementsByClassName("num-btn");
    //运算按钮
    var operationBtns = document.getElementsByClassName("opera-btn");
    var nagetiveBtn=document.getElementsByClassName("nagetive-btn")[0];
    var p = document.getElementsByClassName("result")[0];
    var numArr = [7, 8, 9, 4, 5, 6, 1, 2, 3, 0, "00", "."];
    //存放单次运算结果
    var result = [];
    var first = true;//计算器开启；
    var dot = false;//小数点判断
    var ope = false;//操作符判断
    var iscaculate = false;
    var isnagetive=false;
    var r;
    //caculator没有开机的情况
    function AC() {
        var p = document.getElementsByClassName("result")[0];
        while (p.lastElementChild.previousElementSibling) {
            p.removeChild(p.lastElementChild);
        }
        p.lastElementChild.innerHTML = "0";
        dot = false;
        ope = false;
    }
    on.addEventListener("click", function () {
        AC();
        if (first) {
            getNumber();
            clear();
            operate();
            first = false;
        }
        dot = false;
        ope = false;
    })

    //获得number数值
    function getNumber() {
        for (var i = 0, numbtn = numberBtns.length; i < numbtn; i++) {
            numberBtns[i].index = i;
            numberBtns[i].addEventListener("click", function () {
                var last = p.lastElementChild;
                if (iscaculate) {//当前显示为计算的结果时
                    if (this.index == 9 || this.index == 10) {
                        last.innerHTML = "0";
                    } else if (this.index == 11) {
                        last.innerHTML = "0.";
                    } else {
                        last.innerHTML = numArr[this.index];
                    }
                }
                else if (dot == true) {//小数点已经被点过的情况
                    if (this.index == 11) {
                        return;
                    } else {
                        last.innerHTML += numArr[this.index];
                    }
                } else if (dot == false) {//小数点没有被点的情况
                    if (this.index == 11) {
                        dot = true;//设定小数点被点过
                        if (last.innerHTML == "") {
                            last.innerHTML = "0";
                        }
                        last.innerHTML += numArr[this.index];
                    } else if (this.index == 9 || this.index == 10) {
                        if (last.innerHTML == "0") {
                            return;
                        } else if (last.innerHTML == "") {
                            last.innerHTML = "0"
                        } else {
                            last.innerHTML += numArr[this.index];
                        }
                    } else if (last.innerHTML == "0" || last.innerHTML == "") {
                        last.innerHTML = numArr[this.index];
                    }
                    else {
                        last.innerHTML += numArr[this.index];
                    }
                }
                ope = false;
                iscaculate = false;
            })
        }

    }


    //clear-btn →
    function clear() {
        for (var i = 0, length = clearBtns.length; i < length; i++) {
            clearBtns[i].index = i;
            clearBtns[i].addEventListener("click", function () {
                if (this.index === 0 || this.index === 2) {
                    if (iscaculate) {
                        AC();
                    } else {
                        removeWrong();
                    }
                }
                if (this.index === 1) {
                    AC();
                }
            })
        }
    }

    //删除单个number函数
    function removeWrong() {
        var p = document.getElementsByClassName("result")[0];
        var last = p.lastElementChild;
        if (p.lastElementChild.previousElementSibling) {//当有多个子元素的情况
            if (last.innerHTML.length == 1 || last.innerHTML == "") {
                p.removeChild(p.lastElementChild);
            }
            else if (dot == true) {//有小数点
                if (last.innerHTML[last.innerHTML.length - 1] == ".") {//最后一位为小数点
                    dot = false;
                }
                last.innerHTML = last.innerHTML.substring(0, last.innerHTML.length - 1);
            } else if (dot == false) {//没有小数点
                last.innerHTML = last.innerHTML.substring(0, last.innerHTML.length - 1);
            }
        } else {//只有当前一个子元素
            if (dot == true) {
                if (last.innerHTML[last.innerHTML.length - 1] == ".") {
                    dot = false;
                }
                last.innerHTML = last.innerHTML.substring(0, last.innerHTML.length - 1);
            } else if (dot == false) {
                if (last.innerHTML.length == 1) {
                    last.innerHTML = "0";
                } else {
                    last.innerHTML = last.innerHTML.substring(0, last.innerHTML.length - 1);
                }
            }

        }
    }



    //点击运算符
    function operate() {
        for (var i = 0, length = operationBtns.length; i < length; i++) {
            operationBtns[i].index = i;
            operationBtns[i].addEventListener("click", function () {
                if (this.index !== 6) {
                    opera(this);
                } else { caculate() }

            })
        }
    }
    function opera(obj) {
        var p = document.getElementsByClassName("result")[0];
        var last = p.lastElementChild;
        if (ope == false) {
            last.innerHTML = parseFloat(last.innerHTML) + obj.text;
            ope = true;
            dot = false;
            result.push(last.innerHTML);
        }
        var newNode = document.createElement("span");
        newNode.className = "result-text";
        p.appendChild(newNode);
    }
    //计算最终结果
    function caculate() {
        var p = document.getElementsByClassName("result")[0];
        // var strs=p.getElementsByTagName("span");
        // var opeNumArr=[];
        var strs = p.innerText;
        while (p.lastElementChild.previousElementSibling) {
            p.removeChild(p.lastElementChild);
        }
        p.lastElementChild.innerHTML = change(strs);
        dot = false;
        ope = false;
    }

    //将字符串转为数字运算
    function change(str) {
        //找出乘法除法等运算的数字
        // var regD = /[\-\+]?((\d+\.\d+)?(\d+)?[\*\/\%])+(\d+\.\d+)?(\d+)?/g;
        //找出加减法的运算
        var arr = str.split("+");
        var arr1 = [];//存储非乘除等运算字符,需要过滤
        var arr2 = [];//存储含有乘除运算的字符
        var arr3 = [];//存储乘除运算的字符,存储的都是待减去的表达式
        var arr4 = [];//存储乘除运算的字符,存储的都是待加上的表达式
        var arr6 = [];//存储arr1过滤数字;
        var endResult = 0;
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].indexOf("*") == -1 && arr[i].indexOf("/") == -1 && arr[i].indexOf("%") == -1) {//
                arr1.push(arr[i]);//456-123
            } else {
                arr2.push(arr[i]);
            }
        }
        //arr1 
        //456-123
        //
        for (var l = 0; l < arr1.length; l++) {
            if (arr1[l].indexOf("-") == -1) {//没有操作符
                arr6.push(arr1[l]);
            } else {//将字符串进行切分
                var arr7 = arr1[l].split("-");
                for (var m = 0; m < arr7.length; m++) {
                    if (m == 0) {//第一个待加数值
                        arr6.push(arr7[m]);
                    } else {
                        arr6.push("-" + arr7[m]);
                    }
                }
            }
        }
        //611*8118
        //21.1111-611*8118
        //21.111-31-611*8118
        //21.111-31-611*8118-611*8118
        //611*8118-21.111-31-611*8118-611*8118
        //对arr2进行过滤
        for (var j = 0; j < arr2.length; j++) {
            if (arr2[j].indexOf("-") == -1) {//待加的乘法或除法等字符
                arr4.push(arr2[j]);
            } else {//将字符串以-符号进行切分
                var arr5 = arr2[j].split("-");
                for (var k = 0; k < arr5.length; k++) {
                    if (k == 0) {//第一个待加的未知字符串
                        if(arr5[k]==""){continue;}
                        if (arr5[k].indexOf("*") == -1 && arr5[k].indexOf("/") == -1 && arr5[k].indexOf("%") == -1) {
                            //第一个数组元素没有操作符的情况下，即将被加的一个数
                            arr6.push(arr5[k]);
                        } else {//即将被加的乘除运算字符串
                            arr4.push(arr5[k]);
                        }

                    } else {//都是要被加的未知字符串
                        if (arr5[k].indexOf("*") == -1 && arr5[k].indexOf("/") == -1 && arr5[k].indexOf("%") == -1) {
                            //待减的数字
                            arr6.push("-" + arr5[k]);
                        } else {//待减的乘除表达式
                            arr3.push(arr5[k]);
                        }
                    }
                }

            }

        }
        //定义一个计算乘除数组的函数
        function DorT(str) {
            //6.11*8*9*10
            var i = 0;
            var str1 = str;
            var is = true;
            var result = parseFloat(str1);
            var pos;
            var symbol;
            var reg = /[\*\/\%]/;
            while (is) {
                pos = str1.search(reg);
                symbol = str1[pos];
                str1 = str1.substring(pos + 1);
                if (symbol == "*") {
                    result *= parseFloat(str1);
                } else if (symbol == "/") {
                    result /= parseFloat(str1);
                } else if (symbol == "%") {
                    result %= parseFloat(str1)
                }
                if (reg.test(str1)) {
                    is = true;
                } else {
                    is = false;
                }
            }
            return result;
        }
        //arr4待加
        //arr3待减
        //arr6非乘除
        var result1 = arr6.reduce(function (a, b) {
            return parseFloat(a) + parseFloat(b);
        }, 0)
        var result2 = 0;
        var result3 = 0;
        arr4.map(function (x) {
            result2 += DorT(x);
        })
        arr3.map(function (x) {
            result3 -= DorT(x);
        })
        endResult = parseFloat(result1) + parseFloat(result2) + parseFloat(result3);
        iscaculate = true;
        return endResult;
    }
}