/**
 * Created by root on 17-5-18.
 */

class RuntimeData {
    constructor() {

    }

    static StorageManipulate(key, val) {
        if (val)
            $.jStorage.set(key, val);
        else if (val === null)
            $.jStorage.deleteKey(key);
        else
            return $.jStorage.get(key, undefined);
    }

    static get API() {
        return class {
            static URL(s) {
                return RuntimeData.StorageManipulate("AMS_3_2_RuntimeData_API_URL", s);
            }
        }
    }

    static get User(){
        return class {
            static LoginName(s) {
                return RuntimeData.StorageManipulate("AMS_3_2_RuntimeData_User_LoginName", s);
            }

            static Token(s) {
                return RuntimeData.StorageManipulate("AMS_3_2_RuntimeData_User_Token", s);
            }


        };
    }
}

