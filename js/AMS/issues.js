/**
 * Created by root on 17-1-3.
 */

var ams_api_url = $.jStorage.get("__AMS_API_URL", "/api/");

function AMS_Issues_Table_Append(ip,port,auc,module,dna,err) {
    $("#ams-mainpage-badmachines-table-tbody").append("<tr><td>"+ip+":"+port+"</td><td>"+auc+"</td><td>"+module+"</td>"+"<td>"+dna+"</td>"+"<td>"+err+"</td></tr>");
}

function AMS_Issues_Table_Append_Node(ip,port,err){
    AMS_Issues_Table_Append(ip,port,"-","-","-",err);
}

function AMS_Issues_Table_Flush(){
    $("#ams-mainpage-badmachines-table-tbody > tr").remove();
}

function AMS_Issues_Update(){

    var apitime = $.jStorage.get("AMS_3_1_Runtime_API_Time", 0).toString();


    $.ajax({
        async: true,
        type: "GET",
        url: ams_api_url + "issue/" + apitime
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

        // Nodes with EC

        for (var thisec in array_ec) {

            AMS_Issues_Table_Append(array_ec[thisec].ip,array_ec[thisec].port,array_ec[thisec].device_id,
                array_ec[thisec].module_id,array_ec[thisec].dna,
                avalon_ec_strerror(array_ec[thisec].echu_0|array_ec[thisec].echu_1|array_ec[thisec].echu_2|
                    array_ec[thisec].echu_3));
        }


    });

    var t = setTimeout(AMS_Issues_Update, 60000);
}