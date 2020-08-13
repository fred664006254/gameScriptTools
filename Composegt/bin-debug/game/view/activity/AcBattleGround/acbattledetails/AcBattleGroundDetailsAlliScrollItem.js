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
var AcBattleGroundDetailsAlliScrollItem = (function (_super) {
    __extends(AcBattleGroundDetailsAlliScrollItem, _super);
    function AcBattleGroundDetailsAlliScrollItem() {
        return _super.call(this) || this;
    }
    Object.defineProperty(AcBattleGroundDetailsAlliScrollItem.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this._aid, this._code);
        },
        enumerable: true,
        configurable: true
    });
    AcBattleGroundDetailsAlliScrollItem.prototype.initItem = function (index, data, itemParam) {
        if (itemParam) {
            this._aid = itemParam.aid;
            this._code = itemParam.code;
        }
        this.height = 40;
        this.width = 620;
        this._nodeContainer = new BaseDisplayObjectContainer();
        this.addChild(this._nodeContainer);
        var startY = 16;
        if (index % 2 == 1) {
            var bg = BaseBitmap.create("public_tc_bg05");
            bg.width = 510;
            bg.height = 40;
            bg.x = 0;
            bg.y = 5;
            this._nodeContainer.addChild(bg);
        }
        if (index > 2) {
            var titleTxt1 = ComponentManager.getTextField("", 20, TextFieldConst.COLOR_BROWN);
            titleTxt1.text = String(index + 1);
            titleTxt1.x = 80 - titleTxt1.width / 2 - 10;
            titleTxt1.y = startY;
            this._indexText = titleTxt1;
            this._nodeContainer.addChild(titleTxt1);
            if (data.uid == Api.playerVoApi.getPlayerID()) {
                titleTxt1.textColor = TextFieldConst.COLOR_WARN_GREEN;
            }
        }
        else {
            var rankImg = BaseLoadBitmap.create("rank_" + String(index + 1));
            rankImg.width = 49;
            rankImg.height = 39;
            rankImg.x = 80 - rankImg.width / 2 - 10;
            rankImg.y = 9;
            this.addChild(rankImg);
        }
        //80 200 380 530
        var titleTxt2 = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        titleTxt2.text = data.name;
        titleTxt2.x = 200 - titleTxt2.width / 2 - 10;
        titleTxt2.y = startY;
        this._nodeContainer.addChild(titleTxt2);
        var titleTxt3 = ComponentManager.getTextField("", titleTxt2.size, TextFieldConst.COLOR_BROWN);
        titleTxt3.text = LanguageManager.getlocal("allianceMemberPo" + data.po);
        titleTxt3.x = 380 - titleTxt3.width / 2 - 10;
        titleTxt3.y = startY;
        this._nodeContainer.addChild(titleTxt3);
        var titleTxt4 = ComponentManager.getTextField("", titleTxt2.size, TextFieldConst.COLOR_BROWN);
        titleTxt4.text = data.value;
        titleTxt4.x = 530 - titleTxt4.width / 2 - 10;
        titleTxt4.y = startY;
        this._nodeContainer.addChild(titleTxt4);
        if ((!Boolean(data.alive)) || data.alive <= 0) {
            if (this._indexText) {
                this._indexText.textColor = TextFieldConst.COLOR_QUALITY_GRAY;
            }
            titleTxt2.textColor = TextFieldConst.COLOR_QUALITY_GRAY;
            titleTxt3.textColor = TextFieldConst.COLOR_QUALITY_GRAY;
            titleTxt4.textColor = TextFieldConst.COLOR_QUALITY_GRAY;
            titleTxt4.text = LanguageManager.getlocal("acBattleRankPopupOut");
            titleTxt4.x = 530 - titleTxt4.width / 2 - 10;
        }
        else {
            if (Number(data.value) < this.vo.curOutScore) {
                if (this._indexText) {
                    this._indexText.textColor = TextFieldConst.COLOR_WARN_RED;
                }
                titleTxt2.textColor = TextFieldConst.COLOR_WARN_RED;
                titleTxt3.textColor = TextFieldConst.COLOR_WARN_RED;
                titleTxt4.textColor = TextFieldConst.COLOR_WARN_RED;
            }
        }
    };
    AcBattleGroundDetailsAlliScrollItem.prototype.getSpaceX = function () {
        return 0;
    };
    /**
     * 不同格子Y间距
     */
    AcBattleGroundDetailsAlliScrollItem.prototype.getSpaceY = function () {
        return 5;
    };
    AcBattleGroundDetailsAlliScrollItem.prototype.dispose = function () {
        this._nodeContainer = null;
        this._aid = null;
        this._code = null;
        this._indexText = null;
        _super.prototype.dispose.call(this);
    };
    return AcBattleGroundDetailsAlliScrollItem;
}(ScrollListItem));
__reflect(AcBattleGroundDetailsAlliScrollItem.prototype, "AcBattleGroundDetailsAlliScrollItem");
