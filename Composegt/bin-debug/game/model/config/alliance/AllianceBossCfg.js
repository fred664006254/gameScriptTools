var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var Config;
(function (Config) {
    /**
     * 帮会等级配置
     */
    var AlliancebossCfg;
    (function (AlliancebossCfg) {
        var allianceBossListCfg = [];
        function formatData(data) {
            for (var key in data) {
                var itemCfg = void 0;
                if (!allianceBossListCfg.hasOwnProperty(String(key))) {
                    allianceBossListCfg[String(key)] = new AllianceBossItemCfg();
                }
                itemCfg = allianceBossListCfg[String(key)];
                itemCfg.initData(data[key]);
                itemCfg.id = key;
            }
        }
        AlliancebossCfg.formatData = formatData;
        function getAllianceCfgByLv(level) {
            return allianceBossListCfg[String(level)];
        }
        AlliancebossCfg.getAllianceCfgByLv = getAllianceCfgByLv;
        function getAllainceCfgIdList() {
            return Object.keys(allianceBossListCfg);
        }
        AlliancebossCfg.getAllainceCfgIdList = getAllainceCfgIdList;
        /**
         * 获取最大长度
         */
        function getMaxLength() {
            return Object.keys(allianceBossListCfg).length;
        }
        AlliancebossCfg.getMaxLength = getMaxLength;
    })(AlliancebossCfg = Config.AlliancebossCfg || (Config.AlliancebossCfg = {}));
    var AllianceBossItemCfg = (function (_super) {
        __extends(AllianceBossItemCfg, _super);
        function AllianceBossItemCfg() {
            var _this = _super.call(this) || this;
            _this.bossPic = 1;
            return _this;
        }
        return AllianceBossItemCfg;
    }(BaseItemCfg));
    Config.AllianceBossItemCfg = AllianceBossItemCfg;
    __reflect(AllianceBossItemCfg.prototype, "Config.AllianceBossItemCfg");
})(Config || (Config = {}));
