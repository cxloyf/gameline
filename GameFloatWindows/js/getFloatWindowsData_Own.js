var keyboardHeight = 0;
var MediaUrl;
var type;

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
    var gameUrl = "http://172.17.181.135:8264/games/" + getQueryString("id");
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
        var gameKey = json.result.data.game_key_content + '<ul></ul>';
        runSimulatorInHtml(json.result.data.type, json.result.data.swf_url, json.result.data.media_width, json.result.data.media_height);
        $("#GameKey").append(gameKey);
        $("#intro_url").html("”Œœ∑¿¥‘¥£∫" + json.result.data.intro_url);
        $("#gameGuidance").attr("name", json.result.data.name);

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

function runSimulatorInHtml(type, media_url, width, height) {
    embed_rom(type, media_url, width, height);
}