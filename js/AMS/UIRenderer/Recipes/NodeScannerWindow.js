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

        '<select id="sel_awn_bywhat" disabled>' +
        '<option value="1">Port 4028</option>' +
        '<option value="2">Port 22</option>' +
        '</select>' +
        '<label>判断依据</label>' +

        '</div>' +
        '</div>'+
        '</div>'+
        '<div class="modal-footer">'+
        '<a href="#" id="btn_startscan" onclick="AMS.NodeScanner.Window.StartScan()" class="modal-action waves-effect waves-green btn-flat">开始</a>' +
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
        '<div class="determinate" style="width: 0%"></div>' +
        '</div>' +
        '</div>' +
        '<div class="input-field col s4">' +
        '<span id="progress-percent">0% (0/0)</span>' +
        '</div>' +
        '</div>' +


        '<div class="row">' +
        '<div class="input-field col s2">' +
        '有效的控制器数量：' +
        '</div>' +
        '<div class="input-field col s4">' +
        '<span id="found-ctls-cnt">0</span>' +
        '</div>' +
        '</div>' +

        '</div>' +

        '<div class="modal-footer">'+
        '<a href="#" id="btn_startscan" onclick="" class="modal-action waves-effect waves-green btn-flat">停止</a>' +
        '</div>' +
        '</div>';


    ret += '<div id="ams-window-nodescanresult" class="modal">' +
        '<div class="modal-content">' +
        '<h4>扫描结果</h4>' +

        '<table class="highlight responsive-table">' +
        '<thead>' +
        '<tr>' +
        '<th data-field="nsr-sel" class="Tbl4Cb" width="6%">' +
        '<input type="checkbox" class="filled-in CbInTbl" id="nsr-selall-cb"' +
        ' onclick="AMS.NodeScanner.Queue.ToggleAll(this.checked)" checked/>' +
        '<label for="nsr-selall-cb" class="CbLblInTbl"></label>' +
        '</th>' +
        '<th data-field="nsr-type" width="20%">类型</th>' +
        '<th data-field="nsr-ip">IP</th>' +

        '</tr>' +
        '</thead>' +
        '<tbody id="nsr-table-tbody">' +


        '</tbody>' +
        '</table>' +

        '</div>' +

        '<div class="modal-footer">' +
        // '<div class="row">' +
        // '<div class="input-field col s2">' +
        // '<select multiple id="typesel">' +
        // '<option value="1">新增</option>' +
        // '<option value="2">缺失</option>' +
        // '</select>' +
        // '</div>' +
        // '</div>' +
        // '<label>判断依据</label>' +
        '&nbsp;&nbsp;&nbsp;&nbsp;<input type="checkbox" id="sel-sanae" class="left filled-in" checked ' +
        'onclick="AMS.NodeScanner.Queue.ToggleSanae(this.checked)"/>' +
        '<label for="sel-sanae" class="tooltipped" data-position="top" data-delay="50" data-tooltip="点击确定后，选中的新增控制器会被添加进控制器列表">所有新增的控制器</label>' +
        '&nbsp;&nbsp;&nbsp;&nbsp;<input type="checkbox" id="sel-reimu" class="left filled-in" checked ' +
        'onclick="AMS.NodeScanner.Queue.ToggleReimu(this.checked)"/>' +
        '<label for="sel-reimu" class="tooltipped" data-position="top" data-delay="50" data-tooltip="点击确定后，选中的缺失控制器会被从控制器列表中移除">所有缺失的控制器</label>' +
        '<a href="#" class="modal-close waves-effect waves-red btn-flat">取消</a>' +
        '<a href="#" onclick="AMS.NodeScanner.Queue.ApplyChanges()" class="waves-effect waves-green btn-flat">确定</a>' +
        '</div>' +
        '</div>';

    let postrender_func = function () {
        let attr = AMS.UIRenderer.Templates.ModalAttributes.Dialog.Small;
        // attr.dismissible = false;
        $('#ams-window-nodescanner').modal(attr);

        attr.dismissible = false;
        $('#ams-window-nodescanstatus').modal(attr);

        $('#ams-window-nodescanresult').modal({
            dismissible: false
        });

    };

    return [ret, postrender_func];
};

