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
* 兵部建筑 item
* date 2020.5.8
* author ycg
* @name SixSection1BuildScrollItem
*/
var SixSection1BuildScrollItem = (function (_super) {
    __extends(SixSection1BuildScrollItem, _super);
    function SixSection1BuildScrollItem() {
        var _this = _super.call(this) || this;
        _this._buildItemList = [];
        _this._itemH = 0;
        _this._data = null;
        return _this;
    }
    SixSection1BuildScrollItem.prototype.initItem = function (index, data, param) {
        var bgContainer = new BaseDisplayObjectContainer();
        this.addChild(bgContainer);
        bgContainer.width = GameConfig.stageWidth;
        var container = new BaseDisplayObjectContainer();
        container.width = GameConfig.stageWidth;
        var isBig = param.isBig;
        this._data = data;
        var seatType = data.baseCfg.perMaxSeat;
        var seatIndex = data.baseCfg.index;
        var spaceX = 0;
        var itemH = 0;
        var count = data.seatNum;
        for (var i = 0; i < count; i++) {
            var item = new SixSection1BuildItem();
            item.initItem(i, data, { isBig: isBig });
            container.addChild(item);
            this._buildItemList[i] = item;
            var offX = 0;
            if (seatType == 1) {
                offX = container.width / 2 - item.width / 2 - 14;
            }
            else if (seatType == 5) {
                spaceX = 14;
                offX = (container.width - seatType * item.width - (seatType - 1) * spaceX) / 2 + i % seatType * (item.width + spaceX);
            }
            else if (seatType == 6) {
                spaceX = 10;
                if (seatIndex == 3 || seatIndex == 4) {
                    spaceX = 15;
                }
                else if (seatIndex == 5 || seatIndex == 6) {
                    spaceX = 26;
                }
                if (i < 3) {
                    offX = (container.width / 2 - 20 - 3 * (item.width + spaceX) + spaceX) / 2 + (i % 3) * (item.width + spaceX);
                }
                else {
                    offX = container.width / 2 + 20 + (container.width / 2 - 20 - 3 * (item.width + spaceX) + spaceX) / 2 + (i % 3) * (item.width + spaceX);
                }
            }
            item.x = offX;
            itemH = item.height;
        }
        container.height = itemH;
        container.name = "itemContainer";
        // let item = new SixSection1BuildItem();
        // item.initItem(0, data, {isBig:isBig});
        // itemH = item.height;
        this._itemH = itemH;
        var isMidd = false;
        var bgName = "";
        if (seatIndex == 0) {
            bgName = "sixsection1_seatbg1_down";
        }
        else if (seatIndex == 6) {
            bgName = "sixsection1_seatbg6_middle";
            isMidd = true;
        }
        else {
            if (data.isLast) {
                bgName = "sixsection1_seatbg" + (seatIndex + 1) + "_down";
            }
            else {
                bgName = "sixsection1_seatbg" + (seatIndex + 1) + "_middle";
                isMidd = true;
            }
        }
        // App.LogUtil.log("itemH "+itemH + " itemWidth "+item.width);
        var testbg = BaseBitmap.create(bgName);
        var space = 20;
        var totalH = itemH + space;
        if (seatIndex == 6 && data.isLast) {
            totalH += 100;
        }
        var offH = totalH % (testbg.height - 1);
        if (offH < 1) {
            totalH += 1;
            offH += 1;
        }
        if (isMidd) {
            var bgCount = Math.ceil(totalH / (testbg.height - 1));
            for (var i = 0; i < bgCount; i++) {
                var tmpBg = BaseBitmap.create(bgName);
                bgContainer.addChild(tmpBg);
                tmpBg.y = -1 + (tmpBg.height - 1) * i;
                if (i == bgCount - 1) {
                    tmpBg.y = -1 + (tmpBg.height - 1) * i - (-1 + (tmpBg.height - 1) * i + tmpBg.height - totalH);
                }
            }
            bgContainer.height = totalH - 1;
        }
        else {
            if (seatIndex == 0) {
                var bg = BaseBitmap.create(bgName);
                bgContainer.addChild(bg);
                bgContainer.height = bg.height;
            }
            else {
                if (data.isLast) {
                    var bg = BaseBitmap.create(bgName);
                    var downUseOffH = 0;
                    if (seatIndex == 1) {
                        downUseOffH = 85;
                    }
                    else if (seatIndex == 2) {
                        downUseOffH = 75;
                    }
                    else if (seatIndex == 3) {
                        downUseOffH = 20;
                    }
                    else if (seatIndex == 4) {
                        downUseOffH = 0;
                    }
                    else if (seatIndex == 5) {
                        downUseOffH = 0;
                    }
                    var needH = totalH - downUseOffH;
                    if (needH > 0) {
                        var mBgImg = "sixsection1_seatbg" + (seatIndex + 1) + "_middle";
                        var mBg = BaseBitmap.create(mBgImg);
                        var bgCount = Math.ceil(needH / (mBg.height - 1));
                        var mOffH = needH % (mBg.height - 1);
                        if (mOffH < 1) {
                            needH += 1;
                            mOffH += 1;
                        }
                        for (var i = 0; i < bgCount; i++) {
                            var tmpBg = BaseBitmap.create(mBgImg);
                            bgContainer.addChild(tmpBg);
                            tmpBg.y = -1 + (tmpBg.height - 1) * i;
                        }
                        var tmpH = needH - 1; //2
                        bg.y = tmpH;
                        bgContainer.height = bg.y + bg.height - 1;
                    }
                    else {
                        bgContainer.height = bg.height - 1;
                    }
                    bgContainer.addChild(bg);
                }
            }
        }
        // for (let i = 0; i < count; i++){
        //     let item = new SixSection1BuildItem();
        //     item.initItem(i, data, {isBig:isBig});
        //     bgContainer.addChild(item);
        //     this._buildItemList[i] = item;
        //     let offX = 0;
        //     if (seatType == 1){
        //         offX = bgContainer.width/2 - item.width/2 - 14;
        //     }
        //     else if (seatType == 5){
        //         spaceX = 14;
        //         offX = (bgContainer.width - seatType * item.width - (seatType -1) * spaceX)/2 + i%seatType * (item.width + spaceX);
        //     }
        //     else if (seatType == 6){
        //         spaceX = 10;
        //         if (i < 3){
        //             offX = (bgContainer.width/2 - 20 - 3 * (item.width + spaceX) + spaceX)/2 + (i % 3) * (item.width + spaceX);
        //         }
        //         else {
        //             offX = bgContainer.width/2 + 20 + (bgContainer.width/2 - 20 - 3 * (item.width + spaceX) + spaceX)/2 + (i % 3) * (item.width + spaceX);
        //         }
        //     }
        //     item.x = offX;
        // }
        this.addChild(container);
        // let lineContainer = new BaseDisplayObjectContainer();
        // container.addChild(lineContainer);
        // lineContainer.height = bgContainer.height;
        // // let lineBg = BaseBitmap.create("sixsectionmainui_linenumbg");
        // let seatH = itemH;
        // let lineBg = BaseBitmap.create("public_9_bg92");;
        // lineBg.width = 30;
        // lineBg.height = bgContainer.height + 2;
        // lineBg.y = -1;
        // lineContainer.addChild(lineBg);
        // lineBg.alpha = 0.6;
        // let lineNum = ComponentManager.getTextField(""+data.lineNum, 14, TextFieldConst.COLOR_WHITE);
        // lineNum.setPosition(lineBg.x + lineBg.width/2 - lineNum.width/2, lineBg.y + seatH/2 - lineNum.height/2 + 15);
        // lineContainer.addChild(lineNum);
        // if (isBig){
        //     lineNum.y = lineBg.y + itemH/2 - lineNum.height/2 + 15 + 30;
        // }
        // let baseIndex = data.baseCfg.index;
        // if (baseIndex == 0){
        //     lineNum.y = 280;
        // }
        var scale = 1;
        if (isBig) {
            scale = 2;
        }
        bgContainer.setScale(scale);
        container.setScale(scale);
        this.width = bgContainer.width * scale;
        this.height = bgContainer.height * scale;
    };
    SixSection1BuildScrollItem.prototype.freshData = function () {
        // let lineNum = this._data.lineNum;
        // let mapInfo = Api.sixsection1VoApi.getMapInfoByFloor(lineNum);
        // App.LogUtil.log("update linenum "+lineNum);
        // console.log("build update ", mapInfo);
        for (var i = 0; i < this._buildItemList.length; i++) {
            this._buildItemList[i].update();
        }
    };
    SixSection1BuildScrollItem.prototype.playAni = function (index) {
        var item = this._buildItemList[index - 1];
        App.LogUtil.log("playeANI " + index);
        if (item) {
            item.showLight();
            var time = 400;
            egret.Tween.get(item, { loop: false }).to({ scaleX: 1.2, scaleY: 1.2 }, time).to({ scaleX: 1, scaleY: 1, alpha: 0.5 }, time).to({ scaleX: 1.2, scaleY: 1.2, alpha: 1 }, time).to({ scaleX: 1, scaleY: 1 }, time);
        }
    };
    SixSection1BuildScrollItem.prototype.getSeatItemHeight = function () {
        return this._itemH;
    };
    SixSection1BuildScrollItem.prototype.getItemContainer = function () {
        var container = this.getChildByName("itemContainer");
        return container;
    };
    SixSection1BuildScrollItem.prototype.getSpaceX = function () {
        return 0;
    };
    SixSection1BuildScrollItem.prototype.getSpaceY = function () {
        return 0;
    };
    /**
     * 是否是测量边界，默认true，false是使用this.width和this.height
     */
    SixSection1BuildScrollItem.prototype.checkBounds = function () {
        return false;
    };
    SixSection1BuildScrollItem.prototype.dispose = function () {
        this._buildItemList = [];
        this._data = null;
        _super.prototype.dispose.call(this);
    };
    return SixSection1BuildScrollItem;
}(ScrollListItem));
__reflect(SixSection1BuildScrollItem.prototype, "SixSection1BuildScrollItem");
//# sourceMappingURL=SixSection1BuildScrollItem.js.map