var cdnPath = 'http://dlsw.br.baidu.com/game/';

var resizeOwnEmulator = function(width, height) {
    var emulator = $('#emulator');
    emulator.css('width', width);
    emulator.css('height', height);
    var bannerHeight = $("#shrink").height() + parseInt($("#shrink").css("padding-bottom"));
    gameHeight = parseInt(height);
    gameWidth = parseInt(width);
    setMediaLayout(width,height);
    var data = {
        height: gameHeight + bannerHeight,
        width: parseInt(width)
    };
    bdc.external.appSend('local/ui/set_window_size', data || {}, function () {
    });
};

function embed_rom(rom_type, rom_url, rom_name, rom_width, rom_height) {
    var flashvars = {
        system : rom_type,
        url : rom_url,
        game : rom_name
    };
    var params = {};
    var attributes = {};

    params.allowscriptaccess = 'always';
    params.allowFullScreen = 'true';
    params.allowFullScreenInteractive = 'true';

    swfobject.embedSWF(cdnPath + 'flash/Nesbox1.1.swf', 'emulator', rom_width, rom_height, '11.2.0',
        cdnPath + 'flash/expressInstall.swf', flashvars, params, attributes);
}
