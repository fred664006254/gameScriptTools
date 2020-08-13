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
var AcSkinPackageView = (function (_super) {
    __extends(AcSkinPackageView, _super);
    function AcSkinPackageView() {
        var _this = _super.call(this) || this;
        _this._code = null;
        _this._vo = null;
        _this._cfg = null;
        _this._desc = null;
        _this._descText = null;
        _this._btn = null;
        _this._time = null;
        _this._icons = [];
        _this._num = null;
        _this._btnType = 0; //1 领奖   2 ，充值   3 , max   4 结束
        _this._rewards = null;
        return _this;
    }
    AcSkinPackageView.prototype.getResourceList = function () {
        this._code = this.param.data;
        var array = _super.prototype.getResourceList.call(this);
        if (Number(this._code) > 3) {
            array.push("acskinpackage_title" + this._code);
            array.push("rechargegift_rewardbg-1");
            array.push("acgiftreturnview_common_skintxt");
        }
        return array.concat([
            "acd_bg" + this._code, "sharepopupview_closebtn_down", "sharepopupview_closebtn", "recharge_fnt",
        ]);
    };
    AcSkinPackageView.prototype.initView = function () {
        this._vo = Api.acVoApi.getActivityVoByAidAndCode("skinPackage", this._code);
        this._cfg = Config.AcCfg.getCfgByActivityIdAndCode("skinPackage", this._code);
        var closebtn = ComponentManager.getButton("sharepopupview_closebtn", "", this.hide, this);
        closebtn.setPosition(536, GameConfig.stageHeigth / 2 - 210);
        this.addChild(closebtn);
        this._desc = BaseBitmap.create("skinpackage_" + this._code + "word1");
        this._desc.setPosition(355, GameConfig.stageHeigth / 2 - 112);
        this.addChild(this._desc);
        this._num = BaseBitmap.create();
        this._num.setPosition(70, GameConfig.stageHeigth / 2 + 155);
        this.addChild(this._num);
        this._descText = ComponentManager.getBitmapText("", "recharge_fnt", TextFieldConst.COLOR_BLACK);
        this._descText.y = this._desc.y + 37;
        this.addChild(this._descText);
        if (!Api.switchVoApi.checkOpenBMFont()) {
            var priceTxt = this._descText;
            priceTxt.bold = true;
        }
        this._time = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WARN_GREEN2);
        this.addChild(this._time);
        this.tick();
        this._btn = ComponentManager.getButton(ButtonConst.BTN_BIG_YELLOW, "", this.clickHandle, this);
        this._btn.setPosition(GameConfig.stageWidth / 2 - this._btn.width / 2, GameConfig.stageHeigth / 2 + 284);
        this.addChild(this._btn);
        var tip = ComponentManager.getTextField(LanguageManager.getlocal("acSkinPackageTip"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WARN_RED2);
        tip.setPosition(GameConfig.stageWidth - 35 - tip.width, GameConfig.stageHeigth / 2 + 121);
        this.addChild(tip);
        var wife = null;
        //龙骨
        if (this._code == "4") {
            var skinCfg = Config.WifeCfg.getWifeCfgById(this.getRewardsId());
            var boneName = undefined;
            if (skinCfg && skinCfg.bone) {
                boneName = skinCfg.bone + "_ske";
            }
            if (Api.wifeVoApi.isHaveBone(boneName) && (!Api.switchVoApi.checkCloseBone()) && boneName && RES.hasRes(boneName) && App.CommonUtil.check_dragon()) {
                wife = App.DragonBonesUtil.getLoadDragonBones(skinCfg.bone);
                wife.setScale(0.65);
                wife.x = 190;
                wife.y = GameConfig.stageHeigth / 2 + 160;
            }
            else {
                wife = BaseLoadBitmap.create(skinCfg.body);
                wife.width = 640;
                wife.height = 840;
                wife.setScale(0.45);
                wife.anchorOffsetY = wife.height;
                wife.anchorOffsetX = wife.width / 2;
                wife.x = 170;
                wife.y = GameConfig.stageHeigth / 2 + 143;
            }
            this.addChild(wife);
        }
        else if (this._code == "5") {
            var skinCfg = Config.WifeskinCfg.getWifeCfgById(this.getRewardsId());
            var boneName = undefined;
            if (skinCfg && skinCfg.bone) {
                boneName = skinCfg.bone + "_ske";
            }
            if ((!Api.switchVoApi.checkCloseBone()) && boneName && RES.hasRes(boneName) && App.CommonUtil.check_dragon()) {
                wife = App.DragonBonesUtil.getLoadDragonBones(skinCfg.bone);
                wife.setScale(0.65);
                wife.x = 190;
                wife.y = GameConfig.stageHeigth / 2 + 160;
            }
            else {
                wife = BaseLoadBitmap.create(skinCfg.body);
                wife.width = 640;
                wife.height = 840;
                wife.setScale(0.45);
                wife.anchorOffsetY = wife.height;
                wife.anchorOffsetX = wife.width / 2;
                wife.x = 170;
                wife.y = GameConfig.stageHeigth / 2 + 143;
            }
            this.addChild(wife);
        }
        if (wife) {
            var rewardBg = BaseBitmap.create("rechargegift_rewardbg-1");
            rewardBg.setPosition(GameConfig.stageWidth / 2 - rewardBg.width / 2, GameConfig.stageHeigth / 2 + 146);
            this.addChild(rewardBg);
            var titlepic = BaseBitmap.create("acskinpackage_title" + this._code);
            titlepic.setPosition(GameConfig.stageWidth / 2 - titlepic.width / 2, GameConfig.stageHeigth / 2 - 316);
            this.addChild(titlepic);
        }
        if (Number(this._code) > 3) {
            //衣装预览
            var skinContainer = this.getSkinBtnContainer();
            skinContainer.setPosition(GameConfig.stageWidth / 2 - 200, GameConfig.stageHeigth / 2 + 36);
            this.addChild(skinContainer);
        }
        this.resetInfo();
        if (Number(this._code) > 3 && this.checkHasRewards() && this._btnType != 3) {
            var hasText = ComponentManager.getTextField(LanguageManager.getlocal("acSkinPackageHadTip-" + this._code), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
            hasText.width = 500;
            hasText.lineSpacing = 5;
            hasText.textAlign = egret.HorizontalAlign.CENTER;
            hasText.setPosition(GameConfig.stageWidth / 2 - hasText.width / 2, GameConfig.stageHeigth / 2 + 395);
            this.addChild(hasText);
        }
    };
    AcSkinPackageView.prototype.getSkinBtnContainer = function () {
        var _this = this;
        var container = new BaseDisplayObjectContainer();
        var skinTxtEffect = ComponentManager.getCustomMovieClip("acwealthcarpview_skineffect", 10, 70);
        skinTxtEffect.width = 208;
        skinTxtEffect.height = 154;
        skinTxtEffect.setPosition(0, 0);
        skinTxtEffect.blendMode = egret.BlendMode.ADD;
        container.addChild(skinTxtEffect);
        skinTxtEffect.playWithTime(-1);
        var skinTxtStr = "acgiftreturnview_common_skintxt";
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
        var curFlag = this._vo.getCurFlag();
        if (curFlag >= this._cfg.getRewardMax()) {
            curFlag = this._cfg.getRewardMax() - 1;
            this._btnType = 3;
        }
        var needGem = this._cfg.getGemNeed(curFlag);
        touchPos.addTouchTap(function () {
            if (_this._code == "4") {
                var wifeid = _this.getRewardsId();
                var skinId = Config.WifeCfg.formatRewardItemVoStr(wifeid);
                var topMsg = LanguageManager.getlocal("acSkinPackageGiftPreviewTip-" + _this._code, [String(needGem)]);
                var data = {
                    data: [{ idType: skinId, topMsg: topMsg, scale: 0.65, bgName: "" }]
                };
                ViewController.getInstance().openView(ViewConst.POPUP.ACCOMMONREWARDPOPUPVEW, data);
            }
            else if (_this._code == "5") {
                var wifeid = _this.getRewardsId();
                var skinId = Config.WifeskinCfg.formatRewardItemVoStr(wifeid);
                var topMsg = LanguageManager.getlocal("acSkinPackageGiftPreviewTip-" + _this._code, [String(needGem)]);
                var data = {
                    data: [{ idType: skinId, topMsg: topMsg, scale: 0.55, bgName: "", offY: -15 }]
                };
                ViewController.getInstance().openView(ViewConst.POPUP.ACCOMMONREWARDPOPUPVEW, data);
            }
            else if (_this._code == "6") {
                ViewController.getInstance().openView(ViewConst.POPUP.ACTREASUREHUNTOFFICEVIEW, {
                    aid: AcConst.AID_TREASUREHUNT,
                    code: 1
                });
            }
        }, this);
        return container;
    };
    AcSkinPackageView.prototype.checkHasRewards = function () {
        var curFlag = this._vo.getCurFlag();
        if (curFlag >= this._cfg.getRewardMax()) {
            curFlag = this._cfg.getRewardMax() - 1;
        }
        var rewardsStr = this._cfg.getItemCfg(curFlag).getReward;
        var rewardsVo = GameData.formatRewardItem(rewardsStr);
        for (var i = 0; i < rewardsVo.length; i++) {
            var onevo = rewardsVo[i];
            if (onevo.type == 10) {
                if (Api.wifeVoApi.getWifeInfoVoById(onevo.id)) {
                    return true;
                }
            }
            if (onevo.type == 16) {
                if (Api.wifeSkinVoApi.isOwnSkinOfSkinId(onevo.id)) {
                    return true;
                }
            }
            if (onevo.type == 20) {
                if (Api.otherInfoVoApi.isHasSceneNotAboutUnlock(String(onevo.id)) || Api.otherInfoVoApi.isHasSceneNotAboutUnlock(String(onevo.id), "cityScene") || Api.otherInfoVoApi.isHasSceneNotAboutUnlock(String(onevo.id), "searchScene")) {
                    return true;
                }
            }
        }
        return false;
    };
    AcSkinPackageView.prototype.getRewardsId = function () {
        var curFlag = this._vo.getCurFlag();
        if (curFlag >= this._cfg.getRewardMax()) {
            curFlag = this._cfg.getRewardMax() - 1;
        }
        var rewardsStr = this._cfg.getItemCfg(curFlag).getReward;
        var rewardsVo = GameData.formatRewardItem(rewardsStr);
        for (var i = 0; i < rewardsVo.length; i++) {
            var onevo = rewardsVo[i];
            if (onevo.type == 10 || onevo.type == 16) {
                return onevo.id;
            }
        }
        return 0;
    };
    AcSkinPackageView.prototype.resetInfo = function () {
        var curFlag = this._vo.getCurFlag();
        if (curFlag >= this._cfg.getRewardMax()) {
            curFlag = this._cfg.getRewardMax() - 1;
            this._btnType = 3;
        }
        var needGem = this._cfg.getGemNeed(curFlag);
        if (this._btnType == 3) {
            // if (this._cfg.getRewardMax()==1)
            // {
            // 	this._desc.texture = ResourceManager.getRes("skinpackage_"+this._code+"word2");
            // }
            // else
            // {
            this._desc.texture = ResourceManager.getRes("skinpackage_" + this._code + "word3");
            // }
            this._descText.visible = false;
            // this._desc.x =395;
        }
        else {
            var xgem = needGem - this._vo.chargeNum;
            if (xgem < 0) {
                xgem = 0;
            }
            if (xgem > 0) {
                this._descText.visible = true;
                this._desc.texture = ResourceManager.getRes("skinpackage_" + this._code + "word1");
                this._descText.text = String(xgem);
                this._descText.x = this._desc.x + 105 - this._descText.width;
            }
            else {
                this._descText.visible = false;
                this._desc.texture = ResourceManager.getRes("skinpackage_" + this._code + "word2");
            }
        }
        if (this._icons.length > 0) {
            for (var k in this._icons) {
                var v = this._icons[k];
                v.dispose();
            }
            this._icons.length = 0;
        }
        this._icons = this._cfg.getItemCfg(curFlag).rewardIcons;
        this._num.texture = ResourceManager.getRes("skinpackage" + (curFlag + 1));
        var offsetx = 265;
        if (this._cfg.getRewardMax() == 1) {
            this._num.texture = ResourceManager.getRes("skinpackage");
            this.removeChild(this._num);
            this.addChild(this._num);
            this._num.setPosition(58, GameConfig.stageHeigth / 2 + 168);
        }
        for (var k in this._icons) {
            var v = this._icons[k];
            v.setScale(0.8);
            v.setPosition(offsetx + (Number(k) - 1) * 100, GameConfig.stageHeigth / 2 + 155);
            this.addChild(v);
        }
        if (this._vo.chargeNum >= needGem) {
            if (this._btnType == 3) {
                this._btn.setText("candyGetAlready");
                this._btn.setEnable(false);
            }
            else {
                this._btnType = 1;
                this._btn.setText("DragonBoatDayLq");
            }
        }
        else {
            if (this._vo.checkIsInEndShowTime()) {
                this._btnType = 4;
                this._btn.setText("shareOver");
                this._btn.setEnable(false);
            }
            else {
                this._btnType = 2;
                this._btn.setText("gotocharge");
            }
        }
    };
    AcSkinPackageView.prototype.clickHandle = function () {
        if (GameData.serverTime > this._vo.et) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
        if (this._btnType == 1) {
            this._rewards = this._cfg.getItemCfg(this._vo.getCurFlag()).getReward;
            var curFlag = this._vo.getCurFlag() + 1;
            this.request(NetRequestConst.REQUEST_ACTIVITY_GETSKINPACKAGEREWARD, { activeId: "skinPackage" + "-" + this._code, rkey: curFlag });
        }
        else {
            ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
            this.hide();
        }
    };
    AcSkinPackageView.prototype.receiveData = function (data) {
        if (data.ret) {
            var rData = data.data.data;
            var iconModels = GameData.formatRewardItem(rData.rewards);
            App.CommonUtil.playRewardFlyAction(iconModels);
            this.resetInfo();
            if (rData.replacerewards) {
                ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD, { replacerewards: rData.replacerewards });
            }
        }
    };
    AcSkinPackageView.prototype.tick = function () {
        if (this._vo.checkIsInEndShowTime()) {
            this._time.text = LanguageManager.getlocal("crossIntimacyCDTime4");
            if (this._btnType == 2) {
                this._btnType = 4;
                this._btn.setText("shareOver");
                this._btn.setEnable(false);
            }
        }
        else {
            this._time.text = LanguageManager.getlocal("timelimitwifeview_time", [this._vo.acCountDownNoExtra]);
        }
        this._time.setPosition(GameConfig.stageWidth / 2 - this._time.width / 2, GameConfig.stageHeigth / 2 + 258);
    };
    AcSkinPackageView.prototype.getBgName = function () {
        return "acskinpackage_bg" + this._code;
    };
    AcSkinPackageView.prototype.getTitleBgName = function () {
        return null;
    };
    AcSkinPackageView.prototype.getTitleStr = function () {
        return "";
    };
    AcSkinPackageView.prototype.getCloseBtnName = function () {
        return null;
    };
    AcSkinPackageView.prototype.dispose = function () {
        this._code = null;
        this._vo = null;
        this._desc = null;
        this._descText = null;
        this._btn = null;
        this._time = null;
        this._cfg = null;
        this._icons.length = 0;
        this._btnType = 0;
        this._rewards = null;
        this._num = null;
        _super.prototype.dispose.call(this);
    };
    return AcSkinPackageView;
}(PopupView));
__reflect(AcSkinPackageView.prototype, "AcSkinPackageView");
//# sourceMappingURL=AcSkinPackageView.js.map