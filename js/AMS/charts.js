/**
 * Created by root on 16-12-30.
 */

var ams_api_url = $.jStorage.get("ams_api_url", "/api/");


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

    var apitime = $.jStorage.get("AMS_3_1_Runtime_API_Time", 0).toString();

    var serialized_hashrate_req = '{"scope": "farm", "start": 1480848722, "end": 1483440722}';

    $.ajax({
        async: true,
        type: "POST",
        data: serialized_hashrate_req,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        url: ams_api_url + "hashrate"
    }).done(function(data, textStatus, jqXHR){
        Materialize.toast("Debug: API request /hashrate" + " success",3000);
        var parsed = JSON.parse(jqXHR.responseText);
        var array_res = parsed.result[0].values;


        var xaxis = [];
        var yaxis = [];

        for (var thisres in array_res) {
            xaxis.push(array_res[thisres].x);
            yaxis.push(array_res[thisres].y);
        }



        var ctx = document.getElementById("ams-mainpage-card-hashrate-chart");
        var chartdata = {
            labels: xaxis,
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
                    data: yaxis,
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
                    data: [65, 59, 80, 81, 233, 55, 40],
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
                    data: [22, 11, 23, 44, 111, 3, 6],
                    spanGaps: false,
                }
            ]
        };

        var myChart = new Chart(ctx, {
            type: 'line',
            data: chartdata,
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


    });


}


function AMS_Chart_NormalNodes() {
    var ctx = document.getElementById("ams-mainpage-card-normalnodes-chart");
    var data = {
        labels: ["12.28", "12.29", "12.30", "12.31", "1.1", "1.2", "1.3"],
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
                data: [65, 59, 80, 81, 233, 55, 40],
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
                data: [22, 11, 23, 44, 111, 3, 6],
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