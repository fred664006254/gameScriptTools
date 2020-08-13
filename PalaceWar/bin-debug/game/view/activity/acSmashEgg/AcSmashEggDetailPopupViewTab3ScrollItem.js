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
 * 金蛋赠礼活动详情tab3Item
 * author hyd
 * date 2019/9/4
 * @class AcSmashEggDetailPopupViewTab3ScrollItem
 */
var AcSmashEggDetailPopupViewTab3ScrollItem = (function (_super) {
    __extends(AcSmashEggDetailPopupViewTab3ScrollItem, _super);
    function AcSmashEggDetailPopupViewTab3ScrollItem() {
        var _this = _super.call(this) || this;
        _this.code = null;
        _this.aid = null;
        _this._data = null;
        _this._isRequest = false;
        return _this;
    }
    AcSmashEggDetailPopupViewTab3ScrollItem.prototype.initItem = function (index, data, itemParam) {
        var aid = itemParam.aid;
        var code = itemParam.code;
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(aid, code);
        this.width = 520;
        var tmp = GameData.formatRewardItem(data[0])[0];
        var rewardStr = "<font color=" + tmp.nameColor + ">" + tmp.name + "*" + tmp.num + "</font>";
        var logStr = LanguageManager.getlocal("acSmashEggLogTip-" + code, [data[1], LanguageManager.getlocal("acSmashEggEggType" + (data[2] + 1) + "-" + code), rewardStr]);
        var logTF = ComponentManager.getTextField(logStr, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
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
    AcSmashEggDetailPopupViewTab3ScrollItem.prototype.dispose = function () {
        this.aid = null;
        this.code = null;
        this._data = null;
        this._isRequest = false;
        _super.prototype.dispose.call(this);
    };
    return AcSmashEggDetailPopupViewTab3ScrollItem;
}(ScrollListItem));
__reflect(AcSmashEggDetailPopupViewTab3ScrollItem.prototype, "AcSmashEggDetailPopupViewTab3ScrollItem");
//# sourceMappingURL=AcSmashEggDetailPopupViewTab3ScrollItem.js.map