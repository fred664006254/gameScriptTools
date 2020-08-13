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
/**
  * 科举答题排行榜
  * author yangchengguo
  * date 2019.7.24
  * @class ExamRankScrollItem
  */
var ExamRankScrollItem = (function (_super) {
    __extends(ExamRankScrollItem, _super);
    function ExamRankScrollItem() {
        return _super.call(this) || this;
    }
    /**
     * 初始化itemview
     */
    ExamRankScrollItem.prototype.initItem = function (index, data) {
        var itemIndex = index + 1;
        this.width = 516;
        this.height = 76;
        //排名
        var itemBgStr = "rankbg_" + String(itemIndex);
        if (itemIndex > 3) {
            this.height = 62;
            itemBgStr = "rankbg_4";
            var rankTF = ComponentManager.getTextField(String(itemIndex), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BLACK);
            rankTF.setPosition(this.x + 30 + 37 - rankTF.width / 2, this.y + this.height / 2 - rankTF.height / 2);
            this.addChild(rankTF);
            if (data.uid == Api.playerVoApi.getPlayerID()) {
                rankTF.setColor(TextFieldConst.COLOR_QUALITY_YELLOW);
            }
        }
        else {
            var numIcon = BaseLoadBitmap.create("rankinglist_rankn" + (String(itemIndex)));
            numIcon.width = 74;
            numIcon.height = 42;
            numIcon.setPosition(this.x + 30, this.y + this.height / 2 - numIcon.height / 2);
            this.addChild(numIcon);
        }
        var itemBg = BaseLoadBitmap.create(itemBgStr);
        // itemBg.width = 608;
        this.addChild(itemBg);
        //名字
        var nameTF = ComponentManager.getTextField(data.name, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BLACK);
        nameTF.setPosition(this.x + this.width / 2 - nameTF.width / 2 - 65, this.y + this.height / 2 - nameTF.height / 2);
        this.addChild(nameTF);
        //耗时
        var timeNum = Number(data.replytime) / 1000;
        var timeTF = ComponentManager.getTextField(String(timeNum.toFixed(3)), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BLACK);
        timeTF.setPosition(this.x + this.width / 2 - timeTF.width / 2 + 65, this.y + this.height / 2 - timeTF.height / 2);
        this.addChild(timeTF);
        //积分
        var scoreTF = ComponentManager.getTextField(data.score, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BLACK);
        scoreTF.setPosition(this.x + this.width - scoreTF.width / 2 - 70, this.y + this.height / 2 - scoreTF.height / 2);
        this.addChild(scoreTF);
        //文本线
        var lineSp = BaseBitmap.create("public_line1");
        lineSp.setPosition(this.x + this.width / 2 - lineSp.width / 2, this.y + this.height - lineSp.height);
        this.addChild(lineSp);
        if (data.uid == Api.playerVoApi.getPlayerID()) {
            nameTF.setColor(TextFieldConst.COLOR_QUALITY_YELLOW);
            scoreTF.setColor(TextFieldConst.COLOR_QUALITY_YELLOW);
            timeTF.setColor(TextFieldConst.COLOR_QUALITY_YELLOW);
        }
    };
    ExamRankScrollItem.prototype.getSpaceY = function () {
        return 5;
    };
    ExamRankScrollItem.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return ExamRankScrollItem;
}(ScrollListItem));
__reflect(ExamRankScrollItem.prototype, "ExamRankScrollItem");
//# sourceMappingURL=ExamRankScrollItem.js.map