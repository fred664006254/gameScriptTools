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
var WifeTalentPlusPopupScrollItem = (function (_super) {
    __extends(WifeTalentPlusPopupScrollItem, _super);
    function WifeTalentPlusPopupScrollItem() {
        return _super.call(this) || this;
    }
    WifeTalentPlusPopupScrollItem.prototype.initItem = function (index, data) {
        this.width = 510;
        this.height = 40;
        var rankTxt;
        if (index % 2 == 1) {
            var bg = BaseBitmap.create("public_tc_bg05");
            // bg.x = 5;
            // bg.y = 10;
            bg.width = 510;
            bg.height = 40;
            bg.x = 0;
            // bg.y = 5;ß
            this.addChild(bg);
        }
        // if (index < 3)
        // {
        //     let rankImg = BaseBitmap.create("rank_"+String(index+1))
        //     rankImg.x = 72-rankImg.width/2;
        //     rankImg.y = this.height/2 - rankImg.height/2;
        //     this.addChild(rankImg);
        // }else
        // {
        //  let rankImg = BaseBitmap.create("dinner_rankbg")
        // rankImg.x = 62-rankImg.width/2;
        // rankImg.y = this.height/2 - rankImg.height/2;
        // this.addChild(rankImg);
        rankTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN_NEW);
        rankTxt.text = String(index + 1);
        rankTxt.x = 75 - rankTxt.width / 2;
        rankTxt.y = this.height / 2 - rankTxt.height / 2;
        this.addChild(rankTxt);
        // }
        var nameTxt = ComponentManager.getTextField(data.num, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN_NEW);
        nameTxt.x = 230 - nameTxt.width / 2;
        nameTxt.y = this.height / 2 - nameTxt.height / 2;
        ;
        this.addChild(nameTxt);
        var scoreTxt = ComponentManager.getTextField(data.effect + "%", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN_NEW);
        scoreTxt.x = 404 - scoreTxt.width / 2;
        scoreTxt.y = this.height / 2 - nameTxt.height / 2;
        ;
        this.addChild(scoreTxt);
        if (data.isused) {
            rankTxt.textColor = TextFieldConst.COLOR_WARN_GREEN;
            nameTxt.textColor = TextFieldConst.COLOR_WARN_GREEN;
            scoreTxt.textColor = TextFieldConst.COLOR_WARN_GREEN;
        }
    };
    WifeTalentPlusPopupScrollItem.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return WifeTalentPlusPopupScrollItem;
}(ScrollListItem));
__reflect(WifeTalentPlusPopupScrollItem.prototype, "WifeTalentPlusPopupScrollItem");