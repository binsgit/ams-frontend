/**
 * Created by root on 17-2-10.
 */

var supertac_tasks_table = $('#ams-mainpage-srtac-table-tbody');
var supertac_scripts_table = $('#ams-mainpage-srtac-scripts-table-tbody');
var supertac_script_editor = null;
var supertac_scripts;
var supertac_status = null;

var supertac_exec_scriptname;

var t_supertac_UpdateStatus = null;



function AMS_FwUpd_WipeScriptList() {
    supertac_scripts_table.find('tr').remove();
}

function AMS_SuperRTAC_UpdateScriptList() {

    var serialized_status_req = '{"operation":"supertac","data":{"op":"get_scripts"}}';


    AMS_FwUpd_WipeScriptList();

    $.ajax({
        async: false,
        type: "POST",
        url: __AMS_API_URL,
        data: serialized_status_req,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        error : function () {
            Materialize.toast("API请求失败：无法连接AMSD",1000);
        }
    }).done(function(data, textStatus, jqXHR){
        var parsed = JSON.parse(jqXHR.responseText);

        if (parsed.rc !== 0) {
            Materialize.toast("AMSD内部错误", 3000);
            return;
        }

        supertac_scripts = parsed.data.scripts;

        console.log(supertac_scripts);

        for (var thiscript in supertac_scripts) {
            supertac_scripts_table.append('<tr><td>' + supertac_scripts[thiscript].name + '</td><td>' +
                Reimu_Time_unix2rfc3339(supertac_scripts[thiscript].mtime) + '</td><td>' +
                '<a href="#" onclick="AMS_SuperRTAC_PrepareExec(\'' + supertac_scripts[thiscript].name +
                '\')" class="waves-effect waves-green btn-flat btn-floating">' +
                '<i class="material-icons black-text">&#xE037;</i></a>' +
                '<a href="#" onclick="AMS_SuperRTAC_OpenEditor(\'' + supertac_scripts[thiscript].name +
                '\',supertac_scripts[' + thiscript.toString() + '].content' +
                ')" class="waves-effect waves-orange btn-flat btn-floating">' +
                '<i class="material-icons black-text">&#xE3C9;</i></a>' +
                '<a href="#" onclick="AMS_SuperRTAC_DeleteScript(\'' + supertac_scripts[thiscript].name +
                '\')' + '" class="waves-effect waves-red btn-flat btn-floating">' +
                '<i class="material-icons black-text">&#xE92B;</i></a>' +
                '</td></tr>');
        }

        supertac_scripts_table.find('.tooltipped').tooltip();

    });

}

function AMS_SuperRTAC_WipeStatus() {
    supertac_tasks_table.find('tr').remove();
}

function AMS_SuperRTAC_UpdateStatus() {

    var serialized_status_req = '{"operation":"supertac","data":{"op":"tasks"}}';

    $.ajax({
        async: false,
        type: "POST",
        url: __AMS_API_URL,
        data: serialized_status_req,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        error : function () {
            Materialize.toast("API请求失败：无法连接AMSD",100);
        }
    }).done(function(data, textStatus, jqXHR){
        var parsed = JSON.parse(jqXHR.responseText);

        if (parsed.rc !== 0) {
            Materialize.toast("AMSD内部错误", 3000);
            return;
        }

        supertac_status = parsed.data.status;

        for (var thisstatus in supertac_status) {

            var tt = '<td>' + supertac_status[thisstatus].ip + '</td><td>' + supertac_status[thisstatus].script + '</td><td>' +
            Reimu_Time_unix2rfc3339(supertac_status[thisstatus].start_time) + '</td><td>' +
            supertac_status[thisstatus].msg + '</td><td>' + supertac_status[thisstatus].lastoutputline + '</td><td>' +
                '<a href="#" onclick="Materialize.toast(escapeHtml_Monospace(supertac_status[' + parseInt(thisstatus) + '].output))"' +
                ' class="waves-effect waves-green btn-flat btn-floating">' +
                '<i class="material-icons black-text">&#xE8F4;</i></a></td>';

            var ttrf = $('#srtac-task-'+supertac_status[thisstatus].uuid);

            if (ttrf.length !== 0) {
                ttrf.find('td').remove();
                ttrf.prepend(tt);
            } else {
                supertac_tasks_table.append('<tr id="srtac-task-' + supertac_status[thisstatus].uuid + '" ' +
                    '>' + tt + '</tr>');
            }

        }

    });

    t_supertac_UpdateStatus = setTimeout(AMS_SuperRTAC_UpdateStatus, 1000);

}

function AMS_SuperRTAC_OpenEditor(filename, content){

    if (!filename)
        filename = "";

    if (!content)
        content = "#!/bin/sh\necho 'Hello AMS!'\n";

    supertac_script_editor = ace.edit("ams-supertac-editor-editor");
    supertac_script_editor.setTheme("ace/theme/xcode");
    supertac_script_editor.getSession().setMode("ace/mode/sh");
    supertac_script_editor.setValue(content);

    var editor_div = $('#ams-supertac-editor-editor');

    editor_div.css("font-size", "16px");
    editor_div.addClass("monospace");

    $('#ams-supertac-editor-filename').val(filename);
    Materialize.updateTextFields();

    $('#ams-supertac-editor-window').modal('open');
}

/**
 * @return {boolean}
 */
function AMS_SuperRTAC_CommitEdit(){

    var filename = $('#ams-supertac-editor-filename').val();

    if (filename === "") {
        Materialize.toast("文件名不能为空",3000);
        return false;
    }

    var jreq = {
        operation: "supertac",
        data: {
            op: "add_script",
            name: filename,
            content: supertac_script_editor.getValue()
        }
    };

    var serialized_ce_req = JSON.stringify(jreq);

    $.ajax({
        async: false,
        type: "POST",
        url: __AMS_API_URL,
        data: serialized_ce_req,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        error : function () {
            Materialize.toast("API请求失败：无法连接AMSD",2000);
        }
    }).done(function(data, textStatus, jqXHR){
        Materialize.toast("保存成功",2000);
        $('#ams-supertac-editor-window').modal('close');
    });
}

function AMS_SuperRTAC_DeleteScript(filename){

    if (!confirm("真的要删除吗？"))
        return;

    var jreq = {
        operation: "supertac",
        data: {
            op: "del_script",
            name: filename,
        }
    };

    var serialized_ce_req = JSON.stringify(jreq);

    $.ajax({
        async: false,
        type: "POST",
        url: __AMS_API_URL,
        data: serialized_ce_req,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        error : function () {
            Materialize.toast("API请求失败：无法连接AMSD",2000);
        }
    }).done(function(data, textStatus, jqXHR){
        Materialize.toast("删除成功",2000);
        AMS_SuperRTAC_UpdateScriptList();
    });
}

function AMS_SuperRTAC_Req_Clear() {

    var serialized_clear_req = '{"operation":"supertac","data":{"op":"clear_tasks"}}';

    $.ajax({
        async: false,
        type: "POST",
        url: __AMS_API_URL,
        data: serialized_clear_req,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        error: function () {
            Materialize.toast("API请求失败：无法连接AMSD", 100);
        }
    }).done(function (data, textStatus, jqXHR) {
        Materialize.toast("请稍候…", 3000);
        AMS_SuperRTAC_WipeStatus();
    });

}

function AMS_SuperRTAC_Help_Exec(firstime) {

    var help = "帮助<br>" +
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
}

function AMS_SuperRTAC_PrepareExec(filename){
    supertac_exec_scriptname = filename;
    $('#ams-supertac-new-scriptname').text(filename);
    $('#ams-supertac-new-window').modal('open');


    if ( $.jStorage.get("AMS_3_1_HelpRead_SuperRTAC_Exec", 0) === 0 ) {
        AMS_SuperRTAC_Help_Exec(1);
        $.jStorage.set("AMS_3_1_HelpRead_SuperRTAC_Exec", 1);
    }
}

function AMS_SuperRTAC_CheckExec(){

    var ip_st = $('#ams-supertacnew-window-form-ipst').val();
    var ip_ed = $('#ams-supertacnew-window-form-iped').val();
    var ip_list = $('#ams-supertacnew-window-form-iplist').val();

    var user = $('#ams-supertacnew-window-form-user').val();
    var passwd = $('#ams-supertacnew-window-form-passwd').val();


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

    AMS_SuperRTAC_RealExec(supertac_exec_scriptname, ips, user, passwd);
}

function AMS_SuperRTAC_RealExec(scriptname, ip_array, username, passwd){

    var jreq = {
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

    var serialized_ce_req = JSON.stringify(jreq);

    $.ajax({
        async: false,
        type: "POST",
        url: __AMS_API_URL,
        data: serialized_ce_req,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        error : function () {
            Materialize.toast("API请求失败：无法连接AMSD",2000);
        }
    }).done(function(data, textStatus, jqXHR){
        Materialize.toast("请求成功",2000);
        $('#ams-supertac-new-window').modal('close');
    });
}