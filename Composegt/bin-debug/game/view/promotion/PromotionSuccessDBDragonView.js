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
 * 升官成功龙骨特效
 * author yanyuling
 * @class PromotionSuccessDBDragonView
 **/
var PromotionSuccessDBDragonView = (function (_super) {
    __extends(PromotionSuccessDBDragonView, _super);
    function PromotionSuccessDBDragonView() {
        var _this = _super.call(this) || this;
        _this._temW = 45;
        _this._num = 1;
        _this._totalTime = 600;
        _this._repeatCount = 20;
        return _this;
    }
    PromotionSuccessDBDragonView.prototype.initView = function () {
        var colorBg = new BaseShape();
        colorBg.graphics.beginFill(0x140f0a);
        colorBg.graphics.drawRect(0, 0, GameConfig.stageWidth, GameConfig.stageHeigth);
        colorBg.graphics.endFill();
        this.addChildToContainer(colorBg);
        var textColor = TextFieldConst.COLOR_WHITE;
        var bg = BaseBitmap.create("promotion_bg1");
        bg.scaleX = bg.scaleY = 1.2;
        bg.anchorOffsetX = bg.width / 2;
        bg.anchorOffsetY = bg.height / 2;
        bg.x = GameConfig.stageWidth / 2;
        bg.y = 420;
        this.addChildToContainer(bg);
        this._bgTween = egret.Tween.get(bg, { loop: true });
        this._bgTween.to({ rotation: 360 }, 16000);
        var dragon_hou = App.DragonBonesUtil.getLoadDragonBones("shengguanchenggong_hou", 1, "chuxian");
        dragon_hou.x = GameConfig.stageWidth / 2;
        dragon_hou.y = GameConfig.stageHeigth / 2;
        this.addChildToContainer(dragon_hou);
        dragon_hou.setDragonBoneEventListener(dragonBones.EventObject.LOOP_COMPLETE, function (param1) {
            dragon_hou.playDragonMovie("idle", 0); //COMPLETE
        }, this);
        var roleImage = Api.playerVoApi.getPlayerPortrait(Api.playerVoApi.getPlayerLevel(), Api.playerVoApi.getPlayePicId());
        roleImage.anchorOffsetX = roleImage.width / 2;
        roleImage.anchorOffsetY = roleImage.height / 2;
        roleImage.x = this.viewBg.width / 2;
        roleImage.y = 180 + roleImage.anchorOffsetY;
        roleImage.setScale(0.5);
        this.addChildToContainer(roleImage);
        egret.Tween.get(roleImage, { loop: false }).to({ scaleX: 1.0, scaleY: 1.0 }, 300);
        var dragon_qian_zi = App.DragonBonesUtil.getLoadDragonBones("shengguanchenggong_qian_zi", 1, "chuxian");
        dragon_qian_zi.x = GameConfig.stageWidth / 2;
        dragon_qian_zi.y = 100;
        this.addChildToContainer(dragon_qian_zi);
        dragon_qian_zi.setDragonBoneEventListener(dragonBones.EventObject.LOOP_COMPLETE, function (param1) {
            dragon_qian_zi.playDragonMovie("idle", 0); //COMPLETE
        }, this);
        var dragon_qian_pinji = App.DragonBonesUtil.getLoadDragonBones("shengguanchenggong_qian_pinji", 1, "chuxian");
        dragon_qian_pinji.x = GameConfig.stageWidth / 2;
        dragon_qian_pinji.y = GameConfig.stageHeigth / 2;
        this.addChildToContainer(dragon_qian_pinji);
        dragon_qian_pinji.setDragonBoneEventListener(dragonBones.EventObject.LOOP_COMPLETE, function (param1) {
            dragon_qian_pinji.playDragonMovie("idle", 0); //COMPLETE
        }, this);
        var dragon_qian_juese = App.DragonBonesUtil.getLoadDragonBones("shengguanchenggong_qian_juese", 1, "chuxian");
        dragon_qian_juese.x = GameConfig.stageWidth / 2;
        dragon_qian_juese.y = GameConfig.stageHeigth / 2;
        this.addChildToContainer(dragon_qian_juese);
        dragon_qian_juese.setDragonBoneEventListener(dragonBones.EventObject.LOOP_COMPLETE, function (param1) {
            dragon_qian_juese.playDragonMovie("idle", 0); //COMPLETE
        }, this);
        var dragon_qian_juanzhou = App.DragonBonesUtil.getLoadDragonBones("shengguanchenggong_qian_juanzhou", 1, "chuxian");
        dragon_qian_juanzhou.x = GameConfig.stageWidth / 2;
        dragon_qian_juanzhou.y = GameConfig.stageHeigth - 200 + 10;
        this.addChildToContainer(dragon_qian_juanzhou);
        dragon_qian_juanzhou.setDragonBoneEventListener(dragonBones.EventObject.LOOP_COMPLETE, function (param1) {
            dragon_qian_juanzhou.playDragonMovie("idle", 0); //COMPLETE
        }, this);
        var nameTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL);
        nameTxt.multiline = true;
        nameTxt.alpha = 0;
        if (PlatformManager.checkIsTextHorizontal()) {
            nameTxt.text = Api.playerVoApi.getPlayerMinLevelStr();
            dragon_qian_pinji.rotation = -90;
            dragon_qian_pinji.x = this.viewBg.width / 2; //- 100;
            dragon_qian_pinji.y = GameConfig.stageHeigth - 450; //bg.y+bg.height - 40;
            nameTxt.x = dragon_qian_pinji.x - nameTxt.width / 2;
            nameTxt.y = dragon_qian_pinji.y - nameTxt.height / 2;
        }
        else {
            nameTxt.width = 20;
            nameTxt.text = Api.playerVoApi.getPlayerMinLevelStr();
            dragon_qian_pinji.x = 80;
            dragon_qian_pinji.y = 270;
            nameTxt.x = dragon_qian_pinji.x - nameTxt.width / 2;
            nameTxt.y = dragon_qian_pinji.y - nameTxt.height / 2;
        }
        this.addChildToContainer(nameTxt);
        var scrollContainer = new BaseDisplayObjectContainer();
        scrollContainer.x = 0;
        scrollContainer.y = GameConfig.stageHeigth - 400;
        this.addChildToContainer(scrollContainer);
        scrollContainer.alpha = 0;
        var str = "officeUpgradeTitle";
        if (Api.playerVoApi.getPlayerLevel() < 1) {
            str = "officeUpgradeTitle2";
        }
        var titleTF = ComponentManager.getTextField(LanguageManager.getlocal(str, [Api.playerVoApi.getPlayerMinLevelStr()]), 36);
        titleTF.x = GameConfig.stageWidth / 2 - titleTF.width / 2;
        titleTF.y = 7;
        titleTF.setColor(TextFieldConst.COLOR_LIGHT_YELLOW);
        scrollContainer.addChild(titleTF);
        var subTitleTF = ComponentManager.getTextField(LanguageManager.getlocal("promotion_privilege_dbdragon"), 30, TextFieldConst.COLOR_LIGHT_YELLOW);
        subTitleTF.x = GameConfig.stageWidth / 2 - subTitleTF.width / 2;
        subTitleTF.y = 95;
        scrollContainer.addChild(subTitleTF);
        var playerLevel = Api.playerVoApi.getPlayerLevel();
        var contentTF = ComponentManager.getTextField(Api.playerVoApi.getCurLevelPrivilegeTxtStr(playerLevel), TextFieldConst.FONTSIZE_CONTENT_COMMON, textColor);
        contentTF.x = GameConfig.stageWidth / 2 - contentTF.width / 2 - 20;
        contentTF.y = subTitleTF.y + 40;
        contentTF.lineSpacing = 10;
        // scrollContainer.addChild(contentTF);
        this.addTouchTap(this.checkShare, this, null);
        var txtNode = new BaseDisplayObjectContainer();
        txtNode.x = 100;
        txtNode.y = subTitleTF.y + 40;
        scrollContainer.addChild(txtNode);
        // //解锁门客
        // let curLv = Api.playerVoApi.getPlayerLevel();
        // let nextLvCfg = Config.LevelCfg.getCfgByLevel((curLv).toString())
        // if( nextLvCfg.servant){
        // 	let alphbg =  BaseBitmap.create("public_alphabg2");
        // 	alphbg.anchorOffsetX = alphbg.width/2;
        // 	alphbg.anchorOffsetY = alphbg.height/2;
        // 	alphbg.x = GameConfig.stageWidth/2;
        // 	alphbg.y = scrollContainer.y+300-20;
        // 	this.addChildToContainer(alphbg);
        // 	alphbg.scaleY = 0;
        // 	alphbg.alpha = 0;
        // 	egret.Tween.get(alphbg,{loop:false}).wait(2500).to({alpha:1.0,scaleY:1.0},500);
        // 	let nowVTxt2 = ComponentManager.getTextField("",20,textColor);
        // 	this.addChildToContainer(nowVTxt2);
        // 	let sname =  LanguageManager.getlocal("servant_name"+nextLvCfg.servant);
        // 	nowVTxt2.text = LanguageManager.getlocal("promotion_privilege_dbdragon_servant",[sname]);
        // 	nowVTxt2.x = GameConfig.stageWidth/2 - nowVTxt2.width/2-100;
        // 	nowVTxt2.y = alphbg.y -nowVTxt2.height/2 ;
        // 	nowVTxt2.alpha = 0;
        // 	egret.Tween.get(nowVTxt2,{loop:false}).wait(2500).to({alpha:1.0,x:GameConfig.stageWidth/2 - nowVTxt2.width/2},500);
        // }
        // if( nextLvCfg.unlock && nextLvCfg.unlock >0){
        // 	let alphbg =  BaseBitmap.create("public_alphabg2");
        // 	alphbg.anchorOffsetX = alphbg.width/2;
        // 	alphbg.anchorOffsetY = alphbg.height/2;
        // 	alphbg.x = GameConfig.stageWidth/2;
        // 	alphbg.y = scrollContainer.y+315;
        // 	this.addChildToContainer(alphbg);
        // 	alphbg.scaleY = 0;
        // 	alphbg.alpha = 0;
        // 	egret.Tween.get(alphbg,{loop:false}).wait(2500).to({alpha:1.0,scaleY:1.0},500);
        // 	let nowVTxt3 = ComponentManager.getTextField("",20,textColor);
        // 	this.addChildToContainer(nowVTxt3);
        // 	nowVTxt3.text = LanguageManager.getlocal("promotion_privilege_dbdragon_unlock"+nextLvCfg.unlock);
        // 	nowVTxt3.x = GameConfig.stageWidth/2 - nowVTxt3.width/2-100;
        // 	nowVTxt3.y = alphbg.y -nowVTxt3.height/2 ;
        // 	nowVTxt3.alpha = 0;
        // 	egret.Tween.get(nowVTxt3,{loop:false}).wait(2500).to({alpha:1.0,x:GameConfig.stageWidth/2 - nowVTxt3.width/2},500);
        // }
        egret.Tween.get(txtNode, { loop: false }).wait(2500).to({ x: txtNode.x + 20 }, 500);
        egret.Tween.get(scrollContainer, { loop: false }).wait(2500).to({ alpha: 1.0 }, 500);
        egret.Tween.get(nameTxt, { loop: false }).wait(1500).to({ alpha: 1.0 }, 500);
        // 如果不满足强弹条件，则显示以前的分享按钮(此处会判断平台和开关和官品的条件)
        if (!Api.shareVoApi.checkCanShowShare(ShareVoApi.TYPE_GRADE, playerLevel.toString())) {
            // 分享按钮
            App.ShareGuideUtil.addShareNode(this.container, App.ShareGuideUtil.TYPE_PROMOTION);
        }
        this.refreshLvCfg(30, txtNode);
        txtNode.y = (300 - txtNode.height) / 2;
    };
    PromotionSuccessDBDragonView.prototype.refreshLvCfg = function (bottomInfoY, pNode) {
        if (bottomInfoY === void 0) { bottomInfoY = 0; }
        bottomInfoY = 50;
        var curMinLvId = Api.playerVoApi.getPlayerMinLevelId();
        var curLvCfg = Config.MinlevelCfg.getCfgByMinLevelId(curMinLvId);
        var str = "LV." + curLvCfg.personLv;
        if (Api.composemapVoApi.isChallengeLv()) {
            str = "LV." + Api.composemapVoApi.getCanHaveMaxPersonLv();
        }
        var priTxtStr = [
            [LanguageManager.getlocal("promotion_compose_desc1"), str],
        ];
        if (curLvCfg.gem) {
            priTxtStr = priTxtStr.concat([
                [LanguageManager.getlocal("promotion_compose_desc2"), curLvCfg.gem + ""],
            ]);
        }
        if (curLvCfg && curLvCfg.servantShow) {
            priTxtStr = priTxtStr.concat([
                [LanguageManager.getlocal("promotion_compose_desc3_2"), LanguageManager.getlocal("servant_name" + curLvCfg.servantShow)],
            ]);
        }
        else if (curLvCfg && curLvCfg.servant) {
            priTxtStr = priTxtStr.concat([
                [LanguageManager.getlocal("promotion_privilege6"), LanguageManager.getlocal("servant_name" + curLvCfg.servant)],
            ]);
        }
        if (curLvCfg && curLvCfg.batchCompose) {
            priTxtStr = priTxtStr.concat([
                [LanguageManager.getlocal("promotion_compose_desc5_2"), LanguageManager.getlocal("promotion_compose_batchcompose")],
            ]);
        }
        if (curLvCfg && curLvCfg.oneClickBuy && curLvCfg.oneClickBuy > 0) {
            priTxtStr = priTxtStr.concat([
                [LanguageManager.getlocal("promotion_compose_desc5_2"), LanguageManager.getlocal("promotion_compose_oneclickbuy")],
            ]);
        }
        if (curLvCfg && curLvCfg.buyLimit && curLvCfg.buyLimit > 0) {
            priTxtStr = priTxtStr.concat([
                [LanguageManager.getlocal("promotion_compose_desc6"), curLvCfg.buyLimit + ""],
            ]);
        }
        var descTxtSize = 22;
        var descPerHeight = 35;
        if (PlatformManager.checkIsViSp()) {
            descTxtSize = 20;
        }
        if (priTxtStr.length > 4) {
            bottomInfoY = 70;
        }
        for (var index = 0; index < priTxtStr.length; index++) {
            var procfg = priTxtStr[index];
            var proTxt = undefined;
            proTxt = ComponentManager.getTextField(procfg[0] + ":" + procfg[1], descTxtSize, TextFieldConst.COLOR_LIGHT_YELLOW);
            proTxt.x = 0;
            proTxt.y = bottomInfoY;
            pNode.addChild(proTxt);
            bottomInfoY += descPerHeight;
        }
    };
    //判断是否有强弹分享
    PromotionSuccessDBDragonView.prototype.checkShare = function () {
        var playerLevel = Api.playerVoApi.getPlayerLevel();
        Api.shareVoApi.showShare(ShareVoApi.TYPE_GRADE, playerLevel.toString(), this.tapHandler, this);
    };
    PromotionSuccessDBDragonView.prototype.tapHandler = function () {
        Api.rookieVoApi.checkNextStep();
        this.hide();
        var rData = Api.wifeVoApi.getWaitShowWife();
        if (rData) {
            ViewController.getInstance().openView(ViewConst.BASE.WIFEGETVIEW, { wifeIdList: rData.unlockWife, servantId: rData.unlockServant });
        }
        var rData2 = Api.servantVoApi.getWaitShowData();
        if (rData2) {
            var servantCfg = GameConfig.config.servantCfg[rData2.unlockServant];
            if (servantCfg && servantCfg.getStoryID) {
                ViewController.getInstance().openView(ViewConst.COMMON.SEARCHSTORYVIEW, { storyId: servantCfg.getStoryID, callback: function (unlockServant) {
                        ViewController.getInstance().openView(ViewConst.BASE.SERVANTGETVIEW, unlockServant);
                    }, target: this, params: rData2.unlockServant });
            }
            else {
                ViewController.getInstance().openView(ViewConst.BASE.SERVANTGETVIEW, rData2.unlockServant);
            }
        }
    };
    PromotionSuccessDBDragonView.prototype.getBgName = function () {
        return "public_9_black";
    };
    PromotionSuccessDBDragonView.prototype.doTimerHandler = function () {
        var rect = this._scrollContainer.mask;
        var moveW = (this._scrollContainer.width / 2 - this._temW) / this._repeatCount * this._num;
        this._scrollContainer.x = this.viewBg.width / 2 - this._temW - moveW;
        rect.setTo(-this._scrollContainer.width / 2 + this._scrollRight.width + moveW, 0, 594 / 2 + moveW, 449);
        this._scrollContainer.mask = rect;
        this._scrollRight.x = this.viewBg.width / 2 + moveW - this._temW;
        this._num += 1;
        // App.LogUtil.show("num:",this._num,rect.x,rect.y,rect.width,rect.height);
    };
    PromotionSuccessDBDragonView.prototype.complateHandler = function () {
        var rect = this._scrollContainer.mask;
        egret.Rectangle.release(rect);
        this._scrollContainer.mask = null;
        this.removeChildFromContainer(this._scrollRight);
        this._scrollRight.dispose();
        this._scrollRight = null;
        TimerManager.removeAll(this);
    };
    PromotionSuccessDBDragonView.prototype.onChange = function () {
        if (this._titleTween) {
            egret.Tween.removeTweens(this._titleTween);
            this._titleTween = null;
            TimerManager.doTimer(this._totalTime / this._repeatCount, this._repeatCount, this.doTimerHandler, this, this.complateHandler, this);
        }
        if (this._levelTween) {
            egret.Tween.removeTweens(this._levelTween);
            this._levelTween = null;
        }
    };
    PromotionSuccessDBDragonView.prototype.getResourceList = function () {
        return [
            "promotion_bg1",
            "prisonview_1",
            "shareBtn",
            "shareRewardPop",
            "atkracevipbg",
            "public_green_arrow",
        ];
    };
    PromotionSuccessDBDragonView.prototype.getTitleStr = function () {
        return null;
    };
    PromotionSuccessDBDragonView.prototype.getButtomLineBg = function () {
        return null;
    };
    PromotionSuccessDBDragonView.prototype.getCloseBtnName = function () {
        return null;
    };
    PromotionSuccessDBDragonView.prototype.getTitleBgName = function () {
        return null;
    };
    PromotionSuccessDBDragonView.prototype.dispose = function () {
        this.onChange();
        if (this._bgTween) {
            egret.Tween.removeTweens(this._bgTween);
            this._bgTween = null;
        }
        if (TimerManager.isExists(this.doTimerHandler, this)) {
            // App.LogUtil.show("TimerManager.removeAll");
            TimerManager.removeAll(this);
        }
        this._levelTF = null;
        this._scrollContainer = null;
        this._scrollRight = null;
        this._temW = 45;
        this._num = 1;
        _super.prototype.dispose.call(this);
    };
    return PromotionSuccessDBDragonView;
}(CommonView));
__reflect(PromotionSuccessDBDragonView.prototype, "PromotionSuccessDBDragonView");
