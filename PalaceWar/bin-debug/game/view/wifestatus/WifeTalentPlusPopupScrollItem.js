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
        this.width = 594;
        this.height = 65;
        var rankImg = BaseBitmap.create("wifetalentbg1");
        rankImg.width = this.width;
        rankImg.height = 61;
        this.addChild(rankImg);
        var rankTxt;
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
        rankTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        rankTxt.text = String(index + 1);
        rankTxt.x = 100 - rankTxt.width / 2;
        rankTxt.y = rankImg.height * rankImg.scaleY / 2 - rankTxt.height / 2;
        this.addChild(rankTxt);
        // }
        var nameTxt = ComponentManager.getTextField(data.num, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        nameTxt.x = 247 - nameTxt.width / 2;
        nameTxt.y = rankImg.height * rankImg.scaleY / 2 - nameTxt.height / 2;
        ;
        this.addChild(nameTxt);
        var scoreTxt = ComponentManager.getTextField((data.effect).toFixed(0) + "%", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        scoreTxt.x = 430 - scoreTxt.width / 2;
        scoreTxt.y = rankImg.height * rankImg.scaleY / 2 - nameTxt.height / 2;
        this.addChild(scoreTxt);
        if (data.isused) {
            scoreTxt.textColor = TextFieldConst.COLOR_WARN_GREEN2;
            var add = 0;
            if (Api.wifebattleVoApi.wifebattleVo.info && Api.wifebattleVoApi.wifebattleVo.info.tmpattr && Api.wifebattleVoApi.wifebattleVo.info.tmpattr.statusadd) {
                add = Api.wifebattleVoApi.wifebattleVo.info.tmpattr.statusadd;
            }
            if (add == data.effect) {
                rankImg.setRes("wifetalentbg2");
                var arrow = BaseBitmap.create("wifeview_artistryicon");
                arrow.x = 30;
                arrow.y = rankImg.y + rankImg.height / 2 - arrow.height / 2;
                this.addChild(arrow);
            }
        }
        // let lineImg = BaseBitmap.create("public_line1");
        // lineImg.width = this.width;
        // lineImg.x = 0;
        // lineImg.y = this.height - lineImg.height;
        // this.addChild(lineImg);
    };
    WifeTalentPlusPopupScrollItem.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return WifeTalentPlusPopupScrollItem;
}(ScrollListItem));
__reflect(WifeTalentPlusPopupScrollItem.prototype, "WifeTalentPlusPopupScrollItem");
//# sourceMappingURL=WifeTalentPlusPopupScrollItem.js.map