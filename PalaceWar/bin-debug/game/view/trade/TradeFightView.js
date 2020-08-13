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
        _this._dialogueBg2 = null;
        _this.dialogueContainer = null;
        _this.dialogueDesTxt = null;
        _this.mysilverTxt = null;
        _this.othersSilverTxt = null;
        _this.animationTime = 0;
        _this.tradeGoldNum = 0;
        _this.txtScalse = 0;
        _this._timerNum = 0;
        return _this;
    }
    TradeFightView.prototype.initView = function () {
        var _this = this;
        this.animationTime = 1 * 100;
        this.tradeGoldNum = 0;
        this.txtScalse = 1.2;
        var bg = BaseBitmap.create("trade_bg2");
        this.addChild(bg);
        this.dialogueContainer = new BaseDisplayObjectContainer();
        this.addChild(this.dialogueContainer);
        this.showDialogue();
        var biddingBg = BaseBitmap.create("trade_pb_bottombg");
        this.addChild(biddingBg);
        biddingBg.setPosition(0, GameConfig.stageHeigth - 230);
        //名字背景
        var tradeFight_name_bg = BaseBitmap.create("atkrace_name_bg");
        this.addChild(tradeFight_name_bg);
        tradeFight_name_bg.width = 200;
        tradeFight_name_bg.height = 40;
        tradeFight_name_bg.setPosition(30, GameConfig.stageHeigth - 200);
        //名字
        var myNameTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
        myNameTxt.text = Api.playerVoApi.getPlayerName();
        myNameTxt.setPosition(tradeFight_name_bg.x + 60, tradeFight_name_bg.y + 10);
        this.addChild(myNameTxt);
        //银两
        var leftBg = BaseBitmap.create("public_9_resbg");
        leftBg.scaleX = -1;
        this.addChild(leftBg);
        leftBg.setPosition(200, GameConfig.stageHeigth - 150);
        var silverIcon = BaseBitmap.create("public_icon2");
        this.addChild(silverIcon);
        silverIcon.setPosition(155, leftBg.y);
        var mygoldNumber = 0;
        if (this.param.data && this.param.data.consumeGold) {
            mygoldNumber = this.param.data.consumeGold + Api.playerVoApi.getPlayerGold();
        }
        var silverTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
        silverTxt.text = mygoldNumber + "";
        silverTxt.setPosition(70, GameConfig.stageHeigth - 138);
        silverTxt.x = -250;
        silverTxt.width = 400;
        silverTxt.textAlign = "right";
        this.addChild(silverTxt);
        this.mysilverTxt = silverTxt;
        //智力
        var leftBg2 = BaseBitmap.create("public_9_resbg");
        leftBg2.scaleX = -1;
        this.addChild(leftBg2);
        leftBg2.setPosition(200, GameConfig.stageHeigth - 100);
        var servant_infoPro2 = BaseBitmap.create("public_icon_zhi");
        this.addChild(servant_infoPro2);
        servant_infoPro2.scaleX = 0.9;
        servant_infoPro2.scaleY = 0.9;
        servant_infoPro2.setPosition(158, GameConfig.stageHeigth - 98);
        var addInfo = Api.tradeVoApi.getDecreePolicyAddAttrInfo();
        var addV = 0;
        if (addInfo && addInfo.lastTimes > 0) {
            addV = Math.floor(Api.playerVoApi.getInte() * addInfo.addExtent);
        }
        if (Api.otherInfoVoApi.isHasScene("303", "searchScene")) {
            var abilitycfg = Config.SceneCfg.getSceneCfgBySceneName("searchScene", "303").personalityCfg;
            if (abilitycfg.buffValue) {
                addV += Api.playerVoApi.getInte() * abilitycfg.buffValue;
                addV = Math.floor(addV + 0.5);
            }
        }
        var intelligenceTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
        intelligenceTxt.text = (Api.playerVoApi.getInte() + addV).toFixed(0);
        intelligenceTxt.setPosition(150, servant_infoPro2.y + 10);
        this.addChild(intelligenceTxt);
        intelligenceTxt.anchorOffsetX = intelligenceTxt.width;
        this.showOpponentInfo();
        this._timerNum = egret.setInterval(function () {
            if (!_this.isInit()) {
                egret.clearInterval(_this._timerNum);
                return;
            }
            _this.playgoldAnimalition();
        }, this, 200);
    };
    TradeFightView.prototype.playgoldAnimalition = function () {
        var moveY = GameConfig.stageHeigth - 230 - 169;
        // var arrX:Array<number> =[100,160,140,300,360,400,420];
        // var arrY:Array<number> =[-100,-190,-20,-90,-10,-40,-50];
        // var moveTime:Array<number> =[500,600,400,800,900,820,320];
        for (var i = 0; i < 3; i++) {
            var _x = App.MathUtil.getRandom(1, 7);
            var num = App.MathUtil.getRandom(1, 3);
            var goldB = BaseBitmap.create("jpgold_" + num);
            goldB.setScale(1.5);
            goldB.x = App.MathUtil.getRandom(40, 500); //arrX[_x];
            goldB.y = App.MathUtil.getRandom(-5, -210);
            this.addChild(goldB);
            var moveTimer = App.MathUtil.getRandom(300, 400);
            egret.Tween.get(goldB).to({ y: moveY }, moveTimer)
                .call(this.playgoldHandler, this, [goldB]);
        }
    };
    TradeFightView.prototype.playgoldHandler = function (_obj) {
        var _this = this;
        if (_obj === void 0) { _obj = null; }
        var _moveX = _obj.x;
        if (_obj) {
            _obj.dispose();
        }
        var playNum = App.MathUtil.getRandom(1, 2);
        if (playNum == 1) {
            var moveY = GameConfig.stageHeigth - 230 - 149;
            var mathNum = App.MathUtil.getRandom(1, 2);
            if (mathNum == 1) {
                var fireAnim_1 = ComponentManager.getCustomMovieClip("goldjump1_", 8, 70);
                fireAnim_1.x = _moveX;
                fireAnim_1.y = moveY;
                this.addChild(fireAnim_1);
                fireAnim_1.setEndCallBack(function () {
                    _this.removeChild(fireAnim_1);
                    fireAnim_1.dispose();
                    fireAnim_1 = null;
                }, this);
                fireAnim_1.playWithTime(1);
            }
            else {
                var fireAnim2_1 = ComponentManager.getCustomMovieClip("goldjump2_", 9, 70);
                fireAnim2_1.x = _moveX;
                fireAnim2_1.y = moveY;
                this.addChild(fireAnim2_1);
                fireAnim2_1.playWithTime(1);
                fireAnim2_1.setEndCallBack(function () {
                    _this.removeChild(fireAnim2_1);
                    fireAnim2_1.dispose();
                    fireAnim2_1 = null;
                }, this);
            }
        }
    };
    TradeFightView.prototype.showOpponentInfo = function () {
        var cid = Number(Api.tradeVoApi.getCurrentCid());
        if (this.param.data.rdata.data.fightflag == 1) {
            cid -= 1;
        }
        var tradeCfg = Config.TradeCfg.getTradeCfgById(cid.toString());
        if (tradeCfg) {
            //对方名字
            var tradeFight_name_bg = BaseBitmap.create("atkrace_name_bg");
            this.addChild(tradeFight_name_bg);
            tradeFight_name_bg.width = 200;
            tradeFight_name_bg.height = 40;
            tradeFight_name_bg.setPosition(410, GameConfig.stageHeigth - 200);
            var myNameTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
            myNameTxt.text = this.param.data.tradeName; //tradeCfg.tradeName;
            myNameTxt.setPosition(tradeFight_name_bg.x + 60, tradeFight_name_bg.y + 10);
            this.addChild(myNameTxt);
            //对方银两
            var leftBg = BaseBitmap.create("public_9_resbg");
            this.addChild(leftBg);
            leftBg.setPosition(430, GameConfig.stageHeigth - 150);
            var silverIcon = BaseBitmap.create("public_icon2");
            this.addChild(silverIcon);
            silverIcon.setPosition(leftBg.x - 5, leftBg.y);
            var silverTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
            silverTxt.text = App.StringUtil.changeIntToText(this.param.data.tradeGold); //tradeCfg.tradeGold+"";
            silverTxt.setPosition(480, leftBg.y + 12);
            silverTxt.width = 300;
            silverTxt.textAlign = "left";
            this.addChild(silverTxt);
            this.othersSilverTxt = silverTxt;
            this.tradeGoldNum = tradeCfg.tradeGold;
            //对方智力
            var leftBg2 = BaseBitmap.create("public_9_resbg");
            this.addChild(leftBg2);
            leftBg2.setPosition(430, GameConfig.stageHeigth - 100);
            var servant_infoPro2 = BaseBitmap.create("public_icon_zhi");
            this.addChild(servant_infoPro2);
            servant_infoPro2.scaleX = 0.9;
            servant_infoPro2.scaleY = 0.9;
            servant_infoPro2.setPosition(430, GameConfig.stageHeigth - 98);
            var intelligenceTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
            intelligenceTxt.text = this.param.data.tradeInte + "";
            intelligenceTxt.setPosition(480, servant_infoPro2.y + 10);
            this.addChild(intelligenceTxt);
        }
    };
    TradeFightView.prototype.showDialogue = function () {
        var _this = this;
        this._dialogueBg = BaseBitmap.create("public_9_bg42");
        this.dialogueContainer.addChild(this._dialogueBg);
        this._dialogueBg.width = 220;
        this._dialogueBg.height = 83;
        this._dialogueBg.x = 50;
        this._dialogueBg.y = 300;
        this._dialogueBg2 = BaseBitmap.create("public_9_bg42_tail");
        this.dialogueContainer.addChild(this._dialogueBg2);
        this._dialogueBg2.scaleX = -1;
        this._dialogueBg2.x = this._dialogueBg.x + this._dialogueBg.width;
        this._dialogueBg2.y = this._dialogueBg.y + this._dialogueBg.height - 5;
        // 商贸对话文字
        this.dialogueDesTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        this.dialogueDesTxt.text = LanguageManager.getlocal("dialogueDes");
        this.dialogueDesTxt.width = this._dialogueBg.width - 15;
        this.dialogueDesTxt.setPosition(this._dialogueBg.x + 10, this._dialogueBg.y + 15);
        this.dialogueContainer.addChild(this.dialogueDesTxt);
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
        var timerNum = egret.setInterval(function () {
            // 当前时间
            var curTime = egret.getTimer();
            // 当前时间走了多少了，百分比
            var curTimePre = (curTime - startTime) / (endTime - startTime);
            if (!ths.isInit()) {
                egret.clearInterval(timerNum);
                return;
            }
            // //我的钱减少
            // console.log(mySilverNum+"钱");
            // console.log(countNum+"每次减少");
            var mySilverNum = myStartNum - curTimePre * (myStartNum - myEndNum);
            if (_this.mysilverTxt) {
                _this.mysilverTxt.text = Math.floor(mySilverNum) + "";
                _this.mysilverTxt.scaleX = _this.txtScalse;
                _this.mysilverTxt.scaleY = _this.txtScalse;
                _this.mysilverTxt.x = -330;
            }
            //对方的钱减少
            var otherSilverNum = otherStartNum - curTimePre * (otherStartNum - otherEndNum);
            if (_this.othersSilverTxt) {
                _this.othersSilverTxt.text = Math.floor(otherSilverNum) + "";
                _this.othersSilverTxt.scaleX = _this.txtScalse;
                _this.othersSilverTxt.scaleY = _this.txtScalse;
            }
            if (curTime >= endTime) {
                egret.clearInterval(timerNum);
                if (_this.othersSilverTxt) {
                    _this.othersSilverTxt.scaleX = 1;
                    _this.othersSilverTxt.scaleY = 1;
                }
                _this.mysilverTxt.scaleX = 1;
                _this.mysilverTxt.scaleY = 1;
                _this.mysilverTxt.x = -250;
                _this.closeBtn.touchEnabled = true;
                App.DisplayUtil.changeToNormal(_this.closeBtn);
                if (_this.param.data.rdata.data.fightflag == 0) {
                    // console.log("失败");
                    _this.mysilverTxt.text = "0";
                    _this.mysilverTxt.textColor = TextFieldConst.COLOR_WARN_RED2;
                    if (_this.othersSilverTxt) {
                        _this.othersSilverTxt.text = App.StringUtil.changeIntToText(otherEndNum);
                    }
                    _this.isWin();
                    return;
                }
                else {
                    // console.log("胜利");
                    _this.mysilverTxt.text = Api.playerVoApi.getPlayerGoldStr();
                    if (_this.othersSilverTxt) {
                        _this.othersSilverTxt.text = "0";
                        _this.othersSilverTxt.textColor = TextFieldConst.COLOR_WARN_RED2;
                    }
                    _this.isWin();
                    return;
                }
            }
        }, ths, 10, 1);
    };
    TradeFightView.prototype.isWin = function () {
        var _this = this;
        var ths = this;
        egret.clearInterval(ths._timerNum);
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
        this._dialogueBg2 = null;
        _super.prototype.dispose.call(this);
    };
    return TradeFightView;
}(CommonView));
__reflect(TradeFightView.prototype, "TradeFightView");
//# sourceMappingURL=TradeFightView.js.map