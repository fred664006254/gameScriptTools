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
var AcSeasideGameTaskPopupViewTab3 = (function (_super) {
    __extends(AcSeasideGameTaskPopupViewTab3, _super);
    function AcSeasideGameTaskPopupViewTab3(param) {
        var _this = _super.call(this) || this;
        _this._bg = null;
        _this._scrollList = null;
        _this.code = null;
        _this.aid = null;
        _this._taskList = null;
        _this.aid = param.data.aid;
        _this.code = param.data.code;
        // this.type = param.data.type;
        _this.initView();
        return _this;
    }
    AcSeasideGameTaskPopupViewTab3.prototype.initView = function () {
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_SEASIDEGAME_REFRESHVO, this.refreshData, this);
        this._bg = BaseBitmap.create("public_tc_bg01");
        this._bg.width = 535;
        this._bg.height = 608;
        this._bg.x = 45;
        this._bg.y = 55;
        this.addChild(this._bg);
        this.showList();
    };
    Object.defineProperty(AcSeasideGameTaskPopupViewTab3.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcSeasideGameTaskPopupViewTab3.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    AcSeasideGameTaskPopupViewTab3.prototype.showList = function () {
        if (this._scrollList == null) {
            var dayTaskList = this.vo.getSortTask(3); //this.cfg.getTaskListById(3);
            // this._taskList = dayTaskList;
            dayTaskList.sort(function (a, b) { return a.sortId - b.sortId; });
            var rect = egret.Rectangle.create();
            rect.setTo(0, 0, 516, 585);
            this._scrollList = ComponentManager.getScrollList(AcSeasideGameTaskScrollItem, dayTaskList, rect, { aid: this.aid, code: this.code });
            this.addChild(this._scrollList);
            this._scrollList.setPosition(GameConfig.stageWidth / 2 - this._scrollList.width / 2 - 7, 65);
        }
    };
    AcSeasideGameTaskPopupViewTab3.prototype.refreshData = function () {
        if (this._scrollList) {
            var dayTaskList = this.vo.getSortTask(3);
            dayTaskList.sort(function (a, b) { return a.sortId - b.sortId; });
            this._scrollList.refreshData(dayTaskList, { aid: this.aid, code: this.code });
        }
    };
    AcSeasideGameTaskPopupViewTab3.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_SEASIDEGAME_REFRESHVO, this.refreshData, this);
        this._scrollList = null;
        this._bg = null;
        this.aid = null;
        this.code = null;
        this._taskList = null;
        _super.prototype.dispose.call(this);
    };
    return AcSeasideGameTaskPopupViewTab3;
}(PopupViewTab));
__reflect(AcSeasideGameTaskPopupViewTab3.prototype, "AcSeasideGameTaskPopupViewTab3");