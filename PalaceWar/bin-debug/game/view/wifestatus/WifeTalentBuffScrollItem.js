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
        var nameTxt = ComponentManager.getTextField(data.artistryRange[0] + "", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        nameTxt.x = 200 - nameTxt.width / 2;
        nameTxt.y = this.height / 2 - nameTxt.height / 2;
        ;
        this.addChild(nameTxt);
        var scoreTxt = ComponentManager.getTextField(data.rankBuff, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        scoreTxt.x = 404 - scoreTxt.width / 2;
        scoreTxt.y = this.height / 2 - nameTxt.height / 2;
        ;
        this.addChild(scoreTxt);
        if (data.artistryRange[0] <= param) {
            scoreTxt.textColor = TextFieldConst.COLOR_WARN_GREEN2;
        }
        var rcfg = Config.WifebattleCfg;
        var wifeBattleBuff = rcfg.wifeBattleBuff;
        var curlv = 1;
        var maxV = 0;
        var model = Api.wifebattleVoApi.wifebattleVo;
        var plusv = model.info.totaltactadd ? model.info.totaltactadd : 0;
        var rankBuff = 0;
        var artsum = model.info.artsum ? model.info.artsum : 0;
        for (var index_1 = 0; index_1 < wifeBattleBuff.length; index_1++) {
            var element = wifeBattleBuff[index_1];
            var artistryRange = element.artistryRange;
            if (artistryRange[0] <= artsum && artsum <= artistryRange[1]) {
                rankBuff = element.rankBuff;
                maxV = artistryRange[1];
                break;
            }
            ++curlv;
        }
        if (curlv == (index + 1)) {
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
    WifeTalentBuffScrollItem.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return WifeTalentBuffScrollItem;
}(ScrollListItem));
__reflect(WifeTalentBuffScrollItem.prototype, "WifeTalentBuffScrollItem");
//# sourceMappingURL=WifeTalentBuffScrollItem.js.map