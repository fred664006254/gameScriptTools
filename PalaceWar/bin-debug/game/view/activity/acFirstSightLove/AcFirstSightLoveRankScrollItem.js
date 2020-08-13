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
 * 报名item
 * author ycg
 * date 2019.10.18
 * @class AcFirstSightLoveRankScrollItem
 */
var AcFirstSightLoveRankScrollItem = (function (_super) {
    __extends(AcFirstSightLoveRankScrollItem, _super);
    function AcFirstSightLoveRankScrollItem() {
        return _super.call(this) || this;
    }
    AcFirstSightLoveRankScrollItem.prototype.initItem = function (index, data, itemParam) {
        this.width = 550;
        this.height = 65; //65
        var stIndex = itemParam.stIndex;
        if (!stIndex || stIndex <= 0) {
            stIndex = 0;
        }
        var num = ComponentManager.getTextField("" + (stIndex + index + 1), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        num.anchorOffsetX = num.width / 2;
        num.setPosition(60, this.height / 2 - num.height / 2);
        this.addChild(num);
        var name = ComponentManager.getTextField(data.name, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        name.anchorOffsetX = name.width / 2;
        name.setPosition(190, this.height / 2 - name.height / 2);
        this.addChild(name);
        var level = ComponentManager.getTextField(LanguageManager.getlocal("officialTitle" + data.level), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        level.anchorOffsetX = level.width / 2;
        level.setPosition(this.width / 2 + 70, this.height / 2 - level.height / 2);
        this.addChild(level);
        var zoneTxt = ComponentManager.getTextField(LanguageManager.getlocal("acFirstSightLoveJoinListServerNum", [data.zid]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        // let sidname = Api.mergeServerVoApi.getAfterMergeSeverName(null, true, data.zid);
        // zoneTxt.text = LanguageManager.getlocal("acFirstSightLoveJoinListServerNum", [sidname]);
        zoneTxt.anchorOffsetX = zoneTxt.width / 2;
        zoneTxt.x = this.width - 85;
        zoneTxt.y = this.height / 2 - zoneTxt.height / 2;
        this.addChild(zoneTxt);
        var lineImg = BaseBitmap.create("public_line1");
        lineImg.x = this.width / 2 - lineImg.width / 2;
        lineImg.y = this.height - lineImg.height;
        this.addChild(lineImg);
        if (data.uid == Api.playerVoApi.getPlayerID()) {
            num.setColor(TextFieldConst.COLOR_WARN_YELLOW);
            name.setColor(TextFieldConst.COLOR_WARN_YELLOW);
            zoneTxt.setColor(TextFieldConst.COLOR_WARN_YELLOW);
            level.setColor(TextFieldConst.COLOR_WARN_YELLOW);
        }
    };
    AcFirstSightLoveRankScrollItem.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AcFirstSightLoveRankScrollItem;
}(ScrollListItem));
__reflect(AcFirstSightLoveRankScrollItem.prototype, "AcFirstSightLoveRankScrollItem");
//# sourceMappingURL=AcFirstSightLoveRankScrollItem.js.map