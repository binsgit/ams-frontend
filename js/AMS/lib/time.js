/**
 * Created by root on 16-12-28.
 * @return {string}
 */

function Reimu_Time_Sec2HMS(sec) {
    var h = (sec / 3600).toFixed(0);
    var t = sec % 3600;
    var m = (t / 60).toFixed(0);
    var s = t % 60;

    var str = h.toString() + 'h ' + m.toString() + 'm ' + s.toString() + 's';

    return str;

}

/**
 * @return {string}
 */
function Reimu_Time_unix2rfc3339(sec) {
    var date;

    if (!sec)
        date = new Date();
    else
        date = new Date(sec*1000);

    var M = padzero(date.getMonth()+1);
    var d = padzero(date.getDate());
    var h = padzero(date.getHours());
    var m = padzero(date.getMinutes());
    var s = padzero(date.getSeconds());
    return date.getFullYear() + "-" + M + "-" + d + " " + h + ":" + m + ":" + s;
}

function AMSNavBarClock() {
    $("#ams-navbar-clock").text(Reimu_Time_unix2rfc3339());
    var t = setTimeout(AMSNavBarClock, 500);
}
function padzero(i) {
    if (i < 10) {i = "0" + i}  // add zero in front of numbers < 10
    return i;
}