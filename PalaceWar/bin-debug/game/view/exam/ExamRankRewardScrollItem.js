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
  * 科举答题奖励排行榜
  * author yangchengguo
  * date 2019.7.24
  * @class ExamRankRewardScrollItem
  */
var ExamRankRewardScrollItem = (function (_super) {
    __extends(ExamRankRewardScrollItem, _super);
    function ExamRankRewardScrollItem() {
        return _super.call(this) || this;
    }
    /**
     * 初始化viewItem
     */
    ExamRankRewardScrollItem.prototype.initItem = function (index, data) {
        var itemBg = BaseBitmap.create("public_9_bg14");
        itemBg.width = 516;
        itemBg.height = 0;
        this.addChild(itemBg);
        var itemTopBg = BaseLoadBitmap.create("countrywarrewardview_itembg");
        itemTopBg.width = itemBg.width;
        itemTopBg.height = 35;
        itemTopBg.setPosition(itemBg.x, itemBg.y + 8);
        this.addChild(itemTopBg);
        var itemTopLine = BaseBitmap.create("public_line3");
        itemTopLine.width = itemTopBg.width - 60;
        itemTopLine.setPosition(itemTopBg.x + 30, itemTopBg.y + itemTopBg.height / 2 - itemTopLine.height / 2);
        this.addChild(itemTopLine);
        var itemTitleTF;
        if (index < 3) {
            itemTitleTF = ComponentManager.getTextField(LanguageManager.getlocal("examinationRankNum" + String(index + 1)), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        }
        else {
            itemTitleTF = ComponentManager.getTextField(LanguageManager.getlocal("examinationRankNum4", [data.rank[0], data.rank[1]]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        }
        itemTitleTF.setPosition(itemTopBg.x + itemTopBg.width / 2 - itemTitleTF.width / 2, itemTopBg.y + itemTopBg.height / 2 - itemTitleTF.height / 2);
        this.addChild(itemTitleTF);
        var numberoneTitle;
        var numberoneTitleTF;
        if (index == 0) {
            numberoneTitleTF = ComponentManager.getTextField(LanguageManager.getlocal("examinationGetTitle"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_BLACK);
            this.addChild(numberoneTitleTF);
            numberoneTitle = BaseLoadBitmap.create("examview_champion_title1");
            numberoneTitle.width = 155;
            numberoneTitle.height = 59;
            numberoneTitleTF.setPosition(itemBg.x + itemBg.width / 2 - numberoneTitleTF.width / 2 - numberoneTitle.width / 2, itemTopBg.y + itemTopBg.height + numberoneTitle.height / 2 - numberoneTitleTF.height / 2);
            numberoneTitle.setPosition(numberoneTitleTF.x + numberoneTitleTF.width, itemTopBg.y + +itemTopBg.height);
            this.addChild(numberoneTitle);
            itemBg.height = numberoneTitle.height + 40;
        }
        var rewardArr = GameData.formatRewardItem(data.getReward);
        var itemHeigth = 0;
        for (var i = 0; i < rewardArr.length; i++) {
            var rewardItem = GameData.getItemIcon(rewardArr[i], true, true);
            rewardItem.setScale(0.83);
            if (index == 0) {
                rewardItem.setPosition(itemTopBg.x + i % 5 * (rewardItem.width - 12) + 20, itemTopBg.y + itemTopBg.height + Math.floor(i / 5) * (rewardItem.height - 10) + 5 + numberoneTitle.height);
            }
            else {
                rewardItem.setPosition(itemTopBg.x + i % 5 * (rewardItem.width - 12) + 20, itemTopBg.y + itemTopBg.height + Math.floor(i / 5) * (rewardItem.height - 10) + 15); //15
            }
            this.addChild(rewardItem);
            //记录item的高度
            itemHeigth = rewardItem.height;
        }
        if (index != 0) {
            itemBg.height += (Math.ceil(rewardArr.length / 5)) * itemHeigth - 30;
        }
        else {
            itemBg.height += (Math.ceil(rewardArr.length / 5)) * itemHeigth + 18;
        }
        this.height = itemBg.height;
    };
    ExamRankRewardScrollItem.prototype.getSpaceY = function () {
        return 5;
    };
    ExamRankRewardScrollItem.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return ExamRankRewardScrollItem;
}(ScrollListItem));
__reflect(ExamRankRewardScrollItem.prototype, "ExamRankRewardScrollItem");
//# sourceMappingURL=ExamRankRewardScrollItem.js.map