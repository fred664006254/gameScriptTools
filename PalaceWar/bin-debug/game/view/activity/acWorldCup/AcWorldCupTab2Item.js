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
 * desc:区服排行榜单item
*/
var AcWorldCupTab2Item = (function (_super) {
    __extends(AcWorldCupTab2Item, _super);
    function AcWorldCupTab2Item() {
        var _this = _super.call(this) || this;
        _this._data = null;
        _this._posArr = [];
        _this._code = '';
        return _this;
    }
    Object.defineProperty(AcWorldCupTab2Item.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(AcConst.AID_ACWORLDCUP, this._code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcWorldCupTab2Item.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(AcConst.AID_ACWORLDCUP, this._code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcWorldCupTab2Item.prototype, "acTivityId", {
        get: function () {
            return AcConst.AID_ACWORLDCUP + "-" + this._code;
        },
        enumerable: true,
        configurable: true
    });
    AcWorldCupTab2Item.prototype.initItem = function (index, data, itemparam) {
        var view = this;
        view._code = itemparam;
        view._data = data;
        var info = data.info;
        view.width = 606;
        var height = Object.keys(info).length * 52 + 55;
        //view.height = 125 + 10;
        view.height = height + 50;
        var line1 = BaseBitmap.create("public_line3");
        line1.width = 480;
        view.setLayoutPosition(LayoutConst.horizontalCentertop, line1, view, [0, 10]);
        view.addChild(line1);
        var day = view.vo.judgeTime(Number(data.time) + 1);
        var timeTxt = ComponentManager.getTextField(LanguageManager.getlocal('AcWorldCupGuessInfoTime', [App.DateUtil.getFormatBySecond(data.time, 7), view.vo.getCurRatio(day).toString()]), 20, TextFieldConst.COLOR_BLACK);
        view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, timeTxt, line1);
        view.addChild(timeTxt);
        var bg = BaseBitmap.create('public_9_bg32');
        bg.width = view.width;
        bg.height = height;
        view.setLayoutPosition(LayoutConst.horizontalCentertop, bg, timeTxt, [0, timeTxt.textHeight + 5]);
        view.addChild(bg);
        var titleBg = BaseBitmap.create("public_9_bg41");
        titleBg.width = bg.width;
        titleBg.height = 30;
        view.setLayoutPosition(LayoutConst.horizontalCentertop, titleBg, bg);
        view.addChild(titleBg);
        var desc = (titleBg.width - 4 * 24 * 4) / 5;
        for (var i = 1; i < 5; ++i) {
            var guessTxtTitle = ComponentManager.getTextField(LanguageManager.getlocal("AcWorldCupGuessTitle" + i), 24, TextFieldConst.COLOR_WARN_YELLOW);
            view.setLayoutPosition(LayoutConst.leftverticalCenter, guessTxtTitle, titleBg, [desc * i + 96 * (i - 1), 0]);
            view._posArr.push(guessTxtTitle.x);
            view.addChild(guessTxtTitle);
        }
        var arr = [];
        for (var i in data.info) {
            var unit = data.info[i];
            arr.push({
                'country': i,
                'points': unit,
                'ratio': view.vo.getCurRatio(day),
                'pos_arr': view._posArr
            });
        }
        var tmpRect = new egret.Rectangle(0, 30, 606, Object.keys(info).length * 52);
        var scrollList = ComponentManager.getScrollList(AcWorldCupGuessInfoItem, arr, tmpRect, view._code);
        view.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList, titleBg, [0, titleBg.height]);
        view.addChild(scrollList);
        if (arr.length == 0) {
            scrollList.setEmptyTip(LanguageManager.getlocal("acPunishNoData"));
        }
    };
    AcWorldCupTab2Item.prototype.getSpaceY = function () {
        return 50;
    };
    AcWorldCupTab2Item.prototype.dispose = function () {
        var view = this;
        _super.prototype.dispose.call(this);
    };
    return AcWorldCupTab2Item;
}(ScrollListItem));
__reflect(AcWorldCupTab2Item.prototype, "AcWorldCupTab2Item");
//# sourceMappingURL=AcWorldCupTab2Item.js.map