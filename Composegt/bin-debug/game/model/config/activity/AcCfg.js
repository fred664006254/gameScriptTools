var Config;
(function (Config) {
    var AcCfg;
    (function (AcCfg) {
        AcCfg.isGetAll = false;
        AcCfg.cfgList = {};
        // export function getCfgByActivityId(aid:string)
        // {
        // 	return cfgList[aid];
        // }
        var extraTimeList = {
            punish: 1,
            newYear: 1,
            fourPeople: 1,
            crossServerAtkRace: 1,
            crossServerIntimacy: 1,
            springCelebrate: 1,
            mayDay: 1,
            dragonBoatDay: 1,
            crossServerPower: 1,
            archer: 1,
            maze: 1,
            midAutumn: 1,
            crossServerServant: 1,
            lottery: 1,
            singleDay: 1,
            jade: 1,
            crossServantPower: 1,
            wipeBoss: 1
        };
        function getCfgByActivityIdAndCode(aid, code) {
            return AcCfg.cfgList[aid] ? AcCfg.cfgList[aid][code] : null;
        }
        AcCfg.getCfgByActivityIdAndCode = getCfgByActivityIdAndCode;
        /**
         * 获取活动展示期（单位：天）
         */
        function getExtraTimeByIdAndCode(aid, code) {
            var extraTime = 0;
            if (getCfgByActivityIdAndCode(aid, code) && getCfgByActivityIdAndCode(aid, code).extraTime) {
                extraTime = getCfgByActivityIdAndCode(aid, code).extraTime;
            }
            else if (extraTimeList[aid]) {
                extraTime = extraTimeList[aid];
            }
            return extraTime;
        }
        AcCfg.getExtraTimeByIdAndCode = getExtraTimeByIdAndCode;
        function formatAllCfg(data) {
            AcCfg.isGetAll = true;
            for (var aidAndCode in data) {
                var aidArr = aidAndCode.split("-");
                var aid = aidArr[0];
                var code = aidArr[1];
                var cfgClassName = "Config.AcCfg." + App.StringUtil.firstCharToUper(aid) + "Cfg";
                var cfgClass = egret.getDefinitionByName(cfgClassName);
                if (AcCfg.cfgList.hasOwnProperty(aid) == false) {
                    AcCfg.cfgList[aid] = {};
                }
                if (cfgClass) {
                    var cfg = new cfgClass();
                    cfg.formatData(data[aidAndCode]);
                    AcCfg.cfgList[aid][code] = cfg;
                }
                else {
                    App.LogUtil.log("缺少活动配置解析" + cfgClassName + "，请参考DailyChargeCfg写法");
                }
            }
        }
        AcCfg.formatAllCfg = formatAllCfg;
        function formatCfgById(acData, aid) {
        }
        AcCfg.formatCfgById = formatCfgById;
    })(AcCfg = Config.AcCfg || (Config.AcCfg = {}));
})(Config || (Config = {}));
