/*
author : yanyuling
desc : 周年庆 总览
*/
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
var AcOneYearOverviewView = (function (_super) {
    __extends(AcOneYearOverviewView, _super);
    function AcOneYearOverviewView() {
        var _this = _super.call(this) || this;
        _this._collectTxtList = [];
        return _this;
    }
    AcOneYearOverviewView.prototype.initView = function () {
        var titletxt = BaseBitmap.create("oneyearoverview_txt");
        titletxt.x = GameConfig.stageWidth / 2 - titletxt.width / 2;
        this.addChild(titletxt);
        //顶部背景图片
        var forpeople_top = BaseBitmap.create('oneyearoverview_topbg2');
        this.addChildToContainer(forpeople_top);
        forpeople_top.y = 70;
        var bottomBg = BaseBitmap.create("oneyearoverview_bottom");
        bottomBg.y = GameConfig.stageHeigth - this.container.y - bottomBg.height;
        var _scrollContiner = new BaseDisplayObjectContainer();
        _scrollContiner.width = GameConfig.stageWidth;
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, GameConfig.stageWidth, bottomBg.y - forpeople_top.y - forpeople_top.height + 80);
        var startY = 0;
        var startIdx = 0;
        var Overview = this.cfg.Overview;
        Overview.sort(function (dataA, dataB) {
            return dataA.sortID - dataB.sortID;
        });
        var len = Overview.length;
        for (var index = 0; index < len; index++) {
            var accfg = Overview[index];
            var textColor = TextFieldConst.COLOR_LIGHT_YELLOW;
            var isLeft = (index % 2 == 0);
            if (accfg.aid == "examAnswer") {
                textColor = TextFieldConst.COLOR_BLACK;
            }
            if (accfg.aid == "lantern") {
                textColor = TextFieldConst.COLOR_WARN_RED2;
            }
            var card = new OneyearOverviewCard();
            card.init(accfg, this.aid, this.code, textColor, isLeft);
            if (isLeft) {
                card.x = 0;
            }
            else {
                card.x = GameConfig.stageWidth - card.width;
            }
            card.y = startY;
            _scrollContiner.addChild(card);
            this._collectTxtList["" + accfg.sortID] = card;
            startY += card.height / 2 + 5;
        }
        var flower1 = BaseBitmap.create("oneyearoverview_flower");
        flower1.x = GameConfig.stageWidth / 2 - 10;
        flower1.y = 15;
        _scrollContiner.addChildAt(flower1, 0);
        var flower2 = BaseBitmap.create("oneyearoverview_flower");
        flower2.x = flower1.x;
        flower2.y = _scrollContiner.height - flower1.y;
        flower2.scaleY = -1;
        _scrollContiner.addChildAt(flower2, 0);
        var _scrollView = ComponentManager.getScrollView(_scrollContiner, rect);
        _scrollView.x = 0;
        _scrollView.y = forpeople_top.y + forpeople_top.height + 0;
        _scrollView.horizontalScrollPolicy = "off";
        this.addChildToContainer(_scrollView);
        this.addChildToContainer(bottomBg);
        var oneyearoverview_bg2 = BaseBitmap.create("oneyearoverview_bg2");
        oneyearoverview_bg2.y = 60;
        this.addChild(oneyearoverview_bg2);
        this.checkSinReward();
    };
    AcOneYearOverviewView.prototype.checkSinReward = function () {
        var signvo = Api.acVoApi.getActivityVoByAidAndCode("oneYearSign");
        if (signvo && signvo.isShowRedDot) {
            ViewController.getInstance().openView("AcOneYearSignView", signvo.code);
        }
    };
    Object.defineProperty(AcOneYearOverviewView.prototype, "cfg", {
        get: function () {
            return this.acVo.config;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcOneYearOverviewView.prototype, "vo", {
        get: function () {
            return this.acVo;
        },
        enumerable: true,
        configurable: true
    });
    AcOneYearOverviewView.prototype.getRequestData = function () {
        return { requestType: NetRequestConst.REQUST_ACTIVITY_YEAR_OVERVIEW, requestData: { activeId: this.vo.aidAndCode } };
    };
    AcOneYearOverviewView.prototype.receiveData = function (data) {
    };
    AcOneYearOverviewView.prototype.isShowTitleBgShadow = function () {
        return false;
    };
    AcOneYearOverviewView.prototype.getBgName = function () {
        return "oneyearoverview_bg";
    };
    AcOneYearOverviewView.prototype.getTitleBgName = function () {
        return "oneyearoverview_topbg1";
    };
    AcOneYearOverviewView.prototype.getTitleStr = function () {
        return null;
    };
    AcOneYearOverviewView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "oneyearoverview_topbg2", "oneyear_flag",
            // "oneyearoverview_acransackTraitorSP_icon", "oneyearoverview_acarcade_icon", "oneyearoverview_aclantern_icon",
            // "oneyearoverview_acnewYear_icon", "oneyearoverview_aconeYearPack_icon","oneyearoverview_aconeYearRank_icon",
            // "oneyearoverview_acrechargeBoxSP_icon","oneyearoverview_aconeYearSign_icon","oneyearoverview_acexamAnswer_icon",
            "oneyearoverview_bg", "oneyearoverview_blackbg", "oneyearoverview_bottom",
            "oneyearoverview_flag1", "oneyearoverview_flag2", "oneyearoverview_flower", "oneyearoverview_topbg1", "oneyearoverview_txt",
            "oneyearoverview_bg2", "oneyearoverview_txtbg",
        ]);
    };
    AcOneYearOverviewView.prototype.dispose = function () {
        this._collectTxtList = [];
        _super.prototype.dispose.call(this);
    };
    return AcOneYearOverviewView;
}(AcCommonView));
__reflect(AcOneYearOverviewView.prototype, "AcOneYearOverviewView");
var OneyearOverviewCard = (function (_super) {
    __extends(OneyearOverviewCard, _super);
    function OneyearOverviewCard() {
        var _this = _super.call(this) || this;
        _this.aid = undefined;
        _this.code = undefined;
        _this._vo = undefined;
        _this._accfg = undefined;
        _this._oriTextcolor = 0;
        _this._lightClip = undefined;
        return _this;
    }
    OneyearOverviewCard.prototype.init = function (accfg, aid, code, textColor, isLeft) {
        if (isLeft === void 0) { isLeft = true; }
        this._accfg = accfg;
        this.aid = aid;
        this.code = "" + code;
        this._vo = Api.acVoApi.getActivityVoByAidAndCode(this.aid, "" + this.code);
        this._oriTextcolor = textColor;
        var blackbg = BaseBitmap.create("oneyearoverview_blackbg");
        var rewardbg = BaseLoadBitmap.create("oneyearoverview_ac" + this._accfg.aid + "_icon");
        rewardbg.width = 326;
        rewardbg.height = 123;
        var txt1 = ComponentManager.getTextField(LanguageManager.getlocal("acOneYear_overview_txt1"), 18, TextFieldConst.COLOR_WARN_RED2);
        var txt2 = ComponentManager.getTextField(LanguageManager.getlocal("acOneYear_overview_txt2"), 18, TextFieldConst.COLOR_WARN_RED2);
        blackbg.x = blackbg.y = 0;
        var txtbg = BaseBitmap.create("oneyearoverview_txtbg");
        txtbg.width = 300;
        var acfvo = this._vo.activeinfo[this._accfg.aid + "-" + this._accfg.code];
        if (acfvo) {
            txt2.text = App.DateUtil.getOpenLocalTime(acfvo.st, acfvo.et, true);
            if (this._accfg.aid == "arcade" || this._accfg.aid == "newYear") {
                //策划要启用有展示期的活动，外部时间自行减一天
                txt2.text = App.DateUtil.getOpenLocalTime(acfvo.st, acfvo.et - 86400, true);
            }
        }
        else {
            txt2.text = "";
            txt1.text = "";
        }
        if (isLeft) {
            txt1.x = blackbg.x + blackbg.width - txt1.width - 40;
            txt2.x = txt1.x + txt1.width - txt2.width;
            txtbg.scaleX = -1;
            txtbg.x = blackbg.x + blackbg.width - 20;
        }
        else {
            txt1.x = blackbg.x + 40;
            txt2.x = txt1.x;
            txtbg.x = blackbg.x + 20;
        }
        txt2.textColor = txt1.textColor = textColor;
        txt1.y = blackbg.y + 58;
        rewardbg.x = blackbg.x;
        rewardbg.y = blackbg.y;
        txt2.y = txt1.y + txt1.height + 5;
        txtbg.y = txt2.y - 5;
        this.addChild(rewardbg);
        this.addChild(txtbg);
        this.addChild(txt1);
        this.addChild(txt2);
        this.addChild(blackbg);
        // blackbg.visible = false;
        var flag = BaseBitmap.create("oneyearoverview_flag1");
        flag.setScale(0.8);
        flag.y = rewardbg.y + 3;
        flag.x = rewardbg.x - 5;
        flag.name = "flag";
        this.addChild(flag);
        this["flag"] = flag;
        // flag.visible = !acfvo;
        this.width = blackbg.width;
        this.height = blackbg.height;
        rewardbg.touchEnabled = true;
        // rewardbg.addTouchTap(this.activitydHandler,this);
        this["blackbg"] = blackbg;
        this["rewardbg"] = rewardbg;
        this["txt1"] = txt1;
        this["txt2"] = txt2;
        this["txtbg"] = txtbg;
        if (this.isAidShieldByIp()) {
            txt1.text = "";
            txt2.text = "";
            txtbg.visible = false;
        }
        else {
            rewardbg.addTouchTap(this.activitydHandler, this);
        }
        TickManager.addTick(this.tick, this);
        this.refreshActiStat();
    };
    OneyearOverviewCard.prototype.isAidShieldByIp = function () {
        return this._vo.isAidShieldByIp(this._accfg.aid);
    };
    OneyearOverviewCard.prototype.refreshActiStat = function () {
        var acfvo = this._vo.activeinfo[this._accfg.aid + "-" + this._accfg.code];
        if (!acfvo) {
            this["txtbg"].visible = false;
            return;
        }
        var tmp_vo = Api.acVoApi.getActivityVoByAidAndCode(this._accfg.aid, "" + this._accfg.code);
        if (tmp_vo && tmp_vo.isShowRedDot && tmp_vo.isStart && !this.isAidShieldByIp()) {
            App.CommonUtil.addIconToBDOC(this, null, false, -17, 0);
        }
        else {
            App.CommonUtil.removeIconFromBDOC(this);
        }
        if (this.isAidShieldByIp()) {
            return;
        }
        this["blackbg"].visible = false;
        if (GameData.serverTime < acfvo.st) {
            this["flag"].visible = true;
            this["flag"].texture = ResourceManager.getRes("oneyearoverview_flag1");
            if (this._lightClip) {
                this.removeChild(this._lightClip);
                this._lightClip = null;
            }
        }
        else if (GameData.serverTime > acfvo.et) {
            if (this._lightClip) {
                this.removeChild(this._lightClip);
                this._lightClip = null;
            }
            this["blackbg"].visible = true;
            this["flag"].visible = true;
            this["flag"].texture = ResourceManager.getRes("oneyearoverview_flag2");
            App.DisplayUtil.changeToGray(this["blackbg"]);
            App.DisplayUtil.changeToGray(this["rewardbg"]);
            App.DisplayUtil.changeToGray(this["txt1"]);
            App.DisplayUtil.changeToGray(this["txt2"]);
            // this["txt1"].textColor = this["txt2"].textColor = TextFieldConst.COLOR_QUALITY_GRAY;
        }
        else {
            this["flag"].visible = false;
            App.DisplayUtil.changeToNormal(this["blackbg"]);
            App.DisplayUtil.changeToNormal(this["rewardbg"]);
            App.DisplayUtil.changeToNormal(this["txt1"]);
            App.DisplayUtil.changeToNormal(this["txt2"]);
            if (!this._lightClip) {
                // this["txt1"].textColor = this["txt2"].textColor =  this._oriTextcolor;
                this._lightClip = ComponentManager.getCustomMovieClip("oneyearover_ani", 8, 100);
                var deltaS2 = 2;
                this._lightClip.width = 168 * deltaS2;
                this._lightClip.height = 61 * deltaS2;
                this._lightClip.anchorOffsetY = this._lightClip.height / 2;
                this._lightClip.anchorOffsetX = this._lightClip.width / 2;
                this._lightClip.blendMode = egret.BlendMode.ADD;
                this._lightClip.x = this["rewardbg"].x + this["rewardbg"].width / 2;
                this._lightClip.y = this["rewardbg"].y + this["rewardbg"].height / 2 - 5;
                this.addChild(this._lightClip);
                this._lightClip.playWithTime(0);
            }
        }
    };
    OneyearOverviewCard.prototype.tick = function () {
        this.refreshActiStat();
        return false;
    };
    OneyearOverviewCard.prototype.activitydHandler = function (event, cfg) {
        var acfvo = this._vo.activeinfo[this._accfg.aid + "-" + this._accfg.code];
        if (!acfvo) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acOneYear_overview_txt2"));
            return;
        }
        if (PlatformManager.checkHideIconByIP() && (this._accfg.aid == "rechargeBoxSP" || this._accfg.aid == "lantern" || this._accfg.aid == "ransackTraitorSP")) {
            return;
        }
        if (acfvo.st > GameData.serverTime) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acOneYear_overview_txt3"));
            return;
        }
        if (acfvo.et < GameData.serverTime) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acOneYear_overview_txt4"));
            return;
        }
        var vo = Api.acVoApi.getActivityVoByAidAndCode(acfvo.aid, "" + acfvo.code);
        var viewClassName = "Ac" + App.StringUtil.firstCharToUper(acfvo.aid) + "View";
        if (vo && vo.isStart && viewClassName) {
            ViewController.getInstance().openView(viewClassName, acfvo.code);
        }
        else {
            App.CommonUtil.showTip(LanguageManager.getlocal("acOneYear_overview_txt2"));
        }
    };
    OneyearOverviewCard.prototype.dispose = function () {
        this.aid = null;
        this.code = null;
        this._accfg = null;
        this._vo = null;
        this._oriTextcolor = null;
        this["blackbg"] = null;
        this["rewardbg"] = null;
        this["txt1"] = null;
        this["txt2"] = null;
        this["txtbg"] = null;
        TickManager.removeTick(this.tick, this);
        this._lightClip = null;
        _super.prototype.dispose.call(this);
    };
    return OneyearOverviewCard;
}(BaseDisplayObjectContainer));
__reflect(OneyearOverviewCard.prototype, "OneyearOverviewCard");
