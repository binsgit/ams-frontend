/**
 * Created by root on 16-12-30.
 */

AMS.Charts = {
    Update: {
        All: function () {
            AMS.Charts.Update.HashRate();
            AMS.Charts.Update.AliveRate();
        },

        HashRate: function () {
            let thisreq = new AMS.API.Request({
                RawData: {
                    operation: "history",
                    data: {
                        type: "hashrate",
                        time_offset: 86400
                    }
                },

                DoneCallback: function (parsed) {
                    let retdata = parsed.data;
                    let rawtime = retdata.times;
                    let rawpools = retdata.mdzz;

                    let time_xaxis = [];
                    let datasets = [];

                    for (let tt in rawtime)
                        time_xaxis.push(new Date(rawtime[tt] * 1000));

                    for (let pthispool in rawpools) {
                        let thiscolor = 'rgba(' + Reimu_RandomColor();
                        let thispool = rawpools[pthispool];
                        let thisyaxis = [];

                        for (let thisy in thispool.hashrates)
                            thisyaxis.push((thispool.hashrates[thisy] / 1000).toFixed(3));

                        datasets.push({
                            label: thispool.url,
                            fill: false,
                            lineTension: 0.1,
                            backgroundColor: thiscolor + ",0.4)",
                            borderColor: thiscolor + ",1)",
                            borderCapStyle: 'butt',
                            borderDash: [],
                            borderDashOffset: 0.0,
                            borderJoinStyle: 'miter',
                            pointBorderColor: thiscolor + ",1)",
                            pointBackgroundColor: "#fff",
                            pointBorderWidth: 1,
                            pointHoverRadius: 5,
                            pointHoverBackgroundColor: thiscolor + ",1)",
                            pointHoverBorderColor: "rgba(220,220,220,1)",
                            pointHoverBorderWidth: 2,
                            pointRadius: 1,
                            pointHitRadius: 10,
                            data: thisyaxis,
                            spanGaps: false
                        });

                    }

                    let ctx = document.getElementById("ams-dashboard-chart-hashrate");
                    let chartdata = {
                        labels: time_xaxis,
                        datasets: datasets
                    };

                    $('#ams-dashboard-hashrate-loading').remove();

                    let _Chart_Hashrate = new Chart(ctx, {
                        type: 'line',
                        data: chartdata,
                        options: {
                            scales: {
                                xAxes: [{
                                    type: 'time',
                                    time: {
                                        displayFormats: {
                                            'millisecond': 'M.DD HH:MM',
                                            'second': 'M.DD HH:MM',
                                            'minute': 'M.DD HH:MM',
                                            'hour': 'M.DD HH:MM',
                                            'day': 'M.DD HH:MM',
                                            'week': 'M.DD HH:MM',
                                            'month': 'M.DD HH:MM',
                                            'quarter': 'M.DD HH:MM',
                                            'year': 'M.DD HH:MM'
                                        },
                                        tooltipFormat: "YYYY-MM-DD HH:MM:SS"
                                    },
                                    ticks: {
                                        beginAtZero: false
                                    }
                                }],
                                yAxes: [{
                                    ticks: {
                                        beginAtZero: true
                                    },
                                    scaleLabel: {
                                        display: true,
                                        labelString: 'TH/s'
                                    }
                                }]
                            }
                        }
                    });
                }

            });

            thisreq.Dispatch();
        },

        AliveRate: function () {

            let thisreq = new AMS.API.Request({
                RawData: {
                    operation: "history",
                    data: {
                        type: "aliverate",
                        time_offset: 86400
                    }
                },

                DoneCallback: function (parsed) {
                    let retdata = parsed.data;
                    let rawtimes = retdata.times;
                    let ctls = retdata.ctls;
                    let mods = retdata.mods;


                    let time_xaxis = [];

                    for (let thisres_nodes in rawtimes)
                        time_xaxis.push(new Date(rawtimes[thisres_nodes] * 1000));


                    let ctx = document.getElementById("ams-dashboard-chart-aliverate");

                    let chartdata = {
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

                    $('#ams-dashboard-aliverate-loading').remove();

                    let _Chart_Aliverate = new Chart(ctx, {
                        type: 'line',
                        data: chartdata,

                        options: {
                            scales: {
                                xAxes: [{
                                    type: 'time',
                                    time: {
                                        displayFormats: {
                                            'millisecond': 'M.DD HH:MM',
                                            'second': 'M.DD HH:MM',
                                            'minute': 'M.DD HH:MM',
                                            'hour': 'M.DD HH:MM',
                                            'day': 'M.DD HH:MM',
                                            'week': 'M.DD HH:MM',
                                            'month': 'M.DD HH:MM',
                                            'quarter': 'M.DD HH:MM',
                                            'year': 'M.DD HH:MM'
                                        },
                                        tooltipFormat: "YYYY-MM-DD HH:MM:SS"
                                    },
                                    ticks: {
                                        beginAtZero: true
                                    }
                                }],
                                yAxes: [{
                                    ticks: {
                                        beginAtZero: true
                                    }
                                }]
                            }
                        }
                    });
                }
            });

            thisreq.Dispatch();

        }
    },
};
