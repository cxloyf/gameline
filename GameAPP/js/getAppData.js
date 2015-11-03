var offset = 0;
var bannerHeight = 32+8;
function ajax() {

    //??��???�??步�?�??�?
    var xmlHttpReg = null;
    if (window.ActiveXObject) {//�????E

        xmlHttpReg = new ActiveXObject("Microsoft.XMLHTTP");

    } else if (window.XMLHttpRequest) {

        xmlHttpReg = new XMLHttpRequest(); //�?????�?mlHttpReg
    }

    //�??�???????,就�???pen()?��?,就�?�??�??????��????�?
    if (xmlHttpReg != null) {
        var url = "http://172.17.181.135:8264/games?offset=" + offset;
        xmlHttpReg.open("get", url, true);
        xmlHttpReg.send();
        xmlHttpReg.onreadystatechange = doResult; //设置????��?

    }


    function doResult() {

        if (xmlHttpReg.readyState == 4) {//4代表?��?�??


            if (xmlHttpReg.status == 200) {//200代表?��????
                //�?mlHttpReg.responseText???��?�?D�?esText???�?

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
                    $("#game").height($("#tm_list").height()) ;
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
    hideHeader();
    GetPlayRecord();


    $("ul").delegate(".gameInfo", 'click', function (event) {

        var data = {
            way: "pop_window",
            url: "http://localhost:8080/GameFloatWindows/FloatWindow.html?id=" + $(this)[0].getAttribute("index")+"&width="+$(this)[0].getAttribute("media_width")+"&height="+$(this)[0].getAttribute("media_height"),
            //url     :"http://172.17.181.135:8164/cxl/GameFloatWindows/FloatWindow.html?id="+$(this)[0].getAttribute("index")+"&width="+$(this)[0].getAttribute("media_width")+"&height="+$(this)[0].getAttribute("media_height"),
            //url     :"http://localhost:8080/GameFloatWindows/FloatWindow.html?id=43&width=960&height=600",
            source_info: {
                input_string: JSON.stringify({
                    type: 1,
                    title: $(this)[0].getAttribute("name"),
                    height: String(parseInt($(this)[0].getAttribute("media_height")) + bannerHeight),
                    width: $(this)[0].getAttribute("media_width"),
                    source:$(this)[0].getAttribute("source"),
                    showmax: 0,
                    showmin: 1,
                    showresize: 1,
                    showtop: 0,
                    showaudio: 0
                })
            }
        };

        bdc.external.appSend('local/net/open_url', data || {}, function () {
        });
        DataReport.clickGameIcon("1",  $(this)[0].getAttribute("index"));
        var name = $(this)[0].getAttribute("name");
        var htmlEl = '<a  class=playrecordName onclick="playRecordWindow($(this))" sid="' + $(this)[0].getAttribute("index") +'" info=' + JSON.stringify(data) + '>'+name+'</a>';
        SetPlayRecord($(this), htmlEl);

    });


});
	
	
	function replaceBtn(){
        ajax();
        DataReport.clickReplaceBtn();
    }
	
	
	
	