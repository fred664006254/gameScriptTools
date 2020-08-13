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
var AcCrossServerWifeBattleRankPopupViewTab1 = (function (_super) {
    __extends(AcCrossServerWifeBattleRankPopupViewTab1, _super);
    function AcCrossServerWifeBattleRankPopupViewTab1(param) {
        var _this = _super.call(this) || this;
        _this.param = param;
        _this.initView();
        return _this;
    }
    Object.defineProperty(AcCrossServerWifeBattleRankPopupViewTab1.prototype, "cfg", {
        // private get api() : CrossServerWipeBossVoApi{
        //     return Api.crossServerWipeBossVoApi;
        // }
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid, this.param.data.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcCrossServerWifeBattleRankPopupViewTab1.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
        },
        enumerable: true,
        configurable: true
    });
    AcCrossServerWifeBattleRankPopupViewTab1.prototype.getListType = function () {
        return 1;
    };
    AcCrossServerWifeBattleRankPopupViewTab1.prototype.initView = function () {
        //App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_CROSSIMACY_AWARD),this.collectHandlerCallBack,this);
        var view = this;
        var rankList = [];
        // if(view.api.getRankInfo().rankList.length){
        // 	rankList = view.api.getRankInfo().rankList;
        // }
        rankList = this.vo.rankData.zidrankarr;
        var rect2 = egret.Rectangle.create();
        rect2.setTo(0, 0, 508, 485);
        var scrollList = ComponentManager.getScrollList(AcCrossServerWifeBattleRankScrollItem1, rankList, rect2, { aid: this.param.data.aid, code: this.param.data.code });
        scrollList.x = 41;
        scrollList.y = 110;
        view.addChild(scrollList);
        scrollList.setEmptyTip(LanguageManager.getlocal("acPunishNoData"), TextFieldConst.COLOR_BROWN);
    };
    AcCrossServerWifeBattleRankPopupViewTab1.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AcCrossServerWifeBattleRankPopupViewTab1;
}(CommonViewTab));
__reflect(AcCrossServerWifeBattleRankPopupViewTab1.prototype, "AcCrossServerWifeBattleRankPopupViewTab1");
