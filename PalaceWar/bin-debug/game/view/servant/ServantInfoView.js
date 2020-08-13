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
 * 门客信息
 * author yanyuling
 * date 2017/9/25
 * @class ServantInfoView
 */
var ServantInfoView = (function (_super) {
    __extends(ServantInfoView, _super);
    function ServantInfoView() {
        var _this = _super.call(this) || this;
        _this._servantId = null;
        _this._servantInfoObj = null;
        _this._proTxtList = null;
        _this._servantProCfg = null;
        _this._curLvNeedGold = 0;
        _this._lastUseTime = 0;
        _this._bottomNodeList = [];
        _this._servant_levebg = null;
        _this._serverList = undefined;
        _this._specialityIconList = [];
        _this._switchDelta = 500;
        _this._decreeGoldCost = 0;
        _this._task4ClickTimes = 0;
        _this._droWifeIcon = undefined;
        /**门客出海logo */
        _this._servantExileLogo = null;
        /**门客出海logoTF */
        _this._servantExileTF = null;
        /**
         * 丹书铁卷
         */
        _this._danshuText = null;
        _this._bgContainer = null;
        return _this;
    }
    ServantInfoView.prototype.initView = function () {
        var _this = this;
        Api.rookieVoApi.checkNextStep();
        Api.mainTaskVoApi.checkShowGuide("servantview");
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_UPGRADE_SERVANT), this.refreshInfoAfterUpdate, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_UPGRADE_SERVANT_TEN), this.refreshInfoAfterUpdate, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_USE_ITEM), this.refreshServantProTxt, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_SERVANT_CHANGE), this.refreshInfoAfterUpdate, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_SERVANT_UPABILITY), this.refreshServantProTxt, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_SERVANT_UPSKILL), this.refreshServantProTxt, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_UPGRADE_SERVANT_UPSKILLABILITY), this.refreshServantProTxt, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_SERVANTSKIN_AURA, this.backFromServantAuraSkin, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_GUIDE_SHOWHAND, this.showHand, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_SERVANT_UPAURA), this.refreshServantProTxt, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_REFRESH_SERVANT_ITEMLIST, this.checkRedPoints, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_FROM_SERVANT_SKIN, this.backFromServantSkin, this);
        this._proTxtList = [];
        if (this.param.data && this.param.data.servantId) {
            this.resetServantId(this.param.data.servantId);
        }
        else {
            this.resetServantId(this.param.data);
        }
        var servantCfg = GameConfig.config.servantCfg[this._servantId];
        this._nodeContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(this._nodeContainer);
        this._toprefreshNode = new BaseDisplayObjectContainer();
        this.addChildToContainer(this._toprefreshNode);
        this._toprefreshNode2 = new BaseDisplayObjectContainer();
        this.addChildToContainer(this._toprefreshNode2);
        this._bottomnodeContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(this._bottomnodeContainer);
        var goldBg = BaseBitmap.create("servant_topresbg");
        goldBg.width = 120;
        goldBg.x = PlatformManager.hasSpcialCloseBtn() ? 480 : 20;
        goldBg.y = this.container.y - goldBg.height - 20;
        this.addChild(goldBg);
        var goldIcon = BaseBitmap.create("public_icon2");
        goldIcon.x = goldBg.x - goldIcon.width / 2 + 15;
        goldIcon.y = goldBg.y + goldBg.height / 2 - goldIcon.height / 2 - 5;
        this.addChild(goldIcon);
        this._goldNumTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
        this._goldNumTxt.text = Api.playerVoApi.getPlayerGoldStr(); //0611
        this._goldNumTxt.x = goldIcon.x + goldIcon.width;
        this._goldNumTxt.y = goldBg.y + goldBg.height / 2 - this._goldNumTxt.height / 2 - 3;
        this.addChild(this._goldNumTxt);
        // this._bgContainer = new BaseDisplayObjectContainer();
        // this._bgContainer.width = 640;
        // this._bgContainer.height = 580;
        // this._bgContainer.y = -20;
        // this._nodeContainer.addChild(this._bgContainer);
        var servant_infobg = BaseLoadBitmap.create("servant_infobg");
        servant_infobg.width = 640;
        servant_infobg.height = 580;
        servant_infobg.y = -20;
        this._nodeContainer.addChild(servant_infobg);
        this._servantRoleNode = new BaseDisplayObjectContainer();
        this._nodeContainer.addChild(this._servantRoleNode);
        var servantFullImg = BaseLoadBitmap.create(this._servantInfoObj.fullImgPath);
        servantFullImg.width = 405;
        servantFullImg.height = 467;
        servantFullImg.anchorOffsetY = servantFullImg.height;
        servantFullImg.anchorOffsetX = servantFullImg.width / 2;
        servantFullImg.x = GameConfig.stageWidth / 2;
        servantFullImg.y = servant_infobg.y + servant_infobg.height - 50;
        this._servantFullImg = servantFullImg;
        this._servantRoleNode.addChild(servantFullImg);
        var nameBg = BaseBitmap.create("servant_alv_namebg");
        nameBg.x = 20;
        nameBg.y = 20;
        this._toprefreshNode.addChild(nameBg);
        this._nameBg = nameBg;
        this._alvImg = BaseLoadBitmap.create("servant_alv_1");
        this._alvImg.width = 91;
        this._alvImg.height = 81;
        this._alvImg.visible = false;
        this._toprefreshNode.addChild(this._alvImg);
        if (this._servantInfoObj.clv > 0) {
            this._alvImg.visible = true;
        }
        var nameTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_TITLE_COMMON);
        this._nameTxt = nameTxt;
        nameTxt.multiline = true;
        this._nameTxt.text = LanguageManager.getlocal("servant_name" + this._servantId);
        if (PlatformManager.checkIsTextHorizontal()) {
            nameTxt.x = this._nodeContainer.width / 2 - nameTxt.width / 2;
            nameTxt.y = this._nodeContainer.height - 225 - nameTxt.height / 2;
            nameBg.width = nameTxt.width + 50;
            nameBg.x = this._nodeContainer.width / 2 - nameBg.width / 2;
            nameBg.y = this._nodeContainer.height - 225 - nameBg.height / 2;
            this._nameTxt.textColor = ServantScrollItem.getQualityColor(this._servantInfoObj.clv);
            this._alvImg.x = nameBg.x - this._alvImg.width / 2 - 5;
            this._alvImg.y = nameBg.y + nameBg.height / 2 - this._alvImg.height / 2 - 5;
        }
        else {
            this._alvImg.x = nameBg.x + nameBg.width / 2 - this._alvImg.width / 2 + 5;
            this._alvImg.y = nameBg.y - 20;
            nameTxt.width = 26;
            nameTxt.x = nameBg.x + nameBg.width / 2 - nameTxt.width / 2;
            this._nameTxt.textColor = ServantScrollItem.getQualityColor(this._servantInfoObj.clv);
            if (this._alvImg.visible) {
                nameTxt.y = this._alvImg.y + 75;
            }
            else {
                nameTxt.y = this._alvImg.y + 60;
            }
        }
        this._toprefreshNode.addChild(nameTxt);
        var servant_mask = BaseBitmap.create("servant_mask");
        servant_mask.width = servant_infobg.width;
        servant_mask.x = GameConfig.stageWidth / 2 - servant_mask.width / 2;
        servant_mask.y = servant_infobg.y + servant_infobg.height - servant_mask.height;
        this._nodeContainer.addChild(servant_mask);
        //红色属性背景条
        var servant_attributemap = BaseBitmap.create("servant_attributemap");
        servant_attributemap.x = 180;
        servant_attributemap.y = 380;
        this._toprefreshNode.addChild(servant_attributemap);
        //蓝色背景图
        var servantBlueBg = BaseBitmap.create("servant_downbg");
        servantBlueBg.x = 0;
        servantBlueBg.y = 445;
        servantBlueBg.name = "servantBlueBg";
        this._nodeContainer.addChild(servantBlueBg);
        //等级蓝色背景图
        this._servant_levebg = BaseLoadBitmap.create("servant_levebg2");
        this._servant_levebg.x = 5;
        this._servant_levebg.y = 445;
        this._nodeContainer.addChild(this._servant_levebg);
        //等级 文字不变
        this._lvText = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._lvText.text = LanguageManager.getlocal("servant_infoLv"); //LanguageManager.getlocal("servant_flagColorTxt"+(this._servantInfoObj.clv),[LanguageManager.getlocal("servant_infoLv")]);
        this._lvText.x = 22;
        this._lvText.y = 455;
        this._nodeContainer.addChild(this._lvText);
        for (var i = 0; i < 4; i++) {
            var attribute = BaseBitmap.create("servant_attribute" + (i + 1));
            var num = i % 2;
            attribute.x = 90 + num * 180;
            attribute.y = 460 + 32 * Math.floor(i / 2);
            this._nodeContainer.addChild(attribute);
        }
        this._progressBar = ComponentManager.getProgressBar("progress3", "progress3_bg", 460);
        this._progressBar.x = 10;
        this._progressBar.y = 530;
        this._progressBar.setTextSize(18);
        this._nodeContainer.addChild(this._progressBar);
        //勾选底
        var probg = BaseBitmap.create("hold_dinner_box");
        probg.x = 480;
        probg.y = 465;
        probg.name = "probg";
        this._nodeContainer.addChild(probg);
        //连升十级
        var tenTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL);
        tenTxt.textColor = TextFieldConst.COLOR_LIGHT_YELLOW;
        tenTxt.text = LanguageManager.getlocal("servantInfo_tenTips");
        tenTxt.x = 525; // probg.x + 45;
        tenTxt.y = 470; //probg.y+ 260;
        tenTxt.size = 24;
        tenTxt.name = "tenText";
        this._nodeContainer.addChild(tenTxt);
        this._checkFlag = BaseLoadBitmap.create("hold_dinner_check");
        this._checkFlag.width = this._checkFlag.height = 38;
        this._checkFlag.x = 480; //tenTxt.x + 95;
        this._checkFlag.y = tenTxt.y - 10;
        // if (Api.rookieVoApi.curGuideKey == "maintask" && this._checkFlag.alpha == 0 ){
        // 	ServantInfoView.CALPHA = 1;
        // 	this._checkFlag.alpha = 1;
        // }else{
        this._checkFlag.alpha = ServantInfoView.CALPHA;
        // }
        this._nodeContainer.addChild(this._checkFlag);
        this._checkFlag.addTouchTap(this.changeCheckFlagStatus, this);
        this.changeProgressText();
        this._servantProCfg = [
            {
                txt: this.getProStringWithProId(1),
                txtcolor: TextFieldConst.COLOR_QUALITY_ORANGE,
                txtId: 1,
            },
            {
                txt: this.getProStringWithProId(3),
                txtcolor: TextFieldConst.COLOR_QUALITY_ORANGE,
                txtId: 3,
            },
            {
                txt: this.getProStringWithProId(4),
                txtcolor: 0xddd5c7,
                txtId: 4,
            },
            {
                txt: this.getProStringWithProId(5),
                txtcolor: 0xddd5c7,
                txtId: 5,
            },
            {
                txt: this.getProStringWithProId(6),
                txtcolor: 0xddd5c7,
                txtId: 6,
            },
            {
                txt: this.getProStringWithProId(7),
                txtcolor: 0xddd5c7,
                txtId: 7,
            },
        ];
        var proX = probg.x + 30;
        var proY = probg.y + 35;
        var detailImg = ComponentManager.getButton("servant_detailBtn", "", this.detailClickHandler, this);
        detailImg.x = 400; //probg.x + probg.width - detailImg.width/2-10;
        detailImg.y = 380; //probg.y - detailImg.height/2+15;
        this._toprefreshNode.addChild(detailImg);
        for (var index = 0; index < this._servantProCfg.length; index++) {
            var element = this._servantProCfg[index];
            var proTxt = ComponentManager.getTextField("", 22, element.txtcolor);
            proTxt.text = this.getProStringWithProId(element.txtId);
            proTxt.x = proX;
            proTxt.y = proY;
            //等级
            if (element.txtId == 1) {
                proTxt.x = 5;
                proTxt.y = 475;
                proTxt.width = 80;
                proTxt.textAlign = "center";
                proTxt.size = 42;
                proTxt.textColor = TextFieldConst.COLOR_LIGHT_YELLOW;
            }
            //属性
            if (element.txtId == 3) {
                proTxt.x = 210;
                proTxt.y = 392;
                proTxt.width = 190;
                if (PlatformManager.checkIsThSp()) {
                    proTxt.width = 200;
                }
                proTxt.size = 26;
                proTxt.textAlign = "center";
                proTxt.textColor = TextFieldConst.COLOR_LIGHT_YELLOW;
            }
            //属性武力
            if (element.txtId == 4) {
                proTxt.x = 160;
                proTxt.y = 465;
                proTxt.size = 24;
                proTxt.textColor = TextFieldConst.COLOR_WHITE;
            }
            //属性智力
            if (element.txtId == 5) {
                proTxt.x = 340;
                proTxt.y = 465;
                proTxt.size = 24;
                proTxt.textColor = TextFieldConst.COLOR_WHITE;
            }
            //属性政治
            if (element.txtId == 6) {
                proTxt.x = 160;
                proTxt.y = 495;
                proTxt.size = 24;
                proTxt.textColor = TextFieldConst.COLOR_WHITE;
            }
            //属性魅力
            if (element.txtId == 7) {
                proTxt.x = 340;
                proTxt.y = 495;
                proTxt.size = 24;
                proTxt.textColor = TextFieldConst.COLOR_WHITE;
            }
            if (element.txtId == 3) {
                this._toprefreshNode.addChild(proTxt);
            }
            else {
                this._nodeContainer.addChild(proTxt);
            }
            proY += 28;
            this._proTxtList.push(proTxt);
        }
        var levelupBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "", this.levelupBtnClickHandler, this);
        levelupBtn.x = 480; //probg.x + probg.width/2 - levelupBtn.width/2;
        levelupBtn.y = 505; //proY + 12 + 55;
        levelupBtn.setColor(TextFieldConst.COLOR_BLACK);
        this._nodeContainer.addChild(levelupBtn);
        this._levelupBtn = levelupBtn;
        var btY = servant_infobg.y + servant_infobg.height;
        if (btY + this.container.y + 406 > GameConfig.stageHeigth) {
            var bgy = 554 - servant_infobg.height - this.container.y;
            bgy = bgy >= 0 ? 0 : bgy;
            servant_infobg.y = bgy + 50;
            servant_infobg.mask = new egret.Rectangle(0, this.container.y - 50, GameConfig.stageWidth, servant_infobg.height);
            this._bottomnodeContainer.y = 565;
            servantFullImg.y = servant_infobg.y + servant_infobg.height - 50;
        }
        else {
            this._bottomnodeContainer.y = 565;
        }
        this._progressBar.y = 530;
        var bottomInfoY = 0;
        var bottomBg = BaseBitmap.create("servant_bottombg");
        bottomBg.x = 0;
        bottomBg.y = bottomInfoY;
        var attrLineNum = Math.ceil(servantCfg.ability.length / 2);
        var targetHeight = GameConfig.stageHeigth - this._bottomnodeContainer.y - this.container.y;
        bottomBg.height = targetHeight;
        this._bottomnodeContainer.addChild(bottomBg);
        this._bottomBg = bottomBg;
        var arrow_leftBtn = ComponentManager.getButton("btn_leftpage", "", this.switchHandler, this, ["left"]);
        arrow_leftBtn.x = 20;
        arrow_leftBtn.y = this._bottomnodeContainer.y - 200;
        this._toprefreshNode2.addChild(arrow_leftBtn);
        var arrow_rightBtn = ComponentManager.getButton("btn_leftpage", "", this.switchHandler, this, ["right"]);
        arrow_rightBtn.scaleX = -1;
        var tarRightPosX = GameConfig.stageWidth - arrow_leftBtn.x;
        arrow_rightBtn.x = tarRightPosX;
        arrow_rightBtn.y = arrow_leftBtn.y;
        this._toprefreshNode2.addChild(arrow_rightBtn);
        // this._servantExileTF
        this._servantExileLogo = BaseBitmap.create("public_servantexilelogo");
        this._servantExileLogo.setPosition(arrow_leftBtn.x + arrow_leftBtn.width / 2 - this._servantExileLogo.width / 2 + 10, arrow_leftBtn.y - this._servantExileLogo.height - 25);
        this._toprefreshNode.addChild(this._servantExileLogo);
        this._servantExileLogo.setVisible(false);
        this._servantExileTF = ComponentManager.getTextField(LanguageManager.getlocal("servantExileTime"), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._servantExileTF.setPosition(this._servantExileLogo.x + this._servantExileLogo.width / 2 - this._servantExileTF.width / 2, this._servantExileLogo.y + this._servantExileLogo.height + 5);
        this._toprefreshNode.addChild(this._servantExileTF);
        this._servantExileTF.setVisible(false);
        if (Api.switchVoApi.checkOpenServantSkin()) {
            var skinBtn = ComponentManager.getButton("servant_skinBtn", "", this.skinBtnHandler, this, ["right"]);
            skinBtn.x = tarRightPosX - skinBtn.width + 10;
            skinBtn.y = arrow_rightBtn.y - skinBtn.height - 8;
            skinBtn.name = "skinBtn";
            this._toprefreshNode.addChild(skinBtn);
            if (Api.servantVoApi.isShowSkinRedForEnter(this._servantId)) {
                App.CommonUtil.addIconToBDOC(skinBtn);
            }
        }
        if (Api.switchVoApi.checkOpenServantSkinAura()) {
            var auraBtn = ComponentManager.getButton("servant_aura", "", function () {
                if (!Config.ServantskinCfg.isSkinDeploy(_this._servantId)) {
                    App.CommonUtil.showTip(LanguageManager.getlocal("skin_servantNoSkinTips"));
                    return;
                }
                //打开升级弹窗
                var servantskinList = Config.ServantskinCfg.getIdListBySerVantId(_this._servantId);
                ViewController.getInstance().openView(ViewConst.POPUP.SERVANTSKINAURAPOPUPVIEW, {
                    servantId: _this._servantId,
                    skinId: servantskinList[0]
                });
            }, this, ["right"]);
            auraBtn.x = tarRightPosX - auraBtn.width + 15;
            var skinBtn = this._toprefreshNode.getChildByName('skinBtn');
            var tmpY = skinBtn ? skinBtn.y : arrow_rightBtn.y;
            auraBtn.y = tmpY - auraBtn.height - 8;
            auraBtn.name = "auraBtn";
            this._toprefreshNode.addChild(auraBtn);
            if (Api.servantVoApi.isShowAuralevelUpRedForEnter(this._servantId)) {
                App.CommonUtil.addIconToBDOC(auraBtn);
            }
            else {
                App.CommonUtil.removeIconFromBDOC(auraBtn);
            }
        }
        this.refreshBaseUIInfo(); //0611
        this.refreshServantRoleImg();
        if (this.param.data && this.param.data.servantSkinId) {
            this.skinBtnHandler();
            this.param.data.servantSkinId = null;
        }
    };
    ServantInfoView.prototype.skinBtnHandler = function () {
        if (!Config.ServantskinCfg.isSkinDeploy(this._servantId)) {
            App.CommonUtil.showTip(LanguageManager.getlocal("skin_servantNoSkinTips"));
            return;
        }
        ViewController.getInstance().openView(ViewConst.COMMON.SERVANTSKINCHANGEVIEW, { servantId: this._servantId, servantSkinId: this.param.data.servantSkinId });
        if (this._droWifeIcon) {
            this._droWifeIcon.stop();
            this._droWifeIcon.dispose();
            this._droWifeIcon = null;
        }
    };
    ServantInfoView.prototype.backFromServantAuraSkin = function () {
        this.refreshServantProTxt();
        var auraBtn = this._toprefreshNode.getChildByName("auraBtn");
        if (auraBtn) {
            if (Api.servantVoApi.isShowAuralevelUpRedForEnter(this._servantId)) {
                App.CommonUtil.addIconToBDOC(auraBtn);
            }
            else {
                App.CommonUtil.removeIconFromBDOC(auraBtn);
            }
        }
    };
    ServantInfoView.prototype.backFromServantSkin = function (param) {
        var _this = this;
        var _isShowAni = param.data.isShowAni;
        var skinBtn = this._toprefreshNode.getChildByName("skinBtn");
        if (skinBtn) {
            if (Api.servantVoApi.isShowSkinRedForEnter(this._servantId)) {
                App.CommonUtil.addIconToBDOC(skinBtn);
            }
            else {
                App.CommonUtil.removeIconFromBDOC(skinBtn);
            }
        }
        if (!_isShowAni) {
            this.refreshServantRoleImg();
            return;
        }
        var preSkinId = param.data.preSkinId;
        if (preSkinId && preSkinId != "") {
            this.refreshServantRoleImg(preSkinId);
        }
        this._toprefreshNode.alpha = 0;
        this._toprefreshNode2.alpha = 0;
        var servantBlueBg = this._nodeContainer.getChildByName("servantBlueBg");
        var changeDbone = App.DragonBonesUtil.getLoadDragonBones("menke_hz", 1);
        var deltaS = 0.7;
        changeDbone.setScale(deltaS);
        changeDbone.anchorOffsetY = changeDbone.height * deltaS;
        changeDbone.anchorOffsetX = changeDbone.width / 2 * deltaS;
        changeDbone.x = GameConfig.stageWidth / 2;
        changeDbone.y = servantBlueBg.y - 100;
        this._nodeContainer.addChildAt(changeDbone, 3);
        egret.Tween.get(servantBlueBg, { loop: false }).wait(500).call(this.refreshServantRoleImg, this).wait(900).call(function () {
            _this._nodeContainer.removeChild(changeDbone);
            changeDbone.stop();
            changeDbone.dispose();
            changeDbone = null;
        }, this);
        //序列帧
        var skinClip = ComponentManager.getCustomMovieClip("servant_skin_effect", 13, 100);
        var deltaS2 = 2;
        skinClip.width = 320 * deltaS2;
        skinClip.height = 332 * deltaS2;
        skinClip.anchorOffsetY = skinClip.height;
        skinClip.anchorOffsetX = skinClip.width / 2;
        skinClip.blendMode = egret.BlendMode.ADD;
        skinClip.x = GameConfig.stageWidth / 2;
        skinClip.y = servantBlueBg.y + 2;
        this._nodeContainer.addChildAt(skinClip, 3);
        if (skinBtn) {
            skinBtn.touchEnabled = false;
        }
        egret.Tween.get(skinClip, { loop: false }).wait(500).call(function () {
            skinClip.playWithTime(1);
        }, this).wait(1300).call(function () {
            _this._nodeContainer.removeChild(skinClip);
            skinClip = null;
        }, this);
        egret.Tween.get(this._toprefreshNode, { loop: false }).wait(1800).to({ alpha: 1.0 }, 300);
        egret.Tween.get(this._toprefreshNode2, { loop: false }).wait(1800).to({ alpha: 1.0 }, 300).call(function () {
            if (skinBtn) {
                skinBtn.touchEnabled = true;
            }
        }, this);
    };
    ServantInfoView.prototype.switchHandler = function (param) {
        var curS = egret.getTimer();
        if (curS - this._switchDelta < 300) {
            return;
        }
        this._switchDelta = curS;
        if (!this._serverList) {
            this._serverList = Api.servantVoApi.getServantInfoIdListWithSort(Api.otherInfoVoApi.getServantSortId());
        }
        var newserId = "";
        var len = this._serverList.length;
        for (var index = 0; index < len; index++) {
            if (this._serverList[index] == this._servantId) {
                if (param == "left") {
                    if (index == 0) {
                        newserId = this._serverList[len - 1];
                    }
                    else {
                        newserId = this._serverList[index - 1];
                    }
                }
                else if (param == "right") {
                    if (index == len - 1) {
                        newserId = this._serverList[0];
                    }
                    else {
                        newserId = this._serverList[index + 1];
                    }
                }
                break;
            }
        }
        if (newserId && newserId == this._servantId) {
            return;
        }
        this.resetServantId(newserId); //重置门客id
        egret.Tween.get(this._toprefreshNode, { loop: false }).to({ alpha: 0 }, 200).call(this.refreshBaseUIInfo, this).wait(300).to({ alpha: 1 }, 200);
        // this.refreshBaseUIInfo(); //刷新重置id后的基础文本信息& 按钮状态
        var tarPosX1 = this._servantFullImg.x - this._servantFullImg.width / 2 - 20;
        var tarPosX2 = this._servantFullImg.x + GameConfig.stageWidth + this._servantFullImg.width / 2 + 20;
        if (param == "left") {
            tarPosX2 = this._servantFullImg.x - this._servantFullImg.width - 20;
            tarPosX1 = this._servantFullImg.x + GameConfig.stageWidth + this._servantFullImg.width / 2 + 20;
        }
        egret.Tween.get(this._servantRoleNode, { loop: false }).set({ visible: false }).to({ x: tarPosX1 }, 200).wait(100).call(this.refreshServantRoleImg, this).set({ visible: true, x: tarPosX2 }).to({ x: 0 }, 200); //GameConfig.stageWidth/2
    };
    ServantInfoView.prototype.refreshServantRoleImg = function (wear) {
        var serImg = this._servantInfoObj.fullImgPath; //
        if (!wear) {
            wear = Api.servantVoApi.getservantSkinIdInWear(this._servantId);
        }
        if (!Api.switchVoApi.checkCloseBone()) {
            var boneName = undefined;
            var skincfg = null;
            var dagonBonesName = null;
            if (wear && wear != "") {
                skincfg = Config.ServantskinCfg.getServantSkinItemById(wear);
                serImg = skincfg.body;
                if (skincfg && skincfg.bone) {
                    boneName = skincfg.bone + "_ske";
                    dagonBonesName = skincfg.bone;
                }
            }
            else {
                dagonBonesName = Api.servantVoApi.getServantBoneId(this._servantId);
                boneName = dagonBonesName + "_ske";
            }
            if (boneName && RES.hasRes(boneName) && App.CommonUtil.check_dragon()) {
                if (this._servantFullImg) {
                    this._servantFullImg.visible = false;
                }
                if (this._droWifeIcon) {
                    this._droWifeIcon.stop();
                    this._droWifeIcon.dispose();
                    this._droWifeIcon = null;
                }
                this._droWifeIcon = App.DragonBonesUtil.getLoadDragonBones(dagonBonesName);
                this._droWifeIcon.visible = true;
                this._droWifeIcon.setScale(1.1);
                this._droWifeIcon.anchorOffsetY = this._droWifeIcon.height;
                this._droWifeIcon.anchorOffsetX = this._droWifeIcon.width / 2;
                this._droWifeIcon.x = GameConfig.stageWidth / 2;
                this._droWifeIcon.y = this._servantFullImg.y;
                this._servantRoleNode.addChildAt(this._droWifeIcon, 2);
            }
            else {
                if (this._droWifeIcon) {
                    this._droWifeIcon.stop();
                    this._droWifeIcon.dispose();
                    this._droWifeIcon = null;
                }
                this._servantFullImg.setload(serImg); //0611
                this._servantFullImg.visible = true;
            }
        }
        else {
            if (this._droWifeIcon) {
                this._droWifeIcon.stop();
                this._droWifeIcon.dispose();
                this._droWifeIcon = null;
            }
            this._servantFullImg.setload(serImg); //0611
            this._servantFullImg.visible = true;
        }
        //出海相关
        if (Api.switchVoApi.checkOpenExile()) {
            var time = Api.servantExileVoApi.getServantBackTime(this._servantInfoObj.servantId);
            if (time) {
                this._servantExileTF.setVisible(true);
                this._servantExileLogo.setVisible(true);
                var timeStr = App.DateUtil.getFormatBySecondIntoTime(time);
                this._servantExileTF.text = LanguageManager.getlocal("servantExileTime", [timeStr]);
                this._servantExileTF.setPosition(this._servantExileLogo.x + this._servantExileLogo.width / 2 - this._servantExileTF.width / 2, this._servantExileLogo.y + this._servantExileLogo.height + 5);
            }
            else {
                this._servantExileTF.setVisible(false);
                this._servantExileLogo.setVisible(false);
            }
        }
        // this.initServantBg(this._servantId);
    };
    ServantInfoView.prototype.resetServantId = function (newServantId) {
        this._servantId = String(newServantId);
        var servantInfoObj = Api.servantVoApi.getServantObj(this._servantId);
        this._servantInfoObj = servantInfoObj;
        this._curLvNeedGold = GameConfig.config.servantbaseCfg.upgradeNeed[this._servantInfoObj.level - 1];
        this.playEffect(this._servantInfoObj.sound, true);
    };
    /**
     * 左右切换门客后，刷新UI
     */
    ServantInfoView.prototype.refreshBaseUIInfo = function () {
        this.dealBottomTabGroups();
        this.dealSpecialityIcons();
        this._progressBar.setPercentage(this._servantInfoObj.hasexp / this._curLvNeedGold);
        this.refreshServantProTxt();
        this.resreshUITextInfoAndBtnStatus();
    };
    ServantInfoView.prototype.dealBottomTabGroups = function () {
        var tabbarGroup = this._bottomnodeContainer.getChildByName("tabbarGroup");
        if (tabbarGroup) {
            this._bottomnodeContainer.removeChild(tabbarGroup);
        }
        var servantCfg = Config.ServantCfg.getServantItemById(this._servantId);
        var tabName = ["servant_info_tab1", "servant_info_tab2", "servant_info_tab3"];
        if (servantCfg.wifeId) {
            tabName.push("servant_info_tab5");
        }
        if (servantCfg.aura) {
            tabName.push("servant_info_tab4");
        }
        tabbarGroup = ComponentManager.getTabBarGroup(ButtonConst.BTN_TAB, tabName, this.tabBtnClickHandler, this);
        tabbarGroup.setSpace(2);
        tabbarGroup.x = 30;
        tabbarGroup.y = 24;
        tabbarGroup.name = "tabbarGroup";
        this._bottomnodeContainer.addChild(tabbarGroup);
        var bottomH = GameConfig.stageHeigth - this._bottomnodeContainer.y - this.container.y;
        for (var index = 0; index < 5; index++) {
            var tmpNode = this._bottomNodeList[index];
            if (!tmpNode) {
                tmpNode = new BaseDisplayObjectContainer();
                this._bottomNodeList.push(tmpNode);
                tmpNode.visible = false;
                this._bottomnodeContainer.addChild(tmpNode);
            }
            tmpNode.removeChildren();
        }
        this.initBookInfo(this._bottomNodeList[0], bottomH);
        this.iniSkillInfo(this._bottomNodeList[1], bottomH);
        this.initItemsInfo(this._bottomNodeList[2], bottomH);
        this.initWifeInfo(this._bottomNodeList[3], bottomH);
        this.initFourInfo(this._bottomNodeList[4], bottomH);
        if (servantCfg.wifeId) {
            this._bottomNodeList[3].visible = true;
        }
        else {
            this._bottomNodeList[3].visible = false;
        }
        if (!servantCfg.aura) {
            this._bottomNodeList[4].visible = false;
        }
        else {
            this._bottomNodeList[4].visible = true;
        }
        tabbarGroup.selectedIndex = this.param.tab ? parseInt(this.param.tab) : 0;
        this.tabBtnClickHandler({ index: this.param.tab ? parseInt(this.param.tab) : 0 });
    };
    ServantInfoView.prototype.dealSpecialityIcons = function () {
        var servantCfg = GameConfig.config.servantCfg[this._servantId];
        var specialAbility = servantCfg.speciality;
        var len = specialAbility.length > this._specialityIconList.length ? specialAbility.length : this._specialityIconList.length;
        for (var index = 0; index < len; index++) {
            var element = specialAbility[index];
            //图 
            var specialityIcon = this._specialityIconList[index];
            if (!specialityIcon) {
                if (!element) {
                    continue;
                }
                specialityIcon = BaseBitmap.create("servant_speciality" + element);
                specialityIcon.name = "specialityIcon" + index;
                this._specialityIconList.push(specialityIcon);
                this._toprefreshNode.addChild(specialityIcon);
            }
            else {
                if (!element) {
                    specialityIcon.visible = false;
                    continue;
                }
                specialityIcon.visible = true;
                specialityIcon.texture = ResourceManager.getRes("servant_speciality" + element);
            }
            if (specialityIcon) {
                if (PlatformManager.checkIsTextHorizontal()) {
                    specialityIcon.setPosition(3 * GameConfig.stageWidth / 4, 20 + 55 * index);
                }
                else {
                    specialityIcon.x = 520 + 50 * index;
                    specialityIcon.y = 40;
                }
            }
        }
    };
    ServantInfoView.prototype.initBookInfo = function (tmpNode, bottomH) {
        var servantInfoBookItems = new ServantInfoBookItems();
        servantInfoBookItems.init(this._servantId, bottomH);
        tmpNode.addChild(servantInfoBookItems);
        if (Api.rookieVoApi.isInGuiding) {
            var pos = servantInfoBookItems.localToGlobal(servantInfoBookItems.y, 20);
            var layerY = (GameConfig.stage.stageHeight - GameConfig.stageHeigth) * 0.5;
            Api.rookieVoApi.waitingPosY = pos.y + 90 + layerY;
        }
    };
    ServantInfoView.prototype.initWifeInfo = function (tmpNode, bottomH) {
        var servantInfoWifeItem = new ServantInfoWifeItem();
        servantInfoWifeItem.init(this._servantId, bottomH);
        tmpNode.addChild(servantInfoWifeItem);
    };
    ServantInfoView.prototype.iniSkillInfo = function (tmpNode, bottomH) {
        var servantInfoSkillsItem = new ServantInfoSkillsItem();
        servantInfoSkillsItem.init(this._servantId, bottomH);
        tmpNode.addChild(servantInfoSkillsItem);
    };
    ServantInfoView.prototype.initFourInfo = function (tmpNode, bottomH) {
        var servantInfoFourItems = new ServantInfoFourItems();
        servantInfoFourItems.init(this._servantId, bottomH);
        tmpNode.addChild(servantInfoFourItems);
    };
    ServantInfoView.prototype.initItemsInfo = function (tmpNode, bottomH) {
        var servantInfoItems = new ServantInfoItems();
        servantInfoItems.init(this._servantId, bottomH);
        tmpNode.addChild(servantInfoItems);
    };
    /**
     * 检测红点
     */
    ServantInfoView.prototype.checkRedPoints = function () {
        this._servantInfoObj = Api.servantVoApi.getServantObj(this._servantId);
        var skillRedP = this._bottomnodeContainer.getChildByName("skillRedP");
        if (!skillRedP) {
            skillRedP = BaseBitmap.create("public_dot2");
            skillRedP.x = 298;
            skillRedP.y = 24;
            skillRedP.name = "skillRedP";
        }
        this._bottomnodeContainer.addChild(skillRedP);
        skillRedP.visible = this._servantInfoObj.isSkillLvUpEnable();
        var bookRedP = this._bottomnodeContainer.getChildByName("bookRedP");
        if (!bookRedP) {
            bookRedP = BaseBitmap.create("public_dot2");
            bookRedP.x = 150;
            bookRedP.y = 24;
            bookRedP.name = "bookRedP";
        }
        this._bottomnodeContainer.addChild(bookRedP);
        bookRedP.visible = this._servantInfoObj.isBookLvUpEnable();
        var advRedP = this._nodeContainer.getChildByName("advRedP");
        if (!advRedP) {
            advRedP = BaseBitmap.create("public_dot2");
            advRedP.x = this._levelupBtn.x + this._levelupBtn.width - 15;
            advRedP.y = this._levelupBtn.y - 5;
            advRedP.name = "advRedP";
        }
        this._nodeContainer.addChild(advRedP);
        advRedP.visible = this._servantInfoObj.isAdvanceEnable();
        var itemRedP = this._bottomnodeContainer.getChildByName("itemRedP");
        if (!itemRedP) {
            itemRedP = BaseBitmap.create("public_dot2");
            itemRedP.x = 450;
            itemRedP.y = 24;
            itemRedP.name = "itemRedP";
        }
        this._bottomnodeContainer.addChild(itemRedP);
        itemRedP.visible = Api.servantVoApi.isShowRedForItem();
        if (this._servantInfoObj.isServantExile()) {
            itemRedP.visible = false;
        }
        // aura
        var servantCfg = GameConfig.config.servantCfg[this._servantId];
        if (servantCfg.aura) {
            var auraRedP = this._bottomnodeContainer.getChildByName("auraRedP");
            if (!auraRedP) {
                auraRedP = BaseBitmap.create("public_dot2");
                auraRedP.x = 600;
                auraRedP.y = 24;
                auraRedP.name = "auraRedP";
            }
            this._bottomnodeContainer.addChild(auraRedP);
            auraRedP.visible = this._servantInfoObj.isShowRedForaura();
        }
        else {
            var auraRedP = this._bottomnodeContainer.getChildByName("auraRedP");
            if (auraRedP) {
                auraRedP.visible = false;
            }
        }
    };
    ServantInfoView.prototype.changeCheckFlagStatus = function () {
        this._task4ClickTimes = 1;
        this._checkFlag.alpha = (this._checkFlag.alpha + 1) % 2;
        ServantInfoView.CALPHA = this._checkFlag.alpha;
        if (this._checkFlag.alpha == 1) {
            App.CommonUtil.showTip(LanguageManager.getlocal("servantInfo_tenTips2"));
        }
        this.changeProgressText();
        if (Api.rookieVoApi.curGuideKey == "maintask") {
            Api.rookieVoApi.checkNextStep();
        }
    };
    ServantInfoView.prototype.changeProgressText = function () {
        var needGold = (this._curLvNeedGold - this._servantInfoObj.hasexp);
        var cnKey = "servantInfo_levelupNeed";
        var attrInfo = Api.servantVoApi.getDecreePolicyAddAttrInfo();
        var attrStr = "";
        var subNeed = 0;
        var totalSubNeed = 0;
        var deltaT = 0;
        if (attrInfo.lastTimes > 0) {
            subNeed = Math.floor(this._curLvNeedGold * attrInfo.addExtent);
            totalSubNeed += subNeed;
            deltaT++;
        }
        if (this._checkFlag && this._checkFlag.alpha == 1) {
            cnKey = "servantInfo_levelupNeed2";
            var curLv = this._servantInfoObj.level;
            for (var index = curLv; index < curLv + 9; index++) {
                var needNextLv = GameConfig.config.servantbaseCfg.upgradeNeed[index];
                if (needNextLv) {
                    needGold += needNextLv;
                    if (deltaT < attrInfo.lastTimes) {
                        totalSubNeed += Math.floor(needNextLv * attrInfo.addExtent);
                    }
                    deltaT++;
                }
                else {
                    break;
                }
            }
        }
        this._decreeGoldCost = 0;
        if (attrInfo.lastTimes > 0) {
            var keyStr = attrInfo.strKey;
            if (keyStr == "decreeAttrAddTxt0") {
                keyStr = "decreeAttrAddTxt00";
            }
            this._decreeGoldCost = totalSubNeed;
            attrStr = "<font color=0x65eb5d>" + LanguageManager.getlocal(keyStr, [attrInfo.strKey2, "-" + totalSubNeed]) + "</font>";
        }
        this._progressBar.setText(LanguageManager.getlocal(cnKey) + needGold + LanguageManager.getlocal("servantInfo_levelupNeedGold") + attrStr);
    };
    ServantInfoView.prototype.tabBtnClickHandler = function (params) {
        for (var index = 0; index < this._bottomNodeList.length; index++) {
            this._bottomNodeList[index].visible = false;
        }
        var tarIdx = params.index;
        if (tarIdx == 3) {
            var servantCfg = Config.ServantCfg.getServantItemById(this._servantId);
            if (servantCfg.wifeId) {
                this._bottomNodeList[3].visible = true;
            }
            else {
                this._bottomNodeList[3].visible = false;
            }
            if (servantCfg.aura) {
                this._bottomNodeList[4].visible = true;
            }
            else {
                this._bottomNodeList[4].visible = false;
            }
        }
        else {
            this._bottomNodeList[tarIdx].visible = true;
        }
    };
    ServantInfoView.prototype.getProStringWithProId = function (id) {
        if (!this._servantInfoObj) {
            return;
        }
        if (id == 1) {
            return String(this._servantInfoObj.level); //LanguageManager.getlocal("servant_flagColorTxt"+this._servantInfoObj.clv,[String(this._servantInfoObj.level)]);
        }
        if (id == 3) {
            return LanguageManager.getlocal("servant_infoAttr") + App.StringUtil.changeIntToText(this._servantInfoObj.total);
        }
        if (id == 4) {
            return App.StringUtil.changeIntToText(this._servantInfoObj.attrVo.forceTotal); //LanguageManager.getlocal("servant_force",[String(this._servantInfoObj.attrVo.forceTotal)]) ;
        }
        if (id == 5) {
            return App.StringUtil.changeIntToText(this._servantInfoObj.attrVo.brainsTotal); //LanguageManager.getlocal("servant_inte",[String(this._servantInfoObj.attrVo.brainsTotal)]);
        }
        if (id == 6) {
            return App.StringUtil.changeIntToText(this._servantInfoObj.attrVo.politicsTotal);
        }
        if (id == 7) {
            return App.StringUtil.changeIntToText(this._servantInfoObj.attrVo.charmTotal); //LanguageManager.getlocal("servant_charm",[String(this._servantInfoObj.attrVo.charmTotal)]);
        }
        return "";
    };
    /**刷新基础的文本和按钮状态 */
    ServantInfoView.prototype.resreshUITextInfoAndBtnStatus = function () {
        if (this._servantInfoObj.clv > 0) {
            this._alvImg.setload("servant_alv_" + this._servantInfoObj.clv);
            this._alvImg.visible = true;
            if (!PlatformManager.checkIsTextHorizontal()) {
                this._nameTxt.y = this._alvImg.y + 90;
            }
            // this._servant_levebg.setload("servant_levebg" + this._servantInfoObj.clv);
        }
        else {
            if (!PlatformManager.checkIsTextHorizontal()) {
                this._nameTxt.y = this._alvImg.y + 60;
            }
            this._alvImg.visible = false;
            // this._servant_levebg.setload("servant_levebg");
        }
        this._lvText.text = LanguageManager.getlocal("servant_infoLv"); //LanguageManager.getlocal("servant_flagColorTxt"+(this._servantInfoObj.clv),[LanguageManager.getlocal("servant_infoLv")]);
        this._nameTxt.text = LanguageManager.getlocal("servant_name" + this._servantId);
        this._nameTxt.textColor = ServantScrollItem.getQualityColor(this._servantInfoObj.clv);
        if (PlatformManager.checkIsEnLang()) {
            this._nameBg.width = this._nameTxt.width + 50;
            // this._nameBg.x = this._nodeContainer.width/2 - this._nameBg.width/2;
            // this._nameBg.y = this._nodeContainer.height - 225 - this._nameBg.height/2;
        }
        this._goldNumTxt.text = Api.playerVoApi.getPlayerGoldStr();
        this._servantInfoObj = Api.servantVoApi.getServantObj(this._servantId);
        this._curLvNeedGold = GameConfig.config.servantbaseCfg.upgradeNeed[this._servantInfoObj.level - 1];
        //400级以上，不显示十连升，显示道具数量。
        if (this._servantInfoObj.clv > Config.ServantBaseCfg.commonMaxClv()) {
            if (this._checkFlag) {
                var tenText = this._nodeContainer.getChildByName("tenText");
                tenText.dispose();
                var probg = this._nodeContainer.getChildByName("probg");
                probg.dispose();
                this._checkFlag.dispose();
                this._checkFlag = null;
            }
            if (!this._danshuText) {
                var danshuSp = BaseLoadBitmap.create("servant_item1740");
                danshuSp.x = 480;
                danshuSp.y = 455;
                danshuSp.name = "danshuSp";
                this._nodeContainer.addChild(danshuSp);
                this._danshuText = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_TITLE_SMALL);
                this._danshuText.setPosition(danshuSp.x + 60, danshuSp.y + 18);
                this._nodeContainer.addChild(this._danshuText);
            }
            var itemNum = Api.itemVoApi.getItemNumInfoVoById(Config.ServantBaseCfg.getDanShuID());
            var needNum = Config.ServantBaseCfg.getLvUpNeedItemNum(this._servantInfoObj.level);
            this._danshuText.text = itemNum + "/" + needNum;
            if (itemNum >= needNum) {
                this._danshuText.textColor = TextFieldConst.COLOR_LIGHT_YELLOW;
            }
            else {
                this._danshuText.textColor = TextFieldConst.COLOR_WARN_RED;
            }
        }
        else {
            if (this._danshuText) {
                var danshuSp = this._nodeContainer.getChildByName("danshuSp");
                danshuSp.dispose();
                this._danshuText.dispose();
                this._danshuText = null;
            }
            if (!this._checkFlag) {
                //勾选底
                var probg = BaseBitmap.create("hold_dinner_box");
                probg.x = 480;
                probg.y = 465;
                probg.name = "probg";
                this._nodeContainer.addChild(probg);
                //连升十级
                var tenTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL);
                tenTxt.textColor = TextFieldConst.COLOR_LIGHT_YELLOW;
                tenTxt.text = LanguageManager.getlocal("servantInfo_tenTips");
                tenTxt.x = 525;
                tenTxt.y = 470;
                tenTxt.size = 24;
                tenTxt.name = "tenText";
                this._nodeContainer.addChild(tenTxt);
                this._checkFlag = BaseLoadBitmap.create("hold_dinner_check");
                this._checkFlag.width = this._checkFlag.height = 38;
                this._checkFlag.x = 480;
                this._checkFlag.y = tenTxt.y - 10;
                this._checkFlag.alpha = ServantInfoView.CALPHA;
                this._nodeContainer.addChild(this._checkFlag);
                this._checkFlag.addTouchTap(this.changeCheckFlagStatus, this);
                this.changeProgressText();
            }
        }
        this.changeProgressText();
        this.changeLvBtnStatus();
        this.checkRedPoints();
    };
    //升级之后刷新数据
    ServantInfoView.prototype.refreshInfoAfterUpdate = function (p) {
        Api.rookieVoApi.checkNextStep();
        this.resreshUITextInfoAndBtnStatus();
        var newPer = this._servantInfoObj.hasexp / this._curLvNeedGold;
        var oldPer = this._progressBar.getPercent();
        var deltaT = 500;
        if (this._oldLv < this._servantInfoObj.level) {
            var addLv = this._servantInfoObj.level - this._oldLv;
            egret.Tween.get(this._progressBar, { loop: false }).to({ percent: 1 }, (1 - oldPer) * deltaT).set({ percent: 0 }, 0).to({ percent: newPer }, deltaT * newPer);
            if (p.data.ret == true && p.data.data.data.lucky) {
                App.CommonUtil.showGodbless("servantLv");
            }
            this.showUpgradeEffect(addLv);
        }
        else {
            egret.Tween.get(this._progressBar, { loop: false }).to({ percent: newPer }, (newPer - oldPer) * deltaT);
        }
        //功能解锁
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_REFRESH_FUNCTION_TXT);
    };
    ServantInfoView.prototype.changeLvBtnStatus = function () {
        if (this._servantInfoObj.isLvEnableForAdvance()) {
            this._levelupBtn.setText("servant_clvUpBtn");
        }
        else {
            this._levelupBtn.setText("servantInfoLevelup");
        }
        if (this._servantInfoObj.isAdvanceEnable()) {
            App.DisplayUtil.changeToNormal(this._levelupBtn);
        }
        else {
            // if(this._curLvNeedGold - this._servantInfoObj.hasexp - this._decreeGoldCost > Api.playerVoApi.getPlayerGold() || this._servantInfoObj.isAtTopLv() ){
            var needGold = (this._curLvNeedGold - this._servantInfoObj.hasexp);
            if ((Api.playerVoApi.getPlayerGold() == 0 && needGold > 0) || this._servantInfoObj.isAtTopLv()) {
                App.DisplayUtil.changeToGray(this._levelupBtn);
            }
            else {
                App.DisplayUtil.changeToNormal(this._levelupBtn);
            }
        }
    };
    ServantInfoView.prototype.refreshServantProTxt = function () {
        for (var index = 0; index < this._servantProCfg.length; index++) {
            var element = this._servantProCfg[index];
            var proTxt = this._proTxtList[index];
            proTxt.text = this.getProStringWithProId(element.txtId);
        }
        this.checkRedPoints();
    };
    //播放升级成功动画
    ServantInfoView.prototype.showUpgradeEffect = function (addLv) {
        SoundManager.playEffect(SoundConst.EFFECT_UPD);
        var servant_upgrade_word = ComponentManager.getBitmapText(LanguageManager.getlocal("servant_xLv", [String(addLv)]), TextFieldConst.FONTNAME_BOSS_SCORE, TextFieldConst.COLOR_LIGHT_YELLOW, TextFieldConst.FONTSIZE_TITLE_BIG);
        servant_upgrade_word.x = 240;
        servant_upgrade_word.y = 200;
        var upgradeClip = ComponentManager.getCustomMovieClip("servant_upgrade_frame", 5, 100);
        upgradeClip.setScale(2);
        upgradeClip.x = 110;
        upgradeClip.y = 20;
        this._toprefreshNode.addChild(upgradeClip);
        upgradeClip.playWithTime(1);
        var txtBg = null;
        var offsetY = 0;
        if (PlatformManager.checkIsThSp()) {
            var clip = BaseBitmap.create("servant_upgrade_frame1");
            servant_upgrade_word.x = upgradeClip.x + clip.width - servant_upgrade_word.width / 2;
            servant_upgrade_word = servant_upgrade_word;
            servant_upgrade_word.bold = true;
            txtBg = BaseLoadBitmap.create("public_9_powertipbg2");
            txtBg.height = 49;
            txtBg.width = servant_upgrade_word.width + 90;
            txtBg.setPosition(servant_upgrade_word.x + servant_upgrade_word.width / 2 - txtBg.width / 2, servant_upgrade_word.y + servant_upgrade_word.height / 2 - txtBg.height / 2);
            this._toprefreshNode.addChild(txtBg);
            offsetY = txtBg.y - 50;
        }
        this._toprefreshNode.addChild(servant_upgrade_word);
        egret.Tween.get(servant_upgrade_word, { loop: false }).to({ y: 150 }, 800).to({ alpha: 0 }, 100);
        if (txtBg) {
            egret.Tween.get(txtBg, { loop: false }).to({ y: offsetY }, 800).to({ alpha: 0 }, 100);
        }
        var tmpthis = this;
        egret.Tween.get(this, { loop: false }).wait(500).call(function () {
            tmpthis._goldNumTxt.text = Api.playerVoApi.getPlayerGoldStr();
            //字体刷新加个延时
            tmpthis.refreshServantProTxt();
            tmpthis._toprefreshNode.removeChild(upgradeClip);
            upgradeClip = null;
            tmpthis._toprefreshNode.removeChild(servant_upgrade_word);
            servant_upgrade_word = null;
            if (txtBg) {
                tmpthis._toprefreshNode.removeChild(txtBg);
            }
        });
    };
    ServantInfoView.prototype.detailClickHandler = function () {
        if (Api.rookieVoApi.getIsGuiding()) {
            return;
        }
        if (Api.switchVoApi.checkBiography()) {
            ViewController.getInstance().openView(ViewConst.POPUP.SERVANTATTRDETAILSPOPUPVIEW, this._servantId);
        }
        else {
            ViewController.getInstance().openView(ViewConst.POPUP.SERVANTATTRDETAILPOPUPVIEW, this._servantId);
        }
    };
    ServantInfoView.prototype.levelupBtnClickHandler = function () {
        if (this._servantInfoObj.isLvEnableForAdvance()) {
            if (this._servantInfoObj.clv >= Config.ServantBaseCfg.commonMaxClv()) {
                if (Api.playerVoApi.getPlayerLevel() < 14) {
                    App.CommonUtil.showTip(LanguageManager.getlocal("servantInfo_levelupTip5"));
                    return;
                }
            }
            ViewController.getInstance().openView(ViewConst.POPUP.SERVANTADVANCEPOPUPVIEW, this._servantId);
            return;
        }
        var newT = egret.getTimer();
        if (newT - this._lastUseTime < 800) {
            return;
        }
        this._lastUseTime = newT;
        if (this._servantInfoObj.isAtTopLv()) {
            App.CommonUtil.showTip(LanguageManager.getlocal("servantInfo_levelupTip1"));
            return;
        }
        // if(this._curLvNeedGold - this._servantInfoObj.hasexp - this._decreeGoldCost > Api.playerVoApi.getPlayerGold()){
        this._task4ClickTimes = 2;
        this._oldLv = this._servantInfoObj.level;
        if (this._oldLv >= Config.ServantBaseCfg.commonMaxLv()) {
            var needGold = (this._curLvNeedGold - this._servantInfoObj.hasexp);
            var itemNum = Api.itemVoApi.getItemNumInfoVoById(Config.ServantBaseCfg.getDanShuID());
            var needNum = Config.ServantBaseCfg.getLvUpNeedItemNum(this._servantInfoObj.level);
            if (needGold <= 0 && (itemNum < needNum)) {
                App.CommonUtil.showTip(LanguageManager.getlocal("servantInfo_levelupTip4"));
                return;
            }
            if (Api.playerVoApi.getPlayerGold() == 0 && needGold > 0) {
                App.CommonUtil.showTip(LanguageManager.getlocal("servantInfo_levelupTip3"));
                //需要判断资源是否足够当前银两不足，提示：银两不足 servantInfo_levelupTip3
                return;
            }
            NetManager.request(NetRequestConst.REQUEST_UPGRADE_SERVANT, { servantId: this._servantId });
        }
        else {
            if (Api.playerVoApi.getPlayerGold() == 0) {
                App.CommonUtil.showTip(LanguageManager.getlocal("servantInfo_levelupTip3"));
                //需要判断资源是否足够当前银两不足，提示：银两不足 servantInfo_levelupTip3
                return;
            }
            if (this._checkFlag.alpha == 0) {
                NetManager.request(NetRequestConst.REQUEST_UPGRADE_SERVANT, { servantId: this._servantId });
            }
            else {
                NetManager.request(NetRequestConst.REQUEST_UPGRADE_SERVANT_TEN, { servantId: this._servantId });
            }
        }
    };
    ServantInfoView.prototype.hide = function () {
        if (Api.rookieVoApi.isEnRookie()) {
            Api.rookieVoApi.checkNextStep();
        }
        if (Api.rookieVoApi.isInGuiding) {
            Api.rookieVoApi.checkWaitingGuide();
            ViewController.getInstance().getView(ViewConst.COMMON.SERVANTVIEW).hide();
        }
        _super.prototype.hide.call(this);
    };
    ServantInfoView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "servant_topresbg", "servant_probigbg", "servant_detailBtn", "servant_bottombg", "progress3", "progress3_bg", "servant_namebg",
            "servant_infoPro1", "servant_infoPro2", "servant_infoPro3", "servant_infoPro4", "servant_upgrade_frame", "levelup_lizi", "levelup_lizi_json",
            "servant_mask", "servant_alv_namebg", "guide_hand", "servant_downbg", "servant_attribute1",
            "servant_attribute2", "servant_attribute3", "servant_attribute4", "servant_attributemap",
            "servant_speciality1", "servant_speciality2", "servant_speciality3", "servant_speciality4",
            "servant_speciality5", "servant_speciality6", "hold_dinner_box", "guide_hand", "servant_skinBtn", "servant_skinBtn_down", "servant_skin_effect",
            "servant_star", "servant_aura_down", "servant_aura"
        ]);
    };
    ServantInfoView.prototype.showHand = function () {
        this._clickHand = BaseBitmap.create("guide_hand");
        if (!PlatformManager.hasSpcialCloseBtn() || PlatformManager.checkIsQQGameSp()) {
            this._clickHand.skewY = 180;
        }
        this._clickHand.x = PlatformManager.hasSpcialCloseBtn() ? 57 : 620;
        this._clickHand.y = 50;
        this.addChild(this._clickHand);
        egret.Tween.get(this._clickHand, { loop: true })
            .to({ scaleX: 0.9, scaleY: 0.9 }, 500)
            .to({ scaleX: 1, scaleY: 1 }, 500);
    };
    /**初始化背景图 */
    ServantInfoView.prototype.initServantBg = function (servantId) {
        var skinId = Api.servantVoApi.getservantSkinIdInWear(this._servantId);
        if (skinId) {
            this.refreshServantBg(skinId);
        }
        else {
            this.refreshServantBg(null);
        }
    };
    /**刷新背景图 */
    ServantInfoView.prototype.refreshServantBg = function (skinId) {
        this._bgContainer.removeChildren();
        var dg = this._servantRoleNode.getChildByName("dragon_1");
        if (dg) {
            this._servantRoleNode.removeChild(dg);
            dg.dispose();
        }
        if (skinId) {
            var skinCfg = Config.ServantskinCfg.getServantSkinItemById(skinId);
            if (skinCfg.servantBg) {
                var servant_infobg = BaseLoadBitmap.create("servantbg_bg_" + skinCfg.servantBg);
                servant_infobg.width = 640;
                servant_infobg.height = 580;
                this._bgContainer.addChild(servant_infobg);
                switch (skinCfg.servantBg) {
                    //大背景
                    case 1://有龙骨
                        var depth_1 = 0;
                        if (this._droWifeIcon) {
                            depth_1 = this._servantRoleNode.getChildIndex(this._droWifeIcon);
                        }
                        else {
                            depth_1 = this._servantRoleNode.getChildIndex(this._servantFullImg);
                        }
                        var dragon_1 = App.DragonBonesUtil.getLoadDragonBones("servantskinauraman_bg_" + skinCfg.servantBg);
                        dragon_1.setPosition(this._servantFullImg.x, this._servantFullImg.y);
                        dragon_1.name = "dragon_1";
                        this._servantRoleNode.addChildAt(dragon_1, depth_1 + 2);
                        break;
                    case 2://有龙骨
                        var depth_2 = 0;
                        if (this._droWifeIcon) {
                            depth_2 = this._servantRoleNode.getChildIndex(this._droWifeIcon);
                        }
                        else {
                            depth_2 = this._servantRoleNode.getChildIndex(this._servantFullImg);
                        }
                        var dragon = App.DragonBonesUtil.getLoadDragonBones("servantskinauraman_bg_" + skinCfg.servantBg);
                        dragon.setPosition(this._servantFullImg.x, this._servantFullImg.y);
                        dragon.name = "dragon_1";
                        this._servantRoleNode.addChildAt(dragon, depth_2 + 2);
                        break;
                }
            }
            else {
                var servant_infobg = BaseLoadBitmap.create("servant_infobg");
                servant_infobg.width = 640;
                servant_infobg.height = 580;
                this._bgContainer.addChild(servant_infobg);
            }
        }
        else {
            var servant_infobg = BaseLoadBitmap.create("servant_infobg");
            servant_infobg.width = 640;
            servant_infobg.height = 580;
            this._bgContainer.addChild(servant_infobg);
        }
    };
    ServantInfoView.prototype.tick = function () {
        if (Api.mainTaskVoApi.getCurMainTaskId() == "4" && this._servantId == "1001" && this._servantInfoObj.level < 10) {
            if (!this._clickHand) {
                this.showHand();
            }
            if (this._checkFlag.alpha == 0 && this._task4ClickTimes == 0) {
                this._clickHand.x = this._checkFlag.x + 30;
                this._clickHand.y = this._checkFlag.y + 10 + this.container.y;
            }
            else {
                this._clickHand.x = this._levelupBtn.x + 70;
                this._clickHand.y = this._levelupBtn.y + 10 + this.container.y;
            }
            if (this._task4ClickTimes >= 2) {
                this._clickHand.visible = false;
            }
        }
        else {
            if (!Api.rookieVoApi.isInGuiding && this._clickHand) {
                this._clickHand.visible = false;
            }
        }
        return true;
    };
    ServantInfoView.prototype.dispose = function () {
        Api.mainTaskVoApi.hideGuide();
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_UPGRADE_SERVANT), this.refreshInfoAfterUpdate, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_UPGRADE_SERVANT_TEN), this.refreshInfoAfterUpdate, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_USE_ITEM), this.refreshServantProTxt, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_SERVANT_CHANGE), this.refreshInfoAfterUpdate, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_SERVANT_UPABILITY), this.refreshServantProTxt, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_SERVANT_UPSKILL), this.refreshServantProTxt, this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_GUIDE_SHOWHAND, this.showHand, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_SERVANT_UPAURA), this.refreshServantProTxt, this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_REFRESH_SERVANT_ITEMLIST, this.checkRedPoints, this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_FROM_SERVANT_SKIN, this.backFromServantSkin, this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_SERVANTSKIN_AURA, this.backFromServantAuraSkin, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_UPGRADE_SERVANT_UPSKILLABILITY), this.refreshServantProTxt, this);
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_SERVANTBONE);
        this._nodeContainer = null;
        this._goldNumTxt = null;
        this._servantId = "";
        this.param = null;
        this._leveupNeedTxt = null;
        this._servantInfoObj = null;
        this._proTxtList = null;
        this._servantProCfg = null;
        this._progressBar = null;
        this._checkFlag = null;
        this._bottomNodeList = [];
        this._bottomBg = null;
        this._levelupBtn = null;
        this._nameTxt = null;
        this._nameBg = null;
        this._alvImg = null;
        this._oldLv = null;
        this._bottomnodeContainer = null;
        this._curLvNeedGold = null;
        this._lastUseTime = 0;
        this._clickHand = null;
        this._serverList = null;
        this._servantFullImg = null;
        this._lvText = null;
        this._serverList = null;
        this._specialityIconList = [];
        this._switchDelta = 0;
        this._decreeGoldCost = 0;
        this._task4ClickTimes = 0;
        if (this._clickHand) {
            egret.Tween.removeTweens(this._clickHand);
            this._clickHand = null;
        }
        if (this._droWifeIcon) {
            this._droWifeIcon.stop();
            this._droWifeIcon.dispose();
            this._droWifeIcon = null;
        }
        this._toprefreshNode2 = null;
        this._servantExileLogo = null;
        this._servantExileTF = null;
        this._servant_levebg = null;
        this._danshuText = null;
        this._bgContainer = null;
        _super.prototype.dispose.call(this);
    };
    ServantInfoView.CALPHA = 0;
    ServantInfoView.WALPHA = 0;
    return ServantInfoView;
}(CommonView));
__reflect(ServantInfoView.prototype, "ServantInfoView");
//# sourceMappingURL=ServantInfoView.js.map