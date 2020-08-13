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
var ActrackVisitTab2Item = /** @class */ (function (_super) {
    __extends(ActrackVisitTab2Item, _super);
    function ActrackVisitTab2Item() {
        var _this = _super.call(this) || this;
        _this.uid = "";
        return _this;
    }
    ActrackVisitTab2Item.prototype.initItem = function (index, data) {
        // 0:{uid:uid,name:xx,point:分数,st:攻击时间,power:势力,level:官品}
        this.uid = data.uid;
        var bg = BaseBitmap.create("");
        bg.width = 516;
        bg.height = 126;
        bg.x = 60;
        this.addChild(bg);
        var line = BaseBitmap.create("public_line1");
        line.x = 60;
        line.y = 130;
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
        atkraceyamenScoreTxt.x = nameTxt.x + nameTxt.width; // 220;
        atkraceyamenScoreTxt.y = rankImg.y + 10;
        this.addChild(atkraceyamenScoreTxt);
        var str3 = LanguageManager.getlocal("powerDes", [data.power]);
        //势力    
        var powerTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL);
        powerTxt.text = str3;
        powerTxt.x = nameTxt.x;
        powerTxt.y = nameTxt.y + 30;
        powerTxt.width = 400;
        this.addChild(powerTxt);
        //对战信息    
        var warInforMationTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL);
        var newPoint = Number(data.point);
        if (data.retscore != null) {
            newPoint = Number(data.retscore);
        }
        if (newPoint >= 0) {
            var str = LanguageManager.getlocal("atkracewardes", [String(newPoint)]);
            warInforMationTxt.text = str;
            warInforMationTxt.textColor = TextFieldConst.COLOR_WARN_GREEN;
        }
        else {
            var str = LanguageManager.getlocal("atkracewardes2", [String(newPoint)]);
            warInforMationTxt.text = str;
            warInforMationTxt.textColor = TextFieldConst.COLOR_QUALITY_RED;
        }
        warInforMationTxt.text = str;
        warInforMationTxt.x = powerTxt.x;
        warInforMationTxt.y = powerTxt.y + 30;
        this.addChild(warInforMationTxt);
        //同帮会
        if (data.allianceId && Api.playerVoApi.getPlayerAllianceId() && data.allianceId == Api.playerVoApi.getPlayerAllianceId() && data.uid != Api.playerVoApi.getPlayerID()) {
            var allianceTxt = ComponentManager.getTextField(LanguageManager.getlocal('atkrace_log_sameAlliance'), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_QUALITY_ORANGE);
            allianceTxt.x = warInforMationTxt.x - 10;
            allianceTxt.y = warInforMationTxt.y + warInforMationTxt.height + 5;
            this.addChild(allianceTxt);
        }
        //时间  
        var timerTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_QUALITY_ORANGE);
        timerTxt.text = App.DateUtil.getFormatBySecond(GameData.serverTime - data.st, 4);
        timerTxt.x = 485;
        timerTxt.y = nameTxt.y;
        this.addChild(timerTxt);
        //复仇按钮
        var revengeBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "atkraceRevenge", this.revengeBtnHandler, this);
        revengeBtn.setScale(0.85);
        revengeBtn.x = timerTxt.x - 30; //-40;
        revengeBtn.y = timerTxt.y + 40;
        this.addChild(revengeBtn);
        if (data.expired) {
            var expired = ComponentManager.getTextField(LanguageManager.getlocal("atkrace_timeout"), TextFieldConst.FONTSIZE_CONTENT_SMALL);
            expired.x = nameTxt.x;
            expired.y = warInforMationTxt.y + warInforMationTxt.height + 5;
            this.addChild(expired);
            line.y += 12;
            bg.height += 12;
        }
    };
    ActrackVisitTab2Item.prototype.revengeBtnHandler = function (evt) {
        var data = [];
        data.type = 2; //复仇
        data.uid = this.uid;
        AtkraceChallengeItem.data = data;
        Api.atkraceVoApi.revengeIdx = this._index + 1;
        ViewController.getInstance().openView(ViewConst.POPUP.ATKRACECHALLENGEVIEW);
    };
    ActrackVisitTab2Item.prototype.getSpaceY = function () {
        return 10;
    };
    ActrackVisitTab2Item.prototype.getSpaceX = function () {
        return 0;
    };
    ActrackVisitTab2Item.prototype.dispose = function () {
        AtkraceChallengeItem.data = null;
        _super.prototype.dispose.call(this);
    };
    return ActrackVisitTab2Item;
}(ScrollListItem));
//# sourceMappingURL=ActrackVisitTab2Item.js.map