/**
 * author jiangliuyang
 * date 2018/12/17
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
        var posY = GameConfig.stageHeigth - 580;
        if (type == 2) {
            posY = GameConfig.stageHeigth - 540;
        }
        else if (type == 3) {
            posY = GameConfig.stageHeigth - 360;
        }
        var bg = BaseBitmap.create("public_lockbg");
        bg.width = 408;
        bg.height = 72;
        bg.setPosition(GameConfig.stageWidth / 2 - 180, posY);
        this.addChild(bg);
        var str1 = LanguageManager.getlocal("autoBattleIng");
        var text1 = ComponentManager.getTextField(str1, 28, TextFieldConst.COLOR_QUALITY_YELLOW);
        text1.x = bg.x + bg.width / 2 - text1.width / 2;
        text1.y = bg.y + bg.height / 2 - text1.height;
        this.addChild(text1);
        var str2 = LanguageManager.getlocal("autoBattleStop");
        var text2 = ComponentManager.getTextField(str2, 24, TextFieldConst.COLOR_LIGHT_YELLOW);
        text2.x = bg.x + bg.width / 2 - text2.width / 2;
        text2.y = bg.y + bg.height / 2;
        this.addChild(text2);
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
