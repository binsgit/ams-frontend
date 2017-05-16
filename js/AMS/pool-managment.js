/**
 * Created by root on 17-1-9.
 */
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