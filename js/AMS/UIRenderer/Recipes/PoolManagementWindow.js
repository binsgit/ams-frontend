/**
 * Created by root on 17-7-14.
 */

AMS.UIRenderer.Recipes.PoolManagementWindow = function () {
    let ret = '';




    let postrender_func = function () {
        $('#ams-window-poolmanagement').modal();
    };

    return [ret, postrender_func];
};