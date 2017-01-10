/**
 * Created by root on 17-1-9.
 */

function AMS_NodeManagment_OpenUI(){
    if (!AMS_User_IsLoggedIn()) {
        Materialize.toast("此功能只能在登录后使用", 3000);
        $('#ams-userlogin-window').modal('open');
    } else {
        $('#ams-nodesmanage-window').modal('open');
    }
}

function AMS_NodeManagment_UIRenderer() {


}