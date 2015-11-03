    var offset = 0;
    var bannerHeight = 32 + 8;

    function requestTimeOutAction() {
        alert("timeout");
        history.go(0);
    }
    function ajax() {


        var url = "http://172.17.181.135:8264/games?offset=" + offset;
        $.ajax({
            url: url,
            async: true,
            type: "get",
            data: null,
            timeout:3000,
            success: function (msg) {
                doResult(msg);
            },
            error: function (xhr,errorInfo,ex) {
                alert(errorInfo);
                history.go(0);
            }
        });
    }

        function doResult(json) {
            if (json.code == 0 && json.result.data.length) {
                $('ul.tm_list').html("");
                for (var i = 0; i < json.result.data[0].length; i++) {
                    var index = json.result.data[0][i].id;
                    var name = json.result.data[0][i].name;
                    var img_url = json.result.data[0][i].img_url;
                    //var img_url = "http://www.baidu.com/baidu.png";
                    var media_width = json.result.data[0][i].media_width;
                    //var media_height = (parseInt(json.result.data[0][i].media_height) + bannerHeight).toString()  ;
                    var media_height = json.result.data[0][i].media_height;
                    var source = json.result.data[0][i].source;
                    var htmlEle = '<li style="cursor:pointer" id="gameInfo" class="gameInfo" name="' + name + '" index="' + index + '" media_width=' + media_width + ' media_height=' + media_height + ' source="' + source + '"><img src="' + img_url + '" onerror=imgErrorLoad(this)>' + name +
                        '</li>';
                    $("#tm_list").append(htmlEle);
                }
                $("#game").height($("#tm_list").height());
            }
            //--
            offset++;
            if (offset == json.result.total) {
                offset = 0;
            }
    }


    $(document).ready(function () {
        ajax();
        hideHeader();
        GetPlayRecord();
        $("ul").delegate(".gameInfo", 'click', function (event) {

            var data = {
                way: "pop_window",
                //url: "http://localhost:8080/GameFloatWindows/FloatWindow.html?id=" + $(this)[0].getAttribute("index")+"&width="+$(this)[0].getAttribute("media_width")+"&height="+$(this)[0].getAttribute("media_height"),
                url: "http://172.17.181.135:8164/cxl/GameFloatWindows/FloatWindow.html?id=" + $(this)[0].getAttribute("index") + "&width=" + $(this)[0].getAttribute("media_width") + "&height=" + $(this)[0].getAttribute("media_height"),
                //url     :"http://localhost:8080/GameFloatWindows/FloatWindow.html?id=43&width=960&height=600",
                source_info: {
                    input_string: JSON.stringify({
                        type: 1,
                        title: $(this)[0].getAttribute("name"),
                        height: String(parseInt($(this)[0].getAttribute("media_height")) + bannerHeight),
                        width: $(this)[0].getAttribute("media_width"),
                        source: $(this)[0].getAttribute("source"),
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
            DataReport.clickGameIcon("1", $(this)[0].getAttribute("index"));
            var name = $(this)[0].getAttribute("name");
            var htmlEl = '<a  class=playrecordName onclick="playRecordWindow($(this))" sid="' + $(this)[0].getAttribute("index") + '" info=' + JSON.stringify(data) + '>' + name + '</a>';
            SetPlayRecord($(this), htmlEl);

        });


    });


    function replaceBtn() {
        ajax();
        DataReport.clickReplaceBtn();
    }

    $("img")
        .error(function () {
            alert("img-2");
        })


    function imgErrorLoad(x) {
        x.setAttribute("src", "img/baiduIcon.png");
    }