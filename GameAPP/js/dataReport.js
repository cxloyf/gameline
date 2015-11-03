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
    clickGameIcon: function(source, sid) {//���С��Ϸicon����Ϸ��¼ҲҪ����
        var reportData = [1322,
            [
                {key:2404,value:source,type:"int32"}
                ,{key:2405,value:sid,type:"uin64"}//icon��index
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
                {key:2412,value:"1",type:"uin32"}//����������
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
                {key:2413,value:"1",type:"uin32"}//��һ���������
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
