var gameList = new LinkedList();
var playRecordIndex = "0";
var playRecordStorage = "playRecordStorage";

function SetPlayRecord(x, htmlEl) {
    for (var i = 0; i < gameList.length; i++) {
        if (htmlEl != gameList.get(i)) {
            continue;
        }
        else {
            if (i != 0) {
                gameList.remove(gameList.get(i));
            }
            break;
        }
    }

    if (gameList.length == 0 || i != 0) {
        gameList.addFirst(htmlEl);
        if (gameList.length == 11) {
            gameList.remove(gameList.get(10));
        }
    }

    $('div.playrecord').html("");
    for (var i = 0; i < gameList.length; i++) {
        $("#playrecord").append(gameList.get(i));
    }

    bdc.external.appSend('local/storage/disk/set', {
        key: playRecordStorage,
        value: JSON.stringify(gameList),
        expire_time: "0"
    }, function (result) {
        var bError = result.error === 0;
        if (bError) {
            //alert(playRecordIndex);
        }
    })
    //}
}

function GetPlayRecord() {
    bdc.external.appSend('local/storage/disk/get', {key: playRecordStorage}, function (result) {
        var bError = result.error === 0;
        var bFound = result.body.found === true;
        $('div.playrecord').html("");
        if (bError && bFound) {
            temp = stringToList(result.body.value);
            for (var i = 0; i < gameList.length; i++) {
                $("#playrecord").append(gameList.get(i));
            }
        }
    })
}


function clearDiskRecord() {
    bdc.external.appSend('local/storage/disk/clear', {}, function (result) {
        if (result.error == 0) {
            //alert("sucess");
            gameList = new LinkedList();
            $('div.playrecord').html("");
        }
    })
}

function playRecordWindow(x) {
    temp = $(x)[0].getAttribute("info");
    data = JSON.parse(temp);
    bdc.external.appSend('local/net/open_url', data || {}, function () {
    });
    var htmlEl = '<a  class=playrecordName onclick="playRecordWindow($(this))" info=' + JSON.stringify(data) + '>' + $(x)[0].innerHTML + '</a>'
    SetPlayRecord(x, htmlEl);
}

function stringToList(x) {
    temList = JSON.parse(x);
    temList.__proto__ = gameList.__proto__;
    temNode = temList.head;
    while (temNode) {
        temNode.__proto__ = Node.prototype;
        temNode = temNode.next;
    }
    temList.tail.__proto__ = Node.prototype;
    gameList = temList;
}