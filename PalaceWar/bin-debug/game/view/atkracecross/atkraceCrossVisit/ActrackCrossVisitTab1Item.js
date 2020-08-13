var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var ActrackCrossVisitTab1Item = /** @class */ (function (_super) {
    __extends(ActrackCrossVisitTab1Item, _super);
    function ActrackCrossVisitTab1Item() {
        return _super.call(this) || this;
    }
    ActrackCrossVisitTab1Item.prototype.initItem = function (index, data) {
        //{uid:uid,name:xx,point:分数,st:攻击时间,sid:门客id,num:战胜人数,retscore:得分}
        var bg = BaseBitmap.create("public_9_bg25");
        bg.width = 516;
        bg.height = 126;
        bg.x = 60;
        bg.visible = false;
        this.addChild(bg);
        var line = BaseBitmap.create("public_line1");
        line.x = 60;
        line.y = 120;
        this.addChild(line);
        var rankImg = BaseBitmap.create("rankinglist_rankbg");
        rankImg.x = bg.x + 20;
        rankImg.y = 10;
        this.addChild(rankImg);
        var rankTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON);
        rankTxt.text = String(index + 1);
        rankTxt.x = rankImg.x + (rankImg.width - rankTxt.width) / 2;
        rankTxt.y = rankImg.y + 10;
        this.addChild(rankTxt);
        //名称  
        var nameTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_QUALITY_ORANGE);
        nameTxt.text = data.name;
        nameTxt.x = rankImg.x + 60;
        nameTxt.y = rankImg.y + 10;
        this.addChild(nameTxt);
        //衙门分数
        var atkraceyamenScoreTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_QUALITY_ORANGE);
        atkraceyamenScoreTxt.text = LanguageManager.getlocal("atkraceyamenid", [data.uid]);
        atkraceyamenScoreTxt.x = nameTxt.x + nameTxt.width; //220;//rankImg.x+60
        atkraceyamenScoreTxt.y = rankImg.y + 10;
        this.addChild(atkraceyamenScoreTxt);
        var servantName = Config.ServantCfg.getServantItemById(data.sid).name;
        //描述    
        var describeTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL);
        describeTxt.text = LanguageManager.getlocal("atkracedefensedes", [servantName, data.num]);
        describeTxt.x = nameTxt.x;
        describeTxt.y = nameTxt.y + 30;
        describeTxt.width = 400;
        this.addChild(describeTxt);
        //对战信息    atkracewardes
        var warInforMationTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL);
        var str = "";
        if (data.retscore >= 0) {
            str = LanguageManager.getlocal("atkracewardes", [data.retscore]);
            warInforMationTxt.textColor = TextFieldConst.COLOR_WARN_GREEN;
        }
        else {
            str = LanguageManager.getlocal("atkracewardes2", [data.retscore + ""]);
            warInforMationTxt.textColor = 0xff0000; //TextFieldConst.COLOR_WARN_RED2;
        }
        warInforMationTxt.text = str;
        warInforMationTxt.x = describeTxt.x;
        warInforMationTxt.y = describeTxt.y + 42;
        this.addChild(warInforMationTxt);
        //时间  
        var timerTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_QUALITY_ORANGE);
        timerTxt.text = App.DateUtil.getFormatBySecond(GameData.serverTime - data.st, 4);
        timerTxt.x = 485;
        timerTxt.y = nameTxt.y;
        this.addChild(timerTxt);
        if (data.expired) {
            var expired = ComponentManager.getTextField(LanguageManager.getlocal("atkrace_timeout"), TextFieldConst.FONTSIZE_CONTENT_SMALL);
            expired.x = describeTxt.x;
            expired.y = warInforMationTxt.y + warInforMationTxt.height + 5;
            this.addChild(expired);
            line.y += 28;
            bg.height += 28;
        }
    };
    ActrackCrossVisitTab1Item.prototype.getSpaceY = function () {
        return 0;
    };
    ActrackCrossVisitTab1Item.prototype.getSpaceX = function () {
        return 0;
    };
    ActrackCrossVisitTab1Item.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return ActrackCrossVisitTab1Item;
}(ScrollListItem));
//# sourceMappingURL=ActrackCrossVisitTab1Item.js.map