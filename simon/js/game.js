var Game = function () {
    var _this = this;
    var isPlaying = $('#isPlaying');
    var playInfo = $('.playInfo');
    var error = $('#error');
    var colorDiv = $('.colorArea');
    _this.timer = null;
    //ON/OFF
    _this.isStart = false;
    //isChecked
    _this.isChecked = true;
    //refresh
    _this.refresh = false;
    //strict or normal
    _this.strict = false;
    //start firsttime click
    _this.startFirst = true;
    //the order of showing colorDiv
    var orderList = [];
    //玩家闯关信息
    _this.step = 1;
    //色块类[绿，红，黄，蓝]
    var Class = ['green', 'red', 'yellow', 'blue'];
    var playing = function () {
        //亮起色块
        order()
    }

    //亮起色块定时器存储数组
    //随机亮起色块
    _this.timeList = [];
    function order() {
        _this.timeList=[];
        _this.delayTime = null;
        var num = Math.floor(Math.random() * 4);
        //将随机色块坐标信息输入orderList
        if (!_this.strict && _this.GameOver) {//非strict模式gameover
            // donothing
        } else {
            orderList.push(num);
        }
        //orderList中的色块按顺序亮起
        $(orderList).each(function (index, ele) {
            _this.delayTime = setTimeout(function () {
                $(colorDiv[ele]).addClass(Class[ele]);
                voice('add', ele)
                setTimeout(function () {
                    $(colorDiv[ele]).removeClass(Class[ele]);
                    voice('del', ele)
                    if (index == orderList.length - 1) {
                        setTimeout(function () {
                            _this.GameOver = false;
                            _this.isChecked = false;
                            pointer();
                            // console.log(orderList)
                            bindLisen()
                        }, 30)
                    }
                }, 800);
            }, 1200 * (index + 1));
            _this.timeList.push(_this.delayTime);
        })
    }

    //色块点击手型指示
    function pointer() {
        if (!_this.isChecked) {
            colorDiv.each(function () {
                $(this).css('cursor', 'pointer');
            })
        } else {
            colorDiv.each(function () {
                $(this).css('cursor', 'initial');
            })
        }
    }
    //监听玩家点击事件
    _this.clickNum = 0;
    _this.GameOver = false;
    function bindLisen() {
        colorDiv.each(function (index, ele) {
            this.index = index;
            $(ele).bind('click', check);
        })
    }
    //移除绑定
    function removeBind() {
        colorDiv.each(function (index, ele) {
            $(ele).unbind('click', check);
        })
    }

    //判定
    function check() {
        voice('click')
        //敲击更改相应色块颜色
        changeColor(this)
        if (this.index === orderList[_this.clickNum] && _this.clickNum < _this.step) {
            _this.clickNum++;
            _this.GameOver = false;
            _this.isChecked = false;
        } else {
            if (_this.clickNum < _this.step) {
                _this.GameOver = true;
                _this.isChecked = true;
            }
        }
        //Gameover
        if (_this.GameOver) {//GameOver
            //失败
            error("error");
            voice('error')
            setTimeout(function () {
                error('isplaying')
            }, 1100)
            if (_this.strict) {
                _this.step = 1;
                _this.clickNum = 0;
                _this.GameOver = true;
                _this.isChecked = true;
                orderList = [];
                removeBind()
                $('#step').html('01');
                order();
            } else {
                _this.clickNum = 0;
                _this.GameOver = true;
                _this.isChecked = true;
                removeBind()
                order();
            }

        }
        //pass the current game step
        if (_this.clickNum === _this.step) {
            _this.step++
            if (_this.step > 20) {
                setTimeout(function () {
                    $('#modal').trigger('click');
                    init('start');
                }, 1000);
            }
            else {
                _this.clickNum = 0;
                _this.isChecked = true;
                removeBind()
                $('#step').html(_this.step < 10 ? "0" + _this.step : _this.step)
                order();
            }
        }
        pointer();
    }

    //highlighting
    function changeColor(obj) {
        $(colorDiv[obj.index]).addClass(Class[obj.index]);
        setTimeout(function () {
            $(colorDiv[obj.index]).removeClass(Class[obj.index]);
        }, 100)
    }

    //init the game
    var init = function (type) {
        if (type === "off") {//ON/OFF btn
            var strictInfo = $('#strictInfo');
            strictInfo.removeClass('strict');
            _this.isStart = false;
            _this.canStart = false;
            _this.strict = false;
            clearTimeout(_this.startTimer);
            $(_this.timeList).each(function (index, ele) {
                console.log(ele)
                clearTimeout(ele)
            });
        } else if (type === "start") {//Start btn
            _this.isStart = true;
            _this.canStart = true;
            $('#step').html('01');
            if (_this.startFirst) {//_this.step=1时重新start
                _this.startFirst = false;
            } else {//_this.step>1时重新start
                $(_this.timeList).each(function (index, ele) {
                    console.log(ele)
                    clearTimeout(ele)
                });
            }
        }
        _this.timeList = [];
        removeBind();
        _this.refresh = true;
        _this.isChecked = true;
        _this.GameOver = false;
        _this.clickNum = 0;
        _this.step = 1;
        orderList = [];
        pointer();
    }

    //strict model
    function strict() {
        var strictInfo = $('#strictInfo');
        var strictBtn = $('#strictBtnShape');
        strictBtn.on('click', function () {
            if (_this.isStart) {
                if (_this.strict) {
                    _this.strict = false;
                } else {
                    _this.strict = true;
                }
                strictInfo.toggleClass('strict');
            }
        })
    }
    strict();
    //error
    var error = function error(to) {
        var err = $('#error');
        var isplaying = $('#isPlaying')
        if (to === 'error') {
            err.removeClass('off');
            isplaying.addClass('off')
        } else if (to === 'isplaying') {
            isplaying.removeClass('off')
            err.addClass('off')
        }
    }
    //按键声音
    function voice(type, index) {
        if (type === 'add') {
            if (index === 0) {
                $("<audio src='audio/8927.wav'>").appendTo('#voice').attr('autoplay', true);
            } else if (index === 1) {
                $("<audio src='audio/4951.wav'>").appendTo('#voice').attr('autoplay', true);

            } else if (index === 2) {
                $("<audio src='audio/5017.wav'>").appendTo('#voice').attr('autoplay', true);

            } else if (index === 3) {
                $("<audio>").appendTo('#voice').attr({ autoplay: true, src: src = 'audio/9027.wav', });
            }
        } else if (type === "error") {
            $("<audio>").appendTo('#voice').attr({ autoplay: true, src: src = 'audio/error.wav', });
        } else if (type === 'click') {
            $("<audio>").appendTo('#voice').attr({ autoplay: true, src: src = 'audio/click.wav', });
        } else if (type === 'del') {
            $('#voice').empty()
        }
    }
    //导出API
    this.init = init;
    this.canStart = false;
    this.isPlaying = isPlaying;
    this.switchBtn = switchBtn;
    this.start = start;
    this.playing = playing;
}

