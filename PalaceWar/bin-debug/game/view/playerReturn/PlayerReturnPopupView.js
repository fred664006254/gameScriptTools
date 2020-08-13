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
var PlayerReturnPopupView = (function (_super) {
    __extends(PlayerReturnPopupView, _super);
    function PlayerReturnPopupView() {
        return _super.call(this) || this;
    }
    Object.defineProperty(PlayerReturnPopupView.prototype, "cfg", {
        get: function () {
            return Config.PlayerreturnCfg;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlayerReturnPopupView.prototype, "api", {
        get: function () {
            return Api.playerReturnVoApi;
        },
        enumerable: true,
        configurable: true
    });
    PlayerReturnPopupView.prototype.initView = function () {
        var view = this;
        var descTxt = ComponentManager.getTextField(LanguageManager.getlocal('PlayerReturnMainUIDesc'), 20, TextFieldConst.COLOR_BLACK);
        descTxt.width = 300;
        descTxt.lineSpacing = 5;
        descTxt.textAlign = egret.HorizontalAlign.LEFT;
        view.setLayoutPosition(LayoutConst.righttop, descTxt, view.viewBg, [50, 82]);
        view.addChild(descTxt);
        //创建奖励列表
        var rewardArr = GameData.formatRewardItem("" + view.api.getRebackRewards());
        var scroStartY = view.viewBg.y + (Api.playerVoApi.getPlayerVipLevel() < view.cfg.needVip ? 197.5 : 157.5);
        var tmpX = 260;
        for (var index = 0; index < rewardArr.length; index++) {
            var iconItem = GameData.getItemIcon(rewardArr[index], true, false);
            iconItem.setScale(0.7);
            iconItem.x = tmpX;
            iconItem.y = scroStartY;
            tmpX += (108 * iconItem.scaleX + 10);
            if (tmpX > (260 + 5 * 108 * iconItem.scaleX + 4 * 10)) {
                tmpX = 260;
                scroStartY += iconItem.height * iconItem.scaleY + 10;
                iconItem.x = tmpX;
                iconItem.y = scroStartY;
                tmpX += (108 * iconItem.scaleX + 10);
            }
            view.addChild(iconItem);
        }
        var mailTxt = ComponentManager.getTextField(LanguageManager.getlocal('PlayerReturnTip6'), 20, 0xbb2800);
        view.setLayoutPosition(LayoutConst.leftbottom, mailTxt, view.viewBg, [300, 105]);
        view.addChild(mailTxt);
        var tipTxt = ComponentManager.getTextField(LanguageManager.getlocal('PlayerReturnMainUITip'), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        tipTxt.width = 500;
        tipTxt.lineSpacing = 5;
        view.setLayoutPosition(LayoutConst.horizontalCentertop, tipTxt, view.viewBg, [0, 373.5]);
        view.addChild(tipTxt);
        var goBtn = ComponentManager.getButton(ButtonConst.BTN_BIG_YELLOW, 'PlayerReturnMainUIBtn', view.goForReback, view);
        view.setLayoutPosition(LayoutConst.horizontalCentertop, goBtn, view.viewBg, [0, view.viewBg.height]);
        view.addChild(goBtn);
    };
    PlayerReturnPopupView.prototype.goForReback = function () {
        var view = this;
        if (Api.rookieVoApi.curGuideKey == "zhenqifang") {
            view.hide();
            return;
        }
        ViewController.getInstance().openView(ViewConst.COMMON.PLAYERRETURNVIEW);
        view.hide();
    };
    PlayerReturnPopupView.prototype.isTouchMaskClose = function () {
        return true;
    };
    PlayerReturnPopupView.prototype.getTitleStr = function () {
        return '';
    };
    /**
     * 重新一下关闭按钮
     * 仅适用于新的分享
     */
    PlayerReturnPopupView.prototype.getCloseBtnName = function () {
        return "";
    };
    /**
     * 重新一下title按钮
     * 仅适用于新的分享
     */
    PlayerReturnPopupView.prototype.getTitleBgName = function () {
        return "";
    };
    /**
     * 重写 初始化viewbg
     * 仅适用于新的分享
     */
    PlayerReturnPopupView.prototype.initBg = function () {
        this.viewBg = BaseBitmap.create("playerrebackbg");
        this.viewBg.height = 451;
        this.viewBg.width = 604;
        this.viewBg.setPosition(GameConfig.stageWidth / 2 - this.viewBg.width / 2, GameConfig.stageHeigth / 2 - this.viewBg.height / 2);
        this.addChild(this.viewBg);
    };
    PlayerReturnPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "playerrebackbg"
        ]);
    };
    PlayerReturnPopupView.prototype.dispose = function () {
        if (Api.rookieVoApi.curGuideKey == "zhenqifang") {
            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_ZQF_NEEDGUIDE);
        }
        _super.prototype.dispose.call(this);
    };
    return PlayerReturnPopupView;
}(PopupView));
__reflect(PlayerReturnPopupView.prototype, "PlayerReturnPopupView");
//# sourceMappingURL=PlayerReturnPopupView.js.map