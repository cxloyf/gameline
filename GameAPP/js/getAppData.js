var offset = 0;
var bannerHeight = 33;
function ajax() {

    //先声明一个异步请求对象
    var xmlHttpReg = null;
    if (window.ActiveXObject) {//如果是IE

        xmlHttpReg = new ActiveXObject("Microsoft.XMLHTTP");

    } else if (window.XMLHttpRequest) {

        xmlHttpReg = new XMLHttpRequest(); //实例化一个xmlHttpReg
    }

    //如果实例化成功,就调用open()方法,就开始准备向服务器发送请求
    if (xmlHttpReg != null) {
        var url = "http://172.17.181.135:8264/games?offset=" + offset;
        xmlHttpReg.open("get", url, true);
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
                if (json.code == 0 && json.result.data.length) {
                    $('ul.tm_list').html("");
                    for (var i = 0; i < json.result.data[0].length; i++) {
                        var index = json.result.data[0][i].id;
                        var name = json.result.data[0][i].name;
                        var img_url = json.result.data[0][i].img_url;
                        var media_width = json.result.data[0][i].media_width;
                        //var media_height = (parseInt(json.result.data[0][i].media_height) + bannerHeight).toString()  ;
                        var media_height = json.result.data[0][i].media_height;
                        var source = json.result.data[0][i].source;
                        var htmlEle = '<li style="cursor:pointer" id="gameInfo" class="gameInfo" name="' + name + '" index="' + index + '" media_width=' + media_width + ' media_height=' + media_height + ' source="' + source + '"><img src="' + img_url + '">' + name +
                            '</li>';
                        $("#tm_list").append(htmlEle);
                    }
                }
                //--
                offset++;
                if (offset == json.result.total) {
                    offset = 0;
                }


                //--
            }
        }
    }


}


$(document).ready(function () {
    ajax();
    GetPlayRecord();


    $("ul").delegate(".gameInfo", 'click', function (event) {

        var data = {
            way: "pop_window",
            url: "http://localhost:8080/GameFloatWindows/FloatWindow.html?id=" + $(this)[0].getAttribute("index")+"&width="+$(this)[0].getAttribute("media_width")+"&height="+$(this)[0].getAttribute("media_height"),
            //url     :"http://172.17.181.135:8164/cxl/GameFloatWindows/FloatWindow.html?id="+$(this)[0].getAttribute("index")+"&width="+$(this)[0].getAttribute("media_width")+"&height="+$(this)[0].getAttribute("media_height"),
            source_info: {
                input_string: JSON.stringify({
                    type: 1,
                    title: $(this)[0].getAttribute("name"),
                    //height  : "800",
                    height: String(parseInt($(this)[0].getAttribute("media_height")) + bannerHeight),
                    width: $(this)[0].getAttribute("media_width"),
                    showmax: 0,
                    showmin: 1,
                    showresize: 0,
                    showtop: 0,
                    showaudio: 0
                })
            }
        };

        bdc.external.appSend('local/net/open_url', data || {}, function () {
        });
        //alert("hello");
        var name = $(this)[0].getAttribute("name");
        var htmlEl = '<a  class=playrecordName onclick="playRecordWindow($(this))" info=' + JSON.stringify(data) + '>'+name+'&nbsp;&nbsp;&nbsp;</a>';
        SetPlayRecord($(this), htmlEl);
    });


});
	
	
	
	
	
	
	