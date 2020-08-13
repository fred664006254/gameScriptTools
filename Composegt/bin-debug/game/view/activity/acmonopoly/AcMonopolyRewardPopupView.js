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
 * author yanyuling
 */
var AcMonopolyRewardPopupView = (function (_super) {
    __extends(AcMonopolyRewardPopupView, _super);
    function AcMonopolyRewardPopupView() {
        return _super.call(this) || this;
    }
    Object.defineProperty(AcMonopolyRewardPopupView.prototype, "acVo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
        },
        enumerable: true,
        configurable: true
    });
    AcMonopolyRewardPopupView.prototype.initView = function () {
        // {turn:this.acVo.theturn,aid:this.aid,code:this.code}
        var cfg = this.acVo.config;
        var turn = this.param.data.turn;
        var turnReward = cfg.turnReward;
        this._nodeContainer = new BaseDisplayObjectContainer();
        this.addChild(this._nodeContainer);
        var topBg = BaseBitmap.create("monopoly_bg5");
        topBg.x = GameConfig.stageWidth / 2 - topBg.width / 2;
        topBg.y = GameConfig.stageHeigth / 2 - topBg.height / 2 - 80;
        this._nodeContainer.addChild(topBg);
        var toptxt = BaseBitmap.create("monopoly_txt2");
        toptxt.x = GameConfig.stageWidth / 2 - toptxt.width / 2;
        toptxt.y = topBg.y + 65;
        this._nodeContainer.addChild(toptxt);
        var topBg2 = BaseBitmap.create("monopoly_bg6");
        topBg2.width = 320;
        topBg2.height = 90;
        topBg2.x = GameConfig.stageWidth / 2 - topBg2.width / 2;
        topBg2.y = toptxt.y + toptxt.height + 5;
        this._nodeContainer.addChild(topBg2);
        // 
        var lockTxt = "acMonopoly_reward_tip1";
        var tipTxt1 = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        var rewardVo = GameData.formatRewardItem(this.param.data.rewards)[0];
        tipTxt1.text = LanguageManager.getlocal(lockTxt, ["" + rewardVo.num]);
        tipTxt1.multiline = true;
        tipTxt1.lineSpacing = 3;
        tipTxt1.width = topBg2.width - 40;
        // topBg2.height = tipTxt1.height +  40;
        tipTxt1.x = topBg2.x + topBg2.width / 2 - tipTxt1.width / 2;
        tipTxt1.y = topBg2.y + topBg2.height / 2 - tipTxt1.height / 2;
        this._nodeContainer.addChild(tipTxt1);
        if (turnReward[turn - 1]) {
            var rewardstr = turnReward[turn - 1].getReward;
            var topBg3 = BaseBitmap.create("monopoly_bg7");
            topBg3.x = GameConfig.stageWidth / 2 - topBg3.width / 2;
            topBg3.y = topBg2.y + topBg2.height + 10;
            this._nodeContainer.addChild(topBg3);
            var tipTxt2 = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
            tipTxt2.text = LanguageManager.getlocal("acMonopoly_reward_tip2");
            tipTxt2.x = topBg3.x + topBg3.width / 2 - tipTxt2.width / 2;
            tipTxt2.y = topBg3.y + topBg3.height / 2 - tipTxt2.height / 2;
            this._nodeContainer.addChild(tipTxt2);
            var iconItem = GameData.getRewardItemIcons(rewardstr)[0];
            iconItem.x = GameConfig.stageWidth / 2 - iconItem.width / 2;
            iconItem.y = topBg.y + 310;
            this._nodeContainer.addChild(iconItem);
        }
        var goBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "sysConfirm", this.hide, this);
        goBtn.x = GameConfig.stageWidth / 2 - goBtn.width / 2;
        goBtn.y = topBg.y + topBg.height - 25;
        this._nodeContainer.addChild(goBtn);
        var closebtn = ComponentManager.getButton("load_closebtn", "", this.hide, this);
        closebtn.x = toptxt.x + toptxt.width + 50;
        closebtn.y = toptxt.y + 25;
        this._nodeContainer.addChild(closebtn);
        this._nodeContainer.anchorOffsetX = this._nodeContainer.width / 2;
        this._nodeContainer.anchorOffsetY = this._nodeContainer.height / 2;
        this._nodeContainer.x = this._nodeContainer.width / 2;
        this._nodeContainer.y = this._nodeContainer.height / 2;
        this._nodeContainer.setScale(0.7);
        egret.Tween.get(this._nodeContainer, { loop: false }).to({ scaleX: 1.0, scaleY: 1.0 }, 100);
    };
    AcMonopolyRewardPopupView.prototype.hide = function () {
        var callback = this.param.data.callback;
        if (callback) {
            callback.apply(this.param.data.tarobj);
        }
        _super.prototype.hide.call(this);
    };
    AcMonopolyRewardPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "monopoly_bg5", "monopoly_bg7", "monopoly_bg6",
            "monopoly_txt2",
        ]);
    };
    AcMonopolyRewardPopupView.prototype.getBgName = function () {
        return null;
    };
    AcMonopolyRewardPopupView.prototype.getButtomLineBg = function () {
        return null;
    };
    AcMonopolyRewardPopupView.prototype.getCloseBtnName = function () {
        return null;
    };
    AcMonopolyRewardPopupView.prototype.getTitleBgName = function () {
        return null;
    };
    AcMonopolyRewardPopupView.prototype.getTitleStr = function () {
        return "";
    };
    AcMonopolyRewardPopupView.prototype.dispose = function () {
        this._nodeContainer = null;
        _super.prototype.dispose.call(this);
    };
    return AcMonopolyRewardPopupView;
}(PopupView));
__reflect(AcMonopolyRewardPopupView.prototype, "AcMonopolyRewardPopupView");
