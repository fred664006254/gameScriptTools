var Config;
(function (Config) {
    var ShieldCfg;
    (function (ShieldCfg) {
        /** 需要检测是否告警统计的json数据缓存 */
        var shieldReportData = null;
        var cIndex = 0;
        function getCfg() {
            return GameData.getLanguageRes("shield_");
        }
        ShieldCfg.getCfg = getCfg;
        function getNameCfg() {
            return GameData.getLanguageRes("shieldname_");
        }
        function checkShield(str) {
            var shieldCfg = getCfg();
            if (shieldCfg && str) {
                if (shieldCfg.indexOf(str) > -1 || shieldCfg.indexOf(str.replace(/\s/g, "")) > -1) {
                    App.CommonUtil.showTip(LanguageManager.getlocal("guideCreateUserError3"));
                    return false;
                }
                else {
                    var shieldnameCfg = getNameCfg();
                    if (shieldnameCfg) {
                        var l_1 = shieldnameCfg.length;
                        for (var i = 0; i < l_1; i++) {
                            if (checkByRegExp(str.toLowerCase(), shieldnameCfg[i].toLowerCase()) == false) {
                                App.CommonUtil.showTip(LanguageManager.getlocal("guideCreateUserError3"));
                                return false;
                            }
                        }
                    }
                    var l = shieldCfg.length;
                    for (var i = 0; i < l; i++) {
                        if (str.toLowerCase().indexOf(shieldCfg[i].toLowerCase()) > -1) {
                            App.CommonUtil.showTip(LanguageManager.getlocal("guideCreateUserError3"));
                            return false;
                        }
                    }
                }
            }
            return true;
        }
        ShieldCfg.checkShield = checkShield;
        function checkByRegExp(str, cfgStr) {
            var reg = new RegExp(cfgStr);
            if (str.replace(reg, "*") != str) {
                return false;
            }
            return true;
        }
        function checkOnlyShield(str) {
            var shieldCfg = getCfg();
            /**
             * 空字符
             */
            if (str.replace(/\s/g, "").length == 0) {
                return true;
            }
            if (shieldCfg && str && shieldCfg.indexOf(str) > -1) {
                App.CommonUtil.showTip(LanguageManager.getlocal("guideCreateUserError3"));
                return false;
            }
            return true;
        }
        ShieldCfg.checkOnlyShield = checkOnlyShield;
        var queueShieldReportList = [];
        /**
         * 检测聊天内容是否需要告警
         *
         * @param chatStr 聊天内容
         * @param callback 回调结果
         * @param callbackObj 回调对象
         */
        function checkShieldReport(chatStr) {
            queueShieldReportList.push(chatStr);
            if (shieldReportData) {
                cIndex == 0 && checkShildReportStr();
            }
            else {
                if (PlatformManager.checkIsTWBSp()) {
                    shieldReportData = ["代.*充", "代.*儲", "代.*除", "退.*款", "退.*費", "l.*i.*n.*e", "w.*e.*c.*h.*a.*t", "微.*信", "加.*賴", "仙.*俠", "有.*賴.*嗎", "剛.*玩", "官.*老.*爺"];
                }
                else if (PlatformManager.checkIsThSp() || PlatformManager.checkIsEnLang()) {
                    shieldReportData = ["refund", "reimburse", "reimbursement", "money back", "rebate", "draw back", "drawback", "draw-back", "money-back"];
                }
                if (shieldReportData) {
                    checkShildReportStr();
                }
                // ResourceManager.loadItem("shieldname_cn",(value:any,key:string)=>{
                // 	shieldReportData=value;
                // 	checkShildReportStr();
                // },ShieldCfg);
            }
        }
        ShieldCfg.checkShieldReport = checkShieldReport;
        function checkShildReportStr() {
            GameConfig.stage.removeEventListener(egret.Event.ENTER_FRAME, checkShildReportStr, ShieldCfg);
            if (shieldReportData) {
                var l = shieldReportData.length;
                var startTime = egret.getTimer();
                console.log("start:" + cIndex);
                for (cIndex; cIndex < l; cIndex++) {
                    if (checkByRegExp(queueShieldReportList[0].toLowerCase(), shieldReportData[cIndex].toLowerCase()) == false) {
                        cIndex = 0;
                        var chatStr = queueShieldReportList.shift();
                        return StatisticsHelper.reportShieldChat(chatStr, shieldReportData[cIndex]);
                    }
                    if (egret.getTimer() - startTime > 30) {
                        console.log("timeout:" + cIndex);
                        GameConfig.stage.addEventListener(egret.Event.ENTER_FRAME, checkShildReportStr, ShieldCfg);
                        return;
                    }
                }
                queueShieldReportList.shift();
                cIndex = 0;
            }
        }
    })(ShieldCfg = Config.ShieldCfg || (Config.ShieldCfg = {}));
})(Config || (Config = {}));
//# sourceMappingURL=ShieldCfg.js.map