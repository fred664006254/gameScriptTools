var Config;
(function (Config) {
    var GamepaceCfg;
    (function (GamepaceCfg) {
        var weapon_name_1001 = 0;
        function formatData(data) {
            if (data.weapon_name_1001) {
                weapon_name_1001 = data.weapon_name_1001.needDay;
            }
        }
        GamepaceCfg.formatData = formatData;
        function getWeaponPace() {
            return weapon_name_1001;
        }
        GamepaceCfg.getWeaponPace = getWeaponPace;
    })(GamepaceCfg = Config.GamepaceCfg || (Config.GamepaceCfg = {}));
})(Config || (Config = {}));
//# sourceMappingURL=GamepaceCfg.js.map