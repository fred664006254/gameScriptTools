var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Config;
(function (Config) {
    var AcCfg;
    (function (AcCfg) {
        /**
         * 擂台配置
         */
        var CrossServerAtkRaceCfg = (function () {
            function CrossServerAtkRaceCfg() {
            }
            CrossServerAtkRaceCfg.prototype.formatData = function (data) {
                this.unlock = data.unlock;
                this.servantLv = data.servantLv;
                this.dailyNum = data.dailyNum;
                this.intervalTime = data.intervalTime;
                this.fightAdd = data.fightAdd;
                this.revenge = data.revenge;
                this.challenge = data.challenge;
                this.hunt = data.hunt;
                this.parameter1 = data.parameter1;
                this.parameter3 = data.parameter3;
                //奖励巾帼
                if (data.specialReward) {
                    this.specialReward = data.specialReward;
                }
                this.iniAtt = data.iniAtt;
                this.juniorAtt = data.juniorAtt;
                this.mediumAtt = data.mediumAtt;
                this.seniorAtt = data.seniorAtt;
                this.winServer = data.winServer;
                this.loseServer = data.loseServer;
                this.rankList = data.rankList;
                this.rankList1 = data.rankList1;
                this.serverList1 = data.serverList1;
                if (data.crossServerType) {
                    this.crossServerType = data.crossServerType;
                }
            };
            //是否是跨服/多区服争霸赛
            CrossServerAtkRaceCfg.prototype.getCrossServerType = function () {
                if (this.crossServerType) {
                    return this.crossServerType + "";
                }
                return "";
            };
            /**
             * 每日武馆次数
             */
            CrossServerAtkRaceCfg.prototype.getDailyNum = function () {
                return this.dailyNum;
            };
            /**
             * 额外出战系数
             */
            CrossServerAtkRaceCfg.prototype.getParameter1 = function () {
                return this.parameter1;
            };
            /**
             * 门客等级限制
             */
            CrossServerAtkRaceCfg.prototype.getServantLv = function () {
                return this.servantLv;
            };
            /**
             * 每次间隔时间 单位（秒）
             */
            CrossServerAtkRaceCfg.prototype.getIntervalTime = function () {
                return this.intervalTime;
            };
            /**
             * 解锁条件  拥有 X 个门客
             */
            CrossServerAtkRaceCfg.prototype.getUnlock = function () {
                return this.unlock;
            };
            /**
             * 初始属性
             */
            CrossServerAtkRaceCfg.prototype.getInitAtt = function (key) {
                return this.iniAtt[key];
            };
            /**
             * 初级属性
             */
            CrossServerAtkRaceCfg.prototype.getJuniorAtt = function (key) {
                return this.juniorAtt[key];
            };
            /**
             * 中级属性
             */
            CrossServerAtkRaceCfg.prototype.getMediumAtt = function (key) {
                return this.mediumAtt[key];
            };
            /**
             * 高级属性
             */
            CrossServerAtkRaceCfg.prototype.getSeniorAtt = function (key) {
                return this.seniorAtt[key];
            };
            CrossServerAtkRaceCfg.prototype.getFightAdd = function () {
                return this.fightAdd;
            };
            /**
             * 上榜条件 击败多少名
             */
            CrossServerAtkRaceCfg.prototype.getbeatNum = function () {
                return this.parameter3;
            };
            CrossServerAtkRaceCfg.prototype.getWinServerRewards = function () {
                return GameData.getRewardItemIcons(this.winServer, true, true);
            };
            CrossServerAtkRaceCfg.prototype.getLossServerRewards = function () {
                return GameData.getRewardItemIcons(this.loseServer, true, true);
            };
            CrossServerAtkRaceCfg.prototype.getServerRankRewards = function () {
                return this.rankList;
            };
            CrossServerAtkRaceCfg.prototype.getMulServerRewards = function (zonenum) {
                this.judgeParam(zonenum);
                return this.serverList1;
            };
            CrossServerAtkRaceCfg.prototype.getMulServerPRankRewards = function (serverNum) {
                var curList = {};
                for (var key in this.rankList1) {
                    var rl = this.rankList1[key];
                    var serverRange = rl.serverRange;
                    // if(serverNum >= serverRange[0] && serverNum <= serverRange[1]){
                    if (serverNum >= serverRange[0]) {
                        curList[key] = rl;
                    }
                }
                return curList;
                // return this.rankList1;
            };
            CrossServerAtkRaceCfg.prototype.judgeParam = function (zonenum) {
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
            return CrossServerAtkRaceCfg;
        }());
        AcCfg.CrossServerAtkRaceCfg = CrossServerAtkRaceCfg;
        __reflect(CrossServerAtkRaceCfg.prototype, "Config.AcCfg.CrossServerAtkRaceCfg");
    })(AcCfg = Config.AcCfg || (Config.AcCfg = {}));
})(Config || (Config = {}));
