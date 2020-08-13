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
 * 充值活动
 * author yanyuling
 * date 2017/11/08
 * @class AcRechargeItem
 */
var AcRechargeItem = (function (_super) {
    __extends(AcRechargeItem, _super);
    function AcRechargeItem() {
        var _this = _super.call(this) || this;
        _this._seprateNum = 0;
        _this._isSpecial = false;
        _this._objList = null;
        _this._maxNumb = 0;
        return _this;
    }
    AcRechargeItem.prototype.init = function (aid, code, rect) {
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_DAILYCHARGE_REFRESH_V, this.refreshAfterRecharge, this);
        this._aid = aid;
        this._code = String(code);
        var cfgObj = Config.AcCfg.getCfgByActivityIdAndCode(this._aid, this._code);
        this._objList = cfgObj.getList();
        for (var key in this._objList) {
            var tmpCfg = this._objList[key];
            if (Api.switchVoApi.checkSpecialState(tmpCfg.isSpecial)) {
                this._maxNumb = tmpCfg.isSpecial;
            }
        }
        this.refreshList(rect);
    };
    AcRechargeItem.prototype.refreshAfterRecharge = function () {
        /**有特殊档 */
        if (this._isSpecial) {
            var tmpVo = Api.acVoApi.getActivityVoByAidAndCode(this._aid);
            if (tmpVo.v >= this._seprateNum && Api.switchVoApi.checkSpecialChargeReward()) {
                // this.refreshList();
                egret.callLater(this.refreshList, this);
                // egret.Tween.get(this).wait(800).call(this.refreshList,this);
            }
        }
    };
    AcRechargeItem.prototype.refreshList = function (rect) {
        var tmpVo = Api.acVoApi.getActivityVoByAidAndCode(this._aid);
        var cfgObj = Config.AcCfg.getCfgByActivityIdAndCode(this._aid, this._code);
        var objList = cfgObj.getList();
        var terList = {};
        // for (var key in objList) {
        // 	let tmpCfg = objList[key];
        // 	if(tmpCfg.isSpecial && tmpCfg.isSpecial == 1 )
        // 	{
        // 		if(Api.switchVoApi.checkSpecialChargeReward() && tmpVo.v >= this._seprateNum )
        // 		{
        // 			this._isSpecial = true;
        // 			terList[key] = tmpCfg;
        // 		}
        // 	}else
        // 	{
        // 		this._seprateNum = tmpCfg.needGem;
        // 		terList[key] = tmpCfg;
        // 	}
        // }
        this._isSpecial = false;
        for (var key in objList) {
            var tmpCfg = objList[key];
            var maxNumb = 0;
            if (Api.switchVoApi.checkSpecialState(tmpCfg.isSpecial)) {
                maxNumb = tmpCfg.isSpecial;
                this._isSpecial = true;
            }
            if (tmpCfg.isSpecial && tmpCfg.isSpecial >= 1) {
                if (tmpCfg.isSpecial == 1) {
                    if ((Api.switchVoApi.checkSpecialChargeReward() && tmpVo.v >= this._seprateNum) || (tmpCfg.isSpecial <= this._maxNumb && tmpVo.v >= this._seprateNum)) {
                        this._isSpecial = true;
                        terList[key] = tmpCfg;
                    }
                }
                else {
                    var needGem = this.getLjNum(tmpCfg.isSpecial);
                    var needGem2 = this.getLjNum(tmpCfg.isSpecial - 1);
                    if (tmpVo.v >= needGem && Api.switchVoApi.checkSpecialState(tmpCfg.isSpecial) || tmpVo.v >= needGem2 && tmpCfg.isSpecial <= this._maxNumb) {
                        this._isSpecial = true;
                        terList[key] = tmpCfg;
                    }
                }
            }
            else {
                this._seprateNum = tmpCfg.needGem;
                terList[key] = tmpCfg;
            }
        }
        var keys = Object.keys(terList);
        keys.sort(function (a, b) {
            return Number(a) - Number(b);
        });
        this._seprateNum = terList[keys[keys.length - 1]].needGem; //引入特殊档位之后，
        var scrolItem = undefined;
        if (this._aid == "dailyCharge") {
            scrolItem = AcDailyChargeScrollItem;
        }
        else if (this._aid == "totalRecharge") {
            scrolItem = AcTotalRechargeScrollItem;
        }
        else if (this._aid == "totalDayRecharge") {
            scrolItem = AcTotalDayRechargeScrollItem;
            var num = tmpVo.getShowNum(1);
            if (keys.length > 0) {
                keys.splice(num, keys.length - num);
            }
        }
        else if (this._aid == "rechargeRebate") {
            scrolItem = AcRechargeRebateScrollItem;
        }
        if (rect) {
            var scrollList = ComponentManager.getScrollList(scrolItem, keys, rect);
            this.addChild(scrollList);
            this._scrollList = scrollList;
        }
        else {
            this._scrollList.refreshData(keys);
        }
        this._scrollList.width = 640;
        this._scrollList.x = -3;
    };
    AcRechargeItem.prototype.getLjNum = function (isSpecial) {
        var objList = this._objList;
        for (var key in objList) {
            var tmpCfg = objList[key];
            if (isSpecial == tmpCfg.isSpecial) {
                var needGem = tmpCfg.needGem;
            }
        }
        return needGem;
    };
    AcRechargeItem.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_DAILYCHARGE_REFRESH_V, this.refreshAfterRecharge, this);
        this._aid = null;
        this._code = null;
        this._scrollList = null;
        this._seprateNum = 0;
        this._isSpecial = null;
        this._objList = null;
        this._maxNumb = 0;
        _super.prototype.dispose.call(this);
    };
    return AcRechargeItem;
}(BaseDisplayObjectContainer));
__reflect(AcRechargeItem.prototype, "AcRechargeItem");
