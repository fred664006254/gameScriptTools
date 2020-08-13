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
  * 中秋活动 Tab1
  * @author 张朝阳
  * date 2018/8/28
  * @class AcMidAutumnViewTab1
  */
var AcMidAutumnViewTab1 = (function (_super) {
    __extends(AcMidAutumnViewTab1, _super);
    function AcMidAutumnViewTab1() {
        var _this = _super.call(this) || this;
        _this._findNumTF = null;
        _this._progress = null;
        _this._boxInfoList = [];
        _this._oneNeedNumTF = null;
        _this._isSendMessage = false;
        _this._activityID = null;
        _this._maxBoxNum = 0;
        _this._guanghuanBM = null;
        _this._guanghuanContainer = null;
        _this._bg = null;
        _this._type = null;
        _this._speakStr = null;
        _this._speakTF = null;
        _this._speakTail = null;
        _this._speakBg = null;
        _this._servantBM = null;
        _this._messageLength = 0;
        /**
         * 记录一下奖励
         */
        _this._nowReward = null;
        _this._timeTF = null;
        _this._timeBg = null;
        _this.talkState = 0;
        //抽奖类型:单抽1/十连2
        _this.lotteryType = 0;
        egret.callLater(_this.initView, _this);
        return _this;
        // this.initView();
    }
    AcMidAutumnViewTab1.prototype.initView = function () {
        var _this = this;
        App.MessageHelper.addNetMessage(NetRequestConst.ACTIVITY_GETMIDAUTUMNLOTTERY, this.lotteryHandle, this);
        App.MessageHelper.addNetMessage(NetRequestConst.ACTIVITY_GETMIDAUTUMNITEMA, this.receiveBoxHandle, this);
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        this._activityID = this.aid + "-" + this.code;
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        this._maxBoxNum = cfg.getBoxList()[cfg.getBoxList().length - 1].needNum;
        var bg = BaseLoadBitmap.create(this.getUiResStr('bg'));
        bg.width = 611;
        bg.height = 730;
        var bgPos = this.getUiPos('bg', bg);
        bg.setPosition(bgPos.x, bgPos.y);
        this._bg = bg;
        this.addChild(bg);
        //遮照
        var bgY = bg.y;
        var bglazyHeght = bg.y;
        if (bgY >= 10) {
            bgY = 0;
            bglazyHeght = 0;
        }
        else {
            bgY = Math.abs(bg.y) + 10;
        }
        var maskRect = new egret.Rectangle(0, bgY, bg.width, bg.height - Math.abs(bglazyHeght));
        if (this.checkIsSaveBeauty()) {
            maskRect = new egret.Rectangle(0, 0, bg.width, GameConfig.stageHeigth - this.y - 250);
        }
        bg.mask = maskRect;
        if (this.checkIsSaveBeauty()) {
            //英雄救美董卓貂蝉侍卫
            var middleContainer = new BaseDisplayObjectContainer();
            middleContainer.name = 'middleContainer';
            this.addChild(middleContainer);
            middleContainer.x = bg.x;
            middleContainer.y = bg.y;
            this.dzIcon = BaseBitmap.create(this.getUiResStr('dzIcon'));
            middleContainer.addChild(this.dzIcon);
            this.dzIcon.setPosition(0, 20);
            if (this.getTypeCode() == "5") {
                this.dzIcon.y = 0;
            }
            middleContainer.mask = maskRect;
        }
        else {
            // 光晕的动画
            this._guanghuanContainer = new BaseDisplayObjectContainer();
            this._guanghuanBM = BaseBitmap.create("acmidautumnview_guanghuan");
            this._guanghuanBM.anchorOffsetX = this._guanghuanBM.width / 2;
            this._guanghuanBM.anchorOffsetY = this._guanghuanBM.height / 2;
            // this._guanghuanBM.scaleY = 0.35;
            //草 相关的特效
            // 草 1 
            var gress1effect = ComponentManager.getCustomMovieClip("gress1_", 5, 200);
            gress1effect.setScale(1.33);
            gress1effect.setPosition(bg.x + bg.width - gress1effect.width - 95 - 100, bg.y + bg.height - gress1effect.height - 135 - 80);
            this._guanghuanContainer.setPosition(gress1effect.x + gress1effect.width / 2, gress1effect.y + gress1effect.height);
            egret.Tween.get(this._guanghuanBM, { loop: true }).to({ rotation: 360 }, 2000);
            this._guanghuanContainer.addChild(this._guanghuanBM);
            this._guanghuanContainer.scaleY = 0.35;
            this._guanghuanBM.blendMode = egret.BlendMode.ADD;
            this.addChild(this._guanghuanContainer);
            this.addChild(gress1effect);
            gress1effect.playWithTime(-1);
            gress1effect.addTouchTap(this.effectClick, this, ["1"]);
            // 草 2 
            var gress2effect = ComponentManager.getCustomMovieClip("gress2_", 5, 200);
            gress2effect.setScale(1.33);
            gress2effect.setPosition(bg.x + 300 + 20, bg.y + bg.height - gress2effect.height - 130);
            this.addChild(gress2effect);
            gress2effect.playWithTime(-1);
            gress2effect.addTouchTap(this.effectClick, this, ["2"]);
            // 草 3 
            var gress3effect = ComponentManager.getCustomMovieClip("gress3_", 5, 200);
            gress3effect.setScale(1.33);
            gress3effect.setPosition(bg.x + 450 + 30, bg.y + bg.height - gress2effect.height - 160);
            this.addChild(gress3effect);
            gress3effect.playWithTime(-1);
            gress3effect.addTouchTap(this.effectClick, this, ["3"]);
            if (App.CommonUtil.check_dragon()) {
                var droWifeIcon = App.DragonBonesUtil.getLoadDragonBones("wife_full_218");
                droWifeIcon.setScale(0.7);
                droWifeIcon.skewY = 180;
                droWifeIcon.x = bg.x + 190;
                droWifeIcon.y = bg.y + bg.height + 5;
                this.addChild(droWifeIcon);
            }
            else {
                // wife 的 图片
                var scaleNum = 0.6;
                var wifeBM = BaseLoadBitmap.create("wife_full_218");
                wifeBM.width = 640;
                wifeBM.height = 840;
                wifeBM.setScale(scaleNum);
                wifeBM.skewY = 180;
                wifeBM.setPosition(bg.x + wifeBM.width * scaleNum - 30, bg.y + bg.height - wifeBM.height * scaleNum + 5);
                this.addChild(wifeBM);
            }
            //说的话相关
            var talkBg = BaseBitmap.create("public_9_bg25");
            talkBg.width = 360;
            var talkTF = ComponentManager.getTextField(LanguageManager.getlocal("acmidAutumnWifeTalk"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BLACK);
            talkTF.width = 320;
            talkBg.height = talkTF.height + 20;
            talkBg.setPosition(bg.x + 244, bg.y + bg.height - 460);
            talkTF.setPosition(talkBg.x + 20, talkBg.y + 10);
            this.addChild(talkBg);
            this.addChild(talkTF);
            var tailBM = BaseBitmap.create("public_9_bg25_tail");
            tailBM.setPosition(talkBg.x + 30, talkBg.y + talkBg.height - 3);
            this.addChild(tailBM);
        }
        var infoBtn = ComponentManager.getButton(this.getUiResStr('infoBtn'), '', this.infoBtnClick, this);
        var infoBtnPos = this.getUiPos('infoBtn', infoBtn, bg);
        infoBtn.setPosition(infoBtnPos.x, infoBtnPos.y);
        this.addChild(infoBtn);
        // 进度相关
        var buttombg = BaseBitmap.create("public_9_bg49");
        buttombg.width = 612;
        buttombg.height = 110;
        var buttombgPos = this.getUiPos('buttombg', buttombg, bg);
        buttombg.setPosition(buttombgPos.x, buttombgPos.y);
        this.addChild(buttombg);
        var numBg = BaseBitmap.create("common_numbg");
        numBg.setPosition(buttombg.x - 2, buttombg.y + buttombg.height / 2 - numBg.height / 2);
        this.addChild(numBg);
        var numTFStr = LanguageManager.getlocal("acMidAutumnNumTitle");
        if (this.checkIsSaveBeauty()) {
            numTFStr = LanguageManager.getlocal("acMidAutumnNumTitle-" + this.code);
        }
        var numTF = ComponentManager.getTextField(numTFStr, TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        numTF.setPosition(numBg.x + numBg.width / 2 - numTF.width / 2, numBg.y + numBg.height - numTF.height - 5);
        this.addChild(numTF);
        this._findNumTF = ComponentManager.getTextField("999", TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._findNumTF.width = 50;
        this._findNumTF.textAlign = egret.HorizontalAlign.CENTER;
        this._findNumTF.setPosition(numBg.x + numBg.width / 2 - this._findNumTF.width / 2, numBg.y + 12);
        this.addChild(this._findNumTF);
        this._progress = ComponentManager.getProgressBar("progress7", "progress7_bg", 482);
        this._progress.setPosition(buttombg.x + 103, buttombg.y + buttombg.height - this._progress.height - 25);
        this.addChild(this._progress);
        //一次相关
        var oneBtnPos = this.getUiPos('oneBtn', null, buttombg);
        var oneBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "", this.oneBtnClick, this);
        oneBtn.setPosition(oneBtnPos.x, oneBtnPos.y);
        this.addChild(oneBtn);
        var oneBtnIcon = BaseLoadBitmap.create(this.getUiResStr('oneBtnReward'));
        oneBtnIcon.width = 35;
        oneBtnIcon.height = 35;
        oneBtnIcon.setPosition(oneBtn.x + oneBtn.width / 2 - oneBtnIcon.width / 2 + 12, oneBtn.y + oneBtn.height / 2 - oneBtnIcon.height / 2);
        this.addChild(oneBtnIcon);
        var oneBtnIconTF = ComponentManager.getTextField(LanguageManager.getlocal("acPunishBuyItemBuy"), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_BLACK);
        oneBtnIconTF.setPosition(oneBtnIcon.x - oneBtnIconTF.width, oneBtnIcon.y + oneBtnIcon.height / 2 - oneBtnIconTF.height / 2);
        this.addChild(oneBtnIconTF);
        var oneBtnIconNum = ComponentManager.getTextField("X1", TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_BLACK);
        oneBtnIconNum.setPosition(oneBtnIcon.x + oneBtnIcon.width, oneBtnIcon.y + oneBtnIcon.height / 2 - oneBtnIconNum.height / 2);
        this.addChild(oneBtnIconNum);
        var oneGemBM = BaseBitmap.create("public_icon1");
        oneGemBM.width = 42;
        oneGemBM.height = 42;
        oneGemBM.setPosition(oneBtn.x + oneBtn.width / 2 - oneGemBM.width, oneBtn.y - oneGemBM.height + 5);
        this.addChild(oneGemBM);
        this._oneNeedNumTF = ComponentManager.getTextField(String(cfg.cost), TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._oneNeedNumTF.setPosition(oneGemBM.x + oneGemBM.width, oneGemBM.y + oneGemBM.height / 2 - this._oneNeedNumTF.height / 2);
        this.addChild(this._oneNeedNumTF);
        var findOneTF = ComponentManager.getTextField(LanguageManager.getlocal("acMidAutumnFindOne" + this.getLangCode()), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        findOneTF.setPosition(oneBtn.x + oneBtn.width / 2 - findOneTF.width / 2, oneBtn.y + oneBtn.height + 2);
        this.addChild(findOneTF);
        //十次相关
        var tenBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "", this.tenBtnClick, this);
        var tenBtnPos = this.getUiPos('tenBtn', tenBtn, buttombg);
        tenBtn.setPosition(tenBtnPos.x, tenBtnPos.y);
        this.addChild(tenBtn);
        var tenBtnIcon = BaseLoadBitmap.create(this.getUiResStr('oneBtnReward'));
        tenBtnIcon.width = 35;
        tenBtnIcon.height = 35;
        tenBtnIcon.setPosition(tenBtn.x + tenBtn.width / 2 - tenBtnIcon.width / 2 + 12, tenBtn.y + tenBtn.height / 2 - tenBtnIcon.height / 2);
        this.addChild(tenBtnIcon);
        var tenBtnIconTF = ComponentManager.getTextField(LanguageManager.getlocal("acPunishBuyItemBuy"), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_BLACK);
        tenBtnIconTF.setPosition(tenBtnIcon.x - tenBtnIconTF.width, tenBtnIcon.y + tenBtnIcon.height / 2 - tenBtnIconTF.height / 2);
        this.addChild(tenBtnIconTF);
        var tenBtnIconNum = ComponentManager.getTextField("X10", TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_BLACK);
        tenBtnIconNum.setPosition(tenBtnIcon.x + tenBtnIcon.width, tenBtnIcon.y + tenBtnIcon.height / 2 - tenBtnIconNum.height / 2);
        this.addChild(tenBtnIconNum);
        var tenGemBM = BaseBitmap.create("public_icon1");
        tenGemBM.width = 42;
        tenGemBM.height = 42;
        tenGemBM.setPosition(tenBtn.x + tenBtn.width / 2 - tenGemBM.width, tenBtn.y - tenGemBM.height + 5);
        this.addChild(tenGemBM);
        var tenNeedGemTF = ComponentManager.getTextField(String(cfg.cost * 10 * cfg.discount), TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        tenNeedGemTF.setPosition(tenGemBM.x + tenGemBM.width, tenGemBM.y + tenGemBM.height / 2 - tenNeedGemTF.height / 2);
        this.addChild(tenNeedGemTF);
        var findTenTF = ComponentManager.getTextField(LanguageManager.getlocal("acMidAutumnFindTen" + this.getLangCode()), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        findTenTF.setPosition(tenBtn.x + tenBtn.width / 2 - findTenTF.width / 2, tenBtn.y + tenBtn.height + 2);
        this.addChild(findTenTF);
        //英雄救美单抽和十连左边有武器图标,有奖池展示icon,有倒计时bg
        if (this.checkIsSaveBeauty()) {
            var findOneSword = BaseLoadBitmap.create(this.getUiResStr('findOneSword'));
            var findTenSword = BaseLoadBitmap.create(this.getUiResStr('findTenSword'));
            this.addChild(findOneSword);
            this.addChild(findTenSword);
            findOneSword.setScale(0.5);
            findTenSword.scaleX = -0.5;
            findTenSword.scaleY = 0.5;
            findOneSword.setPosition(oneGemBM.x - 125, oneGemBM.y - 25);
            findTenSword.setPosition(tenGemBM.x - 25, tenGemBM.y - 15);
            //奖池展示icon
            var rewardShowBtn = ComponentManager.getButton(this.getUiResStr('rewardShowBtn'), '', function () {
                ViewController.getInstance().openView(ViewConst.POPUP.ACMIDAUTUMNREWARDPOPUPVIEW, { "code": _this.code, "aid": _this.aid });
            }, this);
            rewardShowBtn.setPosition(infoBtn.x, infoBtn.y - 100);
            this.addChild(rewardShowBtn);
            var timeBg = BaseBitmap.create('public_9_downbg');
            timeBg.width = bg.width;
            timeBg.height = 120;
            timeBg.setPosition(bg.x + bg.width / 2 - timeBg.width / 2, buttombg.y - 120);
            this.addChild(timeBg);
            var acTime = ComponentManager.getTextField(LanguageManager.getlocal('acMidAutumnTime', [vo.acTimeAndHour]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
            acTime.width = bg.width - 100;
            acTime.textAlign = egret.HorizontalAlign.CENTER;
            acTime.setPosition(bg.x + bg.width / 2 - acTime.width / 2, timeBg.y + timeBg.height - acTime.height - 10);
            this.addChild(acTime);
        }
        this._timeBg = BaseBitmap.create("public_9_bg61");
        var timeBgPos = this.getUiPos('timeBg', this._timeBg, buttombg);
        this._timeBg.y = timeBgPos.y;
        this.addChild(this._timeBg);
        this._timeTF = ComponentManager.getTextField(LanguageManager.getlocal("acLuckyDrawTopTip2-1", [vo.acCountDown]), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._timeBg.width = 60 + this._timeTF.width;
        this._timeBg.x = timeBgPos.x;
        this._timeTF.setPosition(this._timeBg.x + this._timeBg.width / 2 - this._timeTF.width / 2, this._timeBg.y + this._timeBg.height / 2 - this._timeTF.height / 2);
        this.addChild(this._timeTF);
        var tipTFStr = '';
        if (this.checkIsSaveBeauty() && Api.switchVoApi.checkServantRefuseBattle()) {
            tipTFStr = LanguageManager.getlocal("acmidAutumnTip" + this.getLangCode() + '_with_OpenRefusal');
        }
        else {
            tipTFStr = LanguageManager.getlocal("acmidAutumnTip" + this.getLangCode());
        }
        var tipTF = ComponentManager.getTextField(tipTFStr, TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_WARN_YELLOW);
        tipTF.textAlign = egret.HorizontalAlign.CENTER;
        tipTF.setPosition(bg.x + bg.width / 2 - tipTF.width / 2, this._timeBg.y + 35);
        if (this.checkIsSaveBeauty()) {
            tipTF.lineSpacing = 5;
            tipTF.width = bg.width - 100;
            tipTF.setPosition(bg.x + bg.width / 2 - tipTF.width / 2, this._timeBg.y + 45);
        }
        this.addChild(tipTF);
        if (this.checkIsSaveBeauty()) {
            this.initSaveBeautyTalk();
        }
        else {
            this.effectClick(null, "2");
        }
        this.initBox();
        this.refreshView();
        TickManager.addTick(this.tick, this);
        this.tick();
    };
    AcMidAutumnViewTab1.prototype.getTypeCode = function () {
        if (this.code == "6") {
            return "5";
        }
        return this.code;
    };
    AcMidAutumnViewTab1.prototype.getUiResStr = function (resKey) {
        var resStr;
        if (this.checkIsSaveBeauty()) {
            switch (resKey) {
                case 'bg':
                    resStr = ResourceManager.hasRes('herosavebeauty_middlebg-' + this.getTypeCode()) ? 'herosavebeauty_middlebg-' + this.getTypeCode() : 'herosavebeauty_middlebg';
                    break;
                case 'infoBtn':
                    resStr = ResourceManager.hasRes('herosavebeauty_introbtn-' + this.getTypeCode()) ? 'herosavebeauty_introbtn-' + this.getTypeCode() : 'herosavebeauty_introbtn';
                    break;
                case 'rewardShowBtn':
                    resStr = ResourceManager.hasRes('herosavebeauty_rewordshowbtn-' + this.getTypeCode()) ? 'herosavebeauty_rewordshowbtn-' + this.getTypeCode() : 'herosavebeauty_rewordshowbtn';
                    break;
                case 'dzIcon':
                    resStr = ResourceManager.hasRes('herosavebeauty_dongzhuo_1-' + this.getTypeCode()) ? 'herosavebeauty_dongzhuo_1-' + this.getTypeCode() : 'herosavebeauty_dongzhuo_1';
                    break;
                case 'findOneSword':
                    resStr = ResourceManager.hasRes('herosavebeauty_findonesword-' + this.getTypeCode()) ? 'herosavebeauty_findonesword-' + this.getTypeCode() : 'herosavebeauty_findonesword';
                    break;
                case 'findTenSword':
                    resStr = ResourceManager.hasRes('herosavebeauty_findtensword-' + this.getTypeCode()) ? 'herosavebeauty_findtensword-' + this.getTypeCode() : 'herosavebeauty_findtensword';
                    break;
                case 'oneBtnReward':
                    resStr = 'itemicon1061';
                    break;
                default:
                    resStr = '';
                    break;
            }
        }
        else {
            switch (resKey) {
                case 'bg':
                    resStr = 'acmidautumnview_bg';
                    break;
                case 'infoBtn':
                    resStr = 'acmidautumnview_infobtn';
                    break;
                case 'oneBtnReward':
                    resStr = 'itemicon1001';
                    break;
                default:
                    resStr = '';
                    break;
            }
        }
        return resStr;
    };
    AcMidAutumnViewTab1.prototype.getUiPos = function (resKey, self, other) {
        var resPos = { x: 0, y: 0 };
        if (this.checkIsSaveBeauty()) {
            switch (resKey) {
                case 'bg':
                    resPos = { x: GameConfig.stageWidth / 2 - self.width / 2, y: 14.5 };
                    break;
                case 'oneBtn':
                    resPos = { x: 120, y: other.y + other.height + 35 };
                    break;
                case 'tenBtn':
                    resPos = { x: GameConfig.stageWidth - self.width - 80, y: other.y + other.height + 35 };
                    break;
                case 'buttombg':
                    resPos = { x: this._bg.x + other.width / 2 - self.width / 2, y: GameConfig.stageHeigth - this.y - 250 };
                    break;
                case 'infoBtn':
                    resPos = { x: other.x + 10, y: other.y + 120 };
                    break;
                case 'timeBg':
                    resPos = { x: this._bg.x + this._bg.width / 2 - self.width / 2, y: other.y - 145 };
                    break;
                default:
                    resPos = { x: 0, y: 0 };
                    break;
            }
        }
        else {
            switch (resKey) {
                case 'bg':
                    resPos = { x: GameConfig.stageWidth / 2 - self.width / 2, y: GameConfig.stageHeigth - this.getViewTitleButtomY() - self.height - 250 };
                    break;
                case 'oneBtn':
                    resPos = { x: 85, y: other.y + other.height + 35 };
                    break;
                case 'tenBtn':
                    resPos = { x: GameConfig.stageWidth - self.width - 90, y: other.y + other.height + 35 };
                    break;
                case 'buttombg':
                    resPos = { x: other.x + other.width / 2 - self.width / 2, y: other.y + other.height };
                    break;
                case 'infoBtn':
                    resPos = { x: other.x + 10, y: other.y + other.height - self.height - 10 };
                    break;
                case 'timeBg':
                    resPos = { x: this._bg.x + this._bg.width / 2 - self.width / 2, y: 15 };
                    break;
                default:
                    resPos = { x: 0, y: 0 };
                    break;
            }
        }
        return resPos;
    };
    AcMidAutumnViewTab1.prototype.getLangCode = function () {
        var code = '';
        if (this.checkIsSaveBeauty()) {
            code = '-' + this.code;
        }
        return code;
    };
    AcMidAutumnViewTab1.prototype.tick = function () {
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        if (vo.checkIsInEndShowTime()) {
            this._timeTF.text = LanguageManager.getlocal("acPunishEnd");
        }
        else {
            this._timeTF.text = LanguageManager.getlocal("acLuckyDrawTopTip2-1", [vo.acCountDown]);
        }
        this._timeBg.width = 60 + this._timeTF.width;
        this._timeBg.x = this._bg.x + this._bg.width / 2 - this._timeBg.width / 2;
        this._timeTF.setPosition(this._timeBg.x + this._timeBg.width / 2 - this._timeTF.width / 2, this._timeBg.y + this._timeBg.height / 2 - this._timeTF.height / 2);
    };
    /**
     * 抽奖的返回数据
     */
    AcMidAutumnViewTab1.prototype.lotteryHandle = function (event) {
        var _this = this;
        var ret = event.data.ret;
        if (ret) {
            var data_1 = event.data.data.data;
            if (this.checkIsSaveBeauty()) {
                var dzStr = ResourceManager.hasRes("herosavebeauty_dongzhuo_2-" + this.getTypeCode()) ? "herosavebeauty_dongzhuo_2-" + this.getTypeCode() : "herosavebeauty_dongzhuo_2";
                this.dzIcon.setRes(dzStr);
                if (App.CommonUtil.check_dragon()) {
                    var lotteryEffectRes = '';
                    var lotterySoundRes_1 = '';
                    if (this.lotteryType == 1) {
                        lotteryEffectRes = 'acmidautumnview_dao';
                        lotterySoundRes_1 = 'effect_acmaze_attack1';
                    }
                    else if (this.lotteryType == 2) {
                        lotteryEffectRes = 'acmidautumnview_mao';
                        lotterySoundRes_1 = 'effect_acmaze_attack2';
                    }
                    this.lotteryType = 0;
                    var lottery_1 = App.DragonBonesUtil.getLoadDragonBones(lotteryEffectRes, 1, 'idle', function () {
                        SoundManager.playEffect(lotterySoundRes_1);
                    });
                    var middleContainer = this.getChildByName('middleContainer');
                    lottery_1.setPosition(middleContainer.x + 266, middleContainer.y + 356);
                    if (this.getTypeCode() == "5") {
                        lottery_1.setPosition(middleContainer.x + 450, middleContainer.y + 400);
                    }
                    this.addChild(lottery_1);
                    lottery_1.setDragonBoneEventListener(dragonBones.EventObject.COMPLETE, function () {
                        var dz1Str = ResourceManager.hasRes("herosavebeauty_dongzhuo_1-" + _this.getTypeCode()) ? "herosavebeauty_dongzhuo_1-" + _this.getTypeCode() : "herosavebeauty_dongzhuo_1";
                        _this.dzIcon.setRes(dz1Str);
                        var rewards = data_1.otherrewards;
                        var otherReward = data_1.noterewards;
                        ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW, { "rewards": rewards, "otherRewards": otherReward, "isPlayAni": true });
                        _this.refreshView();
                        _this._isSendMessage = false;
                        _this.removeChild(lottery_1);
                        lottery_1.dispose();
                        lottery_1 = null;
                    }, this);
                }
                else {
                    var lottery_2 = ComponentManager.getCustomMovieClip("atkrace_reward_anim", 7, 80);
                    lottery_2.name = 'lottery';
                    var middleContainer = this.getChildByName('middleContainer');
                    lottery_2.setPosition(middleContainer.x + 70, middleContainer.y + 20);
                    if (this.getTypeCode() == "5") {
                        lottery_2.setPosition(middleContainer.x + 220, middleContainer.y + 20);
                    }
                    this.addChild(lottery_2);
                    lottery_2.playWithTime(1);
                    // let a:BaseLoadDragonBones;
                    // a.setPosition(this.dzIcon.x,this.dzIcon.y);
                    // a.setDragonBoneEventListener(dragonBones.EventObject.COMPLETE,()=>{
                    // },this)
                    lottery_2.setEndCallBack(function () {
                        var dz1Str = ResourceManager.hasRes("herosavebeauty_dongzhuo_1-" + _this.getTypeCode()) ? "herosavebeauty_dongzhuo_1-" + _this.getTypeCode() : "herosavebeauty_dongzhuo_1";
                        _this.dzIcon.setRes(dz1Str);
                        var rewards = data_1.otherrewards;
                        var otherReward = data_1.noterewards;
                        ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW, { "rewards": rewards, "otherRewards": otherReward, "isPlayAni": true });
                        _this.refreshView();
                        _this._isSendMessage = false;
                        //this.removeChild(lottery);
                        lottery_2.dispose();
                        lottery_2 = null;
                    }, this);
                }
            }
            else {
                var lottery_3 = ComponentManager.getCustomMovieClip("lottery_", 10, 150);
                lottery_3.blendMode = egret.BlendMode.ADD;
                if (this._type == "1") {
                    lottery_3.setScale(0.6);
                    lottery_3.x = this._bg.x + 380;
                    lottery_3.y = this._bg.y + this._bg.height - 270;
                }
                else if (this._type == "2") {
                    lottery_3.setScale(0.8);
                    lottery_3.x = this._bg.x + 280;
                    lottery_3.y = this._bg.y + this._bg.height - 195;
                }
                else if (this._type == "3") {
                    lottery_3.setScale(0.7);
                    lottery_3.x = this._bg.x + 440;
                    lottery_3.y = this._bg.y + this._bg.height - 210;
                }
                this.addChild(lottery_3);
                lottery_3.playWithTime(1);
                lottery_3.setEndCallBack(function () {
                    var rewards = data_1.otherrewards;
                    var otherReward = data_1.noterewards;
                    ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW, { "rewards": rewards, "otherRewards": otherReward, "isPlayAni": true });
                    _this.refreshView();
                    _this._isSendMessage = false;
                    _this.removeChild(lottery_3);
                    lottery_3.dispose();
                    lottery_3 = null;
                }, this);
            }
            // let rewards = data.otherrewards;
            // let otherReward = data.noterewards;
            // ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW,{"rewards":rewards,"otherRewards":otherReward,"isPlayAni":true});
            // this.refreshView();
        }
    };
    /**
     * 宝箱的返回数据
     */
    AcMidAutumnViewTab1.prototype.receiveBoxHandle = function (event) {
        var ret = event.data.ret;
        if (ret) {
            var data = event.data.data.data;
            var rewards_1 = data.rewards;
            if (rewards_1 != this._nowReward) {
                var rewardItemvo = GameData.formatRewardItem(this._nowReward)[0];
                var servantReward = Config.ServantCfg.getServantItemById(rewardItemvo.id);
                ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD, {
                    "name": servantReward.name, "touch": servantReward.exchange, "message": "changeOtherRewardTip", "callback": function () {
                        ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW, { "rewards": rewards_1, "isPlayAni": true });
                    }, "handler": this
                });
            }
            else {
                ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW, { "rewards": rewards_1, "isPlayAni": true });
            }
            this.refreshView();
        }
        // console.log("1");
    };
    /**
     * 刷新UI
     */
    AcMidAutumnViewTab1.prototype.refreshView = function () {
        this.refreshTF();
        this.refreshBox();
        this.refreshProgress();
    };
    AcMidAutumnViewTab1.prototype.refreshProgress = function () {
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        var percent = vo.lotteryNum() / this._maxBoxNum;
        this._progress.setPercentage(percent);
    };
    AcMidAutumnViewTab1.prototype.refreshTF = function () {
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        if (vo.isFree) {
            this._oneNeedNumTF.text = LanguageManager.getlocal("sysFreeDesc");
        }
        else {
            this._oneNeedNumTF.text = String(cfg.cost);
        }
        this._findNumTF.text = String(vo.lotteryNum());
    };
    /**
     * 刷新宝箱
     */
    AcMidAutumnViewTab1.prototype.refreshBox = function () {
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        var boxCfg = cfg.getBoxList();
        for (var i = 0; i < this._boxInfoList.length; i++) {
            var needNum = boxCfg[i].needNum;
            var voNum = vo.lotteryNum();
            var isRevice = vo.boxStatus(boxCfg[i].id);
            if (needNum <= voNum) {
                if (isRevice) {
                    this._boxInfoList[i].box.setRes("common_box_3");
                    this._boxInfoList[i].boxLight.setVisible(false);
                    egret.Tween.removeTweens(this._boxInfoList[i].box);
                    egret.Tween.removeTweens(this._boxInfoList[i].boxLight);
                }
                else {
                    this._boxInfoList[i].box.setRes("common_box_2");
                    this._boxInfoList[i].boxLight.setVisible(true);
                    egret.Tween.get(this._boxInfoList[i].boxLight, { loop: true }).to({ rotation: this._boxInfoList[i].boxLight.rotation + 360 }, 10000);
                    egret.Tween.get(this._boxInfoList[i].box, { loop: true }).to({ rotation: 10 }, 50).to({ rotation: -10 }, 100).to({ rotation: 10 }, 100).to({ rotation: 0 }, 50).wait(500);
                }
            }
            else {
                this._boxInfoList[i].box.setRes("common_box_1");
                this._boxInfoList[i].boxLight.setVisible(false);
                egret.Tween.removeTweens(this._boxInfoList[i].box);
                egret.Tween.removeTweens(this._boxInfoList[i].boxLight);
            }
        }
    };
    /**
     * 初始化宝箱
     */
    AcMidAutumnViewTab1.prototype.initBox = function () {
        var _this = this;
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        var boxCfg = cfg.getBoxList();
        var maxNum = boxCfg[boxCfg.length - 1].needNum;
        var _loop_1 = function (i) {
            var offestX = 0;
            if (i == 1) {
                offestX = 7;
            }
            else if (i == boxCfg.length - 1) {
                offestX = -10;
            }
            var boxbg = BaseBitmap.create("common_boxbg");
            var posX = this_1._progress.x + (boxCfg[i].needNum / maxNum) * this_1._progress.width;
            boxbg.setPosition(posX - boxbg.width / 2 + offestX, this_1._progress.y - boxbg.height);
            this_1.addChild(boxbg);
            var boxLight = BaseBitmap.create("acturantable_taskbox_light");
            boxLight.anchorOffsetX = boxLight.width / 2;
            boxLight.anchorOffsetY = boxLight.height / 2;
            boxLight.setPosition(boxbg.x + boxbg.width / 2, boxbg.y + boxbg.height / 2);
            this_1.addChild(boxLight);
            var box = BaseBitmap.create("common_box_1");
            box.anchorOffsetX = box.width / 2;
            box.anchorOffsetY = box.height / 2;
            box.setScale(0.75);
            box.setPosition(boxLight.x, boxLight.y);
            this_1.addChild(box);
            box.addTouchTap(function (even) {
                var vo = Api.acVoApi.getActivityVoByAidAndCode(_this.aid, _this.code);
                var voNum = vo.lotteryNum();
                var isRevice = vo.boxStatus(boxCfg[i].id);
                var needNum = boxCfg[i].needNum;
                if (vo.isStart) {
                    if (needNum <= voNum) {
                        if (!isRevice) {
                            _this._nowReward = boxCfg[i].getReward;
                            NetManager.request(NetRequestConst.ACTIVITY_GETMIDAUTUMNITEMA, { "activeId": _this._activityID, "lotteryId": boxCfg[i].id });
                            return;
                        }
                    }
                    ViewController.getInstance().openView(ViewConst.POPUP.ACMIDAUTUMNREWARDINFOPOPUPVIEW, { "code": _this.code, "aid": _this.aid, "itemCfg": boxCfg[i] });
                }
                else {
                    vo.showAcEndTip();
                }
            }, this_1);
            var boxDesc = ComponentManager.getTextField(LanguageManager.getlocal("acMidAutumnBoxNum" + this_1.getLangCode(), [String(boxCfg[i].needNum)]), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
            boxDesc.setPosition(posX - boxDesc.width / 2 + offestX, this_1._progress.y + this_1._progress.height + 3);
            this_1.addChild(boxDesc);
            if (i == boxCfg.length - 1) {
                if (!this_1.checkIsSaveBeauty()) {
                    this_1._speakStr = LanguageManager.getlocal("acmidAutumnSpeakTip");
                    this_1._speakTF = ComponentManager.getTextField(this_1._speakStr, TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_BLACK);
                    this_1._speakTail = BaseBitmap.create("public_9_bg25_tail");
                    this_1._speakBg = BaseBitmap.create("public_9_bg25");
                    this_1._speakBg.width = this_1._speakTF.width + 40;
                    var posX_1 = box.x;
                    if (posX_1 + this_1._speakBg.width + 5 > GameConfig.stageWidth) {
                        posX_1 = GameConfig.stageWidth - this_1._speakBg.width - 15;
                    }
                    this_1._speakBg.setPosition(posX_1, box.y - box.height / 2 - this_1._speakBg.height - this_1._speakTail.height + 5);
                    this_1.addChild(this_1._speakBg);
                    this_1._speakTF.setPosition(this_1._speakBg.x + this_1._speakBg.width / 2 - this_1._speakTF.width / 2, this_1._speakBg.y + this_1._speakBg.height / 2 - this_1._speakTF.height / 2);
                    this_1.addChild(this_1._speakTF);
                    this_1._speakTail.skewY = 180;
                    this_1._speakTail.setPosition(box.x, box.y - box.height / 2 - this_1._speakTail.height);
                    this_1.addChild(this_1._speakTail);
                    this_1._servantBM = BaseLoadBitmap.create("servant_half_1052");
                    var scale = 0.33;
                    this_1._servantBM.height = 177;
                    this_1._servantBM.width = 180;
                    this_1._servantBM.setScale(scale);
                    this_1._servantBM.setPosition(this_1._speakBg.x - this_1._servantBM.width * scale / 2, this_1._speakBg.y + this_1._speakBg.height - this_1._servantBM.height * scale);
                    this_1.addChild(this_1._servantBM);
                    egret.Tween.get(this_1._speakBg, { loop: true }).call(function () {
                        _this._speakTF.text = "";
                        _this._speakTail.setVisible(true);
                        _this._servantBM.setVisible(true);
                        _this._speakTF.setVisible(true);
                        _this._speakBg.setVisible(true);
                        _this._messageLength = 0;
                        egret.Tween.get(_this._speakTF, { loop: true }).wait(150).call(function () {
                            _this._speakTF.text = _this._speakStr.substr(0, _this._messageLength);
                            _this._messageLength++;
                        }, _this);
                    }, this_1).wait(this_1._speakStr.length * 150 + 2000).call(function () {
                        _this._speakTail.setVisible(false);
                        _this._servantBM.setVisible(false);
                        _this._speakTF.setVisible(false);
                        _this._speakBg.setVisible(false);
                        _this._messageLength = 0;
                        egret.Tween.removeTweens(_this._speakTF);
                    }, this_1).wait(10000);
                }
            }
            var boxInfo = { "box": box, "boxLight": boxLight };
            this_1._boxInfoList.push(boxInfo);
        };
        var this_1 = this;
        for (var i = 0; i < boxCfg.length; i++) {
            _loop_1(i);
        }
    };
    AcMidAutumnViewTab1.prototype.initSaveBeautyTalk = function () {
        this.talkState = 1;
        this.initNpcTalk('dz');
    };
    AcMidAutumnViewTab1.prototype.initNpcTalk = function (npc) {
        var _this = this;
        var dzTalkContainer = null;
        var dzStr = '';
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        if (!vo || !this.talkState)
            return;
        if (npc == 'dz') {
            dzTalkContainer = this.dzTalkContainer;
        }
        else if (npc == 'dc') {
            dzTalkContainer = this.dcTalkContainer;
        }
        if (vo.lotteryNum() < 100) {
            if (!this.dzTalkIdx || this.dzTalkIdx < 1) {
                this.dzTalkIdx = 1;
            }
            else {
                if (npc == 'dz') {
                    this.dzTalkIdx = 3 - this.dzTalkIdx;
                }
            }
            if (this.getTypeCode() == "5") {
                dzStr = LanguageManager.getlocal('acmidAutumnTalk' + npc + this.dzTalkIdx + "-" + this.code);
            }
            else {
                dzStr = LanguageManager.getlocal('acmidAutumnTalk' + npc + this.dzTalkIdx);
            }
        }
        else {
            if (!this.dzTalkIdx || this.dzTalkIdx < 3) {
                this.dzTalkIdx = 3;
            }
            else {
                if (npc == 'dz') {
                    this.dzTalkIdx = 7 - this.dzTalkIdx;
                }
            }
            if (this.getTypeCode() == "5") {
                dzStr = LanguageManager.getlocal('acmidAutumnTalk' + npc + this.dzTalkIdx + "-" + this.code);
            }
            else {
                dzStr = LanguageManager.getlocal('acmidAutumnTalk' + npc + this.dzTalkIdx);
            }
        }
        if (dzTalkContainer) {
            dzTalkContainer.removeChildren();
        }
        else {
            dzTalkContainer = new BaseDisplayObjectContainer();
            if (npc == 'dz') {
                this.dzTalkContainer = dzTalkContainer;
            }
            else if (npc == 'dc') {
                this.dcTalkContainer = dzTalkContainer;
            }
            this.addChild(dzTalkContainer);
        }
        var dzTalkLength = 0;
        var dzTF = ComponentManager.getTextField(dzStr, TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_BLACK);
        var dzTail = BaseBitmap.create("public_9_bg25_tail");
        var dzTFBg = BaseBitmap.create("public_9_bg25");
        dzTFBg.name = 'dzTFBg';
        dzTF.name = 'dzTF';
        dzTFBg.width = dzTF.width + 40;
        if (npc == 'dz') {
            if (this.getTypeCode() == "5") {
                dzTFBg.setPosition(this._bg.x + 280, this._bg.y + 15);
            }
            else {
                dzTFBg.setPosition(this._bg.x + 180, this._bg.y + 15);
            }
        }
        else if (npc == 'dc') {
            if (this.getTypeCode() == "5") {
                dzTFBg.setPosition(this._bg.x + 180, this._bg.y + 170);
            }
            else {
                dzTFBg.setPosition(this._bg.x + 280, this._bg.y + 120);
            }
        }
        dzTalkContainer.addChild(dzTFBg);
        dzTF.setPosition(dzTFBg.x + dzTFBg.width / 2 - dzTF.width / 2, dzTFBg.y + dzTFBg.height / 2 - dzTF.height / 2);
        dzTalkContainer.addChild(dzTF);
        dzTail.setPosition(dzTFBg.x + 40, dzTFBg.y + dzTFBg.height - 3.3);
        dzTalkContainer.addChild(dzTail);
        egret.Tween.get(dzTFBg, { loop: false }).call(function () {
            dzTF.text = "";
            dzTail.setVisible(true);
            dzTF.setVisible(true);
            dzTFBg.setVisible(true);
            dzTalkLength = 0;
            egret.Tween.get(dzTF, { loop: true }).wait(150).call(function () {
                dzTF.text = dzStr.substr(0, dzTalkLength);
                dzTalkLength++;
            }, _this);
        }, this).wait(dzStr.length * 150 + 2000).call(function () {
            dzTail.setVisible(false);
            dzTF.setVisible(false);
            dzTFBg.setVisible(false);
            dzTalkLength = 0;
            egret.Tween.removeTweens(dzTF);
            if (npc == 'dz') {
                egret.setTimeout(function () {
                    _this.initNpcTalk('dc');
                }, _this, 5000);
            }
            else if (npc == 'dc') {
                egret.setTimeout(function () {
                    _this.initNpcTalk('dz');
                }, _this, 5000);
            }
        }, this);
    };
    /**
     * 查看信息
     */
    AcMidAutumnViewTab1.prototype.infoBtnClick = function () {
        if (this.checkIsSaveBeauty()) {
            ViewController.getInstance().openView(ViewConst.POPUP.ACMIDAUTUMNPREVIEWPOPUPVIEW, { "code": this.code, "aid": this.aid });
        }
        else {
            ViewController.getInstance().openView(ViewConst.POPUP.ACMIDAUTUMNACINFOPOPUPVIEW, { "code": this.code, "aid": this.aid });
        }
    };
    /**
     * 买一次
     */
    AcMidAutumnViewTab1.prototype.oneBtnClick = function () {
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        var deltaT = vo.et - GameData.serverTime - 86400 * 1;
        if (deltaT < 0) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
        if (this._isSendMessage) {
            return;
        }
        var cost = cfg.cost;
        if (vo.isFree) {
            cost = 0;
        }
        if (Api.playerVoApi.getPlayerGem() < cost) {
            App.CommonUtil.showTip(LanguageManager.getlocal("gemNotEnough"));
            return;
        }
        NetManager.request(NetRequestConst.ACTIVITY_GETMIDAUTUMNLOTTERY, { "activeId": this._activityID, "isTenPlay": 0 });
        this._isSendMessage = true;
        this.lotteryType = 1;
    };
    /**
     * 买十次
     */
    AcMidAutumnViewTab1.prototype.tenBtnClick = function () {
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        var deltaT = vo.et - GameData.serverTime - 86400 * 1;
        if (deltaT < 0) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
        if (this._isSendMessage) {
            return;
        }
        var cost = cfg.cost * 10 * cfg.discount;
        if (Api.playerVoApi.getPlayerGem() < cost) {
            App.CommonUtil.showTip(LanguageManager.getlocal("gemNotEnough"));
            return;
        }
        NetManager.request(NetRequestConst.ACTIVITY_GETMIDAUTUMNLOTTERY, { "activeId": this._activityID, "isTenPlay": 1 });
        this._isSendMessage = true;
        this.lotteryType = 2;
    };
    /**
     * 特效的监听时间
     */
    AcMidAutumnViewTab1.prototype.effectClick = function (event, type) {
        this._type = type;
        if (type == "1") {
            this._guanghuanBM.setScale(0.6);
            this._guanghuanContainer.setPosition(this._bg.x + 480, this._bg.y + this._bg.height - 140);
        }
        else if (type == "2") {
            this._guanghuanBM.setScale(0.8);
            this._guanghuanContainer.setPosition(this._bg.x + 405, this._bg.y + this._bg.height - 30);
        }
        else if (type == "3") {
            this._guanghuanBM.setScale(0.7);
            this._guanghuanContainer.setPosition(this._bg.x + 550, this._bg.y + this._bg.height - 60);
        }
    };
    //是否是英雄救美
    AcMidAutumnViewTab1.prototype.checkIsSaveBeauty = function () {
        if (this.code == '3' || this.code == '4' || this.getTypeCode() == '5') {
            return true;
        }
        else {
            return false;
        }
    };
    AcMidAutumnViewTab1.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(NetRequestConst.ACTIVITY_GETMIDAUTUMNLOTTERY, this.lotteryHandle, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.ACTIVITY_GETMIDAUTUMNITEMA, this.receiveBoxHandle, this);
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        if (this.checkIsSaveBeauty()) {
            this.talkState = 0;
            if (this.dcTalkContainer) {
                egret.Tween.removeTweens(this.dcTalkContainer.getChildByName('dzTFBg'));
                egret.Tween.removeTweens(this.dcTalkContainer.getChildByName('dzTF'));
            }
            if (this.dzTalkContainer) {
                egret.Tween.removeTweens(this.dzTalkContainer.getChildByName('dzTFBg'));
                egret.Tween.removeTweens(this.dzTalkContainer.getChildByName('dzTF'));
            }
        }
        else {
            egret.Tween.removeTweens(this._speakTF);
            egret.Tween.removeTweens(this._speakBg);
        }
        TickManager.removeTick(this.tick, this);
        this._findNumTF = null;
        this._progress = null;
        this._oneNeedNumTF = null;
        this._isSendMessage = false;
        this._boxInfoList = [];
        this._maxBoxNum = null;
        this._guanghuanBM = null;
        this._speakStr = null;
        this._speakTF = null;
        this._speakTail = null;
        this._speakBg = null;
        this._servantBM = null;
        this._messageLength = 0;
        this._nowReward = null;
        this._timeTF = null;
        this._timeBg = null;
        this.dzTalkContainer = null;
        this.dcTalkContainer = null;
        this.dzIcon = null;
        this.dzTalkIdx = 0;
        this.talkState = 0;
        this.lotteryType = 0;
        _super.prototype.dispose.call(this);
    };
    return AcMidAutumnViewTab1;
}(AcCommonViewTab));
__reflect(AcMidAutumnViewTab1.prototype, "AcMidAutumnViewTab1");
//# sourceMappingURL=AcMidAutumnViewTab1.js.map