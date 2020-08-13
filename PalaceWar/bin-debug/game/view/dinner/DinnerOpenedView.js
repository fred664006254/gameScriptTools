/**
 * 开宴成功
 * author shaoliang
 * date 2017/11/2
 * @class DinnerOpenedView
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
var DinnerOpenedView = (function (_super) {
    __extends(DinnerOpenedView, _super);
    function DinnerOpenedView() {
        var _this = _super.call(this) || this;
        _this._callbackF = null;
        _this._obj = null;
        return _this;
    }
    DinnerOpenedView.prototype.getResourceList = function () {
        return [
            "dinner_flower",
            "dinner_open_word",
        ];
    };
    DinnerOpenedView.prototype.getBgName = function () {
        return "public_9_bg8";
    };
    DinnerOpenedView.prototype.getTitleBgName = function () {
        return null;
    };
    DinnerOpenedView.prototype.getTitleStr = function () {
        return null;
    };
    DinnerOpenedView.prototype.getCloseBtnName = function () {
        return null;
    };
    DinnerOpenedView.prototype.initView = function () {
        this._obj = this.param.data.o;
        this._callbackF = this.param.data.f;
        var flower = BaseBitmap.create("dinner_flower");
        flower.setPosition(GameConfig.stageWidth / 2 - flower.width / 2, GameConfig.stageHeigth / 2 - flower.height);
        this.addChildToContainer(flower);
        var openWord = BaseBitmap.create("dinner_open_word");
        openWord.setPosition(GameConfig.stageWidth / 2 - openWord.width / 2, GameConfig.stageHeigth / 2 - flower.height / 2 - openWord.height / 2);
        this.addChildToContainer(openWord);
        var descBg = BaseBitmap.create("public_9_wordbg");
        descBg.width = GameConfig.stageWidth;
        descBg.height = 222;
        descBg.setPosition(0, GameConfig.stageHeigth / 2 - 60);
        this.addChildToContainer(descBg);
        var dinnerType = LanguageManager.getlocal("dinnerTitle" + this.param.data.type);
        var openSuccess = ComponentManager.getTextField(LanguageManager.getlocal("openSuccessDesc", [dinnerType]), TextFieldConst.FONTSIZE_TITLE_SMALL);
        openSuccess.width = 585;
        openSuccess.lineSpacing = 6;
        openSuccess.setPosition(GameConfig.stageWidth / 2 - openSuccess.width / 2, descBg.y + 35);
        this.addChild(openSuccess);
        var playerId = ComponentManager.getTextField(LanguageManager.getlocal("playerId", [Api.playerVoApi.getPlayerID().toString()]), TextFieldConst.FONTSIZE_TITLE_SMALL, TextFieldConst.COLOR_WARN_GREEN);
        playerId.setPosition(GameConfig.stageWidth / 2 - playerId.width / 2, descBg.y - 52 + descBg.height);
        this.addChild(playerId);
        var shareDinner = ComponentManager.getTextField(LanguageManager.getlocal("shareDinnerDesc"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        shareDinner.setPosition(GameConfig.stageWidth / 2 - shareDinner.width / 2, descBg.y + 50 + descBg.height);
        this.addChild(shareDinner);
        var confirmBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "sysConfirm", this.hide, this);
        confirmBtn.setPosition(GameConfig.stageWidth / 2 - confirmBtn.width / 2, descBg.y + 86 + descBg.height);
        this.addChildToContainer(confirmBtn);
    };
    DinnerOpenedView.prototype.hide = function () {
        // this._callbackF.apply(this._obj);
        _super.prototype.hide.call(this);
    };
    DinnerOpenedView.prototype.dispose = function () {
        this._callbackF = null;
        this._obj = null;
        _super.prototype.dispose.call(this);
    };
    return DinnerOpenedView;
}(CommonView));
__reflect(DinnerOpenedView.prototype, "DinnerOpenedView");
//# sourceMappingURL=DinnerOpenedView.js.map