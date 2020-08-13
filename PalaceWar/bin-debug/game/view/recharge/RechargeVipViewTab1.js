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
var RechargeVipViewTab1 = (function (_super) {
    __extends(RechargeVipViewTab1, _super);
    function RechargeVipViewTab1(param) {
        var _this = _super.call(this) || this;
        _this._rechargetitlle = null;
        _this.param = param;
        _this.initView();
        return _this;
    }
    RechargeVipViewTab1.prototype.getListType = function () {
        return 1;
    };
    RechargeVipViewTab1.prototype.initView = function () {
        if (PlatformManager.checkIsRuSp() && PlatformManager.checkisLocalPrice()) {
            Config.RechargeCfg.formatLocalPriceCfg();
        }
        App.MessageHelper.addNetMessage(NetPushConst.PUSH_PAY, this.receivePushData, this);
        var upBg = BaseBitmap.create("rechargetitlenewbg");
        this.addChild(upBg);
        upBg.y = -30;
        var isHasFirstRecharge = Api.rechargeVoApi.checkFirstRecharge();
        var isNewRecharge = Api.switchVoApi.checknewRecharge();
        if (isNewRecharge && isHasFirstRecharge == false && Api.shopVoApi.getfourRateCharge() == true) {
            var rechargetitlle = BaseBitmap.create("rechargetitlle");
            rechargetitlle.x = 640 - rechargetitlle.width;
            rechargetitlle.y = upBg.height - rechargetitlle.height * 2;
            this.addChild(rechargetitlle);
            this._rechargetitlle = rechargetitlle;
        }
        else if (isNewRecharge && isHasFirstRecharge) {
            var rechargetitlle = BaseBitmap.create("rechargetitlle");
            rechargetitlle.x = 640 - rechargetitlle.width;
            rechargetitlle.y = upBg.height - rechargetitlle.height * 2;
            this.addChild(rechargetitlle);
            this._rechargetitlle = rechargetitlle;
        }
        var rechargelistCfg = Api.chatVoApi.arr_clone(Config.RechargeCfg.getNormalRechargeCfg());
        var l = rechargelistCfg.length;
        var lineNum = 3;
        var startXY = 0;
        rechargelistCfg = this.sortArr(rechargelistCfg);
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, 640, GameConfig.stageHeigth - 380);
        this._scrollList = ComponentManager.getScrollList(RechargeVipViewScrollltem, rechargelistCfg, rect);
        this.addChild(this._scrollList);
        this._scrollList.setPosition(10, 150);
        var rechargeId = "";
        if (this.param && this.param.data && this.param.data.rechargeId) {
            rechargeId = this.param.data.rechargeId;
        }
        if (rechargeId != '') {
            for (var i = 0; i < rechargelistCfg.length; i++) {
                if (rechargelistCfg[i].id == rechargeId) {
                    this._scrollList.setScrollTopByIndex(i, 1000);
                    break;
                }
            }
        }
    };
    //如果没有首充过
    RechargeVipViewTab1.prototype.sortArr = function (arr) {
        if (arr === void 0) { arr = null; }
        var isHasFirstRecharge = Api.rechargeVoApi.checkFirstRecharge();
        var isNewRecharge = Api.switchVoApi.checknewRecharge();
        var rechargelistCfg = arr;
        var arr1 = []; //4倍
        var arr2 = []; //2倍
        var arr3 = []; //普通
        for (var i = 0; i < rechargelistCfg.length; i++) {
            var boo = Config.FirstchargeCfg.getneedRecharge(rechargelistCfg[i].id);
            if (this.param && this.param.data && this.param.data.rechargeId) {
                rechargelistCfg[i].showEffId = this.param.data.rechargeId;
            }
            if (isNewRecharge && isHasFirstRecharge == false && Api.shopVoApi.getfourRateCharge() == true && boo) {
                arr1.push(rechargelistCfg[i]);
            }
            else if (isNewRecharge && isHasFirstRecharge && boo) {
                arr1.push(rechargelistCfg[i]);
            }
            else {
                arr2.push(rechargelistCfg[i]);
            }
        }
        rechargelistCfg = [];
        rechargelistCfg = arr1.concat(arr2);
        return rechargelistCfg;
    };
    RechargeVipViewTab1.prototype.receivePushData = function (event) {
        var data = event.data;
        if (data.data.cmd == NetPushConst.PUSH_PAY) {
            if (data.data.data.payment) {
                var isHasFirstRecharge = Api.rechargeVoApi.checkFirstRecharge();
                if (!isHasFirstRecharge && this._rechargetitlle) {
                    this._rechargetitlle.visible = false;
                }
                var itemid = data.data.data.payment.itemId;
                var scaleStr = "";
                if (RechargeVipViewScrollltem.MULTIPLE != 0) {
                    if (RechargeVipViewScrollltem.MULTIPLE > 4) {
                        var num = Number(data.data.data.payment.num + RechargeVipViewScrollltem.MULTIPLE);
                        App.CommonUtil.showTip(num + LanguageManager.getlocal("itemName_1") + scaleStr);
                    }
                    else {
                        scaleStr = "x" + RechargeVipViewScrollltem.MULTIPLE;
                        App.CommonUtil.showTip(data.data.data.payment.num + LanguageManager.getlocal("itemName_1") + scaleStr);
                    }
                }
                else {
                    App.CommonUtil.showTip(data.data.data.payment.num + LanguageManager.getlocal("itemName_1") + scaleStr);
                }
                PlatformManager.analyticsPay(itemid, data.data.data.payment.orderId);
            }
        }
    };
    RechargeVipViewTab1.prototype.dispose = function () {
        this._scrollList = null;
        this._rechargetitlle = null;
        App.MessageHelper.removeNetMessage(NetPushConst.PUSH_PAY, this.receivePushData, this);
    };
    return RechargeVipViewTab1;
}(CommonViewTab));
__reflect(RechargeVipViewTab1.prototype, "RechargeVipViewTab1");
//# sourceMappingURL=RechargeVipViewTab1.js.map