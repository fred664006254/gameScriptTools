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
 * 国庆活动 奖励预览
 * author yangchengguo
 * date 2019.9.16
 * @class  AcNationalDayRewardPopupView
 */
var AcNationalDayRewardPopupView = (function (_super) {
    __extends(AcNationalDayRewardPopupView, _super);
    function AcNationalDayRewardPopupView() {
        return _super.call(this) || this;
    }
    AcNationalDayRewardPopupView.prototype.initView = function () {
        var topTitle = null;
        if (this.topMsg) {
            topTitle = ComponentManager.getTextField(LanguageManager.getlocal(this.topMsg), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
            topTitle.setPosition(this.viewBg.x + this.viewBg.width / 2 - topTitle.width / 2, 15 + 30);
            this.addChildToContainer(topTitle);
        }
        var listbg = BaseBitmap.create("public_9_probiginnerbg");
        listbg.width = 526;
        listbg.setPosition(this.viewBg.x + this.viewBg.width / 2 - listbg.width / 2, 15 + 30);
        this.addChildToContainer(listbg);
        if (topTitle) {
            listbg.setPosition(this.viewBg.x + this.viewBg.width / 2 - listbg.width / 2, topTitle.y + topTitle.height + 10);
        }
        var scrolNode = new BaseDisplayObjectContainer();
        this.addChildToContainer(scrolNode);
        scrolNode.width = listbg.width - 16;
        if (this.rewards) {
            var rewardArr = GameData.getRewardItemIcons(this.rewards, true, true);
            for (var i in rewardArr) {
                var icon = rewardArr[i];
                var idx = Number(i);
                icon.x = 10 + (idx % 4) * (108 + 20);
                icon.y = 9 + Math.floor(idx / 4) * (108 + 8);
                scrolNode.addChild(icon);
            }
            scrolNode.height = Math.ceil(rewardArr.length / 4) * (108 + 8);
            listbg.height = Math.ceil(rewardArr.length / 4) * (108 + 8) + 20;
            var rect = new egret.Rectangle(listbg.x + 8, listbg.y + 5, listbg.width - 16, listbg.height - 10);
            var scrollview = ComponentManager.getScrollView(scrolNode, rect);
            scrollview.bounces = false;
            scrollview.x = listbg.x + 8;
            scrollview.y = listbg.y + 5;
            scrollview.horizontalScrollPolicy = 'off';
            this.addChildToContainer(scrollview);
        }
    };
    Object.defineProperty(AcNationalDayRewardPopupView.prototype, "rewards", {
        get: function () {
            if (this.param && this.param.data && this.param.data.rewards) {
                return this.param.data.rewards;
            }
            return null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcNationalDayRewardPopupView.prototype, "topMsg", {
        get: function () {
            if (this.param && this.param.data && this.param.data.topMsg) {
                return this.param.data.topMsg;
            }
            return null;
        },
        enumerable: true,
        configurable: true
    });
    AcNationalDayRewardPopupView.prototype.getTitleStr = function () {
        return "acNationalDayRewardTitle";
    };
    AcNationalDayRewardPopupView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AcNationalDayRewardPopupView;
}(PopupView));
__reflect(AcNationalDayRewardPopupView.prototype, "AcNationalDayRewardPopupView");
//# sourceMappingURL=AcNationalDayRewardPopupView.js.map