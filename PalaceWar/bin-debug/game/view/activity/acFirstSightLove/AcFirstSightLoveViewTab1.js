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
 * 倾心礼包
 * author ycg
 * date 2019.10.17
 * @class AcFirstSightLoveViewTab1
 */
var AcFirstSightLoveViewTab1 = (function (_super) {
    __extends(AcFirstSightLoveViewTab1, _super);
    function AcFirstSightLoveViewTab1() {
        var _this = _super.call(this) || this;
        _this._scrollList = null;
        _this._timeCountDown = null;
        egret.callLater(_this.initView, _this);
        return _this;
    }
    AcFirstSightLoveViewTab1.prototype.initView = function () {
        App.MessageHelper.addNetMessage(NetPushConst.PUSH_PAY, this.receivePushData, this);
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_PAYMENT, this.refreshUI, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY_FIRSTSIGHTLOVE_BUY, this.requestBuyCallBack, this);
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.LogUtil.log("initView: code: " + this.code);
        var parentView = ViewController.getInstance().getView("AcFirstSightLoveView");
        App.LogUtil.log("parent tab1: " + parentView.getChildShowHeight());
        this.width = GameConfig.stageWidth;
        this.height = parentView.getChildShowHeight();
        var infoBgStr = ResourceManager.hasRes("ac_firstsightlove_love_infobg-" + this.getTypeCode()) ? "ac_firstsightlove_love_infobg-" + this.getTypeCode() : "ac_firstsightlove_love_infobg-1";
        var infoBg = BaseBitmap.create(infoBgStr);
        infoBg.setPosition(this.width / 2 - infoBg.width / 2, 15);
        this.addChild(infoBg);
        var acDesc = ComponentManager.getTextField(LanguageManager.getlocal("acFirstSightLoveLoveDesc-" + this.getTypeCode()), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        acDesc.width = infoBg.width - 40;
        acDesc.lineSpacing = 5;
        acDesc.setPosition(infoBg.x + infoBg.width / 2 - acDesc.width / 2, infoBg.y + 20);
        this.addChild(acDesc);
        var acTime = ComponentManager.getTextField(LanguageManager.getlocal("acFirstSightLoveTime-" + this.getTypeCode(), [this.vo.acTimeAndHour]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        acTime.setPosition(acDesc.x, acDesc.y + acDesc.height + 5);
        this.addChild(acTime);
        var timeCountDown = ComponentManager.getTextField(LanguageManager.getlocal("acFirstSightLoveCountDown-" + this.getTypeCode(), [this.vo.getCountDown()]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        timeCountDown.anchorOffsetX = timeCountDown.width / 2;
        timeCountDown.setPosition(infoBg.x + infoBg.width / 2 - 6, infoBg.y + infoBg.height - 25);
        this.addChild(timeCountDown);
        this._timeCountDown = timeCountDown;
        var listBg = BaseBitmap.create("public_9_probiginnerbg");
        listBg.width = this.width - 30;
        listBg.height = this.height - infoBg.y - infoBg.height - 30;
        listBg.setPosition(infoBg.x + infoBg.width / 2 - listBg.width / 2, infoBg.y + infoBg.height + 5);
        this.addChild(listBg);
        var dataList = this.cfg.festivalList1;
        var rect = new egret.Rectangle(0, 0, listBg.width - 20, listBg.height - 10);
        var scrollList = ComponentManager.getScrollList(AcFirstSightLoveViewScrollItem1, dataList, rect, { aid: this.aid, code: this.code });
        scrollList.setPosition(listBg.x + 8, listBg.y + 5);
        this.addChild(scrollList);
        this._scrollList = scrollList;
        TickManager.addTick(this.tick, this);
    };
    AcFirstSightLoveViewTab1.prototype.receivePushData = function (event) {
        var data = event.data;
        if (data.data.ret == 0 && data.data.cmd == NetPushConst.PUSH_PAY) {
            var cfg = Config.RechargeCfg.getRechargeItemCfgByKey(data.data.data.payment.itemId);
            var rewards = "1_1_" + cfg.gemCost + "|" + data.data.data.rewards;
            var rewObj = GameData.formatRewardItem(rewards);
            App.CommonUtil.playRewardFlyAction(rewObj);
            if (data.data.data.payment) {
                var itemid = data.data.data.payment.itemId;
                PlatformManager.analyticsPay(itemid, data.data.data.payment.orderId);
            }
        }
    };
    AcFirstSightLoveViewTab1.prototype.requestBuyCallBack = function (evt) {
        var rData = evt.data.data.data;
        if (rData) {
            var rewObj = GameData.formatRewardItem(rData.rewards);
            App.CommonUtil.playRewardFlyAction(rewObj);
        }
        else {
            App.CommonUtil.showTip(LanguageManager.getlocal("time_error"));
        }
    };
    AcFirstSightLoveViewTab1.prototype.refreshView = function () {
        App.LogUtil.log("refreshview ");
        NetManager.request(NetRequestConst.REQUEST_ACTIVITY_FIRSTSIGHTLOVE_GETINFO, { activeId: this.vo.aidAndCode });
        App.LogUtil.log("refreshui ");
        var dataList = this.cfg.festivalList1;
        this._scrollList.refreshData(dataList, { aid: this.aid, code: this.code });
    };
    AcFirstSightLoveViewTab1.prototype.refreshUI = function () {
        NetManager.request(NetRequestConst.REQUEST_ACTIVITY_FIRSTSIGHTLOVE_GETINFO, { activeId: this.vo.aidAndCode });
        App.LogUtil.log("refreshui ");
        var dataList = this.cfg.festivalList1;
        this._scrollList.refreshData(dataList, { aid: this.aid, code: this.code });
    };
    AcFirstSightLoveViewTab1.prototype.refreshWhenSwitchBack = function () {
        App.LogUtil.log("tab1  refreshWhenSwitchBack");
        var dataList = this.cfg.festivalList1;
        this._scrollList.refreshData(dataList, { aid: this.aid, code: this.code });
    };
    AcFirstSightLoveViewTab1.prototype.tick = function () {
        this._timeCountDown.text = LanguageManager.getlocal("acFirstSightLoveCountDown-" + this.getTypeCode(), [this.vo.getCountDown()]);
        this._timeCountDown.anchorOffsetX = this._timeCountDown.width / 2;
    };
    AcFirstSightLoveViewTab1.prototype.getTypeCode = function () {
        return this.code;
    };
    Object.defineProperty(AcFirstSightLoveViewTab1.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcFirstSightLoveViewTab1.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    AcFirstSightLoveViewTab1.prototype.dispose = function () {
        TickManager.removeTick(this.tick, this);
        App.MessageHelper.removeNetMessage(NetPushConst.PUSH_PAY, this.receivePushData, this);
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_PAYMENT, this.refreshUI, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_FIRSTSIGHTLOVE_BUY, this.requestBuyCallBack, this);
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        this._scrollList = null;
        this._timeCountDown = null;
        _super.prototype.dispose.call(this);
    };
    return AcFirstSightLoveViewTab1;
}(AcCommonViewTab));
__reflect(AcFirstSightLoveViewTab1.prototype, "AcFirstSightLoveViewTab1");
//# sourceMappingURL=AcFirstSightLoveViewTab1.js.map