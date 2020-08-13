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
 * @class AcCrossServerWipeBossRankScrollItem2
 */
var AcCrossServerWipeBossRankScrollItem2 = (function (_super) {
    __extends(AcCrossServerWipeBossRankScrollItem2, _super);
    function AcCrossServerWipeBossRankScrollItem2() {
        return _super.call(this) || this;
    }
    AcCrossServerWipeBossRankScrollItem2.prototype.initItem = function (index, data) {
        this.height = 40;
        this.width = 510;
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
            titleTxt1.x = 90 - titleTxt1.width / 2 - 13;
            titleTxt1.y = startY;
            this._nodeContainer.addChild(titleTxt1);
            // if(data.uid == Api.playerVoApi.getPlayerID()){
            //     titleTxt1.textColor = TextFieldConst.COLOR_WARN_GREEN;
            // }
        }
        else {
            var rankImg = BaseLoadBitmap.create("rank_" + String(index + 1));
            rankImg.width = 49;
            rankImg.height = 39;
            rankImg.x = 90 - rankImg.width / 2 - 13;
            rankImg.y = 9;
            this.addChild(rankImg);
        }
        var server = "";
        if (data[1] > 0) {
            // server = LanguageManager.getlocal("mergeServer",[String(data[1]),String(data[0])]);
            server = LanguageManager.getlocal("mergeServerOnlyqu", [String(data[1])]);
        }
        else {
            // "ranserver2":"{1}服",
            server = LanguageManager.getlocal("ranserver2", [String(data[0])]);
        }
        var titleTxt2 = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        titleTxt2.text = server;
        titleTxt2.x = 290 - titleTxt2.width / 2 - 30;
        titleTxt2.y = startY;
        this._nodeContainer.addChild(titleTxt2);
        var titleTxt3 = ComponentManager.getTextField("", titleTxt2.size, TextFieldConst.COLOR_BROWN);
        titleTxt3.text = String(data[2]);
        titleTxt3.x = 480 - titleTxt3.width / 2 - 20;
        titleTxt3.y = startY;
        this._nodeContainer.addChild(titleTxt3);
        // Api.mergeServerVoApi.getTrueZid()
        var zid = Api.mergeServerVoApi.getTrueZid();
        var qu = Api.mergeServerVoApi.getQuByZid(zid);
        if (data[0] == zid && data[1] == qu) {
            titleTxt2.textColor = TextFieldConst.COLOR_WARN_GREEN;
            titleTxt3.textColor = TextFieldConst.COLOR_WARN_GREEN;
        }
        // if(data.uid == Api.playerVoApi.getPlayerID() || data.id == Api.playerVoApi.getPlayerAllianceId()){
        //     titleTxt2.textColor = TextFieldConst.COLOR_WARN_GREEN;
        //     titleTxt3.textColor = TextFieldConst.COLOR_WARN_GREEN;
        //  }
    };
    AcCrossServerWipeBossRankScrollItem2.prototype.getSpaceX = function () {
        return 0;
    };
    /**
     * 不同格子Y间距
     */
    AcCrossServerWipeBossRankScrollItem2.prototype.getSpaceY = function () {
        return 5;
    };
    AcCrossServerWipeBossRankScrollItem2.prototype.dispose = function () {
        this._nodeContainer = null;
        _super.prototype.dispose.call(this);
    };
    return AcCrossServerWipeBossRankScrollItem2;
}(ScrollListItem));
__reflect(AcCrossServerWipeBossRankScrollItem2.prototype, "AcCrossServerWipeBossRankScrollItem2");
