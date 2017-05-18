/**
 * Created by root on 17-3-5.
 */

class APIReq {

    static get LoggingLevels(){
        return {
            None: 0,
            Console: 0x1, Toast: 0x2,
            Debug: 0x10, Error: 0x20
        };
    };

    constructor(init_list) {
        if (init_list.APIURL)
            this.APIURL = init_list.APIURL;
        else
            this.APIURL = RuntimeData.API.URL();

        if (init_list.Token)
            this.Token = init_list.Token;
        else
            this.Token = RuntimeData.User.Token();

        if (init_list.JSON)
            this.RefineJSONwithSerialized(init_list.JSON);
        else if (init_list.RawData)
            this.RefineJSONwithRaw(init_list.RawData);

        if (init_list.ResponseNoParse)
            this.ResponseNoParse = init_list.ResponseNoParse;

        if (init_list.DoneCallback)
            this.DoneCallback = init_list.DoneCallback;

        if (init_list.ErrorCallback)
            this.ErrorCallback = init_list.ErrorCallback;

        if (init_list.Logging)
            this.Logging = init_list.Logging;
        else
            this.Logging = APIReq.LoggingLevels.Console | APIReq.LoggingLevels.Toast | APIReq.LoggingLevels.Error;

        if (init_list.Blocking)
            this.Blocking = init_list.Blocking;

        if (init_list.NextReq)
            this.NextReq = init_list.NextReq;

        if (init_list.AtOnce)
            this.Dispatch();

    }

    Dispatch(){

        let reqctx = this;

        console.log(this);

        $.ajax({
            async: !reqctx.Blocking,
            type: reqctx.RequestData ? "POST" : "GET",
            url: reqctx.APIURL,
            data: reqctx.RequestData ? reqctx.RequestData : undefined,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            error: function(jqXHR, textStatus, errorThrown){
                if (reqctx.ErrorCallback)
                    reqctx.ErrorCallback(jqXHR.status);

                let errmsg = "APIReq::Dispatch() error: Request of " + reqctx.APIURL + " returned HTTP error code " +
                    jqXHR.status.toString();

                if (reqctx.Logging & APIReq.LoggingLevels.Error) {
                    if (reqctx.Logging & APIReq.LoggingLevels.Console)
                        console.log(errmsg);
                    if (reqctx.Logging & APIReq.LoggingLevels.Toast)
                        Materialize.toast(errmsg, 3000);
                }
            }

        }).done(function(data, textStatus, jqXHR){
            if (reqctx.Logging & APIReq.LoggingLevels.Debug) {
                let errmsg = "APIReq::Dispatch() debug: Connection finished";

                if (reqctx.Logging & APIReq.LoggingLevels.Console)
                    console.log(errmsg);
                if (reqctx.Logging & APIReq.LoggingLevels.Toast)
                    Materialize.toast(errmsg, 3000)
            }

            console.log(this);

            if (reqctx.DoneCallback) {
                if (reqctx.ResponseNoParse) {
                    reqctx.DoneCallback(jqXHR.responseText);
                } else {
                    let parsed = JSON.parse(jqXHR.responseText);
                    let rc = parsed.rc;

                    if (Number.isInteger(rc) && rc !== 0)  {
                        if (reqctx.ErrorCallback)
                            reqctx.ErrorCallback(parsed);

                        let errmsg = "APIReq::Dispatch() error: API request failed: ";

                        switch (rc) {
                            case -1:
                                errmsg += "Invalid argument";
                                break;
                            case 65333:
                                errmsg += "Invalid login token";
                                break;
                            case 65334:
                                errmsg += "Bad request format";
                                break;
                            case 65335:
                                errmsg += "Malformed request";
                                break;
                            default:
                                errmsg += "Unknown error";
                                break;
                        }

                        if (reqctx.Logging & APIReq.LoggingLevels.Error) {
                            if (reqctx.Logging & APIReq.LoggingLevels.Console)
                                console.log(errmsg);
                            if (reqctx.Logging & APIReq.LoggingLevels.Toast)
                                Materialize.toast(errmsg, 3000)
                        }

                    } else {
                        if (reqctx.Logging & APIReq.LoggingLevels.Debug) {
                            let errmsg = "APIReq::Dispatch() debug: Calling DoneCallback";

                            if (reqctx.Logging & APIReq.LoggingLevels.Console)
                                console.log(errmsg);
                            if (reqctx.Logging & APIReq.LoggingLevels.Toast)
                                Materialize.toast(errmsg, 3000)
                        }

                        reqctx.DoneCallback(parsed);
                    }
                }
            }

            if (reqctx.NextReq)
                reqctx.NextReq.Dispatch();
        });
    }

    RefineJSONwithSerialized(serialized_json){
        if (this.Token) {
            let buf = JSON.parse(serialized_json);
            buf["auth"] = this.Token;
            this.RequestData = JSON.stringify(buf);
        } else {
            this.RequestData = serialized_json;
        }
    }

    RefineJSONwithRaw(raw_data){
        let buf = raw_data;
        if (this.Token)
            buf["auth"] = this.Token;
        this.RequestData = JSON.stringify(buf);
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