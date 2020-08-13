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
var DailybossnewRewardItem = (function (_super) {
    __extends(DailybossnewRewardItem, _super);
    function DailybossnewRewardItem() {
        return _super.call(this) || this;
    }
    DailybossnewRewardItem.prototype.initItem = function (index, data) {
        var bg = BaseBitmap.create("public_9_bg14");
        bg.width = 510;
        bg.height = 168;
        this.addChild(bg);
        var titleBg = BaseLoadBitmap.create("countrywarrewardview_itembg");
        titleBg.width = 508;
        titleBg.height = 35;
        titleBg.setPosition(bg.x + bg.width / 2 - titleBg.width / 2, bg.y + 10);
        this.addChild(titleBg);
        var rank = data.rank;
        var parmStr;
        if (rank[0] == rank[1]) {
            parmStr = App.StringUtil.changeIntToCharText(rank[0]);
        }
        else {
            parmStr = String(rank[0]) + "~" + rank[1];
        }
        var titleTF = ComponentManager.getTextField(LanguageManager.getlocal("acSingleDayBuild1ViewTab4ItemTile1", [parmStr]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        titleTF.setPosition(titleBg.x + titleBg.width / 2 - titleTF.width / 2, titleBg.y + titleBg.height / 2 - titleTF.height / 2);
        this.addChild(titleTF);
        var itemTopLine = BaseBitmap.create("public_line3");
        itemTopLine.width += titleTF.width;
        itemTopLine.setPosition(titleBg.x + titleBg.width / 2 - itemTopLine.width / 2, titleBg.y + titleBg.height / 2 - itemTopLine.height / 2);
        this.addChild(itemTopLine);
        var awardstr = "1022_0_" + data.score + "|" + data.getReward;
        var rewardVoList = GameData.formatRewardItem(awardstr);
        var scale = 0.85;
        var itemHeight = 0;
        var rewardbg = BaseBitmap.create("public_9_managebg");
        rewardbg.width = 484;
        rewardbg.height = 100;
        rewardbg.setPosition(titleBg.x + titleBg.width / 2 - rewardbg.width / 2, titleBg.y + titleBg.height + 5);
        this.addChild(rewardbg);
        for (var i = 0; i < rewardVoList.length; i++) {
            var rewardDB = GameData.getItemIcon(rewardVoList[i], true);
            rewardDB.setScale(scale);
            rewardDB.setPosition(rewardbg.x + 5 + ((rewardDB.width - 8) * (i % 5)), rewardbg.y + 5 + ((rewardDB.height - 8) * Math.floor(i / 5)));
            this.addChild(rewardDB);
        }
    };
    DailybossnewRewardItem.prototype.getSpaceY = function () {
        return 5;
    };
    DailybossnewRewardItem.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return DailybossnewRewardItem;
}(ScrollListItem));
__reflect(DailybossnewRewardItem.prototype, "DailybossnewRewardItem");
//# sourceMappingURL=DailybossnewRewardItem.js.map