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
var AcMerryXmasTaskPopupViewTab = (function (_super) {
    __extends(AcMerryXmasTaskPopupViewTab, _super);
    function AcMerryXmasTaskPopupViewTab(param) {
        var _this = _super.call(this) || this;
        _this._scrollList = null;
        _this.code = null;
        _this.aid = null;
        _this.specialIconId = null;
        _this.uiCode = null;
        _this._tabIndex = 0;
        _this.aid = param.data.aid;
        _this.code = param.data.code;
        _this.specialIconId = param.data.specialIconId;
        _this.uiCode = param.data.uiCode || _this.code;
        _this.initView();
        return _this;
    }
    AcMerryXmasTaskPopupViewTab.prototype.initView = function () {
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_MERRYXMAS_REFRESHVO, this.refreshData, this);
        this.showList();
    };
    Object.defineProperty(AcMerryXmasTaskPopupViewTab.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcMerryXmasTaskPopupViewTab.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    AcMerryXmasTaskPopupViewTab.prototype.showList = function () {
        if (this._scrollList == null) {
            var taskList = this.vo.getSortTask(this.getTabIndex());
            taskList.sort(function (a, b) { return a.sortId - b.sortId; });
            var rect = egret.Rectangle.create();
            rect.setTo(0, 0, 530, 667);
            this._scrollList = ComponentManager.getScrollList(AcMerryXmasTaskScrollItem, taskList, rect, {
                aid: this.aid,
                code: this.code,
                uiCode: this.uiCode,
                specialIconId: this.specialIconId
            });
            this.addChild(this._scrollList);
            this._scrollList.setPosition(50, 73);
        }
    };
    AcMerryXmasTaskPopupViewTab.prototype.refreshData = function () {
        if (this._scrollList) {
            var taskList = this.vo.getSortTask(this.getTabIndex());
            taskList.sort(function (a, b) { return a.sortId - b.sortId; });
            this._scrollList.refreshData(taskList, {
                aid: this.aid,
                code: this.code,
                uiCode: this.uiCode,
                specialIconId: this.specialIconId
            });
        }
    };
    AcMerryXmasTaskPopupViewTab.prototype.getTabIndex = function () {
        return this._tabIndex;
    };
    AcMerryXmasTaskPopupViewTab.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_MERRYXMAS_REFRESHVO, this.refreshData, this);
        this._scrollList = null;
        this.aid = null;
        this.code = null;
        this.uiCode = null;
        this.specialIconId = null;
        this._tabIndex = 0;
        _super.prototype.dispose.call(this);
    };
    return AcMerryXmasTaskPopupViewTab;
}(PopupViewTab));
__reflect(AcMerryXmasTaskPopupViewTab.prototype, "AcMerryXmasTaskPopupViewTab");
