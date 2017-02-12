/**
 * Created by root on 17-1-10.
 */

var CardTitleLoadingIcon = false;

function Reimu_CallOnEnterKeyPress(e, pf) {
    if(e.keyCode === 13){
        e.preventDefault();
        pf();
    }
}

function Reimu_ToogleCardTitleLoadingIcon(fulldomid, enabled) {
    if (enabled && (CardTitleLoadingIcon !== true)) {
        $('#'+fulldomid).append('<img src="assets/loading.gif" width="18px" height="18px">');
        CardTitleLoadingIcon = true;
    } else {
        $('#'+fulldomid+' > img').remove();
        CardTitleLoadingIcon = false;
    }
}

function AMS_ToggleLED(ip,port,devid,modid,btndom) {

    var state;
    if (btndom.attr('class') === 'waves-effect waves-light light-green accent-3 btn-flat') {
        state = 0;
        btndom.attr('class', 'waves-effect waves-green btn-flat');
    } else {
        state = 1;
        btndom.attr('class','waves-effect waves-light light-green accent-3 btn-flat');
    }


    var serialized_ledtoggle_req = '{"modules": [{"ip":"' + ip + '","port":"' + port.toString() + '","device_id":' +
        devid.toString() + ',"module_id":' + modid.toString() + ',"led":' + state.toString() + '}]}';

    $.ajax({
        async: true,
        type: "POST",
        url: __AMS_API_URL + "led",
        data: serialized_ledtoggle_req,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        error : function () {
            Materialize.toast("LED切换错误：API请求失败",3000);
        }
    }).done(function(data, textStatus, jqXHR){

    });
}

function Reimu_RandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * @return {string}
 */
function Reimu_RandomColor() {
    var ret = Reimu_RandomInt(0,255).toString() + ',' + Reimu_RandomInt(0,255).toString() + ',' +
        Reimu_RandomInt(0,255).toString();

    return ret;
}

/**
 * @return {string}
 */
function ProgressBar(percent) {
    return '<div class="progress progress-in-td"><div class="determinate" style="width: '+percent.toString()+'%"></div></div>';
}

function Reimu_IPRange(base, end) {
    var parts = base.split('.');
    var ret = [];
    var start = parseInt(parts[3]);


    for (var i = start; i <= parseInt(end); i++) {
        ret.push(parts[0]+'.'+parts[1]+'.'+parts[2]+'.'+i.toString());
    }

    return ret;
}

function DisableThem(array) {
    for (var i in array) {
        $(array[i]).val('');
        $(array[i]).prop('disabled', true);
    }
}

function DontDisableThem(array) {
    for (var i in array) {
        $(array[i]).prop('disabled', false);
        $(array[i]).removeProp('disabled');
    }
}

function isInt(value) {
    return !isNaN(value) &&
        parseInt(Number(value)) == value &&
        !isNaN(parseInt(value, 10));
}

var entityMap = {
    '\n': '<br>',
    ' ': '&nbsp;',
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
    '/': '&#x2F;',
    '`': '&#x60;',
    '=': '&#x3D;'
};

function escapeHtml(string) {
    return String(string).replace(/[&<>"'`=\/\n]/g, function (s) {
        return entityMap[s];
    });
}

function escapeHtml_Monospace(string) {
    return '<span class="monospace">'+escapeHtml(string)+'</span>';
}