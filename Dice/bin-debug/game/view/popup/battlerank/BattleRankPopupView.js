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
 * 对战排位
 * author qianjun
 *
 */
var BattleRankPopupView = (function (_super) {
    __extends(BattleRankPopupView, _super);
    function BattleRankPopupView() {
        var _this = _super.call(this) || this;
        _this._arr = [];
        return _this;
    }
    BattleRankPopupView.prototype.getResourceList = function () {
        var array = [];
        array.concat(_super.prototype.getResourceList.call(this));
        var param = this.param.data;
        return array.concat([
            "battlelogview", "public_rank1", "public_rank2", "public_rank3", "public_rankbg",
        ]);
    };
    Object.defineProperty(BattleRankPopupView.prototype, "isWave", {
        get: function () {
            var param = this.param.data;
            return param == "pve";
        },
        enumerable: true,
        configurable: true
    });
    BattleRankPopupView.prototype.isTouchMaskClose = function () {
        return false;
    };
    BattleRankPopupView.prototype.getTitleStr = function () {
        return LangMger.getlocal(this.isWave ? "menu_operation_rank" : "menu_fight_rank");
    };
    BattleRankPopupView.prototype.closeHandler = function () {
        _super.prototype.closeHandler.call(this);
    };
    BattleRankPopupView.prototype.getShowHeight = function () {
        return 860;
    };
    BattleRankPopupView.prototype.getRequestData = function () {
        return {
            requestType: this.isWave ? NetConst.BATTLE_GETPVERANK : NetConst.BATTLE_GETPVPRANK,
            requestData: {}
        };
    };
    BattleRankPopupView.prototype.netEventCallBack = function (evt) {
        var data = evt.data;
        if (data && data.ret) {
            var rdata = data.data.data;
            switch (data.data.cmd) {
                case NetConst.BATTLE_GETPVERANK:
                    this._arr = rdata.pveRank;
                    break;
                case NetConst.BATTLE_GETPVPRANK:
                    this._arr = rdata.pvpRank;
                    break;
                default:
                    break;
            }
        }
    };
    // 打开该面板时，需要传参数msg
    BattleRankPopupView.prototype.initView = function () {
        var view = this;
        var listBg = BaseBitmap.create("ab_bird_infoattrbg");
        this.addChildToContainer(listBg);
        listBg.width = 498;
        listBg.height = 760;
        listBg.x = (this.getShowWidth() - listBg.width) / 2;
        listBg.y = 0;
        var arr = view._arr;
        var list = ComponentMgr.getScrollList(BattleRankInfoItem, arr, new egret.Rectangle(0, 0, 498, 750), view.isWave);
        view.addChildToContainer(list);
        list.x = (this.getShowWidth() - list.width) / 2;
        list.y = 0;
        list.setEmptyTip(LangMger.getlocal("ranktip1"));
        list.bounces = false;
    };
    // 背景图名称
    BattleRankPopupView.prototype.getBgName = function () {
        return "ab_task_view_bg";
    };
    BattleRankPopupView.prototype.resetBgSize = function () {
        var view = this;
        view.viewBg.width = this.getShowWidth();
        view.viewBg.height = this.getShowHeight();
        _super.prototype.resetBgSize.call(this);
    };
    BattleRankPopupView.prototype.hide = function () {
        _super.prototype.hide.call(this);
    };
    BattleRankPopupView.prototype.dispose = function () {
        var view = this;
        view._arr = [];
        _super.prototype.dispose.call(this);
    };
    return BattleRankPopupView;
}(PopupView));
__reflect(BattleRankPopupView.prototype, "BattleRankPopupView");
//# sourceMappingURL=BattleRankPopupView.js.map