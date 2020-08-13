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
 * 用户信息主界面
 * author dmj
 * date 2017/9/18
 * @class PlayerView
 */
var PlayerView = (function (_super) {
    __extends(PlayerView, _super);
    function PlayerView() {
        var _this = _super.call(this) || this;
        _this._changeVTxtList = [];
        _this._mainTaskHandKey = null;
        _this._upArrow = null;
        _this._nextOffice = null;
        _this._curTitleId = '';
        _this._curLevel = 1;
        _this._isLvUp = false;
        return _this;
    }
    Object.defineProperty(PlayerView.prototype, "uiType", {
        get: function () {
            return "2";
        },
        enumerable: true,
        configurable: true
    });
    PlayerView.prototype.getContainerY = function () {
        return 14;
    };
    PlayerView.prototype.getBigFrame = function () {
        return null;
    };
    PlayerView.prototype.initView = function () {
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_RESCHANGE_REFRESH_UI, this.refreshUpgradeClip, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_USER_UPGRADE), this.refreshInfoAfterUpgrade, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_CHECK_FUNCTION_OPEN, this.freshOpenFunc, this);
        Api.mainTaskVoApi.checkShowGuide();
        // SoundManager.playEffect(SoundConst.EFFECT_WIFE);
        //自己管理自己的节点
        this._nodeContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(this._nodeContainer);
        this._bottomnodeContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(this._bottomnodeContainer);
        var bg0 = BaseLoadBitmap.create("playerview_bg2");
        bg0.width = 640;
        bg0.height = 595;
        bg0.y = -20;
        this._nodeContainer.addChild(bg0);
        var curLv = Api.playerVoApi.getPlayerLevel();
        var posX = 20;
        var titleinfo = Api.playerVoApi.getTitleInfo();
        var titleCfg = Config.TitleCfg;
        var titleconfig = titleCfg.getTitleCfgById(titleinfo.clothes);
        if (titleconfig && titleconfig.isTitle == 1 && (titleconfig.titleType == 1 || titleconfig.titleType == 2 || titleconfig.titleType == 7)) {
            this._curTitleId = titleinfo.clothes;
            this._curLevel = titleinfo.clv;
            if (this._curLevel == 0) {
                this._curLevel = 1;
            }
        }
        var pic = Api.playerVoApi.getPlayePicId();
        // if (titleinfo && titleinfo.clothes && Config.TitleCfg.checkHasSpecialHead(titleinfo.clothes))
        // {
        // 	pic = Config.TitleCfg.getSpecialHead(titleinfo.clothes,pic);
        // }
        if (Api.playerVoApi.getTitleid(2) > 0) {
            curLv = Api.playerVoApi.getTitleid(2);
            var isnew = Api.playerVoApi.getNewPalaceRole(curLv) || Config.TitleCfg.isTheKingTitleId(this._curTitleId);
            posX = isnew ? -170 : -10;
        }
        var userContainer = null;
        if (this._curTitleId) {
            userContainer = new BaseDisplayObjectContainer();
            var isnew = Api.playerVoApi.getNewPalaceRole(curLv) || Config.TitleCfg.isTheKingTitleId(this._curTitleId);
            userContainer.mask = egret.Rectangle.create().setTo(isnew ? 170 : 10, -38, 640, 410);
            userContainer.x = posX;
            userContainer.y = 20;
            userContainer.name = "userContainer";
            this._nodeContainer.addChild(userContainer);
            var role = null;
            var myHair = null;
            var tcfg = Config.TitleCfg.getTitleCfgById(this._curTitleId);
            var resPath = "palace_db_" + this._curTitleId + (tcfg.titleType == 7 ? "_" + Api.playerVoApi.getUserSex(pic) : "");
            if ((!Api.switchVoApi.checkCloseBone()) && App.CommonUtil.check_dragon() && ResourceManager.hasRes(resPath + "_ske")) {
                role = App.CommonUtil.getPlayerDragonRole(this._curTitleId, pic, this._curLevel);
                role.x = 340;
                role.y = 35;
                userContainer.addChild(role);
                role.name = 'role';
                // myHead.setPosition(273,0);
                // myHair.setPosition(296.5,0);
            }
            else {
                role = Api.playerVoApi.getPlayerPortrait(Number(this._curTitleId), pic, 0, false, null, null, this._curLevel);
                if (Config.TitleCfg.isTheKingTitleId(this._curTitleId)) {
                    userContainer.x = -10;
                    userContainer.mask = egret.Rectangle.create().setTo(10, -38, 640, 410);
                }
                userContainer.addChild(role);
            }
        }
        else {
            userContainer = Api.playerVoApi.getMyPortrait();
            userContainer.x = posX;
            userContainer.name = "userContainer";
            this._nodeContainer.addChild(userContainer);
        }
        var fanImg = BaseBitmap.create("playerview_name_bg");
        fanImg.x = GameConfig.stageWidth - fanImg.width - 20;
        fanImg.y = 160;
        this._nodeContainer.addChild(fanImg);
        var temX = fanImg.x + 65;
        var temY = fanImg.y;
        var nameTF = ComponentManager.getTextField(Api.playerVoApi.getPlayerName(), TextFieldConst.FONTSIZE_TITLE_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        // nameTF.border = true;
        nameTF.stroke = 1;
        nameTF.borderColor = TextFieldConst.COLOR_BLACK;
        nameTF.x = temX; // - nameTF.width/2;
        nameTF.y = temY + 7;
        this._nodeContainer.addChild(nameTF);
        var uidStr = LanguageManager.getlocal("uidTitle") + ":" + Api.playerVoApi.getPlayerID();
        var uidTF = ComponentManager.getTextField(uidStr, 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        uidTF.x = nameTF.x;
        uidTF.y = nameTF.y + nameTF.height + 5;
        this._nodeContainer.addChild(uidTF);
        var allName = Api.playerVoApi.getPlayerAllianceName();
        if (allName == "") {
            allName = LanguageManager.getlocal("allianceRankNoAlliance");
        }
        var alliStr = LanguageManager.getlocal("acRank_myAlliancenick");
        var allianceTxt = ComponentManager.getTextField(alliStr + allName, 20, TextFieldConst.COLOR_WARN_YELLOW);
        allianceTxt.x = nameTF.x;
        allianceTxt.y = uidTF.y + uidTF.height + 5;
        this._nodeContainer.addChild(allianceTxt);
        var poStr = LanguageManager.getlocal("playerview_Nopo");
        var po = Api.allianceVoApi.getMyAllianceVo().po;
        if (po > 0) {
            poStr = LanguageManager.getlocal("allianceMemberPo" + po);
        }
        var alliancePoTxt = ComponentManager.getTextField(LanguageManager.getlocal("alliance_po") + ": " + poStr, 20, TextFieldConst.COLOR_WARN_YELLOW);
        alliancePoTxt.x = nameTF.x;
        alliancePoTxt.y = allianceTxt.y + allianceTxt.height + 5;
        this._nodeContainer.addChild(alliancePoTxt);
        if (Api.playerVoApi.getPlayerVipLevel() > 0) {
            // let vipbg = BaseBitmap.create("playerview_wipbg")
            // vipbg.x = nameTF.x;
            // vipbg.y = fanImg.y - 37;
            // vipbg.scaleY = 1.3;
            // this._nodeContainer.addChild(vipbg);
            var vipIcon = Api.vipVoApi.getVipIcon2(Api.playerVoApi.getPlayerVipLevel());
            // vipImg.setScale(0.7)
            vipIcon.setPosition(fanImg.x + (fanImg.width - vipIcon.width) / 2, fanImg.y - vipIcon.height - 5);
            this._nodeContainer.addChild(vipIcon);
        }
        //底部需要往上移动
        var promoDeltaH = 0;
        var probgPath = "playerview_probg";
        var powerimgPath = "playerview_power_img";
        var _bContainerY = GameConfig.stageHeigth - this.container.y - 466 - 10;
        var btHeight = 0;
        {
            promoDeltaH = 30 * 2;
            powerimgPath = "player_power1";
        }
        btHeight = PlayerBottomUI.getInstance().showHeight;
        _bContainerY = GameConfig.stageHeigth - this.container.y - 456 - btHeight;
        var btY = bg0.y + bg0.height;
        this._bottomnodeContainer.y = _bContainerY; //-promoDeltaH
        var playerview_powerbg = BaseBitmap.create("playerview_powerbg");
        playerview_powerbg.x = 30;
        playerview_powerbg.y = this._bottomnodeContainer.y - 60;
        this._nodeContainer.addChild(playerview_powerbg);
        var myPowerImg = BaseBitmap.create(powerimgPath);
        myPowerImg.x = playerview_powerbg.x + 30;
        myPowerImg.y = playerview_powerbg.y + 20;
        this._nodeContainer.addChild(myPowerImg);
        var titleText1 = ComponentManager.getTextField("" + Api.playerVoApi.getPlayerPower(), 24, TextFieldConst.COLOR_LIGHT_YELLOW);
        titleText1.name = "powerTxt";
        titleText1.x = myPowerImg.x + myPowerImg.width + 5;
        titleText1.y = myPowerImg.y + myPowerImg.height / 2 - titleText1.height / 2;
        this._nodeContainer.addChild(titleText1);
        //下部信息部分
        var bottomInfoX = bg0.x + 29;
        var bottomInfoY = 0;
        var playerview_probg = BaseBitmap.create(probgPath);
        playerview_probg.x = 0;
        playerview_probg.y = bottomInfoY;
        var servant_mask = BaseBitmap.create("servant_mask");
        servant_mask.width = GameConfig.stageWidth;
        servant_mask.y = playerview_probg.y + playerview_probg.height - servant_mask.height;
        this._bottomnodeContainer.addChild(servant_mask);
        this._bottomnodeContainer.addChild(playerview_probg);
        var proPosY = playerview_probg.y + 15;
        var proPosX = GameConfig.stageWidth / 2;
        for (var index = 1; index <= 6; index++) {
            // let tmpprocfg = proCfg[index-1]; tmpprocfg.proValue
            var proText = ComponentManager.getTextField("", 20, TextFieldConst.COLOR_LIGHT_YELLOW);
            proText.name = "proText" + index;
            var ModT = 0;
            if (index == 1 || index == 4) {
                ModT = -1;
            }
            else if (index == 3 || index == 6) {
                ModT = 1;
            }
            proPosX = GameConfig.stageWidth / 2 + ModT * 180;
            if (index % 4 == 0) {
                proPosY += 25;
            }
            var img = BaseBitmap.create("playerview_pro" + index);
            if (Api.switchVoApi.checkIsInBlueWife() && RES.hasRes("playerview_pro" + index + "_blueType")) {
                img.setRes("playerview_pro" + index + "_blueType");
            }
            img.x = proPosX - img.width - 5;
            img.y = proPosY;
            this._bottomnodeContainer.addChild(img);
            proText.x = proPosX;
            proText.y = img.y + 2;
            // proText.y = img.y + img.height/2 - proText.height/2 ;
            this._bottomnodeContainer.addChild(proText);
        }
        this.refreshProTxt();
        var bottomBg = BaseBitmap.create("public_9_bg22");
        bottomBg.x = 0;
        bottomBg.y = playerview_probg.y + 75;
        // bottomBg.height = GameConfig.stageHeigth - this._bottomnodeContainer.y  - this.container.y - btHeight+promoDeltaH;//-20;
        bottomBg.height = GameConfig.stageHeigth - this._bottomnodeContainer.y - this.container.y - btHeight; //-20;
        this._bottomnodeContainer.addChild(bottomBg);
        var innerbg = BaseBitmap.create("public_9_bg43");
        innerbg.width = 600;
        // innerbg.height = 364+promoDeltaH;
        innerbg.height = bottomBg.height - 40;
        innerbg.x = 20;
        innerbg.y = bottomBg.y + 20;
        this._bottomnodeContainer.addChild(innerbg);
        var officeImg = BaseBitmap.create("playerview_pro_inmg2");
        officeImg.y = innerbg.y + 8;
        officeImg.name = "officeImg";
        this._bottomnodeContainer.addChild(officeImg);
        var officeTF = ComponentManager.getBitmapText(Api.playerVoApi.getPlayerOffice(), "office_fnt", 0xfff000);
        // ComponentManager.getTextField(Api.playerVoApi.getPlayerOffice(),24,TextFieldConst.COLOR_BLACK);
        officeTF.name = "officeTF";
        officeTF.y = officeImg.y + officeImg.height / 2 - officeTF.height / 2 - 5;
        if (PlatformManager.checkIsThSp() || PlatformManager.checkIsRuSp()) {
            officeTF.y += 5;
        }
        this._bottomnodeContainer.addChild(officeTF);
        this._upArrow = BaseBitmap.create("decree_arrow1");
        this._upArrow.setScale(0.65);
        this._upArrow.rotation = -90;
        this._upArrow.y = officeImg.y + officeImg.height / 2 + this._upArrow.height / 2 - 10;
        this._bottomnodeContainer.addChild(this._upArrow);
        this._nextOffice = ComponentManager.getBitmapText("", "office_fnt", 0xfff000);
        this._nextOffice.y = officeTF.y;
        this._bottomnodeContainer.addChild(this._nextOffice);
        var nextLvCfg = Config.LevelCfg.getCfgByLevel((Api.playerVoApi.getPlayerLevel() + 1).toString());
        var posXX = 0;
        if (nextLvCfg) {
            this._nextOffice.text = Api.playerVoApi.getPlayerOfficeByLevel(Api.playerVoApi.getPlayerLevel() + 1);
            posXX = GameConfig.stageWidth / 2 - (officeImg.width + officeTF.width + this._upArrow.width * this._upArrow.scaleX + this._nextOffice.width + 15) / 2;
        }
        else {
            this._upArrow.visible = false;
            posXX = GameConfig.stageWidth / 2 - (officeImg.width + officeTF.width + 5) / 2;
        }
        officeImg.x = posXX;
        officeTF.x = officeImg.x + officeImg.width + 5;
        this._upArrow.x = officeTF.x + officeTF.width + 5;
        this._nextOffice.x = this._upArrow.x + this._upArrow.width * this._upArrow.scaleX + 5;
        bottomInfoY = innerbg.y + 40;
        bottomInfoY = this.refreshLvCfg(bottomInfoY);
        bottomInfoY += 10;
        var progressBg = BaseBitmap.create("playerview_infobg");
        progressBg.width = 600;
        progressBg.height = 60;
        progressBg.x = GameConfig.stageWidth / 2 - progressBg.width / 2;
        // progressBg.y = bottomInfoY;
        if (Api.switchVoApi.checkOpenUpgradeAddAttribute()) {
            progressBg.y = bottomBg.y + bottomBg.height - progressBg.height - 85;
        }
        else {
            progressBg.y = bottomInfoY;
        }
        this._bottomnodeContainer.addChild(progressBg);
        this._progressBar = ComponentManager.getProgressBar("progress3", "progress3_bg", 460); //,562,19);
        this._progressBar.x = 50;
        this._progressBar.y = progressBg.y + 15;
        this._bottomnodeContainer.addChild(this._progressBar);
        this._expTipTxt = ComponentManager.getTextField("", 18);
        this.refreshProgressAndTxt();
        this._expTipTxt.x = this._progressBar.x + this._progressBar.width / 2 - this._expTipTxt.width / 2;
        this._expTipTxt.y = this._progressBar.y + this._progressBar.height / 2 - this._expTipTxt.height / 2;
        this._bottomnodeContainer.addChild(this._expTipTxt);
        var upgradeOfficeBtn = ComponentManager.getButton("playerview_lvupBtn", "", this.clickUpgradeHandler, this);
        upgradeOfficeBtn.x = this._progressBar.x + this._progressBar.width + 10;
        upgradeOfficeBtn.y = progressBg.y - 40;
        this._bottomnodeContainer.addChild(upgradeOfficeBtn);
        this._upgradeOfficeBtn = upgradeOfficeBtn;
        this._playerview_lvup_word = BaseBitmap.create("playerview_lvup_word");
        this._playerview_lvup_word.x = upgradeOfficeBtn.x + upgradeOfficeBtn.width / 2 - this._playerview_lvup_word.width / 2;
        this._playerview_lvup_word.y = upgradeOfficeBtn.y + upgradeOfficeBtn.height - this._playerview_lvup_word.height;
        this._bottomnodeContainer.addChild(this._playerview_lvup_word);
        var playerview_pro7 = BaseBitmap.create("playerview_pro7");
        playerview_pro7.x = this._progressBar.x - 20;
        playerview_pro7.y = this._progressBar.y + this._progressBar.height / 2 - playerview_pro7.height / 2;
        this._bottomnodeContainer.addChild(playerview_pro7);
        this.refreshUpgradeClip();
        this._mainTaskHandKey = App.MainTaskHandUtil.addHandNode(this._bottomnodeContainer, upgradeOfficeBtn.x + upgradeOfficeBtn.width / 2, upgradeOfficeBtn.y + upgradeOfficeBtn.height / 2, [upgradeOfficeBtn], 105, true, function () {
            var curLv = Api.playerVoApi.getPlayerLevel();
            var nextLvCfg = Config.LevelCfg.getCfgByLevel((curLv + 1).toString());
            if (!nextLvCfg) {
                //已升到最大官阶
                return false;
            }
            else if (Api.playerVoApi.getPlayerExp() < nextLvCfg.exp) {
                return false;
            }
            else {
                return true;
            }
        }, this);
        //需要调一下引导小手角度
        var hand = this._bottomnodeContainer.getChildByName("taskHand");
        if (hand) {
            hand.rotation = 130;
        }
        PlayerBottomUI.getInstance().visible = true;
        if (this._curTitleId) {
            userContainer.mask.height = this._bottomnodeContainer.y + bottomBg.y;
        }
        if (Api.unlocklist2VoApi.checkShowOpenFunc()) {
            Api.unlocklist2VoApi.checkWaitingShowInFunc("player");
        }
    };
    PlayerView.prototype.refreshProTxt = function () {
        var proCfg = [
            {
                txt: LanguageManager.getlocal("playerview_force"),
                proValue: App.StringUtil.changeIntToText(Api.playerVoApi.getAtk()),
                proIcon: "",
            }, {
                txt: LanguageManager.getlocal("playerview_inte"),
                proValue: App.StringUtil.changeIntToText(Api.playerVoApi.getInte()),
                proIcon: "",
            }, {
                txt: LanguageManager.getlocal("playerview_wife"),
                proValue: Api.wifeVoApi.getWifeNum(),
                proIcon: "",
            }, {
                txt: LanguageManager.getlocal("playerview_policy"),
                proValue: App.StringUtil.changeIntToText(Api.playerVoApi.getPolitics()),
                proIcon: "",
            }, {
                txt: LanguageManager.getlocal("playerview_charm"),
                proValue: App.StringUtil.changeIntToText(Api.playerVoApi.getCharm()),
                proIcon: "",
            }, {
                txt: LanguageManager.getlocal("playerview_child"),
                proValue: Api.wifeVoApi.getChildrenNum(),
                proIcon: "",
            }
        ];
        for (var index = 0; index < 6; index++) {
            var proText = this._bottomnodeContainer.getChildByName("proText" + (index + 1));
            proText.text = String(proCfg[index].proValue);
        }
    };
    PlayerView.prototype.refreshLvCfg = function (bottomInfoY) {
        var curLv = Api.playerVoApi.getPlayerLevel();
        var curLvCfg = Config.LevelCfg.getCfgByLevel(curLv.toString());
        var nextLvCfg = Config.LevelCfg.getCfgByLevel((curLv + 1).toString());
        var priTxtStr = [];
        var servantStr = "";
        if (nextLvCfg) {
            if (nextLvCfg.servant) {
                servantStr = LanguageManager.getlocal("servant_name" + nextLvCfg.servant);
                priTxtStr = [[
                        LanguageManager.getlocal("promotion_privilege6_1"),
                        servantStr
                    ]];
            }
            else if (nextLvCfg.servantSkin) {
                var skincfg = Config.ServantskinCfg.getServantSkinItemById(nextLvCfg.servantSkin);
                servantStr = skincfg.servantAndSkinName;
                priTxtStr = [[
                        LanguageManager.getlocal("promotion_privilege6_2"),
                        servantStr
                    ]];
            }
        }
        else {
            priTxtStr = [[
                    LanguageManager.getlocal("promotionView_topLV"),
                    ""
                ]];
        }
        // if(nextLvCfg.servant)
        // {
        // }
        if (Api.switchVoApi.checkOpenUpgradeAddAttribute()) {
            priTxtStr = priTxtStr.concat([
                [LanguageManager.getlocal("promotion_privilege1_integrated"), "gold",],
            ]);
        }
        else {
            priTxtStr = priTxtStr.concat([
                [LanguageManager.getlocal("promotion_privilege1"), "gold",],
                [LanguageManager.getlocal("promotion_privilege2"), "food"],
                [LanguageManager.getlocal("promotion_privilege3"), "soldier"],
            ]);
        }
        priTxtStr = priTxtStr.concat([
            // [LanguageManager.getlocal("promotion_privilege1"),"gold",  ],
            // [LanguageManager.getlocal("promotion_privilege2"),"food"  ],
            // [LanguageManager.getlocal("promotion_privilege3"),"soldier"  ],
            [LanguageManager.getlocal("promotion_privilege4"), "affair"],
            [LanguageManager.getlocal("promotion_privilege7", [""]), "gem"],
        ]);
        var descTxtSize = 20;
        var descPerHeight = 40;
        var proBgHeight = 45;
        if (Api.practiceVoApi.isPracticeOPen()) {
            var plv = Api.playerVoApi.getPlayerLevel();
            var plvcfg = GameConfig.config.practicebaseCfg.level;
            var addV = plvcfg[plv - 1];
            var addV2 = plvcfg[plv];
            if (!addV) {
                addV = plvcfg[plvcfg.length - 1];
            }
            if (!addV2) {
                addV2 = addV;
            }
            descTxtSize = 18;
            descPerHeight = 30;
            proBgHeight = 30;
            var storeLimit = GameConfig.config.practicebaseCfg.storeLimit;
            var addV3 = storeLimit[plv - 1];
            var addV4 = storeLimit[plv];
            if (!addV3) {
                addV3 = storeLimit[storeLimit.length - 1];
            }
            if (!addV4) {
                addV4 = addV3;
            }
            priTxtStr = priTxtStr.concat([
                [LanguageManager.getlocal("promotion_privilege8"), "otherInfo", App.StringUtil.changeIntToText2(addV), App.StringUtil.changeIntToText2(addV2)],
                [LanguageManager.getlocal("promotion_privilege9"), "otherInfo", App.StringUtil.changeIntToText2(addV3), App.StringUtil.changeIntToText2(addV4)],
            ]);
        }
        //升级官品增加属性开关
        if (Api.switchVoApi.checkOpenUpgradeAddAttribute()) {
            priTxtStr = priTxtStr.concat([
                [LanguageManager.getlocal("promotion_privilege10"), "powerAdd"],
            ]);
        }
        var strIdx = 0;
        for (var index = 0; index < priTxtStr.length; index++) {
            var procfg = priTxtStr[index];
            if (index % 2 == 0 && bottomInfoY) {
                var probg = BaseBitmap.create("playerview_infobg");
                probg.width = 600;
                probg.scaleY = proBgHeight / 45;
                probg.x = GameConfig.stageWidth / 2 - probg.width / 2;
                probg.y = bottomInfoY;
                this._bottomnodeContainer.addChild(probg);
            }
            var proTxt = undefined;
            var nowVTxt1 = undefined;
            var nowVTxt2 = undefined;
            var proArrow = undefined;
            proTxt = this._changeVTxtList[strIdx++];
            if (!proTxt) {
                proTxt = ComponentManager.getTextField((index + 1) + "." + procfg[0], descTxtSize, TextFieldConst.COLOR_LIGHT_YELLOW);
                proTxt.x = 50;
                proTxt.y = bottomInfoY + proBgHeight / 2 - proTxt.height / 2;
                this._bottomnodeContainer.addChild(proTxt);
                this._changeVTxtList.push(proTxt);
            }
            proTxt.text = (index + 1) + "." + procfg[0];
            proArrow = this._bottomnodeContainer.getChildByName("proArrow" + index);
            if (!proArrow) {
                proArrow = BaseBitmap.create("playerview_arrow");
                proArrow.x = GameConfig.stageWidth - 200;
                proArrow.y = proTxt.y + proTxt.height / 2 - proArrow.height / 2;
                this._bottomnodeContainer.addChild(proArrow);
                proArrow.name = "proArrow" + index;
            }
            nowVTxt1 = this._changeVTxtList[strIdx++];
            if (!nowVTxt1) {
                nowVTxt1 = ComponentManager.getTextField(procfg[1], 18);
                this._changeVTxtList.push(nowVTxt1);
                this._bottomnodeContainer.addChild(nowVTxt1);
            }
            nowVTxt1.text = curLvCfg[procfg[1]];
            // if(index >= 6)
            // {
            // 	nowVTxt1.text =  procfg[1];
            // }
            if (procfg[1] == "otherInfo") {
                nowVTxt1.text = procfg[2];
            }
            // nowVTxt1.text =  curLvCfg[procfg[1]];
            if (index == 0) {
                nowVTxt1.text = "";
            }
            nowVTxt1.anchorOffsetX = nowVTxt1.width;
            nowVTxt1.x = proArrow.x - 10;
            nowVTxt1.y = proArrow.y + proArrow.height / 2 - nowVTxt1.height / 2;
            nowVTxt2 = this._changeVTxtList[strIdx++];
            if (!nowVTxt2) {
                nowVTxt2 = ComponentManager.getTextField("", 18, TextFieldConst.COLOR_WARN_GREEN);
                nowVTxt2.x = proArrow.x + proArrow.width + 10;
                nowVTxt2.y = nowVTxt1.y;
                this._bottomnodeContainer.addChild(nowVTxt2);
                this._changeVTxtList.push(nowVTxt2);
            }
            if (nextLvCfg) {
                if (index == 0 && (nextLvCfg.servant || nextLvCfg.servantSkin)) {
                    if (nextLvCfg.servantSkin) {
                        var skincfg = Config.ServantskinCfg.getServantSkinItemById(nextLvCfg.servantSkin);
                        nowVTxt2.text = skincfg.servantAndSkinName;
                    }
                    else {
                        nowVTxt2.text = LanguageManager.getlocal("servant_name" + nextLvCfg.servant);
                    }
                    // nowVTxt2.anchorOffsetX = nowVTxt2.width/2;
                    nowVTxt2.x = proArrow.x + proArrow.width / 2 - nowVTxt2.width / 2;
                    proArrow.visible = false;
                }
                else {
                    nowVTxt2.text = nextLvCfg[procfg[1]];
                    // if(index >= 6 )
                    // {
                    // 	nowVTxt2.text =  procfg[2];
                    // }
                    if (procfg[1] == "otherInfo") {
                        nowVTxt2.text = procfg[3];
                    }
                }
                nowVTxt2.y = proArrow.y + proArrow.height / 2 - nowVTxt2.height / 2;
            }
            else {
                nowVTxt2.visible = false;
                proArrow.visible = false;
            }
            bottomInfoY += descPerHeight;
        }
        return bottomInfoY;
    };
    PlayerView.prototype.refreshProgressAndTxt = function () {
        var curLv = Api.playerVoApi.getPlayerLevel();
        var nextLvCfg = Config.LevelCfg.getCfgByLevel((curLv + 1).toString());
        if (nextLvCfg) {
            this._progressBar.setPercentage(Api.playerVoApi.getPlayerExp() / nextLvCfg.exp);
            this._expTipTxt.text = LanguageManager.getlocal("playerview_exp") + Api.playerVoApi.getPlayerExp() + " / " + nextLvCfg.exp;
        }
        else {
            this._progressBar.setPercentage(1);
            this._expTipTxt.text = LanguageManager.getlocal("promotion_topLevel", [String(Api.playerVoApi.getPlayerExp())]);
            this._expTipTxt.x = this._progressBar.x + this._progressBar.width / 2 - this._expTipTxt.width / 2;
        }
        var powerTxt = this._nodeContainer.getChildByName("powerTxt");
        powerTxt.text = "" + Api.playerVoApi.getPlayerPower();
    };
    //如果能升级，则初始化帧动画
    PlayerView.prototype.refreshUpgradeClip = function () {
        PlayerBottomUI.getInstance().checkRedPoints();
        var curLv = Api.playerVoApi.getPlayerLevel();
        var nextLvCfg = Config.LevelCfg.getCfgByLevel((curLv + 1).toString());
        if (nextLvCfg && Api.playerVoApi.getPlayerExp() >= nextLvCfg.exp) {
            if (!this._upgradeClip) {
                this._upgradeClip = ComponentManager.getCustomMovieClip("player_frame", 10, 100);
                this._upgradeClip.x = this._upgradeOfficeBtn.x + this._upgradeOfficeBtn.width / 2 - 85;
                this._upgradeClip.y = this._upgradeOfficeBtn.y + this._upgradeOfficeBtn.height / 2 - 90;
                var idx = this._bottomnodeContainer.getChildIndex(this._playerview_lvup_word);
                this._bottomnodeContainer.addChildAt(this._upgradeClip, idx);
                this._upgradeClip.playWithTime(0);
            }
        }
        else {
            if (this._upgradeClip) {
                this._upgradeClip.stop();
                this._bottomnodeContainer.removeChild(this._upgradeClip);
                this._upgradeClip = null;
            }
        }
    };
    PlayerView.prototype.refreshInfoAfterUpgrade = function (event) {
        var rData = event.data.data;
        if (rData.ret != 0)
            return;
        // 
        this._isLvUp = false;
        if (Api.unlocklist2VoApi.checkShowOpenFunc()) {
            if (Api.unlocklist2VoApi.checkNeedShowByName("practice") || Api.unlocklist2VoApi.checkNeedShowByName("officialCareer")) {
                this._isLvUp = true;
                // Api.unlocklist2VoApi.checkWaitingShowInFunc("player");
            }
        }
        ViewController.getInstance().openView(ViewConst.COMMON.PROMOTIONSUCCESSVIEW);
        if (Api.playerVoApi.getTitleid(2) > 0) {
        }
        else {
            var userContainer = this._nodeContainer.getChildByName("userContainer");
            var bodyImg = userContainer.getChildByName("myBody");
            bodyImg.setload("user_body" + Api.playerVoApi.getPlayerLevel());
        }
        var officeImg = this._bottomnodeContainer.getChildByName("officeImg");
        var officeTF = this._bottomnodeContainer.getChildByName("officeTF");
        officeTF.text = Api.playerVoApi.getPlayerOffice();
        var curLv = Api.playerVoApi.getPlayerLevel();
        var nextLvCfg = Config.LevelCfg.getCfgByLevel((curLv + 1).toString());
        var posXX = 0;
        if (nextLvCfg) {
            this._nextOffice.text = Api.playerVoApi.getPlayerOfficeByLevel(curLv + 1);
            posXX = GameConfig.stageWidth / 2 - (officeImg.width + officeTF.width + this._upArrow.width * this._upArrow.scaleX + this._nextOffice.width + 15) / 2;
        }
        else {
            this._upArrow.visible = false;
            this._nextOffice.visible = false;
            posXX = GameConfig.stageWidth / 2 - (officeImg.width + officeTF.width + 5) / 2;
        }
        officeImg.x = posXX;
        officeTF.x = officeImg.x + officeImg.width + 5;
        this._upArrow.x = officeTF.x + officeTF.width + 5;
        this._nextOffice.x = this._upArrow.x + this._upArrow.width * this._upArrow.scaleX + 5;
        this.refreshLvCfg();
        this.refreshProgressAndTxt();
        this.refreshProTxt();
        if (curLv == 18) {
            PlatformManager.showADS();
        }
        // if(curLv == Config.CountrywarCfg.unlock ){
        // 	NetManager.request(NetRequestConst.REQUEST_COUNTRYWAY_GETMODEL, {});
        // }
    };
    PlayerView.prototype.freshOpenFunc = function (evt) {
        if (this._isLvUp) {
            if (evt && evt.data) {
                var key = evt.data.key;
                App.LogUtil.log("key " + key);
                if (key == "practice" || key == "officialCareer") {
                    this._isLvUp = false;
                    // ViewController.getInstance().openView(ViewConst.COMMON.PROMOTIONSUCCESSVIEW);
                    var rData = Api.wifeVoApi.getWaitShowWife();
                    if (rData) {
                        // ViewController.getInstance().openView(ViewConst.BASE.WIFEGETVIEW,{wifeIdList:rData.unlockWife,servantId:rData.unlockServant});
                        Api.verifySpecialReward(rData.unlockServant, true);
                        Api.verifySpecialReward(rData.unlockWife, false);
                    }
                    var rData2 = Api.servantVoApi.getWaitShowData();
                    if (rData2) {
                        // ViewController.getInstance().openView(ViewConst.BASE.SERVANTGETVIEW,rData2.unlockServant);
                        Api.verifySpecialReward(rData2.unlockServant, true);
                    }
                    var rData22 = Api.servantVoApi.getWaitShowDat2();
                    if (rData22) {
                        Api.verifySpecialSkinReward(rData22.unlockServantSkin, true);
                    }
                    Api.openSpecialView();
                }
            }
        }
    };
    PlayerView.prototype.clickPrestigeHandler = function (param) {
        ViewController.getInstance().openView(ViewConst.COMMON.PRESTIGEVIEW);
        var prestigeBtn = this._nodeContainer.getChildByName("prestige");
        App.CommonUtil.removeIconFromBDOC(prestigeBtn);
    };
    PlayerView.prototype.clickUpgradeHandler = function (param) {
        var curLv = Api.playerVoApi.getPlayerLevel();
        var nextLvCfg = Config.LevelCfg.getCfgByLevel((curLv + 1).toString());
        if (!nextLvCfg) {
            //已升到最大官阶
            App.CommonUtil.showTip(LanguageManager.getlocal("promotion_upgradeTip1"));
            return;
        }
        if (Api.playerVoApi.getPlayerExp() < nextLvCfg.exp) {
            //政绩不足，无法升级
            App.CommonUtil.showTip(LanguageManager.getlocal("promotion_upgradeTip2"));
            return;
        }
        NetManager.request(NetRequestConst.REQUEST_USER_UPGRADE, {});
        //功能解锁
        // if(Api.otherInfoVoApi.getFunctionRedhot())
        // {
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_REFRESH_FUNCTION_TXT);
        // }
    };
    PlayerView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "playerview_wipbg", "playerview_name_bg", "playerview_powerbg", "playerview_probg",
            "playerview_pro1", "playerview_pro2", "playerview_pro3", "playerview_pro4", "playerview_pro5", "playerview_pro6",
            "playerview_pro_inmg2", "playerview_infobg", "playerview_arrow", "playerview_pro7",
            "progress3", "progress3_bg", "playerview_lvupBtn", "playerview_lvupBtn_down", "playerview_power_img",
            "office_fnt", "playerview_lvup_word", "servant_mask",
            "decree_arrow1",
            "servant_downbg", "player_power1", "player_power2",
            "guide_hand", "playerview_pro3_blueType", "playerview_pro6_blueType"
        ]);
    };
    PlayerView.prototype.closeHandler = function () {
        PlayerBottomUI.getInstance().hide(true);
        _super.prototype.hide.call(this);
    };
    PlayerView.prototype.dispose = function () {
        Api.mainTaskVoApi.hideGuide();
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_RESCHANGE_REFRESH_UI, this.refreshUpgradeClip, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_USER_UPGRADE), this.refreshInfoAfterUpgrade, this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_CHECK_FUNCTION_OPEN, this.freshOpenFunc, this);
        this._nodeContainer = null;
        this._bottomnodeContainer = null;
        this._progressBar = null;
        this._expTipTxt = null;
        this._changeVTxtList = [];
        this._playerview_lvup_word = null;
        if (this._upgradeClip) {
            this._upgradeClip.stop();
            this._upgradeClip.dispose();
            this._upgradeClip = null;
        }
        App.MainTaskHandUtil.releaseHandKey(this._mainTaskHandKey);
        this._mainTaskHandKey = null;
        this._upArrow = null;
        this._nextOffice = null;
        this._curTitleId = '';
        this._curLevel = 1;
        this._isLvUp = false;
        _super.prototype.dispose.call(this);
    };
    return PlayerView;
}(CommonView));
__reflect(PlayerView.prototype, "PlayerView");
//# sourceMappingURL=PlayerView.js.map