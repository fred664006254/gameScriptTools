var Config;
(function (Config) {
    /**
     * 省亲配置
     */
    var BigiconCfg;
    (function (BigiconCfg) {
        function formatData(data) {
            var code = 1;
            if (data) {
                for (var i = 1; i < 11; ++i) {
                    if (data["bigIcon" + i]) {
                        this["bigIcon" + i] = data["bigIcon" + i];
                    }
                }
            }
        }
        BigiconCfg.formatData = formatData;
        //获取左侧最大显示数目
        function getMaxIconLength() {
            return 4;
        }
        BigiconCfg.getMaxIconLength = getMaxIconLength;
        /**
         * 获取活动大图标
         */
        var bigIcons = [];
        function getBigIcon() {
            if (Api.acVoApi.isHandled_BI) {
                return bigIcons;
            }
            Api.acVoApi.isHandled_BI = true;
            var arr = [];
            if (!Api.switchVoApi.checkLeftActIconOpen()) {
                return arr;
            }
            //      arr.push({activity : `crossServerPower`});
            // arr.push({activity : `crossServerIntimacy`});
            // arr.push({activity : `crossServerAtkRace`});
            // arr.push({activity : `tomb`});
            var tmp = [];
            var isBuyMonthCard = Api.shopVoApi.ifBuyMonthCard();
            var isBuyYearCard = Api.shopVoApi.ifBuyYearCard();
            for (var i = 1; i < 11; ++i) {
                tmp = [];
                for (var j in this["bigIcon" + i]) {
                    //--activity:活动名称
                    //--priority:优先级。按顺序排序
                    var unit = this["bigIcon" + i][j];
                    if (unit && unit.activity) {
                        unit.type ? "" : unit.type = "";
                        var vo = null;
                        if (unit.activity == "rankActive") {
                            vo = Api.acVoApi.checkActivityStartByAidAndType(unit.activity, unit.type);
                            if (vo && vo.isStart && ((vo.checkIsHasExtraTime() && !vo.checkIsInEndShowTime()) || (!vo.checkIsHasExtraTime()))) {
                                tmp.push(unit);
                            }
                        }
                        else if (unit.activity == "battlePass") {
                            if (Api.acVoApi.checkActivityStartByAid(unit.activity)) {
                                var voList = Api.acVoApi.getActivityVoListByAid(unit.activity);
                                if (voList.length == 1 && (Number(voList[0].code) == 4 || Number(voList[0].code) == 7)) {
                                    continue;
                                }
                                tmp.push(unit);
                            }
                        }
                        else if (unit.activity == "firstrecharge") {
                            if (Api.switchVoApi.checkClosePay()) {
                                continue;
                            }
                            if (Api.shopVoApi.getPayFlag() == 2) {
                                continue;
                            }
                            else {
                                tmp.push(unit);
                            }
                        }
                        else if (unit.activity == "timelimitwife") {
                            var vo_1 = Api.shopVoApi.getPayInfoById2("g16");
                            var cfg = Config.RechargeCfg.getRechargeItemCfgByKey("g16");
                            if (Api.switchVoApi.checkClosePay()) {
                                continue;
                            }
                            if (!GameData.checkTimeLimitWife()) {
                                continue;
                            }
                            if (PlatformManager.checkIsThSp() && App.DeviceUtil.isIOS()) {
                                continue;
                            }
                            else if (cfg && vo_1 && Number(vo_1.isbuy) == 0) {
                                tmp.push(unit);
                            }
                        }
                        else if (unit.activity == "monthcard") {
                            if (!isBuyMonthCard) {
                                tmp.push(unit);
                            }
                        }
                        else if (unit.activity == "yearcard") {
                            if (isBuyMonthCard && !isBuyYearCard) {
                                tmp.push(unit);
                            }
                        }
                        else {
                            vo = Api.acVoApi.getActivityVoByAidAndCode(unit.activity);
                            if (Api.acVoApi.checkActivityStartByAid(unit.activity) && vo.isStart && ((vo.checkIsHasExtraTime() && !vo.checkIsInEndShowTime()) || (!vo.checkIsHasExtraTime()))) {
                                tmp.push(unit);
                            }
                        }
                    }
                }
                if (tmp.length == 0 && i != 4 && i !== 5) {
                    for (var j in this["bigIcon" + i]) {
                        //--activity:活动名称
                        //--priority:优先级。按顺序排序
                        var unit = this["bigIcon" + i][j];
                        unit.type ? "" : unit.type = "";
                        var vo = null;
                        if (unit.activity == "rankActive") {
                            vo = Api.acVoApi.checkActivityStartByAidAndType(unit.activity, unit.type);
                            if (unit && unit.activity && vo && vo.isStart) {
                                tmp.push(unit);
                            }
                        }
                        else {
                            vo = Api.acVoApi.getActivityVoByAidAndCode(unit.activity);
                            if (unit && unit.activity && Api.acVoApi.checkActivityStartByAid(unit.activity) && vo.isStart) {
                                tmp.push(unit);
                            }
                        }
                    }
                }
                tmp.sort(function (a, b) {
                    return a.priority - b.priority;
                });
                if (tmp.length) {
                    arr.push(tmp[0]);
                }
            }
            // arr.push({activity : `crossServerPower`});
            // arr.push({activity : `crossServerIntimacy`});
            // arr.push({activity : `crossServerAtkRace`});
            // arr.push({activity : `tomb`});
            // arr.push({activity : `conquerMainLand`});
            // arr.push({activity : `crossServerWifeBattle`});
            // arr.push({activity : `battlePass`, type : 3});
            // arr.push({activity : `crossServerPower`, type : 3});
            // arr.push({activity : `tomb`});
            // arr.push({activity : `crossServerIntimacy`});
            // arr.push({activity : `crossServerAtkRace`});
            bigIcons = arr;
            return arr;
        }
        BigiconCfg.getBigIcon = getBigIcon;
    })(BigiconCfg = Config.BigiconCfg || (Config.BigiconCfg = {}));
})(Config || (Config = {}));
//# sourceMappingURL=BigiconCfg.js.map