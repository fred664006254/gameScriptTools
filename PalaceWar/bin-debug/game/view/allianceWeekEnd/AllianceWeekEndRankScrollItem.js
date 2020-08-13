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
  * 勤王除恶--rankItem
  * @author 张朝阳
  * date 2019/4/12
  * @class AllianceWeekEndRankScrollItem
  */
var AllianceWeekEndRankScrollItem = (function (_super) {
    __extends(AllianceWeekEndRankScrollItem, _super);
    function AllianceWeekEndRankScrollItem() {
        return _super.call(this) || this;
    }
    AllianceWeekEndRankScrollItem.prototype.initItem = function (index, data) {
        this.width = 530;
        this.height = 62;
        var tarColor = TextFieldConst.COLOR_BROWN;
        if (data[0] == Api.playerVoApi.getPlayerID()) {
            tarColor = TextFieldConst.COLOR_WARN_YELLOW;
        }
        if (index < 3) {
            var rankbg = BaseBitmap.create("rankbg_" + String(index + 1));
            rankbg.width = this.width;
            rankbg.height = 62;
            this.addChild(rankbg);
            var rankImg = BaseBitmap.create("rankinglist_rankn" + String(index + 1));
            rankImg.x = 70 - rankImg.width / 2;
            rankImg.y = this.height / 2 - rankImg.height / 2;
            this.addChild(rankImg);
        }
        else {
            var rankbg = BaseBitmap.create("rankbg_4");
            rankbg.width = this.width;
            rankbg.y = this.height / 2 - rankbg.height / 2;
            this.addChild(rankbg);
            var rankTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, tarColor);
            rankTxt.text = String(index + 1);
            rankTxt.x = 70 - rankTxt.width / 2;
            rankTxt.y = this.height / 2 - rankTxt.height / 2;
            this.addChild(rankTxt);
        }
        var nameTxt = ComponentManager.getTextField(data[1], TextFieldConst.FONTSIZE_CONTENT_COMMON, tarColor);
        nameTxt.x = 225 - nameTxt.width / 2;
        nameTxt.y = this.height / 2 - nameTxt.height / 2;
        this.addChild(nameTxt);
        var scoreTxt = ComponentManager.getTextField(data[2], TextFieldConst.FONTSIZE_CONTENT_COMMON, tarColor);
        scoreTxt.x = 415 - scoreTxt.width / 2;
        scoreTxt.y = this.height / 2 - scoreTxt.height / 2;
        this.addChild(scoreTxt);
    };
    AllianceWeekEndRankScrollItem.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AllianceWeekEndRankScrollItem;
}(ScrollListItem));
__reflect(AllianceWeekEndRankScrollItem.prototype, "AllianceWeekEndRankScrollItem");
//# sourceMappingURL=AllianceWeekEndRankScrollItem.js.map