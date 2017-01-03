/**
 * Created by root on 17-1-3.
 */


function ams_t2c(temp) {

    if (temp < 10)
        return "#BFD9FF";

    if (temp >= 10 && temp < 20)
        return "#80B3FF";

    if (temp >= 20 && temp < 30)
        return "#BFF500";

    if (temp >= 30 && temp < 40)
        return "#FFDD00";

    if (temp >= 40 && temp < 50)
        return "#F3A02B";

    if (temp >= 50 && temp < 60)
        return "#F38B2F";

    if (temp >= 60 && temp < 70)
        return "#F37932";

    if (temp >= 70 && temp < 80)
        return "#F37338";

    if (temp >= 80 && temp < 90)
        return "#F3603B";

    if (temp >= 90 && temp < 100)
        return "#F3493A";

    if (temp >= 100)
        return "#FF0000";

}