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
var AcEnjoyNightRewardView = (function (_super) {
    __extends(AcEnjoyNightRewardView, _super);
    function AcEnjoyNightRewardView() {
        return _super.call(this) || this;
    }
    AcEnjoyNightRewardView.prototype.getTitleStr = function () {
        return "acLaborDayPopupViewTitle-1";
    };
    AcEnjoyNightRewardView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "accarnivalview_tab_red",
            "progress5", "progress3_bg",
            "servant_bottombg",
            "arena_bottom",
        ]);
    };
    Object.defineProperty(AcEnjoyNightRewardView.prototype, "vo", {
        get: function () {
            var springCelebrateVo = Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
            return springCelebrateVo;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcEnjoyNightRewardView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid, this.param.data.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcEnjoyNightRewardView.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcEnjoyNightRewardView.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    AcEnjoyNightRewardView.prototype.getTabbarTextArr = function () {
        return ["acRechargeViewTitle",
            "acMaChaoViewTab2-1",
        ];
    };
    AcEnjoyNightRewardView.prototype.initView = function () {
        var view = this;
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.freshView, view);
        var bottomBg = BaseBitmap.create("servant_bottombg");
        bottomBg.width = GameConfig.stageWidth;
        bottomBg.height = GameConfig.stageHeigth - this.container.y + 69;
        bottomBg.x = 0;
        bottomBg.y = -68;
        this.addChildToContainer(bottomBg);
        this.freshView();
    };
    AcEnjoyNightRewardView.prototype.freshView = function () {
        var view = this;
        if (view.vo.checkRechargeRedDot()) {
            view.tabbarGroup.addRedPoint(0);
        }
        else {
            view.tabbarGroup.removeRedPoint(0);
        }
        if (view.vo.checkTaskRedDot()) {
            view.tabbarGroup.addRedPoint(1);
        }
        else {
            view.tabbarGroup.removeRedPoint(1);
        }
    };
    AcEnjoyNightRewardView.prototype.dispose = function () {
        var view = this;
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.freshView, view);
        _super.prototype.dispose.call(this);
    };
    return AcEnjoyNightRewardView;
}(CommonView));
__reflect(AcEnjoyNightRewardView.prototype, "AcEnjoyNightRewardView");
//# sourceMappingURL=AcEnjoyNightRewardView.js.map