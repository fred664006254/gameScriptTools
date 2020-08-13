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
var AcBattlePassVo = (function (_super) {
    __extends(AcBattlePassVo, _super);
    function AcBattlePassVo() {
        var _this = _super.call(this) || this;
        //特殊悬赏任务
        _this.atask = null;
        //当前经验
        _this.exp = 0;
        //当前已领取几级奖励
        _this.getlv = 0;
        //当前等级
        _this.lv = 0;
        //当前轮次
        _this.nowround = 0;
        //每轮任务
        _this.rtask = null;
        //解锁的战令
        _this.unlockBP = '';
        //令牌数目
        _this.shopscore = 0;
        //兑换信息
        _this.sinfo = null;
        //购买等级次数
        _this.buylv = 0;
        _this.selIdx = 0;
        _this.svtBanPos = null;
        _this.wifeBanPos = null;
        return _this;
    }
    AcBattlePassVo.prototype.dispose = function () {
        this.atask = null;
        this.exp = 0;
        this.getlv = 0;
        this.lv = 0;
        this.nowround = 0;
        this.rtask = null;
        this.unlockBP = '';
        this.shopscore = 0;
        this.sinfo = null;
        this.selIdx = 0;
        this.svtBanPos = null;
        this.wifeBanPos = null;
        _super.prototype.dispose.call(this);
    };
    AcBattlePassVo.prototype.initData = function (data) {
        _super.prototype.initData.call(this, data);
        for (var key in data) {
            this[key] = data[key];
        }
    };
    AcBattlePassVo.prototype.isNewUi = function () {
        return this.code == 8;
    };
    Object.defineProperty(AcBattlePassVo.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    /*获取当前等级*/
    AcBattlePassVo.prototype.getLevel = function () {
        var num = 0;
        if (this.lv) {
            num = this.lv;
        }
        return num;
    };
    /*获取当前经验*/
    AcBattlePassVo.prototype.getCurExp = function () {
        var num = 0;
        if (this.exp) {
            num = this.exp;
        }
        return num;
    };
    /*获取当前购买等级的次数*/
    AcBattlePassVo.prototype.getCurBuyLevelNum = function () {
        var num = 0;
        if (this.buylv) {
            num = this.buylv;
        }
        return num;
    };
    /*获取当前轮次*/
    AcBattlePassVo.prototype.getCurRound = function () {
        var num = 0;
        if (this.nowround) {
            num = this.nowround;
        }
        return num;
    };
    /*获取当前轮次所获得的经验*/
    AcBattlePassVo.prototype.getCurRoundExp = function () {
        var num = 0;
        var nowround = this.getCurRound();
        if (this.rtask && this.rtask[nowround]) {
            for (var i in this.rtask[nowround]) {
                var unit = this.rtask[nowround][i];
                var tasktype = i;
                var times = 0;
                if (unit.times) {
                    times = unit.times;
                }
                var cfg = this.cfg.getTaskCfgByQuestType(tasktype);
                if (cfg && cfg.expGet) {
                    num += (cfg.expGet * times);
                }
            }
        }
        return num;
    };
    /*获取当前最大伦次*/
    AcBattlePassVo.prototype.getMaxRound = function () {
        var num = Math.ceil((this.et - 86400 * this.cfg.extraTime - this.st) / 86400 / this.cfg.refresh);
        return num;
    };
    Object.defineProperty(AcBattlePassVo.prototype, "isShowRedDot", {
        get: function () {
            var flag = false;
            if (!this.isEnd) {
                for (var i = 1; i < 5; ++i) {
                    if (this["checkRedPoint" + i]) {
                        flag = true;
                        break;
                    }
                }
            }
            return flag;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcBattlePassVo.prototype, "checkRedPoint1", {
        /*是否有未领取的政令等级奖励*/
        get: function () {
            var flag = false;
            if (this.cfg) {
                flag = this.getlv < Math.min(this.cfg.maxlevel, this.getLevel());
            }
            return flag;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcBattlePassVo.prototype, "checkRedPoint2", {
        /*本轮是否有未领取的任务奖励*/
        get: function () {
            var flag = false;
            if (this.rtask) {
                for (var j in this.rtask) {
                    var tmp = this.rtask[j];
                    for (var i in tmp) {
                        if (this.canLqTaskReward(i, Number(j))) {
                            return true;
                        }
                    }
                }
            }
            return flag;
        },
        enumerable: true,
        configurable: true
    });
    AcBattlePassVo.prototype.getRoundReward = function (round) {
        var flag = false;
        if (this.rtask && this.rtask[round]) {
            var tmp = this.rtask[round];
            for (var i in tmp) {
                if (this.canLqTaskReward(i, Number(round))) {
                    return true;
                }
            }
        }
        return flag;
    };
    Object.defineProperty(AcBattlePassVo.prototype, "checkRedPoint3", {
        /*是否有未领取的特殊悬赏奖励*/
        get: function () {
            var flag = false;
            if (this.atask && this.cfg) {
                for (var i in this.atask) {
                    var cfg = this.cfg.getSpecialTaskCfgByQuestType(i);
                    var unit = this.atask[i];
                    var times = 0;
                    if (unit.times) {
                        times = unit.times;
                    }
                    var value = 0;
                    if (unit.value) {
                        value = unit.value;
                    }
                    if (!this.isGetSpecialTaskReward(i)) {
                        for (var i_1 = 1; i_1 <= cfg.times; ++i_1) {
                            if (value >= (i_1 * cfg.value) && times < i_1) {
                                return true;
                            }
                        }
                    }
                }
            }
            return flag;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcBattlePassVo.prototype, "checkRedPoint4", {
        /*是否有积分可兑换物品*/
        get: function () {
            var flag = false;
            var isJudge = false;
            if (this.cfg) {
                var key = "BattlePass-" + this.code + "Remind-" + Api.playerVoApi.getPlayerID() + "-" + this.st;
                var storage = LocalStorageManager.get(key);
                if (storage && storage == '1') {
                    if (GameData.serverTime >= this.et - 86400 * this.cfg.extraTime - this.cfg.remind * 86400) {
                        isJudge = true;
                    }
                }
                else {
                    isJudge = true;
                }
                if (isJudge && this.cfg) {
                    var score = this.getMyScore();
                    for (var i in this.cfg.shop) {
                        var unit = this.cfg.shop[i];
                        var buyNum = this.getLimitBuyNum(Number(i) + 1);
                        if (unit.limit && unit.limit > buyNum && score >= unit.cost) {
                            flag = true;
                            break;
                        }
                    }
                }
            }
            return flag;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 任务
    */
    AcBattlePassVo.prototype.getTaskArr = function (round) {
        if (!round) {
            round = this.getCurRound();
        }
        var arr = [];
        if (round <= this.getCurRound()) {
            //随机任务
            var randonmArr = this.rtask[round];
            var rarr = [];
            for (var i in randonmArr) {
                var unit = this.cfg.getTaskCfgByQuestType(i);
                if (unit) {
                    rarr.push({
                        questType: unit.questType,
                        sortId: unit.sortId,
                        value: unit.value,
                        times: unit.times,
                        openType: unit.openType,
                        expGet: unit.expGet,
                        turn: unit.turn,
                        value2: unit.value2,
                    });
                }
            }
            arr = arr.concat(rarr);
        }
        return arr;
    };
    //特殊悬赏
    AcBattlePassVo.prototype.getSpecialTaskArr = function () {
        var arr = [];
        //特殊任务
        var randonmArr = this.atask;
        for (var i in randonmArr) {
            var unit = this.cfg.getSpecialTaskCfgByQuestType(i);
            if (unit) {
                arr.push({
                    questType: unit.questType,
                    sortId: unit.sortId,
                    value: unit.value,
                    value2: unit.value2,
                    times: unit.times,
                    openType: unit.openType,
                    expGet: unit.expGet
                });
            }
        }
        return arr;
    };
    /*
    * 任务完成进度值
    */
    AcBattlePassVo.prototype.getTaskValue = function (questType, round) {
        var num = 0;
        if (!round) {
            round = this.getCurRound();
        }
        if (this.rtask && this.rtask[round] && this.rtask[round][questType]) {
            var cfg = this.cfg.getTaskCfgByQuestType(questType);
            var unit = this.rtask[round][questType];
            var times = 0;
            var value = 0;
            if (unit.times) {
                times = unit.times;
            }
            if (unit.value) {
                value = unit.value;
            }
            num = value - times * cfg.value;
        }
        return num;
    };
    AcBattlePassVo.prototype.getSpecialTaskValue = function (questType) {
        var num = 0;
        if (this.atask && this.atask[questType]) {
            var cfg = this.cfg.getSpecialTaskCfgByQuestType(questType);
            var unit = this.atask[questType];
            var times = 0;
            var value = 0;
            if (unit.times) {
                times = unit.times;
            }
            if (unit.value) {
                value = unit.value;
            }
            num = value - times * cfg.value;
        }
        return num;
    };
    /*
    * 任务奖励是否领取
    */
    AcBattlePassVo.prototype.canLqTaskReward = function (questType, round) {
        var flag = false;
        if (!this.cfg) {
            return false;
        }
        if (!round) {
            round = this.getCurRound();
        }
        if (this.rtask && this.rtask[round] && this.rtask[round][questType]) {
            var unit = this.rtask[round][questType];
            var cfg = this.cfg.getTaskCfgByQuestType(questType);
            if (cfg) {
                var times = 0;
                var value = 0;
                if (!this.isGetTaskReward(questType, round)) {
                    if (unit.times) {
                        times = unit.times;
                    }
                    if (unit.value) {
                        value = unit.value;
                    }
                    for (var i = 1; i <= cfg.times; ++i) {
                        if (value >= (i * cfg.value) && times < i) {
                            return true;
                        }
                    }
                }
            }
        }
        return flag;
    };
    AcBattlePassVo.prototype.isGetTaskReward = function (questType, round) {
        var flag = false;
        if (!round) {
            round = this.getCurRound();
        }
        if (this.rtask && this.rtask[round] && this.rtask[round][questType]) {
            var cfg = this.cfg.getTaskCfgByQuestType(questType);
            var unit = this.rtask[round][questType];
            var times = 0;
            if (unit.times) {
                times = unit.times;
            }
            var value = 0;
            if (unit.value) {
                value = unit.value;
            }
            if (times >= cfg.times) {
                flag = true;
            }
        }
        return flag;
    };
    AcBattlePassVo.prototype.isGetSpecialTaskReward = function (questType) {
        var flag = false;
        if (this.atask && this.atask[questType]) {
            var cfg = this.cfg.getTaskCfgByQuestType(questType);
            var unit = this.atask[questType];
            var times = 0;
            if (unit.times) {
                times = unit.times;
            }
            var value = 0;
            if (unit.value) {
                value = unit.value;
            }
            if (times >= unit.times) {
                flag = true;
            }
        }
        return flag;
    };
    /*
    * 任务本轮完成次数
    */
    AcBattlePassVo.prototype.getTaskFinishNum = function (questType, round) {
        var num = 0;
        if (!round) {
            round = this.getCurRound();
        }
        if (this.rtask && this.rtask[round] && this.rtask[round][questType]) {
            var unit = this.rtask[round][questType];
            if (unit.times) {
                num = unit.times;
            }
        }
        return num;
    };
    AcBattlePassVo.prototype.getSpecialTaskFinishNum = function (questType) {
        var num = 0;
        if (this.atask && this.atask[questType]) {
            var unit = this.atask[questType];
            if (unit.times) {
                num = unit.times;
            }
        }
        return num;
    };
    /*
    * 等级奖励是否领取
    */
    AcBattlePassVo.prototype.getLevelReward = function (level) {
        var flag = level <= this.getlv;
        return flag;
    };
    AcBattlePassVo.prototype.getHaveGetLevel = function () {
        return this.getlv;
    };
    /*兑换次数*/
    AcBattlePassVo.prototype.getLimitBuyNum = function (id) {
        var buyNum = 0;
        var info = this.sinfo;
        if (info && info[id]) {
            buyNum += info[id];
        }
        return buyNum;
    };
    /*当前令牌数*/
    AcBattlePassVo.prototype.getMyScore = function () {
        var num = this.shopscore;
        return num;
    };
    /*当前战令等级 1 2 3*/
    AcBattlePassVo.prototype.getMyBattleLevel = function () {
        var arr = ["primary", "intermediate", "advanced"];
        var num = arr.indexOf(this.unlockBP) + 1;
        return num;
    };
    Object.defineProperty(AcBattlePassVo.prototype, "acTimeAndHour", {
        /**
         * 活动时间
         */
        get: function () {
            var et = this.et - 86400 * this.cfg.extraTime;
            return App.DateUtil.getOpenLocalTime(this.st, et, true);
        },
        enumerable: true,
        configurable: true
    });
    AcBattlePassVo.prototype.getCountDown = function () {
        var num = 0;
        if (this.isInActivity()) {
            num = this.et - 86400 * this.cfg.extraTime - GameData.serverTime;
        }
        else {
            num = 0;
        }
        return num;
    };
    AcBattlePassVo.prototype.isInActivity = function () {
        var extra = this.cfg.extraTime ? this.cfg.extraTime : 0;
        return GameData.serverTime >= this.st && GameData.serverTime < (this.et - 86400 * extra);
    };
    AcBattlePassVo.prototype.getServantBanPos = function () {
        var num = 0;
        if (this.isInActivity()) {
            if (this.svtBanPos && Object.keys(this.svtBanPos).length) {
                num = Object.keys(this.svtBanPos).length;
            }
        }
        return num;
    };
    AcBattlePassVo.prototype.getWifeBanPos = function () {
        var num = 0;
        if (this.isInActivity()) {
            if (this.wifeBanPos && Object.keys(this.wifeBanPos).length) {
                num = Object.keys(this.wifeBanPos).length;
            }
        }
        return num;
    };
    return AcBattlePassVo;
}(AcBaseVo));
__reflect(AcBattlePassVo.prototype, "AcBattlePassVo");
//# sourceMappingURL=AcBattlePassVo.js.map