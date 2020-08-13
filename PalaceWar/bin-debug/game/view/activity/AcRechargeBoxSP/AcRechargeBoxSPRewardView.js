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
        var bottomBg = BaseBitmap.create("public_9_bg22");
        bottomBg.width = GameConfig.stageWidth;
        bottomBg.height = GameConfig.stageHeigth - this.titleBg.height + 10;
        bottomBg.x = 0;
        bottomBg.y = this.titleBg.y + this.titleBg.height - 12;
        this.addChildToContainer(bottomBg);
        var listBg = BaseBitmap.create("public_9_bg43");
        listBg.width = bottomBg.width - 30;
        listBg.height = bottomBg.height - 55;
        listBg.x = bottomBg.x + 15;
        listBg.y = bottomBg.y + 25;
        this.addChildToContainer(listBg);
        //多个档位
        this.initMultiView(boxCfg);
    };
    AcRechargeBoxSPRewardView.prototype.initMultiView = function (boxCfg) {
        var boxCfgList = boxCfg.childList;
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, 620, GameConfig.stageHeigth - this.titleBg.height + 5 - 65);
        this._scrollList = ComponentManager.getScrollList(AcRechargeBoxSPRewardScrollItem, boxCfgList, rect, { aid: this._aid, code: this._code });
        this._scrollList.x = 10;
        this._scrollList.y = this.titleBg.y + this.titleBg.height - 7 + 25;
        this.addChildToContainer(this._scrollList);
        this._scrollList.bounces = false;
    };
    AcRechargeBoxSPRewardView.prototype.refreshMultiView = function () {
        var boxCfgList = this._boxCfg.childList;
        this._scrollList.refreshData(boxCfgList, { aid: this._aid, code: this._code });
    };
    AcRechargeBoxSPRewardView.prototype.getRewardMultiHandler = function (event) {
        if (event && event.data && event.data.ret) {
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
            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_CHANGE_IMG);
            var data = event.data.data.data;
            // Api.servantVoApi.checkServantChangeRewards(data.cfrewards,data.rewards,data.otherrewards);
            App.LogUtil.log("getRewardMultiHandler: " + data.rewards);
            if (data.replacerewards) {
                ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD, { replacerewards: data.replacerewards });
            }
            ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW, { "rewards": data.rewards, "otherRewards": data.otherrewards, "isPlayAni": true });
            this.refreshMultiView();
        }
    };
    /**
     * 前往充值按钮
     */
    AcRechargeBoxSPRewardView.prototype.rechargeClick = function () {
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
    AcRechargeBoxSPRewardView.prototype.getTypeCode = function () {
        return this.param.data.code;
    };
    AcRechargeBoxSPRewardView.prototype.getTitleStr = function () {
        return "";
    };
    AcRechargeBoxSPRewardView.prototype.getResourceList = function () {
        var list = [];
        if (this.getTypeCode() == "1") {
            list = [
                "acrechargeboxspview_title_bg" + this.getTypeCode(),
            ];
        }
        else {
            list = [
                "acrechargeboxspview_title_bg1",
            ];
        }
        return _super.prototype.getResourceList.call(this).concat(list).concat([
            "acrechargeboxspview_rewardbg0", "acrechargeboxspview_rewardbg1", "acrechargeboxspview_rewardbg2", "acrechargeboxsp_line", "acwealthcarpview_servantskintxt", "acgiftreturnview_common_skintxt"
        ]);
    };
    AcRechargeBoxSPRewardView.prototype.getTitleBgName = function () {
        var str = "acrechargeboxspview_title_bg" + this.getTypeCode();
        App.LogUtil.log("titlebgNAME: " + str);
        return "acrechargeboxspview_title_bg" + this.getTypeCode();
    };
    AcRechargeBoxSPRewardView.prototype.isHideTitleBgShadow = function () {
        return true;
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
//# sourceMappingURL=AcRechargeBoxSPRewardView.js.map