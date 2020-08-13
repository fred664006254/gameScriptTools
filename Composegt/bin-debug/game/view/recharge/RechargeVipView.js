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
var RechargeVipView = (function (_super) {
    __extends(RechargeVipView, _super);
    function RechargeVipView() {
        var _this = _super.call(this) || this;
        _this._greenarrow = null;
        _this._currMaxVip = 0;
        _this.public_dot2 = null;
        _this.greenarrowX = 125;
        _this.greenarrowY = 192;
        return _this;
    }
    RechargeVipView.prototype.getTabbarGroupY = function () {
        return 0;
    };
    RechargeVipView.prototype.getResourceList = function () {
        var ret = _super.prototype.getResourceList.call(this).concat([
            "recharge_fnt",
            "common_left_bg",
            "common_9_bg",
            "achievement_state3",
            "servant_topresbg",
            // "progress_type1_yellow","progress_type1_bg", 
            "servantjibanicon",
            "servantjibantxt",
            "rechargevie_effects",
            "recharge2_fnt",
            "recharge_diban_01",
            "rechargevie_db_01",
            "commonview_titlebg2",
            // progress_type1_yellow2.png
            // progress_type3_bg.png
            "progress_type1_yellow2",
            "progress_type3_bg",
            "rechargevie_titlebg",
            "commonview_border3",
            "commonview_border2",
            "commonview_border1",
            "commonview_bottom",
            "rechargevie_itembg",
            "rechargevie_border",
            "commonview_woodbg"
        ]);
        if (PlatformManager.checkIsJPSp()) {
            ret = ret.concat([
                "rechargevipjpspbtn1",
                "rechargevipjpspbtn2",
                "rechargevipjpspbottom",
            ]);
        }
        var rechargeRebateVo = Api.acVoApi.getActivityVoByAidAndCode("rechargeRebate");
        if (rechargeRebateVo && rechargeRebateVo.isInActivity()) {
            if (rechargeRebateVo.code == 1) {
                ret = ret.concat(["rechargeRebatetitlebg"]);
            }
            else {
                ret = ret.concat(["rechargeRebatetitlebg2"]);
            }
        }
        return ret;
    };
    RechargeVipView.prototype.getTitleBgName = function () {
        return "commonview_titlebg2"; //"commonview_db_04"
    };
    RechargeVipView.prototype.hideAndShowVip = function () {
        this.hide();
        ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEWTAB2);
    };
    RechargeVipView.prototype.initView = function () {
        if (PlatformManager.checkIsUseSDK() && PlatformManager.checkIsWeiduan() == true && App.DeviceUtil.isAndroid() && (PlatformManager.checkIsTWBSp() == true || PlatformManager.checkIsTWShenheSp() == true)) {
            //漏单处理
            PlatformManager.client.checkPurchase(ServerCfg.selectServer.zid);
            console.log("QAZ checkPurchase");
        }
        var public_dot2 = BaseBitmap.create("public_dot2");
        this.addChild(public_dot2);
        public_dot2.x = 295;
        public_dot2.y = this.tabbarGroup.y + 5;
        this.public_dot2 = public_dot2;
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetPushConst.PUSH_PAY), this.receivePushData, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_VIP_VIPWELFARE), this.useVipCallback, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_RECHARFGE_RE, this.rechargeHandler, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_REFRESH_RECHARGE_VIEW, this.hideAndShowVip, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_RECHARGE_CLOSE, this.hide, this);
        var resBar = ComponentManager.getResBar(1, true, 175);
        resBar.setPosition(10, 22);
        this.addChild(resBar);
        if (PlatformManager.hasSpcialCloseBtn()) {
            resBar.setPosition(470, 22);
        }
        var dibian = BaseBitmap.create("rechargevie_titlebg");
        // dibian.width =640;
        // dibian.height = 78;  
        dibian.y = 152;
        this.addChild(dibian);
        var line = BaseBitmap.create("commonview_border3");
        line.width = GameConfig.stageWidth;
        line.x = 0;
        line.y = dibian.y + dibian.height - 4;
        // line.scaleY = -1;
        this.addChild(line);
        //再充值多少解锁特权
        var upTxt = ComponentManager.getTextField("1", TextFieldConst.FONTSIZE_CONTENT_SMALL);
        // upTxt.setPosition(PlatformManager.hasSpcialCloseBtn()?(goldBg.x + goldBg.width + 10):((GameConfig.stageWidth-upTxt.width)*0.5),160);
        this.addChild(upTxt);
        this._upTxt = upTxt;
        var progressBar = ComponentManager.getProgressBar("progress_type1_yellow2", "progress_type3_bg", 370);
        progressBar.setPosition(240, 195 + 2);
        this.addChild(progressBar);
        this._progressBar = progressBar;
        var leftVip = null;
        if (Api.vipVoApi.getCurLevelVipCfg().level != 0) {
            var currLeftVip = Api.vipVoApi.getCurLevelVipCfg().icon;
            leftVip = BaseLoadBitmap.create(currLeftVip);
            leftVip.setPosition(40, 189);
            this.addChild(leftVip);
            leftVip.bindData = currLeftVip;
            this._leftVip = leftVip;
            this._greenarrow = BaseBitmap.create("public_arrow2");
            this._greenarrow.setPosition(this.greenarrowX, this.greenarrowY);
            this.addChild(this._greenarrow);
            var currRightIcon = Api.vipVoApi.getVipCfgByLevel(Api.playerVoApi.getPlayerNextVipLevel()).icon;
            var rightVip = BaseLoadBitmap.create(currRightIcon);
            rightVip.setPosition(this._leftVip.x + 110, this._leftVip.y);
            this.addChild(rightVip);
            rightVip.bindData = currRightIcon;
            this._rightVip = rightVip;
        }
        else {
            leftVip = BaseLoadBitmap.create("");
            leftVip.setPosition(40, 189);
            this.addChild(leftVip);
            this._leftVip = leftVip;
            if (this._greenarrow) {
                this._greenarrow.setPosition(this.greenarrowX, this.greenarrowY);
            }
            else {
                this._greenarrow = BaseBitmap.create("public_greenarrow");
                this._greenarrow.setPosition(this.greenarrowX, this.greenarrowY);
                this.addChild(this._greenarrow);
            }
            this._greenarrow.visible = false;
            var rightVip = BaseLoadBitmap.create(Api.vipVoApi.getVipCfgByLevel(Api.playerVoApi.getPlayerNextVipLevel()).icon);
            rightVip.bindData = currRightIcon;
            this.addChild(rightVip);
            this._rightVip = rightVip;
        }
        //rechargevie_topbar  上边长条
        // let rechargevie_topbar:BaseLoadBitmap=BaseLoadBitmap.create("rechargevie_topbar");
        // rechargevie_topbar.setPosition(0,this._progressBar.y+30);
        // this.addChild(rechargevie_topbar);
        //年龄确认弹窗
        var otherinfo = Api.otherInfoVoApi.getOtherInfo();
        if (PlatformManager.checkIsJPSp() && (!otherinfo.info.ageFlag)) {
            this.request(NetRequestConst.REQUEST_OTHERINFO_SETAGEFIRSTFLAG, null);
            ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW, {
                title: "rechargeVipJpSpAgeConfirmTitle",
                msg: LanguageManager.getlocal("rechargeVipJpSpAgeConfirmContent"),
                callback: null,
                handler: this,
                needCancel: false,
            });
        }
        this.refresh();
    };
    RechargeVipView.prototype.rechargeHandler = function () {
        var data = [];
        data.index = 0;
        this.clickTabbarHandler(data);
        this.tabbarGroup.selectedIndex = data.index;
    };
    RechargeVipView.prototype.refresh = function () {
        this.public_dot2.visible = Api.vipVoApi.getReddot();
        this._currMaxVip = Api.playerVoApi.getPlayerMaxVip();
        if (this._progressBar) {
            var nextVipNeedGem = Api.vipVoApi.getNextVipNeedGemNum();
            var nextVipLeftGem = Api.vipVoApi.getNextVipLvNeedRechargeGemNum();
            var nextVipHasRechargeGem = nextVipNeedGem - nextVipLeftGem;
            var nextVipLevel = Math.min(Config.VipCfg.getMaxLevel(), Api.playerVoApi.getPlayerVipLevel() + 1);
            if (Api.playerVoApi.getPlayerVipLevel() == this._currMaxVip) {
                this._upTxt.text = LanguageManager.getlocal("rechargeRecahVipMaxDesc");
                this._progressBar.setPercentage(1, nextVipNeedGem + "/" + nextVipNeedGem);
            }
            else {
                this._upTxt.text = LanguageManager.getlocal("rechargeRecahVipDesc", [nextVipLeftGem.toString(), nextVipLevel.toString(), Api.playerVoApi.getPlayerVipLevel() + ""]);
                this._progressBar.setPercentage(nextVipHasRechargeGem / nextVipNeedGem, nextVipHasRechargeGem + "/" + nextVipNeedGem);
            }
            // if (!PlatformManager.hasSpcialCloseBtn()) {
            this._upTxt.setPosition((GameConfig.stageWidth - this._upTxt.width) * 0.5, 160);
            // }
            if (this._gemTxt) {
                this._gemTxt.text = Api.playerVoApi.getPlayerGem().toString();
            }
            if (Api.vipVoApi.getCurLevelVipCfg().level != 0 && Api.playerVoApi.getPlayerVipLevel() != this._currMaxVip) {
                var currLevip = Api.vipVoApi.getCurLevelVipCfg().icon;
                this._greenarrow.visible = true;
                if (this._leftVip.bindData != currLevip) {
                    this._leftVip.setload(currLevip);
                    this._leftVip.bindData = currLevip;
                }
                var currRightIcon = Api.vipVoApi.getVipCfgByLevel(Api.playerVoApi.getPlayerNextVipLevel()).icon;
                if (this._rightVip) {
                    if (this._rightVip.bindData == currRightIcon) {
                        this._rightVip.setPosition(this._leftVip.x + 110, this._leftVip.y);
                    }
                    else {
                        this._rightVip.setload(currRightIcon);
                        this._rightVip.bindData = currRightIcon;
                    }
                    this._rightVip.setPosition(this._leftVip.x + 110, this._leftVip.y);
                }
            }
            else {
                if (Api.playerVoApi.getPlayerVipLevel() == this._currMaxVip) {
                    this._leftVip.visible = false;
                    this._greenarrow.visible = false;
                    this._rightVip.setPosition(this._leftVip.x + 60, this._leftVip.y + 3);
                }
                else {
                    this._rightVip.setPosition(this._leftVip.x + 60, this._leftVip.y + 3);
                }
            }
        }
    };
    RechargeVipView.prototype.receivePushData = function (event) {
        var data = event.data;
        if (data.data.cmd == NetPushConst.PUSH_PAY) {
            this.refresh();
        }
    };
    RechargeVipView.prototype.useVipCallback = function (event) {
        if (event.data.ret) {
            this.public_dot2.visible = Api.vipVoApi.getReddot();
        }
    };
    RechargeVipView.prototype.getTabbarTextArr = function () {
        return ["rechargeVipViewTitle",
            "vipBtn"
        ];
    };
    RechargeVipView.prototype.tick = function () {
        if (this.getSelectedTab() && this.getSelectedTab()["tick"]) {
            this.getSelectedTab()["tick"].call(this.getSelectedTab());
        }
    };
    RechargeVipView.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_VIP_VIPWELFARE), this.useVipCallback, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetPushConst.PUSH_PAY), this.receivePushData, this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_RECHARFGE_RE, this.rechargeHandler, this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_REFRESH_RECHARGE_VIEW, this.hideAndShowVip, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_RECHARGE_CLOSE, this.hide, this);
        this._progressBar = null;
        this._rightVip = null;
        this._upTxt = null;
        this._gemTxt = null;
        this._leftVip = null;
        this._greenarrow = null;
        this._currMaxVip = 0;
        this.public_dot2 = null;
        _super.prototype.dispose.call(this);
    };
    return RechargeVipView;
}(CommonView));
__reflect(RechargeVipView.prototype, "RechargeVipView");
