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
var AllianceBossMoreItem = (function (_super) {
    __extends(AllianceBossMoreItem, _super);
    function AllianceBossMoreItem() {
        var _this = _super.call(this) || this;
        _this.uid = 0;
        return _this;
    }
    AllianceBossMoreItem.prototype.initItem = function (index, data) {
        var wordsBg = BaseBitmap.create("public_9v_bg11");
        wordsBg.width = 640;
        wordsBg.height = 124;
        wordsBg.x = 0;
        wordsBg.y = 0;
        this.addChild(wordsBg);
        wordsBg.visible = false;
        var rankinglist_line = BaseBitmap.create("atkrace_xian_1");
        rankinglist_line.x = 10;
        this.addChild(rankinglist_line);
        rankinglist_line.y = 130;
        var rankTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON);
        rankTxt.text = String(index + 1);
        rankTxt.x = 20;
        rankTxt.y = 15;
        rankTxt.width = 30;
        rankTxt.textAlign = TextFieldConst.ALIGH_CENTER;
        this.addChild(rankTxt);
        //名称  
        var nameTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON);
        nameTxt.text = data.name;
        nameTxt.x = rankTxt.x + 40;
        nameTxt.y = rankTxt.y;
        this.addChild(nameTxt);
        //时间  
        var timerTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_QUALITY_ORANGE);
        timerTxt.text = App.DateUtil.getFormatBySecond(data.time, 2);
        timerTxt.x = nameTxt.x;
        timerTxt.y = 98;
        this.addChild(timerTxt);
        //描述
        var describeTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL);
        describeTxt.width = 450;
        describeTxt.x = nameTxt.x;
        describeTxt.y = 50;
        describeTxt.lineSpacing = 3;
        this.addChild(describeTxt);
        var str = "";
        var _name = Config.ServantCfg.getServantItemById(data.servantId).name;
        str = LanguageManager.getlocal("alliancelogdes13", [_name, App.StringUtil.changeIntToText(data.dps)]);
        describeTxt.text = str;
    };
    AllianceBossMoreItem.prototype.getSpaceY = function () {
        return 1;
    };
    AllianceBossMoreItem.prototype.getSpaceX = function () {
        return 0;
    };
    AllianceBossMoreItem.prototype.dispose = function () {
        this.uid = 0;
        _super.prototype.dispose.call(this);
    };
    return AllianceBossMoreItem;
}(ScrollListItem));
__reflect(AllianceBossMoreItem.prototype, "AllianceBossMoreItem");
