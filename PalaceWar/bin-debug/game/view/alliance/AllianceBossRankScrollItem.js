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
 * 排行列表节点
 * author yanyuling
 * date 2017/12/07
 * @class AllianceBossRankScrollItem
 */
var AllianceBossRankScrollItem = (function (_super) {
    __extends(AllianceBossRankScrollItem, _super);
    function AllianceBossRankScrollItem() {
        return _super.call(this) || this;
    }
    AllianceBossRankScrollItem.prototype.initItem = function (index, data) {
        this.height = 52;
        // this.width = GameConfig.stageWidth;
        this._nodeContainer = new BaseDisplayObjectContainer();
        this.addChild(this._nodeContainer);
        var tarColor = TextFieldConst.COLOR_BROWN;
        if (data[0] == Api.playerVoApi.getPlayerName()) {
            tarColor = TextFieldConst.COLOR_WARN_YELLOW;
        }
        var startY = 16;
        if (index > 2) {
            var titleTxt1 = ComponentManager.getTextField("", 20, tarColor);
            titleTxt1.text = String(index + 1);
            titleTxt1.x = 75 - titleTxt1.width / 2;
            titleTxt1.y = startY;
            this._nodeContainer.addChild(titleTxt1);
        }
        else {
            var rankImg = BaseLoadBitmap.create("rank_" + String(index + 1));
            rankImg.width = 51;
            rankImg.height = 47;
            rankImg.x = 75 - rankImg.width / 2;
            rankImg.y = 3;
            this.addChild(rankImg);
        }
        var titleTxt2 = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, tarColor);
        titleTxt2.text = data[0];
        titleTxt2.x = 280 - titleTxt2.width / 2;
        titleTxt2.y = startY;
        this._nodeContainer.addChild(titleTxt2);
        // let titleTxt3 = ComponentManager.getTextField("",titleTxt2.size,tarColor)
        // titleTxt3.text = String(data[2]);
        // titleTxt3.x = 365- titleTxt3.width/2;
        // titleTxt3.y = startY;
        // this._nodeContainer.addChild(titleTxt3);
        var titleTxt4 = ComponentManager.getTextField("", titleTxt2.size, tarColor);
        titleTxt4.text = String(data[1]);
        titleTxt4.x = 475 - titleTxt4.width / 2;
        titleTxt4.y = startY;
        this._nodeContainer.addChild(titleTxt4);
        var lineImg = BaseLoadBitmap.create("rank_line");
        lineImg.width = 500;
        lineImg.height = 2;
        lineImg.x = 30;
        lineImg.y = 50;
        this._nodeContainer.addChild(lineImg);
    };
    AllianceBossRankScrollItem.prototype.getSpaceX = function () {
        return 0;
    };
    /**
     * 不同格子Y间距
     */
    AllianceBossRankScrollItem.prototype.getSpaceY = function () {
        return 5;
    };
    AllianceBossRankScrollItem.prototype.dispose = function () {
        this._nodeContainer = null;
        _super.prototype.dispose.call(this);
    };
    return AllianceBossRankScrollItem;
}(ScrollListItem));
__reflect(AllianceBossRankScrollItem.prototype, "AllianceBossRankScrollItem");
//# sourceMappingURL=AllianceBossRankScrollItem.js.map