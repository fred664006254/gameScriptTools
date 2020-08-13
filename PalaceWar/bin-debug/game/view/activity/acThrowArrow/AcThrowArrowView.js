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
  * 投壶活动view
  * @author 张朝阳
  * date 2019/4/1
  * @class AcThrowArrowView
  */
var AcThrowArrowView = (function (_super) {
    __extends(AcThrowArrowView, _super);
    function AcThrowArrowView() {
        var _this = _super.call(this) || this;
        _this._progressTF = null;
        _this._lightBall = null;
        _this._startPercent = 0;
        _this._isPlay = false;
        _this._isTen = false;
        /**红点 */
        _this._redDot = null;
        /**活动时间周期 */
        _this._acTimeTF = null;
        _this._timebg = null;
        _this._tenBtn = null;
        _this._tenBtnRightTF = null;
        _this._numTF = null;
        /**进度条 */
        _this._progressBar = null;
        _this._progressBM = null;
        _this._progressLight = null;
        _this._boxBM = null;
        _this._boxLightBM = null;
        /**鞭炮的 Container*/
        _this._bangerContainer = null;
        _this._bangerInfo = [];
        _this._additemBtn = null;
        _this._itemNumberTF = null;
        _this._oneBtn = null;
        _this._oneBtnBM = null;
        _this._oneBtnLeftTF = null;
        _this._oneBtnRightTF = null;
        _this._detailBtn = null;
        /**箭 帧动画 */
        _this._arrowClip = null;
        /**花瓶 */
        _this._pot = null;
        _this._arrow1 = null;
        _this._arrow2 = null;
        _this._arrow3 = null;
        _this._bg = null;
        /**投壶的类型 */
        _this._shootSet = null;
        _this._shootIndex = 0;
        _this._rewards = null;
        _this._speakStr = null;
        _this._speakTF = null;
        _this._speakTail = null;
        _this._speakBg = null;
        _this._servantBM = null;
        _this._messageLength = 0;
        _this._heartTab = [];
        _this.aType = ["1", "2", "3"];
        _this.bType = ["1", "2", "3"];
        _this.cType = ["1", "2", "3"];
        return _this;
    }
    AcThrowArrowView.prototype.getContainerY = function () {
        return 0;
    };
    AcThrowArrowView.prototype.initView = function () {
        var _this = this;
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY_THROWARROWLOTTERY, this.lotteryHandle, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY_THROWARROWGETACHIEVEMENTRWD, this.refreshBangerHandele, this);
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        this._startPercent = vo.getLotteryValue() / cfg.getMaxAchievementValue();
        this._bg = BaseLoadBitmap.create("acthrowarrowview_bg-" + this.getUiCode());
        this._bg.width = 640;
        this._bg.height = 1136;
        if (this.getUiCode() == "3") {
            this._bg.setPosition(0, GameConfig.stageHeigth / 2 - this._bg.height / 2);
        }
        else {
            this._bg.setPosition(0, GameConfig.stageHeigth - this._bg.height);
        }
        this.addChildToContainer(this._bg);
        this._arrow1 = BaseBitmap.create("acthrowarrowview_common_arrow1");
        this._arrow1.setPosition(this._bg.x + 287, this._bg.y + 566);
        this.addChildToContainer(this._arrow1);
        this._arrow1.setVisible(false);
        this._arrow2 = BaseBitmap.create("acthrowarrowview_common_arrow2");
        this._arrow2.setPosition(this._bg.x + 311, this._bg.y + 561);
        this.addChildToContainer(this._arrow2);
        this._arrow2.setVisible(false);
        // this._arrow2.anchorOffsetX = this._arrow2.width / 2;
        // this._arrow2.anchorOffsetY = this._arrow2.height / 2;
        // this._arrow2.setPosition(this._bg.x + 311 - 16, this._bg.y + 561 + 67);
        // this._arrow2.rotation = 45;
        this._arrow3 = BaseBitmap.create("acthrowarrowview_common_arrow3");
        this._arrow3.setPosition(this._bg.x + 320, this._bg.y + 582);
        this.addChildToContainer(this._arrow3);
        this._arrow3.setVisible(false);
        this._pot = BaseBitmap.create("acthrowarrowview_pot-" + this.getUiCode());
        this._pot.setPosition(this._bg.x + 248, this._bg.y + 668);
        this.addChildToContainer(this._pot);
        this._arrowClip = ComponentManager.getCustomMovieClip("acthrowarrowview_arroweffect", 10, 70);
        var arrowBM = BaseBitmap.create("acthrowarrowview_arroweffect1");
        this._arrowClip.anchorOffsetX = arrowBM.width / 2;
        this._arrowClip.anchorOffsetY = arrowBM.height / 2;
        // - 40 0 + 40  835 840
        this._arrowClip.setPosition(GameConfig.stageWidth / 2, this._bg.y + 835);
        this.addChildToContainer(this._arrowClip);
        // this._arrowClip.playWithTime(-1);
        var titlebg = BaseLoadBitmap.create("acthrowarrowview_title-" + this.getUiCode());
        titlebg.width = 640;
        titlebg.height = 92;
        var topbg;
        if (this.getUiCode() == "3") {
            topbg = BaseLoadBitmap.create("acthreekingofwife_infobg-1");
            topbg.width = 640;
            topbg.height = 215;
            topbg.setPosition(titlebg.x, titlebg.y + titlebg.height - 7 - 80);
        }
        else {
            topbg = BaseLoadBitmap.create("treasurewealthtopbg-1");
            topbg.width = 640;
            topbg.height = 92 + 30;
            topbg.setPosition(titlebg.x, titlebg.y + titlebg.height - 7);
        }
        this.addChildToContainer(topbg);
        this.addChildToContainer(titlebg);
        var acTimePeriod = ComponentManager.getTextField(LanguageManager.getlocal("acThrowArrowViewTimePeriod-" + this.code, [vo.acTimeAndHour]), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        if (this.getUiCode() == "3") {
            acTimePeriod.setPosition(topbg.x + 10, topbg.y + topbg.height - 116);
        }
        else {
            acTimePeriod.setPosition(topbg.x + 10, topbg.y + 7);
        }
        this.addChildToContainer(acTimePeriod);
        var acDesc = ComponentManager.getTextField(LanguageManager.getlocal("acThrowArrowViewAcDesc-" + this.code), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        acDesc.width = 620;
        acDesc.lineSpacing = 5;
        acDesc.setPosition(topbg.x + 10, acTimePeriod.y + acTimePeriod.height + 10);
        this.addChildToContainer(acDesc);
        //倒计时位置 
        this._timebg = BaseBitmap.create("public_9_bg61");
        this._timebg.y = topbg.y + topbg.height - this._timebg.height / 2 - 2;
        this.addChildToContainer(this._timebg);
        this._acTimeTF = ComponentManager.getTextField(LanguageManager.getlocal("acThrowArrowViewAcTime-" + this.code, [vo.acCountDown]), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._timebg.width = 60 + this._acTimeTF.width;
        this._timebg.x = GameConfig.stageWidth - this._timebg.width - 5;
        this._acTimeTF.setPosition(this._timebg.x + this._timebg.width / 2 - this._acTimeTF.width / 2, this._timebg.y + this._timebg.height / 2 - this._acTimeTF.height / 2);
        this.addChildToContainer(this._acTimeTF);
        var itemnumBg = BaseBitmap.create("acchristmasview_smalldescbg");
        itemnumBg.width = 165;
        itemnumBg.height = 30;
        itemnumBg.setPosition(GameConfig.stageWidth - itemnumBg.width - 35, this._timebg.y + this._timebg.height + 10);
        this.addChildToContainer(itemnumBg);
        var itemicon = BaseBitmap.create("acthrowarrowview_rewarditem-" + this.getUiCode());
        itemicon.setPosition(itemnumBg.x - 5, itemnumBg.y + itemnumBg.height / 2 - itemicon.height / 2);
        this.addChildToContainer(itemicon);
        this._additemBtn = ComponentManager.getButton("mainui_btn1", "", function () {
            if (_this.getUiCode() == "3") {
                ViewController.getInstance().openView(ViewConst.POPUP.ACTHROWARROWREWARDPOPUPVIEW, { aid: _this.aid, code: _this.code, uicode: _this.getUiCode() });
            }
            else {
                ViewController.getInstance().openView(ViewConst.POPUP.ACTHROWARROWPOPUPVIEW, { aid: _this.aid, code: _this.code, type: 3 });
            }
        }, this);
        this._additemBtn.setPosition(itemnumBg.x + itemnumBg.width - this._additemBtn.width, itemnumBg.y + itemnumBg.height / 2 - this._additemBtn.height / 2);
        this.addChildToContainer(this._additemBtn);
        this._itemNumberTF = ComponentManager.getTextField("9998", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        this._itemNumberTF.width = this._additemBtn.x - itemicon.x - itemicon.width;
        this._itemNumberTF.textAlign = egret.HorizontalAlign.CENTER;
        this._itemNumberTF.setPosition(itemicon.x + itemicon.width, itemnumBg.y + itemnumBg.height / 2 - this._itemNumberTF.height / 2);
        this.addChildToContainer(this._itemNumberTF);
        if (this.getUiCode() == "3") {
            //衣装预览
            var wifeBone = "wife_full3_" + cfg.superp;
            if (!Api.switchVoApi.checkCloseBone() && App.CommonUtil.check_dragon() && RES.hasRes(wifeBone + "_ske")) {
                var wifetDB = App.DragonBonesUtil.getLoadDragonBones(wifeBone);
                wifetDB.setPosition(158, GameConfig.stageHeigth - 130);
                wifetDB.anchorOffsetX = wifetDB.width / 2;
                wifetDB.scaleX = -0.8;
                wifetDB.scaleY = 0.8;
                this.addChildToContainer(wifetDB);
            }
            else {
                var rect = egret.Rectangle.create();
                rect.setTo(0, 0, 640 * 0.75, 840 * 0.75);
                var servantPic = BaseLoadBitmap.create("wife_skin_" + cfg.superp, rect);
                servantPic.scaleX = -1;
                servantPic.setPosition(-50 + rect.width, GameConfig.stageHeigth - 730);
                this.addChildToContainer(servantPic);
            }
            var topBg = { x: 60, y: GameConfig.stageHeigth - 430 };
            var skinTxtEffect = ComponentManager.getCustomMovieClip("acwealthcarpview_skineffect", 10, 70);
            // this._effect.setScale(2);
            var skinTxtEffectBM = BaseBitmap.create("acwealthcarpview_skineffect1");
            skinTxtEffect.setPosition(topBg.x + 103 - skinTxtEffectBM.width / 2, topBg.y + 160 - skinTxtEffectBM.height / 2);
            skinTxtEffect.blendMode = egret.BlendMode.ADD;
            this.addChildToContainer(skinTxtEffect);
            skinTxtEffect.playWithTime(-1);
            var skinTxt = BaseBitmap.create("acwealthcarpview_servantskintxt");
            skinTxt.anchorOffsetX = skinTxt.width / 2;
            skinTxt.anchorOffsetY = skinTxt.height / 2;
            skinTxt.setPosition(topBg.x + 103, topBg.y + 160);
            this.addChildToContainer(skinTxt);
            egret.Tween.get(skinTxt, { loop: true }).to({ scaleX: 1.05, scaleY: 1.05 }, 400).to({ scaleX: 1, scaleY: 1 }, 400);
            var skinTxteffect = BaseBitmap.create("acwealthcarpview_servantskintxt");
            skinTxteffect.anchorOffsetX = skinTxteffect.width / 2;
            skinTxteffect.anchorOffsetY = skinTxteffect.height / 2;
            skinTxteffect.setPosition(topBg.x + 103, topBg.y + 160);
            this.addChildToContainer(skinTxteffect);
            skinTxteffect.blendMode = egret.BlendMode.ADD;
            skinTxteffect.alpha = 0;
            egret.Tween.get(skinTxteffect, { loop: true }).to({ alpha: 0.7, scaleX: 1.05, scaleY: 1.05 }, 400).to({ alpha: 0, scaleX: 1, scaleY: 1 }, 400);
            //透明点击区域
            var touchPos = BaseBitmap.create("public_alphabg");
            touchPos.width = 180;
            touchPos.height = 176;
            touchPos.setPosition(topBg.x, topBg.y);
            this.addChildToContainer(touchPos);
            touchPos.addTouchTap(function () {
                ViewController.getInstance().openView(ViewConst.POPUP.ACTHROWARROWREWARDPOPUPVIEW4, { aid: _this.aid, code: _this.code, uicode: _this.getUiCode() });
            }, ViewController);
            //三颗红心
            var heartTab = [
                { id: 3, x: 320, y: GameConfig.stageHeigth - 365 - 320, },
                { id: 2, x: 490, y: GameConfig.stageHeigth - 365 - 150, },
                { id: 1, x: 400, y: GameConfig.stageHeigth - 365, },
            ];
            for (var i = 0; i < heartTab.length; i++) {
                var info = heartTab[i];
                var heartname = "acthrowarrow_redheart" + info.id + "-" + this.getUiCode();
                var heart = BaseBitmap.create(heartname);
                heart.anchorOffsetX = heart.width / 2;
                heart.anchorOffsetY = heart.height / 2;
                heart.setPosition(info.x + heart.width / 2, info.y + heart.height / 2);
                this.addChild(heart);
                this._heartTab.push(heart);
            }
        }
        var buttombg = BaseLoadBitmap.create("arena_bottom");
        buttombg.width = 640;
        buttombg.height = 140;
        buttombg.setPosition(0, GameConfig.stageHeigth - buttombg.height);
        this.addChildToContainer(buttombg);
        this._oneBtn = ComponentManager.getButton(ButtonConst.BTN2_NORMAL_YELLOW, "acThrowArrowViewOneBtn-" + this.code, this.oneBtnClick, this);
        this._oneBtn.setPosition(85, buttombg.y + buttombg.height - this._oneBtn.height - 22);
        this.addChildToContainer(this._oneBtn);
        //消耗品
        this._oneBtnBM = BaseBitmap.create("acthrowarrowview_rewarditem-" + this.getUiCode());
        this._oneBtnBM.setPosition(this._oneBtn.x + this._oneBtn.width / 2 - this._oneBtnBM.width / 2, this._oneBtn.y - this._oneBtnBM.height - 2);
        this.addChildToContainer(this._oneBtnBM);
        //按钮上部左边文字
        this._oneBtnLeftTF = ComponentManager.getTextField(LanguageManager.getlocal("acThrowArrowViewBtnLeft-" + this.code), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._oneBtnLeftTF.setPosition(this._oneBtnBM.x - this._oneBtnLeftTF.width, this._oneBtnBM.y + this._oneBtnBM.height / 2 - this._oneBtnLeftTF.height / 2);
        this.addChildToContainer(this._oneBtnLeftTF);
        //按钮上部右边文字
        this._oneBtnRightTF = ComponentManager.getTextField("X1", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._oneBtnRightTF.setPosition(this._oneBtnBM.x + this._oneBtnBM.width, this._oneBtnBM.y + this._oneBtnBM.height / 2 - this._oneBtnRightTF.height / 2);
        this.addChildToContainer(this._oneBtnRightTF);
        this._tenBtn = ComponentManager.getButton(ButtonConst.BTN2_NORMAL_YELLOW, "acThrowArrowViewTenBtn-" + this.code, this.tenBtnClick, this);
        this._tenBtn.setPosition(GameConfig.stageWidth - this._tenBtn.width - 85, buttombg.y + buttombg.height - this._tenBtn.height - 22);
        this.addChildToContainer(this._tenBtn);
        //消耗品
        var tenBtnBM = BaseBitmap.create("acthrowarrowview_rewarditem-" + this.getUiCode());
        tenBtnBM.setPosition(this._tenBtn.x + this._tenBtn.width / 2 - tenBtnBM.width / 2, this._tenBtn.y - tenBtnBM.height - 2);
        this.addChildToContainer(tenBtnBM);
        //按钮上部左边文字
        var tenBtnLeftTF = ComponentManager.getTextField(LanguageManager.getlocal("acThrowArrowViewBtnLeft-" + this.code), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        tenBtnLeftTF.setPosition(tenBtnBM.x - tenBtnLeftTF.width, tenBtnBM.y + tenBtnBM.height / 2 - tenBtnLeftTF.height / 2);
        this.addChildToContainer(tenBtnLeftTF);
        //按钮上部右边文字
        this._tenBtnRightTF = ComponentManager.getTextField("X1", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._tenBtnRightTF.setPosition(tenBtnBM.x + tenBtnBM.width, tenBtnBM.y + tenBtnBM.height / 2 - this._tenBtnRightTF.height / 2);
        this.addChildToContainer(this._tenBtnRightTF);
        var progressbg = BaseLoadBitmap.create("luckdrawprogressbg-1");
        progressbg.width = 640;
        progressbg.height = 107;
        progressbg.setPosition(0, buttombg.y - progressbg.height);
        this.addChildToContainer(progressbg);
        if (this.getUiCode() == "3") {
            progressbg.alpha = 0;
            var mask = BaseBitmap.create("acthrowarrowview_mask");
            mask.width = 640;
            mask.setPosition(0, buttombg.y - mask.height);
            this.addChildToContainer(mask);
        }
        //进度条
        this._progressBar = ComponentManager.getProgressBar("progress12", "progress12_bg", 435);
        this._progressBar.setPosition(progressbg.x + progressbg.width / 2 - this._progressBar.width / 2 - 10, progressbg.y + progressbg.height / 2 - this._progressBar.height / 2);
        this.addChildToContainer(this._progressBar);
        this._progressBar.setPercentage(this._startPercent);
        var progressNumber = cfg.getMaxAchievementValue();
        this._progressTF = ComponentManager.getTextField(vo.getLotteryValue() + "/" + progressNumber, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        this._progressTF.setPosition(this._progressBar.x + this._progressBar.width / 2 - this._progressTF.width / 2, this._progressBar.y + this._progressBar.height + 12);
        this.addChildToContainer(this._progressTF);
        this._progressBM = BaseBitmap.create("acthrowarrowview_common_progressspirit");
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
        var numDescTF = ComponentManager.getTextField(LanguageManager.getlocal("acThrowArrowViewNumDesc-" + this.code), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_BLACK);
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
            if (_this.getUiCode() == "3") {
                ViewController.getInstance().openView(ViewConst.POPUP.ACTHROWARROWREWARDPOPUPVIEW2, { aid: _this.aid, code: _this.code, uicode: _this.getUiCode() });
            }
            else {
                ViewController.getInstance().openView(ViewConst.POPUP.ACTHROWARROWACHIEVEMENTPOPUPVIEW, { aid: _this.aid, code: _this.code });
            }
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
        if (vo.checkLotteryRedDot()) {
            this._boxBM.setRes("acwealthcomingview_box_2");
            this._redDot.setVisible(true);
        }
        else {
            this._boxBM.setRes("acwealthcomingview_box_1");
            this._redDot.setVisible(false);
        }
        //文字
        var boxWordBM = BaseBitmap.create("acthrowarrowview_common_boxtxt-" + this.getUiCode());
        boxWordBM.setPosition(this._boxBM.x - boxWordBM.width / 2, this._boxBM.y - boxWordBM.height / 2 - 3);
        this.addChildToContainer(boxWordBM);
        this._detailBtn = ComponentManager.getButton("acthrowarrowview_detailbtn-" + this.getUiCode(), null, function () {
            if (_this.getUiCode() == "3") {
                ViewController.getInstance().openView(ViewConst.POPUP.ACTHROWARROWREWARDPOPUPVIEW3, { aid: _this.aid, code: _this.code, uicode: _this.getUiCode() });
            }
            else {
                ViewController.getInstance().openView(ViewConst.POPUP.ACTHROWARROWPOPUPVIEW, { aid: _this.aid, code: _this.code });
            }
        }, this);
        if (this.getUiCode() == "3") {
            this._progressTF.textColor = TextFieldConst.COLOR_LIGHT_YELLOW;
            this._detailBtn.setPosition(progressbg.x + 5, topbg.y + topbg.height + 10);
        }
        else {
            this._detailBtn.setPosition(progressbg.x + 5, progressbg.y - this._detailBtn.height - 20);
        }
        this.addChildToContainer(this._detailBtn);
        var infoBtn = ComponentManager.getButton("acthrowarrowview_infobtn-" + this.getUiCode(), null, function () {
            ViewController.getInstance().openView(ViewConst.POPUP.ACTHROWARROWINFOREWARDPOPUPVIEW, { aid: _this.aid, code: _this.code });
        }, this);
        infoBtn.setPosition(this._detailBtn.x, this._detailBtn.y - infoBtn.height - 10);
        this.addChildToContainer(infoBtn);
        this._bangerContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(this._bangerContainer);
        this.initBanger();
        this._lightBall = BaseBitmap.create("acwealthcomingview_lightball");
        this._lightBall.anchorOffsetX = this._lightBall.width / 2;
        this._lightBall.anchorOffsetY = this._lightBall.height / 2;
        //oneone模式
        this._lightBall.blendMode = egret.BlendMode.ADD;
        this.addChildToContainer(this._lightBall);
        this._lightBall.alpha = 0;
        this.refreshView();
    };
    /**初始化宝箱相关 */
    AcThrowArrowView.prototype.initBanger = function () {
        var _this = this;
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        for (var i = 0; i < this._bangerInfo.length; i++) {
            this._bangerContainer.removeChild(this._bangerInfo[i].bangerBM);
            this._bangerInfo[i].bangerBM.dispose();
        }
        this._bangerInfo.length = 0;
        var procsscfg = cfg.throwArrowAchievementItemCfgList;
        var _loop_1 = function (i) {
            var value = procsscfg[i].needNum;
            var v = procsscfg[procsscfg.length - 1].needNum;
            var p = value / v;
            var bangerBM = BaseBitmap.create("luckydrawbox2-1");
            bangerBM.anchorOffsetX = bangerBM.width / 2;
            bangerBM.anchorOffsetY = bangerBM.height / 2;
            bangerBM.setPosition(this_1._progressBar.x + this_1._progressBar.width * p, this_1._progressBar.y + this_1._progressBar.height / 2 - 7);
            this_1._bangerContainer.addChild(bangerBM);
            bangerBM.addTouchTap(function () {
                if (_this.getUiCode() == "3") {
                    vo.showRewardId = procsscfg[i].id;
                    ViewController.getInstance().openView(ViewConst.POPUP.ACTHROWARROWREWARDPOPUPVIEW2, { aid: _this.aid, code: _this.code, uicode: _this.getUiCode() });
                }
                else {
                    ViewController.getInstance().openView(ViewConst.POPUP.ACTHROWARROWACHIEVEMENTPOPUPVIEW, { aid: _this.aid, code: _this.code, id: procsscfg[i].id });
                }
            }, this_1);
            var isPlayAni = vo.getLotteryValue() >= value ? false : true;
            this_1._bangerInfo.push({ id: String(procsscfg[i].id), bangerBM: bangerBM, value: procsscfg[i].needNum, isPlayAni: isPlayAni, percent: Math.round(p * 1000) });
            if (procsscfg.length - 1 == i) {
                this_1._speakStr = LanguageManager.getlocal("acThrowArrowViewSpeakTip-" + this_1.code);
                this_1._speakTF = ComponentManager.getTextField(this_1._speakStr, TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_BLACK);
                this_1._speakTail = BaseBitmap.create("public_9_bg25_tail");
                this_1._speakBg = BaseBitmap.create("public_9_bg25");
                this_1._speakBg.width = this_1._speakTF.width + 40;
                var posX = bangerBM.x;
                if (posX + this_1._speakBg.width + 5 > GameConfig.stageWidth) {
                    posX = GameConfig.stageWidth - this_1._speakBg.width - 15;
                }
                this_1._speakBg.setPosition(posX, bangerBM.y - bangerBM.height / 2 - this_1._speakBg.height - this_1._speakTail.height + 5);
                this_1.addChild(this_1._speakBg);
                this_1._speakTF.setPosition(this_1._speakBg.x + this_1._speakBg.width / 2 - this_1._speakTF.width / 2, this_1._speakBg.y + this_1._speakBg.height / 2 - this_1._speakTF.height / 2);
                this_1.addChild(this_1._speakTF);
                this_1._speakTail.skewY = 180;
                this_1._speakTail.setPosition(bangerBM.x, bangerBM.y - bangerBM.height / 2 - this_1._speakTail.height);
                this_1.addChild(this_1._speakTail);
                this_1._servantBM = BaseLoadBitmap.create("wife_skinhalf_" + cfg.superp);
                var scale = 0.22;
                this_1._servantBM.height = 205;
                this_1._servantBM.width = 196;
                this_1._servantBM.setScale(scale);
                this_1._servantBM.setPosition(this_1._speakBg.x - this_1._servantBM.width * scale / 2 - 5, this_1._speakBg.y + this_1._speakBg.height - this_1._servantBM.height * scale);
                this_1.addChild(this_1._servantBM);
                this_1._servantBM.alpha = 0;
                egret.Tween.get(this_1._speakBg, { loop: true }).call(function () {
                    _this._speakTF.text = "";
                    _this._speakTail.setVisible(true);
                    _this._servantBM.setVisible(true);
                    _this._speakTF.setVisible(true);
                    _this._speakBg.setVisible(true);
                    _this._messageLength = 0;
                    egret.Tween.get(_this._speakTF, { loop: true }).wait(75).call(function () {
                        _this._speakTF.text = _this._speakStr.substr(0, _this._messageLength);
                        _this._messageLength++;
                    }, _this);
                }, this_1).wait(this_1._speakStr.length * 75 + 3000).call(function () {
                    _this._speakTail.setVisible(false);
                    _this._servantBM.setVisible(false);
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
    AcThrowArrowView.prototype.refreshBangerHandele = function () {
        this.refreshBanger(this._startPercent);
    };
    /**刷新 宝箱 */
    AcThrowArrowView.prototype.refreshBanger = function (percent) {
        if (!this) {
            return;
        }
        var percentTmp = Math.round(percent * 1000);
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        for (var i = 0; i < this._bangerInfo.length; i++) {
            if (percentTmp >= this._bangerInfo[i].percent) {
                if (vo.checkLotteryFlag(Number(this._bangerInfo[i].id))) {
                    this._bangerInfo[i].bangerBM.setRes("luckydrawbox3-1");
                }
                else {
                    this._bangerInfo[i].bangerBM.setRes("luckydrawbox1-1");
                }
                if (this._bangerInfo[i].isPlayAni) {
                    this._bangerInfo[i].isPlayAni = false;
                    //播放动画
                    this.playBangerAni(this._bangerInfo[i].bangerBM, this._bangerInfo[i].bangerBM.x, this._bangerInfo[i].bangerBM.y, this._boxBM.x, this._boxBM.y - this._boxBM.height / 2);
                }
            }
            else {
                this._bangerInfo[i].bangerBM.setRes("luckydrawbox2-1");
            }
            if (this._bangerInfo.length - 1 == i) {
                if (vo.checkLotteryFlag(Number(this._bangerInfo[i].id))) {
                    this._speakTail.alpha = 0;
                    this._servantBM.alpha = 0;
                    this._speakTF.alpha = 0;
                    this._speakBg.alpha = 0;
                }
            }
        }
    };
    /**刷新ui */
    AcThrowArrowView.prototype.refreshView = function () {
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        this._numTF.text = String(vo.getLotteryValue());
        this._itemNumberTF.text = String(vo.getCoin());
        var progressNumber = cfg.getMaxAchievementValue();
        if (vo.getLotteryValue() >= progressNumber) {
            this._progressTF.text = vo.getLotteryValue() + "/" + progressNumber;
        }
        else {
            this._progressTF.text = LanguageManager.getlocal("acThrowArrowViewLotteryEndTip-" + this.code);
        }
        this._progressTF.x = this._progressBar.x + this._progressBar.width / 2 - this._progressTF.width / 2;
        if (vo.isFree() && (!vo.checkIsInEndShowTime())) {
            this._oneBtnBM.setVisible(false);
            this._oneBtnRightTF.setVisible(false);
            this._oneBtnLeftTF.text = LanguageManager.getlocal("acThrowArrowViewLotteryFree-" + this.code);
            this._oneBtnLeftTF.x = this._oneBtn.x + this._oneBtn.width / 2 - this._oneBtnLeftTF.width / 2;
        }
        else {
            this._oneBtnBM.setVisible(true);
            this._oneBtnRightTF.setVisible(true);
            this._oneBtnLeftTF.text = LanguageManager.getlocal("acThrowArrowViewBtnLeft-" + this.code);
            this._oneBtnLeftTF.x = this._oneBtnBM.x - this._oneBtnLeftTF.width;
        }
        if (vo.getCoin() >= 10) {
            this._tenBtnRightTF.text = "X10";
        }
        else if (vo.getCoin() < 10 && vo.getCoin() > 0) {
            this._tenBtnRightTF.text = "X" + String(vo.getCoin());
        }
        else {
            this._tenBtnRightTF.text = "X1";
        }
        if (vo.getLotteryValue() >= progressNumber) {
            this._progressTF.text = LanguageManager.getlocal("acThrowArrowViewLotteryEndTip-" + this.code);
        }
        else {
            this._progressTF.text = vo.getLotteryValue() + "/" + progressNumber;
        }
        this._progressTF.x = this._progressBar.x + this._progressBar.width / 2 - this._progressTF.width / 2;
        if (!vo.checkLotteryRedDot()) {
            this._boxBM.setRes("acwealthcomingview_box_1");
            this._redDot.setVisible(false);
        }
        if (vo.checkRechargeRedDot()) {
            App.CommonUtil.addIconToBDOC(this._additemBtn);
            var retdot = this._additemBtn.getChildByName("reddot");
            if (retdot) {
                retdot.x = 38 - 13;
                retdot.y = -10;
            }
            App.CommonUtil.addIconToBDOC(this._detailBtn);
        }
        else {
            App.CommonUtil.removeIconFromBDOC(this._additemBtn);
            App.CommonUtil.removeIconFromBDOC(this._detailBtn);
        }
        if (this.getUiCode() == "3") {
            var keynum = 10;
            if (vo.getCoin() <= 0) {
                keynum = 1;
            }
            else if (vo.getCoin() < 10) {
                keynum = vo.getCoin();
            }
            this._tenBtn.setText(LanguageManager.getlocal("acThrowArrowViewTenBtn-" + this.getUiCode(), [String(keynum)]), false);
        }
    };
    /**买一次事件 */
    AcThrowArrowView.prototype.oneBtnClick = function () {
        // if (this._heartTab.length == 3)
        // {	
        // 	this.playHeartAnim(App.MathUtil.getRandom(1,3),"6_1216_1");
        // 	return;
        // }
        // this.playProgressBarAni(0, 0.6, 0.005);
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        if (vo.checkIsInEndShowTime()) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
        if (this._isPlay) {
            return;
        }
        if (vo.getCoin() <= 0 && vo.isFree() == false) {
            // App.CommonUtil.showTip(LanguageManager.getlocal("gemNotEnough"));
            if (this.getUiCode() == "3") {
                ViewController.getInstance().openView(ViewConst.POPUP.ACTHROWARROWREWARDPOPUPVIEW, { aid: this.aid, code: this.code, uicode: this.getUiCode() });
            }
            else {
                ViewController.getInstance().openView(ViewConst.POPUP.ACTHROWARROWPOPUPVIEW, { aid: this.aid, code: this.code, type: 3 });
            }
            return;
        }
        this.request(NetRequestConst.REQUEST_ACTIVITY_THROWARROWLOTTERY, { activeId: vo.aidAndCode, isBatch: 0 });
        this._isPlay = true;
        this._isTen = false;
    };
    /**买十次事件 */
    AcThrowArrowView.prototype.tenBtnClick = function () {
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        if (vo.checkIsInEndShowTime()) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
        if (vo.getCoin() <= 0) {
            // App.CommonUtil.showTip(LanguageManager.getlocal("gemNotEnough"));
            if (this.getUiCode() == "3") {
                ViewController.getInstance().openView(ViewConst.POPUP.ACTHROWARROWREWARDPOPUPVIEW, { aid: this.aid, code: this.code, uicode: this.getUiCode() });
            }
            else {
                ViewController.getInstance().openView(ViewConst.POPUP.ACTHROWARROWPOPUPVIEW, { aid: this.aid, code: this.code, type: 3 });
            }
            return;
        }
        if (this._isPlay) {
            return;
        }
        this.request(NetRequestConst.REQUEST_ACTIVITY_THROWARROWLOTTERY, { activeId: vo.aidAndCode, isBatch: 1 });
        this._isPlay = true;
        this._isTen = true;
    };
    /**出现log 之后的回调 */
    AcThrowArrowView.prototype.logCallBack = function () {
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        if (this._startPercent < 1) {
            var endPercent = vo.getLotteryValue() / cfg.getMaxAchievementValue();
            this.playProgressBarAni(this._startPercent, endPercent, 0.005);
        }
        this._arrow1.setVisible(false);
        this._arrow2.setVisible(false);
        this._arrow3.setVisible(false);
        this._isPlay = false;
    };
    /**抽奖返回 */
    AcThrowArrowView.prototype.lotteryHandle = function (event) {
        if (event.data.ret) {
            var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
            if (this._isTen) {
                var batchList = event.data.data.data.batchList;
                if (this.getUiCode() == "3") {
                    this.playTenHeartAnim(batchList);
                }
                else {
                    ViewController.getInstance().openView(ViewConst.POPUP.ACTHROWARROWRESULTPOPUPVIEW, { aid: this.aid, code: this.code, batchList: batchList, f: this.logCallBack, o: this });
                }
            }
            else {
                var shootSet = event.data.data.data.shootSet;
                var rewards = event.data.data.data.rewards;
                if (this.getUiCode() == "3") {
                    this.playHeartAnim(shootSet, rewards);
                }
                else {
                    this.playArrowAni(shootSet, rewards);
                }
            }
        }
        else {
            this._isPlay = false;
        }
    };
    AcThrowArrowView.prototype.randomArrowType = function (type) {
        var l = type.length;
        var index = Math.floor((Math.random() * l));
        return type.splice(index, 1)[0];
    };
    AcThrowArrowView.prototype.getArrowY = function (type) {
    };
    AcThrowArrowView.prototype.playHeartAnimCallback = function () {
        if (!this._rewards) {
            return;
        }
        ViewController.getInstance().openView(ViewConst.POPUP.ACTHROWARROWGETREWARDPOPUPVIEW, { aid: this.aid, code: this.code, rewards: this._rewards, type: 1, handler: this, callback: this.logCallBack });
    };
    AcThrowArrowView.prototype.playHeartAnim = function (shootSet, rewards) {
        this._shootSet = shootSet;
        this._rewards = rewards;
        var view = this;
        var heart = this._heartTab[shootSet - 1];
        var heartAnim = function () {
            var clip = ComponentManager.getCustomMovieClip("acthrowarrow_hearteffect", 12, 80);
            clip.anchorOffsetX = 150;
            clip.anchorOffsetY = 150;
            clip.setPosition(heart.x, heart.y);
            clip.blendMode = egret.BlendMode.ADD;
            view.addChild(clip);
            clip.setEndCallBack(function () {
                clip.dispose();
                view.playHeartAnimCallback();
            }, this);
            clip.playWithTime(1);
            egret.Tween.get(heart).to({ scaleX: 1.2, scaleY: 1.2 }, 50).to({ scaleX: 0.8, scaleY: 0.8 }, 150)
                .to({ scaleX: 1.2, scaleY: 1.2 }, 100).to({ scaleX: 1, scaleY: 1 }, 100)
                .to({ scaleX: 1.2, scaleY: 1.1 }, 100).to({ scaleX: 1, scaleY: 1 }, 100)
                .to({ scaleX: 1.2, scaleY: 1.1 }, 100).to({ scaleX: 1, scaleY: 1 }, 100);
        };
        if (App.CommonUtil.check_dragon() && !Api.switchVoApi.checkCloseBone()) {
            var bone_1 = App.DragonBonesUtil.getLoadDragonBones("godnessarrow_arroweffect", 1, 'idle');
            bone_1.setPosition(heart.x - 155, heart.y);
            this.addChild(bone_1);
            bone_1.setDragonBoneEventListener(dragonBones.EventObject.COMPLETE, function () {
                bone_1.dispose();
            }, this);
            egret.setTimeout(heartAnim, this, 1000);
        }
        else {
            heartAnim();
        }
    };
    AcThrowArrowView.prototype.playTenHeartAnimCallback = function () {
        if (!this._rewards) {
            return;
        }
        ViewController.getInstance().openView(ViewConst.POPUP.ACTHROWARROWRESULTPOPUPVIEW, { aid: this.aid, code: this.code, batchList: this._rewards, f: this.logCallBack, o: this });
    };
    AcThrowArrowView.prototype.playHeartEffect = function (shootSet) {
        var heart = this._heartTab[shootSet - 1];
        if (!heart) {
            return;
        }
        var view = this;
        var heartAnim = function () {
            var clip = ComponentManager.getCustomMovieClip("acthrowarrow_hearteffect", 12, 80);
            clip.anchorOffsetX = 150;
            clip.anchorOffsetY = 150;
            clip.setPosition(heart.x, heart.y);
            clip.blendMode = egret.BlendMode.ADD;
            view.addChild(clip);
            clip.setEndCallBack(function () {
                clip.dispose();
                view.playHeartAnimCallback();
            }, this);
            clip.playWithTime(1);
            egret.Tween.get(heart).to({ scaleX: 1.2, scaleY: 1.2 }, 50).to({ scaleX: 0.8, scaleY: 0.8 }, 150)
                .to({ scaleX: 1.2, scaleY: 1.2 }, 100).to({ scaleX: 1, scaleY: 1 }, 100)
                .to({ scaleX: 1.2, scaleY: 1.1 }, 100).to({ scaleX: 1, scaleY: 1 }, 100)
                .to({ scaleX: 1.2, scaleY: 1.1 }, 100).to({ scaleX: 1, scaleY: 1 }, 100);
        };
        if (App.CommonUtil.check_dragon() && !Api.switchVoApi.checkCloseBone()) {
            var bone_2 = App.DragonBonesUtil.getLoadDragonBones("godnessarrow_arroweffect", 1, 'idle');
            bone_2.setPosition(heart.x - 155, heart.y);
            this.addChild(bone_2);
            bone_2.setDragonBoneEventListener(dragonBones.EventObject.COMPLETE, function () {
                bone_2.dispose();
            }, this);
            egret.setTimeout(heartAnim, this, 1000);
        }
        else {
            heartAnim();
        }
    };
    AcThrowArrowView.prototype.playTenHeartAnim = function (rewards) {
        var rewardsStr = "";
        var shootSet = 1;
        for (var k in rewards) {
            if (rewardsStr) {
                rewardsStr += "|";
            }
            rewardsStr += rewards[k][0];
            shootSet = rewards[k][1];
        }
        this._rewards = rewardsStr;
        var waitt = 0;
        if (App.CommonUtil.check_dragon() && !Api.switchVoApi.checkCloseBone()) {
            waitt = 2000;
        }
        else {
            waitt = 1000;
        }
        this.playHeartEffect(shootSet);
        // egret.Tween.get(this.container).wait(500).call(this.playHeartEffect,this,[2])
        // .wait(500).call(this.playHeartEffect,this,[3])
        // .wait(waitt).call(this.playHeartAnimCallback,this);
    };
    /**投壶动画 */
    AcThrowArrowView.prototype.playArrowAni = function (shootSet, rewards) {
        this._shootSet = shootSet;
        this._rewards = rewards;
        this.playSingleArrowAin(this._shootSet[this._shootIndex]);
    };
    /**单个投壶的动画 */
    AcThrowArrowView.prototype.playSingleArrowAin = function (shoot) {
        var _this = this;
        // - 40 0 + 40  835 840
        this._arrowClip.setStopFrame(0);
        this["_arrow" + String(this._shootIndex + 1)].anchorOffsetX = 0;
        this["_arrow" + String(this._shootIndex + 1)].anchorOffsetY = 0;
        this["_arrow" + String(this._shootIndex + 1)].rotation = 0;
        switch (shoot) {
            case "A":
                this._arrowClip.setPosition(GameConfig.stageWidth / 2 - 50, this._bg.y + 840);
                var aindex = this.randomArrowType(this.aType);
                this["_arrow" + String(this._shootIndex + 1)].setRes("acthrowarrowview_common_arrow" + aindex);
                switch (aindex) {
                    case "1":
                        this["_arrow" + String(this._shootIndex + 1)].setPosition(this._bg.x + 237, this._bg.y + 571);
                        break;
                    case "2":
                        this["_arrow" + String(this._shootIndex + 1)].setPosition(this._bg.x + 261, this._bg.y + 565);
                        break;
                    case "3":
                        this["_arrow" + String(this._shootIndex + 1)].setPosition(this._bg.x + 270, this._bg.y + 587);
                        break;
                }
                break;
            case "B":
                this._arrowClip.setPosition(GameConfig.stageWidth / 2, this._bg.y + 835);
                var bindex = this.randomArrowType(this.bType);
                this["_arrow" + String(this._shootIndex + 1)].setRes("acthrowarrowview_common_arrow" + bindex);
                switch (bindex) {
                    case "1":
                        this["_arrow" + String(this._shootIndex + 1)].setPosition(this._bg.x + 287, this._bg.y + 566);
                        break;
                    case "2":
                        this["_arrow" + String(this._shootIndex + 1)].setPosition(this._bg.x + 311, this._bg.y + 561);
                        break;
                    case "3":
                        this["_arrow" + String(this._shootIndex + 1)].setPosition(this._bg.x + 320, this._bg.y + 582);
                        break;
                }
                break;
            case "C":
                this._arrowClip.setPosition(GameConfig.stageWidth / 2 + 50, this._bg.y + 840);
                var cindex = this.randomArrowType(this.cType);
                this["_arrow" + String(this._shootIndex + 1)].setRes("acthrowarrowview_common_arrow" + cindex);
                switch (cindex) {
                    case "1":
                        this["_arrow" + String(this._shootIndex + 1)].setPosition(this._bg.x + 337, this._bg.y + 571);
                        break;
                    case "2":
                        this["_arrow" + String(this._shootIndex + 1)].setPosition(this._bg.x + 361, this._bg.y + 566);
                        break;
                    case "3":
                        this["_arrow" + String(this._shootIndex + 1)].setPosition(this._bg.x + 370, this._bg.y + 587);
                        break;
                }
                break;
            case "special":
                this._arrowClip.setPosition(GameConfig.stageWidth / 2, this._bg.y + 835);
                this["_arrow" + String(this._shootIndex + 1)].setRes("acthrowarrowview_common_arrow2");
                this["_arrow" + String(this._shootIndex + 1)].anchorOffsetX = this["_arrow" + String(this._shootIndex + 1)].width / 2;
                this["_arrow" + String(this._shootIndex + 1)].anchorOffsetY = this["_arrow" + String(this._shootIndex + 1)].height / 2;
                this["_arrow" + String(this._shootIndex + 1)].rotation = 45;
                this["_arrow" + String(this._shootIndex + 1)].setPosition(this._bg.x + 311 - 16 + 70, this._bg.y + 561 + 67 + 15);
                break;
        }
        this._arrowClip.playWithTime(1);
        SoundManager.playEffect("effect_acthrowarrow_arrow");
        this._arrowClip.setVisible(true);
        this._arrowClip.setEndCallBack(function () {
            _this["_arrow" + String(_this._shootIndex + 1)].setVisible(true);
            _this._arrowClip.setVisible(false);
            _this._shootIndex++;
            if (_this._shootSet[_this._shootIndex]) {
                egret.Tween.get(_this).wait(300).call(function () {
                    _this.playSingleArrowAin(_this._shootSet[_this._shootIndex]);
                    egret.Tween.removeTweens(_this);
                }, _this);
            }
            else {
                var cfg = Config.AcCfg.getCfgByActivityIdAndCode(_this.aid, _this.code);
                _this._shootIndex = 0;
                var type_1 = cfg.getLotteryType(_this._shootSet);
                egret.Tween.get(_this).wait(700).call(function () {
                    ViewController.getInstance().openView(ViewConst.POPUP.ACTHROWARROWGETREWARDPOPUPVIEW, { aid: _this.aid, code: _this.code, rewards: _this._rewards, type: type_1, handler: _this, callback: _this.logCallBack });
                    egret.Tween.removeTweens(_this);
                }, _this);
                _this.aType = ["1", "2", "3"];
                _this.bType = ["1", "2", "3"];
                _this.cType = ["1", "2", "3"];
            }
        }, this);
    };
    /**鞭炮的动画 */
    AcThrowArrowView.prototype.playBangerAni = function (bangerBM, startPosX, startPosY, endPosX, endPosY) {
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
                if (vo.checkLotteryRedDot()) {
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
                    if (vo.checkLotteryRedDot()) {
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
    /**
     * 进度条的动画
     */
    AcThrowArrowView.prototype.playProgressBarAni = function (startPercent, endPercent, speed) {
        var _this = this;
        if (!this._isPlay) {
            return;
        }
        // this._isPlay = true;
        // let vo = <AcWealthComingVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        // let cfg = <Config.AcCfg.WealthComingCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
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
                    // this._isPlay = false;
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
    AcThrowArrowView.prototype.tick = function () {
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        if (vo.checkIsInEndShowTime()) {
            this._acTimeTF.text = LanguageManager.getlocal("acPunishEnd");
        }
        else {
            this._acTimeTF.text = LanguageManager.getlocal("acThrowArrowViewAcTime-" + this.code, [vo.acCountDown]);
        }
        this._timebg.width = 60 + this._acTimeTF.width;
        this._timebg.x = GameConfig.stageWidth - this._timebg.width - 5;
        this._acTimeTF.setPosition(this._timebg.x + this._timebg.width / 2 - this._acTimeTF.width / 2, this._timebg.y + this._timebg.height / 2 - this._acTimeTF.height / 2);
    };
    AcThrowArrowView.prototype.getBgName = function () {
        return null;
    };
    AcThrowArrowView.prototype.getTitleBgName = function () {
        return null;
    };
    AcThrowArrowView.prototype.getTitleStr = function () {
        return null;
    };
    AcThrowArrowView.prototype.getRuleInfo = function () {
        return "acThrowArrowViewRuleInfo-" + this.code;
    };
    AcThrowArrowView.prototype.getProbablyInfo = function () {
        return "acThrowArrowViewProbablyInfo-" + this.code;
    };
    AcThrowArrowView.prototype.getResourceList = function () {
        var resArray = ["acthrowarrowview-" + this.getUiCode(), "progress7", "progress7_bg", "acwealthcarpview_common_line",
            "fourpeople_bottom", "acthrowarrowview_common_txtline", "acwealthcomingview_numbg", "progress12", "progress12_bg", "acwealthcomingview_box_1", "acwealthcomingview_box_2",
            "acwealthcomingview_box_light", "acthrowarrowview_common_boxtxt-" + this.getUiCode(), "luckydrawbox1-1", "luckydrawbox2-1", "luckydrawbox3-1", "acthrowarrowview_common_progressspirit",
            "acwealthcomingview_progresslight", "boxboomeffect", "acchristmasview_smalldescbg",
        ];
        if (this.getUiCode() == "3") {
            resArray = resArray.concat([
                "acwealthcarpview_skineffect1", "acwealthcarpview",
                "acthrowarrow_hearteffect", "acthrowarrowview_mask",
                "godnessarrow_arroweffect_ske", "godnessarrow_arroweffect_tex_json", "godnessarrow_arroweffect_tex_png",
            ]);
        }
        else {
            resArray = resArray.concat([
                "acthrowarrowview_arroweffect", "acthrowarrowview_common_arrow1",
                "acthrowarrowview_pot-" + this.getUiCode(),
                "acthrowarrowview_common_arrow2", "acthrowarrowview_common_arrow3",
            ]);
        }
        return _super.prototype.getResourceList.call(this).concat(resArray);
    };
    AcThrowArrowView.prototype.getUiCode = function () {
        if (this.code == "2") {
            return "1";
        }
        if (this.code == "4") {
            return "3";
        }
        return _super.prototype.getUiCode.call(this);
    };
    AcThrowArrowView.prototype.getSoundBgName = function () {
        return "music_acahrowarrow";
    };
    AcThrowArrowView.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_THROWARROWLOTTERY, this.lotteryHandle, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_THROWARROWGETACHIEVEMENTRWD, this.refreshBangerHandele, this);
        egret.Tween.removeTweens(this);
        egret.Tween.removeTweens(this._speakTF);
        egret.Tween.removeTweens(this._speakBg);
        this._progressTF = null;
        this._lightBall = null;
        this._startPercent = 0;
        this._isPlay = false;
        this._isTen = false;
        this._redDot = null;
        this._acTimeTF = null;
        this._timebg = null;
        this._tenBtn = null;
        this._tenBtnRightTF = null;
        this._numTF = null;
        this._progressBar = null;
        this._progressBM = null;
        this._progressLight = null;
        this._boxBM = null;
        this._boxLightBM = null;
        this._bangerContainer = null;
        this._bangerInfo.length = 0;
        this._additemBtn = null;
        this._itemNumberTF = null;
        this._oneBtn = null;
        this._oneBtnBM = null;
        this._oneBtnLeftTF = null;
        this._oneBtnRightTF = null;
        this._detailBtn = null;
        this._arrowClip = null;
        this._pot = null;
        this._arrow1 = null;
        this._arrow2 = null;
        this._arrow3 = null;
        this._bg = null;
        this._shootSet = null;
        this._shootIndex = 0;
        this._rewards = null;
        this.aType = ["1", "2", "3"];
        this.bType = ["1", "2", "3"];
        this.cType = ["1", "2", "3"];
        this._speakStr = null;
        this._speakTF = null;
        this._speakTail = null;
        this._speakBg = null;
        this._servantBM = null;
        this._messageLength = 0;
        this._heartTab.length = 0;
        _super.prototype.dispose.call(this);
    };
    return AcThrowArrowView;
}(AcCommonView));
__reflect(AcThrowArrowView.prototype, "AcThrowArrowView");
//# sourceMappingURL=AcThrowArrowView.js.map