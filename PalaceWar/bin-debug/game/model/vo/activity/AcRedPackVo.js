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
var AcRedPackVo = (function (_super) {
    __extends(AcRedPackVo, _super);
    function AcRedPackVo() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.ainfo = null;
        _this.addgem = 0;
        return _this;
    }
    Object.defineProperty(AcRedPackVo.prototype, "cfg", {
        get: function () {
            var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
            return cfg;
        },
        enumerable: true,
        configurable: true
    });
    AcRedPackVo.prototype.initData = function (data) {
        _super.prototype.initData.call(this, data);
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_ACREDPACK_REFRESHVO);
        this.addgem = data["ainfo"].v;
    };
    AcRedPackVo.prototype.setAddgem = function (num) {
        this.addgem = num;
    };
    AcRedPackVo.prototype.getAddgem = function () {
        return this.addgem;
    };
    Object.defineProperty(AcRedPackVo.prototype, "isClose", {
        get: function () {
            // let f = this.ainfo ? this.ainfo.f:0;
            var v = this.ainfo ? this.ainfo.v : 0;
            return v == 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcRedPackVo.prototype, "btnStatus", {
        //0-->跳转充值 1-->可领取 2-->已经领取
        get: function () {
            var f = this.ainfo ? this.ainfo.f : 0;
            return f;
            // return this.ainfo ? this.ainfo.f:0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcRedPackVo.prototype, "isShowRedDot", {
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
    AcRedPackVo.prototype.dispose = function () {
        this.ainfo = null;
        this.addgem = 0;
        _super.prototype.dispose.call(this);
    };
    return AcRedPackVo;
}(AcBaseVo));
__reflect(AcRedPackVo.prototype, "AcRedPackVo");
//# sourceMappingURL=AcRedPackVo.js.map