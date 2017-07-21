/**
 * Created by root on 17-1-5.
 */

AMS.NodeDetails = {

    Init: function () {
        AMS.NodeDetails.jq_Card = $('#ams-nodedetails');
        AMS.NodeDetails.jq_SummaryTable = AMS.NodeDetails.jq_Card.find("#summary-table-tbody");
        AMS.NodeDetails.jq_PoolTable = AMS.NodeDetails.jq_Card.find("#pool-table-tbody");
        AMS.NodeDetails.jq_DevicesTable = AMS.NodeDetails.jq_Card.find("#devices-table-tbody");
        AMS.NodeDetails.jq_StatsTable = AMS.NodeDetails.jq_Card.find("#stats-table-tbody");
    },

    OpenPage: function (ip,port) {
            window.open('./?mode=nodedetails&ip='+ip+'&port=' + port.toString());
    },

    Operations: {
        ToggleLed: function (ip,port,devid,modid,state) {
            let tlreq = new AMS.API.Request({
                RawData: {
                    operation: 'ascset',
                    data: {
                        ip: ip,
                        port: port,
                        op: 'led',
                        modid: modid,
                        devid: devid,
                        state: state
                    }
                },
                ErrorCallback: function () {
                    Materialize.toast('错误：LED状态变更失败');
                }
            });

            tlreq.Dispatch();
        },

        RebootMM: function (ip,port,devid,modid) {
            let rbreq = new AMS.API.Request({
                RawData: {
                    operation: 'ascset',
                    data: {
                        ip: ip,
                        port: port,
                        op: 'reboot',
                        modid: modid,
                        devid: devid
                    }
                },
                DoneCallback: function () {
                    Materialize.toast('机器已重启');
                },
                ErrorCallback: function () {
                    Materialize.toast('错误：重启失败');
                }
            });

            rbreq.Dispatch();
        }
    },

    UI: {
        FillInData: function (ip, port) {

            AMS.NodeDetails.jq_Card.find('.card-title').text(ip+":"+port.toString());

            let fidreq = new AMS.API.Request({
                RawData: {
                    operation: 'status',
                    data: {
                        ip: ip,
                        port: port
                    }
                },
                DoneCallback: function (parsed) {
                    let status = parsed.data.Status;
                    let summary = status.Summary;
                    let devices = status.Devices;
                    let pools = status.Pools;
                    let modules = status.Modules;

                    AMS.NodeDetails.jq_SummaryTable.append(
                        '<tr><td class="ndt-s-td-fwver">正在载入…</td><td>'+
                        // Elapsed
                        Reimu_Time_Sec2HMS(summary.Elapsed)+'</td><td>'+
                        // GHSav
                        (summary.MHSav/1000).toFixed(2).toString()+'</td><td>'+
                        // Accepted
                        summary.Accepted.toString()+'</td><td>'+
                        // Rejected
                        summary.Rejected.toString()+'</td><td>'+
                        // NetworkBlocks
                        summary.NetworkBlocks.toString()+'</td><td>'+
                        // BestShare
                        summary.BestShare.toString()+'</td></tr>'
                    );

                    AMS.NodeDetails.jq_Card.find('#loading-placeholder-summary').remove();


                    // $.ajax({
                    //     async: true,
                    //     type: "GET",
                    //     url: __AMS_API_URL + "fwver/" + ip,
                    //     error : function () {
                    //         Materialize.toast("无法载入固件版本：API请求失败",3000);
                    //         $('#'+fulldomid).find('.ndt-s-td-fwver').text('请求失败');
                    //     }
                    // }).done(function(data, textStatus, jqXHR){
                    //     $('#'+fulldomid).find('.ndt-s-td-fwver').text(jqXHR.responseText);
                    // });



                    for (var tr in pools) {
                        AMS.NodeDetails.jq_PoolTable.append(
                            '<tr><td>' +
                            // Pool
                            pools[tr].PoolID.toString() + '</td><td>' +
                            // URL
                            pools[tr].URL + '</td><td>' +
                            // StratumActive
                            pools[tr].StratumActive.toString() + '</td><td>' +
                            // User
                            pools[tr].User + '</td><td>' +
                            // Status
                            pools[tr].Status.toString() + '</td><td>' +
                            // GetWorks
                            pools[tr].GetWorks.toString() + '</td><td>' +
                            // Accepted
                            pools[tr].Accepted.toString() + '</td><td>' +
                            // Rejected
                            pools[tr].Rejected.toString() + '</td><td>' +
                            // Stale
                            pools[tr].Stale.toString() + '</td><td>' +
                            // LST
                            Reimu_Time_unix2rfc3339(pools[tr].LastShareTime) + '</td><td>' +
                            // LSD
                            pools[tr].LastShareDifficulty.toString() + '</td></tr>'
                        );
                    }

                    AMS.NodeDetails.jq_Card.find('#loading-placeholder-pool').remove();


                    for (var tr in devices) {
                        AMS.NodeDetails.jq_DevicesTable.append(
                            '<tr><td>' +
                            // Device
                            'ASC' + devices[tr].ASC.toString() + '-' + devices[tr].Name + '-' +
                            devices[tr].ID.toString() + '</td><td>' +
                            // MM Count
                            devices[tr].MMCount.toString() + '</td><td>' +
                            // Enabled
                            devices[tr].Enabled + '</td><td>' +
                            // Status
                            devices[tr].Status + '</td><td>' +
                            // T(C)
                            devices[tr].Temperature.toFixed(2).toString() + '</td><td>' +
                            // GHSav
                            (devices[tr].MHSav/1000).toFixed(2).toString() + '</td><td>' +
                            // GHS5s
                            (devices[tr].MHS5s/1000).toFixed(2).toString() + '</td><td>' +
                            // GHS1m
                            (devices[tr].MHS1m/1000).toFixed(2).toString() + '</td><td>' +
                            // GHS5m
                            (devices[tr].MHS5m/1000).toFixed(2).toString() + '</td><td>' +
                            // GHS15m
                            (devices[tr].MHS15m/1000).toFixed(2).toString() + '</td><td>' +
                            // last_valid_work
                            Reimu_Time_unix2rfc3339(devices[tr].LastValidWork) + '</td></tr>'
                        );
                    }

                    AMS.NodeDetails.jq_Card.find('#loading-placeholder-devices').remove();

                    parsed = null;


                    var ids = [];

                    for (var tr in modules) {
                        var adcol = "";

                        var idind = ids.indexOf(modules[tr].DeviceID);

                        if (idind === -1) {
                            ids.push(modules[tr].DeviceID);
                            idind = ids.indexOf(modules[tr].DeviceID);
                        }

                        if ((idind+2)%2 === 1)
                            adcol = ' class="grey lighten-2"';

                        var echu_combined  = modules[tr].ECHU[0] | modules[tr].ECHU[1] | modules[tr].ECHU[2] |
                            modules[tr].ECHU[3];

                        if (echu_combined !== 0)
                            adcol = ' class="yellow"';

                        var ledcol = 'waves-green';

                        if (modules[tr].led === '1') {
                            ledcol = 'waves-light light-green accent-3';
                        }

                        AMS.NodeDetails.jq_StatsTable.append(
                            '<tr' + adcol + ' id="' + modules[tr].DNA + '"><td>' +
                            // LED
                            '<a href="#" class="waves-effect ' + ledcol + ' btn-flat" onclick="AMS.NodeDetails.Operations.ToggleLed(\''+
                            ip+'\','+port.toString()+','+modules[tr].DeviceID.toString()+
                            ','+ modules[tr].ModuleID.toString()+',$(this))"><i class="material-icons">&#xE42E;</i></a>' +
                            '</td><td>' +
                            // Reboot
                            '<a href="#" onclick="AMS.NodeDetails.Operations.RebootMM(\'' + ip + '\',' + port.toString() + ',' +
                            modules[tr].DeviceID.toString() + ',' + modules[tr].ModuleID.toString() +
                            ')" class="waves-effect waves-red btn-flat"><i class="material-icons">&#xE042;</i></a>' +
                            '</td><td>' +
                            // Elapsed
                            Reimu_Time_Sec2HMS(modules[tr].Elapsed) + '</td><td>' +
                            // Device
                            modules[tr].DeviceID.toString() + '-' + modules[tr].ModuleID.toString() + '</td><td>' +
                            // MM
                            modules[tr].Ver + '</td><td>' +
                            // DNA
                            modules[tr].DNA + '</td><td>' +
                            // LocalWorks
                            modules[tr].LW.toString() + '</td><td>' +
                            // DH
                            modules[tr].DH.toFixed(3).toString() + '%</td><td>' +
                            // GHS
                            modules[tr].GHSmm.toFixed(3).toString() + '</td><td>' +
                            // WU
                            modules[tr].WU.toFixed(3).toString() + '</td><td>' +
                            // Temp
                            modules[tr].Temp.toString() + ' / ' + modules[tr].TMax.toString() + '</td><td>' +
                            // Fan
                            modules[tr].Fan.toString() + ' (' + modules[tr].FanR.toString() + '%)' + '</td><td>' +
                            // PG
                            modules[tr].PG.toString() + '</td><td>' +
                            // ECHU
                            modules[tr].ECHU[0].toString() + ' ' + modules[tr].ECHU[1].toString() + ' ' +
                            modules[tr].ECHU[2].toString() + ' ' + modules[tr].ECHU[3].toString() + '</td><td>' +
                            // ECMM
                            modules[tr].ECMM.toString() + '</td></tr>'
                        );
                    }

                    ids = null;

                    AMS.NodeDetails.jq_Card.find('#loading-placeholder-stats').remove();
                }
            });

            fidreq.Dispatch();
        }
    }
};

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

function AMS_NodeDetails_GenTableData(ip,port,fulldomid){
    var pwindow = $('#'+fulldomid);
    var table_summary = pwindow.find("#summary-table-tbody");
    var table_pool = pwindow.find("#pool-table-tbody");
    var table_devices = pwindow.find("#devices-table-tbody");
    var table_stats = pwindow.find("#stats-table-tbody");


    // /api/status/summary
    $.ajax({
        async: true,
        type: "POST",
        url: __AMS_API_URL,
        data: '{"operation": "status", "data": {"ip":"'+ip+'","port":'+port.toString()+'}}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        error : function (data, textStatus, jqXHR) {

        }
    }).done(function(data, textStatus, jqXHR){
        var ret = JSON.parse(jqXHR.responseText);
        var status = ret.data.Status;
        var summary = status.Summary;
        var devices = status.Devices;
        var pools = status.Pools;
        var modules = status.Modules;

        table_summary.append(
            '<tr><td class="ndt-s-td-fwver">正在载入…</td><td>'+
            // Elapsed
            Reimu_Time_Sec2HMS(summary.Elapsed)+'</td><td>'+
            // GHSav
            (summary.MHSav/1000).toFixed(2).toString()+'</td><td>'+
            // Accepted
            summary.Accepted.toString()+'</td><td>'+
            // Rejected
            summary.Rejected.toString()+'</td><td>'+
            // NetworkBlocks
            summary.NetworkBlocks.toString()+'</td><td>'+
            // BestShare
            summary.BestShare.toString()+'</td></tr>'
        );

        pwindow.find('#loading-placeholder-summary').remove();


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



        for (var tr in pools) {
            table_pool.append(
                '<tr><td>' +
                // Pool
                pools[tr].PoolID.toString() + '</td><td>' +
                // URL
                pools[tr].URL + '</td><td>' +
                // StratumActive
                pools[tr].StratumActive.toString() + '</td><td>' +
                // User
                pools[tr].User + '</td><td>' +
                // Status
                pools[tr].Status.toString() + '</td><td>' +
                // GetWorks
                pools[tr].GetWorks.toString() + '</td><td>' +
                // Accepted
                pools[tr].Accepted.toString() + '</td><td>' +
                // Rejected
                pools[tr].Rejected.toString() + '</td><td>' +
                // Stale
                pools[tr].Stale.toString() + '</td><td>' +
                // LST
                Reimu_Time_unix2rfc3339(pools[tr].LastShareTime) + '</td><td>' +
                // LSD
                pools[tr].LastShareDifficulty.toString() + '</td></tr>'
            );
        }

        pwindow.find('#loading-placeholder-pool').remove();


        for (var tr in devices) {
            table_devices.append(
                '<tr><td>' +
                // Device
                'ASC' + devices[tr].ASC.toString() + '-' + devices[tr].Name + '-' +
                devices[tr].ID.toString() + '</td><td>' +
                // MM Count
                devices[tr].MMCount.toString() + '</td><td>' +
                // Enabled
                devices[tr].Enabled + '</td><td>' +
                // Status
                devices[tr].Status + '</td><td>' +
                // T(C)
                devices[tr].Temperature.toFixed(2).toString() + '</td><td>' +
                // GHSav
                (devices[tr].MHSav/1000).toFixed(2).toString() + '</td><td>' +
                // GHS5s
                (devices[tr].MHS5s/1000).toFixed(2).toString() + '</td><td>' +
                // GHS1m
                (devices[tr].MHS1m/1000).toFixed(2).toString() + '</td><td>' +
                // GHS5m
                (devices[tr].MHS5m/1000).toFixed(2).toString() + '</td><td>' +
                // GHS15m
                (devices[tr].MHS15m/1000).toFixed(2).toString() + '</td><td>' +
                // last_valid_work
                Reimu_Time_unix2rfc3339(devices[tr].LastValidWork) + '</td></tr>'
            );
        }

        pwindow.find('#loading-placeholder-devices').remove();

        parsed = null;


        var ids = [];

        for (var tr in modules) {
            var adcol = "";

            var idind = ids.indexOf(modules[tr].DeviceID);

            if (idind === -1) {
                ids.push(modules[tr].DeviceID);
                idind = ids.indexOf(modules[tr].DeviceID);
            }

            if ((idind+2)%2 === 1)
                adcol = ' class="grey lighten-2"';

            var echu_combined  = modules[tr].ECHU[0] | modules[tr].ECHU[1] | modules[tr].ECHU[2] |
                modules[tr].ECHU[3];

            if (echu_combined !== 0)
                adcol = ' class="yellow"';

            var ledcol = 'waves-green';

            if (modules[tr].led === '1') {
                ledcol = 'waves-light light-green accent-3';
            }

            table_stats.append(
                '<tr' + adcol + ' id="' + modules[tr].DNA + '"><td>' +
                // LED
                '<a href="#" class="waves-effect ' + ledcol + ' btn-flat" onclick="AMS_ToggleLED(\''+
                ip+'\','+port.toString()+','+modules[tr].DeviceID.toString()+
                ','+ modules[tr].ModuleID.toString()+',$(this))"><i class="material-icons">&#xE42E;</i></a>' +
                '</td><td>' +
                // Reboot
                '<a href="#" onclick="AMS_NodeDetails_RebootMM(\'' + ip + '\',' + port.toString() + ',' +
                modules[tr].DeviceID.toString() + ',' + modules[tr].ModuleID.toString() +
                ')" class="waves-effect waves-red btn-flat"><i class="material-icons">&#xE042;</i></a>' +
                '</td><td>' +
                // Elapsed
                Reimu_Time_Sec2HMS(modules[tr].Elapsed) + '</td><td>' +
                // Device
                modules[tr].DeviceID.toString() + '-' + modules[tr].ModuleID.toString() + '</td><td>' +
                // MM
                modules[tr].Ver + '</td><td>' +
                // DNA
                modules[tr].DNA + '</td><td>' +
                // LocalWorks
                modules[tr].LW.toString() + '</td><td>' +
                // DH
                modules[tr].DH.toFixed(3).toString() + '%</td><td>' +
                // GHS
                modules[tr].GHSmm.toFixed(3).toString() + '</td><td>' +
                // WU
                modules[tr].WU.toFixed(3).toString() + '</td><td>' +
                // Temp
                modules[tr].Temp.toString() + ' / ' + modules[tr].TMax.toString() + '</td><td>' +
                // Fan
                modules[tr].Fan.toString() + ' (' + modules[tr].FanR.toString() + '%)' + '</td><td>' +
                // PG
                modules[tr].PG.toString() + '</td><td>' +
                // ECHU
                modules[tr].ECHU[0].toString() + ' ' + modules[tr].ECHU[1].toString() + ' ' +
                modules[tr].ECHU[2].toString() + ' ' + modules[tr].ECHU[3].toString() + '</td><td>' +
                // ECMM
                modules[tr].ECMM.toString() + '</td></tr>'
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
        $('#' + fulldomid).find('.nd-debuginfo').remove();
        $('#' + fulldomid).find('.collapsible').prepend('<li class="active nd-debuginfo"><div class="collapsible-header active">' +
            '<i class="material-icons">&#xE86F;</i>调试信息 - ' + Reimu_Time_unix2rfc3339() +
            '</div><div class="collapsible-body"><div class="row"><div class="col l11">' + jqXHR.responseText +
            '</div></div></div></li>');
        $('#' + fulldomid).find('.collapsible').collapsible();
    });

}

function AMS_NodeDetails_NewWindow(ip,port) {
    window.open('?ip='+ip+'&port='+port.toString());
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

    var ddd = $('#ams-mainpage-nodedetail');

    $("#ams-mainpage-dashboard").remove();

    ddd.prepend('<div class="card hoverable"><div class="card-content"><span class="card-title">' + ip + ':' +
        port.toString() + '</span>&nbsp;&nbsp;' + buttons + AMS_NodeDetails_GenTable() + '</div></div>');
    AMS_NodeDetails_GenTableData(ip,port,'ams-mainpage-nodedetail');
    ddd.find('.collapsible').collapsible();
    ddd.find('.tooltipped').tooltip();


}