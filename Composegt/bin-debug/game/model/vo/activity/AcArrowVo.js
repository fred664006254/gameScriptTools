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
var AcArrowVo = (function (_super) {
    __extends(AcArrowVo, _super);
    function AcArrowVo() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.firstOpen = 0;
        return _this;
    }
    AcArrowVo.prototype.initData = function (data) {
        for (var key in data) {
            this[key] = data[key];
        }
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_ARROW_REFRESHVO);
    };
    Object.defineProperty(AcArrowVo.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcArrowVo.prototype, "isShowRedDot", {
        get: function () {
            if (this.et - 86400 < GameData.serverTime) {
                return false;
            }
            if (this.isUpLevelRedDot()) {
                return true;
            }
            // 任务红点
            if (this.havenum > 0) {
                return true;
            }
            if (!this.cfg) {
                return false;
            }
            // 宝箱
            for (var i = 0; i < this.cfg.phaseReward.length; i++) {
                var tmprcfg = this.cfg.phaseReward[i];
                if ((!this.stageinfo || !this.stageinfo[i + 1]) && this.rings >= tmprcfg.needRings) {
                    return true;
                }
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 升级的红点
     */
    AcArrowVo.prototype.isUpLevelRedDot = function () {
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        if (!cfg) {
            return false;
        }
        var levelList = cfg.getLevelUpList();
        for (var i = 0; i < levelList.length; i++) {
            if (this.chargenum >= levelList[i].needGem && this.level < Number(levelList[i].id)) {
                return true;
            }
        }
        return false;
    };
    /**
     * 进度条百分比
     */
    AcArrowVo.prototype.getPercentageNum = function () {
        var unitNum = 0.2;
        var tageNum = 0;
        var ringsNumCfg = 0;
        if (!this.cfg) {
            return tageNum;
        }
        // 宝箱
        for (var i = 0; i < this.cfg.phaseReward.length; i++) {
            var tmprcfg = this.cfg.phaseReward[i];
            if (this.rings >= tmprcfg.needRings) {
                tageNum = tageNum + unitNum;
                ringsNumCfg = tmprcfg.needRings;
            }
            else {
                var addValue = (this.rings - ringsNumCfg) / (tmprcfg.needRings - ringsNumCfg) * unitNum;
                tageNum = tageNum + addValue;
                break;
            }
        }
        return tageNum;
    };
    Object.defineProperty(AcArrowVo.prototype, "acTimeAndHour", {
        get: function () {
            var et = this.et;
            return App.DateUtil.getOpenLocalTime(this.st, et, true);
        },
        enumerable: true,
        configurable: true
    });
    AcArrowVo.prototype.isInActivity = function () {
        return GameData.serverTime >= this.st && GameData.serverTime < this.et;
    };
    AcArrowVo.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AcArrowVo;
}(AcBaseVo));
__reflect(AcArrowVo.prototype, "AcArrowVo");
