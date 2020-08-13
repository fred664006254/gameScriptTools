/**
 * npc 说话
 * author shaoliang
 * date 2017/9/28
 * @class BattleRattle
 */
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
var BattleRattle = (function (_super) {
    __extends(BattleRattle, _super);
    function BattleRattle() {
        return _super.call(this) || this;
    }
    BattleRattle.prototype.init = function (p, width, tailType, height) {
        if (width === void 0) { width = 350; }
        if (tailType === void 0) { tailType = 1; }
        this._myParent = p;
        if (tailType == 4) {
            this._rattleBg = BaseBitmap.create("public_9v_bg11_2");
        }
        else {
            this._rattleBg = BaseBitmap.create("public_9v_bg11");
        }
        // this._rattleBg = BaseBitmap.create("public_9v_bg11");
        this.addChild(this._rattleBg);
        this._rattleBg.width = width;
        if (height) {
            this._rattleBg.height = height;
        }
        else {
            this._rattleBg.height = 83;
        }
        // let wordsCornerBg:BaseBitmap = BaseBitmap.create("public_9_bg42_tail");
        this._rattleBg.anchorOffsetX = this._rattleBg.width / 2;
        this._rattleBg.x = 150;
        if (PlatformManager.checkIsViSp()) {
            this._rattleText = ComponentManager.getTextField("", 20);
        }
        else {
            this._rattleText = ComponentManager.getTextField("", 20);
        }
        this._rattleText.width = this._rattleBg.width - 30;
        this._rattleText.textColor = TextFieldConst.COLOR_BLACK;
        this._rattleText.lineSpacing = 6;
        this._rattleType = tailType;
        if (tailType == 1) {
            this._rattleBg.y = -50;
            this._rattleBg.scaleX = 1;
            this._rattleText.x = this._rattleBg.x - this._rattleText.width / 2;
            this._rattleText.y = this._rattleBg.y + 20;
            // this._rattleBg.scaleY = -1;
        }
        else if (tailType == 2) {
            this._rattleBg.scaleY = -1;
            this._rattleBg.y = 100;
            this._rattleText.x = this._rattleBg.x - this._rattleText.width / 2;
            this._rattleText.y = this._rattleBg.y - this._rattleBg.height + 60 - this._rattleText.height / 2;
        }
        else if (tailType == 3) {
            this._rattleBg.scaleX = -1;
            // this._rattleBg.x = this._rattleBg.x
            this._rattleBg.y = -30;
            this._rattleText.x = this._rattleBg.x - this._rattleText.width / 2;
            this._rattleText.y = this._rattleBg.y + 15;
            // this._rattleBg.y = this._rattleBg.y +this._rattleBg.height -3;
        }
        else if (tailType == 4) {
            this._rattleBg.y = -30;
            this._rattleText.x = this._rattleBg.x - this._rattleText.width / 2;
            this._rattleText.y = this._rattleBg.y + 15;
        }
        else {
            this._rattleBg.scaleX = -1;
            this._rattleBg.x = this._rattleBg.x;
            this._rattleBg.y = -30;
        }
        this.addChild(this._rattleBg);
        this.addChild(this._rattleText);
    };
    BattleRattle.prototype.resetString = function (str, time, type) {
        if (time === void 0) { time = 3000; }
        if (type === void 0) { type = 1; }
        if (this.parent == null && this._myParent) {
            this._myParent.addChild(this);
        }
        if (str) {
            this._rattleText.text = str;
        }
        else {
            if (type == 1) {
                this._rattleText.text = LanguageManager.getlocal("npcRattle" + App.MathUtil.getRandom(1, 34));
            }
            else if (type == 2) {
                this._rattleText.text = LanguageManager.getlocal("bossRattle" + App.MathUtil.getRandom(1, 12));
            }
        }
        if (this._rattleType == 1) {
            this._rattleText.x = this._rattleBg.x - this._rattleText.width / 2;
            this._rattleText.y = this._rattleBg.y + 20;
        }
        else if (this._rattleType == 2) {
            this._rattleText.x = this._rattleBg.x - this._rattleText.width / 2;
            this._rattleText.y = this._rattleBg.y - this._rattleBg.height + 60 - this._rattleText.height / 2;
        }
        else {
        }
        if (time > 0) {
            egret.Tween.removeTweens(this);
            egret.Tween.get(this).wait(3000).call(this.hidden, this);
        }
    };
    BattleRattle.prototype.hidden = function () {
        this.dispose();
    };
    BattleRattle.prototype.dispose = function () {
        egret.Tween.removeTweens(this);
        this._rattleText = null;
        this._rattleType = null;
        _super.prototype.dispose.call(this);
    };
    return BattleRattle;
}(BaseDisplayObjectContainer));
__reflect(BattleRattle.prototype, "BattleRattle");
