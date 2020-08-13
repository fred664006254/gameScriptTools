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
 * 处置宝箱2
 * author ycg
 * date 2019.9.30
 * @class AcRechargeBoxSPVo
 */
var AcRechargeBoxSPVo = (function (_super) {
    __extends(AcRechargeBoxSPVo, _super);
    function AcRechargeBoxSPVo() {
        var _this = _super.call(this) || this;
        _this.ainfo = null;
        return _this;
    }
    Object.defineProperty(AcRechargeBoxSPVo.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    AcRechargeBoxSPVo.prototype.initData = function (data) {
        for (var key in data) {
            this[key] = data[key];
        }
    };
    /**
     * 通过充值档位 获得充值的次数
     */
    AcRechargeBoxSPVo.prototype.getBoxReChargeNum = function (gears) {
        if (this.ainfo.v[gears]) {
            return this.ainfo.v[gears];
        }
        else {
            return 0;
        }
    };
    AcRechargeBoxSPVo.prototype.getAvgConfig = function (id, code) {
        return this.cfg.getDialogById(id, code);
    };
    /**
     * 通过id 得到领取次数
     */
    AcRechargeBoxSPVo.prototype.getReceiveNumById = function (id) {
        if (this.ainfo.stags[id]) {
            return this.ainfo.stags[id];
        }
        else {
            return 0;
        }
    };
    /**
     * 通过充值档位 领取的次数
     */
    AcRechargeBoxSPVo.prototype.getBoxReceiveNum = function (gears) {
        if (this.ainfo.flags[gears]) {
            return this.ainfo.flags[gears];
        }
        else {
            return 0;
        }
    };
    //倒计时
    AcRechargeBoxSPVo.prototype.getCountDown = function () {
        var et = this.et;
        if (et < GameData.serverTime) {
            return LanguageManager.getlocal("acPunishEnd");
        }
        return App.DateUtil.getFormatBySecond((et - GameData.serverTime), 1);
    };
    Object.defineProperty(AcRechargeBoxSPVo.prototype, "acTimeAndHour", {
        /**
         * 活动时间  不需要显示展示期
         */
        get: function () {
            var et = this.et;
            return App.DateUtil.getOpenLocalTime(this.st, et, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcRechargeBoxSPVo.prototype, "isShowRedDot", {
        get: function () {
            var deltaT = this.et - GameData.serverTime;
            if (deltaT < 0) {
                return false;
            }
            var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
            if (!cfg) {
                return false;
            }
            var boxList = cfg.getBoxListBaseData();
            for (var i = 0; i < boxList.length; i++) {
                var itemCfg = boxList[i];
                var rechargeNum = this.getBoxReChargeNum(itemCfg.needGem);
                var receiveNum = this.getBoxReceiveNum(itemCfg.needGem);
                if (receiveNum < Number(itemCfg.limit)) {
                    if (rechargeNum > receiveNum) {
                        return true;
                    }
                }
            }
            return false;
            // let cfg = <Config.AcCfg.RechargeBoxSPCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code)
            // if(!cfg)
            // {
            // 	return false;
            // }
            // for(let i = 0;i < cfg.getBoxListData().length; i++ )
            // {
            // 	let itemCfg = cfg.getBoxListData()[i];
            // 	let rechargeNum = this.getBoxReChargeNum(itemCfg.needGem);
            // 	let receiveNum = this.getBoxReceiveNum(itemCfg.needGem);
            // 	if(receiveNum < Number(itemCfg.limit))
            // 	{
            // 		if(rechargeNum > receiveNum)
            // 		{
            // 			return true;
            // 		}
            // 	}
            // }
            // return false;
        },
        enumerable: true,
        configurable: true
    });
    AcRechargeBoxSPVo.prototype.getShowSkinData = function () {
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        if (this.code == 1) {
            return cfg.getShowWifeData();
        }
        else if (this.code == 2) {
            return "20191";
        }
    };
    AcRechargeBoxSPVo.prototype.getShowSkinNeedRecharge = function () {
        var num = 0;
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        if (this.code == 2) {
            var skinId = "20191";
            var rechargeId = null;
            var skinCfg = Config.ServantskinCfg.getServantSkinItemById(skinId);
            if (skinCfg.item) {
                var boxData = cfg.getBoxListBaseData();
                for (var i = 0; i < boxData.length; i++) {
                    var rewardArr = (boxData[i].getReward).split("|");
                    for (var k = 0; k < rewardArr.length; k++) {
                        var itemId = rewardArr[k].split("_")[1];
                        if (itemId == skinCfg.item) {
                            rechargeId = boxData[i].needGem;
                            break;
                        }
                    }
                    if (rechargeId) {
                        break;
                    }
                }
            }
            if (rechargeId) {
                var rechargeCfg = Config.RechargeCfg.getRechargeItemCfgByKey(rechargeId);
                return rechargeCfg.gemCost;
            }
        }
        return num;
    };
    AcRechargeBoxSPVo.prototype.dispose = function () {
        this.ainfo = null;
        _super.prototype.dispose.call(this);
    };
    return AcRechargeBoxSPVo;
}(AcBaseVo));
__reflect(AcRechargeBoxSPVo.prototype, "AcRechargeBoxSPVo");
//# sourceMappingURL=AcRechargeBoxSPVo.js.map