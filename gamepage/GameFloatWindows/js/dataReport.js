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
    clickOperationButton: function(action) {//���С��Ϸicon
        var reportData = [1322,
            [
                {key:2410,value:action,type:"uin32"}//����ָ�ϵ������
            ]
        ];
        report(reportData, function(oData){
        });
    },
    clickVoiceButton: function(action) {//���С��Ϸicon
        var reportData = [1322,
            [
                {key:2409,value:action,type:"uin32"}//����ָ�ϵ������
            ]
        ];
        report(reportData, function(oData){
        });
    }
    ,clickRefreshButton: function() {//���С��Ϸicon
        var reportData = [1322,
            [
                {key:2408,value:"1",type:"uin32"}//����ָ�ϵ������
            ]
        ];
        report(reportData, function(oData){
        });
    }
    ,clickGameGuidanceLink: function() {//���С��Ϸicon
        var reportData = [1322,
            [
                {key:2411,value:"1",type:"uin32"}//����ָ�ϵ������
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
