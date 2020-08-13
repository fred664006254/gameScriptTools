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
var WifeTalentBuffScrollItem = (function (_super) {
    __extends(WifeTalentBuffScrollItem, _super);
    function WifeTalentBuffScrollItem() {
        return _super.call(this) || this;
    }
    WifeTalentBuffScrollItem.prototype.initItem = function (index, data, param) {
        this.width = 510;
        this.height = 40;
        var rankTxt;
        if (index % 2 == 1) {
            var bg = BaseBitmap.create("public_tc_bg05");
            bg.width = 510;
            bg.height = 40;
            bg.x = 0;
            this.addChild(bg);
        }
        rankTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN_NEW);
        rankTxt.text = String(index + 1);
        rankTxt.x = 65 - rankTxt.width / 2;
        rankTxt.y = this.height / 2 - rankTxt.height / 2;
        this.addChild(rankTxt);
        var nameTxt = ComponentManager.getTextField(data.artistryRange[0] + "", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN_NEW);
        nameTxt.x = 200 - nameTxt.width / 2;
        nameTxt.y = this.height / 2 - nameTxt.height / 2;
        ;
        this.addChild(nameTxt);
        var scoreTxt = ComponentManager.getTextField(data.rankBuff, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN_NEW);
        scoreTxt.x = 404 - scoreTxt.width / 2;
        scoreTxt.y = this.height / 2 - nameTxt.height / 2;
        ;
        this.addChild(scoreTxt);
        if (data.artistryRange[0] <= param) {
            rankTxt.textColor = TextFieldConst.COLOR_WARN_GREEN;
            nameTxt.textColor = TextFieldConst.COLOR_WARN_GREEN;
            scoreTxt.textColor = TextFieldConst.COLOR_WARN_GREEN;
        }
    };
    WifeTalentBuffScrollItem.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return WifeTalentBuffScrollItem;
}(ScrollListItem));
__reflect(WifeTalentBuffScrollItem.prototype, "WifeTalentBuffScrollItem");
