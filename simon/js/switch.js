var switchBtn = function () {
    //游戏开关切换
    var _this = this;
    var onBtn = $('#onBtn');
    var startBtn = $('#start');
    var playInfo = $('.playInfo');
    var loading = function () {
        $('#onArea').on('click', function () {

            //ON or OFF
            if (onBtn.hasClass('off')) {//open the game
                onBtn.css('left', '25px');
                _this.isStart = true;
                _this.canStart = true;
                _this.refresh = false;
            } else {//close the game
                onBtn.css('left', '0px');
                _this.init('off');
                playInfo.each(function (index, ele) {
                    $(ele).addClass('off');
                });
                $('#step').html('01');
            }
            onBtn.toggleClass('off');
            //开始阶段用户没有点击start闪烁
            if (_this.isStart) {
                _this.timer = setInterval(show, 400)
            } else {
                clearInterval(_this.timer);
                startBtn.addClass('off')
            }
        })

        //开始计数显示闪烁
        function show() {
            if (startBtn.hasClass('off')) {
                startBtn.toggleClass('off')
            } else { startBtn.toggleClass('off') }
        }
    }
    loading();
}