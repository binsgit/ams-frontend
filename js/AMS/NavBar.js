/**
 * Created by root on 17-5-22.
 */

AMS.NavBar = {
    Context: {
        InfoUpdaterTimer: null
    },

    Init: function () {
        AMS.NavBar.UpdateInfo();

        AMS.NavBar.tm_RealtimeClock = setInterval(AMS.NavBar.RealtimeClock, 500);
        AMS.NavBar.tm_UpdateInfo = setInterval(AMS.NavBar.UpdateInfo, 1000*60);
    },

    RealtimeClock: function () {
            $("#ams-navbar-clock").text(Reimu_Time_unix2rfc3339());
    },

    UpdateInfo: function () {

        let thisreq = new AMS.API.Request({
            RawData: {
                operation: "glimpse",
                data: {}
            },

            DoneCallback: function (parsed) {
                let retdata = parsed.data;

                // if (ams_api_connectok_noticed === 0) {
                //     ams_api_connectok_noticed = 1;
                //     Materialize.toast("API连接成功 ["+__AMS_API_URL+"]",3000);
                // }
                // console.log(jqXHR.responseText);

                let nodescount = retdata.ctls;
                let machinescount = retdata.mods;
                let thashrate_cgm = retdata.mhs / 1000 / 1000 / 1000;
                let thashrate_theo = retdata.mhs_t / 1000 / 1000 / 1000;

                // $.jStorage.set("AMS_3_1_Runtime_API_Time", parsed.result.time);

                $("#ams-navbar-nodescount").text(nodescount.toString());
                $("#ams-navbar-machinescount").text(machinescount.toString());
                $("#ams-navbar-hashrate").text(thashrate_cgm.toFixed(2).toString()+" / "+thashrate_theo.toFixed(2).toString());
            }
        });

        thisreq.Dispatch();
    }
};