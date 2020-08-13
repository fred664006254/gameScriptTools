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
  * 勤王除恶选择门客
  * @author 张朝阳
  * date 2019/4/17
 * @class AllianceWeekEndSelectServantPopupView
 */
var AllianceWeekEndSelectServantPopupView = (function (_super) {
    __extends(AllianceWeekEndSelectServantPopupView, _super);
    function AllianceWeekEndSelectServantPopupView() {
        var _this = _super.call(this) || this;
        _this._scrollList = null;
        _this._callback = null;
        _this._handler = null;
        return _this;
    }
    AllianceWeekEndSelectServantPopupView.prototype.getType = function () {
        return Number(this.param.data.type);
    };
    AllianceWeekEndSelectServantPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "boss_gotowar"
        ]);
    };
    AllianceWeekEndSelectServantPopupView.prototype.initView = function () {
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_ALLIANCEWEEKEND_SELECTSERVANT, this.selectHandle, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQYEST_ALLIANCEWEEK_RECOVER, this.recovertHandle, this);
        var bg = BaseBitmap.create("public_9_bg4");
        bg.width = 520;
        bg.height = 670;
        bg.setPosition(this.viewBg.x + this.viewBg.width / 2 - bg.width / 2, 15);
        this.addChildToContainer(bg);
        var servantList = Api.myAllianceWeekVoApi.getServantList();
        var rect = new egret.Rectangle(0, 0, bg.width - 10, bg.height - 20);
        this._scrollList = ComponentManager.getScrollList(AllianceWeekEndSelectServantScrollItem, servantList, rect);
        this._scrollList.setPosition(bg.x + 10, bg.y + 10);
        this.addChildToContainer(this._scrollList);
    };
    AllianceWeekEndSelectServantPopupView.prototype.recovertHandle = function () {
        var servantList = Api.myAllianceWeekVoApi.getServantList();
        this._scrollList.refreshData(servantList);
    };
    AllianceWeekEndSelectServantPopupView.prototype.selectHandle = function () {
        // App.CommonUtil.showTip(LanguageManager.getlocal("allianceWeekEndSelectServantPopupViewGoFightSuccess"));
        this.hide();
    };
    AllianceWeekEndSelectServantPopupView.prototype.getBgExtraHeight = function () {
        return 40;
    };
    AllianceWeekEndSelectServantPopupView.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_ALLIANCEWEEKEND_SELECTSERVANT, this.selectHandle, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQYEST_ALLIANCEWEEK_RECOVER, this.recovertHandle, this);
        this._scrollList = null;
        this._callback = null;
        this._handler = null;
        _super.prototype.dispose.call(this);
    };
    return AllianceWeekEndSelectServantPopupView;
}(PopupView));
__reflect(AllianceWeekEndSelectServantPopupView.prototype, "AllianceWeekEndSelectServantPopupView");
//# sourceMappingURL=AllianceWeekEndSelectServantPopupView.js.map