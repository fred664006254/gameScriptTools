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
var AcCrossServerWipeBossRankViewTab2 = (function (_super) {
    __extends(AcCrossServerWipeBossRankViewTab2, _super);
    function AcCrossServerWipeBossRankViewTab2(param) {
        var _this = _super.call(this) || this;
        _this.param = param;
        _this.initView();
        return _this;
    }
    Object.defineProperty(AcCrossServerWipeBossRankViewTab2.prototype, "api", {
        get: function () {
            return Api.crossServerWipeBossVoApi;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcCrossServerWipeBossRankViewTab2.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid, this.param.data.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcCrossServerWipeBossRankViewTab2.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
        },
        enumerable: true,
        configurable: true
    });
    AcCrossServerWipeBossRankViewTab2.prototype.getListType = function () {
        return 2;
    };
    AcCrossServerWipeBossRankViewTab2.prototype.initView = function () {
        //App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_CROSSIMACY_AWARD),this.collectHandlerCallBack,this);
        var view = this;
        // let rankList = [{
        // 	uid : 1,
        // 	name : "aad",
        // 	value : 12
        // }];
        var rankList = [];
        if (view.api.getRankInfo().serverrankList.length) {
            rankList = view.api.getRankInfo().serverrankList;
        }
        var rect2 = egret.Rectangle.create();
        rect2.setTo(0, 0, 508, 485);
        var scrollList = ComponentManager.getScrollList(AcCrossServerWipeBossRankScrollItem2, rankList, rect2);
        scrollList.x = 41;
        scrollList.y = 110;
        view.addChild(scrollList);
        scrollList.setEmptyTip(LanguageManager.getlocal("acPunishNoData"), TextFieldConst.COLOR_BROWN);
    };
    AcCrossServerWipeBossRankViewTab2.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AcCrossServerWipeBossRankViewTab2;
}(CommonViewTab));
__reflect(AcCrossServerWipeBossRankViewTab2.prototype, "AcCrossServerWipeBossRankViewTab2");
