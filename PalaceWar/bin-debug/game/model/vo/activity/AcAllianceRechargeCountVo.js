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
var AcAllianceRechargeCountVo = (function (_super) {
    __extends(AcAllianceRechargeCountVo, _super);
    function AcAllianceRechargeCountVo() {
        var _this = _super.call(this) || this;
        // model信息
        // renum  充值人数
        // rechargeFlag 自己是否充值
        // flags 领奖记录
        //次数奖励情况
        _this.flags = [];
        _this.rechargeFlag = 0;
        _this.renum = 0;
        return _this;
    }
    Object.defineProperty(AcAllianceRechargeCountVo.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    AcAllianceRechargeCountVo.prototype.initData = function (data) {
        for (var key in data) {
            this[key] = data[key];
        }
        if (data.flags) {
            this.flags = data.flags;
        }
        if (data.renum) {
            this.renum = data.renum;
        }
        if (data.rechargeFlag) {
            this.rechargeFlag = data.rechargeFlag;
        }
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_AID_AllIANCERECHARGECOUNT_FRESH);
    };
    AcAllianceRechargeCountVo.prototype.getRechargeFlag = function () {
        return this.rechargeFlag;
    };
    AcAllianceRechargeCountVo.prototype.getChargeNum = function () {
        return Number(this.renum);
    };
    Object.defineProperty(AcAllianceRechargeCountVo.prototype, "acTimeAndHour", {
        get: function () {
            var et = this.et - 86400 * 1;
            return App.DateUtil.getOpenLocalTime(this.st, et, true);
        },
        enumerable: true,
        configurable: true
    });
    AcAllianceRechargeCountVo.prototype.isActivityPeriod = function () {
        if (GameData.serverTime > this.et - 86400 * 1) {
            return false;
        }
        else {
            return true;
        }
    };
    AcAllianceRechargeCountVo.prototype.isActivityPeriod2 = function () {
        if (GameData.serverTime > this.et) {
            return false;
        }
        else {
            return true;
        }
    };
    /*累积充值领取判断*/
    AcAllianceRechargeCountVo.prototype.isGetRecharge = function (id) {
        if (this.flags) {
            for (var key in this.flags) {
                if (this.flags[id] == 1) {
                    return true;
                }
            }
            return false;
        }
        return false;
    };
    Object.defineProperty(AcAllianceRechargeCountVo.prototype, "isShowRedDot", {
        // public isCollected(boxId:number): boolean{
        // 	// if(this.numflags && this.numflags[boxId.toString()] && this.numflags[boxId.toString()] == 1){
        // 	// 	return true;
        // 	// } else {
        // 	// 	return false;
        // 	// }  
        // }
        // public showRed():boolean
        // {
        //  	let cfg = this.cfg;
        // 	if(!cfg)
        // 	{
        // 		return false;
        // 	}
        // 	let curTurn = this.getChargeNum();
        // 	for(let i in cfg.recharge){
        // 		let unit = cfg.recharge[i];
        // 		if(curTurn >= unit.needGem && this.isGetRecharge(Number(i) + 1) == false){
        // 			return true;
        // 		}
        // 	} 
        // 	return false; 
        // }
        // public getChargeNum():number{
        // 	return Number(this.chargeNum);
        // }
        // public get totalCount(): number{
        // 	return this.total;
        // }
        get: function () {
            var cfg = this.cfg;
            if (!cfg) {
                return false;
            }
            var curTurn = this.renum;
            for (var i in cfg.countReward) {
                var unit = cfg.countReward[i];
                if (curTurn >= unit.count && this.isGetRecharge(Number(i) + 1) == false && this.getRechargeFlag() == 1) {
                    return true;
                }
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    AcAllianceRechargeCountVo.prototype.dispose = function () {
        this.flags = null;
        this.rechargeFlag = null;
        this.renum = null;
    };
    return AcAllianceRechargeCountVo;
}(AcBaseVo));
__reflect(AcAllianceRechargeCountVo.prototype, "AcAllianceRechargeCountVo");
//# sourceMappingURL=AcAllianceRechargeCountVo.js.map