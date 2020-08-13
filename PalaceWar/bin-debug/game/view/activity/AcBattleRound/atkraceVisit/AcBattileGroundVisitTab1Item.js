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
var AcBattileGroundVisitTab1Item = (function (_super) {
    __extends(AcBattileGroundVisitTab1Item, _super);
    function AcBattileGroundVisitTab1Item() {
        return _super.call(this) || this;
    }
    AcBattileGroundVisitTab1Item.prototype.initItem = function (index, data) {
        //{uid:uid,name:xx,point:分数,st:攻击时间,sid:门客id,num:战胜人数,retscore:得分}
        // (1随机 2复仇 3挑战 4追杀 5出师令)  data.atype
        var bg = BaseBitmap.create("public_9_bg25");
        bg.width = 516;
        bg.height = 126;
        bg.x = 60;
        bg.visible = false;
        this.addChild(bg);
        var line = BaseBitmap.create("public_line1");
        line.x = 60;
        // line.y =120;
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
        //let nameTxt = ComponentManager.getTextField(`${index + 1}. ${data.playerName}${LanguageManager.getlocal(`atkraceyamenid`,[data.uid])}`, 20, TextFieldConst.COLOR_WARN_YELLOW2);
        //名称  
        var nameTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_QUALITY_ORANGE);
        nameTxt.text = data.name;
        if (data.weedout) {
            nameTxt.text += "<font color=0xff3c3c>\u3010" + LanguageManager.getlocal("battlestaut3") + "\u3011</font>";
        }
        nameTxt.x = rankImg.x + 60;
        nameTxt.y = rankImg.y + 10;
        this.addChild(nameTxt);
        //衙门分数
        var atkraceyamenScoreTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_QUALITY_ORANGE);
        atkraceyamenScoreTxt.text = LanguageManager.getlocal("atkraceyamenscore", [data.point]);
        atkraceyamenScoreTxt.x = nameTxt.x + nameTxt.width; //220;//rankImg.x+60
        atkraceyamenScoreTxt.y = rankImg.y + 10;
        this.addChild(atkraceyamenScoreTxt);
        var servantName = Config.ServantCfg.getServantItemById(data.sid).name;
        //描述    
        var describeTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL);
        describeTxt.lineSpacing = 2;
        if (data.atype == 4) {
            describeTxt.text = LanguageManager.getlocal("battlegroundvisitlog1", [servantName, data.ownname, data.num]);
        }
        else {
            describeTxt.text = LanguageManager.getlocal("battlegroundvisitlog2", [servantName, data.ownname, data.num]);
        }
        describeTxt.x = nameTxt.x;
        describeTxt.y = nameTxt.y + nameTxt.height + 5;
        describeTxt.width = 400;
        this.addChild(describeTxt);
        var endTimerTxt = null;
        if (data.startts) {
            var startTimeTxt = ComponentManager.getTextField(LanguageManager.getlocal("startBattleTimeDesc", [App.DateUtil.getFormatBySecond(data.startts, 2)]), TextFieldConst.FONTSIZE_CONTENT_COMMON);
            startTimeTxt.x = describeTxt.x;
            startTimeTxt.y = describeTxt.y + describeTxt.height + 5;
            this.addChild(startTimeTxt);
            var timerTxt_1 = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON);
            timerTxt_1.text = LanguageManager.getlocal("endTimeDesc", [App.DateUtil.getFormatBySecond(data.st, 2)]);
            timerTxt_1.x = describeTxt.x;
            timerTxt_1.y = startTimeTxt.y + startTimeTxt.height + 5;
            this.addChild(timerTxt_1);
            endTimerTxt = timerTxt_1;
        }
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
        if (endTimerTxt) {
            warInforMationTxt.y = endTimerTxt.y + endTimerTxt.height + 5;
        }
        else {
            warInforMationTxt.y = describeTxt.y + describeTxt.height + 5;
        }
        this.addChild(warInforMationTxt);
        //时间  
        var timerTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_QUALITY_ORANGE);
        timerTxt.text = App.DateUtil.getFormatBySecond(GameData.serverTime - data.st, 4);
        // var str2:string  = App.DateUtil.getFormatBySecond(GameData.serverTime-data.st, 4);
        // console.log(str2+"打印真实");
        timerTxt.x = 485;
        timerTxt.y = nameTxt.y;
        this.addChild(timerTxt);
        line.y = warInforMationTxt.y + warInforMationTxt.height + 5;
        bg.height = line.y + line.height + 10;
    };
    AcBattileGroundVisitTab1Item.prototype.getSpaceY = function () {
        return 0;
    };
    AcBattileGroundVisitTab1Item.prototype.getSpaceX = function () {
        return 0;
    };
    AcBattileGroundVisitTab1Item.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AcBattileGroundVisitTab1Item;
}(ScrollListItem));
__reflect(AcBattileGroundVisitTab1Item.prototype, "AcBattileGroundVisitTab1Item");
//# sourceMappingURL=AcBattileGroundVisitTab1Item.js.map