
AMS.Themes = {
    ThemeList: [
        {
            Name: "Blue",
            PreviewColor: "#1E88E5",
            NavBar: {
                Background: "light-blue",
                Text: "white-text"
            },
            SideBar: {
                OverAll: "white-text blue darken-1",
                Entry: {
                    Text: "white-text msyh",
                    Icon: "white-text"
                },
                Divider: {
                    Line: "blue darken-3",
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
    }
};