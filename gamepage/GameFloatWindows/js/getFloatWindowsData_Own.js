var keyboardHeight = 0;
var MediaUrl;
var type;
var jsonTemp;
function getQueryString(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    }
    return null;
}

var gameWidth = 0;
var gameHeight = 0;
function ajax() {
    //var gameUrl = "http://172.17.181.135:8264/games/" + getQueryString("id");
    var gameUrl = window.location.origin + "/games/" + getQueryString("id");
    $.ajax({
        url: gameUrl,
        async: true,
        type: "get",
        data: null,
        timeout: 3000,
        success: function (msg) {
            requestFloatData(msg);
        },

        error: function (XMLHttpRequest, textStatus, errorThrown) {
            if (textStatus == "timeout") {
                history.go(0);
            }
            else if (textStatus == "error") {
            }
            else if (textStatus == "notmodified") {
            }
            else if (textStatus == "parsererror") {
            }


        }
    });

    gameWidth = Number(getQueryString("width"));
    gameHeight = Number(getQueryString("height"));
    mediaUrl = getQueryString("media_url");
    setMediaLayout(gameWidth, gameHeight);
}
function requestFloatData(json) {
    if (json.code == 0) {
        gameSearchWordType = gameSearchType(json.result.data.type);
        runSimulatorInHtml(json.result.data.type, json.result.data.swf_url, json.result.data.name, json.result.data.media_width, json.result.data.media_height);
        jsonTemp = json;
        type = "own";
        //$("#intro_url").html("游戏来源：" + json.result.data.intro_url);
        $("#gameGuidance").attr("name", json.result.data.name);
        $("#emulator").focus();
        
        (function () {
            var d = document.getElementById('pullDownBanner');
            var i = document.getElementById('intro_url');
            keyboardHeight = d.offsetHeight;
        })()
    }
}

function setMediaLayout(width, height) {
    $("#mediaLayout").height(height);
}

(function () {
    ajax();
}())

function runSimulatorInHtml(rom_type, rom_url, rom_name, rom_width, rom_height) {
    embed_rom(rom_type, rom_url, rom_name, rom_width, rom_height)
}

function gameSearchType(searchType){
    if(searchType == "nes"){
        return "FC";
    }else if(searchType == "smc"){
        return "SFC";
    }else if(searchType == "gen"){
        return "世嘉机 ";
    }else if(searchType == "gb" || searchType == "gbc" || searchType == "gba"){
        return "";
    }
}