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
var AcWifeBathingVo = (function (_super) {
    __extends(AcWifeBathingVo, _super);
    function AcWifeBathingVo() {
        var _this = _super.call(this) || this;
        _this.opened = null;
        return _this;
    }
    Object.defineProperty(AcWifeBathingVo.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    AcWifeBathingVo.prototype.initData = function (data) {
        for (var key in data) {
            this[key] = data[key];
        }
        //状态发生变化
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_ACWIFEBATHING_REFRESHVO);
    };
    AcWifeBathingVo.prototype.getAvgConfig = function (id, code) {
        return this.cfg.getDialogById(id, code);
    };
    AcWifeBathingVo.prototype.getOpened = function () {
        return this.opened == 1;
    };
    Object.defineProperty(AcWifeBathingVo.prototype, "isShowRedDot", {
        get: function () {
            var acVo = Api.acVoApi.getActivityVoByAidAndCode("wifeBathing");
            var acCfg = Config.AcCfg.getCfgByActivityIdAndCode("wifeBathing", acVo.code);
            if (!acCfg) {
                return false;
            }
            if (acVo.get == 0 && acVo.scorenum >= acCfg.need) {
                return true;
            }
            else {
                return false;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcWifeBathingVo.prototype, "isStart", {
        /**重写
         * 是否在活动开始期间，true：在期间，false:已结束或者未开始
         */
        get: function () {
            if ((this.st <= GameData.serverTime) && (this.et > GameData.serverTime) && !this.checkOwnWifeScene()) {
                return true;
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    //已经拥有这个红颜场景
    AcWifeBathingVo.prototype.checkOwnWifeScene = function () {
        var acCfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        var wifeInfoVo = Api.wifeVoApi.getWifeInfoVoById(acCfg.wifeId);
        if (wifeInfoVo && wifeInfoVo.scene && wifeInfoVo.scene[acCfg.wifeBathingId]) {
            return true;
        }
        return false;
    };
    AcWifeBathingVo.prototype.dispose = function () {
        this.scorenum = 0;
        this.get = 0;
        this.opened = null;
    };
    return AcWifeBathingVo;
}(AcBaseVo));
__reflect(AcWifeBathingVo.prototype, "AcWifeBathingVo");
