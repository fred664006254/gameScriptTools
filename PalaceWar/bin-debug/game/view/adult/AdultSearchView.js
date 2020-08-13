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
/**
 * 查找玩家
 */
var AdultSearchView = (function (_super) {
    __extends(AdultSearchView, _super);
    function AdultSearchView() {
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
        _this._bottomGroup = null;
        return _this;
    }
    Object.defineProperty(AdultSearchView.prototype, "api", {
        get: function () {
            return Api.promoteVoApi;
        },
        enumerable: true,
        configurable: true
    });
    AdultSearchView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "atkraceVisitbg", "atkracevipbg",
        ]);
    };
    AdultSearchView.prototype.getTitleStr = function () {
        return 'adultMarryOne';
    };
    AdultSearchView.prototype.initView = function () {
        var view = this;
        view.viewBg.width = 610;
        view.viewBg.height = 800;
        view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, view.viewBg, view);
        view.setLayoutPosition(LayoutConst.horizontalCentertop, view.titleTF, view.viewBg, [0, 12]);
        var bg = BaseBitmap.create("public_9_bg4");
        bg.width = view.viewBg.width - 40 - GameData.popupviewOffsetX * 2;
        bg.height = 580;
        view.setLayoutPosition(LayoutConst.horizontalCentertop, bg, view.viewBg, [0, 70]);
        view.addChild(bg);
        // let bg : BaseBitmap = BaseBitmap.create("public_9_bg43");
        // bg.width = kuang.width - 10;
        // bg.height = kuang.height - 10;
        // view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, bg, kuang);
        // view.addChild(bg);
        //文字:追杀对象
        var killText = ComponentManager.getTextField(LanguageManager.getlocal("adultyinyuanrecordTitle2"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        view.setLayoutPosition(LayoutConst.lefttop, killText, bg, [15, 10]);
        view.addChild(killText);
        //查询输入框的底图
        var bg1 = BaseBitmap.create("public_9_bg5");
        bg1.width = 346;
        bg1.height = 44;
        view.setLayoutPosition(LayoutConst.lefttop, bg1, killText, [0, killText.textHeight + 10]);
        view.addChild(bg1);
        //输入文本
        var userIdInput = new BaseTextField();
        userIdInput.type = egret.TextFieldType.INPUT;
        userIdInput.width = bg1.width;
        userIdInput.height = bg1.height;
        userIdInput.maxChars = 11;
        userIdInput.textAlign = egret.HorizontalAlign.CENTER;
        userIdInput.verticalAlign = egret.VerticalAlign.MIDDLE;
        userIdInput.restrict = "0-9";
        userIdInput.text = LanguageManager.getlocal("inputPlayerId");
        userIdInput.size = 24;
        view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, userIdInput, bg1);
        view.addChild(userIdInput);
        view.userIdInput = userIdInput;
        view.userIdInput.addEventListener(egret.TextEvent.CHANGE, view.callbackInput, view, false, 2);
        view.userIdInput.addEventListener(egret.FocusEvent.FOCUS_IN, view.foucusHandler, view);
        view._userIdtxt = userIdInput.text;
        //查询按钮
        var queryBtn = ComponentManager.getButton(ButtonConst.BTN_BIG_YELLOW, "find", this.queryBtnHandler, this);
        queryBtn.setScale(0.85);
        view.setLayoutPosition(LayoutConst.leftverticalCenter, queryBtn, bg1, [bg1.width + 3, 0]);
        view.addChild(queryBtn);
        //文字:对方信息
        var otherPartyText = ComponentManager.getTextField(LanguageManager.getlocal("atkraceotherPartyText"), TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        view.setLayoutPosition(LayoutConst.lefttop, otherPartyText, bg1, [0, bg1.height + 20]);
        view.addChild(otherPartyText);
        var bgImag = BaseBitmap.create("atkraceVisitbg");
        bgImag.scaleX = 1;
        bgImag.scaleY = 1.2;
        view.setLayoutPosition(LayoutConst.horizontalCentertop, bgImag, bg, [0, otherPartyText.y + otherPartyText.textHeight + 10 - bg.y]);
        view.addChild(bgImag);
        view._bottomGroup = new BaseDisplayObjectContainer();
        view._bottomGroup.width = bgImag.width * 1.1;
        view._bottomGroup.height = bgImag.height * 1.2;
        view.setLayoutPosition(LayoutConst.lefttop, view._bottomGroup, bgImag);
        view.addChild(view._bottomGroup);
        var group = view._bottomGroup;
        var playerContainer = new BaseDisplayObjectContainer();
        group.addChild(playerContainer);
        playerContainer.x = -GameData.popupviewOffsetX;
        view.playerContainer = playerContainer;
        //官衔背景图
        var officialRankbottom = BaseBitmap.create("atkracevipbg");
        view.setLayoutPosition(LayoutConst.lefttop, officialRankbottom, view._bottomGroup, [70, 50], true);
        group.addChild(officialRankbottom);
        view.officialRankbottom = officialRankbottom;
        if (PlatformManager.checkIsTextHorizontal()) {
            view.officialRankbottom.y += view.officialRankbottom.height / 2;
        }
        //黑色长条背景
        var blackBgRect = BaseBitmap.create("public_9_bg20");
        blackBgRect.width = 490 - GameData.popupviewOffsetX * 2;
        blackBgRect.height = 80;
        view.setLayoutPosition(LayoutConst.horizontalCenterbottom, blackBgRect, view._bottomGroup, [-GameData.popupviewOffsetX, 10], true);
        group.addChild(blackBgRect);
        view.blackBgRect = blackBgRect;
        view.showText();
        //人物名字底图
        var bottomNameImag = BaseBitmap.create("public_resnumbg");
        bottomNameImag.height = 50;
        view.setLayoutPosition(LayoutConst.horizontalCenterbottom, bottomNameImag, blackBgRect, [0, blackBgRect.height + 10]);
        group.addChild(bottomNameImag);
        view.bottomNameImag = bottomNameImag;
        //人物名字
        var nameText = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        view.nameText = nameText;
        group.addChild(nameText);
        group.visible = false;
        //追杀按钮
        var killBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "adultrequestlyin", view.appointConfirm, view);
        view.setLayoutPosition(LayoutConst.horizontalCenterbottom, killBtn, view.viewBg, [0, 60]);
        view.addChild(killBtn);
        killBtn.visible = false;
        view.killBtn = killBtn;
    };
    AdultSearchView.prototype.callbackInput = function (event) {
        this._userIdtxt = event.target.text;
        App.LogUtil.log("event.target.text:" + event.target.text);
    };
    AdultSearchView.prototype.foucusHandler = function (event) {
        var str = LanguageManager.getlocal("inputPlayerId");
        if (this._userIdtxt == str) {
            this.userIdInput.text = "";
            // this._userId="";
        }
    };
    AdultSearchView.prototype.getBgExtraHeight = function () {
        return 0;
    };
    AdultSearchView.prototype.showText = function () {
        var view = this;
        var group = view._bottomGroup;
        //势力    
        view.powerText = ComponentManager.getTextField("atkracepowerText", TextFieldConst.FONTSIZE_CONTENT_COMMON);
        view.powerText.text = "";
        group.addChild(this.powerText);
        //门客数量    
        view.menkeText = ComponentManager.getTextField("atkracemenkeText", TextFieldConst.FONTSIZE_CONTENT_COMMON);
        view.menkeText.text = "";
        group.addChild(this.menkeText);
        //衙门分数    
        view.yamunText = ComponentManager.getTextField("atkraceyamunText", TextFieldConst.FONTSIZE_CONTENT_COMMON);
        view.yamunText.text = "";
        group.addChild(this.yamunText);
        //分数排行    
        view.scoreRankText = ComponentManager.getTextField("atkracescoreRankText", TextFieldConst.FONTSIZE_CONTENT_COMMON);
        view.scoreRankText.text = "";
        group.addChild(this.scoreRankText);
    };
    //查询
    AdultSearchView.prototype.queryBtnHandler = function (evt) {
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
            NetManager.request(NetRequestConst.REQUEST_RANKG_USERSHOT, { ruid: this._userIdtxt, rzid: ServerCfg.selectServer.zid });
            // etManager.request(NetRequestConst.REQUEST_ATKRACE_GETINFO, {"fuid" : this._userIdtxt});
            App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RANKG_USERSHOT), this.useCallback, this);
        }
    };
    AdultSearchView.prototype.useCallback = function (data) {
        var view = this;
        if (data.data.data.ret == -3) {
            var str = LanguageManager.getlocal("atkraceErrordes3");
            App.CommonUtil.showTip(str);
            view.refreshView();
        }
        else if (data.data.data.data) {
            var selfZid = Api.mergeServerVoApi.getTrueZid();
            var targetZid = Api.mergeServerVoApi.getTrueZid(data.data.data.data.ruid);
            if (Api.mergeServerVoApi.judgeIsSameServer(selfZid, targetZid) == false) {
                var str = LanguageManager.getlocal("atkraceErrordes3");
                App.CommonUtil.showTip(str);
                view.refreshView();
                return;
            }
            if (view.numLb) {
                view.numLb.dispose();
                view.numLb = null;
            }
            if (view.playerContainer) {
                view.playerContainer.dispose();
                view.playerContainer = null;
            }
            if (view.bgImag2) {
                view.bgImag2.dispose();
                view.bgImag2 = null;
            }
            var atkraceinfo = data.data.data.data;
            this._info = atkraceinfo;
            var str = LanguageManager.getlocal("officialTitle" + atkraceinfo.level);
            var numLb = ComponentManager.getBitmapText(str + "", "office_fnt", 0xfff000);
            if (PlatformManager.checkIsTextHorizontal()) {
                view.officialRankbottom.rotation = -90;
                var scaleVale = 1;
                if (PlatformManager.checkIsEnSp()) {
                    scaleVale = 0.8;
                    numLb.setScale(scaleVale);
                }
                numLb.setPosition(view.officialRankbottom.x + view.officialRankbottom.height / 2 - numLb.width / 2 * scaleVale, view.officialRankbottom.y + view.officialRankbottom.width / 2 - view.officialRankbottom.height / 2);
            }
            else {
                numLb.width = 35;
                numLb.height = view.officialRankbottom.height;
                numLb.setScale(0.8);
                view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, numLb, view.officialRankbottom);
            }
            view._bottomGroup.addChild(numLb);
            view.numLb = numLb;
            //已经是分封大臣
            view.killBtn.visible = true;
            view._bottomGroup.visible = true;
            var tinfo = App.CommonUtil.getTitleData(atkraceinfo.title);
            var curLv = atkraceinfo.level;
            var posX = 20;
            if (tinfo.clothes != "") {
                if (!Config.TitleCfg.getIsTitleOnly(tinfo.clothes)) {
                    curLv = tinfo.clothes;
                    var isnew = Api.playerVoApi.getNewPalaceRole(curLv);
                    posX = isnew ? -160 : -10;
                }
            }
            view.playerContainer = Api.playerVoApi.getPlayerPortrait(curLv, atkraceinfo.pic);
            view.setLayoutPosition(LayoutConst.horizontalCentertop, view.playerContainer, view._bottomGroup, [0, 100], true);
            view._bottomGroup.addChild(this.playerContainer);
            view._bottomGroup.setChildIndex(this.playerContainer, view._bottomGroup.getChildIndex(this.blackBgRect) - 1);
            view.bgImag2 = BaseBitmap.create("atkraceVisitbg");
            view.bgImag2.setScale(1.2);
            view.bgImag2.height -= 10;
            view.setLayoutPosition(LayoutConst.horizontalCentertop, view.playerContainer, view._bottomGroup, [-GameData.popupviewOffsetX, 0], true);
            view._bottomGroup.addChild(view.bgImag2);
            view.playerContainer.mask = view.bgImag2;
            view.nameText.text = atkraceinfo.name;
            view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, view.nameText, view.bottomNameImag);
            var desc = (view.blackBgRect.height - 22 * 2) / 3;
            if (view.powerText) {
                view.powerText.text = LanguageManager.getlocal("atkracepowerText", [atkraceinfo.power]);
                view.setLayoutPosition(LayoutConst.lefttop, view.powerText, view.blackBgRect, [50, desc]);
            }
            if (view.menkeText) {
                view.menkeText.text = LanguageManager.getlocal("chatblockAlliance2", [atkraceinfo.gname == '' ? LanguageManager.getlocal('nothing') : atkraceinfo.gname]);
                view.setLayoutPosition(LayoutConst.righttop, view.menkeText, view.blackBgRect, [50, desc]);
            }
            if (view.yamunText) {
                view.yamunText.text = LanguageManager.getlocal("adultfeizinum", [atkraceinfo.wifenum]);
                view.setLayoutPosition(LayoutConst.lefttop, view.yamunText, view.powerText, [0, view.powerText.textHeight + desc]);
            }
            if (view.scoreRankText) {
                view.scoreRankText.text = LanguageManager.getlocal("adultchildnum", ["" + atkraceinfo.childnum]);
                view.setLayoutPosition(LayoutConst.lefttop, view.scoreRankText, view.menkeText, [0, view.menkeText.textHeight + desc]);
            }
        }
    };
    //分封
    AdultSearchView.prototype.appointConfirm = function () {
        var view = this;
        if (Number(view._userIdtxt) == Api.playerVoApi.getPlayerID()) {
            App.CommonUtil.showTip(LanguageManager.getlocal("adultMarryRequestTip3"));
            return;
        }
        this.param.data.confirmCallback.apply(this.param.data.handler, [view._userIdtxt]);
    };
    AdultSearchView.prototype.refreshView = function () {
        var view = this;
        view.userIdInput.text = LanguageManager.getlocal("inputPlayerId");
        view._userIdtxt = view.userIdInput.text;
        view.killBtn.visible = view._bottomGroup.visible = false;
    };
    AdultSearchView.prototype.refreshWhenSwitchBack = function () {
        var view = this;
        view.refreshView();
    };
    AdultSearchView.prototype.dispose = function () {
        var view = this;
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RANKG_USERSHOT), this.useCallback, this);
        view.userIdInput.removeEventListener(egret.TextEvent.CHANGE, view.callbackInput, view);
        view.userIdInput.removeEventListener(egret.FocusEvent.FOCUS_IN, view.foucusHandler, view);
        view.officialRankbottom.visible = false;
        view.bottomNameImag.visible = false;
        view.bottomNameImag = null;
        view.powerText = null;
        view.menkeText = null;
        view.yamunText = null;
        view.nameText = null;
        view.scoreRankText = null;
        view.bg = null;
        view.blackBgRect = null;
        view.bgImag2 = null;
        view.numLb = null;
        view._userIdtxt = "";
        view.userIdInput = null;
        view.officialRankbottom = null;
        view.killBtn = null;
        view.numLb = null;
        view._userIdtxt = '';
        view.playerContainer = null;
        view._bottomGroup.visible = false;
        view._bottomGroup = null;
        _super.prototype.dispose.call(this);
    };
    return AdultSearchView;
}(PopupView));
__reflect(AdultSearchView.prototype, "AdultSearchView");
//# sourceMappingURL=AdultSearchView.js.map