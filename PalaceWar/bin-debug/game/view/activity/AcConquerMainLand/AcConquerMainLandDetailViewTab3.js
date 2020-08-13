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
//
var AcConquerMainLandDetailViewTab3 = (function (_super) {
    __extends(AcConquerMainLandDetailViewTab3, _super);
    function AcConquerMainLandDetailViewTab3(param) {
        var _this = _super.call(this) || this;
        _this.param = param;
        _this.initView();
        return _this;
    }
    Object.defineProperty(AcConquerMainLandDetailViewTab3.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcConquerMainLandDetailViewTab3.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcConquerMainLandDetailViewTab3.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcConquerMainLandDetailViewTab3.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcConquerMainLandDetailViewTab3.prototype, "acTivityId", {
        get: function () {
            return this.param.data.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcConquerMainLandDetailViewTab3.prototype, "uiCode", {
        get: function () {
            var baseview = ViewController.getInstance().getView('AcConquerMainLandDetailView');
            var code = baseview.getUiCode();
            return code;
        },
        enumerable: true,
        configurable: true
    });
    AcConquerMainLandDetailViewTab3.prototype.getListType = function () {
        return 3;
    };
    AcConquerMainLandDetailViewTab3.prototype.getTabbarTextArr = function () {
        var code = this.uiCode;
        return ["acmainlanddetailtab3tar2-" + code, "acmainlanddetailtab3tar1-" + code];
    };
    AcConquerMainLandDetailViewTab3.prototype.setTabBarPosition = function () {
        this.tabbarGroup.x = 15;
        this.tabbarGroup.y = 10;
    };
    AcConquerMainLandDetailViewTab3.prototype.getTabbarGroupY = function () {
        return this.tabbarGroup.y + this.tabbarGroup.height - this.y;
    };
    AcConquerMainLandDetailViewTab3.prototype.initView = function () {
        var view = this;
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.update, view);
        var code = view.uiCode;
        var baseview = ViewController.getInstance().getView('AcConquerMainLandDetailView');
        view.height = baseview.tabHeight - 46;
        view.width = baseview.tabWidth;
        view.initTabbarGroup();
        var tabArr = this.getTabbarTextArr();
        if (tabArr && tabArr.length > 0) {
            this.changeTab();
        }
        view.update();
    };
    AcConquerMainLandDetailViewTab3.prototype.logCallback = function (evt) {
    };
    AcConquerMainLandDetailViewTab3.prototype.update = function () {
        var view = this;
        if (view.vo.getpublicRedhot2() || view.vo.getpublicRedhot1()) {
            view.tabbarGroup.addRedPoint(0);
        }
        else {
            view.tabbarGroup.removeRedPoint(0);
        }
    };
    AcConquerMainLandDetailViewTab3.prototype.dispose = function () {
        var view = this;
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.update, view);
        _super.prototype.dispose.call(this);
    };
    return AcConquerMainLandDetailViewTab3;
}(CommonViewTab));
__reflect(AcConquerMainLandDetailViewTab3.prototype, "AcConquerMainLandDetailViewTab3");
//# sourceMappingURL=AcConquerMainLandDetailViewTab3.js.map