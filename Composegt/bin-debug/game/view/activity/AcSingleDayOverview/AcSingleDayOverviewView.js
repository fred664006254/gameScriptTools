/*
 *desc : 双十一 总览
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
var AcSingleDayOverviewView = (function (_super) {
    __extends(AcSingleDayOverviewView, _super);
    function AcSingleDayOverviewView() {
        return _super.call(this) || this;
    }
    AcSingleDayOverviewView.prototype.initView = function () {
        var titletxt = BaseBitmap.create("singledayoverview_txt");
        titletxt.x = GameConfig.stageWidth / 2 - titletxt.width / 2;
        this.addChild(titletxt);
        //顶部背景图片
        var topbg = BaseBitmap.create('singledayoverview_topbg2');
        this.addChild(topbg);
        topbg.y = 70;
        var topDesc = ComponentManager.getTextField(LanguageManager.getlocal("acSingleDayOverviewTopDesc"), 22, TextFieldConst.COLOR_LIGHT_YELLOW);
        this.addChild(topDesc);
        topDesc.lineSpacing = 5;
        topDesc.setPosition(topbg.x + 210, topbg.y + 30);
        //活动日期        
        var dateText = ComponentManager.getTextField(LanguageManager.getlocal("acArcadeView_acTime-1", [this.vo.acTimeAndHour]), 22, TextFieldConst.COLOR_LIGHT_YELLOW);
        this.addChild(dateText);
        dateText.x = topDesc.x;
        dateText.y = topDesc.y + topDesc.height + 23;
        var Overview = this.cfg.Overview;
        Overview.sort(function (dataA, dataB) {
            return dataA.sortID - dataB.sortID;
        });
        var startY = topbg.y + topbg.height;
        var spaceing = 20;
        var len = Overview.length;
        for (var index = 0; index < len; index++) {
            var accfg = Overview[index];
            var card = new SingleDayOverviewCard();
            card.init(accfg, this.aid, this.code);
            card.x = GameConfig.stageWidth / 2 - card.width / 2;
            if (GameConfig.stageHeigth - startY > 800) {
                card.y = startY + 50 + index * (spaceing + card.height);
            }
            else {
                card.y = startY + 20 + index * (spaceing + card.height);
            }
            this.addChild(card);
        }
    };
    Object.defineProperty(AcSingleDayOverviewView.prototype, "cfg", {
        get: function () {
            return this.acVo.config;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcSingleDayOverviewView.prototype, "vo", {
        get: function () {
            return this.acVo;
        },
        enumerable: true,
        configurable: true
    });
    AcSingleDayOverviewView.prototype.getRequestData = function () {
        return { requestType: NetRequestConst.REQUST_ACTIVITY_SINGLEDAYOVERVIEWINFO, requestData: { activeId: this.vo.aidAndCode } };
    };
    AcSingleDayOverviewView.prototype.receiveData = function (data) {
    };
    AcSingleDayOverviewView.prototype.isShowTitleBgShadow = function () {
        return false;
    };
    AcSingleDayOverviewView.prototype.getBgName = function () {
        return "singledayoverview_bg";
    };
    AcSingleDayOverviewView.prototype.getTitleBgName = function () {
        return "singledayoverview_topbg1";
    };
    AcSingleDayOverviewView.prototype.getTitleStr = function () {
        return null;
    };
    AcSingleDayOverviewView.prototype.getResourceList = function () {
        var code = this.code;
        return _super.prototype.getResourceList.call(this).concat([
            "singledayoverview_bg", "singledayoverview_topbg1", "singledayoverview_topbg2",
            "singledayoverview_txt", "singledayoverview_ac1_icon-" + code, "singledayoverview_ac2_icon-" + code,
            "singledayoverview_ac3_icon-" + code,
        ]);
    };
    AcSingleDayOverviewView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AcSingleDayOverviewView;
}(AcCommonView));
__reflect(AcSingleDayOverviewView.prototype, "AcSingleDayOverviewView");
var SingleDayOverviewCard = (function (_super) {
    __extends(SingleDayOverviewCard, _super);
    function SingleDayOverviewCard() {
        var _this = _super.call(this) || this;
        _this.aid = undefined;
        _this.code = undefined;
        _this._vo = undefined;
        _this._accfg = undefined;
        _this.rewardBg = null;
        return _this;
    }
    SingleDayOverviewCard.prototype.init = function (accfg, aid, code) {
        this._accfg = accfg;
        this.aid = aid;
        this.code = "" + code;
        this._vo = Api.acVoApi.getActivityVoByAidAndCode(this.aid, "" + this.code);
        var rewardbg = BaseBitmap.create("singledayoverview_ac" + this._accfg.sortID + "_icon-" + this.code);
        var acfvo = this._vo.activeinfo[this._accfg.aid + "-" + this._accfg.code];
        this.addChild(rewardbg);
        this.width = rewardbg.width;
        this.height = rewardbg.height;
        rewardbg.touchEnabled = true;
        this.rewardBg = rewardbg;
        if (this.isAidShieldByIp()) {
        }
        else {
            rewardbg.addTouchTap(this.activitydHandler, this);
        }
        TickManager.addTick(this.tick, this);
        this.refreshActiStat();
    };
    SingleDayOverviewCard.prototype.isAidShieldByIp = function () {
        return this._vo.isAidShieldByIp(this._accfg.aid);
    };
    SingleDayOverviewCard.prototype.refreshActiStat = function () {
        var acfv = this._vo.activeinfo[this._accfg.aid + "-" + this._accfg.code];
        App.CommonUtil.removeIconFromBDOC(this);
        if (!acfv)
            return;
        if (this.isAidShieldByIp()) {
            return;
        }
        var acfvo = Api.acVoApi.getActivityVoByAidAndCode(acfv.aid, acfv.code);
        if (acfvo && (acfvo.isInActivity() || acfvo.isInExtra())) {
            App.DisplayUtil.changeToNormal(this.rewardBg);
        }
        else {
            App.DisplayUtil.changeToGray(this.rewardBg);
            return;
        }
        //let tmp_vo = <AcSingleDayOverviewVo>Api.acVoApi.getActivityVoByAidAndCode(this._accfg.aid,""+this._accfg.code);
        if (acfvo.isShowRedDot && acfvo.isInActivity() && !acfvo.isInExtra() && !this.isAidShieldByIp()) {
            App.CommonUtil.addIconToBDOC(this);
        }
        else {
            App.CommonUtil.removeIconFromBDOC(this);
        }
    };
    SingleDayOverviewCard.prototype.tick = function () {
        this.refreshActiStat();
        return false;
    };
    SingleDayOverviewCard.prototype.activitydHandler = function (event, cfg) {
        var acfv = this._vo.activeinfo[this._accfg.aid + "-" + this._accfg.code];
        if (!acfv) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acOneYear_overview_txt4"));
            return;
        }
        var acfvo = Api.acVoApi.getActivityVoByAidAndCode(acfv.aid, acfv.code);
        if (!acfvo) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acOneYear_overview_txt4"));
            return;
        }
        if (PlatformManager.checkHideIconByIP() && (this._accfg.aid == "gemLottery")) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acOneYear_overview_txt2"));
            return;
        }
        if (!acfvo.isInActivity()) {
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
    SingleDayOverviewCard.prototype.dispose = function () {
        this.aid = null;
        this.code = null;
        this._accfg = null;
        this._vo = null;
        this.rewardBg = null;
        TickManager.removeTick(this.tick, this);
        _super.prototype.dispose.call(this);
    };
    return SingleDayOverviewCard;
}(BaseDisplayObjectContainer));
__reflect(SingleDayOverviewCard.prototype, "SingleDayOverviewCard");
