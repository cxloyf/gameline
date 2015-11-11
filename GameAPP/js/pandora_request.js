/**
 * Created by chenxiaolong06 on 2015/11/9.
 */

function requestPandoraData(getJson) {
        var floatWindows = new Object();
        floatWindows.name = getJson.name;
        floatWindows.width = getJson.media_width;
        floatWindows.height = getJson.media_height;
        floatWindows.source =  getJson.source;
        floatWindows.id = getJson.id;
        openFloatWindows(floatWindows);
}
