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
 * 伤害item
 * author qianjun
 */
var AllianceWarDamageRankItem = (function (_super) {
    __extends(AllianceWarDamageRankItem, _super);
    function AllianceWarDamageRankItem() {
        return _super.call(this) || this;
    }
    AllianceWarDamageRankItem.prototype.initItem = function (index, data) {
        this.height = 58;
        // this.width = 508;
        this._nodeContainer = new BaseDisplayObjectContainer();
        this.addChild(this._nodeContainer);
        var startY = 16;
        if (index > 2) {
            var titleTxt1 = ComponentManager.getTextField("", 20, TextFieldConst.COLOR_WHITE);
            titleTxt1.text = String(index + 1);
            titleTxt1.x = (48 - titleTxt1.width) / 2 + 35;
            titleTxt1.y = startY;
            this._nodeContainer.addChild(titleTxt1);
            if (data.uid == Api.playerVoApi.getPlayerID()) {
                titleTxt1.textColor = TextFieldConst.COLOR_WARN_YELLOW;
            }
        }
        else {
            var rankImg = BaseLoadBitmap.create("rank_" + String(index + 1));
            rankImg.width = 51;
            rankImg.height = 47;
            rankImg.x = (48 - rankImg.width) / 2 + 35;
            rankImg.y = 3;
            this.addChild(rankImg);
        }
        var titleTxt2 = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
        titleTxt2.text = data.name;
        titleTxt2.x = (96 - titleTxt2.width) / 2 + 130;
        titleTxt2.y = startY;
        this._nodeContainer.addChild(titleTxt2);
        var titleTxt3 = ComponentManager.getTextField("", titleTxt2.size, TextFieldConst.COLOR_WHITE);
        titleTxt3.text = String(data.win);
        titleTxt3.x = (48 - titleTxt3.width) / 2 + 275;
        titleTxt3.y = startY;
        this._nodeContainer.addChild(titleTxt3);
        var titleTxt4 = ComponentManager.getTextField("", titleTxt2.size, TextFieldConst.COLOR_WHITE);
        titleTxt4.text = String(Math.floor(data.damage));
        titleTxt4.x = (48 - titleTxt4.width) / 2 + 395;
        titleTxt4.y = startY;
        this._nodeContainer.addChild(titleTxt4);
        if (data.uid == Api.playerVoApi.getPlayerID()) {
            titleTxt2.textColor = titleTxt3.textColor = titleTxt4.textColor = TextFieldConst.COLOR_WARN_YELLOW;
        }
        var lineImg = BaseLoadBitmap.create("rank_line");
        lineImg.width = 500;
        lineImg.height = 2;
        lineImg.x = 30;
        lineImg.y = 50;
        this._nodeContainer.addChild(lineImg);
    };
    AllianceWarDamageRankItem.prototype.getSpaceX = function () {
        return 0;
    };
    /**
     * 不同格子Y间距
     */
    AllianceWarDamageRankItem.prototype.getSpaceY = function () {
        return 5;
    };
    AllianceWarDamageRankItem.prototype.dispose = function () {
        this._nodeContainer = null;
        _super.prototype.dispose.call(this);
    };
    return AllianceWarDamageRankItem;
}(ScrollListItem));
__reflect(AllianceWarDamageRankItem.prototype, "AllianceWarDamageRankItem");
//# sourceMappingURL=AllianceWarDamageRankItem.js.map