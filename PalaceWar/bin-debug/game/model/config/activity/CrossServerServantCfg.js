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
    var AcCfg;
    (function (AcCfg) {
        /**
         * 亲密配置
         */
        var CrossServerServantCfg = (function () {
            function CrossServerServantCfg() {
                /**
                 * --参与门客ID1
                 */
                this.servantId1 = '';
                /**
                 * --对应门客1皮肤
                 */
                this.servantSkin1 = '';
                /**
                 * --参与门客ID2
                 */
                this.servantId2 = '';
                /**
                 * --对应门客1皮肤
                 */
                this.servantSkin2 = '';
                /**
                * --获胜组奖励
                */
                this.winServer = '';
                /**
                * --战败组奖励
                */
                this.loseServer = '';
                /**位数显示时间，倒计时，单位：秒*/
                this.countDown = [];
                this.rankList = {};
            }
            CrossServerServantCfg.prototype.formatData = function (data) {
                this.servantId1 = data.servantId1;
                this.servantSkin1 = data.servantSkin1;
                this.servantId2 = data.servantId2;
                this.servantSkin2 = data.servantSkin2;
                this.winServer = data.winServer;
                this.loseServer = data.loseServer;
                this.countDown = data.countDown;
                for (var key in data.rankList) {
                    var itemCfg = void 0;
                    if (!this.rankList.hasOwnProperty((Number(key) + 1).toString())) {
                        this.rankList[Number(key) + 1] = new CrossServantRankItemCfg();
                    }
                    itemCfg = this.rankList[Number(key) + 1];
                    itemCfg.initData(data.rankList[key]);
                    itemCfg.id = Number(key) + 1;
                }
            };
            return CrossServerServantCfg;
        }());
        AcCfg.CrossServerServantCfg = CrossServerServantCfg;
        __reflect(CrossServerServantCfg.prototype, "Config.AcCfg.CrossServerServantCfg");
        var CrossServantRankItemCfg = (function (_super) {
            __extends(CrossServantRankItemCfg, _super);
            function CrossServantRankItemCfg() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            Object.defineProperty(CrossServantRankItemCfg.prototype, "minRank", {
                get: function () {
                    return this.rank[0];
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(CrossServantRankItemCfg.prototype, "maxRank", {
                get: function () {
                    return this.rank[1];
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(CrossServantRankItemCfg.prototype, "rewardIcons", {
                get: function () {
                    return GameData.getRewardItemIcons(this.reward, true, true);
                },
                enumerable: true,
                configurable: true
            });
            return CrossServantRankItemCfg;
        }(BaseItemCfg));
        __reflect(CrossServantRankItemCfg.prototype, "CrossServantRankItemCfg");
    })(AcCfg = Config.AcCfg || (Config.AcCfg = {}));
})(Config || (Config = {}));
//# sourceMappingURL=CrossServerServantCfg.js.map