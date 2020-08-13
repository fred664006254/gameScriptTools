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
 * author:qianjun
 * desc:奖励弹窗
*/
var AcCrossServerServantRewardView = (function (_super) {
    __extends(AcCrossServerServantRewardView, _super);
    function AcCrossServerServantRewardView() {
        var _this = _super.call(this) || this;
        _this.public_dot1 = null;
        _this.public_dot2 = null;
        return _this;
    }
    AcCrossServerServantRewardView.prototype.getOffsetX = function () {
        return 32;
    };
    Object.defineProperty(AcCrossServerServantRewardView.prototype, "api", {
        get: function () {
            return Api.crossServerServantVoApi;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcCrossServerServantRewardView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(AcConst.AID_SERVANTPK, this.param.data.code);
        },
        enumerable: true,
        configurable: true
    });
    AcCrossServerServantRewardView.prototype.getTabbarTextArr = function () {
        return [
            "crossservantRewardTab1",
            "crossservantRewardTab2",
            "crossservantRewardTab3",
        ];
    };
    AcCrossServerServantRewardView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "atkracecross_rewatdbg1",
            "atkracecross_rewatdbg2",
            "atkracecross_rewatdbg3",
            "wifeview_bottombg",
            "crossservantawardbbg", "forpeople_bottom", "promotenamebg"
        ]);
    };
    AcCrossServerServantRewardView.prototype.initView = function () {
        var view = this;
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_SERVANTPK, view.update, view);
        //红点1
        var public_dot1 = BaseBitmap.create("public_dot2");
        public_dot1.x = this.tabbarGroup.getChildAt(0).x + this.tabbarGroup.getChildAt(0).width - 10;
        public_dot1.y = 0;
        this.tabbarGroup.addChild(public_dot1);
        this.public_dot1 = public_dot1;
        //红点2
        var public_dot2 = BaseBitmap.create("public_dot2");
        public_dot2.x = this.tabbarGroup.getChildAt(1).x + this.tabbarGroup.getChildAt(1).width - 10;
        public_dot2.y = 0;
        this.tabbarGroup.addChild(public_dot2);
        this.public_dot2 = public_dot2;
        view.update();
    };
    AcCrossServerServantRewardView.prototype.getShowHeight = function () {
        return 700;
    };
    AcCrossServerServantRewardView.prototype.update = function () {
        //第一页 红点
        var view = this;
        if (this.public_dot1) {
            this.public_dot1.visible = view.vo.getpublicRedhot1();
        }
        //第二页 红点
        if (this.public_dot2) {
            this.public_dot2.visible = view.vo.getpublicRedhot2();
        }
    };
    AcCrossServerServantRewardView.prototype.dispose = function () {
        var view = this;
        view.public_dot1 = null;
        view.public_dot2 = null;
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_SERVANTPK, view.update, view);
        _super.prototype.dispose.call(this);
    };
    return AcCrossServerServantRewardView;
}(PopupView));
__reflect(AcCrossServerServantRewardView.prototype, "AcCrossServerServantRewardView");
//# sourceMappingURL=AcCrossServerServantRewardView.js.map