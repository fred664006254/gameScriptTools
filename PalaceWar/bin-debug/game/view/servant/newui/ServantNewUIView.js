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
 * new门客信息
 * author shaoliang
 * date 2017/7/25
 * @class ServantNewUIView
 */
var ServantNewUIView = /** @class */ (function (_super) {
    __extends(ServantNewUIView, _super);
    function ServantNewUIView() {
        var _this = _super.call(this) || this;
        _this._goldNumTxt = null;
        _this._servantId = null;
        _this._servantInfoObj = null;
        _this._curLvNeedGold = 0;
        _this._servantTopBg = null;
        _this._servantFullImg = null;
        _this._middleBarGroup = null;
        _this._barSelected = 0;
        _this._barTabNames = [];
        _this._bottomContainerTab = {};
        _this._topContainerTab = {};
        _this._tempServantSkin = "";
        _this._topBlackBg = null;
        _this._serverList = undefined;
        //是否在播放动画
        _this._isMoving = false;
        _this._isServantMoving = false;
        _this._anims = [];
        _this._switchDelta = 500;
        _this._servantDragonBone = undefined;
        _this._arrowLeft = null;
        _this._arrowRight = null;
        _this._infoBgBoneAni = null;
        _this._servantGender = 0;
        _this._mainTaskSkillHandKey = null;
        _this._skinBgEffectBone = null;
        return _this;
    }
    ServantNewUIView.prototype.getTitleStr = function () {
        return "servantInfoViewTitle";
    };
    ServantNewUIView.prototype.getResourceList = function () {
        var resArray = _super.prototype.getResourceList.call(this);
        if (Api.switchVoApi.checkOpenWifeExSkill()) {
            resArray.push("wifeexskill_icon2");
        }
        return resArray.concat([
            "servant_weapon",
            "skin_box_namebg", "servant_newui", "servant_topresbg", "servant_star",
            "servant_infoPro1", "servant_infoPro2", "servant_infoPro3", "servant_infoPro4",
            "servant_skin_book1", "servant_skin_book2", "servant_skin_book3", "servant_skin_book4", "servant_aura_down", "servant_aura",
            "hold_dinner_box", "servant_detailBtn",
            "wifeskinropetop", "wifeskinrope", "wifeview_in", "wifeview_noget", "wifeview_skingetbg",
            "acwealthcomingview_lightball",
            "titleupgradearrow", "servant_name_advanced", "weapon_bottom_bg", "sweeplight_effect", "servant_skin_bg_2", "servant_skin_bg_3",
            "servant_skin_title_2", "servant_skin_title_3",
            "public_9_powertipbg2",
        ]);
    };
    ServantNewUIView.prototype.initView = function () {
        Api.mainTaskVoApi.checkShowGuide("servantview");
        //换装
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_UPGRADE_SERVANT_EQUIP), this.changeSkinRefresh, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_SELECTED_SERVANT_SKIN, this.selectSkinRefresh, this);
        //升级
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_UPGRADE_SERVANT), this.resetGoldNum, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_UPGRADE_SERVANT_TEN), this.resetGoldNum, this);
        //神器升级动画
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_WEAPON_UPLEVEL2, this.playAnim, this);
        //刷新红点
        //技能
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_SERVANT_UPSKILL), this.checkServantRed, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_FROM_SERVANT_SKIN, this.checkServantRed, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_SERVANTSKIN_AURA, this.checkServantRed, this);
        //衣装强化
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_UPGRADE_SERVANT_EQUIP), this.checkServantRed, this);
        //使用丹药
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_USE_ITEM), this.checkServantRed, this);
        //书记升级
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_SERVANT_UPABILITY), this.checkServantRed, this);
        //神器
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WEAPON_UPGRADE), this.checkServantRed, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WEAPON_UPGRADETEN), this.checkServantRed, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WEAPON_UPABILITY), this.checkServantRed, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WEAPON_UPSKILL), this.checkServantRed, this);
        //光环
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_SERVANT_UPAURA, this.checkServantRed, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_SERVANT_UPSKINSPECIALAURA, this.checkServantRed, this);
        Api.rookieVoApi.checkNextStep();
        if (this.param.data && this.param.data.servantId) {
            this.resetServantId(this.param.data.servantId);
        }
        else {
            this.resetServantId(this.param.data);
        }
        var goldBg = BaseBitmap.create("servant_topresbg");
        goldBg.width = 120;
        goldBg.x = PlatformManager.hasSpcialCloseBtn() ? 480 : 20;
        goldBg.y = this.container.y - goldBg.height - 20;
        this.addChild(goldBg);
        var goldIcon = BaseBitmap.create("public_icon2");
        goldIcon.x = goldBg.x - goldIcon.width / 2 + 15;
        goldIcon.y = goldBg.y + goldBg.height / 2 - goldIcon.height / 2 - 2;
        this.addChild(goldIcon);
        this._goldNumTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
        this._goldNumTxt.x = goldIcon.x + goldIcon.width;
        this._goldNumTxt.y = goldBg.y + goldBg.height / 2 - this._goldNumTxt.height / 2 - 10;
        this.addChild(this._goldNumTxt);
        this.resetGoldNum();
        var servantCfg = Config.ServantCfg.getServantItemById(this._servantId);
        var infoBgImg = "servant_infobg";
        if (servantCfg.gender) {
            infoBgImg = infoBgImg + "_" + servantCfg.gender;
        }
        var isSkinImg = false;
        var equipSkin = this._servantInfoObj.equip;
        var skinEffBone = null;
        if (equipSkin && equipSkin != "" && equipSkin != "0") {
            var skinCfg = Config.ServantskinCfg.getServantSkinItemById(equipSkin);
            if (skinCfg) {
                var skinBg = skinCfg.getServantDetailBg();
                if (skinBg && ResourceManager.hasRes(skinBg)) {
                    infoBgImg = skinBg;
                    isSkinImg = true;
                }
                skinEffBone = skinCfg.getSkinEffectBone();
            }
        }
        var servant_infobg = BaseLoadBitmap.create(infoBgImg);
        servant_infobg.width = 640;
        servant_infobg.height = 580;
        servant_infobg.y = -20;
        this.addChildToContainer(servant_infobg);
        this._servantTopBg = servant_infobg;
        //bg effect
        if (!isSkinImg) {
            var infoBgBone = "servantfull_bg_" + servantCfg.gender;
            var infoBgBoneName = infoBgBone + "_ske";
            this._servantGender = servantCfg.gender;
            if ((!Api.switchVoApi.checkCloseBone()) && infoBgBoneName && RES.hasRes(infoBgBoneName) && App.CommonUtil.check_dragon()) {
                var infoBgBoneAni = App.DragonBonesUtil.getLoadDragonBones(infoBgBone);
                infoBgBoneAni.setPosition(0, servant_infobg.y);
                this.addChildToContainer(infoBgBoneAni);
                this._infoBgBoneAni = infoBgBoneAni;
            }
        }
        else {
            var skinEffBoneName = skinEffBone + "_ske";
            if (!Api.switchVoApi.checkCloseBone() && App.CommonUtil.check_dragon() && skinEffBoneName && RES.hasRes(skinEffBoneName)) {
                var skinEff = App.DragonBonesUtil.getLoadDragonBones(skinEffBone);
                skinEff.setPosition(servant_infobg.x + servant_infobg.width / 2, servant_infobg.y + 210);
                this.addChildToContainer(skinEff);
                this._skinBgEffectBone = skinEff;
            }
        }
        this._servantRoleNode = new BaseDisplayObjectContainer();
        this.addChildToContainer(this._servantRoleNode);
        var servantFullImg = BaseLoadBitmap.create(this._servantInfoObj.fullImgPath);
        servantFullImg.width = 405;
        servantFullImg.height = 467;
        servantFullImg.anchorOffsetY = servantFullImg.height;
        servantFullImg.anchorOffsetX = servantFullImg.width / 2;
        servantFullImg.x = GameConfig.stageWidth / 2 - 95;
        servantFullImg.y = servant_infobg.y + servant_infobg.height - 50;
        this._servantFullImg = servantFullImg;
        this._servantRoleNode.addChild(servantFullImg);
        this._topBlackBg = BaseBitmap.create("public_9_bg8");
        this._topBlackBg.width = GameConfig.stageWidth;
        this._topBlackBg.height = 600;
        this._topBlackBg.y = -30;
        this.addChildToContainer(this._topBlackBg);
        this._topBlackBg.visible = false;
        this._topInfoNode = new BaseDisplayObjectContainer();
        this._topInfoNode.y = -15;
        this.addChildToContainer(this._topInfoNode);
        var midlebg = BaseBitmap.create("skin_box_namebg");
        midlebg.width = 640;
        midlebg.y = 580 - this.container.y;
        midlebg.height = 92;
        this.addChildToContainer(midlebg);
        var bottombg = BaseBitmap.create("weapon_bottom_bg"); //public_9_bg22
        bottombg.width = 640;
        bottombg.y = midlebg.y + midlebg.height;
        bottombg.height = GameConfig.stageHeigth - this.container.y - midlebg.y - midlebg.height + 10;
        this.addChildToContainer(bottombg);
        this._bottomContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(this._bottomContainer);
        this._bottomContainer.y = bottombg.y;
        var arrow_leftBtn = ComponentManager.getButton("titleupgradearrow", "", this.switchHandler, this, ["left"]);
        arrow_leftBtn.x = 5 + arrow_leftBtn.width;
        arrow_leftBtn.scaleX = -1;
        arrow_leftBtn.y = 380;
        this.addChildToContainer(arrow_leftBtn);
        var arrow_rightBtn = ComponentManager.getButton("titleupgradearrow", "", this.switchHandler, this, ["right"]);
        arrow_rightBtn.x = 390;
        arrow_rightBtn.y = arrow_leftBtn.y;
        this.addChildToContainer(arrow_rightBtn);
        this._arrowLeft = arrow_leftBtn;
        this._arrowRight = arrow_rightBtn;
        this.resetMideleBarGroup();
        if (this.param.data && this.param.data.showweapon) {
            this.tabBtnClickHandler({ index: this._barTabNames.length - 1 });
            this._middleBarGroup.selectedIndex = this._barTabNames.length - 1;
        }
        else if (this.param.data && this.param.data.servantSkinId) {
            for (var i = 0; i < this._barTabNames.length; i++) {
                if (this._barTabNames[i] == "servant_info_btn6") {
                    Api.servantVoApi.showSkinId = Api.servantVoApi.showSkinId2 = this.param.data.servantSkinId;
                    this.tabBtnClickHandler({ index: i });
                    this._middleBarGroup.selectedIndex = i;
                    this.param.data.servantSkinId = null;
                }
            }
        }
        if (Api.rookieVoApi.isEnLang() && Api.rookieVoApi.isGuiding == false) {
            var key = "ServantLevelUp10" + Api.playerVoApi.getPlayerID();
            var value = LocalStorageManager.get(key);
            if (value != "1") {
                LocalStorageManager.set(key, "1");
                if (Api.playerVoApi.getPlayerLevel() < 6) {
                    ViewController.getInstance().openView(ViewConst.BASE.ROOKIEVIEW, { idx: "servant10_1", f: null, o: this });
                }
            }
        }
    };
    ServantNewUIView.prototype.switchHandler = function (param) {
        var curS = egret.getTimer();
        if (curS - this._switchDelta < 300) {
            return;
        }
        this._switchDelta = curS;
        this._isServantMoving = true;
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
        egret.Tween.removeTweens(this._topInfoNode);
        egret.Tween.removeTweens(this._servantRoleNode);
        egret.Tween.get(this._topInfoNode, { loop: false }).to({ alpha: 0 }, 200).wait(300).to({ alpha: 1 }, 200);
        // this.refreshBaseUIInfo(); //刷新重置id后的基础文本信息& 按钮状态
        var tarPosX1 = this._servantFullImg.x - this._servantFullImg.width / 2 - 20;
        var tarPosX2 = this._servantFullImg.x + GameConfig.stageWidth + this._servantFullImg.width / 2 + 20;
        if (param == "left") {
            tarPosX2 = this._servantFullImg.x - this._servantFullImg.width - 20;
            tarPosX1 = this._servantFullImg.x + GameConfig.stageWidth + this._servantFullImg.width / 2 + 20;
        }
        var view = this;
        egret.Tween.get(this._servantRoleNode, { loop: false }).set({ visible: false }).to({ x: tarPosX1 }, 200).call(this.resetMideleBarGroup, this).wait(100).
            // call(this.refreshServantRoleImg,this).
            set({ visible: true, x: tarPosX2 }).to({ x: 0 }, 200).call(function () {
            view._isServantMoving = false;
        });
    };
    ServantNewUIView.prototype.refreshServantInfoBg = function (skinId) {
        var servantCfg = Config.ServantCfg.getServantItemById(this._servantId);
        var isSkinImg = false;
        var equipSkin = this._servantInfoObj.equip;
        if (skinId) {
            equipSkin = skinId;
        }
        if (equipSkin && equipSkin != "" && equipSkin != "0") {
            var skinCfg = Config.ServantskinCfg.getServantSkinItemById(equipSkin);
            if (skinCfg) {
                var skinBg = skinCfg.getServantDetailBg();
                if (skinBg && ResourceManager.hasRes(skinBg)) {
                    this._servantTopBg.setload(skinBg);
                    isSkinImg = true;
                    this._servantGender = 0;
                }
                if (this._skinBgEffectBone) {
                    this._skinBgEffectBone.dispose();
                    this._skinBgEffectBone = null;
                }
                var skinEffBone = skinCfg.getSkinEffectBone();
                var skinEffBoneName = skinEffBone + "_ske";
                if (!Api.switchVoApi.checkCloseBone() && App.CommonUtil.check_dragon() && skinEffBoneName && RES.hasRes(skinEffBoneName)) {
                    var skinEff = App.DragonBonesUtil.getLoadDragonBones(skinEffBone);
                    skinEff.anchorOffsetY = skinEff.height / 2;
                    skinEff.$anchorOffsetX = skinEff.width / 2;
                    skinEff.setPosition(this._servantTopBg.x + this._servantTopBg.width / 2, this._servantTopBg.y + 210);
                    var zIndex = this.container.getChildIndex(this._servantTopBg);
                    this.container.addChildAt(skinEff, zIndex + 1);
                    this._skinBgEffectBone = skinEff;
                }
            }
        }
        if (isSkinImg) {
            if (this._infoBgBoneAni) {
                this._infoBgBoneAni.dispose();
                this._infoBgBoneAni = null;
            }
        }
        else {
            if (this._skinBgEffectBone) {
                this._skinBgEffectBone.dispose();
                this._skinBgEffectBone = null;
            }
            if (this._servantGender != servantCfg.gender) {
                var infoBgImg = "servant_infobg";
                if (servantCfg.gender) {
                    infoBgImg = infoBgImg + "_" + servantCfg.gender;
                }
                this._servantTopBg.setload(infoBgImg);
                if (this._infoBgBoneAni) {
                    this._infoBgBoneAni.dispose();
                    this._infoBgBoneAni = null;
                }
                var infoBgBone = "servantfull_bg_" + servantCfg.gender;
                var infoBgBoneName = infoBgBone + "_ske";
                if ((!Api.switchVoApi.checkCloseBone()) && infoBgBoneName && RES.hasRes(infoBgBoneName) && App.CommonUtil.check_dragon()) {
                    var infoBgBoneAni = App.DragonBonesUtil.getLoadDragonBones(infoBgBone);
                    infoBgBoneAni.setPosition(0, this._servantTopBg.y);
                    var zIndex = this.container.getChildIndex(this._servantTopBg);
                    this.container.addChildAt(infoBgBoneAni, zIndex + 1);
                    this._infoBgBoneAni = infoBgBoneAni;
                }
                this._servantGender = servantCfg.gender;
            }
        }
    };
    ServantNewUIView.prototype.refreshServantRoleImg = function (wear) {
        var serImg = this._servantInfoObj.fullImgPath; //
        if (!wear) {
            wear = Api.servantVoApi.getservantSkinIdInWear(this._servantId);
        }
        else if (wear == "0") {
            serImg = "servant_full_" + this._servantId;
        }
        else if (wear) {
            var skinCfg = Config.ServantskinCfg.getServantSkinItemById(wear);
            if (skinCfg) {
                serImg = skinCfg.body;
            }
        }
        if (!Api.switchVoApi.checkCloseBone()) {
            var boneName = undefined;
            var skincfg = null;
            var dagonBonesName = null;
            if (wear && wear != "" && wear != "0") {
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
            App.LogUtil.log("QAZ boneName", boneName, wear);
            if (boneName && RES.hasRes(boneName) && App.CommonUtil.check_dragon()) {
                if (this._servantFullImg) {
                    this._servantFullImg.visible = false;
                }
                if (this._servantDragonBone) {
                    this._servantDragonBone.stop();
                    this._servantDragonBone.dispose();
                    this._servantDragonBone = null;
                }
                this._servantDragonBone = App.DragonBonesUtil.getLoadDragonBones(dagonBonesName);
                this._servantDragonBone.visible = true;
                this._servantDragonBone.setScale(1.1);
                this._servantDragonBone.anchorOffsetY = this._servantDragonBone.height;
                this._servantDragonBone.anchorOffsetX = this._servantDragonBone.width / 2;
                this._servantDragonBone.x = GameConfig.stageWidth / 2 - 95;
                this._servantDragonBone.y = this._servantFullImg.y;
                this._servantRoleNode.addChildAt(this._servantDragonBone, 2);
            }
            else {
                if (this._servantDragonBone) {
                    this._servantDragonBone.stop();
                    this._servantDragonBone.dispose();
                    this._servantDragonBone = null;
                }
                this._servantFullImg.setload(serImg); //0611
                this._servantFullImg.visible = true;
            }
        }
        else {
            if (this._servantDragonBone) {
                this._servantDragonBone.stop();
                this._servantDragonBone.dispose();
                this._servantDragonBone = null;
            }
            this._servantFullImg.setload(serImg); //0611
            this._servantFullImg.visible = true;
        }
    };
    ServantNewUIView.prototype.resetMideleBarGroup = function () {
        if (this._middleBarGroup) {
            this._middleBarGroup.dispose();
            this._middleBarGroup = null;
        }
        for (var key in this._bottomContainerTab) {
            this._bottomContainerTab[key].dispose();
        }
        this._bottomContainerTab = {};
        for (var key in this._topContainerTab) {
            this._topContainerTab[key].dispose();
        }
        this._topContainerTab = {};
        var servantCfg = Config.ServantCfg.getServantItemById(this._servantId);
        this._barTabNames.length = 0;
        this._barTabNames = ["servant_info_btn1", "servant_info_btn2", "servant_info_btn3"];
        if (servantCfg.wifeId) {
            this._barTabNames.push(Api.switchVoApi.checkIsInBlueWife() ? "servant_info_btn4_blueType" : "servant_info_btn4");
        }
        if (servantCfg.aura) {
            this._barTabNames.push("servant_info_btn5");
        }
        else {
            if (servantCfg.isOpenAuraBySkin()) {
                this._barTabNames.push("servant_info_btn5");
            }
        }
        this._barTabNames.push("servant_info_btn6");
        if (Api.weaponVoApi.isShowNpc() && Config.ServantweaponCfg.checkOpenWeaponByServantId(this._servantId)) //&& Api.switchVoApi.checkWeaponById(Config.ServantweaponCfg.getWeaponIdByServantId(this._servantId))
         {
            this._barTabNames.push("servant_info_btn7");
        }
        // this._middleBarGroup = ComponentManager.getTabBarGroup(this._barTabNames,this._barTabNames,this.tabBtnClickHandler,this,null,null,null,true);
        this._middleBarGroup = ComponentManager.getScroTabBarGroup(this._barTabNames, this._barTabNames, this.tabBtnClickHandler, this, null, TabBarGroup.ALIGN_HORIZONTAL, 584, true);
        this._middleBarGroup.setSpace(0);
        this._middleBarGroup.x = 28;
        this._middleBarGroup.y = 480;
        this.addChildToContainer(this._middleBarGroup);
        if (this._barTabNames[this._barTabNames.length - 1] == "servant_info_btn7") {
            var weaponVo = Api.weaponVoApi.getWeaponInfoVoByServantId(this._servantId);
            if (!weaponVo) {
                App.DisplayUtil.changeToGray(this._middleBarGroup.getTabBar(this._barTabNames.length - 1));
            }
            else {
                if (weaponVo.checkRedDot()) {
                    this._middleBarGroup.addRedPoint(this._barTabNames.length - 1);
                }
            }
        }
        if (GameData.isInArray("servant_info_btn6", this._barTabNames)) {
            var idx = this._barTabNames.indexOf("servant_info_btn6");
            if (!Config.ServantskinCfg.isSkinDeploy(this._servantId)) {
                App.DisplayUtil.changeToGray(this._middleBarGroup.getTabBar(idx));
            }
        }
        this._middleBarGroup.selectedIndex = this.param.tab ? parseInt(this.param.tab) : 0;
        this.tabBtnClickHandler({ index: this.param.tab ? parseInt(this.param.tab) : 0 });
        this.refreshServantRoleImg();
        this.param.tab = null;
        this.checkServantRed();
        this.refreshServantInfoBg();
        if (!Api.rookieVoApi.isGuiding && !Api.rookieVoApi.isInGuiding) {
            var needSerId = Api.servantVoApi.getMainTaskNeedServant(205);
            if (needSerId && needSerId == this._servantId) {
                var tabbar = this._middleBarGroup.getTabBar(1);
                this._mainTaskSkillHandKey = App.MainTaskHandUtil.addHandNode(this.container, this._middleBarGroup.x + tabbar.x + tabbar.width / 2 - 10, this._middleBarGroup.y + 15, [tabbar], 205, true, function () {
                    return true;
                }, this);
            }
        }
    };
    ServantNewUIView.prototype.getTopKeyByBtnKey = function (btnKey) {
        if (btnKey == "6") {
            return "2";
        }
        if (btnKey == "7") {
            return "3";
        }
        return "1";
    };
    ServantNewUIView.prototype.tabBtnClickHandler = function (params) {
        var tarIdx = params.index;
        var btnKey = this._barTabNames[tarIdx];
        btnKey = btnKey.substr(16, btnKey.length - 16);
        if (btnKey.indexOf("blueType")) {
            btnKey = btnKey.split("_")[0];
        }
        //神器
        if (btnKey == "7") {
            if (!Config.ServantweaponCfg.checkOpenWeaponByServantId(this._servantId)) {
                App.CommonUtil.showTip(LanguageManager.getlocal("weapon_notopen_tip"));
                this._middleBarGroup.selectedIndex = this._barSelected;
                return;
            }
            var weaponVo = Api.weaponVoApi.getWeaponInfoVoByServantId(this._servantId);
            if (!weaponVo) {
                App.CommonUtil.showTip(LanguageManager.getlocal("weapon_not_get_tip"));
                this._middleBarGroup.selectedIndex = this._barSelected;
                return;
            }
            // if (weaponVo.checkRedDot())
            // {
            //     this._middleBarGroup.removeRedPoint(this._barTabNames.length-1);
            //     weaponVo.setRedDot();
            // }
            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_WEAPON_RESET);
            this._topBlackBg.visible = true;
            this._servantRoleNode.visible = false;
            Api.rookieVoApi.checkNextStep();
        }
        else {
            this._topBlackBg.visible = false;
            if (this._isServantMoving == false) {
                this._servantRoleNode.visible = true;
            }
        }
        //皮肤
        if (btnKey == "6") {
            if (!Config.ServantskinCfg.isSkinDeploy(this._servantId)) {
                App.CommonUtil.showTip(LanguageManager.getlocal("skin_servantNoSkinTips"));
                this._middleBarGroup.selectedIndex = this._barSelected;
                if (this._barSelected == 5) {
                    this._topBlackBg.visible = true;
                    this._servantRoleNode.visible = false;
                }
                return;
            }
            // this._servantTopBg.setload("servantskinauramanbg");
            // if (this._infoBgBoneAni){
            //     this._infoBgBoneAni.visible = false;
            // }
        }
        else {
            // let servantCfg = Config.ServantCfg.getServantItemById(this._servantId); 
            // let infoBgImg = "servant_infobg";
            // if (servantCfg.gender){
            //     infoBgImg = infoBgImg + "_"+servantCfg.gender;
            // }
            // this._servantTopBg.setload(infoBgImg);
            // if (this._infoBgBoneAni){
            //     this._infoBgBoneAni.visible = true;
            // }
        }
        var servantCfg = Config.ServantCfg.getServantItemById(this._servantId);
        if (this._barSelected == 4 || (this._barSelected == 5 && servantCfg.aura)) {
            this.changeSkinRefresh();
        }
        this._barSelected = tarIdx;
        var topKey = this.getTopKeyByBtnKey(btnKey);
        if (topKey == "1") {
            this._arrowLeft.visible = true;
            this._arrowRight.visible = true;
        }
        else {
            this._arrowLeft.visible = false;
            this._arrowRight.visible = false;
        }
        for (var key in this._topContainerTab) {
            this._topContainerTab[key].visible = false;
        }
        if (this._topContainerTab[topKey]) {
            this._topContainerTab[topKey].visible = true;
            if (btnKey == "6") {
                if (this._tempServantSkin) {
                    this.refreshServantRoleImg(this._tempServantSkin);
                    this.refreshServantInfoBg(this._tempServantSkin);
                }
            }
        }
        else {
            this.initTopContainer(topKey);
        }
        for (var key in this._bottomContainerTab) {
            this._bottomContainerTab[key].visible = false;
        }
        if (this._bottomContainerTab[btnKey]) {
            this._bottomContainerTab[btnKey].visible = true;
        }
        else {
            this.initBottomContainer(btnKey);
        }
        this.stopAnim();
    };
    ServantNewUIView.prototype.initTopContainer = function (btnKey) {
        var tmpNode = new BaseDisplayObjectContainer();
        this._topInfoNode.addChild(tmpNode);
        if (btnKey == "1") {
            var servantTop1Items = new ServantNewUITopNode1();
            servantTop1Items.init(this._servantId, this);
            tmpNode.addChild(servantTop1Items);
        }
        else if (btnKey == "2") {
            var servantTop2Items = new ServantNewUITopNode2();
            servantTop2Items.init(this._servantId);
            tmpNode.addChild(servantTop2Items);
        }
        else if (btnKey == "3") {
            var servantTop3Items = new ServantNewUITopNode3();
            servantTop3Items.init(this._servantId);
            tmpNode.addChild(servantTop3Items);
        }
        this._topContainerTab[btnKey] = tmpNode;
    };
    ServantNewUIView.prototype.initBottomContainer = function (btnKey) {
        var bottomH = GameConfig.stageHeigth - this._bottomContainer.y - this.container.y;
        var tmpNode = new BaseDisplayObjectContainer();
        this._bottomContainer.addChild(tmpNode);
        if (btnKey == "1") {
            var servantInfoBookItems = new ServantNewUIBookItems();
            servantInfoBookItems.init(this._servantId, bottomH);
            tmpNode.addChild(servantInfoBookItems);
            if (Api.rookieVoApi.isInGuiding) {
                var pos = servantInfoBookItems.localToGlobal(servantInfoBookItems.y, 20);
                var layerY = (GameConfig.stage.stageHeight - GameConfig.stageHeigth) * 0.5;
                Api.rookieVoApi.waitingPosY = pos.y + 40 + layerY;
            }
        }
        else if (btnKey == "2") {
            var servantInfoSkillsItem = new ServantNewUISkillsItem();
            servantInfoSkillsItem.init(this._servantId, bottomH);
            tmpNode.addChild(servantInfoSkillsItem);
        }
        else if (btnKey == "3") {
            var servantInfoItems = new ServantNewUIItems();
            servantInfoItems.init(this._servantId, bottomH);
            tmpNode.addChild(servantInfoItems);
        }
        else if (btnKey == "4") {
            var servantInfoWifeItem = new ServantNewUIWifeItem();
            servantInfoWifeItem.init(this._servantId, bottomH);
            tmpNode.addChild(servantInfoWifeItem);
        }
        else if (btnKey == "5") {
            var servantInfoFourItems = new ServantNewUIFourItems();
            servantInfoFourItems.init(this._servantId, bottomH);
            tmpNode.addChild(servantInfoFourItems);
        }
        else if (btnKey == "6") {
            var servantInfoSkintems = new ServantNewUISkinItem();
            servantInfoSkintems.init(this._servantId, bottomH);
            servantInfoSkintems.name = "item";
            tmpNode.addChild(servantInfoSkintems);
            var wearId = Api.servantVoApi.getservantSkinIdInWear(this._servantId) || "";
            if (Api.servantVoApi.showSkinId2) {
                servantInfoSkintems.refreshWithSkinId(Api.servantVoApi.showSkinId2);
                Api.servantVoApi.showSkinId2 = null;
            }
            else {
                servantInfoSkintems.refreshWithSkinId(wearId);
            }
        }
        else if (btnKey == "7") {
            var servantWeaponItem = new ServantNewUIWeaponItem();
            servantWeaponItem.init(this._servantId, bottomH);
            tmpNode.addChild(servantWeaponItem);
        }
        this._bottomContainerTab[btnKey] = tmpNode;
    };
    ServantNewUIView.prototype.resetServantId = function (newServantId) {
        this._servantId = String(newServantId);
        var servantInfoObj = Api.servantVoApi.getServantObj(this._servantId);
        this._servantInfoObj = servantInfoObj;
        this._curLvNeedGold = GameConfig.config.servantbaseCfg.upgradeNeed[this._servantInfoObj.level - 1];
        this.playEffect(this._servantInfoObj.sound, true);
    };
    ServantNewUIView.prototype.resetGoldNum = function () {
        this._goldNumTxt.text = Api.playerVoApi.getPlayerGoldStr();
    };
    ServantNewUIView.prototype.changeSkinRefresh = function (evt) {
        if (evt) {
            var rdata = evt.data.data;
            if (rdata.ret != 0) {
                return;
            }
        }
        // this._servantFullImg.setload(this._servantInfoObj.fullImgPath);
        this.refreshServantRoleImg();
        this.checkServantRed();
    };
    ServantNewUIView.prototype.selectSkinRefresh = function (event) {
        var picStr = "";
        var equip = event.data;
        // if(!equip || equip == ""){
        //     picStr = "servant_full_" + this._servantId;
        // }
        // else
        // {
        //     let skincfg = Config.ServantskinCfg.getServantSkinItemById(equip);
        //     picStr = skincfg.body;
        // }
        this._tempServantSkin = equip;
        this.refreshServantRoleImg(equip);
        this.refreshServantInfoBg(equip);
        if (this._bottomContainerTab["6"]) {
            var downNode = this._bottomContainerTab["6"].getChildByName("item");
            downNode.refreshWithSkinId(equip);
        }
    };
    ServantNewUIView.prototype.playAnim = function (event) {
        if (this._isMoving) {
            return;
        }
        this._isMoving = true;
        var info = event.data;
        var view = this;
        var _loop_1 = function (i) {
            var ball = BaseBitmap.create("acwealthcomingview_lightball");
            ball.setPosition(270 - info[0] / 2 * 86 + i * 100, 655 + info[1]);
            this_1.addChild(ball);
            ball.visible = false;
            var clip = ComponentManager.getCustomMovieClip("allianceweekendvieweffect", 10, 70);
            clip.setPosition(230 - info[0] / 2 * 86 + i * 100, 620 + info[1]);
            if (info[2] == 3) {
                clip.x += 95;
                ball.x += 100;
            }
            clip.setScale(0.8);
            clip.setEndCallBack(function () {
                ball.visible = true;
                clip.visible = false;
                egret.Tween.get(ball).to({ x: 160, y: 320 }, 500).call(function () {
                    if (i == 0) {
                        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_WEAPON_UPLEVEL);
                        view.stopAnim();
                    }
                });
            }, this_1);
            clip.playWithTime(1);
            this_1.addChild(clip);
            this_1._anims.push(ball);
            this_1._anims.push(clip);
        };
        var this_1 = this;
        for (var i = 0; i < info[0]; i++) {
            _loop_1(i);
        }
    };
    ServantNewUIView.prototype.stopAnim = function () {
        if (this._isMoving) {
            var l = this._anims.length;
            for (var i = 0; i < l; i++) {
                this._anims[i].dispose();
            }
            this._anims.length = 0;
            this._isMoving = false;
        }
    };
    ServantNewUIView.prototype.checkServantRed = function () {
        for (var i = 0; i < this._barTabNames.length; i++) {
            //衣装
            if (this._barTabNames[i] == "servant_info_btn6") {
                if (Api.servantVoApi.isShowSkinRedForEnter(this._servantId) || Api.servantVoApi.isShowAuralevelUpRedForEnter(this._servantId)) {
                    if (Api.switchVoApi.checkOpenServantSkinAura()) {
                        this._middleBarGroup.addRedPoint(i);
                        this._middleBarGroup.setRedPos(i, 70, 0);
                    }
                    else {
                        this._middleBarGroup.removeRedPoint(i);
                    }
                }
                else {
                    this._middleBarGroup.removeRedPoint(i);
                }
            }
            //书籍
            else if (this._barTabNames[i] == "servant_info_btn1") {
                if (this._servantInfoObj.isBookLvUpEnable()) {
                    this._middleBarGroup.addRedPoint(i);
                    this._middleBarGroup.setRedPos(i, 70, 0);
                }
                else {
                    this._middleBarGroup.removeRedPoint(i);
                }
            }
            //技能
            else if (this._barTabNames[i] == "servant_info_btn2") {
                if (this._servantInfoObj.isSkillLvUpEnable()) {
                    this._middleBarGroup.addRedPoint(i);
                    this._middleBarGroup.setRedPos(i, 70, 0);
                }
                else {
                    this._middleBarGroup.removeRedPoint(i);
                }
            }
            //dan药
            else if (this._barTabNames[i] == "servant_info_btn3") {
                if (Api.servantVoApi.isShowRedForItem()) {
                    this._middleBarGroup.addRedPoint(i);
                    this._middleBarGroup.setRedPos(i, 70, 0);
                }
                else {
                    this._middleBarGroup.removeRedPoint(i);
                }
            }
            //神器
            else if (this._barTabNames[i] == "servant_info_btn7") {
                if (this._servantInfoObj.checkWeaponReddot()) {
                    this._middleBarGroup.addRedPoint(i);
                    this._middleBarGroup.setRedPos(i, 70, 0);
                }
                else {
                    this._middleBarGroup.removeRedPoint(i);
                }
            }
            //光环
            else if (this._barTabNames[i] == "servant_info_btn5") {
                if (this._servantInfoObj.isShowRedForaura()) {
                    this._middleBarGroup.addRedPoint(i);
                    this._middleBarGroup.setRedPos(i, 70, 0);
                }
                else {
                    this._middleBarGroup.removeRedPoint(i);
                }
            }
        }
    };
    ServantNewUIView.prototype.hide = function () {
        if (Api.rookieVoApi.isEnRookie()) {
            Api.rookieVoApi.checkNextStep();
        }
        if (Api.rookieVoApi.isInGuiding) {
            Api.rookieVoApi.checkWaitingGuide();
            ViewController.getInstance().getView(ViewConst.COMMON.SERVANTVIEW).hide();
        }
        _super.prototype.hide.call(this);
    };
    ServantNewUIView.prototype.dispose = function () {
        Api.mainTaskVoApi.hideGuide();
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_UPGRADE_SERVANT_EQUIP), this.changeSkinRefresh, this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_SELECTED_SERVANT_SKIN, this.selectSkinRefresh, this);
        //升级
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_UPGRADE_SERVANT), this.resetGoldNum, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_UPGRADE_SERVANT_TEN), this.resetGoldNum, this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_WEAPON_UPLEVEL2, this.playAnim, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_SERVANT_UPSKILL), this.checkServantRed, this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_FROM_SERVANT_SKIN, this.checkServantRed, this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_SERVANTSKIN_AURA, this.checkServantRed, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_UPGRADE_SERVANT_EQUIP), this.checkServantRed, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_USE_ITEM), this.checkServantRed, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_SERVANT_UPABILITY), this.checkServantRed, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WEAPON_UPGRADE), this.checkServantRed, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WEAPON_UPGRADETEN), this.checkServantRed, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WEAPON_UPABILITY), this.checkServantRed, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WEAPON_UPSKILL), this.checkServantRed, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_SERVANT_UPAURA, this.checkServantRed, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_SERVANT_UPSKINSPECIALAURA, this.checkServantRed, this);
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_SERVANTBONE);
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_SERVANCLOSE_REFRESH);
        this._goldNumTxt = null;
        this._servantId = null;
        this._servantInfoObj = null;
        this._curLvNeedGold = 0;
        this._servantTopBg = null;
        this._servantFullImg = null;
        this._servantRoleNode = null;
        this._bottomContainer = null;
        this._topInfoNode = null;
        this._middleBarGroup = null;
        this._barTabNames.length = 0;
        this._bottomContainerTab = {};
        this._topContainerTab = {};
        this._barSelected = 0;
        this._tempServantSkin = "";
        this._topBlackBg = null;
        this._isMoving = false;
        this._isServantMoving = false;
        this._anims.length = 0;
        this._switchDelta = 500;
        this._serverList = null;
        this._servantDragonBone = null;
        this._arrowLeft = null;
        this._arrowRight = null;
        this._infoBgBoneAni = null;
        this._servantGender = null;
        this._skinBgEffectBone = null;
        App.MainTaskHandUtil.releaseHandKey(this._mainTaskSkillHandKey);
        this._mainTaskSkillHandKey = null;
        _super.prototype.dispose.call(this);
    };
    return ServantNewUIView;
}(CommonView));
//# sourceMappingURL=ServantNewUIView.js.map