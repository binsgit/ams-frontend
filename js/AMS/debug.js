/**
 * Created by root on 17-1-10.
 */

var Log = {
    debug_enabled: 1,
    d: function (s) {
        if (Log.debug_enabled)
            Materialize.toast('Debug: '+s, 3000);
    }
};