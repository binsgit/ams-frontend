/**
 * Created by root on 17-1-5.
 * @return {string}
 * @return {string}
 */

function AMS_Windows_FullDomId(domid){
    return "ams-dynamic-window-" + domid;
}

function windowAppearance(window_size, window_type, is_not_dismissible) {
    return {
        type: window_type,
        size: window_size,
        notdismissible: is_not_dismissible
    };
}

function windowButtons(button_array) {
    var ret = '';
    var example = [
        {
            id: 'button-xxx',
            href: '#',
            class: 'modal-action modal-close waves-effect waves-green btn-flat',
            text: 'OK',
            extdata: ''
        }
    ];

    for (var pb in button_array) {
        var tb = button_array[pb];
        var tbr = '<a ';
        if (tb.id)
            tbr += 'id="' + tb.id + '" ';
        if (tb.extdata)
            tbr += tb.extdata + ' ';

        tbr += 'href="' + tb.href + '" class="' + tb.class + '">' + tb.text + '</a>';
        ret = tbr + ret;
    }

    return ret;
}

function AMS_Windows_Add(fulldomid, appearance, caption, html_body, html_footer) {

    var classes = "modal";

    var mp_dismissible = true;
    var mp_enable_titlebar_close = false;
    var mp_enable_titlebar_hide = false;
    var mp_starting_top = '4%';
    var mp_ending_top = '10%';

    if (appearance.size === "big") {
        classes += " modal-fixed-footer modal-size-big";
        mp_starting_top = '1%';
        mp_ending_top = '1%';
    } else if (appearance.size === "medium") {
        mp_starting_top = '10%';
        mp_ending_top = '10%';
    } else if (appearance.size === "small") {
        mp_starting_top = '30%';
        mp_ending_top = '30%';
    }

    if (appearance.type === "window") {
        mp_enable_titlebar_close = true;
        mp_enable_titlebar_hide = true;
    } else if (appearance.type === "dialog") {
        // mp_enable_titlebar_close = true;
    }

    if (appearance.notdismissible)
        mp_dismissible = false;

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

function AMS_Windows_Add_MsgBox(fulldomid, caption, html_body){
    AMS_Windows_Add(fulldomid, windowAppearance('small', 'dialog', false), caption, html_body, windowButtons([
        {
            href: '#',
            class: 'modal-action modal-close waves-effect waves-green btn-flat',
            text: '确定'
        }
    ]));
}


function AMS_Windows_Del(fulldomid){
    var jqm = "#"+fulldomid;
    $(jqm).modal('close');

    $(jqm).remove();
}

function AMS_Windows_Open(fulldomid){
    var jqm = "#"+fulldomid;
    $(jqm).modal('open');
    $(".material-tooltip").attr('style','display: none');
}

function AMS_Windows_Open_Priv(fulldomid){
    if (AMS_User_IsLoggedIn()) {
        AMS_Windows_Open(fulldomid);
    } else {
        Materialize.toast("此功能仅在登录后可用", 3000);
        AMS_Windows_Open('ams-window-user-login');
    }
}

function AMS_Windows_Hide(fulldomid){
    var jqm = "#"+fulldomid;
    $(jqm).modal('close');
}