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
 * author 杜坤洋
 * date 2019/7/31
 * 37wd审核专用充值页面
 * @class RechargeShenHeVipView
 */
var RechargeShenHeVipView = (function (_super) {
    __extends(RechargeShenHeVipView, _super);
    function RechargeShenHeVipView() {
        var _this = _super.call(this) || this;
        _this._rechargetitlle = null;
        _this._rechargelistCfg = null;
        _this._rechargeRebateButton = null;
        return _this;
    }
    RechargeShenHeVipView.prototype.getTitleStr = function () {
        return "rechargeVipViewTitle";
    };
    RechargeShenHeVipView.prototype.getResourceList = function () {
        var ret = _super.prototype.getResourceList.call(this).concat([
            "recharge_fnt",
            "common_left_bg",
            "common_9_bg",
            "achievement_state3",
            "servant_topresbg",
            "rechargevipview"
        ]);
        var rechargeRebateVo = Api.acVoApi.getActivityVoByAidAndCode("rechargeRebate");
        if (rechargeRebateVo && rechargeRebateVo.isInActivity()) {
            ret = ret.concat(["rechargeRebatetitlebg"]);
        }
        return ret;
    };
    RechargeShenHeVipView.prototype.initView = function () {
        if (PlatformManager.checkIsUseSDK() && PlatformManager.checkIsWeiduan() == true && App.DeviceUtil.isAndroid() && (PlatformManager.checkIsTWBSp() == true || PlatformManager.checkIsTWShenheSp() == true)) {
            //漏单处理
            PlatformManager.client.checkPurchase(ServerCfg.selectServer.zid);
            console.log("QAZ checkPurchase");
        }
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetPushConst.PUSH_PAY), this.receivePushData, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_RECHARFGE_RE, this.rechargeHandler, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_RECHARGE_CLOSE, this.hide, this);
        var resBar = ComponentManager.getResBar(1, true, 175);
        resBar.setPosition(10, 32);
        this.addChild(resBar);
        var rechargelistCfg = Config.RechargeCfg.get37wdShenHeRechargeCfg();
        var l = rechargelistCfg.length;
        var lineNum = 3;
        var startXY = 0;
        rechargelistCfg = this.sortArr(rechargelistCfg);
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, 640, GameConfig.stageHeigth - 100);
        this._scrollList = ComponentManager.getScrollList(RechargeVipShenHeViewScrollltem, rechargelistCfg, rect);
        this.addChildToContainer(this._scrollList);
        this._rechargelistCfg = rechargelistCfg;
        this._scrollList.setPosition(7, 10);
        this.refresh();
    };
    //如果没有首充过
    RechargeShenHeVipView.prototype.sortArr = function (arr) {
        if (arr === void 0) { arr = null; }
        var isHasFirstRecharge = Api.rechargeVoApi.checkFirstRecharge();
        var isNewRecharge = Api.switchVoApi.checknewRecharge();
        var rechargelistCfg = arr;
        var arr1 = []; //4倍
        var arr2 = []; //2倍
        var arr3 = []; //普通
        for (var i = 0; i < rechargelistCfg.length; i++) {
            var boo = Config.FirstchargeCfg.getneedRecharge(rechargelistCfg[i].id);
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
    RechargeShenHeVipView.prototype.rechargeHandler = function () {
        var data = [];
        data.index = 0;
        this.clickTabbarHandler(data);
        this.tabbarGroup.selectedIndex = data.index;
    };
    RechargeShenHeVipView.prototype.refresh = function () {
        if (this._gemTxt) {
            this._gemTxt.text = Api.playerVoApi.getPlayerGem().toString();
        }
    };
    RechargeShenHeVipView.prototype.receivePushData = function (event) {
        var data = event.data;
        if (data.data.cmd == NetPushConst.PUSH_PAY) {
            if (event.data.data.data.rewards) {
                App.CommonUtil.playRewardFlyAction(GameData.formatRewardItem(event.data.data.data.rewards));
            }
            this.refresh();
            if (data.data.data.payment) {
                var isHasFirstRecharge = Api.rechargeVoApi.checkFirstRecharge();
                if (!isHasFirstRecharge && this._rechargetitlle) {
                    this._rechargetitlle.visible = false;
                }
                var itemid = data.data.data.payment.itemId;
                var scaleStr = "";
                if (RechargeVipShenHeViewScrollltem.MULTIPLE != 0) {
                    if (RechargeVipShenHeViewScrollltem.MULTIPLE > 4) {
                        var num = Number(data.data.data.payment.num + RechargeVipShenHeViewScrollltem.MULTIPLE);
                        App.CommonUtil.showTip(num + LanguageManager.getlocal("itemName_1") + scaleStr);
                    }
                    else {
                        if (Api.switchVoApi.checkOpenAuditFile() && itemid == "g11") {
                            App.CommonUtil.showTip(data.data.data.payment.num + LanguageManager.getlocal("itemName_1") + scaleStr);
                            RechargeVipShenHeViewScrollltem.ISBUY = true;
                            this._scrollList.refreshData(this._rechargelistCfg, true);
                            return;
                        }
                        scaleStr = "x" + RechargeVipShenHeViewScrollltem.MULTIPLE;
                        App.CommonUtil.showTip(data.data.data.payment.num + LanguageManager.getlocal("itemName_1") + scaleStr);
                    }
                }
                else {
                    App.CommonUtil.showTip(data.data.data.payment.num + LanguageManager.getlocal("itemName_1") + scaleStr);
                }
                // PlatformManager.analyticsPay(itemid,data.data.data.payment.orderId);
            }
        }
    };
    RechargeShenHeVipView.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetPushConst.PUSH_PAY), this.receivePushData, this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_RECHARFGE_RE, this.rechargeHandler, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_RECHARGE_CLOSE, this.hide, this);
        this._gemTxt = null;
        _super.prototype.dispose.call(this);
    };
    return RechargeShenHeVipView;
}(CommonView));
__reflect(RechargeShenHeVipView.prototype, "RechargeShenHeVipView");
