/**
 * Created by root on 17-1-10.
 */
function Reimu_CallOnEnterKeyPress(e, pf) {
    if(e.keyCode === 13){
        e.preventDefault();
        pf();
    }
}

function Reimu_ToogleCardTitleLoadingIcon(fulldomid, enabled) {
    if (enabled) {
        $('#'+fulldomid).append('<img src="assets/loading.gif" width="18px" height="18px">');
    } else {
        $('#'+fulldomid+' > img').remove();
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