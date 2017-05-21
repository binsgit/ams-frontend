/**
 * Created by root on 17-5-21.
 */
import {sprintf} from "../../sprintf";

AMS.UIRenderer.ThemeSettingsWindow = function () {
    let ret = '<div id="ams-window-themesettings" class="modal">' +
        '<div class="modal-content">' +
        '<h4>主题</h4>' +
        '<ul class="collection with-header">';

    let themes = AMS.Themes.ThemeList;

    let j = 0;
    for (let p in themes) {
            ret += sprintf('<a class="collection-item" onclick="AMS.Themes.SetTheme(%d)"><div>%s<a href="#" class="secondary-content"><i class="material-icons">' +
                '<font color="%s">&#xE047;</font></i></a></div></a>', j, themes[p].Name, themes[p].PreviewColor);

            j++;
    }

    ret += '</ul>' +
        '</div>' +
        '</div>';

    return ret;
};