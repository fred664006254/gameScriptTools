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
 * 冲榜列表节点
 * author yanyuling
 * date 2017/11/06
 * @class AcCrossServerGemExpendRankListScrollItem
 */
var AcCrossServerGemExpendRankListScrollItem = (function (_super) {
    __extends(AcCrossServerGemExpendRankListScrollItem, _super);
    function AcCrossServerGemExpendRankListScrollItem() {
        return _super.call(this) || this;
    }
    AcCrossServerGemExpendRankListScrollItem.prototype.initItem = function (index, data) {
        if (index % 2 == 1) {
            var bg = BaseBitmap.create("public_tc_bg05");
            bg.width = 510;
            bg.height = 40;
            bg.x = 45;
            bg.y = this.height / 2 - bg.height / 2 + 25;
            this.addChild(bg);
        }
        this.height = 52;
        this._nodeContainer = new BaseDisplayObjectContainer();
        this.addChild(this._nodeContainer);
        this._nodeContainer.x = 30;
        var tarColor = TextFieldConst.COLOR_BROWN;
        if (data.uid) {
            if (data.uid == Api.playerVoApi.getPlayerID()) {
                tarColor = TextFieldConst.COLOR_WARN_GREEN;
            }
        }
        var startY = 16;
        if (index > 2) {
            var titleTxt1 = ComponentManager.getTextField("", 20, tarColor);
            titleTxt1.text = String(index + 1);
            titleTxt1.x = 90 - titleTxt1.width / 2;
            titleTxt1.y = startY;
            this._nodeContainer.addChild(titleTxt1);
        }
        else {
            var rankImg = BaseLoadBitmap.create("rank_" + String(index + 1));
            rankImg.width = 51;
            rankImg.height = 47;
            rankImg.x = 90 - rankImg.width / 2 + 30;
            rankImg.y = 3;
            this.addChild(rankImg);
        }
        var titleTxt2 = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, tarColor);
        titleTxt2.text = data.name;
        titleTxt2.x = 215 - titleTxt2.width / 2;
        titleTxt2.y = startY;
        this._nodeContainer.addChild(titleTxt2);
        var titleTxt4 = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, tarColor);
        titleTxt4.text = Api.mergeServerVoApi.getAfterMergeSeverName(data.uid);
        titleTxt4.x = 335 - titleTxt4.width / 2;
        titleTxt4.y = startY;
        this._nodeContainer.addChild(titleTxt4);
        var titleTxt3 = ComponentManager.getTextField("", titleTxt2.size, tarColor);
        titleTxt3.text = String(data.gemexpend);
        titleTxt3.x = 460 - titleTxt3.width / 2;
        titleTxt3.y = startY;
        this._nodeContainer.addChild(titleTxt3);
    };
    AcCrossServerGemExpendRankListScrollItem.prototype.getSpaceX = function () {
        return 0;
    };
    /**
     * 不同格子Y间距
     */
    AcCrossServerGemExpendRankListScrollItem.prototype.getSpaceY = function () {
        return 5;
    };
    AcCrossServerGemExpendRankListScrollItem.prototype.dispose = function () {
        this._nodeContainer = null;
        _super.prototype.dispose.call(this);
    };
    return AcCrossServerGemExpendRankListScrollItem;
}(ScrollListItem));
__reflect(AcCrossServerGemExpendRankListScrollItem.prototype, "AcCrossServerGemExpendRankListScrollItem");
