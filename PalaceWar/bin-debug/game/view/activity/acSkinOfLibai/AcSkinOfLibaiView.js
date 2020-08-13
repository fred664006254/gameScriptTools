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
 * 酒神诗仙
 * author ycg
 * date 2020.2.19
 * @class AcSkinOfLibaiView
 */
var AcSkinOfLibaiView = (function (_super) {
    __extends(AcSkinOfLibaiView, _super);
    function AcSkinOfLibaiView() {
        var _this = _super.call(this) || this;
        _this._timeBg = null;
        _this._acTimeTf = null;
        _this._bottomBg = null;
        _this._detailBtn = null;
        _this._toolNum = null;
        _this._playBtnContainer = null;
        _this._playBtnTxt = null;
        _this._proNumBg = null;
        _this._proNum = null;
        _this._progressBar = null;
        _this._progressLight = null;
        _this._boxList = [];
        _this._isPlay = false;
        _this._rewardData = null;
        _this._lotteryBoneList = [];
        _this._progressMaskRect = null;
        return _this;
    }
    AcSkinOfLibaiView.prototype.initView = function () {
        var _this = this;
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACSKINOFLIBAI_LOTTERY, this.lotteryCallback, this);
        var infoBgStr = ResourceManager.hasRes("ac_skinoflibai_infobg-" + this.getTypeCode()) ? "ac_skinoflibai_infobg-" + this.getTypeCode() : "ac_skinoflibai_infobg-1";
        var infoBg = BaseBitmap.create(infoBgStr);
        infoBg.setPosition(this.titleBg.x + this.titleBg.width / 2 - infoBg.width / 2, this.titleBg.y + this.titleBg.height - 7 - 75);
        this.addChildToContainer(infoBg);
        //活动时间
        var acDate = ComponentManager.getTextField(LanguageManager.getlocal("acSkinoflibaiTime", [this.vo.acTimeAndHour]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        acDate.setPosition(infoBg.x + 20, this.titleBg.y + this.titleBg.height + 3);
        this.addChildToContainer(acDate);
        //活动说明
        var acDescStr = LanguageManager.getlocal("acSkinoflibaiInfo-" + this.getTypeCode());
        var acDesc = ComponentManager.getTextField(acDescStr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        acDesc.setPosition(acDate.x, acDate.y + acDate.height + 6);
        acDesc.width = 600;
        acDesc.lineSpacing = 6;
        this.addChildToContainer(acDesc);
        //倒计时
        this._timeBg = BaseBitmap.create("public_9_bg61");
        this._timeBg.y = infoBg.y + infoBg.height - this._timeBg.height / 2 - 2;
        this.addChildToContainer(this._timeBg);
        this._acTimeTf = ComponentManager.getTextField(LanguageManager.getlocal("acSkinoflibaiTimeCountDown", [this.vo.getCountDown()]), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._timeBg.width = 60 + this._acTimeTf.width;
        this._timeBg.x = GameConfig.stageWidth - this._timeBg.width - 5;
        this._acTimeTf.setPosition(this._timeBg.x + this._timeBg.width / 2 - this._acTimeTf.width / 2, this._timeBg.y + this._timeBg.height / 2 - this._acTimeTf.height / 2);
        this.addChildToContainer(this._acTimeTf);
        //bottom
        var bottomBgStr = ResourceManager.hasRes("ac_skinoflibai_bottombg-" + this.getTypeCode()) ? "ac_skinoflibai_bottombg-" + this.getTypeCode() : "ac_skinoflibai_bottombg-1";
        var bottomBg = BaseBitmap.create(bottomBgStr);
        bottomBg.setPosition(GameConfig.stageWidth / 2 - bottomBg.width / 2, GameConfig.stageHeigth - bottomBg.height);
        this._bottomBg = bottomBg;
        //门客衣装
        var skinCfg = Config.ServantskinCfg.getServantSkinItemById(this.cfg.show);
        var boneName = null;
        if (skinCfg && skinCfg.bone) {
            boneName = skinCfg.bone + "_ske";
        }
        var servantSkin = null;
        if ((!Api.switchVoApi.checkCloseBone()) && boneName && RES.hasRes(boneName) && App.CommonUtil.check_dragon()) {
            servantSkin = App.DragonBonesUtil.getLoadDragonBones(skinCfg.bone);
            servantSkin.setScale(1.1);
            servantSkin.x = GameConfig.stageWidth / 2;
            servantSkin.y = bottomBg.y + 10;
            this.addChildToContainer(servantSkin);
        }
        else {
            servantSkin = BaseLoadBitmap.create(skinCfg.body);
            servantSkin.width = 406;
            servantSkin.height = 467;
            servantSkin.setScale(1);
            servantSkin.anchorOffsetY = servantSkin.height;
            servantSkin.anchorOffsetX = servantSkin.width / 2;
            servantSkin.x = GameConfig.stageWidth / 2;
            servantSkin.y = bottomBg.y + 10;
        }
        this.addChildToContainer(servantSkin);
        this.addChildToContainer(bottomBg);
        //道具数量
        var toolNumBg = BaseBitmap.create("ac_skinoflibai_toolnumbg");
        toolNumBg.setPosition(bottomBg.x + bottomBg.width - toolNumBg.width - 50, bottomBg.y + bottomBg.height - toolNumBg.height - 2);
        this.addChildToContainer(toolNumBg);
        var toolNumIconStr = ResourceManager.hasRes("ac_skinoflibai_smallitemicon-" + this.getTypeCode()) ? "ac_skinoflibai_smallitemicon-" + this.getTypeCode() : "ac_skinoflibai_smallitemicon-1";
        var toolNumIcon = BaseBitmap.create(toolNumIconStr);
        toolNumIcon.setPosition(toolNumBg.x - 3, toolNumBg.y - 4);
        this.addChildToContainer(toolNumIcon);
        var currNum = this.vo.getToolNum();
        var toolNum = ComponentManager.getTextField("" + currNum, TextFieldConst.FONTSIZE_TITLE_SMALL, TextFieldConst.COLOR_WHITE);
        toolNum.anchorOffsetX = toolNum.width / 2;
        toolNum.setPosition(toolNumBg.x + 86, toolNumBg.y + toolNumBg.height / 2 - toolNum.height / 2 + 3);
        this.addChildToContainer(toolNum);
        this._toolNum = toolNum;
        //衣装预览
        var skinTxtEffect = ComponentManager.getCustomMovieClip("acwealthcarpview_skineffect", 10, 70);
        skinTxtEffect.width = 208;
        skinTxtEffect.height = 154;
        skinTxtEffect.setPosition(bottomBg.x + bottomBg.width / 2 - skinTxtEffect.width / 2, bottomBg.y - 110);
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
            ViewController.getInstance().openView(ViewConst.POPUP.ACSKINOFLIBAIDETAILPOPUPVIEW4, { aid: _this.aid, code: _this.code });
        }, this);
        //活动详情
        var detailBtnBg = ResourceManager.hasRes("ac_skinoflibai_detailbtn-" + this.getTypeCode()) ? "ac_skinoflibai_detailbtn-" + this.getTypeCode() : "ac_skinoflibai_detailbtn-1";
        var detailBtn = ComponentManager.getButton(detailBtnBg, "", function () {
            //详情
            ViewController.getInstance().openView(ViewConst.POPUP.ACSKINOFLIBAIDETAILPOPUPVIEW, { aid: _this.aid, code: _this.code });
        }, this);
        detailBtn.setPosition(bottomBg.x + 20, bottomBg.y + bottomBg.height - 55 - detailBtn.height);
        this.addChildToContainer(detailBtn);
        this._detailBtn = detailBtn;
        if (this.vo.isCangetAchieveReward() || this.vo.isCangetChargeReward()) {
            App.CommonUtil.addIconToBDOC(this._detailBtn);
            var detailRed = this._detailBtn.getChildByName("reddot");
            if (detailRed) {
                detailRed.setPosition(this._detailBtn.width / 2, this._detailBtn.height / 2);
            }
        }
        else {
            App.CommonUtil.removeIconFromBDOC(this._detailBtn);
        }
        //按钮相关
        var playBtnContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(playBtnContainer);
        this._playBtnContainer = playBtnContainer;
        var playBtnImg = ResourceManager.hasRes("ac_skinoflibai_playbtn-" + this.getTypeCode()) ? "ac_skinoflibai_playbtn-" + this.getTypeCode() : "ac_skinoflibai_playbtn-1";
        var playBtn = ComponentManager.getButton(playBtnImg, "", this.playBtnClick, this);
        playBtnContainer.width = playBtn.width;
        playBtnContainer.height = playBtn.height;
        var btnLightImg = ResourceManager.hasRes("ac_skinoflibai_playbtnlight-" + this.getTypeCode()) ? "ac_skinoflibai_playbtnlight-" + this.getTypeCode() : "ac_skinoflibai_playbtnlight-1";
        var btnLight = BaseBitmap.create(btnLightImg);
        btnLight.anchorOffsetX = btnLight.width / 2;
        btnLight.anchorOffsetY = btnLight.height / 2;
        btnLight.setScale(2.2);
        btnLight.setPosition(playBtnContainer.width / 2 - 15, playBtnContainer.height / 2);
        playBtnContainer.addChild(btnLight);
        btnLight.name = "btnLight";
        egret.Tween.get(btnLight, { loop: true }).to({ rotation: 360 }, 4000);
        playBtnContainer.addChild(playBtn);
        playBtnContainer.setPosition(GameConfig.stageWidth - playBtnContainer.width - 20, bottomBg.y - 85);
        var playBtnTxtImg = ResourceManager.hasRes("ac_skinoflibai_playoncebtnname-" + this.getTypeCode()) ? "ac_skinoflibai_playoncebtnname-" + this.getTypeCode() : "ac_skinoflibai_playoncebtnname-1";
        var playBtnTxt = BaseBitmap.create(playBtnTxtImg);
        playBtnTxt.setPosition(playBtnContainer.width / 2 - playBtnTxt.width / 2 - 15, playBtnContainer.height - playBtnTxt.height / 2);
        playBtnContainer.addChild(playBtnTxt);
        this._playBtnTxt = playBtnTxt;
        if (this.vo.isFree()) {
            playBtnTxtImg = ResourceManager.hasRes("ac_skinoflibai_free-" + this.getTypeCode()) ? "ac_skinoflibai_free-" + this.getTypeCode() : "ac_skinoflibai_free-1";
        }
        else {
            var toolNum_1 = this.vo.getToolNum();
            if (toolNum_1 >= this.cfg.consume1 * 10) {
                playBtnTxtImg = ResourceManager.hasRes("ac_skinoflibai_playmultibtnname-" + this.getTypeCode()) ? "ac_skinoflibai_playmultibtnname-" + this.getTypeCode() : "ac_skinoflibai_playmultibtnname-1";
            }
            else {
                playBtnTxtImg = ResourceManager.hasRes("ac_skinoflibai_playoncebtnname-" + this.getTypeCode()) ? "ac_skinoflibai_playoncebtnname-" + this.getTypeCode() : "ac_skinoflibai_playoncebtnname-1";
            }
            if (toolNum_1 <= 0) {
                btnLight.visible = false;
            }
        }
        playBtnTxt.setRes(playBtnTxtImg);
        //进度条相关
        var proNumbg = BaseBitmap.create("public_9_bg97");
        this.addChildToContainer(proNumbg);
        proNumbg.setPosition(20, bottomBg.y - proNumbg.height);
        this._proNumBg = proNumbg;
        //进度数量TF
        var processNum = this.vo.getProcessNum();
        if (this.vo.isSecond() && processNum > this.vo.getCurrMaxProNum()) {
            processNum = this.vo.getCurrMaxProNum();
        }
        var proNum = ComponentManager.getTextField(LanguageManager.getlocal("acSkinoflibaiProcessNum-" + this.getTypeCode(), ["" + processNum, "" + this.vo.getCurrMaxProNum()]), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        proNumbg.width = proNum.width + 30;
        proNum.setPosition(proNumbg.x + proNumbg.width / 2 - proNum.width / 2, proNumbg.y + proNumbg.height / 2 - proNum.height / 2);
        this.addChildToContainer(proNum);
        this._proNum = proNum;
        //进度条相关
        // this._progressBar = ComponentManager.getProgressBar("progress12", "progress12_bg", 400);
        // this._progressBar.rotation = -90;
        // this._progressBar.setPosition(40, proNumbg.y - 5);
        // this.addChildToContainer(this._progressBar);
        var progressBgImg = ResourceManager.hasRes("ac_skinoflibai_progressbg-" + this.getTypeCode()) ? "ac_skinoflibai_progressbg-" + this.getTypeCode() : "ac_skinoflibai_progressbg-1";
        var progressBg = BaseBitmap.create(progressBgImg);
        progressBg.setPosition(60, proNumbg.y - progressBg.height - 15);
        this.addChildToContainer(progressBg);
        var progressImg = ResourceManager.hasRes("ac_skinoflibai_progress-" + this.getTypeCode()) ? "ac_skinoflibai_progress-" + this.getTypeCode() : "ac_skinoflibai_progress-1";
        var progress = BaseBitmap.create(progressImg);
        progress.setPosition(progressBg.x + progressBg.width / 2 - progress.width / 2 + 1, progressBg.y + progressBg.height / 2 - progress.height / 2);
        this.addChildToContainer(progress);
        this._progressBar = progress;
        var proMaskRect = new egret.Rectangle(0, progress.height, progress.width, progress.height);
        this._progressMaskRect = proMaskRect;
        var percent = processNum / this.vo.getCurrMaxProNum();
        if (this.vo.isSecond()) {
            percent = 1;
        }
        if (percent > 1) {
            percent = 1;
        }
        // this._progressBar.setPercentage(percent);
        proMaskRect.setTo(0, (1 - percent) * progress.height, progress.width, progress.height);
        progress.mask = proMaskRect;
        this._progressLight = BaseBitmap.create("acwealthcomingview_progresslight");
        this._progressLight.anchorOffsetX = this._progressLight.width;
        this._progressLight.anchorOffsetY = this._progressLight.height / 2;
        this._progressLight.rotation = -90;
        this._progressLight.setPosition(this._progressBar.x + this._progressBar.width / 2, this._progressBar.y + this._progressBar.height * (1 - percent));
        this.addChildToContainer(this._progressLight);
        if (percent <= 0) {
            this._progressLight.visible = false;
        }
        else {
            this._progressLight.visible = true;
        }
        var progressMask = BaseBitmap.create("ac_skinoflibai_processmask-1");
        // progressMask.anchorOffsetX = progressMask.width/2;
        // progressMask.anchorOffsetY = progressMask.height;
        progressMask.setPosition(this._progressBar.x + this._progressBar.width / 2 - progressMask.width / 2, progressBg.y + progressBg.height - 20); //14
        this.addChildToContainer(progressMask);
        this.initBox();
        this.refreshBox();
    };
    //进度box
    AcSkinOfLibaiView.prototype.initBox = function () {
        var _this = this;
        var dataList = this.cfg.getAchieveCfg();
        var index = this.vo.getSeprateIndex();
        var maxNum = this.vo.getSeprateProNum();
        var _loop_1 = function (i) {
            var data = dataList[i];
            var boxImg = "ac_skinoflibai_scroll_1-" + this_1.getTypeCode();
            var boxOpeImg = "ac_skinoflibai_scroll_2-" + this_1.getTypeCode();
            if (i == index - 1) {
                boxImg = "ac_skinoflibai_scroll_max1-" + this_1.getTypeCode();
                boxOpeImg = "ac_skinoflibai_scroll_max2-" + this_1.getTypeCode();
            }
            var box = BaseBitmap.create(boxImg);
            box.anchorOffsetX = box.width / 2;
            box.anchorOffsetY = box.height / 2;
            this_1.addChildToContainer(box);
            var boxOpen = BaseBitmap.create(boxOpeImg);
            boxOpen.anchorOffsetX = boxOpen.width / 2;
            boxOpen.anchorOffsetY = boxOpen.height / 2;
            this_1.addChildToContainer(boxOpen);
            boxOpen.visible = false;
            var per = data.specialnum / maxNum;
            box.setPosition(this_1._progressBar.x + this_1._progressBar.width / 2, this_1._progressBar.y + this_1._progressBar.height * (1 - per));
            boxOpen.setPosition(this_1._progressBar.x + this_1._progressBar.width / 2, this_1._progressBar.y + this_1._progressBar.height * (1 - per));
            var boxAni = ComponentManager.getCustomMovieClip("acskinoflibai_scrolleff", 7, 70);
            boxAni.playWithTime(0);
            boxAni.visible = false;
            boxAni.blendMode = egret.BlendMode.ADD;
            var boxAlpha = BaseBitmap.create("public_alphabg");
            boxAlpha.width = box.width;
            boxAlpha.height = box.height;
            boxAlpha.anchorOffsetX = boxAlpha.width / 2;
            boxAlpha.anchorOffsetY = boxAlpha.height / 2;
            boxAlpha.setPosition(box.x, box.y);
            this_1.addChildToContainer(boxAlpha);
            if (i == index - 1) {
                // box.y = this._progressBar.y - this._progressBar.width * per - box.height * box.scaleY / 2 + 45;
                boxAni.setScale(1.1);
                boxOpen.y = this_1._progressBar.y + this_1._progressBar.height * (1 - per) - 15;
                boxAni.setPosition(boxOpen.x - 36 * boxAni.scaleX + 10, boxOpen.y - 30 * boxAni.scaleY - 5);
            }
            else {
                boxAni.setPosition(box.x - 36 * boxAni.scaleX + 10, box.y - 30 * boxAni.scaleY - 5);
            }
            this_1.addChildToContainer(boxAni);
            boxAlpha.addTouchTap(function () {
                var id = data.id;
                if (_this.vo.isSecond()) {
                    var achieveId = _this.vo.getAchieveRewardId();
                    if (achieveId) {
                        id = achieveId;
                    }
                }
                ViewController.getInstance().openView(ViewConst.POPUP.ACSKINOFLIBAIDETAILPOPUPVIEW2, { aid: _this.aid, code: _this.code, id: id });
            }, this_1);
            this_1._boxList[i] = { box: box, boxOpen: boxOpen, boxAni: boxAni };
        };
        var this_1 = this;
        for (var i = 0; i < index; i++) {
            _loop_1(i);
        }
    };
    AcSkinOfLibaiView.prototype.refreshBox = function () {
        var dataList = this.cfg.getAchieveCfg();
        var currPro = this.vo.getProcessNum();
        var isSecond = this.vo.isSecond();
        for (var i = 0; i < this._boxList.length; i++) {
            if (isSecond) {
                this._boxList[i].box.visible = false;
                this._boxList[i].boxOpen.visible = true;
                if (!this.vo.isGetAchieveRewardById(dataList[i].id) && currPro >= dataList[i].specialnum) {
                    this._boxList[i].boxAni.visible = true;
                }
                else {
                    this._boxList[i].boxAni.visible = false;
                }
            }
            else {
                if (this.vo.isGetAchieveRewardById(dataList[i].id)) {
                    this._boxList[i].box.visible = false;
                    this._boxList[i].boxOpen.visible = true;
                    this._boxList[i].boxAni.visible = false;
                }
                else {
                    if (currPro >= dataList[i].specialnum) {
                        this._boxList[i].box.visible = false;
                        this._boxList[i].boxOpen.visible = true;
                        this._boxList[i].boxAni.visible = true;
                    }
                    else {
                        this._boxList[i].box.visible = true;
                        this._boxList[i].boxOpen.visible = false;
                        this._boxList[i].boxAni.visible = false;
                    }
                }
            }
        }
        if (isSecond) {
            var isHaveReward = false;
            for (var i = 0; i < dataList.length; i++) {
                if (!this.vo.isGetAchieveRewardById(dataList[i].id) && currPro >= dataList[i].specialnum) {
                    isHaveReward = true;
                    break;
                }
            }
            App.LogUtil.log("isHaveReward: " + isHaveReward);
            if (isHaveReward) {
                this._boxList[this._boxList.length - 1].boxAni.visible = true;
            }
            else {
                this._boxList[this._boxList.length - 1].boxAni.visible = false;
            }
        }
    };
    //饮酒
    AcSkinOfLibaiView.prototype.playBtnClick = function () {
        if (!this.vo.isInActivity()) {
            this.vo.showAcEndTip();
            return;
        }
        if (this._isPlay) {
            return;
        }
        var toolNum = this.vo.getToolNum();
        var isTenplay = 0;
        if (this.vo.isFree()) {
            this._isPlay = true;
            NetManager.request(NetRequestConst.REQUEST_ACSKINOFLIBAI_LOTTERY, { activeId: this.vo.aidAndCode, isFree: 1, isTenPlay: 0 });
        }
        else if (toolNum > 0) {
            if (toolNum >= this.cfg.consume1 * 10) {
                this._isPlay = true;
                isTenplay = 1;
            }
            NetManager.request(NetRequestConst.REQUEST_ACSKINOFLIBAI_LOTTERY, { activeId: this.vo.aidAndCode, isFree: 0, isTenPlay: isTenplay });
        }
        else {
            this.showRechargeTipView();
        }
    };
    AcSkinOfLibaiView.prototype.lotteryCallback = function (event) {
        if (!event.data.ret) {
            return;
        }
        var view = this;
        var rData = event.data.data.data;
        view._rewardData = rData;
        this.showViewMask();
        var bone = "jiubei";
        var boneName = bone + "_ske";
        if ((!Api.switchVoApi.checkCloseBone()) && boneName && RES.hasRes(boneName) && App.CommonUtil.check_dragon()) {
            this._playBtnContainer.visible = false;
            var jiubeiBone_1 = App.DragonBonesUtil.getLoadDragonBones(bone, 1, "appear");
            jiubeiBone_1.setPosition(view._bottomBg.x + view._bottomBg.width / 2 - 30, view._bottomBg.y + 70);
            view.addChildToContainer(jiubeiBone_1);
            jiubeiBone_1.setDragonBoneEventListener(dragonBones.EventObject.COMPLETE, function () {
                view.container.removeChild(jiubeiBone_1);
                view._lotteryBoneList.push(jiubeiBone_1);
                view.showPoemAni();
            }, view);
        }
        else {
            view.showPoemAni();
        }
    };
    AcSkinOfLibaiView.prototype.showPoemAni = function () {
        var _this = this;
        var poemContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(poemContainer);
        var poemBgImg = ResourceManager.hasRes("ac_skinoflibai_poem_bg-" + this.getTypeCode()) ? "ac_skinoflibai_poem_bg-" + this.getTypeCode() : "ac_skinoflibai_poem_bg-1";
        var poemBg = BaseBitmap.create(poemBgImg);
        poemContainer.addChild(poemBg);
        var poemBg_ = BaseBitmap.create(poemBgImg);
        poemContainer.addChild(poemBg_);
        poemBg_.anchorOffsetX = poemBg_.width / 2;
        poemBg_.anchorOffsetY = poemBg_.height;
        poemBg_.setPosition(poemBg.x + poemBg.width / 2, poemBg.y + poemBg.height - 1);
        poemBg_.rotation = 180;
        poemContainer.width = poemBg.width;
        poemContainer.height = poemBg.height * 2;
        poemContainer.setPosition(this._bottomBg.x + this._bottomBg.width - poemContainer.width - 20, this._bottomBg.y - poemContainer.height - 40);
        if (PlatformManager.checkIsTextHorizontal()) {
            poemBg.anchorOffsetX = poemBg.width / 2;
            poemBg.anchorOffsetY = poemBg.height;
            poemBg.rotation = -90;
            poemBg_.rotation = 90;
            poemContainer.height = poemBg.width;
            poemContainer.width = poemBg.height * 2;
            poemBg.setPosition(poemContainer.width / 2, poemContainer.height / 2);
            poemBg_.setPosition(poemContainer.width / 2 - 1, poemContainer.height / 2);
            poemContainer.setPosition(this._bottomBg.x + this._bottomBg.width / 2 - poemContainer.width / 2, this._bottomBg.y - poemContainer.height - 60);
        }
        //poem 
        var randIndex = App.MathUtil.getRandom(1, 9);
        var poemImg = ResourceManager.hasRes("ac_skinoflibai_poem" + randIndex + "-" + this.getTypeCode()) ? "ac_skinoflibai_poem" + randIndex + "-" + this.getTypeCode() : "ac_skinoflibai_poem" + randIndex + "-1";
        var poem = BaseBitmap.create(poemImg);
        poemContainer.addChild(poem);
        var poemMask = new egret.Rectangle(poem.width / 2, 0, poem.width / 2, 60);
        poem.mask = poemMask;
        var poem_ = BaseBitmap.create(poemImg);
        poemContainer.addChild(poem_);
        var poemMask_ = new egret.Rectangle(0, 0, poem_.width / 2, 60);
        poem_.mask = poemMask_;
        //笔刷
        var brushImg = ResourceManager.hasRes("ac_skinoflibai_poem_brush-" + this.getTypeCode()) ? "ac_skinoflibai_poem_brush-" + this.getTypeCode() : "ac_skinoflibai_poem_brush-1";
        var brush = BaseBitmap.create(brushImg);
        brush.anchorOffsetY = brush.height;
        poemContainer.addChild(brush);
        brush.setPosition(poem.x + poem.width / 2, poem.y + 80); //35
        var brushTime = 150;
        if (PlatformManager.checkIsTextHorizontal()) {
            poemMask = new egret.Rectangle(0, 0, 35, poem.height / 2);
            poem.mask = poemMask;
            poemMask_ = new egret.Rectangle(0, poem.height / 2, 35, poem.height / 2);
            poem_.mask = poemMask_;
            brush.setPosition(poem.x + 80, poem.y + poem.height / 2);
            var offY = 35;
            egret.Tween.get(brush).call(function () { _this.setPoemMask(poem, poemMask, null); })
                .to({ y: brush.y - offY, x: brush.x + 30 }, brushTime)
                .to({ y: brush.y, x: brush.x + 60 }, brushTime)
                .to({ y: brush.y - offY, x: brush.x + 90 }, brushTime)
                .to({ y: brush.y, x: brush.x + 120 }, brushTime)
                .to({ y: brush.y - offY, x: brush.x + 150 }, brushTime)
                .to({ y: brush.y, x: brush.x + 180 }, brushTime)
                .to({ y: brush.y - offY, x: brush.x + 210 }, brushTime)
                .to({ y: brush.y, x: brush.x + 240 }, brushTime)
                .to({ y: brush.y - offY, x: brush.x + 270 }, brushTime)
                .to({ y: brush.y, x: brush.x + 300 }, brushTime)
                .to({ y: brush.y + 10, x: brush.x }, 0)
                .call(function () { _this.setPoemMask(poem_, poemMask_, null); })
                .to({ y: brush.y + 10 + offY, x: brush.x + 30 }, brushTime)
                .to({ y: brush.y + 10, x: brush.x + 60 }, brushTime)
                .to({ y: brush.y + 10 + offY, x: brush.x + 90 }, brushTime)
                .to({ y: brush.y + 10, x: brush.x + 120 }, brushTime)
                .to({ y: brush.y + 10 + offY, x: brush.x + 150 }, brushTime)
                .to({ y: brush.y + 10, x: brush.x + 180 }, brushTime)
                .to({ y: brush.y + 10 + offY, x: brush.x + 210 }, brushTime)
                .to({ y: brush.y + 10, x: brush.x + 240 }, brushTime)
                .to({ y: brush.y + 10 + offY, x: brush.x + 270 }, brushTime)
                .to({ y: brush.y + 10, x: brush.x + 300 }, brushTime)
                .call(function () {
                poemContainer.dispose();
                _this.showRewardView();
            });
        }
        else {
            var offX = 35;
            egret.Tween.get(brush).call(function () { _this.setPoemMask(poem, poemMask, null); })
                .to({ x: brush.x + offX, y: brush.y + 30 }, brushTime)
                .to({ x: brush.x, y: brush.y + 60 }, brushTime)
                .to({ x: brush.x + offX, y: brush.y + 90 }, brushTime)
                .to({ x: brush.x, y: brush.y + 120 }, brushTime)
                .to({ x: brush.x + offX, y: brush.y + 150 }, brushTime)
                .to({ x: brush.x, y: brush.y + 180 }, brushTime)
                .to({ x: brush.x + offX, y: brush.y + 210 }, brushTime)
                .to({ x: brush.x, y: brush.y + 240 }, brushTime)
                .to({ x: brush.x + offX, y: brush.y + 270 }, brushTime)
                .to({ x: brush.x, y: brush.y + 300 }, brushTime)
                .to({ x: brush.x - 10, y: brush.y }, 0)
                .call(function () { _this.setPoemMask(poem_, poemMask_, null); })
                .to({ x: brush.x - 10 - offX, y: brush.y + 30 }, brushTime)
                .to({ x: brush.x - 10, y: brush.y + 60 }, brushTime)
                .to({ x: brush.x - 10 - offX, y: brush.y + 90 }, brushTime)
                .to({ x: brush.x - 10, y: brush.y + 120 }, brushTime)
                .to({ x: brush.x - 10 - offX, y: brush.y + 150 }, brushTime)
                .to({ x: brush.x - 10, y: brush.y + 180 }, brushTime)
                .to({ x: brush.x - 10 - offX, y: brush.y + 210 }, brushTime)
                .to({ x: brush.x - 10, y: brush.y + 240 }, brushTime)
                .to({ x: brush.x - 10 - offX, y: brush.y + 270 }, brushTime)
                .to({ x: brush.x - 10, y: brush.y + 300 }, brushTime)
                .call(function () {
                poemContainer.dispose();
                _this.showRewardView();
            });
        }
    };
    AcSkinOfLibaiView.prototype.setPoemMask = function (obj, mask, callback) {
        var _this = this;
        egret.Tween.get(this).wait(50).call(function () {
            if (PlatformManager.checkIsTextHorizontal()) {
                egret.Tween.get(obj, { loop: true }).call(function () {
                    var maskW = mask.width;
                    var maskY = mask.y;
                    if (maskW >= 395) {
                        egret.Tween.removeTweens(obj);
                        if (callback) {
                            callback.apply(_this);
                        }
                    }
                    else {
                        var offW = maskW + 30;
                        mask.setTo(0, maskY, offW, obj.height / 2);
                        obj.mask = mask;
                    }
                }).wait(150);
            }
            else {
                egret.Tween.get(obj, { loop: true }).call(function () {
                    var maskH = mask.height;
                    var maskX = mask.x;
                    if (maskH >= 370) {
                        egret.Tween.removeTweens(obj);
                        if (callback) {
                            callback.apply(_this);
                        }
                    }
                    else {
                        var offH = maskH + 30;
                        mask.setTo(maskX, 0, obj.width / 2, offH);
                        obj.mask = mask;
                    }
                }).wait(150);
            }
        });
    };
    AcSkinOfLibaiView.prototype.showRewardView = function () {
        var view = this;
        var rData = view._rewardData;
        ViewController.getInstance().openView(ViewConst.POPUP.ACWORSHIPGETREWARDPOPUPVIEW, {
            rewards: rData.rewards, otherRewards: rData.otherrewards, criArr: rData.criArr, code: view.getTypeCode(), aid: view.aid, isPlayAni: true, aidCode: view.vo.aidAndCode, msgStr: "acSkinoflibaiRewardMsg-" + view.getTypeCode(), callback: function () {
                view.refreshUI();
                view.hideViewMask();
                view._isPlay = false;
            }, handler: view
        });
        if (rData.replacerewards) {
            ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD, { replacerewards: rData.replacerewards });
        }
    };
    AcSkinOfLibaiView.prototype.refreshUI = function () {
        //play btn
        var toolNum = this.vo.getToolNum();
        this._playBtnContainer.visible = true;
        var btnLight = this._playBtnContainer.getChildByName("btnLight");
        btnLight.visible = true;
        var playBtnTxtImg = ResourceManager.hasRes("ac_skinoflibai_playoncebtnname-" + this.getTypeCode()) ? "ac_skinoflibai_playoncebtnname-" + this.getTypeCode() : "ac_skinoflibai_playoncebtnname-1";
        ;
        if (this.vo.isFree()) {
            playBtnTxtImg = ResourceManager.hasRes("ac_skinoflibai_free-" + this.getTypeCode()) ? "ac_skinoflibai_free-" + this.getTypeCode() : "ac_skinoflibai_free-1";
        }
        else if (toolNum > 0) {
            if (toolNum > this.cfg.consume1 * 10) {
                playBtnTxtImg = ResourceManager.hasRes("ac_skinoflibai_playmultibtnname-" + this.getTypeCode()) ? "ac_skinoflibai_playmultibtnname-" + this.getTypeCode() : "ac_skinoflibai_playmultibtnname-1";
            }
            else {
                playBtnTxtImg = ResourceManager.hasRes("ac_skinoflibai_playoncebtnname-" + this.getTypeCode()) ? "ac_skinoflibai_playoncebtnname-" + this.getTypeCode() : "ac_skinoflibai_playoncebtnname-1";
            }
        }
        else {
            btnLight.visible = false;
        }
        this._playBtnTxt.setRes(playBtnTxtImg);
        //进度条
        var processNum = this.vo.getProcessNum();
        if (this.vo.isSecond() && processNum > this.vo.getCurrMaxProNum()) {
            processNum = this.vo.getCurrMaxProNum();
        }
        this._proNum.text = LanguageManager.getlocal("acSkinoflibaiProcessNum-" + this.getTypeCode(), ["" + processNum, "" + this.vo.getCurrMaxProNum()]);
        this._proNumBg.width = this._proNum.width + 30;
        this._proNum.x = this._proNumBg.x + this._proNumBg.width / 2 - this._proNum.width / 2;
        var percent = processNum / this.vo.getCurrMaxProNum();
        if (this.vo.isSecond()) {
            percent = 1;
        }
        if (percent > 1) {
            percent = 1;
        }
        this._progressMaskRect.setTo(0, (1 - percent) * this._progressBar.height, this._progressBar.width, this._progressBar.height);
        this._progressBar.mask = this._progressMaskRect;
        // this._progressBar.setPercentage(percent);
        this._progressLight.setPosition(this._progressBar.x + this._progressBar.width / 2, this._progressBar.y + this._progressBar.height * (1 - percent));
        //宝箱
        this.refreshBox();
    };
    AcSkinOfLibaiView.prototype.refreshView = function () {
        var toolNum = this.vo.getToolNum();
        this._toolNum.text = "" + toolNum;
        this._toolNum.anchorOffsetX = this._toolNum.width / 2;
        //红点
        if (this.vo.isCangetAchieveReward() || this.vo.isCangetChargeReward()) {
            App.CommonUtil.addIconToBDOC(this._detailBtn);
            var detailRed = this._detailBtn.getChildByName("reddot");
            if (detailRed) {
                detailRed.setPosition(this._detailBtn.width / 2, this._detailBtn.height / 2);
            }
        }
        else {
            App.CommonUtil.removeIconFromBDOC(this._detailBtn);
        }
        if (!this._isPlay) {
            this.refreshUI();
        }
    };
    AcSkinOfLibaiView.prototype.showRechargeTipView = function () {
        var _this = this;
        ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW, {
            title: "acSkinoflibaiRechargeTipTitle-" + this.getTypeCode(),
            msg: LanguageManager.getlocal("acSkinoflibaiRechargeTipMsg-" + this.getTypeCode()),
            callback: function () {
                ViewController.getInstance().openView(ViewConst.POPUP.ACSKINOFLIBAIDETAILPOPUPVIEW, { aid: _this.aid, code: _this.code });
            },
            handler: this,
            needCancel: true,
        });
    };
    //mask
    AcSkinOfLibaiView.prototype.showViewMask = function () {
        var touchPos = BaseBitmap.create("public_alphabg");
        touchPos.width = GameConfig.stageWidth;
        touchPos.height = GameConfig.stageHeigth;
        this.addChild(touchPos);
        touchPos.name = "viewMaskTouchPos";
        touchPos.touchEnabled = true;
    };
    AcSkinOfLibaiView.prototype.hideViewMask = function () {
        var touchPos = this.getChildByName("viewMaskTouchPos");
        if (touchPos) {
            touchPos.touchEnabled = false;
            touchPos.dispose();
        }
    };
    AcSkinOfLibaiView.prototype.tick = function () {
        this._acTimeTf.text = LanguageManager.getlocal("acSkinoflibaiTimeCountDown", [this.vo.getCountDown()]);
    };
    Object.defineProperty(AcSkinOfLibaiView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcSkinOfLibaiView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    AcSkinOfLibaiView.prototype.getBgName = function () {
        return ResourceManager.hasRes("ac_skinoflibai_bg-" + this.getTypeCode()) ? "ac_skinoflibai_bg-" + this.getTypeCode() : "ac_skinoflibai_bg-1";
    };
    AcSkinOfLibaiView.prototype.getTitleBgName = function () {
        return ResourceManager.hasRes("ac_skinoflibai_titlebg-" + this.getTypeCode()) ? "ac_skinoflibai_titlebg-" + this.getTypeCode() : "ac_skinoflibai_titlebg-1";
    };
    AcSkinOfLibaiView.prototype.isHideTitleBgShadow = function () {
        return true;
    };
    AcSkinOfLibaiView.prototype.getTitleStr = function () {
        return "";
    };
    AcSkinOfLibaiView.prototype.getRuleInfo = function () {
        return "acSkinoflibaiRuleInfo-" + this.getTypeCode();
    };
    AcSkinOfLibaiView.prototype.getProbablyInfo = function () {
        return "acSkinoflibaiProbablyInfo-" + this.getTypeCode();
    };
    AcSkinOfLibaiView.prototype.getTypeCode = function () {
        if (this.code == "2") {
            return "1";
        }
        return this.code;
    };
    AcSkinOfLibaiView.prototype.getResourceList = function () {
        var list = [];
        if (this.getTypeCode() != "1") {
            list = [
                "acskinoflibai_code1"
            ];
        }
        else {
            list = [
                "jiubei_ske", "jiubei_tex_json", "jiubei_tex_png"
            ];
        }
        return _super.prototype.getResourceList.call(this).concat([
            "acwealthcomingview_progresslight", "ac_skinoflibai_toolnumbg", "acwealthcarpview_servantskintxt", "progress12", "progress12_bg",
            "acskinoflibai_code" + this.getTypeCode(),
            "ac_skinoflibai_bg-" + this.getTypeCode(),
            "ac_skinoflibai_infobg-" + this.getTypeCode(),
            "ac_skinoflibai_titlebg-" + this.getTypeCode(),
        ]).concat(list);
    };
    AcSkinOfLibaiView.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACSKINOFLIBAI_LOTTERY, this.lotteryCallback, this);
        this._timeBg = null;
        this._acTimeTf = null;
        this._bottomBg = null;
        this._detailBtn = null;
        this._toolNum = null;
        this._playBtnContainer = null;
        this._playBtnTxt = null;
        this._proNumBg = null;
        this._proNum = null;
        this._progressBar = null;
        this._progressLight = null;
        this._boxList = [];
        this._isPlay = false;
        this._rewardData = null;
        if (this._lotteryBoneList.length > 0) {
            for (var i = 0; i < this._lotteryBoneList.length; i++) {
                this._lotteryBoneList[i].dispose();
            }
        }
        this._lotteryBoneList = [];
        this._progressMaskRect = null;
        _super.prototype.dispose.call(this);
    };
    return AcSkinOfLibaiView;
}(AcCommonView));
__reflect(AcSkinOfLibaiView.prototype, "AcSkinOfLibaiView");
//# sourceMappingURL=AcSkinOfLibaiView.js.map