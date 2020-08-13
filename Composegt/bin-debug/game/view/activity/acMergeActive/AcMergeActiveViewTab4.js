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
var AcMergeActiveViewTab4 = (function (_super) {
    __extends(AcMergeActiveViewTab4, _super);
    function AcMergeActiveViewTab4() {
        var _this = _super.call(this) || this;
        _this._scrollList = null;
        _this.aid = null;
        _this.code = null;
        _this._aidAndCode = null;
        //今日充值赠送剩余时间
        _this._rechargeTimeText = null;
        _this.initView();
        TickManager.addTick(_this.tick, _this);
        return _this;
    }
    Object.defineProperty(AcMergeActiveViewTab4.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(AcMergeActiveView.AID, AcMergeActiveView.CODE);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcMergeActiveViewTab4.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(AcMergeActiveView.AID, AcMergeActiveView.CODE);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcMergeActiveViewTab4.prototype, "acTivityId", {
        get: function () {
            return AcMergeActiveView.AID + "-" + AcMergeActiveView.CODE;
        },
        enumerable: true,
        configurable: true
    });
    AcMergeActiveViewTab4.prototype.initView = function () {
        this.aid = AcMergeActiveView.AID;
        this.code = AcMergeActiveView.CODE;
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY_GETMERGEACTIVEITEMC, this.refreshData, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_MERGEACTIVE_REFRESHVO, this.refreshData, this);
        this._aidAndCode = { "aid": this.aid, "code": this.code };
        var taskData = this.vo.getSortRecharge();
        var upBg = BaseBitmap.create("recharge_diban_01");
        upBg.width = GameConfig.stageWidth;
        upBg.x = 0;
        upBg.y = -5;
        this.addChild(upBg);
        this._rechargeTimeText = ComponentManager.getTextField(LanguageManager.getlocal("acMergeActiveRechargeTime", [App.DateUtil.getFormatBySecond(Math.max(0, Math.min(this.vo.et, App.DateUtil.getWeeTs(GameData.serverTime) + 24 * 60 * 60) - GameData.serverTime), 1)]), 22, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._rechargeTimeText.x = upBg.x + upBg.width / 2 - this._rechargeTimeText.width / 2;
        this._rechargeTimeText.y = upBg.y + upBg.height / 2 - this._rechargeTimeText.height / 2;
        this.addChild(this._rechargeTimeText);
        var shadow = BaseBitmap.create("commonview_titlebgshadow");
        shadow.width = GameConfig.stageWidth - 6;
        shadow.x = GameConfig.stageWidth / 2 - shadow.width / 2;
        shadow.y = 0;
        this.addChild(shadow);
        var downBg = BaseBitmap.create("recharge_diban_01");
        downBg.width = GameConfig.stageWidth;
        downBg.x = 0;
        downBg.y = GameConfig.stageHeigth - 69 - downBg.height - 90 + 5;
        this.addChild(downBg);
        var bottomDesc = ComponentManager.getTextField(LanguageManager.getlocal("acMergeActiveBottomDesc1"), 22, TextFieldConst.COLOR_LIGHT_YELLOW);
        bottomDesc.x = downBg.x + downBg.width / 2 - bottomDesc.width / 2;
        bottomDesc.y = downBg.y + downBg.height / 2 - bottomDesc.height / 2 - 6;
        this.addChild(bottomDesc);
        var rect = new egret.Rectangle(0, 0, 612, GameConfig.stageHeigth - 160 - upBg.height - downBg.height + 2);
        // this._scrollList = ComponentManager.getScrollList(AcMergeActiveTaskScrollItem,taskData,rect,this._aidAndCode);
        this._scrollList = ComponentManager.getScrollList(AcMergeActiveRechargeScrollItem, taskData, rect, this._aidAndCode);
        this._scrollList.y = upBg.y + upBg.height + 3;
        this._scrollList.x = GameConfig.stageWidth / 2 - this._scrollList.width / 2;
        this.addChild(this._scrollList);
        //边框
        var borderBg = BaseBitmap.create("public_9v_bg03");
        borderBg.width = GameConfig.stageWidth;
        borderBg.height = GameConfig.stageHeigth - 153;
        borderBg.y = 0;
        this.addChild(borderBg);
    };
    AcMergeActiveViewTab4.prototype.rechargeHandler = function (event) {
        ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
    };
    AcMergeActiveViewTab4.prototype.refreshData = function (event) {
        if (event) {
            if (event.data && event.data.ret) {
                var cmd = event.data.data.cmd;
                if (cmd == NetRequestConst.REQUEST_ACTIVITY_GETMERGEACTIVEITEMC) {
                    var data = event.data.data.data;
                    var rewards = data.rewards;
                    var rList = GameData.formatRewardItem(rewards);
                    App.CommonUtil.playRewardFlyAction(rList);
                }
            }
        }
        var taskData = this.vo.getSortRecharge();
        this._scrollList.refreshData(taskData, this._aidAndCode);
    };
    AcMergeActiveViewTab4.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "acchristmasview_1_red"
        ]);
    };
    AcMergeActiveViewTab4.prototype.tick = function () {
        this._rechargeTimeText.text = LanguageManager.getlocal("acMergeActiveRechargeTime", [App.DateUtil.getFormatBySecond(Math.max(0, Math.min(this.vo.et, App.DateUtil.getWeeTs(GameData.serverTime) + 24 * 60 * 60) - GameData.serverTime), 1)]);
    };
    AcMergeActiveViewTab4.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_GETMERGEACTIVEITEMC, this.refreshData, this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_MERGEACTIVE_REFRESHVO, this.refreshData, this);
        this._scrollList = null;
        this._aidAndCode = null;
        this._rechargeTimeText = null;
        TickManager.removeTick(this.tick, this);
        _super.prototype.dispose.call(this);
    };
    return AcMergeActiveViewTab4;
}(CommonViewTab));
__reflect(AcMergeActiveViewTab4.prototype, "AcMergeActiveViewTab4");
