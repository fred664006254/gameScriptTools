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
var NewActrackCrossVisitTab2Item = /** @class */ (function (_super) {
    __extends(NewActrackCrossVisitTab2Item, _super);
    function NewActrackCrossVisitTab2Item() {
        var _this = _super.call(this) || this;
        _this.uid = "";
        _this.zid = 0;
        _this.data = null;
        return _this;
    }
    NewActrackCrossVisitTab2Item.prototype.initItem = function (index, data) {
        this.data = data;
        // 0:{uid:uid,name:xx,point:分数,st:攻击时间,power:势力,level:官品}
        this.uid = data.uid;
        this.zid = data.zid;
        var bg = BaseBitmap.create("");
        bg.width = 516;
        bg.height = 126;
        bg.x = 60;
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
        var powerStr = "";
        if (data.type == "director") {
            nameStr = data.uinfo.name;
            uidStr = data.uinfo.uid;
            powerStr = data.uinfo.power;
        }
        else {
            nameStr = data.name;
            uidStr = data.uid;
            powerStr = data.power;
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
        atkraceyamenScoreTxt.x = nameTxt.x + nameTxt.width; // 220;
        atkraceyamenScoreTxt.y = rankImg.y + 10;
        this.addChild(atkraceyamenScoreTxt);
        //势力    
        var str3 = LanguageManager.getlocal("powerDes", [powerStr]);
        var powerTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL);
        powerTxt.text = str3; //+data.power;
        powerTxt.x = nameTxt.x;
        powerTxt.y = nameTxt.y + 30;
        powerTxt.width = 400;
        this.addChild(powerTxt);
        //对战信息    
        var warInforMationTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL);
        if (data.type == "director") {
            var vo = Api.acVoApi.getActivityVoByAidAndCode("newCrossServerAtkRace", Api.atkracecrossVoApi.newcrossCode);
            var fameCfg = vo.getFameCfgByLine(data.x);
            var fameName = LanguageManager.getlocal("newatkrackcross_fameTitleName" + (fameCfg.baseCfg.index + 1));
            var fameStr = fameName;
            if (data.x > 1) {
                var seatCount = fameCfg.seatCount + data.y;
                fameStr = LanguageManager.getlocal("newatkrackcross_famePtitleSeat", [fameName, seatCount]);
            }
            warInforMationTxt.text = LanguageManager.getlocal("newatkrackcross_fameDefenInfo2", [fameStr]);
            warInforMationTxt.textColor = TextFieldConst.COLOR_QUALITY_RED;
        }
        else {
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
        }
        warInforMationTxt.width = 400;
        warInforMationTxt.lineSpacing = 5;
        warInforMationTxt.x = powerTxt.x;
        warInforMationTxt.y = powerTxt.y + 30;
        this.addChild(warInforMationTxt);
        bg.height = warInforMationTxt.y + warInforMationTxt.height + line.height + 16;
        line.y = bg.y + bg.height - 6;
        if (data.type != "director" && data.retscore >= 0) {
            var scoregurde = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL);
            scoregurde.text = LanguageManager.getlocal("newatkraceScoreguard");
            scoregurde.x = warInforMationTxt.x + warInforMationTxt.width;
            scoregurde.y = warInforMationTxt.y;
            this.addChild(scoregurde);
            bg.height = scoregurde.y + scoregurde.height + line.height + 16;
            line.y = bg.y + bg.height - 6;
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
        //复仇按钮
        if (data.type != "director") {
            var revengeBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "atkraceRevenge", this.revengeBtnHandler, this);
            revengeBtn.setScale(0.85);
            revengeBtn.x = timerTxt.x - 30;
            revengeBtn.y = timerTxt.y + 40;
            this.addChild(revengeBtn);
        }
        if (data.expired) {
            var expired = ComponentManager.getTextField(LanguageManager.getlocal("atkrace_timeout"), TextFieldConst.FONTSIZE_CONTENT_SMALL);
            expired.x = nameTxt.x;
            expired.y = warInforMationTxt.y + warInforMationTxt.height + 5;
            this.addChild(expired);
            line.y += 12;
            bg.height += 12;
        }
    };
    NewActrackCrossVisitTab2Item.prototype.revengeBtnHandler = function (evt) {
        var data = [];
        data.type = 2; //复仇
        data.uid = this.uid;
        data.zid = this.zid;
        AtkraceCrossChallengeItem.data = data;
        Api.atkracecrossVoApi.revengeIdx = this._index + 1;
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_NEWATKRACECROSS_GETINFO), this.useCallback, this);
        NetManager.request(NetRequestConst.REQUEST_NEWATKRACECROSS_GETINFO, { "fuid": this.data.uid });
    };
    NewActrackCrossVisitTab2Item.prototype.useCallback = function (data) {
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_NEWATKRACECROSS_GETINFO), this.useCallback, this);
        if (data.data.ret == true) {
            var atkraceinfo = data.data.data.data.atkraceinfo;
            ViewController.getInstance().openView(ViewConst.POPUP.NEWATKRACECROSSCHALLENGEVIEW, { info: atkraceinfo });
        }
    };
    NewActrackCrossVisitTab2Item.prototype.getSpaceY = function () {
        return 10;
    };
    NewActrackCrossVisitTab2Item.prototype.getSpaceX = function () {
        return 0;
    };
    NewActrackCrossVisitTab2Item.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_NEWATKRACECROSS_GETINFO), this.useCallback, this);
        AtkraceCrossChallengeItem.data = null;
        this.data = null;
        _super.prototype.dispose.call(this);
    };
    return NewActrackCrossVisitTab2Item;
}(ScrollListItem));
//# sourceMappingURL=NewActrackCrossVisitTab2Item.js.map