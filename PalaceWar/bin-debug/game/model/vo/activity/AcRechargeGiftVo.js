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
var AcRechargeGiftVo = (function (_super) {
    __extends(AcRechargeGiftVo, _super);
    function AcRechargeGiftVo() {
        var _this = _super.call(this) || this;
        _this.num = 0;
        return _this;
    }
    AcRechargeGiftVo.prototype.initData = function (data) {
        for (var key in data) {
            this[key] = data[key];
        }
    };
    AcRechargeGiftVo.prototype.getRechargeCfg = function () {
        var cfg = Config.RechargeCfg.getRechargeItemCfgByKey(this.cfg.needGem);
        if (cfg) {
            return cfg;
        }
        return null;
    };
    Object.defineProperty(AcRechargeGiftVo.prototype, "isStart", {
        get: function () {
            if ((this.st <= GameData.serverTime) && (this.et > GameData.serverTime)) {
                return true;
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcRechargeGiftVo.prototype, "isShowIcon", {
        get: function () {
            return this.isCanShow();
        },
        enumerable: true,
        configurable: true
    });
    //是否可显示
    AcRechargeGiftVo.prototype.isCanShow = function () {
        var cfg = this.cfg;
        var isHave1 = false; //是否有对应的vip等级限制
        var isNeed1 = false; //是否需要有对应的vip等级限制
        if (cfg && cfg.need1 && this.checkOwnVipLv(cfg.need1)) {
            isHave1 = true;
            isNeed1 = true;
        }
        var isHave2 = false; //是否有对应的门客or红颜
        var isNeed2 = false; //是否需要有对应的门客or红颜
        if (cfg && cfg.need2) {
            isHave2 = true;
            if (this.isCanNeed2(cfg.need2)) {
                isNeed2 = true;
            }
        }
        //处理红颜和门客
        if (cfg && cfg.switch && cfg.switch[0]) {
            var oneswitch = cfg.switch[0];
            var array = oneswitch.split("_");
            var onestr = array[0];
            if (onestr == "servant" || onestr == "wifeName") {
                isHave2 = true;
                isNeed2 = true;
            }
        }
        if (isHave1) {
            if (isHave2) {
                if (isNeed1 && isNeed2 && this.checkHaveBuyNum()) {
                    return true;
                }
            }
            else {
                if (isNeed1 && this.checkHaveBuyNum()) {
                    return true;
                }
            }
        }
        else {
            if (isHave2 && isNeed2 && this.checkHaveBuyNum()) {
                return true;
            }
        }
        return false;
    };
    AcRechargeGiftVo.prototype.isCanNeed2 = function (need) {
        var itemVoList = GameData.formatRewardItem(need);
        for (var i = 0; i < itemVoList.length; i++) {
            // 门客
            if (itemVoList[i].type == 8) {
                if (!this.checkOwnServantById(itemVoList[i].id)) {
                    return false;
                }
            }
            else if (itemVoList[i].type == 10) {
                if (!this.checkOwnWifeById(itemVoList[i].id)) {
                    return false;
                }
            }
        }
        return true;
    };
    //是否达到vip等级
    AcRechargeGiftVo.prototype.checkOwnVipLv = function (needLv) {
        var pViplv = Api.playerVoApi.getPlayerVipLevel();
        if (pViplv >= needLv) {
            return true;
        }
        return false;
    };
    //是否有这个红颜
    AcRechargeGiftVo.prototype.checkOwnWifeById = function (id) {
        if (Api.wifeVoApi.getWifeInfoVoById(id)) {
            return true;
        }
        return false;
    };
    //是否有红颜皮肤
    AcRechargeGiftVo.prototype.checkIsHasWifeSkin = function (skinId) {
        return Api.wifeSkinVoApi.isOwnSkinOfSkinId(skinId);
    };
    //是否有这个门客
    AcRechargeGiftVo.prototype.checkOwnServantById = function (id) {
        if (Api.servantVoApi.getServantObj(String(id)) != null) {
            return true;
        }
        return false;
    };
    //是否有门客皮肤
    AcRechargeGiftVo.prototype.checkIsHasServantSkin = function (skinId) {
        return Api.servantVoApi.isOwnSkinOfSkinId(String(skinId));
    };
    //是否有购买次数
    AcRechargeGiftVo.prototype.checkHaveBuyNum = function () {
        if (this.cfg && this.cfg.maxNum > this.num) {
            return true;
        }
        return false;
    };
    //倒计时
    AcRechargeGiftVo.prototype.getCountDown = function () {
        var et = this.et;
        if (et < GameData.serverTime) {
            return LanguageManager.getlocal("acPunishEnd");
        }
        return App.DateUtil.getFormatBySecond((et - GameData.serverTime), 1);
    };
    AcRechargeGiftVo.prototype.isInActivity = function () {
        return (GameData.serverTime >= this.st) && (GameData.serverTime < this.et);
    };
    Object.defineProperty(AcRechargeGiftVo.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    AcRechargeGiftVo.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AcRechargeGiftVo;
}(AcBaseVo));
__reflect(AcRechargeGiftVo.prototype, "AcRechargeGiftVo");
//# sourceMappingURL=AcRechargeGiftVo.js.map