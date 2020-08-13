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
var TimeLimitWifeView = (function (_super) {
    __extends(TimeLimitWifeView, _super);
    function TimeLimitWifeView() {
        var _this = _super.call(this) || this;
        _this._rechargeBtn = null;
        _this._timeTF = null;
        return _this;
    }
    Object.defineProperty(TimeLimitWifeView.prototype, "vo", {
        get: function () {
            return Api.otherInfoVoApi.getGeneralShareInfo();
        },
        enumerable: true,
        configurable: true
    });
    TimeLimitWifeView.prototype.initView = function () {
        App.MessageHelper.addNetMessage(NetPushConst.PUSH_PAY, this.rewardHandler, this);
        var cfg = Config.RechargeCfg.getRechargeItemCfgByKey("g16");
        var vo = Api.shopVoApi.getPayInfoById2("g16");
        if ((!cfg) || (!vo)) {
            return;
        }
        var rewardVo = GameData.formatRewardItem(cfg.getReward);
        //元宝icon
        var gemRewardVo = GameData.formatRewardItem("1_1_" + cfg.gemCost);
        var gemDB = GameData.getItemIcon(gemRewardVo[0], true, true);
        gemDB.setScale(0.7);
        gemDB.setPosition(this.viewBg.x + 230, this.viewBg.y + this.viewBg.height - 212 - gemDB.height * gemDB.$getScaleY() / 2);
        this.addChild(gemDB);
        for (var i = 1; i < rewardVo.length; i++) {
            var itemDB = GameData.getItemIcon(rewardVo[i], true, true);
            itemDB.setScale(0.7);
            itemDB.setPosition(this.viewBg.x + 230 + (i) * (itemDB.width + 10) * itemDB.$getScaleX(), this.viewBg.y + this.viewBg.height - 212 - itemDB.height * itemDB.$getScaleY() / 2);
            this.addChild(itemDB);
        }
        var rechargeBtn = ComponentManager.getButton("firstchargebutton02", "", this.rechargeClick, this);
        rechargeBtn.setText(LanguageManager.getlocal("firstRecharge1", [String(cfg.cost)]), false);
        rechargeBtn.setColor(0xfff9cd);
        rechargeBtn.setPosition(this.viewBg.x + this.viewBg.width / 2 - rechargeBtn.width / 2, this.viewBg.y + this.viewBg.height - rechargeBtn.height - 90);
        this.addChild(rechargeBtn);
        var timeStr = "";
        // if(PlatformManager.checkIsWxSp()){
        // 	let curDay0 = App.DateUtil.getWeeTs(GameData.serverTime);
        // 	let curDay5 = curDay0 + 3600 * 5;
        // 	let endTime = 0;
        // 	if(GameData.serverTime > curDay5){
        // 		//第二天的5点
        // 		endTime = curDay5 + 86400;
        // 	} else {
        // 		endTime = curDay5;
        // 	}
        // 	timeStr = App.DateUtil.getFormatBySecond(endTime  - GameData.serverTime,1);
        // } else {
        // 	let et = vo.st + cfg.lastTime;
        // 	timeStr = App.DateUtil.getFormatBySecond(et - GameData.serverTime,1);
        // }	
        var et = vo.st + cfg.lastTime;
        timeStr = App.DateUtil.getFormatBySecond(et - GameData.serverTime, 1);
        this._timeTF = ComponentManager.getTextField(LanguageManager.getlocal("timelimitwifeview_time", [timeStr]), TextFieldConst.FONTSIZE_CONTENT_COMMON, 0x885d34);
        this._timeTF.setPosition(this.viewBg.x + this.viewBg.width / 2 - this._timeTF.width / 2, this.viewBg.y + this.viewBg.height - this._timeTF.height - 40);
        this.addChild(this._timeTF);
        TickManager.addTick(this.tick, this);
        this.tick();
    };
    /**
     * 时间倒计时
     */
    TimeLimitWifeView.prototype.tick = function () {
        var cfg = Config.RechargeCfg.getRechargeItemCfgByKey("g16");
        var vo = Api.shopVoApi.getPayInfoById2("g16");
        var timeStr = "";
        // if(PlatformManager.checkIsWxSp()){
        // 	let curDay0 = App.DateUtil.getWeeTs(GameData.serverTime);
        // 	let curDay5 = curDay0 + 3600 * 5;
        // 	let endTime = 0;
        // 	if(GameData.serverTime > curDay5){
        // 		//第二天的5点
        // 		endTime = curDay5 + 86400;
        // 	} else {
        // 		endTime = curDay5;
        // 	}
        // 	timeStr = App.DateUtil.getFormatBySecond(endTime  - GameData.serverTime,1);
        // } else {
        // 	let et = vo.st + cfg.lastTime;
        // 	if(et < GameData.serverTime)
        // 	{
        // 		this.hide();
        // 		return;
        // 	}
        // 	timeStr = App.DateUtil.getFormatBySecond(et - GameData.serverTime,1);
        // }
        var et = vo.st + cfg.lastTime;
        if (et < GameData.serverTime) {
            this.hide();
            return;
        }
        timeStr = App.DateUtil.getFormatBySecond(et - GameData.serverTime, 1);
        this._timeTF.text = LanguageManager.getlocal("timelimitwifeview_time", [timeStr]);
        this._timeTF.setPosition(this.viewBg.x + this.viewBg.width / 2 - this._timeTF.width / 2, this.viewBg.y + this.viewBg.height - this._timeTF.height - 40);
    };
    /**
     * 重新一下关闭按钮
     */
    TimeLimitWifeView.prototype.getCloseBtnName = function () {
        return "btn_lantern";
    };
    /**
     * 重新一下title按钮
     */
    TimeLimitWifeView.prototype.getTitleBgName = function () {
        return "";
    };
    /**
     * 重写 初始化viewbg
     */
    TimeLimitWifeView.prototype.initBg = function () {
        if (PlatformManager.checkIsWanbaSp() || PlatformManager.checkIsQQXYXSp()) {
            this.viewBg = BaseBitmap.create("timelimitwifeview_bg_wanba");
        }
        else {
            this.viewBg = BaseBitmap.create("timelimitwifeview_bg");
        }
        this.viewBg.setPosition(GameConfig.stageWidth / 2 - this.viewBg.width / 2, GameConfig.stageHeigth / 2 - this.viewBg.height / 2);
        this.addChild(this.viewBg);
    };
    TimeLimitWifeView.prototype.rewardHandler = function (event) {
        var rewards = event.data.data.data.rewards;
        console.log("qingqiu");
        if (rewards) {
            var cfg = Config.RechargeCfg.getRechargeItemCfgByKey("g16");
            rewards = "1_1_" + cfg.gemCost + "|" + rewards;
            ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW, rewards);
            this.hide();
        }
    };
    /**
     * 重置背景的高度 主要设置 btn的位置
     */
    TimeLimitWifeView.prototype.resetBgSize = function () {
        this.closeBtn.setPosition(this.viewBg.x + 470, this.viewBg.y + 22);
    };
    TimeLimitWifeView.prototype.getResourceList = function () {
        if (PlatformManager.checkIsWanbaSp() || PlatformManager.checkIsQQXYXSp()) {
            // this.viewBg = BaseBitmap.create("timelimitwifeview_bg_wanba");
            return _super.prototype.getResourceList.call(this).concat([
                "collectflag", "timelimitwifeview_bg_wanba", "firstchargebutton02", "itemeffect"
            ]);
        }
        else {
            return _super.prototype.getResourceList.call(this).concat([
                "collectflag", "timelimitwifeview_bg", "firstchargebutton02", "itemeffect"
            ]);
        }
    };
    TimeLimitWifeView.prototype.getTitleStr = function () {
        return null;
    };
    /**
     * 新的面板请求
     */
    TimeLimitWifeView.prototype.rechargeClick = function (parm) {
        console.log("qingqiu");
        var cfg = Config.RechargeCfg.getRechargeItemCfgByKey("g16");
        if (!cfg) {
            return;
        }
        PlatformManager.pay(cfg.id);
    };
    TimeLimitWifeView.prototype.receiveData = function (data) {
    };
    /**
     * 重写关闭方法
     */
    TimeLimitWifeView.prototype.closeHandler = function () {
        this.hide();
    };
    TimeLimitWifeView.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(NetPushConst.PUSH_PAY, this.rewardHandler, this);
        TickManager.removeTick(this.tick, this);
        _super.prototype.dispose.call(this);
    };
    return TimeLimitWifeView;
}(PopupView));
__reflect(TimeLimitWifeView.prototype, "TimeLimitWifeView");
