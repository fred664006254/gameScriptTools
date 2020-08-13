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
 * 册封选择列表
 * author dky
 * date 2018/4/26
 * @class WifestatusPopupView
 */
var WifestatusPopupView = (function (_super) {
    __extends(WifestatusPopupView, _super);
    function WifestatusPopupView() {
        return _super.call(this) || this;
    }
    WifestatusPopupView.prototype.initView = function () {
        // App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_ACH_GETDETAILREWARD,this.doGetReward,this);
        // this._achId = this.param.data.achId;
        WifestatusPopupView.wifeId = this.param.data.wifeId;
        WifestatusPopupView.wifeLevel = this.param.data.level;
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, 522, 700);
        var wifeList = Config.WifestatusCfg.getWifestatusList();
        this._scrollList = ComponentManager.getScrollList(WifestatusPopupScrollItem, wifeList, rect);
        this.addChildToContainer(this._scrollList);
        this._scrollList.x = 25 + GameData.popupviewOffsetX;
        this._scrollList.y = 20;
        this._scrollList.addTouchTap(this.clickItemHandler, this);
    };
    WifestatusPopupView.prototype.clickItemHandler = function (event) {
        var index = Number(event.data);
        var statusCfg = Config.WifestatusCfg.getWifestatusList()[index];
        var wifestatusVo = Api.wifestatusVoApi.getWifestatusVo();
        var wifeVo = Api.wifeVoApi.getWifeInfoVoById(WifestatusPopupView.wifeId);
        //未解锁
        if (Number(statusCfg.id) > Number(wifestatusVo.level) && statusCfg.id != "2") {
            App.CommonUtil.showTip(LanguageManager.getlocal("wifeStatusError2"));
            return;
        }
        if (wifeVo.intimacy < statusCfg.needIntimacy || wifeVo.glamour < statusCfg.needGlamour) {
            App.CommonUtil.showTip(LanguageManager.getlocal("wifeStatusLessPro"));
            return;
        }
        if (wifestatusVo.info[statusCfg.id] && statusCfg.maxNum <= wifestatusVo.info[statusCfg.id].length) {
            App.CommonUtil.showTip(LanguageManager.getlocal("wifeStatusError1"));
            return;
        }
        if (WifestatusPopupView.wifeLevel == statusCfg.id) {
            return;
        }
        if (Number(statusCfg.id) == 1 && (this.checkHaveBuff() || Api.switchVoApi.checkOpenWifeBattle())) {
            App.CommonUtil.showTip(LanguageManager.getlocal("wifeTalentPlustip"));
            return;
        }
        this._oldStar = Api.wifestatusVoApi.getWifestatusVo().star;
        this.request(NetRequestConst.REQUEST_WIFESTATUS_CONFER, { wifeId: String(this.param.data.wifeId), position: statusCfg.id });
        WifestatusView.wifeLevel = statusCfg.id;
    };
    WifestatusPopupView.prototype.checkHaveBuff = function () {
        var modelList = Api.acVoApi.getRanActives();
        for (var i in modelList) {
            var unit = modelList[i];
            if (unit.atype == "22") {
                var t = unit.et - GameData.serverTime - 86400 * 1;
                if (t > 0) {
                    return true;
                }
            }
        }
        var wifebattlevo = Api.acVoApi.checkActivityStartByAid("crossServerWifeBattle");
        if (wifebattlevo) {
            return true;
        }
        return false;
    };
    //请求回调
    WifestatusPopupView.prototype.receiveData = function (data) {
        if (!data.ret) {
            return;
        }
        // let achList = Api.achievementVoApi.getAchievementInfoVoList();
        // this._scrollList.refreshData(achList);
        if (data.data.ret < 0) {
            App.CommonUtil.showTip(LanguageManager.getlocal("wifeTalentPlustip"));
            return;
        }
        if (data.data.data.unlockFlag) {
            WifestatusView.unlockLevel = Api.wifestatusVoApi.getWifestatusVo().level;
        }
        var statusType = 0; //0上封 1 下封
        if (this._oldStar > Api.wifestatusVoApi.getWifestatusVo().star) {
            statusType = 1;
        }
        ViewController.getInstance().openView(ViewConst.BASE.WIFESTATUSSHOWVIEW, { wifeId: this.param.data.wifeId, type: statusType });
        var container = Api.wifestatusVoApi.getStatusEffect(Api.wifestatusVoApi.getWifestatusVo().star - this._oldStar);
        LayerManager.msgLayer.addChild(container);
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_WIFESTATUS_STATE);
        this.hide();
    };
    WifestatusPopupView.prototype.getTitleStr = function () {
        return "wifestatusViewTitle";
    };
    WifestatusPopupView.prototype.doGetReward = function (event) {
        this._achIndex = event.data.achIndex;
        this.request(NetRequestConst.REQUEST_ACHIEVEMENT_GETREWARDS, { aid: Api.achievementVoApi.getUIItemId() });
    };
    // protected getResourceList():string[]
    // {
    // 	return super.getResourceList().concat([
    //               "childview_bg1","childview_bg2","childview_bg3",
    // 				]);
    // }
    WifestatusPopupView.prototype.dispose = function () {
        // App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_ACH_GETDETAILREWARD,this.doGetReward,this);
        // 未婚滑动列表
        this._scrollList = null;
        this._achIndex = null;
        this._oldList = null;
        WifestatusPopupView.wifeId = null;
        WifestatusPopupView.wifeLevel = null;
        this._oldStar = null;
        _super.prototype.dispose.call(this);
    };
    return WifestatusPopupView;
}(PopupView));
__reflect(WifestatusPopupView.prototype, "WifestatusPopupView");
//# sourceMappingURL=WifestatusPopupView.js.map