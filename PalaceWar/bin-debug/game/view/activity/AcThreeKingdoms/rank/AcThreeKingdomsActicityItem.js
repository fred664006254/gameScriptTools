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
 * author:qianjun
 * desc:阵营排行item
*/
var AcThreeKingdomsActicityItem = (function (_super) {
    __extends(AcThreeKingdomsActicityItem, _super);
    function AcThreeKingdomsActicityItem() {
        var _this = _super.call(this) || this;
        _this._data = null;
        _this._code = '';
        return _this;
    }
    Object.defineProperty(AcThreeKingdomsActicityItem.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcThreeKingdomsActicityItem.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcThreeKingdomsActicityItem.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcThreeKingdomsActicityItem.prototype, "aid", {
        get: function () {
            return AcConst.AID_THREEKINGDOMS;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcThreeKingdomsActicityItem.prototype, "code", {
        get: function () {
            return this._code;
        },
        enumerable: true,
        configurable: true
    });
    AcThreeKingdomsActicityItem.prototype.getUiCode = function () {
        var code = '';
        switch (Number(this.code)) {
            default:
                code = "1";
                break;
        }
        return code;
    };
    AcThreeKingdomsActicityItem.prototype.initItem = function (index, data, itemparam) {
        var view = this;
        view._code = itemparam;
        view.width = 618;
        view._data = data;
        var code = view.getUiCode();
        //	week : i, 第{1}周
        // aid活动aid
        // weekst 周一0点
        // weeket  下周一0点
        // acet活动结束时间,
        // acst活动开始时间
        //start上周日21：30
        //end本周日21：30
        //activity 活动组
        var rankTitle = BaseBitmap.create("threekingdomspranksupplybg");
        view.addChild(rankTitle);
        var roundTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acThreeKingdomsRank3Tip4", code), [data.week]), 32, TextFieldConst.COLOR_LIGHT_YELLOW);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, roundTxt, rankTitle, [16, 15]);
        view.addChild(roundTxt);
        var timeparam = App.DateUtil.getFormatBySecond(data.weekst, 15) + "-" + App.DateUtil.getFormatBySecond(data.end, 15);
        var dateTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acThreeKingdomsRank3Tip5", code), [timeparam]), 18, TextFieldConst.COLOR_LIGHT_YELLOW);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, dateTxt, roundTxt, [0, roundTxt.textHeight + 18]);
        view.addChild(dateTxt);
        var tmpRect = new egret.Rectangle(0, 0, 610, Math.max(data.activity.length * 140, 140));
        var scrollList = ComponentManager.getScrollList(AcThreeKingdomsActivityRewardItem, data.activity, tmpRect, view.code);
        scrollList.setEmptyTip(LanguageManager.getlocal("acGambleNoRewardTip-1"));
        view.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList, rankTitle, [0, rankTitle.height + 6]);
        //scrollList.setEmptyTip(LanguageManager.getlocal("acPunishNoData") );
        view.addChild(scrollList);
        view.height = tmpRect.height + scrollList.y;
    };
    AcThreeKingdomsActicityItem.prototype.dispose = function () {
        var view = this;
        //App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_ATKRACEGRANK), view.getMsgBack, view);
        _super.prototype.dispose.call(this);
    };
    return AcThreeKingdomsActicityItem;
}(ScrollListItem));
__reflect(AcThreeKingdomsActicityItem.prototype, "AcThreeKingdomsActicityItem");
//# sourceMappingURL=AcThreeKingdomsActicityItem.js.map