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
/**
 * 二级弹框界面
 * @author 张朝阳
 * date 2018/11/20
 * @class CountryWarConfirmPopupView
 */
var CountryWarConfirmPopupView = (function (_super) {
    __extends(CountryWarConfirmPopupView, _super);
    function CountryWarConfirmPopupView() {
        var _this = _super.call(this) || this;
        _this._confirmCallback = null;
        _this._cost = null;
        return _this;
    }
    CountryWarConfirmPopupView.prototype.initView = function () {
        this._confirmCallback = this.param.data.callbackHandle;
        var bg = BaseBitmap.create("public_9_bg4");
        bg.width = 530;
        bg.height = 150;
        bg.setPosition(this.viewBg.x + this.viewBg.width / 2 - bg.width / 2, 20);
        this.addChildToContainer(bg);
        var desc1 = ComponentManager.getTextField(this.param.data.desc1, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
        desc1.lineSpacing = 3;
        desc1.width = 500;
        desc1.textAlign = egret.HorizontalAlign.CENTER;
        desc1.setPosition(bg.x + bg.width / 2 - desc1.width / 2, bg.y + bg.height / 2 - desc1.height / 2);
        this.addChildToContainer(desc1);
        if (this.param.data.desc2) {
            var desc2 = ComponentManager.getTextField(this.param.data.desc2, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
            desc2.lineSpacing = 3;
            desc2.width = 500;
            desc2.setPosition(desc1.x, bg.y + bg.height - desc2.height - 10);
            this.addChildToContainer(desc2);
        }
        var cancelBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_RED, "cancelBtn", this.hide, this);
        cancelBtn.setPosition(this.viewBg.x + 50 + GameData.popupviewOffsetX, bg.y + bg.height + 12);
        this.addChildToContainer(cancelBtn);
        var confirmBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "", this.confirmBtnClick, this);
        confirmBtn.setPosition(this.viewBg.x + this.viewBg.width - confirmBtn.width - 50 - GameData.popupviewOffsetX, bg.y + bg.height + 12);
        this.addChildToContainer(confirmBtn);
        switch (this.param.data.type) {
            case 1:
                confirmBtn.setText("countryWarServantConfirm");
                break;
            case 2:
                if (Api.countryWarVoApi.getCancelServantTimes() < Config.CountrywarCfg.servantBack) {
                    confirmBtn.setText("countryWarServantCancel");
                }
                else {
                    //0 开始
                    var costNum = Api.countryWarVoApi.getCancelServantTimes() - Config.CountrywarCfg.servantBack;
                    if (costNum > Config.CountrywarCfg.servantBackCost.length - 1) {
                        costNum = Config.CountrywarCfg.servantBackCost.length - 1;
                    }
                    this._cost = Config.CountrywarCfg.servantBackCost[costNum];
                    confirmBtn.setText(String(this._cost), false);
                    confirmBtn.addTextIcon("public_icon1");
                }
                break;
            case 3:
                confirmBtn.setText("countryWarPlanConfirm");
                break;
        }
    };
    CountryWarConfirmPopupView.prototype.confirmBtnClick = function () {
        if (this.param.data.type == 2 && this._cost) {
            if (Api.playerVoApi.getPlayerGem() < this._cost) {
                App.CommonUtil.showTip(LanguageManager.getlocal("gemNotEnough"));
                this.hide();
                return;
            }
        }
        if (this._confirmCallback) {
            this._confirmCallback.apply(this.param.data.handle);
        }
        this.hide();
    };
    CountryWarConfirmPopupView.prototype.getTitleStr = function () {
        if (this.param && this.param.data && this.param.data.titleKey) {
            return this.param.data.titleKey;
        }
        return null;
    };
    CountryWarConfirmPopupView.prototype.dispose = function () {
        this._confirmCallback = null;
        this._cost = null;
        _super.prototype.dispose.call(this);
    };
    return CountryWarConfirmPopupView;
}(PopupView));
__reflect(CountryWarConfirmPopupView.prototype, "CountryWarConfirmPopupView");
//# sourceMappingURL=CountryWarConfirmPopupView.js.map