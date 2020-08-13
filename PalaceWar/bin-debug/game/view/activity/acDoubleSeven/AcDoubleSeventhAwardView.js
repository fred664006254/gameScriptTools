/**
 * 七夕灯会奖励弹窗
 * author qianjun
 * @class AcDoubleSevenAwardView
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
var AcDoubleSeventhAwardView = (function (_super) {
    __extends(AcDoubleSeventhAwardView, _super);
    function AcDoubleSeventhAwardView() {
        var _this = _super.call(this) || this;
        _this._list = null;
        return _this;
    }
    Object.defineProperty(AcDoubleSeventhAwardView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid, this.param.data.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcDoubleSeventhAwardView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcDoubleSeventhAwardView.prototype, "acTivityId", {
        get: function () {
            var seventhview = ViewController.getInstance().getView('AcDoubleSeventhView');
            return this.param.data.aid + "-" + this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    AcDoubleSeventhAwardView.prototype.getTitleStr = function () {
        return 'emperorWarRewardViewTitle';
    };
    AcDoubleSeventhAwardView.prototype.initView = function () {
        var view = this;
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_DOUBLESEVEN_FRESH, this.fresh_jindu, this);
        view.viewBg.width = 562;
        view.viewBg.height = 782;
        view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, view.viewBg, view);
        view.setLayoutPosition(LayoutConst.horizontalCentertop, view.titleTF, view.viewBg, [0, 12]);
        var bg1 = BaseBitmap.create("public_9_bg32");
        bg1.width = 522;
        bg1.height = 690;
        view.addChild(bg1);
        view.setLayoutPosition(LayoutConst.horizontalCentertop, bg1, view.viewBg, [0, 60]);
        var scroRect = new egret.Rectangle(0, 0, 502, 680);
        var arr = [];
        for (var i = 0; i < Object.keys(view.cfg.recharge).length; ++i) {
            arr.push({
                key: i + 1
            });
        }
        arr.sort(function (a, b) {
            var isGeta = view.vo.isGetRecharge(a.key);
            var isGetb = view.vo.isGetRecharge(b.key);
            if (isGeta && !isGetb) {
                return 1;
            }
            else if (isGetb && !isGeta) {
                return -1;
            }
            else {
                return a.key - b.key;
            }
        });
        var scrollList = ComponentManager.getScrollList(AcDoubleSeventhAwardScrollItem, arr, scroRect, view.param.data.code);
        view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, scrollList, bg1);
        view.addChild(scrollList);
        view._list = scrollList;
    };
    AcDoubleSeventhAwardView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "progress5", "progress3_bg"
        ]);
    };
    AcDoubleSeventhAwardView.prototype.fresh_jindu = function () {
        var view = this;
        var arr = [];
        for (var i = 0; i < Object.keys(view.cfg.recharge).length; ++i) {
            arr.push({
                key: i + 1
            });
        }
        arr.sort(function (a, b) {
            var isGeta = view.vo.isGetRecharge(a.key);
            var isGetb = view.vo.isGetRecharge(b.key);
            if (isGeta && !isGetb) {
                return 1;
            }
            else if (isGetb && !isGeta) {
                return -1;
            }
            else {
                return a.key - b.key;
            }
        });
        view._list.refreshData(arr, view.param.data.code);
    };
    AcDoubleSeventhAwardView.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_DOUBLESEVEN_FRESH, this.fresh_jindu, this);
        this._list = null;
        _super.prototype.dispose.call(this);
    };
    return AcDoubleSeventhAwardView;
}(PopupView));
__reflect(AcDoubleSeventhAwardView.prototype, "AcDoubleSeventhAwardView");
//# sourceMappingURL=AcDoubleSeventhAwardView.js.map