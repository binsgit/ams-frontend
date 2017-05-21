/**
 * Created by root on 17-5-21.
 */

const Avalon = {
    Error: {
        Codes: {
            Idle: [1, "空闲"], CRCFailed: [2, "CRC异常"],
            NoFan: [4, "无风扇"], Lock: [8, ""],
            APIFIFOverflow: [16, ""], RBOverflow: [32, ""],
            TooHot: [64, "温度过高"], HotBefore: [128, "曾经温度过高"],
            LoopFailed: [256, ""], CoreTestFailed: [512, ""],
            InvaildPMU: [1024, "没有检测到PMU"], PGFailed: [2048, "供电异常"],
            NTCErr: [4096, "PMU温度传感异常"], VolErr: [8192, "模组电压输入异常"],
            VCoreErr: [16384, "模组电压输出异常"], PMUCrcFailed: [32768, "PMU通信CRC错误"],
            InvaildPLLValue: [65536, "PLL配置检测失败"], Error_WU: [0x20000, "WU异常"],
            Error_MW: [0x40000, "MW异常"], Error_CRC: [0x80000, "CRC异常"],
            Error_DH: [0x100000, "DH异常"]
        },
        strerror: function (errno) {
            let ret = '';
            let ec_array = Avalon.Error.Codes;
            for (let property in ec_array) {
                if (ec_array.hasOwnProperty(property)) {
                    let thisec = ec_array[property];

                    if (errno & thisec[0]) {
                        ret += thisec[1] + '；';
                    }
                }
            }

            return ret.slice(0, -1);
        }
    }
};