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
 * qianjun
 */
var AcRabbitComingRankItem = (function (_super) {
    __extends(AcRabbitComingRankItem, _super);
    function AcRabbitComingRankItem() {
        return _super.call(this) || this;
    }
    AcRabbitComingRankItem.prototype.initItem = function (index, data) {
        this.width = 508;
        this.height = 58;
        this._nodeContainer = new BaseDisplayObjectContainer();
        this.addChild(this._nodeContainer);
        var startY = 16;
        if (index > 2) {
            var titleTxt1 = ComponentManager.getTextField("", 20, TextFieldConst.COLOR_BROWN);
            titleTxt1.text = String(index + 1);
            titleTxt1.x = 90 - titleTxt1.width / 2 - 30;
            titleTxt1.y = startY;
            this._nodeContainer.addChild(titleTxt1);
            if (data.uid == Api.playerVoApi.getPlayerID()) {
                titleTxt1.textColor = TextFieldConst.COLOR_WARN_YELLOW;
            }
        }
        else {
            // let rankImg = BaseLoadBitmap.create("rank_"+String(index+1));
            // rankImg.width = 51;
            // rankImg.height = 47;
            // rankImg.x = 90 - rankImg.width/2 - 30;
            // rankImg.y = 3 ;
            // this.addChild(rankImg);
            var rankbg = BaseBitmap.create("rankbg_" + String(index + 1));
            rankbg.width = this.width;
            rankbg.height = this.height;
            rankbg.x = this.width / 2 - rankbg.width / 2;
            rankbg.y = this.height / 2 - rankbg.height / 2;
            this._nodeContainer.addChild(rankbg);
            var rankImg = BaseBitmap.create("rankinglist_rankn" + String(index + 1));
            rankImg.x = 70 - rankImg.width / 2;
            rankImg.y = this.height / 2 - rankImg.height / 2;
            this._nodeContainer.addChild(rankImg);
        }
        var titleTxt2 = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        if (data.eflag && data.eflag == true) {
            titleTxt2.text = LanguageManager.getlocal("acRankList_allianceQuit", [data.name]);
        }
        else {
            titleTxt2.text = data.name;
        }
        titleTxt2.x = 245 - titleTxt2.width / 2 - 17;
        titleTxt2.y = startY;
        this._nodeContainer.addChild(titleTxt2);
        var titleTxt3 = ComponentManager.getTextField("", titleTxt2.size, TextFieldConst.COLOR_BROWN);
        var score = 0;
        if (data.score || data.value) {
            score = data.score || data.value;
        }
        titleTxt3.text = String(score);
        titleTxt3.x = 460 - titleTxt3.width / 2 - 30 + 5;
        titleTxt3.y = startY;
        this._nodeContainer.addChild(titleTxt3);
        if (data.zid) {
            var zid = ComponentManager.getTextField(Api.mergeServerVoApi.getAfterMergeSeverName(null, true, data.zid), titleTxt2.size, TextFieldConst.COLOR_BROWN);
            zid.x = 345 - zid.width / 2 - 30;
            zid.y = startY;
            this._nodeContainer.addChild(zid);
            zid.textColor = (data.uid == Api.playerVoApi.getPlayerID() || data.id == Api.playerVoApi.getPlayerAllianceId()) ? TextFieldConst.COLOR_WARN_YELLOW : TextFieldConst.COLOR_BROWN;
        }
        if (data.uid == Api.playerVoApi.getPlayerID() || data.id == Api.playerVoApi.getPlayerAllianceId()) {
            titleTxt2.textColor = titleTxt3.textColor = TextFieldConst.COLOR_WARN_YELLOW;
        }
        var lineImg = BaseLoadBitmap.create("rank_line");
        lineImg.width = 500;
        lineImg.height = 2;
        lineImg.x = 30;
        lineImg.y = 50;
        this._nodeContainer.addChild(lineImg);
    };
    AcRabbitComingRankItem.prototype.getSpaceX = function () {
        return 0;
    };
    /**
     * 不同格子Y间距
     */
    AcRabbitComingRankItem.prototype.getSpaceY = function () {
        return 5;
    };
    AcRabbitComingRankItem.prototype.dispose = function () {
        this._nodeContainer = null;
        _super.prototype.dispose.call(this);
    };
    return AcRabbitComingRankItem;
}(ScrollListItem));
__reflect(AcRabbitComingRankItem.prototype, "AcRabbitComingRankItem");
//# sourceMappingURL=AcRabbitComingRankItem.js.map