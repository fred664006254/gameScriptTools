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
var AcTombRankViewTab3 = (function (_super) {
    __extends(AcTombRankViewTab3, _super);
    function AcTombRankViewTab3(param) {
        var _this = _super.call(this) || this;
        _this.param = param;
        _this.initView();
        return _this;
    }
    Object.defineProperty(AcTombRankViewTab3.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcTombRankViewTab3.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcTombRankViewTab3.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcTombRankViewTab3.prototype, "aid", {
        get: function () {
            return "" + this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcTombRankViewTab3.prototype, "code", {
        get: function () {
            return "" + this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    AcTombRankViewTab3.prototype.getListType = function () {
        return 3;
    };
    AcTombRankViewTab3.prototype.initView = function () {
        //App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_CROSSIMACY_AWARD),this.collectHandlerCallBack,this);
        var view = this;
        // let rankList = [{
        // 	uid : 1,
        // 	name : "aad",
        // 	score : 12,
        // 	zid : 1,
        // }];
        var rankList = [];
        var allimem = view.vo.getAlliMemInfo();
        if (allimem.length) {
            rankList = allimem;
        }
        var rect2 = egret.Rectangle.create();
        rect2.setTo(0, 0, 508, 500);
        var scrollList = ComponentManager.getScrollList(AcTombRankScrollItem, rankList, rect2);
        scrollList.x = 21;
        scrollList.y = 90;
        view.addChild(scrollList);
        scrollList.setEmptyTip(LanguageManager.getlocal("acPunishNoData"));
    };
    AcTombRankViewTab3.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AcTombRankViewTab3;
}(CommonViewTab));
__reflect(AcTombRankViewTab3.prototype, "AcTombRankViewTab3");
//# sourceMappingURL=AcTombRankViewTab3.js.map