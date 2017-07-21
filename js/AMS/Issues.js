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

        $('.amscustdpd').dropdown({
            belowOrigin: true
        });
    },

    UI: {
        SetFilterMode: function (m) {
            AMS.Issues.TableFilterMode = m;
            AMS.Issues.UI.Update();
        },
        Append: function (ip,port,auc,module,dna,err) {
            AMS.Issues.jq_TableBody.append('<tr onclick="AMS.NodeDetails.OpenPage(\''+ip+'\','+port+');">'+
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
                            continue;
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