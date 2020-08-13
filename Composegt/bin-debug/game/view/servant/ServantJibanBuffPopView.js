/**
 * 门客羁绊buff详情
 */
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
var ServantJibanBuffPopView = (function (_super) {
    __extends(ServantJibanBuffPopView, _super);
    function ServantJibanBuffPopView() {
        var _this = _super.call(this) || this;
        _this._list = null;
        return _this;
    }
    ServantJibanBuffPopView.prototype.initView = function () {
        // public_tcdw_bg01
        var view = this;
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_SERVANT_ACTIVECOMB, view.callBack, view);
        var servantId = this.param.data.sid;
        var num = Config.ServentcombinationCfg.getCombineNums(servantId);
        var arr = [];
        for (var i = 1; i <= num; ++i) {
            arr.push(i);
        }
        var list = ComponentManager.getScrollList(ServantJibanBuffItem, arr, new egret.Rectangle(0, 0, 526, 690), servantId);
        this.addChildToContainer(list);
        list.x = 53;
        list.y = 26;
        view._list = list;
    };
    ServantJibanBuffPopView.prototype.callBack = function (evt) {
        var view = this;
        if (evt.data.ret) {
            var servantId = this.param.data.sid;
            var num = Config.ServentcombinationCfg.getCombineNums(servantId);
            var arr = [];
            for (var i = 1; i <= num; ++i) {
                arr.push(i);
            }
            view._list.refreshData(arr, servantId);
        }
    };
    ServantJibanBuffPopView.prototype.getShowHeight = function () {
        return 820;
    };
    ServantJibanBuffPopView.prototype.dispose = function () {
        var view = this;
        view._list = null;
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_SERVANT_ACTIVECOMB, view.callBack, view);
        _super.prototype.dispose.call(this);
    };
    return ServantJibanBuffPopView;
}(PopupView));
__reflect(ServantJibanBuffPopView.prototype, "ServantJibanBuffPopView");
