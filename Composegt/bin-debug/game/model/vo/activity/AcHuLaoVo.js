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
var AcHuLaoVo = (function (_super) {
    __extends(AcHuLaoVo, _super);
    function AcHuLaoVo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AcHuLaoVo.prototype.initData = function (data) {
        for (var key in data) {
            this[key] = data[key];
        }
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_DOUBLESEVEN_FRESH);
    };
    Object.defineProperty(AcHuLaoVo.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcHuLaoVo.prototype, "isShowRedDot", {
        get: function () {
            if (!this.cfg) {
                return false;
            }
            if (this.attacknum > 0 && this.attacksum < this.cfg.attackNum) {
                return true;
            }
            if (this.code == 1) {
                // 门客id
                var servantId = Config.ServantskinCfg.getServantSkinItemById(this.cfg.skinExchange).servantId;
                var amuletNum = Api.amuletVoApi.getAmuletNum(servantId, String(this.cfg.skinActiveId));
                if (!Api.servantVoApi.isOwnSkinOfSkinId(String(this.cfg.skinExchange)) && amuletNum >= this.cfg.skinActiveNum) {
                    return true;
                }
            }
            // 宝箱
            for (var i = 0; i < this.cfg.lotteryNum.length; i++) {
                var tmprcfg = this.cfg.lotteryNum[i];
                if ((!this.flags || !this.flags[i + 1]) && this.attacksum >= tmprcfg.needNum) {
                    return true;
                }
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    //boss 是否已经死了
    AcHuLaoVo.prototype.isBossDie = function () {
        return this.attacksum >= this.cfg.attackNum;
    };
    Object.defineProperty(AcHuLaoVo.prototype, "acTimeAndHour", {
        get: function () {
            var et = this.et;
            return App.DateUtil.getOpenLocalTime(this.st, et, true);
        },
        enumerable: true,
        configurable: true
    });
    AcHuLaoVo.prototype.isInActivity = function () {
        return GameData.serverTime >= this.st && GameData.serverTime < this.et;
    };
    AcHuLaoVo.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AcHuLaoVo;
}(AcBaseVo));
__reflect(AcHuLaoVo.prototype, "AcHuLaoVo");
