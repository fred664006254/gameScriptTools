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
var WifebattleRankPopupScrollList = (function (_super) {
    __extends(WifebattleRankPopupScrollList, _super);
    function WifebattleRankPopupScrollList() {
        return _super.call(this) || this;
    }
    WifebattleRankPopupScrollList.prototype.initItem = function (index, data) {
        this.width = 510;
        this.height = 77;
        var rankTxt;
        if (index < 3) {
            var rankbg = BaseBitmap.create("rankbg_" + String(index + 1));
            rankbg.width = this.width;
            rankbg.height = this.height;
            rankbg.x = this.width / 2 - rankbg.width / 2;
            rankbg.y = this.height / 2 - rankbg.height / 2;
            this.addChild(rankbg);
            var rankImg = BaseBitmap.create("rankinglist_rankn" + String(index + 1));
            rankImg.x = 72 - rankImg.width / 2;
            rankImg.y = this.height / 2 - rankImg.height / 2;
            this.addChild(rankImg);
        }
        else {
            //  let rankImg = BaseBitmap.create("dinner_rankbg")
            // rankImg.x = 62-rankImg.width/2;
            // rankImg.y = this.height/2 - rankImg.height/2;
            // this.addChild(rankImg);
            rankTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
            rankTxt.text = String(index + 1);
            rankTxt.x = 72 - rankTxt.width / 2;
            rankTxt.y = this.height / 2 - rankTxt.height / 2;
            this.addChild(rankTxt);
        }
        var nameTxt = ComponentManager.getTextField(data.name, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        nameTxt.x = 225 - nameTxt.width / 2;
        nameTxt.y = this.height / 2 - nameTxt.height / 2;
        ;
        this.addChild(nameTxt);
        var scoreTxt = ComponentManager.getTextField(data.point, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        scoreTxt.x = 410 - scoreTxt.width / 2;
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
        var lineImg = BaseBitmap.create("public_line1");
        lineImg.width = this.width;
        lineImg.x = 0;
        lineImg.y = this.height - lineImg.height;
        this.addChild(lineImg);
    };
    WifebattleRankPopupScrollList.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return WifebattleRankPopupScrollList;
}(ScrollListItem));
__reflect(WifebattleRankPopupScrollList.prototype, "WifebattleRankPopupScrollList");
//# sourceMappingURL=WifebattleRankPopupScrollList.js.map