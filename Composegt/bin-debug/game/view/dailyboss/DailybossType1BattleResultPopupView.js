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
var DailybossType1BattleResultPopupView = (function (_super) {
    __extends(DailybossType1BattleResultPopupView, _super);
    function DailybossType1BattleResultPopupView() {
        var _this = _super.call(this) || this;
        _this._callbackF0 = null;
        _this._obj0 = null;
        return _this;
    }
    DailybossType1BattleResultPopupView.prototype.initView = function () {
        _super.prototype.initView.call(this);
        if (this.param.data && this.param.data.f && this.param.data.o) {
            this._obj0 = this.param.data.o;
            this._callbackF0 = this.param.data.f;
        }
        var bossData = this.getBattleData();
        var killTxt = ComponentManager.getTextField(LanguageManager.getlocal("dailybossKillBoss1ResultDesc", [String(bossData.bossLv - 1)]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        killTxt.textAlign = egret.HorizontalAlign.CENTER;
        killTxt.setPosition((GameConfig.stageWidth - killTxt.width) / 2, this._winBg.y + 250);
        this.addChildToContainer(killTxt);
        if (bossData.score) {
            var scoreTxt = ComponentManager.getTextField(LanguageManager.getlocal("dailybossRankValue1Desc") + App.StringUtil.formatStringColor("+" + bossData.score, TextFieldConst.COLOR_WARN_GREEN2), TextFieldConst.FONTSIZE_CONTENT_SMALL);
            scoreTxt.setPosition((GameConfig.stageWidth - scoreTxt.width) / 2, killTxt.y + killTxt.height + 10);
            this.addChild(scoreTxt);
        }
        var closeText = ComponentManager.getTextField(LanguageManager.getlocal("clickToClose"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
        closeText.textAlign = egret.HorizontalAlign.CENTER;
        closeText.setPosition((GameConfig.stageWidth - closeText.width) / 2, this._winBg.y + this._winBg.height);
        this.addChildToContainer(closeText);
        this.addTouchTap(this.hide, this);
        if (this.param.data && this.param.data.autoclose == 1) {
            egret.Tween.get(this).wait(1000).call(this.hide, this);
        }
    };
    DailybossType1BattleResultPopupView.prototype.getIsCountDown = function () {
        return false;
    };
    DailybossType1BattleResultPopupView.prototype.getBattleData = function () {
        // return this.param.data;
        return this.param.data.info;
    };
    DailybossType1BattleResultPopupView.prototype.isShowOpenAni = function () {
        return false;
    };
    DailybossType1BattleResultPopupView.prototype.hide = function () {
        if (this._obj0 && this._callbackF0) {
            this._callbackF0.apply(this._obj0);
        }
        _super.prototype.hide.call(this);
    };
    DailybossType1BattleResultPopupView.prototype.dispose = function () {
        this._callbackF0 = null;
        this._obj0 = null;
        _super.prototype.dispose.call(this);
    };
    return DailybossType1BattleResultPopupView;
}(BattleWin));
__reflect(DailybossType1BattleResultPopupView.prototype, "DailybossType1BattleResultPopupView");
