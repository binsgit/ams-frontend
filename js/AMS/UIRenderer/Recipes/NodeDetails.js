/**
 * Created by root on 17-7-22.
 */

AMS.UIRenderer.Recipes.NodeDetails = function () {

    let ret = '';

    if (AMS.Environment.URLParams.mode === 'nodedetails') {
        ret = '<div id="ams-nodedetails" class="row">' +
            '<div id="ams-mainpage-nodedetail" class="col s12 m12 l12">' +
            '<div class="card hoverable">' +
            '<div class="card-content">' +
            '<span class="card-title"></span>&nbsp;&nbsp;' +
            '<a href="#" class="modal-action waves-effect waves-orange btn-flat">重启CGMiner</a>' +
            '<a href="#" onclick="" class="modal-action waves-effect waves-light btn-flat">调试信息</a>';


        ret += '<a href="#" onclick="" class="modal-action waves-effect waves-light btn-flat tooltipped" data-position="bottom" ' +
            'data-delay="50" data-tooltip="此功能暂时只支持Google Chrome浏览器">另存为表格</a>' +
            '<ul class="collapsible" data-collapsible="expandable">' +
            '<li><div class="collapsible-header active"><i class="material-icons"></i>概要</div>' +
            '<div class="collapsible-body"><table class="highlight centered responsive-table">';

        ret += '<thead><tr>' +
            '<th data-field="summary-table-th-elapsed">固件版本</th>' +
            '<th data-field="summary-table-th-elapsed">Elapsed</th>' +
            '<th data-field="summary-table-th-ghsav">GHSav</th>' +
            '<th data-field="summary-table-th-accepted">Accepted</th>' +
            '<th data-field="summary-table-th-rejected">Rejected</th>' +
            '<th data-field="summary-table-th-nbs">NetworkBlocks</th>' +
            '<th data-field="summary-table-th-bestshare">BestShare</th></tr>' +
            '</thead>';
        ret += '<tbody id="summary-table-tbody"></tbody>' +
            '</table>' +
            '<div class="row" id="loading-placeholder-summary"><br>' +
            '<div class="col l8 offset-l2"><div class="progress"><div class="indeterminate"></div></div></div></div>' +
            '</div></li><li>' +
            '<div class="collapsible-header active"><i class="material-icons"></i>矿池</div>' +
            '<div class="collapsible-body"><table class="highlight centered responsive-table"><thead>' +
            '<tr><th data-field="pool-table-th-pool">Pool</th>' +
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
            '<tbody id="pool-table-tbody"></tbody></table>' +
            '<div class="row" id="loading-placeholder-pool"><br><div class="col l8 offset-l2"><div class="progress">' +
            '<div class="indeterminate"></div></div></div></div></div></li><li>' +
            '<div class="collapsible-header active"><i class="material-icons"></i>设备</div>' +
            '<div class="collapsible-body"><table class="highlight centered responsive-table"><thead>' +
            '<tr><th data-field="devices-table-th-device">设备</th>' +
            '<th data-field="devices-table-th-mmcount">MM数量</th>' +
            '<th data-field="devices-table-th-enabled">已启用</th>' +
            '<th data-field="devices-table-th-status">状态</th>' +
            '<th data-field="devices-table-th-temp">温度</th>' +
            '<th data-field="devices-table-th-ghsav">GHSav</th>' +
            '<th data-field="devices-table-th-ghs5s">GHS5s</th>' +
            '<th data-field="devices-table-th-ghs1m">GHS1m</th>' +
            '<th data-field="devices-table-th-ghs5m">GHS5m</th>' +
            '<th data-field="devices-table-th-ghs15m">GHS15m</th>' +
            '<th data-field="devices-table-th-lvw">LastValidWork</th></tr></thead>' +
            '<tbody id="devices-table-tbody"></tbody></table><div class="row" id="loading-placeholder-devices"><br>' +
            '<div class="col l8 offset-l2"><div class="progress">' +
            '<div class="indeterminate"></div></div></div></div></div></li><li>';

        ret += '<div class="collapsible-header active"><i class="material-icons"></i>状态</div>' +
            '<div class="collapsible-body"><table class="highlight centered responsive-table"><thead>' +
            '<tr><th data-field="stats-table-th-led">指示灯</th>' +
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
            '</tr></thead><tbody id="stats-table-tbody"></tbody></table>' +
            '<div class="row" id="loading-placeholder-stats"><br><div class="col l8 offset-l2">' +
            '<div class="progress"><div class="indeterminate"></div></div></div></div></div></li></ul></div></div>';

    }

    let postrender_func = function () {
        AMS.NodeDetails.Init();
        $('.collapsible').collapsible();
        AMS.NodeDetails.UI.FillInData(AMS.Environment.URLParams.ip, parseInt(AMS.Environment.URLParams.port));
    };

    return [ret, postrender_func];
};