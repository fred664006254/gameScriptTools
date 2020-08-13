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
 * 帮会充值列表节点 (累计)
 * author yanyuling
 * date 2017/11/06
 * @class AcRankListScrollItem
 */
var AcAlliaceTotalListScrollItem = (function (_super) {
    __extends(AcAlliaceTotalListScrollItem, _super);
    function AcAlliaceTotalListScrollItem() {
        return _super.call(this) || this;
    }
    AcAlliaceTotalListScrollItem.prototype.initItem = function (index, data) {
        this.height = 52;
        this._data = data;
        this._nodeContainer = new BaseDisplayObjectContainer();
        this.addChild(this._nodeContainer);
        var tarColor = TextFieldConst.COLOR_BROWN;
        if (data.uid) {
            if (data.uid == Api.playerVoApi.getPlayerID()) {
                tarColor = TextFieldConst.COLOR_WARN_YELLOW;
            }
        }
        else {
            if (data.id == Api.playerVoApi.getPlayerAllianceId()) {
                tarColor = TextFieldConst.COLOR_WARN_YELLOW;
            }
        }
        var startY = 16;
        var titleTxt1 = ComponentManager.getTextField("", 20, tarColor);
        titleTxt1.text = String(index + 1);
        titleTxt1.x = 90 - titleTxt1.width / 2;
        titleTxt1.y = startY;
        this._nodeContainer.addChild(titleTxt1);
        var titleTxt2 = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, tarColor);
        if (data[0]) {
            titleTxt2.text = data[0] + ""; //LanguageManager.getlocal("acRankList_allianceQuit",[data.name]);
            titleTxt2.x = 245 - titleTxt2.width / 2 + 30;
        }
        titleTxt2.y = startY;
        this._nodeContainer.addChild(titleTxt2);
        var titleTxt3 = ComponentManager.getTextField("", titleTxt2.size, tarColor);
        titleTxt3.text = LanguageManager.getlocal("allianceMemberPo" + data[1]);
        titleTxt3.x = 460 - titleTxt3.width / 2;
        titleTxt3.y = startY;
        this._nodeContainer.addChild(titleTxt3);
        var lineImg = BaseLoadBitmap.create("rank_line");
        lineImg.width = 500;
        lineImg.height = 2;
        lineImg.x = 30;
        lineImg.y = 50;
        this._nodeContainer.addChild(lineImg);
    };
    AcAlliaceTotalListScrollItem.prototype.getSpaceX = function () {
        return 0;
    };
    /**
     * 不同格子Y间距
     */
    AcAlliaceTotalListScrollItem.prototype.getSpaceY = function () {
        return 5;
    };
    AcAlliaceTotalListScrollItem.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AcAlliaceTotalListScrollItem;
}(ScrollListItem));
__reflect(AcAlliaceTotalListScrollItem.prototype, "AcAlliaceTotalListScrollItem");
//# sourceMappingURL=AcAlliaceTotalListScrollItem.js.map