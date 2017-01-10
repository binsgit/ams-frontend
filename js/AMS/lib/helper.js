/**
 * Created by root on 17-1-10.
 */
function Reimu_MakeAllFormSubmitOnEnter() {
    // $('form input, form select').live('keypress', function (e) {
    //     if (e.which && e.which == 13) {
    //         $(this).parents('form').submit();
    //         return false;
    //     } else {
    //         return true;
    //     }
    // });
}

function Reimu_ToogleCardTitleLoadingIcon(fulldomid, enabled) {
    if (enabled) {
        $('#'+fulldomid).append('<img src="assets/loading.gif" width="18px" height="18px">');
    } else {
        $('#'+fulldomid+' > img').remove();
    }
}