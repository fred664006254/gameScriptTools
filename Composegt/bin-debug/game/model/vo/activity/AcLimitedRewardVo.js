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
var AcLimitedRewardVo = (function (_super) {
    __extends(AcLimitedRewardVo, _super);
    function AcLimitedRewardVo() {
        var _this = _super.call(this) || this;
        /**
         * 限时类活动是否有红点奖励 true 有 false 没有
         */
        _this.red = false;
        _this.limitedRewardInfoVoList = [];
        _this.level = null;
        return _this;
    }
    /**
     * 获取所有档位信息
     */
    AcLimitedRewardVo.prototype.getLimitedRewardInfoVoList = function () {
        if (this.limitedRewardInfoVoList.length == 0) {
            for (var key in this.config.value) {
                if (this.config.value[key] && this.config.reward[key]) {
                    var infoVo = new AcLimitedRewardInfoVo();
                    infoVo.id = Number(key);
                    infoVo.aid = this.aid;
                    infoVo.code = this.code;
                    infoVo.type = this.config.type;
                    infoVo.condition = Number(this.config.value[key]);
                    infoVo.reward = String(this.config.reward[key]);
                    infoVo.level = this.level;
                    this.limitedRewardInfoVoList.push(infoVo);
                }
            }
        }
        return this.limitedRewardInfoVoList;
    };
    /**
     * 根据id和条件判断该档位的领取状态
     * @param id
     * @param condition 条件
     */
    AcLimitedRewardVo.prototype.getFlagByIdAndCondition = function (id, condition) {
        if (this.flags && this.flags[id]) {
            return this.flags[id];
        }
        if (this.v < condition) {
            return 2;
        }
        return 0;
    };
    /**
     * 获取当前领取到第几档
     */
    AcLimitedRewardVo.prototype.getMaxGrade = function () {
        var max = 0;
        for (var key in this.flags) {
            if (Number(this.flags[key]) == 1) {
                if ((max + 1) == Number(key)) {
                    max = Number(key);
                }
            }
        }
        return max;
    };
    Object.defineProperty(AcLimitedRewardVo.prototype, "isShowRedDot", {
        get: function () {
            return this.red;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcLimitedRewardVo.prototype, "icon", {
        /**
         * icon图标
         */
        get: function () {
            var incoCfg = GameConfig.config.limitedrewardbaseCfg[this.atype];
            return incoCfg.icon;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcLimitedRewardVo.prototype, "getTitleStr", {
        get: function () {
            return LanguageManager.getlocal("ac" + App.StringUtil.firstCharToUper(this.aid + "-" + this.atype) + "_Title");
        },
        enumerable: true,
        configurable: true
    });
    return AcLimitedRewardVo;
}(AcBaseVo));
__reflect(AcLimitedRewardVo.prototype, "AcLimitedRewardVo");
