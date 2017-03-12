/**
 * Created by root on 17-1-4.
 */


function AMS_User_LogoutUser() {
    AMS_LocalStorage_WipeLoggedInUserInfo();
    AMS_SideBar_UserInfo_Update(0);
    Materialize.toast("成功退出登录", 3000, 'rounded');
}

function AMS_User_LoginUser(username, password) {

    var serialized_login_req = '{"operation": "login", "data": {"username":"' + username + '","passwd":"' + password + '"}}';

    apiReq(serialized_login_req, function(parsed){
            AMS_LocalStorage_SetLoggedInUserName(username);
            AMS_LocalStorage_SetLoggedInUserToken(parsed.data.token);
            AMS_SideBar_UserInfo_Update(1, username);
            Materialize.toast("登录成功 (´・ω・`)", 3000, 'rounded');
    }, function(parsed) {
        AMS_LocalStorage_SetLoggedInUserToken(0);
        Materialize.toast("登录失败！请检查用户名或密码是否正确̣ ◝(๑⁺᷄ ·̭ ⁺᷅๑)◞՞", 3000, 'rounded');
    })

}

function AMS_User_LoginUserFromForm(){
    var username = $("#ams-userlogin-window-form-username").val();
    var password = $("#ams-userlogin-window-form-passwd").val();
    Materialize.toast("正在登录……", 2000, 'rounded');
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