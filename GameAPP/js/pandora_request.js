/**
 * Created by chenxiaolong06 on 2015/11/9.
 */
function pandoraAjaxRequest(){
    var id = getQueryString("id");
    if(id){
        var gameUrl = "http://172.17.181.135:8264/games/" + id;
        $.ajax({
            url: gameUrl,
            async: true,
            type: "get",
            data: null,
            timeout: 3000,
            success: function (msg) {
                requestPandoraData(msg);
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
    }
}




function requestPandoraData(json) {
    if (json.code == 0) {
        var floatWindows = new Object();
        floatWindows.name = json.result.data.name;
        floatWindows.width = json.result.data.media_width;
        floatWindows.height = json.result.data.media_height;
        //var source = json.result.data.source;
        floatWindows.source = "4399";
        floatWindows.id = getQueryString("id");
        openFloatWindows(floatWindows);
    }
}
