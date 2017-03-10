/**
 * Created by root on 16-12-30.
 */

function AMS_Map_Flush(){
    $("#ams-mainpage-card-maparea > div").remove();
}

function AMS_Map_Append_Line(n) {
    $("#ams-mainpage-card-maparea").append('<div class="ams-mapline valign"><div class="row" class="valign" style="display: flex"' +
        'id="ams-mainpage-card-maparea-line-row-'+n.toString()+'"></div></div>');
}

function AMS_Map_Append_Block(line,dead,ip,port,ghs,mod_num,temp,tmax,cs) {

    var s = '<div class="ams-mapblock tooltipped valign" data-position="top" data-delay="50" data-tooltip="'+
        ip+':'+port+'"';

    if (cs === 0) {
        if (temp)
            s += ' style="background-color: '+ams_t2c(temp)+' !important;"';
    } else if (cs === 1) {
        if (tmax)
            s += ' style="background-color: '+ams_t2c(temp)+' !important;"';
    }

    s += ' onclick="AMS_NodeDetails_Inline(\''+ip+'\','+port+');"';

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

    $("#ams-mainpage-card-maparea-line-row-"+line.toString()).append(s);

    s = null;

}

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