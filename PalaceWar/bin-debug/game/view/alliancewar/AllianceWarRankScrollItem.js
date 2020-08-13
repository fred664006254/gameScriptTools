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
 * 帮会争霸 排行榜Item
 * author 张朝阳
 * date 2018/10/13
 * @class AllianceWarRankScrollItem
 */
var AllianceWarRankScrollItem = (function (_super) {
    __extends(AllianceWarRankScrollItem, _super);
    function AllianceWarRankScrollItem() {
        return _super.call(this) || this;
    }
    AllianceWarRankScrollItem.prototype.initItem = function (index, data) {
        this.width = 520;
        var offestX = 0;
        var offestY = 0;
        if (index <= 2) {
            var rankBM = BaseLoadBitmap.create("rank_" + String(index + 1));
            rankBM.width = 42;
            rankBM.height = 41;
            rankBM.x = this.x + 62 - rankBM.width / 2;
            this.addChild(rankBM);
            offestX = rankBM.width / 2;
            offestY = rankBM.height / 2;
        }
        else {
            var rankBg = BaseBitmap.create("rankinglist_rankbg");
            rankBg.x = this.x + 62 - rankBg.width / 2;
            this.addChild(rankBg);
            var rankTF = ComponentManager.getTextField(String(index + 1), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
            rankTF.setPosition(rankBg.x + rankBg.width / 2 - rankTF.width / 2, rankBg.y + rankBg.height / 2 - rankTF.height / 2);
            this.addChild(rankTF);
            offestX = rankBg.width / 2;
            offestY = rankBg.height / 2;
            if (Api.playerVoApi.getPlayerAllianceId() == data.id) {
                rankTF.setColor(TextFieldConst.COLOR_WARN_YELLOW);
            }
        }
        //帮派名字
        var rankAllianceName = ComponentManager.getTextField(data.name, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
        rankAllianceName.setPosition(this.x + 62 + 120 - rankAllianceName.width / 2, offestY - rankAllianceName.height / 2);
        this.addChild(rankAllianceName);
        //区服
        var rankServer = ComponentManager.getTextField(LanguageManager.getlocal("ranserver2", [data.zid]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
        rankServer.setPosition(rankAllianceName.x + rankAllianceName.width / 2 + 123 - rankServer.width / 2, rankAllianceName.y + rankAllianceName.height / 2 - rankServer.height / 2);
        this.addChild(rankServer);
        //分数
        var rankScore = ComponentManager.getTextField(data.score, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
        rankScore.setPosition(rankServer.x + rankServer.width / 2 + 123 - rankScore.width / 2, rankServer.y + rankServer.height / 2 - rankScore.height / 2);
        this.addChild(rankScore);
        //文本线
        var lineSp = BaseBitmap.create("public_line1");
        lineSp.setPosition(this.x + this.width / 2 - lineSp.width / 2, rankScore.y + rankScore.height + 15);
        this.addChild(lineSp);
        if (Api.playerVoApi.getPlayerAllianceId() == data.id) {
            rankAllianceName.setColor(TextFieldConst.COLOR_WARN_YELLOW);
            rankServer.setColor(TextFieldConst.COLOR_WARN_YELLOW);
            rankScore.setColor(TextFieldConst.COLOR_WARN_YELLOW);
        }
    };
    AllianceWarRankScrollItem.prototype.getSpaceY = function () {
        return 10;
    };
    AllianceWarRankScrollItem.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AllianceWarRankScrollItem;
}(ScrollListItem));
__reflect(AllianceWarRankScrollItem.prototype, "AllianceWarRankScrollItem");
//# sourceMappingURL=AllianceWarRankScrollItem.js.map