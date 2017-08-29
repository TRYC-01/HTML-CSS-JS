window.onload=function(){
    /**
     * 移动号码段：134,135,136,137,138,139,147,150,151,152,157,158,159,178,182,183,184,187,188,198
     */
    var china_mobile=/^1((?:3)[4-9]|(?:4)7|(?:5)[012789]|(?:7)8|(?:8)[23478]|(?:9)8)\d{8}/;
    /**
     * 联通好毛段：130、131、132、155、156、145、175、176、185、186、166
     */
    var china_unicom=/^1((?:3)[0-2]|(?:5)[56]|(?:4)5|(?:7)[56]|(?:8)[56]|(?:6)6)\d{8}/;
    /**
     * 电信号码段：133、149、153、173、177、180、181、189、199
     */
    var china_telecom=/^1((?:3)3|(?:4)9|(?:5)3|(?:7)[37]|(?:8)[019]|(?:9)9)\d{8}/;
    var desk=document.getElementsByClassName("desk")[0];
    var mobile=document.getElementsByClassName("mobile")[0];
    var btnLv1=document.getElementById("change");
    var bgwrap=document.getElementsByClassName("bgwrap")[0];
    var bgIcon=bgwrap.getElementsByTagName("span");
    var form=document.getElementsByTagName("form")[0];
    var deskDiv=form.getElementsByTagName("div");
    var deskBtn=document.getElementsByClassName("toggle-btn")[0];
    var deskBtns=deskBtn.getElementsByTagName("a");

    //监听点击按钮，选择桌面登录还是扫码登录
    btnLv1.addEventListener("click",toggle);
    //电脑、扫码登录切换
    function toggle(){
        if(desk.style.display!=="none"){
            desk.style.display="none";
            mobile.style.display="block";
            bgIcon[1].style.display="inline-block";
            bgIcon[0].style.display="none";
            if(this.id=="change"){
                this.innerHTML="密码登录";
            }else {
                btnLv1.innerHTML="密码登录";
            }
            
        }else {
            desk.style.display="block";
            mobile.style.display="none";
            bgIcon[1].style.display="none";
            bgIcon[0].style.display="inline-block";
            if(this.id=="change"){
                this.innerHTML="扫码登录";
            }else {
                btnLv1.innerHTML="扫码登录";
            }
        }
    }

    //监听点击图标，选择电脑登录还是扫码登录
    for(var i=0;i<bgIcon.length;i++){
        bgIcon[i].addEventListener("click",toggle);
    }

    //监听选择密码、动态码登录
    for(var j=0;j<deskBtns.length;j++){
        deskBtns[j].index=j;
        deskBtns[j].addEventListener("click",deskToggle);
    }

    //密码、动态码登录切换
    function deskToggle(){
        for(var i=0;i<deskDiv.length;i++){
            deskDiv[i].style.display="none";
            deskBtns[i].style.color="#aaa";
        }
        deskDiv[this.index].style.display="block";
        this.style.color="#ff552e";
    }
}