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
  * 黄忠活动排行榜
  * author 张朝阳
  * date 2018/6/22
  * @class AcArcherRankScrollItem
  */
var AcArcherRankScrollItem = (function (_super) {
    __extends(AcArcherRankScrollItem, _super);
    function AcArcherRankScrollItem() {
        return _super.call(this) || this;
    }
    /**
     * 初始化itemview
     */
    AcArcherRankScrollItem.prototype.initItem = function (index, data) {
        var itemData = data;
        var itemIndex = index + 1;
        this.width = 516;
        this.height = 52;
        //排名
        if (itemIndex <= 3) {
            var rankBM = BaseLoadBitmap.create("rank_" + String(itemIndex));
            rankBM.width = 42;
            rankBM.height = 41;
            rankBM.setPosition(this.x - rankBM.width / 2 + 55, this.y + this.height / 2 - rankBM.height / 2);
            this.addChild(rankBM);
        }
        else {
            var rankTF = ComponentManager.getTextField(String(itemIndex), TextFieldConst.FONTSIZE_CONTENT_COMMON);
            rankTF.setPosition(this.x - rankTF.width / 2 + 55, this.y + this.height / 2 - rankTF.height / 2);
            this.addChild(rankTF);
            if (itemData.uid == Api.playerVoApi.getPlayerID()) {
                rankTF.setColor(TextFieldConst.COLOR_QUALITY_YELLOW);
            }
        }
        //名字
        var nameTF = ComponentManager.getTextField(data.name, TextFieldConst.FONTSIZE_CONTENT_COMMON);
        nameTF.setPosition(this.x + this.width / 2 - nameTF.width / 2, this.y + this.height / 2 - nameTF.height / 2);
        this.addChild(nameTF);
        //杀敌数
        var killTF = ComponentManager.getTextField(data.value, TextFieldConst.FONTSIZE_CONTENT_COMMON);
        killTF.setPosition(this.x + this.width - killTF.width / 2 - 110, this.y + this.height / 2 - killTF.height / 2);
        this.addChild(killTF);
        //文本线
        var lineSp = BaseBitmap.create("public_line1");
        lineSp.setPosition(this.x + this.width / 2 - lineSp.width / 2, this.y + this.height - lineSp.height);
        this.addChild(lineSp);
        if (itemData.uid == Api.playerVoApi.getPlayerID()) {
            nameTF.setColor(TextFieldConst.COLOR_QUALITY_YELLOW);
            killTF.setColor(TextFieldConst.COLOR_QUALITY_YELLOW);
        }
    };
    AcArcherRankScrollItem.prototype.getSpaceY = function () {
        return 5;
    };
    AcArcherRankScrollItem.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AcArcherRankScrollItem;
}(ScrollListItem));
__reflect(AcArcherRankScrollItem.prototype, "AcArcherRankScrollItem");
//# sourceMappingURL=AcArcherRankScrollItem.js.map