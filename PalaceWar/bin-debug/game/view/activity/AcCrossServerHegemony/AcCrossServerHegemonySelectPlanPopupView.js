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
 * 	计策选择界面
 * @author jiangly
 * date 2018/10/15
 * @class AcCrossServerHegemonySelectPlanPopupView
 */
var AcCrossServerHegemonySelectPlanPopupView = (function (_super) {
    __extends(AcCrossServerHegemonySelectPlanPopupView, _super);
    function AcCrossServerHegemonySelectPlanPopupView() {
        var _this = _super.call(this) || this;
        _this._scrollList = null;
        return _this;
    }
    Object.defineProperty(AcCrossServerHegemonySelectPlanPopupView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid, this.param.data.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcCrossServerHegemonySelectPlanPopupView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcCrossServerHegemonySelectPlanPopupView.prototype, "uiType", {
        get: function () {
            return "2";
        },
        enumerable: true,
        configurable: true
    });
    AcCrossServerHegemonySelectPlanPopupView.prototype.initView = function () {
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACHEGEMONY_SELECTSTRATAGEM, this.refreashData, this);
        var bg = BaseBitmap.create("public_9_bg32"); //bg32
        bg.width = 525;
        bg.height = 620;
        bg.setPosition(this.viewBg.x + this.viewBg.width / 2 - bg.width / 2, this.viewBg.y + 15);
        this.addChildToContainer(bg);
        bg.visible = false;
        var planList = this.cfg.getItemList(); //Config.AlliancewarCfg.getItemList();
        var rect = new egret.Rectangle(0, 0, bg.width - 15, bg.height - 20);
        this._scrollList = ComponentManager.getScrollList(AcCrossServerHegemonySelectPlanScrollItem, planList, rect, { aid: this.param.data.aid, code: this.param.data.code, matchId: this.param.data.matchId, servantInfo: this.param.data.servantInfo });
        this._scrollList.setPosition(bg.x + 8, bg.y + 10);
        this.addChildToContainer(this._scrollList);
        var buttomTip = ComponentManager.getTextField(LanguageManager.getlocal("allianceWarSelectPlanPopupViewButtomTip"), 20, TextFieldConst.COLOR_WARN_RED);
        buttomTip.setPosition(this.viewBg.x + this.viewBg.width / 2 - buttomTip.width / 2, bg.y + bg.height + 25);
        this.addChildToContainer(buttomTip);
    };
    // protected resetBgSize()
    // {
    // 	super.resetBgSize();
    // }
    AcCrossServerHegemonySelectPlanPopupView.prototype.refreashData = function (event) {
        if (event && event.data && event.data.ret) {
            App.CommonUtil.showTip(LanguageManager.getlocal("allianceWarSelectPlanTip"));
            this.hide();
        }
        // let planList = this.cfg.getItemList();//Config.AlliancewarCfg.getItemList();
        // this._scrollList.refreshData(planList,{aid:this.param.data.aid,code:this.param.data.code,matchId:this.param.data.matchId,servantInfo:this.param.data.servantInfo});
    };
    /**
     * 备战期结束关闭界面
     */
    AcCrossServerHegemonySelectPlanPopupView.prototype.tick = function () {
        var periodType = this.vo.checkStatusByMatchId(Number(this.param.data.matchId)); //Api.allianceWarVoApi.getWarPeriod();
        if (periodType != 1) {
            this.hide();
            return;
        }
    };
    AcCrossServerHegemonySelectPlanPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "acsevenitemzshi", "acsevenitemtopbg", "awused",
        ]);
    };
    AcCrossServerHegemonySelectPlanPopupView.prototype.getTitleStr = function () {
        return "allianceWarSelectPlanPopupViewTitle";
    };
    AcCrossServerHegemonySelectPlanPopupView.prototype.dispose = function () {
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACHEGEMONY_SELECTSTRATAGEM, this.refreashData, this);
        this._scrollList = null;
        _super.prototype.dispose.call(this);
    };
    return AcCrossServerHegemonySelectPlanPopupView;
}(PopupView));
__reflect(AcCrossServerHegemonySelectPlanPopupView.prototype, "AcCrossServerHegemonySelectPlanPopupView");
//# sourceMappingURL=AcCrossServerHegemonySelectPlanPopupView.js.map