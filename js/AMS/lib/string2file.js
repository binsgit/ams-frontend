/**
 * Created by root on 17-1-11.
 */

function Reimu_String2File(string, filename, mimetype) {
    var a = document.createElement("a");
    var file = new Blob([string], {type: mimetype});
    a.href = window.URL.createObjectURL(file);
    a.download = filename;
    a.click();
}