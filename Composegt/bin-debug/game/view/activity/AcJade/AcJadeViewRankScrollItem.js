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
var AcJadeViewRankScrollItem = (function (_super) {
    __extends(AcJadeViewRankScrollItem, _super);
    function AcJadeViewRankScrollItem() {
        return _super.call(this) || this;
    }
    AcJadeViewRankScrollItem.prototype.initItem = function (index, data) {
        var key = data.key;
        var innerbg = BaseBitmap.create("rechargevie_db_01");
        innerbg.width = 612;
        innerbg.x = 0;
        innerbg.y = 0;
        this.addChild(innerbg);
        var line1 = BaseBitmap.create("public_ts_bg01");
        line1.width = 260;
        line1.x = this.width / 2 - line1.width / 2;
        line1.y = 30 - line1.height / 2;
        //第几名
        var txt = ComponentManager.getTextField("", 22, TextFieldConst.COLOR_BROWN);
        if (data.rankV1 == data.rankV2) {
            txt.text = LanguageManager.getlocal("acJadeView_rank" + data.rankV1);
        }
        else {
            txt.text = LanguageManager.getlocal("acJadeView_rank4", [String(data.rankV1), String(data.rankV2)]);
        }
        txt.width = 230;
        txt.x = this.width / 2 - txt.width / 2;
        txt.textAlign = "center";
        txt.y = 30 - txt.height / 2;
        this.addChild(line1);
        this.addChild(txt);
        this.height = innerbg.y + innerbg.height + 10;
        var reward = data.reward;
        var rewardArr = GameData.formatRewardItem(reward);
        var itemicon = null;
        var baseWidth = 106;
        var baseHeight = 106;
        var spaceX = 10;
        var spaceY = 10;
        var startX = this.width / 2 - (baseWidth * 5 + spaceX * 4) / 2;
        var startY = 55;
        var lastY = 0;
        for (var i = 0; i < rewardArr.length; i++) {
            itemicon = GameData.getItemIcon(rewardArr[i], true, false);
            itemicon.x = startX + (i % 5) * (baseWidth + spaceX);
            itemicon.y = startY + Math.floor(i / 5) * (baseHeight + spaceY);
            this.addChild(itemicon);
            if (i == rewardArr.length - 1) {
                lastY = itemicon.y;
            }
        }
        innerbg.height = lastY + baseHeight + 25;
        this.height = innerbg.height;
    };
    AcJadeViewRankScrollItem.prototype.getSpaceX = function () {
        return 0;
    };
    /**
     * 不同格子Y间距
     */
    AcJadeViewRankScrollItem.prototype.getSpaceY = function () {
        return 10;
    };
    AcJadeViewRankScrollItem.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AcJadeViewRankScrollItem;
}(ScrollListItem));
__reflect(AcJadeViewRankScrollItem.prototype, "AcJadeViewRankScrollItem");
