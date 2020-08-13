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
var AtkraceRankItem = (function (_super) {
    __extends(AtkraceRankItem, _super);
    function AtkraceRankItem() {
        return _super.call(this) || this;
    }
    AtkraceRankItem.prototype.initItem = function (index, data) {
        this.width = 530;
        this.height = 50;
        // if(index % 2 == 1){
        //     let bg = BaseBitmap.create("public_tc_bg05");
        //     bg.width = 510;
        //     bg.height = 40;
        //     bg.x = 0;  
        //     bg.y = this.height / 2 - bg.height/2;
        //     this.addChild(bg);
        // }
        if (index > 0) {
            var line = BaseBitmap.create("public_line4");
            line.width = 500;
            line.x = this.width / 2 - line.width / 2;
            line.y = -line.height / 2;
            this.addChild(line);
        }
        var tarColor = TextFieldConst.COLOR_BROWN_NEW;
        if (data.uid == Api.playerVoApi.getPlayerID()) {
            tarColor = TextFieldConst.COLOR_WARN_GREEN_NEW;
        }
        if (index < 3) {
            var rankImg = BaseBitmap.create("rank_" + String(index + 1));
            rankImg.x = 62 - rankImg.width / 2 + 20;
            rankImg.y = this.height / 2 - rankImg.height / 2;
            this.addChild(rankImg);
        }
        else {
            var rankTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, tarColor);
            rankTxt.text = String(index + 1);
            rankTxt.x = 62 - rankTxt.width / 2 + 20;
            rankTxt.y = this.height / 2 - rankTxt.height / 2;
            this.addChild(rankTxt);
        }
        var nameTxt = ComponentManager.getTextField(data.name, TextFieldConst.FONTSIZE_CONTENT_COMMON, tarColor);
        nameTxt.x = 220 - nameTxt.width / 2 + 30;
        nameTxt.y = this.height / 2 - nameTxt.height / 2;
        ;
        this.addChild(nameTxt);
        var scoreTxt = ComponentManager.getTextField("" + data.point, TextFieldConst.FONTSIZE_CONTENT_COMMON, tarColor);
        scoreTxt.x = 404 - scoreTxt.width / 2 + 20;
        scoreTxt.y = this.height / 2 - nameTxt.height / 2;
        ;
        this.addChild(scoreTxt);
        // let lineImg = BaseBitmap.create("dinner_line");
        // lineImg.x = 520 /2 - lineImg.width/2;
        // lineImg.y = this.height;
        // this.addChild(lineImg);
    };
    AtkraceRankItem.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AtkraceRankItem;
}(ScrollListItem));
__reflect(AtkraceRankItem.prototype, "AtkraceRankItem");
