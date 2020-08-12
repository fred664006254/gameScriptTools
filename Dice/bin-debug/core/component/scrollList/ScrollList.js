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
 * 滑动列表类
 * author 陈可
 * date 2017/9/22
 * @class ScrollList
 */
var ScrollList = (function (_super) {
    __extends(ScrollList, _super);
    function ScrollList(pageNum) {
        if (pageNum === void 0) { pageNum = 20; }
        var _this = _super.call(this) || this;
        _this._scrollListItemArr = [];
        _this._scrollListHeightArr = [];
        _this._scrollRect = undefined;
        _this._lastPos = null;
        _this._curShowItem = null;
        _this._widthCount = -1;
        _this._dataList = [];
        _this._lastX = 0;
        _this._lastY = 0;
        /**
         * 每次刷新数量，就是每页数量
         */
        _this._pageNum = 20;
        /**
         * 页面数量最大值
         */
        _this._maxPage = 1;
        /**
         * 当前初始化到的页面
         */
        _this._curPageIndex = 1;
        //自动填充
        _this._isFill = false;
        //使用height代替bounds
        _this._useHeight = false;
        _this.horizontalScrollPolicy = "off";
        if (pageNum < 1) {
            _this._pageNum = 99999999;
        }
        else {
            _this._pageNum = pageNum;
        }
        return _this;
    }
    /**
     * 初始化ScrollList
     * @param ScrollListItemClass
     * @param dataList
     * @param scrollRect
     */
    ScrollList.prototype.init = function (ScrollListItemClass, dataList, scrollRect, itemParam, isFill, useHeight) {
        if (isFill === void 0) { isFill = false; }
        if (useHeight === void 0) { useHeight = false; }
        this._listItemClass = ScrollListItemClass;
        this._scrollRect = scrollRect;
        this._itemParam = itemParam;
        this._isFill = isFill;
        this._useHeight = useHeight;
        var content = new BaseDisplayObjectContainer();
        this.content = content;
        this.setContent(this.content);
        if (dataList == null || (!dataList.length) || dataList.length < 1) {
            this.width = scrollRect.width;
            this.height = scrollRect.height;
            this.addEventListener(egret.Event.CHANGE, this.changeHandler, this);
            this.addEventListener(egret.Event.COMPLETE, this.moveCompleteHandler, this);
            return;
        }
        this._maxPage = Math.ceil(dataList.length / this._pageNum);
        this._dataList = dataList;
        while (this.checkIsAtButtom() && this._curPageIndex <= this._maxPage) {
            this.initNextPage();
        }
        this.addEventListener(egret.Event.CHANGE, this.changeHandler, this);
        this.addEventListener(egret.Event.COMPLETE, this.moveCompleteHandler, this);
        this.width = scrollRect.width;
        this.height = scrollRect.height;
    };
    ScrollList.prototype.initNextPage = function () {
        var startIdx = (this._curPageIndex - 1) * this._pageNum;
        var endIdx = this._curPageIndex * this._pageNum <= this._dataList.length ? this._curPageIndex * this._pageNum : this._dataList.length;
        this.initListData(startIdx, endIdx);
        this._curPageIndex++;
    };
    ScrollList.prototype.initListData = function (stIdx, endIdx) {
        var data = undefined;
        var scrollListItem = undefined;
        var isCheckCount = false;
        if (this._widthCount > 1) {
            if (stIdx % this._widthCount != 0) {
                stIdx = this._widthCount * Math.ceil(stIdx / this._widthCount);
            }
            if (endIdx % this._widthCount != 0) {
                endIdx = this._widthCount * Math.ceil(endIdx / this._widthCount);
                if (endIdx >= this._dataList.length) {
                    endIdx = this._dataList.length;
                }
            }
            isCheckCount = true;
        }
        if (stIdx >= endIdx) {
            return;
        }
        var itemHeight = 0;
        var itemWidth = 0;
        for (var i = stIdx; i < endIdx; i++) {
            data = this._dataList[i];
            scrollListItem = ScrollListItem.create(this._listItemClass, i, data, this._itemParam);
            // scrollListItem["init"](i,data);
            if (itemHeight == 0) {
                itemHeight = scrollListItem.height + scrollListItem.getSpaceY();
                itemWidth = scrollListItem.width - scrollListItem.getSpaceX();
            }
            if (this._lastX + scrollListItem.width - scrollListItem.getSpaceX() > this._scrollRect.width) {
                if (this._widthCount < 0) {
                    this._widthCount = i > 0 ? i : 1;
                    if (isCheckCount == false && this._widthCount > 1) {
                        if (endIdx % this._widthCount != 0) {
                            endIdx = this._widthCount * Math.ceil(endIdx / this._widthCount);
                            if (endIdx >= this._dataList.length) {
                                endIdx = this._dataList.length;
                            }
                        }
                        isCheckCount = true;
                    }
                }
                if (i > 0) {
                    this._lastX = 0;
                    if (this._scrollListItemArr.length > 0) {
                        this._lastY = this._lastY + this._scrollListItemArr[this._scrollListItemArr.length - 1].height;
                    }
                    else {
                        this._lastY = this._lastY + scrollListItem.height;
                    }
                }
            }
            scrollListItem.setPosition(this._lastX, this._lastY);
            // content.addChild(scrollListItem);
            this._scrollListItemArr.push(scrollListItem);
            var itemRect = scrollListItem.getBounds();
            itemRect.x += scrollListItem.x;
            itemRect.y += scrollListItem.y;
            if (this._useHeight) {
                itemRect.height = scrollListItem.height;
            }
            this._scrollListHeightArr.push(itemRect);
            if (this._lastX + scrollListItem.width - scrollListItem.getSpaceX() <= this._scrollRect.width || this._widthCount == 1) {
                this._lastX += scrollListItem.width;
            }
        }
        //补充
        if (this._isFill) {
            var myWithCouth = Math.floor(this._scrollRect.width / itemWidth);
            if (myWithCouth > 1) {
                var start1 = endIdx;
                var end1 = void 0;
                if (endIdx % myWithCouth == 0) {
                    end1 = endIdx;
                }
                else {
                    end1 = start1 - endIdx % myWithCouth + myWithCouth;
                }
                var heightCount = Math.ceil(this._scrollRect.height / itemHeight);
                var curHeight = Math.ceil(endIdx / myWithCouth);
                if (heightCount > curHeight) {
                    end1 += (heightCount - curHeight) * myWithCouth;
                }
                for (var i_1 = start1; i_1 < end1; i_1++) {
                    var scrollListItem_1 = ScrollListItem.create(this._listItemClass, i_1, null, this._itemParam);
                    if (this._lastX + scrollListItem_1.width - scrollListItem_1.getSpaceX() > this._scrollRect.width) {
                        if (i_1 > 0) {
                            this._lastX = 0;
                            if (this._scrollListItemArr.length > 0) {
                                this._lastY = this._lastY + this._scrollListItemArr[this._scrollListItemArr.length - 1].height;
                            }
                            else {
                                this._lastY = this._lastY + scrollListItem_1.height;
                            }
                        }
                    }
                    scrollListItem_1.setPosition(this._lastX, this._lastY);
                    // content.addChild(scrollListItem);
                    this._scrollListItemArr.push(scrollListItem_1);
                    var itemRect = scrollListItem_1.getBounds();
                    itemRect.x += scrollListItem_1.x;
                    itemRect.y += scrollListItem_1.y;
                    if (this._useHeight) {
                        itemRect.height = scrollListItem_1.height;
                    }
                    this._scrollListHeightArr.push(itemRect);
                    if (this._lastX + scrollListItem_1.width - scrollListItem_1.getSpaceX() <= this._scrollRect.width || myWithCouth == 1) {
                        this._lastX += scrollListItem_1.width;
                    }
                }
            }
        }
        if (scrollListItem) {
            this.content.width = scrollListItem.width;
        }
        this.content.height = scrollListItem ? this._lastY + scrollListItem.height : this._lastY;
    };
    ScrollList.prototype.setEmptyTip = function (emptyStr, color) {
        var content = this.content;
        if (content && (content instanceof egret.DisplayObjectContainer)) {
            var emptyTxt = content.getChildByName("emptyTxt");
            if (emptyTxt) {
                emptyTxt.text = emptyStr;
                emptyTxt.visible = true;
            }
            else {
                if (this._ScrV_Props_._scrollStarted == false) {
                    this.setScrollTop(0);
                }
                emptyTxt = ComponentMgr.getTextField(emptyStr, TextFieldConst.SIZE_CONTENT_COMMON);
                content.addChild(emptyTxt);
                emptyTxt.name = "emptyTxt";
                if (this._dataList && this._dataList.length > 0) {
                    emptyTxt.visible = false;
                }
            }
            if (color) {
                emptyTxt.textColor = color;
            }
            emptyTxt.setPosition((this._scrollRect.width - emptyTxt.width) / 2, (this._scrollRect.height - emptyTxt.height) / 2);
        }
    };
    ScrollList.prototype.checkEmptyTip = function (isShow) {
        var content = this.content;
        if (content && (content instanceof egret.DisplayObjectContainer)) {
            if (this._ScrV_Props_._scrollStarted = false) {
                this.setScrollTop(0);
            }
            var emptyTxt = content.getChildByName("emptyTxt");
            if (emptyTxt) {
                emptyTxt.visible = isShow;
            }
        }
    };
    ScrollList.prototype.moveCompleteHandler = function (e) {
        if (this._moveCompleteCallBack) {
            this._moveCompleteCallBack.call(this._moveComPleteCallBackObj);
        }
    };
    ScrollList.prototype.getItemByIndex = function (index) {
        return this._scrollListItemArr[index];
    };
    /**
     * 根据数据刷新列表
     * @param dataList 数据列表，非必须，如果和初始化是同一个数据对象，无需传
     * @param itemParam 刷新元素对象的参数，分别原样传到scrollListItem的initData方法，默认值是NaN，传NaN或者不传的话不刷新
     */
    ScrollList.prototype.refreshData = function (dataList, itemParam) {
        if (itemParam === void 0) { itemParam = NaN; }
        if (this._ScrV_Props_._isHTweenPlaying || this._ScrV_Props_._isVTweenPlaying) {
            this._onScrollFinished();
        }
        this._dataList = dataList;
        if (itemParam != NaN) {
            this._itemParam = itemParam;
        }
        var l = this._scrollListItemArr.length;
        // let className:string=egret.getQualifiedClassName(this._scrollListItemArr[0]);
        for (var i = l - 1; i >= 0; i--) {
            ScrollListItem.release(this._scrollListItemArr.pop());
        }
        this._scrollListHeightArr.length = 0;
        if (this._dataList == null || (!this._dataList.length) || this._dataList.length < 1) {
            this._maxPage = 0;
            this.checkEmptyTip(true);
            this.setArrow();
            return;
        }
        this._maxPage = Math.ceil(dataList.length / this._pageNum);
        this.checkEmptyTip(false);
        this._lastX = this._lastY = 0;
        var lastInitFullPage = Math.floor(l / this._pageNum);
        if (l % this._pageNum == 0) {
            l = Math.min((l == 0 ? this._pageNum : l), dataList.length);
        }
        else {
            l = Math.min((lastInitFullPage + 1) * this._pageNum, dataList.length);
        }
        if (Math.ceil(l / this._pageNum) != this._curPageIndex) {
            this._curPageIndex = Math.ceil(l / this._pageNum);
        }
        // l=l<this._pageNum?(Math.min(this._pageNum,dataList.length)):Math.min(l,dataList.length);
        this.initListData(0, l);
        if (this._dataList.length > 0) {
            this._curPageIndex++;
        }
        this.width = this._scrollRect.width;
        this.height = this._scrollRect.height;
        this._lastPos = null;
        this._curShowItem = null;
        this.setScrollTop(this.scrollTop);
        this.changeHandler(null);
        this.setArrow();
    };
    ScrollList.prototype.removeItem = function (idx) {
        if (this._dataList[idx]) {
            this._dataList.splice(idx, 1);
        }
        var item = this._scrollListItemArr[idx];
        if (this._scrollListItemArr[idx]) {
            this._scrollListItemArr.splice(idx, 1);
        }
        if (this._scrollListHeightArr[idx]) {
            this._scrollListHeightArr.splice(idx, 1);
        }
        if (item.parent) {
            item.dispose();
        }
        this.refreshData(this._dataList);
    };
    ScrollList.prototype.changeHandler = function (e) {
        if (this._lastPos == null || this.scrollRect.y != this._lastPos.y) {
            var lastMin = this._curShowItem ? this._curShowItem.min : -1;
            var lastMax = this._curShowItem ? this._curShowItem.max : -1;
            var containMin = NaN;
            var containMax = NaN;
            var isFind = false;
            var l = this._scrollListItemArr.length;
            var useRect = egret.Rectangle.create();
            useRect.copyFrom(this.scrollRect);
            useRect.width = this._scrollRect.width;
            useRect.height = this._scrollRect.height;
            var islookDown = true;
            if (this._lastPos == null || this.scrollRect.y > this._lastPos.y) {
                islookDown = true;
                var findMin = lastMin == -1 ? 0 : lastMin;
                for (var i = findMin; i < l; i++) {
                    var rect = this._scrollListHeightArr[i];
                    if (useRect.intersects(rect)) {
                        if (isNaN(containMin)) {
                            containMin = i;
                        }
                        isFind = true;
                    }
                    else {
                        if (isFind && isNaN(containMax)) {
                            containMax = i + this._widthCount - 1;
                            break;
                        }
                    }
                }
            }
            else {
                islookDown = false;
                var findMax = this._curShowItem.max >= l ? l - 1 : this._curShowItem.max;
                for (var i = findMax; i >= 0; i--) {
                    var rect = this._scrollListHeightArr[i];
                    if (useRect.intersects(rect)) {
                        if (isNaN(containMax)) {
                            containMax = i + 1;
                        }
                        isFind = true;
                    }
                    else {
                        if (isFind && isNaN(containMin)) {
                            containMin = i - this._widthCount + 1;
                            break;
                        }
                    }
                }
            }
            if (isNaN(containMax)) {
                containMax = l - 1;
            }
            if (isNaN(containMin)) {
                containMin = 0;
            }
            if (containMin < 0) {
                containMin = 0;
            }
            if (containMax > l - 1) {
                containMax = l - 1;
            }
            if (this._curShowItem) {
                this._curShowItem.min = containMin;
                this._curShowItem.max = containMax;
            }
            else {
                this._curShowItem = { min: containMin, max: containMax };
            }
            if (lastMin == -1 && lastMax == -1) {
                for (var i = containMin; i <= containMax; i++) {
                    this.showItem(i, islookDown);
                }
            }
            else {
                //无交集
                if (lastMax < containMin || lastMin > containMax) {
                    var start = lastMax < containMin ? lastMin : (containMax + 1);
                    var end = lastMax < containMin ? (containMin - 1) : lastMax;
                    for (var i = start; i <= end; i++) {
                        this.hideItem(i, islookDown);
                    }
                    for (var i = containMin; i <= containMax; i++) {
                        this.showItem(i, islookDown);
                    }
                }
                else {
                    //有交集
                    if (lastMin != containMin) {
                        var big = lastMin > containMin ? lastMin : containMin;
                        var small = lastMin < containMin ? lastMin : containMin;
                        var opera = null;
                        if (islookDown) {
                            opera = lastMin < containMin ? this.hideItem : this.showItem;
                        }
                        else {
                            opera = lastMin < containMin ? this.hideItem : this.showItem;
                        }
                        for (var i = small; i < big; i++) {
                            opera.call(this, i, islookDown);
                        }
                    }
                    if (lastMax != containMax) {
                        var big = lastMax > containMax ? lastMax : containMax;
                        var small = lastMax < containMax ? lastMax : containMax;
                        var opera = lastMax > containMax ? this.hideItem : this.showItem;
                        // if(islookDown)
                        // {
                        opera = lastMax > containMax ? this.hideItem : this.showItem;
                        // }
                        // else
                        // {
                        // 	opera=lastMax<containMax?this.hideItem:this.showItem;
                        // }
                        for (var i = small; i <= big; i++) {
                            opera.call(this, i, islookDown);
                        }
                    }
                    // for(let i:number=containMin;i<=containMax;i++){
                    // 	this.showItem(i);
                    // }
                    // let big:number=lastMin>containMin?lastMin:containMin;
                    // let small:number=lastMin<containMin?lastMin:containMin;
                    // let opera:(index:number)=>void=null;
                    // opera=lastMin<containMin?this.hideItem:this.showItem;
                    // for(let i:number=small;i<=big;i++)
                    // {
                    // 	opera.call(this,i);
                    // }
                    // if(lastMin < containMin){
                    // 	for(let i:number=lastMin;i<containMin;i++){
                    // 		this.hideItem(i);
                    // 	}
                    // }
                    // if(lastMax > containMax){
                    // 	for(let i:number=(containMax+1);i<=lastMax;i++){
                    // 		this.hideItem(i);
                    // 	}
                    // }
                }
            }
            // this._lastMin = lastMin;
            // this._lastMax = lastMax;
            // this._nowMin = containMin;
            // this._nowMax = containMax;
            // App.LogUtil.show(lastMin,lastMax,">>",containMin,containMax);
            if (!this._lastPos) {
                this._lastPos = egret.Point.create(this.scrollRect.x, this.scrollRect.y);
            }
            else {
                this._lastPos.setTo(this.scrollRect.x, this.scrollRect.y);
            }
        }
        if (this.checkIsAtButtom() && this._curPageIndex <= this._maxPage) {
            this.initNextPage();
        }
    };
    ScrollList.prototype.hideItem = function (index, islookDown) {
        if (this.content instanceof egret.DisplayObjectContainer) {
            var item = this._scrollListItemArr[index];
            if (this.content.contains(item)) {
                this.content.removeChild(item);
                // App.LogUtil.show("remove",index);
            }
        }
    };
    ScrollList.prototype.showItem = function (index, islookDown) {
        if (this.content instanceof egret.DisplayObjectContainer) {
            var item = this._scrollListItemArr[index];
            if (item && this.content && this.content.contains(item) == false) {
                var scaleV = islookDown ? 1 : -1;
                var checkItem = this._scrollListItemArr[index + scaleV];
                if (checkItem && this._lastPos) {
                    var cidx = this.content.getChildIndex(checkItem);
                    cidx += (islookDown ? 0 : 1);
                    this.content.addChildAt(item, cidx);
                }
                else {
                    this.content.addChild(item);
                }
                // App.LogUtil.show("show",index);
            }
        }
    };
    ScrollList.prototype.setContentHeight = function (num) {
        if (this.content) {
            this.content.height += num;
        }
    };
    /**
     * 添加触摸回调
     */
    ScrollList.prototype.addTouchTap = function (touchTapHandler, touchTapHandlerThisObj, touchTapHandlerParams) {
        var ths = this;
        if (this._touchTapHelper == null) {
            //局部调用，勿改
            var tapHandler = function (event) {
                var args = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    args[_i - 1] = arguments[_i];
                }
                if (event.type == egret.TouchEvent.TOUCH_END) {
                    var scrollRect = ths.scrollRect;
                    var offx = scrollRect ? scrollRect.x : 0;
                    var offy = scrollRect ? scrollRect.y : 0;
                    var min = ths._curShowItem ? ths._curShowItem.min : 0;
                    var max = ths._curShowItem ? ths._curShowItem.max : ths._scrollListItemArr.length - 1;
                    var checkRect = egret.Rectangle.create();
                    var _a = ths.content.globalToLocal(event.stageX, event.stageY), x = _a.x, y = _a.y;
                    for (var i = min; i <= max; i++) {
                        var item = ths._scrollListItemArr[i];
                        var tmpX = ths._scrollListHeightArr[i].x;
                        var tmpY = ths._scrollListHeightArr[i].y;
                        var itemRect = ths._scrollListItemArr[i].getBounds(ths._scrollListHeightArr[i]);
                        itemRect.x = tmpX;
                        itemRect.y = tmpY;
                        checkRect.setTo(itemRect.x, itemRect.y, itemRect.width - item.getSpaceX(), itemRect.height - item.getSpaceY());
                        if (checkRect.contains(x, y)) {
                            var btnList = this.findBtn(item);
                            var btnL = btnList.length;
                            for (var ii = 0; ii < btnL; ii++) {
                                var childRect = btnList[ii].getBounds();
                                childRect.x = itemRect.x + btnList[ii].x;
                                childRect.y = itemRect.y + btnList[ii].y;
                                if (childRect.contains(x, y)) {
                                    return;
                                }
                            }
                            //处理点击逻辑
                            event.data = i;
                            if (touchTapHandler) {
                                var params = [event];
                                if (args && args.length > 0) {
                                    params.concat(args);
                                }
                                touchTapHandler.apply(touchTapHandlerThisObj, params);
                            }
                            break;
                        }
                    }
                    egret.Rectangle.release(checkRect);
                }
            };
            this._touchTapHelper = TouchHelper.addTouch(this.content, tapHandler, this, touchTapHandlerParams, true);
        }
    };
    ScrollList.prototype.findBtn = function (item) {
        var btnList = [];
        var itemChildNum = item.numChildren;
        for (var ii = 0; ii < itemChildNum; ii++) {
            var child = item.getChildAt(ii);
            if (child instanceof BaseButton) {
                btnList.push(child);
            }
            else if (child instanceof egret.DisplayObjectContainer) {
                this.findBtn(child);
            }
        }
        return btnList;
    };
    /**
     * 移动到指定位置
     * @param index 元素索引
     * @param duration 缓动时间
     */
    ScrollList.prototype.setScrollTopByIndex = function (index, duration) {
        if (index >= this._scrollListItemArr.length) {
            if (this._scrollListItemArr.length >= this._dataList.length) {
                index = this._scrollListItemArr.length - 1;
            }
            else if (this._curPageIndex <= this._maxPage) {
                this.initNextPage();
                return this.setScrollTopByIndex(index, duration);
            }
            else {
                index = this._scrollListItemArr.length - 1;
            }
        }
        var scrollTop = this._scrollListHeightArr[index].y + this._scrollListHeightArr[index].height / 2;
        var endRect = this._scrollListHeightArr[this._scrollListHeightArr.length - 1];
        var maxY = endRect.y + endRect.height;
        var isTop = false;
        var isEnd = false;
        if (scrollTop < this._scrollRect.height / 2) {
            scrollTop = 0;
        }
        else if (scrollTop > maxY - this._scrollRect.height / 2) {
            scrollTop = maxY - this._scrollRect.height;
        }
        else {
            scrollTop = this._scrollListHeightArr[index].y + this._scrollListHeightArr[index].height / 2 - this._scrollRect.height / 2;
        }
        this.setScrollTop(scrollTop, duration);
    };
    ScrollList.prototype.setScrollLeftByIndex = function (index, duration) {
        if (index >= this._scrollListItemArr.length) {
            if (this._scrollListItemArr.length >= this._dataList.length) {
                index = this._scrollListItemArr.length - 1;
            }
            else if (this._curPageIndex <= this._maxPage) {
                this.initNextPage();
                return this.setScrollTopByIndex(index, duration);
            }
            else {
                index = this._scrollListItemArr.length - 1;
            }
        }
        var scrollLeft = this._scrollListHeightArr[index].x + this._scrollListHeightArr[index].width / 2;
        var endRect = this._scrollListHeightArr[this._scrollListHeightArr.length - 1];
        var maxX = endRect.x + endRect.width;
        if (scrollLeft < this._scrollRect.width / 2) {
            scrollLeft = 0;
        }
        else if (scrollLeft > maxX - this._scrollRect.width / 2) {
            scrollLeft = maxX - this._scrollRect.width;
        }
        else {
            scrollLeft = this._scrollListHeightArr[index].x + this._scrollListHeightArr[index].width / 2 - this._scrollRect.width / 2;
        }
        this.setScrollLeft(scrollLeft, duration);
    };
    /**
     * 移动到底部
     * @param duration 缓动时间
     *
     */
    ScrollList.prototype.moveToButtom = function (duration) {
        if (this._scrollListHeightArr) {
            if (this.checkIsAtButtom() == false) {
                var index = this._scrollListHeightArr.length - 1;
                this.setScrollTopByIndex(index);
            }
        }
    };
    /**
     * 检测是否在底部
     */
    ScrollList.prototype.checkIsAtButtom = function () {
        if (this._scrollListHeightArr.length > 0) {
            var lastIndex = this._scrollListHeightArr.length - 1;
            var maxY = this._scrollListHeightArr[lastIndex].y + this._scrollListHeightArr[lastIndex].height - this._scrollRect.height;
            if (this.scrollTop >= maxY - this._scrollListItemArr[lastIndex].getSpaceY()) {
                return true;
            }
            else {
                return false;
            }
        }
        return true;
    };
    ScrollList.prototype.bindMoveCompleteCallback = function (callback, callbackObj) {
        this._moveCompleteCallBack = callback;
        this._moveComPleteCallBackObj = callbackObj;
    };
    /**
 * 箭头翻阅提示
 */
    ScrollList.prototype.checkShowArrow = function () {
        var view = this;
        var flag = false;
        var content = view.content;
        var paramH = 0;
        if (view._curShowItem && view._curShowItem.max) {
            var lastitem = view.getItemByIndex(view._curShowItem.max);
            if (lastitem) {
                paramH = lastitem.height - Math.min(lastitem.getSpaceY(), 10);
            }
        }
        var height = content.height - (view.height + paramH);
        if (this.verticalScrollPolicy != 'off') {
            if (height > 0 && view.scrollTop < height) {
                flag = true;
            }
        }
        return (flag && this._isShowArrow);
    };
    ScrollList.prototype.dispose = function () {
        this._moveCompleteCallBack = null;
        this._moveComPleteCallBackObj = null;
        this.removeTouchTap();
        this.removeTouch();
        if (this._scrollListItemArr && this._scrollListItemArr.length > 0) {
            while (this._scrollListItemArr.length > 0) {
                var item = this._scrollListItemArr.pop();
                if (item) {
                    ScrollListItem.release(item);
                }
            }
        }
        _super.prototype.dispose.call(this);
        this._scrollListItemArr.length = 0;
        this._scrollListHeightArr.length = 0;
        if (this._scrollRect) {
            this._scrollRect = null;
        }
        if (this._lastPos) {
            egret.Point.release(this._lastPos);
            this._lastPos = null;
        }
        this._curShowItem = null;
        this._widthCount = -1;
        this._curPageIndex = 1;
        this._maxPage = 1;
        this._itemParam = null;
        this._isFill = false;
        this._useHeight = false;
    };
    return ScrollList;
}(ScrollView));
__reflect(ScrollList.prototype, "ScrollList");
//# sourceMappingURL=ScrollList.js.map