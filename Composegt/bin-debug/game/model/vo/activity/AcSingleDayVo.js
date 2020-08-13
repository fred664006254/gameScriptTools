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
var AcSingleDayVo = (function (_super) {
    __extends(AcSingleDayVo, _super);
    function AcSingleDayVo() {
        var _this = _super.call(this) || this;
        _this.skin = {};
        _this.cinfo = {};
        _this.redpt = {};
        _this.sinfo = {};
        _this.item = {};
        return _this;
    }
    AcSingleDayVo.prototype.initData = function (data) {
        for (var key in data) {
            this[key] = data[key];
        }
    };
    //获取累积充值数目
    AcSingleDayVo.prototype.getChargeNum = function () {
        if (this.cinfo.chargeNum) {
            return Number(this.cinfo.chargeNum);
        }
        return 0;
    };
    //获取累积消耗数目
    AcSingleDayVo.prototype.getUseGemNum = function () {
        if (this.sinfo.spendNum) {
            return Number(this.sinfo.spendNum);
        }
        return 0;
    };
    /*累积消费领取判断*/
    AcSingleDayVo.prototype.isGetConsume = function (id) {
        if (this.sinfo && this.sinfo.getFlag) {
            for (var key in this.sinfo.getFlag) {
                if (this.sinfo.getFlag[id] == 1) {
                    return true;
                }
            }
            return false;
        }
        return false;
    };
    /*累积充值领取判断*/
    AcSingleDayVo.prototype.isGetRecharge = function (id) {
        if (this.cinfo && this.cinfo.getFlag) {
            for (var key in this.cinfo.getFlag) {
                if (this.cinfo.getFlag[id] == 1) {
                    return true;
                }
            }
            return false;
        }
        return false;
    };
    Object.defineProperty(AcSingleDayVo.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    //可抢红包雨 可领充值奖励 消费奖励
    AcSingleDayVo.prototype.getpublicRedhot = function () {
        if (!this.cfg) {
            return false;
        }
        for (var i = 1; i < 4; ++i) {
            if (this["getpublicRedhot" + i]()) {
                return true;
            }
        }
        return false;
    };
    AcSingleDayVo.prototype.getpublicRedhot1 = function () {
        //可领红包雨
        var cfg = this.cfg;
        if (!cfg || !this.isStart || this.et - GameData.serverTime < 86400) {
            return false;
        }
        if (this.getCurPeriod() == 1 && !this.getIsCollectMax()) {
            return true;
        }
        return false;
    };
    AcSingleDayVo.prototype.getpublicRedhot2 = function () {
        //充值
        var cfg = this.cfg;
        if (!cfg) {
            return false;
        }
        var curCharge = this.getChargeNum();
        for (var i in cfg.recharge) {
            var unit = cfg.recharge[i];
            if (curCharge >= unit.needGem && this.isGetRecharge(unit.id + 1) == false) {
                return true;
            }
        }
        return false;
    };
    AcSingleDayVo.prototype.getpublicRedhot3 = function () {
        //消费
        var cfg = this.cfg;
        if (!cfg) {
            return false;
        }
        var curuse = this.getUseGemNum();
        for (var i in cfg.useGem) {
            var unit = cfg.useGem[i];
            if (curuse >= unit.needGem && this.isGetConsume(unit.id + 1) == false) {
                return true;
            }
        }
        return false;
    };
    Object.defineProperty(AcSingleDayVo.prototype, "isShowRedDot", {
        get: function () {
            if (this.getpublicRedhot()) {
                return true;
            }
            else {
                return false;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcSingleDayVo.prototype, "acTimeAndHour", {
        get: function () {
            var et = this.et - 86400;
            return App.DateUtil.getOpenLocalTime(this.st, et, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcSingleDayVo.prototype, "acCountDown", {
        get: function () {
            var et = this.et - 86400;
            if (et >= GameData.serverTime) {
                return App.DateUtil.getFormatBySecond((et - GameData.serverTime), 1);
            }
            else {
                return LanguageManager.getlocal("acPunishEnd");
            }
        },
        enumerable: true,
        configurable: true
    });
    AcSingleDayVo.prototype.isInActivity = function () {
        return GameData.serverTime >= this.st && GameData.serverTime < this.et - 86400;
    };
    /**
     * 活动彻底结束（包括展示期）
     */
    AcSingleDayVo.prototype.isActivityEnd = function () {
        return GameData.serverTime >= this.et;
    };
    AcSingleDayVo.prototype.getArr = function (key) {
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
                        if (currObj.value || currObj.rank || currObj.needGem || currObj.limit) {
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
    //获取限购物品次数
    AcSingleDayVo.prototype.getBuyLimitnum = function (id) {
        var buyNum = 0;
        var info = this.item;
        if (info && info[id]) {
            buyNum += info[id];
        }
        return buyNum;
    };
    /**
     * 判断当前阶段，1红包雨 2展示期 3准备期
     */
    AcSingleDayVo.prototype.getCurPeriod = function () {
        var cfg = this.cfg;
        var today0 = App.DateUtil.getWeeTs(GameData.serverTime);
        var st = today0 + cfg.startTime;
        var et = today0 + cfg.endTime;
        var period = 0;
        if (GameData.serverTime < st || GameData.serverTime > et) {
            period = 3;
        }
        else {
            var count = (GameData.serverTime - st);
            if (count < cfg.luckyPacketPurchase || (count >= cfg.luckyPacketCD && count < (cfg.luckyPacketCD + cfg.luckyPacketPurchase))) {
                period = 1;
            }
            else {
                period = 2;
            }
        }
        return period;
    };
    AcSingleDayVo.prototype.getIsCollectMax = function () {
        var collectnum = 0;
        var cfg = this.cfg;
        var today0 = App.DateUtil.getWeeTs(GameData.serverTime);
        var st = today0 + cfg.startTime;
        var et = today0 + cfg.endTime;
        var flag = false;
        //redhad
        if (this.redpt.redinfo) {
            var tmp = this.redpt.redinfo;
            var count = Math.floor((GameData.serverTime - st) / 3600);
            var periodstart = Math.floor((GameData.serverTime - st) / cfg.luckyPacketCD) * cfg.luckyPacketCD + st;
            if (tmp[periodstart] && tmp[periodstart] >= cfg.couponLimit) {
                flag = true;
            }
        }
        return flag;
    };
    AcSingleDayVo.prototype.getMyRedpt = function () {
        var cfg = this.cfg;
        var arr = [];
        if (this.redpt && this.redpt.redhad) {
            for (var i in this.redpt.redhad) {
                if (this.redpt.redhad[i] > 0) {
                    arr.push({
                        id: i,
                        num: this.redpt.redhad[i],
                        value: this.cfg.coupon[Number(i) - 1].value
                    });
                }
            }
        }
        return arr;
    };
    AcSingleDayVo.prototype.getCountDownCD = function () {
        var cfg = this.cfg;
        var today0 = App.DateUtil.getWeeTs(GameData.serverTime);
        var st = today0 + cfg.startTime;
        var et = today0 + cfg.endTime;
        var curperiod = this.getCurPeriod();
        var count = 0;
        var periodstart = Math.floor((GameData.serverTime - st) / cfg.luckyPacketCD) * cfg.luckyPacketCD + st;
        if (this.getIsCollectMax()) {
            if (periodstart >= (st + cfg.luckyPacketCD)) {
                count = st - GameData.serverTime + 3600 * 24;
            }
            else {
                count = periodstart + cfg.luckyPacketCD - GameData.serverTime;
            }
        }
        else {
            if (curperiod == 3) {
                count = GameData.serverTime < st ? (st - GameData.serverTime) : (st - GameData.serverTime + 3600 * 24);
            }
            else if (curperiod == 2) {
                count = periodstart + cfg.luckyPacketCD - GameData.serverTime;
            }
        }
        return count;
    };
    AcSingleDayVo.prototype.getLimitBuyNum = function (id) {
        var buyNum = 0;
        var info = this.item;
        if (info && info[id]) {
            buyNum += info[id];
        }
        return buyNum;
    };
    /**
     * 充值
     */
    AcSingleDayVo.prototype.getSortRecharge = function () {
        var rechargeArr = this.getArr('recharge');
        for (var i = 0; i < rechargeArr.length; i++) {
            if (this.isGetRecharge(Number(rechargeArr[i].key))) {
                rechargeArr[i].sortId = rechargeArr.length + Number(rechargeArr[i].key);
                continue;
            }
            else if (this.getChargeNum() >= rechargeArr[i].needGem) {
                rechargeArr[i].sortId = (Number(rechargeArr[i].key)) - rechargeArr.length - 1;
                continue;
            }
            else {
                rechargeArr[i].sortId = Number(rechargeArr[i].key);
                continue;
            }
        }
        return rechargeArr;
    };
    /**
     * 消费
     */
    AcSingleDayVo.prototype.getSortConsume = function () {
        var consumeData = this.getArr('useGem');
        for (var i = 0; i < consumeData.length; i++) {
            if (this.isGetConsume(Number(consumeData[i].key))) {
                consumeData[i].sortId = consumeData.length + Number(consumeData[i].key);
                continue;
            }
            else if (this.getUseGemNum() >= consumeData[i].needGem) {
                consumeData[i].sortId = (Number(consumeData[i].key)) - consumeData.length - 1;
                continue;
            }
            else {
                consumeData[i].sortId = Number(consumeData[i].key);
                continue;
            }
        }
        return consumeData;
    };
    AcSingleDayVo.prototype.dispose = function () {
        this.skin = {};
        this.cinfo = {};
        this.redpt = {};
        this.sinfo = {};
        this.item = {};
        _super.prototype.dispose.call(this);
    };
    return AcSingleDayVo;
}(AcBaseVo));
__reflect(AcSingleDayVo.prototype, "AcSingleDayVo");
