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
 * author : qianjun
 * date : 2018.4.14
 * desc : 转盘活动 累计充值itemrender
 */
var GambleRecordItem = (function (_super) {
    __extends(GambleRecordItem, _super);
    function GambleRecordItem() {
        var _this = _super.call(this) || this;
        _this._code = '';
        return _this;
    }
    Object.defineProperty(GambleRecordItem.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(AcConst.AID_ACMAYDAY, this._code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GambleRecordItem.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(AcConst.AID_GAMBLE, this._code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GambleRecordItem.prototype, "acTivityId", {
        get: function () {
            return AcConst.AID_ACMAYDAY + "-" + this._code;
        },
        enumerable: true,
        configurable: true
    });
    GambleRecordItem.prototype.initItem = function (index, data, itemParam) {
        var view = this;
        view._code = itemParam;
        view.width = 502;
        view.height = 156 + view.getSpaceY();
        //背景图片
        var bg = BaseBitmap.create("public_9_bg14");
        bg.width = 502;
        bg.height = 156;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, bg, view);
        view.addChild(bg);
        var tagRedRes = "accarnivalview_tab_red";
        if (PlatformManager.checkIsEnLang()) {
            tagRedRes = "common_titlebg";
        }
        var tagRed = BaseBitmap.create(tagRedRes);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, tagRed, bg, [0, 10]);
        view.addChild(tagRed);
        var titleTxt = ComponentManager.getTextField(LanguageManager.getlocal("acGambleRecordTitle-" + view._code, [data.gambNum, data.gemNum]), 22, TextFieldConst.COLOR_LIGHT_YELLOW);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, titleTxt, tagRed, [15, 0]);
        view.addChild(titleTxt);
        tagRed.width = titleTxt.width + 45;
        var timeTxt = ComponentManager.getTextField(App.DateUtil.getFormatBySecond(data.st, 10), 22, TextFieldConst.COLOR_WARN_GREEN2);
        App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, timeTxt, bg, [20, 28]);
        view.addChild(timeTxt);
        var line = BaseBitmap.create("public_line1");
        line.width = view.width = 502;
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, line, tagRed, [0, tagRed.height + 7]);
        view.addChild(line);
        var getTxt = ComponentManager.getTextField(LanguageManager.getlocal("acGambleRecord3-" + view._code, [data.reward.split('_')[2]]), 20, TextFieldConst.COLOR_BLACK);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, getTxt, line, [245, 37]);
        view.addChild(getTxt);
        //let dis = (92 - (data.ret.length - 1) * 6 - data.ret.length * 20) / (data.ret.length + 1);
        for (var i = 0; i < 3; ++i) {
            var str = 'acGambleRecord0';
            if (data.ret[i]) {
                str = "acGambleRecord" + data.ret[i];
            }
            var resultTxt = ComponentManager.getTextField(LanguageManager.getlocal(str + "-" + view._code, [(Number(i) + 1).toString()]), 20, TextFieldConst.COLOR_BLACK);
            App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, resultTxt, line, [30, 6 + (Number(i) * 26)]);
            view.addChild(resultTxt);
            if (i == data.ret.length - 1) {
                getTxt.y = resultTxt.y;
            }
        }
        // for(let i in data.ret){
        //     let unit = data.ret[i];
        //     let resultTxt = ComponentManager.getTextField(LanguageManager.getlocal(`acGambleRecord${unit}-${view._code}`, [(Number(i) + 1).toString()]), 20, TextFieldConst.COLOR_BLACK);
        //     App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, resultTxt, line, [30, dis + (Number(i) * 26)]);
        //     view.addChild(resultTxt);
        // }
    };
    /**
     * 不同格子Y间距
     */
    GambleRecordItem.prototype.getSpaceY = function () {
        return 5;
    };
    GambleRecordItem.prototype.dispose = function () {
        // this._lastReqIdx = null;
        _super.prototype.dispose.call(this);
    };
    return GambleRecordItem;
}(ScrollListItem));
__reflect(GambleRecordItem.prototype, "GambleRecordItem");
//# sourceMappingURL=GambleRecordItem.js.map