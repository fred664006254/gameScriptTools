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
var AcAnnualPray2020Vo = (function (_super) {
    __extends(AcAnnualPray2020Vo, _super);
    function AcAnnualPray2020Vo() {
        var _this = _super.call(this) || this;
        //道具数量 v1二 v2周 v3年 v4庆
        _this.ainfo = null;
        //每日免费次数
        _this.isfree = 0;
        //累计充值 v充值的元宝 flags领取标记
        _this.binfo = null;
        //进度奖励领取情况
        _this.rewards = null;
        //兑换信息 同商店
        _this.claim = null;
        //总祈愿值
        _this.total = 0;
        _this.lastidx = -1;
        _this.lastpos = null;
        _this.lastday = -1;
        _this.idx = 1;
        _this.showId = -1;
        return _this;
    }
    AcAnnualPray2020Vo.prototype.initData = function (data) {
        for (var key in data) {
            this[key] = data[key];
        }
    };
    AcAnnualPray2020Vo.prototype.getFreeNum = function () {
        return this.isfree;
    };
    AcAnnualPray2020Vo.prototype.dayNumById = function (id) {
        var num = 0;
        if (this.ainfo && this.ainfo["v" + id]) {
            num = this.ainfo["v" + id];
        }
        return num;
    };
    AcAnnualPray2020Vo.prototype.getCrackNum = function () {
        var num = 0;
        if (this.v) {
            num = this.v;
        }
        return num;
    };
    AcAnnualPray2020Vo.prototype.getPrayNum = function () {
        var num = 0;
        if (this.total) {
            num = this.total;
        }
        return num;
    };
    AcAnnualPray2020Vo.prototype.getCountDown = function () {
        var num = 0;
        if (this.isInActivity()) {
            num = this.et - this.config.extraTime * 86400 - GameData.serverTime;
        }
        else {
            num = 0;
        }
        return num;
    };
    //充值奖励
    AcAnnualPray2020Vo.prototype.getpublicRedhot1 = function () {
        //充值
        var cfg = this.config;
        if (this.isEnd) {
            return false;
        }
        var curCharge = this.getChargeNum();
        for (var i in cfg.recharge) {
            var unit = cfg.recharge[i];
            if (curCharge >= unit.needGem && this.isGetRecharge(Number(i)) == false) {
                return true;
            }
        }
        return false;
    };
    //获取限购物品次数
    AcAnnualPray2020Vo.prototype.getBuyLimitnum = function (id) {
        var info = this.claim;
        var buyNum = 0;
        if (info && info[id]) {
            buyNum += info[id];
        }
        return buyNum;
    };
    //进度奖励
    AcAnnualPray2020Vo.prototype.getpublicRedhot3 = function () {
        var flag = false;
        if (this.isEnd) {
            return false;
        }
        for (var i in this.config.processingReward) {
            var unit = this.config.processingReward[i];
            if (this.total >= unit.ratetime && !this.isGetJinduAward(unit.id)) {
                flag = true;
                break;
            }
        }
        return flag;
    };
    //免费次数
    AcAnnualPray2020Vo.prototype.getpublicRedhot2 = function () {
        var flag = false;
        if (!this.isInActivity()) {
            return flag;
        }
        if (this.isfree > 0) {
            flag = true;
        }
        return flag;
    };
    //可兑换
    AcAnnualPray2020Vo.prototype.getpublicRedhot4 = function () {
        var flag = false;
        if (this.isEnd) {
            return flag;
        }
        for (var i in this.config.claim) {
            var unit = this.config.claim[i];
            var need1 = 0, need2 = 0, need3 = 0, need4 = 0;
            if (unit.costdeZi) {
                need1 = unit.costdeZi;
            }
            if (unit.costchuanZi) {
                need2 = unit.costchuanZi;
            }
            if (unit.costshiZi) {
                need3 = unit.costshiZi;
            }
            if (unit.costdaiZi) {
                need4 = unit.costdaiZi;
            }
            if (this.dayNumById(1) >= need1 && this.dayNumById(2) >= need2 && this.dayNumById(3) >= need3 && this.dayNumById(4) >= need4) {
                flag = true;
                break;
            }
        }
        return flag;
    };
    //获取累积充值数目
    AcAnnualPray2020Vo.prototype.getChargeNum = function () {
        var num = 0;
        if (this.binfo && this.binfo.v) {
            num = this.binfo.v;
        }
        return num;
    };
    /*累积充值领取判断*/
    AcAnnualPray2020Vo.prototype.isGetRecharge = function (id) {
        if (this.binfo && this.binfo.flags && this.binfo.flags[id] == 1) {
            return true;
        }
        return false;
    };
    Object.defineProperty(AcAnnualPray2020Vo.prototype, "isShowRedDot", {
        get: function () {
            for (var i = 1; i <= 4; ++i) {
                if (this["getpublicRedhot" + i]()) {
                    return true;
                }
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcAnnualPray2020Vo.prototype, "acTimeAndHour", {
        get: function () {
            var et = this.et - 86400 * this.config.extraTime;
            return App.DateUtil.getOpenLocalTime(this.st, et, true);
        },
        enumerable: true,
        configurable: true
    });
    AcAnnualPray2020Vo.prototype.isInActivity = function () {
        return GameData.serverTime >= this.st && GameData.serverTime < this.et - 86400 * this.config.extraTime;
    };
    AcAnnualPray2020Vo.prototype.getArr = function (key) {
        var arr = [];
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        if (!cfg) {
            return [];
        }
        var list = cfg;
        for (var i in list) {
            if (i == key) {
                for (var key2 in list[i]) {
                    if (list[i][key2]) {
                        var currObj = list[i][key2];
                        if (currObj.getReward || currObj.item) {
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
    /*祈愿奖励领取*/
    AcAnnualPray2020Vo.prototype.isGetJinduAward = function (id) {
        var idx = Number(id);
        var info = this.rewards;
        if (info && info) {
            if (info[idx] == 1) {
                return true;
            }
        }
        return false;
    };
    AcAnnualPray2020Vo.prototype.dispose = function () {
        //道具数量 v1德 v2川 v3时 v4代
        this.ainfo = null;
        //每日免费次数
        this.isfree = 0;
        //累计充值 v充值的元宝 flags领取标记
        this.binfo = null;
        //兑换信息 同商店
        this.claim = null;
        //抽取次数
        this.rewards = null;
        this.total = 0;
        this.lastidx = -1;
        this.lastpos = null;
        this.lastday = -1;
        this.idx = 1;
        this.showId = -1;
        this.rewards = null;
    };
    return AcAnnualPray2020Vo;
}(AcBaseVo));
__reflect(AcAnnualPray2020Vo.prototype, "AcAnnualPray2020Vo");
//# sourceMappingURL=AcAnnualPray2020Vo.js.map