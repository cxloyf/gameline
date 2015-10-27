var bannerHeight = 33;

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
        function operate(targetid, objN) {
            var d = getId(targetid);
            var sb = getId(objN);
            if (sb.value == "pullDown") {
				sb.value = "socrllUp";
				sb.src = "img/scrollUp.png"
				var data = {
                height : keyboardHeight+gameHeight+bannerHeight+3,
				width	: gameWidth
            };
				bdc.external.appSend('local/ui/set_window_size',data || {},function(){});
            } else {
				sb.value = "pullDown";
				sb.src = "img/pullDown.png"
				var data = {
                height : gameHeight+bannerHeight,
				width	: gameWidth
				};
				bdc.external.appSend('local/ui/set_window_size',data || {},function(){});
            }
        }






function refreshClick(){
	$("#media")[0].src = $("#media")[0].src;
}

function voiceClick(){
	if($("#voice").attr("value") == "turnOn"){
		$("#voice")[0].value = "turnOff";
		$("#voice")[0].src = "img/turnOff.png"
		bdc.external.appSend('local/basic/set_mute',{mute:1},function(){});
	}
	else{
		$("#voice")[0].value = "turnOn";
		$("#voice")[0].src = "img/turnOn.png"
		bdc.external.appSend('local/basic/set_mute',{mute:0},function(){});
	}
	
}

function voiceOnMouseOver(x){
	//x.src = "img/voiceMouseOver.png"
}

function voiceOnMouseOut(x){
	if($("#voice").attr("value") == "turnOn"){
		x.src = "img/turnOn.png"
	}
	else{
		x.src = "img/turnOff.png"
	}
	x.blur();
}

function blur(x){
	x.blur();
}



