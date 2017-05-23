/**
 * Created by root on 17-5-21.
 */

AMS.UIRenderer = {
    Init: function () {
        for (let p in AMS.UIRenderer.Recipes) {
            let thisfunc = AMS.UIRenderer.Recipes[p];
            let body = $('body');

            if (AMS.UIRenderer.Recipes.hasOwnProperty(p)) {
                console.log("AMS::UIRenderer: Rendering " + p);
                let tr_ctx = thisfunc();
                body.prepend(tr_ctx[0]);
                tr_ctx[1]();

            }
        }

        $(".button-collapse").sideNav();
    },

    Recipes: {

    },

    Templates: {

    }
};