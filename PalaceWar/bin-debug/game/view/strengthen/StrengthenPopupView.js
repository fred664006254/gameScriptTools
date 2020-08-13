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
var StrengthenPopupView = (function (_super) {
    __extends(StrengthenPopupView, _super);
    function StrengthenPopupView() {
        var _this = _super.call(this) || this;
        _this._scrollList = null;
        _this._fourPeopleInfoVoList = null;
        _this._activityTimerText = null;
        _this._acCDTxt = null;
        _this._ruleText = null;
        _this._inOrderText = null;
        return _this;
    }
    StrengthenPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "strengthen_button"
        ]);
    };
    StrengthenPopupView.prototype.initView = function () {
        //直监听演武场，其他界面都会关闭这个板子
        App.MessageHelper.addNetMessage("studyatk", this.refreshView, this);
        this.showList();
    };
    StrengthenPopupView.prototype.showList = function () {
        this._fourPeopleInfoVoList = [1, 2, 3];
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, 640, 900);
        this._scrollList = ComponentManager.getScrollList(StrengthenScrollItem, this._fourPeopleInfoVoList, rect);
        this.addChildToContainer(this._scrollList);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, this._scrollList, this.container, [0, 5], true);
        //this._scrollList.setPosition(20, 20);
    };
    StrengthenPopupView.prototype.refreshView = function () {
        this._scrollList.refreshData(this._fourPeopleInfoVoList);
    };
    StrengthenPopupView.prototype.getShowWidth = function () {
        return 570;
    };
    StrengthenPopupView.prototype.getShowHeight = function () {
        return 820;
    };
    StrengthenPopupView.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage("studyatk", this.refreshView, this);
        this._scrollList = null;
        this._fourPeopleInfoVoList = null;
        _super.prototype.dispose.call(this);
    };
    return StrengthenPopupView;
}(PopupView));
__reflect(StrengthenPopupView.prototype, "StrengthenPopupView");
//# sourceMappingURL=StrengthenPopupView.js.map