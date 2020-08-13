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
  * 首冲重置 活动
  * @author 张朝阳
  * date 2019/6/24
  * @class AcRechargeResetView
  */
var AcRechargeResetView = (function (_super) {
    __extends(AcRechargeResetView, _super);
    function AcRechargeResetView() {
        var _this = _super.call(this) || this;
        _this._countDownTime = null;
        return _this;
    }
    AcRechargeResetView.prototype.initView = function () {
        var _this = this;
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        vo.setOpenTime();
        var bg = BaseLoadBitmap.create("acrechargeresetview_bg");
        bg.width = 640;
        bg.height = 534;
        bg.setPosition(0, GameConfig.stageHeigth / 2 - bg.height / 2);
        this.addChildToContainer(bg);
        var titleTF = ComponentManager.getTextField(LanguageManager.getlocal("acRechargeResetViewTitle-" + this.code), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BLACK);
        titleTF.setPosition(bg.x + bg.width / 2 - titleTF.width / 2, bg.y + 42 - titleTF.height / 2);
        this.addChildToContainer(titleTF);
        var midBg = BaseLoadBitmap.create("acrechargeresetview_midbg");
        midBg.width = 574;
        midBg.height = 202;
        midBg.setPosition(bg.x + bg.width / 2 - midBg.width / 2, bg.y + 77);
        this.addChildToContainer(midBg);
        this._countDownTime = ComponentManager.getTextField(LanguageManager.getlocal("acRechargeResetView_acCountTime-" + this.code, [vo.acCountDown]), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_WHITE);
        this._countDownTime.setPosition(GameConfig.stageWidth / 2 - this._countDownTime.width / 2, midBg.y + 175 - this._countDownTime.height / 2);
        this.addChildToContainer(this._countDownTime);
        var acTime = ComponentManager.getTextField(LanguageManager.getlocal("acRechargeResetView_acTime-" + this.code, [vo.acTimeAndHour]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
        acTime.setPosition(bg.x + 60, midBg.y + midBg.height + 10);
        this.addChildToContainer(acTime);
        var descTF = ComponentManager.getTextField(LanguageManager.getlocal("acRechargeResetViewDesc-" + this.code), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
        descTF.width = 520;
        descTF.lineSpacing = 5;
        descTF.setPosition(midBg.x + midBg.width / 2 - descTF.width / 2, acTime.y + acTime.height + 5);
        this.addChildToContainer(descTF);
        var chargeBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_RED, "gotocharge", function () {
            var v = Api.acVoApi.getActivityVoByAidAndCode(_this.aid, _this.code);
            if ((!v.isStart)) {
                App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
                return;
            }
            ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
        }, this);
        chargeBtn.setPosition(bg.x + bg.width / 2 - chargeBtn.width / 2, bg.y + 450 - chargeBtn.height / 2);
        this.addChildToContainer(chargeBtn);
        this.closeBtn.setPosition(bg.x + bg.width - this.closeBtn.width, bg.y);
        this.tick();
    };
    AcRechargeResetView.prototype.tick = function () {
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        if (vo.checkIsInEndShowTime()) {
            this._countDownTime.text = LanguageManager.getlocal("acPunishEnd");
        }
        else {
            this._countDownTime.text = LanguageManager.getlocal("acRechargeResetView_acCountTime-" + this.code, [vo.acCountDown]);
        }
        this._countDownTime.x = GameConfig.stageWidth / 2 - this._countDownTime.width / 2;
    };
    // protected getRuleInfo(): string {
    //     return "acGiftReturnRuleInfo-" + this.code;
    // }
    AcRechargeResetView.prototype.getBgName = function () {
        return null;
    };
    AcRechargeResetView.prototype.getTitleBgName = function () {
        return null;
    };
    AcRechargeResetView.prototype.getTitleStr = function () {
        return null;
    };
    AcRechargeResetView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "sharepopupview_closebtn"
        ]);
    };
    AcRechargeResetView.prototype.getUiCode = function () {
        return _super.prototype.getUiCode.call(this);
    };
    AcRechargeResetView.prototype.getProbablyInfo = function () {
        return "";
    };
    /**
     * 重新一下关闭按钮
     */
    AcRechargeResetView.prototype.getCloseBtnName = function () {
        return "sharepopupview_closebtn";
    };
    AcRechargeResetView.prototype.dispose = function () {
        this._countDownTime = null;
        // this._countDownTimeBg = null;
        _super.prototype.dispose.call(this);
    };
    return AcRechargeResetView;
}(AcCommonView));
__reflect(AcRechargeResetView.prototype, "AcRechargeResetView");
//# sourceMappingURL=AcRechargeResetView.js.map