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
var AcRedPackResultView = (function (_super) {
    __extends(AcRedPackResultView, _super);
    function AcRedPackResultView() {
        var _this = _super.call(this) || this;
        _this._aid = null;
        _this._code = null;
        _this._parentNode = null;
        _this._isLvbu = false;
        _this._isFour = false;
        _this._isTwo = false;
        return _this;
    }
    Object.defineProperty(AcRedPackResultView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this._aid, this._code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcRedPackResultView.prototype, "acVo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this._aid, this._code);
        },
        enumerable: true,
        configurable: true
    });
    AcRedPackResultView.prototype.initView = function () {
        this._aid = this.param.data.aid;
        this._code = this.param.data.code;
        this._parentNode = this.param.data.parentNode;
        //是否还有吕布
        var isHasFirstRecharge = false; //Api.rechargeVoApi.checkFirstRechargeNoLvbu(); 
        //是否打开吕布开关
        var isNewRecharge = Api.switchVoApi.checknewRecharge();
        if (isNewRecharge && isHasFirstRecharge) {
            this._isLvbu = true;
        }
        //是否有4倍
        this._isFour = Api.shopVoApi.getfourRateCharge();
        //充值列表
        var rechargelistCfg = Config.RechargeCfg.getNormalRechargeCfg();
        var l = rechargelistCfg.length;
        var rData = null;
        for (var i = 0; i < l; i++) {
            rData = rechargelistCfg[i];
            if (!Api.shopVoApi.getPayInfoById(rData.id)) {
                this._isTwo = true;
                break;
            }
        }
        var descStr = LanguageManager.getlocal("acRedPackWinDesc1", [this.acVo.getAddgem().toString()]);
        var descText = ComponentManager.getTextField(descStr, 22, TextFieldConst.COLOR_BROWN);
        descText.lineSpacing = 5;
        descText.textAlign = egret.HorizontalAlign.CENTER;
        descText.x = this.viewBg.x + this.viewBg.width / 2 - descText.width / 2;
        descText.y = this.viewBg.y + 20 + 50 - descText.height / 2;
        this.addChild(descText);
        var chargeBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "acRedPackWinRecharge", this.chargeBtnListener.bind(this), this, null, null, 24);
        chargeBtn.x = this.viewBg.x + this.viewBg.width / 2 - chargeBtn.width / 2;
        chargeBtn.y = this.viewBg.y + 120;
        this.addChild(chargeBtn);
        var bottomText = ComponentManager.getTextField("*" + LanguageManager.getlocal("acRedPackDesc"), 18, 0x167b2e);
        bottomText.lineSpacing = 3;
        bottomText.textAlign = egret.HorizontalAlign.CENTER;
        bottomText.x = this.viewBg.x + this.viewBg.width / 2 - bottomText.width / 2;
        bottomText.y = this.viewBg.y + this.viewBg.height - 40 - bottomText.height;
        this.addChild(bottomText);
        // this.container.addTouchTap(this.hide,this);
    };
    AcRedPackResultView.prototype.resetBgSize = function () {
        _super.prototype.resetBgSize.call(this);
        this.closeBtn.x = this.viewBg.x + this.viewBg.width - this.closeBtn.width / 2;
        this.closeBtn.y = this.viewBg.y - this.closeBtn.width / 2 + 10;
    };
    AcRedPackResultView.prototype.isTouchMaskClose = function () {
        return true;
    };
    AcRedPackResultView.prototype.chargeBtnListener = function () {
        var t = this.acVo.et - GameData.serverTime;
        if (t < 0) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
        if (this.acVo.checkIsInEndShowTime()) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
        if (this._isLvbu) {
            ViewController.getInstance().openView(ViewConst.POPUP.FIRSTRECHARGEVIEW);
        }
        else {
            var viewName = App.StringUtil.firstCharToUper("recharge");
            ViewController.getInstance().openView(viewName + "Vip" + "View");
        }
        // if(this._parentNode){
        //     this._parentNode.hide();
        // }
        this.hide();
    };
    AcRedPackResultView.prototype.getCloseBtnName = function () {
        return ButtonConst.POPUP_CLOSE_BTN_2;
    };
    AcRedPackResultView.prototype.getTitleStr = function () {
        return null;
    };
    /**
     * 重写 初始化viewbg
     */
    AcRedPackResultView.prototype.initBg = function () {
        this.viewBg = BaseLoadBitmap.create("redpack_resultbg");
        this.viewBg.width = 572;
        this.viewBg.height = 284;
        this.viewBg.setPosition(GameConfig.stageWidth / 2 - this.viewBg.width / 2, GameConfig.stageHeigth / 2 - this.viewBg.height / 2);
        this.addChild(this.viewBg);
        this.viewBg.addTouchTap(function () { }, this);
        var wordBM = BaseBitmap.create("tailor_get_word");
        wordBM.x = GameConfig.stageWidth / 2 - wordBM.width / 2;
        wordBM.y = this.viewBg.y - 200;
        this.addChild(wordBM);
    };
    AcRedPackResultView.prototype.dispose = function () {
        this._aid = null;
        this._code = null;
        this._parentNode = null;
        this._isLvbu = false;
        this._isFour = false;
        this._isTwo = false;
        _super.prototype.dispose.call(this);
    };
    return AcRedPackResultView;
}(PopupView));
__reflect(AcRedPackResultView.prototype, "AcRedPackResultView");
//# sourceMappingURL=AcRedPackResultView.js.map