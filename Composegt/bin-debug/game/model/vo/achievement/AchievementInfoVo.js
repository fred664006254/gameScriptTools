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
 * 成就vo
 * author dky
 * date 2017/11/4
 * @class AchievementInfoVo
 */
var AchievementInfoVo = (function (_super) {
    __extends(AchievementInfoVo, _super);
    function AchievementInfoVo() {
        var _this = _super.call(this) || this;
        // 成就阶段
        _this.stage = 0;
        // 成就达成的值
        _this.v = 0;
        // "成就领取情况0未完成 1已完成 2已领取",
        _this.f = 0;
        return _this;
    }
    AchievementInfoVo.prototype.initData = function (data) {
        if (data) {
            if (data.stage != null) {
                this.stage = Number(data.stage);
            }
            if (data.v != null) {
                this.v = Number(data.v);
            }
            if (data.f != null) {
                this.f = Number(data.f);
            }
        }
    };
    Object.defineProperty(AchievementInfoVo.prototype, "name", {
        /**成就名称 */
        get: function () {
            return this.cfg.name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AchievementInfoVo.prototype, "icon", {
        /**成就icon */
        get: function () {
            return this.cfg.acIcon;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AchievementInfoVo.prototype, "nameIcon", {
        /**成就Nameicon */
        get: function () {
            return this.cfg.nameIcon;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AchievementInfoVo.prototype, "cfg", {
        get: function () {
            return Config.AchievementCfg.getAchievementCfgById(this.id.toString());
        },
        enumerable: true,
        configurable: true
    });
    AchievementInfoVo.prototype.dispose = function () {
        this.id = null;
        this.stage = 0;
        this.v = 0;
        this.f = 0;
    };
    return AchievementInfoVo;
}(BaseVo));
__reflect(AchievementInfoVo.prototype, "AchievementInfoVo");
