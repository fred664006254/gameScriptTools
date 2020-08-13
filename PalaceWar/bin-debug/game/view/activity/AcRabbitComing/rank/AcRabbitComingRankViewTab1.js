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
var AcRabbitComingRankViewTab1 = (function (_super) {
    __extends(AcRabbitComingRankViewTab1, _super);
    function AcRabbitComingRankViewTab1(param) {
        var _this = _super.call(this) || this;
        _this.param = param;
        _this.initView();
        return _this;
    }
    Object.defineProperty(AcRabbitComingRankViewTab1.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcRabbitComingRankViewTab1.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcRabbitComingRankViewTab1.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcRabbitComingRankViewTab1.prototype, "aid", {
        get: function () {
            return "" + this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcRabbitComingRankViewTab1.prototype, "code", {
        get: function () {
            return "" + this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    AcRabbitComingRankViewTab1.prototype.getListType = function () {
        return 1;
    };
    AcRabbitComingRankViewTab1.prototype.initView = function () {
        var view = this;
        var rankList = view.vo.getMyPrankInfo();
        var rect2 = egret.Rectangle.create();
        rect2.setTo(0, 0, 508, 520);
        var scrollList = ComponentManager.getScrollList(AcRabbitComingRankItem, rankList, rect2);
        scrollList.x = 21;
        scrollList.y = 90;
        view.addChild(scrollList);
        scrollList.setEmptyTip(LanguageManager.getlocal("acPunishNoData"));
        var tipTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acrabbitcomingtip18", view.code), [view.cfg.pointsOwned1.toString()]), 22, TextFieldConst.COLOR_BROWN);
        App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, tipTxt, scrollList, [30, scrollList.height + 110]);
        view.addChild(tipTxt);
    };
    AcRabbitComingRankViewTab1.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AcRabbitComingRankViewTab1;
}(CommonViewTab));
__reflect(AcRabbitComingRankViewTab1.prototype, "AcRabbitComingRankViewTab1");
//# sourceMappingURL=AcRabbitComingRankViewTab1.js.map