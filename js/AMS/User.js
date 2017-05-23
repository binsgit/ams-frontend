/**
 * Created by root on 17-1-4.
 */

AMS.User = {

    LoginWindow: {
        OpenUI: function () {
            $('#ams-window-login').modal('open');
        },
        CloseUI: function () {
            $('#ams-window-login').modal('close');
        },

        ProcessLogin: function () {
            let username = $("#ams-window-login-form-username").val();
            let password = $("#ams-window-login-form-passwd").val();
            Materialize.toast("正在登录，请稍侯 (｡•ˇ‸ˇ•｡)", 3000);
            AMS.User.Login(username, password);
        }
    },

    Login: function (username, password) {

        let thisreq = new AMS.API.Request({
            RawData: {
                operation: 'login',
                data: {
                    username: username,
                    password: password
                }
            },
            DoneCallback: function (parsed) {
                AMS.RuntimeData.User.Token(parsed.data.token);
                AMS.RuntimeData.User.LoginName(username);

                Materialize.toast("登录成功 (´・ω・`)", 3000, 'rounded');
                AMS.User.LoginWindow.CloseUI();
            },
            ErrorCallback: function (status) {
                AMS.RuntimeData.User.Token(null);
                AMS.RuntimeData.User.LoginName(null);

                Materialize.toast("登录失败！请检查用户名或密码是否正确̣ ◝(๑⁺᷄ ·̭ ⁺᷅๑)◞՞", 5000, 'rounded');
            },
            AlwaysCallback: function () {
                AMS.User.UpdateSideBar();
            }
        });

        thisreq.Dispatch();
    },

    Logout: function () {
        AMS.RuntimeData.User.Token(null);
        AMS.RuntimeData.User.LoginName(null);

        Materialize.toast("成功退出登录", 3000, 'rounded');
        AMS.User.UpdateSideBar();
    },

    IsLoggedIn: function () {
        if (AMS.RuntimeData.User.Token())
            return true;
        else
            return false;
    },

    UpdateSideBar: function () {
        let sut = $("#ams-sidebar-userinfo-text");
        let sutt = sut.parent();
        let lgname = AMS.RuntimeData.User.LoginName();

        if ( lgname ) {
            sut.text(lgname);
            sutt.attr("data-tooltip", "点此退出登录");
            sutt.attr("href", "#ams-window-logout");
        } else {
            sut.text("未登录");
            sutt.attr("data-tooltip", "点我来登录吧 (´・ω・`)");
            sutt.attr("href", "#ams-window-login");
        }

        sutt.tooltip();
    }
};
