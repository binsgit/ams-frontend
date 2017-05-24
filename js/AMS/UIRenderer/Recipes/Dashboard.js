/**
 * Created by root on 17-5-24.
 */

AMS.UIRenderer.Recipes.Dashboard = function () {

    let thlist_bm = [];
    let thname_bm = [
        ["ip", "控制器"],  ["auc", "AUC"], ["module", "Module"], ["dna", "DNA"], ["errs", "故障内容"]
    ];

    for (let p in thname_bm) {
        let thisth = thname_bm[p];
        thlist_bm.push({
            th: {
                "data-field": "ams-dashboard-badmachines-table-th-" + thisth[0],
                __Next: thisth[1]
            }
        })
    }

    let recipe = {
        div: {
            id: "ams-dashboard",
            class: "row",
            __Next: [
                {
                    div: {
                        class: "col s12 m12 l6",
                        __Next: [
                            {
                                div: {
                                    class: "col s12 m12 l12",
                                    __Next: {
                                        div: {
                                            class: "card hoverable",
                                            __Next: {
                                                div: {
                                                    class: "card-content",
                                                    __Next: [
                                                        {
                                                            span: {
                                                                class: "card-title",
                                                                __Next: "场地概况"
                                                            },
                                                            br: {}
                                                        },
                                                        {
                                                            br: {},
                                                            div: {
                                                                class: "ams-maparea",
                                                                id: "ams-dashboard-maparea"
                                                            }
                                                        }
                                                    ]
                                                }
                                            }
                                        }
                                    }
                                }
                            },
                            {
                                div: {
                                    class: "col s12 m12 l12",
                                    __Next: {
                                        div: {
                                            class: "card hoverable",
                                            __Next: {
                                                div: {
                                                    class: "card-content",
                                                    __Next: [
                                                        {
                                                            span: {
                                                                class: "card-title",
                                                                __Next: "算力"
                                                            },
                                                            div: {
                                                                id: "ams-dashboard-hashrate-loading",
                                                                class: "ams-maparea"
                                                            },
                                                            canvas: {
                                                                id: "ams-dashboard-hashrate-chart",
                                                                width: "auto",
                                                                height: "140%"
                                                            }
                                                        }
                                                    ]
                                                }
                                            }
                                        }
                                    }
                                }
                            },
                            {
                                div: {
                                    class: "col s12 m12 l12",
                                    __Next: {
                                        div: {
                                            class: "card hoverable",
                                            __Next: {
                                                div: {
                                                    class: "card-content",
                                                    __Next: [
                                                        {
                                                            span: {
                                                                class: "card-title",
                                                                __Next: "工作正常的设备数量"
                                                            },
                                                            div: {
                                                                id: "ams-dashboard-aliverate-loading",
                                                                class: "ams-maparea"
                                                            },
                                                            canvas: {
                                                                id: "ams-dashboard-aliverate-chart",
                                                                width: "auto",
                                                                height: "140%"
                                                            }
                                                        }
                                                    ]
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        ]
                    }
                },
                {
                    div: {
                        class: "col s12 m12 l6",
                        __Next: {
                            div: {
                                class: "card hoverable",
                                __Next: {
                                    div: {
                                        class: "card-content",
                                        __Next: [
                                            {
                                                span: {
                                                    class: "card-title",
                                                    __Next: "故障列表"
                                                },
                                                br: {},
                                                a: {
                                                    href: "#",
                                                    class: "waves-effect waves-orange btn-flat",
                                                    onclick: "", // TODO
                                                    __Next: "全部"
                                                }
                                            },
                                            {
                                                a: {
                                                    href: "#",
                                                    class: "waves-effect waves-red btn-flat",
                                                    "data-activates": "ams-ulist-badmachines-critical",
                                                    __Next: [
                                                        "严重警告",
                                                        {
                                                            i: {
                                                                class: "material-icons right",
                                                                __Next: "&#xE313;"
                                                            }
                                                        }
                                                    ]
                                                }
                                            },
                                            {
                                                a: {
                                                    href: "#",
                                                    class: "waves-effect waves-yellow btn-flat",
                                                    "data-activates": "ams-ulist-badmachines-warning",
                                                    __Next: [
                                                        "一般警告",
                                                        {
                                                            i: {
                                                                class: "material-icons right",
                                                                __Next: "&#xE313;"
                                                            }
                                                        }
                                                    ]
                                                },
                                                div: {
                                                    class: "divider grey lighten-2"
                                                },
                                                table: {
                                                    class: "highlight",
                                                    __Next: {
                                                        thead: {
                                                            __Next: {
                                                                tr: {
                                                                    __Next: thlist_bm
                                                                }
                                                            }
                                                        },
                                                        tbody: {
                                                            id: "ams-dashboard-badmachines-table-tbody"
                                                        }
                                                    }
                                                }
                                            }
                                        ]
                                    }
                                }
                            }
                        }
                    }
                }
            ]
        }
    };

    let ret = Reimu.Html.Renderer(recipe);

    let postrender_func = function () {

    };

    return [ret, postrender_func];


};
