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
    var LevelCfg;
    (function (LevelCfg) {
        var levelCfg = {};
        function formatData(data) {
            var levels = data.level;
            for (var lv in levels) {
                if (levels.hasOwnProperty(lv)) {
                    var lvItem = new LevelItemCfg();
                    lvItem.level = Number(lv);
                    lvItem.initData(levels[lv]);
                    levelCfg[lv] = lvItem;
                }
            }
        }
        LevelCfg.formatData = formatData;
        function getLevelNeedScore(lv) {
            if (lv <= 1) {
                return 0;
            }
            if (lv > 20) {
                return 99999;
            }
            return levelCfg[lv]["needScore"];
        }
        LevelCfg.getLevelNeedScore = getLevelNeedScore;
        function getUpgradeNS(lv) {
            if (lv < 1) {
                return 0;
            }
            if (lv >= 20) {
                return 99999;
            }
            return levelCfg[lv + 1]["needScore"] - levelCfg[lv]["needScore"];
        }
        LevelCfg.getUpgradeNS = getUpgradeNS;
    })(LevelCfg = Config.LevelCfg || (Config.LevelCfg = {}));
    var LevelItemCfg = (function (_super) {
        __extends(LevelItemCfg, _super);
        function LevelItemCfg() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**
         * 获取连胜隐藏分增加值
         * @param clv
         */
        LevelItemCfg.prototype.getWinAddScoreByLv = function (clv) {
            var l = this.winAddScore.length;
            var tlv = Math.max(1, Math.min(clv, l));
            tlv = tlv - 1;
            return this.winAddScore[tlv];
        };
        LevelItemCfg.prototype.getLoseDecreaseScore = function (clv) {
            var l = this.loseDecreaseScore.length;
            var tlv = Math.max(1, Math.min(clv, l));
            tlv = tlv - 1;
            return this.loseDecreaseScore[tlv];
        };
        return LevelItemCfg;
    }(BaseItemCfg));
    __reflect(LevelItemCfg.prototype, "LevelItemCfg");
})(Config || (Config = {}));
//# sourceMappingURL=LevelCfg.js.map