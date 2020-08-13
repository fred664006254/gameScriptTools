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
     * 帮会精英boss配置
     */
    var AllianceelitebossCfg;
    (function (AllianceelitebossCfg) {
        var allianceEliteBossListCfg = [];
        function formatData(data) {
            for (var key in data) {
                var itemCfg = void 0;
                if (!allianceEliteBossListCfg.hasOwnProperty(String(key))) {
                    allianceEliteBossListCfg[String(key)] = new AllianceEliteBossItemCfg();
                }
                itemCfg = allianceEliteBossListCfg[String(key)];
                itemCfg.initData(data[key]);
                itemCfg.id = key;
                itemCfg.sortId = Number(key.substring(1));
            }
        }
        AllianceelitebossCfg.formatData = formatData;
        function getAllianceCfgByLv(level) {
            return allianceEliteBossListCfg[String(level)];
        }
        AllianceelitebossCfg.getAllianceCfgByLv = getAllianceCfgByLv;
        /**
         * 获得所有的id 。Ps：可能是乱序
         */
        function getAllainceCfgIdList() {
            return Object.keys(allianceEliteBossListCfg);
        }
        AllianceelitebossCfg.getAllainceCfgIdList = getAllainceCfgIdList;
        /**
         * 获取最大长度
         */
        function getMaxLength() {
            return Object.keys(allianceEliteBossListCfg).length;
        }
        AllianceelitebossCfg.getMaxLength = getMaxLength;
    })(AllianceelitebossCfg = Config.AllianceelitebossCfg || (Config.AllianceelitebossCfg = {}));
    var AllianceEliteBossItemCfg = (function (_super) {
        __extends(AllianceEliteBossItemCfg, _super);
        function AllianceEliteBossItemCfg() {
            return _super.call(this) || this;
        }
        return AllianceEliteBossItemCfg;
    }(BaseItemCfg));
    Config.AllianceEliteBossItemCfg = AllianceEliteBossItemCfg;
    __reflect(AllianceEliteBossItemCfg.prototype, "Config.AllianceEliteBossItemCfg");
})(Config || (Config = {}));
//# sourceMappingURL=AllianceEliteBossCfg.js.map