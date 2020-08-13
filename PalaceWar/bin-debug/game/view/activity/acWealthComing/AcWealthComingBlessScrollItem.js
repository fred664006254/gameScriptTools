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
 * 财神祝福Item
 * author 张朝阳
 * date 2018/12/25
 * @class AcWealthComingBlessScrollItem
 */
var AcWealthComingBlessScrollItem = (function (_super) {
    __extends(AcWealthComingBlessScrollItem, _super);
    function AcWealthComingBlessScrollItem() {
        return _super.call(this) || this;
    }
    AcWealthComingBlessScrollItem.prototype.initItem = function (index, data, itemParam) {
        var vo = Api.acVoApi.getActivityVoByAidAndCode(itemParam.aid, itemParam.code);
        var fillBg = BaseBitmap.create("public_alphabg");
        fillBg.width = 545;
        fillBg.height = 163;
        this.addChild(fillBg);
        var bg = BaseLoadBitmap.create("acwealthcomingview_blessbg");
        bg.width = 545;
        bg.height = 148;
        bg.setPosition(fillBg.x, fillBg.y + fillBg.height - bg.height);
        this.addChild(bg);
        if (vo.getWealethBuffType() == data && itemParam.noBuff == null) {
            var light = BaseBitmap.create("public_9_bg57");
            light.width = bg.width + 10;
            light.height = bg.height + 15;
            light.setPosition(bg.x - 4, bg.y - 2);
            this.addChild(light);
            egret.Tween.get(light, { loop: true }).to({ alpha: 0 }, 500).to({ alpha: 1 }, 500);
        }
        var titlebg = BaseLoadBitmap.create("acwealthcomingview_blesstitlebg" + data);
        titlebg.width = 185;
        titlebg.height = 72;
        titlebg.setPosition(bg.x + 15, bg.y - 15);
        this.addChild(titlebg);
        var descTF = ComponentManager.getTextField(LanguageManager.getlocal("acWealthComingBlessPopupViewDesc" + data), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        descTF.width = 500;
        descTF.setPosition(bg.x + bg.width / 2 - descTF.width / 2, bg.y + 90 - descTF.height / 2);
        this.addChild(descTF);
        this.width = fillBg.width;
        this.height = fillBg.height;
    };
    AcWealthComingBlessScrollItem.prototype.getSpaceY = function () {
        return 5;
    };
    AcWealthComingBlessScrollItem.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AcWealthComingBlessScrollItem;
}(ScrollListItem));
__reflect(AcWealthComingBlessScrollItem.prototype, "AcWealthComingBlessScrollItem");
//# sourceMappingURL=AcWealthComingBlessScrollItem.js.map