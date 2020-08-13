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
 * 出巡帝王列表
 * date 2019.12.12
 * author ycg
 * @class EmperorOutListPopupView
 */
var EmperorOutListPopupView = (function (_super) {
    __extends(EmperorOutListPopupView, _super);
    function EmperorOutListPopupView() {
        var _this = _super.call(this) || this;
        _this._scrollList = null;
        return _this;
    }
    EmperorOutListPopupView.prototype.initView = function () {
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_EMPERORACHIEVE_BARRAGE, this.sendBarrageCallback, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_EMPERORACHIEVE_GETBONUS, this.sendBarrageCallback, this);
        var data = Api.emperorAchieveVoApi.getOutList();
        var rect = new egret.Rectangle(0, 0, 548, 685);
        var list = ComponentManager.getScrollList(EmperorOutListScrollItem, data, rect);
        list.setPosition(11 + GameData.popupviewOffsetX, 5);
        this.addChildToContainer(list);
        this._scrollList = list;
    };
    EmperorOutListPopupView.prototype.sendBarrageCallback = function () {
        var data = Api.emperorAchieveVoApi.getOutList();
        this._scrollList.refreshData(data);
    };
    EmperorOutListPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "emperorout_wishitembg1", "emperorout_wishitembg2", "emperorout_wishbtn", "emperorout_empvisitbtn"
        ]);
    };
    EmperorOutListPopupView.prototype.getTitleStr = function () {
        return "emperorOutListTitle";
    };
    EmperorOutListPopupView.prototype.getShowHeight = function () {
        return 760;
    };
    EmperorOutListPopupView.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_EMPERORACHIEVE_BARRAGE, this.sendBarrageCallback, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_EMPERORACHIEVE_GETBONUS, this.sendBarrageCallback, this);
        this._scrollList = null;
        _super.prototype.dispose.call(this);
    };
    return EmperorOutListPopupView;
}(PopupView));
__reflect(EmperorOutListPopupView.prototype, "EmperorOutListPopupView");
//# sourceMappingURL=EmperorOutListPopupView.js.map