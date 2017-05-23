/**
 * Created by root on 16-12-28.
 */

let AMS = {

};

AMS.Init = function () {
    AMS.Version.Init();
    AMS.UIRenderer.Init();
    AMS.User.UpdateSideBar();

    AMS.NavBar.Context.InfoUpdaterTimer = setTimeout(AMS.NavBar.UpdateInfo, 10000);

    AMS.Charts.Update.All();
};