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
  * 比武招亲奖励Item
  * author 张朝阳
  * date 2018/12/18
  * @class AcMarryRewardScrollItem
  */
var AcYunDingLongKuRewardScrollItem = (function (_super) {
    __extends(AcYunDingLongKuRewardScrollItem, _super);
    function AcYunDingLongKuRewardScrollItem() {
        return _super.call(this) || this;
    }
    /**
     * 初始化itemview
     */
    AcYunDingLongKuRewardScrollItem.prototype.initItem = function (index, data, itemParam) {
        var bg = BaseBitmap.create("public_9_bg14");
        bg.width = 520;
        this.addChild(bg);
        var titleBg = BaseLoadBitmap.create("countrywarrewardview_itembg");
        titleBg.width = 508;
        titleBg.height = 35;
        titleBg.setPosition(bg.x + bg.width / 2 - titleBg.width / 2, bg.y + 5);
        this.addChild(titleBg);
        var titleTF = ComponentManager.getTextField(LanguageManager.getlocal("acYunDingLongKuRewardInfoViewItemTitleType" + data.id + "-" + itemParam.code), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        titleTF.setPosition(titleBg.x + titleBg.width / 2 - titleTF.width / 2, titleBg.y + titleBg.height / 2 - titleTF.height / 2);
        this.addChild(titleTF);
        var itemTopLine = BaseBitmap.create("public_line3");
        itemTopLine.width += titleTF.width;
        itemTopLine.setPosition(titleBg.x + titleBg.width / 2 - itemTopLine.width / 2, titleBg.y + titleBg.height / 2 - itemTopLine.height / 2);
        this.addChild(itemTopLine);
        var descTF = ComponentManager.getTextField(LanguageManager.getlocal("acYunDingLongKuRewardInfoViewItemDescType" + data.id + "-" + itemParam.code), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BLACK);
        descTF.setPosition(titleBg.x + titleBg.width / 2 - descTF.width / 2, titleBg.y + titleBg.height + 8);
        this.addChild(descTF);
        var rewardVoList = GameData.formatRewardItem(data.drawPoolReward);
        var itemHeight;
        for (var i = 0; i < rewardVoList.length; i++) {
            var rewardItem = GameData.getItemIcon(rewardVoList[i], true);
            rewardItem.anchorOffsetX = rewardItem.width / 2;
            rewardItem.anchorOffsetY = rewardItem.height / 2;
            rewardItem.setScale(0.85);
            rewardItem.setPosition(bg.x + 10 + rewardItem.width / 2 + i % 5 * (rewardItem.width - 10), descTF.y + descTF.height + rewardItem.height / 2 + (Math.floor((i) / 5)) * rewardItem.height - 5);
            this.addChild(rewardItem);
            itemHeight = rewardItem.height;
        }
        bg.height += (Math.floor(rewardVoList.length / 6) + 1) * itemHeight - 20;
    };
    AcYunDingLongKuRewardScrollItem.prototype.getSpaceY = function () {
        return 5;
    };
    AcYunDingLongKuRewardScrollItem.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AcYunDingLongKuRewardScrollItem;
}(ScrollListItem));
__reflect(AcYunDingLongKuRewardScrollItem.prototype, "AcYunDingLongKuRewardScrollItem");
//# sourceMappingURL=AcYunDingLongKuRewardScrollItem.js.map