/**
 * Created by root on 17-1-5.
 */

function dec202x(n) {
    var r = n.toString(16);
    if (n < 16)
        r = "0"+r;

    return r;
}

function inet_pton(af, cp) {
    var ret = "";

    if (af==="AF_INET") {
        var numbers = cp.split(".");
        ret += dec202x(parseInt(numbers[0])) + dec202x(parseInt(numbers[1])) + dec202x(parseInt(numbers[2])) +
            dec202x(parseInt(numbers[3]));

    } else {

    }

    return ret;
}

function inet_dec2hex(ip, port) {
    var numbers = ip.split(".");
    return dec202x(parseInt(numbers[0])) + dec202x(parseInt(numbers[1])) + dec202x(parseInt(numbers[2])) +
        dec202x(parseInt(numbers[3])) + '_' + port.toString(16);
}