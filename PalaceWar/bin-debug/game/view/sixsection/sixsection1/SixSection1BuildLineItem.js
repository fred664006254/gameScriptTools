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
* 兵部 边线 item
* date 2020.5.9
* author ycg
* @name SixSection1BuildLineItem
*/
var SixSection1BuildLineItem = (function (_super) {
    __extends(SixSection1BuildLineItem, _super);
    function SixSection1BuildLineItem() {
        var _this = _super.call(this) || this;
        _this._lineBg = null;
        _this._lineNum = null;
        _this._data = null;
        _this._seatH = 0;
        _this._itemHeightArr = {};
        return _this;
    }
    SixSection1BuildLineItem.prototype.initItem = function (index, data, param) {
        this.width = 30;
        this._data = data;
        var isBig = param.isBig;
        var scale = 1;
        if (isBig) {
            scale = 2;
        }
        var itemH = 0;
        var seatH = 0;
        if (param.itemArr) {
            this._itemHeightArr = param.itemArr;
            var itemHData = this.getSeatItemHeight();
            itemH = itemHData.itemH;
            seatH = itemHData.seatH;
        }
        else {
            var buildItem = new SixSection1BuildScrollItem();
            buildItem.initItem(0, data, { isBig: isBig });
            itemH = buildItem.height;
            seatH = buildItem.getSeatItemHeight();
        }
        // let buildItem = new SixSection1BuildScrollItem();
        // buildItem.initItem(0, data, {isBig: isBig});
        // let itemH = buildItem.height;
        // let seatH = buildItem.getSeatItemHeight();
        this._seatH = seatH;
        // App.LogUtil.log("seatH "+seatH);
        var lineBg = BaseBitmap.create("public_9_bg92");
        ;
        lineBg.width = 30;
        lineBg.height = itemH + 0.5;
        this.addChild(lineBg);
        lineBg.alpha = 0.6;
        this._lineBg = lineBg;
        var lineNum = ComponentManager.getTextField("" + data.lineNum, 14, TextFieldConst.COLOR_WHITE);
        lineNum.setPosition(lineBg.x + lineBg.width / 2 - lineNum.width / 2, lineBg.y + seatH / 2 - lineNum.height / 2 + 15);
        if (isBig) {
            lineNum.y = lineBg.y + seatH / 2 - lineNum.height / 2 + 15 * scale + 30;
        }
        var baseIndex = data.baseCfg.index;
        if (baseIndex == 0) {
            lineNum.y = 280 * scale;
        }
        this._lineNum = lineNum;
        this.addChild(lineNum);
        this.height = itemH;
        // App.LogUtil.log("iemH: "+itemH + data.lineNum);
        // lineContainer.addChild(lineNum);
        // App.LogUtil.log("lineitem h "+this.height);
    };
    SixSection1BuildLineItem.prototype.getSeatItemHeight = function () {
        var line = this._data.lineNum;
        var itemH = 0;
        var seatH = 0;
        for (var i = 0; i < line; i++) {
            if (this._itemHeightArr[i] && this._itemHeightArr[i].itemH) {
                itemH = this._itemHeightArr[i].itemH;
                seatH = this._itemHeightArr[i].seatH;
            }
        }
        return { itemH: itemH, seatH: seatH };
    };
    SixSection1BuildLineItem.prototype.getSpaceX = function () {
        return 0;
    };
    SixSection1BuildLineItem.prototype.getSpaceY = function () {
        return 0;
    };
    SixSection1BuildLineItem.prototype.dispose = function () {
        this._lineBg = null;
        this._lineNum = null;
        this._data = null;
        this._itemHeightArr = {};
        _super.prototype.dispose.call(this);
    };
    return SixSection1BuildLineItem;
}(ScrollListItem));
__reflect(SixSection1BuildLineItem.prototype, "SixSection1BuildLineItem");
//# sourceMappingURL=SixSection1BuildLineItem.js.map