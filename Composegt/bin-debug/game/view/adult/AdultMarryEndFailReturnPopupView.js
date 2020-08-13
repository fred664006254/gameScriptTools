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
 * 任务详情弹板
 * author yanyuling
 * date 2017/10/13
 * @class MainTaskDetailPopupView
 */
var AdultMarryEndFailReturnPopupView = (function (_super) {
    __extends(AdultMarryEndFailReturnPopupView, _super);
    function AdultMarryEndFailReturnPopupView() {
        return _super.call(this) || this;
    }
    AdultMarryEndFailReturnPopupView.prototype.initView = function () {
        var rewards = this.param.data.rewards;
        this._nodeContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(this._nodeContainer);
        var bg = BaseBitmap.create("public_tc_bg01");
        bg.width = 528;
        bg.height = 292 + 25;
        bg.setPosition((this.viewBg.width - bg.width) / 2, 10);
        this._nodeContainer.addChild(bg);
        var rbg = BaseBitmap.create("public_tc_bg03");
        rbg.width = 502;
        rbg.height = 145;
        rbg.setPosition(bg.x + (bg.width - rbg.width) / 2, bg.y + 15);
        this._nodeContainer.addChild(rbg);
        var leftF = BaseBitmap.create("public_tcdw_bg01");
        leftF.x = rbg.x + 5;
        leftF.y = rbg.y + 3;
        this._nodeContainer.addChild(leftF);
        var rightF = BaseBitmap.create("public_tcdw_bg02");
        rightF.x = rbg.x + rbg.width - rightF.width - 5;
        rightF.y = rbg.y + 3;
        this._nodeContainer.addChild(rightF);
        this._rewardContainer = new BaseDisplayObjectContainer();
        this._nodeContainer.addChild(this._rewardContainer);
        var tipText = ComponentManager.getTextField(LanguageManager.getlocal("adultMarryEndFailReturnTip"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        tipText.x = rbg.x + 40;
        tipText.y = rbg.y + 40;
        tipText.width = rbg.width - 80;
        this._nodeContainer.addChild(tipText);
        var rewardArr = GameData.formatRewardItem(rewards);
        this._rewardContainer.removeChildren();
        for (var index = 0; index < rewardArr.length; index++) {
            var iconItem = GameData.getItemIcon(rewardArr[index], true, true);
            iconItem.x = index * (iconItem.width + 10);
            this._rewardContainer.addChild(iconItem);
        }
        this._rewardContainer.y = rbg.y + rbg.height + 20;
        this._rewardContainer.x = rbg.x + rbg.width / 2 - this._rewardContainer.width / 2 + 10;
        var goBtn = ComponentManager.getButton(ButtonConst.BTN_BIG_YELLOW, "sysConfirm", this.hide, this);
        goBtn.x = bg.x + bg.width / 2 - goBtn.width / 2;
        goBtn.y = bg.y + bg.height + 15;
        // goBtn.setColor(TextFieldConst.COLOR_BLACK);
        this._nodeContainer.addChild(goBtn);
    };
    AdultMarryEndFailReturnPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([]);
    };
    AdultMarryEndFailReturnPopupView.prototype.dispose = function () {
        this._nodeContainer = null;
        this._rewardContainer = null;
        _super.prototype.dispose.call(this);
    };
    return AdultMarryEndFailReturnPopupView;
}(PopupView));
__reflect(AdultMarryEndFailReturnPopupView.prototype, "AdultMarryEndFailReturnPopupView");
