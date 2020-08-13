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
 * 金蛋赠礼活动详情Tab2
 * author hyd
 * date 2019/9/4
 * @class AcSmashEggDetailPopupViewTab2
 */
var AcSmashEggDetailPopupViewTab2 = (function (_super) {
    __extends(AcSmashEggDetailPopupViewTab2, _super);
    function AcSmashEggDetailPopupViewTab2() {
        var _this = _super.call(this) || this;
        _this.initView();
        return _this;
    }
    AcSmashEggDetailPopupViewTab2.prototype.initView = function () {
        this.height = 670;
        this.width = 520;
        var Bg = BaseBitmap.create("public_9_bg4");
        Bg.width = 530;
        Bg.height = 660;
        Bg.x = 25;
        Bg.y = 55;
        this.addChild(Bg);
        var dataList = this.vo.getSortEggRewardCfgList();
        var rect = new egret.Rectangle(0, 0, 520, 640);
        var scrollList = ComponentManager.getScrollList(AcSmashEggDetailPopupViewTab2ScrollItem, dataList, rect, { aid: this.aid, code: this.code });
        scrollList.setPosition(30, 70);
        this.addChild(scrollList);
    };
    Object.defineProperty(AcSmashEggDetailPopupViewTab2.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcSmashEggDetailPopupViewTab2.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    AcSmashEggDetailPopupViewTab2.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AcSmashEggDetailPopupViewTab2;
}(AcCommonViewTab));
__reflect(AcSmashEggDetailPopupViewTab2.prototype, "AcSmashEggDetailPopupViewTab2");
//# sourceMappingURL=AcSmashEggDetailPopupViewTab2.js.map