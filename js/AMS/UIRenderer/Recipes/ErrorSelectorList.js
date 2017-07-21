/**
 * Created by root on 17-5-21.
 */

AMS.UIRenderer.Recipes.ErrorSelectorList = function () {
    let ret = '';

    let recipe_warn = {
        ul: {
            id: "ams-ulist-issues-warning",
            class: "dropdown-content",
            __Next: []
        }
    };

    let recipe_crit = {
        ul: {
            id: "ams-ulist-issues-critical",
            class: "dropdown-content",
            __Next: []
        }
    };

    let e = AMS.Issues.AvalonErrNum;

    let list_contents_warn = [
        [e.Error_WU, "&#xE8B2;", "WU异常"],
        [e.Error_MW, "&#xE8B2;", "MW异常"],
        [e.CRCFailed, "&#xE01E;", "CRC异常"],
        [e.Error_DH, "&#xE8E5;", "DH过高"],
        [e.HotBefore, "&#xE80E;", "曾经温度过高"],
        [e.InvalidPMU, "&#xE0DB;", "没有检测到PMU"],
        [e.NTCErr, "&#xE8E1;", "PMU温度传感异常"],
        [e.PGFailed, "&#xE3E6;", "供电异常"],
        [e.VolErr, "&#xE3E6;", "模组电压输入异常"],
        [e.VCoreErr, "&#xE3E6;", "模组电压输出异常"],

    ];

    let list_contents_crit = [
        [e.Idle, "&#xE068;", "空闲"],
        [e.NoFan, "&#xE332;", "无风扇"],
        [e.TooHot, "&#xE80E;", "温度过高"]
    ];

    for (let pt in list_contents_warn) {
        let tl = list_contents_warn[pt];
        recipe_warn.ul.__Next.push({
            li:{
                __Next: {
                    a: {
                        href: '#',
                        onclick: 'AMS.Issues.UI.SetFilterMode(' + tl[0].toString() + ')',
                        __Next: [
                            {
                                i: {
                                    class: 'material-icons left',
                                    __Next: tl[1]
                                }
                            },
                            tl[2]
                        ]
                    },

                }
            }
        })
    }

    for (let pt in list_contents_crit) {
        let tl = list_contents_crit[pt];
        recipe_crit.ul.__Next.push({
            li:{
                __Next: {
                    a: {
                        href: '#',
                        onclick: 'AMS.Issues.UI.SetFilterMode(' + tl[0].toString() + ')',
                        __Next: [
                            {
                                i: {
                                    class: 'material-icons left',
                                    __Next: tl[1]
                                }
                            },
                            tl[2]
                        ]
                    },

                }
            }
        })
    }

    ret = Reimu.Html.Renderer(recipe_warn);
    ret += Reimu.Html.Renderer(recipe_crit);


    let postrender_func = function () {

    };

    return [ret, postrender_func];
};