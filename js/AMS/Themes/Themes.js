
AMS.Themes = {
    ThemeList: [
        {
            Name: "蓝色",
            PreviewColor: "#1E88E5",
            NavBar: {
                Background: "light-blue",
                Text: "white-text"
            },
            SideBar: {
                OverAll: "white-text blue darken-1",
                UserInfo: {
                    Background: "blue darken-2",
                    Text: "white-text"
                },
                Entry: {
                    Text: "white-text msyh",
                    Icon: "white-text"
                },
                Divider: {
                    Line: "blue darken-3",
                    Text: "white-text text-darken-1"
                }
            }
        },
        {
            Name: "粉色",
            PreviewColor: "#f06292",
            NavBar: {
                Background: "pink lighten-1",
                Text: "white-text"
            },
            SideBar: {
                OverAll: "white-text pink lighten-1",
                UserInfo: {
                    Background: "pink",
                    Text: "white-text"
                },
                Entry: {
                    Text: "white-text msyh",
                    Icon: "white-text"
                },
                Divider: {
                    Line: "pink darken-3",
                    Text: "white-text text-darken-1"
                }
            }
        },
        {
            Name: "Miku",
            PreviewColor: "#00bfa5",
            NavBar: {
                Background: "teal accent-4",
                Text: "white-text"
            },
            SideBar: {
                OverAll: "white-text teal accent-4",
                UserInfo: {
                    Background: "teal",
                    Text: "white-text"
                },
                Entry: {
                    Text: "white-text msyh",
                    Icon: "white-text"
                },
                Divider: {
                    Line: "teal darken-3",
                    Text: "white-text text-darken-1"
                }
            }
        }
    ],

    Window: {
        OpenUI: function () {
            $('#ams-window-themes').modal('open');
        }
    },

    CurrentTheme: function () {
        return AMS.Themes.ThemeList[AMS.RuntimeData.Theme.CurrentTheme()];
    },

    SetTheme: function (n) {
        AMS.RuntimeData.Theme.CurrentTheme(n);
        location.reload();
    }
};