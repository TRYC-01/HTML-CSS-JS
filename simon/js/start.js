//ON,and then Start
var start = function () {
    var _this = this;
    var startBtn = $('#startBtnShape');
    var isPlaying = $('#isPlaying');
    var playInfo = $('.playInfo');
    startBtn.on('click', function () {
        if (_this.canStart) {
            //显示玩家闯关信息
            playInfo.each(function (index, ele) {
                $(ele).addClass('off');
            });
            isPlaying.removeClass('off');
            //清除计时器
            clearInterval(_this.timer);
            _this.init('start');
            _this.startTimer=setTimeout(_this.playing, 500);
        }
    })
};

