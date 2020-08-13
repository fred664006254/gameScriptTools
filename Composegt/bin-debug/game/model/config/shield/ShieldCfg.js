var Config;
(function (Config) {
    var ShieldCfg;
    (function (ShieldCfg) {
        function getCfg() {
            return ResourceManager.getRes("shield_" + GameData.getCountry());
        }
        ShieldCfg.getCfg = getCfg;
        function checkShield(str) {
            var shieldCfg = getCfg();
            if (shieldCfg && str) {
                if (shieldCfg.indexOf(str) > -1 || shieldCfg.indexOf(str.replace(/\s/g, "")) > -1) {
                    App.CommonUtil.showTip(LanguageManager.getlocal("guideCreateUserError3"));
                    return false;
                }
                else {
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
    })(ShieldCfg = Config.ShieldCfg || (Config.ShieldCfg = {}));
})(Config || (Config = {}));
