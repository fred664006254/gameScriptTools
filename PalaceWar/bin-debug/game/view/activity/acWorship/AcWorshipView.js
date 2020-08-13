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
  * 筑阁祭天活动view
  * @author 张朝阳
  * date 2019/5/22
  * @class AcWorshipView
  */
var AcWorshipView = (function (_super) {
    __extends(AcWorshipView, _super);
    function AcWorshipView() {
        var _this = _super.call(this) || this;
        _this._oneNeedNumTF = null;
        _this._progressBar = null;
        _this._startPercent = 0;
        _this._progressBM = null;
        _this._progressLight = null;
        _this._numTF = null;
        _this._boxBM = null;
        _this._boxLightBM = null;
        _this._redDot = null;
        _this._countDownTime = null;
        _this._countDownTimeBg = null;
        _this._chargeBtn = null;
        _this._hammerEffect = null;
        _this._boxInfoList = [];
        _this._speakStr = null;
        _this._speakTF = null;
        _this._speakTail = null;
        _this._speakBg = null;
        _this._messageLength = 0;
        _this._progressTF = null;
        _this._isPlay = false;
        _this._handlerData = null;
        _this._bulding1 = null;
        _this._bulding2 = null;
        _this._bulding3 = null;
        _this._worker1 = null;
        _this._worker2 = null;
        _this._isPlayClip = false;
        _this._isPlayLiHua = false;
        _this._depth = 0;
        _this._lihuaCfg = {
            1: { color: 'hong', pos: [26, 323], scale: 1.6, wait: 0 },
            2: { color: 'huang', pos: [266, 260], scale: 1.5, wait: 200 },
            3: { color: 'lan', pos: [26, 462], scale: 1.3, wait: 400 },
            4: { color: 'lan', pos: [376, 326], scale: 1.4, wait: 650 },
            5: { color: 'hong', pos: [150, 366], scale: 1, wait: 900 },
            6: { color: 'huang', pos: [480, 382], scale: 1.7, wait: 1100 },
            7: { color: 'hong', pos: [98, 524], scale: 1.85, wait: 1300 },
            8: { color: 'huang', pos: [282, 466], scale: 1.5, wait: 1500 },
            9: { color: 'lan', pos: [450, 528], scale: 1.6, wait: 1700 },
            10: { color: 'hong', pos: [338, 672], scale: 1.4, wait: 1900 },
            11: { color: 'huang', pos: [100, 716], scale: 1.5, wait: 2100 },
        };
        return _this;
    }
    AcWorshipView.prototype.initView = function () {
        var _this = this;
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY_GETWORSHIPREWARDS, this.worshipRewardsHandle, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY_GETWORSHIPACHIEVEMENT, this.achievementHandle, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY_GETWORSHIPREWARDS, this.refreshView, this);
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        this._startPercent = vo.getItemValue() / cfg.getMaxAchievementValue();
        var bg = BaseLoadBitmap.create("acworshipview_bg-" + this.getUiCode());
        bg.width = 640;
        bg.height = 1136;
        bg.setPosition(0, GameConfig.stageHeigth - bg.height);
        this.addChildToContainer(bg);
        this._depth = this.container.getChildIndex(bg);
        this._bulding1 = BaseLoadBitmap.create("acworshipview_building1-" + this.getUiCode());
        this._bulding1.width = 636;
        this._bulding1.height = 344;
        this._bulding1.setPosition(bg.x + 18, bg.y + 753);
        this.addChildToContainer(this._bulding1);
        this._bulding2 = BaseLoadBitmap.create("acworshipview_building2-" + this.getUiCode());
        this._bulding2.width = 584;
        this._bulding2.height = 333;
        this._bulding2.setPosition(bg.x + 44, bg.y + 592);
        this.addChildToContainer(this._bulding2);
        this._bulding3 = BaseLoadBitmap.create("acworshipview_building3-" + this.getUiCode());
        this._bulding3.width = 594;
        this._bulding3.height = 294;
        this._bulding3.setPosition(bg.x + 44, bg.y + 375);
        this.addChildToContainer(this._bulding3);
        this._worker1 = ComponentManager.getCustomMovieClip("alliancetask_frame3", 6, 300);
        this._worker1.setPosition(bg.x + 92, bg.y + 810);
        this.addChildToContainer(this._worker1);
        this._worker1.playWithTime(-1);
        this._worker2 = ComponentManager.getCustomMovieClip("alliancetask_frame3", 6, 300);
        this._worker2.setPosition(bg.x + 334, bg.y + 668);
        this.addChildToContainer(this._worker2);
        this._worker2.playWithTime(-1);
        var titleBg = BaseLoadBitmap.create("acworshipview_titlebg-" + this.getUiCode());
        titleBg.width = 640;
        titleBg.height = 92;
        titleBg.setPosition(0, 0);
        var acDescBg = BaseLoadBitmap.create("acworshipview_common_acbg");
        acDescBg.width = 640;
        acDescBg.height = 130;
        acDescBg.setPosition(titleBg.x, titleBg.y + titleBg.height - 7);
        this.addChildToContainer(acDescBg);
        this.addChildToContainer(titleBg);
        var skinPreviewBtn = ComponentManager.getButton("acworshipview_rewardbtn-" + this.getUiCode(), null, this.skinPreviewBtnClick, this);
        skinPreviewBtn.setPosition(acDescBg.x + 8, acDescBg.y + acDescBg.height / 2 - skinPreviewBtn.height / 2);
        this.addChildToContainer(skinPreviewBtn);
        //活动时间
        var timeTF = ComponentManager.getTextField(LanguageManager.getlocal("acWorshipViewAcTime-" + this.code, [vo.acTimeAndHour]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        timeTF.width = 540;
        timeTF.setPosition(skinPreviewBtn.x + skinPreviewBtn.width + 6, acDescBg.y + 15);
        this.addChildToContainer(timeTF);
        var descTF = ComponentManager.getTextField(LanguageManager.getlocal("acWorshipViewDesc-" + this.code), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        descTF.width = 540;
        descTF.lineSpacing = 5;
        descTF.setPosition(timeTF.x, timeTF.y + timeTF.height + 10);
        this.addChildToContainer(descTF);
        this._countDownTimeBg = BaseBitmap.create("public_9_bg61");
        this._countDownTimeBg.y = acDescBg.y + acDescBg.height - this._countDownTimeBg.height / 2;
        this.addChildToContainer(this._countDownTimeBg);
        this._countDownTime = ComponentManager.getTextField(LanguageManager.getlocal("acWorshipViewCountDownTime-" + this.code, [vo.acCountDown]), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_WHITE);
        this._countDownTimeBg.width = 60 + this._countDownTime.width;
        this._countDownTimeBg.x = GameConfig.stageWidth - this._countDownTimeBg.width - 15;
        this._countDownTime.setPosition(this._countDownTimeBg.x + this._countDownTimeBg.width / 2 - this._countDownTime.width / 2, this._countDownTimeBg.y + this._countDownTimeBg.height / 2 - this._countDownTime.height / 2);
        this.addChildToContainer(this._countDownTime);
        this._chargeBtn = ComponentManager.getButton("acworshipview_common_chargebtn", null, function () {
            if (_this._isPlay) {
                return;
            }
            ViewController.getInstance().openView(ViewConst.POPUP.ACWORSHIPCHARGEPOPUPVIEW, { aid: _this.aid, code: _this.code });
        }, this);
        this._chargeBtn.setPosition(acDescBg.x + 15, acDescBg.y + acDescBg.height + 22);
        this.addChildToContainer(this._chargeBtn);
        var rewardbtn = ComponentManager.getButton("acworshipview_rewardbtn", null, function () {
            if (_this._isPlay) {
                return;
            }
            ViewController.getInstance().openView(ViewConst.POPUP.ACWORSHIPREWARDPOPUPVIEW, { aid: _this.aid, code: _this.code });
        }, this);
        rewardbtn.setPosition(this._chargeBtn.x, this._chargeBtn.y + this._chargeBtn.height + 15);
        this.addChildToContainer(rewardbtn);
        this._hammerEffect = ComponentManager.getCustomMovieClip("acworshipeffect_hammer", 5, 200);
        var hammerEffectBM = BaseBitmap.create("acworshipeffect_hammer1");
        this._hammerEffect.setPosition(GameConfig.stageWidth / 2 - hammerEffectBM.width / 2, GameConfig.stageHeigth / 2 - hammerEffectBM.height / 2);
        this.addChild(this._hammerEffect);
        this._hammerEffect.setVisible(false);
        this.initButtom();
        this.refreshView();
        this.refreshBulding();
        this.tick();
    };
    AcWorshipView.prototype.initButtom = function () {
        var _this = this;
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        var itemRewardVo = GameData.formatRewardItem(cfg.freeGet)[0];
        var buttombg = BaseLoadBitmap.create("arena_bottom");
        buttombg.width = 640;
        buttombg.height = 140;
        buttombg.setPosition(0, GameConfig.stageHeigth - buttombg.height);
        this.addChildToContainer(buttombg);
        //一次相关
        //按钮
        var oneBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "", this.oneBtnClick, this);
        oneBtn.setPosition(85, buttombg.y + buttombg.height - oneBtn.height - 60);
        this.addChildToContainer(oneBtn);
        //按钮icon
        var oneBtnIcon = BaseLoadBitmap.create("itemicon" + itemRewardVo.id);
        oneBtnIcon.width = 35;
        oneBtnIcon.height = 35;
        oneBtnIcon.setPosition(oneBtn.x + oneBtn.width / 2 - oneBtnIcon.width / 2 + 5, oneBtn.y + oneBtn.height / 2 - oneBtnIcon.height / 2);
        this.addChildToContainer(oneBtnIcon);
        //按钮文字
        var oneBtnIconTF = ComponentManager.getTextField(LanguageManager.getlocal("acWorshipViewBuyBtn-" + this.code), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
        oneBtnIconTF.setPosition(oneBtnIcon.x - oneBtnIconTF.width, oneBtnIcon.y + oneBtnIcon.height / 2 - oneBtnIconTF.height / 2);
        this.addChildToContainer(oneBtnIconTF);
        //按钮次数
        var oneBtnIconNum = ComponentManager.getTextField("X1", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
        oneBtnIconNum.setPosition(oneBtnIcon.x + oneBtnIcon.width, oneBtnIcon.y + oneBtnIcon.height / 2 - oneBtnIconNum.height / 2);
        this.addChildToContainer(oneBtnIconNum);
        //元宝
        var oneGemBM = BaseBitmap.create("public_icon1");
        oneGemBM.width = 42;
        oneGemBM.height = 42;
        oneGemBM.setPosition(oneBtn.x + oneBtn.width / 2 - oneGemBM.width - 8, oneBtn.y + oneBtn.height - 3 + 10);
        this.addChildToContainer(oneGemBM);
        //需要元宝数量
        this._oneNeedNumTF = ComponentManager.getTextField(String(cfg.gemCost), TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._oneNeedNumTF.setPosition(oneGemBM.x + oneGemBM.width, oneGemBM.y + oneGemBM.height / 2 - this._oneNeedNumTF.height / 2 - 2);
        this.addChildToContainer(this._oneNeedNumTF);
        //十次相关
        //按钮
        var tenBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "", this.tenBtnClick, this);
        tenBtn.setPosition(buttombg.x + buttombg.width - tenBtn.width - 90, buttombg.y + buttombg.height - tenBtn.height - 60);
        this.addChildToContainer(tenBtn);
        //按钮图片
        var tenBtnIcon = BaseLoadBitmap.create("itemicon" + itemRewardVo.id);
        tenBtnIcon.width = 35;
        tenBtnIcon.height = 35;
        tenBtnIcon.setPosition(tenBtn.x + tenBtn.width / 2 - tenBtnIcon.width / 2 + 5, tenBtn.y + tenBtn.height / 2 - tenBtnIcon.height / 2);
        this.addChildToContainer(tenBtnIcon);
        //按钮文字
        var tenBtnIconTF = ComponentManager.getTextField(LanguageManager.getlocal("acWorshipViewBuyBtn-" + this.code), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
        tenBtnIconTF.setPosition(tenBtnIcon.x - tenBtnIconTF.width, tenBtnIcon.y + tenBtnIcon.height / 2 - tenBtnIconTF.height / 2);
        this.addChildToContainer(tenBtnIconTF);
        //按钮次数
        var tenBtnIconNum = ComponentManager.getTextField("X10", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
        tenBtnIconNum.setPosition(tenBtnIcon.x + tenBtnIcon.width, tenBtnIcon.y + tenBtnIcon.height / 2 - tenBtnIconNum.height / 2);
        this.addChildToContainer(tenBtnIconNum);
        //元宝
        var tenGemBM = BaseBitmap.create("public_icon1");
        tenGemBM.width = 42;
        tenGemBM.height = 42;
        tenGemBM.setPosition(tenBtn.x + tenBtn.width / 2 - tenGemBM.width - 8, tenBtn.y + tenBtn.height - 3 + 10);
        this.addChildToContainer(tenGemBM);
        //需要元宝数量
        var tenNeedGemTF = ComponentManager.getTextField(String(Math.round(cfg.gemCost * 10 * cfg.discount)), TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        tenNeedGemTF.setPosition(tenGemBM.x + tenGemBM.width, tenGemBM.y + tenGemBM.height / 2 - tenNeedGemTF.height / 2 - 2);
        this.addChildToContainer(tenNeedGemTF);
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
        this._progressTF = ComponentManager.getTextField(vo.getItemValue() + "/" + progressNumber, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
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
        var numDescTF = ComponentManager.getTextField(LanguageManager.getlocal("acWorshipViewNumDesc-" + this.code), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_BLACK);
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
            ViewController.getInstance().openView(ViewConst.POPUP.ACWORSHIPACHIEVEMENTPOPUPVIEW, { aid: _this.aid, code: _this.code });
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
        var boxWordBM = BaseBitmap.create("acworshipview_word");
        boxWordBM.setPosition(this._boxBM.x - boxWordBM.width / 2, this._boxBM.y - boxWordBM.height / 2 - 3);
        this.addChildToContainer(boxWordBM);
        this.initBox();
    };
    /**初始化宝箱相关 */
    AcWorshipView.prototype.initBox = function () {
        var _this = this;
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        this._boxInfoList = [];
        var procsscfg = cfg.worshipAchievementItemCfgList;
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
                ViewController.getInstance().openView(ViewConst.POPUP.ACWORSHIPACHIEVEMENTPOPUPVIEW, { aid: _this.aid, code: _this.code, id: itemCfg.id });
            }, this_1);
            var isPlayAni = vo.getItemValue() >= value ? false : true;
            var percent = Math.round(p * 1000);
            var boxInfo = { boxBM: boxBM, isPlayAni: isPlayAni, percent: percent, itemCfg: itemCfg };
            this_1._boxInfoList.push(boxInfo);
            if (procsscfg.length - 1 == i) {
                this_1._speakStr = LanguageManager.getlocal("acWorshipViewSpeakTip-" + this_1.code);
                this_1._speakTF = ComponentManager.getTextField(this_1._speakStr, TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_BLACK);
                this_1._speakTail = BaseBitmap.create("public_9_bg25_tail");
                this_1._speakBg = BaseBitmap.create("public_9_bg25");
                this_1._speakBg.width = this_1._speakTF.width + 40;
                var posX = boxBM.x;
                if (posX + this_1._speakBg.width + 5 > GameConfig.stageWidth) {
                    posX = GameConfig.stageWidth - this_1._speakBg.width - 15;
                }
                this_1._speakBg.setPosition(posX, boxBM.y - boxBM.height / 2 - this_1._speakBg.height - this_1._speakTail.height + 5);
                this_1.addChildToContainer(this_1._speakBg);
                this_1._speakTF.setPosition(this_1._speakBg.x + this_1._speakBg.width / 2 - this_1._speakTF.width / 2, this_1._speakBg.y + this_1._speakBg.height / 2 - this_1._speakTF.height / 2);
                this_1.addChildToContainer(this_1._speakTF);
                this_1._speakTail.skewY = 180;
                this_1._speakTail.setPosition(boxBM.x, boxBM.y - boxBM.height / 2 - this_1._speakTail.height);
                this_1.addChildToContainer(this_1._speakTail);
                egret.Tween.get(this_1._speakBg, { loop: true }).call(function () {
                    _this._speakTF.text = "";
                    _this._speakTail.setVisible(true);
                    _this._speakTF.setVisible(true);
                    _this._speakBg.setVisible(true);
                    _this._messageLength = 0;
                    egret.Tween.get(_this._speakTF, { loop: true }).wait(75).call(function () {
                        _this._speakTF.text = _this._speakStr.substr(0, _this._messageLength);
                        _this._messageLength++;
                    }, _this);
                }, this_1).wait(this_1._speakStr.length * 75 + 3000).call(function () {
                    _this._speakTail.setVisible(false);
                    _this._speakTF.setVisible(false);
                    _this._speakBg.setVisible(false);
                    _this._messageLength = 0;
                    egret.Tween.removeTweens(_this._speakTF);
                }, this_1).wait(10000);
            }
        };
        var this_1 = this;
        for (var i = 0; i < procsscfg.length; i++) {
            _loop_1(i);
        }
        this.refreshBanger(this._startPercent);
    };
    /**刷新 宝箱 */
    AcWorshipView.prototype.refreshBanger = function (percent) {
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
            if (this._boxInfoList.length - 1 == i) {
                if (vo.checkRewardFlag(Number(boxInfo.itemCfg.id))) {
                    this._speakTail.alpha = 0;
                    this._speakTF.alpha = 0;
                    this._speakBg.alpha = 0;
                }
            }
        }
    };
    /**刷新ui */
    AcWorshipView.prototype.refreshView = function () {
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        this._numTF.text = String(vo.getItemValue());
        var progressNumber = cfg.getMaxAchievementValue();
        if (vo.getItemValue() <= progressNumber) {
            this._progressTF.text = vo.getItemValue() + "/" + progressNumber;
        }
        else {
            this._progressTF.text = LanguageManager.getlocal("acWorshipViewLotteryEndTip-" + this.code);
        }
        this._progressTF.x = this._progressBar.x + this._progressBar.width / 2 - this._progressTF.width / 2;
        if (vo.isFree() && (!vo.checkIsInEndShowTime())) {
            this._oneNeedNumTF.text = LanguageManager.getlocal("acWorshipViewFree-" + this.code);
        }
        else {
            this._oneNeedNumTF.text = String(cfg.gemCost);
        }
        if (!vo.checkAchievementRedDot()) {
            this._boxBM.setRes("acwealthcomingview_box_1");
            this._redDot.setVisible(false);
        }
        if (vo.checkRechargeRedDot()) {
            App.CommonUtil.addIconToBDOC(this._chargeBtn);
        }
        else {
            App.CommonUtil.removeIconFromBDOC(this._chargeBtn);
        }
    };
    AcWorshipView.prototype.refreshBulding = function () {
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        if (vo.getItemValue() < 33) {
            this._bulding1.setVisible(true);
            this._bulding2.setVisible(true);
            this._bulding3.setVisible(true);
            this._worker1.setVisible(true);
            this._worker2.setVisible(true);
        }
        else if (vo.getItemValue() < 66) {
            this._bulding1.setVisible(true);
            this._bulding2.setVisible(true);
            this._bulding3.setVisible(false);
            this._worker1.setVisible(true);
            this._worker2.setVisible(true);
        }
        else if (vo.getItemValue() < 99) {
            this._bulding1.setVisible(true);
            this._bulding2.setVisible(false);
            this._bulding3.setVisible(false);
            this._worker1.setVisible(true);
            this._worker2.setVisible(false);
        }
        else {
            this._bulding1.setVisible(false);
            this._bulding2.setVisible(false);
            this._bulding3.setVisible(false);
            this._worker1.setVisible(false);
            this._worker2.setVisible(false);
        }
        if (vo.getItemValue() >= cfg.getMaxAchievementValue() && this._isPlayLiHua == false) {
            this._isPlayLiHua = true;
            this.showLihua();
        }
    };
    /**tick */
    AcWorshipView.prototype.tick = function () {
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        if (vo.checkIsInEndShowTime()) {
            this._countDownTime.text = LanguageManager.getlocal("acPunishEnd");
        }
        else {
            this._countDownTime.text = LanguageManager.getlocal("acWorshipViewCountDownTime-" + this.code, [vo.acCountDown]);
        }
        this._countDownTimeBg.width = 60 + this._countDownTime.width;
        this._countDownTimeBg.x = GameConfig.stageWidth - this._countDownTimeBg.width - 15;
        this._countDownTime.setPosition(this._countDownTimeBg.x + this._countDownTimeBg.width / 2 - this._countDownTime.width / 2, this._countDownTimeBg.y + this._countDownTimeBg.height / 2 - this._countDownTime.height / 2);
    };
    /**一次抽奖 */
    AcWorshipView.prototype.oneBtnClick = function () {
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        if (this._isPlay) {
            return;
        }
        if ((!vo.checkIsInEndShowTime()) && vo.isStart) {
            if (vo.isFree()) {
                this._isPlay = true;
                NetManager.request(NetRequestConst.REQUEST_ACTIVITY_GETWORSHIPREWARDS, { activeId: vo.aidAndCode, isFree: 1, isTenPlay: 0 });
            }
            else {
                var cost = cfg.gemCost;
                if (Api.playerVoApi.getPlayerGem() < cost) {
                    App.CommonUtil.showTip(LanguageManager.getlocal("gemNotEnough"));
                    return;
                }
                this._isPlay = true;
                NetManager.request(NetRequestConst.REQUEST_ACTIVITY_GETWORSHIPREWARDS, { activeId: vo.aidAndCode, isFree: 0, isTenPlay: 0 });
            }
        }
        else {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
    };
    /**十次抽奖 */
    AcWorshipView.prototype.tenBtnClick = function () {
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        if (this._isPlay) {
            return;
        }
        if ((!vo.checkIsInEndShowTime()) && vo.isStart) {
            var cost = Math.round(cfg.gemCost * 10 * cfg.discount);
            if (Api.playerVoApi.getPlayerGem() < cost) {
                App.CommonUtil.showTip(LanguageManager.getlocal("gemNotEnough"));
                return;
            }
            this._isPlay = true;
            NetManager.request(NetRequestConst.REQUEST_ACTIVITY_GETWORSHIPREWARDS, { activeId: vo.aidAndCode, isFree: 0, isTenPlay: 1 });
        }
        else {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
    };
    /**皮肤奖励 */
    AcWorshipView.prototype.skinPreviewBtnClick = function () {
        // ViewController.getInstance().openView(ViewConst.POPUP.ACWORSHIPSKINREWARDPOPUPVIEW, { aid: this.aid, code: this.code });
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        var topMsg = LanguageManager.getlocal("acWorshipreporTopMsg");
        ViewController.getInstance().openView(ViewConst.POPUP.ACCOMMONTITLEREWARDPOPUPVIEW, { titleIds: [cfg.show[0]], bgType: 3, topMsg: topMsg });
    };
    /**抽奖回调 */
    AcWorshipView.prototype.worshipRewardsHandle = function (event) {
        var _this = this;
        if (event.data.ret) {
            this._handlerData = event.data.data.data;
            this._hammerEffect.setVisible(true);
            this._hammerEffect.playWithTime(1);
            this._hammerEffect.setEndCallBack(function () {
                _this._hammerEffect.setVisible(false);
                ViewController.getInstance().openView(ViewConst.POPUP.ACWORSHIPGETREWARDPOPUPVIEW, {
                    rewards: _this._handlerData.rewards, otherRewards: _this._handlerData.otherrewards, criArr: _this._handlerData.criArr, code: _this.code, aid: _this.aid, isPlayAni: true, callback: function () {
                        var vo = Api.acVoApi.getActivityVoByAidAndCode(_this.aid, _this.code);
                        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(_this.aid, _this.code);
                        _this._isPlay = false;
                        _this.refreshBulding();
                        if (_this._startPercent < 1) {
                            var endPercent = vo.getItemValue() / cfg.getMaxAchievementValue();
                            _this.playProgressBarAni(_this._startPercent, endPercent, 0.005);
                        }
                    }, handler: _this
                });
            }, this);
        }
    };
    AcWorshipView.prototype.achievementHandle = function (event) {
        this.refreshBanger(this._startPercent);
    };
    /**
     * 进度条的动画
     */
    AcWorshipView.prototype.playProgressBarAni = function (startPercent, endPercent, speed) {
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
    AcWorshipView.prototype.playBangerAni = function (bangerBM, startPosX, startPosY, endPosX, endPosY) {
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
    AcWorshipView.prototype.showLihua = function () {
        var _this = this;
        var index = Math.floor(Math.random() * 11);
        var item = this._lihuaCfg[index];
        if (item) {
            var lihuaclip_1 = ComponentManager.getCustomMovieClip("lihua_" + item.color + "000", 9, 115);
            lihuaclip_1.setScale(item.scale);
            lihuaclip_1.x = item.pos[0];
            lihuaclip_1.y = GameConfig.stageHeigth - 1136 + item.pos[1];
            this.container.addChildAt(lihuaclip_1, this._depth + 1);
            lihuaclip_1.playWithTime(1);
            lihuaclip_1.setEndCallBack(function () {
                _this.showLihua();
                _this.container.removeChild(lihuaclip_1);
            }, this);
        }
        else {
            this.showLihua();
        }
    };
    AcWorshipView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "acworshipview-" + this.getUiCode(), "progress12", "progress12_bg", "acworshipview_slider", "acwealthcomingview_progresslight", "acwealthcomingview_numbg", "acworshipview_box1", "acworshipview_box2",
            "acworshipview_box3", "acworshipview_word", "acwealthcomingview_box_light", "acworshipview_rewardbtn", "acworshipview_common_chargebtn", "progress5", "progress3_bg", "accarnivalview_tab_green", "accarnivalview_tab_red",
            "acwealthcomingview_box_1", "acwealthcomingview_box_2", "acworshipeffect_hammer", "alliancetask_frame3", "boxboomeffect"
        ]);
    };
    AcWorshipView.prototype.getBgName = function () {
        return null;
    };
    AcWorshipView.prototype.getTitleBgName = function () {
        return null;
    };
    AcWorshipView.prototype.getRuleInfo = function () {
        return "acWorshipViewRuleInfo-" + this.code;
    };
    AcWorshipView.prototype.getProbablyInfo = function () {
        return "acWorshipViewProbablyInfo-" + this.code;
    };
    AcWorshipView.prototype.getUiCode = function () {
        _super.prototype.getUiCode;
        if (this.code == "2") {
            return "1";
        }
        return _super.prototype.getUiCode.call(this);
    };
    /**
    * 如果要显示tip弹板重写此方法，可以加上条件检测，多次打开都会检测
    */
    AcWorshipView.prototype.getReportTipData = function () {
        return { title: { key: "acWorshipreporttitle-" + this.code }, msg: { key: "acWorshipreportkey-" + this.code } };
    };
    AcWorshipView.prototype.getTitleStr = function () {
        return null;
    };
    AcWorshipView.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_GETWORSHIPREWARDS, this.worshipRewardsHandle, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_GETWORSHIPACHIEVEMENT, this.achievementHandle, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_GETWORSHIPREWARDS, this.refreshView, this);
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        this._oneNeedNumTF = null;
        this._progressBar = null;
        this._startPercent = 0;
        this._progressBM = null;
        this._progressLight = null;
        this._numTF = null;
        this._boxBM = null;
        this._boxLightBM = null;
        this._redDot = null;
        this._countDownTime = null;
        this._countDownTimeBg = null;
        this._chargeBtn = null;
        this._hammerEffect = null;
        this._boxInfoList = [];
        this._speakStr = null;
        this._speakTF = null;
        this._speakTail = null;
        this._speakBg = null;
        this._messageLength = 0;
        this._progressTF = null;
        this._isPlay = false;
        this._handlerData = null;
        this._bulding1 = null;
        this._bulding2 = null;
        this._bulding3 = null;
        this._worker1 = null;
        this._worker2 = null;
        this._isPlayClip = false;
        this._isPlayLiHua = false;
        this._depth = 0;
        _super.prototype.dispose.call(this);
    };
    return AcWorshipView;
}(AcCommonView));
__reflect(AcWorshipView.prototype, "AcWorshipView");
//# sourceMappingURL=AcWorshipView.js.map