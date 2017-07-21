/**
 * Created by root on 17-2-10.
 */

AMS.SuperRTAC = {

    Context: {
        TasksTable: $('#ams-window-srtac_tasks-table-tbody'),
        ScriptsTable: $('#ams-window-srtac_scripts-table-tbody'),
        ScriptsRefreshTimer: null,
        EditorSession: null,
        TargetScriptName: null
    },

    WipeScriptList: function () {
        AMS.SuperRTAC.Context.ScriptsTable.find('tr').remove();
    },

    UpdateScriptList: function () {
        AMS.SuperRTAC.WipeScriptList();

        let thisreq = new AMS.API.Request({
            RawData: {
                operation: "supertac",
                data: {
                    op: "get_scripts"
                }
            },

            DoneCallback: function (parsed) {
                let supertac_scripts = parsed.data.scripts;

                console.log(supertac_scripts);

                for (let thiscript in supertac_scripts) {
                    AMS.SuperRTAC.Context.ScriptsTable.append('<tr><td>' + supertac_scripts[thiscript].name + '</td><td>' +
                        Reimu.Time.strftime_rfc3339(supertac_scripts[thiscript].mtime) + '</td><td>' +
                        '<a href="#" onclick="AMS.SuperRTAC.PrepareExec(\'' + supertac_scripts[thiscript].name +
                        '\')" class="waves-effect waves-green btn-flat btn-floating">' +
                        '<i class="material-icons black-text">&#xE037;</i></a>' +
                        '<a href="#" onclick="AMS.SuperRTAC.OpenEditor(\'' + supertac_scripts[thiscript].name +
                        '\',supertac_scripts[' + thiscript.toString() + '].content' +
                        ')" class="waves-effect waves-orange btn-flat btn-floating">' +
                        '<i class="material-icons black-text">&#xE3C9;</i></a>' +
                        '<a href="#" onclick="AMS.SuperRTAC.DeleteScript(\'' + supertac_scripts[thiscript].name +
                        '\')' + '" class="waves-effect waves-red btn-flat btn-floating">' +
                        '<i class="material-icons black-text">&#xE92B;</i></a>' +
                        '</td></tr>');
                }

                AMS.SuperRTAC.Context.ScriptsTable.find('.tooltipped').tooltip();
            }
        });

        thisreq.Dispatch();
    },

    WipeStatus: function () {
        AMS.SuperRTAC.Context.TasksTable.find('tr').remove();
    },

    UpdateStatus: function () {
        AMS.SuperRTAC.WipeStatus();
        let thisreq = new AMS.API.Request({
            RawData: {
                operation: "supertac",
                data: {
                    op: "tasks"
                }
            },
            DoneCallback: function (parsed) {
                let supertac_status = parsed.data.status;

                for (let thisstatus in supertac_status) {

                    let tt = '<td>' + supertac_status[thisstatus].ip + '</td><td>' + supertac_status[thisstatus].script + '</td><td>' +
                        Reimu.Time.strftime_rfc3339(supertac_status[thisstatus].start_time) + '</td><td>' +
                        supertac_status[thisstatus].msg + '</td><td>' + supertac_status[thisstatus].lastoutputline + '</td><td>' +
                        '<a href="#" onclick="Materialize.toast(escapeHtml_Monospace(supertac_status[' + parseInt(thisstatus) + '].output))"' +
                        ' class="waves-effect waves-green btn-flat btn-floating">' +
                        '<i class="material-icons black-text">&#xE8F4;</i></a></td>';

                    AMS.SuperRTAC.Context.TasksTable.append('<tr id="srtac-task-' + supertac_status[thisstatus].uuid + '" ' +
                        '>' + tt + '</tr>');
                }
            }
        });
        thisreq.Dispatch();

    },

    OpenEditor: function (filename, content) {
        if (!filename)
            filename = "";

        if (!content)
            content = "#!/bin/sh\necho 'Hello AMS!'\n";

        let ed = ace.edit("ams-window-srtac_editor-editor");
        ed.setTheme("ace/theme/xcode");
        ed.getSession().setMode("ace/mode/sh");
        ed.setValue(content);

        let editor_div = $('#ams-window-srtac_editor-editor');

        editor_div.css("font-size", "16px");
        editor_div.addClass("monospace");

        $('#ams-window-srtac_editor-filename').val(filename);
        Materialize.updateTextFields();

        AMS.SuperRTAC.Context.EditorSession = ed;

        $('#ams-window-srtac_editor-window').modal('open');
    },

    CommitEdit: function () {
        let filename = $('#ams-window-srtac_editor-filename').val();

        if (filename === "") {
            Materialize.toast("文件名不能为空", 3000);
            return false;
        }


        let thisreq = new AMS.API.Request({
            RawData: {
                operation: "supertac",
                data: {
                    op: "add_script",
                    name: filename,
                    content: AMS.SuperRTAC.Context.EditorSession.getValue()
                }
            },

            DoneCallback: function (parsed) {
                Materialize.toast("保存成功", 2000);
                $('#ams-window-srtac_editor-window').modal('close');
            }
        });

        thisreq.Dispatch();
    },


    DeleteScript: function (filename) {
        if (!confirm("真的要删除吗？"))
            return;


        let thisreq = new AMS.API.Request({
            RawData: {
                operation: "supertac",
                data: {
                    op: "del_script",
                    name: filename,
                }
            },
            DoneCallback: function (parsed) {
                Materialize.toast("删除成功", 2000);
                AMS.SuperRTAC.UpdateScriptList();
            }
        });

        thisreq.Dispatch();

    },

    ClearTasks: function () {
        let thisreq = new AMS.API.Request({
            RawData: {
                operation: "supertac",
                data: {
                    op: "clear_tasks"
                }
            },
            DoneCallback: function (parsed) {
                Materialize.toast("请稍候…", 3000);
                AMS.SuperRTAC.WipeStatus();
            }
        });

        thisreq.Dispatch();
    },

    ShowHelp: function (firstime) {
        let help = "帮助<br>" +
            "<br>" +
            "如果需要在单台控制器上执行，只需要在「IP地址（起始）」里填写其 IP，<br>" +
            "其它的框全部留空即可。<br>" +
            "<br>" +
            "如果需要在 IP 为 192.168.1.50~192.168.1.100 的控制器上执行，<br>" +
            "只需要在「IP地址（起始）」里填写 192.168.1.50，在「IP地址结束」<br>" +
            "里填写 100 即可。<br>" +
            "<br>" +
            "如果需要在多个 IP 不连续的控制器上执行，请在最下面的 IP 列表里<br>" +
            "填写它们的 IP 地址，每行一个。";

        if (firstime === 1)
            help += "<br><br>" +
                "本帮助只会自动显示一次。您以后可以通过点击执行窗口右上角的「？」<br>" +
                "图标来再次查看此帮助。";

        help += "<br><br>水平滑动此 Toast 以关闭本帮助。";


        Materialize.toast(help);
    },


    PrepareExec: function (filename) {
        AMS.SuperRTAC.Context.TargetScriptName = filename;
        $('#ams-window-srtac_new-scriptname').text(filename);
        $('#ams-window-srtac_new').modal('open');

        if (!AMS.RuntimeData.SuperRTAC.HelpRead()) {
            AMS.SuperRTAC.ShowHelp(1);
            AMS.RuntimeData.SuperRTAC.HelpRead(1);
        }

    },
    
    
    CheckExec: function () {
        let ip_st = $('#ams-window-srtac_new-form-ipst').val();
        let ip_ed = $('#ams-window-srtac_new-form-iped').val();
        let ip_list = $('#ams-window-srtac_new-form-iplist').val();

        let user = $('#ams-window-srtac_new-form-user').val();
        let passwd = $('#ams-window-srtac_new-form-passwd').val();


        let tmp, tmp2;

        let ips;

        if (user === '') {
            user = null;
            passwd = null;
        }

        if ($('#ams-window-srtac_new-form-clc').prop('checked'))
            if (user === '') {
                Materialize.toast("请填写用户名", 2000);
                return;
            }

        if ($('#ams-window-srtac_new-form-range').prop('checked')) {
            if (ip_st === '' || ip_ed === '') {
                Materialize.toast("请填写完整的IP段", 2000);
                return;
            }

            // tmp = parseInt(inet_pton('AF_INET', ip_st), 16);
            //
            // if (!isInt(tmp)){
            //     Materialize.toast("IP地址格式不正确",2000);
            //     return;
            // }
            //
            // if (!((tmp > 0x01000000)&&(tmp < 0xe0000000))) {
            //     Materialize.toast("IP地址数值错误",2000);
            //     return;
            // }
            //
            // tmp = parseInt(ip_st.split(".")[3]);
            //
            //
            // if ( (ip_ed <= tmp) || (parseInt(ip_ed) > 254) || (!isInt(ip_ed)) ) {
            //     Materialize.toast("IP段结尾只能填写" + (tmp+1).toString() + "~254",2000);
            //     return;
            // }

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

        AMS.SuperRTAC.RealExec(AMS.SuperRTAC.Context.TargetScriptName, ips, user, passwd);
    },
    
    
    RealExec: function (scriptname, ip_array, username, passwd) {
        let jreq = {
            operation: "supertac",
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


        let thisreq = new AMS.API.Request({
            RawData: jreq,
            DoneCallback: function (parsed) {
                Materialize.toast("请求成功",2000);
                $('#ams-window-srtac_new').modal('close');
            }
        });

        thisreq.Dispatch();
    }
};