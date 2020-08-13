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
var EmperorwarRoundResultView = (function (_super) {
    __extends(EmperorwarRoundResultView, _super);
    function EmperorwarRoundResultView() {
        var _this = _super.call(this) || this;
        _this._callbackF = null;
        _this._obj = null;
        _this._countDownLb = null;
        _this._countDownTime = -1;
        return _this;
    }
    EmperorwarRoundResultView.prototype.getTitleBgName = function () {
        return null;
    };
    EmperorwarRoundResultView.prototype.getTitleStr = function () {
        return null;
    };
    EmperorwarRoundResultView.prototype.getBgName = function () {
        return "public_9_bg8";
    };
    EmperorwarRoundResultView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "emperor_battle_win2",
            "emperor_battle_lost2",
            "emperor_battle_win",
            "emperor_battle_lost",
        ]);
    };
    EmperorwarRoundResultView.prototype.initView = function () {
        this.addTouchTap(this.touchTap, this, null);
        if (this.param.data && this.param.data.f && this.param.data.o) {
            this._obj = this.param.data.o;
            this._callbackF = this.param.data.f;
        }
        var result = this.param.data.result;
        var picStr;
        var picStr2;
        if (result == 1) {
            picStr = "emperor_battle_win";
            picStr2 = "emperor_battle_win2";
        }
        else {
            picStr = "emperor_battle_lost";
            picStr2 = "emperor_battle_lost2";
        }
        var battleresult2 = BaseBitmap.create(picStr2);
        battleresult2.setPosition(GameConfig.stageWidth / 2 - battleresult2.width / 2, GameConfig.stageHeigth / 2 - battleresult2.height / 2);
        this.addChildToContainer(battleresult2);
        battleresult2.name = "battleresult2";
        var battleresult = BaseBitmap.create(picStr);
        battleresult.setPosition(GameConfig.stageWidth / 2 - battleresult.width / 2, GameConfig.stageHeigth / 2 - battleresult.height / 2);
        this.addChildToContainer(battleresult);
        battleresult.name = "battleresult";
        var countDownBg = BaseBitmap.create("public_searchdescbg");
        countDownBg.setPosition(GameConfig.stageWidth / 2 - countDownBg.width / 2 + 20, battleresult.y + battleresult.height + 35);
        this.addChildToContainer(countDownBg);
        var timeDesc = ComponentManager.getTextField(LanguageManager.getlocal("countDownNext2"), TextFieldConst.FONTSIZE_CONTENT_SMALL);
        timeDesc.setPosition(countDownBg.x + countDownBg.width / 2 - timeDesc.width / 2 + 10, countDownBg.y + countDownBg.height / 2 - timeDesc.height / 2);
        this.addChildToContainer(timeDesc);
        this._countDownLb = ComponentManager.getTextField("0", TextFieldConst.FONTSIZE_TITLE_BIG);
        this._countDownLb.setPosition(countDownBg.x + countDownBg.width / 2 - timeDesc.width / 2 - 20, countDownBg.y + countDownBg.height / 2 - this._countDownLb.height / 2);
        this._countDownLb.setColor(TextFieldConst.COLOR_LIGHT_RED);
        this.addChildToContainer(this._countDownLb);
        countDownBg.visible = false;
        timeDesc.visible = false;
        this._countDownLb.visible = false;
        var closeText = ComponentManager.getTextField(LanguageManager.getlocal("clickToClose"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        closeText.textAlign = egret.HorizontalAlign.CENTER;
        closeText.setPosition((GameConfig.stageWidth - closeText.width) / 2, GameConfig.stageHeigth - 50);
        this.addChildToContainer(closeText);
        if (result == 1) {
            //胜利动画
            var originalScale = 0.01;
            var oldx = battleresult2.x;
            var oldy = battleresult2.y;
            battleresult2.setScale(originalScale);
            battleresult2.setPosition(oldx - (originalScale - 1) / 2 * battleresult2.width, oldy - (originalScale - 1) / 2 * battleresult2.height);
            var originalScale2 = 1.1;
            var oldx2 = oldx - (originalScale2 - 1) / 2 * battleresult2.width;
            var oldy2 = oldy - (originalScale2 - 1) / 2 * battleresult2.height;
            var originalScale3 = 3;
            var oldx3_1 = battleresult.x;
            var oldy3_1 = battleresult.y;
            battleresult.setScale(originalScale3);
            battleresult.setPosition(oldx3_1 - (originalScale3 - 1) / 2 * battleresult.width, oldy3_1 - (originalScale3 - 1) / 2 * battleresult.height);
            battleresult.alpha = 0;
            var that_1 = this;
            egret.Tween.get(battleresult2).to({ scaleX: originalScale2, scaleY: originalScale2, x: oldx2, y: oldy2 }, 400).to({ scaleX: 1, scaleY: 1, x: oldx, y: oldy }, 100).call(function () {
                battleresult.alpha = 1;
                egret.Tween.get(battleresult).to({ scaleX: 1, scaleY: 1, x: oldx3_1, y: oldy3_1 }, 400);
            }).wait(400).call(function () {
                countDownBg.visible = true;
                timeDesc.visible = true;
                that_1._countDownLb.visible = true;
                that_1._countDownLb.text = "3";
                that_1._countDownTime = 3;
            });
        }
        else {
            //失败动画
            battleresult.alpha = 0;
            var originalScale = 4;
            var oldx = battleresult2.x;
            var oldy = battleresult2.y;
            battleresult2.setScale(originalScale);
            battleresult2.setPosition(oldx - (originalScale - 1) / 2 * battleresult2.width, oldy - (originalScale - 1) / 2 * battleresult2.height);
            var that_2 = this;
            egret.Tween.get(battleresult2).to({ scaleX: 1, scaleY: 1, x: oldx, y: oldy }, 600).call(function () {
                egret.Tween.get(battleresult).to({ alpha: 1 }, 400);
            }).wait(400).call(function () {
                countDownBg.visible = true;
                timeDesc.visible = true;
                that_2._countDownLb.visible = true;
                that_2._countDownLb.text = "3";
                that_2._countDownTime = 3;
            });
        }
    };
    EmperorwarRoundResultView.prototype.touchTap = function () {
        this._countDownTime = -1;
        if (this._obj && this._callbackF) {
            this._callbackF.apply(this._obj);
        }
        this.hide();
    };
    EmperorwarRoundResultView.prototype.tick = function () {
        if (this._countDownTime > 0) {
            this._countDownTime--;
            this._countDownLb.text = String(this._countDownTime);
        }
        else if (this._countDownTime == 0) {
            this.touchTap();
        }
    };
    EmperorwarRoundResultView.prototype.dispose = function () {
        egret.Tween.removeTweens(this.container.getChildByName("battleresult"));
        egret.Tween.removeTweens(this.container.getChildByName("battleresult2"));
        this._callbackF = null;
        this._obj = null;
        this._countDownLb = null;
        this._countDownTime = -1;
        _super.prototype.dispose.call(this);
    };
    return EmperorwarRoundResultView;
}(BaseView));
__reflect(EmperorwarRoundResultView.prototype, "EmperorwarRoundResultView");
//# sourceMappingURL=EmperorwarRoundResultView.js.map