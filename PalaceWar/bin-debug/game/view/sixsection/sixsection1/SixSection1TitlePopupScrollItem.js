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
* 兵部头衔 item
* date 2020.5.11
* author ycg
* @name SixSection1TitlePopupScrollItem
*/
var SixSection1TitlePopupScrollItem = (function (_super) {
    __extends(SixSection1TitlePopupScrollItem, _super);
    function SixSection1TitlePopupScrollItem() {
        var _this = _super.call(this) || this;
        _this._titleItemList = [];
        return _this;
    }
    SixSection1TitlePopupScrollItem.prototype.initItem = function (index, data, param) {
        var container = new BaseDisplayObjectContainer();
        this.addChild(container);
        this.width = 522;
        container.width = 480;
        var baseCfg = data.baseCfg;
        if (data.isFirst) {
            var titleBgStr = "sixsection1_titlenamebg" + (data.baseCfg.index + 1);
            if (!ResourceManager.hasRes(titleBgStr)) {
                titleBgStr = "sixsection1_titlenamebg4";
            }
            var titleBg = BaseBitmap.create(titleBgStr);
            titleBg.x = 42 + (this.width - 42) / 2 - titleBg.width / 2;
            this.addChild(titleBg);
            container.y = titleBg.height + 20;
            var titleTxt = BaseBitmap.create("sixsection1_titlename" + (data.baseCfg.index + 1));
            titleTxt.x = 42 + (this.width - 42) / 2 - titleTxt.width / 2;
            titleTxt.y = titleBg.y + 5;
            this.addChild(titleTxt);
            container.y = titleTxt.height + 20;
        }
        container.x = 42;
        var seatType = baseCfg.perMaxSeat;
        var spaceX = 0;
        var itemH = 0;
        for (var i = 0; i < data.seatNum; i++) {
            var item = new SixSection1TitlePopupTitleItem();
            item.initItem(i, data, null);
            container.addChild(item);
            this._titleItemList[i] = item;
            var offX = 0;
            if (seatType == 1) {
                offX = container.width / 2 - item.width / 2;
            }
            else if (seatType == 5) {
                spaceX = 14;
                offX = (container.width - seatType * item.width - (seatType - 1) * spaceX) / 2 + i % seatType * (item.width + spaceX);
            }
            item.x = offX;
            itemH = item.height;
        }
        container.height = itemH;
        this.height = container.y + container.height + this.getSpaceY();
        var lineContainer = new BaseDisplayObjectContainer();
        this.addChild(lineContainer);
        var lineBg = BaseBitmap.create("sixsectionmainui_linenumbg1");
        // let lineBg = BaseBitmap.create("public_9_bg92");
        lineBg.width = 30;
        lineBg.height = this.height + 1;
        lineContainer.width = lineBg.width;
        lineContainer.height = lineBg.height;
        lineContainer.addChild(lineBg);
        // lineBg.alpha = 0.6;
        var lineNum = ComponentManager.getTextField("" + data.lineNum, 14, TextFieldConst.COLOR_WHITE);
        lineNum.setPosition(lineBg.x + lineBg.width / 2 - lineNum.width / 2, container.y + (container.height - 30) / 2 - lineNum.height / 2);
        lineContainer.addChild(lineNum);
        // App.LogUtil.log("title item h "+this.height);
    };
    SixSection1TitlePopupScrollItem.prototype.freshData = function () {
        for (var i = 0; i < this._titleItemList.length; i++) {
            this._titleItemList[i].update();
        }
    };
    SixSection1TitlePopupScrollItem.prototype.playAni = function (index) {
        App.LogUtil.log("playani " + index);
        var item = this._titleItemList[index - 1];
        if (item) {
            item.playAni();
        }
    };
    SixSection1TitlePopupScrollItem.prototype.getSpaceX = function () {
        return 0;
    };
    SixSection1TitlePopupScrollItem.prototype.getSpaceY = function () {
        return 5;
    };
    SixSection1TitlePopupScrollItem.prototype.dispose = function () {
        this._titleItemList = [];
        _super.prototype.dispose.call(this);
    };
    return SixSection1TitlePopupScrollItem;
}(ScrollListItem));
__reflect(SixSection1TitlePopupScrollItem.prototype, "SixSection1TitlePopupScrollItem");
//# sourceMappingURL=SixSection1TitlePopupScrollItem.js.map