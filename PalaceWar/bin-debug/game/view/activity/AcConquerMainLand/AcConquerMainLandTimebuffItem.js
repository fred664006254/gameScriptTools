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
 * desc:日期轮数item
*/
var AcConquerMainLandTimebuffItem = (function (_super) {
    __extends(AcConquerMainLandTimebuffItem, _super);
    function AcConquerMainLandTimebuffItem() {
        var _this = _super.call(this) || this;
        _this._code = '';
        return _this;
    }
    Object.defineProperty(AcConquerMainLandTimebuffItem.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcConquerMainLandTimebuffItem.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcConquerMainLandTimebuffItem.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcConquerMainLandTimebuffItem.prototype, "aid", {
        get: function () {
            return AcConst.AID_CONQUERMAINLAND;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcConquerMainLandTimebuffItem.prototype, "code", {
        get: function () {
            return this._code;
        },
        enumerable: true,
        configurable: true
    });
    AcConquerMainLandTimebuffItem.prototype.getUiCode = function () {
        var code = '';
        switch (Number(this.code)) {
            default:
                code = "1";
                break;
        }
        return code;
    };
    AcConquerMainLandTimebuffItem.prototype.initItem = function (index, data, itemparam) {
        // --时间与分数倍率。倍率为0的时间段为休战期
        // --startTime:开始时间
        // --endTime:结束时间
        // --buff:分数倍率：获得分数 = 位置分数 * 分数倍率
        var view = this;
        view._code = itemparam;
        view.width = 605;
        var count = 0;
        for (var i in data) {
            var unit = data[i];
            if (unit.buff == 0) {
                continue;
            }
            ++count;
        }
        view.height = 89 + 24 * (count + 1) + 15 + 10 - 24;
        var code = view.getUiCode();
        var bgres = "";
        switch (index) {
            case 0:
                bgres = "public_9_bg70";
                break;
            case 1:
                bgres = "public_9_bg14";
                break;
            case 2:
                bgres = "public_9_bg66";
                break;
        }
        var bg = BaseBitmap.create(bgres);
        bg.width = view.width;
        bg.height = view.height - 10;
        view.addChild(bg);
        var roundbg = BaseBitmap.create("public_9_managebg");
        roundbg.width = 580;
        roundbg.height = bg.height - 40;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, roundbg, bg, [0, 25]);
        view.addChild(roundbg);
        var titlebg = BaseBitmap.create("mainlanddetailtitlebg" + (index + 1) + "-" + code);
        view.addChild(titlebg);
        var titleTxt = BaseBitmap.create("mainlanddetailtitle" + (index + 1) + "-" + code);
        view.addChild(titleTxt);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, titlebg, bg, [0, 8]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, titleTxt, titlebg, [0, 2]);
        var titleroundbg = BaseBitmap.create("accrackerpopbg-1");
        titleroundbg.width = roundbg.width;
        titleroundbg.height = 35;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, titleroundbg, titlebg, [0, titlebg.height]);
        view.addChild(titleroundbg);
        var titele1Txt = ComponentManager.getTextField(LanguageManager.getlocal("acBattleRotation"), 22, TextFieldConst.COLOR_WARN_YELLOW);
        view.addChild(titele1Txt);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, titele1Txt, titleroundbg, [30, 0]);
        var titele2Txt = ComponentManager.getTextField(LanguageManager.getlocal("palace_history_title3"), 22, TextFieldConst.COLOR_WARN_YELLOW);
        view.addChild(titele2Txt);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, titele2Txt, titleroundbg, [210, 0]);
        var titele3Txt = ComponentManager.getTextField(LanguageManager.getlocal("acConquerMainLandratio-" + code), 22, TextFieldConst.COLOR_WARN_YELLOW);
        view.addChild(titele3Txt);
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, titele3Txt, titleroundbg, [45, 0]);
        var ranklist = data;
        var arr = [];
        for (var i in ranklist) {
            var unit = ranklist[i];
            if (unit.buff == 0) {
                continue;
            }
            unit.pos = [{ width: titele1Txt.textWidth, x: titele1Txt.x }, { width: titele2Txt.textWidth, x: titele2Txt.x }, { width: titele3Txt.textWidth, x: titele3Txt.x }];
            unit.day = index + 1;
            arr.push(unit);
        }
        var scroRect = new egret.Rectangle(0, 0, titleroundbg.width, arr.length * 24 + 5);
        var scrollList = ComponentManager.getScrollList(AcConquerMainLandRoundItem, arr, scroRect, view.code);
        view.addChild(scrollList);
        scrollList.setContentPosY(10);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList, titleroundbg, [0, titleroundbg.height - 3]);
    };
    AcConquerMainLandTimebuffItem.prototype.dispose = function () {
        var view = this;
        _super.prototype.dispose.call(this);
    };
    return AcConquerMainLandTimebuffItem;
}(ScrollListItem));
__reflect(AcConquerMainLandTimebuffItem.prototype, "AcConquerMainLandTimebuffItem");
//# sourceMappingURL=AcConquerMainLandTimebuffItem.js.map