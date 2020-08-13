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
 * 升官成功
 * author dmj
 * date 2017/9/29
 * @class PromotionSuccessView
 **/
var PromotionSuccessView = (function (_super) {
    __extends(PromotionSuccessView, _super);
    function PromotionSuccessView() {
        var _this = _super.call(this) || this;
        _this._temW = 45;
        _this._num = 1;
        _this._totalTime = 600;
        _this._repeatCount = 20;
        return _this;
    }
    PromotionSuccessView.prototype.initView = function () {
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
        var titleImage = BaseBitmap.create("promotion_sucess");
        titleImage.anchorOffsetX = titleImage.width / 2;
        titleImage.anchorOffsetY = titleImage.height / 2;
        // titleImage.x = GameConfig.stageWidth/2 - titleImage.width/2 ;
        // titleImage.y = 20;
        titleImage.x = GameConfig.stageWidth / 2;
        titleImage.y = titleImage.height / 2 + 50;
        titleImage.setScale(1.3);
        this.addChildToContainer(titleImage);
        this._titleTween = egret.Tween.get(titleImage);
        this._titleTween.to({ scaleX: 1, scaleY: 1 }, 100).call(this.onChange, this);
        var roleImage = Api.playerVoApi.getPlayerPortrait(Api.playerVoApi.getPlayerLevel(), Api.playerVoApi.getPlayePicId());
        // roleImage.scaleX = roleImage.scaleY = 1.4;
        roleImage.x = this.viewBg.width / 2 - roleImage.width / 2;
        roleImage.y = 180;
        this.addChildToContainer(roleImage);
        var nameBg = BaseBitmap.create("atkracevipbg");
        ;
        // let nameBg =  BaseBitmap.create("public_get_namebg");
        // nameBg.x = 50
        // nameBg.y = 180;
        this.addChildToContainer(nameBg);
        var nameTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL);
        nameTxt.multiline = true;
        if (PlatformManager.checkIsTextHorizontal()) {
            nameTxt.text = Api.playerVoApi.getPlayerOffice();
            nameBg.rotation = -90;
            nameBg.height = nameTxt.width + 30;
            nameBg.x = this.viewBg.width / 2 - nameBg.height / 2;
            nameBg.y = GameConfig.stageHeigth - 400; //bg.y+bg.height - 40;
            nameTxt.x = nameBg.x + nameBg.height / 2 - nameTxt.width / 2;
            nameTxt.y = nameBg.y + nameBg.width / 2 - nameTxt.height / 2 - nameBg.width;
        }
        else {
            nameTxt.width = 20;
            nameTxt.text = Api.playerVoApi.getPlayerOffice();
            nameBg.x = 50;
            nameBg.y = 180;
            nameTxt.x = nameBg.x + nameBg.width / 2 - nameTxt.width / 2;
            nameTxt.y = nameBg.y + nameBg.height / 2 - nameTxt.height / 2;
        }
        this.addChildToContainer(nameTxt);
        var scrollContainer = new BaseDisplayObjectContainer();
        // let scrollBg:BaseDisplayObjectContainer=App.CommonUtil.getContainerByLeftHalfRes("public_rule_bg");
        var scrollLeft = BaseBitmap.create("promotion_scroll");
        scrollLeft.scaleX = -1;
        scrollLeft.x = scrollLeft.width;
        scrollLeft.y = 0;
        var scrollRight = BaseBitmap.create("promotion_scroll");
        scrollRight.x = GameConfig.stageWidth - scrollRight.width;
        scrollRight.y = 0;
        var scrollBg = BaseBitmap.create("promotion_scroll_1");
        scrollBg.x = GameConfig.stageWidth / 2 - scrollBg.width / 2;
        scrollBg.y = scrollLeft.height / 2 - scrollBg.height / 2;
        scrollContainer.y = GameConfig.stageHeigth - scrollLeft.height;
        this.addChildToContainer(scrollContainer);
        scrollContainer.addChild(scrollBg);
        scrollContainer.addChild(scrollLeft);
        scrollContainer.addChild(scrollRight);
        // let titleTFBg = BaseBitmap.create("prisonview_1");
        // titleTFBg.x = GameConfig.stageWidth/2 - titleTFBg.width/2;
        // titleTFBg.y = scrollContainer.y - 30;
        // this.addChildToContainer(titleTFBg);
        var str = "officeUpgradeTitle";
        if (Api.playerVoApi.getPlayerLevel() < 1) {
            str = "officeUpgradeTitle2";
        }
        var titleTF = ComponentManager.getTextField(LanguageManager.getlocal(str, [Api.playerVoApi.getPlayerOffice()]), 36);
        titleTF.x = GameConfig.stageWidth / 2 - titleTF.width / 2;
        titleTF.y = 50;
        titleTF.setColor(TextFieldConst.COLOR_LIGHT_YELLOW);
        scrollContainer.addChild(titleTF);
        var subTitleTF = ComponentManager.getTextField(LanguageManager.getlocal("promotion_privilege"), 30, TextFieldConst.COLOR_LIGHT_YELLOW);
        subTitleTF.x = 120; //GameConfig.stageWidth/2 - subTitleTF.width/2;
        subTitleTF.y = 100;
        scrollContainer.addChild(subTitleTF);
        var playerLevel = Api.playerVoApi.getPlayerLevel();
        // let contentTF:BaseTextField = ComponentManager.getTextField(Api.playerVoApi.getCurLevelPrivilegeTxtStr(playerLevel),TextFieldConst.FONTSIZE_CONTENT_COMMON,textColor);
        // contentTF.x = GameConfig.stageWidth/2 - contentTF.width/2;
        // contentTF.y = subTitleTF.y + 40;
        // contentTF.lineSpacing = 10;
        // scrollContainer.addChild(contentTF);
        this._scrollRight = BaseBitmap.create("promotion_scroll");
        this._scrollRight.y = scrollContainer.y + 2;
        this.addChildToContainer(this._scrollRight);
        scrollContainer.x = this.viewBg.width / 2 - this._temW; // - scrollContainer.width/2;
        this._scrollRight.x = this.viewBg.width / 2;
        var rect = egret.Rectangle.create();
        rect.setTo(-scrollContainer.width / 2 + this._scrollRight.width, 0, scrollBg.width / 2, scrollBg.height);
        scrollContainer.mask = rect;
        this._scrollContainer = scrollContainer;
        this.addTouchTap(this.checkShare, this, null);
        // 如果不满足强弹条件，则显示以前的分享按钮(此处会判断平台和开关和官品的条件)
        if (!Api.shareVoApi.checkCanShowShare(ShareVoApi.TYPE_GRADE, playerLevel.toString())) {
            // 分享按钮
            App.ShareGuideUtil.addShareNode(this.container, App.ShareGuideUtil.TYPE_PROMOTION);
        }
        var txtNode = new BaseDisplayObjectContainer();
        txtNode.x = 170;
        txtNode.y = subTitleTF.y + 20;
        scrollContainer.addChild(txtNode);
        this.refreshLvCfg(30, txtNode);
    };
    PromotionSuccessView.prototype.refreshLvCfg = function (bottomInfoY, pNode) {
        if (bottomInfoY === void 0) { bottomInfoY = 0; }
        bottomInfoY = 50;
        var curLv = Api.playerVoApi.getPlayerMinLevelId();
        var curLvCfg = Config.MinlevelCfg.getCfgByMinLevelId(curLv);
        var str = "LV." + curLvCfg.personLv;
        var priTxtStr = [
            [LanguageManager.getlocal("promotion_compose_desc1"), str],
        ];
        if (curLvCfg.gem) {
            priTxtStr = priTxtStr.concat([
                [LanguageManager.getlocal("promotion_compose_desc2"), curLvCfg.gem + ""],
            ]);
        }
        if (curLvCfg.servant) {
            priTxtStr = priTxtStr.concat([
                // [LanguageManager.getlocal("promotion_compose_desc3"),LanguageManager.getlocal("servant_name"+curLvCfg.servant) ],
                [LanguageManager.getlocal("promotion_compose_desc3_2"), LanguageManager.getlocal("servant_name" + curLvCfg.servant)],
            ]);
        }
        var descTxtSize = 22;
        var descPerHeight = 35;
        var proBgHeight = 34;
        if (PlatformManager.checkIsViSp()) {
            descTxtSize = 20;
        }
        var strIdx = 0;
        for (var index = 0; index < priTxtStr.length; index++) {
            var procfg = priTxtStr[index];
            var proTxt = undefined;
            var nowVTxt1 = undefined;
            var nowVTxt2 = undefined;
            var proArrow = undefined;
            proTxt = ComponentManager.getTextField(procfg[0] + ":" + procfg[1], descTxtSize, TextFieldConst.COLOR_LIGHT_YELLOW);
            proTxt.x = 0;
            proTxt.y = bottomInfoY;
            pNode.addChild(proTxt);
            bottomInfoY += descPerHeight;
        }
    };
    //判断是否有强弹分享
    PromotionSuccessView.prototype.checkShare = function () {
        var playerLevel = Api.playerVoApi.getPlayerLevel();
        Api.shareVoApi.showShare(ShareVoApi.TYPE_GRADE, playerLevel.toString(), this.tapHandler, this);
    };
    PromotionSuccessView.prototype.tapHandler = function () {
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
    PromotionSuccessView.prototype.hide = function () {
        // PlayerBottomUI.getInstance().hide(true);
        // ViewController.getInstance().hideView(ViewConst.COMMON.PLAYERVIEW);
        // PlayerBottomUI.getInstance().show();
        _super.prototype.hide.call(this);
    };
    PromotionSuccessView.prototype.getBgName = function () {
        return "public_9_black";
    };
    PromotionSuccessView.prototype.doTimerHandler = function () {
        var rect = this._scrollContainer.mask;
        var moveW = (this._scrollContainer.width / 2 - this._temW) / this._repeatCount * this._num;
        this._scrollContainer.x = this.viewBg.width / 2 - this._temW - moveW;
        rect.setTo(-this._scrollContainer.width / 2 + this._scrollRight.width + moveW, 0, 594 / 2 + moveW, 449);
        this._scrollContainer.mask = rect;
        this._scrollRight.x = this.viewBg.width / 2 + moveW - this._temW;
        this._num += 1;
        // App.LogUtil.show("num:",this._num,rect.x,rect.y,rect.width,rect.height);
    };
    PromotionSuccessView.prototype.complateHandler = function () {
        var rect = this._scrollContainer.mask;
        egret.Rectangle.release(rect);
        this._scrollContainer.mask = null;
        this.removeChildFromContainer(this._scrollRight);
        this._scrollRight.dispose();
        this._scrollRight = null;
        TimerManager.removeAll(this);
    };
    PromotionSuccessView.prototype.onChange = function () {
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
    // protected getParent():egret.DisplayObjectContainer
    // {
    // 	// return LayerManager.panelLayer;
    //     return PlayerBottomUI.getInstance().parent;
    // }
    PromotionSuccessView.prototype.getResourceList = function () {
        return [
            "promotion_bg1",
            "promotion_sucess", "promotion_scroll",
            "promotion_scroll_1",
            "prisonview_1",
            "shareBtn",
            "shareRewardPop",
            "atkracevipbg"
        ];
    };
    PromotionSuccessView.prototype.getTitleStr = function () {
        return null;
    };
    PromotionSuccessView.prototype.getButtomLineBg = function () {
        return null;
    };
    PromotionSuccessView.prototype.getCloseBtnName = function () {
        return null;
    };
    PromotionSuccessView.prototype.getTitleBgName = function () {
        return null;
    };
    PromotionSuccessView.prototype.dispose = function () {
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
    return PromotionSuccessView;
}(CommonView));
__reflect(PromotionSuccessView.prototype, "PromotionSuccessView");
