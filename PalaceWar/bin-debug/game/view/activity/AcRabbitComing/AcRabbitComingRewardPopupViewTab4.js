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
var AcRabbitComingRewardPopupViewTab4 = (function (_super) {
    __extends(AcRabbitComingRewardPopupViewTab4, _super);
    function AcRabbitComingRewardPopupViewTab4(data) {
        var _this = _super.call(this) || this;
        _this.param = data;
        _this.initView();
        return _this;
    }
    Object.defineProperty(AcRabbitComingRewardPopupViewTab4.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcRabbitComingRewardPopupViewTab4.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcRabbitComingRewardPopupViewTab4.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcRabbitComingRewardPopupViewTab4.prototype, "aid", {
        get: function () {
            return "" + this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcRabbitComingRewardPopupViewTab4.prototype, "code", {
        get: function () {
            return "" + this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    AcRabbitComingRewardPopupViewTab4.prototype.getUiCode = function () {
        var code = '';
        switch (Number(this.code)) {
            case 1:
            case 2:
                code = "1";
                break;
            default:
                code = this.code;
                break;
        }
        return code;
    };
    AcRabbitComingRewardPopupViewTab4.prototype.initView = function () {
        var view = this;
        view.height = 675;
        view.width = 535;
        var Bg = BaseBitmap.create("public_9_bg4");
        Bg.width = 530;
        Bg.height = 660;
        Bg.x = 25;
        Bg.y = 55;
        view.addChild(Bg);
        var code = view.getUiCode();
        var topbg = BaseBitmap.create(App.CommonUtil.getResByCode("rabitrewardtopbg", code));
        view.addChild(topbg);
        topbg.width = 532;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, topbg, Bg, [0, 3]);
        // if(this.cfg.corePrize){
        // 	let wcfg = Config.WifeskinCfg.getWifeCfgById(this.cfg.corePrize);
        // 	let wife = BaseLoadBitmap.create(wcfg.body);
        // 	wife.width = 640;
        // 	wife.height = 840;
        // 	wife.setScale(0.3);
        // 	view.addChild(wife);
        // 	App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, wife, topbg, [0,6]);
        // }
        var vo = this.vo;
        var arr = [view.cfg.poolList[1].prizePool, view.cfg.poolList[2].prizePool]; //
        var tmpRect = new egret.Rectangle(0, 0, 530, Bg.height - 10 - topbg.height);
        var scrollList = ComponentManager.getScrollList(AcRabbitComingPoolItem, arr, tmpRect, view.code);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList, topbg, [0, topbg.height + 3]);
        view.addChild(scrollList);
    };
    AcRabbitComingRewardPopupViewTab4.prototype.dispose = function () {
        var view = this;
        _super.prototype.dispose.call(this);
    };
    return AcRabbitComingRewardPopupViewTab4;
}(CommonViewTab));
__reflect(AcRabbitComingRewardPopupViewTab4.prototype, "AcRabbitComingRewardPopupViewTab4");
//# sourceMappingURL=AcRabbitComingRewardPopupViewTab4.js.map