/**
 * Created by root on 17-3-5.
 */

class APIReq {
    constructor() {

    }
}

function apiReq(serialized_req, donefunc, errfunc) {

    var j_buf;
    var j_s_t = serialized_req;

    if (__AMS_CurrentUser_Token !== 0) {
        j_buf = JSON.parse(serialized_req);
        j_buf["auth"] = __AMS_CurrentUser_Token;
        j_s_t = JSON.stringify(j_buf);
    }

    $.ajax({
        async: true,
        type: "POST",
        url: __AMS_API_URL,
        data: j_s_t,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        error: function(data, textStatus, jqXHR){
            if (errfunc)
                errfunc();
            else
                Materialize.toast("API请求失败：连接失败或服务器内部错误", 3000);
        }
    }).done(function(data, textStatus, jqXHR){
            var parsed = JSON.parse(jqXHR.responseText);
            var rc = parsed.rc;
            console.log(rc);
            if (rc === 0) {
                donefunc(parsed);
            } else {
                if (errfunc)
                    errfunc(parsed);
                else {
                    switch (rc) {
                        case -1:
                            Materialize.toast("API请求失败：操作参数错误", 3000);
                            break;
                        case 65333:
                            Materialize.toast("API请求失败：身份验证失败，请重新登录", 3000);
                            AMS_LocalStorage_WipeLoggedInUserInfo();
                            AMS_SideBar_UserInfo_Update(0);
                            break;
                        case 65334:
                            Materialize.toast("API请求失败：主要参数错误", 3000);
                            break;
                        case 65335:
                            Materialize.toast("API请求失败：不完整或出错的请求", 3000);
                            break;
                        default:
                            Materialize.toast("API请求失败：核心内部错误", 3000);
                            break;
                    }
                }
            }
        });
}

function apiReq_low(serialized_req, token, api_url, donefunc, errfunc) {

    var j_buf;
    var j_s_t = serialized_req;

    if (token !== 0) {
        j_buf = JSON.parse(serialized_req);
        j_buf["auth"] = token;
        j_s_t = JSON.stringify(j_buf);
    }

    $.ajax({
        async: true,
        type: serialized_req ? "POST" : "GET",
        url: api_url,
        data: serialized_req ? j_s_t : null,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        error: function(data, textStatus, jqXHR){
            if (errfunc)
                errfunc();
            else
                Materialize.toast("API请求失败：连接失败或服务器内部错误", 3000);
        }
    }).done(function(data, textStatus, jqXHR){
        var parsed = JSON.parse(jqXHR.responseText);
        var rc = parsed.rc;
        console.log(rc);
        if (Number.isInteger(rc) && rc !== 0)  {
            if (errfunc)
                errfunc(parsed);
            else {
                switch (rc) {
                    case -1:
                        Materialize.toast("API请求失败：操作参数错误", 3000);
                        break;
                    case 65333:
                        Materialize.toast("API请求失败：身份验证失败，请重新登录", 3000);
                        break;
                    case 65334:
                        Materialize.toast("API请求失败：主要参数错误", 3000);
                        break;
                    case 65335:
                        Materialize.toast("API请求失败：不完整或出错的请求", 3000);
                        break;
                    default:
                        Materialize.toast("API请求失败：核心内部错误", 3000);
                        break;
                }
            }
        } else {
            donefunc(parsed);
        }
    });
}