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
 * 帮派阵容
 * @author 张朝阳
 * date 2018/10/15
 * @class AllianceWarJoinBattleInfoPopupView
 */
var AllianceWarJoinBattleInfoPopupView = (function (_super) {
    __extends(AllianceWarJoinBattleInfoPopupView, _super);
    function AllianceWarJoinBattleInfoPopupView() {
        var _this = _super.call(this) || this;
        _this._joinBattleTxt = null;
        _this._allFightTxt = null;
        _this._scrollList = null;
        _this._servantBtn = null;
        return _this;
    }
    AllianceWarJoinBattleInfoPopupView.prototype.initView = function () {
        //监听 model事件
        App.MessageHelper.addNetMessage("myalliancewar", this.allianceWarModelHandle, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQYEST_ALLIANCEWAR_SELECTSTRATAGEM, this.allianceWarModelHandle, this);
        this._joinBattleTxt = ComponentManager.getTextField(LanguageManager.getlocal("allianceWarJoinBattleInfoPopupViewJoinNum", [String(Api.allianceWarVoApi.getJoinNum())]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        this._joinBattleTxt.setPosition(this.viewBg.x + 35 + GameData.popupviewOffsetX, 20);
        this.addChildToContainer(this._joinBattleTxt);
        this._allFightTxt = ComponentManager.getTextField(LanguageManager.getlocal("allianceWarJoinBattleInfoPopupViewAllFight", [String(Api.allianceWarVoApi.getAllFight())]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        this._allFightTxt.setPosition(this.viewBg.x + this.viewBg.width - this._allFightTxt.width - 35 - GameData.popupviewOffsetX, this._joinBattleTxt.y);
        this.addChildToContainer(this._allFightTxt);
        var bg = BaseBitmap.create("public_9_bg32");
        bg.width = 520;
        bg.height = 600;
        bg.setPosition(this.viewBg.x + this.viewBg.width / 2 - bg.width / 2, this._joinBattleTxt.y + this._joinBattleTxt.height + 10);
        this.addChildToContainer(bg);
        var rect = new egret.Rectangle(0, 0, bg.width - 6, bg.height - 10);
        this._scrollList = ComponentManager.getScrollList(AllianceWarJoinBattleInfoScrollItem, null, rect);
        this._scrollList.setPosition(bg.x + 3, bg.y + 5);
        this.addChildToContainer(this._scrollList);
        this._scrollList.setEmptyTip(LanguageManager.getlocal("allianceWarJoinBattleInfoPopupViewListEmpty"));
        this._servantBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "allianceWarJoinBattleInfoPopupViewServantBtn", this.servantBtnClick, this);
        this._servantBtn.setPosition(this.viewBg.x + 55 + GameData.popupviewOffsetX, bg.y + bg.height + 15);
        this.addChildToContainer(this._servantBtn);
        var planBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "allianceWarJoinBattleInfoPopupViewPlanBtn", this.planBtnClick, this);
        planBtn.setPosition(this.viewBg.x + this.viewBg.width - planBtn.width - 55 - GameData.popupviewOffsetX, this._servantBtn.y);
        this.addChildToContainer(planBtn);
        // this.allianceWarModelHandle();
    };
    AllianceWarJoinBattleInfoPopupView.prototype.getBgExtraHeight = function () {
        return 15;
    };
    AllianceWarJoinBattleInfoPopupView.prototype.resetBgSize = function () {
        _super.prototype.resetBgSize.call(this);
        this.allianceWarModelHandle();
    };
    /**
     * 监听modle 的刷新
     */
    AllianceWarJoinBattleInfoPopupView.prototype.allianceWarModelHandle = function () {
        this._joinBattleTxt.text = LanguageManager.getlocal("allianceWarJoinBattleInfoPopupViewJoinNum", [String(Api.allianceWarVoApi.getJoinNum())]);
        this._joinBattleTxt.setPosition(this.viewBg.x + GameData.popupviewOffsetX + 35, 20);
        this._allFightTxt.text = LanguageManager.getlocal("allianceWarJoinBattleInfoPopupViewAllFight", [App.StringUtil.changeIntToText(Api.allianceWarVoApi.getAllFight())]);
        this._allFightTxt.setPosition(this.viewBg.x + this.viewBg.width - this._allFightTxt.width - 70, this._joinBattleTxt.y);
        var list = Api.allianceWarVoApi.getMyAllianceInfoList();
        this._scrollList.refreshData(list);
    };
    /**	门客选择界面 */
    AllianceWarJoinBattleInfoPopupView.prototype.servantBtnClick = function () {
        var servantInfoVoList = Api.servantVoApi.getServantInfoListWithSort(1);
        var servantInfoList = [];
        for (var key in servantInfoVoList) {
            var item = servantInfoVoList[key];
            var fightValue = Api.servantVoApi.getServantCombatWithIdContentsWeapon(item.servantId, 3); //Api.servantVoApi.getServantCombatWithId(item.servantId)
            var servantInfo = { servantId: item.servantId, servantName: item.servantName, level: item.level, fightValue: fightValue, qualityBoxImgPath: item.qualityBoxImgPath, halfImgPath: item.halfImgPath, banishSt: item.banishSt };
            servantInfoList.push(servantInfo);
        }
        servantInfoList.sort(function (a, b) {
            return b.fightValue - a.fightValue;
        });
        ViewController.getInstance().openView(ViewConst.POPUP.ALLIANCEWARSELECTSERVANTPOPUPVIEW, { servantList: servantInfoList });
    };
    /** 计策选择界面 */
    AllianceWarJoinBattleInfoPopupView.prototype.planBtnClick = function () {
        ViewController.getInstance().openView(ViewConst.POPUP.ALLIANCEWARSELECTPLANPOPUPVIEW);
    };
    /**
     * 备战期结束关闭界面
     */
    AllianceWarJoinBattleInfoPopupView.prototype.tick = function () {
        var periodType = Api.allianceWarVoApi.getWarPeriod();
        if (periodType != 1) {
            this.hide();
            return;
        }
    };
    AllianceWarJoinBattleInfoPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "acsevenitemzshi", "acsevenitemtopbg",
        ]);
    };
    AllianceWarJoinBattleInfoPopupView.prototype.getTitleStr = function () {
        return "allianceWarJoinBattleInfoPopupViewTitle";
    };
    /**
     * 刷新一下model数据
     */
    AllianceWarJoinBattleInfoPopupView.prototype.getRequestData = function () {
        return { requestType: NetRequestConst.REQYEST_ALLIANCEWAR_GETMYALLIANCEINFO, requestData: null };
    };
    AllianceWarJoinBattleInfoPopupView.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage("myalliancewar", this.allianceWarModelHandle, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQYEST_ALLIANCEWAR_SELECTSTRATAGEM, this.allianceWarModelHandle, this);
        this._joinBattleTxt = null;
        this._allFightTxt = null;
        this._scrollList = null;
        this._servantBtn = null;
        _super.prototype.dispose.call(this);
    };
    return AllianceWarJoinBattleInfoPopupView;
}(PopupView));
__reflect(AllianceWarJoinBattleInfoPopupView.prototype, "AllianceWarJoinBattleInfoPopupView");
//# sourceMappingURL=AllianceWarJoinBattleInfoPopupView.js.map