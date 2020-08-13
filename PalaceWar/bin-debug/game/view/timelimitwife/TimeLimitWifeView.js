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
  * 一元限时红颜
  * @author 张朝阳
  * date 2018/9/3
  * @class TimeLimitWifeView
  */
var TimeLimitWifeView = (function (_super) {
    __extends(TimeLimitWifeView, _super);
    function TimeLimitWifeView() {
        var _this = _super.call(this) || this;
        _this._rechargeBtn = null;
        _this._timeTF = null;
        return _this;
    }
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
        gemDB.setScale(0.85);
        gemDB.setPosition(this.viewBg.x + 170 + GameData.popupviewOffsetX, this.viewBg.y + this.viewBg.height - 115 - gemDB.height);
        this.addChild(gemDB);
        for (var i = 1; i < rewardVo.length; i++) {
            var itemDB = GameData.getItemIcon(rewardVo[i], true, true);
            itemDB.setScale(0.85);
            itemDB.setPosition(this.viewBg.x + 170 + (i) * (itemDB.width - 8) + GameData.popupviewOffsetX, this.viewBg.y + this.viewBg.height - 115 - itemDB.height);
            this.addChild(itemDB);
        }
        var rechargeBtn = ComponentManager.getButton(ButtonConst.BTN_RECHARGE, "", this.rechargeClick, this);
        rechargeBtn.setBtnCdSecond(30);
        var params = [];
        if (PlatformManager.checkisLocalPrice() && cfg.platFullPrice) {
            params.push(cfg.platFullPrice);
        }
        else {
            params.push(String(cfg.cost));
        }
        rechargeBtn.setText(LanguageManager.getlocal("firstRecharge1", params), false);
        rechargeBtn.setColor(TextFieldConst.COLOR_BLACK);
        rechargeBtn.setPosition(this.viewBg.x + this.viewBg.width / 2 - rechargeBtn.width / 2, this.viewBg.y + this.viewBg.height - rechargeBtn.height - 30);
        this.addChild(rechargeBtn);
        var et = vo.st + cfg.lastTime;
        var timeStr = App.DateUtil.getFormatBySecond(et - GameData.serverTime, 1);
        this._timeTF = ComponentManager.getTextField(LanguageManager.getlocal("timelimitwifeview_time", [timeStr]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WARN_RED2);
        this._timeTF.setPosition(this.viewBg.x + this.viewBg.width / 2 - this._timeTF.width / 2, this.viewBg.y + this.viewBg.height - this._timeTF.height - 90);
        this.addChild(this._timeTF);
        this.tick();
        //vip 经验提示文字
        var tipBg = BaseBitmap.create("public_searchdescbg");
        var tipTxt = ComponentManager.getTextField(LanguageManager.getlocal("addVipExpTip"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        tipBg.width = tipTxt.width + 60;
        tipBg.setPosition(this.viewBg.x + this.viewBg.width / 2 - tipBg.width / 2, this.viewBg.y + this.viewBg.height);
        tipTxt.setPosition(tipBg.x + tipBg.width / 2 - tipTxt.width / 2, tipBg.y + tipBg.height / 2 - tipTxt.height / 2);
        this.addChild(tipBg);
        this.addChild(tipTxt);
    };
    /**
     * 时间倒计时
     */
    TimeLimitWifeView.prototype.tick = function () {
        var cfg = Config.RechargeCfg.getRechargeItemCfgByKey("g16");
        var vo = Api.shopVoApi.getPayInfoById2("g16");
        var et = vo.st + cfg.lastTime;
        if (et < GameData.serverTime) {
            this.hide();
            return;
        }
        var timeStr = App.DateUtil.getFormatBySecond(et - GameData.serverTime, 1);
        this._timeTF.text = LanguageManager.getlocal("timelimitwifeview_time", [timeStr]);
        this._timeTF.setPosition(this.viewBg.x + this.viewBg.width / 2 - this._timeTF.width / 2, this.viewBg.y + this.viewBg.height - this._timeTF.height - 90);
    };
    /**
     * 重新一下关闭按钮
     */
    TimeLimitWifeView.prototype.getCloseBtnName = function () {
        return "sharepopupview_closebtn";
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
        var viewBgStr = "timelimitwifeview_bg";
        if (PlatformManager.checkisLocalPrice()) {
            var bgStr = "timelimitwifeview_bg_" + PlatformManager.getSpid() + "hwtype";
            if (ResourceManager.hasRes(bgStr)) {
                viewBgStr = bgStr;
            }
        }
        this.viewBg = BaseBitmap.create(viewBgStr);
        this.viewBg.setPosition(GameConfig.stageWidth / 2 - this.viewBg.width / 2, GameConfig.stageHeigth / 2 - this.viewBg.height / 2);
        this.addChild(this.viewBg);
    };
    TimeLimitWifeView.prototype.rewardHandler = function (event) {
        var rewards = event.data.data.data.rewards;
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
        this.closeBtn.setPosition(this.viewBg.x + (PlatformManager.hasSpcialCloseBtn() ? 0 : 535), this.viewBg.y + 102);
    };
    TimeLimitWifeView.prototype.getResourceList = function () {
        var resArr = [PlatformManager.checkIsThHw() ? "timelimitwifeview_bg_thhwtype" : "timelimitwifeview_bg", "sharepopupview_closebtn", "sharepopupview_closebtn_down"];
        var bgStr = "timelimitwifeview_bg";
        if (PlatformManager.checkisLocalPrice()) {
            var tmpbgStr = "timelimitwifeview_bg" + "_" + PlatformManager.getSpid() + "hwtype";
            if (ResourceManager.hasRes(tmpbgStr)) {
                bgStr = tmpbgStr;
            }
        }
        if (bgStr) {
            resArr.push(bgStr);
        }
        return _super.prototype.getResourceList.call(this).concat(resArr);
    };
    TimeLimitWifeView.prototype.getTitleStr = function () {
        return null;
    };
    /**
     * 新的面板请求
     */
    TimeLimitWifeView.prototype.rechargeClick = function (parm) {
        console.log("qingqiu");
        if (GameData.idcardSwitch == true && GameData.idcardNormal == 1 && Api.gameinfoVoApi.getRealnameRewards() == null) {
            ViewController.getInstance().openView(ViewConst.POPUP.REALNAMEREWARDSPOPUPVIEW);
            return;
        }
        var cfg = Config.RechargeCfg.getRechargeItemCfgByKey("g16");
        if (!cfg) {
            return;
        }
        PlatformManager.checkPay(cfg.id);
    };
    /**
     * 重写关闭方法
     */
    TimeLimitWifeView.prototype.closeHandler = function () {
        this.hide();
    };
    TimeLimitWifeView.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(NetPushConst.PUSH_PAY, this.rewardHandler, this);
        _super.prototype.dispose.call(this);
    };
    return TimeLimitWifeView;
}(PopupView));
__reflect(TimeLimitWifeView.prototype, "TimeLimitWifeView");
//# sourceMappingURL=TimeLimitWifeView.js.map