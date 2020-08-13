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
    var AllianceCfg;
    (function (AllianceCfg) {
        var allianceListCfg = [];
        function formatData(data) {
            for (var key in data) {
                var itemCfg = void 0;
                if (!allianceListCfg.hasOwnProperty(String(key))) {
                    allianceListCfg[String(key)] = new AllianceItemCfg();
                }
                itemCfg = allianceListCfg[String(key)];
                itemCfg.initData(data[key]);
                itemCfg.level = String(key);
            }
        }
        AllianceCfg.formatData = formatData;
        function getAllianceCfgByLv(level) {
            return allianceListCfg[String(level)];
        }
        AllianceCfg.getAllianceCfgByLv = getAllianceCfgByLv;
        function getAllainceCfgList() {
            return allianceListCfg;
        }
        AllianceCfg.getAllainceCfgList = getAllainceCfgList;
        /**
         * 获取最大长度
         */
        function getMaxLength() {
            return Object.keys(allianceListCfg).length;
        }
        AllianceCfg.getMaxLength = getMaxLength;
    })(AllianceCfg = Config.AllianceCfg || (Config.AllianceCfg = {}));
    var AllianceItemCfg = (function (_super) {
        __extends(AllianceItemCfg, _super);
        function AllianceItemCfg() {
            return _super.call(this) || this;
        }
        return AllianceItemCfg;
    }(BaseItemCfg));
    Config.AllianceItemCfg = AllianceItemCfg;
    __reflect(AllianceItemCfg.prototype, "Config.AllianceItemCfg");
})(Config || (Config = {}));
