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
var AcTigertrappassVo = (function (_super) {
    __extends(AcTigertrappassVo, _super);
    function AcTigertrappassVo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AcTigertrappassVo.prototype.initData = function (data) {
        for (var key in data) {
            this[key] = data[key];
        }
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_DOUBLESEVEN_FRESH);
    };
    Object.defineProperty(AcTigertrappassVo.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcTigertrappassVo.prototype, "isShowRedDot", {
        get: function () {
            if (!this.cfg) {
                return false;
            }
            if (this.attacknum > 0 && this.attacksum < this.cfg.num) {
                return true;
            }
            var costItemId = this.cfg.needChipid;
            var costItemInfo = Api.itemVoApi.getItemInfoVoById(Number(costItemId));
            if (!Api.servantVoApi.isOwnSkinOfSkinId(String(this.cfg.skinExchange)) && costItemInfo && costItemInfo.num >= this.cfg.needChipNum) {
                return true;
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcTigertrappassVo.prototype, "acTimeAndHour", {
        get: function () {
            var et = this.et;
            return App.DateUtil.getOpenLocalTime(this.st, et, true);
        },
        enumerable: true,
        configurable: true
    });
    AcTigertrappassVo.prototype.isInActivity = function () {
        return GameData.serverTime >= this.st && GameData.serverTime < this.et;
    };
    AcTigertrappassVo.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AcTigertrappassVo;
}(AcBaseVo));
__reflect(AcTigertrappassVo.prototype, "AcTigertrappassVo");
