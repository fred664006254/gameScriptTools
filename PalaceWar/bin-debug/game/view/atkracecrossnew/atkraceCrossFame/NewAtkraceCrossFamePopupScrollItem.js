var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
* 江湖声望 席位 item
* date 2020.7.8
* author ycg
* @name NewAtkraceCrossFamePopupScrollItem
*/
var NewAtkraceCrossFamePopupScrollItem = /** @class */ (function (_super) {
    __extends(NewAtkraceCrossFamePopupScrollItem, _super);
    function NewAtkraceCrossFamePopupScrollItem() {
        var _this = _super.call(this) || this;
        _this._titleItemList = [];
        return _this;
    }
    NewAtkraceCrossFamePopupScrollItem.prototype.initItem = function (index, data, param) {
        this.width = 522;
        var container = new BaseDisplayObjectContainer();
        container.width = this.width;
        this.addChild(container);
        var baseCfg = data.baseCfg;
        if (data.isFirst) {
            var titleBgStr = "newcrossatkrace_fametitlenamebg" + (data.baseCfg.index + 1);
            if (!ResourceManager.hasRes(titleBgStr)) {
                titleBgStr = "newcrossatkrace_fametitlenamebg4";
            }
            var titleBg = BaseBitmap.create(titleBgStr);
            titleBg.x = this.width / 2 - titleBg.width / 2;
            this.addChild(titleBg);
            container.y = titleBg.height + 20;
            var titleTxt = BaseBitmap.create("newcrossatkrace_fame_titlename" + (data.baseCfg.index + 1));
            titleTxt.x = this.width / 2 - titleTxt.width / 2;
            titleTxt.y = titleBg.y + 5;
            this.addChild(titleTxt);
        }
        var seatType = baseCfg.perMaxSeat;
        var spaceX = 0;
        var itemH = 0;
        for (var i = 0; i < data.seatNum; i++) {
            var item = new NewAtkraceCrossFamePopupItem();
            item.initItem(i, data, null);
            container.addChild(item);
            this._titleItemList[i] = item;
            var offX = 0;
            if (seatType == 1) {
                offX = container.width / 2 - item.width / 2;
            }
            else if (seatType == 5) {
                spaceX = 20;
                offX = 5 + (container.width - seatType * item.width - (seatType - 1) * spaceX) / 2 + i % seatType * (item.width + spaceX);
            }
            else if (seatType == 6) {
                spaceX = 7;
                offX = 5 + (container.width - seatType * item.width - (seatType - 1) * spaceX) / 2 + i % seatType * (item.width + spaceX);
            }
            item.x = offX;
            itemH = item.height;
        }
        container.height = itemH;
        this.height = container.y + container.height + this.getSpaceY();
        // let lineContainer = new BaseDisplayObjectContainer();
        // this.addChild(lineContainer);
        // let lineBg = BaseBitmap.create("sixsectionmainui_linenumbg1");
        // lineBg.width = 30;
        // lineBg.height = this.height+ 1;
        // lineContainer.width = lineBg.width;
        // lineContainer.height = lineBg.height;
        // lineContainer.addChild(lineBg);
        // let lineNum = ComponentManager.getTextField(""+data.lineNum, 14, TextFieldConst.COLOR_WHITE);
        // lineNum.setPosition(lineBg.x + lineBg.width/2 - lineNum.width/2, container.y + (container.height - 30)/2 - lineNum.height/2);
        // lineContainer.addChild(lineNum);
    };
    NewAtkraceCrossFamePopupScrollItem.prototype.freshData = function () {
        for (var i = 0; i < this._titleItemList.length; i++) {
            this._titleItemList[i].update();
        }
    };
    NewAtkraceCrossFamePopupScrollItem.prototype.playAni = function (index) {
        App.LogUtil.log("playani " + index);
        var item = this._titleItemList[index - 1];
        if (item) {
            item.playAni();
        }
    };
    NewAtkraceCrossFamePopupScrollItem.prototype.getSpaceX = function () {
        return 0;
    };
    NewAtkraceCrossFamePopupScrollItem.prototype.getSpaceY = function () {
        return 5;
    };
    NewAtkraceCrossFamePopupScrollItem.prototype.dispose = function () {
        this._titleItemList = [];
        _super.prototype.dispose.call(this);
    };
    return NewAtkraceCrossFamePopupScrollItem;
}(ScrollListItem));
//# sourceMappingURL=NewAtkraceCrossFamePopupScrollItem.js.map