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
var AcGroupWifeBattleVisitTab2Item = /** @class */ (function (_super) {
    __extends(AcGroupWifeBattleVisitTab2Item, _super);
    function AcGroupWifeBattleVisitTab2Item() {
        var _this = _super.call(this) || this;
        _this._mainTaskHandKey = null;
        _this.uid = "";
        _this._code = '';
        _this._data = null;
        return _this;
    }
    Object.defineProperty(AcGroupWifeBattleVisitTab2Item.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    AcGroupWifeBattleVisitTab2Item.prototype.getUiCode = function () {
        var code = "";
        switch (Number(this.code)) {
            default:
                code = "1";
                break;
        }
        return code;
    };
    Object.defineProperty(AcGroupWifeBattleVisitTab2Item.prototype, "code", {
        get: function () {
            return this._code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcGroupWifeBattleVisitTab2Item.prototype, "aid", {
        get: function () {
            return AcConst.AID_GROUPWIFEBATTLE;
        },
        enumerable: true,
        configurable: true
    });
    AcGroupWifeBattleVisitTab2Item.prototype.initItem = function (index, data, itemparam) {
        var _this = this;
        // 0:{uid:uid,name:xx,point:分数,st:攻击时间,power:势力,level:官品}
        this._data = data;
        this.uid = data.uid;
        this._code = itemparam;
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
        //名称  
        var nameTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_QUALITY_ORANGE);
        nameTxt.text = data.name;
        nameTxt.x = rankImg.x + 60;
        nameTxt.y = rankImg.y + 10;
        this.addChild(nameTxt);
        //衙门分数
        var atkraceyamenScoreTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_QUALITY_ORANGE);
        atkraceyamenScoreTxt.text = LanguageManager.getlocal("atkraceyamenscore", [data.point]);
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
        //时间  
        var timerTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_QUALITY_ORANGE);
        timerTxt.text = App.DateUtil.getFormatBySecond(GameData.serverTime - data.st, 4);
        timerTxt.x = nameTxt.x + 300;
        timerTxt.y = nameTxt.y;
        this.addChild(timerTxt);
        //复仇按钮
        var revengeBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "atkraceRevenge", this.revengeBtnHandler, this);
        revengeBtn.setScale(0.85);
        revengeBtn.x = timerTxt.x; //-40;
        revengeBtn.y = timerTxt.y + 40;
        this.addChild(revengeBtn);
        egret.callLater(function () {
            _this._mainTaskHandKey = App.MainTaskHandUtil.addHandNode(revengeBtn, revengeBtn.width / 2, revengeBtn.height / 2, [revengeBtn], 603, true, function () {
                if (index === 0) {
                    this.parent.setChildIndex(this, 100);
                    return true;
                }
                else {
                    return false;
                }
            }, _this);
        }, this);
    };
    AcGroupWifeBattleVisitTab2Item.prototype.revengeBtnHandler = function (evt) {
        if (!this.vo.getAttendQuality()) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acBattleRoundNoAttend-" + this.getUiCode()));
            return;
        }
        if (this.vo.isActyEnd()) {
            App.CommonUtil.showTip(LanguageManager.getlocal("date_error"));
            return;
        }
        if (this.vo.getCurperiod() == 3) {
            App.CommonUtil.showTip(LanguageManager.getlocal("crossIntimacyCDTime4"));
            return;
        }
        if (!this.vo.getJoinIn()) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acGroupWifeBattleTip4-" + this._code));
            return;
        }
        var data = [];
        data.battleground = true;
        data.code = this._code;
        data.type = 2; //复仇
        data.uid = this.uid;
        data.ownuid = this._data.ownuid;
        data.fkey = this._data.fkey;
        AtkraceChallengeItem.data = data;
        this.vo.setRevengeIdx(this._index + 1);
        ViewController.getInstance().openView(ViewConst.POPUP.ACBATTLEGROUNDCHALLENGEVIEW);
    };
    AcGroupWifeBattleVisitTab2Item.prototype.getSpaceY = function () {
        return 10;
    };
    AcGroupWifeBattleVisitTab2Item.prototype.getSpaceX = function () {
        return 0;
    };
    AcGroupWifeBattleVisitTab2Item.prototype.dispose = function () {
        AtkraceChallengeItem.data = null;
        App.MainTaskHandUtil.releaseHandKey(this._mainTaskHandKey);
        this._mainTaskHandKey = null;
        _super.prototype.dispose.call(this);
    };
    return AcGroupWifeBattleVisitTab2Item;
}(ScrollListItem));
//# sourceMappingURL=AcGroupWifeBattleVisitTab2Item.js.map