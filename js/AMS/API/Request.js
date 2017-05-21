/**
 * Created by root on 17-5-21.
 */

AMS.API.Request = class {

    static get LoggingLevels(){
        return {
            None: 0,
            Console: 0x1, Toast: 0x2,
            Debug: 0x10, Error: 0x20
        };
    };

    constructor(init_list) {

        this.LoggingLevels = AMS.API.Request.LoggingLevels;

        if (init_list.APIURL)
            this.APIURL = init_list.APIURL;
        else
            this.APIURL = AMS.RuntimeData.API.URL();

        if (init_list.Token)
            this.Token = init_list.Token;
        else
            this.Token = AMS.RuntimeData.User.Token();

        if (init_list.JSON)
            this.RefineJSONwithSerialized(init_list.JSON);
        else if (init_list.RawData)
            this.RefineJSONwithRaw(init_list.RawData);

        if (init_list.ResponseNoParse)
            this.ResponseNoParse = init_list.ResponseNoParse;

        if (init_list.DoneCallback)
            this.DoneCallback = init_list.DoneCallback;

        if (init_list.AlwaysCallback)
            this.AlwaysCallback = init_list.AlwaysCallback;

        if (init_list.ErrorCallback)
            this.ErrorCallback = init_list.ErrorCallback;

        if (init_list.Logging)
            this.Logging = init_list.Logging;
        else
            this.Logging = this.LoggingLevels.Console | this.LoggingLevels.Toast | this.LoggingLevels.Error;

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

                if (reqctx.Logging & reqctx.LoggingLevels.Error) {
                    if (reqctx.Logging & reqctx.LoggingLevels.Console)
                        console.log(errmsg);
                    if (reqctx.Logging & reqctx.LoggingLevels.Toast)
                        Materialize.toast(errmsg, 3000);
                }
            },
            always: function (jqXHR, textStatus, errorThrown) {
                if (reqctx.AlwaysCallback)
                    reqctx.AlwaysCallback(jqXHR, textStatus, errorThrown);
            }
        }).done(function(data, textStatus, jqXHR){
            if (reqctx.Logging & reqctx.LoggingLevels.Debug) {
                let errmsg = "APIReq::Dispatch() debug: Connection finished";

                if (reqctx.Logging & reqctx.LoggingLevels.Console)
                    console.log(errmsg);
                if (reqctx.Logging & reqctx.LoggingLevels.Toast)
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

                        if (reqctx.Logging & reqctx.LoggingLevels.Error) {
                            if (reqctx.Logging & reqctx.LoggingLevels.Console)
                                console.log(errmsg);
                            if (reqctx.Logging & reqctx.LoggingLevels.Toast)
                                Materialize.toast(errmsg, 3000)
                        }

                    } else {
                        if (reqctx.Logging & reqctx.LoggingLevels.Debug) {
                            let errmsg = "APIReq::Dispatch() debug: Calling DoneCallback";

                            if (reqctx.Logging & reqctx.LoggingLevels.Console)
                                console.log(errmsg);
                            if (reqctx.Logging & reqctx.LoggingLevels.Toast)
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

};