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
 * author qianjun
 */
var AcAnnualPrayRewardPoolView = (function (_super) {
    __extends(AcAnnualPrayRewardPoolView, _super);
    function AcAnnualPrayRewardPoolView() {
        return _super.call(this) || this;
    }
    Object.defineProperty(AcAnnualPrayRewardPoolView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcAnnualPrayRewardPoolView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcAnnualPrayRewardPoolView.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcAnnualPrayRewardPoolView.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    AcAnnualPrayRewardPoolView.prototype.getUiCode = function () {
        var code = '';
        switch (Number(this.code)) {
            case 2:
                code = '1';
                break;
            default:
                code = this.code;
                break;
        }
        return code;
    };
    AcAnnualPrayRewardPoolView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([]);
    };
    AcAnnualPrayRewardPoolView.prototype.initView = function () {
        // let tabName = ["acPunishRankRewardTab1"];
        var view = this;
        var tipTxt = ComponentManager.getTextField(LanguageManager.getlocal("acAnnualPrayPrayTip10-" + view.getUiCode()), 20, TextFieldConst.COLOR_BLACK);
        tipTxt.setPosition(this.viewBg.x + this.viewBg.width / 2 - tipTxt.width / 2, 10);
        view.addChildToContainer(tipTxt);
        var rewards = view.cfg.getWealthGod(2);
        var rewardArr = GameData.getRewardItemIcons(rewards, true, true); //view.cfg.getWealthGod()
        var listbg = BaseBitmap.create("public_9_probiginnerbg");
        listbg.width = 520;
        listbg.height = 140;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, listbg, tipTxt, [0, tipTxt.textHeight + 10]);
        view.addChildToContainer(listbg);
        var scrolNode = new BaseDisplayObjectContainer();
        view.addChildToContainer(scrolNode);
        for (var i in rewardArr) {
            var icon = rewardArr[i];
            var idx = Number(i);
            icon.x = 9 + (idx % 4) * (108 + 20);
            icon.y = 5 + Math.floor(idx / 4) * (108 + 8);
            scrolNode.addChild(icon);
        }
        scrolNode.height = Math.ceil(rewardArr.length / 4) * (108 + 8);
        scrolNode.width = listbg.width - 20;
        var rect = new egret.Rectangle(listbg.x + 10, listbg.y + 5, listbg.width - 20, listbg.height - 10);
        var scrollview = ComponentManager.getScrollView(scrolNode, rect);
        scrollview.bounces = false;
        scrollview.x = listbg.x + 10;
        scrollview.y = listbg.y + 12;
        scrollview.horizontalScrollPolicy = 'off';
        this.addChildToContainer(scrollview);
        var tipTxt2 = ComponentManager.getTextField(LanguageManager.getlocal("acAnnualPrayPrayTip3-" + view.getUiCode()), 20, TextFieldConst.COLOR_BLACK);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tipTxt2, listbg, [0, listbg.height + 10]);
        view.addChildToContainer(tipTxt2);
        var rewards2 = view.cfg.getWealthGod(1);
        var rewardArr2 = GameData.getRewardItemIcons(rewards2, true, true); //view.cfg.getWealthGod()
        var listbg2 = BaseBitmap.create("public_9_probiginnerbg");
        listbg2.width = 520;
        listbg2.height = 210;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, listbg2, tipTxt2, [0, tipTxt2.textHeight + 10]);
        view.addChildToContainer(listbg2);
        var scrolNode2 = new BaseDisplayObjectContainer();
        view.addChildToContainer(scrolNode2);
        for (var i in rewardArr2) {
            var icon = rewardArr2[i];
            var idx = Number(i);
            icon.x = 9 + (idx % 4) * (108 + 20);
            icon.y = 5 + Math.floor(idx / 4) * (108 + 8);
            scrolNode2.addChild(icon);
        }
        scrolNode2.height = Math.ceil(rewardArr2.length / 4) * (108 + 8);
        scrolNode2.width = listbg2.width - 20;
        var rect2 = new egret.Rectangle(listbg2.x + 10, listbg2.y + 5, listbg2.width - 20, listbg2.height - 10);
        var scrollview2 = ComponentManager.getScrollView(scrolNode2, rect2);
        scrollview2.bounces = false;
        scrollview2.x = listbg2.x + 10;
        scrollview2.y = listbg2.y + 5;
        scrollview2.horizontalScrollPolicy = 'off';
        this.addChildToContainer(scrollview2);
        var btn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "sysConfirm", function () {
            view.hide();
        }, view);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, btn, listbg2, [0, listbg2.height + 7]);
        this.addChildToContainer(btn);
    };
    AcAnnualPrayRewardPoolView.prototype.getShowHeight = function () {
        return 580;
    };
    AcAnnualPrayRewardPoolView.prototype.getTitleStr = function () {
        return "motherdaypoolreward-" + this.getUiCode();
    };
    AcAnnualPrayRewardPoolView.prototype.dispose = function () {
        var view = this;
        _super.prototype.dispose.call(this);
    };
    return AcAnnualPrayRewardPoolView;
}(PopupView));
__reflect(AcAnnualPrayRewardPoolView.prototype, "AcAnnualPrayRewardPoolView");
//# sourceMappingURL=AcAnnualPrayRewardPoolView.js.map