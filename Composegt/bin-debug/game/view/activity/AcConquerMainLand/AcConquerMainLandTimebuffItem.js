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
            case 1:
            case 2:
                code = "1";
                break;
            default:
                code = this.code;
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
        view.width = GameConfig.stageWidth;
        var count = 0;
        for (var i in data) {
            var unit = data[i];
            if (unit.buff == 0) {
                continue;
            }
            ++count;
        }
        view.height = 89 + 24 * (count + 1) + 15 + 6;
        var code = view.getUiCode();
        var titlebg = BaseBitmap.create("mainland_detailtab1_itemtitle");
        titlebg.width = 250;
        view.addChild(titlebg);
        titlebg.setPosition(this.x + this.width / 2 - titlebg.width / 2, 0);
        var titleTxt = ComponentManager.getTextField(LanguageManager.getlocal("acConquerMainDetailTab1ItemTitle" + (index + 1) + "-" + code), 22, TextFieldConst.COLOR_BROWN_NEW);
        view.addChild(titleTxt);
        titleTxt.setPosition(titlebg.x + titlebg.width / 2 - titleTxt.width / 2, titlebg.y + titlebg.height / 2 - titleTxt.height / 2);
        var roundbg = BaseBitmap.create("mainland_detailtab1_itemround");
        roundbg.width = 620;
        roundbg.height = view.height - 60;
        roundbg.setPosition(this.x + this.width / 2 - roundbg.width / 2, titlebg.y + titlebg.height + 5);
        view.addChild(roundbg);
        var titleroundbg = BaseBitmap.create("mainland_detailtab1_itemtop");
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, titleroundbg, roundbg, [0, 0]);
        view.addChild(titleroundbg);
        var titele1Txt = ComponentManager.getTextField(LanguageManager.getlocal("acBattleRotation"), 20, TextFieldConst.COLOR_BROWN_NEW);
        view.addChild(titele1Txt);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, titele1Txt, titleroundbg, [50, 0]);
        var titele2Txt = ComponentManager.getTextField(LanguageManager.getlocal("palace_history_title3"), 20, TextFieldConst.COLOR_BROWN_NEW);
        view.addChild(titele2Txt);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, titele2Txt, titleroundbg, [0, 0]);
        var titele3Txt = ComponentManager.getTextField(LanguageManager.getlocal("acConquerMainLandratio-" + code), 20, TextFieldConst.COLOR_BROWN_NEW);
        view.addChild(titele3Txt);
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, titele3Txt, titleroundbg, [30, 0]);
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
        var scroRect = new egret.Rectangle(0, 0, titleroundbg.width, arr.length * 24 + 25);
        var scrollList = ComponentManager.getScrollList(AcConquerMainLandRoundItem, arr, scroRect, view.code);
        view.addChild(scrollList);
        scrollList.setContentPosY(10);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList, titleroundbg, [0, titleroundbg.height - 3]);
        //绳子
        var shengzi1 = BaseBitmap.create("mainland_detail_shengzi");
        shengzi1.setPosition(roundbg.x - 10, roundbg.y + roundbg.height / 2 - shengzi1.height / 2);
        view.addChild(shengzi1);
        var shengzi2 = BaseBitmap.create("mainland_detail_shengzi");
        shengzi2.scaleX = -1;
        shengzi2.setPosition(roundbg.x + roundbg.width + 10, roundbg.y + roundbg.height / 2 - shengzi1.height / 2);
        view.addChild(shengzi2);
    };
    AcConquerMainLandTimebuffItem.prototype.dispose = function () {
        var view = this;
        _super.prototype.dispose.call(this);
    };
    return AcConquerMainLandTimebuffItem;
}(ScrollListItem));
__reflect(AcConquerMainLandTimebuffItem.prototype, "AcConquerMainLandTimebuffItem");
