/**
 * Created by root on 17-5-21.
 */

AMS.UIRenderer.Recipes.ErrorSelectorList = function () {
    let ret = '';

    let recipe = {
        ul: {
            id: "ams-ulist-issues-warning",
            class: "dropdown-content",
            __Next: []
        }
    };

    let e = AMS.Issues.AvalonErrNum;
    let list_contents = [
        [e.Error_WU, "&#xE8B2;", "WU异常"],
        [e.Error_MW, "&#xE8B2;", "MW异常"],
        [e.Error_WU, "&#xE8B2;", "WU异常"],
        [e.Error_WU, "&#xE8B2;", "WU异常"],
        [e.Error_WU, "&#xE8B2;", "WU异常"],
        [e.Error_WU, "&#xE8B2;", "WU异常"],
        [e.Error_WU, "&#xE8B2;", "WU异常"],
        [e.Error_WU, "&#xE8B2;", "WU异常"],
        [e.Error_WU, "&#xE8B2;", "WU异常"],
        [e.Error_WU, "&#xE8B2;", "WU异常"],

    ];

    let postrender_func = function () {

    };

    return [ret, postrender_func];
};