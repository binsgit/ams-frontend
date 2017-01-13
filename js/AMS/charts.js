/**
 * Created by root on 16-12-30.
 */

function AMS_Chart_FoundBlocks() {
    var ctx = document.getElementById("ams-mainpage-card-foundblocks-chart");
    var data = {
        labels: ["12.28", "12.29", "12.30", "12.31", "1.1", "1.2", "1.3"],
        datasets: [
            {
                label: "区块",
                fill: false,
                lineTension: 0.1,
                backgroundColor: "rgba(75,192,192,0.4)",
                borderColor: "rgba(75,192,192,1)",
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: "rgba(75,192,192,1)",
                pointBackgroundColor: "#fff",
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "rgba(75,192,192,1)",
                pointHoverBorderColor: "rgba(220,220,220,1)",
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: [65, 59, 80, 81, 233, 55, 40],
                spanGaps: false,
            }
        ]
    };

    var myChart = new Chart(ctx, {
        type: 'line',
        data: data,
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            }
        }
    });
}

function AMS_Chart_HashRate() {

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
        var array_res_local = parsed.result[0].values;
        var array_res_kano = parsed.result[1].values;
        var array_res_cksolo = parsed.result[2].values;


        var xaxis_local = [];
        var yaxis_local = [];

        var xaxis_kano = [];
        var yaxis_kano = [];

        var xaxis_cksolo = [];
        var yaxis_cksolo = [];

        var oqo_local = 0;

        for (var thisres_local in array_res_local) {

            if (oqo_local === 0) {
                var thisdate_local = new Date(array_res_local[thisres_local].x * 1000);

                xaxis_local.push(thisdate_local);
                yaxis_local.push((array_res_local[thisres_local].y / 1000 / 1000 / 1000 / 1000).toFixed(3));
                oqo_local = 0;
            } else {
                oqo_local--;
            }
        }

        for (var thisres_kano in array_res_kano) {

            var thisdate_kano = new Date(array_res_kano[thisres_kano].x*1000);

            xaxis_kano.push(thisdate_kano);
            yaxis_kano.push((array_res_kano[thisres_kano].y / 1000 / 1000 / 1000 / 1000).toFixed(3));
        }

        for (var thisres_cksolo in array_res_cksolo) {

            var thisdate_cksolo = new Date(array_res_cksolo[thisres_cksolo].x*1000);

            xaxis_cksolo.push(thisdate_cksolo);
            yaxis_cksolo.push((array_res_cksolo[thisres_cksolo].y / 1000 / 1000 / 1000 / 1000).toFixed(3));
        }




        var ctx = document.getElementById("ams-mainpage-card-hashrate-chart");
        var chartdata = {
            labels: xaxis_local,
            datasets: [
                {
                    label: "local",
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: "rgba(31,119,180,0.4)",
                    borderColor: "rgba(31,119,180,1)",
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: "rgba(31,119,180,1)",
                    pointBackgroundColor: "#fff",
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: "rgba(31,119,180,1)",
                    pointHoverBorderColor: "rgba(220,220,220,1)",
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: yaxis_local,
                    spanGaps: false,
                },
                {
                    label: "kano",
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: "rgba(174,199,232,0.4)",
                    borderColor: "rgba(174,199,232,1)",
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: "rgba(174,199,232,1)",
                    pointBackgroundColor: "#fff",
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: "rgba(174,199,232,1)",
                    pointHoverBorderColor: "rgba(220,220,220,1)",
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: yaxis_kano,
                    spanGaps: false,
                },
                {
                    label: "cksolo",
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: "rgba(255,127,14,0.4)",
                    borderColor: "rgba(255,127,14,1)",
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: "rgba(255,127,14,1)",
                    pointBackgroundColor: "#fff",
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: "rgba(255,127,14,1)",
                    pointHoverBorderColor: "rgba(220,220,220,1)",
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: yaxis_cksolo,
                    spanGaps: false,
                }
            ]
        };

        var myChart = new Chart(ctx, {
            type: 'line',
            data: chartdata,
            options: {
                scales: {
                    xAxes: [{
                        type: 'time',
                        time: {
                            displayFormats: {
                                'millisecond': 'YY-MM-DD',
                                'second': 'YY-MM-DD',
                                'minute': 'YY-MM-DD',
                                'hour': 'YY-MM-DD',
                                'day': 'YY-MM-DD',
                                'week': 'YY-MM-DD',
                                'month': 'YY-MM-DD',
                                'quarter': 'YY-MM-DD',
                                'year': 'YY-MM-DD'
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


    });


}


function AMS_Chart_NormalNodes() {

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

        var xaxis_nodes = [];
        var yaxis_nodes = [];

        var xaxis_modules = [];
        var yaxis_modules = [];

        var oqo_local = 0;

        for (var thisres_nodes in array_res_nodes) {

            if (oqo_local === 0) {
                var thisdate_nodes = new Date(array_res_nodes[thisres_nodes].x * 1000);

                xaxis_nodes.push(thisdate_nodes);
                yaxis_nodes.push(array_res_nodes[thisres_nodes].y);
                oqo_local = 0;
            } else {
                oqo_local--;
            }
        }

        for (var thisres_modules in array_res_modules) {

            var thisdate_modules = new Date(array_res_modules[thisres_modules].x*1000);

            xaxis_modules.push(thisdate_modules);
            yaxis_modules.push(array_res_modules[thisres_modules].y);
        }




        var ctx = document.getElementById("ams-mainpage-card-normalnodes-chart");
        var chartdata = {
            labels: xaxis_nodes,
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
                    data: yaxis_modules,
                    spanGaps: false,
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
                    data: yaxis_nodes,
                    spanGaps: false,
                }
            ]
        };

        var myChart = new Chart(ctx, {
            type: 'line',
            data: chartdata,

            options: {
                scales: {
                    xAxes: [{
                        type: 'time',
                        time: {
                            displayFormats: {
                                'millisecond': 'YY-MM-DD',
                                'second': 'YY-MM-DD',
                                'minute': 'YY-MM-DD',
                                'hour': 'YY-MM-DD',
                                'day': 'YY-MM-DD',
                                'week': 'YY-MM-DD',
                                'month': 'YY-MM-DD',
                                'quarter': 'YY-MM-DD',
                                'year': 'YY-MM-DD'
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