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
var AcJarukaiTaskView = (function (_super) {
    __extends(AcJarukaiTaskView, _super);
    function AcJarukaiTaskView() {
        return _super.call(this) || this;
    }
    Object.defineProperty(AcJarukaiTaskView.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcJarukaiTaskView.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcJarukaiTaskView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcJarukaiTaskView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    AcJarukaiTaskView.prototype.getUiCode = function () {
        return this.code;
    };
    AcJarukaiTaskView.prototype.resetBgSize = function () {
        _super.prototype.resetBgSize.call(this);
        var view = this;
        var uicode = view.getUiCode();
        var bg = BaseBitmap.create("commonview_woodbg");
        bg.width = 553;
        bg.height = this.viewBg.height - 91;
        bg.x = (this.viewBg.width - bg.width) * 0.5 + 4;
        bg.y = this.viewBg.y + 61;
        this.addChildAt(bg, this.getChildIndex(this.viewBg) + 1);
        var list = ComponentManager.getScrollList(AcRechargeItem, [], new egret.Rectangle(0, 0, 522, 640));
        view.addChildToContainer(list);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, list, view.container, [0, 30], true);
    };
    AcJarukaiTaskView.prototype.getBgExtraHeight = function () {
        return 60;
    };
    AcJarukaiTaskView.prototype.initView = function () {
    };
    // protected isHaveTitle():boolean{
    //     return true;
    // }
    AcJarukaiTaskView.prototype.initPartReward = function (resultStr, must) {
        // public_listbg3
        // shopview_redbg
    };
    AcJarukaiTaskView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "commonview_woodbg", "shopview_redbg"
        ]);
    };
    AcJarukaiTaskView.prototype.getShowHeight = function () {
        return 900;
    };
    AcJarukaiTaskView.prototype.getTitleStr = function () {
        return App.CommonUtil.getCnByCode("acJarukaiTask", this.getUiCode());
    };
    AcJarukaiTaskView.prototype.dispose = function () {
        var view = this;
        _super.prototype.dispose.call(this);
    };
    return AcJarukaiTaskView;
}(PopupView));
__reflect(AcJarukaiTaskView.prototype, "AcJarukaiTaskView");
