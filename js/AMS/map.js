/**
 * Created by root on 16-12-30.
 */

var ams_api_url = $.jStorage.get("ams_api_url", "/api/");

function AMS_Map_Flush(){
    $("#ams-mainpage-card-maparea > div").remove();
}

function AMS_Map_Append_Line(n) {
    $("#ams-mainpage-card-maparea").append('<div class="ams-mapline valign"><div class="row" class="valign" style="display: flex"' +
        'id="ams-mainpage-card-maparea-line-row-'+n.toString()+'"></div></div>');
}

function AMS_Map_Append_Block(line,dead,ip,port,mhs,mod_num,temp,tmax,cs) {

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

        if (mhs)
            s += (mhs / 1000000).toPrecision(4).toString();
        else
            s += '?';

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

}

function AMS_Map_Update(){

    var apitime = $.jStorage.get("AMS_3_1_Runtime_API_Time", 0).toString();


    $.ajax({
        async: true,
        type: "GET",
        url: ams_api_url + "farmmap/" + apitime,
    }).done(function(data, textStatus, jqXHR){
        Materialize.toast("Debug: API request /farmmap/" + apitime + " success",3000);
        var parsed = JSON.parse(jqXHR.responseText);
        var array_res = parsed.result;

        AMS_Map_Flush();

        var lines = 0;
        var thisline_blocks = 0;

        for (var thisres in array_res) {

            if (thisline_blocks === 10) {
                thisline_blocks = 0;
                lines++;
            }

            if (thisline_blocks === 0)
                AMS_Map_Append_Line(lines);

            AMS_Map_Append_Block(lines,array_res[thisres].dead,array_res[thisres].ip,array_res[thisres].port,
                array_res[thisres].mhs,array_res[thisres].mod_num,array_res[thisres].temp,array_res[thisres].tmax,0);

            thisline_blocks++;
        }

        // for (var j in lines)
        $('.tooltipped').tooltip();




    });

    //var t = setTimeout(AMS_NavBar_MiscInfo_UpdateText, 5000);
}

function AMS_Map_UpdateBlockColor() {
    $(".ams-mapblock").style()
    
}