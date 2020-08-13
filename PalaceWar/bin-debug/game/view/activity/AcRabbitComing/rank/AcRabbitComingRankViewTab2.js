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
var AcRabbitComingRankViewTab2 = (function (_super) {
    __extends(AcRabbitComingRankViewTab2, _super);
    function AcRabbitComingRankViewTab2(param) {
        var _this = _super.call(this) || this;
        _this.param = param;
        _this.initView();
        return _this;
    }
    Object.defineProperty(AcRabbitComingRankViewTab2.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcRabbitComingRankViewTab2.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcRabbitComingRankViewTab2.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcRabbitComingRankViewTab2.prototype, "aid", {
        get: function () {
            return "" + this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcRabbitComingRankViewTab2.prototype, "code", {
        get: function () {
            return "" + this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    AcRabbitComingRankViewTab2.prototype.initView = function () {
        var view = this;
        var rankList = [];
        var rankInfo = view.vo.getMyAlliInfo();
        for (var i in rankInfo) {
            var unit = rankInfo[i];
            rankList.push({
                id: unit.id,
                name: unit.name,
                value: unit.score || unit.value,
            });
        }
        var rect2 = egret.Rectangle.create();
        rect2.setTo(0, 0, 508, 520);
        var scrollList = ComponentManager.getScrollList(AcRabbitComingRankItem, rankList, rect2);
        scrollList.x = 21;
        scrollList.y = 90;
        view.addChild(scrollList);
        scrollList.setEmptyTip(LanguageManager.getlocal("acPunishNoData"));
    };
    AcRabbitComingRankViewTab2.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AcRabbitComingRankViewTab2;
}(CommonViewTab));
__reflect(AcRabbitComingRankViewTab2.prototype, "AcRabbitComingRankViewTab2");
//# sourceMappingURL=AcRabbitComingRankViewTab2.js.map