/**
 * Created by root on 17-5-23.
 */

AMS.UIRenderer.Templates.LoadingSpinner = class {
    constructor(jq_ctx, div_id, div_trailing, attrib){
        this.RenderedHtml = '<div id="'+ div_id + '" ' + div_trailing + '>' +
            AMS.UIRenderer.Templates.LoadingSpinner.Raw(attrib) + '</div>';

        this.jq_ctx = jq_ctx;
        this.div_id = div_id;
        this.Attributes = attrib;

    }

    static Raw(attrib){
        let ret = '<div class="preloader-wrapper big active">' +
            '<div class="spinner-layer spinner-blue">' +
            '<div class="circle-clipper left">' +
            '<div class="circle"></div>' +
            '</div><div class="gap-patch">' +
            '<div class="circle"></div>' +
            '</div><div class="circle-clipper right">' +
            '<div class="circle"></div>' +
            '</div>' +
            '</div>' +
            '<div class="spinner-layer spinner-red">' +
            '<div class="circle-clipper left">' +
            '<div class="circle"></div>' +
            '</div><div class="gap-patch">' +
            '<div class="circle"></div>' +
            '</div><div class="circle-clipper right">' +
            '<div class="circle"></div>' +
            '</div>' +
            '</div>' +
            '<div class="spinner-layer spinner-yellow">' +
            '<div class="circle-clipper left">' +
            '<div class="circle"></div>' +
            '</div><div class="gap-patch">' +
            '<div class="circle"></div>' +
            '</div><div class="circle-clipper right">' +
            '<div class="circle"></div>' +
            '</div>' +
            '</div>' +
            '<div class="spinner-layer spinner-green">' +
            '<div class="circle-clipper left">' +
            '<div class="circle"></div>' +
            '</div><div class="gap-patch">' +
            '<div class="circle"></div>' +
            '</div><div class="circle-clipper right">' +
            '<div class="circle"></div>' +
            '</div>' +
            '</div>' +
            '</div>';

        return ret;
    }

    Show(){
        this.jq_ctx.prepend(this.RenderedHtml);
    }

    Hide(){
        $('#'+this.div_id).remove();
    }

};