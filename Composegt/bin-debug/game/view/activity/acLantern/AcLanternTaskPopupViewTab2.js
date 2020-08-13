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
var AcLanternTaskPopupViewTab2 = (function (_super) {
    __extends(AcLanternTaskPopupViewTab2, _super);
    function AcLanternTaskPopupViewTab2(param) {
        var _this = _super.call(this) || this;
        _this._bg = null;
        _this._scrollList = null;
        _this.code = null;
        _this.aid = null;
        _this._taskList = null;
        _this.aid = param.data.aid;
        _this.code = param.data.code;
        _this.initView();
        return _this;
    }
    AcLanternTaskPopupViewTab2.prototype.initView = function () {
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_LANTERN_REFRESHVO, this.refreshData, this);
        this._bg = BaseBitmap.create("public_tc_bg01");
        this._bg.width = 535;
        this._bg.height = 608;
        this._bg.x = 45;
        this._bg.y = 55;
        this.addChild(this._bg);
        this.showList();
    };
    Object.defineProperty(AcLanternTaskPopupViewTab2.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcLanternTaskPopupViewTab2.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    AcLanternTaskPopupViewTab2.prototype.showList = function () {
        if (this._scrollList == null) {
            var dayTaskList = this.vo.getSortTask(2); //this.cfg.getTaskListById(1);
            // this._taskList = dayTaskList;
            dayTaskList.sort(function (a, b) { return a.sortId - b.sortId; });
            var rect = egret.Rectangle.create();
            rect.setTo(0, 0, 516, 585);
            this._scrollList = ComponentManager.getScrollList(AcLanternTaskScrollItem, dayTaskList, rect, { aid: this.aid, code: this.code, day: 2 });
            this.addChild(this._scrollList);
            this._scrollList.setPosition(GameConfig.stageWidth / 2 - this._scrollList.width / 2 - 7, 65);
        }
    };
    AcLanternTaskPopupViewTab2.prototype.refreshData = function () {
        if (this._scrollList) {
            var dayTaskList = this.vo.getSortTask(2);
            dayTaskList.sort(function (a, b) { return a.sortId - b.sortId; });
            this._scrollList.refreshData(dayTaskList, { aid: this.aid, code: this.code, day: 2 });
        }
    };
    AcLanternTaskPopupViewTab2.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_LANTERN_REFRESHVO, this.refreshData, this);
        this._scrollList = null;
        this._bg = null;
        this.aid = null;
        this.code = null;
        this._taskList = null;
        _super.prototype.dispose.call(this);
    };
    return AcLanternTaskPopupViewTab2;
}(PopupViewTab));
__reflect(AcLanternTaskPopupViewTab2.prototype, "AcLanternTaskPopupViewTab2");
