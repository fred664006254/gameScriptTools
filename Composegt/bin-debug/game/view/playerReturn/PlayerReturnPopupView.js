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
        var toptxt = BaseBitmap.create("playerrebackbg_txt");
        toptxt.setPosition(GameConfig.stageWidth / 2 - toptxt.width / 2, this.viewBg.y - toptxt.height + 20);
        this.addChild(toptxt);
        var descTxt = ComponentManager.getTextField(LanguageManager.getlocal('PlayerReturn_Desc'), 20, TextFieldConst.COLOR_BROWN);
        descTxt.width = 300;
        descTxt.lineSpacing = 5;
        descTxt.textAlign = egret.HorizontalAlign.LEFT;
        view.setLayoutPosition(LayoutConst.righttop, descTxt, view.viewBg, [50, 50]);
        view.addChild(descTxt);
        //创建奖励列表
        var rewardArr = GameData.formatRewardItem("" + view.api.getRebackRewards());
        var scroStartY = view.viewBg.y + 130; // (Api.playerVoApi.getPlayerVipLevel() < view.cfg.needVip ? 197.5 : 157.5);
        var tmpX = 250;
        var rewScNode = new BaseDisplayObjectContainer();
        scroStartY = 0;
        tmpX = 0;
        for (var index = 0; index < rewardArr.length; index++) {
            var iconItem = GameData.getItemIcon(rewardArr[index], true, false);
            iconItem.setScale(0.7);
            iconItem.x = tmpX;
            iconItem.y = scroStartY;
            tmpX += (108 * iconItem.scaleX + 10);
            // if (tmpX > (260 + 5 * 108 * iconItem.scaleX + 4 * 10)){
            if (index % 4 == 0 && index > 0) {
                tmpX = 0;
                scroStartY += iconItem.height * iconItem.scaleY + 10;
                iconItem.x = tmpX;
                iconItem.y = scroStartY;
                tmpX += (108 * iconItem.scaleX + 10);
            }
            // view.addChild(iconItem);
            rewScNode.addChild(iconItem);
        }
        var srect = new egret.Rectangle(0, 0, 400, 180);
        var rewardScr = ComponentManager.getScrollView(rewScNode, srect);
        rewardScr.x = 250;
        rewardScr.y = view.viewBg.y + 120;
        rewardScr.horizontalScrollPolicy = "off";
        view.addChild(rewardScr);
        var mailTxt = ComponentManager.getTextField(LanguageManager.getlocal('PlayerReturnTip6'), 20, 0xbb2800);
        view.setLayoutPosition(LayoutConst.leftbottom, mailTxt, view.viewBg, [300, 115]);
        view.addChild(mailTxt);
        var tipTxt = ComponentManager.getTextField(LanguageManager.getlocal('PlayerReturn_Tip'), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        tipTxt.width = 500;
        tipTxt.lineSpacing = 5;
        view.setLayoutPosition(LayoutConst.horizontalCentertop, tipTxt, view.viewBg, [0, 373.5]);
        view.addChild(tipTxt);
        var goBtn = ComponentManager.getButton(ButtonConst.BTN_BIG_YELLOW, 'PlayerReturn_Btn', view.goForReback, view);
        view.setLayoutPosition(LayoutConst.horizontalCentertop, goBtn, view.viewBg, [0, view.viewBg.height]);
        view.addChild(goBtn);
    };
    PlayerReturnPopupView.prototype.goForReback = function () {
        var view = this;
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
            "playerrebackbg", "playerrebackbg_txt",
        ]);
    };
    PlayerReturnPopupView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return PlayerReturnPopupView;
}(PopupView));
__reflect(PlayerReturnPopupView.prototype, "PlayerReturnPopupView");
