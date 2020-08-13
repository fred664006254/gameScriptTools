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
  * 财神驾到活动
  * @author 张朝阳
  * date 2018/12/24
  * @class AcWealthComingView
  */
var AcWealthComingView = (function (_super) {
    __extends(AcWealthComingView, _super);
    function AcWealthComingView() {
        var _this = _super.call(this) || this;
        /**进度条 */
        _this._progressBar = null;
        _this._progressBM = null;
        _this._progressTF = null;
        _this._progressLight = null;
        /**一次需要的消耗 */
        _this._oneNeedNumTF = null;
        /**财运的次数 */
        _this._numTF = null;
        _this._boxBM = null;
        _this._boxLightBM = null;
        _this._lightBall = null;
        /**鞭炮的 Container*/
        _this._bangerContainer = null;
        _this._bangerInfo = [];
        _this._maxLength = 0.95;
        _this._startPercent = 0;
        _this._log = null;
        _this._loopTopBg = null;
        _this._isSecond = false;
        _this._isPlay = false;
        /**财神龙骨 */
        _this._wealthDragonBones = null;
        /**财神前面光效 */
        _this._wealthForwardDragonBones = null;
        /**财神后面光效 */
        _this._wealthBackDragonBones = null;
        /**财神聚气光效 */
        _this._wealthGatherDragonBones = null;
        /**财神buff1 */
        _this._wealthBuff1 = null;
        _this._wealthBuff2 = null;
        /**财神buff闪光 */
        _this._wealthBuffLight = null;
        _this._buttombg = null;
        /**返回的数据 */
        _this._handlerData = null;
        /**香 */
        _this._temple = null;
        /**香炉案 */
        _this._board = null;
        _this._bg = null;
        /**财神bufftype */
        _this._wealthBuffTypeBM = null;
        /**财神相关Container */
        _this._wealthContainer = null;
        /**场景相关Container */
        _this._scenceContainer = null;
        _this._sceneBg1 = null;
        _this._sceneBg2 = null;
        _this._sceneBg3 = null;
        _this._sceneBg4 = null;
        _this._timeTF = null;
        _this._isTen = false;
        /**红点 */
        _this._redDot = null;
        _this._progressBg = null;
        return _this;
    }
    AcWealthComingView.prototype.initView = function () {
        var _this = this;
        App.MessageHelper.addNetMessage(NetRequestConst.REQUST_ACTIVITY_GETWEATHLUCKYREWARD, this.weathLuckHandle, this);
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUST_ACTIVITY_GETWEATHREWARD, this.refreshBangerHandele, this);
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        this._isSecond = vo.isSecond();
        //背景图
        this._bg = BaseLoadBitmap.create("acwealthcomingview_bg");
        this._bg.width = 640;
        this._bg.height = 1136;
        this._bg.setPosition(0, GameConfig.stageHeigth - this._bg.height);
        this.addChildToContainer(this._bg);
        //底部背景
        this._buttombg = BaseLoadBitmap.create("acwealthcomingview_buttombg");
        this._buttombg.width = 640;
        this._buttombg.height = 366;
        this._buttombg.setPosition(this._bg.x, this._bg.y + this._bg.height - this._buttombg.height);
        //场景相关所有
        this._scenceContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(this._scenceContainer);
        //财神相关所有
        this._wealthContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(this._wealthContainer);
        //动画
        //背光
        this._wealthBackDragonBones = App.DragonBonesUtil.getLoadDragonBones("acwealthcomingview_back", 1);
        this._wealthBackDragonBones.setPosition(this._buttombg.x + this._buttombg.width / 2, this._buttombg.y - 200);
        this._wealthContainer.addChild(this._wealthBackDragonBones);
        this._wealthBackDragonBones.setVisible(false);
        //聚光
        this._wealthGatherDragonBones = App.DragonBonesUtil.getLoadDragonBones("acwealthcomingview_gather", 1);
        this._wealthGatherDragonBones.setPosition(this._buttombg.x + this._buttombg.width / 2, this._buttombg.y - 200);
        this._wealthContainer.addChild(this._wealthGatherDragonBones);
        this._wealthGatherDragonBones.setVisible(false);
        if (vo.isSecond()) {
            this.playWealthBuffAni("acwealthcomingview_forcewealthbuff", false, vo.isHasWealethBuff());
            this._wealthDragonBones = App.DragonBonesUtil.getLoadDragonBones("acwealthcomingview_forcewealth", 0, "idle");
            this._wealthDragonBones.x = this._buttombg.x + this._buttombg.width / 2;
            this._wealthDragonBones.y = this._buttombg.y + 20;
            this._wealthContainer.addChild(this._wealthDragonBones);
        }
        else {
            this.playWealthBuffAni("acwealthcomingview_culturewealthbuff", true, vo.isHasWealethBuff());
            this._wealthDragonBones = App.DragonBonesUtil.getLoadDragonBones("acwealthcomingview_culturewealth", 0, "idle");
            this._wealthDragonBones.x = this._buttombg.x + this._buttombg.width / 2;
            this._wealthDragonBones.y = this._buttombg.y + 20;
            this._wealthContainer.addChild(this._wealthDragonBones);
        }
        this._wealthForwardDragonBones = App.DragonBonesUtil.getLoadDragonBones("acwealthcomingview_forward", 1);
        this._wealthForwardDragonBones.setPosition(this._buttombg.x + this._buttombg.width / 2, this._buttombg.y - 190);
        this._wealthContainer.addChild(this._wealthForwardDragonBones);
        this._wealthForwardDragonBones.setVisible(false);
        //香炉
        this._board = BaseLoadBitmap.create("acwealthcomingview_board");
        this._board.width = 640;
        this._board.height = 139;
        this._board.setPosition(this._bg.x, this._bg.y + 720);
        this.addChildToContainer(this._board);
        //香相关
        this._temple = BaseLoadBitmap.create("acwealthcomingview_temple");
        this._temple.width = 73;
        this._temple.height = 179;
        this._temple.setPosition(this._bg.x + this._bg.width / 2 - this._temple.width / 2, this._bg.y + 576);
        this.addChildToContainer(this._temple);
        this._temple.setVisible(false);
        //buffBM相关
        this._wealthBuffTypeBM = BaseLoadBitmap.create("acwealthcomingview_blesstitlebg2");
        this._wealthBuffTypeBM.width = 185;
        this._wealthBuffTypeBM.height = 72;
        this._wealthBuffTypeBM.anchorOffsetX = this._wealthBuffTypeBM.width / 2;
        this._wealthBuffTypeBM.anchorOffsetY = this._wealthBuffTypeBM.height / 2;
        this._wealthBuffTypeBM.setPosition(this._board.x + this._board.width / 2, this._board.y + this._board.height / 2);
        this.addChildToContainer(this._wealthBuffTypeBM);
        this._wealthBuffTypeBM.addTouchTap(function () {
            ViewController.getInstance().openView(ViewConst.POPUP.ACWEALTHCOMINGBLESSPOPUPVIEW, { aid: _this.aid, code: _this.code });
        }, this);
        this.playWealthBuffWordAni();
        //层级高于特效 最后再加底图
        this.addChildToContainer(this._buttombg);
        //标题背景
        var titlebg = BaseLoadBitmap.create("acwealthcomingview_title");
        titlebg.width = 640;
        titlebg.height = 92;
        titlebg.setPosition(0, 0);
        //上部背景
        var topbg = BaseLoadBitmap.create("accrackertopbg1-1");
        topbg.width = 640;
        topbg.height = 154;
        topbg.setPosition(0, titlebg.y + titlebg.height - 7 - 35);
        this.addChildToContainer(topbg);
        this.addChildToContainer(titlebg);
        //奖励预览按钮
        var rewardInfoBtn = ComponentManager.getButton("acwealthcomingview_infobtn", null, function () {
            // ViewController.getInstance().openView(ViewConst.POPUP.ACWEALTHCOMINGSKINREWARDPOPUPVIEW, { aid: this.aid, code: this.code });
            var titleIdStr = cfg.prize.split("_");
            var topMsg = LanguageManager.getlocal("acWealthComingWifeSkin-" + _this.code);
            ViewController.getInstance().openView(ViewConst.POPUP.ACCOMMONTITLEREWARDPOPUPVIEW, { titleIds: [titleIdStr[1], titleIdStr[1]], bgType: 2, topMsg: topMsg });
        }, this);
        rewardInfoBtn.setPosition(topbg.x + 8, topbg.y + topbg.height / 2 - rewardInfoBtn.height / 2 + 18);
        this.addChildToContainer(rewardInfoBtn);
        //奖励说明
        var descTF = ComponentManager.getTextField(LanguageManager.getlocal("acWealthComingViewDesc"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        descTF.width = 540;
        descTF.lineSpacing = 5;
        descTF.setPosition(rewardInfoBtn.x + rewardInfoBtn.width + 6, topbg.y + 10 + 35);
        this.addChildToContainer(descTF);
        //活动时间
        var timeTF = ComponentManager.getTextField(LanguageManager.getlocal("acWealthComingViewAcTime", [vo.acTimeAndHour]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        timeTF.width = 540;
        timeTF.setPosition(descTF.x, descTF.y + descTF.height + 5);
        this.addChildToContainer(timeTF);
        this._timeTF = ComponentManager.getTextField(LanguageManager.getlocal("acWealthComingViewLastTime", [vo.acCountDown]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._timeTF.width = 540;
        this._timeTF.setPosition(descTF.x, timeTF.y + timeTF.height + 5);
        this.addChildToContainer(this._timeTF);
        //左财神
        var waelthLeft = BaseLoadBitmap.create("acwealthcomingview_left");
        waelthLeft.width = 176;
        waelthLeft.height = 164;
        waelthLeft.setPosition(this._buttombg.x, this._buttombg.y - waelthLeft.height / 2 - 25);
        this.addChildToContainer(waelthLeft);
        waelthLeft.addTouchTap(function () {
            ViewController.getInstance().openView(ViewConst.POPUP.ACWEALTHCOMINGREWARDPOPUPVIEW, { aid: _this.aid, code: _this.code });
        }, this);
        //右财神 财神祝福
        var waelthRight = BaseLoadBitmap.create("acwealthcomingview_right");
        waelthRight.width = 176;
        waelthRight.height = 164;
        waelthRight.setPosition(this._buttombg.x + this._buttombg.width - waelthRight.width, waelthLeft.y);
        this.addChildToContainer(waelthRight);
        waelthRight.addTouchTap(function () {
            ViewController.getInstance().openView(ViewConst.POPUP.ACWEALTHCOMINGBLESSPOPUPVIEW, { aid: _this.aid, code: _this.code, noBuff: true });
        }, this);
        //一次相关
        //按钮
        var oneBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "", this.oneBtnClick, this);
        oneBtn.setPosition(85, this._buttombg.y + this._buttombg.height - oneBtn.height - 37);
        this.addChildToContainer(oneBtn);
        //按钮icon
        var oneBtnIcon = BaseLoadBitmap.create("itemicon1061");
        oneBtnIcon.width = 35;
        oneBtnIcon.height = 35;
        oneBtnIcon.setPosition(oneBtn.x + oneBtn.width / 2 - oneBtnIcon.width / 2 + 5, oneBtn.y + oneBtn.height / 2 - oneBtnIcon.height / 2);
        if (PlatformManager.checkIsEnLang()) {
            oneBtnIcon.x = oneBtn.x + oneBtn.width / 2 - oneBtnIcon.width / 2 + 15;
        }
        this.addChildToContainer(oneBtnIcon);
        //按钮文字
        var oneBtnIconTF = ComponentManager.getTextField(LanguageManager.getlocal("acWealthComingViewBuyBtn"), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_BLACK);
        oneBtnIconTF.setPosition(oneBtnIcon.x - oneBtnIconTF.width, oneBtnIcon.y + oneBtnIcon.height / 2 - oneBtnIconTF.height / 2);
        this.addChildToContainer(oneBtnIconTF);
        //按钮次数
        var oneBtnIconNum = ComponentManager.getTextField("X1", TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_BLACK);
        oneBtnIconNum.setPosition(oneBtnIcon.x + oneBtnIcon.width, oneBtnIcon.y + oneBtnIcon.height / 2 - oneBtnIconNum.height / 2);
        this.addChildToContainer(oneBtnIconNum);
        //元宝
        var oneGemBM = BaseBitmap.create("public_icon1");
        oneGemBM.width = 42;
        oneGemBM.height = 42;
        oneGemBM.setPosition(oneBtn.x + oneBtn.width / 2 - oneGemBM.width - 8, oneBtn.y + oneBtn.height - 3);
        this.addChildToContainer(oneGemBM);
        //需要元宝数量
        this._oneNeedNumTF = ComponentManager.getTextField(String(cfg.itemExpend), TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._oneNeedNumTF.setPosition(oneGemBM.x + oneGemBM.width, oneGemBM.y + oneGemBM.height / 2 - this._oneNeedNumTF.height / 2 - 2);
        this.addChildToContainer(this._oneNeedNumTF);
        //十次相关
        //按钮
        var tenBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "", this.tenBtnClick, this);
        tenBtn.setPosition(this._buttombg.x + this._buttombg.width - tenBtn.width - 90, this._buttombg.y + this._buttombg.height - tenBtn.height - 37);
        this.addChildToContainer(tenBtn);
        //按钮图片
        var tenBtnIcon = BaseLoadBitmap.create("itemicon1061");
        tenBtnIcon.width = 35;
        tenBtnIcon.height = 35;
        tenBtnIcon.setPosition(tenBtn.x + tenBtn.width / 2 - tenBtnIcon.width / 2 + 5, tenBtn.y + tenBtn.height / 2 - tenBtnIcon.height / 2);
        if (PlatformManager.checkIsEnLang()) {
            tenBtnIcon.x = tenBtn.x + tenBtn.width / 2 - tenBtnIcon.width / 2 + 13;
        }
        this.addChildToContainer(tenBtnIcon);
        //按钮文字
        var tenBtnIconTF = ComponentManager.getTextField(LanguageManager.getlocal("acWealthComingViewBuyBtn"), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_BLACK);
        tenBtnIconTF.setPosition(tenBtnIcon.x - tenBtnIconTF.width, tenBtnIcon.y + tenBtnIcon.height / 2 - tenBtnIconTF.height / 2);
        this.addChildToContainer(tenBtnIconTF);
        //按钮次数
        var tenBtnIconNum = ComponentManager.getTextField("X10", TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_BLACK);
        tenBtnIconNum.setPosition(tenBtnIcon.x + tenBtnIcon.width, tenBtnIcon.y + tenBtnIcon.height / 2 - tenBtnIconNum.height / 2);
        this.addChildToContainer(tenBtnIconNum);
        //元宝
        var tenGemBM = BaseBitmap.create("public_icon1");
        tenGemBM.width = 42;
        tenGemBM.height = 42;
        tenGemBM.setPosition(tenBtn.x + tenBtn.width / 2 - tenGemBM.width - 8, tenBtn.y + tenBtn.height - 3);
        this.addChildToContainer(tenGemBM);
        //需要元宝数量
        var tenNeedGemTF = ComponentManager.getTextField(String(Math.round(cfg.itemExpend * 10 * cfg.discount)), TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        tenNeedGemTF.setPosition(tenGemBM.x + tenGemBM.width, tenGemBM.y + tenGemBM.height / 2 - tenNeedGemTF.height / 2 - 2);
        this.addChildToContainer(tenNeedGemTF);
        //进度条
        this._progressBar = ComponentManager.getProgressBar("progress12", "progress12_bg", 468);
        this._progressBar.setPosition(this._buttombg.x + this._buttombg.width / 2 - this._progressBar.width / 2, this._buttombg.y + 180);
        this.addChildToContainer(this._progressBar);
        if (vo.isSecond()) {
            this._startPercent = this._maxLength * vo.getLuckyValue() / cfg.rewardProcessItemCfgList[cfg.rewardProcessItemCfgList.length - 1].value;
            if (this._startPercent >= this._maxLength) {
                this._startPercent = this._maxLength;
            }
            this._progressBar.setPercentage(this._startPercent);
        }
        else {
            this._startPercent = this._maxLength * vo.getLuckyValue() / cfg.luckyProcess;
            this._progressBar.setPercentage(this._startPercent);
        }
        //次数this._bg
        var numbg = BaseBitmap.create("acwealthcomingview_numbg");
        numbg.setPosition(this._progressBar.x + 12 - numbg.width, this._progressBar.y + this._progressBar.height / 2 - numbg.height / 2);
        this.addChildToContainer(numbg);
        //财运TF
        var numDescTF = ComponentManager.getTextField(LanguageManager.getlocal("acWealthComingViewNumDesc"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
        if (PlatformManager.checkIsEnLang()) {
            numDescTF.size = 16;
        }
        numDescTF.setPosition(numbg.x + numbg.width / 2 - numDescTF.width / 2, numbg.y + 28);
        this.addChildToContainer(numDescTF);
        //数量TF
        this._numTF = ComponentManager.getTextField("9999", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
        this._numTF.width = 60;
        this._numTF.textAlign = egret.HorizontalAlign.CENTER;
        this._numTF.setPosition(numDescTF.x + numDescTF.width / 2 - this._numTF.width / 2, numDescTF.y + numDescTF.height + 2);
        this.addChildToContainer(this._numTF);
        //奖励宝箱
        this._boxBM = BaseBitmap.create("acwealthcomingview_box_1");
        this._boxBM.anchorOffsetX = this._boxBM.width / 2;
        this._boxBM.anchorOffsetY = this._boxBM.height;
        this._boxBM.setPosition(this._progressBar.x + this._progressBar.width + this._boxBM.width / 2 - 8, this._progressBar.y + this._progressBar.height / 2 + this._boxBM.height / 2 - 15);
        this.addChildToContainer(this._boxBM);
        this._boxBM.addTouchTap(function () {
            ViewController.getInstance().openView(ViewConst.POPUP.ACWEALTHCOMINGLUCKREWARDPOPUPVIEW, { aid: _this.aid, code: _this.code });
        }, this);
        //宝箱光 584 816  582.5 810
        this._boxLightBM = BaseBitmap.create("acwealthcomingview_box_light");
        this._boxLightBM.anchorOffsetX = this._boxLightBM.width / 2 - 1.5;
        this._boxLightBM.anchorOffsetY = this._boxLightBM.height / 2 + this._boxBM.width / 2 - 2 + 3;
        this._boxLightBM.setPosition(this._boxBM.x, this._boxBM.y);
        this.addChildToContainer(this._boxLightBM);
        this._boxLightBM.alpha = 0;
        //红点	
        this._redDot = BaseBitmap.create("public_dot2");
        this._redDot.setPosition(this._boxBM.x + this._boxBM.width / 2 - this._redDot.width / 2, this._boxBM.y - this._boxBM.height + this._redDot.height / 2);
        this.addChildToContainer(this._redDot);
        if (vo.isHaveRedDot()) {
            this._boxBM.setRes("acwealthcomingview_box_2");
            this._redDot.setVisible(true);
        }
        else {
            this._boxBM.setRes("acwealthcomingview_box_1");
            this._redDot.setVisible(false);
        }
        //文字
        var boxWordBM = BaseBitmap.create("acwealthcomingview_word");
        boxWordBM.setPosition(this._boxBM.x - boxWordBM.width / 2, this._boxBM.y - boxWordBM.height / 2);
        this.addChildToContainer(boxWordBM);
        this._lightBall = BaseBitmap.create("acwealthcomingview_lightball");
        this._lightBall.anchorOffsetX = this._lightBall.width / 2;
        this._lightBall.anchorOffsetY = this._lightBall.height / 2;
        //oneone模式
        this._lightBall.blendMode = egret.BlendMode.ADD;
        this.addChildToContainer(this._lightBall);
        this._lightBall.alpha = 0;
        //进度bg
        this._progressBg = BaseBitmap.create("acmaydaynumbg");
        this._progressBg.setPosition(this._progressBar.x + this._progressBar.width / 2 - this._progressBg.width / 2, this._progressBar.y + this._progressBar.height + 5);
        this._progressBg.alpha = 0.5;
        this.addChildToContainer(this._progressBg);
        //进度文本
        this._progressTF = ComponentManager.getTextField(2000 + "/" + 5000, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._progressTF.setPosition(this._progressBar.x + this._progressBar.width / 2 - this._progressTF.width / 2, this._progressBar.y + this._progressBar.height + 12);
        this.addChildToContainer(this._progressTF);
        this._progressBM = BaseBitmap.create("acwealthcomingview_progressspirit");
        this._progressBM.anchorOffsetX = this._progressBM.width / 2;
        this._progressBM.anchorOffsetY = this._progressBM.height;
        this._progressBM.setPosition(this._progressBar.x + this._progressBar.width * this._startPercent, this._progressBar.y);
        this.addChildToContainer(this._progressBM);
        this._progressLight = BaseBitmap.create("acwealthcomingview_progresslight");
        this._progressLight.anchorOffsetX = this._progressLight.width;
        this._progressLight.anchorOffsetY = this._progressLight.height / 2;
        this._progressLight.setPosition(this._progressBar.x + this._progressBar.width * this._startPercent, this._progressBar.y + this._progressBar.height / 2);
        this.addChildToContainer(this._progressLight);
        this._progressLight.setVisible(false);
        var progressFlag = BaseBitmap.create("acwealthcomingview_progressflag");
        progressFlag.setPosition(this._progressBar.x + this._progressBar.width * this._maxLength - progressFlag.width / 2, this._progressBar.y + this._progressBar.height / 2 - progressFlag.height / 2);
        this.addChildToContainer(progressFlag);
        this._loopTopBg = BaseBitmap.create("public_ac_notice_bg");
        this._loopTopBg.width = topbg.width;
        this._loopTopBg.setPosition(topbg.x, topbg.y + topbg.height - 5);
        this.addChildToContainer(this._loopTopBg);
        this._bangerContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(this._bangerContainer);
        this.initBanger();
        this.initScenContainer();
        this.refreshView();
        this.refreshBanger(this._startPercent);
        this.runText();
        this.tick();
    };
    /**场景相关 */
    AcWealthComingView.prototype.initScenContainer = function () {
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        this._sceneBg1 = BaseLoadBitmap.create("acwealthcomingview_forcewealthbg4"); //8
        this._sceneBg1.width = 640;
        this._sceneBg1.height = 508;
        this._scenceContainer.addChild(this._sceneBg1);
        this._sceneBg2 = BaseLoadBitmap.create("acwealthcomingview_forcewealthbg3"); //7
        this._sceneBg2.width = 640;
        this._sceneBg2.height = 328;
        this._scenceContainer.addChild(this._sceneBg2);
        this._sceneBg3 = BaseLoadBitmap.create("acwealthcomingview_forcewealthbg2"); //6
        this._sceneBg3.width = 640;
        this._sceneBg3.height = 375;
        this._scenceContainer.addChild(this._sceneBg3);
        this._sceneBg4 = BaseLoadBitmap.create("acwealthcomingview_forcewealthbg1"); //5
        this._sceneBg4.width = 640;
        this._sceneBg4.height = 582;
        this._scenceContainer.addChild(this._sceneBg4);
        if (vo.isSecond()) {
            this._sceneBg1.setPosition(this._bg.x, this._bg.y + 178);
            this._sceneBg2.setPosition(this._bg.x, this._bg.y + 66);
            this._sceneBg3.setPosition(this._bg.x, this._bg.y + 477);
            this._sceneBg4.setPosition(this._bg.x, this._bg.y + 551);
        }
        else {
            this._sceneBg1.setPosition(this._bg.x, this._bg.y + -419);
            this._sceneBg2.setPosition(this._bg.x, this._bg.y + -335);
            this._sceneBg3.setPosition(this._bg.x, this._bg.y + 1139);
            this._sceneBg4.setPosition(this._bg.x, this._bg.y + 1140);
        }
    };
    /**初始化鞭炮相关 */
    AcWealthComingView.prototype.initBanger = function () {
        var _this = this;
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        for (var i = 0; i < this._bangerInfo.length; i++) {
            this._bangerContainer.removeChild(this._bangerInfo[i].bangerBM);
            this._bangerInfo[i].bangerBM.dispose();
        }
        this._bangerInfo.length = 0;
        var procsscfg = vo.getProcessCfg();
        var _loop_1 = function (i) {
            if (vo.isSecond()) {
                if (procsscfg[i].value < cfg.luckyProcess) {
                    return "continue";
                }
            }
            var value = procsscfg[i].value;
            var v = procsscfg[procsscfg.length - 1].value;
            var p = value / v;
            var bangerBM = BaseBitmap.create("acwealthcomingview_squibtype1");
            bangerBM.anchorOffsetX = bangerBM.width / 2;
            bangerBM.anchorOffsetY = bangerBM.height / 2;
            bangerBM.setPosition(this_1._progressBar.x + this_1._progressBar.width * this_1._maxLength * p, this_1._progressBar.y + this_1._progressBar.height / 2 - 7);
            this_1._bangerContainer.addChild(bangerBM);
            bangerBM.addTouchTap(function () {
                ViewController.getInstance().openView(ViewConst.POPUP.ACWEALTHCOMINGLUCKREWARDPOPUPVIEW, { aid: _this.aid, code: _this.code, id: procsscfg[i].id });
            }, this_1);
            var isPlayAni = vo.getLuckyValue() >= value ? false : true;
            this_1._bangerInfo.push({ id: procsscfg[i].id, bangerBM: bangerBM, value: procsscfg[i].value, isPlayAni: isPlayAni, percent: Math.round(this_1._maxLength * p * 1000) });
        };
        var this_1 = this;
        for (var i = 0; i < procsscfg.length; i++) {
            _loop_1(i);
        }
    };
    AcWealthComingView.prototype.refreshBangerHandele = function () {
        this.refreshBanger(this._startPercent);
    };
    /**刷新 鞭炮 */
    AcWealthComingView.prototype.refreshBanger = function (percent) {
        var percentTmp = Math.round(percent * 1000);
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        for (var i = 0; i < this._bangerInfo.length; i++) {
            if (percentTmp >= this._bangerInfo[i].percent) {
                if (vo.isReceiveReward(this._bangerInfo[i].id)) {
                    this._bangerInfo[i].bangerBM.setRes("acwealthcomingview_squibtype3");
                }
                else {
                    this._bangerInfo[i].bangerBM.setRes("acwealthcomingview_squibtype1");
                }
                if (this._bangerInfo[i].isPlayAni) {
                    this._bangerInfo[i].isPlayAni = false;
                    //播放动画
                    this.playBangerAni(this._bangerInfo[i].bangerBM, this._bangerInfo[i].bangerBM.x, this._bangerInfo[i].bangerBM.y, this._boxBM.x, this._boxBM.y - this._boxBM.height / 2);
                }
            }
            else {
                this._bangerInfo[i].bangerBM.setRes("acwealthcomingview_squibtype2");
            }
        }
    };
    /**刷新ui */
    AcWealthComingView.prototype.refreshView = function () {
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        if (vo.isFree()) {
            this._oneNeedNumTF.text = LanguageManager.getlocal("acWealthComingViewFree");
        }
        else {
            this._oneNeedNumTF.text = String(cfg.itemExpend);
        }
        this._numTF.text = String(vo.getLuckyValue());
        var progressTFStr = "";
        if (vo.isSecond()) {
            progressTFStr = String(vo.getLuckyValue()) + "/" + String(cfg.rewardProcessItemCfgList[cfg.rewardProcessItemCfgList.length - 1].value);
            if (vo.getLuckyValue() >= cfg.rewardProcessItemCfgList[cfg.rewardProcessItemCfgList.length - 1].value) {
                progressTFStr = LanguageManager.getlocal("acWealthComingViewMaxTip");
            }
        }
        else {
            progressTFStr = String(vo.getLuckyValue()) + "/" + String(cfg.luckyProcess);
        }
        this._progressTF.text = progressTFStr;
        this._progressTF.setPosition(this._progressBar.x + this._progressBar.width / 2 - this._progressTF.width / 2, this._progressBar.y + this._progressBar.height + 12);
        if (this._progressTF.width + 30 > this._progressBg.width) {
            this._progressBg.width = this._progressTF.width + 30;
        }
        this._progressBg.setPosition(this._progressBar.x + this._progressBar.width / 2 - this._progressBg.width / 2, this._progressBar.y + this._progressBar.height + 5);
        // if (vo.isHaveRedDot()) {
        // 	// this._boxBM.setRes("acwealthcomingview_box_2");
        // }
        // else {
        // 	this._boxBM.setRes("acwealthcomingview_box_1");
        // }
        if (!vo.isHaveRedDot()) {
            this._boxBM.setRes("acwealthcomingview_box_1");
            this._redDot.setVisible(false);
        }
    };
    /**拜财神 奖励回调 */
    AcWealthComingView.prototype.weathLuckHandle = function (event) {
        if (event.data.ret) {
            this._isPlay = true;
            this._handlerData = event.data.data.data;
            var isGather = Object.keys(event.data.data.data.buffers).length > 0 ? true : false;
            this.playLotteryAni(isGather);
        }
    };
    /**买一次事件 */
    AcWealthComingView.prototype.oneBtnClick = function () {
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        if (vo.checkIsInEndShowTime()) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
        if (this._isPlay) {
            return;
        }
        if (vo.isFree()) {
            this.request(NetRequestConst.REQUST_ACTIVITY_GETWEATHLUCKYREWARD, { activeId: vo.aidAndCode, fType: 1 });
            this._isPlay = true;
            this._isTen = false;
        }
        else {
            if (Api.playerVoApi.getPlayerGem() < cfg.itemExpend) {
                App.CommonUtil.showTip(LanguageManager.getlocal("gemNotEnough"));
                return;
            }
            this.request(NetRequestConst.REQUST_ACTIVITY_GETWEATHLUCKYREWARD, { activeId: vo.aidAndCode, fType: 2 });
            this._isPlay = true;
            this._isTen = false;
        }
    };
    /**买十次事件 */
    AcWealthComingView.prototype.tenBtnClick = function () {
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        if (vo.checkIsInEndShowTime()) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
        if (Api.playerVoApi.getPlayerGem() < Math.round(cfg.itemExpend * 10 * cfg.discount)) {
            App.CommonUtil.showTip(LanguageManager.getlocal("gemNotEnough"));
            return;
        }
        if (this._isPlay) {
            return;
        }
        this.request(NetRequestConst.REQUST_ACTIVITY_GETWEATHLUCKYREWARD, { activeId: vo.aidAndCode, fType: 3 });
        this._isPlay = true;
        this._isTen = true;
    };
    /**场景动画 */
    AcWealthComingView.prototype.playScenceAni = function () {
        var _this = this;
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        this._sceneBg1.y = this._bg.y + -419;
        this._sceneBg2.y = this._bg.y + -335;
        this._sceneBg3.y = this._bg.y + 1139;
        this._sceneBg4.y = this._bg.y + 1140;
        egret.Tween.get(this._wealthContainer).to({ y: -757 }, 270).call(function () {
            egret.Tween.get(_this._sceneBg1).to({ y: _this._bg.y + 178 }, 260).call(function () {
                egret.Tween.removeTweens(_this._sceneBg1);
            }, _this);
            egret.Tween.get(_this._sceneBg2).wait(260).to({ y: _this._bg.y + 66 }, 200).call(function () {
                egret.Tween.removeTweens(_this._sceneBg2);
            }, _this);
            egret.Tween.get(_this._sceneBg3).wait(130).to({ y: _this._bg.y + 456 }, 530).to({ y: _this._bg.y + 477 }, 70).call(function () {
                egret.Tween.removeTweens(_this._sceneBg3);
            }, _this);
            egret.Tween.get(_this._sceneBg4).wait(130).to({ y: _this._bg.y + 551 }, 270).call(function () {
                egret.Tween.removeTweens(_this._sceneBg4);
            }, _this);
            if (_this._wealthDragonBones) {
                var depth = _this._wealthContainer.getChildIndex(_this._wealthDragonBones);
                _this._wealthContainer.removeChild(_this._wealthDragonBones);
                _this._wealthDragonBones.dispose();
                _this._wealthDragonBones = null;
                _this._wealthDragonBones = App.DragonBonesUtil.getLoadDragonBones("acwealthcomingview_forcewealth", 0, "idle");
                _this._wealthDragonBones.x = _this._buttombg.x + _this._buttombg.width / 2;
                _this._wealthDragonBones.y = _this._buttombg.y + 20;
                _this._wealthContainer.addChildAt(_this._wealthDragonBones, depth);
                _this.playWealthBuffAni("acwealthcomingview_forcewealthbuff", false, vo.isHasWealethBuff());
            }
        }, this).wait(660).to({ y: 0 }, 270).call(function () {
            egret.Tween.removeTweens(_this._wealthContainer);
        }, this);
    };
    /**财神buff特效 */
    AcWealthComingView.prototype.playWealthBuffWordAni = function () {
        var _this = this;
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        if (vo.isHasWealethBuff()) {
            this._wealthBuffTypeBM.setload("acwealthcomingview_blesstitlebg" + vo.getWealethBuffType());
            this._wealthBuffTypeBM.setVisible(true);
            this._wealthBuffTypeBM.setPosition(this._board.x + this._board.width / 2, this._board.y + this._board.height / 2);
            var tempY_1 = this._wealthBuffTypeBM.y;
            egret.Tween.removeTweens(this._wealthBuffTypeBM);
            egret.Tween.get(this._wealthBuffTypeBM).to({ scaleX: 3, scaleY: 3 }, 200).to({ scaleX: 1, scaleY: 1 }, 200).to({ scaleX: 3, scaleY: 3 }, 200).to({ scaleX: 1, scaleY: 1 }, 200).call(function () {
                egret.Tween.removeTweens(_this._wealthBuffTypeBM);
                egret.Tween.get(_this._wealthBuffTypeBM, { loop: true }).to({ y: tempY_1 - 5 }, 1000).wait(100).to({ y: tempY_1 }, 1000).wait(100);
            }, this);
        }
        else {
            this._wealthBuffTypeBM.setVisible(false);
            egret.Tween.removeTweens(this._wealthBuffTypeBM);
        }
    };
    /**抽奖动画1 */
    AcWealthComingView.prototype.playLotteryAni = function (isGather) {
        var _this = this;
        this._temple.setVisible(true);
        this._temple.y = this._bg.y + 500;
        egret.Tween.get(this._temple).to({
            y: this._bg.y + 576,
        }, 200).call(function () {
            egret.Tween.removeTweens(_this._temple);
            if (isGather) {
                _this._wealthDragonBones.playDragonMovie("idle2", 1);
                _this._wealthDragonBones.setDragonBoneEventListener(dragonBones.EventObject.COMPLETE, function () {
                    _this._wealthDragonBones.playDragonMovie('idle', 0);
                }, _this);
                _this._wealthGatherDragonBones.setVisible(true);
                _this._wealthGatherDragonBones.playDragonMovie("idle", 1);
                _this._wealthGatherDragonBones.setDragonBoneEventListener(dragonBones.EventObject.COMPLETE, function () {
                    _this._wealthGatherDragonBones.setVisible(false);
                    _this.platLotteryAni2();
                }, _this);
            }
            else {
                _this.platLotteryAni2();
            }
        }, this);
    };
    /**抽奖动画2 */
    AcWealthComingView.prototype.platLotteryAni2 = function () {
        var _this = this;
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        this._wealthBackDragonBones.setVisible(true);
        this._wealthBackDragonBones.playDragonMovie("idle", 1);
        this._wealthBackDragonBones.setDragonBoneEventListener(dragonBones.EventObject.COMPLETE, function () {
            _this._wealthBackDragonBones.setVisible(false);
        }, this);
        this._wealthForwardDragonBones.setVisible(true);
        this._wealthForwardDragonBones.playDragonMovie("idle", 1);
        this._wealthForwardDragonBones.setDragonBoneEventListener(dragonBones.EventObject.COMPLETE, function () {
            _this._wealthForwardDragonBones.setVisible(false);
            _this.refreshView();
            if (_this._isSecond) {
                _this.playWealthBuffAni("acwealthcomingview_forcewealthbuff", false, vo.isHasWealethBuff());
            }
            else {
                _this.playWealthBuffAni("acwealthcomingview_culturewealthbuff", true, vo.isHasWealethBuff());
            }
            var buffers = _this._handlerData.buffers;
            if (!_this._isTen) {
                buffers = null;
            }
            ViewController.getInstance().openView(ViewConst.POPUP.ACWEALTHCOMINGGETREWARDPOPUPVIEW, {
                rewards: _this._handlerData.rewards, otherRewards: _this._handlerData.otherRewards, isPlayAni: true, buffers: buffers, callback: function () {
                    //进度条动画
                    var vo = Api.acVoApi.getActivityVoByAidAndCode(_this.aid, _this.code);
                    var cfg = Config.AcCfg.getCfgByActivityIdAndCode(_this.aid, _this.code);
                    _this.playWealthBuffWordAni();
                    _this._temple.setVisible(false);
                    var endPercent = 0;
                    if (vo.isSecond() && vo.isSecond() == _this._isSecond) {
                        endPercent = _this._maxLength * vo.getLuckyValue() / cfg.rewardProcessItemCfgList[cfg.rewardProcessItemCfgList.length - 1].value;
                        // if (vo.getLuckyValue() - cfg.rewardProcessItemCfgList[cfg.rewardProcessItemCfgList.length - 1].value >= 0) {
                        // 	this._isPlay = false;
                        // 	return;
                        // }
                        _this.playProgressBarAni(_this._startPercent, endPercent, 0.001);
                    }
                    else {
                        endPercent = _this._maxLength * vo.getLuckyValue() / cfg.luckyProcess;
                        _this.playProgressBarAni(_this._startPercent, endPercent, 0.005);
                    }
                }, handler: _this
            });
        }, this);
    };
    /**buff特效动画 */
    AcWealthComingView.prototype.playWealthBuffAni = function (buffBM, isCultureWealth, isplay) {
        var _this = this;
        if (this._wealthBuffLight == null) {
            this._wealthBuffLight = BaseLoadBitmap.create("acwealthcomingview_wealthbufflight");
            this._wealthBuffLight.width = 351;
            this._wealthBuffLight.height = 352;
            this._wealthBuffLight.anchorOffsetX = this._wealthBuffLight.width / 2;
            this._wealthBuffLight.anchorOffsetY = this._wealthBuffLight.height / 2;
            this._wealthContainer.addChild(this._wealthBuffLight);
        }
        if (this._wealthBuff1 == null) {
            this._wealthBuff1 = BaseLoadBitmap.create(buffBM);
            this._wealthContainer.addChild(this._wealthBuff1);
        }
        if (this._wealthBuff2 == null) {
            this._wealthBuff2 = BaseLoadBitmap.create(buffBM);
            this._wealthContainer.addChild(this._wealthBuff2);
        }
        if (isCultureWealth) {
            this._wealthBuff1.setload(buffBM);
            this._wealthBuff1.width = 450;
            this._wealthBuff1.height = 473;
            this._wealthBuff1.anchorOffsetX = this._wealthBuff1.width / 2;
            this._wealthBuff1.anchorOffsetY = this._wealthBuff1.height / 2;
            this._wealthBuff1.setPosition(this._buttombg.x + this._buttombg.width / 2 + 35, this._buttombg.y - this._wealthBuff1.height / 2 + 50);
            this._wealthBuff2.setload(buffBM);
            this._wealthBuff2.width = 450;
            this._wealthBuff2.height = 473;
            this._wealthBuff2.anchorOffsetX = this._wealthBuff2.width / 2;
            this._wealthBuff2.anchorOffsetY = this._wealthBuff2.height / 2;
            this._wealthBuff2.setPosition(this._buttombg.x + this._buttombg.width / 2 + 35, this._buttombg.y - this._wealthBuff2.height / 2 + 50);
            this._wealthBuffLight.setPosition(this._buttombg.x + this._buttombg.width / 2 + 35, this._buttombg.y - this._wealthBuff2.height / 2 + 50);
        }
        else {
            this._wealthBuff1.setload(buffBM);
            this._wealthBuff1.width = 431;
            this._wealthBuff1.height = 555;
            this._wealthBuff1.anchorOffsetX = this._wealthBuff1.width / 2;
            this._wealthBuff1.anchorOffsetY = this._wealthBuff1.height / 2;
            this._wealthBuff1.setPosition(this._buttombg.x + this._buttombg.width / 2 + 5, this._buttombg.y - this._wealthBuff1.height / 2 + 70);
            this._wealthBuff2.setload(buffBM);
            this._wealthBuff2.width = 431;
            this._wealthBuff2.height = 555;
            this._wealthBuff2.anchorOffsetX = this._wealthBuff2.width / 2;
            this._wealthBuff2.anchorOffsetY = this._wealthBuff2.height / 2;
            this._wealthBuff2.setPosition(this._buttombg.x + this._buttombg.width / 2 + 5, this._buttombg.y - this._wealthBuff2.height / 2 + 70);
            this._wealthBuffLight.setPosition(this._buttombg.x + this._buttombg.width / 2 + 5, this._buttombg.y - this._wealthBuff2.height / 2 + 70);
        }
        this._wealthBuff1.setScale(1);
        this._wealthBuff1.alpha = 0;
        this._wealthBuff2.setScale(1);
        this._wealthBuff2.alpha = 0;
        this._wealthBuffLight.setScale(2);
        this._wealthBuffLight.rotation = 0;
        this._wealthBuffLight.alpha = 0;
        if (isplay) {
            egret.Tween.get(this._wealthBuffLight, { loop: true }).call(function () {
                _this._wealthBuffLight.setScale(2);
                _this._wealthBuffLight.rotation = 0;
                _this._wealthBuffLight.alpha = 1;
            }, this).to({ rotation: 360 }, 13000);
            egret.Tween.get(this._wealthBuff1, { loop: true }).call(function () {
                _this._wealthBuff1.setScale(1);
                _this._wealthBuff1.alpha = 0;
            }, this).to({
                scaleX: 1.125,
                scaleY: 1.125,
                alpha: 1
            }, 1000).to({
                scaleX: 1.25,
                scaleY: 1.25,
                alpha: 0
            }, 1000);
            egret.Tween.get(this._wealthBuff2, { loop: true }).call(function () {
                _this._wealthBuff2.setScale(1);
                _this._wealthBuff2.alpha = 0;
            }, this).wait(1000).to({
                scaleX: 1.125,
                scaleY: 1.125,
                alpha: 1
            }, 1000).to({
                scaleX: 1.25,
                scaleY: 1.25,
                alpha: 0
            }, 1000);
        }
        else {
            egret.Tween.removeTweens(this._wealthBuff1);
            egret.Tween.removeTweens(this._wealthBuff2);
            egret.Tween.removeTweens(this._wealthBuffLight);
        }
    };
    /**跑马灯 */
    AcWealthComingView.prototype.runText = function () {
        var strList = new Array();
        for (var i = 0; i < this._log.length; i++) {
            var logItem = this._log[i];
            var rewardVo = GameData.formatRewardItem(logItem[2])[0];
            var str = LanguageManager.getlocal("acWealthComingViewRunTxt", [logItem[0], rewardVo.name, rewardVo.num]);
            strList.push(str);
        }
        var lampContainer = new LoopLamp(strList);
        lampContainer.y = this._loopTopBg.y + 7;
        this.addChildToContainer(lampContainer);
    };
    /**鞭炮的动画 */
    AcWealthComingView.prototype.playBangerAni = function (bangerBM, startPosX, startPosY, endPosX, endPosY) {
        var _this = this;
        this._isPlay = true;
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        bangerBM.setVisible(false);
        var boomEffect = ComponentManager.getCustomMovieClip("bangereffect", 8, 70);
        var boom = BaseBitmap.create("bangereffect1");
        boomEffect.setScale(1.25);
        boom.setScale(1.25);
        boomEffect.setPosition(startPosX - boom.width * 1.25 / 2, startPosY - boom.height * 1.25 / 2);
        this.addChildToContainer(boomEffect);
        boomEffect.playWithTime(1);
        boomEffect.setEndCallBack(function () {
            _this.container.removeChild(boomEffect);
            boomEffect.dispose();
            _this._lightBall.setPosition(startPosX, startPosY);
            _this._lightBall.alpha = 1;
            _this._lightBall.setScale(0.1);
            _this._lightBall.rotation = 0;
            var distanceX = endPosX - startPosX;
            var distanceY = endPosY - startPosY;
            egret.Tween.get(_this._lightBall).to({
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
                if (vo.isHaveRedDot()) {
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
                    if (vo.isHaveRedDot()) {
                        _this._redDot.setVisible(true);
                    }
                    else {
                        _this._redDot.setVisible(false);
                    }
                    egret.Tween.removeTweens(_this._boxBM);
                    bangerBM.setVisible(true);
                    var startPercentTmp = Math.round(_this._startPercent * 1000);
                    var maxLengthTmp = Math.round(_this._maxLength * 1000);
                    console.log("startPercentTmp:  " + startPercentTmp);
                    console.log("maxLengthTmp:  " + maxLengthTmp);
                    //有一些差值范围
                    if ((vo.isSecond() != _this._isSecond) && Math.abs(startPercentTmp - maxLengthTmp) < 10) {
                        _this.playScenceAni();
                        _this._isSecond = vo.isSecond();
                        _this._isPlay = true;
                        for (var i = 0; i < _this._bangerInfo.length; i++) {
                            _this._bangerInfo[i].bangerBM.setVisible(false);
                        }
                        _this.playProgressBarAni(_this._startPercent, _this._maxLength * cfg.luckyProcess / cfg.rewardProcessItemCfgList[cfg.rewardProcessItemCfgList.length - 1].value, 0.01);
                    }
                }, _this);
                egret.Tween.get(_this._boxLightBM).to({
                    scaleX: 1,
                    scaleY: 1,
                    alpha: 0,
                }, 750).call(function () {
                    egret.Tween.removeTweens(_this._boxLightBM);
                }, _this);
            }, _this).to({
                scaleX: 1.3,
                scaleY: 1,
                rotation: 360 * 1,
                alpha: 0,
            }, 460).call(function () {
                egret.Tween.removeTweens(_this._lightBall);
            }, _this);
        }, this);
    };
    /**
     * 进度条的动画
     */
    AcWealthComingView.prototype.playProgressBarAni = function (startPercent, endPercent, speed) {
        var _this = this;
        this._isPlay = true;
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        //每次初始化
        this._progressBar.setPercentage(startPercent);
        egret.Tween.removeTweens(this._progressBar);
        this._progressBM.setPosition(this._progressBar.x + this._progressBar.width * startPercent, this._progressBar.y);
        this._progressLight.setPosition(this._progressBar.x + this._progressBar.width * startPercent, this._progressBar.y + this._progressBar.height / 2);
        var startTemp = Math.round(startPercent * 1000);
        var endTemp = Math.round(endPercent * 1000);
        var maxTemp = Math.round(this._maxLength * 1000);
        var everyTimeValue = speed;
        var op = true;
        if (startTemp < endTemp) {
            op = true;
        }
        else {
            op = false;
        }
        egret.Tween.get(this._progressBar, { loop: true }).wait(0.1).call(function () {
            _this._progressLight.setVisible(true);
            if (op) {
                //增量动画
                startPercent += everyTimeValue;
                _this.refreshBanger(startPercent);
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
            }
            else {
                //第二阶段动画
                startPercent -= everyTimeValue;
                _this.refreshBanger(startPercent);
                startTemp = Math.round(startPercent * 1000);
                if (startTemp < endTemp) {
                    egret.Tween.removeTweens(_this._progressBar);
                    _this._progressLight.setVisible(false);
                    _this._startPercent = _this._maxLength * vo.getLuckyValue() / cfg.rewardProcessItemCfgList[cfg.rewardProcessItemCfgList.length - 1].value;
                    _this.initBanger();
                    _this.playProgressBarAni(startPercent, _this._startPercent, 0.005);
                    _this._isPlay = false;
                    return;
                }
            }
            if (startTemp > maxTemp) {
                _this.refreshBanger(startPercent);
                egret.Tween.removeTweens(_this._progressBar);
                _this._progressLight.setVisible(false);
                _this._isPlay = false;
                return;
            }
            _this.refreshBanger(startPercent);
            _this._progressBar.setPercentage(startPercent);
            _this._progressBM.setPosition(_this._progressBar.x + _this._progressBar.width * startPercent, _this._progressBar.y);
            _this._progressLight.setPosition(_this._progressBar.x + _this._progressBar.width * startPercent, _this._progressBar.y + _this._progressBar.height / 2);
            _this._startPercent = startPercent;
        }, this);
    };
    AcWealthComingView.prototype.tick = function () {
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        this._timeTF.text = LanguageManager.getlocal("acWealthComingViewLastTime", [vo.acCountDown]);
    };
    /**发送信息 */
    AcWealthComingView.prototype.getRequestData = function () {
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        return { requestType: NetRequestConst.REQUST_ACTIVITY_GETWEATHLUCKYLOG, requestData: { activeId: vo.aidAndCode } };
    };
    /**收到消息 */
    AcWealthComingView.prototype.receiveData = function (data) {
        if (data.ret) {
            this._log = data.data.data.log;
        }
    };
    AcWealthComingView.prototype.getBgName = function () {
        return null;
    };
    AcWealthComingView.prototype.getTitleBgName = function () {
        return null;
    };
    AcWealthComingView.prototype.getTitleStr = function () {
        return null;
    };
    AcWealthComingView.prototype.getRuleInfo = function () {
        return "acWealthComingViewRuleInfo";
    };
    AcWealthComingView.prototype.getProbablyInfo = function () {
        return "acWealthComingViewProbablyInfo-" + this.code;
    };
    AcWealthComingView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat(["acwealthcomingview_progressspirit", "acwealthcomingview_numbg",
            "acwealthcomingview_progresslight", "progress12_bg", "progress12", "acwealthcomingview_numbg", "acwealthcomingview_progressflag",
            "acwealthcomingview_progressspirit", "bangereffect", "acmaydaynumbg"
        ]);
    };
    AcWealthComingView.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUST_ACTIVITY_GETWEATHLUCKYREWARD, this.weathLuckHandle, this);
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUST_ACTIVITY_GETWEATHREWARD, this.refreshBangerHandele, this);
        egret.Tween.removeTweens(this._wealthBuff1);
        egret.Tween.removeTweens(this._wealthBuff2);
        ;
        egret.Tween.removeTweens(this._wealthBuffLight);
        egret.Tween.removeTweens(this._lightBall);
        egret.Tween.removeTweens(this._boxBM);
        egret.Tween.removeTweens(this._boxLightBM);
        egret.Tween.removeTweens(this._progressBar);
        egret.Tween.removeTweens(this._temple);
        egret.Tween.removeTweens(this._wealthBuffTypeBM);
        egret.Tween.removeTweens(this._sceneBg1);
        egret.Tween.removeTweens(this._sceneBg2);
        egret.Tween.removeTweens(this._sceneBg3);
        egret.Tween.removeTweens(this._sceneBg4);
        egret.Tween.removeTweens(this._wealthContainer);
        this._progressBar = null;
        this._progressBM = null;
        this._progressTF = null;
        this._progressLight = null;
        this._oneNeedNumTF = null;
        this._numTF = null;
        this._boxBM = null;
        this._bangerContainer = null;
        this._bangerInfo.length = 0;
        this._maxLength = 0.95;
        this._startPercent = 0;
        this._boxLightBM = null;
        this._lightBall = null;
        this._log = null;
        this._loopTopBg = null;
        this._isSecond = false;
        this._isPlay = false;
        this._wealthDragonBones = null;
        this._wealthForwardDragonBones = null;
        this._wealthBackDragonBones = null;
        this._wealthGatherDragonBones = null;
        this._wealthBuff1 = null;
        this._wealthBuff2 = null;
        this._wealthBuffLight = null;
        this._buttombg = null;
        this._handlerData = null;
        this._temple = null;
        this._board = null;
        this._bg = null;
        this._wealthBuffTypeBM = null;
        this._wealthContainer = null;
        this._scenceContainer = null;
        this._sceneBg1 = null;
        this._sceneBg2 = null;
        this._sceneBg3 = null;
        this._sceneBg4 = null;
        this._timeTF = null;
        this._isTen = false;
        this._redDot = null;
        this._progressBg = null;
        // this._progressBar = null;
        _super.prototype.dispose.call(this);
    };
    return AcWealthComingView;
}(AcCommonView));
__reflect(AcWealthComingView.prototype, "AcWealthComingView");
//# sourceMappingURL=AcWealthComingView.js.map