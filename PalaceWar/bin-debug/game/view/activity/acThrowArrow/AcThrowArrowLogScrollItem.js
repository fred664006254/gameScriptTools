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
 * 	投壶活动日志item
 * author 张朝阳
 * date 2019/4/4
 * @class AcThrowArrowLogScrollItem
 */
var AcThrowArrowLogScrollItem = (function (_super) {
    __extends(AcThrowArrowLogScrollItem, _super);
    function AcThrowArrowLogScrollItem() {
        var _this = _super.call(this) || this;
        _this.code = null;
        _this.aid = null;
        _this.rkey = null;
        _this.rankList = null;
        _this._data = null;
        _this._isRequest = false;
        return _this;
    }
    AcThrowArrowLogScrollItem.prototype.initItem = function (index, data, itemParam) {
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(itemParam.aid, itemParam.code);
        this.width = 520;
        var tmp = GameData.formatRewardItem(data[1])[0];
        var rewardStr = "<font color=" + tmp.nameColor + ">" + tmp.name + "*" + tmp.num + "</font>";
        var logTF = ComponentManager.getTextField(LanguageManager.getlocal("acThrowArrowGetAllItemInfo-" + itemParam.code, [data[0], LanguageManager.getlocal("acThrowArrowResultPopupViewArrowType_" + cfg.getLotteryType(data[2]) + "-" + itemParam.code), rewardStr]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        logTF.width = 460;
        logTF.lineSpacing = 5;
        logTF.setPosition(this.x + this.width / 2 - logTF.width / 2, this.y + 10);
        this.addChild(logTF);
        var txtLine = BaseBitmap.create("acthrowarrowview_common_txtline");
        txtLine.width = 500;
        txtLine.setPosition(this.x + this.width / 2 - txtLine.width / 2, logTF.y + logTF.height + 7);
        this.addChild(txtLine);
        this.height = logTF.height + txtLine.height + 17;
    };
    AcThrowArrowLogScrollItem.prototype.getThrowName = function () {
    };
    AcThrowArrowLogScrollItem.prototype.dispose = function () {
        this.aid = null;
        this.code = null;
        this.rkey = null;
        this.rankList = null;
        this._data = null;
        this._isRequest = false;
        _super.prototype.dispose.call(this);
    };
    return AcThrowArrowLogScrollItem;
}(ScrollListItem));
__reflect(AcThrowArrowLogScrollItem.prototype, "AcThrowArrowLogScrollItem");
//# sourceMappingURL=AcThrowArrowLogScrollItem.js.map