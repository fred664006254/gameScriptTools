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
var AcTotalRechargeVo = (function (_super) {
    __extends(AcTotalRechargeVo, _super);
    function AcTotalRechargeVo() {
        var _this = _super.call(this) || this;
        _this.v = 0;
        _this.flags = {};
        _this._objList = null;
        return _this;
    }
    AcTotalRechargeVo.prototype.initData = function (data) {
        var oldV = this.v;
        for (var key in data) {
            this[key] = data[key];
        }
        if (oldV != null && oldV != this.v) {
            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_DAILYCHARGE_REFRESH_V);
        }
    };
    Object.defineProperty(AcTotalRechargeVo.prototype, "isShowRedDot", {
        get: function () {
            var totalVo = Api.acVoApi.getActivityVoByAidAndCode("totalRecharge");
            var cfgObj = Config.AcCfg.getCfgByActivityIdAndCode("totalRecharge", totalVo.code);
            if (!cfgObj) {
                return false;
            }
            // let list = cfgObj.getList();
            // for (var key in list) {
            // 	if (!this.flags[key] && list[key]["needGem"] <= this.v)
            // 	{
            // 		return true;
            // 	}
            // }
            var _seprateNum = 0;
            var list = cfgObj.getList();
            this._objList = list;
            for (var key in list) {
                var tmpCfg = list[key];
                if (tmpCfg.isSpecial && tmpCfg.isSpecial == 1) {
                    if (Api.switchVoApi.checkSpecialChargeReward() && !this.flags[key] && this.v >= list[key]["needGem"]) {
                        return true;
                    }
                }
                else if (tmpCfg.isSpecial) {
                    var needGem = this.getLjNum(tmpCfg.isSpecial);
                    var needGem2 = this.getLjNum(tmpCfg.isSpecial - 1);
                    var currNeedGem = list[key]["needGem"];
                    if (Api.switchVoApi.checkSpecialState(tmpCfg.isSpecial) && !this.flags[key] && this.v >= currNeedGem || this.v >= currNeedGem && tmpCfg.isSpecial <= this.maxSwitchNum && !this.flags[key]) {
                        return true;
                    }
                }
                else {
                    _seprateNum = tmpCfg.needGem;
                    if (!this.flags[key] && list[key]["needGem"] <= this.v) {
                        return true;
                    }
                }
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    AcTotalRechargeVo.prototype.getLjNum = function (isSpecial) {
        var objList = this._objList;
        for (var key in objList) {
            var tmpCfg = objList[key];
            if (isSpecial == tmpCfg.isSpecial) {
                var needGem = tmpCfg.needGem;
            }
        }
        return needGem;
    };
    Object.defineProperty(AcTotalRechargeVo.prototype, "maxSwitchNum", {
        get: function () {
            var _maxNumb = 0;
            for (var key in this._objList) {
                var tmpCfg = this._objList[key];
                if (Api.switchVoApi.checkSpecialState(tmpCfg.isSpecial)) {
                    _maxNumb = tmpCfg.isSpecial;
                }
            }
            return _maxNumb;
        },
        enumerable: true,
        configurable: true
    });
    AcTotalRechargeVo.prototype.dispose = function () {
        this.v = 0;
        this.flags = {};
        this._objList = null;
    };
    return AcTotalRechargeVo;
}(AcBaseVo));
__reflect(AcTotalRechargeVo.prototype, "AcTotalRechargeVo");
