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
var AcWorldCupGuessRatioItem = (function (_super) {
    __extends(AcWorldCupGuessRatioItem, _super);
    function AcWorldCupGuessRatioItem() {
        var _this = _super.call(this) || this;
        _this._code = '';
        return _this;
    }
    Object.defineProperty(AcWorldCupGuessRatioItem.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(AcConst.AID_ACWORLDCUP, this._code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcWorldCupGuessRatioItem.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(AcConst.AID_ACWORLDCUP, this._code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcWorldCupGuessRatioItem.prototype, "acTivityId", {
        get: function () {
            return AcConst.AID_ACWORLDCUP + "-" + this._code;
        },
        enumerable: true,
        configurable: true
    });
    AcWorldCupGuessRatioItem.prototype.initItem = function (index, data, itemparam) {
        var view = this;
        view._code = itemparam;
        var info = data.info;
        view.width = 430;
        var height = 54;
        //view.height = 125 + 10;
        view.height = height;
        var pos_arr = data.pos_arr;
        var cty = App.DateUtil.getFormatBySecond(view.vo.st + (data.day - 1) * 86400, 6);
        var dateTxt = ComponentManager.getTextField(cty, 22, TextFieldConst.COLOR_QUALITY_WHITE);
        view.setLayoutPosition(LayoutConst.leftverticalCenter, dateTxt, view, [pos_arr[0] + (48 - dateTxt.textWidth - 205) / 2, 0]);
        view.addChild(dateTxt);
        var ratioTxt = ComponentManager.getTextField(data.ratio, 22, TextFieldConst.COLOR_QUALITY_WHITE);
        view.setLayoutPosition(LayoutConst.leftverticalCenter, ratioTxt, view, [pos_arr[1] + (48 - ratioTxt.textWidth - 205) / 2, 0]);
        view.addChild(ratioTxt);
        var line = BaseBitmap.create('public_line1');
        line.width = view.width;
        view.setLayoutPosition(LayoutConst.horizontalCenterbottom, line, view);
        view.addChild(line);
        if (data.day == view.vo.getCurDay()) {
            dateTxt.textColor = TextFieldConst.COLOR_QUALITY_GREEN;
            ratioTxt.textColor = TextFieldConst.COLOR_QUALITY_GREEN;
        }
    };
    AcWorldCupGuessRatioItem.prototype.dispose = function () {
        var view = this;
        _super.prototype.dispose.call(this);
    };
    return AcWorldCupGuessRatioItem;
}(ScrollListItem));
__reflect(AcWorldCupGuessRatioItem.prototype, "AcWorldCupGuessRatioItem");
//# sourceMappingURL=AcWorldCupGuessRatioItem.js.map