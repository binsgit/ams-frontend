/**
 * Created by root on 17-5-21.
 */

AMS.UIRenderer.Recipes.ErrorSelectorList = function () {
    let ret = '';

    let recipe = {
        ul: {
            id: "ams-ulist-badmachines-warnings",
            class: "dropdown-content",
            __Next: []
        }
    };

    let list_contents = [
        ["TODO", "&#xE8B2;", "WU异常"],

    ];

    let postrender_func = function () {

    };

    return [ret, postrender_func];
};