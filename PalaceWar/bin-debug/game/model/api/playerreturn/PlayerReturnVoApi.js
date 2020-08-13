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
var PlayerReturnVoApi = (function (_super) {
    __extends(PlayerReturnVoApi, _super);
    function PlayerReturnVoApi() {
        var _this = _super.call(this) || this;
        _this._clickIdx = 0;
        return _this;
    }
    PlayerReturnVoApi.prototype.formatData = function (data) {
        this.sinfo = data.info.sinfo;
        this.tinfo = data.info.tinfo;
        this.rinfo = data.info.rinfo;
        this.version = data.version;
        this._rewards = '';
        this.et = data.et;
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_RETURN_FRESH_ITEM);
    };
    PlayerReturnVoApi.prototype.setRebackRewards = function (str) {
        this._rewards = str;
    };
    PlayerReturnVoApi.prototype.getRebackRewards = function () {
        return this._rewards;
    };
    Object.defineProperty(PlayerReturnVoApi.prototype, "acTimeAndHour", {
        /*
        *获取活动日期
        */
        get: function () {
            var st = this.version; //this.vo.st;
            var et = this.et; //this.vo.et - 86400;
            return App.DateUtil.getOpenLocalTime(st, et, true);
        },
        enumerable: true,
        configurable: true
    });
    //获取当前累计签到天数
    PlayerReturnVoApi.prototype.getSignDay = function () {
        return Number(this.sinfo.v);
    };
    //获取累积充值数目
    PlayerReturnVoApi.prototype.getChargeNum = function () {
        return Number(this.rinfo.v);
    };
    //获取任务完成次数
    PlayerReturnVoApi.prototype.getTask = function (type) {
        if (this.tinfo.task[type]) {
            return this.tinfo.task[type];
        }
        return 0;
    };
    PlayerReturnVoApi.prototype.setClickIdx = function (num) {
        this._clickIdx = num;
    };
    PlayerReturnVoApi.prototype.getClickIdx = function () {
        return this._clickIdx;
    };
    /*任务奖励是否领取*/
    PlayerReturnVoApi.prototype.isGetTaskReward = function (key) {
        if (this.tinfo.flags[key] && this.tinfo.flags[key] == 1) {
            return true;
        }
        return false;
    };
    /*所有签到励是否领取*/
    PlayerReturnVoApi.prototype.isGetSignAllReward = function (key) {
        if (this.sinfo.flags[key] && this.sinfo.flags[key] == 2) {
            return true;
        }
        return false;
    };
    /*普通签到奖励是否领取*/
    PlayerReturnVoApi.prototype.isGetSignOdReward = function (key) {
        if (this.sinfo.flags[key] && this.sinfo.flags[key] == 1) {
            return true;
        }
        return false;
    };
    /*累积充值领取判断*/
    PlayerReturnVoApi.prototype.isGetRecharge = function (id) {
        if (this.rinfo && this.rinfo.flags) {
            for (var key in this.rinfo.flags) {
                if (this.rinfo.flags[id] == 1) {
                    return true;
                }
            }
            return false;
        }
        return false;
    };
    Object.defineProperty(PlayerReturnVoApi.prototype, "cfg", {
        get: function () {
            return Config.PlayerreturnCfg;
        },
        enumerable: true,
        configurable: true
    });
    PlayerReturnVoApi.prototype.getpublicRedhot1 = function () {
        //签到进度宝箱
        for (var i in this.cfg.signReward) {
            var unit = this.cfg.signReward[i];
            var jindu = Number(i) + 1;
            if (this.getSignDay() >= unit.days && ((Api.playerVoApi.getPlayerVipLevel() < this.cfg.needVip && !this.isGetSignOdReward(jindu)) || (Api.playerVoApi.getPlayerVipLevel() >= this.cfg.needVip && !this.isGetSignAllReward(jindu)))) {
                return true;
            }
        }
        return false;
    };
    PlayerReturnVoApi.prototype.getpublicRedhot3 = function () {
        //充值
        var cfg = this.cfg;
        var curCharge = this.getChargeNum();
        for (var i in cfg.rechargeReward) {
            var unit = cfg.rechargeReward[i];
            if (curCharge >= unit.needGem && this.isGetRecharge(Number(i) + 1) == false) {
                return true;
            }
        }
        return false;
    };
    PlayerReturnVoApi.prototype.getpublicRedhot2 = function () {
        //任务
        var cfg = this.cfg;
        for (var i in cfg.taskReward) {
            var unit = cfg.taskReward[i];
            var taskNum = this.getTask(unit.questType);
            var taskBoo = this.isGetTaskReward(Number(i) + 1);
            if (taskNum >= unit.value && taskBoo == false) {
                return true;
            }
        }
        return false;
    };
    Object.defineProperty(PlayerReturnVoApi.prototype, "isShowRedDot", {
        get: function () {
            for (var i = 1; i < 4; ++i) {
                if (this["getpublicRedhot" + i]()) {
                    return true;
                }
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    PlayerReturnVoApi.prototype.isInActTime = function () {
        return GameData.serverTime < this.et && GameData.serverTime >= this.version;
    };
    PlayerReturnVoApi.prototype.getArr = function (key) {
        var arr = [];
        var cfg = Config.PlayerreturnCfg;
        if (!cfg) {
            return [];
        }
        var list = cfg;
        for (var i in list) {
            if (i == key) {
                for (var key2 in list[i]) {
                    if (list[i][key2]) {
                        var currObj = list[i][key2];
                        if (currObj.needGem || currObj.questType || currObj.days) {
                            list[i][key2].key = Number(key2) + 1;
                            if (list[i][key2].key) {
                                arr.push(list[i][key2]);
                            }
                        }
                    }
                }
            }
        }
        return arr;
    };
    PlayerReturnVoApi.prototype.dispose = function () {
        this.sinfo = null;
        this.rinfo = null;
        this.tinfo = null;
    };
    return PlayerReturnVoApi;
}(BaseVoApi));
__reflect(PlayerReturnVoApi.prototype, "PlayerReturnVoApi");
//# sourceMappingURL=PlayerReturnVoApi.js.map