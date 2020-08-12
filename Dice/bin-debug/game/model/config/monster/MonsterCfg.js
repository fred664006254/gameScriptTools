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
    var MonsterCfg;
    (function (MonsterCfg) {
        var bossList = {};
        var monsterList = [];
        function formatData(data) {
            for (var key in data.bossList) {
                if (data.bossList.hasOwnProperty(key)) {
                    var bossData = data.bossList[key];
                    var bossItem = new BossItemCfg();
                    bossItem.initData(bossData);
                    bossItem.id = key;
                    bossList[key] = bossItem;
                }
            }
        }
        MonsterCfg.formatData = formatData;
        function getBossNum() {
            return Object.keys(bossList).length;
        }
        MonsterCfg.getBossNum = getBossNum;
        function getBossKeys() {
            return Object.keys(bossList);
        }
        MonsterCfg.getBossKeys = getBossKeys;
        function getBossCfgById(key) {
            return bossList[key];
        }
        MonsterCfg.getBossCfgById = getBossCfgById;
    })(MonsterCfg = Config.MonsterCfg || (Config.MonsterCfg = {}));
    var BossItemCfg = (function (_super) {
        __extends(BossItemCfg, _super);
        function BossItemCfg() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return BossItemCfg;
    }(Config.MonsterItemCfg));
    Config.BossItemCfg = BossItemCfg;
    __reflect(BossItemCfg.prototype, "Config.BossItemCfg");
})(Config || (Config = {}));
//# sourceMappingURL=MonsterCfg.js.map