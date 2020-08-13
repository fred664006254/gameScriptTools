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
var NewActrackCrossVisitTab1Item = /** @class */ (function (_super) {
    __extends(NewActrackCrossVisitTab1Item, _super);
    function NewActrackCrossVisitTab1Item() {
        return _super.call(this) || this;
    }
    NewActrackCrossVisitTab1Item.prototype.initItem = function (index, data) {
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
        var nameStr = "";
        var uidStr = "";
        if (data.type == "director") {
            nameStr = data.uinfo.name;
            uidStr = data.uinfo.uid;
        }
        else {
            nameStr = data.name;
            uidStr = data.uid;
        }
        //名称  
        var nameTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_QUALITY_ORANGE);
        nameTxt.text = nameStr;
        nameTxt.x = rankImg.x + 60;
        nameTxt.y = rankImg.y + 10;
        this.addChild(nameTxt);
        //衙门分数
        var atkraceyamenScoreTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_QUALITY_ORANGE);
        atkraceyamenScoreTxt.text = LanguageManager.getlocal("atkraceyamenid", [uidStr]);
        atkraceyamenScoreTxt.x = nameTxt.x + nameTxt.width; //220;//rankImg.x+60
        atkraceyamenScoreTxt.y = rankImg.y + 10;
        this.addChild(atkraceyamenScoreTxt);
        //描述    
        var describeTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL);
        //对战信息    atkracewardes
        var warInforMationTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL);
        if (data.type == "director") {
            var vo = Api.acVoApi.getActivityVoByAidAndCode("newCrossServerAtkRace", Api.atkracecrossVoApi.newcrossCode);
            var descStr = LanguageManager.getlocal("newatkrackcross_fameDefenInfo1");
            var resultStr = LanguageManager.getlocal("newatkrackcross_fameDefenResult1");
            warInforMationTxt.textColor = TextFieldConst.COLOR_WARN_GREEN;
            if (data.winuid != Api.playerVoApi.getPlayerID()) {
                var fameCfg = vo.getFameCfgByLine(data.x);
                var fameName = LanguageManager.getlocal("newatkrackcross_fameTitleName" + (fameCfg.baseCfg.index + 1));
                var fameStr = fameName;
                if (data.x > 1) {
                    var seatCount = fameCfg.seatCount + data.y;
                    fameStr = LanguageManager.getlocal("newatkrackcross_famePtitleSeat", [fameName, seatCount]);
                }
                descStr = LanguageManager.getlocal("newatkrackcross_fameDefenInfo2", [fameStr]);
                resultStr = LanguageManager.getlocal("newatkrackcross_fameDefenResult2", [fameStr]);
                warInforMationTxt.textColor = 0xff0000;
            }
            describeTxt.text = descStr;
            warInforMationTxt.text = resultStr;
        }
        else {
            var servantName = Config.ServantCfg.getServantItemById(data.sid).name;
            describeTxt.text = LanguageManager.getlocal("atkracedefensedes", [servantName, data.num]);
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
        }
        describeTxt.x = nameTxt.x;
        describeTxt.y = nameTxt.y + 30;
        describeTxt.width = 400;
        this.addChild(describeTxt);
        if (data.type == "director") {
            var startTimeTxt = ComponentManager.getTextField(LanguageManager.getlocal("startBattleTimeDesc", [App.DateUtil.getFormatBySecond(data.fightst, 2)]), TextFieldConst.FONTSIZE_CONTENT_SMALL);
            startTimeTxt.x = describeTxt.x;
            startTimeTxt.y = describeTxt.y + describeTxt.height + 5;
            this.addChild(startTimeTxt);
            warInforMationTxt.x = startTimeTxt.x;
            warInforMationTxt.y = startTimeTxt.y + startTimeTxt.height + 5;
            line.y = warInforMationTxt.y + warInforMationTxt.height + 11;
            bg.height = line.y + 6;
        }
        else {
            var startTimeTxt = null;
            var endTime = null;
            warInforMationTxt.x = describeTxt.x;
            if (data.startts) {
                startTimeTxt = ComponentManager.getTextField(LanguageManager.getlocal("startBattleTimeDesc", [App.DateUtil.getFormatBySecond(data.startts, 2)]), TextFieldConst.FONTSIZE_CONTENT_SMALL);
                startTimeTxt.x = describeTxt.x;
                startTimeTxt.y = describeTxt.y + describeTxt.height + 5;
                this.addChild(startTimeTxt);
                warInforMationTxt.y = startTimeTxt.y + startTimeTxt.height + 5;
            }
            if (data.st) {
                endTime = ComponentManager.getTextField(LanguageManager.getlocal("endTimeDesc", [App.DateUtil.getFormatBySecond(data.st, 2)]), TextFieldConst.FONTSIZE_CONTENT_SMALL);
                endTime.x = describeTxt.x;
                endTime.y = describeTxt.y + describeTxt.height + 5;
                if (startTimeTxt) {
                    endTime.x = startTimeTxt.x;
                    endTime.y = startTimeTxt.y + startTimeTxt.height + 5;
                }
                this.addChild(endTime);
                warInforMationTxt.y = endTime.y + endTime.height + 5;
            }
            line.y = warInforMationTxt.y + warInforMationTxt.height + 11;
            bg.height = line.y + 6;
            // warInforMationTxt.x = describeTxt.x;
            // warInforMationTxt.y = describeTxt.y+42;
        }
        this.addChild(warInforMationTxt);
        //newatkraceScoreguard
        if (data.type != "director" && data.num == 1 && data.retscore == 2 || data.num > 1 && data.retscore >= 0) {
            var scoregurde = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL);
            scoregurde.text = LanguageManager.getlocal("newatkraceScoreguard");
            scoregurde.x = warInforMationTxt.x + warInforMationTxt.width;
            scoregurde.y = warInforMationTxt.y;
            this.addChild(scoregurde);
        }
        //时间  
        var timerTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_QUALITY_ORANGE);
        if (data.type == "director") {
            timerTxt.text = App.DateUtil.getFormatBySecond(GameData.serverTime - data.fightst, 4);
        }
        else {
            timerTxt.text = App.DateUtil.getFormatBySecond(GameData.serverTime - data.st, 4);
        }
        timerTxt.x = 485;
        timerTxt.y = nameTxt.y;
        this.addChild(timerTxt);
        if (data.expired) {
            var expired = ComponentManager.getTextField(LanguageManager.getlocal("atkrace_timeout"), TextFieldConst.FONTSIZE_CONTENT_SMALL);
            expired.x = describeTxt.x;
            expired.y = warInforMationTxt.y + warInforMationTxt.height + 5;
            this.addChild(expired);
            // line.y+=28;
            // bg.height+=28;
            line.y = expired.y + expired.height + 11;
            bg.height = line.y + 6;
        }
    };
    NewActrackCrossVisitTab1Item.prototype.getSpaceY = function () {
        return 0;
    };
    NewActrackCrossVisitTab1Item.prototype.getSpaceX = function () {
        return 0;
    };
    NewActrackCrossVisitTab1Item.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return NewActrackCrossVisitTab1Item;
}(ScrollListItem));
//# sourceMappingURL=NewActrackCrossVisitTab1Item.js.map