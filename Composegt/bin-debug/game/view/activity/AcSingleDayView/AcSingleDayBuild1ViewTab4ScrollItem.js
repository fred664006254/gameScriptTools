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
 * 双11  排行榜 item
 * @author 张朝阳
 * date 2018/10/24
 * @class AcSingleDayBuild1ViewTab4ScrollItem
 */
var AcSingleDayBuild1ViewTab4ScrollItem = (function (_super) {
    __extends(AcSingleDayBuild1ViewTab4ScrollItem, _super);
    function AcSingleDayBuild1ViewTab4ScrollItem() {
        return _super.call(this) || this;
    }
    AcSingleDayBuild1ViewTab4ScrollItem.prototype.initItem = function (index, data) {
        var bg = BaseBitmap.create("rechargevie_db_01");
        bg.width = GameConfig.stageWidth - 20;
        this.addChild(bg);
        var titleStr = null;
        if (data.maxRank != data.minRank) {
            titleStr = LanguageManager.getlocal("acSingleDayBuild1ViewTab4ItemTile2", [data.minRank, data.maxRank]);
        }
        else {
            titleStr = LanguageManager.getlocal("acSingleDayBuild1ViewTab4ItemTile1", [data.minRank]);
        }
        var titleTxt = ComponentManager.getTextField(titleStr, TextFieldConst.FONTSIZE_CONTENT_COMMON, 0xa87e00);
        titleTxt.setPosition(bg.x + bg.width / 2 - titleTxt.width / 2, bg.y + 20);
        this.addChild(titleTxt);
        var leftLine = BaseBitmap.create("public_v_huawen01");
        leftLine.setPosition(titleTxt.x - leftLine.width - 35, titleTxt.y + titleTxt.height / 2 - leftLine.height / 2);
        this.addChild(leftLine);
        var rightLine = BaseBitmap.create("public_v_huawen01");
        rightLine.anchorOffsetX = rightLine.width / 2;
        rightLine.anchorOffsetY = rightLine.height / 2;
        rightLine.rotation = 180;
        rightLine.setPosition(titleTxt.x + titleTxt.width + rightLine.width / 2 + 35, titleTxt.y + titleTxt.height / 2);
        this.addChild(rightLine);
        var rewardVoList = GameData.formatRewardItem(data.getReward);
        var offsetHeigth = 0;
        for (var i = 0; i < rewardVoList.length; i++) {
            var itemDB = GameData.getItemIcon(rewardVoList[i], true, false);
            itemDB.setPosition(bg.x + 15 + (itemDB.width + 15) * (i % 5), bg.y + 60 + (itemDB.height + 15) * Math.floor(i / 5));
            this.addChild(itemDB);
            offsetHeigth = itemDB.height;
        }
        bg.height = offsetHeigth * (Math.floor(rewardVoList.length / 6) + 1) + 115;
    };
    AcSingleDayBuild1ViewTab4ScrollItem.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AcSingleDayBuild1ViewTab4ScrollItem;
}(ScrollListItem));
__reflect(AcSingleDayBuild1ViewTab4ScrollItem.prototype, "AcSingleDayBuild1ViewTab4ScrollItem");
