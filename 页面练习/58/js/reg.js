window.onload=function(){
    var texts=document.getElementsByClassName("text");
    var info=document.getElementsByClassName("info");
    var getNumber=document.getElementsByClassName("getnumber")[0];
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
    var china_telecom=/^1((?:3)3|(?:4)9|(?:5)3|(?:7)[37]|(?:8)[019]|(?:9)9)\d{8}/
    for(var i=0;i<2;i++){
        texts[i].index=i;
        texts[i].addEventListener("blur",check);
        texts[i].addEventListener("focus",fade);
    }
    function check(){
        if(this.index==0){
            if(!china_mobile.test(this.value)&&!china_unicom.test(this.value)&&!china_telecom.test(this.value)){
                info[this.index].style.display="inline-block";
            }
        }else if(this.index==1){
            if(this.value.length!=4){
                info[this.index+1].style.display="inline-block";
            }
        }
    }
    function fade(){
        var index=this.index==1?2:0;
        if(index==0){
            for(var i=0;i<2;i++){
                info[i].style.display="none";
            }
        }info[index].style.display="none";
    }
}