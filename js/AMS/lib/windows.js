/**
 * Created by root on 17-1-5.
 * @return {string}
 * @return {string}
 */

function AMS_Windows_FullDomId(domid){
    return "ams-dynamic-window-" + domid;
}

function AMS_Windows_Add(domid,appearance,caption,html_body,html_footer) {

    var classes = "modal";
    var mp_dismissible = true;
    var mp_enable_titlebar_close = false;
    var mp_enable_titlebar_hide = false;
    var mp_starting_top = '4%';
    var mp_ending_top = '10%';

    if (appearance.windowsize === "big") {
        classes += " modal-fixed-footer modal-size-big";
        mp_starting_top = '1%';
        mp_ending_top = '1%';
    }

    if (appearance.windowtype === "window") {
        mp_enable_titlebar_close = true;
        mp_enable_titlebar_hide = true;
    } else if (appearance.windowtype === "dialog") {
        mp_enable_titlebar_close = true;
    }

    if (appearance.notdismissible)
        mp_dismissible = false;

    var fulldomid = AMS_Windows_FullDomId(domid);
    var whtml = '<div id="' + fulldomid + '" class="' + classes + '">' +
        '<div class="modal-content">';

    if (mp_enable_titlebar_close)
        whtml += '<a href="#" onclick="var a = $(\'#' + fulldomid + '\');a.modal(\'close\');a.remove()"' +
            'class="modal-action"><i class="material-icons right black-text">&#xE14C;</i></a>';

    if (mp_enable_titlebar_hide)
        whtml += '<a href="#" class="modal-action modal-close">' +
            '<i class="material-icons right black-text">&#xE15B;</i></a>';

    whtml += '<h4>' + caption + '</h4>';
    whtml += html_body;

    whtml += "</div>";

    if (html_footer) {
        whtml += '<div class="modal-footer">';
        whtml += html_footer;
        whtml += '</div>';
    }

    whtml += '</div>';


    $("body").prepend(whtml);

    var jqm = "#"+fulldomid;
    $(jqm).modal({
        dismissible: mp_dismissible, // Modal can be dismissed by clicking outside of the modal
        opacity: .5, // Opacity of modal background
        in_duration: 300, // Transition in duration
        out_duration: 200, // Transition out duration
        starting_top: mp_starting_top, // Starting top style attribute
        ending_top: mp_ending_top // Ending top style attribute
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