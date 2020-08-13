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
var AcLimitedRewardInfoVo = (function (_super) {
    __extends(AcLimitedRewardInfoVo, _super);
    function AcLimitedRewardInfoVo() {
        var _this = _super.call(this) || this;
        /**
         * 类型
         */
        _this.type = 0;
        /**
         * 档位
         */
        _this.id = 0;
        /**
         * 该档位需要的条件
         */
        _this.condition = 0;
        /**
         * 每一档对应奖励
         */
        _this.reward = "";
        _this.aid = "";
        _this.code = 0;
        _this.level = null;
        return _this;
    }
    AcLimitedRewardInfoVo.prototype.initData = function (data) {
    };
    Object.defineProperty(AcLimitedRewardInfoVo.prototype, "getTitleStr", {
        /**
         * 活动名称
         */
        get: function () {
            return LanguageManager.getlocal("ac" + App.StringUtil.firstCharToUper(this.aid + "-" + this.type) + "_Title");
        },
        enumerable: true,
        configurable: true
    });
    AcLimitedRewardInfoVo.prototype.dispose = function () {
        this.type = 0;
        this.id = 0;
        this.condition = 0;
        this.reward = "";
        this.aid = "";
        this.code = 0;
        this.level = null;
    };
    return AcLimitedRewardInfoVo;
}(BaseVo));
__reflect(AcLimitedRewardInfoVo.prototype, "AcLimitedRewardInfoVo");
//# sourceMappingURL=AcLimitedRewardInfoVo.js.map