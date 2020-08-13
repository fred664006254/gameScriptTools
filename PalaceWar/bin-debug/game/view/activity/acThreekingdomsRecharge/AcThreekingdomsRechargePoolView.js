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
 * 奖励预览
 * author ycg
 * date 2020.1.19
 */
var AcThreekingdomsRechargePoolView = (function (_super) {
    __extends(AcThreekingdomsRechargePoolView, _super);
    function AcThreekingdomsRechargePoolView() {
        return _super.call(this) || this;
    }
    AcThreekingdomsRechargePoolView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "public_textbrownbg",
        ]);
    };
    AcThreekingdomsRechargePoolView.prototype.getBgName = function () {
        return "popupview_bg3";
    };
    AcThreekingdomsRechargePoolView.prototype.getCloseBtnName = function () {
        return "popupview_closebtn2";
    };
    AcThreekingdomsRechargePoolView.prototype.initView = function () {
        // let tabName = ["acPunishRankRewardTab1"];
        var view = this;
        var tipbg = BaseBitmap.create("public_textbrownbg");
        tipbg.width = 510;
        view.addChildToContainer(tipbg);
        tipbg.setPosition(this.viewBg.x + this.viewBg.width / 2 - tipbg.width / 2, 10);
        var tipTxtStr1 = view.param.data.topMsg;
        var tipTxt = ComponentManager.getTextField(tipTxtStr1, 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, tipTxt, tipbg);
        view.addChildToContainer(tipTxt);
        var rewards = view.param.data.rewards;
        var rewardArr = GameData.getRewardItemIcons(rewards, true, true); //view.cfg.getWealthGod()
        var listbg = BaseBitmap.create("public_9_bg94");
        listbg.width = 520;
        // listbg.height = 370;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, listbg, tipbg, [0, tipbg.height + 55]);
        view.addChildToContainer(listbg);
        var tip2Txt = ComponentManager.getTextField(LanguageManager.getlocal("dailyTask_rewardTip"), 18, TextFieldConst.COLOR_BLACK);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, tip2Txt, listbg, [3, -tip2Txt.height - 2]);
        view.addChildToContainer(tip2Txt);
        var scrolNode = new BaseDisplayObjectContainer();
        view.addChildToContainer(scrolNode);
        for (var i in rewardArr) {
            var icon = rewardArr[i];
            var idx = Number(i);
            icon.x = 7 + (idx % 4) * (108 + 18);
            icon.y = 5 + Math.floor(idx / 4) * (108 + 8);
            scrolNode.addChild(icon);
        }
        scrolNode.height = Math.ceil(rewardArr.length / 4) * (108 + 8);
        scrolNode.width = listbg.width - 20;
        listbg.height = scrolNode.height + 20;
        var rect = new egret.Rectangle(0, 0, listbg.width - 20, listbg.height - 20);
        var scrollview = ComponentManager.getScrollView(scrolNode, rect);
        scrollview.bounces = false;
        scrollview.x = listbg.x + 10;
        scrollview.y = listbg.y + 10;
        scrollview.horizontalScrollPolicy = 'off';
        this.addChildToContainer(scrollview);
        var btn = ComponentManager.getButton(ButtonConst.BTN2_NORMAL_YELLOW, "sysConfirm", function () {
            view.hide();
        }, view);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, btn, listbg, [0, listbg.height + 15]);
        this.addChildToContainer(btn);
    };
    // protected getShowHeight():number{
    // 	return 640;
    // }
    AcThreekingdomsRechargePoolView.prototype.getBgExtraHeight = function () {
        return 20;
    };
    AcThreekingdomsRechargePoolView.prototype.getTitleStr = function () {
        return "acThreekingdomsRechargePoolTitle";
    };
    AcThreekingdomsRechargePoolView.prototype.dispose = function () {
        var view = this;
        _super.prototype.dispose.call(this);
    };
    return AcThreekingdomsRechargePoolView;
}(PopupView));
__reflect(AcThreekingdomsRechargePoolView.prototype, "AcThreekingdomsRechargePoolView");
//# sourceMappingURL=AcThreekingdomsRechargePoolView.js.map