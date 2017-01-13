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
    var apitime = $.jStorage.get("AMS_3_1_Runtime_API_Time", 0).toString();


    $.ajax({
        async: true,
        type: "GET",
        url: __AMS_API_URL + "issue/" + 'latest'
    }).done(function(data, textStatus, jqXHR){
        Log.d("API request /issues/" + apitime + " success");
        var parsed = JSON.parse(jqXHR.responseText);
        var array_node = parsed.result.node;
        var array_ec = parsed.result.ec;

        AMS_Issues_Table_Flush();

        // Connection failed nodes

        for (var thisnode in array_node) {
            AMS_Issues_Table_Append_Node(array_node[thisnode].ip,array_node[thisnode].port,"连接失败");
        }

        $.ajax({
            async: true,
            type: "GET",
            url: __AMS_API_URL + "nodes"
        }).done(function(data, textStatus, jqXHR){

            var parsed = JSON.parse(jqXHR.responseText);
            var nodes = parsed.result;

            var nr_nodes = nodes.length;
            var processed_nodes = 0;

            for (var thisnode in nodes) {
                var tn_ip = nodes[thisnode].ip;
                var tn_port = nodes[thisnode].port;
                var tn_mods = nodes[thisnode].mods;

                $.ajax({
                    async: true,
                    type: "GET",
                    url: __AMS_API_URL + "status/module/latest/" + tn_ip + '/' + tn_port.toString(),
                    complete: function () {
                        processed_nodes++;

                        console.log('Issues: Processed '+processed_nodes.toString()+'/'+nr_nodes.toString());

                        if (processed_nodes === nr_nodes)
                            Reimu_ToogleCardTitleLoadingIcon('ams-mainpage-issues-title-loading',false);
                    }
                }).done(function(data, textStatus, jqXHR){

                    // console.log('Done loading mod info for '+tn_ip);
                    var parsed = JSON.parse(jqXHR.responseText);

                    var mods = parsed.result;

                    for (var thismod in mods) {
                        mods[thismod].echu_combined = mods[thismod].echu_0 | mods[thismod].echu_1 | mods[thismod].echu_2 |
                            mods[thismod].echu_3;

                        var errstr = avalon_ec_strerror(__AMS_Issues_Table_FilterMode,mods[thismod]);

                        if (errstr)
                            AMS_Issues_Table_Append(mods[thismod].ip,mods[thismod].port,mods[thismod].device_id,
                                mods[thismod].module_id,mods[thismod].dna,errstr);

                        // __AMS_ModsArray.push(mods[thismod]);


                    }


                });

            }

            // __AMS_ModsDB = TAFFY(__AMS_ModsArray);
            //
            // __AMS_ModsDB({echu_combined:{"!is":0}}).each(function (record,recordnumber) {
            //     AMS_Issues_Table_Append(record['ip'],record['port'],record['device_id'],
            //         record['module_id'],record['dna'],
            //         record['echu_combined'].toString());
            // });




        });

    });

    __AMS_Issues_RefreshTimer = setTimeout(AMS_Issues_Update, 60000);
}