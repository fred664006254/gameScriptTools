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
 * 调查问卷奖励预览
 * author qianjun
 */
var AcQuestionnaireRewardPopupView = (function (_super) {
    __extends(AcQuestionnaireRewardPopupView, _super);
    function AcQuestionnaireRewardPopupView() {
        return _super.call(this) || this;
    }
    Object.defineProperty(AcQuestionnaireRewardPopupView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcQuestionnaireRewardPopupView.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcQuestionnaireRewardPopupView.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    AcQuestionnaireRewardPopupView.prototype.getUiCode = function () {
        var currCode = "";
        switch (Number(this.code)) {
            default:
                currCode = "1";
                break;
        }
        return currCode;
    };
    AcQuestionnaireRewardPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([]);
    };
    AcQuestionnaireRewardPopupView.prototype.initView = function () {
        // let tabName = ["acPunishRankRewardTab1"];
        var view = this;
        var rewardArr = GameData.getRewardItemIcons(view.cfg.getReward, true, true); //view.cfg.getWealthGod()
        var listbg = BaseBitmap.create("public_9_probiginnerbg");
        listbg.width = 520;
        listbg.setPosition(this.viewBg.x + this.viewBg.width / 2 - listbg.width / 2, 10);
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
        listbg.height = scrolNode.height + 15;
        var rect = new egret.Rectangle(listbg.x + 10, listbg.y + 5, listbg.width - 20, listbg.height - 10);
        var scrollview = ComponentManager.getScrollView(scrolNode, rect);
        scrollview.bounces = false;
        scrollview.x = listbg.x + 10;
        scrollview.y = listbg.y + 5;
        scrollview.horizontalScrollPolicy = 'off';
        this.addChildToContainer(scrollview);
        var btn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "sysConfirm", function () {
            view.hide();
        }, view);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, btn, listbg, [0, listbg.height + 25]);
        this.addChildToContainer(btn);
    };
    AcQuestionnaireRewardPopupView.prototype.getTitleStr = function () {
        return "acqareward-" + this.code;
    };
    AcQuestionnaireRewardPopupView.prototype.dispose = function () {
        var view = this;
        _super.prototype.dispose.call(this);
    };
    return AcQuestionnaireRewardPopupView;
}(PopupView));
__reflect(AcQuestionnaireRewardPopupView.prototype, "AcQuestionnaireRewardPopupView");
//# sourceMappingURL=AcQuestionnaireRewardPopupView.js.map