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
var LadderRankScrollItem = (function (_super) {
    __extends(LadderRankScrollItem, _super);
    function LadderRankScrollItem() {
        return _super.call(this) || this;
    }
    LadderRankScrollItem.prototype.initItem = function (index, data, itemparam) {
        this.width = GameConfig.stageWidth;
        this.height = 40;
        var tarColor = TextFieldConst.COLOR_WHITE;
        if (data.uid == Api.playerVoApi.getPlayerID()) {
            tarColor = TextFieldConst.COLOR_QUALITY_GREEN;
        }
        var rankTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, tarColor);
        rankTxt.text = String(index + 1);
        rankTxt.x = 70 - rankTxt.textWidth / 2;
        rankTxt.y = this.height / 2 - rankTxt.height / 2;
        this.addChild(rankTxt);
        var nameTxt = ComponentManager.getTextField(data.name, TextFieldConst.FONTSIZE_CONTENT_SMALL, tarColor);
        nameTxt.x = 176 - nameTxt.width / 2;
        nameTxt.y = this.height / 2 - nameTxt.height / 2;
        this.addChild(nameTxt);
        var serverTxt = ComponentManager.getTextField(data.zid, TextFieldConst.FONTSIZE_CONTENT_SMALL, tarColor);
        serverTxt.x = 438 - serverTxt.width / 2;
        serverTxt.y = nameTxt.y;
        this.addChild(serverTxt);
        var scoreTxt = ComponentManager.getTextField(data.value, TextFieldConst.FONTSIZE_CONTENT_SMALL, tarColor);
        scoreTxt.x = 538 - scoreTxt.width / 2;
        scoreTxt.y = nameTxt.y;
        this.addChild(scoreTxt);
        if (data.title && data.title.title && data.title.title != "") {
            var officerImg = App.CommonUtil.getTitlePic(data.title);
            var deltaV = 0.8;
            officerImg.setScale(deltaV);
            officerImg.x = 260;
            officerImg.y = nameTxt.y + nameTxt.height / 2 - officerImg.height * officerImg.scaleY / 2;
            this.addChild(officerImg);
        }
        else {
            var officerTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, tarColor);
            officerTxt.text = LanguageManager.getlocal("officialTitle" + data.level);
            officerTxt.x = 320 - officerTxt.width / 2;
            officerTxt.y = nameTxt.y;
            this.addChild(officerTxt);
        }
    };
    return LadderRankScrollItem;
}(ScrollListItem));
__reflect(LadderRankScrollItem.prototype, "LadderRankScrollItem");
//# sourceMappingURL=LadderRankScrollItem.js.map