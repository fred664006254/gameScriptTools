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
 * 活动
 * author qianjun
 * @class ActiveScene
 */
var ActiveScene = (function (_super) {
    __extends(ActiveScene, _super);
    function ActiveScene() {
        var _this = _super.call(this) || this;
        _this._list = null;
        return _this;
    }
    ActiveScene.prototype.dispose = function () {
        var view = this;
        view._list = null;
        App.MsgHelper.removeEvt(NetConst.FAIRARENA_START, this.fairaenaStart, this);
        _super.prototype.dispose.call(this);
        // App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_SHOP_BUY_ITEM),this.useCallback,this);
    };
    ActiveScene.prototype.init = function () {
        _super.prototype.init.call(this);
        var view = this;
        App.MsgHelper.addEvt(NetConst.FAIRARENA_START, this.fairaenaStart, this);
        view.width = GameConfig.stageWidth;
        view.height = GameConfig.stageHeigth - 310;
        // view.y = 72;
        var title = BaseBitmap.create("activetitle");
        view.addChild(title);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, title, view, [0, 87]);
        var titletxt = BaseBitmap.create("activetitle1");
        this.addChild(titletxt);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, titletxt, title, [0, 18]);
        var arr = [
            { active: "fairarena" },
            { lock: true, },
            { lock: true, },
            { lock: true, },
        ];
        var list = ComponentMgr.getScrollList(ActiveItem, arr, new egret.Rectangle(0, 0, GameConfig.stageWidth, view.height - 5));
        App.MsgHelper.addEvt(MsgConst.END_TOUCH_LIST, function (evt) {
            list && list._onTouchEnd(evt);
        }, this);
        view.addChild(list);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, list, title, [0, title.height + 15]);
        view._list = list;
    };
    ActiveScene.prototype.refreshAfterShow = function (bool) {
        if (bool === void 0) { bool = false; }
        _super.prototype.refreshAfterShow.call(this, bool);
        Api.FairArenaVoApi.sceneName = "active";
    };
    ActiveScene.prototype.getResourceList = function () {
        var array = [];
        array.concat(_super.prototype.getResourceList.call(this));
        return array.concat([
            "activescene", "btn_rule"
        ]);
    };
    ActiveScene.prototype.tick = function () {
    };
    ActiveScene.prototype.fairaenaStart = function (evt) {
        if (evt.data.ret) {
            SceneController.getInstance().go("FairarenaScene", {});
        }
    };
    ActiveScene.prototype.buyGoldBack = function (evt) {
        var view = this;
        if (evt.data.ret) {
            //弹出
            var cfgid = Api.ShopVoApi.getTouchId();
            var cfg = Config.ShopCfg.getBuyGoldCfgById(Number(cfgid));
            Api.ShopVoApi.setTouchId(0);
        }
    };
    return ActiveScene;
}(BaseScene));
__reflect(ActiveScene.prototype, "ActiveScene");
//# sourceMappingURL=ActiveScene.js.map