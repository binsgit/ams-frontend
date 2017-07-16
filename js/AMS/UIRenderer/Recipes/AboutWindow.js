/**
 * Created by root on 17-7-14.
 */

AMS.UIRenderer.Recipes.AboutWindow = function () {
    let ret = '';


    ret += '<div id="ams-window-about" class="modal">' +
        '<div class="modal-content">' +
        '<h4>关于</h4>' +
        '<br>' +
        '<span class="ams-general-text">Avalon Management System - 阿瓦隆矿机管理系统<br>' +
        '<br>' +
        '前端版本：' + AMS.Version.WebClient + '<br>' +
        '后端版本：' + AMS.Version.Backend + '<br>' +
        '<br>' +
        '版权所有 &copy; 2016-2017 CloudyReimu<br>' +
        '<br>' +
        '本程序为自由软件；您可依据自由软件基金会所发表的GNU通用公共授权条款，对本程序再次发布和/或修改；无论您依据的是本授权的第三版，或（您可选的）任一日后发行的版本。<br>' +
        '本程序是基于使用目的而加以发布，然而不负任何担保责任；亦无对适售性或特定目的适用性所为的默示性担保。详情请参照GNU通用公共授权。<br>' +
        '您应已收到附随于本程序的GNU通用公共授权的副本；如果没有，请参照 <a href="http://www.gnu.org/licenses/">http://www.gnu.org/licenses/</a> 。' +
        '</span>' +
        '</div>' +
        '<div class="modal-footer">' +
        '<a href="#" class="modal-action modal-close waves-effect btn-flat">知道啦</a>' +
        '</div>' +
        '</div>';

    let postrender_func = function () {
        $('#ams-window-about').modal();
    };

    return [ret, postrender_func];
};