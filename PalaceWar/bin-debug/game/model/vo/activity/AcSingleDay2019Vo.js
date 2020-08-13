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
var AcSingleDay2019Vo = (function (_super) {
    __extends(AcSingleDay2019Vo, _super);
    function AcSingleDay2019Vo() {
        var _this = _super.call(this) || this;
        //充值信息
        _this.binfo = null;
        //特殊道具数量
        _this.num = 0;
        //限时返场道具购买信息
        _this.shop1 = null;
        //折扣礼包道具购买信息
        _this.shop2 = null;
        //转盘使用次数
        _this.times = 0;
        //排行榜
        _this.rankinfo = {};
        _this.lastidx = -1;
        _this.lasttype = -1;
        _this.buytype = -1;
        _this.lastpos = null;
        return _this;
    }
    AcSingleDay2019Vo.prototype.initData = function (data) {
        for (var key in data) {
            this[key] = data[key];
        }
    };
    //获取累积充值数目
    AcSingleDay2019Vo.prototype.getChargeNum = function () {
        var num = 0;
        if (this.binfo && this.binfo.v) {
            num = this.binfo.v;
        }
        return num;
    };
    //获取消耗元宝数
    AcSingleDay2019Vo.prototype.getUseGemNum = function () {
        return this.v;
    };
    //获取转盘使用次数
    AcSingleDay2019Vo.prototype.getTimes = function () {
        return this.times;
    };
    //获取特殊道具数量
    AcSingleDay2019Vo.prototype.getItemNum = function () {
        return this.num;
    };
    /*累积充值领取判断*/
    AcSingleDay2019Vo.prototype.isGetRecharge = function (id) {
        var flag = false;
        if (this.binfo && this.binfo.flags && this.binfo.flags[id]) {
            flag = true;
        }
        return flag;
    };
    Object.defineProperty(AcSingleDay2019Vo.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    //可转盘
    AcSingleDay2019Vo.prototype.getpublicRedhot1 = function () {
        var flag = false;
        var cfg = this.cfg;
        if (!cfg) {
            return flag;
        }
        if (GameData.serverTime < (this.et - 86400 * this.cfg.extraTime) && this.getItemNum() > 0) {
            flag = true;
        }
        return flag;
    };
    //充值
    AcSingleDay2019Vo.prototype.getpublicRedhot2 = function () {
        //充值
        var flag = false;
        var cfg = this.cfg;
        if (!cfg || GameData.serverTime >= this.et) {
            return flag;
        }
        var curCharge = this.getChargeNum();
        for (var i in cfg.recharge) {
            var unit = cfg.recharge[i];
            if (curCharge >= unit.needGem && !this.isGetRecharge(unit.id)) {
                flag = true;
            }
        }
        return flag;
    };
    Object.defineProperty(AcSingleDay2019Vo.prototype, "isShowRedDot", {
        get: function () {
            var flag = false;
            if (!this.cfg) {
                flag = false;
            }
            for (var i = 1; i < 3; ++i) {
                if (this["getpublicRedhot" + i]()) {
                    flag = true;
                }
            }
            return flag;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcSingleDay2019Vo.prototype, "acTimeAndHour", {
        get: function () {
            var et = this.et - 86400 * this.cfg.extraTime;
            return App.DateUtil.getOpenLocalTime(this.st, et, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcSingleDay2019Vo.prototype, "acCountDown", {
        get: function () {
            var et = this.et - 86400 * this.cfg.extraTime;
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
    AcSingleDay2019Vo.prototype.isInActivity = function () {
        return GameData.serverTime >= this.st && GameData.serverTime < this.et - 86400 * this.cfg.extraTime;
    };
    /**
     * 活动彻底结束（包括展示期）
     */
    AcSingleDay2019Vo.prototype.isActivityEnd = function () {
        return GameData.serverTime >= this.et;
    };
    AcSingleDay2019Vo.prototype.getArr = function (key) {
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
    //获取限时返场道具购买信息
    AcSingleDay2019Vo.prototype.getBuyShopList1 = function (id) {
        var buyNum = 0;
        if (this.shop1 && this.shop1[id]) {
            buyNum = this.shop1[id];
        }
        return buyNum;
    };
    //获取折扣礼包道具购买信息
    AcSingleDay2019Vo.prototype.getBuyShopList2 = function (id) {
        var buyNum = 0;
        if (this.shop2 && this.shop2[id]) {
            buyNum = this.shop2[id];
        }
        return buyNum;
    };
    AcSingleDay2019Vo.prototype.getMyPrank = function () {
        var rank = 0;
        if (this.rankinfo && this.rankinfo.myrankArr && this.rankinfo.myrankArr.myrank) {
            rank = this.rankinfo.myrankArr.myrank;
        }
        return rank;
    };
    AcSingleDay2019Vo.prototype.getMyPScore = function () {
        var score = 0;
        if (this.rankinfo && this.rankinfo.myrankArr && this.rankinfo.myrankArr.value) {
            score = this.rankinfo.myrankArr.value;
        }
        return score;
    };
    AcSingleDay2019Vo.prototype.setRankInfo = function (data) {
        if (data.rankArr) {
            this.rankinfo.rankArr = data.rankArr;
        }
        if (data.myrankArr) {
            this.rankinfo.myrankArr = data.myrankArr;
        }
    };
    AcSingleDay2019Vo.prototype.getRankInfo = function () {
        var arr = [];
        if (this.rankinfo && this.rankinfo.rankArr) {
            arr = this.rankinfo.rankArr;
        }
        return arr;
    };
    AcSingleDay2019Vo.prototype.dispose = function () {
        this.binfo = null;
        this.num = 0;
        this.shop1 = null;
        this.shop2 = null;
        this.times = 0;
        this.rankinfo = null;
        this.lastidx = null;
        this.lastpos = null;
        _super.prototype.dispose.call(this);
    };
    return AcSingleDay2019Vo;
}(AcBaseVo));
__reflect(AcSingleDay2019Vo.prototype, "AcSingleDay2019Vo");
//# sourceMappingURL=AcSingleDay2019Vo.js.map