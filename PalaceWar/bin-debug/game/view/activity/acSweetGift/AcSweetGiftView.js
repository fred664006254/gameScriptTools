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
 * 月夜仙缘
 * author yangchengguo
 * date 2019.8.19
 * @class AcSweetGiftView
 */
var AcSweetGiftView = (function (_super) {
    __extends(AcSweetGiftView, _super);
    function AcSweetGiftView() {
        var _this = _super.call(this) || this;
        _this._bgContainer = null;
        _this._timeBg = null;
        _this._acTimeTf = null;
        _this._scoreNum = null;
        // public _currHaveInfo:BaseDisplayObjectContainer = null;
        _this._startY = 0;
        _this._makeOneNeedDesc = null;
        _this._freeDesc = null;
        _this._isSelectMakeBtn = false;
        _this._rewardBtn = null;
        _this._isPlayTen = false;
        _this._buildings = [];
        _this._rabbit = null;
        _this._isSelectVisitBtn = false;
        _this._selectVisitIndex = -1;
        _this._visitRewards = null;
        _this._makeMultiNeedDesc = null;
        _this._makeOneNeedContainer = null;
        //建筑位置
        _this._buildingPos = [
            { x: 426, y: 708 },
            { x: 8, y: 593 },
            { x: 361, y: 483 },
            { x: 0, y: 443 },
            { x: 128, y: 233 }
        ];
        //建筑名字位置
        _this._buildingNamePos = [
            { x: 431, y: 688 },
            { x: 220, y: 620 },
            { x: 449, y: 477 },
            { x: 60, y: 451 },
            { x: 261, y: 248 }
        ];
        //标签位置
        _this._buildingFlagPos = [
            { x: 450, y: 800 },
            { x: 130, y: 731 },
            { x: 430, y: 596 },
            { x: 75, y: 560 },
            { x: 265, y: 417 }
        ];
        //云位置
        _this._cloudPos = [
            { posLeft: [345, 674], posRight: [434, 719] },
            { posLeft: [11, 611], posRight: [139, 648] },
            { posLeft: [306, 467], posRight: [431, 507] },
            { posLeft: [-20, 441], posRight: [67, 476] },
            { posLeft: [114, 273], posRight: [235, 333] },
        ];
        //灯光位置
        _this._lightPos = [
            { x: 442, y: 710 },
            { x: 58, y: 666 },
            { x: 403, y: 519 },
            { x: 70, y: 440 },
            { x: 158, y: 314 }
        ];
        return _this;
    }
    AcSweetGiftView.prototype.initView = function () {
        var _this = this;
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY_SWEETGIFT_MAKE, this.makeRequestCallback, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY_SWEETGIFT_GETVISIT, this.visitCallback, this);
        var bgStr = ResourceManager.hasRes("acsweetgift_bg-" + this.getTypeCode()) ? "acsweetgift_bg-" + this.getTypeCode() : "acsweetgift_bg-1";
        //bg
        var bg = BaseBitmap.create(bgStr);
        var bgContainer = new BaseDisplayObjectContainer();
        bgContainer.width = bg.width;
        bgContainer.height = bg.height;
        this._bgContainer = bgContainer;
        this.addChildToContainer(bgContainer);
        bgContainer.addChild(bg);
        // bg.addTouch(this.moveBgHandler, this);
        var rect = new egret.Rectangle(0, 0, GameConfig.stageWidth, GameConfig.stageHeigth);
        var noticescrollView = ComponentManager.getScrollView(bgContainer, rect);
        noticescrollView.bounces = false;
        noticescrollView.setPosition(0, 0);
        noticescrollView.verticalScrollPolicy = 'on';
        bgContainer.y = 0;
        noticescrollView.setShowArrow(false);
        this.addChildToContainer(noticescrollView);
        noticescrollView.setScrollTop(bgContainer.height - GameConfig.stageHeigth, 0);
        //desc
        var acDescBg = BaseBitmap.create("acliangbiographyview_common_acbg");
        acDescBg.width = GameConfig.stageWidth;
        acDescBg.height = 155;
        acDescBg.setPosition(0, this.titleBg.y + this.titleBg.height - 7);
        this.addChildToContainer(acDescBg);
        //介绍
        var acDesc = ComponentManager.getTextField(LanguageManager.getlocal("sweetgiftDesc-" + this.code), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        acDesc.width = 600;
        acDesc.lineSpacing = 6;
        acDesc.setPosition(20, acDescBg.y + acDescBg.height / 2 - acDesc.height / 2 - 12);
        if (acDesc.height > acDescBg.height) {
            acDesc.y = acDescBg.y + 4;
        }
        this.addChildToContainer(acDesc);
        //日期
        var acDate = ComponentManager.getTextField(LanguageManager.getlocal("sweetgiftDate", [this.vo.acTimeAndHour]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        acDate.setPosition(acDesc.x, acDesc.y + acDesc.height + 6);
        this.addChildToContainer(acDate);
        //活动倒计时
        this._timeBg = BaseBitmap.create("public_9_bg61");
        this._timeBg.y = acDescBg.y + acDescBg.height - this._timeBg.height / 2 - 2;
        this.addChildToContainer(this._timeBg);
        this._acTimeTf = ComponentManager.getTextField(LanguageManager.getlocal("sweetgiftTimeDown", [this.vo.getCountDown()]), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._timeBg.width = 60 + this._acTimeTf.width;
        this._timeBg.x = GameConfig.stageWidth - this._timeBg.width - 5;
        this._acTimeTf.setPosition(this._timeBg.x + this._timeBg.width / 2 - this._acTimeTf.width / 2, this._timeBg.y + this._timeBg.height / 2 - this._acTimeTf.height / 2);
        this.addChildToContainer(this._acTimeTf);
        //分数
        var scoreBg = BaseBitmap.create("public_9_resbg");
        scoreBg.setPosition(10, acDescBg.y + acDescBg.height + 15);
        this.addChildToContainer(scoreBg);
        //score icon
        var scoreIconImg = ResourceManager.hasRes("ac_sweetgift_gift_icon-" + this.getTypeCode()) ? "ac_sweetgift_gift_icon-" + this.getTypeCode() : "ac_sweetgift_gift_icon-1";
        var scoreIcon = BaseBitmap.create(scoreIconImg);
        scoreIcon.setPosition(scoreBg.x - 3, scoreBg.y - 4);
        this.addChildToContainer(scoreIcon);
        //score num
        var scoreNum = ComponentManager.getTextField("0", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        scoreNum.setPosition(scoreIcon.x + scoreIcon.width + 10, scoreBg.y + scoreBg.height / 2 - scoreNum.height / 2);
        this.addChildToContainer(scoreNum);
        this._scoreNum = scoreNum;
        //底部
        var bottomBg = BaseBitmap.create("arena_bottom");
        bottomBg.width = 640;
        bottomBg.height = 140;
        bottomBg.setPosition(0, GameConfig.stageHeigth - bottomBg.height);
        bottomBg.name = "bottomBg";
        this.getSkinView(String(this.cfg.show1));
        this.getSkinView(String(this.cfg.show2));
        this.addChildToContainer(bottomBg);
        //底部按钮
        //制作一次
        var makeOneBtn = ComponentManager.getButton("btn_big_yellow", "sweetgiftMakeOne-" + this.code, this.makeBtnClick, this, ["0"]);
        makeOneBtn.setPosition(60, bottomBg.y + bottomBg.height - makeOneBtn.height - 35);
        this.addChildToContainer(makeOneBtn);
        //免费
        var freeDesc = ComponentManager.getTextField(LanguageManager.getlocal("sweetgiftMakeFree"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WARN_GREEN);
        freeDesc.setPosition(makeOneBtn.x + makeOneBtn.width / 2 - freeDesc.width / 2, makeOneBtn.y - 25);
        this.addChildToContainer(freeDesc);
        this._freeDesc = freeDesc;
        var makeOneNeedContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(makeOneNeedContainer);
        var oneGemIcon = BaseLoadBitmap.create("itemicon1");
        oneGemIcon.width = 100;
        oneGemIcon.height = 100;
        oneGemIcon.setScale(0.5);
        makeOneNeedContainer.addChild(oneGemIcon);
        var makeOneNeedDesc = ComponentManager.getTextField(String(this.cfg.cost), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WARN_YELLOW);
        makeOneNeedDesc.setPosition(oneGemIcon.x + oneGemIcon.width * oneGemIcon.scaleX, oneGemIcon.y + oneGemIcon.height * oneGemIcon.scaleY / 2 - makeOneNeedDesc.height / 2 + 4);
        makeOneNeedContainer.addChild(makeOneNeedDesc);
        makeOneNeedContainer.width = oneGemIcon.width * oneGemIcon.scaleX + makeOneNeedDesc.width;
        makeOneNeedContainer.setPosition(makeOneBtn.x + makeOneBtn.width / 2 - makeOneNeedContainer.width / 2 - 2, makeOneBtn.y - oneGemIcon.height * oneGemIcon.scaleY + 5);
        this._makeOneNeedContainer = makeOneNeedContainer;
        this._makeOneNeedDesc = makeOneNeedDesc;
        if (this.vo.isFree()) {
            freeDesc.visible = true;
            makeOneNeedContainer.visible = false;
        }
        else {
            freeDesc.visible = false;
            makeOneNeedContainer.visible = false;
        }
        //制作十次
        var makeMultiBtn = ComponentManager.getButton("btn_big_yellow", "sweetgiftMakeMulti-" + this.code, this.makeBtnClick, this, ["1"]);
        makeMultiBtn.setPosition(GameConfig.stageWidth - 60 - makeMultiBtn.width, bottomBg.y + bottomBg.height - makeMultiBtn.height - 35);
        this.addChildToContainer(makeMultiBtn);
        var multiNeed = this.cfg.cost * 10;
        if (this.cfg.discount) {
            multiNeed *= this.cfg.discount;
        }
        var makeMultiNeedContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(makeMultiNeedContainer);
        var multiGemIcon = BaseLoadBitmap.create("itemicon1");
        multiGemIcon.width = 100;
        multiGemIcon.height = 100;
        multiGemIcon.setScale(0.5);
        makeMultiNeedContainer.addChild(multiGemIcon);
        var makeMultiNeedDesc = ComponentManager.getTextField(String(multiNeed), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WARN_YELLOW);
        makeMultiNeedDesc.setPosition(multiGemIcon.x + multiGemIcon.width * multiGemIcon.scaleX, multiGemIcon.y + multiGemIcon.height * multiGemIcon.scaleY / 2 - makeMultiNeedDesc.height / 2 + 4);
        makeMultiNeedContainer.addChild(makeMultiNeedDesc);
        makeMultiNeedContainer.width = multiGemIcon.width * multiGemIcon.scaleX + makeMultiNeedDesc.width;
        makeMultiNeedContainer.setPosition(makeMultiBtn.x + makeMultiBtn.width / 2 - makeMultiNeedContainer.width / 2 - 2, makeMultiBtn.y - multiGemIcon.height * multiGemIcon.scaleY + 5);
        this._makeMultiNeedDesc = makeMultiNeedDesc;
        var makeEnterDesc = ComponentManager.getTextField(LanguageManager.getlocal("sweetgiftMakeMultiInfo-" + this.code), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WARN_GREEN);
        makeEnterDesc.setPosition(makeMultiBtn.x + makeMultiBtn.width / 2 - makeEnterDesc.width / 2, makeMultiBtn.y + makeMultiBtn.height + 3);
        this.addChildToContainer(makeEnterDesc);
        //打折标记
        if (this.cfg.discount) {
            var discount = this.cfg.discount;
            var tag = BaseBitmap.create('shopview_corner');
            tag.setPosition(makeMultiBtn.x, makeMultiBtn.y);
            this.addChildToContainer(tag);
            tag.setScale(0.9);
            var tagTxt = ComponentManager.getTextField(LanguageManager.getlocal('sweetgiftShopDiscount-' + this.code, [String(discount * 10)]), 18, TextFieldConst.COLOR_WARN_YELLOW);
            var tagnum = 10 - discount * 10;
            if (PlatformManager.checkIsEnLang() || PlatformManager.checkIsThSp()) {
                tagTxt.text = LanguageManager.getlocal('sweetgiftShopDiscount-' + this.code, [(tagnum * 10).toString()]);
            }
            tagTxt.width = 70;
            tagTxt.height = 20;
            tagTxt.textAlign = egret.HorizontalAlign.CENTER;
            tagTxt.anchorOffsetX = tagTxt.width / 2;
            tagTxt.anchorOffsetY = tagTxt.height / 2;
            App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, tagTxt, tag, [-tagTxt.anchorOffsetX + 22, -tagTxt.anchorOffsetY + 21]);
            tagTxt.rotation = -45;
            this.addChildToContainer(tagTxt);
        }
        this.createBuildName();
        //添加兔子
        // let rabbit = this.createRabbitAni();
        // rabbit.setPosition(bg.width/2 - rabbit.width/2 - 20, 800);
        // this._bgContainer.addChild(rabbit);
        // this._rabbit = rabbit;
        var rewardBtn = ComponentManager.getButton("achuntingviewchargebtn", "", function () {
            ViewController.getInstance().openView(ViewConst.POPUP.ACSWEETGIFTREWARDPOPVIEW, { aid: _this.aid, code: _this.code });
        }, this);
        rewardBtn.setPosition(GameConfig.stageWidth - rewardBtn.width - 20, bottomBg.y - rewardBtn.height - 20);
        this.addChildToContainer(rewardBtn);
        this._rewardBtn = rewardBtn;
        /**衣装预览 start */
        //门客
        var achieveData = this.cfg.getAchievementList();
        var servantNeedMoney = 0;
        if (achieveData && achieveData.length > 0) {
            servantNeedMoney = achieveData[achieveData.length - 1].needNum;
        }
        var wifeNeedMoney = this.vo.getWifeNeedMoney();
        var skinTxtEffect = ComponentManager.getCustomMovieClip("acwealthcarpview_skineffect", 10, 70);
        var skinTxtEffectBM = BaseBitmap.create("acwealthcarpview_skineffect1");
        skinTxtEffect.setPosition(0, bottomBg.y - 40 - skinTxtEffectBM.height / 2);
        skinTxtEffect.blendMode = egret.BlendMode.ADD;
        this.addChildToContainer(skinTxtEffect);
        skinTxtEffect.playWithTime(-1);
        skinTxtEffect.addTouchTap(function () {
            ViewController.getInstance().openView(ViewConst.POPUP.ACSWEETGIFTSKINPOPUPVIEW, {
                wifeId: _this.cfg.show2,
                servantId: _this.cfg.show1,
                wifeNeedText: "sweetgiftShowWifeTopMsg-" + _this.code,
                servantNeedText: "sweetgiftShowServentTopMsg-" + _this.code,
                wifeNeed: "" + wifeNeedMoney,
                servantNeed: "" + servantNeedMoney,
                isShowWife: false
            });
        }, this);
        var skinTxt = BaseBitmap.create("acsearchproofview_common_skintxt");
        skinTxt.anchorOffsetX = skinTxt.width / 2;
        skinTxt.anchorOffsetY = skinTxt.height / 2;
        skinTxt.setPosition(skinTxtEffect.x + 100, bottomBg.y - 40);
        this.addChildToContainer(skinTxt);
        egret.Tween.get(skinTxt, { loop: true }).to({ scaleX: 1.05, scaleY: 1.05 }, 400).to({ scaleX: 1, scaleY: 1 }, 400);
        var skinTxteffect = BaseBitmap.create("acsearchproofview_common_skintxt");
        skinTxteffect.anchorOffsetX = skinTxteffect.width / 2;
        skinTxteffect.anchorOffsetY = skinTxteffect.height / 2;
        skinTxteffect.setPosition(skinTxt.x, skinTxt.y);
        this.addChildToContainer(skinTxteffect);
        skinTxteffect.blendMode = egret.BlendMode.ADD;
        skinTxteffect.alpha = 0;
        egret.Tween.get(skinTxteffect, { loop: true }).to({ alpha: 0.7, scaleX: 1.05, scaleY: 1.05 }, 400).to({ alpha: 0, scaleX: 1, scaleY: 1 }, 400);
        //佳人
        var skinTxtEffectWife = ComponentManager.getCustomMovieClip("acwealthcarpview_skineffect", 10, 70);
        var skinTxtEffectBMWife = BaseBitmap.create("acwealthcarpview_skineffect1");
        skinTxtEffectWife.setPosition(GameConfig.stageWidth / 2 - 70, bottomBg.y - 40 - skinTxtEffectBMWife.height / 2);
        skinTxtEffectWife.blendMode = egret.BlendMode.ADD;
        this.addChildToContainer(skinTxtEffectWife);
        skinTxtEffectWife.playWithTime(-1);
        skinTxtEffectWife.addTouchTap(function () {
            ViewController.getInstance().openView(ViewConst.POPUP.ACSWEETGIFTSKINPOPUPVIEW, {
                wifeId: _this.cfg.show2,
                servantId: _this.cfg.show1,
                wifeNeedText: "sweetgiftShowWifeTopMsg-" + _this.code,
                servantNeedText: "sweetgiftShowServentTopMsg-" + _this.code,
                wifeNeed: "" + wifeNeedMoney,
                servantNeed: "" + servantNeedMoney,
                isShowWife: true
            });
        }, this);
        var skinTxtWife = BaseBitmap.create("acsearchproofview_common_skintxt");
        skinTxtWife.anchorOffsetX = skinTxtWife.width / 2;
        skinTxtWife.anchorOffsetY = skinTxtWife.height / 2;
        skinTxtWife.setPosition(skinTxtEffectWife.x + 100, bottomBg.y - 40);
        this.addChildToContainer(skinTxtWife);
        egret.Tween.get(skinTxt, { loop: true }).to({ scaleX: 1.05, scaleY: 1.05 }, 400).to({ scaleX: 1, scaleY: 1 }, 400);
        var skinTxteffectWife = BaseBitmap.create("acsearchproofview_common_skintxt");
        skinTxteffectWife.anchorOffsetX = skinTxteffectWife.width / 2;
        skinTxteffectWife.anchorOffsetY = skinTxteffectWife.height / 2;
        skinTxteffectWife.setPosition(skinTxtWife.x, skinTxtWife.y);
        this.addChildToContainer(skinTxteffectWife);
        skinTxteffectWife.blendMode = egret.BlendMode.ADD;
        skinTxteffectWife.alpha = 0;
        egret.Tween.get(skinTxteffectWife, { loop: true }).to({ alpha: 0.7, scaleX: 1.05, scaleY: 1.05 }, 400).to({ alpha: 0, scaleX: 1, scaleY: 1 }, 400);
        /**衣装预览 end */
        this.refreshView();
    };
    //build name
    AcSweetGiftView.prototype.createBuildName = function () {
        var data = this.cfg.getAchievementList();
        for (var i = 0; i < data.length; i++) {
            var container = new BaseDisplayObjectContainer();
            container.setPosition(this._buildingPos[i].x, this._buildingPos[i].y);
            var buildImg = ResourceManager.hasRes("acsweetgift_building-" + this.getTypeCode() + "_" + (i + 1)) ? "acsweetgift_building-" + this.getTypeCode() + "_" + (i + 1) : "acsweetgift_building-1_" + (i + 1);
            var building = BaseBitmap.create(buildImg);
            container.addChild(building);
            building.visible = true;
            building.name = "building";
            container.width = building.width;
            container.height = building.height;
            egret.Tween.get(building, { loop: true }).to({ alpha: 0.5 }, 600).to({ alpha: 1 }, 600);
            var buildingLightImg = ResourceManager.hasRes("acsweetgift_building_light-" + this.getTypeCode() + "_" + (i + 1)) ? "acsweetgift_building_light-" + this.getTypeCode() + "_" + (i + 1) : "acsweetgift_building_light-1_" + (i + 1);
            var buildingLight = BaseBitmap.create(buildingLightImg);
            buildingLight.setPosition(this._lightPos[i].x - container.x, this._lightPos[i].y - container.y);
            buildingLight.blendMode = egret.BlendMode.ADD;
            container.addChild(buildingLight);
            buildingLight.visible = false;
            buildingLight.name = "buildingLight";
            egret.Tween.get(buildingLight, { loop: true }).to({ alpha: 0 }, 1000).to({ alpha: 1 }, 1000);
            var cloundLeftImg = ResourceManager.hasRes("acsweetgift_cloud-" + this.getTypeCode() + "_1") ? "acsweetgift_cloud-" + this.getTypeCode() + "_1" : "acsweetgift_cloud-1_1";
            var cloundRightImg = ResourceManager.hasRes("acsweetgift_cloud-" + this.getTypeCode() + "_2") ? "acsweetgift_cloud-" + this.getTypeCode() + "_2" : "acsweetgift_cloud-1_2";
            if (i == 4) {
                cloundLeftImg = ResourceManager.hasRes("acsweetgift_moon_cloud-" + this.getTypeCode() + "_1") ? "acsweetgift_moon_cloud-" + this.getTypeCode() + "_1" : "acsweetgift_moon_cloud-1_1";
                cloundRightImg = ResourceManager.hasRes("acsweetgift_moon_cloud-" + this.getTypeCode() + "_2") ? "acsweetgift_moon_cloud-" + this.getTypeCode() + "_2" : "acsweetgift_moon_cloud-1_2";
            }
            var posLeft = this._cloudPos[i].posLeft;
            var cloundLeft = BaseBitmap.create(cloundLeftImg);
            cloundLeft.setPosition(posLeft[0] - container.x, posLeft[1] - container.y);
            container.addChild(cloundLeft);
            cloundLeft.visible = true;
            cloundLeft.name = "cloudLeft";
            var posRight = this._cloudPos[i].posRight;
            var cloundRight = BaseBitmap.create(cloundRightImg);
            cloundRight.setPosition(posRight[0] - container.x, posRight[1] - container.y);
            container.addChild(cloundRight);
            cloundRight.visible = true;
            cloundRight.name = "cloudRight";
            var nameBgStr = "ac_sweetgift_palace_name_bg-1_1";
            if (i == 4) {
                nameBgStr = "ac_sweetgift_palace_name_bg-1_2";
            }
            var nameBg = BaseBitmap.create(nameBgStr);
            container.addChild(nameBg);
            var name_1 = ComponentManager.getTextField(LanguageManager.getlocal("sweetgiftBuildingName-" + this.code + "_" + (i + 1)), TextFieldConst.FONTSIZE_TITLE_SMALL, TextFieldConst.COLOR_BLACK);
            nameBg.width = name_1.width + 30;
            nameBg.setPosition(building.x + building.width / 2 - nameBg.width / 2, this._buildingNamePos[i].y - container.y);
            name_1.setPosition(nameBg.x + nameBg.width / 2 - name_1.width / 2, nameBg.y + nameBg.height / 2 - name_1.height / 2);
            container.addChild(name_1);
            var nameContainer = new BaseDisplayObjectContainer();
            nameContainer.width = nameBg.width;
            nameContainer.height = nameBg.height;
            nameContainer.setPosition(nameBg.x, nameBg.y);
            nameContainer.name = "nameContainer";
            container.addChild(nameContainer);
            var alphaBg = BaseBitmap.create("public_alphabg");
            alphaBg.width = nameBg.width + 25;
            alphaBg.height = building.height + 25;
            if (i == 4) {
                alphaBg.width = nameBg.width + 10;
                alphaBg.height = building.height + 50;
            }
            alphaBg.setPosition(nameBg.x + nameBg.width / 2 - alphaBg.width / 2, nameBg.y);
            container.addChild(alphaBg);
            //分数
            var scoreContainer = new BaseDisplayObjectContainer();
            scoreContainer.width = 120;
            scoreContainer.setPosition(this._buildingFlagPos[i].x - container.x, this._buildingFlagPos[i].y - container.y);
            container.addChild(scoreContainer);
            scoreContainer.name = "scoreContainer";
            var scoreBg = BaseBitmap.create("battlepassfntbg-1");
            // scoreBg.setPosition(this._buildingFlagPos[i].x - container.x, this._buildingFlagPos[i].y - container.y);
            scoreBg.width = scoreContainer.width;
            scoreBg.name = "scoreBg";
            scoreContainer.addChild(scoreBg);
            var scoreIconImg = ResourceManager.hasRes("ac_sweetgift_gift_icon-" + this.getTypeCode()) ? "ac_sweetgift_gift_icon-" + this.getTypeCode() : "ac_sweetgift_gift_icon-1";
            var scoreIcon = BaseBitmap.create(scoreIconImg);
            scoreIcon.setScale(0.6);
            scoreIcon.setPosition(scoreBg.x, scoreBg.y - 2);
            scoreContainer.addChild(scoreIcon);
            var scoreNum = data[i].needNum;
            var score = ComponentManager.getTextField(String(scoreNum), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
            score.setPosition(scoreBg.x + scoreBg.width / 2 - score.width / 2, scoreBg.y + scoreBg.height / 2 - score.height / 2 + 2);
            score.name = "score";
            scoreContainer.addChild(score);
            //拜访
            var reviceBtn = ComponentManager.getButton("ac_sweetgift_visit_btn", "sweetgiftVisitName-" + this.code, this.visitBtnHandler, this, [{ index: String(i + 1) }]);
            reviceBtn.setPosition(nameContainer.x + nameContainer.width / 2 - reviceBtn.width / 2, scoreContainer.y);
            container.addChild(reviceBtn);
            reviceBtn.visible = false;
            reviceBtn.name = "reviceBtn";
            App.CommonUtil.addIconToBDOC(reviceBtn);
            var reviceEnd = BaseBitmap.create("ac_sweetgift_building_visited");
            reviceEnd.setPosition(nameContainer.x + nameContainer.width / 2 - reviceEnd.width / 2, scoreContainer.y);
            reviceEnd.name = "reviceEnd";
            reviceEnd.visible = false;
            container.addChild(reviceEnd);
            // let rabbit = this.createRabbitAni();
            // rabbit.setPosition(scoreContainer.x - rabbit.width, scoreContainer.y - rabbit.height/2 - 15);
            // container.addChild(rabbit);
            // rabbit.name = "rabbit";
            this._bgContainer.addChild(container);
            alphaBg.addTouchTap(this.bulidingBtnHandler, this, [{ index: String(i + 1) }]);
            this._buildings[i] = container;
        }
    };
    //兔子
    AcSweetGiftView.prototype.createRabbitAni = function () {
        var container = new BaseDisplayObjectContainer();
        var bgStr = ResourceManager.hasRes("acsweetgift_rabbit_bg-" + this.getTypeCode()) ? "acsweetgift_rabbit_bg-" + this.getTypeCode() : "acsweetgift_rabbit_bg-1";
        var rabbitBg = BaseBitmap.create(bgStr);
        container.width = rabbitBg.width;
        container.height = rabbitBg.height;
        container.addChild(rabbitBg);
        var rabbitAni = ComponentManager.getCustomMovieClip("acsweetgift_rabbit_effect", 3, 150);
        rabbitAni.x = 10;
        container.addChild(rabbitAni);
        rabbitAni.name = "rabbitAni";
        rabbitAni.playWithTime(0);
        return container;
    };
    //点击建筑 拜访
    AcSweetGiftView.prototype.bulidingBtnHandler = function (target, data) {
        App.LogUtil.log("buildingBtn index:" + data.index);
        if (this._isSelectVisitBtn) {
            return;
        }
        var status = this.vo.getAchievementStatusById(data.index);
        if (status != 1) {
            ViewController.getInstance().openView(ViewConst.POPUP.ACSWEETGIFTVISITREWARDPOPVIEW, { aid: this.aid, code: this.code, id: data.index });
        }
        else {
            if ((!this.vo.isStart)) {
                App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
                return;
            }
            this._selectVisitIndex = Number(data.index);
            this._isSelectVisitBtn = true;
            NetManager.request(NetRequestConst.REQUEST_ACTIVITY_SWEETGIFT_GETVISIT, { activeId: this.vo.aidAndCode, rkey: this._selectVisitIndex });
        }
    };
    AcSweetGiftView.prototype.visitBtnHandler = function (data) {
        if (this._isSelectVisitBtn) {
            return;
        }
        var status = this.vo.getAchievementStatusById(data.index);
        if (status != 1) {
            ViewController.getInstance().openView(ViewConst.POPUP.ACSWEETGIFTVISITREWARDPOPVIEW, { aid: this.aid, code: this.code, id: data.index });
        }
        else {
            if ((!this.vo.isStart)) {
                App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
                return;
            }
            this._selectVisitIndex = Number(data.index);
            this._isSelectVisitBtn = true;
            NetManager.request(NetRequestConst.REQUEST_ACTIVITY_SWEETGIFT_GETVISIT, { activeId: this.vo.aidAndCode, rkey: this._selectVisitIndex });
        }
    };
    //拜访回调
    AcSweetGiftView.prototype.visitCallback = function (event) {
        var data = event.data.data.data;
        this._visitRewards = data.rewards;
        var container = this._buildings[this._selectVisitIndex - 1];
        var building = container.getChildByName("building");
        var cloudLeft = container.getChildByName("cloudLeft");
        var cloudRight = container.getChildByName("cloudRight");
        building.visible = true;
        egret.Tween.get(cloudLeft).to({ x: cloudLeft.x - 150, alpha: 0 }, 1000);
        egret.Tween.get(cloudRight).to({ x: cloudLeft.x + 150, alpha: 0 }, 1000).call(this.showAvg, this);
    };
    //剧情
    AcSweetGiftView.prototype.showAvg = function () {
        var view = this;
        var visitId = view._selectVisitIndex;
        var data = view._visitRewards;
        ViewController.getInstance().openView(ViewConst.POPUP.ACSWEETGIFTAVGVIEW, {
            aid: view.aid,
            code: view.code,
            visitId: visitId,
            callBack: function () {
                view.showReward(data);
            },
            obj: view
        });
    };
    //奖励
    AcSweetGiftView.prototype.showReward = function (data) {
        var view = this;
        ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW, { "rewards": data, "isPlayAni": true, "callback": view.refreshBuildingStatus, "handler": view });
    };
    //制作按钮
    AcSweetGiftView.prototype.makeBtnClick = function (btnType) {
        if (this._isSelectMakeBtn) {
            return;
        }
        this._isSelectMakeBtn = true;
        if (!this.vo.isInActivity()) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            this._isSelectMakeBtn = false;
            return;
        }
        if (btnType == "0") {
            if (!this.vo.isFree() && Api.playerVoApi.getPlayerGem() < this.cfg.cost) {
                // ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
                this.showRechargeTipView();
                this._isSelectMakeBtn = false;
                return;
            }
            this._isPlayTen = false;
            ViewController.getInstance().openView(ViewConst.POPUP.ACSWEETGIFTMAKECAKEPOPVIEW, { aid: this.aid, code: this.code });
            this._isSelectMakeBtn = false;
        }
        else {
            if (Api.playerVoApi.getPlayerGem() < this.cfg.cost * this.cfg.discount * 10) {
                // ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
                this.showRechargeTipView();
                this._isSelectMakeBtn = false;
                return;
            }
            this._isPlayTen = true;
            NetManager.request(NetRequestConst.REQUEST_ACTIVITY_SWEETGIFT_MAKE, { activeId: this.vo.aidAndCode, isTenPlay: 1, isFree: 0 });
        }
    };
    AcSweetGiftView.prototype.showRechargeTipView = function () {
        ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW, {
            title: "sweetgiftTipTitle",
            msg: LanguageManager.getlocal("sweetgiftTipMsg"),
            callback: function () {
                ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
            },
            handler: this,
            needCancel: true,
        });
    };
    //背景移动
    AcSweetGiftView.prototype.moveBgHandler = function (e) {
        var maxDiffY = this._bgContainer.height - GameConfig.stageHeigth;
        if (e.type == egret.TouchEvent.TOUCH_BEGIN) {
            this._startY = e.stageY;
        }
        else if (e.type == egret.TouchEvent.TOUCH_MOVE) {
            var diffY = e.stageY - this._startY;
            if (diffY > 0) {
                if (this._bgContainer.y >= 0 || Math.abs(this._bgContainer.y) < diffY) {
                    this._bgContainer.y = 0;
                }
                else {
                    this._bgContainer.y += diffY;
                }
            }
            else {
                if (Math.abs(this._bgContainer.y) + Math.abs(diffY) >= maxDiffY) {
                    this._bgContainer.y = -maxDiffY;
                }
                else {
                    this._bgContainer.y += diffY;
                }
            }
        }
    };
    AcSweetGiftView.prototype.tick = function () {
        this._acTimeTf.text = LanguageManager.getlocal("sweetgiftTimeDown", [this.vo.getCountDown()]);
        this._timeBg.width = 60 + this._acTimeTf.width;
        this._timeBg.x = GameConfig.stageWidth - this._timeBg.width - 5;
        this._acTimeTf.setPosition(this._timeBg.x + this._timeBg.width / 2 - this._acTimeTf.width / 2, this._timeBg.y + this._timeBg.height / 2 - this._acTimeTf.height / 2);
    };
    //制作回调
    AcSweetGiftView.prototype.makeRequestCallback = function (event) {
        this._isSelectMakeBtn = false;
        if (!this._isPlayTen) {
            return;
        }
        var rData = event.data.data.data;
        if (!rData) {
            App.CommonUtil.showTip(LanguageManager.getlocal("time_error"));
            return;
        }
        var itemStr = rData.rewards.split("|")[0];
        var itemId = itemStr.split("_")[1];
        var itemData = this.vo.getCakeDataById(itemId);
        var itemName = LanguageManager.getlocal("itemName_" + itemId);
        var msgStr = LanguageManager.getlocal("sweetgiftMakeGetRewardMsg-" + this.code, ["10", itemName, String(itemData.score * 10)]);
        ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW, { "rewards": rData.rewards, "isPlayAni": true, tipMsg: msgStr });
    };
    AcSweetGiftView.prototype.refreshView = function () {
        this._scoreNum.text = String(this.vo.getScore());
        if (this.vo.isFree()) {
            this._freeDesc.visible = true;
            this._makeOneNeedContainer.visible = false;
        }
        else {
            this._freeDesc.visible = false;
            this._makeOneNeedContainer.visible = false;
        }
        if (this.vo.isShowRewardsRedDot()) {
            App.CommonUtil.addIconToBDOC(this._rewardBtn);
        }
        else {
            App.CommonUtil.removeIconFromBDOC(this._rewardBtn);
        }
        if (!this._isSelectVisitBtn) {
            this.refreshBuildingStatus();
        }
        var playGem = Api.playerVoApi.getPlayerGem();
        if (playGem < this.cfg.cost) {
            this._makeOneNeedDesc.setColor(TextFieldConst.COLOR_WARN_RED);
        }
        else {
            this._makeOneNeedDesc.setColor(TextFieldConst.COLOR_WARN_YELLOW);
        }
        var multiNeed = this.cfg.cost * 10;
        if (this.cfg.discount) {
            multiNeed *= this.cfg.discount;
        }
        if (playGem < multiNeed) {
            this._makeMultiNeedDesc.setColor(TextFieldConst.COLOR_WARN_RED);
        }
        else {
            this._makeMultiNeedDesc.setColor(TextFieldConst.COLOR_WARN_YELLOW);
        }
    };
    //刷新建筑状态 0 不可领取 1 可领取 2 已领取
    AcSweetGiftView.prototype.refreshBuildingStatus = function () {
        this._isSelectVisitBtn = false;
        var achieveId = this.vo.getMaxAchieveId();
        for (var i = 0; i < this._buildings.length; i++) {
            var status_1 = this.vo.getAchievementStatusById(String(i + 1));
            var container = this._buildings[i];
            var building = container.getChildByName("building");
            var cloudLeft = container.getChildByName("cloudLeft");
            var cloudRight = container.getChildByName("cloudRight");
            // let rabbit = <BaseDisplayObjectContainer>container.getChildByName("rabbit");
            var scoreContainer = container.getChildByName("scoreContainer");
            var buildingLight = container.getChildByName("buildingLight");
            var reviceBtn = container.getChildByName("reviceBtn");
            var reviceEnd = container.getChildByName("reviceEnd");
            if (status_1 == 1) {
                egret.Tween.removeTweens(building);
                // building.visible = true;
                cloudLeft.alpha = 0.7;
                cloudRight.alpha = 0.7;
                reviceBtn.visible = true;
                reviceEnd.visible = false;
                scoreContainer.visible = false;
                buildingLight.visible = true;
            }
            else if (status_1 == 0) {
                // building.visible = false;
                cloudLeft.alpha = 1;
                cloudRight.alpha = 1;
                reviceBtn.visible = false;
                reviceEnd.visible = false;
                scoreContainer.visible = true;
                buildingLight.visible = false;
            }
            else if (status_1 == 2) {
                // building.visible = true;
                egret.Tween.removeTweens(building);
                cloudLeft.alpha = 0;
                cloudRight.alpha = 0;
                reviceBtn.visible = false;
                reviceEnd.visible = true;
                scoreContainer.visible = false;
                reviceBtn.setText("sweetgiftVisitedName-" + this.code);
                reviceBtn.setGray(true);
                App.CommonUtil.removeIconFromBDOC(reviceBtn);
                buildingLight.visible = true;
            }
            // if (status != 2){
            // if (achieveId == -1){
            //     rabbit.visible = false;
            //     this._rabbit.visible = true;
            // }
            // else if (achieveId == this._buildings.length - 1){
            //     this._rabbit.visible = false;
            //     rabbit.visible = false;
            // }
            // else{
            //     this._rabbit.visible = false;
            //     if (i == achieveId){
            //         rabbit.visible = true;
            //     }
            //     else{
            //         rabbit.visible = false;
            //     }
            // }
            // }
            // else{
            // this._rabbit.visible = false;
            // rabbit.visible = false;
            // } 
        }
    };
    AcSweetGiftView.prototype.getSkinView = function (skinId) {
        var container = new BaseDisplayObjectContainer();
        var skinCfg = Config.WifeskinCfg.getWifeCfgById(skinId);
        var isWifeskin = false;
        if (skinCfg) {
            isWifeskin = true;
        }
        else {
            skinCfg = Config.ServantskinCfg.getServantSkinItemById(skinId);
        }
        var bottomBg = this.container.getChildByName("bottomBg");
        if (isWifeskin) {
            var wifecfg = Config.WifeCfg.getWifeCfgById(skinCfg.wifeId);
            var boneName = undefined;
            var wife = null;
            if (skinCfg && skinCfg.bone) {
                boneName = skinCfg.bone + "_ske";
            }
            if ((!Api.switchVoApi.checkCloseBone()) && boneName && RES.hasRes(boneName) && App.CommonUtil.check_dragon()) {
                wife = App.DragonBonesUtil.getLoadDragonBones(skinCfg.bone);
                // wife.width = 354;
                // wife.height = 611;
                wife.anchorOffsetX = wife.width / 2;
                wife.anchorOffsetY = wife.height;
                wife.setPosition(0, 0);
                wife.setScale(0.7);
                container.setPosition(360, GameConfig.stageHeigth - 115);
                container.addChild(wife);
            }
            else {
                wife = BaseBitmap.create("ac_sweetgift_wifeskin-" + this.getTypeCode());
                wife.anchorOffsetY = wife.height;
                wife.setScale(0.8);
                wife.setPosition(0, 0);
                container.addChild(wife);
                container.setPosition(160, GameConfig.stageHeigth - 140);
            }
        }
        else {
            var servantCfg = Config.ServantCfg.getServantItemById(skinCfg.servantId);
            var boneName = undefined;
            if (skinCfg && skinCfg.bone) {
                boneName = skinCfg.bone + "_ske";
            }
            if ((!Api.switchVoApi.checkCloseBone()) && boneName && RES.hasRes(boneName) && App.CommonUtil.check_dragon()) {
                var droWifeIcon = App.DragonBonesUtil.getLoadDragonBones(skinCfg.bone);
                droWifeIcon.scaleY = 1;
                droWifeIcon.scaleX = 1;
                droWifeIcon.anchorOffsetY = droWifeIcon.height;
                droWifeIcon.anchorOffsetX = droWifeIcon.width / 2;
                // App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, droWifeIcon, container, [270,460]);
                droWifeIcon.setPosition(0, 0);
                container.addChild(droWifeIcon);
                container.setPosition(160, GameConfig.stageHeigth - 140);
            }
            else {
                var servant = BaseBitmap.create("ac_sweetgift_servantskin-" + this.getTypeCode());
                servant.anchorOffsetY = servant.height;
                servant.setScale(0.8);
                servant.setPosition(0, 0);
                container.addChild(servant);
                container.setPosition(0, GameConfig.stageHeigth - 140);
            }
        }
        this.addChildToContainer(container);
    };
    AcSweetGiftView.prototype.getTypeCode = function () {
        if (this.code == "2") {
            return "1";
        }
        return this.code;
    };
    Object.defineProperty(AcSweetGiftView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcSweetGiftView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 如果要显示tip弹板重写此方法，可以加上条件检测，多次打开都会检测
     */
    AcSweetGiftView.prototype.getReportTipData = function () {
        return { title: { key: "sweetgiftreporttitle-" + this.code }, msg: { key: "sweetgiftreportmsg-" + this.code } };
    };
    // 标题背景名称
    AcSweetGiftView.prototype.getTitleBgName = function () {
        return ResourceManager.hasRes("ac_sweetgift_titlebg-" + this.getTypeCode()) ? "ac_sweetgift_titlebg-" + this.getTypeCode() : "ac_sweetgift_titlebg-1";
    };
    AcSweetGiftView.prototype.getTitleStr = function () {
        return "";
    };
    //规则
    AcSweetGiftView.prototype.getRuleInfo = function () {
        return "sweetgiftRuleInfo-" + this.code;
    };
    AcSweetGiftView.prototype.getRuleInfoParam = function () {
        var moonCakeList = this.cfg.getMoonCakeList();
        return [String(moonCakeList[0].score), String(moonCakeList[1].score), String(moonCakeList[2].score)];
    };
    AcSweetGiftView.prototype.getResourceList = function () {
        var list = [];
        if (this.getTypeCode() != "1") {
            list = ["ac_sweetgift_titlebg-1", "acsweetgift_bg-1", "ac_sweetgift_gift_icon-1", "ac_sweetgift_material_icon-1", "acsweetgift_building-1_1", "acsweetgift_building-1_2", "acsweetgift_building-1_3", "acsweetgift_building-1_4", "acsweetgift_building-1_5", "acsweetgift_cloud-1_1", "acsweetgift_cloud-1_2", "acsweetgift_moon_cloud-1_1", "acsweetgift_moon_cloud-1_2", "acsweetgift_rabbit_bg-1", "acsweetgift_building_light-1_1", "acsweetgift_building_light-1_2", "acsweetgift_building_light-1_3", "acsweetgift_building_light-1_4", "acsweetgift_building_light-1_5"];
        }
        return _super.prototype.getResourceList.call(this).concat([
            "ac_sweetgift_titlebg-" + this.getTypeCode(),
            "acsweetgift_bg-" + this.getTypeCode(),
            "ac_sweetgift_gift_icon-" + this.getTypeCode(),
            "ac_sweetgift_material_icon-" + this.getTypeCode(),
            "acsweetgift_building-" + this.getTypeCode() + "_1",
            "acsweetgift_building-" + this.getTypeCode() + "_2",
            "acsweetgift_building-" + this.getTypeCode() + "_3",
            "acsweetgift_building-" + this.getTypeCode() + "_4",
            "acsweetgift_building-" + this.getTypeCode() + "_5",
            "acsweetgift_building_light-" + this.getTypeCode() + "_1",
            "acsweetgift_building_light-" + this.getTypeCode() + "_2",
            "acsweetgift_building_light-" + this.getTypeCode() + "_3",
            "acsweetgift_building_light-" + this.getTypeCode() + "_4",
            "acsweetgift_building_light-" + this.getTypeCode() + "_5",
            "acsweetgift_cloud-" + this.getTypeCode() + "_1",
            "acsweetgift_cloud-" + this.getTypeCode() + "_2",
            "acsweetgift_moon_cloud-" + this.getTypeCode() + "_1",
            "acsweetgift_moon_cloud-" + this.getTypeCode() + "_2",
            "acsweetgift_rabbit_bg-" + this.getTypeCode(),
            "ac_sweetgift_wifeskin-" + this.getTypeCode(),
            "ac_sweetgift_servantskin-" + this.getTypeCode(),
            "acliangbiographyview_common_acbg", "luckydrawiconbg-1", "arena_bottom",
            "ac_sweetgift_palace_name_bg-1_1", "ac_sweetgift_palace_name_bg-1_2", "mainlandcitynamebg-1", "acwealthcarpview_skineffect", "collectflag", "acsearchproofview_common_skintxt", "public_alphabg", "achuntingviewchargebtn", "shopview_corner", "battlepassfntbg-1", "ac_sweetgift_visit_btn", "ac_sweetgift_visit_btn_down", "ac_sweetgift_building_visited"
        ]).concat(list);
    };
    AcSweetGiftView.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_SWEETGIFT_MAKE, this.makeRequestCallback, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_SWEETGIFT_GETVISIT, this.visitCallback, this);
        this._bgContainer = null;
        this._timeBg = null;
        this._acTimeTf = null;
        this._scoreNum = null;
        // this._currHaveInfo = null;
        this._makeOneNeedDesc = null;
        this._makeMultiNeedDesc = null;
        this._freeDesc = null;
        this._rewardBtn = null;
        this._isSelectMakeBtn = false;
        this._buildings = [];
        this._rabbit = null;
        this._isSelectVisitBtn = false;
        this._selectVisitIndex = -1;
        this._visitRewards = null;
        this._makeOneNeedContainer = null;
        _super.prototype.dispose.call(this);
    };
    return AcSweetGiftView;
}(AcCommonView));
__reflect(AcSweetGiftView.prototype, "AcSweetGiftView");
//# sourceMappingURL=AcSweetGiftView.js.map