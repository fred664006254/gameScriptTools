var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Config;
(function (Config) {
    var AcCfg;
    (function (AcCfg) {
        /**
         * 亲密配置
         */
        var CrossServerWifeBattleCfg = (function () {
            function CrossServerWifeBattleCfg() {
            }
            CrossServerWifeBattleCfg.prototype.formatData = function (data) {
                for (var key in data) {
                    this[key] = data[key];
                }
            };
            //是否跨服/多区服争霸赛资格
            CrossServerWifeBattleCfg.prototype.getCrossServerType = function () {
                if (this.crossServerType) {
                    return this.crossServerType + "";
                }
                return "";
            };
            CrossServerWifeBattleCfg.prototype.getWinServerRewards = function () {
                return GameData.getRewardItemIcons(this.winServer, true, false);
            };
            CrossServerWifeBattleCfg.prototype.getLossServerRewards = function () {
                return GameData.getRewardItemIcons(this.loseServer, true, false);
            };
            CrossServerWifeBattleCfg.prototype.getMulServerRewards = function (zonenum) {
                // this.judgeParam(zonenum);
                // return this.serverList1;
                var rList = [];
                for (var key in this.serverList1) {
                    rList.push(this.serverList1[key]);
                }
                return rList;
            };
            CrossServerWifeBattleCfg.prototype.getMulServerPRankRewards = function (serverNum) {
                // return this.rankList1;
                var rList = [];
                for (var key in this.rankList1) {
                    // rList.push(this.rankList1[key]);
                    var rl = this.rankList1[key];
                    var serverRange = rl.serverRange;
                    // if(serverNum >= serverRange[0] && serverNum <= serverRange[1]){
                    if (serverNum >= serverRange[0]) {
                        rList[key] = rl;
                    }
                }
                return rList;
            };
            CrossServerWifeBattleCfg.prototype.judgeParam = function (zonenum) {
                for (var i in this.serverList1) {
                    var unit = this.serverList1[i];
                    if (zonenum <= Number(unit.rank[1])) {
                        unit.rank[1] = zonenum;
                        break;
                    }
                }
                for (var j in this.serverList1) {
                    if (Number(i) < Number(j)) {
                        delete this.serverList1[j];
                    }
                }
            };
            CrossServerWifeBattleCfg.prototype.getServerRankRewards = function () {
                var rList = [];
                for (var key in this.rankList) {
                    rList.push(this.rankList[key]);
                }
                return rList;
            };
            return CrossServerWifeBattleCfg;
        }());
        AcCfg.CrossServerWifeBattleCfg = CrossServerWifeBattleCfg;
        __reflect(CrossServerWifeBattleCfg.prototype, "Config.AcCfg.CrossServerWifeBattleCfg");
    })(AcCfg = Config.AcCfg || (Config.AcCfg = {}));
})(Config || (Config = {}));
