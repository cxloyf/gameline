var makeApi = function (sApi) {
    return function (oParams, fCallback) {
        bdc.external.appSend(
            sApi,
            oParams,
            fCallback
        );
    }
};
var report = makeApi('cloud/statistics/report');

var DataReport = {
    clickGameIcon: function(source, sid) {//点击小游戏icon，游戏记录也要算上
        var reportData = [1322,
            [
                {key:2404,value:source,type:"int32"}
                ,{key:2405,value:sid,type:"uin64"}//icon的index
            ]
        ];
        report(reportData, function(oData){
            var bSuccess = oData.error === 0;
            if(bSuccess){
            }
        });
    },
    clickClearRecord: function() {
        var reportData = [1322,
            [
                {key:2412,value:"1",type:"uin32"}//清除点击动作
            ]
        ];
        report(reportData, function(oData){
            var bSuccess = oData.error === 0;
            if(bSuccess){
            }
        });
    },
    clickReplaceBtn: function () {
        var reportData = [1322,
            [
                {key:2413,value:"1",type:"uin32"}//换一换点击动作
            ]
        ];
        report(reportData, function(oData){
            var bSuccess = oData.error === 0;
        });
    },
    clickMoreGameLink: function(text, url){
        var reportData = [1322,
            [
                {key:2414,value:text,type:"string"}
                ,{key:2415,value:url,type:"string"}
            ]
        ];
        report(reportData, function(oData){
            var bSuccess = oData.error === 0;
        });
    }
};/**
 * Created by chenxiaolong06 on 2015/10/29.
 */
