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
 * 门客皮肤
 * author qianjun
 * date 2018/08/13
 * @class SkinView
 */
var SkinViewTab1 = (function (_super) {
    __extends(SkinViewTab1, _super);
    function SkinViewTab1() {
        var _this = _super.call(this) || this;
        _this.initView();
        return _this;
    }
    SkinViewTab1.prototype.initView = function () {
        // ViewController.getInstance().openView(ViewConst.COMMON.SKINLEVELUPVIEW,{skinId:"1011"});
        var view = this;
        var skinView = ViewController.getInstance().getView("SkinView");
        view.width = GameConfig.stageWidth;
        view.height = skinView.getTabViewHeight();
        var rectH1 = view.height - 10;
        var rect = new egret.Rectangle(0, 0, GameConfig.stageWidth, rectH1);
        view._scrollList = ComponentManager.getScrollList(SkinScrollItem, [], rect);
        view._scrollList.y = 0;
        view.addChild(this._scrollList);
        view.refreshRankList();
    };
    SkinViewTab1.prototype.refreshRankList = function () {
        var list = Config.ServantskinCfg.getServantSkinList();
        for (var key in list) {
            if (list.hasOwnProperty(key)) {
                list[key]["uiType"] = 0;
            }
        }
        this._scrollList.refreshData(list);
    };
    SkinViewTab1.prototype.dispose = function () {
        this._scrollList = null;
        _super.prototype.dispose.call(this);
    };
    return SkinViewTab1;
}(CommonViewTab));
__reflect(SkinViewTab1.prototype, "SkinViewTab1");
//# sourceMappingURL=SkinViewTab1.js.map