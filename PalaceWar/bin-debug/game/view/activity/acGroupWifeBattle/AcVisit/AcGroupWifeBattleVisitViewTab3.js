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
/**
 * 追杀
 */
var AcGroupWifeBattleVisitViewTab3 = /** @class */ (function (_super) {
    __extends(AcGroupWifeBattleVisitViewTab3, _super);
    // "atkraceErrordes1":"当前ID不存在",
    // "atkraceErrordes2":"请输入查询ID",
    function AcGroupWifeBattleVisitViewTab3(data) {
        var _this = _super.call(this) || this;
        _this.powerText = null;
        _this.menkeText = null;
        _this.yamunText = null;
        _this.nameText = null;
        _this.scoreRankText = null;
        _this.bg = null;
        // private _userId:string =null;
        _this.blackBgRect = null;
        _this.playerContainer = null;
        _this.bgImag2 = null;
        _this.officialRankbottom = null;
        _this.bottomNameImag = null;
        _this.killBtn = null;
        _this.numLb = null;
        _this._userIdtxt = "";
        _this.param = data;
        _this.initView();
        return _this;
    }
    Object.defineProperty(AcGroupWifeBattleVisitViewTab3.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcGroupWifeBattleVisitViewTab3.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcGroupWifeBattleVisitViewTab3.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcGroupWifeBattleVisitViewTab3.prototype, "acTivityId", {
        get: function () {
            return this.param.data.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    AcGroupWifeBattleVisitViewTab3.prototype.getUiCode = function () {
        var code = "";
        switch (Number(this.code)) {
            default:
                code = "1";
                break;
        }
        return code;
    };
    AcGroupWifeBattleVisitViewTab3.prototype.initView = function () {
        var code = this.getUiCode();
        this.bg = BaseBitmap.create("public_9_probiginnerbg");
        this.bg.width = 520;
        this.bg.height = 502;
        this.bg.x = 25;
        this.bg.y = 55;
        this.addChild(this.bg);
        //文字:追杀对象
        var killText = ComponentManager.getTextField(LanguageManager.getlocal("acGroupWifeBattleVisitTip2-" + code), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        killText.x = 62;
        killText.y = 80;
        this.addChild(killText);
        //查询输入框的底图
        var bg1 = BaseBitmap.create("public_9_bg5");
        bg1.width = 346;
        bg1.height = 44;
        bg1.x = killText.x;
        bg1.y = killText.y + 35;
        this.addChild(bg1);
        //输入文本
        var userIdInput = new BaseTextField();
        userIdInput.type = egret.TextFieldType.INPUT;
        userIdInput.width = bg1.width;
        userIdInput.height = bg1.height;
        userIdInput.x = bg1.x; //+10;
        userIdInput.y = bg1.y + 10;
        userIdInput.maxChars = 11;
        userIdInput.textAlign = TextFieldConst.ALIGH_CENTER;
        userIdInput.restrict = "0-9";
        userIdInput.text = LanguageManager.getlocal("inputPlayerId");
        userIdInput.size = 20;
        this.addChild(userIdInput);
        this.userIdInput = userIdInput;
        this.userIdInput.addEventListener(egret.TextEvent.CHANGE, this.callbackInput, this, false, 2);
        this.userIdInput.addEventListener(egret.FocusEvent.FOCUS_IN, this.foucusHandler, this);
        this._userIdtxt = userIdInput.text;
        //文字:对方信息
        var otherPartyText = ComponentManager.getTextField(LanguageManager.getlocal("atkraceotherPartyText"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        otherPartyText.x = bg1.x;
        otherPartyText.y = bg1.height + bg1.y + 35;
        this.addChild(otherPartyText);
        //查询按钮
        var queryBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "find", this.queryBtnHandler, this);
        queryBtn.setScale(0.85);
        queryBtn.x = bg1.x + bg1.width + 15;
        queryBtn.y = bg1.y;
        this.addChild(queryBtn);
        var bgImag = BaseBitmap.create("atkraceVisitbg");
        bgImag.x = 35;
        bgImag.y = 220;
        this.addChild(bgImag);
        var playerContainer = new BaseDisplayObjectContainer();
        this.addChild(playerContainer);
        this.playerContainer = playerContainer;
        //官衔背景图
        var officialRankbottom = BaseBitmap.create("atkracevipbg");
        officialRankbottom.x = bgImag.x + 70;
        officialRankbottom.y = bgImag.y + 50;
        this.addChild(officialRankbottom);
        officialRankbottom.visible = false;
        if (PlatformManager.checkIsTextHorizontal()) {
            officialRankbottom.rotation = -90;
            officialRankbottom.y += 30;
            officialRankbottom.x -= 5;
        }
        this.officialRankbottom = officialRankbottom;
        //黑色长条背景
        var blackBgRect = BaseBitmap.create("public_9_bg20");
        blackBgRect.width = 490;
        blackBgRect.height = 62;
        blackBgRect.x = bgImag.x + 5;
        blackBgRect.y = bgImag.y + bgImag.height - blackBgRect.height - 11;
        this.addChild(blackBgRect);
        this.blackBgRect = blackBgRect;
        this.showText();
        //人物名字底图
        var bottomNameImag = BaseBitmap.create("public_resnumbg");
        bottomNameImag.x = 180;
        bottomNameImag.y = 440;
        this.addChild(bottomNameImag);
        bottomNameImag.visible = false;
        this.bottomNameImag = bottomNameImag;
        //人物名字
        var nameText = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        nameText.x = bottomNameImag.x; //+10;
        nameText.y = bottomNameImag.y + 5;
        this.nameText = nameText;
        nameText.width = 180;
        this.nameText.textAlign = TextFieldConst.ALIGH_CENTER;
        this.addChild(nameText);
        //追杀按钮
        var killBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "acGroupWifeBattleAvengerBtn", this.killBtnHandler, this);
        killBtn.x = bgImag.width / 2 - killBtn.width / 2 + 20;
        killBtn.y = bgImag.height + bgImag.y + 30;
        ;
        this.addChild(killBtn);
        killBtn.visible = false;
        this.killBtn = killBtn;
        //追杀文字
        var atkraceTracingdesTxt = ComponentManager.getTextField(LanguageManager.getlocal("acGroupWifeBattleVisitTip3-" + code), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        atkraceTracingdesTxt.x = 570 - atkraceTracingdesTxt.width - 30;
        atkraceTracingdesTxt.y = 640;
        this.addChild(atkraceTracingdesTxt);
    };
    AcGroupWifeBattleVisitViewTab3.prototype.callbackInput = function (event) {
        this._userIdtxt = event.target.text;
        App.LogUtil.log("event.target.text:" + event.target.text);
    };
    AcGroupWifeBattleVisitViewTab3.prototype.foucusHandler = function (event) {
        var str = LanguageManager.getlocal("inputPlayerId");
        if (this._userIdtxt == str) {
            this.userIdInput.text = "";
        }
    };
    AcGroupWifeBattleVisitViewTab3.prototype.showText = function () {
        //势力    
        this.powerText = ComponentManager.getTextField("atkracepowerText", TextFieldConst.FONTSIZE_CONTENT_COMMON);
        this.powerText.text = ""; //LanguageManager.getlocal("atkracepowerText",["2222"])
        this.powerText.x = this.blackBgRect.x + 50;
        this.powerText.y = this.blackBgRect.y + this.blackBgRect.height - 50;
        this.addChild(this.powerText);
        //门客数量    
        this.menkeText = ComponentManager.getTextField("atkracemenkeText", TextFieldConst.FONTSIZE_CONTENT_COMMON);
        this.menkeText.text = ""; //LanguageManager.getlocal("atkracemenkeText",["6666"])
        this.menkeText.x = this.powerText.x + 240;
        this.menkeText.y = this.powerText.y;
        this.addChild(this.menkeText);
        //衙门分数    
        this.yamunText = ComponentManager.getTextField("atkraceyamunText", TextFieldConst.FONTSIZE_CONTENT_COMMON);
        this.yamunText.text = ""; //LanguageManager.getlocal("atkraceyamunText",["3333"]);
        this.yamunText.x = this.powerText.x;
        this.yamunText.y = this.powerText.y + 30;
        this.addChild(this.yamunText);
        //分数排行    
        this.scoreRankText = ComponentManager.getTextField("atkracescoreRankText", TextFieldConst.FONTSIZE_CONTENT_COMMON);
        this.scoreRankText.text = ""; //LanguageManager.getlocal("atkracescoreRankText",["6789"])
        this.scoreRankText.x = this.menkeText.x;
        this.scoreRankText.y = this.menkeText.y + 30;
        this.addChild(this.scoreRankText);
    };
    //查询
    AcGroupWifeBattleVisitViewTab3.prototype.queryBtnHandler = function (evt) {
        var str = LanguageManager.getlocal("inputPlayerId");
        if (this._userIdtxt.length <= 0 || this._userIdtxt == str) {
            var str = LanguageManager.getlocal("atkraceErrordes2");
            App.CommonUtil.showTip(str);
            this.refreshView();
            return;
        }
        if (this._userIdtxt.length < 7) {
            var str = LanguageManager.getlocal("atkraceErrordes1");
            App.CommonUtil.showTip(str);
            this.refreshView();
        }
        else {
            NetManager.request(NetRequestConst.REQUST_ACTIVITY_BATTLEGROUND_GETINFO, {
                fuid: this._userIdtxt,
                activeId: this.acTivityId
            });
            App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUST_ACTIVITY_BATTLEGROUND_GETINFO), this.useCallback, this);
        }
    };
    AcGroupWifeBattleVisitViewTab3.prototype.useCallback = function (evt) {
        if (evt.data.ret == false) {
            return;
        }
        var data = evt.data.data.data;
        if (data) {
            if (data.bgstats) {
                App.CommonUtil.showTip(LanguageManager.getlocal("acGroupWifeBattleBgStasTip" + data.bgstats + "-" + this.getUiCode()));
                this.refreshView();
                return;
            }
            if (data.atkraceinfo) {
                var atkraceinfo = data.atkraceinfo;
                var str = LanguageManager.getlocal("officialTitle" + atkraceinfo.level);
                if (this.numLb && this.numLb.parent) {
                    this.removeChild(this.numLb);
                    this.numLb = null;
                }
                if (this.numLb == null) {
                    this.numLb = ComponentManager.getBitmapText(str + "", "office_fnt", 0xfff000);
                    if (!PlatformManager.checkIsTextHorizontal())
                        this.numLb.width = 35;
                    if (PlatformManager.checkIsEnLang()) {
                        this.numLb.setScale(0.8);
                    }
                    this.numLb.height = 102; //this.officialRankbottom.height;
                    this.numLb.x = 108; //this.officialRankbottom.x+3;
                    this.numLb.y = 270; //this.officialRankbottom.y;
                    this.addChild(this.numLb);
                }
                if (this.officialRankbottom) {
                    this.officialRankbottom.visible = true;
                }
                if (this.bottomNameImag) {
                    this.bottomNameImag.visible = true;
                }
                if (Api.playerVoApi.getPlayerID() == Number(this._userIdtxt) || atkraceinfo.iscankill == 0) {
                    this.killBtn.visible = false;
                }
                else {
                    this.killBtn.visible = true;
                }
                this.nameText.visible = true;
                if (this.powerText) {
                    this.powerText.visible = true;
                }
                if (this.menkeText) {
                    this.menkeText.visible = true;
                }
                if (this.yamunText) {
                    this.yamunText.visible = true;
                }
                if (this.scoreRankText) {
                    this.scoreRankText.visible = true;
                }
                if (this.playerContainer && this.playerContainer.parent) {
                    this.playerContainer.mask = null;
                    this.playerContainer.parent.removeChild(this.playerContainer);
                    this.playerContainer = null;
                }
                if (this.bgImag2) {
                    this.removeChild(this.bgImag2);
                    this.bgImag2 = null;
                }
                if (this.playerContainer == null) {
                    var tinfo = App.CommonUtil.getTitleData(atkraceinfo.title);
                    var curLv = atkraceinfo.level;
                    var posX = 20;
                    if (tinfo.clothes != "") {
                        if (!Config.TitleCfg.getIsTitleOnly(tinfo.clothes)) {
                            curLv = tinfo.clothes;
                            var isnew_1 = Api.playerVoApi.getNewPalaceRole(curLv);
                            posX = isnew_1 ? -160 : -10;
                        }
                    }
                    var userContainer = null;
                    var isnew = Api.playerVoApi.getNewPalaceRole(curLv);
                    this.playerContainer = Api.playerVoApi.getPlayerPortrait(curLv, atkraceinfo.pic);
                    this.playerContainer.x = 110 + GameData.popupviewOffsetX;
                    this.playerContainer.y = 220;
                    this.addChild(this.playerContainer);
                    this.setChildIndex(this.playerContainer, this.getChildIndex(this.blackBgRect) - 1);
                    this.bgImag2 = BaseBitmap.create("atkraceVisitbg");
                    this.bgImag2.x = 35;
                    this.bgImag2.y = 210;
                    this.addChild(this.bgImag2);
                    this.playerContainer.mask = this.bgImag2;
                }
                this.nameText.text = atkraceinfo.name;
                if (this.scoreRankText) {
                    this.scoreRankText.text = LanguageManager.getlocal("atkracescoreRankText", [(atkraceinfo.rank) ? atkraceinfo.rank : 0]);
                }
                if (this.menkeText) {
                    this.menkeText.text = LanguageManager.getlocal("atkracemenkeText", [atkraceinfo.snum]);
                }
                if (this.yamunText) {
                    this.yamunText.text = LanguageManager.getlocal("atkraceyamunText", [atkraceinfo.point]);
                }
                if (this.powerText) {
                    this.powerText.text = LanguageManager.getlocal("atkracepowerText", [atkraceinfo.power]);
                }
            }
        }
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUST_ACTIVITY_BATTLEGROUND_GETINFO), this.useCallback, this);
    };
    //追杀
    AcGroupWifeBattleVisitViewTab3.prototype.killBtnHandler = function (evt) {
        if (this.vo.getCurperiod() == 1) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acBattleRoundNotStart-" + this.getUiCode() + "}"));
            return;
        }
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
            App.CommonUtil.showTip(LanguageManager.getlocal("acGroupWifeBattleTip4-" + this.getUiCode()));
            return;
        }
        if (this._userIdtxt.length < 7) {
            var str = LanguageManager.getlocal("atkraceErrordes3");
            App.CommonUtil.showTip(str);
        }
        else {
            NetManager.request(NetRequestConst.REQUST_ACTIVITY_GROUPWIFEBATTLE_CHALLENGE, { activeId: this.vo.aidAndCode, fuid: this._userIdtxt });
        }
    };
    AcGroupWifeBattleVisitViewTab3.prototype.refreshView = function () {
        this.officialRankbottom.visible = false;
        this.bottomNameImag.visible = false;
        this.killBtn.visible = false;
        if (this.nameText) {
            this.nameText.visible = false;
        }
        if (this.powerText) {
            this.powerText.visible = false;
        }
        if (this.menkeText) {
            this.menkeText.visible = false;
        }
        if (this.yamunText) {
            this.yamunText.visible = false;
        }
        if (this.scoreRankText) {
            this.scoreRankText.visible = false;
        }
        if (this.numLb) {
            this.numLb.visible = false;
        }
        if (this.playerContainer) {
            this.playerContainer.visible = false;
        }
    };
    AcGroupWifeBattleVisitViewTab3.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUST_ACTIVITY_BATTLEGROUND_GETINFO), this.useCallback, this);
        this.userIdInput.removeEventListener(egret.FocusEvent.FOCUS_IN, this.foucusHandler, this);
        this.officialRankbottom = null;
        this.bottomNameImag = null;
        this.powerText = null;
        this.menkeText = null;
        this.yamunText = null;
        this.scoreRankText = null;
        this.blackBgRect = null;
        this.bgImag2 = null;
        this.numLb = null;
        this._userIdtxt = "";
        this.bg = null;
        this.playerContainer.mask = null;
        _super.prototype.dispose.call(this);
    };
    return AcGroupWifeBattleVisitViewTab3;
}(CommonViewTab));
//# sourceMappingURL=AcGroupWifeBattleVisitViewTab3.js.map