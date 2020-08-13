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
var ActrackCrossVisitTab1Item = (function (_super) {
    __extends(ActrackCrossVisitTab1Item, _super);
    function ActrackCrossVisitTab1Item() {
        return _super.call(this) || this;
    }
    ActrackCrossVisitTab1Item.prototype.initItem = function (index, data) {
        //{uid:uid,name:xx,point:分数,st:攻击时间,sid:门客id,num:战胜人数,retscore:得分}
        this.width = 640;
        this.height = 120;
        var bg = BaseBitmap.create("public_listbg");
        bg.width = 516;
        bg.height = 120;
        // bg.x =60;
        bg.x = GameConfig.stageWidth / 2 - bg.width / 2;
        this.addChild(bg);
        bg.visible = false;
        if (index > 0) {
            var line = BaseBitmap.create("public_line4");
            line.width = 503;
            line.x = GameConfig.stageWidth / 2 - line.width / 2;
            line.y = bg.y - line.height / 2;
            this.addChild(line);
        }
        // let line = BaseBitmap.create("public_line1");
        // line.x =60;
        // line.y =120;
        // this.addChild(line);
        var rankImg = BaseBitmap.create("rankinglist_rankbg");
        rankImg.x = bg.x + 10;
        rankImg.y = 10;
        this.addChild(rankImg);
        rankImg.visible = false;
        var rankTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        rankTxt.text = String(index + 1);
        rankTxt.x = rankImg.x + (rankImg.width - rankTxt.width) / 2;
        rankTxt.y = rankImg.y + 10;
        this.addChild(rankTxt);
        //名称  
        var nameTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        nameTxt.text = data.name;
        nameTxt.x = rankImg.x + 45;
        nameTxt.y = rankImg.y + 10;
        this.addChild(nameTxt);
        //衙门分数
        var atkraceyamenScoreTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        atkraceyamenScoreTxt.text = LanguageManager.getlocal("atkraceyamenscore", [data.point]);
        atkraceyamenScoreTxt.x = nameTxt.x + nameTxt.width; //220;//rankImg.x+60
        atkraceyamenScoreTxt.y = rankImg.y + 10;
        this.addChild(atkraceyamenScoreTxt);
        var servantName = Config.ServantCfg.getServantItemById(data.sid).name;
        //描述    
        var describeTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
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
        var timerTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        timerTxt.text = App.DateUtil.getFormatBySecond(GameData.serverTime - data.st, 4);
        timerTxt.x = bg.x + bg.width - timerTxt.width - 10;
        timerTxt.y = nameTxt.y;
        this.addChild(timerTxt);
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
__reflect(ActrackCrossVisitTab1Item.prototype, "ActrackCrossVisitTab1Item");
