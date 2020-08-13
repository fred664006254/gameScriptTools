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
 * 金蛋赠礼活动详情tab3
 * author hyd
 * date 2019/9/4
 * @class AcSmashEggDetailPopupViewTab3
 */
var AcSmashEggDetailPopupViewTab3 = (function (_super) {
    __extends(AcSmashEggDetailPopupViewTab3, _super);
    function AcSmashEggDetailPopupViewTab3() {
        var _this = _super.call(this) || this;
        _this._scrollList = null;
        _this.initView();
        return _this;
    }
    Object.defineProperty(AcSmashEggDetailPopupViewTab3.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcSmashEggDetailPopupViewTab3.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcSmashEggDetailPopupViewTab3.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    AcSmashEggDetailPopupViewTab3.prototype.initView = function () {
        var view = this;
        view.height = 670;
        view.width = 520;
        var Bg = BaseBitmap.create("smashegg_logbg");
        Bg.width = 530;
        Bg.height = 660;
        Bg.x = 25;
        Bg.y = 55;
        this.addChild(Bg);
        var tmpRect = new egret.Rectangle(0, 0, 540, Bg.height - 20);
        var scrollList = ComponentManager.getScrollList(AcSmashEggDetailPopupViewTab3ScrollItem, [], tmpRect, this.code);
        scrollList.setPosition(30, 70);
        view.addChild(scrollList);
        view._scrollList = scrollList;
        view.freshRecord();
    };
    AcSmashEggDetailPopupViewTab3.prototype.freshRecord = function () {
        var view = this;
        var list = view.vo.egglog;
        if (Object.keys(view.vo.egglog).length) {
            list.sort(function (a, b) { return b[1] - a[1]; });
            view._scrollList.refreshData(view.vo.egglog, { aid: view.aid, code: view.code });
        }
        else {
            view._scrollList.setEmptyTip(LanguageManager.getlocal("acPunishNoData"));
        }
    };
    AcSmashEggDetailPopupViewTab3.prototype.dispose = function () {
        var view = this;
        view._scrollList = null;
        _super.prototype.dispose.call(this);
    };
    return AcSmashEggDetailPopupViewTab3;
}(AcCommonViewTab));
__reflect(AcSmashEggDetailPopupViewTab3.prototype, "AcSmashEggDetailPopupViewTab3");
//# sourceMappingURL=AcSmashEggDetailPopupViewTab3.js.map