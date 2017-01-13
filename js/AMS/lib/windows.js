/**
 * Created by root on 17-1-5.
 * @return {string}
 * @return {string}
 */

function AMS_Windows_FullDomId(domid){
    return "ams-dynamic-window-" + domid;
}

function AMS_Windows_Add(domid,appearance,caption,innerhtml) {

    var classes = "modal";

    if (appearance==="big") {
        classes += " modal-fixed-footer modal-big-window";
    }

    var fulldomid = AMS_Windows_FullDomId(domid);
    var whtml = '<div id="' + fulldomid + '" class="' + classes + '">' +
        '<div class="modal-content">' +
        '<a href="#" onclick="var a = $(\'#' + fulldomid + '\');a.modal(\'close\');a.remove()" class="modal-action">' +
        '<i class="material-icons right black-text">&#xE14C;</i></a>' +
        '<a href="#" class="modal-action modal-close">' +
        '<i class="material-icons right black-text">&#xE15B;</i></a><h4>' + caption + '</h4>';

    whtml += innerhtml;

    whtml += "</div></div>";


    $("body").prepend(whtml);

    var jqm = "#"+fulldomid;
    $(jqm).modal({
        dismissible: true, // Modal can be dismissed by clicking outside of the modal
        opacity: .5, // Opacity of modal background
        in_duration: 300, // Transition in duration
        out_duration: 200, // Transition out duration
        starting_top: '0%', // Starting top style attribute
        ending_top: '1%' // Ending top style attribute
    });
}

function AMS_Windows_Del(domid){
    var fulldomid = AMS_Windows_FullDomId(domid);

    var jqm = "#"+fulldomid;
    $(jqm).modal('close');

    $(jqm).remove();
}

function AMS_Windows_Open(domid){
    var fulldomid = AMS_Windows_FullDomId(domid);
    var jqm = "#"+fulldomid;
    $(jqm).modal('open');
    $(".material-tooltip").attr('style','display: none');

}

function AMS_Windows_Hide(domid){
    var fulldomid = AMS_Windows_FullDomId(domid);
    var jqm = "#"+fulldomid;
    $(jqm).modal('close');
}