/**
 * Created by root on 17-1-9.
 */

var newnode_status = 0;

var nm_window = $('#ams-nodesmanage-window');
var btn_addnode = nm_window.find('#btn_add');
var btn_bulkmodify = nm_window.find('#btn_bulkmodify');

var inputline = '<tr class="nm-nn-ttb-tr"><td><input class="textbox-center" id="nm-nn-ttb-ip" type="text" ' +
    'onkeypress="Reimu_CallOnEnterKeyPress(event, function(){AMS_NodeManagment_API_AddNode()})"></td><td>' +
    '<input class="textbox-center" id="nm-nn-ttb-port" type="text" value="4028" ' +
    'onkeypress="Reimu_CallOnEnterKeyPress(event, function(){AMS_NodeManagment_API_AddNode()})"></td><td>' +
    '<input disabled class="textbox-center" id="nm-nn-ttb-mods" type="text" value="自动检测" ' +
    'onkeypress="Reimu_CallOnEnterKeyPress(event, function(){AMS_NodeManagment_API_AddNode()})"></td><td>' +
    '<a href="#" onclick="AMS_NodeManagment_API_AddNode()" class="waves-effect waves-green btn-flat btn-floating">' +
    '<i class="material-icons black-text">&#xE876;</i></a>' +
    '</td></tr>';

function AMS_NodeManagment_OpenUI(){
    if (!AMS_User_IsLoggedIn()) {
        Materialize.toast("此功能只能在登录后使用", 3000);
        $('#ams-userlogin-window').modal('open');
    } else {
        $('#ams-nodesmanage-window').modal('open');
        AMS_NodeManagment_FillCurrentNodes();
    }
}

function AMS_NodeManagment_NewNode(mode) {
    var nm_table = $('#ams-nodesmanage-nodes-table-tbody');


    if (mode === 0 || newnode_status === 0) {
        nm_table.prepend(inputline);
        if (!mode) {
            btn_addnode.text('完成添加');
            btn_bulkmodify.addClass('disabled');
        }
    } else if (mode === 1 || newnode_status === 1) {
        nm_table.find('.nm-nn-ttb-tr').remove();
        if (!mode) {
            btn_addnode.text('添加');
            btn_bulkmodify.removeClass('disabled');
        }
    }

    if (!mode)
        newnode_status ^= 1 << 0;
}

function AMS_NodeManagment_API_AddNode(){

    var ip = $('#nm-nn-ttb-ip').val();
    var port = $('#nm-nn-ttb-port').val();
    var mods = $('#nm-nn-ttb-mods').val();

    if (!ip) {
        Materialize.toast('错误：IP不能为空', 2000);
        return;
    }

    if (!port) {
        Materialize.toast('错误：端口不能为空',2000);
        return;
    }

    if (!mods) {
        Materialize.toast('错误：机器数量不能为空', 2000);
        return;
    }

    var serialized_addnode_req = '{"data": {"op": "add", "controllers": [{"ip": "'+ip+'", "port": '+port.toString()+
        '}]}, "operation": "controller"}';

    Materialize.toast('正在添加……', 2000);

    apiReq(serialized_addnode_req, function (parsed) {
        var nm_table = $('#ams-nodesmanage-nodes-table-tbody');
        nm_table.find('.nm-nn-ttb-tr').remove();
        nm_table.prepend('<tr><td>' + ip + '</td><td>' + port.toString() + '</td><td>' +
            '自动检测' + '</td><td>' +
            '<a href="#" class="waves-effect waves-orange btn-flat btn-floating">' +
            '<i class="material-icons black-text">&#xE3C9;</i></a>' +
            '<a href="#" class="waves-effect waves-red btn-flat btn-floating">' +
            '<i class="material-icons black-text">&#xE14C;</i></a>' +
            '</td></tr>');
        AMS_NodeManagment_NewNode(0);
        Materialize.toast('添加成功', 1200);
    });
}

function AMS_NodeManagment_FillCurrentNodes() {

    apiReq('{"data": {"op": "list"}, "operation": "controller"}', function (parsed) {
        var nodes_array = parsed.data.controllers;

        var nm_table = $('#ams-nodesmanage-nodes-table-tbody');

        nm_table.find('tr').remove();

        for (var pthisnode in nodes_array) {
            var thisnode = nodes_array[pthisnode];

            nm_table.append('<tr><td>' + thisnode.ip + '</td><td>' + thisnode.port.toString() + '</td><td>' +
                '自动检测' + '</td><td>' +
                '<a href="#" class="waves-effect waves-orange btn-flat btn-floating">' +
                '<i class="material-icons black-text">&#xE3C9;</i></a>' +
                '<a href="#" class="waves-effect waves-red btn-flat btn-floating">' +
                '<i class="material-icons black-text">&#xE14C;</i></a>' +
                '</td></tr>');
        }

        btn_bulkmodify.removeClass('disabled');
        btn_addnode.removeClass('disabled');
    });

}