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
 * 东郊狩猎
 * author yangchengguo
 * date 2019.8.5
 * @class AcHuntingVo
 */
var AcHuntingVo = (function (_super) {
    __extends(AcHuntingVo, _super);
    function AcHuntingVo() {
        return _super.call(this) || this;
    }
    AcHuntingVo.prototype.initData = function (data) {
        for (var key in data) {
            this[key] = data[key];
        }
        if (data.lv) {
            this.lv = data.lv;
        }
        if (data.damage) {
            this.damage = data.damage;
        }
    };
    //boss id
    AcHuntingVo.prototype.getBossId = function () {
        return this.lv;
    };
    //boss血量
    AcHuntingVo.prototype.getBossTotalBloodById = function (id) {
        var list = this.cfg.getAchievementList();
        for (var i = 0; i < list.length; i++) {
            if (Number(id) == Number(list[i].id)) {
                return list[i].npcHp;
            }
        }
        return 0;
    };
    //获取剩余血量
    AcHuntingVo.prototype.getBossRemainBloodById = function (id) {
        if (this.lv > Number(id)) {
            return 0;
        }
        else if (this.lv == Number(id)) {
            return this.getBossTotalBloodById(id) - this.damage;
        }
        else {
            return this.getBossTotalBloodById(id);
        }
    };
    //当前伤害值
    AcHuntingVo.prototype.getDamage = function () {
        return this.damage;
    };
    //是否免费
    AcHuntingVo.prototype.isFree = function () {
        if (this.isfree > 0) {
            return true;
        }
        return false;
    };
    /**获取箭的数量 */
    AcHuntingVo.prototype.getArrowNum = function () {
        var num = 0;
        if (this.v) {
            num = this.v;
        }
        return num;
    };
    //获取攻击位置的单次伤害值
    AcHuntingVo.prototype.getSingleDamageByHitPos = function (hitPos) {
        var attack = this.cfg.attack;
        return this.cfg.multiple[hitPos] * attack;
    };
    AcHuntingVo.prototype.isLastBoss = function () {
        if (this.lv == this.cfg.getAchievementList().length + 1) {
            return true;
        }
        return false;
    };
    AcHuntingVo.prototype.isDead = function (currDamage) {
        if (this.isLastBoss()) {
            return false;
        }
        if (this.damage + currDamage >= this.getBossTotalBloodById(this.lv)) {
            return true;
        }
        return false;
    };
    //获取累积充值数目
    AcHuntingVo.prototype.getChargeNum = function () {
        var num = 0;
        if (this.rinfo && this.rinfo.v) {
            num = this.rinfo.v;
        }
        return num;
    };
    //累积充值领取判断
    AcHuntingVo.prototype.isGetRechargeById = function (id) {
        if (this.rinfo && this.rinfo.flags && this.rinfo.flags[id]) {
            return true;
        }
        return false;
    };
    //进度奖励判断
    AcHuntingVo.prototype.isGetKillRewardById = function (id) {
        if (this.rewards && this.rewards[id]) {
            return true;
        }
        return false;
    };
    //倒计时
    AcHuntingVo.prototype.getCountDown = function () {
        var et = this.et - this.cfg.extraTime * 86400;
        if (et < GameData.serverTime) {
            return LanguageManager.getlocal("acPunishEnd");
        }
        return App.DateUtil.getFormatBySecond((et - GameData.serverTime), 1);
    };
    Object.defineProperty(AcHuntingVo.prototype, "acTimeAndHour", {
        //活动日期时间显示
        get: function () {
            var et = this.et - 86400 * this.cfg.extraTime;
            return App.DateUtil.getOpenLocalTime(this.st, et, true);
        },
        enumerable: true,
        configurable: true
    });
    //是否在活动期间
    AcHuntingVo.prototype.isInActivity = function () {
        return GameData.serverTime >= this.st && GameData.serverTime < this.et - 86400 * this.cfg.extraTime;
    };
    //是否展示第一次进入面板
    AcHuntingVo.prototype.isShowFirstInView = function () {
        var key = "" + this.aid + this.code + Api.playerVoApi.getPlayerID();
        var value = LocalStorageManager.get(key);
        if (value) {
            if (Number(value) == this.et) {
                return false;
            }
            else {
                LocalStorageManager.set(key, String(this.et));
                return true;
            }
        }
        else {
            LocalStorageManager.set(key, String(this.et));
            return true;
        }
    };
    Object.defineProperty(AcHuntingVo.prototype, "isShowRedDot", {
        get: function () {
            if (this.isShowChargeRewardRedDot() || this.isShowKillRewardRedDot() || this.isCanPlayRedDot() || this.isShowQingyuanRedDot()) {
                return true;
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    //是否有情缘红点
    AcHuntingVo.prototype.isShowQingyuanRedDot = function () {
        if ((this.code == 3 || this.code == 4) && Api.switchVoApi.checkOpenOfficialCareer() && Api.switchVoApi.checkOpenQingYuanHuiJuan() && Api.switchVoApi.checkOpenQingYuan("winterIsComing")) {
            if (Api.playerVoApi.getPlayerLevel() >= Config.CareerCfg.getStoryNeedLv()) {
                if (Api.encounterVoApi.isShowNpc()) {
                    return true;
                }
            }
        }
        return false;
    };
    //是否显示充值奖励红点
    AcHuntingVo.prototype.isShowChargeRewardRedDot = function () {
        var rechargeData = this.cfg.getRechargeList();
        for (var i = 0; i < rechargeData.length; i++) {
            if (this.isGetRechargeById(rechargeData[i].id) == false && this.getChargeNum() >= rechargeData[i].needGem) {
                return true;
            }
        }
        return false;
    };
    //是否显示进度奖励红点
    AcHuntingVo.prototype.isShowKillRewardRedDot = function () {
        var data = this.cfg.getAchievementList();
        for (var i = 0; i < data.length; i++) {
            if (this.isGetKillRewardById(data[i].id) == false && this.lv > data[i].id) {
                return true;
            }
        }
        return false;
    };
    //有箭可用的时候显示小红点
    AcHuntingVo.prototype.isCanPlayRedDot = function () {
        if (this.isInActivity() && (this.isfree > 0 || this.getArrowNum() > 0)) {
            return true;
        }
        return false;
    };
    //获得充值奖励的配置
    AcHuntingVo.prototype.getSortRechargeCfg = function () {
        var rechargeData = this.cfg.getRechargeList();
        for (var i = 0; i < rechargeData.length; i++) {
            if (this.isGetRechargeById(rechargeData[i].id)) {
                rechargeData[i].sortId = rechargeData.length + Number(rechargeData[i].id);
            }
            else if (this.getChargeNum() >= rechargeData[i].needGem) {
                rechargeData[i].sortId = (Number(rechargeData[i].id)) - rechargeData.length - 1;
            }
            else {
                rechargeData[i].sortId = Number(rechargeData[i].id);
            }
        }
        rechargeData.sort(function (a, b) { return a.sortId - b.sortId; });
        return rechargeData;
    };
    //击杀排序
    AcHuntingVo.prototype.getSortAchievementCfg = function () {
        var achievementData = this.cfg.getAchievementList();
        for (var i = 0; i < achievementData.length; i++) {
            if (this.isGetKillRewardById(achievementData[i].id)) {
                achievementData[i].sortId = achievementData.length + Number(achievementData[i].id);
            }
            else if (this.lv > achievementData[i].id) {
                achievementData[i].sortId = (Number(achievementData[i].id)) - achievementData.length - 1;
            }
            else {
                achievementData[i].sortId = Number(achievementData[i].id);
            }
        }
        achievementData.sort(function (a, b) { return a.sortId - b.sortId; });
        return achievementData;
    };
    //获取获得皮肤所需要的元宝
    AcHuntingVo.prototype.getSkinNeedGem = function () {
        var rechargeData = this.cfg.getRechargeList();
        for (var i = 0; i < rechargeData.length; i++) {
            var rewards = rechargeData[i].getReward.split("|");
            for (var key in rewards) {
                var id = rewards[key].split("_")[1];
                if (id == "2323") {
                    return rechargeData[i].needGem;
                }
            }
        }
        return 0;
    };
    //获取箭移动轨迹时间
    AcHuntingVo.prototype.getArrowMoveTime = function (posArr) {
        var timeArr = [];
        for (var i = 0; i < posArr.length; i++) {
            var currPos = posArr[i];
            var nextPos = posArr[i + 1];
            if (!nextPos) {
                nextPos = posArr[0];
            }
            var time = Math.sqrt((nextPos.x - currPos.x) * (nextPos.x - currPos.x) + (nextPos.y - currPos.y) * (nextPos.y - currPos.y)) * 10;
            timeArr[i] = time;
        }
        return timeArr;
    };
    Object.defineProperty(AcHuntingVo.prototype, "cfg", {
        //配置
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    return AcHuntingVo;
}(AcBaseVo));
__reflect(AcHuntingVo.prototype, "AcHuntingVo");
//# sourceMappingURL=AcHuntingVo.js.map