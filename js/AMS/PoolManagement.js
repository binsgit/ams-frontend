/**
 * Created by root on 17-1-9.
 */


AMS.PoolManagement = {

    jq_PmTable: $('#pm-table-tbody'),

    SelectedMods: 0,


    Window: {
        UpdateNodeList: function () {
            let un_req = new AMS.API.Request({
                RawData: {
                    operation: 'controller',
                    data: {
                        op: 'list'
                    }
                },
                DoneCallback: function (parsed) {
                    let ctls_arr = parsed.data.controllers;

                    for (let pctl in ctls_arr) {
                        let thisctl = ctls_arr[pctl];

                        let st_req = new AMS.API.Request({
                            RawData: {
                                operation: 'status',
                                data: {
                                    ip: thisctl.ip,
                                    port: thisctl.port
                                }
                            },
                            DoneCallback: function (parsed) {
                                let thiscst = parsed.data.Status;

                                if (thiscst.Devices.length === 0) {
                                    return;
                                }

                                console.log(thiscst);

                                let ghs_total = 0;
                                let ghsavg_total = 0;

                                for (let pdev in thiscst.Devices) {
                                    let thisdev = thiscst.Devices[pdev];

                                    ghs_total += thisdev.MHS1m;
                                    ghsavg_total += thisdev.MHSav;
                                }

                                ghsavg_total /= 1000;
                                ghs_total /= 1000;



                                let ppstr = '<tr>' +
                                    '<td class="pmtd-sel"><input type="checkbox" id="pmtd-sel-cb" class="filled-in"/><label for="pmtd-sel-cb"></label></td>' +
                                    '<td class="pmtd-ip">' + thisctl.ip + '</td>' +
                                    '<td class="pmtd-runtime">' + Reimu.Time.Sec2HMS(thiscst.Summary.Elapsed) + '</td>' +
                                    '<td class="pmtd-pool">' + thiscst.Pools[0].URL + '</td>' +
                                    '<td class="pmtd-worker">' + thiscst.Pools[0].User + '</td>' +
                                    '<td class="pmtd-mods">' + thiscst.Modules.length.toString() + '</td>' +
                                    '<td class="pmtd-modtype">' + '' + '</td>' +
                                    '<td class="pmtd-ghs">' + ghs_total.toFixed(3).toString() + '</td>' +
                                    '<td class="pmtd-ghsavg">' + ghsavg_total.toFixed(3).toString() + '</td>' +
                                    '</tr>';

                                AMS.PoolManagement.jq_PmTable.prepend(ppstr);
                            }
                        });
                        st_req.Dispatch();

                    }
                }
            });

            un_req.Dispatch();
        }
    }

};
function AMS_PoolManage_CheckExec(){

    var ip_st = $('#ams-poolmanage-window-form-ipst').val();
    var ip_ed = $('#ams-poolmanage-window-form-iped').val();
    var ip_list = $('#ams-poolmanage-window-form-iplist').val();

    var user = $('#ams-poolmanage-window-form-user').val();
    var passwd = $('#ams-poolmanage-window-form-passwd').val();


    var tmp, tmp2;

    var ips;

    if (user === '') {
        user = null;
        passwd = null;
    }

    if ($('#asni-mlc').prop('checked'))
        if (user === '') {
            Materialize.toast("请填写用户名", 2000);
            return;
        }

    if ($('#asni-range').prop('checked')) {
        if (ip_st === '' || ip_ed === '') {
            Materialize.toast("请填写完整的IP段", 2000);
            return;
        }

        tmp = parseInt(inet_pton('AF_INET', ip_st), 16);

        if (!isInt(tmp)){
            Materialize.toast("IP地址格式不正确",2000);
            return;
        }

        if (!((tmp > 0x01000000)&&(tmp < 0xe0000000))) {
            Materialize.toast("IP地址数值错误",2000);
            return;
        }

        tmp = parseInt(ip_st.split(".")[3]);


        if ( (ip_ed <= tmp) || (parseInt(ip_ed) > 254) || (!isInt(ip_ed)) ) {
            Materialize.toast("IP段结尾只能填写" + (tmp+1).toString() + "~254",2000);
            return;
        }

        ips = Reimu_IPRange(ip_st, ip_ed);
    } else {
        if (ip_list === '') {
            Materialize.toast("请填写IP列表", 2000);
            return;
        }

        tmp2 = ip_list.split('\n');

        for (var thiss in tmp2) {

            tmp = parseInt(inet_pton('AF_INET', tmp2[thiss]), 16);

            if (!((tmp > 0x01000000)&&(tmp < 0xe0000000))) {
                Materialize.toast("列表中的第"+ (thiss+1).toString() +"行（" + tmp2[thiss] + "）：IP地址数值错误",2000);
                return;
            }

            if (!isInt(tmp)){
                Materialize.toast("列表中的第"+ (thiss+1).toString() +"行（" + tmp2[thiss] + "）：IP地址格式不正确",2000);
                return;
            }

        }

        ips = tmp2;

    }

    AMS_PoolManage_RealExec(ips, user, passwd);
}

function AMS_PoolManage_RealExec(ip_array, username, passwd){

    var jreq = {
        operation: "poool",
        data: {
            op: "exec_script",
            name: scriptname,
            ips: ip_array
        }
    };

    if (username)
        jreq["username"] = username;

    if (passwd)
        jreq["passwd"] = passwd;

    var serialized_ce_req = JSON.stringify(jreq);

    apiReq(serialized_ce_req, function (parsed) {
        Materialize.toast("请求成功",2000);
        $('#ams-supertac-new-window').modal('close');
    });
}