/**
 * Created by root on 17-1-9.
 */

var fwupd_table = $('#ams-mainpage-fwupd-table-tbody');
var t_FwUpd_UpdateStatus;

function AMS_FwUpd_WipeStatus() {

    fwupd_table.find('tr').remove();

}

function AMS_FwUpd_UpdateStatus() {

    var serialized_status_req = '{"op":"status"}';

    AMS_FwUpd_WipeStatus();

    $.ajax({
        async: false,
        type: "POST",
        url: __AMS_API_URL + "opt/mmupgrade",
        data: serialized_status_req,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        error : function () {
            Materialize.toast("API请求失败：无法连接AMSD",100);
        }
    }).done(function(data, textStatus, jqXHR){
        var parsed = JSON.parse(jqXHR.responseText);

        if (parsed.rc !== 0) {
            Materialize.toast("AMSD内部错误", 3000);
            return;
        }

        var status = parsed.data.status;

        for (var thisstatus in status) {

            fwupd_table.append('<tr><td>' +
                status[thisstatus].ip + '</td><td>MM 固件</td><td>' + status[thisstatus].msg + '</td><td>' +
                ProgressBar((status[thisstatus].upd_percent)*0.7+(status[thisstatus].dl_percent)*0.3) + '</td></tr>');
        }

    });

    t_FwUpd_UpdateStatus = setTimeout(AMS_FwUpd_UpdateStatus,1000);

}

function AMS_FwUpd_Req_Clear() {

    var serialized_clear_req = '{"op":"clear"}';

    $.ajax({
        async: false,
        type: "POST",
        url: __AMS_API_URL + "opt/mmupgrade",
        data: serialized_clear_req,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        error : function () {
            Materialize.toast("API请求失败：无法连接AMSD",100);
        }
    }).done(function(data, textStatus, jqXHR){

    });
}

function AMS_FwUpd_Req_Update(ips_array, fwurl) {

    var jreq = {
        op: "upgrade",
        fw_url: fwurl,
        ips: ips_array
    };

    var serialized_upd_req = JSON.stringify(jreq);

    $.ajax({
        async: false,
        type: "POST",
        url: __AMS_API_URL + "opt/mmupgrade",
        data: serialized_upd_req,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        error : function () {
            Materialize.toast("API请求失败：无法连接AMSD",2000);
        }
    }).done(function(data, textStatus, jqXHR){
        Materialize.toast("升级请求成功",2000);
    });
}

function AMS_FwUpd_Exec() {
    var fwurl = $('#ams-fwupdnew-window-form-fwpkgurl').val();
    var ipst = $('#ams-fwupdnew-window-form-ipst').val();
    var iped = $('#ams-fwupdnew-window-form-iped').val();

    var iparray = Reimu_IPRange(ipst, iped);

    AMS_FwUpd_Req_Update(iparray, fwurl);
}