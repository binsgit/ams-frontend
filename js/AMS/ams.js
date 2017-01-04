/**
 * Created by root on 16-12-28.
 */


var ams_api_url = $.jStorage.get("ams_api_url", "/api/");

var ams_map_tc = 0;
var ams_map_tr = 0;

var ams_api_connectok_noticed = 0;

function AMS_NavBar_IP_UpdateText(ip) {
    $("#ams-navbar-ip").text(ip);
}

function AMS_NavBar_MiscInfo_UpdateText(){
    $.ajax({
        async: true,
        type: "GET",
        url: ams_api_url + "shortlog",
        error: function () {
            ams_api_connectok_noticed = 0;
            Materialize.toast("API请求失败！请检查您的网络、服务器证书和API地址配置是否正确",3000);
        }
    }).done(function(data, textStatus, jqXHR){

        if (ams_api_connectok_noticed === 0) {
            ams_api_connectok_noticed = 1;
            Materialize.toast("API连接成功 ["+ams_api_url+"]",3000);
        }

        Materialize.toast("Debug: API request /shortlog success",3000);

        var parsed = JSON.parse(jqXHR.responseText);

        console.log(jqXHR.responseText);

        var nodescount = parsed.result.node_num;
        var machinescount = parsed.result.module_num;
        var thashrate_cgm = parsed.result.hashrate_cgminer / 1000 / 1000 / 1000;
        var thashrate_theo = parsed.result.hashrate / 1000 / 1000 / 1000;

        $.jStorage.set("AMS_3_1_Runtime_API_Time", parsed.result.time);

        $("#ams-navbar-nodescount").text(nodescount.toString());
        $("#ams-navbar-machinescount").text(machinescount.toString());
        $("#ams-navbar-hashrate").text(thashrate_cgm.toFixed(2).toString()+" / "+thashrate_theo.toFixed(2).toString());
    });

    var t = setTimeout(AMS_NavBar_MiscInfo_UpdateText, 5000);
}

function AMS_CommonUI_IP_Change(ip) {
    AMS_NavBar_IP_UpdateText(ip);

    // TODO: ...
}
function AMS_NavBar_IP_Selector_AppendEntry(ip) {
    $("#ams-navbar-ip-selector").append("<li><a href=\"#\" onclick=\"AMS_CommonUI_IP_Change(this.text)\">" + ip + "</a></li>");
}

function AMS_SideBar_UserInfo_Update(islogined, username){
    sut = $("#ams-sidebar-userinfo-text");
    sutt = sut.parent();
    if ( islogined == 1 ) {
        sut.text(username);
        sutt.attr("data-tooltip", "点此退出登录");
        sutt.attr("href", "#ams-userlogout-window");
    } else {
        sut.text("未登录");
        sutt.attr("data-tooltip", "点我来登录吧 (´・ω・`)");
        sutt.attr("href", "#ams-userlogin-window");
    }
    sutt.tooltip();
}

function AMS_LocalStorage_GetLoggedInUserName() {
    return $.jStorage.get("AMS_3_1_Config_CurrentUser_Name", 0);
}

function AMS_LocalStorage_GetLoggedInUserToken() {
    return $.jStorage.get("AMS_3_1_Config_CurrentUser_Token", 0);
}

function AMS_LocalStorage_SetLoggedInUserName(name) {
    return $.jStorage.set("AMS_3_1_Config_CurrentUser_Name", name);
}

function AMS_LocalStorage_SetLoggedInUserToken(name) {
    return $.jStorage.set("AMS_3_1_Config_CurrentUser_Token", name);
}

function AMS_LocalStorage_WipeLoggedInUserInfo(){
    $.jStorage.deleteKey("AMS_3_1_Config_CurrentUser_Token");
    $.jStorage.deleteKey("AMS_3_1_Config_CurrentUser_Name");
}

/**
 * @return {number}
 */
function AMS_LocalStorage_IsUserLoggedIn(){
    if (AMS_LocalStorage_GetLoggedInUserToken === 0)
        return 0;
    else
        return 1;
}

function AMS_StartupTask_ProcessLoggedInUser() {
    var usr = AMS_LocalStorage_GetLoggedInUserName();
    if (!usr) {
        AMS_SideBar_UserInfo_Update(0);
    } else {
        AMS_SideBar_UserInfo_Update(1, usr);
    }
}

/**
 * @return {string}
 */
function AMS_APIRequest_Login(username, password) {
    var serialized_login_req = "{\"username\":\"" + username + "\",\"password\":\"" + password + "\"}";

    $.ajax({
        async: false, // This crap!!!!!!!!!!!!!!!!!!!!
        type: "POST",
        url: ams_api_url + "login",
        data: serialized_login_req,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
    }).done(function(data, textStatus, jqXHR){
        Materialize.toast("Debug: API request /login success",3000);
        var parsed = JSON.parse(jqXHR.responseText);

        if (parsed.auth === true) {
            AMS_LocalStorage_SetLoggedInUserToken(parsed.token);
        } else {
            AMS_LocalStorage_SetLoggedInUserToken("bad");
        }
    });

}


function AMS_Action_LogoutUser() {
    AMS_LocalStorage_WipeLoggedInUserInfo();
    AMS_SideBar_UserInfo_Update(0);
    Materialize.toast("成功退出登录", 3000, 'rounded');
}


function AMS_Action_LoginUser(username, password) {
    AMS_APIRequest_Login(username, password);

    AMS_LocalStorage_GetLoggedInUserToken();

    if (AMS_LocalStorage_GetLoggedInUserToken() === "bad") {
        Materialize.toast("登录失败！请检查用户名或密码是否正确", 3000, 'rounded')
    } else {
        Materialize.toast("登录成功", 3000, 'rounded');
        AMS_SideBar_UserInfo_Update(1, username);
    }


}

function AMS_Action_LoginUserFromForm(){
    var username = $("#ams-userlogin-window-form-username").val();
    var password = $("#ams-userlogin-window-form-passwd").val();
    AMS_Action_LoginUser(username, password);
}

function AMS_Action_ChangeAPI(){
    var newams_api_url = $("#ams-apisettings-window-form-url").val();

    $.jStorage.set("ams_api_url", newams_api_url);
    ams_api_url = newams_api_url;
}

function AMS_Action_Map_TR_Switch(){
    var btn = $("#ams-map-tr-btn");
    if (ams_map_tr === 0) {
        ams_map_tr = 1;
        btn.text("平均温度");
    } else {
        ams_map_tr = 0;
        btn.text("最高温度");
    }
}

function AMS_Action_Map_TC_Switch(){
    var btn = $("#ams-map-tc-btn");
    if (ams_map_tc === 0) {
        ams_map_tc = 1;
        btn.text("单设备");
    } else {
        ams_map_tc = 0;
        btn.text("控制器平均");
    }
}