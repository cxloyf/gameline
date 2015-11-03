
function getId(element) {
            return element = document.getElementById(element);
        }

var keyboardHight;
( function(){
     var d = getId('GameKey');
     keyboardHight = d.offsetHeight;
	 d.style.display = "none";
} )()

        function showKeyboard(element) {
            var d = getId(element);
            var h = d.offsetHeight;
            var maxh = keyboardHight;

            function dmove() {
                if (h >= maxh) {
                    d.style.height = h;
                    clearInterval(iIntervalId);
                } else {
                    h += keyboardHight; //设置层展开的速度
                    d.style.display = 'block';
                    d.style.height = h + 'px';
                }
            }

            iIntervalId = setInterval(dmove, 2);
        }
        function hideKeyboard(element) {
            var d = getId(element);
            var h = d.offsetHeight;
            var maxh = keyboardHight;

            function dmove() {
                if (h <= 0) {
                    d.display = 'none';
                    clearInterval(iIntervalId);
                } else {
                    h -= keyboardHight;//设置层收缩的速度
                    d.style.height = h + 'px';
                }
            }

            iIntervalId = setInterval(dmove, 2);
        }
        function operate(targetid, objN) {
            var d = getId(targetid);
            var sb = getId(objN);
            if (d.style.display == "block") {
                hideKeyboard(targetid);
                d.style.display = "none";
                sb.innerHTML = "操作指南▼";
            } else {
				showKeyboard(targetid);
                d.style.display = "block";
                sb.innerHTML = '操作指南▲';
            }
        }