/**
 * Created by root on 17-3-5.
 */


function apiReq(operation, data) {
    var ret;

    $.ajax({
        async: false,
        type: "POST",
        url: "/ams/api/ams_cgi.moe",
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        error : function (data, textStatus, jqXHR) {

        }
    }).done(function(data, textStatus, jqXHR){
        ret = JSON.parse(jqXHR.responseText);

        if (ret.rc !== 0)
            Materialize.toast("API请求失败：" + ret.msg + " (" + ret.rc.toString() + ")", 1000);
    });

    return ret;

}