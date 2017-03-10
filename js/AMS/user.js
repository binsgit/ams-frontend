/**
 * Created by root on 17-1-4.
 */


function AMS_User_LogoutUser() {
    AMS_LocalStorage_WipeLoggedInUserInfo();
    AMS_SideBar_UserInfo_Update(0);
    Materialize.toast("成功退出登录", 3000, 'rounded');
}

function AMS_User_LoginUser(username, password) {

    var serialized_login_req = '{"username":"' + username + '","password":"' + password + '"}';

    $.ajax({
        async: true,
        type: "POST",
        url: __AMS_API_URL + "login",
        data: serialized_login_req,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        error : function () {
            Materialize.toast("登录错误：API请求失败",3000);
        }
    }).done(function(data, textStatus, jqXHR){
        Materialize.toast("Debug: API request /login success",3000);
        var parsed = JSON.parse(jqXHR.responseText);

        if (parsed.auth === true) {
            AMS_LocalStorage_SetLoggedInUserName(username);
            AMS_LocalStorage_SetLoggedInUserToken(parsed.token);
            AMS_SideBar_UserInfo_Update(1, username);
            Materialize.toast("登录成功 (´・ω・`)", 3000, 'rounded');

        } else {
            AMS_LocalStorage_SetLoggedInUserToken("bad");
            Materialize.toast("登录失败！请检查用户名或密码是否正确̣ ◝(๑⁺᷄ ·̭ ⁺᷅๑)◞՞", 3000, 'rounded');
        }
    });

}

function AMS_User_LoginUserFromForm(){
    var username = $("#ams-userlogin-window-form-username").val();
    var password = $("#ams-userlogin-window-form-passwd").val();
    AMS_User_LoginUser(username, password);
}

/**
 * @return {number}
 */
function AMS_User_IsLoggedIn(){
    if (AMS_LocalStorage_GetLoggedInUserToken() === 0)
        return 0;
    else
        return 1;
}