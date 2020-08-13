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
 * 帮会勤王除恶api
 * author 张朝阳
 * date 2019/4/16
 * @class AllianceWeekVoApi
 */
var AllianceWeekVoApi = (function (_super) {
    __extends(AllianceWeekVoApi, _super);
    function AllianceWeekVoApi() {
        var _this = _super.call(this) || this;
        _this.info = null;
        _this.id = 0;
        _this.lastday = 0;
        _this.version = 0;
        /**活动时间 */
        _this.weekActiveTime = [];
        return _this;
    }
    AllianceWeekVoApi.prototype.formatData = function (data) {
        this.info = data.info;
        this.id = data.id;
        this.lastday = data.lastday;
        this.version = data.version;
    };
    /**获得当前boss信息 */
    AllianceWeekVoApi.prototype.getNowBoss = function () {
        if (this.info.boss && this.info.boss.id && this.info.boss.id != Config.AllianceweekendCfg.lastFoeItemCfg().id) {
            return this.info.boss;
        }
        return null;
    };
    /**获取击杀数 和 总数量 */
    AllianceWeekVoApi.prototype.getKillValueAndSumValue = function () {
        var cfg = Config.AllianceweekendCfg.getFoeItemCfgList();
        var sum = cfg.length - 1;
        var kill = 0;
        var boss = this.getNowBoss();
        if (boss) {
            for (var i = 0; i < cfg.length; i++) {
                if (cfg[i].id == boss.id) {
                    kill = i;
                    break;
                }
            }
        }
        else {
            kill = sum;
        }
        return { kill: kill, sum: sum };
    };
    /**buff 数量 */
    AllianceWeekVoApi.prototype.getbuffValue = function () {
        return this.info.buynum;
    };
    /**加成buff百分值 */
    AllianceWeekVoApi.prototype.getAdditionBuff = function () {
        return Math.round(this.getbuffValue() * Config.AllianceweekendCfg.powerUp.powerAdd * 100);
    };
    /**加成buff百分值 */
    AllianceWeekVoApi.prototype.getNextAdditionBuff = function () {
        var num = (this.getbuffValue() + 1) > Config.AllianceweekendCfg.powerUp.limit ? Config.AllianceweekendCfg.powerUp.limit : (this.getbuffValue() + 1);
        return Math.round(num * Config.AllianceweekendCfg.powerUp.powerAdd * 100);
    };
    /**时间 */
    AllianceWeekVoApi.prototype.formatDataWeekActiveTime = function (data) {
        this.weekActiveTime = data;
    };
    /**是否在活动期间内 包含展示期 */
    AllianceWeekVoApi.prototype.checkActivityStart = function () {
        if (this.weekActiveTime.length > 0 && this.weekActiveTime[0] <= GameData.serverTime && this.weekActiveTime[this.weekActiveTime.length - 1] >= GameData.serverTime) {
            return true;
        }
        return false;
    };
    /**是否在战斗时间 */
    AllianceWeekVoApi.prototype.checkBattleTime = function () {
        if ((GameData.serverTime >= this.weekActiveTime[0] && GameData.serverTime <= this.weekActiveTime[1]) || (GameData.serverTime >= this.weekActiveTime[2] && GameData.serverTime <= this.weekActiveTime[3])) {
            return true;
        }
        return false;
    };
    /**是否在休战期 */
    AllianceWeekVoApi.prototype.checkRestTime = function () {
        if ((GameData.serverTime > this.weekActiveTime[1] && GameData.serverTime < this.weekActiveTime[2])) {
            return true;
        }
        return false;
    };
    /**获得休战剩余的时间 */
    AllianceWeekVoApi.prototype.getRestTime = function () {
        return App.DateUtil.getFormatBySecond(this.weekActiveTime[2] - GameData.serverTime, 1);
    };
    /**活动时间 */
    AllianceWeekVoApi.prototype.acTimeAndHour = function () {
        var st = this.weekActiveTime[0];
        var et = this.weekActiveTime[this.weekActiveTime.length - 2];
        return App.DateUtil.getOpenLocalTime(st, et, true);
    };
    /**活动时间 */
    AllianceWeekVoApi.prototype.acTimeAndHourUnBattle = function () {
        var st = this.weekActiveTime[1];
        var et = this.weekActiveTime[2];
        return App.DateUtil.getOpenLocalTime(st, et, true);
    };
    /**
     * 活动结束倒计时，格式：00：00：00
     */
    AllianceWeekVoApi.prototype.acCountDown = function () {
        var st = this.weekActiveTime[0];
        var et = this.weekActiveTime[this.weekActiveTime.length - 2];
        return App.DateUtil.getFormatBySecond((et - GameData.serverTime), 1);
    };
    /**是否在活动期间 */
    AllianceWeekVoApi.prototype.checkActiveStart = function () {
        var st = this.weekActiveTime[0];
        var et = this.weekActiveTime[this.weekActiveTime.length - 2];
        if (st <= GameData.serverTime && et >= GameData.serverTime) {
            return true;
        }
        return false;
    };
    /**是否在展示期 */
    AllianceWeekVoApi.prototype.checkIsHasExtraTime = function () {
        var acet = this.weekActiveTime[this.weekActiveTime.length - 2];
        var et = this.weekActiveTime[this.weekActiveTime.length - 1];
        if (GameData.serverTime > acet && GameData.serverTime <= et) {
            return true;
        }
        return false;
    };
    /**本地化开启时间 */
    AllianceWeekVoApi.prototype.formatOpenHour = function () {
        var time = Config.AllianceweekendCfg.openTime[0].duration;
        var stHour = Math.floor(time[0] / 3600) % 24;
        var etHour = Math.floor(time[1] / 3600) % 24;
        return App.DateUtil.getLocalTimeZoneTime(stHour, etHour);
    };
    /**战斗开启期间显示红点 */
    AllianceWeekVoApi.prototype.checkInBattleRedDot = function () {
        if (Api.playerVoApi.getPlayerAllianceId() > 0 && Api.switchVoApi.checkAllianceweekend() && Api.allianceVoApi && Api.allianceVoApi.getAllianceVo() && Api.allianceVoApi.getAllianceVo().level >= Config.AllianceweekendCfg.allianceLv && Api.myAllianceWeekVoApi.checkUserJoinAllianceTime()) {
            if (this.checkActivityStart() && this.checkBattleTime()) {
                if ((GameData.serverTime >= this.weekActiveTime[0] && GameData.serverTime <= this.weekActiveTime[1])) {
                    var key = Api.playerVoApi.getPlayerID() + "allianceWeekBoss1";
                    var st = LocalStorageManager.get(key);
                    if (st && Number(st) == this.weekActiveTime[0]) {
                        return false;
                    }
                }
                else if (GameData.serverTime >= this.weekActiveTime[2] && GameData.serverTime <= this.weekActiveTime[3]) {
                    var key = Api.playerVoApi.getPlayerID() + "allianceWeekBoss2";
                    var st = LocalStorageManager.get(key);
                    if (st && Number(st) == this.weekActiveTime[2]) {
                        return false;
                    }
                }
                return true;
            }
        }
        return false;
    };
    //设置在战斗中红点标志位
    AllianceWeekVoApi.prototype.setinBattleRedDotFlag = function () {
        if (this.weekActiveTime && this.weekActiveTime.length > 0) {
            if (this.checkBattleTime()) {
                if ((GameData.serverTime >= this.weekActiveTime[0] && GameData.serverTime <= this.weekActiveTime[1])) {
                    var key = Api.playerVoApi.getPlayerID() + "allianceWeekBoss1";
                    LocalStorageManager.set(key, String(this.weekActiveTime[0]));
                }
                else if (GameData.serverTime >= this.weekActiveTime[2] && GameData.serverTime <= this.weekActiveTime[3]) {
                    var key = Api.playerVoApi.getPlayerID() + "allianceWeekBoss2";
                    LocalStorageManager.set(key, String(this.weekActiveTime[2]));
                }
            }
        }
    };
    AllianceWeekVoApi.prototype.dispose = function () {
        this.info = null;
        this.id = 0;
        this.lastday = 0;
        this.version = 0;
        this.weekActiveTime = [];
        _super.prototype.dispose.call(this);
    };
    return AllianceWeekVoApi;
}(BaseVoApi));
__reflect(AllianceWeekVoApi.prototype, "AllianceWeekVoApi");
//# sourceMappingURL=AllianceWeekVoApi.js.map