function getId(element) {
    return element = document.getElementById(element);
}

function showKeyboard(element) {
    var d = getId(element);
    var h = d.offsetHeight;
    var maxh = keyboardHeight;

    function dmove() {
        if (h >= maxh) {
            d.style.height = h;
            clearInterval(iIntervalId);
        } else {
            h += keyboardHeight;
            d.style.display = 'block';
            d.style.height = h + 'px';
        }
    }

    iIntervalId = setInterval(dmove, 2);
}
function hideKeyboard(element) {
    var d = getId(element);
    var h = d.offsetHeight;
    var maxh = keyboardHeight;

    function dmove() {
        if (h <= 0) {
            d.display = 'none';
            clearInterval(iIntervalId);
        } else {
            h -= keyboardHeight;
            d.style.height = h + 'px';
        }
    }

    iIntervalId = setInterval(dmove, 2);
}

//////////////////////////////////////////////////////////
function stateButClick() {
    var bannerHeight = $("#shrink").height() + parseInt($("#shrink").css("padding-bottom"));
    if ($("#stateBut").attr("switch") == "0") {
        $("#stateBut").attr("switch","1") ;
        $("#stateBut").css("background", 'url("img/scrollUp.png") 0 0');
        stateButUp();
        var data = {
            height: gameHeight + bannerHeight,
            width: gameWidth
        };
        bdc.external.appSend('local/ui/set_window_size', data || {}, function () {
        });

        if(type == "unity3d"){
            $("#mediaLayout").children("embed").css("background","red");
        }
        DataReport.clickOperationButton("2");
    } else {
        $("#stateBut").attr("switch","0") ;
        $("#stateBut").css("background", 'url("img/pullDown.png") 0 0');
        stateButUp();
        var data = {
            height: keyboardHeight + gameHeight + bannerHeight + 15,
            width: gameWidth
        };
        bdc.external.appSend('local/ui/set_window_size', data || {}, function () {
        });
        if(type == "unity3d"){
            $("#mediaLayout").children("embed").css("background","yellow");
        }
        DataReport.clickOperationButton("1");
    }

}


function stateButHover(){
    if($("#stateBut").attr("switch") == "0")
    {
        $("#stateBut").css("background", 'url("img/pullDown.png") -78px 0');
    }else
    {
        $("#stateBut").css("background", 'url("img/scrollUp.png") -78px 0');
    }

}


function stateButDown(){
    if($("#stateBut").attr("switch") == "0")
    {
        $("#stateBut").css("background", 'url("img/pullDown.png") -156px 0');
    }else
    {
        $("#stateBut").css("background", 'url("img/scrollUp.png") -156px 0');
    }

}

function stateButUp(){
    if($("#stateBut").attr("switch") == "0")
    {
        $("#stateBut").css("background", 'url("img/pullDown.png") -78px 0');
    }else
    {
        $("#stateBut").css("background", 'url("img/scrollUp.png") -78px 0');
    }
}

function stateButOut(){
    if($("#stateBut").attr("switch") == "0")
    {
        $("#stateBut").css("background", 'url("img/pullDown.png") 0 0');
    }else
    {
        $("#stateBut").css("background", 'url("img/scrollUp.png") 0 0');
    }
}
//////////////////////////////////////////////////////////
function refreshClick() {
    if(type != "unity3d"){
        $("#media")[0].src = $("#media")[0].src;
    }else{
        unity3dDetection(MediaUrl);
    }
    DataReport.clickRefreshButton();
}

function voiceClick() {
    if ($("#voice").attr("value") == "turnOn") {
        $("#voice").attr("value", "turnOff");
        $("#voice").css("background", 'url("img/turnOff.png") 0 0');
        voiceOnMouseUp();
        bdc.external.appSend('local/basic/set_mute', {mute: 1}, function () {
        });
        DataReport.clickVoiceButton("1");

    }
    else {
        $("#voice").attr("value", "turnOn");
        $("#voice").css("background", 'url("img/turnOn.png") 0 0');
        voiceOnMouseUp();
        bdc.external.appSend('local/basic/set_mute', {mute: 0}, function () {
        });
        DataReport.clickVoiceButton("2");
    }

}

function voiceMouseHover(){
    if ($("#voice").attr("value") == "turnOn") {
        $("#voice").css("background", 'url("img/turnOn.png") -22px 0');
    }
    else {
        $("#voice").css("background", 'url("img/turnOff.png") -22px 0');
    }
}

function voiceOnMouseDown() {
    if ($("#voice").attr("value") == "turnOn") {
        $("#voice").css("background", 'url("img/turnOn.png") -44px 0');
    }
    else {
        $("#voice").css("background", 'url("img/turnOff.png") -44px 0');
    }
}

function voiceOnMouseUp() {
    if ($("#voice").attr("value") == "turnOn") {
        $("#voice").css("background", 'url("img/turnOn.png") -22px 0');
    }
    else {
        $("#voice").css("background", 'url("img/turnOff.png") -22px 0');
    }
}

function voiceOnMouseOut() {
    if ($("#voice").attr("value") == "turnOn") {
        $("#voice").css("background", 'url("img/turnOn.png") 0 0');
    }
    else {
        $("#voice").css("background", 'url("img/turnOff.png") 0 0');
    }
}

function clickGameGuidance(){
    var url = "https://www.baidu.com/s?wd="+$("#gameGuidance").attr("name")+"����";
    $("#gameGuidance").attr("href",url);
    DataReport.clickGameGuidanceLink();
}


//var GUID;
$(document).ready(function () {
    $("#voice").attr("value", "turnOn");
    setInterval(function (){
        bdc.external.appSend('local/basic/is_mute', {}, function (result) {
            if (result.error == 0) {
                if (result.body.mute == "1") {
                    $("#voice").attr("value", "turnOff");
                    $("#voice").css("background", 'url("img/turnOff.png")');
                }
                else if (result.body.mute == "0") {
                    $("#voice").attr("value", "turnOn");
                    $("#voice").css("background", 'url("img/turnOn.png")');
                }
            }
        });
        },1000)

})
