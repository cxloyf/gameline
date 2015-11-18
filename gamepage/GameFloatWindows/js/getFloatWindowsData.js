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
        type = json.result.data.type;
        var gameKey = json.result.data.game_key_content + '<ul></ul>';
        mediaBody(type, json.result.data.swf_url, json.result.data.media_width, json.result.data.media_height);
        $("#GameKey").append(gameKey);
        $("#intro_url").html("”Œœ∑¿¥‘¥£∫" + json.result.data.intro_url);
        $("#gameGuidance").attr("name", json.result.data.name);
        (function () {
            var d = document.getElementById('pullDownBanner');
            var i = document.getElementById('intro_url');
            keyboardHeight = d.offsetHeight;
            //keyboardHeight = d.offsetHeight+i.offsetHeight;
            //$("#intro_url").css("top",keyboardHeight+"px");
            //d.style.display = "none";
        })()
    }
}

function setMediaLayout(width, height) {
    $("#mediaLayout").height(height);
    //$("#mediaLayout").css("width-size",width);
    //$("#mediaLayout")[0].setAttribute('width',width);
    //$("#mediaLayout")[0].setAttribute('height',height);
    //$("#mediaLayout")[0].width = width;
    //$("#mediaLayout")[0].height = height;
}


function mediaBody(type, media_url, width, height) {
    MediaUrl = media_url;
    if (type != "unity3d") {
        var meidaContent = '<iframe id="media" class="media" src="' + media_url + '" width="100%" height=' + height + '></iframe>';
        $("#mediaLayout").append(meidaContent);
    }
    else {
        //var meidaContent = '<embed id="media" class="media" src="'+media_url+'" type="application/vnd.unity" width='+width+' height='+height+' firstframecallback="UnityObject2.instances[0].firstFrameCallback();" backgroundcolor="bcebf9" bordercolor="bordercolor" textcolor="FFFFFF" logoimage="http://www.4399.com/images/logo_u.png" progressbarimage="http://www.4399.com/images/bar_u.png" progressframeimage="http://www.4399.com/images/bg_u.png" disableexternalcall="true" enabledebugging="true" disablecontextmenu="0" basedownloadurl="http://wp-china.unity3d.com/download_webplayer-3.x/" autoupdateurl="http://wp-china.unity3d.com/autodownload_webplugin-3.x" autoupdateurlsignature="02a5f78b3066d7d31fb063186a2eec36fdf1205d49c6b0808eb37ef85ed9902e2e1904d87f599238a802ba0abbfe4f18aa82dd2eb5171e99ba839a5cea9e6ea9c1be9eae505937b56fe4a5fd254cffe08958d961f42d970136b5eab9e6c2cd08b81bc8a11e5ade57dc63dcfef2248d89689e4d4feed3cdfe7374c848fd57ebd4">';
        //$("#mediaLayout").append(meidaContent);
        unity3dDetection(media_url);
    }
}


(function () {
    ajax();
}())


function unity3dDetection(media_url) {
    var config = {
        params: {
            backgroundcolor: "bcebf9",
            bordercolor: "bcebf9",
            textcolor: "FFFFFF",
            disableExternalCall: true,
            disableContextMenu: true,
            disableFullscreen: true,
            enableDebugging: "0",
            baseDownloadUrl: "http://wp-china.unity3d.com/download_webplayer-3.x/",
            autoupdateURL: "http://wp-china.unity3d.com/autodownload_webplugin-3.x",
            autoupdateURLSignature: "02a5f78b3066d7d31fb063186a2eec36fdf1205d49c6b0808eb37ef85ed9902e2e1904d87f599238a802ba0abbfe4f18aa82dd2eb5171e99ba839a5cea9e6ea9c1be9eae505937b56fe4a5fd254cffe08958d961f42d970136b5eab9e6c2cd08b81bc8a11e5ade57dc63dcfef2248d89689e4d4feed3cdfe7374c848fd57ebd4"
        }
    }

    var u = new UnityObject2(config);
    u.observeProgress(function (progress) {
        var $missingScreen = jQuery("#unityPlayer").find(".unity3DPluginMissing");
        var $brokenScreen = jQuery("#unityPlayer").find(".unity3DPluginBroken");
        switch (progress.pluginStatus) {
            case "unsupported":
                showUnsupported();
                break;
            case "broken":
                $brokenScreen.find("a").click(function (e) {
                    e.stopPropagation();
                    e.preventDefault();
                    u.installPlugin();
                    return false;
                });
                $brokenScreen.show();
                break;
            case "missing":
                $missingScreen.find("a").click(function (e) {
                    e.stopPropagation();
                    e.preventDefault();
                    u.installPlugin();
                    return false;
                });
                $missingScreen.show();
                break;
            case "installed":
                $missingScreen.remove();
                break;
            case "first":
                break;
        }
    });
    jQuery(function () {
        //var meidaContent = '<embed id="media" class="media" src="'+media_url+'" type="application/vnd.unity" width='+width+' height='+height+' firstframecallback="UnityObject2.instances[0].firstFrameCallback();" backgroundcolor="bcebf9" bordercolor="bordercolor" textcolor="FFFFFF" logoimage="http://www.4399.com/images/logo_u.png" progressbarimage="http://www.4399.com/images/bar_u.png" progressframeimage="http://www.4399.com/images/bg_u.png" disableexternalcall="true" enabledebugging="true" disablecontextmenu="0" basedownloadurl="http://wp-china.unity3d.com/download_webplayer-3.x/" autoupdateurl="http://wp-china.unity3d.com/autodownload_webplugin-3.x" autoupdateurlsignature="02a5f78b3066d7d31fb063186a2eec36fdf1205d49c6b0808eb37ef85ed9902e2e1904d87f599238a802ba0abbfe4f18aa82dd2eb5171e99ba839a5cea9e6ea9c1be9eae505937b56fe4a5fd254cffe08958d961f42d970136b5eab9e6c2cd08b81bc8a11e5ade57dc63dcfef2248d89689e4d4feed3cdfe7374c848fd57ebd4">';
        //$("#mediaLayout").append(meidaContent);
        u.initPlugin(jQuery("#mediaLayout")[0], media_url);
    });
}
	
	