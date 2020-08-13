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
var DinnerRankItem = (function (_super) {
    __extends(DinnerRankItem, _super);
    function DinnerRankItem() {
        return _super.call(this) || this;
    }
    DinnerRankItem.prototype.initItem = function (index, data) {
        this.width = 502;
        this.height = 52;
        var rankTxt;
        if (index < 3) {
            var rankImg = BaseBitmap.create("dinner_rank" + String(index + 1));
            rankImg.x = 62 - rankImg.width / 2;
            rankImg.y = this.height / 2 - rankImg.height / 2;
            this.addChild(rankImg);
        }
        else {
            var rankImg = BaseBitmap.create("dinner_rankbg");
            rankImg.x = 62 - rankImg.width / 2;
            rankImg.y = this.height / 2 - rankImg.height / 2;
            this.addChild(rankImg);
            rankTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON);
            rankTxt.text = String(index + 1);
            rankTxt.x = 62 - rankTxt.width / 2;
            rankTxt.y = this.height / 2 - rankTxt.height / 2;
            this.addChild(rankTxt);
        }
        var nameTxt = ComponentManager.getTextField(data.name, TextFieldConst.FONTSIZE_CONTENT_COMMON);
        nameTxt.x = 220 - nameTxt.width / 2;
        nameTxt.y = this.height / 2 - nameTxt.height / 2;
        ;
        this.addChild(nameTxt);
        var scoreTxt = ComponentManager.getTextField(data.total_point, TextFieldConst.FONTSIZE_CONTENT_COMMON);
        scoreTxt.x = 404 - scoreTxt.width / 2;
        scoreTxt.y = this.height / 2 - nameTxt.height / 2;
        ;
        this.addChild(scoreTxt);
        if (data.uid == Api.playerVoApi.getPlayerID()) {
            if (rankTxt) {
                rankTxt.textColor = TextFieldConst.COLOR_WARN_YELLOW;
            }
            nameTxt.textColor = TextFieldConst.COLOR_WARN_YELLOW;
            scoreTxt.textColor = TextFieldConst.COLOR_WARN_YELLOW;
        }
        var lineImg = BaseBitmap.create("dinner_line");
        lineImg.x = 520 / 2 - lineImg.width / 2;
        lineImg.y = this.height;
        this.addChild(lineImg);
    };
    DinnerRankItem.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return DinnerRankItem;
}(ScrollListItem));
__reflect(DinnerRankItem.prototype, "DinnerRankItem");
//# sourceMappingURL=DinnerRankItem.js.map