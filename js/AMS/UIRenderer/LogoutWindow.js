/**
 * Created by root on 17-5-21.
 */

AMS.UIRenderer.LogoutWindow = function () {
    let ret = '<div id="ams-window-logout" class="modal">' +
        '<div class="modal-content">' +
        '<h4>退出登录</h4>' +
        '<p>您确定要退出登录吗？</p>' +
        '</div>' +
        '<div class="modal-footer">' +
        '<a href="#" class="modal-action modal-close waves-effect waves-red btn-flat">不要嘛</a>' +
        '<a href="#" onkeypress="Reimu.Event.CallOnKeyPress(event, Reimu.Event.KeyCodes.Enter, function() {AMS.User.Logout()})"' +
        ' onclick="AMS.User.Logout()" class="modal-action modal-close waves-effect waves-green btn-flat">嗯嗯！</a>' +
        '</div>' +
        '</div>';

    return ret;
};