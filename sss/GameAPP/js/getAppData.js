    var offset = 0;
    var bannerHeight = 32 + 8;
    var GameRefreshCount=0;
    function ajax() {
        var url = "http://172.17.181.135:8264/games?offset=" + offset;
        $.ajax({
            url: url,
            async: true,
            type: "get",
            data: null,
            timeout:3000,
            success: function (msg) {
                requestAppData(msg);
            },

            error: function (XMLHttpRequest,textStatus,errorThrown) {
                if(textStatus == "timeout") {
                    history.go(0);
                }
                else if(textStatus == "error") {
                    handleRequestErrorMessage();
                }
                else if(textStatus == "notmodified"){
                    alert("notmodified");
                }
                else if(textStatus == "parsererror"){
                }


            }
        });
    }

        function requestAppData(json) {
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

    function imgErrorLoad(x) {
        x.setAttribute("src", "img/baiduIcon.png");
    }

    function handleRequestErrorMessage(){
        bdc.external.appSend('local/storage/disk/get',{key: "GameRefreshCount"}, function (result) {
            var bError = result.error === 0;
            var bFound = result.body.found === true;
            if (bError && bFound) {
                GameRefreshCount = parseInt(result.body.value);
                if(GameRefreshCount >= 5){
                    bdc.external.appSend('local/storage/disk/set', {
                        key: "GameRefreshCount",
                        value: "0",
                        expire_time: "0"
                    }, function (result) {})
                }
                else{
                    GameRefreshCount++;
                    bdc.external.appSend('local/storage/disk/set', {
                        key: "GameRefreshCount",
                        value: GameRefreshCount.toString(),
                        expire_time: "0"
                    }, function (result) {})
                    history.go(0);
                }
            }
            else{
                bdc.external.appSend('local/storage/disk/set', {
                    key: "GameRefreshCount",
                    value: "1",
                    expire_time: "0"
                }, function (result) {
                    if(result.error ==0)
                        history.go(0);
                })

            }
        })

    }