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
        data: serialized_hashrate_req,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        url: __AMS_API_URL + "hashrate",
        error: function () {
            Reimu_ToogleCardTitleLoadingIcon('ams-mainpage-hashrate-title-loading',false);
        }
    }).done(function(data, textStatus, jqXHR){
        Log.d("API request /hashrate" + " success");
        var parsed = JSON.parse(jqXHR.responseText);

        var time_xaxis = [];
        var datasets = [];

        var pools = parsed.result;

        for (var tt in pools[0].values.x)
            time_xaxis.push(new Date(pools[0].values.x[tt] * 1000));

        for (var pthispool in pools) {

            var thiscolor = 'rgba(' + Reimu_RandomColor();

            var thispool = pools[pthispool];
            var thisyaxis = [];
            for (var thisy in thispool.values.y)
                thisyaxis.push(thispool.values.y[thisy] / 1000000000000);

            datasets.push({
                label: thispool.key,
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
                                'millisecond': 'M-DD',
                                'second': 'M-DD',
                                'minute': 'M-DD',
                                'hour': 'M-DD',
                                'day': 'M-DD',
                                'week': 'M-DD',
                                'month': 'M-DD',
                                'quarter': 'M-DD',
                                'year': 'M-DD'
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


        ctx = null;
        parsed = null;
        myChart = null;

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
        data: serialized_hashrate_req,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        url: __AMS_API_URL + "aliverate",
        error: function () {
            Reimu_ToogleCardTitleLoadingIcon('ams-mainpage-aliverate-title-loading',false);
        }
    }).done(function(data, textStatus, jqXHR){
        Log.d("API request /aliverate" + " success");
        var parsed = JSON.parse(jqXHR.responseText);
        var array_res_nodes = parsed.result[0].values;
        var array_res_modules = parsed.result[1].values;

        var time_xaxis = [];

        for (var thisres_nodes in array_res_nodes.x)
            time_xaxis.push(new Date(array_res_nodes.x[thisres_nodes] * 1000));




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
                    data: array_res_modules.y,
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
                    data: array_res_nodes.y,
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
                                'millisecond': 'M-DD',
                                'second': 'M-DD',
                                'minute': 'M-DD',
                                'hour': 'M-DD',
                                'day': 'M-DD',
                                'week': 'M-DD',
                                'month': 'M-DD',
                                'quarter': 'M-DD',
                                'year': 'M-DD'
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