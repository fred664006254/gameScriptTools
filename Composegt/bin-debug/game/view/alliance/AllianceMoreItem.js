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
var AllianceMoreItem = (function (_super) {
    __extends(AllianceMoreItem, _super);
    function AllianceMoreItem() {
        var _this = _super.call(this) || this;
        _this.uid = 0;
        return _this;
    }
    AllianceMoreItem.prototype.initItem = function (index, data) {
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
        nameTxt.text = data[2];
        var dtype = data[0];
        if (PlatformManager.checkIsJPSp() && dtype != 2 && dtype != 8 && dtype != 13 && dtype != 14 && dtype != 15) {
            nameTxt.text = data[2] + LanguageManager.getlocal("alliancelogdes_name_suffix_jp");
        }
        nameTxt.x = rankTxt.x + 40;
        nameTxt.y = rankTxt.y;
        this.addChild(nameTxt);
        //时间  
        var timerTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_QUALITY_ORANGE);
        timerTxt.text = App.DateUtil.getFormatBySecond(data[1], 2);
        timerTxt.x = nameTxt.x;
        timerTxt.y = 98;
        this.addChild(timerTxt);
        //描述
        var describeTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL);
        describeTxt.width = 560;
        describeTxt.x = nameTxt.x;
        describeTxt.y = 50;
        describeTxt.lineSpacing = 3;
        this.addChild(describeTxt);
        var str = "";
        str = LanguageManager.getlocal("alliancelogdes" + data[0]);
        str = Api.allianceVoApi.getStr(data);
        describeTxt.text = str;
    };
    AllianceMoreItem.prototype.getSpaceY = function () {
        return 1;
    };
    AllianceMoreItem.prototype.getSpaceX = function () {
        return 0;
    };
    AllianceMoreItem.prototype.dispose = function () {
        this.uid = 0;
        _super.prototype.dispose.call(this);
    };
    return AllianceMoreItem;
}(ScrollListItem));
__reflect(AllianceMoreItem.prototype, "AllianceMoreItem");
