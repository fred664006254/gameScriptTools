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
var AcWorldCupGuessInfoItem = (function (_super) {
    __extends(AcWorldCupGuessInfoItem, _super);
    function AcWorldCupGuessInfoItem() {
        var _this = _super.call(this) || this;
        _this._code = '';
        return _this;
    }
    Object.defineProperty(AcWorldCupGuessInfoItem.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(AcConst.AID_ACWORLDCUP, this._code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcWorldCupGuessInfoItem.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(AcConst.AID_ACWORLDCUP, this._code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcWorldCupGuessInfoItem.prototype, "acTivityId", {
        get: function () {
            return AcConst.AID_ACWORLDCUP + "-" + this._code;
        },
        enumerable: true,
        configurable: true
    });
    AcWorldCupGuessInfoItem.prototype.initItem = function (index, data, itemparam) {
        var view = this;
        view._code = itemparam;
        var info = data.info;
        view.width = 606;
        var height = 52;
        //view.height = 125 + 10;
        view.height = height;
        var pos_arr = data.pos_arr;
        var cty = LanguageManager.getlocal("AcWorldCupCountry" + data.country);
        var countryTxt = ComponentManager.getTextField(cty, 22, TextFieldConst.COLOR_BLACK);
        view.setLayoutPosition(LayoutConst.leftverticalCenter, countryTxt, view, [pos_arr[0] + (96 - countryTxt.textWidth) / 2, 0]);
        view.addChild(countryTxt);
        var icon1 = BaseBitmap.create('worldcupfootball');
        var pointsTxt = ComponentManager.getTextField((data.points * view.cfg.coinLimit).toFixed(0), 22, TextFieldConst.COLOR_BLACK);
        var desc = pos_arr[1] + (96 - pointsTxt.textWidth - icon1.width) / 2;
        view.setLayoutPosition(LayoutConst.leftverticalCenter, icon1, view, [desc, 0]);
        view.setLayoutPosition(LayoutConst.leftverticalCenter, pointsTxt, icon1, [icon1.width, 0]);
        view.addChild(icon1);
        view.addChild(pointsTxt);
        var str = '';
        var resultTxt = ComponentManager.getTextField('', 22, TextFieldConst.COLOR_BLACK);
        if (view.vo.getCurPeriod() < 3) {
            str = LanguageManager.getlocal('AcWorldCupGuessUnknow');
        }
        else {
            str = LanguageManager.getlocal(Number(data.country) == view.vo.getChampid() ? 'AcWorldCupGuessRight' : 'AcWorldCupGuessWrong');
            resultTxt.textColor = Number(data.country) == view.vo.getChampid() ? TextFieldConst.COLOR_QUALITY_GREEN : TextFieldConst.COLOR_QUALITY_RED;
        }
        resultTxt.text = str;
        view.setLayoutPosition(LayoutConst.leftverticalCenter, resultTxt, view, [pos_arr[2] + (96 - resultTxt.textWidth) / 2, 0]);
        view.addChild(resultTxt);
        var icon2 = BaseBitmap.create('worldcupfootball');
        var str2 = '';
        var getPointsTxt = ComponentManager.getTextField('', 22, TextFieldConst.COLOR_BLACK);
        if (view.vo.getCurPeriod() < 3) {
            str2 = LanguageManager.getlocal('AcWorldCupGuessUnknow');
        }
        else {
            str2 = Number(data.country) == view.vo.getChampid() ? (data.points * data.ratio * view.cfg.coinLimit).toFixed(0) : (data.points * view.cfg.ratio1 * view.cfg.coinLimit).toFixed(0);
        }
        getPointsTxt.text = str2;
        var desc2 = pos_arr[3] + (96 - getPointsTxt.textWidth - icon2.width) / 2;
        view.setLayoutPosition(LayoutConst.leftverticalCenter, icon2, view, [desc2, 0]);
        view.setLayoutPosition(LayoutConst.leftverticalCenter, getPointsTxt, icon2, [icon2.width, 0]);
        view.addChild(icon2);
        view.addChild(getPointsTxt);
        var line = BaseBitmap.create('public_line1');
        line.width = view.width;
        view.setLayoutPosition(LayoutConst.horizontalCenterbottom, line, view);
        view.addChild(line);
    };
    AcWorldCupGuessInfoItem.prototype.dispose = function () {
        var view = this;
        _super.prototype.dispose.call(this);
    };
    return AcWorldCupGuessInfoItem;
}(ScrollListItem));
__reflect(AcWorldCupGuessInfoItem.prototype, "AcWorldCupGuessInfoItem");
//# sourceMappingURL=AcWorldCupGuessInfoItem.js.map