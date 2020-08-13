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
var AcWifeComeVo = (function (_super) {
    __extends(AcWifeComeVo, _super);
    function AcWifeComeVo() {
        return _super.call(this) || this;
    }
    AcWifeComeVo.prototype.initData = function (data) {
        var oldV = this.v;
        var oldGet = this.get;
        for (var key in data) {
            this[key] = data[key];
        }
        if (this.get == 1) {
            Api.acVoApi.setActiveUnlock(1);
        }
        if (oldV != this.v || oldGet != this.get) {
            //状态发生变化
            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_ACWIFECOME_VOCHANGE);
        }
    };
    Object.defineProperty(AcWifeComeVo.prototype, "isShowRedDot", {
        get: function () {
            var acVo = this; //Api.acVoApi.getActivityVoByAidAndCode("wifeCome",);
            var acCfg = Config.AcCfg.getCfgByActivityIdAndCode("wifeCome", acVo.code);
            if (!acCfg) {
                return false;
            }
            if (acVo.get == 0 && acVo.v >= acCfg.need) {
                return true;
            }
            else {
                return false;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcWifeComeVo.prototype, "isStart", {
        /**重写
         * 是否在活动开始期间，true：在期间，false:已结束或者未开始
         */
        get: function () {
            if ((this.st <= GameData.serverTime) && (this.et > GameData.serverTime) && !this.checkOwnWife()) {
                return true;
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    AcWifeComeVo.prototype.checkOwnWife = function () {
        var acCfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        if (acCfg && Api.wifeVoApi.getWifeInfoVoById(Number(acCfg.wifeId))) {
            return true;
        }
        else {
            return false;
        }
    };
    AcWifeComeVo.prototype.dispose = function () {
        this.v = 0;
        this.get = 0;
    };
    return AcWifeComeVo;
}(AcBaseVo));
__reflect(AcWifeComeVo.prototype, "AcWifeComeVo");
