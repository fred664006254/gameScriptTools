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
var FqStrategyViewTab3 = (function (_super) {
    __extends(FqStrategyViewTab3, _super);
    function FqStrategyViewTab3() {
        var _this = _super.call(this) || this;
        _this._scrollList = null;
        _this._fourPeopleInfoVoList = null;
        _this._activityTimerText = null;
        _this._acCDTxt = null;
        _this._ruleText = null;
        _this._inOrderText = null;
        _this.initView();
        return _this;
    }
    FqStrategyViewTab3.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "strengthen_button"
        ]);
    };
    FqStrategyViewTab3.prototype.initView = function () {
        //直监听演武场，其他界面都会关闭这个板子
        App.MessageHelper.addNetMessage("studyatk", this.refreshView, this);
        this.showList();
    };
    FqStrategyViewTab3.prototype.showList = function () {
        this._fourPeopleInfoVoList = [1, 2, 3];
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, 640, GameConfig.stageHeigth - 100);
        this._scrollList = ComponentManager.getScrollList(StrengthenScrollItem, this._fourPeopleInfoVoList, rect);
        this.addChild(this._scrollList);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, this._scrollList, this, [18, 5], true);
        //this._scrollList.setPosition(20, 20);
    };
    FqStrategyViewTab3.prototype.refreshView = function () {
        this._scrollList.refreshData(this._fourPeopleInfoVoList);
    };
    FqStrategyViewTab3.prototype.getShowWidth = function () {
        return 570;
    };
    FqStrategyViewTab3.prototype.getShowHeight = function () {
        return 820;
    };
    FqStrategyViewTab3.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage("studyatk", this.refreshView, this);
        this._scrollList = null;
        this._fourPeopleInfoVoList = null;
        _super.prototype.dispose.call(this);
    };
    return FqStrategyViewTab3;
}(ViewTab));
__reflect(FqStrategyViewTab3.prototype, "FqStrategyViewTab3");
//# sourceMappingURL=FqStrategyViewTab3.js.map