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
        //文本线
        if (index % 2 == 1) {
            var lineBg = BaseBitmap.create("public_tc_bg05");
            lineBg.width = this.width;
            lineBg.height = 40;
            this.addChild(lineBg);
        }
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
            // let rankBg = BaseBitmap.create("rankinglist_rankbg");
            // rankBg.x = this.x + 62 - rankBg.width / 2;
            // this.addChild(rankBg);
            var rankTF = ComponentManager.getTextField(String(index + 1), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
            rankTF.setPosition(this.x + 62 - rankTF.width / 2, 20 - rankTF.height / 2);
            this.addChild(rankTF);
            // offestX = rankBg.width / 2;
            offestY = 20;
            if (Api.playerVoApi.getPlayerAllianceId() == data.id) {
                rankTF.setColor(TextFieldConst.COLOR_WARN_GREEN);
            }
        }
        //帮派名字
        var rankAllianceName = ComponentManager.getTextField(data.name, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        rankAllianceName.setPosition(this.x + 195 - rankAllianceName.width / 2, offestY - rankAllianceName.height / 2);
        this.addChild(rankAllianceName);
        //区服
        var rankServer = ComponentManager.getTextField(Api.mergeServerVoApi.getAfterMergeSeverName(null, true, data.zid), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        rankServer.setPosition(rankAllianceName.x + rankAllianceName.width / 2 + 123 - rankServer.width / 2, rankAllianceName.y + rankAllianceName.height / 2 - rankServer.height / 2);
        this.addChild(rankServer);
        //分数
        var rankScore = ComponentManager.getTextField(data.score, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        rankScore.setPosition(rankServer.x + rankServer.width / 2 + 123 - rankScore.width / 2, rankServer.y + rankServer.height / 2 - rankScore.height / 2);
        this.addChild(rankScore);
        if (Api.playerVoApi.getPlayerAllianceId() == data.id) {
            rankAllianceName.setColor(TextFieldConst.COLOR_WARN_GREEN);
            rankServer.setColor(TextFieldConst.COLOR_WARN_GREEN);
            rankScore.setColor(TextFieldConst.COLOR_WARN_GREEN);
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
