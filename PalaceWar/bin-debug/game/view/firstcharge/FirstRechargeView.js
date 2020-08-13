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
var FirstRechargeView = (function (_super) {
    __extends(FirstRechargeView, _super);
    function FirstRechargeView() {
        var _this = _super.call(this) || this;
        _this._container = null;
        _this.getBtnY = 0;
        _this._lightArr = [];
        return _this;
    }
    FirstRechargeView.prototype.initView = function () {
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_SHOP_FIRSTCHARGEREWARD), this.useCallback, this);
        var rechargeArr = [];
        var rechargeArr2 = Config.RechargeCfg.getNormalRechargeCfg();
        for (var i = 0; i < rechargeArr2.length; i++) {
            var _id = rechargeArr2[i].id;
            var boo = Config.FirstchargeCfg.getneedRecharge(_id);
            if (boo) {
                rechargeArr.push(rechargeArr2[i]);
            }
        }
        rechargeArr = rechargeArr.reverse();
        this.showReward(this.viewBg, this.viewBg.y + 587);
        var starX = 90 + GameData.popupviewOffsetX;
        var payflag = Api.shopVoApi.getPayFlag();
        this._container = new BaseDisplayObjectContainer();
        this.addChild(this._container);
        var getBtn = ComponentManager.getButton("recharge_bigbtn", "taskCollect", this.clickBtnHandler, this);
        // getBtn.x = this.viewBg.width/2 - getBtn.width/2;//this.viewBg.x+250;
        this.setLayoutPosition(LayoutConst.horizontalCenter, getBtn, this.viewBg);
        getBtn.y = this.viewBg.y + 770;
        this.addChild(getBtn);
        this._getBtn = getBtn;
        getBtn.visible = false;
        if (payflag == 0) {
            App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_PAYMENT, this.useCallback2, this);
            for (var i = 0; i < rechargeArr.length; i++) {
                var getBtn_1 = ComponentManager.getButton("recharge_bigbtn", "", this.clickGetBtnHandler, this);
                var num = i % 2;
                getBtn_1.setTextSize(20);
                getBtn_1.setPosition(starX + (getBtn_1.width + 75) * num, (getBtn_1.height + 40) * Math.floor(i / 2) + this.viewBg.y + 700);
                var params = [];
                if (PlatformManager.checkisLocalPrice() && rechargeArr[i].platFullPrice) {
                    params.push(rechargeArr[i].platFullPrice);
                }
                else {
                    params.push(String(rechargeArr[i].cost));
                }
                var btnStr = LanguageManager.getlocal("firstRecharge" + (i + 1), params);
                getBtn_1.setText(btnStr, false);
                this._container.addChild(getBtn_1);
                var rechargeDes = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON);
                rechargeDes.text = LanguageManager.getlocal("firstRechargeDes1", [rechargeArr[i].gemCost * 4 + ""]);
                rechargeDes.x = getBtn_1.x + 30;
                rechargeDes.y = getBtn_1.y + getBtn_1.height + 5;
                this._container.addChild(rechargeDes);
            }
            var firstDes = ComponentManager.getTextField(LanguageManager.getlocal("firstRechargeDes"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WARN_YELLOW);
            firstDes.width = GameConfig.stageWidth;
            firstDes.textAlign = TextFieldConst.ALIGH_CENTER;
            firstDes.y = this.viewBg.y + 915;
            this._container.addChild(firstDes);
        }
        else if (payflag == 1) {
            var getBtn_2 = ComponentManager.getButton("recharge_bigbtn", "taskCollect", this.clickBtnHandler, this);
            this.setLayoutPosition(LayoutConst.horizontalCenter, getBtn_2, this.viewBg);
            getBtn_2.y = this.viewBg.y + 770;
            this.addChild(getBtn_2);
            this._getBtn = getBtn_2;
        }
        var firstrEffect = ComponentManager.getCustomMovieClip("firstrecharge_", 18, 100);
        firstrEffect.x = 376;
        firstrEffect.y = this.viewBg.y + 190;
        this.addChild(firstrEffect);
        firstrEffect.playWithTime(0);
        var ths = this;
        var lightxArr = [384, 464, 525, 605];
        var lightyArr = [243, 210, 243, 195];
        var lightTime = [150, 300, 450, 600];
        for (var i = 0; i < 4; i++) {
            var light = BaseBitmap.create("firstecharge_light");
            this.addChild(light);
            light.anchorOffsetX = light.width / 2;
            light.anchorOffsetY = light.height / 2;
            light.x = lightxArr[i];
            light.y = lightyArr[i] + this.viewBg.y;
            this._lightArr.push(light);
            egret.Tween.get(light, { loop: true }).wait(lightTime[i]).to({ rotation: 150, scaleX: 0, scaleY: 0 }, 1450);
        }
    };
    FirstRechargeView.prototype.showReward = function (bg, iconY) {
        if (iconY === void 0) { iconY = 0; }
        var temScale = 0.78;
        var spaceW = 8;
        var spaceH = 10;
        var rewardList = Config.FirstchargeCfg.getRewardItemVoList();
        var totalNum = rewardList.length;
        for (var i = 0; i < rewardList.length; i++) {
            var icon = GameData.getItemIcon(rewardList[i], true, true);
            icon.scaleX = icon.scaleY = temScale;
            icon.x = bg.x + bg.width / 2 + (icon.width * temScale) * (i - totalNum / 2) + spaceW * (i - (totalNum - 1) / 2);
            icon.y = iconY;
            this.addChild(icon);
        }
    };
    FirstRechargeView.prototype.clickBtnHandler = function () {
        var payflag = Api.shopVoApi.getPayFlag();
        if (payflag == 1) {
            NetManager.request(NetRequestConst.REQUEST_SHOP_FIRSTCHARGEREWARD, null);
        }
        else {
            ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
        }
    };
    FirstRechargeView.prototype.useCallback2 = function (evt) {
        var payflag = Api.shopVoApi.getPayFlag();
        if (payflag == 1) {
            if (this._container) {
                this._container.visible = false;
            }
            if (this._getBtn) {
                this._getBtn.visible = true;
            }
        }
    };
    FirstRechargeView.prototype.useCallback = function (event) {
        if (event === void 0) { event = null; }
        var payflag = Api.shopVoApi.getPayFlag();
        if (payflag == 2 && this._getBtn) {
            this._getBtn.visible = false;
            var hasGetSp = BaseBitmap.create("signin_had_get");
            hasGetSp.x = this._getBtn.x + this._getBtn.width / 2 - hasGetSp.width / 2;
            hasGetSp.y = this._getBtn.y + this._getBtn.height / 2 - hasGetSp.height / 2;
            this.addChild(hasGetSp);
            var rewardList = Config.FirstchargeCfg.getRewardItemVoList();
            if (rewardList) {
                var globalPt = this.localToGlobal(this._getBtn.x, this._getBtn.y - 40);
                var runPos = new egret.Point(globalPt.x + 55, globalPt.y - 30);
                App.CommonUtil.playRewardFlyAction(rewardList, runPos);
            }
            App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_PAYMENT, this.useCallback, this);
        }
        else if (payflag == 1 && this._getBtn) {
            this._getBtn.setText("taskCollect");
        }
    };
    FirstRechargeView.prototype.clickGetBtnHandler = function () {
        ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
    };
    FirstRechargeView.prototype.initBg = function () {
        this.viewBg = BaseLoadBitmap.create("firstrecharge_newbg");
        this.viewBg.height = 960;
        this.viewBg.width = 640;
        this.viewBg.setPosition(GameConfig.stageWidth / 2 - this.viewBg.width / 2, GameConfig.stageHeigth / 2 - this.viewBg.height / 2);
        this.addChild(this.viewBg);
    };
    /**
     * 重置背景的高度 主要设置 btn的位置
     * 仅适用于新的分享
     */
    FirstRechargeView.prototype.resetBgSize = function () {
        this.closeBtn.setPosition(this.viewBg.x + this.viewBg.width - this.closeBtn.width, this.viewBg.y + this.closeBtn.height - 40);
    };
    FirstRechargeView.prototype.getTitleBgName = function () {
        return null;
    };
    FirstRechargeView.prototype.getCloseBtnName = function () {
        return "firstrecharge_newbtn";
    };
    FirstRechargeView.prototype.getTitleStr = function () {
        return null;
    };
    FirstRechargeView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "firstrecharge_newbtn",
            "firstrecharge_newbtn_down",
            "recharge_bigbtn",
            "recharge_bigbtn_down",
            "signin_had_get",
            "firstrecharge",
            "firstecharge_light"
        ]);
    };
    FirstRechargeView.prototype.clearlight = function () {
        for (var i = 0; i < this._lightArr.length; i++) {
            egret.Tween.removeTweens(this._lightArr[i]);
            if (this._lightArr[i] && this._lightArr[i].parent) {
                this._lightArr[i].parent.removeChild(this._lightArr[i]);
            }
        }
    };
    FirstRechargeView.prototype.dispose = function () {
        this.clearlight();
        _super.prototype.dispose.call(this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_SHOP_FIRSTCHARGEREWARD), this.useCallback, this);
        this._getBtn = null;
        this._container = null;
        this._lightArr = [];
    };
    return FirstRechargeView;
}(PopupView));
__reflect(FirstRechargeView.prototype, "FirstRechargeView");
//# sourceMappingURL=FirstRechargeView.js.map