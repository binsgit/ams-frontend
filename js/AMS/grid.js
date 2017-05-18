/**
 * Created by root on 17-5-16.
 */

var AMS_Grid_Items = [];

var AMS_Grid_Charts = [];

function AMS_Grid_AddItem(name, api_url){
    AMS_Grid_Items.push({
        Name: name,
        APIURL: api_url
    });
}

function AMS_Grid_Chart_New(ctx, data) {
    var ret = new Chart(ctx, {
        type: 'line',
        data: data,
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

    return ret;
}

function AMS_Grid_Append(id, iteminfo) {

    var id_str = id.toString();
    var canvas_id = 'ams-gridchart-' + id_str;

    apiReq_low(null, 0, iteminfo+"_glimpse.json", function (ret) {
        $('#ams-grid').append('<div class="col s12 m6 l4">' +
            '<div class="card hoverable">' +
            '<div class="card-content">' +
            '<span class="card-title" id="ams-gridtitle-' + id.toString() + '">' + iteminfo + '</span>' +


            '<br>' + '<span style="font-family: Ubuntu Mono, DejaVu Sans Mono, Consolas, Monaco, Lucida Console, ' +
            'Liberation Mono, Bitstream Vera Sans Mono, Courier New, monospace">控制器数量: ' + ret.data.ctls.toString() +
            '&nbsp;&nbsp;机器数量: ' + ret.data.mods.toString() + '&nbsp;&nbsp;算力: ' +
            (ret.data.mhs/1000000000).toPrecision(5).toString() + '/' + (ret.data.mhs_t/1000000000).toPrecision(5).toString()+
            ' PH/s</span>' +


            '<canvas id="' + canvas_id + '" width="572" height="266" style="display: block;"></canvas>' +
            '</div></div></div>');

        console.log(iteminfo);

        apiReq_low(null, 0, iteminfo + "_hashrate.json", function (ret) {
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

            var ctx = document.getElementById(canvas_id);
            var chartdata = {
                labels: time_xaxis,
                datasets: datasets
            };


            AMS_Grid_Chart_New(ctx, chartdata);


        });
    }, function (ret) {
        $('#ams-grid').append('<div class="col s12 m6 l4">' +
            '<div class="card hoverable">' +
            '<div class="card-content">' +
            '<span class="card-title red-text" id="ams-gridtitle-' + id.toString() + '">' + iteminfo + '</span>' +
            '<br><span class="red-text" style="font-family: Ubuntu Mono, DejaVu Sans Mono, Consolas, Monaco, ' +
            'Lucida Console, Liberation Mono, Bitstream Vera Sans Mono, Courier New, monospace">数据获取失败！</span>' +
            '<canvas id="' + canvas_id + '" width="572" height="266" style="display: block;"></canvas>' +
            '</div></div></div>');
    });
}

function AMS_Grid_Reload() {

    apiReq_low(null, 0, "./gridcfg.json", function (parsed) {
        AMS_Grid_Items = parsed;
        console.log(parsed);

        var grid_id = 1;

        for (var pthisitem in parsed) {
            var thisitem = parsed[pthisitem];
            console.log(thisitem);
            AMS_Grid_Append(grid_id, thisitem);
            grid_id++;
        }
    });




}

