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
 * 付费礼包
 * author ycg
 * date 2019.12.24
 * @class AcRechargeGiftView
 */
var AcRechargeGiftView = /** @class */ (function (_super) {
    __extends(AcRechargeGiftView, _super);
    function AcRechargeGiftView() {
        var _this = _super.call(this) || this;
        _this._timeBg = null;
        _this._acTimeTf = null;
        _this._chargeBtn = null;
        _this._receiveFlag = null;
        _this._type = null;
        return _this;
    }
    AcRechargeGiftView.prototype.initView = function () {
        App.MessageHelper.addNetMessage(NetPushConst.PUSH_PAY, this.receivePushData, this);
        // App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        //bg
        var bg = BaseBitmap.create("rechargegift_bg-" + this.getTypeCode());
        bg.setPosition(GameConfig.stageWidth / 2 - bg.width / 2, GameConfig.stageHeigth / 2 - bg.height / 2);
        this.addChildToContainer(bg);
        this.closeBtn.setPosition(bg.x + bg.width - this.closeBtn.width - 45, bg.y + 40);
        var rewardBg = BaseBitmap.create("rechargegift_rewardbg-" + this.getTypeCode());
        rewardBg.setPosition(bg.x + bg.width / 2 - rewardBg.width / 2, bg.y + bg.height - rewardBg.height);
        //role
        var offY = 0;
        var offX = 0;
        if (this.getTypeCode() == "1") {
            offX = -20;
            offY = 35;
        }
        else if (this.getTypeCode() == "2") {
            offY = 0;
        }
        var role = this.getShowSkin(this.cfg.show, null, offX, offY);
        role.setPosition(rewardBg.x + 210, rewardBg.y + 30);
        this.addChildToContainer(role);
        //活动标头
        var title = BaseBitmap.create("rechargegift_title-" + this.getTypeCode());
        title.setPosition(bg.x + bg.width / 2 - title.width / 2, bg.y - 25);
        this.addChildToContainer(title);
        this.addChildToContainer(rewardBg);
        //描述
        var info = BaseBitmap.create("rechargegift_info-" + this.getTypeCode());
        info.setPosition(bg.x + bg.width / 2 - 30, bg.y + 80);
        this.addChildToContainer(info);
        //价格
        var chargeCfg = this.vo.getRechargeCfg();
        var price = ComponentManager.getBitmapText("" + chargeCfg.gemCost, "recharge_fnt", TextFieldConst.COLOR_WARN_YELLOW2, TextFieldConst.FONTSIZE_TITLE_BIG);
        price.anchorOffsetX = price.width;
        price.setPosition(info.x + 120, info.y + 72);
        this.addChildToContainer(price);
        if (!Api.switchVoApi.checkOpenBMFont()) {
            var priceTxt = price;
            priceTxt.bold = true;
        }
        if (PlatformManager.checkIsRuSp() && this.code == "4" || this.code == "5" || this.code == "6" || this.code == "7" || this.code == "8" || this.code == "9") {
            price.visible = false;
        }
        if (PlatformManager.checkIsTWBSp() && (this.code == "1" || this.code == "2")) {
            price.setPosition(info.x + 120 + 119, info.y + 72 + 190);
        }
        //奖励标头
        var rewardTitle = BaseBitmap.create("rechargegift_rewardtitle");
        rewardTitle.setPosition(rewardBg.x + 50, rewardBg.y + 25);
        this.addChildToContainer(rewardTitle);
        //奖励物品
        var scrollNode = new BaseDisplayObjectContainer();
        scrollNode.height = 108;
        var scrollRect = new egret.Rectangle(0, 0, 420, 108);
        var rewardScroll = ComponentManager.getScrollView(scrollNode, scrollRect);
        rewardScroll.setPosition(rewardTitle.x + rewardTitle.width, rewardBg.y);
        this.addChildToContainer(rewardScroll);
        rewardScroll.horizontalScrollPolicy = "on";
        rewardScroll.verticalScrollPolicy = "off";
        var rewardsArr = GameData.formatRewardItem(chargeCfg.getReward);
        App.LogUtil.log("rewardsarr: " + rewardsArr.length);
        for (var i = 0; i < rewardsArr.length; i++) {
            var rewardItemIcon = GameData.getItemIcon(rewardsArr[i], true, true);
            rewardItemIcon.setScale(0.8);
            rewardItemIcon.setPosition(7 + (rewardItemIcon.width * rewardItemIcon.scaleX + 13) * i, scrollNode.y + scrollNode.height / 2 - rewardItemIcon.height * rewardItemIcon.scaleY / 2);
            scrollNode.addChild(rewardItemIcon);
        }
        //充值
        var rechargeBtn = ComponentManager.getButton(ButtonConst.BTN2_NORMAL_YELLOW, "", this.rechargeBtnClick, this);
        rechargeBtn.setPosition(bg.x + bg.width / 2 - rechargeBtn.width / 2, bg.y + bg.height - rechargeBtn.height - 40);
        this.addChildToContainer(rechargeBtn);
        this._chargeBtn = rechargeBtn;
        rechargeBtn.setText(LanguageManager.getlocal("AcRechargeGiftBtnText", ["" + chargeCfg.cost]), false);
        if (PlatformManager.checkisLocalPrice() && chargeCfg.platFullPrice) {
            rechargeBtn.setText(chargeCfg.platFullPrice, false);
        }
        //已领取
        var receiveFlag = BaseBitmap.create("collectflag");
        receiveFlag.setScale(0.8);
        receiveFlag.setPosition(bg.x + bg.width / 2 - receiveFlag.width * receiveFlag.scaleX / 2, bg.y + bg.height - receiveFlag.height * receiveFlag.scaleY - 20);
        this.addChildToContainer(receiveFlag);
        receiveFlag.visible = false;
        this._receiveFlag = receiveFlag;
        //倒计时
        this._timeBg = BaseBitmap.create("public_9_bg61");
        this._timeBg.y = bg.y + bg.height + 5;
        this.addChildToContainer(this._timeBg);
        this._acTimeTf = ComponentManager.getTextField(LanguageManager.getlocal("AcRechargeGiftTimeCountDown", [this.vo.getCountDown()]), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._timeBg.width = 60 + this._acTimeTf.width;
        this._timeBg.anchorOffsetX = this._timeBg.width / 2;
        this._timeBg.x = bg.x + bg.width / 2;
        this._acTimeTf.anchorOffsetX = this._acTimeTf.width / 2;
        this._acTimeTf.setPosition(this._timeBg.x, this._timeBg.y + this._timeBg.height / 2 - this._acTimeTf.height / 2);
        this.addChildToContainer(this._acTimeTf);
        //tip
        var tip = ComponentManager.getTextField(LanguageManager.getlocal("AcRechargeGiftTip"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        tip.textAlign = TextFieldConst.ALIGH_CENTER;
        tip.anchorOffsetX = tip.width / 2;
        tip.lineSpacing = 8;
        tip.setPosition(bg.x + bg.width / 2, this._timeBg.y + this._timeBg.height + 25);
        this.addChildToContainer(tip);
        //衣装预览
        var skinContainer = this.getSkinBtnContainer();
        skinContainer.setPosition(rewardBg.x + 90, rewardBg.y - 110);
        this.addChildToContainer(skinContainer);
    };
    AcRechargeGiftView.prototype.rechargeBtnClick = function () {
        var _this = this;
        if (!this.vo.isInActivity()) {
            this.vo.showAcEndTip();
            return;
        }
        if (this.getTypeCode() == "1" || this.getTypeCode() == "4") {
            if (this.vo.checkIsHasWifeSkin(this.cfg.show)) {
                var skinData = Config.WifeskinCfg.getWifeCfgById(this.cfg.show);
                // let exchange = skinData.claim;
                // let itemvo = GameData.formatRewardItem(exchange)[0];
                var msgStr = LanguageManager.getlocal("AcRechargeGiftGetSkinMsg-1", ["" + skinData.name]);
                ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW, {
                    title: "AcRechargeGiftTipTitle",
                    msg: msgStr,
                    callback: function () {
                        PlatformManager.checkPay(_this.cfg.needGem);
                    },
                    handler: this,
                    needCancel: true
                });
                return;
            }
        }
        PlatformManager.checkPay(this.cfg.needGem);
    };
    AcRechargeGiftView.prototype.receivePushData = function (evt) {
        if (evt.data.ret) {
            if (evt.data.data.cmd == NetPushConst.PUSH_PAY) {
                var rData = evt.data.data.data;
                var cfg = Config.RechargeCfg.getRechargeItemCfgByKey(this.cfg.needGem);
                var rewards = "1_1_" + cfg.gemCost + "|" + rData.rewards;
                var rewObj = GameData.formatRewardItem(rewards);
                App.CommonUtil.playRewardFlyAction(rewObj);
                if (rData.replacerewards && rData.replacerewards[0]) {
                    ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD, { replacerewards: rData.replacerewards });
                }
                this.refreshView();
            }
        }
    };
    AcRechargeGiftView.prototype.refreshView = function () {
        this._chargeBtn.visible = false;
        this._receiveFlag.visible = true;
    };
    AcRechargeGiftView.prototype.tick = function () {
        if (this._acTimeTf) {
            this._acTimeTf.text = LanguageManager.getlocal("AcRechargeGiftTimeCountDown", [this.vo.getCountDown()]);
            this._acTimeTf.anchorOffsetX = this._acTimeTf.width / 2;
            this._timeBg.width = 60 + this._acTimeTf.width;
            this._timeBg.anchorOffsetX = this._timeBg.width / 2;
        }
    };
    //衣装显示 
    AcRechargeGiftView.prototype.getShowSkin = function (skinId, scale, offX, offY) {
        var container = new BaseDisplayObjectContainer();
        // 
        var showtype = 0;
        if (this.cfg["switch"]) {
            var oneswitch = this.cfg["switch"][0];
            var array = oneswitch.split("_");
            var onestr = array[0];
            if (onestr == "wifeSkin") {
                showtype = 1;
            }
            else if (onestr == "servantSkin") {
                showtype = 2;
            }
            else if (onestr == "wifeName") {
                showtype = 3;
            }
            else if (onestr == "servant") {
                showtype = 4;
            }
            this._type = showtype;
        }
        if (showtype == 1) {
            var skinCfg = Config.WifeskinCfg.getWifeCfgById(skinId);
            var boneName = undefined;
            var wife = null;
            if (skinCfg && skinCfg.bone) {
                boneName = skinCfg.bone + "_ske";
            }
            if ((!Api.switchVoApi.checkCloseBone()) && boneName && RES.hasRes(boneName) && App.CommonUtil.check_dragon()) {
                wife = App.DragonBonesUtil.getLoadDragonBones(skinCfg.bone);
                if (scale) {
                    wife.setScale(scale);
                }
                else {
                    wife.setScale(0.7);
                }
                wife.anchorOffsetY = wife.height;
                // wife.anchorOffsetX = wife.width / 2;
                if (offY) {
                    wife.y += offY;
                }
                if (offX) {
                    wife.x += offX;
                }
            }
            else {
                wife = BaseLoadBitmap.create(skinCfg.body);
                wife.width = 640;
                wife.height = 840;
                wife.setScale(0.45);
                wife.anchorOffsetY = wife.height;
                wife.anchorOffsetX = wife.width / 2;
                if (offX) {
                    wife.x += offX;
                }
            }
            container.addChild(wife);
        }
        else if (showtype == 2) {
            var skinCfg = Config.ServantskinCfg.getServantSkinItemById(skinId);
            var boneName = undefined;
            var servant = null;
            if (skinCfg && skinCfg.bone) {
                boneName = skinCfg.bone + "_ske";
            }
            if ((!Api.switchVoApi.checkCloseBone()) && boneName && RES.hasRes(boneName) && App.CommonUtil.check_dragon()) {
                servant = App.DragonBonesUtil.getLoadDragonBones(skinCfg.bone);
                if (scale) {
                    servant.setScale(scale);
                }
                else {
                    servant.setScale(0.9); //0.8
                }
                servant.anchorOffsetY = servant.height;
                servant.anchorOffsetX = servant.width / 2;
                if (offY) {
                    servant.y += offY;
                }
            }
            else {
                servant = BaseLoadBitmap.create(skinCfg.body);
                servant.width = 405;
                servant.height = 467;
                servant.anchorOffsetY = servant.height;
                servant.anchorOffsetX = servant.width / 2;
                servant.setScale(0.85);
            }
            container.addChild(servant);
        }
        else if (showtype == 3) {
            var skinCfg = Config.WifeCfg.getWifeCfgById(skinId);
            var boneName = undefined;
            var wife = null;
            if (skinCfg && skinCfg.bone) {
                boneName = skinCfg.bone + "_ske";
            }
            if ((!Api.switchVoApi.checkCloseBone()) && boneName && RES.hasRes(boneName) && App.CommonUtil.check_dragon()) {
                wife = App.DragonBonesUtil.getLoadDragonBones(skinCfg.bone);
                if (scale) {
                    wife.setScale(scale);
                }
                else {
                    wife.setScale(0.7);
                }
                wife.anchorOffsetY = wife.height;
                // wife.anchorOffsetX = wife.width / 2;
                if (offY) {
                    wife.y += offY;
                }
                if (offX) {
                    wife.x += offX;
                }
            }
            else {
                wife = BaseLoadBitmap.create(skinCfg.body);
                wife.width = 640;
                wife.height = 840;
                wife.setScale(0.45);
                wife.anchorOffsetY = wife.height;
                wife.anchorOffsetX = wife.width / 2;
                if (offX) {
                    wife.x += offX;
                }
            }
            container.addChild(wife);
        }
        else if (showtype == 4) {
            var skinCfg = Config.ServantCfg.getServantItemById(skinId);
            var boneName = undefined;
            var servant = null;
            // if (skinCfg && skinCfg.bone) {
            // 	boneName = skinCfg.bone + "_ske";
            // }
            // if ((!Api.switchVoApi.checkCloseBone()) && boneName && RES.hasRes(boneName) && App.CommonUtil.check_dragon()) {
            // 	servant = App.DragonBonesUtil.getLoadDragonBones(skinCfg.bone);
            //     if (scale){
            //         servant.setScale(scale);
            //     }
            //     else{
            //         servant.setScale(0.9);  //0.8
            //     }
            // 	servant.anchorOffsetY = servant.height;
            // 	servant.anchorOffsetX = servant.width / 2;
            //     if (offY){
            //         servant.y += offY;
            //     }
            // }
            // else {
            servant = BaseLoadBitmap.create(skinCfg.fullIcon);
            servant.width = 405;
            servant.height = 467;
            servant.anchorOffsetY = servant.height;
            servant.anchorOffsetX = servant.width / 2;
            servant.setScale(0.85);
            // }
            container.addChild(servant);
        }
        return container;
    };
    //衣装预览按钮
    AcRechargeGiftView.prototype.getSkinBtnContainer = function (isOther) {
        var container = new BaseDisplayObjectContainer();
        var skinTxtEffect = ComponentManager.getCustomMovieClip("acwealthcarpview_skineffect", 10, 70);
        skinTxtEffect.width = 208;
        skinTxtEffect.height = 154;
        skinTxtEffect.setPosition(0, 0);
        skinTxtEffect.blendMode = egret.BlendMode.ADD;
        container.addChild(skinTxtEffect);
        skinTxtEffect.playWithTime(-1);
        var skinTxtStr = "acwealthcarpview_servantskintxt";
        if (isOther) {
            skinTxtStr = "acgiftreturnview_common_skintxt";
        }
        var skinTxt = BaseBitmap.create(skinTxtStr);
        skinTxt.anchorOffsetX = skinTxt.width / 2;
        skinTxt.anchorOffsetY = skinTxt.height / 2;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, skinTxt, skinTxtEffect);
        container.addChild(skinTxt);
        egret.Tween.get(skinTxt, { loop: true }).to({ scaleX: 1.05, scaleY: 1.05 }, 400).to({ scaleX: 1, scaleY: 1 }, 400);
        var skinTxteffect = BaseBitmap.create(skinTxtStr);
        skinTxteffect.anchorOffsetX = skinTxteffect.width / 2;
        skinTxteffect.anchorOffsetY = skinTxteffect.height / 2;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, skinTxteffect, skinTxtEffect);
        container.addChild(skinTxteffect);
        skinTxteffect.blendMode = egret.BlendMode.ADD;
        skinTxteffect.alpha = 0;
        egret.Tween.get(skinTxteffect, { loop: true }).to({ alpha: 0.7, scaleX: 1.05, scaleY: 1.05 }, 400).to({ alpha: 0, scaleX: 1, scaleY: 1 }, 400);
        //透明点击区域
        var touchPos = BaseBitmap.create("public_alphabg");
        touchPos.width = 160;
        touchPos.height = 40;
        touchPos.setPosition(25, 57);
        container.addChild(touchPos);
        var data = null;
        var skinId = null;
        var topMsg = null;
        var rechargeCfg = Config.RechargeCfg.getRechargeItemCfgByKey(this.cfg.needGem);
        if (this.getTypeCode() == "1" || this.getTypeCode() == "3" || this.getTypeCode() == "4" || this._type == 1) {
            skinId = Config.WifeskinCfg.formatRewardItemVoStr(this.cfg.show);
            topMsg = LanguageManager.getlocal("AcRechargeGiftSkinMsg-" + this.getTypeCode(), ["" + rechargeCfg.gemCost]);
            data = {
                data: [{ idType: skinId, topMsg: topMsg, scale: 0.65, bgName: "" }]
            };
        }
        else if (this.getTypeCode() == "2" || this._type == 2) {
            skinId = Config.ServantskinCfg.formatRewardItemVoStr(this.cfg.show);
            topMsg = LanguageManager.getlocal("AcRechargeGiftSkinMsg-" + this.getTypeCode(), ["" + rechargeCfg.gemCost]);
            data = {
                data: [{ idType: skinId, topMsg: topMsg, scale: 0.8, bgName: "" }]
            };
        }
        else if (this._type == 3) {
            skinId = Config.WifeCfg.formatRewardItemVoStr(this.cfg.show);
            topMsg = LanguageManager.getlocal("AcRechargeGiftSkinMsg-" + this.getTypeCode(), ["" + rechargeCfg.gemCost]);
            data = {
                data: [{ idType: skinId, topMsg: topMsg, scale: 0.65, bgName: "" }]
            };
        }
        else if (this._type == 4) {
            skinId = Config.ServantCfg.formatRewardItemVoStr(this.cfg.show);
            topMsg = LanguageManager.getlocal("AcRechargeGiftSkinMsg-" + this.getTypeCode(), ["" + rechargeCfg.gemCost]);
            data = {
                data: [{ idType: skinId, topMsg: topMsg, scale: 0.8, bgName: "" }]
            };
        }
        touchPos.addTouchTap(function () {
            ViewController.getInstance().openView(ViewConst.POPUP.ACCOMMONREWARDPOPUPVEW, data);
        }, this);
        return container;
    };
    Object.defineProperty(AcRechargeGiftView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcRechargeGiftView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    AcRechargeGiftView.prototype.getTypeCode = function () {
        return this.code;
    };
    AcRechargeGiftView.prototype.getCloseBtnName = function () {
        return "sharepopupview_closebtn";
    };
    AcRechargeGiftView.prototype.getTitleStr = function () {
        return null;
    };
    AcRechargeGiftView.prototype.getTitleBgName = function () {
        return null;
    };
    AcRechargeGiftView.prototype.getBgName = function () {
        // return "rechargegift_bg-"+this.getTypeCode();
        return null;
    };
    AcRechargeGiftView.prototype.isHideTitleBgShadow = function () {
        return true;
    };
    AcRechargeGiftView.prototype.getResourceList = function () {
        var list = [];
        return _super.prototype.getResourceList.call(this).concat([
            "rechargegift_rewardtitle", "recharge_fnt", "acwealthcarpview_servantskintxt",
            "rechargegift_bg-" + this.getTypeCode(),
            "rechargegift_info-" + this.getTypeCode(),
            "rechargegift_rewardbg-" + this.getTypeCode(),
            "rechargegift_title-" + this.getTypeCode(),
        ]).concat(list);
    };
    AcRechargeGiftView.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(NetPushConst.PUSH_PAY, this.receivePushData, this);
        // App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        this._timeBg = null;
        this._acTimeTf = null;
        this._chargeBtn = null;
        this._receiveFlag = null;
        this._type = 0;
        _super.prototype.dispose.call(this);
    };
    return AcRechargeGiftView;
}(AcCommonView));
//# sourceMappingURL=AcRechargeGiftView.js.map