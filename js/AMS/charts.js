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
    var ctx = document.getElementById("ams-mainpage-card-hashrate-chart");
    var data = {
        labels: ["12.28", "12.29", "12.30", "12.31", "1.1", "1.2", "1.3"],
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
                data: [11, 33, 22, 77, 33, 11, 39],
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