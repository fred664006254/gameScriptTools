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
 * 战斗记录
 * author qianjun
 *
 */
var BattleLogPopupView = (function (_super) {
    __extends(BattleLogPopupView, _super);
    function BattleLogPopupView() {
        var _this = _super.call(this) || this;
        _this._list = null;
        return _this;
    }
    BattleLogPopupView.prototype.getNetConstEventArr = function () {
        return [
            NetConst.BATTLE_COMPLAIN
        ];
    };
    BattleLogPopupView.prototype.getResourceList = function () {
        var array = [];
        array.concat(_super.prototype.getResourceList.call(this));
        var param = this.param.data;
        //type 1对战 2协同
        var type = param.type;
        return array.concat([
            "battlelogview", "joinwarinputbg",
        ]);
    };
    BattleLogPopupView.prototype.isTouchMaskClose = function () {
        return false;
    };
    BattleLogPopupView.prototype.getTitleStr = function () {
        var param = this.param.data;
        //type 1对战 2协同
        var type = param.type;
        return LangMger.getlocal("menu_fight_history");
    };
    BattleLogPopupView.prototype.closeHandler = function () {
        _super.prototype.closeHandler.call(this);
    };
    // 背景图名称
    BattleLogPopupView.prototype.getBgName = function () {
        return "ab_task_view_bg";
    };
    BattleLogPopupView.prototype.getShowHeight = function () {
        return 841;
    };
    BattleLogPopupView.prototype.getRequestData = function () {
        return {
            requestType: NetConst.BATTLE_GETLOG,
            requestData: {}
        };
    };
    BattleLogPopupView.prototype.netEventCallBack = function (evt) {
        var data = evt.data;
        var view = this;
        if (data && data.ret) {
            switch (data.data.cmd) {
                case NetConst.BATTLE_GETLOG:
                    break;
                case NetConst.BATTLE_COMPLAIN:
                    view.upgardeBack(evt);
                    break;
                default:
                    break;
            }
        }
    };
    // 打开该面板时，需要传参数msg
    BattleLogPopupView.prototype.initView = function () {
        var view = this;
        var arr = Api.BattlelogVoApi.getbattleLog();
        var list = ComponentMgr.getScrollList(BattleLogItem, arr, new egret.Rectangle(0, 0, 520, 740));
        view.addChildToContainer(list);
        list.x = (this.getShowWidth() - list.width) / 2;
        list.y = 0;
        list.setEmptyTip(LangMger.getlocal("battlelogtip3"));
        list.bounces = false;
        view._list = list;
    };
    BattleLogPopupView.prototype.upgardeBack = function (evt) {
        var view = this;
        if (evt.data.ret) {
            ViewController.getInstance().openView(ViewConst.CONFIRMPOPUPVIEW, {
                title: LangMger.getlocal("sysTip"),
                msg: LangMger.getlocal("battlelogtip2"),
                needCancel: false,
                needClose: 1,
            });
            var idx = Api.BattlelogVoApi.getlastidx();
            var item = view._list.getItemByIndex(idx);
            item.freshInfo();
        }
    };
    BattleLogPopupView.prototype.resetBgSize = function () {
        var view = this;
        view.viewBg.width = this.getShowWidth();
        view.viewBg.height = this.getShowHeight();
        _super.prototype.resetBgSize.call(this);
    };
    BattleLogPopupView.prototype.hide = function () {
        _super.prototype.hide.call(this);
    };
    BattleLogPopupView.prototype.dispose = function () {
        var view = this;
        view._list = null;
        _super.prototype.dispose.call(this);
    };
    return BattleLogPopupView;
}(PopupView));
__reflect(BattleLogPopupView.prototype, "BattleLogPopupView");
//# sourceMappingURL=BattleLogPopupView.js.map