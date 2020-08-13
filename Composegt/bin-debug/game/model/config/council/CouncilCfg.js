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
    var CouncilCfg;
    (function (CouncilCfg) {
        /**
         * 排名奖励列表
         *  --rank  例：rank = {1,3} 代表第一名至第三名
            --exp  政绩
            --bookExp  书籍经验  所派遣的每个门客获得 bookExp 的书籍经验
         */
        CouncilCfg.rankList = {};
        function formatData(data) {
            this.needLv = data.needLv;
            this.needItem = data.needItem;
            this.maxServant = data.maxServant;
            this.maxPlayer = data.maxPlayer;
            for (var key in data.rankList) {
                var itemCfg = void 0;
                if (!this.rankList.hasOwnProperty(String(key))) {
                    this.rankList[String(key)] = new CoucilRankItemCfg();
                }
                itemCfg = this.rankList[String(key)];
                itemCfg.initData(data.rankList[key]);
                itemCfg.id = String(key);
            }
        }
        CouncilCfg.formatData = formatData;
    })(CouncilCfg = Config.CouncilCfg || (Config.CouncilCfg = {}));
    var CoucilRankItemCfg = (function (_super) {
        __extends(CoucilRankItemCfg, _super);
        function CoucilRankItemCfg() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(CoucilRankItemCfg.prototype, "minRank", {
            get: function () {
                return this.rank[0];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CoucilRankItemCfg.prototype, "maxRank", {
            get: function () {
                return this.rank[1];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CoucilRankItemCfg.prototype, "rewardIcons", {
            get: function () {
                return GameData.getRewardItemIcons("5_1_" + this.exp + "|14_1_" + this.bookExp, true, false);
            },
            enumerable: true,
            configurable: true
        });
        return CoucilRankItemCfg;
    }(BaseItemCfg));
    Config.CoucilRankItemCfg = CoucilRankItemCfg;
    __reflect(CoucilRankItemCfg.prototype, "Config.CoucilRankItemCfg");
})(Config || (Config = {}));
