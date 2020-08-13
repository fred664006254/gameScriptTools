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
 * 排行榜滑动列表类 统一处理
 * author ycg
 * date 2020.6.4
 * @class RankScrollList
 * 适用于数据量较大 需要翻页显示的情况, 接口必传参数 index: 第几页的数据
 * itemparam index: this._pageId 页之前的总数据个数=this._pageId * this._onePageNum, 也可不传，刷新item 序号需使用
 */
var RankScrollList = /** @class */ (function (_super) {
    __extends(RankScrollList, _super);
    function RankScrollList(pageNum) {
        if (pageNum === void 0) { pageNum = 20; }
        var _this = _super.call(this, pageNum) || this;
        _this._pageId = 1;
        _this._oldPageId = 0;
        _this._requestData = null;
        _this._onePageNum = 100;
        _this._isNeedRequest = false;
        _this._isSlideDown = false; // 向下滑动 false 向上滑动
        _this._requestFlag = null;
        _this._isShowLastTip = true;
        return _this;
    }
    RankScrollList.prototype.initRankScrollList = function (ScrollListItemClass, dataList, scrollRect, itemParam, isFill, useHeight, request, onePageNum) {
        if (isFill === void 0) { isFill = false; }
        if (useHeight === void 0) { useHeight = false; }
        if (itemParam) {
            itemParam["index"] = 0;
        }
        this.init(ScrollListItemClass, dataList, scrollRect, itemParam, isFill, useHeight);
        if (request) {
            this._requestData = request;
            this.bindMoveCompleteCallback(this.moveComplete, this);
            this.bindChangeCallback(this.changeListCallback, this);
        }
        if (onePageNum && onePageNum > this._onePageNum) {
            this._onePageNum = onePageNum;
        }
    };
    //是否提示是最后一页
    RankScrollList.prototype.isShowLastTip = function (isShow) {
        this._isShowLastTip = isShow;
    };
    /**
     * 滑动回调 监听事件
     */
    RankScrollList.prototype.changeListCallback = function () {
        if (this._isNeedRequest) {
            this.setRequestFlagPos();
            return;
        }
        this._oldPageId = this._pageId;
        if (this.checkIsAtButtomRequest()) {
            this._isSlideDown = false;
            if (!this._isNeedRequest) {
                this._pageId += 1;
                if (this._oldPageId != this._pageId) {
                    this._isNeedRequest = true;
                    this.setRequestFlagPos();
                }
            }
        }
        else if (this.checkIsAtTopRequest()) {
            this._isSlideDown = true;
            if (!this._isNeedRequest) {
                this._pageId = Math.max(1, this._pageId - 1);
                if (this._oldPageId != this._pageId) {
                    this._isNeedRequest = true;
                    this.setRequestFlagPos();
                }
            }
        }
    };
    /**外部调用请求接口需要重置 pageId */
    RankScrollList.prototype.setRequestIndex = function (index) {
        this._pageId = index;
        this._oldPageId = this._pageId;
    };
    /**
     * 滑动完成回调
     */
    RankScrollList.prototype.moveComplete = function () {
        App.LogUtil.log("movecomplete ");
        if (this._isNeedRequest) {
            if (this._requestFlag) {
                this._requestFlag.visible = false;
            }
            if (this._pageId != this._oldPageId) {
                if (!this._requestData.requestParam["index"]) {
                    this._requestData.requestParam["index"] = 1;
                }
                this._requestData.requestParam["index"] = this._pageId;
                this._oldPageId = this._pageId;
                NetManager.request(this._requestData.requestType, this._requestData.requestParam);
            }
            this._isNeedRequest = false;
        }
    };
    /**
     * 请求标记
     */
    RankScrollList.prototype.addRequestFlag = function () {
        if (this._requestFlag) {
            return;
        }
        var content = this.parent;
        var flag = BaseBitmap.create("public_loadflag");
        flag.anchorOffsetX = flag.width / 2;
        flag.anchorOffsetY = flag.height / 2;
        content.addChild(flag);
        flag.visible = false;
        this._requestFlag = flag;
        egret.Tween.get(flag, { loop: true }).to({ rotation: 360 }, 1000);
    };
    /**
     * 刷新请求标记位置
     */
    RankScrollList.prototype.setRequestFlagPos = function () {
        if (this._requestFlag && this._isNeedRequest) {
            if (this._isSlideDown) {
                var offY = Math.abs(this.scrollTop) / 2 - this._requestFlag.height / 2;
                if (offY <= 10 || this.scrollTop >= 0) {
                    this._requestFlag.visible = false;
                }
                else {
                    this._requestFlag.visible = true;
                    App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, this._requestFlag, this, [0, offY]);
                }
            }
            else {
                var maxTop = this.getCurrMaxScrollTop();
                var offY = Math.abs(this.scrollTop - maxTop) / 2 - this._requestFlag.height / 2;
                if (maxTop <= 0 || offY <= 0 || this.scrollTop <= maxTop || this.scrollTop - maxTop < this._requestFlag.height + 10) {
                    this._requestFlag.visible = false;
                }
                else {
                    this._requestFlag.visible = true;
                    App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, this._requestFlag, this, [0, offY]);
                }
            }
        }
    };
    /**
     * 刷新列表
     * @param data  datalist
     * @param param  item 参数
     */
    RankScrollList.prototype.refreshRankData = function (data, param) {
        if (data && data.length > 0) {
            var stIndex = (this._pageId - 1) * this._onePageNum;
            if (param) {
                if (!param["index"]) {
                    param["index"] = 0;
                    stIndex = 0;
                }
                else {
                    var curIndex = param["index"];
                    if (curIndex > 0) {
                        stIndex = (curIndex - 1) * this._onePageNum;
                    }
                }
                param["index"] = stIndex;
            }
            else {
                param = { index: stIndex };
            }
            App.LogUtil.log(" refresh " + param.index);
            this.refreshData(data, param);
            this.scrollTop = 0;
        }
        else {
            this._pageId -= 1;
            if (this._pageId < 1) {
                this._pageId = 1;
            }
            if (this._isShowLastTip) {
                App.CommonUtil.showTip(LanguageManager.getlocal("rankLastTip"));
            }
        }
    };
    RankScrollList.prototype.dispose = function () {
        if (this._requestFlag) {
            egret.Tween.removeTweens(this._requestFlag);
        }
        this._pageId = 1;
        this._requestData = null;
        this._onePageNum = 0;
        this._isNeedRequest = false;
        this._oldPageId = 0;
        this._requestFlag = null;
        this._isSlideDown = false;
        _super.prototype.dispose.call(this);
    };
    return RankScrollList;
}(ScrollList));
//# sourceMappingURL=RankScrollList.js.map