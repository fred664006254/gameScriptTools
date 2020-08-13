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
var AcWishTreeVo = (function (_super) {
    __extends(AcWishTreeVo, _super);
    function AcWishTreeVo() {
        return _super.call(this) || this;
    }
    AcWishTreeVo.prototype.initData = function (data) {
        var isNextDay = false;
        if (this["discount"] == 1 && data["discount"] == 0) {
            isNextDay = true; // 跨天刷新
        }
        for (var key in data) {
            this[key] = data[key];
        }
        if (isNextDay) {
            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_WISHTRER_NEXTDAY);
        }
    };
    Object.defineProperty(AcWishTreeVo.prototype, "isShowRedDot", {
        get: function () {
            var itemNum = Api.itemVoApi.getItemNumInfoVoById("2102");
            if (itemNum > 0) {
                var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
                if (!cfg) {
                    return false;
                }
                var numL = cfg.getLastWishTimes();
                if (numL > 0) {
                    return true;
                }
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    AcWishTreeVo.prototype.getDiscount = function () {
        return this["discount"];
    };
    return AcWishTreeVo;
}(AcBaseVo));
__reflect(AcWishTreeVo.prototype, "AcWishTreeVo");
//# sourceMappingURL=AcWishTreeVo.js.map