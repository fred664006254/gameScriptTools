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
var DailybossRankRewardPopupView = (function (_super) {
    __extends(DailybossRankRewardPopupView, _super);
    function DailybossRankRewardPopupView() {
        return _super.call(this) || this;
    }
    DailybossRankRewardPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "dailybossranktitle"
        ]);
    };
    DailybossRankRewardPopupView.prototype.initView = function () {
        var title = BaseBitmap.create("dailybossranktitle");
        title.setPosition((this.viewBg.width - title.width) / 2, 10);
        this.addChildToContainer(title);
        var descTxt = ComponentManager.getTextField(LanguageManager.getlocal("dailybossType2RankDesc", [Config.DailybossCfg.getBossNameByType(2), this.getBattleData().myrank.toString()]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
        descTxt.textAlign = egret.HorizontalAlign.CENTER;
        descTxt.lineSpacing = 5;
        descTxt.width = 450;
        descTxt.setPosition((this.viewBg.width - descTxt.width) / 2, title.y + title.height + 30);
        this.addChildToContainer(descTxt);
        var rewardVo = GameData.formatRewardItem(this.getBattleData().rewards)[0];
        if (rewardVo) {
            var rewardTxt = ComponentManager.getTextField(rewardVo.name + App.StringUtil.formatStringColor("+" + rewardVo.num, TextFieldConst.COLOR_WARN_GREEN), TextFieldConst.FONTSIZE_CONTENT_COMMON);
            rewardTxt.setPosition(descTxt.x + 30, descTxt.y + descTxt.height + 20);
            this.addChildToContainer(rewardTxt);
            var rightScoreTxt = ComponentManager.getTextField(LanguageManager.getlocal("dailybossRankValue1Desc") + App.StringUtil.formatStringColor("+" + this.getBattleData().score, TextFieldConst.COLOR_WARN_GREEN), TextFieldConst.FONTSIZE_CONTENT_COMMON);
            rightScoreTxt.setPosition(descTxt.x + descTxt.width - rightScoreTxt.width - 30, rewardTxt.y);
            this.addChildToContainer(rightScoreTxt);
        }
        this.addTouchTap(this.hide, this);
    };
    DailybossRankRewardPopupView.prototype.getTitleStr = function () {
        return null;
    };
    DailybossRankRewardPopupView.prototype.getCloseBtnName = function () {
        return null;
    };
    DailybossRankRewardPopupView.prototype.isTouchMaskClose = function () {
        return true;
    };
    DailybossRankRewardPopupView.prototype.getBattleData = function () {
        return this.param.data;
    };
    DailybossRankRewardPopupView.prototype.getBgName = function () {
        return "public_9_wordbg";
    };
    return DailybossRankRewardPopupView;
}(PopupView));
__reflect(DailybossRankRewardPopupView.prototype, "DailybossRankRewardPopupView");
//# sourceMappingURL=DailybossRankRewardPopupView.js.map