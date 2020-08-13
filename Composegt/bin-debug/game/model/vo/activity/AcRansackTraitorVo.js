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
/**
 * author yanyuling
 */
var AcRansackTraitorVo = (function (_super) {
    __extends(AcRansackTraitorVo, _super);
    function AcRansackTraitorVo() {
        return _super.call(this) || this;
    }
    AcRansackTraitorVo.prototype.initData = function (data) {
        _super.prototype.initData.call(this, data);
        this.v = data.v;
        this.tennum = data.tennum;
        this.attacknum = data.attacknum;
        this.singlenum = data.singlenum;
        this.singlechipnum = data.singlechipnum;
        this.chipnum = data.chipnum;
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_RANSACTARTIOR_REFRESH);
    };
    AcRansackTraitorVo.prototype.isFineAll = function () {
        var allNum = this.config.RansackItemNum;
        return this.chipnum >= allNum;
    };
    Object.defineProperty(AcRansackTraitorVo.prototype, "isShowRedDot", {
        get: function () {
            if (this.isExchangeEnable()) {
                return true;
            }
            if (this.attacknum > 0 && !this.isFineAll()) {
                return true;
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    AcRansackTraitorVo.prototype.isExchangeEnable = function () {
        return this.isFineAll() && !Api.servantVoApi.isOwnSkinOfSkinId(this.config.getRewardSkinId());
    };
    AcRansackTraitorVo.prototype.dispose = function () {
        this.v = 0;
        this.tennum = 0;
        this.attacknum = 0;
        this.singlenum = 0;
        this.singlechipnum = 0;
        this.chipnum = 0;
        _super.prototype.dispose.call(this);
    };
    return AcRansackTraitorVo;
}(AcBaseVo));
__reflect(AcRansackTraitorVo.prototype, "AcRansackTraitorVo");
