var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * 新服庆典
 * date 2020.6.30
 * author ycg
 * @class AcNewappointVo
 */
var AcNewappointVo = /** @class */ (function (_super) {
    __extends(AcNewappointVo, _super);
    function AcNewappointVo() {
        return _super.call(this) || this;
    }
    AcNewappointVo.prototype.initData = function (data) {
        for (var key in data) {
            this[key] = data[key];
        }
    };
    AcNewappointVo.prototype.isJoin = function () {
        if (this.isjoin) {
            return true;
        }
        return false;
    };
    Object.defineProperty(AcNewappointVo.prototype, "isShowIcon", {
        get: function () {
            return this.isJoin();
        },
        enumerable: true,
        configurable: true
    });
    /**礼包当前进度 */
    AcNewappointVo.prototype.getGiftProcess = function () {
        if (this.diffday) {
            return this.diffday;
        }
        return 0;
    };
    /**礼包进度奖励是否领取 */
    AcNewappointVo.prototype.isGetGiftReward = function (id) {
        if (this.task && this.task[id]) {
            return true;
        }
        return false;
    };
    //是否有礼包奖励
    AcNewappointVo.prototype.checkGiftRed = function () {
        var data = this.cfg.getGiftListCfg();
        for (var i = 0; i < data.length; i++) {
            if (!this.isGetGiftReward(data[i].id)) {
                if (this.getGiftProcess() >= data[i].needDay) {
                    return true;
                }
            }
        }
        return false;
    };
    AcNewappointVo.prototype.getGiftRewardIndex = function () {
        var data = this.cfg.getGiftListCfg();
        for (var i = 0; i < data.length; i++) {
            if (!this.isGetGiftReward(data[i].id)) {
                if (this.getGiftProcess() >= data[i].needDay) {
                    return i;
                }
            }
        }
        return 0;
    };
    //当前积分
    AcNewappointVo.prototype.getScore = function () {
        if (this.score) {
            return this.score;
        }
        return 0;
    };
    //积分兑换
    AcNewappointVo.prototype.getExchangeNum = function (id) {
        if (this.claim && this.claim[id]) {
            return this.claim[id];
        }
        return 0;
    };
    //兑换红点
    AcNewappointVo.prototype.checkExchangeRed = function () {
        var data = this.cfg.getShopListCfg();
        var currScore = this.getScore();
        for (var i = 0; i < data.length; i++) {
            if (data[i].limitTime - this.getExchangeNum(data[i].id) > 0 && currScore >= data[i].costScore) {
                return true;
            }
        }
        return false;
    };
    Object.defineProperty(AcNewappointVo.prototype, "isShowRedDot", {
        //红点
        get: function () {
            return this.checkGiftRed() || this.checkExchangeRed();
        },
        enumerable: true,
        configurable: true
    });
    //倒计时
    AcNewappointVo.prototype.getCountDown = function () {
        var et = this.et;
        if (this.cfg.extraTime) {
            et = this.et - this.cfg.extraTime * 86400;
        }
        if (et < GameData.serverTime) {
            return LanguageManager.getlocal("acPunishEnd");
        }
        return App.DateUtil.getFormatBySecond((et - GameData.serverTime), 17);
    };
    AcNewappointVo.prototype.isInActivity = function () {
        var et = this.et;
        if (this.cfg.extraTime) {
            et = this.et - this.cfg.extraTime * 86400;
        }
        return GameData.serverTime >= this.st && GameData.serverTime < et;
    };
    Object.defineProperty(AcNewappointVo.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    return AcNewappointVo;
}(AcBaseVo));
//# sourceMappingURL=AcNewappointVo.js.map