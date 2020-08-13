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
 * 狂欢节活动
 * author jiangliuyang
 * date 2018/4/11
 * @class AcCarnivalItem
 */
var AcCarnivalItem = (function (_super) {
    __extends(AcCarnivalItem, _super);
    function AcCarnivalItem() {
        var _this = _super.call(this) || this;
        _this._seprateNum = 0;
        _this._isSpecial = false;
        return _this;
    }
    AcCarnivalItem.prototype.init = function (aid, code, rect) {
        //充值完成的时候检查是否有特殊信息需要显示
        //App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_PAY_RROCCESSPAYMENT),this.refreshAfterRecharge,this);
        //监听领取成功事件  如果物品领取完毕判断是否有特殊信息需要显示
        // if (aid == "carnivalCharge"){
        // 	App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_GETCARNIVALCHARGE),this.refreshAfterRecharge,this);
        // } else {
        // 	App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_GETCARNIVALCOST),this.refreshAfterRecharge,this);
        // }
        this._aid = aid;
        this._code = String(code);
        this.refreshList(rect);
    };
    Object.defineProperty(AcCarnivalItem.prototype, "typeCode", {
        get: function () {
            return this._typeCode;
        },
        set: function (_name) {
            this._typeCode = _name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcCarnivalItem.prototype, "topImgName", {
        //标头背景图片
        get: function () {
            return this._topImgName;
        },
        set: function (_name) {
            this._topImgName = _name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcCarnivalItem.prototype, "topBgImgName", {
        //标头文字图片
        get: function () {
            return this._topBgImgName;
        },
        set: function (_name) {
            this._topBgImgName = _name;
        },
        enumerable: true,
        configurable: true
    });
    AcCarnivalItem.prototype.refreshAfterRecharge = function () {
        /**有特殊档 */
        if (this._isSpecial) {
            var tmpVo = Api.acVoApi.getActivityVoByAidAndCode(this._aid);
            if (tmpVo.v >= this._seprateNum) {
                this.refreshList();
            }
        }
    };
    AcCarnivalItem.prototype.refreshList = function (rect) {
        var tmpVo = Api.acVoApi.getActivityVoByAidAndCode(this._aid);
        var cfgObj = Config.AcCfg.getCfgByActivityIdAndCode(this._aid, this._code);
        var objList = cfgObj.getList();
        var terList = {};
        for (var key in objList) {
            var tmpCfg = objList[key];
            if (tmpCfg.isSpecial && tmpCfg.isSpecial == 1) {
                //检查是否开启特殊档位的功能
                if (Api.switchVoApi.checkSpecialChargeReward()) {
                    this._isSpecial = true;
                }
                else {
                    this._isSpecial = false;
                }
                if (Api.switchVoApi.checkSpecialChargeReward() && tmpVo.v >= this._seprateNum) {
                    // this._isSpecial = true;
                    terList[key] = tmpCfg;
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
        var scrolItem = undefined;
        if (this._aid == "carnivalCharge") {
            scrolItem = AcCarnivalChargeScrollItem;
        }
        else if (this._aid == "carnivalCost") {
            scrolItem = AcCarnivalCostScrollItem;
            // let num = tmpVo.getShowNum(1);
            // if(keys.length>0)
            // {
            // 	keys.splice(num,keys.length-num);	
            // }
        }
        if (rect) {
            var scrollList = ComponentManager.getScrollList(scrolItem, keys, rect);
            this.addChild(scrollList);
            this._scrollList = scrollList;
        }
        else {
            this._scrollList.refreshData(keys);
        }
    };
    AcCarnivalItem.prototype.dispose = function () {
        // App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_PAY_RROCCESSPAYMENT),this.refreshAfterRecharge,this);
        // App.MessageHelper.removeNetMessage(NetPushConst.PUSH_PAY,this.refreshAfterRecharge,this);
        // if (this._aid == "carnivalCharge"){
        // 	App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_GETCARNIVALCHARGE),this.refreshAfterRecharge,this);
        // } else {
        // 	App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_GETCARNIVALCOST),this.refreshAfterRecharge,this);
        // }
        this._aid = null;
        this._code = null;
        this._scrollList = null;
        this._seprateNum = 0;
        this._isSpecial = null;
        _super.prototype.dispose.call(this);
    };
    return AcCarnivalItem;
}(BaseDisplayObjectContainer));
__reflect(AcCarnivalItem.prototype, "AcCarnivalItem");
//# sourceMappingURL=AcCarnivalItem.js.map