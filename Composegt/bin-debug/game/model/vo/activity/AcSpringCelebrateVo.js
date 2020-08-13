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
var AcSpringCelebrateVo = (function (_super) {
    __extends(AcSpringCelebrateVo, _super);
    function AcSpringCelebrateVo() {
        var _this = _super.call(this) || this;
        _this.ainfo = null;
        _this.bininfo = null;
        _this.cinfo = null;
        _this.dinfo = null;
        _this.cinfoTask = 0;
        _this.cinfoReward = null;
        return _this;
    }
    AcSpringCelebrateVo.prototype.initData = function (data) {
        for (var key in data) {
            this[key] = data[key];
        }
        if (data.ainfo) {
            this.ainfo = data.ainfo;
        }
        if (data.binfo) {
            this.bininfo = data.binfo;
        }
        if (data.cinfo) {
            this.cinfo = data.cinfo;
            if (data.cinfo.task) {
                this.cinfoTask = data.cinfo.task;
            }
            if (data.cinfo.reward) {
                this.cinfoReward = data.cinfo.reward;
            }
        }
        if (data.dinfo) {
            this.dinfo = data.dinfo;
        }
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_RESFESH_SPRING_ITEM);
    };
    //获取充值的钱数
    AcSpringCelebrateVo.prototype.getAinfoV = function () {
        return this.ainfo.v;
    };
    //获取几天||获取任务完成次数
    AcSpringCelebrateVo.prototype.getTask = function (type) {
        if (this.cinfoTask[type]) {
            return this.cinfoTask[type];
        }
        return 0;
    };
    // 页签3 是否领取奖励 false没有领取
    AcSpringCelebrateVo.prototype.isGetRecharge = function (key) {
        if (this.cinfoReward[key] && this.cinfoReward[key] == 1) {
            return true;
        }
        return false;
    };
    // 1 充值页面已经领过 false
    AcSpringCelebrateVo.prototype.getReceiveType = function (id) {
        if (this.ainfo && this.ainfo.reward) {
            for (var key in this.ainfo.reward) {
                if (this.ainfo.reward[id] == 1) {
                    return false;
                }
            }
            return true;
        }
    };
    //页面2  已经兑换次数
    AcSpringCelebrateVo.prototype.getExchangeNum = function (id) {
        if (this.bininfo) {
            if (this.bininfo[id]) {
                return this.bininfo[id];
            }
        }
        return 0;
    };
    //页面4  已经兑换次数
    AcSpringCelebrateVo.prototype.getExchange4Num = function (id) {
        if (this.dinfo) {
            if (this.dinfo[id]) {
                return this.dinfo[id];
            }
        }
        return 0;
    };
    AcSpringCelebrateVo.prototype.getpublicRedhot1 = function () {
        var rechargeArr = this.getArr("recharge");
        for (var i = 0; i < rechargeArr.length; i++) {
            var num = Number(rechargeArr[i].key);
            if (this.getReceiveType(num) == true) {
                if (this.getAinfoV() >= rechargeArr[i].needGem) {
                    return true;
                }
            }
        }
        return false;
    };
    AcSpringCelebrateVo.prototype.getpublicRedhot2 = function () {
        var rechargeArr = this.getArr("exchange");
        for (var i = 0; i < rechargeArr.length; i++) {
            var exchangeNum = this.getExchangeNum(rechargeArr[i].key);
            if (exchangeNum != rechargeArr[i].limit) {
                var currNum = Api.itemVoApi.getItemNumInfoVoById(rechargeArr[i].needItem);
                if (currNum >= rechargeArr[i].needNum) {
                    return true;
                }
            }
        }
        return false;
    };
    AcSpringCelebrateVo.prototype.getpublicRedhot3 = function () {
        var taskArr = this.getArr("task");
        for (var i = 0; i < taskArr.length; i++) {
            var taskNum = this.getTask(taskArr[i].questType);
            var taskBoo = this.isGetRecharge(taskArr[i].key);
            if (taskNum >= taskArr[i].value && taskBoo == false) {
                return true;
            }
        }
        return false;
    };
    Object.defineProperty(AcSpringCelebrateVo.prototype, "isShowRedDot", {
        get: function () {
            if (this.getpublicRedhot1()) {
                return true;
            }
            if (this.getpublicRedhot2()) {
                return true;
            }
            if (this.getpublicRedhot3()) {
                return true;
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    // 是否在最后一天兑换天数内
    AcSpringCelebrateVo.prototype.isExchange = function () {
        var springCelebrateVo = Api.acVoApi.getActivityVoByAidAndCode(AcSpringCelebrateView.AID, AcSpringCelebrateView.CODE);
        if (GameData.serverTime > springCelebrateVo.et - 86400) {
            return true;
        }
        return false;
    };
    Object.defineProperty(AcSpringCelebrateVo.prototype, "acTimeAndHour", {
        get: function () {
            var et = this.et - 86400;
            return App.DateUtil.getOpenLocalTime(this.st, et, true);
        },
        enumerable: true,
        configurable: true
    });
    AcSpringCelebrateVo.prototype.getArr = function (key) {
        var arr = [];
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        if (!cfg) {
            return [];
        }
        var celeBrateList = cfg.getItemListCfg2();
        for (var i = 0; i < celeBrateList.length; i++) {
            if (celeBrateList[i].key == key) {
                for (var key2 in celeBrateList[i]) {
                    if (celeBrateList[i][key2]) {
                        var currObj = celeBrateList[i][key2];
                        if (currObj.needGem || currObj.questType || currObj.discount || currObj.limit) {
                            //处理questType带有登陆任务天数的活动，能否根据开时间，来显示登陆天数的奖励；
                            if (currObj.questType == 1) {
                                // let openDay = Math.floor((this.et-this.st)/86400)
                                var openDay = App.DateUtil.getActivityDay(this.et, this.st) - 1;
                                if (openDay < currObj.value) {
                                    continue;
                                }
                            }
                            celeBrateList[i][key2].key = Number(key2) + 1;
                            if (celeBrateList[i][key2].key) {
                                arr.push(celeBrateList[i][key2]);
                            }
                        }
                    }
                }
            }
        }
        return arr;
    };
    AcSpringCelebrateVo.prototype.dispose = function () {
        this.ainfo = null;
        this.bininfo = null;
        this.cinfo = null;
        this.dinfo = null;
    };
    return AcSpringCelebrateVo;
}(AcBaseVo));
__reflect(AcSpringCelebrateVo.prototype, "AcSpringCelebrateVo");
