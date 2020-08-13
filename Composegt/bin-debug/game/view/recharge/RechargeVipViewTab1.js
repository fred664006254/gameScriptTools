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
    function RechargeVipViewTab1() {
        var _this = _super.call(this) || this;
        _this._rechargetitlle = null;
        _this._rechargelistCfg = null;
        _this._rechargeRebateButton = null;
        _this.initView();
        return _this;
    }
    RechargeVipViewTab1.prototype.getListType = function () {
        return 1;
    };
    RechargeVipViewTab1.prototype.initView = function () {
        // if(PlatformManager.checkIsJPSp())
        // {
        // 	var device = App.DeviceUtil.isIOS()?1:2;
        // 	NetManager.request(NetRequestConst.REQUEST_STATS_CLICKEVENT, {pos:device, kid:NetRequestConst.KID_GAMEPAYCLICK});
        // }
        PlatformManager.analytics37Point("custom_recharge_check", "check_recharge", 1);
        App.MessageHelper.addNetMessage(NetPushConst.PUSH_PAY, this.receivePushData, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_RECHARGEREBATE_REFRESH_V, this.refreshRechargeRebateStatus, this);
        var upBg;
        var rechargeRebateVo = Api.acVoApi.getActivityVoByAidAndCode("rechargeRebate");
        if (rechargeRebateVo && rechargeRebateVo.isInActivity()) {
            if (rechargeRebateVo.code == 1) {
                upBg = BaseBitmap.create("rechargeRebatetitlebg");
            }
            else {
                upBg = BaseBitmap.create("rechargeRebatetitlebg2");
            }
        }
        else {
            upBg = BaseLoadBitmap.create("rechargetitlebg"); //rechargetitlenewbg
            upBg.width = 640;
            upBg.height = 172;
        }
        this.addChild(upBg);
        if (PlatformManager.checkIsViSp() && !App.DeviceUtil.isIOS()) {
            var sub = PlatformManager.getAppid();
            if (sub == "1003004003" || sub != "1003004003" && Api.switchVoApi.openViWebPay() && Api.playerVoApi.getPlayerLevel() > 3) {
                var jumpBtn = ComponentManager.getButton("rechargevie_btn", "", this.jumpHander, this);
                // jumpBtn.setText("Thẻ Nạp",false);
                jumpBtn.setPosition(550, 100);
                this.addChild(jumpBtn);
            }
        }
        if (App.DeviceUtil.isIOS() && Api.switchVoApi.openViIOSWebPay() && Api.playerVoApi.getPlayerLevel() > 2) {
            var jumpBtn = ComponentManager.getButton("rechargevie_btn", "", this.jumpHander, this);
            // jumpBtn.setText("Thẻ Nạp",false);
            jumpBtn.setPosition(550, 100);
            this.addChild(jumpBtn);
        }
        upBg.y = 80;
        var isHasFirstRecharge = Api.rechargeVoApi.checkFirstRecharge();
        var isNewRecharge = Api.switchVoApi.checknewRecharge();
        if (isNewRecharge && isHasFirstRecharge == false && Api.shopVoApi.getfourRateCharge() == true) {
            var rechargetitlle = null; // BaseBitmap.create("rechargetitlle"); 
            if (Api.switchVoApi.checkOpenFirstCharge6Times()) {
                rechargetitlle = BaseBitmap.create("rechargetitlle_6");
            }
            else {
                rechargetitlle = BaseBitmap.create("rechargetitlle");
            }
            rechargetitlle.x = 640 - rechargetitlle.width;
            rechargetitlle.y = upBg.height - rechargetitlle.height * 2 + 110;
            this.addChild(rechargetitlle);
            this._rechargetitlle = rechargetitlle;
        }
        else if (isNewRecharge && isHasFirstRecharge) {
            // let rechargetitlle = BaseBitmap.create("rechargetitlle"); 
            var rechargetitlle = null;
            if (Api.switchVoApi.checkOpenFirstCharge6Times()) {
                rechargetitlle = BaseBitmap.create("rechargetitlle_6");
            }
            else {
                rechargetitlle = BaseBitmap.create("rechargetitlle");
            }
            rechargetitlle.x = 640 - rechargetitlle.width;
            rechargetitlle.y = upBg.height - rechargetitlle.height * 2 + 110;
            this.addChild(rechargetitlle);
            this._rechargetitlle = rechargetitlle;
        }
        // let bottomBg = BaseBitmap.create("public_9v_bg03");
        // bottomBg.width = GameConfig.stageWidth;
        // bottomBg.height = GameConfig.stageHeigth - 400;
        // bottomBg.x = 0;
        // bottomBg.y = 250;
        // this.addChild(bottomBg);
        var wood = BaseBitmap.create("commonview_woodbg");
        wood.height = GameConfig.stageHeigth - 400;
        wood.x = 0;
        wood.y = 250;
        this.addChild(wood);
        var leftRightBorder = BaseBitmap.create("commonview_border1");
        leftRightBorder.width = GameConfig.stageWidth;
        leftRightBorder.height = GameConfig.stageHeigth - 400;
        leftRightBorder.x = 0;
        leftRightBorder.y = 250;
        this.addChild(leftRightBorder);
        var upBorder = BaseBitmap.create("commonview_border2");
        upBorder.width = GameConfig.stageWidth;
        upBorder.scaleY = -1;
        upBorder.y = leftRightBorder.y + upBorder.height - 10;
        this.addChild(upBorder);
        var bottomBorder = BaseBitmap.create("commonview_bottom");
        bottomBorder.y = leftRightBorder.y + leftRightBorder.height - bottomBorder.height;
        this.addChild(bottomBorder);
        var rechargelistCfg = Config.RechargeCfg.getNormalRechargeCfg();
        var l = rechargelistCfg.length;
        var lineNum = 3;
        var startXY = 0;
        rechargelistCfg = this.sortArr(rechargelistCfg);
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, 600, GameConfig.stageHeigth - 430 - 10);
        if (PlatformManager.checkIsJPSp()) {
            rect.setTo(0, 0, 600, GameConfig.stageHeigth - 480 - 10);
        }
        this._scrollList = ComponentManager.getScrollList(RechargeVipViewScrollltem, rechargelistCfg, rect);
        this.addChild(this._scrollList);
        this._rechargelistCfg = rechargelistCfg;
        this._scrollList.setPosition(GameConfig.stageWidth / 2 - this._scrollList.width / 2, 260);
        // 查看返利按钮
        if (rechargeRebateVo && rechargeRebateVo.isInActivity()) {
            var collectBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "rechargeRebate_look", this.rechargeRebateLookClick, this);
            collectBtn.setScale(125 / collectBtn.width);
            collectBtn.x = upBg.x + 570 - collectBtn.width / 2 * collectBtn.scaleX;
            collectBtn.y = upBg.y + 115 - collectBtn.height / 2 * collectBtn.scaleY;
            this.addChild(collectBtn);
            this._rechargeRebateButton = collectBtn;
            this.refreshRechargeRebateStatus();
        }
        //【日本特有】特商法/资金决算法按钮
        if (PlatformManager.checkIsJPSp()) {
            var bottomBg = BaseBitmap.create("rechargevipjpspbottom");
            bottomBg.width = GameConfig.stageWidth;
            bottomBg.height = 80;
            bottomBg.x = 0;
            bottomBg.y = GameConfig.stageHeigth - bottomBg.height - 160;
            this.addChild(bottomBg);
            var jpRechargeSpBtn1 = ComponentManager.getButton("rechargevipjpspbtn1", "", function () {
                ViewController.getInstance().openView(ViewConst.POPUP.COMMONTEXTPOPUPVIEW, {
                    title: "itemUseConstPopupViewTitle",
                    msg: LanguageManager.getlocal("rechargeVipJpSpContent1"),
                });
            }, this);
            jpRechargeSpBtn1.x = bottomBg.x + 40;
            jpRechargeSpBtn1.y = bottomBg.y + bottomBg.height / 2 - jpRechargeSpBtn1.height / 2 + 3;
            this.addChild(jpRechargeSpBtn1);
            var btn1Text = ComponentManager.getTextField(LanguageManager.getlocal("rechargeVipJpSpBtn1"), 24, TextFieldConst.COLOR_BROWN);
            btn1Text.width = jpRechargeSpBtn1.width - 50;
            btn1Text.textAlign = egret.HorizontalAlign.CENTER;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, btn1Text, jpRechargeSpBtn1);
            this.addChild(btn1Text);
            var jpRechargeSpBtn2 = ComponentManager.getButton("rechargevipjpspbtn2", "", function () {
                ViewController.getInstance().openView(ViewConst.POPUP.COMMONTEXTPOPUPVIEW, {
                    title: "itemUseConstPopupViewTitle",
                    msg: LanguageManager.getlocal("rechargeVipJpSpContent2"),
                });
            }, this);
            jpRechargeSpBtn2.x = bottomBg.x + bottomBg.width - jpRechargeSpBtn2.width - 40;
            jpRechargeSpBtn2.y = bottomBg.y + bottomBg.height / 2 - jpRechargeSpBtn2.height / 2 + 3;
            this.addChild(jpRechargeSpBtn2);
            var btn2Text = ComponentManager.getTextField(LanguageManager.getlocal("rechargeVipJpSpBtn2"), 24, TextFieldConst.COLOR_BROWN);
            btn2Text.width = jpRechargeSpBtn2.width - 50;
            btn2Text.textAlign = egret.HorizontalAlign.CENTER;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, btn2Text, jpRechargeSpBtn2);
            this.addChild(btn2Text);
        }
    };
    // 查看返利按钮
    RechargeVipViewTab1.prototype.rechargeRebateLookClick = function () {
        console.log("rechargeRebateLookClick");
        ViewController.getInstance().openView(ViewConst.COMMON.ACRECHARGEVIEW, { tab: "acCharge_tab4" });
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_RECHARGE_CLOSE);
    };
    // 刷新查看返利按钮状态
    RechargeVipViewTab1.prototype.refreshRechargeRebateStatus = function () {
        var rechargeRebateVo = Api.acVoApi.getActivityVoByAidAndCode("rechargeRebate");
        if (rechargeRebateVo && rechargeRebateVo.isInActivity() && this._rechargeRebateButton) {
            if (rechargeRebateVo.isShowRedDot) {
                this._rechargeRebateButton.setText("rechargeRebate_get");
                App.CommonUtil.addIconToBDOC(this._rechargeRebateButton);
            }
            else {
                this._rechargeRebateButton.setText("rechargeRebate_look");
                App.CommonUtil.removeIconFromBDOC(this._rechargeRebateButton);
            }
        }
    };
    RechargeVipViewTab1.prototype.jumpHander = function () {
        // if(App.DeviceUtil.IsHtml5())
        // {
        // 	window.open("http://pay.htctvn.com/");
        // }
        if (App.DeviceUtil.isIOS()) {
            // NetManager.request(NetRequestConst.REQUEST_STATS_CLICKEVENT, {pos:4, kid:NetRequestConst.KID_VITHIRDPAY});
            window.open("http://pay.htctvn.com/");
        }
        else {
            // NetManager.request(NetRequestConst.REQUEST_STATS_CLICKEVENT, {pos:2, kid:NetRequestConst.KID_VITHIRDPAY});
            PlatformManager.openViWebpay();
        }
    };
    //如果没有首充过
    RechargeVipViewTab1.prototype.sortArr = function (arr) {
        if (arr === void 0) { arr = null; }
        if (Api.switchVoApi.checkOpenSecondCharge()) {
            var isHasFirstRecharge = Api.rechargeVoApi.checkFirstRecharge();
            var isNewRecharge = Api.switchVoApi.checknewRecharge();
            var rechargelistCfg = arr;
            var arr1 = []; //4倍
            var arr2 = []; //2倍
            var arr3 = []; //普通
            if (isHasFirstRecharge) {
                for (var i = 0; i < rechargelistCfg.length; i++) {
                    var boo = Config.FirstchargeCfg.getneedRecharge(rechargelistCfg[i].id);
                    if (isNewRecharge && Api.shopVoApi.getfourRateCharge() == true && boo) {
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
            }
            else {
                var isHasSecondRecharge = Api.rechargeVoApi.checkSecondRecharge();
                for (var i = 0; i < rechargelistCfg.length; i++) {
                    var boo = Config.SecondchargeCfg.getneedRecharge(rechargelistCfg[i].id);
                    if (isNewRecharge && isHasSecondRecharge == false && boo) {
                        arr1.push(rechargelistCfg[i]);
                    }
                    else {
                        arr2.push(rechargelistCfg[i]);
                    }
                }
                rechargelistCfg = [];
                rechargelistCfg = arr1.concat(arr2);
                return rechargelistCfg;
            }
        }
        else {
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
        }
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
                        // var num = Number(data.data.data.payment.num+RechargeVipViewScrollltem.MULTIPLE)
                        // App.CommonUtil.showTip(num+LanguageManager.getlocal("itemName_1")+scaleStr);
                        scaleStr = "x" + RechargeVipViewScrollltem.MULTIPLE;
                        App.CommonUtil.showTip(data.data.data.payment.num + LanguageManager.getlocal("itemName_1") + scaleStr);
                    }
                    else {
                        if (Api.switchVoApi.checkOpenAuditFile() && itemid == "g11") {
                            App.CommonUtil.showTip(data.data.data.payment.num + LanguageManager.getlocal("itemName_1") + scaleStr);
                            RechargeVipViewScrollltem.ISBUY = true;
                            this._scrollList.refreshData(this._rechargelistCfg, true);
                            return;
                        }
                        scaleStr = "x" + RechargeVipViewScrollltem.MULTIPLE;
                        App.CommonUtil.showTip(data.data.data.payment.num + LanguageManager.getlocal("itemName_1") + scaleStr);
                    }
                }
                else {
                    App.CommonUtil.showTip(data.data.data.payment.num + LanguageManager.getlocal("itemName_1") + scaleStr);
                }
                // PlatformManager.analyticsPay(itemid,data.data.data.payment.orderId);
            }
        }
        if (Api.switchVoApi.checkOpenSecondCharge()) {
            var rechargelistCfg = Config.RechargeCfg.getNormalRechargeCfg();
            var l = rechargelistCfg.length;
            var lineNum = 3;
            var startXY = 0;
            rechargelistCfg = this.sortArr(rechargelistCfg);
            if (this._scrollList) {
                this._scrollList.refreshData(rechargelistCfg);
            }
        }
    };
    RechargeVipViewTab1.prototype.dispose = function () {
        this._scrollList = null;
        this._rechargetitlle = null;
        this._rechargelistCfg = null;
        this._rechargeRebateButton = null;
        App.MessageHelper.removeNetMessage(NetPushConst.PUSH_PAY, this.receivePushData, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_RECHARGEREBATE_REFRESH_V, this.refreshRechargeRebateStatus, this);
    };
    return RechargeVipViewTab1;
}(CommonViewTab));
__reflect(RechargeVipViewTab1.prototype, "RechargeVipViewTab1");
