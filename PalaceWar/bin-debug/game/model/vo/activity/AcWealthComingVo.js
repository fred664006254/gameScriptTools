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
 * 财神驾到vo
 */
var AcWealthComingVo = (function (_super) {
    __extends(AcWealthComingVo, _super);
    function AcWealthComingVo() {
        return _super.call(this) || this;
    }
    AcWealthComingVo.prototype.initData = function (data) {
        for (var key in data) {
            this[key] = data[key];
        }
    };
    /**是否免费 */
    AcWealthComingVo.prototype.isFree = function () {
        if (this.freeTimes == 1) {
            return true;
        }
        return false;
    };
    /**是否拥有buff */
    AcWealthComingVo.prototype.isHasWealethBuff = function () {
        if (this.luckyBuff == "cyht" || this.luckyBuff == "tjhc" || this.luckyBuff == "csjd") {
            return true;
        }
        return false;
    };
    /**是否拥有buff */
    AcWealthComingVo.prototype.getWealethBuffType = function () {
        if (this.luckyBuff == "cyht") {
            return "3";
        }
        else if (this.luckyBuff == "tjhc") {
            return "2";
        }
        else if (this.luckyBuff == "csjd") {
            return "1";
        }
        return null;
    };
    /**财运次数 */
    AcWealthComingVo.prototype.getLuckyValue = function () {
        if (this.luckyNum) {
            return this.luckyNum;
        }
        return 0;
    };
    /**是否进入第二阶段 */
    AcWealthComingVo.prototype.isSecond = function () {
        if (this.luckyNum >= this.config.luckyProcess) {
            return true;
        }
        return false;
    };
    /**是否领取了这个档位 */
    AcWealthComingVo.prototype.isReceiveReward = function (id) {
        if (this.rinfo[id]) {
            return true;
        }
        return false;
    };
    /**排序cfg */
    AcWealthComingVo.prototype.getSortProcessCfg = function () {
        var processCfg = this.getProcessCfg();
        for (var i = 0; i < processCfg.length; i++) {
            if (this.isReceiveReward(processCfg[i].id)) {
                processCfg[i].sortId = processCfg.length + Number(processCfg[i].id);
                continue;
            }
            else if (this.getLuckyValue() >= processCfg[i].value) {
                processCfg[i].sortId = (Number(processCfg[i].id)) - processCfg.length - 1;
                continue;
            }
            else {
                processCfg[i].sortId = Number(processCfg[i].id);
                continue;
            }
        }
        return processCfg;
    };
    /**
 * 任务奖励红点
 */
    AcWealthComingVo.prototype.isHaveRedDot = function () {
        var processCfg = this.getProcessCfg();
        for (var i = 0; i < processCfg.length; i++) {
            if (this.getLuckyValue() >= processCfg[i].value) {
                if (!this.isReceiveReward(processCfg[i].id)) {
                    return true;
                }
            }
        }
        return false;
    };
    Object.defineProperty(AcWealthComingVo.prototype, "isShowRedDot", {
        /**
         * 红点显示
         */
        get: function () {
            if (!this.checkIsInEndShowTime()) {
                if (this.isFree()) {
                    return this.isFree();
                }
            }
            return this.isHaveRedDot();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 奖励进度的配置
     */
    AcWealthComingVo.prototype.getProcessCfg = function () {
        var processCfg = [];
        for (var i = 0; i < this.config.rewardProcessItemCfgList.length; i++) {
            if (this.luckyNum < this.config.luckyProcess && this.config.rewardProcessItemCfgList[i].value > this.config.luckyProcess) {
                break;
            }
            processCfg.push(this.config.rewardProcessItemCfgList[i]);
        }
        return processCfg;
    };
    Object.defineProperty(AcWealthComingVo.prototype, "acCountDown", {
        /**
         * 活动结束倒计时，格式：00：00：00
         */
        get: function () {
            var et = this.et - this.config.extraTime * 86400;
            if (et < GameData.serverTime) {
                return LanguageManager.getlocal("acPunishEnd");
            }
            return App.DateUtil.getFormatBySecond((et - GameData.serverTime), 1);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcWealthComingVo.prototype, "config", {
        /**重新cfg */
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    AcWealthComingVo.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AcWealthComingVo;
}(AcBaseVo));
__reflect(AcWealthComingVo.prototype, "AcWealthComingVo");
//# sourceMappingURL=AcWealthComingVo.js.map