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
 * 	彩蛋活动
 * @author 张朝阳
 * date 2019/3/14
 * @class AcWealthCarpRankScrollItem
 */
var AcWealthCarpRankScrollItem = (function (_super) {
    __extends(AcWealthCarpRankScrollItem, _super);
    function AcWealthCarpRankScrollItem() {
        return _super.call(this) || this;
    }
    AcWealthCarpRankScrollItem.prototype.initItem = function (index, data, itemParam) {
        this.width = 530;
        //排序
        var rankTF = ComponentManager.getTextField(String(index + 1), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        rankTF.setPosition(this.x + 40 - rankTF.width / 2, 8);
        this.addChild(rankTF);
        //名字
        var nameTxt = ComponentManager.getTextField(data.name, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        nameTxt.setPosition(this.x + 160 - nameTxt.width / 2, rankTF.y);
        this.addChild(nameTxt);
        if (data.lucky == 1) {
            var medal = BaseBitmap.create("acwealthcarpview_medal");
            medal.setPosition(nameTxt.x + nameTxt.width + 2, nameTxt.y + nameTxt.height / 2 - medal.height / 2);
            this.addChild(medal);
        }
        //时间
        var timeStr = App.DateUtil.getFormatBySecond(data.ts, 2);
        var timeTxt = ComponentManager.getTextField(timeStr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        timeTxt.setPosition(this.x + 410 - timeTxt.width / 2, nameTxt.y + nameTxt.height / 2 - timeTxt.height / 2);
        this.addChild(timeTxt);
        //文本线
        var lineSp = BaseBitmap.create("public_line1");
        lineSp.setPosition(this.x + this.width / 2 - lineSp.width / 2, timeTxt.y + timeTxt.height + 10);
        this.addChild(lineSp);
        if (Api.playerVoApi.getPlayerID() == data.uid) {
            rankTF.setColor(TextFieldConst.COLOR_WARN_YELLOW);
            nameTxt.setColor(TextFieldConst.COLOR_WARN_YELLOW);
            timeTxt.setColor(TextFieldConst.COLOR_WARN_YELLOW);
        }
    };
    AcWealthCarpRankScrollItem.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AcWealthCarpRankScrollItem;
}(ScrollListItem));
__reflect(AcWealthCarpRankScrollItem.prototype, "AcWealthCarpRankScrollItem");
//# sourceMappingURL=AcWealthCarpRankScrollItem.js.map