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
/**
 * my 帮会勤王除恶api
 * author 张朝阳
 * date 2019/4/16
 * @class MyAllianceWeekVoApi
 */
var MyAllianceWeekVoApi = (function (_super) {
    __extends(MyAllianceWeekVoApi, _super);
    function MyAllianceWeekVoApi() {
        var _this = _super.call(this) || this;
        _this.info = null;
        _this.lastday = 0;
        _this.score = 0;
        _this.servant = 0;
        _this.uid = 0;
        _this.version = 0;
        return _this;
    }
    MyAllianceWeekVoApi.prototype.formatData = function (data) {
        this.info = data.info;
        this.lastday = data.lastday;
        this.score = data.score;
        this.servant = data.servant;
        this.uid = data.uid;
        this.version = data.version;
    };
    /**个人贡献 */
    MyAllianceWeekVoApi.prototype.getScore = function () {
        return this.score;
    };
    MyAllianceWeekVoApi.prototype.getShowFlag = function () {
        return this.info.showflag;
    };
    /**boss 分数 */
    MyAllianceWeekVoApi.prototype.getBossScore = function (id) {
        var killAndScore = { score: 0, killscore: 0 };
        if (this.info.getScores[id]) {
            killAndScore = { score: this.info.getScores[id][0], killscore: this.info.getScores[id][1] };
        }
        return killAndScore;
    };
    /**门客是否已经出战过 */
    MyAllianceWeekVoApi.prototype.checkServantState = function (servantId) {
        if (this.servant[servantId] && (this.servant[servantId] == 1 || this.servant[servantId] == 2)) {
            return true;
        }
        return false;
    };
    /**门客是否可恢复 */
    MyAllianceWeekVoApi.prototype.checkServantRecover = function (servantId) {
        if (this.servant[servantId] && (this.servant[servantId] == 1)) {
            return true;
        }
        return false;
    };
    MyAllianceWeekVoApi.prototype.checkServantUnRecover = function (servantId) {
        if (this.servant[servantId] && (this.servant[servantId] == 2)) {
            return true;
        }
        return false;
    };
    /**获得排序后的门客数据 */
    MyAllianceWeekVoApi.prototype.getServantList = function () {
        var servantList = [];
        var servantKey = Api.servantVoApi.getServantInfoIdListWithSort(1);
        for (var key in servantKey) {
            var servantInfoVo = Api.servantVoApi.getServantObj(servantKey[key]);
            var servantCombat = Math.floor(Api.servantVoApi.getServantCombatWithId(servantKey[key]) * (Api.allianceWeekVoApi.getAdditionBuff() + 100) / 100);
            var servantState = this.checkServantUnRecover(servantKey[key]) ? 2 : this.checkServantState(servantKey[key]) ? 1 : 0;
            var servant = { servantInfoVo: servantInfoVo, servantCombat: servantCombat, servantState: servantState };
            servantList.push(servant);
        }
        servantList.sort(function (a, b) {
            if (a.servantState == b.servantState) {
                if (Api.switchVoApi.checkOpenExile()) {
                    if (a.servantInfoVo.banishSt && (!b.servantInfoVo.banishSt)) {
                        return 1;
                    }
                    else if (a.servantInfoVo.banishSt && b.servantInfoVo.banishSt) {
                        return b.servantCombat - a.servantCombat;
                        ;
                    }
                    else if ((!a.servantInfoVo.banishSt) && b.servantInfoVo.banishSt) {
                        return -1;
                    }
                    else if ((!a.servantInfoVo.banishSt) && (!b.servantInfoVo.banishSt)) {
                        return b.servantCombat - a.servantCombat;
                        ;
                    }
                }
                else {
                    return b.servantCombat - a.servantCombat;
                }
            }
            else {
                return a.servantState - b.servantState;
            }
        });
        return servantList;
    };
    /**获得门客出战的信息 */
    MyAllianceWeekVoApi.prototype.getGoFightServant = function () {
        var servantList = this.getServantList();
        var servantKillBossList = [];
        var bossInfo = Api.allianceWeekVoApi.getNowBoss();
        if (bossInfo) {
            for (var key in servantList) {
                if (servantList[key].servantState == 0 && servantList[key].servantCombat >= bossInfo.hp) {
                    servantKillBossList.push(servantList[key]);
                }
            }
        }
        if (servantKillBossList.length > 0) {
            return servantKillBossList[servantKillBossList.length - 1].servantInfoVo;
        }
        else if (servantList[0].servantState == 0) {
            return servantList[0].servantInfoVo;
        }
        return null;
    };
    /**宝箱是否已经领取了 */
    MyAllianceWeekVoApi.prototype.checkBoxReceive = function (id) {
        if (this.info.scorerewards[id]) {
            return true;
        }
        return false;
    };
    /**
    * 获得充值奖励的配置
    */
    MyAllianceWeekVoApi.prototype.getSortScoreCfg = function () {
        var rechargeData = Config.AllianceweekendCfg.peScoreItemCfgList;
        for (var i = 0; i < rechargeData.length; i++) {
            if (this.checkBoxReceive(rechargeData[i].id)) {
                rechargeData[i].sortId = rechargeData.length + Number(rechargeData[i].id);
                continue;
            }
            else if (this.getScore() >= rechargeData[i].score) {
                rechargeData[i].sortId = (Number(rechargeData[i].id)) - rechargeData.length - 1;
                continue;
            }
            else {
                rechargeData[i].sortId = Number(rechargeData[i].id);
                continue;
            }
        }
        return rechargeData;
    };
    /**npc奖励是否已经领取了 */
    MyAllianceWeekVoApi.prototype.checkNpcReceive = function (id) {
        if (this.info.killrewards[id]) {
            return true;
        }
        return false;
    };
    /**红点显示 */
    MyAllianceWeekVoApi.prototype.checkShowDot = function () {
        if (!Api.allianceWeekVoApi.checkActivityStart()) {
            return false;
        }
        return this.checkBoxDot() || this.checkNpcDot();
    };
    /**玩家加入帮会时间是否满足48小时 */
    MyAllianceWeekVoApi.prototype.checkUserJoinAllianceTime = function () {
        var myAllianceVo = Api.allianceVoApi.getMyAllianceVo();
        var joint = myAllianceVo.joint + 2 * 86400;
        if (joint <= GameData.serverTime) {
            return true;
        }
        return false;
    };
    /**剩余时间 */
    MyAllianceWeekVoApi.prototype.getJoinBattleTime = function () {
        var myAllianceVo = Api.allianceVoApi.getMyAllianceVo();
        var t = myAllianceVo.joint + 2 * 86400 - GameData.serverTime;
        return App.DateUtil.getFormatBySecond(t, 1);
    };
    /**宝箱红点 */
    MyAllianceWeekVoApi.prototype.checkBoxDot = function () {
        var cfg = Config.AllianceweekendCfg.peScoreItemCfgList;
        for (var i = 0; i < cfg.length; i++) {
            if (this.getScore() >= cfg[i].score && (!this.checkBoxReceive(cfg[i].id))) {
                return true;
            }
        }
        return false;
    };
    /**npc红点 */
    MyAllianceWeekVoApi.prototype.checkNpcDot = function () {
        var cfg = Config.AllianceweekendCfg.getFoeItemCfgList();
        var bossId = Api.allianceWeekVoApi.getNowBoss() ? Api.allianceWeekVoApi.getNowBoss().id : Config.AllianceweekendCfg.lastFoeItemCfg().id;
        for (var i = 0; i < cfg.length; i++) {
            if (bossId > cfg[i].id && (!this.checkNpcReceive(cfg[i].id))) {
                return true;
            }
        }
        return false;
    };
    MyAllianceWeekVoApi.prototype.dispose = function () {
        this.info = null;
        this.lastday = 0;
        this.score = 0;
        this.servant = 0;
        this.uid = 0;
        this.version = 0;
        _super.prototype.dispose.call(this);
    };
    return MyAllianceWeekVoApi;
}(BaseVoApi));
__reflect(MyAllianceWeekVoApi.prototype, "MyAllianceWeekVoApi");
//# sourceMappingURL=MyAllianceWeekVoApi.js.map