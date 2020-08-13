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
var AcLocTombRankViewTab1 = (function (_super) {
    __extends(AcLocTombRankViewTab1, _super);
    function AcLocTombRankViewTab1(param) {
        var _this = _super.call(this) || this;
        _this.param = param;
        _this.initView();
        return _this;
    }
    Object.defineProperty(AcLocTombRankViewTab1.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcLocTombRankViewTab1.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcLocTombRankViewTab1.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcLocTombRankViewTab1.prototype, "aid", {
        get: function () {
            return "" + this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcLocTombRankViewTab1.prototype, "code", {
        get: function () {
            return "" + this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    AcLocTombRankViewTab1.prototype.getListType = function () {
        return 1;
    };
    AcLocTombRankViewTab1.prototype.initView = function () {
        var view = this;
        var rankList = [];
        var rankInfo = view.vo.getRankInfo();
        if (rankInfo.rankList && rankInfo.rankList.length) {
            rankList = rankInfo.rankList;
        }
        var rect2 = egret.Rectangle.create();
        rect2.setTo(0, 0, 508, 500);
        var scrollList = ComponentManager.getScrollList(AcLocTombRankScrollItem, rankList, rect2);
        scrollList.x = 21;
        scrollList.y = 90;
        view.addChild(scrollList);
        scrollList.setEmptyTip(LanguageManager.getlocal("acPunishNoData"));
    };
    AcLocTombRankViewTab1.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AcLocTombRankViewTab1;
}(CommonViewTab));
__reflect(AcLocTombRankViewTab1.prototype, "AcLocTombRankViewTab1");
//# sourceMappingURL=AcLocTombRankViewTab1.js.map