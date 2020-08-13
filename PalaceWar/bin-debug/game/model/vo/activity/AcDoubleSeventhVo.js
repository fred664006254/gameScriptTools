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
var AcDoubleSeventhVo = (function (_super) {
    __extends(AcDoubleSeventhVo, _super);
    function AcDoubleSeventhVo() {
        var _this = _super.call(this) || this;
        _this.ainfo = null;
        _this.selIdx = 0;
        _this.shop = {};
        return _this;
    }
    AcDoubleSeventhVo.prototype.initData = function (data) {
        for (var key in data) {
            this[key] = data[key];
        }
        if (data.ainfo) {
            this.ainfo = data.ainfo;
        }
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_DOUBLESEVEN_FRESH);
    };
    //获取自己粽子数
    AcDoubleSeventhVo.prototype.getChargeNum = function () {
        return this.ainfo.v;
    };
    //获取当前奖励档次
    AcDoubleSeventhVo.prototype.getCurJindu = function () {
        var curJindu = 0;
        var curCharge = this.getChargeNum();
        for (var i in this.cfg.recharge) {
            if (curCharge < this.cfg.recharge[i].needGem) {
                curJindu = Number(i);
                break;
            }
            else {
                if (Number(i) == (Object.keys(this.cfg.recharge).length - 1)) {
                    curJindu = Object.keys(this.cfg.recharge).length;
                    break;
                }
            }
        }
        return curJindu;
    };
    /*累积充值领取判断*/
    AcDoubleSeventhVo.prototype.isGetRecharge = function (id) {
        if (this.ainfo && this.ainfo.flags) {
            for (var key in this.ainfo.flags) {
                if (this.ainfo.flags[id] == 1) {
                    return true;
                }
            }
            return false;
        }
        return false;
    };
    Object.defineProperty(AcDoubleSeventhVo.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcDoubleSeventhVo.prototype, "isShowRedDot", {
        get: function () {
            //奖励进度宝箱
            // for(let i in this.cfg.teamReward){
            // 	let unit = this.cfg.teamReward[i];
            // 	let jindu = Number(i) + 1;
            // 	if(this.getTotalRiceNum() >= unit.needMeter && !this.isGetJinduAward(jindu)){
            // 		return true;
            // 	}
            // }
            if (!this.cfg) {
                return false;
            }
            if (this.isCanExchange()) {
                return true;
            }
            var curJindu = this.getCurJindu();
            var chargeNum = this.getChargeNum();
            for (var i = 1; i <= curJindu; ++i) {
                if (chargeNum >= this.cfg.recharge[i].needGem && !this.isGetRecharge(i)) {
                    return true;
                }
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcDoubleSeventhVo.prototype, "acTimeAndHour", {
        get: function () {
            var et = this.et;
            return App.DateUtil.getOpenLocalTime(this.st, et, true);
        },
        enumerable: true,
        configurable: true
    });
    AcDoubleSeventhVo.prototype.isInActivity = function () {
        return GameData.serverTime >= this.st && GameData.serverTime < this.et;
    };
    AcDoubleSeventhVo.prototype.getArr = function (key) {
        var arr = [];
        var cfg = this.cfg;
        if (!cfg) {
            return [];
        }
        var list = cfg;
        for (var i in list) {
            if (i == key) {
                for (var key2 in list[i]) {
                    if (list[i][key2]) {
                        var currObj = list[i][key2];
                        if (currObj.needGem) {
                            list[i][key2].key = Number(key2);
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
    AcDoubleSeventhVo.prototype.getAvgConfig = function (buildId, code) {
        return this.cfg.getDialogByBuildId(buildId, code);
    };
    AcDoubleSeventhVo.prototype.getShopNum = function (id) {
        var num = 0;
        if (this.shop && this.shop[id]) {
            num = this.shop[id];
        }
        return num;
    };
    AcDoubleSeventhVo.prototype.isCanExchange = function () {
        if (!this.cfg.getExchangeNeedItemId()) {
            return false;
        }
        var b = false;
        var hasNum = Api.itemVoApi.getItemNumInfoVoById(this.cfg.getExchangeNeedItemId());
        if (hasNum > 0) {
            var scenesid = this.cfg.getExchangeSceneId();
            if (Api.otherInfoVoApi.isHasSceneNotAboutUnlock(scenesid, "searchScene")) {
                b = true;
            }
            else {
                var needparts = this.cfg.exchange.needPart;
                if (needparts) {
                    var needNum = needparts.split("_")[2];
                    if (hasNum >= Number(needNum)) {
                        b = true;
                    }
                }
            }
        }
        return b;
    };
    AcDoubleSeventhVo.prototype.dispose = function () {
        this.ainfo = null;
        this.shop = {};
        _super.prototype.dispose.call(this);
    };
    return AcDoubleSeventhVo;
}(AcBaseVo));
__reflect(AcDoubleSeventhVo.prototype, "AcDoubleSeventhVo");
//# sourceMappingURL=AcDoubleSeventhVo.js.map