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
  * 搜查魏府 活动
  * @author 张朝阳
  * date 2019/6/24
  * @class AcSearchProofView
  */
var AcSearchProofView = (function (_super) {
    __extends(AcSearchProofView, _super);
    function AcSearchProofView() {
        var _this = _super.call(this) || this;
        _this._countDownTime = null;
        _this._countDownTimeBg = null;
        _this.bubbleTip = null;
        _this.redDotObj = {};
        _this.brandObj = {};
        _this._oneBtn = null;
        _this._progressBar = null;
        _this._startPercent = 0;
        _this._progressBM = null;
        _this._progressLight = null;
        _this._numTF = null;
        _this._boxBM = null;
        _this._boxLightBM = null;
        _this._redDot = null;
        _this._progressTF = null;
        _this._boxInfoList = [];
        _this._bg = null;
        _this._isPlay = false;
        _this._proofTF = null;
        _this._searchTF = null;
        _this._handlerData = null;
        _this._hammerEffect = null;
        return _this;
    }
    AcSearchProofView.prototype.buildingCfg = function () {
        return [
            { buildId: "charge", buildingPic: "acsearchproofview_building_charge-" + this.getUiCode(), buildPos: { x: 9, y: 761 }, buildScale: 4, brandPic: "acsearchproofview_brand_charge-" + this.getUiCode(), brandPos: { x: 76, y: 747 }, brandName: LanguageManager.getlocal("acSearchProofViewBrandCharge-" + this.code) },
            { buildId: "skin", buildingPic: "acsearchproofview_building_skin-" + this.getUiCode(), buildPos: { x: 489, y: 761 }, buildScale: 4, brandPic: "acsearchproofview_brand_skin-" + this.getUiCode(), brandPos: { x: 564, y: 747 }, brandName: LanguageManager.getlocal("acSearchProofViewBrandSkin-" + this.code) },
            { buildId: "rewardsPool", buildingPic: "acsearchproofview_building_rewardpool-" + this.getUiCode(), buildPos: { x: 218, y: 662 }, buildScale: 4, brandPic: "acsearchproofview_brand_rewardpool-" + this.getUiCode(), brandPos: { x: 320, y: 662 }, brandName: LanguageManager.getlocal("acSearchProofViewBrandRewardPool-" + this.code) },
        ];
    };
    AcSearchProofView.prototype.getNotUseBrandCfg = function () {
        return [
            { id: 1, x: 317, y: 430 },
            { id: 2, x: 192, y: 492 },
            { id: 3, x: 443, y: 492 },
            { id: 4, x: 66, y: 528 },
            { id: 5, x: 573, y: 528 },
            { id: 6, x: 234, y: 548 },
            { id: 7, x: 403, y: 548 },
        ];
    };
    AcSearchProofView.prototype.getPosCfg = function () {
        return [
            { x: 128, y: 454 },
            { x: 390, y: 454 },
            { x: 0, y: 512 },
            { x: 521, y: 512 },
            { x: 174, y: 526 },
            { x: 336, y: 526 },
        ];
    };
    AcSearchProofView.prototype.initView = function () {
        var _this = this;
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        var skinCfg = Config.ServantskinCfg.getServantSkinItemById(cfg.show);
        var servantCfg = Config.ServantCfg.getServantItemById(skinCfg.servantId);
        var rewards = GameData.formatRewardItem(cfg.itemExchange[0].costProof)[0];
        var desc = LanguageManager.getlocal("acSearchProofSearchViewDesc-" + this.code);
        ViewController.getInstance().openView(ViewConst.POPUP.ACSEARCHPROOFSEARCHVIEW, { aid: this.aid, code: this.code, skin: skinCfg.body, name: servantCfg.name, desc: desc });
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY_SEARCHPROOF, this.worshipRewardsHandle, this);
        this._startPercent = vo.getnum() / cfg.getMaxAchievementValue();
        var bg = BaseLoadBitmap.create("acsearchproofview_bg-" + this.getUiCode());
        bg.width = 640;
        bg.height = 1136;
        bg.setPosition(0, GameConfig.stageHeigth - bg.height);
        this.addChildToContainer(bg);
        this._bg = bg;
        var notUseBrandCfg = this.getNotUseBrandCfg();
        for (var key in notUseBrandCfg) {
            var item = notUseBrandCfg[key];
            var brandName = ComponentManager.getTextField(LanguageManager.getlocal("acSearchProofViewNotUseBrandName" + item.id + "-" + this.code), 15, 0xc5b69b);
            var offestWidth = brandName.width > 60 ? brandName.width - 60 : 0;
            var brandPic = BaseBitmap.create("acsearchproofview_common_dark");
            var startWidth = brandPic.width;
            brandPic.width += offestWidth;
            brandPic.setPosition(item.x - brandPic.width / 2, item.y + bg.y - brandPic.height / 2);
            this.addChildToContainer(brandPic);
            brandName.setPosition(brandPic.x + brandPic.width / 2 - brandName.width / 2, brandPic.y + brandPic.height / 2 - brandName.height / 2);
            this.addChildToContainer(brandName);
        }
        var buildingCfg = this.buildingCfg();
        for (var key in buildingCfg) {
            var item = buildingCfg[key];
            var buildPic = BaseLoadBitmap.create(item.buildingPic);
            buildPic.setScale(item.buildScale);
            buildPic.setPosition(item.buildPos.x, item.buildPos.y + bg.y);
            buildPic.name = item.buildId;
            this.addChildToContainer(buildPic);
            buildPic.addTouch(this.onNPCTouchHandler, this, null, true);
            buildPic.alpha = 0;
            var brandName = ComponentManager.getTextField(item.brandName, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
            var offestWidth = brandName.width > 80 ? brandName.width - 80 : 0;
            var brandPic = BaseBitmap.create("acsearchproofview_common_yellow");
            var startWidth = brandPic.width;
            brandPic.width += offestWidth;
            brandPic.setPosition(item.brandPos.x - brandPic.width / 2, item.brandPos.y + bg.y - brandPic.height / 2);
            brandPic.name = item.buildId;
            brandPic.addTouch(this.onNPCTouchHandler, this, null, true);
            this.addChildToContainer(brandPic);
            brandName.setPosition(brandPic.x + brandPic.width / 2 - brandName.width / 2, brandPic.y + brandPic.height / 2 - brandName.height / 2);
            this.addChildToContainer(brandName);
            if (item.buildId == "charge") {
                var clip = ComponentManager.getCustomMovieClip("acsearchproofvieweffect_charge", 8, 128);
                var clipBM = BaseBitmap.create("acsearchproofvieweffect_charge1");
                var scaleX = 1;
                if (offestWidth > 0) {
                    scaleX = brandPic.width / startWidth;
                }
                clip.scaleX = scaleX;
                clip.setPosition(brandPic.x + brandPic.width / 2 - clipBM.width / 2 * scaleX, brandPic.y + brandPic.height / 2 - clipBM.height / 2);
                this.addChildToContainer(clip);
                clip.playWithTime(-1);
            }
            var dot = BaseBitmap.create("public_dot2");
            dot.setScale(0.88);
            dot.x = brandPic.x + brandPic.width - 22;
            dot.y = brandPic.y - 5;
            this.addChildToContainer(dot);
            dot.setVisible(false);
            this.redDotObj[item.buildId] = dot;
            this.refreshRedDot();
        }
        var titleBg = BaseLoadBitmap.create("acsearchproofview_titlebg-" + this.getUiCode());
        titleBg.width = 640;
        titleBg.height = 92;
        titleBg.setPosition(0, 0);
        var topBg = BaseLoadBitmap.create("acsearchproofview_topbg-" + this.code);
        topBg.width = 640;
        topBg.height = 146;
        topBg.setPosition(titleBg.x, titleBg.y + titleBg.height - 7);
        this.addChildToContainer(topBg);
        this.addChildToContainer(titleBg);
        // let descBg = BaseBitmap.create("public_9_downbg");
        // descBg.width = 421;
        // descBg.height = 126;
        // descBg.setPosition(topBg.x + 206, topBg.y + 31);
        // this.addChildToContainer(descBg);
        var acTime = ComponentManager.getTextField(LanguageManager.getlocal("acSearchProofView_acTime-" + this.code, [vo.acTimeAndHour]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        acTime.setPosition(topBg.x + 210, topBg.y + 15);
        this.addChildToContainer(acTime);
        var descTF = ComponentManager.getTextField(LanguageManager.getlocal("acSearchProofView_acDesc-" + this.code, [String(rewards.num)]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        descTF.width = 400;
        descTF.lineSpacing = 3;
        descTF.setPosition(acTime.x, acTime.y + acTime.height + 5);
        this.addChildToContainer(descTF);
        this._proofTF = ComponentManager.getTextField(LanguageManager.getlocal("acSearchProoViewProof-" + this.code), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._proofTF.setPosition(acTime.x, topBg.y + topBg.height - this._proofTF.height - 10);
        this.addChildToContainer(this._proofTF);
        var offestX = 105;
        var offestY = 118;
        var skinTxtEffect = ComponentManager.getCustomMovieClip("acwealthcarpview_skineffect", 10, 70);
        // this._effect.setScale(2);
        var skinTxtEffectBM = BaseBitmap.create("acwealthcarpview_skineffect1");
        skinTxtEffect.setPosition(topBg.x + offestX - skinTxtEffectBM.width / 2, topBg.y + offestY - skinTxtEffectBM.height / 2);
        skinTxtEffect.blendMode = egret.BlendMode.ADD;
        this.addChildToContainer(skinTxtEffect);
        skinTxtEffect.playWithTime(-1);
        var skinTxt = BaseBitmap.create("acsearchproofview_common_skintxt");
        skinTxt.anchorOffsetX = skinTxt.width / 2;
        skinTxt.anchorOffsetY = skinTxt.height / 2;
        skinTxt.setPosition(topBg.x + offestX, topBg.y + offestY);
        this.addChildToContainer(skinTxt);
        egret.Tween.get(skinTxt, { loop: true }).to({ scaleX: 1.05, scaleY: 1.05 }, 400).to({ scaleX: 1, scaleY: 1 }, 400);
        var skinTxteffect = BaseBitmap.create("acsearchproofview_common_skintxt");
        skinTxteffect.anchorOffsetX = skinTxteffect.width / 2;
        skinTxteffect.anchorOffsetY = skinTxteffect.height / 2;
        skinTxteffect.setPosition(topBg.x + offestX, topBg.y + offestY);
        this.addChildToContainer(skinTxteffect);
        skinTxteffect.blendMode = egret.BlendMode.ADD;
        skinTxteffect.alpha = 0;
        egret.Tween.get(skinTxteffect, { loop: true }).to({ alpha: 0.7, scaleX: 1.05, scaleY: 1.05 }, 400).to({ alpha: 0, scaleX: 1, scaleY: 1 }, 400);
        //透明点击区域
        var touchPos = BaseBitmap.create("public_alphabg");
        touchPos.width = 180;
        touchPos.height = 200;
        touchPos.setPosition(topBg.x, topBg.y);
        this.addChildToContainer(touchPos);
        touchPos.addTouchTap(function () {
            ViewController.getInstance().openView(ViewConst.POPUP.ACSEARCHPROOFSKINPOPUPVIEW, { code: _this.code, aid: _this.aid });
        }, this);
        this._countDownTimeBg = BaseBitmap.create("public_9_bg61");
        this._countDownTimeBg.y = topBg.y + topBg.height - this._countDownTimeBg.height / 2 - 2;
        this.addChildToContainer(this._countDownTimeBg);
        this._countDownTime = ComponentManager.getTextField(LanguageManager.getlocal("acSearchProofView_acCountTime-" + this.code, [vo.acCountDown]), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_WHITE);
        this._countDownTimeBg.width = 60 + this._countDownTime.width;
        this._countDownTimeBg.x = GameConfig.stageWidth - this._countDownTimeBg.width - 15;
        this._countDownTime.setPosition(this._countDownTimeBg.x + this._countDownTimeBg.width / 2 - this._countDownTime.width / 2, this._countDownTimeBg.y + this._countDownTimeBg.height / 2 - this._countDownTime.height / 2);
        this.addChildToContainer(this._countDownTime);
        this._hammerEffect = ComponentManager.getCustomMovieClip("acsearchproofvieweffect_search", 17, 70);
        this.addChild(this._hammerEffect);
        this._hammerEffect.setVisible(false);
        this.initButtom();
        this.tick();
        this.refreshView();
    };
    AcSearchProofView.prototype.initButtom = function () {
        var _this = this;
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        var buttombg = BaseLoadBitmap.create("arena_bottom");
        buttombg.width = 640;
        buttombg.height = 140;
        buttombg.setPosition(0, GameConfig.stageHeigth - buttombg.height);
        this.addChildToContainer(buttombg);
        this._searchTF = ComponentManager.getTextField(LanguageManager.getlocal("acSearchProoViewSearchDesc-" + this.code), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._searchTF.setPosition(buttombg.x + 270, buttombg.y + 15);
        this.addChildToContainer(this._searchTF);
        var searchBMScale = 0.43;
        var searchBM = BaseLoadBitmap.create("acsearchproofview_item_searchtoken-" + this.code);
        searchBM.width = 100;
        searchBM.height = 100;
        searchBM.setScale(0.43);
        searchBM.setPosition(this._searchTF.x - searchBM.width * searchBMScale, this._searchTF.y + this._searchTF.height / 2 - searchBM.height / 2 * searchBMScale);
        this.addChildToContainer(searchBM);
        //一次相关
        //按钮
        this._oneBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "acSearchProofView_oneBtn-" + this.code, this.oneBtnClick, this);
        this._oneBtn.setPosition(85, buttombg.y + buttombg.height - this._oneBtn.height - 20);
        this.addChildToContainer(this._oneBtn);
        //十次相关
        //按钮
        var tenBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "acSearchProofView_tenBtn-" + this.code, this.tenBtnClick, this);
        tenBtn.setPosition(buttombg.x + buttombg.width - tenBtn.width - 90, buttombg.y + buttombg.height - tenBtn.height - 20);
        this.addChildToContainer(tenBtn);
        var mustTF = ComponentManager.getTextField(LanguageManager.getlocal("acSearchProofView_Must-" + this.code), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        mustTF.setPosition(tenBtn.x + tenBtn.width / 2 - mustTF.width / 2, tenBtn.y - mustTF.height - 5);
        this.addChildToContainer(mustTF);
        var progressbg = BaseLoadBitmap.create("luckdrawprogressbg-1");
        progressbg.width = 640;
        progressbg.height = 107;
        progressbg.setPosition(0, buttombg.y - progressbg.height);
        this.addChildToContainer(progressbg);
        //进度条
        this._progressBar = ComponentManager.getProgressBar("progress12", "progress12_bg", 435);
        this._progressBar.setPosition(progressbg.x + progressbg.width / 2 - this._progressBar.width / 2 - 10, progressbg.y + progressbg.height / 2 - this._progressBar.height / 2);
        this.addChildToContainer(this._progressBar);
        this._progressBar.setPercentage(this._startPercent);
        var progressNumber = cfg.getMaxAchievementValue();
        this._progressTF = ComponentManager.getTextField(vo.getnum() + "/" + progressNumber, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        this._progressTF.setPosition(this._progressBar.x + this._progressBar.width / 2 - this._progressTF.width / 2, this._progressBar.y + this._progressBar.height + 12);
        this.addChildToContainer(this._progressTF);
        this._progressBM = BaseBitmap.create("acworshipview_slider");
        this._progressBM.anchorOffsetX = this._progressBM.width / 2;
        this._progressBM.anchorOffsetY = this._progressBM.height;
        var posWidthValue = this._startPercent >= 1 ? 1 : this._startPercent;
        this._progressBM.setPosition(this._progressBar.x + this._progressBar.width * posWidthValue, this._progressBar.y);
        this.addChildToContainer(this._progressBM);
        this._progressLight = BaseBitmap.create("acwealthcomingview_progresslight");
        this._progressLight.anchorOffsetX = this._progressLight.width;
        this._progressLight.anchorOffsetY = this._progressLight.height / 2;
        this._progressLight.setPosition(this._progressBar.x + this._progressBar.width * this._startPercent, this._progressBar.y + this._progressBar.height / 2);
        this.addChildToContainer(this._progressLight);
        this._progressLight.setVisible(false);
        //次数this._bg
        var numbg = BaseBitmap.create("acwealthcomingview_numbg");
        numbg.setPosition(this._progressBar.x + 12 - numbg.width, this._progressBar.y + this._progressBar.height / 2 - numbg.height / 2);
        this.addChildToContainer(numbg);
        //数量TF
        var numDescTF = ComponentManager.getTextField(LanguageManager.getlocal("acSearchProofViewNumDesc-" + this.code), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_BLACK);
        numDescTF.setPosition(numbg.x + numbg.width / 2 - numDescTF.width / 2, numbg.y + 28);
        this.addChildToContainer(numDescTF);
        //数量TF
        this._numTF = ComponentManager.getTextField("9999", TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_BLACK);
        this._numTF.width = 60;
        this._numTF.textAlign = egret.HorizontalAlign.CENTER;
        this._numTF.setPosition(numDescTF.x + numDescTF.width / 2 - this._numTF.width / 2, numDescTF.y + numDescTF.height + 2);
        this.addChildToContainer(this._numTF);
        //奖励宝箱
        this._boxBM = BaseBitmap.create("acwealthcomingview_box_1");
        this._boxBM.anchorOffsetX = this._boxBM.width / 2;
        this._boxBM.anchorOffsetY = this._boxBM.height;
        this._boxBM.setPosition(this._progressBar.x + this._progressBar.width + this._boxBM.width / 2 + 22, this._progressBar.y + this._progressBar.height / 2 + this._boxBM.height / 2 - 3);
        this.addChildToContainer(this._boxBM);
        this._boxBM.addTouchTap(function () {
            ViewController.getInstance().openView(ViewConst.POPUP.ACSEARCHPROOFACHIEVEMENTPOPUPVIEW, { aid: _this.aid, code: _this.code });
        }, this);
        //宝箱光 584 816  582.5 810
        this._boxLightBM = BaseBitmap.create("acwealthcomingview_box_light");
        this._boxLightBM.anchorOffsetX = this._boxLightBM.width / 2 - 1.5;
        this._boxLightBM.anchorOffsetY = this._boxLightBM.height / 2 + this._boxBM.width / 2 + 3;
        this._boxLightBM.setPosition(this._boxBM.x, this._boxBM.y);
        this.addChildToContainer(this._boxLightBM);
        this._boxLightBM.alpha = 0;
        //红点	
        this._redDot = BaseBitmap.create("public_dot2");
        this._redDot.setPosition(this._boxBM.x + this._boxBM.width / 2 - this._redDot.width / 2, this._boxBM.y - this._boxBM.height + this._redDot.height / 2);
        this.addChildToContainer(this._redDot);
        if (vo.checkAchievementRedDot()) {
            this._boxBM.setRes("acwealthcomingview_box_2");
            this._redDot.setVisible(true);
        }
        else {
            this._boxBM.setRes("acwealthcomingview_box_1");
            this._redDot.setVisible(false);
        }
        //文字
        var boxWordBM = BaseBitmap.create("luckydrawrewardword-2");
        boxWordBM.setPosition(this._boxBM.x - boxWordBM.width / 2, this._boxBM.y - boxWordBM.height / 2 - 3);
        this.addChildToContainer(boxWordBM);
        this.initBox();
    };
    /**初始化宝箱相关 */
    AcSearchProofView.prototype.initBox = function () {
        var _this = this;
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        this._boxInfoList = [];
        var procsscfg = cfg.achievementItemCfgList;
        procsscfg.sort(function (a, b) {
            return a.needNum - b.needNum;
        });
        var _loop_1 = function (i) {
            var itemCfg = procsscfg[i];
            var value = itemCfg.needNum;
            var v = procsscfg[procsscfg.length - 1].needNum;
            var p = value / v;
            var boxBM = BaseBitmap.create("acworshipview_box3");
            boxBM.anchorOffsetX = boxBM.width / 2;
            boxBM.anchorOffsetY = boxBM.height / 2;
            boxBM.setPosition(this_1._progressBar.x + this_1._progressBar.width * p, this_1._progressBar.y + this_1._progressBar.height / 2 - 7);
            this_1.addChildToContainer(boxBM);
            boxBM.addTouchTap(function () {
                ViewController.getInstance().openView(ViewConst.POPUP.ACSEARCHPROOFACHIEVEMENTPOPUPVIEW, { aid: _this.aid, code: _this.code, id: itemCfg.id });
            }, this_1);
            var isPlayAni = vo.getnum() >= value ? false : true;
            var percent = Math.round(p * 1000);
            var boxInfo = { boxBM: boxBM, isPlayAni: isPlayAni, percent: percent, itemCfg: itemCfg };
            this_1._boxInfoList.push(boxInfo);
        };
        var this_1 = this;
        for (var i = 0; i < procsscfg.length; i++) {
            _loop_1(i);
        }
        this.refreshBanger(this._startPercent);
    };
    /**刷新 宝箱 */
    AcSearchProofView.prototype.refreshBanger = function (percent) {
        var percentTmp = Math.round(percent * 1000);
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        for (var i = 0; i < this._boxInfoList.length; i++) {
            var boxInfo = this._boxInfoList[i];
            if (percentTmp >= boxInfo.percent) {
                if (vo.checkRewardFlag(Number(boxInfo.itemCfg.id))) {
                    boxInfo.boxBM.setRes("acworshipview_box3");
                }
                else {
                    boxInfo.boxBM.setRes("acworshipview_box1");
                }
                if (boxInfo.isPlayAni) {
                    boxInfo.isPlayAni = false;
                    //播放动画
                    this.playBangerAni(boxInfo.boxBM, boxInfo.boxBM.x, boxInfo.boxBM.y, this._boxBM.x, this._boxBM.y - this._boxBM.height / 2);
                }
            }
            else {
                boxInfo.boxBM.setRes("acworshipview_box2");
            }
        }
    };
    /**
    * 刷新红点相关
    */
    AcSearchProofView.prototype.refreshRedDot = function () {
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        if (this.redDotObj["skin"]) {
            if (vo.checkSkinRedDot()) {
                this.redDotObj["skin"].setVisible(true);
            }
            else {
                this.redDotObj["skin"].setVisible(false);
            }
        }
        if (this.redDotObj["charge"]) {
            if (vo.checkRechargeRedDot()) {
                this.redDotObj["charge"].setVisible(true);
            }
            else {
                this.redDotObj["charge"].setVisible(false);
            }
        }
    };
    AcSearchProofView.prototype.refreshView = function () {
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        var id = GameData.formatRewardItem(cfg.mustGet2)[0].id;
        this._proofTF.text = LanguageManager.getlocal("acSearchProoViewProof-" + this.code, [String(Api.itemVoApi.getItemNumInfoVoById(id))]);
        this._searchTF.text = LanguageManager.getlocal("acSearchProoViewSearchDesc-" + this.code, [String(vo.getItemValue())]);
        this._numTF.text = String(vo.getnum());
        var progressNumber = cfg.getMaxAchievementValue();
        if (vo.getnum() <= progressNumber) {
            this._progressTF.text = vo.getnum() + "/" + progressNumber;
        }
        else {
            this._progressTF.text = LanguageManager.getlocal("acSearchProoViewLotteryEndTip-" + this.code);
        }
        this._progressTF.x = this._progressBar.x + this._progressBar.width / 2 - this._progressTF.width / 2;
        if (vo.isFree() && (!vo.checkIsInEndShowTime())) {
            this._oneBtn.setText("acSearchProofView_Free-" + this.code);
        }
        else {
            this._oneBtn.setText("acSearchProofView_oneBtn-" + this.code);
        }
        if (!vo.checkAchievementRedDot()) {
            this._boxBM.setRes("acwealthcomingview_box_1");
            this._redDot.setVisible(false);
        }
        else {
            this._boxBM.setRes("acwealthcomingview_box_2");
            this._redDot.setVisible(true);
        }
        this.refreshRedDot();
    };
    /**一次抽奖 */
    AcSearchProofView.prototype.oneBtnClick = function () {
        var _this = this;
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        if (this._isPlay) {
            return;
        }
        if ((!vo.checkIsInEndShowTime()) && vo.isStart) {
            if (vo.isFree()) {
                this._isPlay = true;
                NetManager.request(NetRequestConst.REQUEST_ACTIVITY_SEARCHPROOF, { activeId: vo.aidAndCode, isFree: 1, isTenPlay: 0 });
            }
            else {
                var cost = vo.getItemValue();
                if (cost < 1) {
                    // App.CommonUtil.showTip(LanguageManager.getlocal("acSearchProofViewNotEnoughItem-" + this.code));
                    var msg = LanguageManager.getlocal("acSearchProofViewTipMsg-" + this.code);
                    var title = "itemUseConstPopupViewTitle";
                    ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW, {
                        msg: msg, title: title, needCancel: true, confirmTxt: "acSearchProofViewGoCharge-" + this.code, handler: this, callback: function () {
                            ViewController.getInstance().openView(ViewConst.POPUP.ACSEARCHPROOFRECHARGEPOPUPVIEW, { code: _this.code, aid: _this.aid });
                        }
                    });
                    return;
                }
                this._isPlay = true;
                NetManager.request(NetRequestConst.REQUEST_ACTIVITY_SEARCHPROOF, { activeId: vo.aidAndCode, isFree: 0, isTenPlay: 0 });
            }
        }
        else {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
    };
    /**十次抽奖 */
    AcSearchProofView.prototype.tenBtnClick = function () {
        var _this = this;
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        if (this._isPlay) {
            return;
        }
        if ((!vo.checkIsInEndShowTime()) && vo.isStart) {
            var cost = vo.getItemValue();
            if (cost < 10) {
                // App.CommonUtil.showTip(LanguageManager.getlocal("acSearchProofViewNotEnoughItem-" + this.code));
                var msg = LanguageManager.getlocal("acSearchProofViewTipMsg-" + this.code);
                var title = "itemUseConstPopupViewTitle";
                ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW, {
                    msg: msg, title: title, needCancel: true, confirmTxt: "acSearchProofViewGoCharge-" + this.code, handler: this, callback: function () {
                        ViewController.getInstance().openView(ViewConst.POPUP.ACSEARCHPROOFRECHARGEPOPUPVIEW, { code: _this.code, aid: _this.aid });
                    }
                });
                return;
            }
            this._isPlay = true;
            NetManager.request(NetRequestConst.REQUEST_ACTIVITY_SEARCHPROOF, { activeId: vo.aidAndCode, isFree: 0, isTenPlay: 1 });
        }
        else {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
    };
    AcSearchProofView.prototype.onNPCTouchHandler = function (e) {
        if (this._isPlay) {
            return;
        }
        if (e.type != egret.TouchEvent.TOUCH_BEGIN && e.type != egret.TouchEvent.TOUCH_CANCEL && e.type != egret.TouchEvent.TOUCH_END) {
            return;
        }
        if (e.type == egret.TouchEvent.TOUCH_BEGIN) {
            if (e.currentTarget.alpha != 1) {
                e.currentTarget.alpha = 0.3;
            }
        }
        else if (e.type == egret.TouchEvent.TOUCH_CANCEL) {
            if (e.currentTarget.alpha != 1) {
                e.currentTarget.alpha = 0;
            }
        }
        if (e.type == egret.TouchEvent.TOUCH_END) {
            if (e.currentTarget.alpha != 1) {
                e.currentTarget.alpha = 0;
            }
            var viewName = e.currentTarget.name;
            switch (viewName) {
                case "charge":
                    ViewController.getInstance().openView(ViewConst.POPUP.ACSEARCHPROOFRECHARGEPOPUPVIEW, { code: this.code, aid: this.aid });
                    break;
                case "skin":
                    ViewController.getInstance().openView(ViewConst.POPUP.ACSEARCHPROOFSKINPOPUPVIEW, { code: this.code, aid: this.aid });
                    break;
                case "rewardsPool":
                    ViewController.getInstance().openView(ViewConst.POPUP.ACSEARCHPROOFREWARDSPOOLPOPUPVIEW, { code: this.code, aid: this.aid });
                    break;
            }
        }
    };
    AcSearchProofView.prototype.tick = function () {
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        if (vo.checkIsInEndShowTime()) {
            this._countDownTime.text = LanguageManager.getlocal("acPunishEnd");
        }
        else {
            this._countDownTime.text = LanguageManager.getlocal("acSearchProofView_acCountTime-" + this.code, [vo.acCountDown]);
        }
        this._countDownTimeBg.width = 60 + this._countDownTime.width;
        this._countDownTimeBg.x = GameConfig.stageWidth - this._countDownTimeBg.width - 15;
        this._countDownTime.setPosition(this._countDownTimeBg.x + this._countDownTimeBg.width / 2 - this._countDownTime.width / 2, this._countDownTimeBg.y + this._countDownTimeBg.height / 2 - this._countDownTime.height / 2);
    };
    AcSearchProofView.prototype.worshipRewardsHandle = function (event) {
        var _this = this;
        if (event.data.ret) {
            this._handlerData = event.data.data.data;
            this._hammerEffect.setVisible(true);
            var posCfg = this.getPosCfg()[Math.round(Math.random() * this.getPosCfg().length)];
            if (!posCfg) {
                posCfg = this.getPosCfg()[0];
            }
            this._hammerEffect.setPosition(this._bg.x + posCfg.x, this._bg.y + posCfg.y);
            this._hammerEffect.playWithTime(1);
            this._hammerEffect.setEndCallBack(function () {
                _this._hammerEffect.setVisible(false);
                ViewController.getInstance().openView(ViewConst.POPUP.ACWORSHIPGETREWARDPOPUPVIEW, {
                    rewards: _this._handlerData.rewards, otherRewards: _this._handlerData.otherrewards, criArr: _this._handlerData.criArr, code: _this.code, aid: _this.aid, isPlayAni: true, callback: function () {
                        var vo = Api.acVoApi.getActivityVoByAidAndCode(_this.aid, _this.code);
                        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(_this.aid, _this.code);
                        _this._isPlay = false;
                        if (_this._startPercent < 1) {
                            var endPercent = vo.getnum() / cfg.getMaxAchievementValue();
                            _this.playProgressBarAni(_this._startPercent, endPercent, 0.005);
                        }
                        var rewardsVo = GameData.formatRewardItem(_this._handlerData.rewards);
                        var itemRewardVo = GameData.formatRewardItem(cfg.mustGet2)[0];
                        var randomType = 0;
                        for (var i = 0; i < rewardsVo.length; i++) {
                            if (rewardsVo[0].id == itemRewardVo.id) {
                                randomType = App.MathUtil.getRandom(4, 7);
                                ViewController.getInstance().openView(ViewConst.BASE.ROOKIEVIEW, { idx: "acSearchProof_1_" + randomType + "-" + _this.getSearchProofRookCode() });
                                return;
                            }
                        }
                        randomType = App.MathUtil.getRandom(1, 4);
                        ViewController.getInstance().openView(ViewConst.BASE.ROOKIEVIEW, { idx: "acSearchProof_1_" + randomType + "-" + _this.getSearchProofRookCode() });
                    }, handler: _this
                });
            }, this);
        }
    };
    /**
 * 进度条的动画
 */
    AcSearchProofView.prototype.playProgressBarAni = function (startPercent, endPercent, speed) {
        var _this = this;
        //每次初始化
        this._progressBar.setPercentage(startPercent);
        egret.Tween.removeTweens(this._progressBar);
        var posWidthValue = this._startPercent >= 1 ? 1 : this._startPercent;
        this._progressBM.setPosition(this._progressBar.x + this._progressBar.width * posWidthValue, this._progressBar.y);
        this._progressLight.setPosition(this._progressBar.x + this._progressBar.width * posWidthValue, this._progressBar.y + this._progressBar.height / 2);
        var startTemp = Math.round(startPercent * 1000);
        var endTemp = Math.round(endPercent * 1000);
        var maxTemp = Math.round(1 * 1000);
        var everyTimeValue = speed;
        egret.Tween.get(this._progressBar, { loop: true }).wait(0.1).call(function () {
            _this._progressLight.setVisible(true);
            //增量动画
            startPercent += everyTimeValue;
            // this.refreshBanger(startPercent);
            startTemp = Math.round(startPercent * 1000);
            if (startTemp > endTemp) {
                egret.Tween.removeTweens(_this._progressBar);
                _this._progressLight.setVisible(false);
                if (startTemp > maxTemp) {
                    egret.Tween.removeTweens(_this._progressBar);
                    _this._progressLight.setVisible(false);
                    return;
                }
                else {
                    _this._isPlay = false;
                }
                return;
            }
            _this.refreshBanger(startPercent);
            _this._progressBar.setPercentage(startPercent);
            var posWidthValue = _this._startPercent >= 1 ? 1 : _this._startPercent;
            _this._progressBM.setPosition(_this._progressBar.x + _this._progressBar.width * posWidthValue, _this._progressBar.y);
            _this._progressLight.setPosition(_this._progressBar.x + _this._progressBar.width * posWidthValue, _this._progressBar.y + _this._progressBar.height / 2);
            _this._startPercent = startPercent;
        }, this);
    };
    /**鞭炮的动画 */
    AcSearchProofView.prototype.playBangerAni = function (bangerBM, startPosX, startPosY, endPosX, endPosY) {
        var _this = this;
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        // bangerBM.setVisible(false);
        var boomEffect = ComponentManager.getCustomMovieClip("boxboomeffect", 8, 70);
        var boom = BaseBitmap.create("boxboomeffect1");
        boomEffect.setScale(1.25);
        boom.setScale(1.25);
        boomEffect.setPosition(startPosX - boom.width * 1.25 / 2, startPosY - boom.height * 1.25 / 2);
        this.addChildToContainer(boomEffect);
        boomEffect.playWithTime(1);
        boomEffect.setEndCallBack(function () {
            _this.container.removeChild(boomEffect);
            boomEffect.dispose();
            var lightBall = BaseBitmap.create("acwealthcomingview_lightball");
            lightBall.anchorOffsetX = lightBall.width / 2;
            lightBall.anchorOffsetY = lightBall.height / 2;
            //oneone模式
            lightBall.blendMode = egret.BlendMode.ADD;
            _this.addChildToContainer(lightBall);
            lightBall.alpha = 0;
            lightBall.setPosition(startPosX, startPosY);
            lightBall.alpha = 1;
            lightBall.setScale(0.1);
            lightBall.rotation = 0;
            var distanceX = endPosX - startPosX;
            var distanceY = endPosY - startPosY;
            egret.Tween.get(lightBall).to({
                rotation: 360 * 0.14,
                scaleX: 0.8,
                scaleY: 0.8,
                x: startPosX + distanceX * 0.3,
                y: startPosY + distanceY * 0.3
            }, 140).to({
                rotation: 360 * 0.54,
                scaleX: 1,
                scaleY: 1,
                x: startPosX + distanceX * 1,
                y: startPosY + distanceY * 1
            }, 400).call(function () {
                if (vo.checkAchievementRedDot()) {
                    _this._boxBM.setRes("acwealthcomingview_box_2");
                }
                else {
                    _this._boxBM.setRes("acwealthcomingview_box_1");
                }
                _this._redDot.setVisible(false);
                _this._boxBM.setScale(1.1);
                _this._boxLightBM.setScale(1.1);
                _this._boxLightBM.alpha = 1;
                egret.Tween.get(_this._boxBM).to({
                    scaleX: 1,
                    scaleY: 1,
                }, 750).call(function () {
                    if (vo.checkAchievementRedDot()) {
                        _this._redDot.setVisible(true);
                    }
                    else {
                        _this._redDot.setVisible(false);
                    }
                    // egret.Tween.removeTweens(this._boxBM);
                    bangerBM.setVisible(true);
                }, _this);
                egret.Tween.get(_this._boxLightBM).to({
                    scaleX: 1,
                    scaleY: 1,
                    alpha: 0,
                }, 750).call(function () {
                    // egret.Tween.removeTweens(this._boxLightBM);
                }, _this);
            }, _this).to({
                scaleX: 1.3,
                scaleY: 1,
                rotation: 360 * 1,
                alpha: 0,
            }, 460).call(function () {
                egret.Tween.removeTweens(lightBall);
                _this.container.removeChild(lightBall);
                lightBall.dispose();
            }, _this);
        }, this);
    };
    AcSearchProofView.prototype.getRuleInfo = function () {
        return "acSearchProofRuleInfo-" + this.code;
    };
    AcSearchProofView.prototype.getBgName = function () {
        return null;
    };
    AcSearchProofView.prototype.getTitleBgName = function () {
        return null;
    };
    AcSearchProofView.prototype.getTitleStr = function () {
        return null;
    };
    AcSearchProofView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "acwealthcarpview_skineffect", "acsearchproofview_common_skintxt", "acarcadeview-" + this.getUiCode(),
            "acwealthcomingview_numbg", "progress12", "progress12_bg", "acwealthcomingview_progresslight", "acworshipview_slider",
            "luckdrawprogressbg-1", "acwealthcomingview_box_light", "acwealthcomingview_box_1", "acwealthcomingview_box_2", "luckydrawrewardword-2",
            "acworshipview_box3", "acworshipview_box2", "acworshipview_box1", "boxboomeffect", "acsearchproofvieweffect_search", "acsearchproofview_common_dark", "acsearchproofview_common_yellow",
            "acsearchproofvieweffect_charge"
        ]);
    };
    AcSearchProofView.prototype.getUiCode = function () {
        if (this.code == "2") {
            return "1";
        }
        return _super.prototype.getUiCode.call(this);
    };
    AcSearchProofView.prototype.getSearchProofRookCode = function () {
        if (this.code == "2") {
            return "1";
        }
        else if (this.code == "4") {
            return "3";
        }
        else if (this.code == "6") {
            return "5";
        }
        else if (this.code == "8") {
            return "7";
        }
        return _super.prototype.getUiCode.call(this);
    };
    AcSearchProofView.prototype.getProbablyInfo = function () {
        return "";
    };
    AcSearchProofView.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_SEARCHPROOF, this.worshipRewardsHandle, this);
        this._countDownTime = null;
        this._countDownTimeBg = null;
        this.bubbleTip = null;
        this.redDotObj = {};
        this.brandObj = {};
        this._bg = null;
        this._isPlay = false;
        this._oneBtn = null;
        this._progressBar = null;
        this._startPercent = 0;
        this._progressBM = null;
        this._progressLight = null;
        this._numTF = null;
        this._boxBM = null;
        this._boxLightBM = null;
        this._redDot = null;
        this._progressTF = null;
        this._boxInfoList = [];
        _super.prototype.dispose.call(this);
    };
    return AcSearchProofView;
}(AcCommonView));
__reflect(AcSearchProofView.prototype, "AcSearchProofView");
//# sourceMappingURL=AcSearchProofView.js.map