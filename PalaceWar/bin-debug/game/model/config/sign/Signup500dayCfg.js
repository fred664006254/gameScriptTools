var Config;
(function (Config) {
    var Signup500dayCfg;
    (function (Signup500dayCfg) {
        Signup500dayCfg.sign600Day = 600;
        function formatData(data) {
            for (var key in data) {
                if (key == "shop") {
                    if (!Signup500dayCfg.shopCfg) {
                        Signup500dayCfg.shopCfg = new Config.ShopItemCfg();
                    }
                    var allKey = Object.keys(data.shop);
                    Signup500dayCfg.shopCfg.initData(data.shop[allKey[0]]);
                    Signup500dayCfg.shopCfg.id = Number(allKey[0]);
                }
                else {
                    this[key] = data[key];
                }
            }
        }
        Signup500dayCfg.formatData = formatData;
        function showLastDay() {
            return (Signup500dayCfg.showDay + Signup500dayCfg.lastDay);
        }
        Signup500dayCfg.showLastDay = showLastDay;
    })(Signup500dayCfg = Config.Signup500dayCfg || (Config.Signup500dayCfg = {}));
})(Config || (Config = {}));
//# sourceMappingURL=Signup500dayCfg.js.map