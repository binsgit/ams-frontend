/**
 * Created by root on 16-12-30.
 */

AMS.Map = {

    jq_MapArea: null,

    Init: function () {
        AMS.Map.jq_MapArea = $('#ams-dashboard-maparea');
        AMS.Map.UI.UpdateMap();
    },

    UI: {
        Flush: function () {
            AMS.Map.jq_MapArea.find('div').remove();
        },

        AppendLine: function (n) {
            AMS.Map.jq_MapArea.append('<div class="ams-mapline valign"><div class="row" class="valign" style="display: flex"' +
                ' id="maparea-line-row-'+n.toString()+'"></div></div>');
        },

        AppendBlock: function (line, dead, ip, port, ghs, mod_num, temp, tmax, cs) {
            let s = '<div class="ams-mapblock tooltipped valign" data-position="top" data-delay="50" data-tooltip="'+
                ip+':'+port+'"';

            if (cs === 0) {
                if (temp)
                    s += ' style="background-color: '+ams_t2c(temp)+' !important;"';
            } else if (cs === 1) {
                if (tmax)
                    s += ' style="background-color: '+ams_t2c(temp)+' !important;"';
            }

            s += ' onclick="AMS.NodeDetails.OpenPage(\''+ip+'\','+port+');"';

            s += '><span class="valign">';


            if (dead === 1)
                s += "<br>N/A";
            else {
                s += mod_num + " Mods<br>";

                if (ghs)
                    s += (ghs / 1000).toPrecision(4).toString();
                else
                    s += '0';

                s += ' TH/s<br>';

                if (temp)
                    s += temp.toPrecision(3).toString();
                else
                    s += '?';

                s += " / ";

                if (tmax)
                    s += tmax.toPrecision(3).toString();
                else
                    s += '?';
            }


            s += '</span></div> &nbsp;';

            $("#maparea-line-row-"+line.toString()).append(s);

            s = null;
        },

        UpdateMap: function () {
            let updreq = new AMS.API.Request({
                RawData: {
                    operation: 'farmap',
                    data: {

                    }
                },
                ErrorCallback: function () {

                },
                DoneCallback: function (parsed) {
                    let retdata = parsed.data;
                    let ctls = retdata.Controllers;

                    AMS.Map.UI.Flush();

                    let lines = 0;
                    let thisline_blocks = 0;

                    for (let pctl in ctls) {

                        if (thisline_blocks === 10) {
                            thisline_blocks = 0;
                            lines++;
                        }

                        if (thisline_blocks === 0)
                            AMS.Map.UI.AppendLine(lines);

                        AMS.Map.UI.AppendBlock(lines, ctls[pctl].Dead, ctls[pctl].IP, ctls[pctl].Port,
                            ctls[pctl].GHS, ctls[pctl].Mods, ctls[pctl].Temp, ctls[pctl].TMax, 0);

                        thisline_blocks++;
                    }

                }
            });

            updreq.Dispatch();
        }
    }



};

function AMS_Map_Update(){

    Reimu_ToogleCardTitleLoadingIcon('ams-mainpage-map-title-loading',true);

    $.ajax({
        async: true,
        type: "POST",
        url: __AMS_API_URL,
        data: '{"operation": "farmap", "data": {}}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        error : function (data, textStatus, jqXHR) {
            Reimu_ToogleCardTitleLoadingIcon('ams-mainpage-map-title-loading',false);
        }
    }).done(function(data, textStatus, jqXHR){
        var ret = JSON.parse(jqXHR.responseText);
        var retdata = ret.data;
        var ctls = retdata.Controllers;

        if (ret.rc !== 0)
            Materialize.toast("API请求失败：" + ret.msg + " (" + ret.rc.toString() + ")", 1000);

        AMS_Map_Flush();

        var lines = 0;
        var thisline_blocks = 0;

        for (var pctl in ctls) {

            if (thisline_blocks === 10) {
                thisline_blocks = 0;
                lines++;
            }

            if (thisline_blocks === 0)
                AMS_Map_Append_Line(lines);

            AMS_Map_Append_Block(lines, ctls[pctl].Dead, ctls[pctl].IP, ctls[pctl].Port,
                ctls[pctl].GHS, ctls[pctl].Mods, ctls[pctl].Temp, ctls[pctl].TMax, 0);

            thisline_blocks++;
        }
        

        Reimu_ToogleCardTitleLoadingIcon('ams-mainpage-map-title-loading',false);
    });


    var t = setTimeout(AMS_Map_Update, 15000);
}

function AMS_Map_UpdateBlockColor() {
    $(".ams-mapblock").style()
}