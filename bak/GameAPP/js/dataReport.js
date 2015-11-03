bdc.app.init({
    appId: 1002
});
bdc.app.ready();

var report = {
    send: function(data){
        var key53 = {
            key: 53,
            value: appInfo.id,
            type: 'int64'
        };
        var sData;
        if(Object.prototype.toString.call(data).toLowerCase() == '[object array]'){
            sData = appInfo.bdcVersion >= 2.0 ? data.concat(key53) : data;
            bdc.net.report(1322, sData);
        }else{
            sData = appInfo.bdcVersion >= 2.0 ? [data].concat(key53) : [data];
            bdc.net.report(1322, sData);
        }
    },
    clickImg: function(index, title) {
        this.send([{
            key: 1108,
            value: 1
        },{
            key: 1109,
            value: index
        },{
            key: 1110,
            value: title
        }]);
    },
    clickRefresh: function() {
        this.send({
            key: 1107,
            value: 1
        });
    },
    clickHots: function (word, url, color) {
        this.send([{
            key: 1104,
            value: word
        },{
            key: 1105,
            value: url
        },{
            key: 1110,
            value: color
        }]);
    },
    portStatus: function(action,result){
        if(appInfo.bdcVersion >= 2.0){
            this.send([{
                key: 51,
                value: appInfo.name
            },{
                key: 52,
                value: appInfo.version
            },{
                key:54,
                value: action
            },{
                key: 55,
                value: result,
                type: 'int32'
            }]);
        }
        else if(appInfo.bdcVersion >= 1.9){
            this.send([{
                key: 51,
                value: appInfo.name
            },{
                key: 52,
                value: appInfo.version
            },{
                key: 53,
                value: appInfo.id,
                type: 'int64'
            },{
                key:54,
                value: action
            },{
                key: 55,
                value: result,
                type: 'int32'
            }]);
        }
    }
};/**
 * Created by chenxiaolong06 on 2015/10/29.
 */
