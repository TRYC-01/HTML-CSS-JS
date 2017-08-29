window.onload = function (e) {
    var ul = document.getElementsByClassName("banner-list")[0];
    var pre = document.getElementsByClassName("pre")[0];
    var next = document.getElementsByClassName("next")[0];
    var preFlag = false;
    var nextFlag = true;
    var searchbar = document.getElementsByClassName("searchbar")[0];
    var aBtns = document.getElementsByClassName("rbtn");
    document.addEventListener("scroll", show);
    if (scrollY > 200) {
        searchbar.style.display = "block";
    }
    function show() {
        if (scrollY > 200) {
            searchbar.style.display = "block";
        }
        else if (scrollY <= 200) {
            searchbar.style.display = "none";
        }
    }
    pre.addEventListener("click", slide);
    next.addEventListener("click", slide);
    aBtns[0].addEventListener("click",slide);
    aBtns[1].addEventListener("click",slide);
    function slide() {
        if ((this == pre||this==aBtns[0]) && preFlag == true) {
            toggle(ul, 0, this);

        } else if ((this == next||this==aBtns[1]) && nextFlag == true) {
            toggle(ul, -400, this);
        }
        function toggle(which, target, btn) {
            if (btn ==pre||btn==aBtns[0]) {
                aBtns[0].className = "rbtn active";
                aBtns[1].className = "rbtn";
            } else if (btn == next||btn==aBtns[1]) {
                aBtns[0].className = "rbtn";
                aBtns[1].className = "rbtn active";
            }
            var timer = setTimeout(function () {
                var speed = (target - parseFloat(which.style.left)) / 5;
                speed = (speed > 0 ? Math.ceil(speed) : Math.floor(speed));
                if (speed !== 0) {
                    which.style.left = parseFloat(which.style.left) + speed + "px";
                    toggle(which, target, btn);
                } else {
                    clearTimeout(timer);
                    if (btn == pre||btn==aBtns[0]) {
                        preFlag = false;
                        nextFlag = true;
                    } else if (btn == next||btn==aBtns[1]) {
                        preFlag = true;
                        nextFlag = false;
                    }
                }
            }, 100)

        }
    }
}