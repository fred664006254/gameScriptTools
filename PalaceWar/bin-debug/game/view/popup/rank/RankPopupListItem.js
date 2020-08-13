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
var RankPopupListItem = (function (_super) {
    __extends(RankPopupListItem, _super);
    function RankPopupListItem() {
        return _super.call(this) || this;
    }
    RankPopupListItem.prototype.getValueStr = function () {
        var valueStr = "";
        if (this._data) {
            if (this._data.value != null) {
                valueStr = this._data.value;
            }
            if (this._data.time != null) {
                valueStr = App.DateUtil.getFormatBySecond(this._data.time, 6);
            }
        }
        return valueStr;
    };
    RankPopupListItem.prototype.initItem = function (index, data) {
        this._data = data;
        this.height = 52;
        // this.width = 508;
        this._nodeContainer = new BaseDisplayObjectContainer();
        this.addChild(this._nodeContainer);
        var startY = 16;
        var titleTxt1;
        if (index > 2) {
            titleTxt1 = ComponentManager.getTextField("", 20, TextFieldConst.COLOR_BROWN);
            titleTxt1.text = String(index + 1);
            titleTxt1.x = 60 - titleTxt1.width / 2;
            titleTxt1.y = startY;
            this._nodeContainer.addChild(titleTxt1);
        }
        else {
            var rankImg = BaseLoadBitmap.create("rank_" + String(index + 1));
            rankImg.width = 51;
            rankImg.height = 47;
            rankImg.x = 60 - rankImg.width / 2;
            rankImg.y = 3;
            this.addChild(rankImg);
        }
        var titleTxt2 = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        titleTxt2.text = data ? data.name : "";
        titleTxt2.x = 220 - titleTxt2.width / 2;
        titleTxt2.y = startY;
        this._nodeContainer.addChild(titleTxt2);
        var titleTxt3 = ComponentManager.getTextField(this.getValueStr(), titleTxt2.size, TextFieldConst.COLOR_BROWN);
        titleTxt3.textAlign = egret.HorizontalAlign.CENTER;
        titleTxt3.width = 200;
        titleTxt3.x = 510 - titleTxt3.width;
        titleTxt3.y = startY;
        this._nodeContainer.addChild(titleTxt3);
        if (data.uid == Api.playerVoApi.getPlayerID()) {
            if (titleTxt1) {
                titleTxt1.textColor = TextFieldConst.COLOR_WARN_YELLOW;
            }
            titleTxt2.textColor = TextFieldConst.COLOR_WARN_YELLOW;
            titleTxt3.textColor = TextFieldConst.COLOR_WARN_YELLOW;
        }
        var lineImg = BaseLoadBitmap.create("rank_line");
        lineImg.width = 500;
        lineImg.height = 2;
        lineImg.x = 5;
        lineImg.y = 50;
        this._nodeContainer.addChild(lineImg);
    };
    return RankPopupListItem;
}(ScrollListItem));
__reflect(RankPopupListItem.prototype, "RankPopupListItem");
//# sourceMappingURL=RankPopupListItem.js.map