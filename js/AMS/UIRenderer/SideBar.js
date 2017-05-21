/**
 * Created by root on 17-5-21.
 */
import {sprintf} from "../../sprintf";

AMS.UIRenderer.SideBar = function () {

    let theme = AMS.Themes.CurrentTheme();
    let ret = sprintf('<ul id="slide-out" class="side-nav %s">', theme.NavBar);
    let AddSubHeader = function (name) {
        ret += '<li><div class="divider ' + theme.NavBar.Divider.Line + '"></div></li>' +
            '<li><a class="subheader ' + theme.NavBar.Divider.Text + '">' + name + '</a></li>';
    };
    let AddEntry = function (name, icon, href, onclick, tooltip) {
        ret += '<li><a ';
        if (onclick)
            ret += 'onclick="' + onclick + '" ';
        ret += 'href="';
        ret += href ? href : "#";
        ret += '" class="waves-effect waves-light ';
        if (tooltip)
            ret += 'tooltipped ';
        ret += theme.NavBar.Entry.Text + '"';
        if (tooltip)
            ret += ' data-position="' + tooltip.position + '" data-delay="' + tooltip.delay + '" data-tooltip="' +
                tooltip.tooltip + '"';
        ret += '><i class="material-icons ' + theme.NavBar.Entry.Icon + '">' + icon + '</i>' +
            name + '</a></li>';
    };


    ret += '<li><div class="userView logo-bg">' +
        '<div class="background center blue darken-2"><img src="assets/ams-logo.svg" align="middle">' +
        '<br></div><br><span class="ams mainmenu-header-first codename">AMS</span>' +
        '<span class="ams mainmenu-header version">v3.0.2-dev</span>' +
        '</div></li>' +

        '<li><a href="#" class="white-text msyh waves-effect waves-light tooltipped" data-position="right" data-delay="50" data-tooltip="喵喵喵">' +
        '<i class="material-icons white-text">&#xE853;</i><span id="ams-sidebar-userinfo-text">未登录</span>' +
        '</a></li>';

    AddSubHeader("信息");
    AddEntry("概览", '&#xE88A;', '?');
    AddSubHeader("管理");
    AddEntry("控制器管理", '&#xE875;', '?');
    AddEntry("矿池管理", '&#xE80B;', '#');
    AddEntry("Super RTAC", '&#xE869;', '#', 'TODOOOOOOOOOO',
        {position:"right",delay:"50",tooltip:"我可以做很多事情哦 (´・ω・`) 比如说用来给机器批量升级"});
    AddSubHeader("系统");
    AddEntry("主题", '&#xE3B7;', '#');
    AddEntry("API设置", '&#xE86F;', '#ams-window-apisettings');
    AddEntry("关于", '&#xE88E;', '#');


    ret += '</ul>';

    return ret;
};