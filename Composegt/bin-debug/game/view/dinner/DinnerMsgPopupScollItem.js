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
var DinnerMsgPopupScollItem = (function (_super) {
    __extends(DinnerMsgPopupScollItem, _super);
    function DinnerMsgPopupScollItem() {
        return _super.call(this) || this;
    }
    DinnerMsgPopupScollItem.prototype.initItem = function (index, data) {
        // this.width = 516;
        // this.height = 126;
        var bg = BaseBitmap.create("public_listbg");
        bg.width = 535 - 20;
        bg.height = 126;
        this.addChild(bg);
        var rankImg = BaseBitmap.create("rankinglist_rankbg");
        rankImg.x = bg.x + 20;
        rankImg.y = 10;
        this.addChild(rankImg);
        rankImg.visible = false;
        var rankTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        rankTxt.text = String(index + 1);
        rankTxt.x = rankImg.x + (rankImg.width - rankTxt.width) / 2 + 20;
        rankTxt.y = rankImg.y + 10;
        this.addChild(rankTxt);
        var type = LanguageManager.getlocal("dinnerTitle" + data.dtype);
        var descStr = LanguageManager.getlocal("dinnerMsgDesc", [type, data.num, data.enemy_num]);
        var descTxt = ComponentManager.getTextField(descStr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        descTxt.x = rankImg.x + 60;
        descTxt.y = rankImg.y + 10;
        this.addChild(descTxt);
        var timeStr = LanguageManager.getlocal("dinnerMsgTime", [App.DateUtil.getFormatBySecond(data.start_time, 2)]);
        var timeTxt = ComponentManager.getTextField(timeStr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        // timeTxt.textColor = TextFieldConst.COLOR_QUALITY_ORANGE;
        timeTxt.x = descTxt.x;
        timeTxt.y = descTxt.y + descTxt.height + 13;
        this.addChild(timeTxt);
        var score1 = data.point;
        var score2 = data.score;
        if (score1 >= 0) {
            score1 = "+" + score1;
        }
        if (score2 >= 0) {
            score2 = "+" + score2;
        }
        var scoreStr = LanguageManager.getlocal("dinnerMsgInfo", [score1, score2]);
        var scoreTxt = ComponentManager.getTextField(scoreStr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        scoreTxt.x = descTxt.x;
        scoreTxt.textColor = TextFieldConst.COLOR_WARN_GREEN;
        scoreTxt.y = timeTxt.y + timeTxt.height + 13;
        this.addChild(scoreTxt);
    };
    DinnerMsgPopupScollItem.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return DinnerMsgPopupScollItem;
}(ScrollListItem));
__reflect(DinnerMsgPopupScollItem.prototype, "DinnerMsgPopupScollItem");
