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
* 鼠来如意
* date 2020.6.1
* author ycg
* @name AcMouseComeView
*/
var AcMouseComeView = (function (_super) {
    __extends(AcMouseComeView, _super);
    function AcMouseComeView() {
        var _this = _super.call(this) || this;
        _this._timeBg = null;
        _this._timeTxt = null;
        _this._scrollView = null;
        _this._proContainer = null;
        _this._toolNum = null;
        _this._freeDesc = null;
        _this._onceNeedContainer = null;
        _this._boxList = [];
        _this._lightList = [];
        _this._isPlayTen = false;
        _this._isPlay = false;
        _this._isMove = false;
        _this._processContainer = null;
        _this._processNum = null;
        _this._progressBar = null;
        _this._proLight = null;
        _this._rewardData = null;
        _this._detailBtn = null;
        _this._rechargeTip = null;
        return _this;
    }
    AcMouseComeView.prototype.getBgName = function () {
        return App.CommonUtil.getResByCode("acmousecome_bg", this.getUiCode());
    };
    AcMouseComeView.prototype.getTitleStr = function () {
        return null;
    };
    AcMouseComeView.prototype.getTitleBgName = function () {
        return App.CommonUtil.getResByCode("acmousecome_titlebg", this.getUiCode());
    };
    AcMouseComeView.prototype.isHideTitleBgShadow = function () {
        return true;
    };
    AcMouseComeView.prototype.getRuleInfo = function () {
        return App.CommonUtil.getCnByCode("acMouseComeRuleInfo", this.getUiCode());
    };
    AcMouseComeView.prototype.getRuleInfoParam = function () {
        return ["" + this.cfg.needGem];
    };
    AcMouseComeView.prototype.getProbablyInfo = function () {
        return App.CommonUtil.getCnByCode("acMouseComeProbablyInfo", this.getUiCode());
    };
    AcMouseComeView.prototype.getRuleBtnName = function () {
        return ButtonConst.BTN2_RULE;
    };
    AcMouseComeView.prototype.getReportTipData = function () {
        return { title: { key: App.CommonUtil.getCnByCode("acMouseComeReportTitle", this.getUiCode()) }, msg: { key: App.CommonUtil.getCnByCode("acMouseComeReportMsg", this.getUiCode()) } };
    };
    AcMouseComeView.prototype.getResourceList = function () {
        var list = [];
        return _super.prototype.getResourceList.call(this).concat("acmousecomecode1", "acmousecomecode" + this.getUiCode(), "acwealthcarpview_servantskintxt", "commonview_smalltitlebg").concat(list);
    };
    AcMouseComeView.prototype.getUiCode = function () {
        var code = "";
        switch (Number(this.code)) {
            case 2:
                code = "1";
                break;
            default:
                code = this.code;
                break;
        }
        return code;
    };
    Object.defineProperty(AcMouseComeView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcMouseComeView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcMouseComeView.prototype, "progressOffX", {
        //进度 间距
        get: function () {
            return 80;
        },
        enumerable: true,
        configurable: true
    });
    //物品数量
    AcMouseComeView.prototype.getLightNum = function () {
        return 9;
    };
    AcMouseComeView.prototype.initView = function () {
        var _this = this;
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACMOUSECOME_LOTTERY, this.lotteryCallback, this);
        var infoBg = BaseBitmap.create(App.CommonUtil.getResByCode("acmousecome_infobg", this.getUiCode()));
        infoBg.setPosition(this.titleBg.x + this.titleBg.width / 2 - infoBg.width / 2, this.titleBg.y + this.titleBg.height - 7);
        this.addChildToContainer(infoBg);
        //活动时间   
        var dateText = ComponentManager.getTextField(LanguageManager.getlocal("acComm_time", [this.vo.acTimeAndHour]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        dateText.x = infoBg.x + 30;
        dateText.y = infoBg.y + 16;
        this.addChildToContainer(dateText);
        //活动文本
        var descTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acMouseComeInfo", this.getUiCode()), ["" + this.cfg.needGem]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        descTxt.width = 580;
        descTxt.lineSpacing = 4;
        descTxt.x = dateText.x;
        descTxt.y = dateText.y + dateText.height + 5;
        this.addChildToContainer(descTxt);
        var rechargeTip = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acMouseComeRechargeInfo", this.getUiCode()), ["" + this.vo.getNeedRecharge()]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        rechargeTip.setPosition(descTxt.x, infoBg.y + infoBg.height - rechargeTip.height - 20);
        this.addChildToContainer(rechargeTip);
        this._rechargeTip = rechargeTip;
        //倒计时
        this._timeBg = BaseBitmap.create("public_9_bg61");
        this._timeBg.y = infoBg.y + infoBg.height - 17 - this._timeBg.height / 2;
        this.addChildToContainer(this._timeBg);
        this._timeTxt = ComponentManager.getTextField(LanguageManager.getlocal("acComm_timeCount", [this.vo.getCountDown()]), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._timeBg.width = 40 + this._timeTxt.width;
        this._timeBg.x = GameConfig.stageWidth - this._timeBg.width - 20;
        this._timeTxt.setPosition(this._timeBg.x + this._timeBg.width / 2 - this._timeTxt.width / 2, this._timeBg.y + this._timeBg.height / 2 - this._timeTxt.height / 2);
        this.addChildToContainer(this._timeTxt);
        //进度条上方
        var progressZshi = BaseBitmap.create(App.CommonUtil.getResByCode("acmousecome_progresszshi", this.getUiCode()));
        progressZshi.setPosition(infoBg.x + infoBg.width / 2 - progressZshi.width / 2, infoBg.y + infoBg.height);
        this.addChildToContainer(progressZshi);
        //进度条底
        var proBottom = BaseBitmap.create(App.CommonUtil.getResByCode("acmousecome_probottom", this.getUiCode()));
        proBottom.setPosition(0, progressZshi.y + progressZshi.height - 5);
        this.addChildToContainer(proBottom);
        //进度条
        var proContainer = new BaseDisplayObjectContainer();
        proContainer.height = 160;
        this._proContainer = proContainer;
        var scrollView = ComponentManager.getScrollView(proContainer, new egret.Rectangle(0, 0, GameConfig.stageWidth - 63, proContainer.height));
        scrollView.setPosition(63, infoBg.y + infoBg.height - 35 + 12);
        // this.addChildToContainer(scrollView);
        scrollView.bounces = false;
        this._scrollView = scrollView;
        //详情按钮
        var detailBtn = ComponentManager.getButton(App.CommonUtil.getResByCode("acmousecome_detailbtn", this.getUiCode()), "", function () {
            ViewController.getInstance().openView(ViewConst.POPUP.ACMOUSECOMEDETAILPOPUPVIEW, { aid: _this.aid, code: _this.code });
        }, this);
        detailBtn.setPosition(10, infoBg.y + infoBg.height - 8);
        // this.addChildToContainer(detailBtn);
        this._detailBtn = detailBtn;
        //进度条相关
        this.initProContainer();
        //bottom
        var bottomBg = BaseBitmap.create(App.CommonUtil.getResByCode("acmousecome_bottombg", this.getUiCode()));
        bottomBg.setPosition(GameConfig.stageWidth / 2 - bottomBg.width / 2, GameConfig.stageHeigth - bottomBg.height);
        //衣装
        var skinId = this.cfg.show;
        App.LogUtil.log("skinId: " + skinId);
        var skinCfg = Config.WifeskinCfg.getWifeCfgById(skinId);
        var boneName = null;
        if (skinCfg && skinCfg.bone) {
            boneName = skinCfg.bone + "_ske";
        }
        var wife = null;
        if ((!Api.switchVoApi.checkCloseBone()) && boneName && RES.hasRes(boneName) && App.CommonUtil.check_dragon()) {
            wife = App.DragonBonesUtil.getLoadDragonBones(skinCfg.bone);
            wife.setScale(0.75); //0.53
            wife.anchorOffsetY = wife.height;
            wife.anchorOffsetX = wife.width / 2;
            wife.x = bottomBg.x + bottomBg.width / 4;
            wife.y = bottomBg.y + 20;
        }
        else {
            wife = BaseLoadBitmap.create(skinCfg.body);
            wife.width = 640;
            wife.height = 840;
            wife.setScale(0.6);
            wife.anchorOffsetY = wife.height;
            wife.anchorOffsetX = wife.width / 2;
            wife.setScale(0.6);
            wife.x = bottomBg.x + bottomBg.width / 4;
            wife.y = bottomBg.y + 20;
        }
        this.addChildToContainer(wife);
        //lightBg
        var lightBg = BaseBitmap.create(App.CommonUtil.getResByCode("acmousecome_lightbg", this.getUiCode()));
        lightBg.setPosition(GameConfig.stageWidth - lightBg.width, bottomBg.y - lightBg.height + 10);
        this.addChildToContainer(lightBg);
        var bottomMask = BaseBitmap.create(App.CommonUtil.getResByCode("acmousecome_mask", this.getUiCode()));
        bottomMask.setPosition(bottomBg.x + bottomBg.width / 2 - bottomMask.width / 2, bottomBg.y - bottomMask.height + 5);
        this.addChildToContainer(bottomMask);
        this.addChildToContainer(bottomBg);
        this.addChildToContainer(scrollView);
        this.addChildToContainer(detailBtn);
        //道具数量
        var toolBg = BaseBitmap.create("public_9_bg80");
        toolBg.width = 150;
        toolBg.x = GameConfig.stageWidth / 2 - toolBg.width / 2;
        toolBg.y = bottomBg.y + 35;
        this.addChildToContainer(toolBg);
        var toolIcon = BaseBitmap.create(App.CommonUtil.getResByCode("acmousecome_toolicon", this.getUiCode()));
        toolIcon.setPosition(toolBg.x + 20, toolBg.y + toolBg.height / 2 - toolIcon.height / 2);
        this.addChildToContainer(toolIcon);
        var currToolNum = this.vo.getToolNum();
        var toolNum = ComponentManager.getTextField("x" + currToolNum, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        toolNum.setPosition(toolIcon.x + toolIcon.width + 5, toolBg.y + toolBg.height / 2 - toolNum.height / 2);
        this.addChildToContainer(toolNum);
        this._toolNum = toolNum;
        //一次按钮
        var onceBtn = ComponentManager.getButton(ButtonConst.BTN2_BIG_YELLOW, App.CommonUtil.getCnByCode("acMouseComePlayBtnName1", this.getUiCode()), this.playBtnClick, this, [0]);
        onceBtn.setColor(TextFieldConst.COLOR_BLACK);
        onceBtn.setPosition(bottomBg.x + 60, bottomBg.y + bottomBg.height - 20 - onceBtn.height);
        this.addChildToContainer(onceBtn);
        //免费
        var freeDesc = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acMouseComePlayFree", this.getUiCode())), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WARN_GREEN);
        freeDesc.setPosition(onceBtn.x + onceBtn.width / 2 - freeDesc.width / 2, onceBtn.y - 25);
        this.addChildToContainer(freeDesc);
        this._freeDesc = freeDesc;
        //一次
        var onceNeedContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(onceNeedContainer);
        this._onceNeedContainer = onceNeedContainer;
        //图标
        var onceIcon = BaseBitmap.create(App.CommonUtil.getResByCode("acmousecome_toolicon", this.getUiCode()));
        onceNeedContainer.addChild(onceIcon);
        //一次消耗
        var onceNeedDesc = ComponentManager.getTextField("x" + this.cfg.cost, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        onceNeedContainer.addChild(onceNeedDesc);
        onceNeedContainer.width = onceIcon.width * onceIcon.scaleX + onceNeedDesc.width;
        onceNeedDesc.setPosition(onceIcon.x + onceIcon.width * onceIcon.scaleX, onceIcon.y + onceIcon.height / 2 - onceNeedDesc.height / 2);
        onceNeedContainer.setPosition(onceBtn.x + onceBtn.width / 2 - onceNeedContainer.width / 2 - 2, onceBtn.y - onceIcon.height + 3);
        if (this.vo.isFree()) {
            freeDesc.visible = true;
            onceNeedContainer.visible = false;
        }
        else {
            freeDesc.visible = false;
            onceNeedContainer.visible = true;
        }
        //十次 按钮
        var playMultiBtn = ComponentManager.getButton(ButtonConst.BTN2_BIG_YELLOW, App.CommonUtil.getCnByCode("acMouseComePlayBtnName2", this.getUiCode()), this.playBtnClick, this, [1]);
        playMultiBtn.setColor(TextFieldConst.COLOR_BLACK);
        playMultiBtn.setPosition(GameConfig.stageWidth - 60 - playMultiBtn.width, onceBtn.y);
        this.addChildToContainer(playMultiBtn);
        var multiNeedContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(multiNeedContainer);
        var multiIcon = BaseBitmap.create(App.CommonUtil.getResByCode("acmousecome_toolicon", this.getUiCode()));
        multiIcon.setScale(1);
        multiNeedContainer.addChild(multiIcon);
        var multiNeedDesc = ComponentManager.getTextField("x" + this.cfg.cost * 10, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        multiNeedContainer.addChild(multiNeedDesc);
        multiNeedDesc.setPosition(multiIcon.x + multiIcon.width * multiIcon.scaleX, multiIcon.y + multiIcon.height / 2 - multiNeedDesc.height / 2 + 3);
        multiNeedContainer.width = multiIcon.width * multiIcon.scaleX + multiNeedDesc.width;
        multiNeedContainer.setPosition(playMultiBtn.x + playMultiBtn.width / 2 - multiNeedContainer.width / 2 - 2, playMultiBtn.y - multiIcon.height + 3);
        //衣装预览
        var skinTxtEffect = ComponentManager.getCustomMovieClip("acwealthcarpview_skineffect", 10, 70);
        skinTxtEffect.width = 208;
        skinTxtEffect.height = 154;
        skinTxtEffect.setPosition(bottomBg.x + 20, bottomBg.y - 120);
        skinTxtEffect.blendMode = egret.BlendMode.ADD;
        this.addChildToContainer(skinTxtEffect);
        skinTxtEffect.playWithTime(-1);
        var skinTxt = BaseBitmap.create("acwealthcarpview_servantskintxt");
        skinTxt.anchorOffsetX = skinTxt.width / 2;
        skinTxt.anchorOffsetY = skinTxt.height / 2;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, skinTxt, skinTxtEffect);
        this.addChildToContainer(skinTxt);
        egret.Tween.get(skinTxt, { loop: true }).to({ scaleX: 1.05, scaleY: 1.05 }, 400).to({ scaleX: 1, scaleY: 1 }, 400);
        var skinTxt1 = BaseBitmap.create("acwealthcarpview_servantskintxt");
        skinTxt1.anchorOffsetX = skinTxt1.width / 2;
        skinTxt1.anchorOffsetY = skinTxt1.height / 2;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, skinTxt1, skinTxtEffect);
        this.addChildToContainer(skinTxt1);
        skinTxt1.blendMode = egret.BlendMode.ADD;
        skinTxt1.alpha = 0;
        egret.Tween.get(skinTxt1, { loop: true }).to({ alpha: 0.7, scaleX: 1.05, scaleY: 1.05 }, 400).to({ alpha: 0, scaleX: 1, scaleY: 1 }, 400);
        skinTxt1.addTouchTap(function () {
            ViewController.getInstance().openView(ViewConst.POPUP.ACMOUSECOMEDETAILPOPUPVIEWTAB4, { aid: _this.aid, code: _this.code });
        }, this);
        //light
        var lightNum = this.getLightNum();
        for (var i = 0; i < lightNum; i++) {
            var light = new AcMouseComeLight({ aid: this.aid, code: this.code });
            this.addChildToContainer(light);
            light.setPosition(lightBg.x + 53 + (light.width + 10) * (i % 3), lightBg.y + 40 + Math.floor(i / 3) * 130);
            this._lightList[i] = light;
        }
        if (this.vo.isCangetAchieveReward() || this.vo.isCanExchange()) {
            App.CommonUtil.addIconToBDOC(this._detailBtn);
        }
        else {
            App.CommonUtil.removeIconFromBDOC(this._detailBtn);
        }
    };
    //进度相关
    AcMouseComeView.prototype.initProContainer = function () {
        var _this = this;
        var data = this.cfg.getAchieveCfg();
        var len = data.length;
        var proW = this.progressOffX * len;
        this._proContainer.width = proW + 100;
        var progressBar = ComponentManager.getProgressBar(App.CommonUtil.getResByCode("acmousecome_progress", this.getUiCode()), App.CommonUtil.getResByCode("acmousecome_progressbg", this.getUiCode()), proW);
        progressBar.setPosition(50, 53 - 12);
        // this._proContainer.addChild(progressBar);
        this._progressBar = progressBar;
        var proLight = BaseBitmap.create(App.CommonUtil.getResByCode("acmousecome_progresslight", this.getUiCode()));
        // this._proContainer.addChild(proLight);
        proLight.anchorOffsetX = 17;
        proLight.anchorOffsetY = proLight.height / 2;
        proLight.y = progressBar.y + progressBar.height / 2;
        proLight.x = progressBar.x;
        this._proLight = proLight;
        //当前进度
        var processContainer = new BaseDisplayObjectContainer();
        // this._proContainer.addChild(processContainer);
        this._processContainer = processContainer;
        var processBg = BaseBitmap.create(App.CommonUtil.getResByCode("acmousecome_bubble", this.getUiCode()));
        processContainer.width = processBg.width;
        processContainer.height = processBg.height;
        // processBg.scaleY = -1;
        // processBg.y = processBg.height;
        processContainer.addChild(processBg);
        processContainer.x = progressBar.x - processContainer.width / 2;
        var currProcessNum = this.vo.getProcessNum();
        var processNum = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acMouseComeProcessNum", this.getUiCode()), ["" + currProcessNum]), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        processNum.setPosition(processContainer.width / 2 - processNum.width / 2, 10);
        processContainer.addChild(processNum);
        this._processNum = processNum;
        // let skinData = this.vo.getShowSkinData();
        var curId = 0;
        var _loop_1 = function (i) {
            var boxCon = new BaseDisplayObjectContainer();
            var line = BaseBitmap.create(App.CommonUtil.getResByCode("acmousecome_lightline", this_1.getUiCode()));
            boxCon.addChild(line);
            var boxImg = "acmousecome_box";
            // if (skinData.index == i){
            //     boxImg = "acmousecome_specialbox";
            // }
            var box = BaseBitmap.create(App.CommonUtil.getResByCode(boxImg, this_1.getUiCode()));
            boxCon.addChild(box);
            box.name = "box" + i;
            boxCon.width = box.width;
            boxCon.anchorOffsetX = boxCon.width / 2;
            line.anchorOffsetX = line.width / 2;
            box.anchorOffsetX = box.width / 2;
            box.y = line.y + line.height - 5;
            boxCon.height = box.y + box.height;
            var proNum = ComponentManager.getTextField(data[i].needNum + "", TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
            proNum.anchorOffsetX = proNum.width / 2;
            boxCon.addChild(proNum);
            proNum.setPosition(0, box.y + box.height - 10 - proNum.height);
            proNum.name = "proNum" + i;
            boxCon.setPosition(progressBar.x + (i + 1) * this_1.progressOffX + boxCon.width / 2, this_1._progressBar.y + this_1._progressBar.height - 2);
            this_1._proContainer.addChild(boxCon);
            boxCon.addTouchTap(function () {
                //进度
                ViewController.getInstance().openView(ViewConst.POPUP.ACMOUSECOMEDETAILPOPUPVIEWTAB2, { aid: _this.aid, code: _this.code, id: data[i].id });
            }, this_1);
            this_1._boxList[i] = boxCon;
            var randomT = 800 + Math.floor(Math.random() * 1000);
            var randomR = 3.5 + 2 * Math.random();
            egret.Tween.get(boxCon, { loop: true })
                .to({ rotation: randomR }, randomT, egret.Ease.quadOut)
                .to({ rotation: -randomR }, randomT * 2, egret.Ease.quadInOut)
                .to({ rotation: 0 }, randomT, egret.Ease.quadIn);
            if (curId == 0 && this_1.vo.getProcessNum() < data[i].needNum) {
                curId = i;
            }
        };
        var this_1 = this;
        for (var i = 0; i < len; i++) {
            _loop_1(i);
        }
        this._proContainer.addChild(progressBar);
        this._proContainer.addChild(proLight);
        this._proContainer.addChild(processContainer);
        this.refreshProContainer();
        // if(this.vo.getProcessNum() >= skinData.needNum){
        // 	this._scrollView.scrollLeft = Math.min(Math.max(0, (curId + 1 - 4) * this.progressOffX), this._proContainer.width - this._scrollView.width);
        // }
        // else{
        // let posX = 0;
        this._isMove = true;
        this._scrollView.scrollLeft = this._proContainer.width - this._scrollView.width;
        this.showViewMask();
        // this._scrollView.scrollLeft = (skinData.index +1 - 4) * this.progressOffX;
        var posX = Math.min(Math.max(0, (curId + 1 - 4) * this.progressOffX), this._proContainer.width - this._scrollView.width);
        egret.Tween.get(this._scrollView).wait(500).to({ scrollLeft: posX }, (this._scrollView.scrollLeft - posX)).call(function () {
            _this.hideViewMask();
            egret.Tween.removeTweens(_this._scrollView);
            _this._isMove = false;
        }, this);
        // }
    };
    //刷新进度
    AcMouseComeView.prototype.refreshProContainer = function () {
        var currProNum = this.vo.getProcessNum();
        var data = this.cfg.getAchieveCfg();
        for (var i = 0; i < data.length; i++) {
            var group = this._boxList[i];
            var eff = group.getChildByName("eff" + i);
            var box = group.getChildByName("box" + i);
            var proNum = group.getChildByName("proNum" + i);
            if (this.vo.isGetAchieveRewardById(data[i].id)) {
                if (eff) {
                    eff.dispose();
                    eff = null;
                }
                App.DisplayUtil.changeToGray(box);
            }
            else {
                App.DisplayUtil.changeToNormal(box);
                if (currProNum >= data[i].needNum) {
                    if (!eff) {
                        eff = ComponentManager.getCustomMovieClip("newyearredeff", 10);
                        eff.name = "eff" + i;
                        group.addChildAt(eff, group.getChildIndex(proNum));
                        eff.width = 220;
                        eff.height = 220;
                        eff.playWithTime(-1);
                        eff.setScale(0.4);
                        eff.x = -eff.width * eff.scaleX / 2;
                        eff.y = box.y + box.height / 2 - eff.height * eff.scaleY / 2;
                        // eff.blendMode = egret.BlendMode.ADD;
                    }
                }
                else {
                    if (eff) {
                        eff.dispose();
                        eff = null;
                    }
                }
            }
        }
        var curProIndex = this.vo.getCurrProIndex();
        if (curProIndex == -1) {
            this._progressBar.setPercentage(1);
        }
        else {
            var currNum = curProIndex == 0 ? 0 : data[curProIndex - 1].needNum;
            var nextNum = data[curProIndex].needNum;
            var offX = 0;
            if (curProIndex == 0) {
                offX = (currProNum - currNum) * this.progressOffX / (nextNum - currNum);
            }
            else {
                offX = curProIndex * this.progressOffX + (currProNum - currNum) * this.progressOffX / (nextNum - currNum);
            }
            this._progressBar.setPercentage(offX / this._progressBar.width);
        }
        this._proLight.x = this._progressBar.x + this._progressBar.width * this._progressBar.getPercent();
        this._processContainer.x = this._progressBar.x + this._progressBar.width * this._progressBar.getPercent() - this._processContainer.width / 2;
        this._processNum.text = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acMouseComeProcessNum", this.getUiCode()), ["" + currProNum]);
        this._processNum.x = this._processContainer.width / 2 - this._processNum.width / 2;
    };
    //play btn
    AcMouseComeView.prototype.playBtnClick = function (index) {
        App.LogUtil.log("playBtnClick " + index);
        if (!this.vo.isInActivity()) {
            this.vo.showAcEndTip();
            return;
        }
        if (this._isPlay) {
            return;
        }
        var toolNum = this.vo.getToolNum();
        this._isPlayTen = false;
        if (index == 0) {
            if (toolNum > 0 || this.vo.isFree()) {
                this._isPlay = true;
                NetManager.request(NetRequestConst.REQUEST_ACMOUSECOME_LOTTERY, { activeId: this.vo.aidAndCode, isTenPlay: 0 });
            }
            else {
                this.showRechargeTip();
            }
        }
        else {
            if (toolNum >= 10) {
                this._isPlay = true;
                this._isPlayTen = true;
                NetManager.request(NetRequestConst.REQUEST_ACMOUSECOME_LOTTERY, { activeId: this.vo.aidAndCode, isTenPlay: 1 });
            }
            else {
                this.showRechargeTip();
            }
        }
    };
    AcMouseComeView.prototype.lotteryCallback = function (evt) {
        if (!evt.data.ret) {
            this._isPlay = false;
            this._isPlayTen = false;
            return;
        }
        var rData = evt.data.data.data;
        this._rewardData = rData.rewardsList;
        this.playLightAni();
    };
    AcMouseComeView.prototype.playLightAni = function () {
        var _this = this;
        this.showViewMask();
        var list = this._rewardData[this._rewardData.length - 1].map;
        var playNum = 3;
        var time = 2000;
        if (this._isPlayTen) {
            playNum = 6;
            // time = 4000;
        }
        for (var i = 0; i < this._lightList.length; i++) {
            var isFind = false;
            for (var j = 0; j < list.length; j++) {
                if (Number(list[j]) == i + 1) {
                    this._lightList[i].playAnim(1, playNum, time);
                    isFind = true;
                    break;
                }
            }
            if (!isFind) {
                this._lightList[i].playAnim(0, playNum, time);
            }
        }
        egret.Tween.get(this).wait(time).call(function () {
            for (var i = 0; i < _this._lightList.length; i++) {
                for (var j = 0; j < list.length; j++) {
                    if (Number(list[j]) == i + 1) {
                        _this._lightList[i].showLight();
                        break;
                    }
                }
            }
        }).wait(1000).call(function () {
            _this._isPlay = false;
            _this._isPlayTen = false;
            _this.hideViewMask();
            ViewController.getInstance().openView(ViewConst.POPUP.ACMOUSECOMEREWARDPOPUPVIEW, { data: _this._rewardData, callback: _this.refreshUI, obj: _this, aid: _this.aid, code: _this.code });
            for (var i = 0; i < _this._lightList.length; i++) {
                _this._lightList[i].resetLight();
            }
        });
    };
    AcMouseComeView.prototype.refreshView = function () {
        if (this.vo.isFree()) {
            this._freeDesc.visible = true;
            this._onceNeedContainer.visible = false;
        }
        else {
            this._freeDesc.visible = false;
            this._onceNeedContainer.visible = true;
        }
        var toolNum = this.vo.getToolNum();
        this._toolNum.text = "x" + toolNum;
        if (!this._isPlay) {
            this.refreshUI();
        }
        if (this.vo.isCangetAchieveReward() || this.vo.isCanExchange()) {
            App.CommonUtil.addIconToBDOC(this._detailBtn);
        }
        else {
            App.CommonUtil.removeIconFromBDOC(this._detailBtn);
        }
        this._rechargeTip.text = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acMouseComeRechargeInfo", this.getUiCode()), ["" + this.vo.getNeedRecharge()]);
    };
    AcMouseComeView.prototype.refreshUI = function () {
        this.refreshProContainer();
    };
    AcMouseComeView.prototype.tick = function () {
        this._timeTxt.text = LanguageManager.getlocal("acComm_timeCount", [this.vo.getCountDown()]);
        this._timeBg.width = 40 + this._timeTxt.width;
        this._timeBg.x = GameConfig.stageWidth - this._timeBg.width - 20;
        this._timeTxt.x = this._timeBg.x + this._timeBg.width / 2 - this._timeTxt.width / 2;
    };
    AcMouseComeView.prototype.showRechargeTip = function () {
        ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW, {
            msg: LanguageManager.getlocal(App.CommonUtil.getCnByCode("acMouseComeRechargeTip", this.getUiCode())),
            touchMaskClose: true,
            title: "itemUseConstPopupViewTitle",
            callback: function () {
                ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
            },
            handle: this,
            needClose: 1,
            needCancel: true,
            confirmTxt: "taskGoBtn",
        });
    };
    //mask
    AcMouseComeView.prototype.showViewMask = function () {
        var touchPos = BaseBitmap.create("public_alphabg");
        touchPos.width = GameConfig.stageWidth;
        touchPos.height = GameConfig.stageHeigth;
        this.addChild(touchPos);
        touchPos.name = "viewMaskTouchPos";
        touchPos.touchEnabled = true;
    };
    AcMouseComeView.prototype.hideViewMask = function () {
        var touchPos = this.getChildByName("viewMaskTouchPos");
        if (touchPos) {
            touchPos.touchEnabled = false;
            touchPos.dispose();
        }
    };
    AcMouseComeView.prototype.dispose = function () {
        this.hideViewMask();
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACMOUSECOME_LOTTERY, this.lotteryCallback, this);
        this._timeBg = null;
        this._timeTxt = null;
        this._scrollView = null;
        this._proContainer = null;
        this._toolNum = null;
        this._freeDesc = null;
        this._onceNeedContainer = null;
        this._boxList = [];
        this._lightList = [];
        this._isPlayTen = false;
        this._isPlay = false;
        this._isMove = false;
        this._processContainer = null;
        this._processNum = null;
        this._progressBar = null;
        this._proLight = null;
        this._rewardData = null;
        this._detailBtn = null;
        this._rechargeTip = null;
        _super.prototype.dispose.call(this);
    };
    return AcMouseComeView;
}(AcCommonView));
__reflect(AcMouseComeView.prototype, "AcMouseComeView");
//# sourceMappingURL=AcMouseComeView.js.map