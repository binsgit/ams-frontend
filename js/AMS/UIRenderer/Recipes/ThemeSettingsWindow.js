/**
 * Created by root on 17-5-21.
 */

AMS.UIRenderer.Recipes.ThemeSettingsWindow = function () {
    let ret = '<div id="ams-window-themesettings" class="modal">' +
        '<div class="modal-content">' +
        '<h4>主题</h4>' +
        '<ul class="collection">';

    let themes = AMS.Themes.ThemeList;

    let j = 0;
    for (let p in themes) {
            ret += '<a class="collection-item" onclick="AMS.Themes.SetTheme('+ j.toString() +
                ')"><font color="' + themes[p].PreviewColor + '">◆&nbsp;&nbsp;' +
                themes[p].Name + '</font></a>';

            j++;
    }

    ret += '</ul>' +
        '</div>' +
        '</div>';

    let postrender_func = function () {
        $('#ams-window-themesettings').modal(AMS.UIRenderer.Templates.ModalAttributes.Dialog.Small);
    };

    return [ret, postrender_func];
};