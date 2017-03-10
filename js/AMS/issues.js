/**
 * Created by root on 17-1-3.
 */


var __AMS_Issues_Table_FilterMode = -1;
var __AMS_Issues_RefreshTimer = null;

function AMS_Issues_ApplyFilterMode(m) {
    __AMS_Issues_Table_FilterMode=m;
    AMS_Issues_Update();
}
function AMS_Issues_Table_Append(ip,port,auc,module,dna,err) {
    $("#ams-mainpage-badmachines-table-tbody").append('<tr onclick="AMS_NodeDetails_Inline(\''+ip+'\','+port+');">'+
        '<td>'+ip+':'+port+'</td><td>'+auc+'</td><td>'+module+'</td>'+'<td>'+dna+'</td>'+'<td>'+err+'</td></tr>');
}

function AMS_Issues_Table_Append_Node(ip,port,err){
    AMS_Issues_Table_Append(ip,port,"-","-","-",err);
}

function AMS_Issues_Table_Flush(){
    $("#ams-mainpage-badmachines-table-tbody > tr").remove();
}


function AMS_Issues_Update(){

    if (__AMS_Issues_RefreshTimer) {
        clearTimeout(__AMS_Issues_RefreshTimer);
        __AMS_Issues_RefreshTimer = null;
    }

    Reimu_ToogleCardTitleLoadingIcon('ams-mainpage-issues-title-loading',true);

    $.ajax({
        async: true,
        type: "POST",
        url: __AMS_API_URL,
        data: '{"operation": "issues", "data": {}}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        error : function (data, textStatus, jqXHR) {
            Reimu_ToogleCardTitleLoadingIcon('ams-mainpage-issues-title-loading',false);
        }
    }).done(function(data, textStatus, jqXHR){
        var ret = JSON.parse(jqXHR.responseText);
        var retdata = ret.data;
        var issues = retdata.issues;

        AMS_Issues_Table_Flush();

        // Connection failed nodes

        for (var pissue in issues) {
            if (issues[pissue].type === 0x20)
                AMS_Issues_Table_Append(issues[pissue].ip,issues[pissue].port, issues[pissue].auc_id, issues[pissue].mod_id, issues[pissue].dna, issues[pissue].msg);
            else
                AMS_Issues_Table_Append_Node(issues[pissue].ip,issues[pissue].port, issues[pissue].msg);
        }

        Reimu_ToogleCardTitleLoadingIcon('ams-mainpage-issues-title-loading',false);


    });

    __AMS_Issues_RefreshTimer = setTimeout(AMS_Issues_Update, 60000);
}