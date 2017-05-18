/**
 * Created by root on 17-5-18.
 */

class RuntimeData {
    constructor() {

    }
}

RuntimeData.User = class {
    static LoginName(s) {
        let thisKey = "AMS_3_2_RuntimeData_User_LoginName";
        if (s)
            $.jStorage.set(thisKey, s);
        else if (s === null)
            $.jStorage.deleteKey(thisKey);
        else
            return $.jStorage.get(thisKey, undefined);
    }
};

let miao = RuntimeData.User.LoginName();