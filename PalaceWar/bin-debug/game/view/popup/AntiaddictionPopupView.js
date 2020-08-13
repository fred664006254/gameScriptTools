/**
 * 防沉迷
 * author zsl
 * date 2018/07/30
 * @class AntiaddictionPopupView
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
var AntiaddictionPopupView = (function (_super) {
    __extends(AntiaddictionPopupView, _super);
    function AntiaddictionPopupView() {
        var _this = _super.call(this) || this;
        _this._type = 0; // 1 : 1~3小时   2:3～5小时
        return _this;
    }
    AntiaddictionPopupView.prototype.initView = function () {
        var rankBg = BaseBitmap.create("public_9_probiginnerbg");
        rankBg.width = 520;
        rankBg.height = 318;
        rankBg.setPosition(this.viewBg.width / 2 - rankBg.width / 2, 30);
        this.addChildToContainer(rankBg);
        var titleText = ComponentManager.getTextField(LanguageManager.getlocal("dearUser"), TextFieldConst.FONTSIZE_CONTENT_COMMON);
        titleText.setPosition(rankBg.x + 25, rankBg.y + 25);
        this.addChildToContainer(titleText);
        var timeStr = "";
        if (this.param.data.level) {
            if (this.param.data.level >= 7) {
                this._type = 3;
            }
            else if (this.param.data.level >= 3) {
                this._type = 2;
            }
            else {
                this._type = 1;
            }
            timeStr = App.DateUtil.getFormatBySecond(Api.playerVoApi.adictionTab[this.param.data.level - 1], 8);
        }
        if (this.param.data.type) {
            this._type = this.param.data.type;
        }
        var desc = LanguageManager.getlocal("antiaddictionTip" + this._type, [timeStr]);
        var descText = ComponentManager.getTextField(desc, TextFieldConst.FONTSIZE_CONTENT_COMMON);
        descText.width = rankBg.width - 50;
        descText.lineSpacing = 6;
        descText.setPosition(titleText.x, titleText.y + titleText.height + 30);
        this.addChildToContainer(descText);
        var confirmButton = ComponentManager.getButton(ButtonConst.BTN_BIG_YELLOW, "sysConfirm", this.hide, this);
        confirmButton.setPosition(this.viewBg.width / 2 - confirmButton.width / 2, rankBg.y + rankBg.height + 20);
        this.addChildToContainer(confirmButton);
        if (this._type == 3) {
            this.closeBtn.visible = false;
        }
    };
    AntiaddictionPopupView.prototype.hide = function () {
        var t = this._type;
        _super.prototype.hide.call(this);
        if (t == 3) {
            PlatformManager.logout();
        }
    };
    AntiaddictionPopupView.prototype.getParent = function () {
        return LayerManager.msgLayer;
    };
    AntiaddictionPopupView.prototype.dispose = function () {
        this._type = 0;
        _super.prototype.dispose.call(this);
    };
    return AntiaddictionPopupView;
}(PopupView));
__reflect(AntiaddictionPopupView.prototype, "AntiaddictionPopupView");
//# sourceMappingURL=AntiaddictionPopupView.js.map