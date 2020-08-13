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
var DinnerFinishItem = (function (_super) {
    __extends(DinnerFinishItem, _super);
    function DinnerFinishItem() {
        return _super.call(this) || this;
    }
    DinnerFinishItem.prototype.initItem = function (index, data) {
        this.width = 582;
        this.height = 50;
        var rankImg = BaseBitmap.create("dinner_rankbg");
        rankImg.x = 68 - rankImg.width / 2;
        rankImg.y = this.height / 2 - rankImg.height / 2;
        this.addChild(rankImg);
        var rankTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON);
        rankTxt.text = String(index + 1);
        rankTxt.x = 68 - rankTxt.width / 2;
        rankTxt.y = this.height / 2 - rankTxt.height / 2;
        this.addChild(rankTxt);
        var scoreStr;
        var point = 0;
        var namestr = data.name;
        if (data.dtype == 999) {
            point = 50;
            scoreStr = "+" + point;
        }
        else if (data.special) {
            if (data.dtype == 1) {
                point = 100;
            }
            else {
                point = 500;
            }
            namestr = LanguageManager.getlocal("dinnerFinishName" + data.dtype);
            scoreStr = "+" + point;
        }
        else {
            var dinnerCfg = Config.DinnerCfg.getGoToFeastItemCfg(data.dtype);
            point = Number(dinnerCfg.getPoint);
            if (dinnerCfg.getPoint > 0) {
                scoreStr = "+" + dinnerCfg.getPoint;
            }
            else {
                scoreStr = dinnerCfg.getPoint.toString();
            }
        }
        var nameTxt = ComponentManager.getTextField(namestr, TextFieldConst.FONTSIZE_CONTENT_COMMON);
        nameTxt.x = 270 - nameTxt.width / 2;
        nameTxt.y = this.height / 2 - nameTxt.height / 2;
        ;
        this.addChild(nameTxt);
        var scoreTxt = ComponentManager.getTextField(scoreStr, TextFieldConst.FONTSIZE_CONTENT_COMMON);
        scoreTxt.x = 480 - scoreTxt.width / 2;
        scoreTxt.y = this.height / 2 - nameTxt.height / 2;
        ;
        this.addChild(scoreTxt);
        if (point > 0) {
            nameTxt.textColor = TextFieldConst.COLOR_WARN_GREEN;
            scoreTxt.textColor = TextFieldConst.COLOR_WARN_GREEN;
        }
        else {
            nameTxt.textColor = TextFieldConst.COLOR_WARN_RED2;
            scoreTxt.textColor = TextFieldConst.COLOR_WARN_RED2;
        }
        var lineImg = BaseBitmap.create("dinner_line");
        lineImg.x = this.width / 2 - lineImg.width / 2;
        lineImg.y = this.height;
        this.addChild(lineImg);
    };
    DinnerFinishItem.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return DinnerFinishItem;
}(ScrollListItem));
__reflect(DinnerFinishItem.prototype, "DinnerFinishItem");
//# sourceMappingURL=DinnerFinishItem.js.map