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
var AcSingleDayBuild1ViewTab4 = (function (_super) {
    __extends(AcSingleDayBuild1ViewTab4, _super);
    function AcSingleDayBuild1ViewTab4(param) {
        var _this = _super.call(this) || this;
        _this._scrollList = null;
        _this._timeTxt = null;
        _this._myRank = null;
        _this._rankData = null;
        _this._suffix = null;
        _this.param = param;
        _this.init();
        _this.initView();
        return _this;
    }
    AcSingleDayBuild1ViewTab4.prototype.init = function () {
        var code = this.param.data.code;
        if (Number(code) <= 4) {
            this._suffix = "1"; //;
        }
        else {
            this._suffix = code;
        }
        _super.prototype.init.call(this);
    };
    Object.defineProperty(AcSingleDayBuild1ViewTab4.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid, this.param.data.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcSingleDayBuild1ViewTab4.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcSingleDayBuild1ViewTab4.prototype, "acTivityId", {
        get: function () {
            return this.param.data.aid + "-" + this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    AcSingleDayBuild1ViewTab4.prototype.initView = function () {
        var view = this;
        view.height = GameConfig.stageHeigth - view.y - 110;
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreashView, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQYEST_ACTIVITY_GET_SINGLE_DAY_RANK, this.refreashView, this);
        var gemRankData = this.vo.getArr('gemRank');
        var bg = BaseBitmap.create("public_9v_bg03");
        bg.width = GameConfig.stageWidth;
        bg.height = GameConfig.stageHeigth - this.getViewTitleButtomY() - 120;
        this.addChild(bg);
        var topRes = "acsingleday_rankbg";
        if (this.param.data.code == "2" || this.param.data.code == "3" || this.param.data.code == "4") {
            topRes = "acsingleday_rankbg2";
        }
        var topBg = BaseLoadBitmap.create(topRes);
        // 626 × 286
        topBg.width = 626;
        topBg.height = 286;
        topBg.setPosition(bg.x + bg.width / 2 - topBg.width / 2, bg.y);
        this.addChild(topBg);
        var ruleTxt = ComponentManager.getTextField(LanguageManager.getlocal("acSingleDayBuild1ViewTab4Rule_" + this.param.data.code), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        ruleTxt.width = 255;
        ruleTxt.lineSpacing = 5;
        ruleTxt.setPosition(topBg.x + 355, topBg.y + 25);
        this.addChild(ruleTxt);
        var rankBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "acSingleDayBuild1ViewTab4Rank", this.rankClick, this);
        rankBtn.setPosition(ruleTxt.x + 35, ruleTxt.y + 180);
        this.addChild(rankBtn);
        this._myRank = ComponentManager.getTextField(LanguageManager.getlocal("acSingleDayBuild1ViewTab4MyRank", [""]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._myRank.setPosition(ruleTxt.x, rankBtn.y - this._myRank.height - 10);
        this.addChild(this._myRank);
        this._timeTxt = ComponentManager.getTextField(LanguageManager.getlocal("acSingleDayBuild1ViewTab4Time", [this.vo.acCountDown]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._timeTxt.setPosition(this._myRank.x, this._myRank.y - this._timeTxt.height - 5);
        this.addChild(this._timeTxt);
        var acTimeTxt = ComponentManager.getTextField(LanguageManager.getlocal("acSingleDayBuild1ViewTab4AcTime", [this.vo.acTimeAndHour]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        acTimeTxt.setPosition(this._timeTxt.x, this._timeTxt.y - acTimeTxt.height - 5);
        this.addChild(acTimeTxt);
        var rect = new egret.Rectangle(0, 0, bg.width - 20, bg.height - topBg.height - 15);
        this._scrollList = ComponentManager.getScrollList(AcSingleDayBuild1ViewTab4ScrollItem, gemRankData, rect);
        this._scrollList.setPosition(10, topBg.y + topBg.height + 5);
        this.addChild(this._scrollList);
        if (!this.vo.isActivityEnd()) {
            NetManager.request(NetRequestConst.REQYEST_ACTIVITY_GET_SINGLE_DAY_RANK, { activeId: this.vo.aidAndCode });
        }
        TickManager.addTick(this.tick, this);
        this.tick();
    };
    AcSingleDayBuild1ViewTab4.prototype.rankClick = function () {
        if (this.vo.isActivityEnd()) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
        ViewController.getInstance().openView(ViewConst.POPUP.ACSINGLEDAYRECHARGEPOPUPVIEW, { rankData: this._rankData, vo: this.vo });
    };
    AcSingleDayBuild1ViewTab4.prototype.tick = function () {
        if (this.vo.isActivityEnd()) {
            return;
        }
        this._timeTxt.text = LanguageManager.getlocal("acSingleDayBuild1ViewTab4Time", [this.vo.acCountDown]);
        if (this._rankData) {
            var myRankStr = "";
            if (this._rankData.myrankArr.myrank) {
                myRankStr = this._rankData.myrankArr.myrank;
            }
            else {
                myRankStr = LanguageManager.getlocal("allianceRankNoRank");
            }
            this._myRank.text = LanguageManager.getlocal("acSingleDayBuild1ViewTab4MyRank", [myRankStr]);
        }
    };
    AcSingleDayBuild1ViewTab4.prototype.refreashView = function (event) {
        if (event.data.ret) {
            if (event.data.data.cmd == NetRequestConst.REQYEST_ACTIVITY_GET_SINGLE_DAY_RANK) {
                this._rankData = event.data.data.data;
                this.tick();
            }
        }
    };
    AcSingleDayBuild1ViewTab4.prototype.refreshWhenSwitchBack = function () {
        if (this.vo.isActivityEnd()) {
            return;
        }
        NetManager.request(NetRequestConst.REQYEST_ACTIVITY_GET_SINGLE_DAY_RANK, { activeId: this.vo.aidAndCode });
    };
    AcSingleDayBuild1ViewTab4.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreashView, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQYEST_ACTIVITY_GET_SINGLE_DAY_RANK, this.refreashView, this);
        TickManager.removeTick(this.tick, this);
        this._scrollList = null;
        this._timeTxt = null;
        this._rankData = null;
        this._myRank = null;
        this._suffix = null;
        _super.prototype.dispose.call(this);
    };
    return AcSingleDayBuild1ViewTab4;
}(CommonViewTab));
__reflect(AcSingleDayBuild1ViewTab4.prototype, "AcSingleDayBuild1ViewTab4");
