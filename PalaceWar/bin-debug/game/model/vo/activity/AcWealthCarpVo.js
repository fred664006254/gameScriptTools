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
 * 彩蛋Vo
 * @author 张朝阳
 * data 2019/3/12
 * @class AcWealthCarpVo
 */
var AcWealthCarpVo = (function (_super) {
    __extends(AcWealthCarpVo, _super);
    function AcWealthCarpVo() {
        var _this = _super.call(this) || this;
        _this.chargeNum = 0;
        _this.getFlag = null;
        return _this;
    }
    AcWealthCarpVo.prototype.initData = function (data) {
        for (var key in data) {
            this[key] = data[key];
        }
    };
    /**个人充值进度 */
    AcWealthCarpVo.prototype.getChargeNum = function () {
        return this.chargeNum;
    };
    /**是否领取 */
    AcWealthCarpVo.prototype.isReceive = function (key) {
        if (this.getFlag[key] && this.getFlag[key] == 1) {
            return true;
        }
        return false;
    };
    /**
     * 获得充值奖励的配置
     */
    AcWealthCarpVo.prototype.getSortRewards = function () {
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        var rechargeData = cfg.rewardItemListCfg;
        for (var i = 0; i < rechargeData.length; i++) {
            if (this.isReceive(rechargeData[i].id)) {
                rechargeData[i].sortId = rechargeData.length + Number(rechargeData[i].id);
                continue;
            }
            else if (this.chargeNum >= rechargeData[i].needGem) {
                rechargeData[i].sortId = (Number(rechargeData[i].id)) - rechargeData.length - 1;
                continue;
            }
            else {
                rechargeData[i].sortId = Number(rechargeData[i].id);
                continue;
            }
        }
        return rechargeData;
    };
    Object.defineProperty(AcWealthCarpVo.prototype, "isShowRedDot", {
        /**
         * 红点显示
         */
        get: function () {
            var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
            var rechargeData = cfg.rewardItemListCfg;
            if (!rechargeData) {
                return false;
            }
            for (var i = 0; i < rechargeData.length; i++) {
                if (this.chargeNum >= rechargeData[i].needGem && (!this.isReceive(rechargeData[i].id))) {
                    return true;
                }
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcWealthCarpVo.prototype, "acCountDown", {
        /**
         * 活动结束倒计时，格式：00：00：00
         */
        get: function () {
            return App.DateUtil.getFormatBySecond((this.et - GameData.serverTime - 86400 * this.config.extraTime), 1);
        },
        enumerable: true,
        configurable: true
    });
    AcWealthCarpVo.prototype.dispose = function () {
        this.chargeNum = 0;
        this.getFlag = null;
        _super.prototype.dispose.call(this);
    };
    return AcWealthCarpVo;
}(AcBaseVo));
__reflect(AcWealthCarpVo.prototype, "AcWealthCarpVo");
//# sourceMappingURL=AcWealthCarpVo.js.map