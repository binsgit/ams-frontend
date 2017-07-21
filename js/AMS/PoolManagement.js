/**
 * Created by root on 17-1-9.
 */


AMS.PoolManagement = {

    jq_PmWindow: $('#ams-window-poolmanagement'),
    jq_PmCfmWindow: $('#ams-window-poolmanagement-confirm'),
    jq_PmTable: $('#pm-table-tbody'),

    SelectedMods: 0,
    TotalMods: 0,



    TableData: null,
    SortData: null,
    SortMode: 0x0,

    Queue: {
        Pending: [],

        Flush: function () {
            let tgt_arr = [];
            let poolcfg = {};

            for (let pp in AMS.PoolManagement.Queue.Pending) {
                let thisidx = AMS.PoolManagement.Queue.Pending[pp];
                let thistgt = AMS.PoolManagement.TableData[thisidx];

                let thisip = thistgt.target.split(':')[0];

                tgt_arr.push(thisip);
            }

            let pool1url = AMS.PoolManagement.jq_PmCfmWindow.find('#pmcfm-form-pool1url').val();
            let pool2url = AMS.PoolManagement.jq_PmCfmWindow.find('#pmcfm-form-pool2url').val();
            let pool3url = AMS.PoolManagement.jq_PmCfmWindow.find('#pmcfm-form-pool3url').val();
            let pool1user = AMS.PoolManagement.jq_PmCfmWindow.find('#pmcfm-form-pool1user').val();
            let pool2user = AMS.PoolManagement.jq_PmCfmWindow.find('#pmcfm-form-pool2user').val();
            let pool3user = AMS.PoolManagement.jq_PmCfmWindow.find('#pmcfm-form-pool3user').val();
            let pool1passwd = AMS.PoolManagement.jq_PmCfmWindow.find('#pmcfm-form-pool1passwd').val();
            let pool2passwd = AMS.PoolManagement.jq_PmCfmWindow.find('#pmcfm-form-pool2passwd').val();
            let pool3passwd = AMS.PoolManagement.jq_PmCfmWindow.find('#pmcfm-form-pool3passwd').val();

            if (pool1url.length)
                poolcfg.pool1url = pool1url;

            if (pool2url.length)
                poolcfg.pool2url = pool2url;

            if (pool3url.length)
                poolcfg.pool3url = pool3url;

            if (pool1user.length)
                poolcfg.pool1user = pool1user;

            if (pool2user.length)
                poolcfg.pool2user = pool2user;

            if (pool3user.length)
                poolcfg.pool3user = pool3user;

            if (pool1passwd.length)
                poolcfg.pool1pw = pool1passwd;

            if (pool2passwd.length)
                poolcfg.pool2pw = pool2passwd;

            if (pool3passwd.length)
                poolcfg.pool3pw = pool3passwd;


            if (Object.keys(poolcfg).length) {

                let flreq = new AMS.API.Request({
                    RawData: {
                        operation: 'poool',
                        data: {
                            op: 'modify',
                            nodes: tgt_arr,
                            poolcfg: poolcfg
                        }
                    },
                    DoneCallback: function () {
                        Materialize.toast("修改成功", 3000);
                    }
                });

                flreq.Dispatch();
            } else {
                Materialize.toast("请输入内容！", 3000);
            }
        },

        ToggleAll: function (sel) {
            AMS.PoolManagement.jq_PmTable.find('.CbInTbl').prop('checked', sel);

            if (sel) {
                AMS.PoolManagement.SelectedMods = AMS.PoolManagement.TotalMods;
                for (let i in AMS.PoolManagement.TableData) {
                    AMS.PoolManagement.TableData[i].SEL = true;
                }
                AMS.PoolManagement.Queue.Pending.push(i);
            } else {
                AMS.PoolManagement.SelectedMods = 0;
                for (let i in AMS.PoolManagement.TableData) {
                    AMS.PoolManagement.TableData[i].SEL = false;
                }
                AMS.PoolManagement.Queue.Pending = [];
            }

            AMS.PoolManagement.jq_PmWindow.find('#pm-selcount').text(AMS.PoolManagement.SelectedMods.toString());
        },

        Toggle: function (sel, idx) {
            if (sel)
                AMS.PoolManagement.Queue.Add(idx);
            else
                AMS.PoolManagement.Queue.Del(idx);

            AMS.PoolManagement.jq_PmWindow.find('#pm-selcount').text(AMS.PoolManagement.SelectedMods.toString());
        },

        Add: function (idx) {
            AMS.PoolManagement.Queue.Pending.push(idx);
            AMS.PoolManagement.TableData[idx].SEL = true;
            AMS.PoolManagement.SelectedMods += AMS.PoolManagement.TableData[idx].mods_count;
        },

        Del: function (idx) {
            AMS.PoolManagement.Queue.Pending =  AMS.PoolManagement.Queue.Pending.filter(item => {
                return item !== idx
            });
            AMS.PoolManagement.TableData[idx].SEL = false;
            AMS.PoolManagement.SelectedMods -= AMS.PoolManagement.TableData[idx].mods_count;
        }
    },

    Window: {

        Append2Table: function (jstr, thisctl) {
            let ttpstr = '矿池2：' + thisctl.pool1_url + ' / ' + thisctl.pool1_worker + ' | ' +
                '矿池3：' + thisctl.pool2_url + ' / ' + thisctl.pool2_worker + ' \n';

            let ppstr = '<tr class="pmtd-tr tooltipped" data-position="top" data-delay="150" data-tooltip="' + ttpstr + '">';

               ppstr += '<td class="pmtd-sel"><input ';
               if (thisctl.SEL)
                   ppstr += 'checked="checked"';

               ppstr += 'data-reimu-pos="' + jstr + '" type="checkbox" id="pmtd-sel-cb-'+ jstr + '" class="filled-in CbInTbl" ' +
                'onclick="AMS.PoolManagement.Queue.Toggle(this.checked,' + jstr + ')"/>' +
                '<label for="pmtd-sel-cb-' + jstr + '" class="CbLblInTbl"></label></td>' +
                '<td class="pmtd-ip">' + thisctl.target + '</td>' +
                '<td class="pmtd-runtime">' + Reimu.Time.Sec2HMS(thisctl.elapsed) + '</td>' +
                '<td class="pmtd-pool">' + thisctl.pool_url + '</td>' +
                '<td class="pmtd-worker">' + thisctl.pool_worker + '</td>' +
                '<td class="pmtd-mods">' + thisctl.mods_count.toString() + '</td>' +
                '<td class="pmtd-modtype">' + thisctl.mod_type + '</td>' +
                '<td class="pmtd-ghs">' + thisctl.mhs.toFixed(3).toString() + '</td>' +
                '<td class="pmtd-ghsavg">' + thisctl.mhsav.toFixed(3).toString() + '</td>' +
                '</tr>';

            AMS.PoolManagement.jq_PmTable.append(ppstr);
        },

        OpenUI: function () {
            $('#ams-window-poolmanagement').modal('open');
            AMS.PoolManagement.Window.UpdateNodeList();
        },

        ConfirmEdit: function () {
            if (!AMS.PoolManagement.SelectedMods) {
                Materialize.toast("请选择控制器！", 3000);
                return;
            }

            $('#ams-window-poolmanagement-confirm').modal('open');
        },

        SortNodeList: function (byWhat) {
            let mode = 0;

            let ptrs;

            if (byWhat === 'ip') {
                mode = 1;
            } else {
                ptrs = AMS.PoolManagement.SortData[byWhat];
            }


            let tblraw = AMS.PoolManagement.TableData;

            AMS.PoolManagement.jq_PmTable.find('tr').remove();

            if (mode) {
                let j = 0;

                if (AMS.PoolManagement.SortMode & 0x1) {
                    AMS.PoolManagement.SortMode &= ~0x1;
                    for (let pt in tblraw) {
                        let jstr = j.toString();
                        let thisctl = tblraw[pt];

                        AMS.PoolManagement.Window.Append2Table(jstr, thisctl);
                        j++;
                    }
                } else {
                    AMS.PoolManagement.SortMode |= 0x1;
                    for (let pt = tblraw.length-1; pt >= 0; pt--) {
                        let jstr = j.toString();
                        let thisctl = tblraw[pt];

                        AMS.PoolManagement.Window.Append2Table(jstr, thisctl);
                        j++;
                    }
                }
            } else {
                if (AMS.PoolManagement.SortMode & 0x1) {
                    AMS.PoolManagement.SortMode &= ~0x1;
                    for (let pp in ptrs) {
                        let j = ptrs[pp];
                        let jstr = j.toString();
                        let thisctl = tblraw[j];

                        AMS.PoolManagement.Window.Append2Table(jstr, thisctl);
                    }
                } else {
                    AMS.PoolManagement.SortMode |= 0x1;
                    for (let pp = ptrs.length-1; pp >= 0; pp--) {
                        let j = ptrs[pp];
                        let jstr = j.toString();
                        let thisctl = tblraw[j];

                        AMS.PoolManagement.Window.Append2Table(jstr, thisctl);
                    }
                }
            }

            AMS.PoolManagement.jq_PmTable.find('.pmtd-tr').tooltip();

        },

        UpdateNodeList: function () {
            AMS.PoolManagement.jq_PmTable.find('tr').remove();

            let un_req = new AMS.API.Request({
                RawData: {
                    operation: 'poool',
                    data: {
                        op: 'info'
                    }
                },
                DoneCallback: function (parsed) {
                    let tblraw = parsed.data.table;
                    AMS.PoolManagement.TableData = tblraw;
                    AMS.PoolManagement.SortData = parsed.data.sortinfo;


                    let j = 0;
                    AMS.PoolManagement.TotalMods = 0;

                    for (let pt in tblraw) {
                        let jstr = j.toString();
                        let thisctl = tblraw[pt];

                        AMS.PoolManagement.Window.Append2Table(jstr, thisctl);

                        AMS.PoolManagement.TotalMods += thisctl.mods_count;
                        j++;
                    }

                    AMS.PoolManagement.jq_PmTable.find('.pmtd-tr').tooltip();

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