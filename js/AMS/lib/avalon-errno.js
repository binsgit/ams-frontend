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

function avalon_ec_abnormal_wu(ver, wu) {
    if (ver[1] === '2')
        return wu < 79400;

    if (ver[1] === '4')
        return wu < 101400;
}

function avalon_ec_abnormal_dh(ver, dh) {
    if (ver[1] === '2')
        return dh > 3.5;

    if (ver[1] === '4')
        return dh > 3;
}

function avalon_ec_abnormal_mw(mod_obj) {
    for (var mwid1 = 0; mwid1 < 4; mwid1++) {
        for (var mwid2 = 0; mwid2 < 18; mwid2++) {
            if (mod_obj['mw'+mwid1.toString()+'_'+mwid2.toString()] === 0)
                return true;
        }
    }
    return false;
}

function avalon_ec_abnormal_crc(mod_obj) {
    for (var crcid = 0; crcid < 4; crcid++) {
            if (mod_obj['crc_'+crcid.toString()] !== 0)
                return true;
    }
    return false;
}

function avalon_ec_strerror(mode,mod_obj) {

    var errno = mod_obj.echu_combined;
    var ver = mod_obj.ver;

    var err_wu = avalon_ec_abnormal_wu(ver,mod_obj.wu);
    var err_dh = avalon_ec_abnormal_dh(ver,mod_obj.dh);
    var err_mw = avalon_ec_abnormal_mw(mod_obj);
    var err_crc = avalon_ec_abnormal_crc(mod_obj);

    if (mode !== -1) {
        if ( !((mode & errno) || (mode === 'wu' && err_wu) || (mode === 'dh' && err_dh) || (mode === 'mw' && err_mw)
            || (mode === 'crc' && err_crc)))
            return null;
    }


    var errstr = "";

    if (err_wu)
        errstr += "WU异常；";

    if (err_mw)
        errstr += "MW异常；";

    if (err_crc)
        errstr += "CRC异常；";

    if (err_dh)
        errstr += "DH过高；";

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
