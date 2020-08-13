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
 * 折扣礼包详情弹板
 * author ycg
 * date 2019.11.28
 * @class AcAnniversaryShop2020GiftPopupView
 */
var AcAnniversaryShop2020GiftPopupView = (function (_super) {
    __extends(AcAnniversaryShop2020GiftPopupView, _super);
    function AcAnniversaryShop2020GiftPopupView() {
        return _super.call(this) || this;
    }
    AcAnniversaryShop2020GiftPopupView.prototype.initView = function () {
        var bg = BaseBitmap.create("public_9_bg4");
        bg.width = 520;
        bg.x = this.viewBg.x + this.viewBg.width / 2 - bg.width / 2;
        bg.y = 50;
        this.addChildToContainer(bg);
        var titleStr = LanguageManager.getlocal(this.param.data.titleName);
        var titleTf = ComponentManager.getTextField(titleStr, TextFieldConst.FONTSIZE_TITLE_SMALL, TextFieldConst.COLOR_BLACK);
        titleTf.setPosition(this.viewBg.x + this.viewBg.width / 2 - titleTf.width / 2, this.viewBg.y + 14);
        this.addChildToContainer(titleTf);
        var getReward = this.param.data.reward;
        var rewardArr = GameData.formatRewardItem(getReward);
        var scroStartY = bg.y + 15;
        var len = Math.min(4, rewardArr.length);
        var tmpX = (bg.width - len * 108 - (len - 1) * 7) / 2;
        for (var index = 0; index < rewardArr.length; index++) {
            var iconItem = GameData.getItemIcon(rewardArr[index], true);
            iconItem.x = bg.x + tmpX;
            iconItem.y = scroStartY;
            tmpX += (iconItem.width * iconItem.scaleX + 7);
            if (tmpX > bg.width - 8) {
                tmpX = (bg.width - len * 108 - (len - 1) * 7) / 2;
                scroStartY += (iconItem.height * iconItem.scaleX) + 10;
                iconItem.x = bg.x + tmpX;
                iconItem.y = scroStartY;
                tmpX += (iconItem.width * iconItem.scaleX + 7);
            }
            this.addChildToContainer(iconItem);
        }
        scroStartY += 106;
        bg.height = scroStartY - 35;
        this.viewBg.height = bg.height + 100;
    };
    AcAnniversaryShop2020GiftPopupView.prototype.getBgName = function () {
        return this.param.data.bgName;
    };
    AcAnniversaryShop2020GiftPopupView.prototype.getTitleStr = function () {
        return null;
    };
    AcAnniversaryShop2020GiftPopupView.prototype.isTouchMaskClose = function () {
        return true;
    };
    AcAnniversaryShop2020GiftPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([]);
    };
    AcAnniversaryShop2020GiftPopupView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AcAnniversaryShop2020GiftPopupView;
}(PopupView));
__reflect(AcAnniversaryShop2020GiftPopupView.prototype, "AcAnniversaryShop2020GiftPopupView");
//# sourceMappingURL=AcAnniversaryShop2020GiftPopupView.js.map