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
        var CrossServerPowerCfg = (function () {
            function CrossServerPowerCfg() {
            }
            CrossServerPowerCfg.prototype.formatData = function (data) {
                if (data.crossServerType) {
                    this._crossServerType = data.crossServerType;
                }
                this._winServer = data.winServer;
                this._loseServer = data.loseServer;
                this._rankList = data.rankList;
                this._rankList1 = data.rankList1;
                this._serverList1 = data.serverList1;
                //奖励巾帼
                if (data.specialReward) {
                    this.specialReward = data.specialReward;
                }
            };
            //是否跨服/多区服争霸赛资格
            CrossServerPowerCfg.prototype.getCrossServerType = function () {
                if (this._crossServerType) {
                    return this._crossServerType + "";
                }
                return "";
            };
            CrossServerPowerCfg.prototype.getWinServerRewards = function () {
                return GameData.getRewardItemIcons(this._winServer, true, true);
            };
            CrossServerPowerCfg.prototype.getLossServerRewards = function () {
                return GameData.getRewardItemIcons(this._loseServer, true, true);
            };
            CrossServerPowerCfg.prototype.getMulServerRewards = function (zonenum) {
                this.judgeParam(zonenum);
                return this._serverList1;
            };
            CrossServerPowerCfg.prototype.getMulServerPRankRewards = function (serverNum) {
                var curList = {};
                for (var key in this._rankList1) {
                    var rl = this._rankList1[key];
                    var serverRange = rl.serverRange;
                    // if(serverNum >= serverRange[0] && serverNum <= serverRange[1]){
                    // if(serverNum <= serverRange[1]){
                    if (serverNum >= serverRange[0]) {
                        curList[key] = rl;
                    }
                }
                return curList;
                // return this._rankList1;
            };
            CrossServerPowerCfg.prototype.judgeParam = function (zonenum) {
                for (var i in this._serverList1) {
                    var unit = this._serverList1[i];
                    if (zonenum <= Number(unit.rank[1])) {
                        unit.rank[1] = zonenum;
                        break;
                    }
                }
                for (var j in this._serverList1) {
                    if (Number(i) < Number(j)) {
                        delete this._serverList1[j];
                    }
                }
            };
            CrossServerPowerCfg.prototype.getServerRankRewards = function () {
                return this._rankList;
            };
            return CrossServerPowerCfg;
        }());
        AcCfg.CrossServerPowerCfg = CrossServerPowerCfg;
        __reflect(CrossServerPowerCfg.prototype, "Config.AcCfg.CrossServerPowerCfg");
    })(AcCfg = Config.AcCfg || (Config.AcCfg = {}));
})(Config || (Config = {}));
