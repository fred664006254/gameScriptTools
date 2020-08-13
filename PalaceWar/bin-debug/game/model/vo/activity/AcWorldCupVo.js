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
var AcWorldCupVo = (function (_super) {
    __extends(AcWorldCupVo, _super);
    function AcWorldCupVo() {
        var _this = _super.call(this) || this;
        _this.btime = 0; //今日购买次数
        _this.vinfo = {}; //竞猜记录
        _this.minfo = {}; //兑换商品记录
        _this.champid = 0;
        return _this;
    }
    AcWorldCupVo.prototype.initData = function (data) {
        for (var key in data) {
            this[key] = data[key];
        }
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_WORLDCUP_FRESH_ITEM);
    };
    Object.defineProperty(AcWorldCupVo.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    AcWorldCupVo.prototype.getpublicRedhot1 = function () {
        return false;
    };
    AcWorldCupVo.prototype.getpublicRedhot2 = function () {
        return false;
    };
    AcWorldCupVo.prototype.getpublicRedhot3 = function () {
        if (LocalStorageManager.get('enterWorldCup') == '') {
            LocalStorageManager.set('enterWorldCup', '1');
            return true;
        }
        return false;
    };
    Object.defineProperty(AcWorldCupVo.prototype, "isShowRedDot", {
        get: function () {
            var flag = false;
            switch (this.getCurPeriod()) {
                case 1:
                    flag = this.v > 0;
                    break;
                case 2:
                    flag = false;
                    break;
                case 3:
                    flag = LocalStorageManager.get('enterWorldCup') == '';
                    break;
            }
            return flag;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcWorldCupVo.prototype, "acTimeAndHour", {
        get: function () {
            var et = this.et;
            return App.DateUtil.getOpenLocalTime(this.st, et, true);
        },
        enumerable: true,
        configurable: true
    });
    AcWorldCupVo.prototype.isInActivity = function () {
        var period = this.getCurPeriod();
        return period == 3;
    };
    AcWorldCupVo.prototype.getArr = function (key) {
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
                        if (currObj.needMeter || currObj.rank || currObj.needGem || currObj.questType || currObj.limit) {
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
    AcWorldCupVo.prototype.getBuyLimitnum = function (id) {
        var info = this.minfo;
        var buyNum = 0;
        if (info && info[id]) {
            buyNum += info[id];
        }
        return buyNum;
    };
    //
    AcWorldCupVo.prototype.isGetJinduAward = function (id) {
        // let info : any = this.ainfo;
        // if(info && info.flags[id]){
        // 	return true;
        // }
        return false;
    };
    /*
    当前积分
    */
    AcWorldCupVo.prototype.getCurPoints = function () {
        return this.v;
    };
    /*
    今日购买次数
    */
    AcWorldCupVo.prototype.getCurBuyNum = function () {
        return this.btime;
    };
    /*
    当前天数
    */
    AcWorldCupVo.prototype.getCurDay = function () {
        var st = this.st;
        var num = Math.ceil((GameData.serverTime - st) / 86400);
        return num;
    };
    /*
    当前阶段
    */
    AcWorldCupVo.prototype.getCurPeriod = function () {
        var period = 0;
        var period1 = this.st;
        var period2 = period1 + 86400 * 6 + 22 * 3600;
        var period3 = period2 + 14 * 3600;
        var end = this.et;
        var time = GameData.serverTime;
        if (time >= period1 && time < period2) {
            period = 1;
        }
        else if (time >= period2 && time < period3) {
            period = 2;
        }
        else if (time >= period3 && time < end) {
            period = 3;
        }
        else {
            period = 4;
        }
        return period;
    };
    /*
    获取国家
    */
    AcWorldCupVo.prototype.getCountryById = function (id) {
        return this.cfg.country[Number(id) - 1].countryName;
    };
    /*
    当前倍率
    */
    AcWorldCupVo.prototype.getCurRatio = function (curday) {
        if (!curday) {
            curday = this.getCurDay();
        }
        return this.cfg.odds[curday - 1];
    };
    /*
    当前竞猜信息
    */
    AcWorldCupVo.prototype.getGuessInfo = function () {
        var arr = [];
        for (var i in this.vinfo) {
            var unit = this.vinfo[i];
            arr.push({
                'time': i,
                'info': unit
            });
        }
        return arr;
    };
    /*
    判断时间所在天数
    */
    AcWorldCupVo.prototype.judgeTime = function (time) {
        var period1 = this.st;
        var days = Math.ceil((time - this.st) / 86400);
        return days;
    };
    /*
    冠军
    */
    AcWorldCupVo.prototype.setChamp = function (countryid) {
        this.champid = Number(countryid);
    };
    AcWorldCupVo.prototype.getChampid = function () {
        return this.champid;
    };
    AcWorldCupVo.prototype.dispose = function () {
        this.minfo = null;
        this.vinfo = null;
    };
    return AcWorldCupVo;
}(AcBaseVo));
__reflect(AcWorldCupVo.prototype, "AcWorldCupVo");
//# sourceMappingURL=AcWorldCupVo.js.map