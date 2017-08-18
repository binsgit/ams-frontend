/**
 * Created by root on 17-8-8.
 */


AMS.NodeScanner = {

    Init: function () {
        AMS.NodeScanner.jq_Window = $('#ams-window-nodescanner');

        AMS.NodeScanner.jq_ipst = AMS.NodeScanner.jq_Window.find('#ip_st');
        AMS.NodeScanner.jq_iped = AMS.NodeScanner.jq_Window.find('#ip_ed');

        AMS.NodeScanner.jq_StatusWindow = $('#ams-window-nodescanstatus');

        AMS.NodeScanner.jq_ipcur = AMS.NodeScanner.jq_StatusWindow.find('#ip_cur');
        AMS.NodeScanner.jq_pp = AMS.NodeScanner.jq_StatusWindow.find('#progress-percent');
        AMS.NodeScanner.jq_pbar = AMS.NodeScanner.jq_StatusWindow.find('.progress').find('div');
        AMS.NodeScanner.jq_found = AMS.NodeScanner.jq_StatusWindow.find('#found-ctls-cnt');

        AMS.NodeScanner.jq_ResultsWindow = $('#ams-window-nodescanresult');
        AMS.NodeScanner.jq_rwtbl = AMS.NodeScanner.jq_ResultsWindow.find('#nsr-table-tbody');

        AMS.NodeScanner.jq_rw_selall = AMS.NodeScanner.jq_ResultsWindow.find('#nsr-selall-cb');
        AMS.NodeScanner.jq_rw_selsanae = AMS.NodeScanner.jq_ResultsWindow.find('#sel-sanae');
        AMS.NodeScanner.jq_rw_selreimu = AMS.NodeScanner.jq_ResultsWindow.find('#sel-reimu');
    },

    Queue: {

        TotalCount: 0,
        SelectedCount: 0,

        SanaeSelectedCount: 0,
        ReimuSelectedCount: 0,

        SanaeArray: [], // ip, sel
        ReimuArray: [],


        ToggleSingle: function (ctx) {
            let jqctx = $(ctx);
            let type = parseInt(jqctx.data('owo'));
            let id = parseInt(jqctx.data('oqo'));

            if (ctx.checked) {
                AMS.NodeScanner.Queue.SelectedCount++;
                if (type === 1) {
                    AMS.NodeScanner.Queue.SanaeSelectedCount++;
                    AMS.NodeScanner.Queue.SanaeArray[id][1] = true;
                    if (AMS.NodeScanner.Queue.SanaeSelectedCount === AMS.NodeScanner.Queue.SanaeArray.length)
                        AMS.NodeScanner.jq_rw_selsanae.prop('checked', true);
                } else if (type === 2) {
                    AMS.NodeScanner.Queue.ReimuSelectedCount++;
                    AMS.NodeScanner.Queue.ReimuArray[id][1] = true;
                    if (AMS.NodeScanner.Queue.ReimuSelectedCount === AMS.NodeScanner.Queue.ReimuArray.length)
                        AMS.NodeScanner.jq_rw_selreimu.prop('checked', true);
                }
            } else {
                AMS.NodeScanner.Queue.SelectedCount--;
                if (type === 1) {
                    AMS.NodeScanner.Queue.SanaeSelectedCount--;
                    AMS.NodeScanner.Queue.SanaeArray[id][1] = false;
                    AMS.NodeScanner.jq_rw_selsanae.prop('checked', false);
                } else if (type === 2) {
                    AMS.NodeScanner.Queue.ReimuSelectedCount--;
                    AMS.NodeScanner.Queue.ReimuArray[id][1] = false;
                    AMS.NodeScanner.jq_rw_selreimu.prop('checked', false);
                }
            }

            if (AMS.NodeScanner.Queue.SelectedCount === AMS.NodeScanner.Queue.TotalCount) {
                AMS.NodeScanner.jq_rw_selall.prop('checked', true);
            } else {
                AMS.NodeScanner.jq_rw_selall.prop('checked', false);
            }
        },

        ToggleAll: function (sel) {
            AMS.NodeScanner.jq_rwtbl.find('.CbInTbl').prop('checked', sel);
            AMS.NodeScanner.jq_rw_selsanae.prop('checked', sel);
            AMS.NodeScanner.jq_rw_selreimu.prop('checked', sel);

            for (let p in AMS.NodeScanner.Queue.SanaeArray) {
                AMS.NodeScanner.Queue.SanaeArray[p][1] = sel;
            }

            for (let p in AMS.NodeScanner.Queue.ReimuArray) {
                AMS.NodeScanner.Queue.ReimuArray[p][1] = sel;
            }

            if (sel) {
                AMS.NodeScanner.Queue.SelectedCount = AMS.NodeScanner.Queue.TotalCount;
                AMS.NodeScanner.Queue.SanaeSelectedCount = AMS.NodeScanner.Queue.SanaeArray.length;
                AMS.NodeScanner.Queue.ReimuSelectedCount = AMS.NodeScanner.Queue.ReimuArray.length;
            } else
                AMS.NodeScanner.Queue.SanaeSelectedCount = AMS.NodeScanner.Queue.ReimuSelectedCount =
                    AMS.NodeScanner.Queue.SelectedCount = 0;

        },

        ToggleSanae: function (sel) {
            AMS.NodeScanner.jq_rwtbl.find('.sanae').find('.CbInTbl').prop('checked', sel);

            if (sel) {
                if (AMS.NodeScanner.jq_rw_selreimu.prop('checked'))
                    AMS.NodeScanner.jq_rw_selall.prop('checked', true);
                AMS.NodeScanner.Queue.SanaeSelectedCount = AMS.NodeScanner.Queue.SelectedCount = AMS.NodeScanner.Queue.SanaeArray.length;
            } else {
                AMS.NodeScanner.jq_rw_selall.prop('checked', false);
                AMS.NodeScanner.Queue.SanaeSelectedCount = AMS.NodeScanner.Queue.SelectedCount = 0;
            }



            for (let p in AMS.NodeScanner.Queue.SanaeArray) {
                AMS.NodeScanner.Queue.SanaeArray[p][1] = sel;
            }

            for (let p in AMS.NodeScanner.Queue.ReimuArray) {
                if (AMS.NodeScanner.Queue.ReimuArray[p][1])
                    AMS.NodeScanner.Queue.SelectedCount++;
            }

        },

        ToggleReimu: function (sel, n) {

            AMS.NodeScanner.jq_rwtbl.find('.reimu').find('.CbInTbl').prop('checked', sel);

            if (sel) {
                if (AMS.NodeScanner.jq_rw_selsanae.prop('checked'))
                    AMS.NodeScanner.jq_rw_selall.prop('checked', true);
                AMS.NodeScanner.Queue.ReimuSelectedCount = AMS.NodeScanner.Queue.SelectedCount =
                    AMS.NodeScanner.Queue.ReimuArray.length;
            } else {
                AMS.NodeScanner.jq_rw_selall.prop('checked', false);
                AMS.NodeScanner.Queue.ReimuSelectedCount = AMS.NodeScanner.Queue.SelectedCount = 0;
            }

            for (let p in AMS.NodeScanner.Queue.ReimuArray) {
                AMS.NodeScanner.Queue.ReimuArray[p][1] = sel;
            }

            for (let p in AMS.NodeScanner.Queue.SanaeArray) {
                if (AMS.NodeScanner.Queue.SanaeArray[p][1])
                    AMS.NodeScanner.Queue.SelectedCount++;
            }
        },

        ApplyChanges: function () {

            if (!AMS.NodeScanner.Queue.SelectedCount) {
                Materialize.toast('请选择控制器！', 3000);
                return;
            }

            Materialize.toast('正在处理，请稍候……', undefined, 'amsnsaplst');

            if (AMS.NodeScanner.Queue.SanaeSelectedCount) {

                let ctls = [];

                for (let p in AMS.NodeScanner.Queue.SanaeArray) {
                    if (AMS.NodeScanner.Queue.SanaeArray[p][1])
                        ctls.push({
                            ip: AMS.NodeScanner.Queue.SanaeArray[p][0],
                            port: 4028
                        });
                }

                console.log('Will add:');
                console.log(ctls);

                let thisaddreq = new AMS.API.Request({
                    RawData: {
                        operation: "controller",
                        data: {
                            op: "add",
                            controllers: ctls
                        }
                    },
                    Blocking: true,
                    DoneCallback: function (parsed) {

                    }
                });

                thisaddreq.Dispatch();
            }


            if (AMS.NodeScanner.Queue.ReimuSelectedCount) {
                let ctls = [];

                for (let p in AMS.NodeScanner.Queue.ReimuArray) {
                    if (AMS.NodeScanner.Queue.ReimuArray[p][1])
                        ctls.push({
                            ip: AMS.NodeScanner.Queue.ReimuArray[p][0],
                            port: 4028
                        });
                }

                console.log('Will delete:');
                console.log(ctls);

                let thisdelreq = new AMS.API.Request({
                    RawData: {
                        operation: "controller",
                        data: {
                            op: "del",
                            controllers: ctls
                        }
                    },
                    Blocking: true,
                    DoneCallback: function (parsed) {

                    }
                });

                thisdelreq.Dispatch();

            }

            Materialize.toast('处理完毕', 3000);

            let toastElement = $('.amsnsaplst').first()[0];
            toastElement.remove();

            AMS.NodeManagement.Window.UpdateNodeList();
            AMS.NodeScanner.jq_ResultsWindow.modal('close');


        }

    },


    Window: {
        StartScan: function () {
            let ipst = AMS.NodeScanner.jq_ipst.val();
            let iped = AMS.NodeScanner.jq_iped.val();

            if (!ipst.length || !iped.length) {
                Materialize.toast("请填写起始地址与结束地址！", 3000);
                return;
            }

            if (ipst === iped) {
                Materialize.toast("起始地址与结束地址不能相同！", 3000);
                return;
            }

            if (!Reimu.Inet.isValidV4Addr(ipst)) {
                Materialize.toast("起始地址格式错误！", 3000);
                return;
            }

            if (!Reimu.Inet.isValidV4Addr(ipst)) {
                Materialize.toast("结束地址格式错误！", 3000);
                return;
            }

            AMS.NodeScanner.jq_rwtbl.find('tr').remove();

            let thisreq = new AMS.API.Request({
                RawData: {
                    operation: 'ctl_scanner',
                    data: {
                        op: 'scan',
                        ip_st: ipst,
                        ip_ed: iped
                    }
                },
                DoneCallback: function () {
                    Materialize.toast("搜索任务已提交", 3000);
                    AMS.NodeScanner.jq_Window.modal('close');
                    AMS.NodeScanner.jq_StatusWindow.modal('open');
                    AMS.NodeScanner.tm_SWUpdate = setInterval(AMS.NodeScanner.Window.UpdateScanStatus, 1300);
                },
                ErrorCallback: function (parsed) {
                    if (parsed.rc === 666) {
                        Materialize.toast("当前有正在执行的搜索任务！", 3000);
                    } else if (parsed.rc === 233) {
                        Materialize.toast("IP地址段填写错误！", 3000);
                    } else {
                        Materialize.toast("未知错误："+parsed.rc.toString(), 3000);
                    }
                }
            });

            thisreq.Dispatch();

        },

        UpdateScanStatus: function () {
            let thisreq = new AMS.API.Request({
                RawData: {
                    operation: 'ctl_scanner',
                    data: {
                        op: 'status'
                    }
                },
                DoneCallback: function (parsed) {
                    let scan_status = parsed.data.scan_status;

                    if (!scan_status) {
                        clearInterval(AMS.NodeScanner.tm_SWUpdate);
                        AMS.NodeScanner.Window.UpdateScanResults();
                        AMS.NodeScanner.jq_StatusWindow.modal('close');
                        AMS.NodeScanner.jq_ResultsWindow.modal('open');
                    }

                    let lastip = parsed.data.lastip;
                    let cuccnt = parsed.data.cuccnt;
                    let ccnt = parsed.data.ccnt;
                    let valid_cnt = parsed.data.valid_cnt;
                    let percent = cuccnt/ccnt;
                    percent *= 100;
                    percent = percent.toFixed(1);

                    AMS.NodeScanner.jq_pp.text(percent.toString()+'% ('+cuccnt.toString()+'/'+ccnt.toString()+')');
                    AMS.NodeScanner.jq_ipcur.text(lastip);
                    AMS.NodeScanner.jq_pbar.css('width', percent.toString()+'%');
                    AMS.NodeScanner.jq_found.text(valid_cnt.toString());

                },
                ErrorCallback: function (parsed) {
                    Materialize.toast("未知错误："+parsed.rc.toString(), 3000);

                }
            });

            thisreq.Dispatch();

        },

        UpdateScanResults: function () {
            let thisreq = new AMS.API.Request({
                RawData: {
                    operation: 'ctl_scanner',
                    data: {
                        op: 'result'
                    }
                },
                DoneCallback: function (parsed) {
                    let origlist = AMS.NodeManagement.StaticRes.NodeArray;
                    let newlist = parsed.data.results;

                    let added = [];
                    let removed = [];
                    let unchanged = [];

                    for (let p in newlist) {
                        let thisnode = newlist[p];

                        if (origlist.indexOf(thisnode) === -1)
                            added.push(thisnode);
                        else
                            unchanged.push(thisnode);
                    }

                    for (let p in origlist) {
                        let thisnode = origlist[p];

                        if (newlist.indexOf(thisnode) === -1)
                            removed.push(thisnode);
                    }

                    AMS.NodeScanner.Queue.SanaeArray = [];
                    AMS.NodeScanner.Queue.ReimuArray = [];

                    for (let p in added) {
                        AMS.NodeScanner.Queue.SanaeArray.push([added[p], true]);
                        AMS.NodeScanner.Window.Append2ScanResult(1, added[p], p);
                    }

                    for (let p in removed) {
                        AMS.NodeScanner.Queue.ReimuArray.push([removed[p], true]);
                        AMS.NodeScanner.Window.Append2ScanResult(2, removed[p], p);
                    }

                    AMS.NodeScanner.Queue.TotalCount = AMS.NodeScanner.Queue.SelectedCount = added.length + removed.length;
                    AMS.NodeScanner.Queue.ReimuSelectedCount = removed.length;
                    AMS.NodeScanner.Queue.SanaeSelectedCount = added.length;

                    // for (let p in unchanged) {
                    //     AMS.NodeScanner.Window.Append2ScanResult(3, unchanged[p]);
                    // }

                }
            });

            thisreq.Dispatch();
        },

        Append2ScanResult: function (type, ip, id) {
            let tstr;
            let cstr;


            if (type === 1) {
                tstr = '新增';
                cstr = 'green lighten-4 sanae';
            } else if (type === 2) {
                tstr = '缺失';
                cstr = 'red lighten-4 reimu';
            } else if (type === 3)
                tstr = '相同';

            let idstr = 'rwtbl-sel-' + type.toString() + '-' + id.toString();

            AMS.NodeScanner.jq_rwtbl.append('<tr class="'+cstr+'">' +
                '<td class="pmtd-sel">' +
                '<input type="checkbox" id="'+idstr+'" checked class="filled-in CbInTbl" ' +
                'onclick="AMS.NodeScanner.Queue.ToggleSingle(this)" data-owo="'+type.toString()+'" data-oqo="'+id.toString()+'">' +
                '<label for="'+idstr+'" class="CbLblInTbl"></label></td>' +
                '</td>' +
                '<td>' + tstr + '</td>' +
                '<td>' + ip + '</td>' +
                '</tr>');
        }

    }

};