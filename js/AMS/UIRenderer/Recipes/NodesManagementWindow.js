/**
 * Created by root on 17-7-13.
 */

AMS.UIRenderer.Recipes.NodesManagement = function () {

    let ret = '';

    ret += '<div id="ams-window-nodemanagement" class="modal modal-fixed-footer">'+
        '<div class="modal-content">'+
        '<a href="#" onclick="" class="modal-action modal-close"><i class="material-icons right black-text">&#xE14C;</i></a>'+
        '<h4>控制器管理</h4>'+
        '<table class="highlight centered responsive-table">'+
        '<thead><tr>'+
        '<th data-field="nodes-table-th-ip">IP地址</th>'+
        '<th data-field="nodes-table-th-port">端口</th>'+
        '<th data-field="nodes-table-th-mods">机器数量</th>'+
        '<th data-field="nodes-table-th-action">操作</th>'+
        '</tr></thead>'+
        '<tbody id="nodes-table-tbody">'+
        '<tr><td>正在载入，请稍候…</td><td></td><td></td><td></td></tr>'+
        '</tbody>'+
        '</table>'+
        '</div>'+
        '<div class="modal-footer">'+
        '<a href="#" id="btn_bulkmodify" onclick="" class="modal-action waves-effect waves-green btn-flat">批量修改</a>'+
        '<a href="#" id="btn_add" onclick="AMS.NodeManagement.Window.AddNode(1)" class="modal-action waves-effect waves-green btn-flat">添加</a>'+
        '</div>'+
        '</div>';

    let postrender_func = function () {
        $('#ams-window-nodemanagement').modal({
                dismissible: true, // Modal can be dismissed by clicking outside of the modal
                opacity: .5, // Opacity of modal background
                inDuration: 300, // Transition in duration
                outDuration: 200, // Transition out duration
                startingTop: '4%', // Starting top style attribute
                endingTop: '10%', // Ending top style attribute
                ready: function(modal, trigger) { // Callback for Modal open. Modal and trigger parameters available.
                    console.log(modal, trigger);
                },
                complete: function() {
                    AMS.NodeManagement.Window.AddNode(1);
                } // Callback for Modal close
            }
        );

    };

    return [ret, postrender_func];
};