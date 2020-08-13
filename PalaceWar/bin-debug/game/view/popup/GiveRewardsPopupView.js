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
var GiveRewardsPopupView = (function (_super) {
    __extends(GiveRewardsPopupView, _super);
    function GiveRewardsPopupView() {
        return _super.call(this) || this;
    }
    GiveRewardsPopupView.prototype.getTitleStr = function () {
        return "itemUseConstPopupViewTitle";
    };
    Object.defineProperty(GiveRewardsPopupView.prototype, "uiType", {
        get: function () {
            return "2";
        },
        enumerable: true,
        configurable: true
    });
    GiveRewardsPopupView.prototype.initView = function () {
        var descstr = LanguageManager.getlocal("childGiveItmeDesc");
        var desc = ComponentManager.getTextField(descstr, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BLACK);
        desc.width = 500;
        desc.lineSpacing = 5;
        desc.textAlign = egret.HorizontalAlign.CENTER;
        desc.setPosition(this.viewBg.width / 2 - desc.width / 2, 25);
        this.addChildToContainer(desc);
        var rewards = this.param.data.rewards;
        var icon = GameData.getRewardItemIcons(rewards)[0];
        icon.setPosition(this.viewBg.width / 2 - icon.width / 2, desc.y + desc.height + 20);
        this.addChildToContainer(icon);
        var view = this;
        var button = ComponentManager.getButton(ButtonConst.BTN2_SMALL_YELLOW, "sysConfirm", function () {
            var rewardList = GameData.formatRewardItem(rewards);
            App.CommonUtil.playRewardFlyAction(rewardList);
            view.hide();
        }, this);
        button.setPosition(this.viewBg.width / 2 - button.width / 2, icon.y + icon.height + 30);
        this.addChildToContainer(button);
    };
    GiveRewardsPopupView.prototype.getCloseBtnName = function () {
        return null;
    };
    GiveRewardsPopupView.prototype.getBgExtraHeight = function () {
        return 25;
    };
    GiveRewardsPopupView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return GiveRewardsPopupView;
}(PopupView));
__reflect(GiveRewardsPopupView.prototype, "GiveRewardsPopupView");
//# sourceMappingURL=GiveRewardsPopupView.js.map