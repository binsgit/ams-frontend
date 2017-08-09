/**
 * Created by root on 17-8-3.
 */

AMS.UIRenderer.Recipes.NodeScannerWindow = function () {
    let ret = '';

    ret += '<div id="ams-window-nodescanner" class="modal">'+
        '<div class="modal-content">'+
        '<a href="#" onclick="" class="modal-action modal-close"><i class="material-icons right black-text">&#xE14C;</i></a>'+
        '<h4>自动搜索</h4>' +
        '<div class="row">' +
        '<div class="input-field col s4">' +
        '<input id="ip_st" type="text">' +
        '<label for="ip_st">起始地址</label>' +
        '</div>' +
        '<div class="input-field col s4">' +
        '<input id="ip_ed" type="text">' +
        '<label for="ip_ed">结束地址</label>' +
        '</div>' +
        '<div class="input-field col s4">' +

        '<select id="sel_awn_bywhat">' +
        '<option value="1">Port 4028</option>' +
        '<option value="2">Port 22</option>' +
        '</select>' +
        '<label>判断依据</label>' +

        '</div>' +
        '</div>'+
        '</div>'+
        '<div class="modal-footer">'+
        '<a href="#" id="btn_startscan" onclick="" class="modal-action waves-effect waves-green btn-flat">开始</a>' +
        '</div>'+
        '</div>';

    ret += '<div id="ams-window-nodescanstatus" class="modal">'+
        '<div class="modal-content">'+
        '<h4>搜索状态</h4>' +



        '<div class="row">' +
        '<div class="input-field col s2">' +
        '当前IP：' +
        '</div>' +
        '<div class="input-field col s4">' +
        '<span id="ip_cur">0.0.0.0</span>' +
        '</div>' +
        '</div>' +


        '<div class="row">' +
        '<div class="input-field col s2">' +
        '<span id="progress-text">当前进度：</span>' +
        '</div>' +
        '<div class="input-field col s4">' +
        '<div class="progress">' +
        '<div class="determinate" style="width: 70%"></div>' +
        '</div>' +
        '</div>' +
        '<div class="input-field col s4">' +
        '<span id="progress-percent">70% (2333/6666)</span>' +
        '</div>' +
        '</div>' +


        '<div class="row">' +
        '<div class="input-field col s2">' +
        '有效的控制器数量：' +
        '</div>' +
        '<div class="input-field col s4">' +
        '<span id="found-ctls-cnt">450</span>' +
        '</div>' +
        '</div>' +

        '</div>' +

        '<div class="modal-footer">'+
        '<a href="#" id="btn_startscan" onclick="" class="modal-action waves-effect waves-green btn-flat">停止</a>' +
        '</div>' +
        '</div>';

    let postrender_func = function () {
        let attr = AMS.UIRenderer.Templates.ModalAttributes.Dialog.Small;
        // attr.dismissible = false;
        $('#ams-window-nodescanner').modal(attr);

        attr.dismissible = false;
        $('#ams-window-nodescanstatus').modal(attr);

    };

    return [ret, postrender_func];
};

