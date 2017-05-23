/**
 * Created by root on 17-5-21.
 */

AMS.UIRenderer.Recipes.APISettingsWindow = function () {
    let ret = '<div id="ams-window-apisettings" class="modal">' +
        '<div class="modal-content">' +
        '<h4>API设置</h4>' +
        '<div class="row">' +
        '<form class="col s12">' +
        '<div class="row">' +
        '<div class="input-field col s12">' +
        '<i class="material-icons prefix">&#xE86F;</i>' +
        '<input id="ams-window-apisettings-form-url" class="tooltipped validate" data-position="bottom"' +
        ' data-delay="50" data-tooltip="没事不要乱改！没事不要乱改！没事不要乱改！重要的事情说三遍！！"' +
        ' type="text" onkeypress="Reimu.Event.CallOnKeyPress(event, Reimu.Event.KeyCodes.Enter, function() {AMS.API.SetURL()})"/>' +
        '<label for="ams-window-apisettings-form-url">API地址</label>' +
        '请注意数据安全。' +
        '</div>' +
        '</div>' +
        '</form>' +
        '</div>' +
        '</div>' +
        '<div class="modal-footer">' +
        '<a href="#" class="modal-action modal-close waves-effect waves-red btn-flat">取消</a>' +
        '<a href="#" class="modal-action modal-close waves-effect waves-green btn-flat"' +
        ' onclick="AMS.API.SetURL()">' +
        '确定' +
        '</a>' +
        '</div>' +
        '</div>';

    let postrender_func = function () {
        $('#ams-window-apisettings').modal(AMS.UIRenderer.Templates.ModalAttributes.Dialog.Small);
    };

    return [ret, postrender_func];
};