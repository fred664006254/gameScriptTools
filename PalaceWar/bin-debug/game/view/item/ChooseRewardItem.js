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
var ChooseRewardItem = (function (_super) {
    __extends(ChooseRewardItem, _super);
    function ChooseRewardItem() {
        var _this = _super.call(this) || this;
        _this._bg = null;
        _this.oIdx = 0;
        return _this;
    }
    ChooseRewardItem.prototype.initItem = function (index, data) {
        this.oIdx = data.originalIdx;
        var view = this;
        view.width = 178;
        view.height = 246;
        var bg = BaseBitmap.create(index == 0 ? "itemservantselect" : "itemservantbg");
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, bg, view, [0, 0], true);
        view._bg = bg;
        view.addChild(bg);
        var name = ComponentManager.getTextField(data.name, 20, TextFieldConst.COLOR_BLACK);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, name, bg, [0, 45]);
        view.addChild(name);
        if (PlatformManager.checkIsEnLang() || PlatformManager.checkIsRuLang()) {
            name.visible = false;
        }
        var icon = GameData.getItemIcon(data, true);
        // icon.setScale(0.65);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, icon, name, [0, name.textHeight + 10]);
        view.addChild(icon);
        bg.addTouchTap(function () {
            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_CHOOSEREWARD_ITEM_CLICK, data.originalIdx);
        }, view, null);
    };
    ChooseRewardItem.prototype.update = function (index) {
        var view = this;
        view._bg.setRes(index == view.oIdx ? "itemservantselect" : "itemservantbg");
    };
    ChooseRewardItem.prototype.getSpaceX = function () {
        return 0;
    };
    ChooseRewardItem.prototype.getSpaceY = function () {
        return 0;
    };
    ChooseRewardItem.prototype.dispose = function () {
        var view = this;
        view._bg.removeTouchTap();
        view._bg = null;
        this.oIdx = 0;
        _super.prototype.dispose.call(this);
    };
    return ChooseRewardItem;
}(ScrollListItem));
__reflect(ChooseRewardItem.prototype, "ChooseRewardItem");
//# sourceMappingURL=ChooseRewardItem.js.map