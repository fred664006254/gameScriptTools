/**
 * author shaoliang
 * date 2018/12/4
 * @class BattleAuto
 * 门客战斗 自动上阵蒙版
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
var BattleAuto = (function (_super) {
    __extends(BattleAuto, _super);
    function BattleAuto() {
        var _this = _super.call(this) || this;
        _this._callbackF = null;
        _this._obj = null;
        return _this;
    }
    BattleAuto.prototype.init = function (type, f, o) {
        this._obj = o;
        this._callbackF = f;
        var viewBg = BaseBitmap.create("public_alphabg");
        viewBg.width = GameConfig.stageWidth;
        viewBg.height = GameConfig.stageHeigth;
        viewBg.addTouchTap(this.touchTap, this, null);
        this.addChild(viewBg);
        var posY = GameConfig.stageHeigth - 280;
        if (type == 2) {
            posY = GameConfig.stageHeigth - 540;
        }
        else if (type == 3) {
            posY = GameConfig.stageHeigth - 360;
        }
        var bg = BaseBitmap.create("public_9_mainicontimebg");
        bg.width = 360;
        bg.setPosition(GameConfig.stageWidth / 2 - 180, posY);
        this.addChild(bg);
        var rect = new egret.Rectangle(0, 0, 210, 40);
        var picstr = "battle_auto1";
        if (type == 3) {
            picstr = "battle_auto2";
        }
        var title = BaseLoadBitmap.create(picstr, rect);
        title.setPosition(GameConfig.stageWidth / 2 - title.width / 2, posY + 3);
        this.addChild(title);
        var str = LanguageManager.getlocal("autoBattleStop_DailyAc_1");
        if (type == 3) {
            str = LanguageManager.getlocal("autoBattleStop_AllianceQuest");
        }
        var text = ComponentManager.getTextField(str, TextFieldConst.FONTSIZE_CONTENT_SMALL);
        text.width = 330;
        text.lineSpacing = 6;
        text.textAlign = egret.HorizontalAlign.CENTER;
        text.setPosition(GameConfig.stageWidth / 2 - text.width / 2, title.y + title.height + 7);
        this.addChild(text);
        bg.height = title.height + text.height + 18;
    };
    BattleAuto.prototype.touchTap = function () {
        this._callbackF.apply(this._obj);
    };
    BattleAuto.prototype.dispose = function () {
        this._callbackF = null;
        this._obj = null;
        _super.prototype.dispose.call(this);
    };
    return BattleAuto;
}(BaseDisplayObjectContainer));
__reflect(BattleAuto.prototype, "BattleAuto");
//# sourceMappingURL=BattleAuto.js.map