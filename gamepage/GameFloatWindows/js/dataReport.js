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
    clickOperationButton: function(action) {//点击小游戏icon
        var reportData = [1322,
            [
                {key:2410,value:action,type:"uin32"}//操作指南点击动作
            ]
        ];
        report(reportData, function(oData){
        });
    },
    clickVoiceButton: function(action) {//点击小游戏icon
        var reportData = [1322,
            [
                {key:2409,value:action,type:"uin32"}//操作指南点击动作
            ]
        ];
        report(reportData, function(oData){
        });
    }
    ,clickRefreshButton: function() {//点击小游戏icon
        var reportData = [1322,
            [
                {key:2408,value:"1",type:"uin32"}//操作指南点击动作
            ]
        ];
        report(reportData, function(oData){
        });
    }
    ,clickGameGuidanceLink: function() {//点击小游戏icon
        var reportData = [1322,
            [
                {key:2411,value:"1",type:"uin32"}//操作指南点击动作
            ]
        ];
        report(reportData, function(oData){
            if(oData.error == 0)
            {
                //alert("hello");
            }
        });
    }
};/**
 * Created by chenxiaolong06 on 2015/10/29.
 */
