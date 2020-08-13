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
/*
author : jiang
date : 2018.8.28
desc : 小额礼包
*/
var AcDailyGiftView = (function (_super) {
    __extends(AcDailyGiftView, _super);
    function AcDailyGiftView() {
        var _this = _super.call(this) || this;
        _this.bgImg = null;
        _this.titleText = null;
        _this.dailyGiftBtn = null;
        _this.dailyGiftText = null;
        _this.dailyGiftRedPoint = null;
        _this._scrollList = null;
        _this._code = null;
        return _this;
    }
    Object.defineProperty(AcDailyGiftView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    // protected get code():string
    // {
    //     if(this._code == null){
    //         let list:AcBaseVo[] = Api.acVoApi.getActivityVoListByAid(this.aid);
    //         this._code = list[0].code.toString();
    //     }
    //     return this._code;
    // }
    AcDailyGiftView.prototype.initView = function () {
        App.MessageHelper.addNetMessage(NetPushConst.PUSH_PAY, this.receivePushData, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_DAILYGIFT_REFRESHVO, this.updateStatus, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_GETFREEDAILYGIFT), this.dailyGiftCallback, this);
        var bg = BaseLoadBitmap.create("acdailygiftview_bg" + this.code);
        bg.y = 69;
        bg.width = 640;
        bg.height = 298;
        this.addChildToContainer(bg);
        this.titleText = ComponentManager.getTextField(LanguageManager.getlocal("dailyGiftTitleText"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        this.titleText.x = 30;
        this.titleText.y = 260;
        this.titleText.lineSpacing = 5;
        this.addChildToContainer(this.titleText);
        this.dailyGiftBtn = ComponentManager.getButton("acdailygiftview_box", null, this.dailyGiftBtnHandler, this);
        this.dailyGiftBtn.x = 495;
        this.dailyGiftBtn.y = 265;
        this.addChildToContainer(this.dailyGiftBtn);
        this.dailyGiftText = ComponentManager.getTextField(LanguageManager.getlocal("dailyGiftBtnText"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        this.dailyGiftText.x = this.dailyGiftBtn.x - 15;
        this.dailyGiftText.y = this.dailyGiftBtn.y + this.dailyGiftBtn.height - 20;
        this.addChildToContainer(this.dailyGiftText);
        var line = BaseBitmap.create("public_line");
        line.width = 640;
        line.y = bg.y + bg.height - 10;
        this.addChildToContainer(line);
        var bottom = BaseBitmap.create("adult_lowbg");
        bottom.x = GameConfig.stageWidth / 2 - bottom.width / 2;
        bottom.y = GameConfig.stageHeigth - 10 - bottom.height;
        this.addChildToContainer(bottom);
        var bottomText = ComponentManager.getTextField(LanguageManager.getlocal("dailyGiftBottomText"), TextFieldConst.FONTSIZE_TITLE_SMALL, 0xd4923e);
        bottomText.x = bottom.x + bottom.width / 2 - bottomText.width / 2;
        bottomText.y = bottom.y + bottom.height / 2 - bottomText.height / 2;
        this.addChildToContainer(bottomText);
        var border = BaseBitmap.create("public_9v_bg03");
        border.width = GameConfig.stageWidth;
        border.height = GameConfig.stageHeigth - 69 - bg.height - line.height;
        border.y = line.y + line.height;
        this.addChildToContainer(border);
        var cfgObj = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        var dailyGiftCfg = cfgObj.dailyCost;
        var list = [];
        var dailyCostData = null;
        for (var key in dailyGiftCfg) {
            dailyCostData = dailyGiftCfg[key];
            var cfg = Config.RechargeCfg.getRechargeItemCfgByKey(dailyCostData["cost"]);
            list.push({ code: this.code, cfg: cfg, limit: dailyCostData["limit"], rechargeId: dailyCostData["cost"], rechargeCount: this.vo.ainfo[dailyCostData["cost"]] });
        }
        var rect = new egret.Rectangle(0, 10, GameConfig.stageWidth - 20, border.height - bottom.height - 10);
        this._scrollList = ComponentManager.getScrollList(AcDailyGiftScrollItem, list, rect);
        this._scrollList.x = GameConfig.stageWidth / 2 - this._scrollList.width / 2; //bottomBg.x;
        this._scrollList.y = border.y + 5;
        this.addChildToContainer(this._scrollList);
        this.updateStatus();
    };
    AcDailyGiftView.prototype.dailyGiftBtnHandler = function () {
        //每日奖励
        NetManager.request(NetRequestConst.REQUEST_ACTIVITY_GETFREEDAILYGIFT, { activeId: this.aid + "-" + this.code });
    };
    AcDailyGiftView.prototype.dailyGiftCallback = function (event) {
        var data = event.data;
        if (data.data.ret == 0) {
            //领取成功
            var rewObj = GameData.formatRewardItem(data.data.data.rewards);
            App.CommonUtil.playRewardFlyAction(rewObj);
            this.dailyGiftBtn.setBtnBitMap("acdailygiftview_boxget");
            this.dailyGiftBtn.setEnable(false);
            return;
        }
        else {
            App.CommonUtil.showTip(LanguageManager.getlocal("dailyGiftFailure"));
        }
    };
    AcDailyGiftView.prototype.receivePushData = function (event) {
        var data = event.data;
        // let data:{ret:boolean,data:any}=event.data;
        if (data.data.ret == 0 && data.data.cmd == NetPushConst.PUSH_PAY) {
            var cfg = Config.RechargeCfg.getRechargeItemCfgByKey(data.data.data.payment.itemId);
            var rewards = "1_1_" + cfg.gemCost + "|" + data.data.data.rewards;
            var rewObj = GameData.formatRewardItem(rewards);
            App.CommonUtil.playRewardFlyAction(rewObj);
            if (data.data.data.payment) {
                // let itemid=data.data.data.payment.itemId;
                // PlatformManager.analyticsPay(itemid,data.data.data.payment.orderId);
            }
        }
    };
    AcDailyGiftView.prototype.getTitleBgName = function () {
        return "commonview_db_04";
    };
    AcDailyGiftView.prototype.getRuleInfo = function () {
        return _super.prototype.getRuleInfo.call(this);
    };
    AcDailyGiftView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "rechargevie_db_01", "itemicon1", "adult_lowbg", "activity_db_01"
        ]);
    };
    AcDailyGiftView.prototype.getTitleStr = function () {
        return this.aid + "_Title";
    };
    AcDailyGiftView.prototype.updateStatus = function () {
        if (this.vo.freegift == 1) {
            this.dailyGiftBtn.setBtnBitMap("acdailygiftview_box");
            this.dailyGiftBtn.setEnable(true);
            this.dailyGiftBtn.showStatusIcon("public_dot2");
        }
        else {
            this.dailyGiftBtn.setBtnBitMap("acdailygiftview_boxget");
            this.dailyGiftBtn.setEnable(false);
            this.dailyGiftBtn.removeStatusIcon();
        }
        if (this._scrollList != null) {
            var cfgObj = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
            var dailyGiftCfg = cfgObj.dailyCost;
            var list = [];
            var dailyCostData = null;
            for (var key in dailyGiftCfg) {
                dailyCostData = dailyGiftCfg[key];
                var cfg = Config.RechargeCfg.getRechargeItemCfgByKey(dailyCostData["cost"]);
                list.push({ code: this.code, cfg: cfg, limit: dailyCostData["limit"], rechargeId: dailyCostData["cost"], rechargeCount: this.vo.ainfo[dailyCostData["cost"]] });
            }
            this._scrollList.refreshData(list);
        }
    };
    AcDailyGiftView.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(NetPushConst.PUSH_PAY, this.receivePushData, this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_DAILYGIFT_REFRESHVO, this.updateStatus, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_GETFREEDAILYGIFT), this.dailyGiftCallback, this);
        this.bgImg = null;
        this.titleText = null;
        this.dailyGiftBtn = null;
        this.dailyGiftText = null;
        this.dailyGiftRedPoint = null;
        this._scrollList = null;
        this._code = null;
        _super.prototype.dispose.call(this);
    };
    return AcDailyGiftView;
}(AcCommonView));
__reflect(AcDailyGiftView.prototype, "AcDailyGiftView");
