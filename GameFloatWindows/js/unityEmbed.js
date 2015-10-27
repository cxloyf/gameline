function mediaBody(media_url,width,height){
	var index1=media_url.lastIndexOf(".");
	var index2=media_url.length;
	var type=media_url.substring(index1,index2);	
	if(type == "unity3d"){
		var divObj=document.createElement("iframe"); 
		divObj.setAttribute('id','media');
		divObj.setAttribute('class','media');
		divObj.setAttribute('src',media_url);
		divObj.setAttribute('width',width);
		divObj.setAttribute('height',height);
		var first=document.body.firstChild; //得到第一个元素
		document.body.insertBefore(divObj,first);
	}
	else{
		var divObj=document.createElement("embed"); 
		divObj.setAttribute('src',media_url);
		divObj.setAttribute('type','application/vnd.unity');
		divObj.setAttribute('src',media_url);
		divObj.setAttribute('width',width);
		divObj.setAttribute('height',height);
		divObj.setAttribute('firstframecallback',"UnityObject2.instances[0].firstFrameCallback();");
		divObj.setAttribute('backgroundcolor','bcebf9');
		divObj.setAttribute('bordercolor','bordercolor');
		divObj.setAttribute('textcolor','FFFFFF');
		divObj.setAttribute('logoimage','http://www.4399.com/images/logo_u.png');
		divObj.setAttribute('progressbarimage','http://www.4399.com/images/bar_u.png');
		divObj.setAttribute('progressframeimage','http://www.4399.com/images/bg_u.png');
		divObj.setAttribute('disableexternalcall','true');
		divObj.setAttribute('enabledebugging','true');
		divObj.setAttribute('disablecontextmenu','0');
		divObj.setAttribute('basedownloadurl','http://wp-china.unity3d.com/download_webplayer-3.x/');
		divObj.setAttribute('autoupdateurl','http://wp-china.unity3d.com/autodownload_webplugin-3.x');
		divObj.setAttribute('autoupdateurlsignature','02a5f78b3066d7d31fb063186a2eec36fdf1205d49c6b0808eb37ef85ed9902e2e1904d87f599238a802ba0abbfe4f18aa82dd2eb5171e99ba839a5cea9e6ea9c1be9eae505937b56fe4a5fd254cffe08958d961f42d970136b5eab9e6c2cd08b81bc8a11e5ade57dc63dcfef2248d89689e4d4feed3cdfe7374c848fd57ebd4');
		var first=document.body.firstChild; //得到第一个元素
		document.body.insertBefore(divObj,first);
	}
}