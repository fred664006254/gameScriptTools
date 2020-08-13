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
        if (height === void 0) { height = 83; }
        this._myParent = p;
        this._rattleBg = BaseBitmap.create("public_9_bg42");
        this.addChild(this._rattleBg);
        this._rattleBg.width = width;
        this._rattleBg.height = height;
        var wordsCornerBg = BaseBitmap.create("public_9_bg42_tail");
        if (tailType == 1) {
            wordsCornerBg.x = 300;
            wordsCornerBg.y = 3;
            wordsCornerBg.scaleX = -1;
            wordsCornerBg.scaleY = -1;
        }
        else {
            wordsCornerBg.x = this._rattleBg.x + 30;
            wordsCornerBg.y = this._rattleBg.y + this._rattleBg.height - 3;
        }
        this.addChild(wordsCornerBg);
        this._rattleText = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON);
        this._rattleText.width = this._rattleBg.width - 30;
        this._rattleText.textColor = TextFieldConst.COLOR_BLACK;
        this._rattleText.lineSpacing = 6;
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
        this._rattleText.setPosition(15, this._rattleBg.height / 2 - this._rattleText.height / 2);
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
        _super.prototype.dispose.call(this);
    };
    return BattleRattle;
}(BaseDisplayObjectContainer));
__reflect(BattleRattle.prototype, "BattleRattle");
//# sourceMappingURL=BattleRattle.js.map