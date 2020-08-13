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
var AcLuckyDrawVo = (function (_super) {
    __extends(AcLuckyDrawVo, _super);
    function AcLuckyDrawVo() {
        var _this = _super.call(this) || this;
        _this.pickNum = 0;
        _this.selIdx = 0;
        _this._isfree = 0;
        _this._coin = 0;
        _this._lottery = null;
        _this._charge = null;
        _this.showId = null;
        return _this;
    }
    AcLuckyDrawVo.prototype.initData = function (data) {
        _super.prototype.initData.call(this, data);
        this._isfree = data.isfree;
        this._coin = data.coin;
        this._lottery = data.lottery;
        this._charge = data.charge;
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_LUCKYDRAW_FRESH_ITEM);
    };
    //获取自己幸运币数
    AcLuckyDrawVo.prototype.getLuckyCoin = function () {
        return this._coin;
    };
    //获取累积充值数目
    AcLuckyDrawVo.prototype.getChargeNum = function () {
        var num = 0;
        if (this._charge && this._charge.v) {
            num = this._charge.v;
        }
        return num;
    };
    //倒计时
    AcLuckyDrawVo.prototype.getCountDown = function () {
        return this.et - 86400 - GameData.serverTime;
    };
    /**
     * 累积充值领取判断
     * */
    AcLuckyDrawVo.prototype.isGetRecharge = function (id) {
        var idx = id + 1;
        if (this._charge && this._charge.flags) {
            if (this._charge.flags[idx] == 1) {
                return true;
            }
        }
        return false;
    };
    /*
    *活动周期内
    */
    AcLuckyDrawVo.prototype.isInActy = function () {
        var flag = false;
        if (GameData.serverTime >= this.st && GameData.serverTime < this.et - 86400) {
            flag = true;
        }
        return flag;
    };
    AcLuckyDrawVo.prototype.isActyEnd = function () {
        var flag = false;
        if (GameData.serverTime >= this.et) {
            flag = true;
        }
        return flag;
    };
    Object.defineProperty(AcLuckyDrawVo.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    //是否免费
    AcLuckyDrawVo.prototype.getpublicRedhot1 = function () {
        var flag = false;
        if (this.isInActivity()) {
            flag = this.isFree();
        }
        return flag;
    };
    //是否有未领取进度奖励
    AcLuckyDrawVo.prototype.getpublicRedhot3 = function () {
        if (this.isActyEnd()) {
            return false;
        }
        //奖励进度宝箱
        for (var i in this.cfg.achievement) {
            var unit = this.cfg.achievement[i];
            var jindu = Number(i);
            if (this.getLuckyProgress() >= unit.needNum && !this.isGetJinduAward(jindu)) {
                return true;
            }
        }
        return false;
    };
    //是否有未领取充值奖励
    AcLuckyDrawVo.prototype.getpublicRedhot2 = function () {
        //充值
        var cfg = this.cfg;
        if (!cfg) {
            return false;
        }
        if (this.isActyEnd()) {
            return false;
        }
        var curCharge = this.getChargeNum();
        for (var i in cfg.recharge) {
            var unit = cfg.recharge[i];
            if (curCharge >= unit.needGem && !this.isGetRecharge(Number(i))) {
                return true;
            }
        }
        return false;
    };
    AcLuckyDrawVo.prototype.isFree = function () {
        return this._isfree == 1;
    };
    Object.defineProperty(AcLuckyDrawVo.prototype, "isShowRedDot", {
        get: function () {
            if (this.getLuckyCoin() > 0 && this.isInActivity()) {
                return true;
            }
            for (var i = 1; i <= 3; ++i) {
                if (this["getpublicRedhot" + i]()) {
                    return true;
                }
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcLuckyDrawVo.prototype, "acTimeAndHour", {
        get: function () {
            var et = this.et - 86400;
            return App.DateUtil.getOpenLocalTime(this.st, et, true);
        },
        enumerable: true,
        configurable: true
    });
    AcLuckyDrawVo.prototype.isInActivity = function () {
        return GameData.serverTime >= this.st && GameData.serverTime < this.et - 86400;
    };
    AcLuckyDrawVo.prototype.isGetJinduAward = function (id) {
        var idx = Number(id) + 1;
        var info = this._lottery;
        if (info && info.flags) {
            if (info.flags[idx] == 1) {
                return true;
            }
        }
        return false;
    };
    /*当前已翻牌次数*/
    AcLuckyDrawVo.prototype.getLuckyProgress = function () {
        var num = 0;
        if (this._lottery && this._lottery.v) {
            num = this._lottery.v;
        }
        return num;
    };
    //当前进度
    AcLuckyDrawVo.prototype.getCurjindu = function () {
        var curJindu = 0;
        var curProgress = this.getLuckyProgress();
        if (curProgress >= this.cfg.getTotalProgress()) {
            curJindu = this.cfg.achievement.length;
        }
        else {
            for (var i in this.cfg.achievement) {
                var unit = this.cfg.achievement[i];
                if (curProgress < unit.needNum) {
                    curJindu = Number(i);
                    break;
                }
            }
        }
        return curJindu;
    };
    AcLuckyDrawVo.prototype.dispose = function () {
        this.pickNum = 0;
        this.selIdx = 0;
        this._isfree = 0;
        this._coin = 0;
        this._lottery = null;
        this._charge = null;
        this.showId = null;
        _super.prototype.dispose.call(this);
    };
    return AcLuckyDrawVo;
}(AcBaseVo));
__reflect(AcLuckyDrawVo.prototype, "AcLuckyDrawVo");
//# sourceMappingURL=AcLuckyDrawVo.js.map