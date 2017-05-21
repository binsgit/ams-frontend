/**
 * Created by root on 17-5-21.
 */

AMS.UIRenderer = {
    Init: function () {
        for (let p in AMS.UIRenderer) {
            let thisfunc = AMS.UIRenderer[p];
            let body = $('body');

            if (AMS.UIRenderer.hasOwnProperty(thisfunc)) {
                if (thisfunc !== AMS.UIRenderer.Init) {
                    body.prepend(thisfunc());
                }
            }

        }
    }
};