    var offset = 0;
    var bannerHeight = 32 + 8;
    var GameRefreshCount=0;
    var extra_game_info=null;
    bdc.app.init({
        appId: 1013
    });
    bdc.app.ready();
    ajax();
    function ajax(flag) {
        var id;
        if(flag) {
            id =flag;
        }
        else{
            id = getQueryString("id");
        }

        var url;
        if(id){
            url = "http://172.17.181.135:8264/games?offset=" + offset+"&size=1&extra_game_id="+id;
        }
        else{
            url = "http://172.17.181.135:8264/games?offset=" + offset + "&size=1";
        }
        $.ajax({
            url: url,
            async: true,
            type: "get",
            data: null,
            timeout:3000,
            success: function (msg) {
                requestAppData(msg, flag);
            },

            error: function (XMLHttpRequest,textStatus,errorThrown) {
                if(textStatus == "timeout") {
                    history.go(0);
                }
                else if(textStatus == "error") {
                    handleRequestErrorMessage();
                }
                else if(textStatus == "notmodified"){
                }
                else if(textStatus == "parsererror"){
                }


            }
        });
    }

        function requestAppData(json, flag) {
            if (json.code == 0 && json.result.data.length && !flag) {
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

                bdc.external.appSend('local/storage/disk/set', {
                    key: "GameRefreshCount",
                    value: "1",
                    expire_time: "0"
                }, function (result){})
            }
            //--
            offset++;
            if (offset == json.result.total) {
                offset = 0;
            }

            if(json.result.extra_game_info)
            {
                extra_game_info =json.result.extra_game_info;
            }
    }


    $(document).ready(function () {

        hideHeader();
        GetPlayRecord();
        $("ul").delegate(".gameInfo", 'click', function (event) {
            var floatWindows = new Object();
            floatWindows.name = $(this)[0].getAttribute("name");
            floatWindows.width = $(this)[0].getAttribute("media_width");
            floatWindows.height = $(this)[0].getAttribute("media_height");
            floatWindows.source = $(this)[0].getAttribute("source");
            floatWindows.id = $(this)[0].getAttribute("index");
            openFloatWindows(floatWindows);
            DataReport.clickGameIcon("1", $(this)[0].getAttribute("index"));
        });

        setTimeout(function(){
            if(extra_game_info){
                requestPandoraData(extra_game_info);
            }
        },1000);
    });



    function openFloatWindows(floatWindows){
        var floatUrl;
        if(floatWindows.source == "4399")
        {
            floatUrl = "http://172.17.181.135:8164/cxl/GameFloatWindows/FloatWindow.html?id=" + floatWindows.id +"&width=" + floatWindows.width + "&height="+floatWindows.height;
            //floatUrl = "http://localhost:8080/GameFloatWindows/FloatWindow.html?id=" + floatWindows.id + "&width="+ floatWindows.width + "&height=" + floatWindows.height;
        }
        else if(floatWindows.source == "Own"){
            //floatUrl = "http://172.17.181.135:8164/cxl/GameFloatWindows/FloatWindow_Own.html?id=" + floatWindows.id +"&width=" + floatWindows.width + "&height="+floatWindows.height;
            floatUrl = "http://localhost:8080/GameFloatWindows/FloatWindow_Own.html?id=" + floatWindows.id + "&width=" + floatWindows.width + "&height=" + floatWindows.height;
        }
        else{
            floatUrl = "http://172.17.181.135:8164/cxl/GameFloatWindows/FloatWindow_7k7k.html?id=" + floatWindows.id + "&width=" + floatWindows.width + "&height=" + floatWindows.height;
        }
        var data = {
            way: "pop_window",
            url:floatUrl,
            source_info: {
                input_string: JSON.stringify({
                    type: 1,
                    title: floatWindows.name,
                    height: String(parseInt(floatWindows.height) + bannerHeight),
                    width: String(floatWindows.width),
                    source: floatWindows.source,
                    showmax: 0,
                    showmin: 1,
                    showresize: 0,
                    showtop: 0,
                    showaudio: 0,
                    backtoapp:1
                })
            }
        };

        bdc.external.appSend('local/net/open_url', data || {}, function () {
        });
        var htmlEl = '<a  class=playrecordName onclick="playRecordWindow($(this))" sid="' + floatWindows.id + '" info=' + JSON.stringify(data) + '>' + floatWindows.name + '</a>';
        SetPlayRecord($(this), htmlEl);
    }

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


    bdc.external.appSend('local/cross/set_msg_listener', {
        "operation": "add"
    }, function (result) {
        if(result.error ==0)
            if(result.body.from_call_id && !isNaN(result.body.message) ){
                ajax(parseInt(result.body.message));
            }

    });