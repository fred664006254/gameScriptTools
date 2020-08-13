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
  * 马超活动排行榜奖励
  * author 张朝阳
  * date 2019/1/14
  * @class AcMaChaoRankRewardScrollItem
  */
var AcMaChaoRankRewardScrollItem = (function (_super) {
    __extends(AcMaChaoRankRewardScrollItem, _super);
    function AcMaChaoRankRewardScrollItem() {
        return _super.call(this) || this;
    }
    /**
     * 初始化viewItem
     */
    AcMaChaoRankRewardScrollItem.prototype.initItem = function (index, data) {
        var itemBg = BaseBitmap.create("public_9_bg14");
        itemBg.width = 516;
        itemBg.height = 10;
        this.addChild(itemBg);
        var itemTopBg = BaseLoadBitmap.create("countrywarrewardview_itembg");
        itemTopBg.width = itemBg.width;
        itemTopBg.width = 508;
        itemTopBg.height = 35;
        itemTopBg.setPosition(itemBg.x + itemBg.width / 2 - itemTopBg.width / 2, itemBg.y + 7);
        this.addChild(itemTopBg);
        var itemTopLine = BaseBitmap.create("public_line3");
        itemTopLine.width = itemTopBg.width - 60;
        itemTopLine.setPosition(itemTopBg.x + 30, itemTopBg.y + itemTopBg.height / 2 - itemTopLine.height / 2);
        this.addChild(itemTopLine);
        var itemTitleTF;
        if (index < 3) {
            itemTitleTF = ComponentManager.getTextField(LanguageManager.getlocal("acRank_rank" + String(index + 1)), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        }
        else {
            itemTitleTF = ComponentManager.getTextField(LanguageManager.getlocal("acRank_rank4", [data.rank[0], data.rank[1]]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        }
        itemTitleTF.setPosition(itemTopBg.x + itemTopBg.width / 2 - itemTitleTF.width / 2, itemTopBg.y + itemTopBg.height / 2 - itemTitleTF.height / 2);
        this.addChild(itemTitleTF);
        //15
        var rewardArr = GameData.formatRewardItem(data.getReward);
        var itemHeigth;
        for (var i = 0; i < rewardArr.length; i++) {
            var rewardItem = GameData.getItemIcon(rewardArr[i], true, true);
            rewardItem.setScale(0.83);
            rewardItem.setPosition(itemTopBg.x + i % 5 * (rewardItem.width - 12) + 20, itemTopBg.y + itemTopBg.height + Math.floor(i / 5) * (rewardItem.height) + 15);
            this.addChild(rewardItem);
            //记录item的高度
            itemHeigth = rewardItem.height;
        }
        var num = rewardArr.length % 5 == 0 ? (rewardArr.length / 5) - 1 : Math.floor(rewardArr.length / 5);
        itemBg.height += (num + 1) * itemHeigth - 30;
        this.height = itemBg.height;
    };
    AcMaChaoRankRewardScrollItem.prototype.getSpaceY = function () {
        return 5;
    };
    AcMaChaoRankRewardScrollItem.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AcMaChaoRankRewardScrollItem;
}(ScrollListItem));
__reflect(AcMaChaoRankRewardScrollItem.prototype, "AcMaChaoRankRewardScrollItem");
//# sourceMappingURL=AcMaChaoRankRewardScrollItem.js.map