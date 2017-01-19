/**
 * Created by root on 17-1-5.
 */

var ams_nodedatails_openedwindowlist = {};

function AMS_NodeDetails_ToggleLED(ip,port,devid,modid,state){

    var slrreq = '{modules: [{ip: "' + ip.toString() + '", port: "' + port.toString() + '", device_id: ' +
        devid.toString() + ', module_id: ' + modid.toString() + ', led: ' + state.toString() + '}]}';

    $.ajax({
        async: true,
        type: "POST",
        url: __AMS_API_URL + "led",
        data: slrreq,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        error : function () {
            Materialize.toast("无法开关LED：API请求失败",3000);
        }
    }).done(function(data, textStatus, jqXHR){


        slrreq = null;
    });
}

function AMS_NodeDetails_RebootMM_Req(ip,port,devid,modid){
    $.ajax({
        async: true,
        type: "GET",
        url: __AMS_API_URL + "reboot_mm/" + ip + '/' + port.toString() + '/' + devid.toString() +
        '/' + modid.toString(),
        error : function () {
            Materialize.toast("无法重启机器：API请求失败",3000);
        }
    }).done(function(data, textStatus, jqXHR){
        Materialize.toast("机器已重启")
    });
}

function AMS_NodeDetails_RebootMM(ip,port,devid,modid){
    var mydomid = 'ndrc-' + inet_pton("AF_INET", ip) + '-' + port.toString() + '-' + devid.toString() + '-' +
        modid.toString();

    AMS_Windows_Add(mydomid, {windowtype:'dialog',notdismissible:true}, "重启", '<p>您真的想要重启此设备吗？</p>',
        '<a href="#" class="modal-action modal-close waves-effect waves-green btn-flat">取消</a>' +
        '<a href="#" onclick="AMS_NodeDetails_RebootMM_Req(\'' + ip + '\',' + port.toString() + ',' + devid.toString() +
        ',' + modid.toString() +
        ')" class="modal-action modal-close waves-effect waves-orange btn-flat red-text">重启</a>');

    AMS_Windows_Open(mydomid);
}
/**
 * @return {string}
 */
function AMS_NodeDetails_GenTable(){
    var ret = '<ul class="collapsible" data-collapsible="expandable"><li>' +
        '<div class="collapsible-header active"><i class="material-icons">&#xE8D2;</i>概要</div>' +
        '<div class="collapsible-body"><table class="highlight centered responsive-table">' +
        '<thead><tr>' +
        '<th data-field="summary-table-th-elapsed">固件版本</th>' +
        '<th data-field="summary-table-th-elapsed">Elapsed</th>' +
        '<th data-field="summary-table-th-ghsav">GHSav</th>' +
        '<th data-field="summary-table-th-accepted">Accepted</th>' +
        '<th data-field="summary-table-th-rejected">Rejected</th>' +
        '<th data-field="summary-table-th-nbs">NetworkBlocks</th>' +
        '<th data-field="summary-table-th-bestshare">BestShare</th>' +
        '</tr></thead><tbody id="summary-table-tbody">' +
        '</tbody></table>' +
        '<div class="row" id="loading-placeholder-summary"><br><div class="col l8 offset-l2"><div class="progress">' +
        '<div class="indeterminate"></div></div></div></div>' +
        '</div></li><li>' +
        '<div class="collapsible-header active"><i class="material-icons">&#xE80B;</i>矿池</div>' +
        '<div class="collapsible-body"><table class="highlight centered responsive-table"><thead><tr>' +
        '<th data-field="pool-table-th-pool">Pool</th>' +
        '<th data-field="pool-table-th-url">URL</th>' +
        '<th data-field="pool-table-th-strmactive">StratumActive</th>' +
        '<th data-field="pool-table-th-user">User</th>' +
        '<th data-field="pool-table-th-status">Status</th>' +
        '<th data-field="pool-table-th-getworks">GetWorks</th>' +
        '<th data-field="pool-table-th-accepted">Accepted</th>' +
        '<th data-field="pool-table-th-rejected">Rejected</th>' +
        '<th data-field="pool-table-th-stale">Stale</th>' +
        '<th data-field="pool-table-th-lst">LST</th>' +
        '<th data-field="pool-table-th-lsd">LSD</th></tr></thead>' +
        '<tbody id="pool-table-tbody">' +
        '</tbody></table><div class="row" id="loading-placeholder-pool"><br>' +
        '<div class="col l8 offset-l2"><div class="progress">' +
        '<div class="indeterminate"></div></div></div></div>' +
        '</div></li><li><div class="collapsible-header active"><i class="material-icons">&#xE875;' +
        '</i>设备</div><div class="collapsible-body"><table class="highlight centered responsive-table"><thead><tr>' +
        '<th data-field="devices-table-th-device">设备</th>' +
        '<th data-field="devices-table-th-mmcount">MM数量</th>' +
        '<th data-field="devices-table-th-enabled">已启用</th>' +
        '<th data-field="devices-table-th-status">状态</th>' +
        '<th data-field="devices-table-th-temp">温度</th>' +
        '<th data-field="devices-table-th-ghsav">GHSav</th>' +
        '<th data-field="devices-table-th-ghs5s">GHS5s</th>' +
        '<th data-field="devices-table-th-ghs1m">GHS1m</th>' +
        '<th data-field="devices-table-th-ghs5m">GHS5m</th>' +
        '<th data-field="devices-table-th-ghs15m">GHS15m</th>' +
        '<th data-field="devices-table-th-lvw">LastValidWork</th>' +
        '</tr></thead><tbody id="devices-table-tbody">' +
        '</tbody></table><div class="row" id="loading-placeholder-devices"><br>' +
        '<div class="col l8 offset-l2"><div class="progress">' +
        '<div class="indeterminate"></div></div></div></div>' +
        '</div></li><li><div class="collapsible-header active"><i class="material-icons">&#xE85C;</i>状态</div>' +
        '<div class="collapsible-body"><table class="highlight centered responsive-table"><thead><tr>' +
        '<th data-field="stats-table-th-led">指示灯</th>' +
        '<th data-field="stats-table-th-reboot">重启</th>' +
        '<th data-field="stats-table-th-uptime">运行时间</th>' +
        '<th data-field="stats-table-th-device">设备</th>' +
        '<th data-field="stats-table-th-mm">MM</th>' +
        '<th data-field="stats-table-th-dna">DNA</th>' +
        '<th data-field="stats-table-th-lws">LocalWorks</th>' +
        '<th data-field="stats-table-th-dh">DH</th>' +
        '<th data-field="stats-table-th-ghs">GHS</th>' +
        '<th data-field="stats-table-th-wu">WU</th>' +
        '<th data-field="stats-table-th-temp">温度</th>' +
        '<th data-field="stats-table-th-fanspd">风扇转速</th>' +
        '<th data-field="stats-table-th-pg">PG</th>' +
        '<th data-field="stats-table-th-echu">ECHU</th>' +
        '<th data-field="stats-table-th-ecmm">ECMM</th>' +
        '</tr></thead><tbody id="stats-table-tbody">' +
        '</tbody></table><div class="row" id="loading-placeholder-stats"><br>' +
        '<div class="col l8 offset-l2"><div class="progress">' +
        '<div class="indeterminate"></div></div></div></div>' +
        '</div></li></ul>';

    return ret;
}

function AMS_NodeDetails_GenTableData(ip,port,fulldomid){
    var pwindow = $('#'+fulldomid);
    var table_summary = pwindow.find("#summary-table-tbody");
    var table_pool = pwindow.find("#pool-table-tbody");
    var table_devices = pwindow.find("#devices-table-tbody");
    var table_stats = pwindow.find("#stats-table-tbody");


    // /api/status/summary
    $.ajax({
        async: true,
        type: "GET",
        url: __AMS_API_URL + "status/summary/latest/" + ip + '/' + port.toString(),
        error : function () {
            Materialize.toast("无法载入控制器详情：API请求失败",3000);
        }
    }).done(function(data, textStatus, jqXHR){

        Log.d("API request " + "/status/summary/latest/" + ip + '/' + port.toString() + ' success');
        var parsed = JSON.parse(jqXHR.responseText);
        var r = parsed.result[0];

        table_summary.append(
            '<tr><td class="ndt-s-td-fwver">正在载入…</td><td>'+
            // Elapsed
            Reimu_Time_Sec2HMS(r.elapsed)+'</td><td>'+
            // GHSav
            (r.mhs_av/1000).toFixed(2).toString()+'</td><td>'+
            // Accepted
            r.accepted.toString()+'</td><td>'+
            // Rejected
            r.rejected.toString()+'</td><td>'+
            // NetworkBlocks
            r.network_blocks.toString()+'</td><td>'+
            // BestShare
            r.best_share.toString()+'</td></tr>'
        );

        pwindow.find('#loading-placeholder-summary').remove();

        parsed = null;


        $.ajax({
            async: true,
            type: "GET",
            url: __AMS_API_URL + "fwver/" + ip,
            error : function () {
                Materialize.toast("无法载入固件版本：API请求失败",3000);
                $('#'+fulldomid).find('.ndt-s-td-fwver').text('请求失败');
            }
        }).done(function(data, textStatus, jqXHR){
            $('#'+fulldomid).find('.ndt-s-td-fwver').text(jqXHR.responseText);
        });

    });

    $.ajax({
        async: true,
        type: "GET",
        url: __AMS_API_URL + "status/pool/latest/" + ip + '/' + port.toString(),
        error : function () {
            Materialize.toast("无法载入矿池详情：API请求失败",3000);
            pwindow.find('#loading-placeholder-pool').remove();
        }
    }).done(function(data, textStatus, jqXHR){
        var parsed = JSON.parse(jqXHR.responseText);


        for (var tr in parsed.result) {
            table_pool.append(
                '<tr><td>' +
                // Pool
                tr.toString() + '</td><td>' +
                // URL
                parsed.result[tr].url + '</td><td>' +
                // StratumActive
                parsed.result[tr].stratum_active.toString() + '</td><td>' +
                // User
                parsed.result[tr].user + '</td><td>' +
                // Status
                parsed.result[tr].status.toString() + '</td><td>' +
                // GetWorks
                parsed.result[tr].getworks.toString() + '</td><td>' +
                // Accepted
                parsed.result[tr].accepted.toString() + '</td><td>' +
                // Rejected
                parsed.result[tr].rejected.toString() + '</td><td>' +
                // Stale
                parsed.result[tr].stale.toString() + '</td><td>' +
                // LST
                Reimu_Time_unix2rfc3339(parsed.result[tr].last_share_time) + '</td><td>' +
                // LSD
                parsed.result[tr].last_share_difficulty.toString() + '</td></tr>'
            );
        }

        pwindow.find('#loading-placeholder-pool').remove();

        parsed = null;

    });

    $.ajax({
        async: true,
        type: "GET",
        url: __AMS_API_URL + "status/device/latest/" + ip + '/' + port.toString(),
        error : function () {
            Materialize.toast("无法载入设备详情：API请求失败",3000);
            pwindow.find('#loading-placeholder-devices').remove();
        }
    }).done(function(data, textStatus, jqXHR){
        var parsed = JSON.parse(jqXHR.responseText);

        for (var tr in parsed.result) {
            table_devices.append(
                '<tr><td>' +
                // Device
                'ASC' + parsed.result[tr].asc.toString() + '-' + parsed.result[tr].name + '-' +
                parsed.result[tr].id.toString() + '</td><td>' +
                // MM Count
                parsed.result[tr].mm_count.toString() + '</td><td>' +
                // Enabled
                parsed.result[tr].enabled + '</td><td>' +
                // Status
                parsed.result[tr].status + '</td><td>' +
                // T(C)
                parsed.result[tr].temperature.toString() + '</td><td>' +
                // GHSav
                (parsed.result[tr].mhs_av/1000).toFixed(2).toString() + '</td><td>' +
                // GHSav
                (parsed.result[tr].mhs_5s/1000).toFixed(2).toString() + '</td><td>' +
                // GHS1m
                (parsed.result[tr].mhs_1m/1000).toFixed(2).toString() + '</td><td>' +
                // GHS5m
                (parsed.result[tr].mhs_5m/1000).toFixed(2).toString() + '</td><td>' +
                // GHS15m
                (parsed.result[tr].mhs_15m/1000).toFixed(2).toString() + '</td><td>' +
                // last_valid_work
                Reimu_Time_unix2rfc3339(parsed.result[tr].last_valid_work) + '</td></tr>'
            );
        }

        pwindow.find('#loading-placeholder-devices').remove();

        parsed = null;

    });

    $.ajax({
        async: true,
        type: "GET",
        url: __AMS_API_URL + "status/module/latest/" + ip + '/' + port.toString(),
        error : function () {
            Materialize.toast("无法载入状态详情：API请求失败",3000);
        }
    }).done(function(data, textStatus, jqXHR){
        var parsed = JSON.parse(jqXHR.responseText);

        var ids = [];

        for (var tr in parsed.result) {
            var adcol = "";

            var idind = ids.indexOf(parsed.result[tr].device_id);

            if (idind === -1) {
                ids.push(parsed.result[tr].device_id);
                idind = ids.indexOf(parsed.result[tr].device_id);
            }

            if ((idind+2)%2 === 1)
                adcol = ' class="grey lighten-2"';

            var echu_combined  = parsed.result[tr].echu_0 | parsed.result[tr].echu_1 | parsed.result[tr].echu_2 |
                parsed.result[tr].echu_3;

            if (echu_combined !== 0)
                adcol = ' class="yellow"';

            var ledcol = 'waves-green';

            if (parsed.result[tr].led === '1') {
                ledcol = 'waves-light light-green accent-3';
            }

            table_stats.append(
                '<tr' + adcol + ' id="' + parsed.result[tr].dna + '"><td>' +
                // LED
                '<a href="#" class="waves-effect ' + ledcol + ' btn-flat" onclick="AMS_ToggleLED(\''+
                parsed.result[tr].ip+'\','+parsed.result[tr].port.toString()+','+parsed.result[tr].device_id.toString()+
                ','+ parsed.result[tr].module_id.toString()+',$(this))"><i class="material-icons">&#xE42E;</i></a>' +
                '</td><td>' +
                // Reboot
                '<a href="#" onclick="AMS_NodeDetails_RebootMM(\'' + ip + '\',' + port.toString() + ',' +
                parsed.result[tr].device_id.toString() + ',' + parsed.result[tr].module_id.toString() +
                ')" class="waves-effect waves-red btn-flat"><i class="material-icons">&#xE042;</i></a>' +
                '</td><td>' +
                // Elapsed
                Reimu_Time_Sec2HMS(parsed.result[tr].elapsed) + '</td><td>' +
                // Device
                parsed.result[tr].device_id.toString() + '-' + parsed.result[tr].module_id.toString() + '</td><td>' +
                // MM
                parsed.result[tr].ver + '</td><td>' +
                // DNA
                parsed.result[tr].dna + '</td><td>' +
                // LocalWorks
                parsed.result[tr].lw.toString() + '</td><td>' +
                // DH
                parsed.result[tr].dh.toFixed(3).toString() + '%</td><td>' +
                // GHS
                parsed.result[tr].ghsmm.toString() + '</td><td>' +
                // WU
                parsed.result[tr].wu.toString() + '</td><td>' +
                // Temp
                parsed.result[tr].temp.toString() + ' / ' + parsed.result[tr].tmax.toString() + '</td><td>' +
                // Fan
                parsed.result[tr].fan.toString() + ' (' + parsed.result[tr].fanr.toString() + '%)' + '</td><td>' +
                // PG
                parsed.result[tr].pg.toString() + '</td><td>' +
                // ECHU
                parsed.result[tr].echu_0.toString() + ' ' + parsed.result[tr].echu_1.toString() + ' ' +
                parsed.result[tr].echu_2.toString() + ' ' + parsed.result[tr].echu_3.toString() + '</td><td>' +
                // ECMM
                parsed.result[tr].ecmm.toString() + '</td></tr>'
            );
        }

        ids = null;

        pwindow.find('#loading-placeholder-stats').remove();

        parsed = null;

    });


}

function AMS_NodeDetails_ShowDebug(ip,port){

    var mydomid = 'nd-' + inet_pton("AF_INET", ip) + '-' + port.toString();
    var fulldomid = AMS_Windows_FullDomId(mydomid);

    Materialize.toast("正在载入调试信息，请稍候……",2000);

    $.ajax({
        async: true,
        type: "GET",
        url: __AMS_API_URL + "debug/" + ip + '/' + port.toString() + '/html',
        error : function () {
            Materialize.toast("无法载入调试信息：API请求失败",3000);
        }
    }).done(function(data, textStatus, jqXHR) {
        console.log(jqXHR);
        $('#' + fulldomid).find('.collapsible').prepend('<li class="active"><div class="collapsible-header active">' +
            '<i class="material-icons">&#xE86F;</i>调试信息 - ' + Reimu_Time_unix2rfc3339() +
            '</div><div class="collapsible-body"><div class="row"><div class="col l11">' + jqXHR.responseText +
            '</div></div></div></li>');
        $('#' + fulldomid).find('.collapsible').collapsible();
    });

}

function AMS_NodeDetails_Inline(ip,port,focus) {

    var portstr = port.toString();
    var mydomid = 'nd-' + inet_pton("AF_INET", ip) + '-' + portstr;
    var fulldomid = AMS_Windows_FullDomId(mydomid);

    var buttons = '<a href="#" class="modal-action waves-effect waves-orange btn-flat">重启CGMiner</a>' +
        // '<a href="#" class="modal-action waves-effect waves-red btn-flat">关闭CGMiner</a>' +
        '<a href="#" onclick="AMS_NodeDetails_ShowDebug(\'' + ip + '\',' + portstr + ')"' +
        ' class="modal-action waves-effect waves-light btn-flat">调试信息</a>' +
        '<a href="#" onclick="AMS_NodeDetails_Export2CSV(\'' + ip + '\',' + portstr + ')"' +
        ' class="modal-action waves-effect waves-light btn-flat tooltipped" data-position="bottom" data-delay="50"' +
        ' data-tooltip="此功能暂时只支持Google Chrome浏览器">另存为表格</a>';



    if ($('#'+fulldomid).length === 0) {
        AMS_Windows_Add(mydomid, {windowsize:'big',windowtype:'window'}, ip + ':' + port.toString(), buttons + AMS_NodeDetails_GenTable());
        var ddd = $('#'+fulldomid);
        ddd.find('.collapsible').collapsible();
        ddd.find('.tooltipped').tooltip();
        AMS_NodeDetails_GenTableData(ip,port,fulldomid);
    }

    if (focus === 3) {

    }

    AMS_Windows_Open(mydomid);

    mydomid = null;
    fulldomid = null;
    buttons = null;


}