/**
 * Created by root on 17-5-21.
 */

AMS.UIRenderer.Recipes.LoginWindow = function () {
    let ret = '<div id="ams-window-login" class="modal">' +
        '<div class="modal-content">' +
        '<h4>登录</h4>' +
        '<div class="row">' +
        '<form class="col s12">' +
        '<div class="row">' +
        '<div class="input-field col s12">' +
        '<i class="material-icons prefix">&#xE853;</i>' +
        '<input id="ams-window-login-form-username" type="text" class="validate" ' +
        'onkeypress="Reimu.Event.CallOnKeyPress(event, Reimu.Event.KeyCodes.Enter, function() {AMS.User.LoginWindow.ProcessLogin()})">' +
        '<label for="ams-window-login-form-username">用户名</label>' +
        '</div>' +
        '</div>' +
        '<div class="row">' +
        '<div class="input-field col s12">' +
        '<i class="material-icons prefix">&#xE897;</i>' +
        '<input id="ams-window-login-form-passwd"' +
        'onkeypress="Reimu.Event.CallOnKeyPress(event, Reimu.Event.KeyCodes.Enter, function() {AMS.User.LoginWindow.ProcessLogin()})" ' +
        'type="password" class="validate">' +
        '<label for="ams-window-login-form-passwd">密码</label>' +
        '</div>' +
        '</div>' +
        '</form>' +
        '</div>' +
        '</div>' +
        '<div class="modal-footer">' +
        '<a href="#" class="modal-action modal-close waves-effect waves-red btn-flat">取消</a>' +
        '<a href="#" class="modal-action waves-effect waves-green btn-flat" ' +
        'onclick="AMS.User.LoginWindow.ProcessLogin()">登录</a>' +
        '</div>' +
        '</div>';

    let postrender_func = function () {
        $('#ams-window-login').modal(AMS.UIRenderer.Templates.ModalAttributes.Dialog.Small);
    };

    return [ret, postrender_func];
};