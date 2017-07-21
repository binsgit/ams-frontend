/**
 * Created by root on 17-5-21.
 */

AMS.UIRenderer.Recipes.SuperRTACWindow = function () {

    let ret = '';

    let postrender_func = function () {
        $('#ams-window-srtac_tasks').modal();
        $('#ams-window-srtac_scripts').modal();
        $('#ams-window-srtac_editor').modal();
        $('#ams-window-srtac_new').modal();
        // $('#ams-window-srtac_').modal();
    };

    return [ret, postrender_func];
};