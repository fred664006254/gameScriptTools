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
var AcCostGemRankVo = (function (_super) {
    __extends(AcCostGemRankVo, _super);
    function AcCostGemRankVo() {
        var _this = _super.call(this) || this;
        //排行榜
        _this.rankinfo = {};
        return _this;
    }
    AcCostGemRankVo.prototype.initData = function (data) {
        for (var key in data) {
            this[key] = data[key];
        }
    };
    //可转盘
    AcCostGemRankVo.prototype.getpublicRedhot1 = function () {
        var flag = false;
        return flag;
    };
    Object.defineProperty(AcCostGemRankVo.prototype, "isShowRedDot", {
        get: function () {
            var flag = false;
            if (!this.config) {
                flag = false;
            }
            for (var i = 1; i < 2; ++i) {
                if (this["getpublicRedhot" + i]()) {
                    flag = true;
                }
            }
            return flag;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcCostGemRankVo.prototype, "acTimeAndHour", {
        get: function () {
            var et = this.et - 86400 * this.config.extraTime;
            return App.DateUtil.getOpenLocalTime(this.st, et, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcCostGemRankVo.prototype, "acCountDown", {
        get: function () {
            var et = this.et - 86400 * this.config.extraTime;
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
    AcCostGemRankVo.prototype.isInActivity = function () {
        return GameData.serverTime >= this.st && GameData.serverTime < this.et - 86400 * this.config.extraTime;
    };
    //获取消耗元宝数
    AcCostGemRankVo.prototype.getUseGemNum = function () {
        return this.v;
    };
    /**
     * 活动彻底结束（包括展示期）
     */
    AcCostGemRankVo.prototype.isActivityEnd = function () {
        return GameData.serverTime >= this.et;
    };
    AcCostGemRankVo.prototype.getArr = function (key) {
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
    AcCostGemRankVo.prototype.getMyPrank = function () {
        var rank = 0;
        if (this.rankinfo && this.rankinfo.myrankArr && this.rankinfo.myrankArr.myrank) {
            rank = this.rankinfo.myrankArr.myrank;
        }
        return rank;
    };
    AcCostGemRankVo.prototype.getMyPScore = function () {
        var score = 0;
        if (this.rankinfo && this.rankinfo.myrankArr && this.rankinfo.myrankArr.value) {
            score = this.rankinfo.myrankArr.value;
        }
        return score;
    };
    AcCostGemRankVo.prototype.setRankInfo = function (data) {
        if (data.rankArr) {
            this.rankinfo.rankArr = data.rankArr;
        }
        if (data.myrankArr) {
            this.rankinfo.myrankArr = data.myrankArr;
        }
    };
    AcCostGemRankVo.prototype.getRankInfo = function () {
        var arr = [];
        if (this.rankinfo && this.rankinfo.rankArr) {
            arr = this.rankinfo.rankArr;
        }
        return arr;
    };
    AcCostGemRankVo.prototype.getSpecialShow = function () {
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        if (!cfg) {
            return null;
        }
        for (var key in cfg.gemRank) {
            var rewards = cfg.gemRank[key].getReward;
            var rArr = rewards.split("|");
            for (var i = 0; i < rArr.length; i++) {
                var strArr = rArr[i].split("_");
                if (this.code == 1 || this.code == 2) {
                    if (strArr[0] == "11") {
                        return strArr[1];
                    }
                }
            }
        }
        return null;
    };
    AcCostGemRankVo.prototype.dispose = function () {
        this.rankinfo = null;
        _super.prototype.dispose.call(this);
    };
    return AcCostGemRankVo;
}(AcBaseVo));
__reflect(AcCostGemRankVo.prototype, "AcCostGemRankVo");
//# sourceMappingURL=AcCostGemRankVo.js.map