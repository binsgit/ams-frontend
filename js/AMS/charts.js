/**
 * Created by root on 16-12-30.
 */

var _Chart_Hashrate = null;
var _Chart_Aliverate = null;

function AMS_Chart_FoundBlocks() {
    var ctx = document.getElementById("ams-mainpage-card-foundblocks-chart");

}

function AMS_Chart_HashRate() {

    if (_Chart_Hashrate) {
        _Chart_Hashrate.destroy();
        _Chart_Hashrate = null; // Force gc
    }

    Reimu_ToogleCardTitleLoadingIcon('ams-mainpage-hashrate-title-loading',true);

    var serialized_hashrate_req = '{"scope": "farm", "start": ' + (__AMS_API_Time - 86400 * 7).toString() +
        ', "end": ' + __AMS_API_TimeStr + '}';

    $.ajax({
        async: true,
        type: "POST",
        url: __AMS_API_URL,
        data: '{"operation": "history", "data": {"type":"hashrate"}}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        error : function (data, textStatus, jqXHR) {

        }
    }).done(function(data, textStatus, jqXHR){
        var ret = JSON.parse(jqXHR.responseText);
        var retdata = ret.data;
        var rawtime = retdata.times;
        var rawpools = retdata.mdzz;

        var time_xaxis = [];
        var datasets = [];

        for (var tt in rawtime)
            time_xaxis.push(new Date(rawtime[tt] * 1000));

        for (var pthispool in rawpools) {

            var thiscolor = 'rgba(' + Reimu_RandomColor();

            var thispool = rawpools[pthispool];

            var thisyaxis = [];

            for (var thisy in thispool.hashrates)
                thisyaxis.push((thispool.hashrates[thisy] / 1000).toFixed(3));

            datasets.push({
                label: thispool.url,
                fill: false,
                lineTension: 0.1,
                backgroundColor: thiscolor+",0.4)",
                borderColor: thiscolor+",1)",
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: thiscolor+",1)",
                pointBackgroundColor: "#fff",
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: thiscolor+",1)",
                pointHoverBorderColor: "rgba(220,220,220,1)",
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: thisyaxis,
                spanGaps: false
            });

        }




        var ctx = document.getElementById("ams-mainpage-card-hashrate-chart");
        var chartdata = {
            labels: time_xaxis,
            datasets: datasets
        };

        _Chart_Hashrate = new Chart(ctx, {
            type: 'line',
            data: chartdata,
            options: {
                scales: {
                    xAxes: [{
                        type: 'time',
                        time: {
                            displayFormats: {
                                'millisecond': 'M-DD HH:MM',
                                'second': 'M-DD HH:MM',
                                'minute': 'M-DD HH:MM',
                                'hour': 'M-DD HH:MM',
                                'day': 'M-DD HH:MM',
                                'week': 'M-DD HH:MM',
                                'month': 'M-DD HH:MM',
                                'quarter': 'M-DD HH:MM',
                                'year': 'M-DD HH:MM'
                            },
                            tooltipFormat: "YYYY-MM-DD HH:MM:SS"
                        },
                        ticks: {
                            beginAtZero:false
                        }
                    }],
                    yAxes: [{
                        ticks: {
                            beginAtZero:true
                        },
                        scaleLabel: {
                            display: true,
                            labelString: 'TH/s'
                        }
                    }]
                }
            }
        });


        $('#ams-mainpage-hashrate-card-loading').remove();
        Reimu_ToogleCardTitleLoadingIcon('ams-mainpage-hashrate-title-loading',false);



    });


}


function AMS_Chart_NormalNodes() {

    if (_Chart_Aliverate) {
        _Chart_Aliverate.destroy();
        _Chart_Aliverate = null; // Force gc
    }

    Reimu_ToogleCardTitleLoadingIcon('ams-mainpage-aliverate-title-loading',true);

    var serialized_hashrate_req = '{"scope": "farm", "start": ' + (__AMS_API_Time - 86400 * 7).toString() +
        ', "end": ' + __AMS_API_TimeStr + '}';

    $.ajax({
        async: true,
        type: "POST",
        url: __AMS_API_URL,
        data: '{"operation": "history", "data": {"type":"aliverate"}}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        error : function (data, textStatus, jqXHR) {
            Reimu_ToogleCardTitleLoadingIcon('ams-mainpage-aliverate-title-loading',false);
        }
    }).done(function(data, textStatus, jqXHR){
        var ret = JSON.parse(jqXHR.responseText);
        var retdata = ret.data;
        var rawtimes = retdata.times;
        var ctls = retdata.ctls;
        var mods = retdata.mods;


        var time_xaxis = [];

        for (var thisres_nodes in rawtimes)
            time_xaxis.push(new Date(rawtimes[thisres_nodes] * 1000));



        var ctx = document.getElementById("ams-mainpage-card-normalnodes-chart");
        var chartdata = {
            labels: time_xaxis,
            datasets: [
                {
                    label: "机器",
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: "rgba(220,0,0,0.4)",
                    borderColor: "rgba(220,0,0,1)",
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: "rgba(220,0,0,1)",
                    pointBackgroundColor: "#fff",
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: "rgba(220,0,0,1)",
                    pointHoverBorderColor: "rgba(220,220,220,1)",
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: mods,
                    spanGaps: false
                },
                {
                    label: "控制器",
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: "rgba(255,165,0,0.4)",
                    borderColor: "rgba(255,165,0,1)",
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: "rgba(255,165,0,1)",
                    pointBackgroundColor: "#fff",
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: "rgba(255,165,0,1)",
                    pointHoverBorderColor: "rgba(220,220,220,1)",
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: ctls,
                    spanGaps: false
                }
            ]
        };

        _Chart_Aliverate = new Chart(ctx, {
            type: 'line',
            data: chartdata,

            options: {
                scales: {
                    xAxes: [{
                        type: 'time',
                        time: {
                            displayFormats: {
                                'millisecond': 'M-DD HH:MM',
                                'second': 'M-DD HH:MM',
                                'minute': 'M-DD HH:MM',
                                'hour': 'M-DD HH:MM',
                                'day': 'M-DD HH:MM',
                                'week': 'M-DD HH:MM',
                                'month': 'M-DD HH:MM',
                                'quarter': 'M-DD HH:MM',
                                'year': 'M-DD HH:MM'
                            },
                            tooltipFormat: "YYYY-MM-DD HH:MM:SS"
                        },
                        ticks: {
                            beginAtZero:true
                        }
                    }],
                    yAxes: [{
                        ticks: {
                            beginAtZero:true
                        }
                    }]
                }
            }
        });

        $('#ams-mainpage-aliverate-card-loading').remove();
        Reimu_ToogleCardTitleLoadingIcon('ams-mainpage-aliverate-title-loading',false);

    });
}