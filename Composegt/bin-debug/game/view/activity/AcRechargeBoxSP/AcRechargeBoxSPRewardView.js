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
  * 特别宝箱物品展示
  * author  jiangliuyang
  * date 2019/1/7
  * @class AcRechargeBoxSPPopupView
  */
var AcRechargeBoxSPRewardView = (function (_super) {
    __extends(AcRechargeBoxSPRewardView, _super);
    function AcRechargeBoxSPRewardView() {
        var _this = _super.call(this) || this;
        _this._rechargeBtn = null;
        _this._receiveBtn = null;
        _this._allReceiveBM = null;
        _this._aid = null;
        _this._code = null;
        _this._boxNeedGem = null;
        _this._desc2 = null;
        _this._scrollList = null;
        _this._isSingle = true;
        _this._boxCfg = null;
        return _this;
    }
    AcRechargeBoxSPRewardView.prototype.initView = function () {
        this._aid = this.param.data.aid;
        this._code = this.param.data.code;
        this._boxNeedGem = this.param.data.boxId;
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this._aid, this._code);
        var boxCfg = cfg.getBoxData(String(this._boxNeedGem));
        this._boxCfg = boxCfg;
        App.MessageHelper.addNetMessage(NetPushConst.PUSH_PAY, this.refreshMultiView, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUST_ACTIVITY_GETRECHARGEBOXSPREWARD, this.getRewardMultiHandler, this);
        //多个档位
        this.initMultiView(boxCfg);
        // if (ResourceManager.hasRes("acrechargeboxspview_title_txt"+this._code))
        // {
        var titletxt = BaseBitmap.create("acrechargeboxspview_rewardtitle");
        titletxt.x = GameConfig.stageWidth / 2 - titletxt.width / 2;
        titletxt.y = 5;
        this.addChild(titletxt);
        // }
        var border = BaseBitmap.create("public_9v_bg03");
        border.width = 640;
        border.height = GameConfig.stageHeigth - 69;
        border.y = 69;
        this.addChild(border);
    };
    AcRechargeBoxSPRewardView.prototype.initMultiView = function (boxCfg) {
        var boxCfgList = boxCfg.childList;
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, 640, GameConfig.stageHeigth - 69 - 20);
        this._scrollList = ComponentManager.getScrollList(AcRechargeBoxSPRewardScrollItem, boxCfgList, rect, { aid: this._aid, code: this._code });
        this._scrollList.x = this.viewBg.width / 2 - this._scrollList.width / 2;
        this._scrollList.y = 69 + 4;
        this.addChildToContainer(this._scrollList);
    };
    AcRechargeBoxSPRewardView.prototype.refreshMultiView = function () {
        var boxCfgList = this._boxCfg.childList;
        this._scrollList.refreshData(boxCfgList, { aid: this._aid, code: this._code });
    };
    AcRechargeBoxSPRewardView.prototype.getRewardMultiHandler = function (event) {
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this._aid, this._code);
        var deltaT = vo.et - GameData.serverTime;
        if (deltaT < 0) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
        var ret = event.data.data.ret;
        if (ret != 0) {
            return;
        }
        var data = event.data.data.data;
        Api.servantVoApi.checkServantChangeRewards(data.cfrewards, data.rewards, data.otherrewards);
        // ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW, {"rewards":data.rewards,"otherRewards":data.otherrewards,"isPlayAni":true});
        this.refreshMultiView();
    };
    /**
     * 前往充值按钮
     */
    AcRechargeBoxSPRewardView.prototype.rechargeClick = function () {
        if ("" + this._code == "5") {
            App.CommonUtil.showTip(LanguageManager.getlocal("acRechargeBoxSP_rechargetip-code5"));
            return;
        }
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this._aid, this._code);
        var deltaT = vo.et - GameData.serverTime;
        if (deltaT < 0) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
        ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
    };
    /**
     * 领取按钮
     */
    AcRechargeBoxSPRewardView.prototype.receiveClick = function () {
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this._aid, this._code);
        if (!vo || !vo.isStart) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this._aid, this._code);
        var boxCfg = cfg.getBoxData(String(this._boxNeedGem));
        var activeId = this._aid + "-" + this._code;
        NetManager.request(NetRequestConst.REQUST_ACTIVITY_GETRECHARGEBOXSPREWARD, { "activeId": activeId, "rechargeId": boxCfg.id });
    };
    AcRechargeBoxSPRewardView.prototype.getTitleStr = function () {
        return "";
    };
    AcRechargeBoxSPRewardView.prototype.getTitleBgName = function () {
        // if(ResourceManager.hasRes("acrechargeboxspview_title_bg"+this._code)){
        // 	return "acrechargeboxspview_title_bg"+this._code;
        // } else {
        // 	return "commonview_db_04";
        // }
        return "acrechargeboxspview_title_bg7";
    };
    AcRechargeBoxSPRewardView.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUST_ACTIVITY_GETRECHARGEBOXSPREWARD, this.getRewardMultiHandler, this);
        App.MessageHelper.removeNetMessage(NetPushConst.PUSH_PAY, this.refreshMultiView, this);
        this._rechargeBtn = null;
        this._receiveBtn = null;
        this._allReceiveBM = null;
        this._aid = null;
        this._code = null;
        this._boxNeedGem = null;
        this._scrollList = null;
        _super.prototype.dispose.call(this);
    };
    return AcRechargeBoxSPRewardView;
}(CommonView));
__reflect(AcRechargeBoxSPRewardView.prototype, "AcRechargeBoxSPRewardView");
