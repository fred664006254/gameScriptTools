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
 * 榜
 * author dky
 * date 2017/11/23
 * @class AcBattleGroundDetailsAlliScrollItem
 */
var AcBattleGroundDetailsTimeScrollItem = (function (_super) {
    __extends(AcBattleGroundDetailsTimeScrollItem, _super);
    function AcBattleGroundDetailsTimeScrollItem() {
        return _super.call(this) || this;
    }
    Object.defineProperty(AcBattleGroundDetailsTimeScrollItem.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this._aid, this._code);
        },
        enumerable: true,
        configurable: true
    });
    AcBattleGroundDetailsTimeScrollItem.prototype.initItem = function (index, data, itemParam) {
        if (itemParam) {
            this._aid = itemParam.aid;
            this._code = itemParam.code;
        }
        this.height = 40;
        this.width = 620;
        this._nodeContainer = new BaseDisplayObjectContainer();
        this.addChild(this._nodeContainer);
        var startY = 16;
        // "battleground_curtime",   acBattleGroundDetailsViewCurT  
        // "battleground_timeover"   acRank_acCDEnd2
        var curRound = itemParam.curRound;
        if (curRound == index + 1) {
            //进行中
            var mark = BaseBitmap.create("battleground_curtime");
            mark.x = 10;
            mark.y = startY + 10 - mark.height / 2;
            this._nodeContainer.addChild(mark);
            var markText = ComponentManager.getTextField(LanguageManager.getlocal("acBattleGroundDetailsViewCurT"), 14, TextFieldConst.COLOR_LIGHT_YELLOW);
            markText.x = mark.x + 5;
            markText.y = mark.y + mark.height / 2 - markText.height / 2;
            this._nodeContainer.addChild(markText);
        }
        else if (curRound > index) {
            //已结束
            var mark = BaseBitmap.create("battleground_timeover");
            mark.x = 10;
            mark.y = startY + 10 - mark.height / 2;
            this._nodeContainer.addChild(mark);
            var markText = ComponentManager.getTextField(LanguageManager.getlocal("acRank_acCDEnd2"), 14, TextFieldConst.COLOR_LIGHT_YELLOW);
            markText.x = mark.x + 5;
            markText.y = mark.y + mark.height / 2 - markText.height / 2;
            this._nodeContainer.addChild(markText);
        }
        if (index % 2 == 1) {
            var bg = BaseBitmap.create("public_tc_bg05");
            bg.width = 510;
            bg.height = 40;
            bg.x = 0;
            bg.y = 5;
            this._nodeContainer.addChild(bg);
        }
        var titleTxt1 = ComponentManager.getTextField("", 20, TextFieldConst.COLOR_BROWN);
        titleTxt1.text = String(index + 1);
        titleTxt1.x = 130 - titleTxt1.width / 2 - 10;
        titleTxt1.y = startY;
        this._indexText = titleTxt1;
        this._nodeContainer.addChild(titleTxt1);
        var outTime = data.time + this.vo.versionst;
        var outTimeTxt = App.DateUtil.getFormatBySecond(outTime, 10);
        var titleTxt2 = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        titleTxt2.text = outTimeTxt;
        titleTxt2.x = 320 - titleTxt2.width / 2 - 10;
        titleTxt2.y = startY;
        this._nodeContainer.addChild(titleTxt2);
        var titleTxt3 = ComponentManager.getTextField("", titleTxt2.size, TextFieldConst.COLOR_BROWN);
        titleTxt3.text = LanguageManager.getlocal("acBattleGroundDetailsViewOutText", [data.btmLine]);
        titleTxt3.x = 510 - titleTxt3.width / 2 - 10;
        titleTxt3.y = startY;
        this._nodeContainer.addChild(titleTxt3);
    };
    AcBattleGroundDetailsTimeScrollItem.prototype.getSpaceX = function () {
        return 0;
    };
    /**
     * 不同格子Y间距
     */
    AcBattleGroundDetailsTimeScrollItem.prototype.getSpaceY = function () {
        return 5;
    };
    AcBattleGroundDetailsTimeScrollItem.prototype.dispose = function () {
        this._nodeContainer = null;
        this._aid = null;
        this._code = null;
        this._indexText = null;
        _super.prototype.dispose.call(this);
    };
    return AcBattleGroundDetailsTimeScrollItem;
}(ScrollListItem));
__reflect(AcBattleGroundDetailsTimeScrollItem.prototype, "AcBattleGroundDetailsTimeScrollItem");
