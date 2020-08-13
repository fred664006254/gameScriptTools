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
 * 赌坊下注记录
 * author qianjun
 */
var AcGambleRecordPopupView = (function (_super) {
    __extends(AcGambleRecordPopupView, _super);
    // 滑动列表
    function AcGambleRecordPopupView() {
        var _this = _super.call(this) || this;
        _this._arr = [];
        return _this;
    }
    Object.defineProperty(AcGambleRecordPopupView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid, this.param.data.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcGambleRecordPopupView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
        },
        enumerable: true,
        configurable: true
    });
    AcGambleRecordPopupView.prototype.getRequestData = function () {
        var view = this;
        if (0) {
        }
        else {
            return {
                requestType: NetRequestConst.REQUST_ACTIVITY_GAMBLELOG,
                requestData: {
                    activeId: view.acTivityId
                }
            };
        }
    };
    AcGambleRecordPopupView.prototype.receiveData = function (rdata) {
        var view = this;
        var data = rdata.data.data.logValue;
        view._arr = [];
        if (data) {
            var curTime = view.vo.getCurTime();
            for (var i in data) {
                if (data[i].reward) {
                    view._arr.push(data[i]);
                }
            }
            view._arr.sort(function (a, b) {
                return b.st - a.st;
            });
        }
    };
    AcGambleRecordPopupView.prototype.initView = function () {
        var view = this;
        var code = view.param.data.code;
        var contentBg = BaseBitmap.create("public_9_bg32");
        contentBg.width = 522;
        contentBg.height = 677;
        contentBg.x = view.viewBg.x + view.viewBg.width / 2 - contentBg.width / 2;
        contentBg.y = 20;
        view.addChildToContainer(contentBg);
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, 502, contentBg.height - 20);
        var scrollList = ComponentManager.getScrollList(GambleRecordItem, view._arr, rect, code);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList, contentBg, [0, 10]);
        view.addChildToContainer(scrollList);
        scrollList.setEmptyTip(LanguageManager.getlocal("acPunishNoData"));
    };
    AcGambleRecordPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            'accarnivalview_tab_red',
        ]);
    };
    AcGambleRecordPopupView.prototype.getTitleStr = function () {
        return "acGambleRecordView-" + this.param.data.code;
    };
    AcGambleRecordPopupView.prototype.getShowHeight = function () {
        return 800 + 10;
    };
    AcGambleRecordPopupView.prototype.getShowWidth = function () {
        return 565 + GameData.popupviewOffsetX * 2;
    };
    Object.defineProperty(AcGambleRecordPopupView.prototype, "acTivityId", {
        /**
         * 获取活动配置
         */
        get: function () {
            return this.param.data.aid + "-" + this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    AcGambleRecordPopupView.prototype.dispose = function () {
        var view = this;
        view._arr = [];
        _super.prototype.dispose.call(this);
    };
    return AcGambleRecordPopupView;
}(PopupView));
__reflect(AcGambleRecordPopupView.prototype, "AcGambleRecordPopupView");
//# sourceMappingURL=AcGambleRecordPopupView.js.map