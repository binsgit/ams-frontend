/**
 * Created by root on 17-1-3.
 */

AMS.Issues = {

    tm_UpdateIssues: null,

    jq_TableBody: null,
    TableFilterMode: null,

    AvalonErrNum: {
        Idle: 1, CRCFailed: 2, NoFan: 4, Lock: 8, APIFIFOverflow: 16, RBOverflow: 32, TooHot: 64, HotBefore: 128,
        LoopFailed: 256, CoreTestFailed: 512, InvalidPMU: 1024, PGFailed: 2048, NTCErr: 4096, VolErr: 8192,
        VCoreErr: 16384, PMUCrcFailed: 32768, InvalidPLLValue: 65536,
        Error_WU: 0x20000, Error_MW: 0x40000, Error_CRC: 0x80000, Error_DH: 0x100000
    },

    Init: function () {
        AMS.Issues.jq_TableBody = $("#ams-dashboard-issues-table-tbody");
        // AMS.Issues.UI.Update();
        AMS.Issues.tm_UpdateIssues = setInterval(AMS.Issues.UI.Update(), 60*1000);
    },

    UI: {
        SetFilterMode: function (m) {
            AMS.Issues.TableFilterMode = m;
            AMS.Issues.UI.Update();
        },
        Append: function (ip,port,auc,module,dna,err) {
            AMS.Issues.jq_TableBody.append('<tr onclick="AMS_NodeDetails_Inline(\''+ip+'\','+port+');">'+
                '<td>'+ip+':'+port+'</td><td>'+auc+'</td><td>'+module+'</td>'+'<td>'+dna+'</td>'+'<td>'+err+'</td></tr>');
        },
        AppendNode: function (ip,port,err) {
            AMS.Issues.UI.Append(ip,port,"-","-","-",err);
        },

        Flush: function () {
            AMS.Issues.jq_TableBody.find('tr').remove();
        },

        Update: function () {
            let updreq = new AMS.API.Request({
                RawData: {
                    operation: 'issues',
                    data: {

                    }
                },
                ErrorCallback: function () {

                },
                DoneCallback: function (parsed) {
                    let retdata = parsed.data;
                    let issues = retdata.issues;

                    AMS.Issues.UI.Flush();

                    // Connection failed nodes

                    for (let pissue in issues) {
                        if (AMS.Issues.TableFilterMode && !(issues[pissue].echu_ored & AMS.Issues.TableFilterMode)) {
                            return;
                        }

                        if (issues[pissue].type === 0x20)
                            AMS.Issues.UI.Append(issues[pissue].ip,issues[pissue].port, issues[pissue].auc_id, issues[pissue].mod_id, issues[pissue].dna, issues[pissue].msg);
                        else
                            AMS.Issues.UI.AppendNode(issues[pissue].ip,issues[pissue].port, issues[pissue].msg);
                    }

                }
            });

            updreq.Dispatch();

        }
    }
};

var __AMS_Issues_Table_FilterMode = -1;
var __AMS_Issues_RefreshTimer = null;

function AMS_Issues_ApplyFilterMode(m) {
    __AMS_Issues_Table_FilterMode=m;
    AMS_Issues_Update();
}


function AMS_Issues_Update(){

    if (__AMS_Issues_RefreshTimer) {
        clearTimeout(__AMS_Issues_RefreshTimer);
        __AMS_Issues_RefreshTimer = null;
    }

    Reimu_ToogleCardTitleLoadingIcon('ams-mainpage-issues-title-loading',true);

    $.ajax({
        async: true,
        type: "POST",
        url: __AMS_API_URL,
        data: '{"operation": "issues", "data": {}}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        error : function (data, textStatus, jqXHR) {
            Reimu_ToogleCardTitleLoadingIcon('ams-mainpage-issues-title-loading',false);
        }
    }).done(function(data, textStatus, jqXHR){
        var ret = JSON.parse(jqXHR.responseText);
        var retdata = ret.data;
        var issues = retdata.issues;

        AMS_Issues_Table_Flush();

        // Connection failed nodes

        for (var pissue in issues) {
            if (issues[pissue].type === 0x20)
                AMS_Issues_Table_Append(issues[pissue].ip,issues[pissue].port, issues[pissue].auc_id, issues[pissue].mod_id, issues[pissue].dna, issues[pissue].msg);
            else
                AMS_Issues_Table_Append_Node(issues[pissue].ip,issues[pissue].port, issues[pissue].msg);
        }

        Reimu_ToogleCardTitleLoadingIcon('ams-mainpage-issues-title-loading',false);


    });

    __AMS_Issues_RefreshTimer = setTimeout(AMS_Issues_Update, 60000);
}