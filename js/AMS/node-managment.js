/**
 * Created by root on 17-1-9.
 */

function AMS_NodeManagment_OpenUI(){
    if (!AMS_User_IsLoggedIn()) {
        Materialize.toast("此功能只能在登录后使用", 3000);
        $('#ams-userlogin-window').modal('open');
    } else {
        $('#ams-nodesmanage-window').modal('open');
    }
}

function AMS_NodeManagment_FillCurrentNodes() {

    $.ajax({
        async: true,
        type: "GET",
        url: __AMS_API_URL + "nodes"
    }).done(function(data, textStatus, jqXHR){
        var parsed = JSON.parse(jqXHR.responseText);
        var nodes_array = parsed.result;

        var nm_table = $('#ams-nodesmanage-nodes-table-tbody');

        nm_table.find('tr').remove();

        for (var pthisnode in nodes_array) {
            var thisnode = nodes_array[pthisnode];

            nm_table.append('<tr><td>' + thisnode.ip + '</td><td>' + thisnode.port.toString() + '</td><td>' +
                thisnode.mods.toString() + '</td><td>' +
                '<a href="#" class="waves-effect waves-orange btn-flat btn-floating">' +
                '<i class="material-icons black-text">&#xE3C9;</i></a>' +
                '<a href="#" class="waves-effect waves-red btn-flat btn-floating">' +
                '<i class="material-icons black-text">&#xE14C;</i></a>' +
                '</td></tr>');
        }

    });


}