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
 * 门客名望加成详情
 * author hyd
 * date 2019/8/29
 * @class AtkraceFameAddInfoPopupView
 */
var AtkraceFameAddInfoPopupView = (function (_super) {
    __extends(AtkraceFameAddInfoPopupView, _super);
    function AtkraceFameAddInfoPopupView() {
        return _super.call(this) || this;
    }
    AtkraceFameAddInfoPopupView.prototype.initView = function () {
        var bg = BaseBitmap.create("public_9_probiginnerbg");
        bg.width = 520;
        bg.x = this.viewBg.x + this.viewBg.width / 2 - bg.width / 2;
        bg.y = 30;
        this.addChildToContainer(bg);
        var allAtkNum = Api.atkraceVoApi.getFameTotalAddAtkByType(1);
        var allAtkNumText = ComponentManager.getTextField("" + LanguageManager.getlocal('atkraceFameUpTip1') + App.StringUtil.formatStringColor("+" + allAtkNum, TextFieldConst.COLOR_WARN_GREEN), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        this.addChildToContainer(allAtkNumText);
        allAtkNumText.setPosition(bg.x + bg.width / 2 - allAtkNumText.width / 2, bg.y + 20);
        // const allAtkPer = Api.atkraceVoApi.getFameTotalAddAtkByType(2).toFixed(1);
        // let allAtkPerText = ComponentManager.getTextField(`${LanguageManager.getlocal('atkraceFameUpTip1')}${App.StringUtil.formatStringColor(`+${allAtkPer}%`,TextFieldConst.COLOR_WARN_GREEN)}`, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        // this.addChildToContainer(allAtkPerText);
        // allAtkPerText.setPosition(bg.x + bg.width / 2 - allAtkPerText.width / 2, allAtkNumText.y + allAtkNumText.height + 20);
        var allCrtNum = Api.atkraceVoApi.getFameTotalAddCrt().toFixed(1);
        var allCrtNumText = ComponentManager.getTextField("" + LanguageManager.getlocal('atkraceFameUpTip2') + App.StringUtil.formatStringColor("+" + allCrtNum + "%", TextFieldConst.COLOR_WARN_GREEN), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        this.addChildToContainer(allCrtNumText);
        allCrtNumText.setPosition(bg.x + bg.width / 2 - allCrtNumText.width / 2, allAtkNumText.y + allAtkNumText.height + 20);
        bg.height = allCrtNumText.y + allCrtNumText.height + 20 - bg.y;
        var confirmBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "confirmBtn", this.clickConfirmHandler, this);
        this.addChildToContainer(confirmBtn);
        confirmBtn.setPosition(bg.x + bg.width / 2 - confirmBtn.width / 2, bg.y + bg.height + 40);
    };
    AtkraceFameAddInfoPopupView.prototype.getBgExtraHeight = function () {
        return 30;
    };
    AtkraceFameAddInfoPopupView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AtkraceFameAddInfoPopupView;
}(PopupView));
__reflect(AtkraceFameAddInfoPopupView.prototype, "AtkraceFameAddInfoPopupView");
//# sourceMappingURL=AtkraceFameAddInfoPopupView.js.map