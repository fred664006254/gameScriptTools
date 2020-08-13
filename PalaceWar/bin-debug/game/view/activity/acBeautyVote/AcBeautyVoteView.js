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
  * 花魁活动view
  * @author 张朝阳
  * date 2019/4/23
  * @class AcBeautyVoteView
  */
var AcBeautyVoteView = (function (_super) {
    __extends(AcBeautyVoteView, _super);
    function AcBeautyVoteView() {
        var _this = _super.call(this) || this;
        _this._acTimeTF = null;
        _this._timebg = null;
        _this._titlebg = null;
        return _this;
    }
    AcBeautyVoteView.prototype.initView = function () {
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_ACBEAUTYVOTE_CHECKTASK, this.checkTaskHandel, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_BEAUTYVOTE_BUYFLOWERS, this.buyFlowersHandle, this);
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        var key = Api.playerVoApi.getPlayerID() + String(vo.st);
        var storage = LocalStorageManager.get(key);
        if (!storage) {
            ViewController.getInstance().openView(ViewConst.BASE.ACCOMMONREPORTVIEW, { msg: LanguageManager.getlocal("acBeautyVoteReportMsg-" + this.code), title: LanguageManager.getlocal("acBeautyVoteReportTitle-" + this.code) });
            LocalStorageManager.set(key, vo.aidAndCode);
        }
        this._titlebg = BaseLoadBitmap.create("acbeautyvoteview_titlebg-" + this.code);
        this._titlebg.width = 640;
        this._titlebg.height = 200;
        this._titlebg.setPosition(0, -15 - this.getTabbarGroupY() - 38);
        this.addChildToContainer(this._titlebg);
        var acTimeDate = ComponentManager.getTextField(LanguageManager.getlocal("acBeautyVoteViewAcTimeDate-" + this.code, [vo.acTimeAndHour]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        acTimeDate.setPosition(this._titlebg.x + 220, this._titlebg.y + 43);
        acTimeDate.width = 395;
        this.addChildToContainer(acTimeDate);
        var acDesc = ComponentManager.getTextField(LanguageManager.getlocal("acBeautyVoteViewAcDesc-" + this.code), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        acDesc.setPosition(acTimeDate.x, acTimeDate.y + acTimeDate.height + 5);
        acDesc.width = 395;
        acDesc.lineSpacing = 5;
        this.addChildToContainer(acDesc);
        //倒计时位置 
        this._timebg = BaseBitmap.create("public_9_bg61");
        this._timebg.y = this._titlebg.y + this._titlebg.height - this._timebg.height / 2 - 23;
        this.addChildToContainer(this._timebg);
        this._acTimeTF = ComponentManager.getTextField(LanguageManager.getlocal("acBeautyVoteViewAcTime-" + this.code, [vo.acCountDown]), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._timebg.width = 60 + this._acTimeTF.width;
        this._timebg.x = this._titlebg.x + 417 - this._timebg.width / 2;
        this._acTimeTF.setPosition(this._timebg.x + this._timebg.width / 2 - this._acTimeTF.width / 2, this._timebg.y + this._timebg.height / 2 - this._acTimeTF.height / 2);
        this.addChildToContainer(this._acTimeTF);
        var buttombg = BaseLoadBitmap.create("servant_bottombg");
        buttombg.width = 640;
        buttombg.height = GameConfig.stageHeigth - this._titlebg.height - 85;
        buttombg.setPosition(this._titlebg.x, this._titlebg.y + this._titlebg.height - 2);
        this.addChildToContainer(buttombg);
        this.tick();
        this.refreshView();
    };
    AcBeautyVoteView.prototype.tick = function () {
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        if (vo.checkIsInEndShowTime()) {
            this._acTimeTF.text = LanguageManager.getlocal("acPunishEnd");
        }
        else {
            this._acTimeTF.text = LanguageManager.getlocal("acBeautyVoteViewAcTime-" + this.code, [vo.acCountDown]);
        }
        this._timebg.width = 60 + this._acTimeTF.width;
        this._timebg.x = this._titlebg.x + 417 - this._timebg.width / 2;
        this._acTimeTF.setPosition(this._timebg.x + this._timebg.width / 2 - this._acTimeTF.width / 2, this._timebg.y + this._timebg.height / 2 - this._acTimeTF.height / 2);
    };
    AcBeautyVoteView.prototype.refreshView = function () {
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        if (vo.checkFlowers()) {
            this.tabbarGroup.addRedPoint(0);
        }
        else {
            this.tabbarGroup.removeRedPoint(0);
        }
        if (vo.checkRechargeRedDot()) {
            this.tabbarGroup.addRedPoint(1);
        }
        else {
            this.tabbarGroup.removeRedPoint(1);
        }
        if (vo.checkScore()) {
            this.tabbarGroup.addRedPoint(2);
        }
        else {
            this.tabbarGroup.removeRedPoint(2);
        }
    };
    AcBeautyVoteView.prototype.checkTaskHandel = function () {
        this.tabbarGroup.selectedIndex = 1;
        this.clickTabbarHandler({ index: 1 });
    };
    AcBeautyVoteView.prototype.buyFlowersHandle = function (event) {
        if (event.data.ret) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acBeautyVoteGetNotFlowesBuyFlowesSuccessTip-" + this.code));
        }
    };
    AcBeautyVoteView.prototype.getTabbarTextArr = function () {
        return [
            "acBeautyVoteViewTab1-" + this.code,
            "acBeautyVoteViewTab2-" + this.code,
            "acBeautyVoteViewTab3-" + this.code,
            "acBeautyVoteViewTab4-" + this.code,
        ];
    };
    AcBeautyVoteView.prototype.getTabbarGroupY = function () {
        return 213;
    };
    AcBeautyVoteView.prototype.getRuleInfo = function () {
        return "acBeautyVoteViewRuleInfo-" + this.code;
    };
    AcBeautyVoteView.prototype.getRuleInfoParam = function () {
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        return [LanguageManager.getlocal("officialTitle" + String(cfg.lvLimit))];
    };
    AcBeautyVoteView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "acbeautyvoteview-" + this.code, "acbeautyvoteview_btneffect", "acbeautyvoteview_common_bubble", "acbeautyvoteview_garypoint", "acbeautyvoteview_joinflag",
            "acbeautyvoteview_normalpoint", "acbeautyvoteview_pointbg", "progress14_bg", "progress14", "acbeautyvoteview_joininfobtn_down", "acbeautyvoteview_joininfobtn",
            "accarnivalview_tab_red", "accarnivalview_tab_green", "progress5", "progress3_bg", "shopview_line", "rankbg_1", "rankbg_3", "rankbg_2", "rankbg_4",
            "rankinglist_rankn1", "rankinglist_rankn2", "rankinglist_rankn3", "shopview_corner", "acbeautyvoteview_fanrankbg", "acbeautyvoteview_blue", "acbeautyvoteview_black",
            "acbeautyvoteview_red", "acbeautyvoteview_yellow", "acbeautyvoteview_vertical", "acbeautyvoteview_horizontal", "rank_select_mask"
        ]);
    };
    // protected getSoundBgName() {
    // 	return "music_acahrowarrow";
    // }
    AcBeautyVoteView.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_ACBEAUTYVOTE_CHECKTASK, this.checkTaskHandel, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_BEAUTYVOTE_BUYFLOWERS, this.buyFlowersHandle, this);
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        this._acTimeTF = null;
        this._timebg = null;
        this._titlebg = null;
        _super.prototype.dispose.call(this);
    };
    return AcBeautyVoteView;
}(AcCommonView));
__reflect(AcBeautyVoteView.prototype, "AcBeautyVoteView");
//# sourceMappingURL=AcBeautyVoteView.js.map