/**
 * Created by root on 17-5-21.
 */

AMS.UIRenderer.Recipes.NavBar = function () {
    let theme = AMS.Themes.CurrentTheme();
    let ret = '<div class="navbar-fixed">' +
        '<nav class="' + theme.NavBar.Background + '" role="navigation">' +
        '<div class="nav-wrapper container">'+

        '<a href="#" data-activates="slide-out" class="button-collapse show-on-large tooltipped" data-position="bottom"' +
        ' data-delay="50" data-tooltip="主菜单"><i class="material-icons">menu</i></a>' +



        '<ul class="left msyh" style="font-size: 1.1rem">' +

        '<li class="hide-on-med-and-down"><a href="#" class="tooltipped" data-position="bottom" data-delay="50" data-tooltip="当前时间">' +
        '<i class="material-icons left">&#xE192;</i><span id="ams-navbar-clock">2000-04-17 00:00:00</span></a>' +
        '</li>' +

        '</ul>' +




        '<ul class="left msyh" style="font-size: 1.1rem">' +

        '<li><a class="dropdown-button tooltipped" href="#" data-activates="ams-navbar-ip-selector" ' +
        'data-position="bottom" data-delay="50" data-tooltip="当前网段">' +
        '<i class="material-icons right">arrow_drop_down</i>' +
        '<i class="material-icons left">&#xE335;</i>' +
        '<span id="ams-navbar-ip">192.168.1.0/24</span></a></li>' +

        '<li><a href="#" class="tooltipped" data-position="bottom" data-delay="50" data-tooltip="实际算力/理论算力；单位为PH/s">' +
        '<i class="material-icons left">&#xE85C;</i><span id="ams-navbar-hashrate">0 TH/s</span>' +
        '</a></li>' +

        '</ul>' +




        '<ul class="left msyh" style="font-size: 1.1rem">' +

        '<li><a href="#" class="tooltipped" data-position="bottom" data-delay="50" data-tooltip="控制器数量">' +
        '<i class="material-icons left">&#xE875;</i>' +
        '<span id="ams-navbar-nodescount">0</span>' +
        '</a></li>' +




        '<li><a href="#" class="tooltipped" data-position="bottom" data-delay="50" data-tooltip="机器数量">' +
        '<i class="material-icons left">&#xE30D;</i>' +
        '<span id="ams-navbar-machinescount">0</span>' +
        '</a></li>' +

        '</ul>' +

        '</div></nav></div>';



    let postrender_func = function () {

    };

    return [ret, postrender_func];
};