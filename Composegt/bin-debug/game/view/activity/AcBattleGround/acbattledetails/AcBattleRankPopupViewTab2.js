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
var AcBattleRankPopupViewTab2 = (function (_super) {
    __extends(AcBattleRankPopupViewTab2, _super);
    function AcBattleRankPopupViewTab2(param) {
        var _this = _super.call(this) || this;
        _this.param = param;
        _this.initView();
        return _this;
    }
    Object.defineProperty(AcBattleRankPopupViewTab2.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
        },
        enumerable: true,
        configurable: true
    });
    AcBattleRankPopupViewTab2.prototype.getListType = function () {
        return 1;
    };
    AcBattleRankPopupViewTab2.prototype.initView = function () {
        //App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_CROSSIMACY_AWARD),this.collectHandlerCallBack,this);
        var view = this;
        var rankList = this.vo.getAlliRankList();
        var rect2 = egret.Rectangle.create();
        rect2.setTo(0, 0, 508, 485);
        var scrollList = ComponentManager.getScrollList(AcBattleRankPopupViewScrollItem2, rankList, rect2);
        scrollList.x = 41;
        scrollList.y = 110;
        view.addChild(scrollList);
        scrollList.setEmptyTip(LanguageManager.getlocal("acPunishNoData"), TextFieldConst.COLOR_BROWN);
    };
    AcBattleRankPopupViewTab2.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AcBattleRankPopupViewTab2;
}(CommonViewTab));
__reflect(AcBattleRankPopupViewTab2.prototype, "AcBattleRankPopupViewTab2");
