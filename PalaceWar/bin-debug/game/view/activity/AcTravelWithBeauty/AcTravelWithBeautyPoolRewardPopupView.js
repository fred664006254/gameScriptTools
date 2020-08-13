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
 * 奖池展示面板
 * author ycg
 * date 2019.11.4
 * @class AcTravelWithBeautyPoolRewardPopupView
 */
var AcTravelWithBeautyPoolRewardPopupView = (function (_super) {
    __extends(AcTravelWithBeautyPoolRewardPopupView, _super);
    function AcTravelWithBeautyPoolRewardPopupView() {
        return _super.call(this) || this;
    }
    AcTravelWithBeautyPoolRewardPopupView.prototype.initView = function () {
        var data = this.param.data;
        var topTxt = null;
        if (data && data.topMsg) {
            topTxt = ComponentManager.getTextField(data.topMsg, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
            topTxt.setPosition(this.viewBg.x + this.viewBg.width / 2 - topTxt.width / 2, 15);
            this.addChildToContainer(topTxt);
        }
        var listbg = BaseBitmap.create("public_9_bg4");
        listbg.width = 520;
        if (topTxt) {
            listbg.setPosition(this.viewBg.x + this.viewBg.width / 2 - listbg.width / 2, topTxt.y + topTxt.height + 5);
        }
        else {
            listbg.setPosition(this.viewBg.x + this.viewBg.width / 2 - listbg.width / 2, 15);
        }
        this.addChildToContainer(listbg);
        var scrolNode = new BaseDisplayObjectContainer();
        this.addChildToContainer(scrolNode);
        var rewardArr = GameData.getRewardItemIcons(data.rewards, true, true);
        for (var i in rewardArr) {
            var icon = rewardArr[i];
            var idx = Number(i);
            icon.x = 9 + (idx % 4) * (108 + 20);
            icon.y = 7 + Math.floor(idx / 4) * (108 + 8);
            scrolNode.addChild(icon);
        }
        scrolNode.height = Math.ceil(rewardArr.length / 4) * (108 + 8);
        scrolNode.width = listbg.width - 20;
        listbg.height = Math.ceil(rewardArr.length / 4) * (108 + 8) + 20;
        var rect = new egret.Rectangle(listbg.x + 10, listbg.y + 5, listbg.width - 20, listbg.height - 10);
        var scrollview = ComponentManager.getScrollView(scrolNode, rect);
        scrollview.bounces = false;
        scrollview.x = listbg.x + 10;
        scrollview.y = listbg.y + 5;
        scrollview.horizontalScrollPolicy = 'off';
        this.addChildToContainer(scrollview);
    };
    AcTravelWithBeautyPoolRewardPopupView.prototype.getTitleStr = function () {
        var titleStr = "acYiyibushePoolTitle";
        if (this.param.data && this.param.data.title) {
            titleStr = this.param.data.title;
        }
        return titleStr;
    };
    AcTravelWithBeautyPoolRewardPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([]);
    };
    AcTravelWithBeautyPoolRewardPopupView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AcTravelWithBeautyPoolRewardPopupView;
}(PopupView));
__reflect(AcTravelWithBeautyPoolRewardPopupView.prototype, "AcTravelWithBeautyPoolRewardPopupView");
//# sourceMappingURL=AcTravelWithBeautyPoolRewardPopupView.js.map