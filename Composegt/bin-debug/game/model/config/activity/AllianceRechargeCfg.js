var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Config;
(function (Config) {
    var AcCfg;
    (function (AcCfg) {
        var AllianceRechargeCfg = (function () {
            function AllianceRechargeCfg() {
                this.extraTime = 0;
                this._countReward = [];
            }
            Object.defineProperty(AllianceRechargeCfg.prototype, "countReward", {
                get: function () {
                    return this._countReward;
                },
                enumerable: true,
                configurable: true
            });
            AllianceRechargeCfg.prototype.getRewardList = function () {
                var rewardList = [];
                var rewardItem = null;
                var rewardObj = null;
                for (var key in this._countReward) {
                    rewardObj = this._countReward[key];
                    rewardItem = {
                        id: key,
                        count: rewardObj.count ? rewardObj.count : 0,
                        total: rewardObj.total ? rewardObj.total : 0,
                        getReward: rewardObj.getReward
                    };
                    rewardList.push(rewardItem);
                }
                return rewardList;
            };
            AllianceRechargeCfg.prototype.formatData = function (data) {
                if (data.extraTime) {
                    this.extraTime = data.extraTime;
                }
                if (data["countReward"]) {
                    this._countReward = data["countReward"];
                }
            };
            return AllianceRechargeCfg;
        }());
        AcCfg.AllianceRechargeCfg = AllianceRechargeCfg;
        __reflect(AllianceRechargeCfg.prototype, "Config.AcCfg.AllianceRechargeCfg");
    })(AcCfg = Config.AcCfg || (Config.AcCfg = {}));
})(Config || (Config = {}));
