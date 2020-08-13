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
var DailybossnewRewardPopupView = (function (_super) {
    __extends(DailybossnewRewardPopupView, _super);
    function DailybossnewRewardPopupView() {
        var _this = _super.call(this) || this;
        _this._rewardBtn = null;
        return _this;
    }
    DailybossnewRewardPopupView.prototype.initView = function () {
        var tiptext = ComponentManager.getTextField(LanguageManager.getlocal("dailybossnewRewardTip"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WARN_RED2);
        tiptext.width = 520;
        tiptext.setPosition(this.viewBg.width / 2 - tiptext.width / 2, 12);
        tiptext.textAlign = egret.HorizontalAlign.CENTER;
        this.addChildToContainer(tiptext);
        var bg = BaseBitmap.create("public_9_bg4");
        bg.width = 520;
        bg.height = 595;
        bg.setPosition(this.viewBg.x + this.viewBg.width / 2 - bg.width / 2, tiptext.y + tiptext.height + 10);
        this.addChildToContainer(bg);
        var newarr = Config.DailybossnewCfg.boss2;
        var allkeys = Object.keys(newarr);
        var cfgArray = [];
        for (var i = 0; i < allkeys.length; i++) {
            cfgArray.push(newarr[allkeys[i]]);
        }
        var rect = new egret.Rectangle(0, 0, 510, 585);
        var scrollList = ComponentManager.getScrollList(DailybossnewRewardItem, cfgArray, rect);
        scrollList.setPosition(bg.x + 5, bg.y + 5);
        scrollList.bounces = false;
        this.addChildToContainer(scrollList);
        var bg3 = BaseBitmap.create("public_9_bg1");
        bg3.width = bg.width;
        bg3.height = 90;
        bg3.setPosition(bg.x, bg.y + bg.height + 15);
        this.addChildToContainer(bg3);
        var rankV = "10000+";
        var addV = 0;
        if (this.param.data.myrank && this.param.data.myrank.myrank) {
            rankV = String(this.param.data.myrank.myrank);
            addV = this.param.data.myrank.value;
        }
        var myRankTxt = ComponentManager.getTextField(LanguageManager.getlocal("dailybossnewRankDesc1", [String(addV)]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        myRankTxt.x = bg3.x + 25;
        myRankTxt.y = bg3.y + 16;
        this.addChildToContainer(myRankTxt);
        var addvalueTxt = ComponentManager.getTextField(LanguageManager.getlocal("dailybossnewRankDesc2", [rankV]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        addvalueTxt.x = myRankTxt.x;
        addvalueTxt.y = myRankTxt.y + 38;
        this.addChildToContainer(addvalueTxt);
        if (Api.dailybossnewVoApi.getRewardFlag() == 0) {
            var noawardText = ComponentManager.getTextField(LanguageManager.getlocal("dailybossnewNoAward"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
            noawardText.width = 140;
            noawardText.x = bg3.x + bg3.width - noawardText.width - 20;
            noawardText.textAlign = egret.HorizontalAlign.CENTER;
            noawardText.y = bg3.y + bg3.height / 2 - noawardText.height / 2;
            this.addChildToContainer(noawardText);
        }
        else {
            this._rewardBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "dailybossnewReward", this.rewardHandle, this);
            this._rewardBtn.setPosition(bg3.x + bg3.width - this._rewardBtn.width - 26, bg3.y + bg3.height / 2 - this._rewardBtn.height / 2);
            this.addChildToContainer(this._rewardBtn);
            this.resetBtn();
        }
    };
    DailybossnewRewardPopupView.prototype.resetBtn = function () {
        var f = Api.dailybossnewVoApi.getRewardFlag();
        if (f == 1) {
            App.CommonUtil.addIconToBDOC(this._rewardBtn);
        }
        else if (f == 2) {
            App.CommonUtil.removeIconFromBDOC(this._rewardBtn);
            this._rewardBtn.setEnable(false);
            this._rewardBtn.setText("candyGetAlready");
        }
        else {
            this._rewardBtn.visible = false;
        }
    };
    DailybossnewRewardPopupView.prototype.rewardHandle = function () {
        this.request(NetRequestConst.REQUEST_NEWBOSS_GETREWARD, {});
    };
    DailybossnewRewardPopupView.prototype.receiveData = function (data) {
        this.resetBtn();
        if (data.data.data.rewards) {
            var rewards = data.data.data.rewards;
            var score = data.data.data.score;
            var awardstr = rewards;
            if (score) {
                awardstr = "1022_0_" + score + "|" + rewards;
            }
            var rewardVo = GameData.formatRewardItem(awardstr);
            App.CommonUtil.playRewardFlyAction(rewardVo);
        }
    };
    DailybossnewRewardPopupView.prototype.getTitleStr = function () {
        return "acPunishRankRewardPopupViewTitle";
    };
    DailybossnewRewardPopupView.prototype.getBgExtraHeight = function () {
        return 10;
    };
    DailybossnewRewardPopupView.prototype.dispose = function () {
        this._rewardBtn = null;
        _super.prototype.dispose.call(this);
    };
    return DailybossnewRewardPopupView;
}(PopupView));
__reflect(DailybossnewRewardPopupView.prototype, "DailybossnewRewardPopupView");
//# sourceMappingURL=DailybossnewRewardPopupView.js.map