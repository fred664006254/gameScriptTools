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
var AcThreeKingdomsBuffScrollItem = (function (_super) {
    __extends(AcThreeKingdomsBuffScrollItem, _super);
    function AcThreeKingdomsBuffScrollItem() {
        return _super.call(this) || this;
    }
    AcThreeKingdomsBuffScrollItem.prototype.initItem = function (index, data, param) {
        this.width = 510;
        this.height = 47;
        var bg = BaseBitmap.create("wifetalentlistbg1");
        bg.x = (510 - bg.width) / 2;
        this.addChild(bg);
        var rankTxt;
        rankTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        rankTxt.text = String(index + 1);
        rankTxt.x = 65 - rankTxt.width / 2;
        rankTxt.y = this.height / 2 - rankTxt.height / 2;
        this.addChild(rankTxt);
        var nameTxt = ComponentManager.getTextField(App.StringUtil.changeIntToText(data.needNum * 100000000), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        nameTxt.x = 200 - nameTxt.width / 2;
        nameTxt.y = this.height / 2 - nameTxt.height / 2;
        ;
        this.addChild(nameTxt);
        var scoreTxt = ComponentManager.getTextField(data.addAtk.toString(), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        scoreTxt.x = 404 - scoreTxt.width / 2;
        scoreTxt.y = this.height / 2 - nameTxt.height / 2;
        ;
        this.addChild(scoreTxt);
        if ((data.needNum * 100000000) <= param.num) {
            scoreTxt.textColor = TextFieldConst.COLOR_WARN_GREEN2;
        }
        if (param.curlv == (index + 1)) {
            bg.setRes("wifetalentlistbg2");
            var arrow = BaseBitmap.create("wifeview_artistryicon");
            arrow.x = 10;
            arrow.y = this.height / 2 - arrow.height / 2;
            this.addChild(arrow);
        }
        var lineImg = BaseBitmap.create("public_line1");
        lineImg.width = this.width;
        lineImg.x = 0;
        lineImg.y = this.height - lineImg.height;
        this.addChild(lineImg);
    };
    AcThreeKingdomsBuffScrollItem.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AcThreeKingdomsBuffScrollItem;
}(ScrollListItem));
__reflect(AcThreeKingdomsBuffScrollItem.prototype, "AcThreeKingdomsBuffScrollItem");
//# sourceMappingURL=AcThreeKingdomsBuffScrollItem.js.map