/**
 * Created by root on 17-1-11.
 */

function AMS_NodeDetails_Export2CSV(ip,port) {

    var portstr = port.toString();
    var csv = '"' + ip + ':' + portstr + '","' + Reimu_Time_unix2rfc3339() + '"\n,,\n';


    csv += '"Elapsed","GHSav","Accepted","Rejected","NetworkBlocks","BestShare"\n';

    Materialize.toast("正在生成表格，请稍候",3000);

    $.ajax({
        async: false,
        type: "GET",
        url: __AMS_API_URL + "status/summary/latest/" + ip + '/' + portstr,
        error : function () {
            Materialize.toast("无法载入控制器详情：API请求失败",3000);
        }
    }).done(function(data, textStatus, jqXHR){

        Log.d("API request " + "/status/summary/latest/" + ip + '/' + portstr + ' success');
        var parsed = JSON.parse(jqXHR.responseText);
        var r = parsed.result[0];

        csv += '"' +
            // Elapsed
            Reimu_Time_Sec2HMS(r.elapsed)+'","'+
            // GHSav
            (r.mhs_av/1000).toFixed(2).toString()+'","'+
            // Accepted
            r.accepted.toString()+'","'+
            // Rejected
            r.rejected.toString()+'","'+
            // NetworkBlocks
            r.network_blocks.toString()+'","'+
            // BestShare
            r.best_share.toString()+'"\n';

    });


    csv += ',,\n,,\n"Pool","URL","StratumActive","User","Status","GetWorks","Accepted","Rejected","Stale","LST","LSD"\n';

    $.ajax({
        async: false,
        type: "GET",
        url: __AMS_API_URL + "status/pool/latest/" + ip + '/' + portstr,
        error : function () {
            Materialize.toast("无法载入矿池详情：API请求失败",3000);
        }
    }).done(function(data, textStatus, jqXHR){
        var parsed = JSON.parse(jqXHR.responseText);

        for (var tr in parsed.result) {
            csv += '"' +
                // Pool
                tr.toString()+'","'+
                // URL
                parsed.result[tr].url+'","'+
                // StratumActive
                parsed.result[tr].stratum_active.toString()+'","'+
                // User
                parsed.result[tr].user+'","'+
                // Status
                parsed.result[tr].status.toString()+'","'+
                // GetWorks
                parsed.result[tr].getworks.toString()+'","'+
                // Accepted
                parsed.result[tr].accepted.toString()+'","'+
                // Rejected
                parsed.result[tr].rejected.toString()+'","'+
                // Stale
                parsed.result[tr].stale.toString()+'","'+
                // LST
                parsed.result[tr].last_share_time.toString()+'","'+
                // LSD
                parsed.result[tr].last_share_difficulty.toString()+'"\n';
        }


    });

    csv += ',,\n,,\n"设备","MM数量","已启用","状态","温度","GHSav","GHS5s","GHS1m","GHS5m","GHS15m","LastValidWork"\n';

    $.ajax({
        async: false,
        type: "GET",
        url: __AMS_API_URL + "status/device/latest/" + ip + '/' + portstr,
        error : function () {
            Materialize.toast("无法载入设备详情：API请求失败",3000);
            pwindow.find('#loading-placeholder-devices').remove();
        }
    }).done(function(data, textStatus, jqXHR){
        var parsed = JSON.parse(jqXHR.responseText);

        for (var tr in parsed.result) {
            csv += '"' +
                // Device
                tr.toString()+'","'+
                // MM Count
                parsed.result[tr].mm_count.toString()+'","'+
                // Enabled
                parsed.result[tr].enabled+'","'+
                // Status
                parsed.result[tr].status+'","'+
                // T(C)
                parsed.result[tr].temperature.toString()+'","'+
                // GHSav
                (parsed.result[tr].mhs_av/1000).toFixed(2).toString()+'","'+
                // GHSav
                (parsed.result[tr].mhs_5s/1000).toFixed(2).toString()+'","'+
                // GHS1m
                (parsed.result[tr].mhs_1m/1000).toFixed(2).toString()+'","'+
                // GHS5m
                (parsed.result[tr].mhs_5m/1000).toFixed(2).toString()+'","'+
                // GHS15m
                (parsed.result[tr].mhs_15m/1000).toFixed(2).toString()+'","'+
                // last_valid_work
                parsed.result[tr].last_valid_work.toString()+'"\n';
        }


    });

    csv += ',,\n,,\n"指示灯","运行时间","设备","MM","DNA","LocalWorks","DH","GHS","WU","温度","风扇转速","PG","ECHU","ECMM"\n';

    $.ajax({
        async: false,
        type: "GET",
        url: __AMS_API_URL + "status/module/latest/" + ip + '/' + portstr,
        error : function () {
            Materialize.toast("无法载入状态详情：API请求失败",3000);
        }
    }).done(function(data, textStatus, jqXHR){
        var parsed = JSON.parse(jqXHR.responseText);

        for (var tr in parsed.result) {
            csv += '"';
            // LED
            if (parsed.result[tr].led)
                csv += "开启";
            else
                csv += "关闭";
            csv += '","' +
                // Elapsed
                Reimu_Time_Sec2HMS(parsed.result[tr].elapsed)+'","'+
                // Device
                parsed.result[tr].device_id.toString() + '-' + parsed.result[tr].module_id.toString()+'","'+
                // MM
                parsed.result[tr].ver+'","'+
                // DNA
                parsed.result[tr].dna+'","'+
                // LocalWorks
                parsed.result[tr].lw.toString()+'","'+
                // DH
                parsed.result[tr].dh.toString()+'","'+
                // GHS
                parsed.result[tr].ghsmm.toString()+'","'+
                // WU
                parsed.result[tr].wu.toString()+'","'+
                // Temp
                parsed.result[tr].temp.toString() + ' / ' + parsed.result[tr].tmax.toString()+'","'+
                // Fan
                parsed.result[tr].fan.toString() + ' (' + parsed.result[tr].fanr.toString() + '%)'+'","'+
                // PG
                parsed.result[tr].pg.toString()+'","'+
                // ECHU
                parsed.result[tr].echu_0.toString() + ' ' + parsed.result[tr].echu_1.toString() + ' ' +
                parsed.result[tr].echu_2.toString() + ' ' + parsed.result[tr].echu_3.toString()+'","'+
                // ECMM
                parsed.result[tr].ecmm.toString()+'"\n';
        }

    });

    Reimu_String2File(csv,"控制器详情_"+ip+"_"+portstr+".csv","text/csv");
}