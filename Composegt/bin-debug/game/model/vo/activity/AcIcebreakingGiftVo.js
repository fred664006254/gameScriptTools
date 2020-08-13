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
var AcIcebreakingGiftVo = (function (_super) {
    __extends(AcIcebreakingGiftVo, _super);
    function AcIcebreakingGiftVo() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.ainfo = null;
        _this.addgem = 0;
        return _this;
    }
    Object.defineProperty(AcIcebreakingGiftVo.prototype, "cfg", {
        get: function () {
            var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
            return cfg;
        },
        enumerable: true,
        configurable: true
    });
    AcIcebreakingGiftVo.prototype.initData = function (data) {
        _super.prototype.initData.call(this, data);
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_ACICEBREAKINGGIFT_REFRESHVO);
        this.addgem = data["ainfo"].v;
    };
    AcIcebreakingGiftVo.prototype.setAddgem = function (num) {
        this.addgem = num;
    };
    AcIcebreakingGiftVo.prototype.getAddgem = function () {
        return this.addgem;
    };
    Object.defineProperty(AcIcebreakingGiftVo.prototype, "isClose", {
        get: function () {
            // let f = this.ainfo ? this.ainfo.f:0;
            var v = this.ainfo ? this.ainfo.v : 0;
            return v == 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcIcebreakingGiftVo.prototype, "btnStatus", {
        //0-->跳转充值 1-->可领取 2-->已经领取
        get: function () {
            var f = this.ainfo ? this.ainfo.f : 0;
            return f;
            // return this.ainfo ? this.ainfo.f:0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcIcebreakingGiftVo.prototype, "isShowRedDot", {
        //剩余元宝
        // public getResidue():number
        // {
        //     this.cfg.getGemGet() - 
        // }
        /**
         * 检测活动是否显示红点，true：显示
         */
        get: function () {
            if (this.btnStatus == 1 && this.ainfo && this.ainfo.v > 0) {
                return true;
            }
            else {
                return false;
            }
        },
        enumerable: true,
        configurable: true
    });
    AcIcebreakingGiftVo.prototype.dispose = function () {
        this.ainfo = null;
        this.addgem = 0;
        _super.prototype.dispose.call(this);
    };
    return AcIcebreakingGiftVo;
}(AcBaseVo));
__reflect(AcIcebreakingGiftVo.prototype, "AcIcebreakingGiftVo");
