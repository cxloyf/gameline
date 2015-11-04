var gameList = new LinkedList();
var playRecordIndex = "0";
var playRecordStorage = "playRecordStorage";
var tm_listTopPaddingT = 10;
var playRecordWidth = 316;
var PlayRecordLength;
function SetPlayRecord(x, htmlEl) {
    PlayRecordLength = playRecordWidth;
    showHeader();
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
        PlayRecordLength = PlayRecordLength - $(".playrecordName")[i].offsetWidth;
        if(PlayRecordLength<0)
        {
            $(".playrecordName")[i].style.display="none";
            break;
        }
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
    PlayRecordLength = playRecordWidth;
    bdc.external.appSend('local/storage/disk/get', {key: playRecordStorage}, function (result) {
        var bError = result.error === 0;
        var bFound = result.body.found === true;
        $('div.playrecord').html("");
        if (bError && bFound) {
            temp = stringToList(result.body.value);
            if(gameList.length!=0){
                showHeader();
            }
            for (var i = 0; i < gameList.length; i++) {
                $("#playrecord").append(gameList.get(i));
                PlayRecordLength = PlayRecordLength - $(".playrecordName")[i].offsetWidth;
                if(PlayRecordLength<0)
                {
                    $(".playrecordName")[i].style.display="none";
                    break;
                }

            }

        }
    })
}


function clearDiskRecord() {
    gameList = new LinkedList();
    $('div.playrecord').html("");
    animation();
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
    DataReport.clickClearRecord();
}

function playRecordWindow(x) {
    temp = $(x)[0].getAttribute("info");
    sid = $(x)[0].getAttribute("sid");
    data = JSON.parse(temp);
    bdc.external.appSend('local/net/open_url', data || {}, function () {
    });
    var htmlEl = '<a  class=playrecordName onclick="playRecordWindow($(this))" sid="' + $(x)[0].getAttribute("sid")+ '" info=' + JSON.stringify(data) + '>' + $(x)[0].innerHTML + '</a>'
    SetPlayRecord(x, htmlEl);
    DataReport.clickGameIcon("2",$(x)[0].getAttribute("sid"));
}

function stringToList(x) {
    temList = JSON.parse(x);
    temList.__proto__ = gameList.__proto__;
    temNode = temList.head;
    while (temNode) {
        temNode.__proto__ = Node.prototype;
        temNode = temNode.next;
    }
    if(temList.tail)
        temList.tail.__proto__ = Node.prototype;
    gameList = temList;
}


function showHeader(){
    $("#nobr").css('display','block');
    $("#clearTip").css('display','none');
    $("#playRecordBar").css('display','block');
    //$("#playRecordBar").slideDown("slow");
    topValue = $("#playRecordBar").height()+$("#header").height()+tm_listTopPaddingT;
    $("#game").css('margin-top',topValue);
    $("#playRecordText").innerHTML="我玩过的:";
}

function animation(){

    $("#nobr").css('display','none');
    $("#clearTip").css('display','block');

    setTimeout(function(){
        hideHeader();
        GetPlayRecord();
    },1500)
}

function hideHeader(){
    $("#playRecordText").innerHTML="";
    //$("#playRecordBar").slideUp("slow");
    $("#playRecordBar").css('display','none');
    topValue = $("#header").height()+tm_listTopPaddingT;
    $("#game").css('margin-top',topValue);
}


function moreGame(){
    DataReport.clickMoreGameLink( $("#more_game_text_a").text(), $("#more_game_text_a").attr("href"));
}
