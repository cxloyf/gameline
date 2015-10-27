var keyboardHeight=0;

function getQueryString(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    }
    return null;
}

var gameWidth=0;
var gameHeight=0;
function ajax() {

    //先声明一个异步请求对象
    var xmlHttpReg = null;
    if (window.ActiveXObject) {//如果是IE

        xmlHttpReg = new ActiveXObject("Microsoft.XMLHTTP");

    } else if (window.XMLHttpRequest) {

        xmlHttpReg = new XMLHttpRequest(); //实例化一个xmlHttpReg
    }
    var gameUrl = "http://172.17.181.135:8264/games/" + getQueryString("id");
    gameWidth = Number(getQueryString("width"));
    gameHeight = Number(getQueryString("height"));
	mediaUrl = getQueryString("media_url");
	setMediaLayout(gameWidth,gameHeight);
	//mediaBody(mediaUrl,gameWidth,gameHeight);
    //如果实例化成功,就调用open()方法,就开始准备向服务器发送请求
    if (xmlHttpReg != null) {
        xmlHttpReg.open("get", gameUrl, true);
        xmlHttpReg.send();
        xmlHttpReg.onreadystatechange = doResult; //设置回调函数

    }

    //回调函数
    //一旦readyState的值改变,将会调用这个函数,readyState=4表示完成相应

    //设定函数doResult()
    function doResult() {

        if (xmlHttpReg.readyState == 4) {//4代表执行完成


            if (xmlHttpReg.status == 200) {//200代表执行成功
                //将xmlHttpReg.responseText的值赋给ID为resText的元素
                json = JSON.parse(xmlHttpReg.responseText);
                if (json.code == 0) {
                    var gameKey = json.result.data.game_key_content + '<ul></ul>';
                    //$("#media")[0].setAttribute('src',"");
					//$("#media")[0].src = json.result.data.swf_url;
                    //$("#media")[0].width = gameWidth = json.result.data.media_width;
                    //$("#media")[0].height = gameHeight = json.result.data.media_height;
					mediaBody(json.result.data.swf_url, json.result.data.media_width, json.result.data.media_height);
                    $("#GameKey").append(gameKey);
                    $("#intro_url").html(json.result.data.intro_url);


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
        }

    }


}

function setMediaLayout(width,height){
	$("#mediaLayout").height(height);
	//$("#mediaLayout").css("width-size",width);
	//$("#mediaLayout")[0].setAttribute('width',width);
	//$("#mediaLayout")[0].setAttribute('height',height);
	//$("#mediaLayout")[0].width = width;
	//$("#mediaLayout")[0].height = height;
}


function mediaBody(media_url,width,height){
	if(media_url == null)
	{
		media_url = "http://sxiao.4399.com/4399swf/upload_swf/ftp10/weijianp/20130422/1/mineclone.unity3d";
	}
	var index1=media_url.lastIndexOf(".");
	var index2=media_url.length;
	var type=media_url.substring(index1+1,index2);	
	if(type != "unity3d"){
		var meidaContent = '<iframe id="media" class="media" src="' + media_url + '" width="100%" height=' + height + '></iframe>';
		//var meidaContent = '<embed id="media"  class="media" src="'+media_url+'" quality="high" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" width="100%" height='+height+' allowscriptaccess="always" allownetworking="all">';
		//var meidaContent = '<embed id="media"  class="media" src="'+media_url+'" width="100%" height='+height+'>';
		$("#mediaLayout").append(meidaContent);
	}
	else{
		var meidaContent = '<embed id="media" class="media" src="'+media_url+'" type="application/vnd.unity" width='+width+' height='+height+' firstframecallback="UnityObject2.instances[0].firstFrameCallback();" backgroundcolor="bcebf9" bordercolor="bordercolor" textcolor="FFFFFF" logoimage="http://www.4399.com/images/logo_u.png" progressbarimage="http://www.4399.com/images/bar_u.png" progressframeimage="http://www.4399.com/images/bg_u.png" disableexternalcall="true" enabledebugging="true" disablecontextmenu="0" basedownloadurl="http://wp-china.unity3d.com/download_webplayer-3.x/" autoupdateurl="http://wp-china.unity3d.com/autodownload_webplugin-3.x" autoupdateurlsignature="02a5f78b3066d7d31fb063186a2eec36fdf1205d49c6b0808eb37ef85ed9902e2e1904d87f599238a802ba0abbfe4f18aa82dd2eb5171e99ba839a5cea9e6ea9c1be9eae505937b56fe4a5fd254cffe08958d961f42d970136b5eab9e6c2cd08b81bc8a11e5ade57dc63dcfef2248d89689e4d4feed3cdfe7374c848fd57ebd4">';
		$("#mediaLayout").append(meidaContent);
	}
}


(function () {
    ajax();
}())
	
	
	
	