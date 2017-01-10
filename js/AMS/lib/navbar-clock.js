/**
 * Created by root on 16-12-28.
 */
function AMSNavBarClock() {
    var today = new Date();
    var M = _Format(today.getMonth()+1);
    var d = _Format(today.getDate());
    var h = _Format(today.getHours());
    var m = _Format(today.getMinutes());
    var s = _Format(today.getSeconds());
    $("#ams-navbar-clock").text( today.getFullYear() + "-" + M + "-" + d + " " + h + ":" + m + ":" + s);
    var t = setTimeout(AMSNavBarClock, 500);
}
function _Format(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}