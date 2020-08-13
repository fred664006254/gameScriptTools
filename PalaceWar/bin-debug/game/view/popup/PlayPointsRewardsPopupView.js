/**
 * google play points 充值奖励面板
 * author shaoliang
 * date 2017/6/8
 * @class PlayPointsRewardsPopupView
 * 参数 ：rechangeId
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
var PlayPointsRewardsPopupView = (function (_super) {
    __extends(PlayPointsRewardsPopupView, _super);
    function PlayPointsRewardsPopupView() {
        return _super.call(this) || this;
    }
    PlayPointsRewardsPopupView.prototype.initView = function () {
        var rechangeId = this.param.data.rechangeId;
        var cfg = Config.RechargeCfg.getRechargeItemCfgByKey(rechangeId);
        var messageStr = LanguageManager.getlocal("googlePlayPointsRewards", [cfg.name, String(cfg.getVipExp)]);
        var msgTF = ComponentManager.getTextField(messageStr, TextFieldConst.FONTSIZE_CONTENT_COMMON);
        msgTF.width = 480;
        msgTF.setColor(TextFieldConst.COLOR_BLACK);
        msgTF.textAlign = TextFieldConst.ALIGH_CENTER;
        msgTF.x = this.viewBg.x + this.viewBg.width / 2 - msgTF.width / 2;
        msgTF.lineSpacing = 5;
        msgTF.y = 30;
        this.addChildToContainer(msgTF);
        var bg = BaseBitmap.create("public_9_bg4");
        bg.width = 520;
        bg.height = 130;
        bg.x = this.viewBg.x + this.viewBg.width / 2 - bg.width / 2;
        bg.y = msgTF.y + msgTF.height + 20;
        this.addChildToContainer(bg);
        var rewardsIcon = GameData.getRewardItemIcons(cfg.getReward, true);
        for (var i = 0; i < rewardsIcon.length; i++) {
            var oneIcon = rewardsIcon[i];
            oneIcon.setScale(0.9);
            oneIcon.setPosition(this.viewBg.x + this.viewBg.width / 2 - (rewardsIcon.length * 100 - 10) / 2 + i * 100 - 4, bg.y + 17);
            this.addChildToContainer(oneIcon);
        }
        var conBtn = ComponentManager.getButton(ButtonConst.BTN2_NORMAL_YELLOW, "confirmBtn", this.hide, this);
        conBtn.setColor(TextFieldConst.COLOR_BLACK);
        conBtn.x = this.viewBg.x + this.viewBg.width / 2 - conBtn.width / 2;
        conBtn.y = bg.y + bg.height + 20;
        this.addChildToContainer(conBtn);
    };
    PlayPointsRewardsPopupView.prototype.getTitleStr = function () {
        return "itemUseConstPopupViewTitle";
    };
    PlayPointsRewardsPopupView.prototype.getCloseBtnName = function () {
        return null;
    };
    PlayPointsRewardsPopupView.prototype.getBgExtraHeight = function () {
        return 20;
    };
    return PlayPointsRewardsPopupView;
}(PopupView));
__reflect(PlayPointsRewardsPopupView.prototype, "PlayPointsRewardsPopupView");
//# sourceMappingURL=PlayPointsRewardsPopupView.js.map