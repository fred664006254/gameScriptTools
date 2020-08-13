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
var AcLadderTournamentVo = (function (_super) {
    __extends(AcLadderTournamentVo, _super);
    function AcLadderTournamentVo() {
        var _this = _super.call(this) || this;
        _this.tmpReward = null;
        _this.selIdx = 0;
        _this.task = null;
        _this.shop = null;
        return _this;
    }
    AcLadderTournamentVo.prototype.initData = function (data) {
        for (var key in data) {
            this[key] = data[key];
        }
    };
    Object.defineProperty(AcLadderTournamentVo.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    //是否满足条件
    AcLadderTournamentVo.prototype.checkShow = function () {
        if (this.cfg && Api.playerVoApi.getPlayerLevel() >= this.cfg.needLv && Api.servantVoApi.getServantCount() >= this.cfg.needServant) {
            return true;
        }
        return false;
    };
    AcLadderTournamentVo.prototype.getArr = function (key) {
        var arr = [];
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        if (!cfg) {
            return [];
        }
        var list = cfg[key];
        for (var key2 in list) {
            if (list[key2]) {
                if (key == "shop") {
                    var itemCfg = list[key2];
                    if (GameData.formatRewardItem(itemCfg.item)[0]) {
                        arr.push(list[key2]);
                    }
                }
                else {
                    arr.push(list[key2]);
                }
            }
        }
        return arr;
    };
    /**
     *  充值奖励 充值档位 领没领
     */
    AcLadderTournamentVo.prototype.isReward = function (type, id) {
        var key = String(type);
        if (this.task && this.task.f && this.task.f[key] && this.task.f[key][id]) {
            return true;
        }
        return false;
    };
    /**
     * 充值的进度
     */
    AcLadderTournamentVo.prototype.getValue = function (type) {
        var key = String(type);
        if (this.task && this.task.v && this.task.v[key]) {
            return this.task.v[key];
        }
        return 0;
    };
    AcLadderTournamentVo.prototype.getShopNum = function (id) {
        if (this.shop && this.shop[id]) {
            return this.shop[id];
        }
        return 0;
    };
    Object.defineProperty(AcLadderTournamentVo.prototype, "isShowRedDot", {
        get: function () {
            if (this.checkTaskRedDot()) {
                return true;
            }
            if (this.checkShow() && !this.checkIsInEndShowTime() && !Api.laddertournamentVoApi.checkIsTruce()) {
                var fightNum = Api.laddertournamentVoApi.getFightTimes();
                var totalNum = this.cfg.freeNum;
                if (totalNum > fightNum) {
                    return true;
                }
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    AcLadderTournamentVo.prototype.checkTaskRedDot = function () {
        for (var i = 1; i <= 4; ++i) {
            if (this.getpublicRedDot(i)) {
                return true;
            }
        }
        return false;
    };
    //充值奖励
    AcLadderTournamentVo.prototype.getpublicRedDot = function (t) {
        //充值
        var cfg = this.cfg;
        if (!cfg) {
            return false;
        }
        var taskcfg = this.cfg.getTaskCfg(t);
        for (var i in taskcfg) {
            var unit = taskcfg[i];
            var curCharge = this.getValue(unit.taskType);
            if (curCharge >= unit.value && this.isReward(t, unit.id) == false && (t == 1 || this.checkShow())) {
                return true;
            }
        }
        return false;
    };
    Object.defineProperty(AcLadderTournamentVo.prototype, "acCountDown17", {
        get: function () {
            var lesstime = this.et - GameData.serverTime - this.config.extraTime * 86400;
            if (lesstime > 0) {
                return LanguageManager.getlocal("acLadder_TimeCountDown2", [App.DateUtil.getFormatBySecond((lesstime), 17)]);
            }
            else {
                return LanguageManager.getlocal("acLadder_TimeCountDownEnd2");
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcLadderTournamentVo.prototype, "acCountDownEndTime", {
        get: function () {
            var lesstime = this.et - GameData.serverTime;
            if (lesstime > 0) {
                return LanguageManager.getlocal("acLadder_TimeCountDownEndTime", [App.DateUtil.getFormatBySecond((lesstime), 17)]);
            }
            else {
                return LanguageManager.getlocal("acLadder_TimeCountDownEnd2");
            }
        },
        enumerable: true,
        configurable: true
    });
    // public checkIsInEndShowTime():boolean
    // {
    // 	return true;
    // }
    AcLadderTournamentVo.prototype.dispose = function () {
        this.task = null;
        this.tmpReward = null;
        this.selIdx = 0;
    };
    return AcLadderTournamentVo;
}(AcBaseVo));
__reflect(AcLadderTournamentVo.prototype, "AcLadderTournamentVo");
//# sourceMappingURL=AcLadderTournamentVo.js.map