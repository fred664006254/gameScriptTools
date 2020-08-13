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
 * 奖池奖励
 * date 2020.4.24
 * @class AcWeaponMazeDetailPopupViewTab3
 */
var AcWeaponMazeDetailPopupViewTab3 = (function (_super) {
    __extends(AcWeaponMazeDetailPopupViewTab3, _super);
    function AcWeaponMazeDetailPopupViewTab3(data) {
        var _this = _super.call(this) || this;
        _this.param = data;
        _this.initView();
        return _this;
    }
    Object.defineProperty(AcWeaponMazeDetailPopupViewTab3.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcWeaponMazeDetailPopupViewTab3.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcWeaponMazeDetailPopupViewTab3.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcWeaponMazeDetailPopupViewTab3.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    AcWeaponMazeDetailPopupViewTab3.prototype.getTypeCode = function () {
        if (this.code == "2") {
            return "1";
        }
        return this.code;
    };
    AcWeaponMazeDetailPopupViewTab3.prototype.initView = function () {
        var view = this;
        var bg = BaseBitmap.create("public_9_bg4");
        bg.width = 530;
        bg.height = 695;
        bg.x = 26;
        bg.y = 53;
        view.addChild(bg);
        var topbg = BaseBitmap.create(App.CommonUtil.getResByCode("acweaponmaze_poolbg", this.getTypeCode()));
        view.addChild(topbg);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, topbg, bg, [0, 3]);
        var dataList = this.cfg.getPoolRewards();
        var rect = new egret.Rectangle(0, 0, 530, 680 - topbg.height + 5);
        var scrollList = ComponentManager.getScrollList(AcWeaponMazeDetailPopupScrollItem3, dataList, rect, { aid: this.aid, code: this.code });
        scrollList.setPosition(bg.x, topbg.y + topbg.height);
        this.addChild(scrollList);
    };
    AcWeaponMazeDetailPopupViewTab3.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AcWeaponMazeDetailPopupViewTab3;
}(CommonViewTab));
__reflect(AcWeaponMazeDetailPopupViewTab3.prototype, "AcWeaponMazeDetailPopupViewTab3");
//# sourceMappingURL=AcWeaponMazeDetailPopupViewTab3.js.map