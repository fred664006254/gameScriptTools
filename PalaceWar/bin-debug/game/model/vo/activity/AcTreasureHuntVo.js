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
var AcTreasureHuntVo = (function (_super) {
    __extends(AcTreasureHuntVo, _super);
    function AcTreasureHuntVo() {
        var _this = _super.call(this) || this;
        _this._v = null;
        _this._pos = 0;
        _this._circle = {};
        _this._wealthGodTimes = 0;
        _this._task = {};
        _this._flags = {};
        _this._day = 0;
        _this.tmpReward = '';
        _this.selIdx = 0;
        return _this;
    }
    AcTreasureHuntVo.prototype.initData = function (data) {
        for (var key in data) {
            this[key] = data[key];
        }
        this.v = data.v; //剩余筛子数
        this._pos = data.pos; //当前地图id
        this._circle = data.circle; //circlereward 圈数 + 领取状况{v = 0,flags = {}}
        this._wealthGodTimes = data.wealthGodTimes; //财神剩余次数
        this._task = data.task; //任务相关{day = 1,v = {},flags = {}}/
        if (data && data.task) {
            this._v = data.task.v;
        }
        if (data.task && data.task.day) {
            this._day = data.task.day;
        }
        if (data.task) {
            this._flags = data.task.flags;
            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_RESFESH_TREASURE_LIST);
        }
    };
    Object.defineProperty(AcTreasureHuntVo.prototype, "acTimeAndHour", {
        get: function () {
            var et = this.et - 86400;
            return App.DateUtil.getOpenLocalTime(this.st, et, true);
        },
        enumerable: true,
        configurable: true
    });
    AcTreasureHuntVo.prototype.getCountCd = function () {
        var et = this.et - 86400;
        var count = et - GameData.serverTime;
        var str = '';
        str = App.DateUtil.getFormatBySecond(count, 1);
        // if(count > 86400){
        // 	let tmp = Math.floor(count / 86400);
        // 	str = tmp.toString() + LanguageManager.getlocal(`date_day2`);
        // }
        return str;
    };
    AcTreasureHuntVo.prototype.getCurRound = function () {
        return this._circle.v;
    };
    AcTreasureHuntVo.prototype.getBoxNum = function () {
        return this.v;
    };
    Object.defineProperty(AcTreasureHuntVo.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcTreasureHuntVo.prototype, "isShowRedDot", {
        get: function () {
            var flag = false;
            //圈数奖励
            if (this.canGetRoundReward()) {
                flag = true;
            }
            if (this.taskHotredBoo) {
                flag = true;
            }
            return flag;
        },
        enumerable: true,
        configurable: true
    });
    AcTreasureHuntVo.prototype.isInActy = function () {
        var flag = false;
        if (GameData.serverTime >= this.st && GameData.serverTime < this.et - 86400) {
            flag = true;
        }
        return flag;
    };
    AcTreasureHuntVo.prototype.isActyEnd = function () {
        var flag = false;
        if (GameData.serverTime >= this.et) {
            flag = true;
        }
        return flag;
    };
    AcTreasureHuntVo.prototype.getRoundMax = function () {
        return 11;
    };
    AcTreasureHuntVo.prototype.canGetRoundReward = function () {
        var flag = false;
        if (GameData.serverTime < this.et) {
            for (var i = 1; i <= this.getCurRound(); ++i) {
                if (this.getCurRoundGetState(Number(i)) == 1) {
                    flag = true;
                    break;
                }
            }
        }
        return flag;
    };
    AcTreasureHuntVo.prototype.getCurRoundReward = function () {
        var reward = '';
        var curRound = Math.min((this.getCurRound() + 1), this.getRoundMax());
        var unit = this.cfg.circleReward[curRound];
        if (unit) {
            reward = unit.getReward;
        }
        if (reward === '') {
            reward = this.cfg.circleReward[Object.keys(this.cfg.circleReward).length].getReward;
        }
        return reward;
    };
    // 1 充值页面已经领过 false  根据任务id 判断是否领过
    AcTreasureHuntVo.prototype.getReceiveType = function (id) {
        if (this._flags) {
            for (var key in this._flags) {
                if (this._flags[id] == 1) {
                    return false;
                }
            }
            return true;
        }
    };
    //根据id 取对应进度
    AcTreasureHuntVo.prototype.getTypeNum = function (id) {
        if (this._v) {
            for (var key in this._v) {
                if (this._v[id]) {
                    return this._v[id];
                }
            }
        }
        return 0;
    };
    /**
     * 获取奖励领取状态 1可领取 2未满足领取 3已领取
    */
    AcTreasureHuntVo.prototype.getCurRoundGetState = function (id) {
        var flag = 2;
        if (this.isGetRoundReward(id)) {
            flag = 3;
        }
        if (this.getCurRound() >= id && !this.isGetRoundReward(id)) {
            flag = 1;
        }
        return flag;
    };
    //获取充值的钱数
    AcTreasureHuntVo.prototype.getAinfoV = function () {
        var rechargeNum = 0;
        rechargeNum = this.getTypeNum(1003);
        return rechargeNum;
    };
    Object.defineProperty(AcTreasureHuntVo.prototype, "day", {
        get: function () {
            return this._day - 1;
        },
        enumerable: true,
        configurable: true
    });
    AcTreasureHuntVo.prototype.isGetRoundReward = function (id) {
        return this._circle.flags[id] && this._circle.flags[id] == 1;
    };
    AcTreasureHuntVo.prototype.getCurMapId = function () {
        return this._pos;
    };
    AcTreasureHuntVo.prototype.isInWeaith = function () {
        return this._wealthGodTimes > 0;
    };
    AcTreasureHuntVo.prototype.rechargeHot = function () {
        if (!this.cfg) {
            return false;
        }
        var myRechargeNum = this.getAinfoV();
        var value = 0;
        var rewardList = this.cfg.getTaskorReward(1, this.day);
        for (var i in rewardList) {
            var currRe = rewardList[i];
            value = currRe.value;
            if (this.getReceiveType(currRe.name) == true && myRechargeNum >= value) {
                return true;
            }
        }
        return false;
    };
    // 任务红点
    AcTreasureHuntVo.prototype.taskRedHot = function () {
        var value = 0;
        if (!this.cfg) {
            return false;
        }
        var rewardList = this.cfg.getTaskorReward(2, this.day);
        for (var i in rewardList) {
            var currRe = rewardList[i];
            value = currRe.value;
            var myRechargeNum = this.getTypeNum(currRe.questType);
            if (this.getReceiveType(currRe.name) == true && myRechargeNum >= value) {
                return true;
            }
        }
        return false;
    };
    Object.defineProperty(AcTreasureHuntVo.prototype, "taskHotredBoo", {
        get: function () {
            if (!this.isInActy()) {
                return false;
            }
            if (this.taskRedHot() || this.rechargeHot()) {
                return true;
            }
            else {
                return false;
            }
        },
        enumerable: true,
        configurable: true
    });
    AcTreasureHuntVo.prototype.dispose = function () {
        this.v = 0; //剩余筛子数
        this._pos = 0; //当前地图id
        this._circle = {}; //circlereward 圈数 + 领取状况{v = 0,flags = {}}
        this._wealthGodTimes = 0; //财神剩余次数
        this._task = {}; //任务相关{day = 1,v = {},flags = {}}/
        this._v = null;
        this._day = 0;
        _super.prototype.dispose.call(this);
    };
    return AcTreasureHuntVo;
}(AcBaseVo));
__reflect(AcTreasureHuntVo.prototype, "AcTreasureHuntVo");
//# sourceMappingURL=AcTreasureHuntVo.js.map