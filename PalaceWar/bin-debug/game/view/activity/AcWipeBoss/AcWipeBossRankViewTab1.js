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
var AcWipeBossRankViewTab1 = (function (_super) {
    __extends(AcWipeBossRankViewTab1, _super);
    function AcWipeBossRankViewTab1(param) {
        var _this = _super.call(this) || this;
        _this.param = param;
        _this.initView();
        return _this;
    }
    Object.defineProperty(AcWipeBossRankViewTab1.prototype, "api", {
        get: function () {
            return Api.wipeBossVoApi;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcWipeBossRankViewTab1.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid, this.param.data.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcWipeBossRankViewTab1.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
        },
        enumerable: true,
        configurable: true
    });
    AcWipeBossRankViewTab1.prototype.getListType = function () {
        return 1;
    };
    AcWipeBossRankViewTab1.prototype.initView = function () {
        //App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_CROSSIMACY_AWARD),this.collectHandlerCallBack,this);
        var view = this;
        // let rankList = [{
        // 	uid : 1,
        // 	name : "aad",
        // 	value : 12
        // }];
        // if(this._acData.rankArr)
        // {
        //     for(let i in this._acData.rankArr){
        //         rankList.push(this._acData.rankArr[i]);
        //     }
        // }
        var rankList = [];
        if (view.api.getRankInfo().rankList.length) {
            rankList = view.api.getRankInfo().rankList;
        }
        var rect2 = egret.Rectangle.create();
        rect2.setTo(0, 0, 508, 500);
        var scrollList = ComponentManager.getScrollList(AcMayDayRankScrollItem, rankList, rect2);
        scrollList.x = 31;
        scrollList.y = 90;
        view.addChild(scrollList);
        scrollList.setEmptyTip(LanguageManager.getlocal("acPunishNoData"));
    };
    AcWipeBossRankViewTab1.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AcWipeBossRankViewTab1;
}(CommonViewTab));
__reflect(AcWipeBossRankViewTab1.prototype, "AcWipeBossRankViewTab1");
//# sourceMappingURL=AcWipeBossRankViewTab1.js.map