/**
 * Created by root on 17-5-21.
 */

AMS.RuntimeData = {

    StorageManipulate: function(key, val) {
        if (val)
            $.jStorage.set(key, val);
        else if (val === null)
            $.jStorage.deleteKey(key);
        else
            return $.jStorage.get(key, undefined);
    },

    API: {
        URL: function(s) {
            return AMS.RuntimeData.StorageManipulate("AMS_3_2_RuntimeData_API_URL", s);
        }
    },

    User: {
        LoginName: function(s) {
            return AMS.RuntimeData.StorageManipulate("AMS_3_2_RuntimeData_User_LoginName", s);
        },

        Token: function(s) {
            return AMS.RuntimeData.StorageManipulate("AMS_3_2_RuntimeData_User_Token", s);
        }
    },

    Theme: {
        CurrentTheme: function (s) {
            let thm = AMS.RuntimeData.StorageManipulate("AMS_3_2_RuntimeData_Theme_CurrentTheme", s);

            return thm ? thm : 0;
        }
    },

    SuperRTAC: {
        HelpRead: function (s) {
            return AMS.RuntimeData.StorageManipulate("AMS_3_2_SuperRTAC_HelpRead", s);
        }
    }
};