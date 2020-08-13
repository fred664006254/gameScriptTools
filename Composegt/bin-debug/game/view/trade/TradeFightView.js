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
var TradeFightView = (function (_super) {
    __extends(TradeFightView, _super);
    function TradeFightView() {
        var _this = _super.call(this) || this;
        _this._dialogueBg = null;
        // private _dialogueBg2:BaseBitmap =null;
        _this.dialogueContainer = null;
        _this.dialogueDesTxt = null;
        _this.mysilverTxt = null;
        _this.othersSilverTxt = null;
        _this.animationTime = 0;
        _this.tradeGoldNum = 0;
        _this.txtScalse = 0;
        return _this;
    }
    TradeFightView.prototype.getTitleStr = function () {
        return "";
    };
    TradeFightView.prototype.initView = function () {
        var _this = this;
        this.animationTime = 1 * 100;
        this.tradeGoldNum = 0;
        this.txtScalse = 1.2;
        // let bg = BaseBitmap.create("trade_bg2");
        // this.addChild(bg);
        this.dialogueContainer = new BaseDisplayObjectContainer();
        this.addChild(this.dialogueContainer);
        var biddingBg = BaseBitmap.create("trade_pb_bottombg");
        this.addChild(biddingBg);
        biddingBg.setPosition(0, GameConfig.stageHeigth / 2 - 270);
        this._biddingBg = biddingBg;
        //名字背景
        var trade_biaoti = BaseBitmap.create("trade_biaoti");
        this.addChild(trade_biaoti);
        trade_biaoti.setPosition(GameConfig.stageWidth / 2 - trade_biaoti.width / 2 + 5, biddingBg.y + 142);
        //名字
        var myNameTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, 0x311712);
        myNameTxt.text = Api.playerVoApi.getPlayerName();
        myNameTxt.setPosition(biddingBg.x + 120 - myNameTxt.width / 2, biddingBg.y + 380);
        this.addChild(myNameTxt);
        var silverIcon = BaseBitmap.create("public_icon2");
        this.addChild(silverIcon);
        silverIcon.setPosition(biddingBg.x + 20, biddingBg.y + 250);
        var mygoldNumber = 0;
        if (this.param.data && this.param.data.consumeGold) {
            mygoldNumber = this.param.data.consumeGold + Api.playerVoApi.getPlayerGold();
        }
        var silverTxt = undefined;
        if (PlatformManager.checkIsViSp()) {
            silverTxt = ComponentManager.getTextField("", 20);
        }
        else {
            silverTxt = ComponentManager.getBitmapText("", "recharge2_fnt");
            silverTxt.setScale(0.65);
        }
        // ComponentManager.getTextField("12345",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_WHITE);
        silverTxt.text = mygoldNumber + "";
        silverTxt.y = silverIcon.y + 15;
        silverTxt.x = silverIcon.x + silverIcon.width;
        silverTxt.width = 400;
        this.addChild(silverTxt);
        this.mysilverTxt = silverTxt;
        var servant_infoPro2 = BaseBitmap.create("trade_zhi");
        this.addChild(servant_infoPro2);
        servant_infoPro2.setPosition(silverIcon.x + 35, silverIcon.y + 30);
        var intelligenceTxt = ComponentManager.getTextField("12345", 20, TextFieldConst.COLOR_WHITE);
        intelligenceTxt.text = App.StringUtil.changeIntToText(Api.playerVoApi.getInte());
        intelligenceTxt.setPosition(servant_infoPro2.x + servant_infoPro2.width, servant_infoPro2.y + 15);
        this.addChild(intelligenceTxt);
        var cid = Number(Api.tradeVoApi.getCurrentCid());
        if (this.param.data.rdata.data.fightflag == 1) {
            cid -= 1;
        }
        var tradeCfg = Config.TradeCfg.getTradeCfgById(cid.toString());
        if (tradeCfg) {
            var myNameTxt2 = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, 0x311712);
            myNameTxt2.text = this.param.data.tradeName; //tradeCfg.tradeName;
            myNameTxt2.setPosition(biddingBg.x + 520 - myNameTxt2.width / 2, myNameTxt.y);
            this.addChild(myNameTxt2);
            var silverIcon2 = BaseBitmap.create("public_icon2");
            this.addChild(silverIcon2);
            silverIcon2.setPosition(biddingBg.x + 425, silverIcon.y);
            var silverTxt2 = undefined;
            if (PlatformManager.checkIsViSp()) {
                silverTxt2 = ComponentManager.getTextField("", 20);
            }
            else {
                silverTxt2 = ComponentManager.getBitmapText("", "recharge2_fnt");
                silverTxt2.setScale(0.65);
            }
            silverTxt2.setScale(silverTxt.scaleX);
            // ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_WHITE);
            silverTxt2.text = App.StringUtil.changeIntToText(this.param.data.tradeGold); //tradeCfg.tradeGold+"";
            silverTxt2.setPosition(silverIcon2.x + silverIcon2.width, silverTxt.y);
            silverTxt2.width = 300;
            this.addChild(silverTxt2);
            this.othersSilverTxt = silverTxt2;
            this.tradeGoldNum = tradeCfg.tradeGold;
            var servant_infoPro21 = BaseBitmap.create("trade_zhi");
            this.addChild(servant_infoPro21);
            servant_infoPro21.scaleX = servant_infoPro2.scaleX;
            servant_infoPro21.scaleY = servant_infoPro2.scaleY;
            servant_infoPro21.setPosition(silverIcon2.x + 35, servant_infoPro2.y);
            var intelligenceTxt2 = ComponentManager.getTextField("1234", 20, TextFieldConst.COLOR_WHITE);
            intelligenceTxt2.text = App.StringUtil.changeIntToText(this.param.data.tradeInte);
            intelligenceTxt2.setPosition(servant_infoPro21.x + servant_infoPro21.width, intelligenceTxt.y);
            this.addChild(intelligenceTxt2);
        }
        // 商贸对话文字
        this.dialogueDesTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        this.dialogueDesTxt.text = LanguageManager.getlocal("dialogueDes");
        // this.dialogueDesTxt.width =this._dialogueBg.width-15;
        this.dialogueDesTxt.setPosition(GameConfig.stageWidth / 2 - this.dialogueDesTxt.width / 2, biddingBg.y + biddingBg.height + 50);
        this.addChild(this.dialogueDesTxt);
        this.closeBtn.touchEnabled = false;
        App.DisplayUtil.changeToGray(this.closeBtn);
        var ths = this;
        var timerNum2 = egret.setTimeout(function () {
            if (!ths.isInit()) {
                egret.clearTimeout(timerNum2);
                return;
            }
            _this.dialogueContainer.visible = false;
            _this.playSilver();
        }, ths, 800, 1);
    };
    TradeFightView.prototype.playSilver = function () {
        var _this = this;
        var ths = this;
        var tradeCfg = Api.tradeVoApi.getCurrentTradeCfg();
        // 我方钱数开始值
        var myStartNum = this.param.data.consumeGold + Api.playerVoApi.getPlayerGold();
        // 我方钱数结束值
        var myEndNum = Api.playerVoApi.getPlayerGold();
        // 对方钱数开始值
        var otherStartNum = this.param.data.tradeGold;
        // 对方钱数结束值
        var otherEndNum = Api.tradeVoApi.getBattleResult(Api.playerVoApi.getInte(), myStartNum, this.param.data.tradeInte, this.param.data.tradeGold).left2;
        // 开始时间
        var startTime = egret.getTimer();
        // 结束时间 （播放2秒）
        var endTime = startTime + 2000;
        var curTimePre2 = egret.getTimer() - 1200;
        var timerNum = egret.setInterval(function () {
            // 当前时间
            var curTime = egret.getTimer();
            var curTimePre = (curTime - startTime) / (endTime - startTime);
            if (!ths.isInit()) {
                egret.clearInterval(timerNum);
                return;
            }
            var mySilverNum = myStartNum - curTimePre * (myStartNum - myEndNum);
            //对方的钱减少
            var otherSilverNum = otherStartNum - curTimePre * (otherStartNum - otherEndNum);
            var isGoldAni = false;
            if (curTime - curTimePre2 >= 1200 && mySilverNum > 0 && otherSilverNum > 0) {
                isGoldAni = true;
                curTimePre2 = curTime - 1200;
            }
            if (_this.mysilverTxt) {
                _this.mysilverTxt.text = Math.floor(mySilverNum) + "";
                if (isGoldAni) {
                    _this.showGoldAni(true);
                }
            }
            if (_this.othersSilverTxt) {
                _this.othersSilverTxt.text = Math.floor(otherSilverNum) + "";
                if (isGoldAni) {
                    _this.showGoldAni(false);
                }
            }
            if (curTime >= endTime) {
                egret.clearInterval(timerNum);
                _this.closeBtn.touchEnabled = true;
                App.DisplayUtil.changeToNormal(_this.closeBtn);
                if (_this.param.data.rdata.data.fightflag == 0) {
                    _this.mysilverTxt.text = "0";
                    if (_this.othersSilverTxt) {
                        _this.othersSilverTxt.text = App.StringUtil.changeIntToText(otherEndNum);
                        if (isGoldAni) {
                            _this.showGoldAni(false);
                        }
                    }
                    _this.isWin();
                    return;
                }
                else {
                    _this.mysilverTxt.text = Api.playerVoApi.getPlayerGoldStr();
                    if (isGoldAni) {
                        _this.showGoldAni();
                    }
                    if (_this.othersSilverTxt) {
                        _this.othersSilverTxt.text = "0";
                    }
                    _this.isWin();
                    return;
                }
            }
        }, ths, 10, 1);
    };
    TradeFightView.prototype.showGoldAni = function (isSelf) {
        if (isSelf === void 0) { isSelf = true; }
        var bezierlICon = new BezierlIcon();
        this.addChild(bezierlICon);
        var delay = App.MathUtil.getRandom();
        var mH = App.MathUtil.getRandom(40, 70);
        if (!isSelf) {
            bezierlICon.x = this._biddingBg.x + 100;
            bezierlICon.y = this._biddingBg.y + 315;
            bezierlICon.startBezier(190, -10, 70, -mH, delay);
        }
        else {
            bezierlICon.x = this._biddingBg.x + 500;
            bezierlICon.y = this._biddingBg.y + 315;
            bezierlICon.startBezier(-190, -10, -110, -mH, delay * 1.5);
        }
    };
    TradeFightView.prototype.isWin = function () {
        var _this = this;
        var ths = this;
        var timerNum3 = egret.setTimeout(function () {
            if (!ths.isInit()) {
                egret.clearTimeout(timerNum3);
                return;
            }
            _this.openIsWin();
        }, ths, 2000, 1);
    };
    TradeFightView.prototype.openIsWin = function () {
        var data = this.param.data;
        if (data) {
            if (data.rdata.data.fightflag == 1) {
                ViewController.getInstance().openView(ViewConst.COMMON.TRADEINFOPOPUPVIEW, data);
            }
            else if (data.rdata.data.fightflag == 0) {
                ViewController.getInstance().openView(ViewConst.BASE.PROMPTVIEW, { type: 5, f: this.endCallBack, o: this });
            }
            ViewController.getInstance().hideView(ViewConst.COMMON.TRADEFIGHTVIEW);
        }
    };
    TradeFightView.prototype.endCallBack = function () {
        ViewController.getInstance().hideView(ViewConst.COMMON.TRADEFIGHTVIEW);
    };
    TradeFightView.prototype.dispose = function () {
        this.tradeGoldNum = 0;
        this.txtScalse = 0;
        this.dialogueContainer = null;
        this.mysilverTxt = null;
        this.othersSilverTxt = null;
        this.animationTime = 0;
        this._dialogueBg = null;
        this._biddingBg = null;
        // this._dialogueBg2=null;
        _super.prototype.dispose.call(this);
    };
    return TradeFightView;
}(BaseView));
__reflect(TradeFightView.prototype, "TradeFightView");
var BezierlIcon = (function (_super) {
    __extends(BezierlIcon, _super);
    function BezierlIcon() {
        var _this = _super.call(this) || this;
        _this.prePosX = 0;
        _this.prePosY = 0;
        _this.endPosX = 0;
        _this.endPosY = 0;
        _this.midPosX = 0;
        _this.midPosY = 0;
        _this.visible = false;
        return _this;
    }
    BezierlIcon.prototype.startBezier = function (endPosX, endPosY, midPosX, midPosY, delayTime) {
        var _this = this;
        this.endPosX = endPosX; //180;
        this.endPosY = endPosY; //-20
        this.midPosX = midPosX; //180;
        this.midPosY = midPosY; //-20
        this.prePosX = this.x;
        this.prePosY = this.y;
        var silverIcon = BaseBitmap.create("public_icon2");
        delayTime = delayTime || 0;
        this.addChild(silverIcon);
        var silverIcon2 = BaseBitmap.create("public_icon2");
        silverIcon2.x = App.MathUtil.getRandom(0, 40);
        silverIcon2.y = -App.MathUtil.getRandom(10, 50);
        this.addChild(silverIcon);
        var silverIcon3 = BaseBitmap.create("public_icon2");
        silverIcon3.x = -App.MathUtil.getRandom(10, 30);
        silverIcon3.y = -App.MathUtil.getRandom(20, 40);
        this.addChild(silverIcon);
        egret.Tween.get(this, { loop: false }).wait(delayTime).set({ visible: true }).to({ factor: 1 }, 160).call(function () {
            _this.visible = false;
            _this.parent.removeChild(_this);
        }, this);
    };
    Object.defineProperty(BezierlIcon.prototype, "factor", {
        get: function () {
            return 0;
        },
        set: function (value) {
            // this.x += (1 - value) * (1 - value) * 100 + 2 * value * (1 - value) * 300 + value * value * 100;
            // this.y += (1 - value) * (1 - value) * 100 + 2 * value * (1 - value) * 300 + value * value * 500;
            this.x = this.prePosX + (1 - value) * (1 - value) * 0 + 2 * value * (1 - value) * this.midPosX + value * value * this.endPosX;
            this.y = this.prePosY + (1 - value) * (1 - value) * 0 + 2 * value * (1 - value) * this.midPosY + value * value * this.endPosY;
        },
        enumerable: true,
        configurable: true
    });
    return BezierlIcon;
}(BaseDisplayObjectContainer));
__reflect(BezierlIcon.prototype, "BezierlIcon");
