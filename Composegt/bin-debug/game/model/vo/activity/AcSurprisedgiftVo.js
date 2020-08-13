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
var AcSurprisedgiftVo = (function (_super) {
    __extends(AcSurprisedgiftVo, _super);
    function AcSurprisedgiftVo() {
        var _this = _super.call(this) || this;
        _this.ainfo = null;
        return _this;
    }
    Object.defineProperty(AcSurprisedgiftVo.prototype, "cfg", {
        get: function () {
            var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
            return cfg;
        },
        enumerable: true,
        configurable: true
    });
    //获得当前分数
    AcSurprisedgiftVo.prototype.getScoreNum = function () {
        return this.ainfo.scorenum;
    };
    //获得当日已经抽奖的次数
    AcSurprisedgiftVo.prototype.getDayRandNum = function () {
        return this.ainfo.dayrandnum;
    };
    AcSurprisedgiftVo.prototype.getSumRandNum = function () {
        return Object.keys(this.ainfo.rewardinfo).length || 0;
    };
    //检查某个奖品是否已经获得
    AcSurprisedgiftVo.prototype.checkHave = function (index) {
        var reward = this.ainfo.rewardinfo;
        if (reward[(index + 1).toString()]) {
            return true;
        }
        return false;
    };
    //当前已经抽奖的次数
    AcSurprisedgiftVo.prototype.curCount = function () {
        var reward = this.ainfo.rewardinfo;
        var count = 0;
        for (var c in reward) {
            count++;
        }
        return count;
    };
    //获得奖励列表数量
    AcSurprisedgiftVo.prototype.getRewardCount = function () {
        if (!this.cfg) {
            return 0;
        }
        return this.cfg.getGiftList().length;
    };
    //获得当日剩余次数
    AcSurprisedgiftVo.prototype.getResidueCount = function () {
        if (!this.cfg) {
            return 0 - this.getDayRandNum();
        }
        var limit = Math.min((this.getDayNum() * this.cfg.getLimit()), this.cfg.totlelimited);
        return limit - this.getSumRandNum();
    };
    //获得当前消耗分数
    AcSurprisedgiftVo.prototype.getCurCost = function () {
        var costList = [];
        if (this.cfg) {
            costList = this.cfg.getCost();
        }
        var curCount = this.curCount();
        if (curCount < costList.length) {
            return costList[curCount];
        }
        else {
            return 0;
        }
    };
    //获得剩余时间
    AcSurprisedgiftVo.prototype.getResidueTime = function () {
        var t = this.et - GameData.serverTime;
        return t;
    };
    //获取当前第几天
    AcSurprisedgiftVo.prototype.getDayNum = function () {
        return App.DateUtil.getActivityDay(GameData.serverTime, this.st);
    };
    Object.defineProperty(AcSurprisedgiftVo.prototype, "isShowRedDot", {
        /**
         * 红点显示
         */
        get: function () {
            return this.getResidueCount() > 0
                && this.getScoreNum() >= this.getCurCost()
                && this.getResidueTime() >= 0
                && this.getRewardCount() > this.curCount();
        },
        enumerable: true,
        configurable: true
    });
    AcSurprisedgiftVo.prototype.initData = function (data) {
        for (var key in data) {
            this[key] = data[key];
        }
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_ACSURPRISEDGIFT_REFRESHVO);
    };
    AcSurprisedgiftVo.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AcSurprisedgiftVo;
}(AcBaseVo));
__reflect(AcSurprisedgiftVo.prototype, "AcSurprisedgiftVo");
