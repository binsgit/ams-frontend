/**
 * Created by root on 17-1-3.
 */


function avalon_ec_idle(e){
    return e & 1;
}

function avalon_ec_mm_crc_failed(e){
    return e & 2;
}

function avalon_ec_no_fan(e){
    return e & 4;
}

function avalon_ec_lock(e){
    return e & 8;
}

function avalon_ec_api_fifo_overflow(e){
    return e & 16;
}

function avalon_ec_rb_overflow(e){
    return e & 32;
}

function avalon_ec_too_hot(e){
    return e & 64;
}

function avalon_ec_hot_before(e){
    return e & 128;
}

function avalon_ec_loop_failed(e){
    return e & 256;
}

function avalon_ec_coretest_failed(e){
    return e & 512;
}

function avalon_ec_invalid_pmu(e){
    return e & 1024;
}

function avalon_ec_pg_failed(e){
    return e & 2048;
}

function avalon_ec_ntc_err(e){
    return e & 4096;
}

function avalon_ec_vol_err(e){
    return e & 8192;
}

function avalon_ec_vcore_err(e){
    return e & 16384;
}

function avalon_ec_pmu_crc_failed(e){
    return e & 32678;
}

function avalon_ec_invalid_pll_value(e){
    return e & 65536;
}

function avalon_ec_strerror(errno) {
    var errstr = "";

    if (avalon_ec_idle(errno))
        errstr += "空闲；";

    if (avalon_ec_mm_crc_failed(errno))
        errstr += "CRC异常；";

    if (avalon_ec_no_fan(errno))
        errstr += "无风扇；";

    if (avalon_ec_lock(errno))
        errstr += "";

    if (avalon_ec_api_fifo_overflow(errno))
        errstr += "";

    if (avalon_ec_rb_overflow(errno))
        errstr += "";

    if (avalon_ec_too_hot(errno))
        errstr += "温度过高；";

    if (avalon_ec_hot_before(errno))
        errstr += "曾经温度过高；";

    if (avalon_ec_loop_failed(errno))
        errstr += "";

    if (avalon_ec_coretest_failed(errno))
        errstr += "";

    if (avalon_ec_invalid_pmu(errno))
        errstr += "没有检测到PMU；";

    if (avalon_ec_pg_failed(errno))
        errstr += "供电异常；";

    if (avalon_ec_ntc_err(errno))
        errstr += "PMU温度传感异常；";

    if (avalon_ec_vol_err(errno))
        errstr += "模组电压输入异常；";

    if (avalon_ec_vcore_err(errno))
        errstr += "模组电压输出异常；";

    if (avalon_ec_pmu_crc_failed(errno))
        errstr += "PMU通信CRC错误；";

    if (avalon_ec_invalid_pll_value(errno))
        errstr += "PLL配置检测失败；";


    return errstr;

}
