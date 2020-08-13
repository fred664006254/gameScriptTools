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
var SecondRechargeView = (function (_super) {
    __extends(SecondRechargeView, _super);
    function SecondRechargeView() {
        var _this = _super.call(this) || this;
        _this._container = null;
        _this.getBtnY = 0;
        _this._lightArr = [];
        return _this;
    }
    SecondRechargeView.prototype.initView = function () {
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_SHOP_SECONDCHARGEREWARD), this.useCallback, this);
        // let bg2 = BaseLoadBitmap.create("firstchargebg02"); 
        var bg2 = null;
        if (App.CommonUtil.check_dragon() && RES.hasRes("wife_full_" + Config.SecondchargeCfg.getWifeId() + "_ske")) {
            bg2 = BaseLoadBitmap.create("secondchargebg");
            // bg2.height =958;
            // bg2.width = 640;
            bg2.height = 913;
            bg2.width = 611;
            // bg2.y =bg2.y+(GameConfig.stageHeigth -bg2.height )/2;
            bg2.x = GameConfig.stageWidth / 2 - bg2.width / 2;
            bg2.y = bg2.y + (GameConfig.stageHeigth - bg2.height) / 2;
            this.addChild(bg2);
            var mask = BaseBitmap.create("firstchargemask_new");
            mask.y = bg2.y;
            this.addChild(mask);
            var lvbu = App.DragonBonesUtil.getLoadDragonBones("wife_full_" + Config.SecondchargeCfg.getWifeId());
            lvbu.scaleX = 1;
            lvbu.scaleY = 1;
            lvbu.x = 270;
            lvbu.y = bg2.y + 750 - 80;
            lvbu.mask = mask;
            this.addChild(lvbu);
            // let fg = BaseLoadBitmap.create("secondchargefg"); 
            // // if(Api.switchVoApi.checkOpenFirstCharge6Times()){
            // // 	fg = BaseLoadBitmap.create("secondchargefg"); 
            // // } else {
            // // 	fg = BaseLoadBitmap.create("secondchargefg"); 
            // // }
            // fg.height = 640;
            // fg.width = 588;
            // fg.y = bg2.y - 40;
            // this.addChild(fg); 
        }
        else {
            bg2 = BaseLoadBitmap.create("secondchargebg");
            // bg2.height =958;
            // bg2.width = 640;
            bg2.height = 913;
            bg2.width = 611;
            // bg2.y =bg2.y+(GameConfig.stageHeigth -bg2.height )/2;
            bg2.x = GameConfig.stageWidth / 2 - bg2.width / 2;
            bg2.y = bg2.y + (GameConfig.stageHeigth - bg2.height) / 2;
            this.addChild(bg2);
            var mask = BaseBitmap.create("firstchargemask_new");
            mask.x = bg2.x;
            mask.y = bg2.y;
            this.addChild(mask);
            var lvbu = BaseLoadBitmap.create("wife_full_" + Config.SecondchargeCfg.getWifeId());
            lvbu.width = 640;
            lvbu.height = 840;
            lvbu.x = 25;
            lvbu.y = bg2.y + 50;
            lvbu.setScale(0.7);
            lvbu.mask = mask;
            this.addChild(lvbu);
        }
        var fg = BaseLoadBitmap.create("secondchargefg");
        fg.width = 611;
        fg.height = 500;
        fg.x = GameConfig.stageWidth / 2 - fg.width / 2;
        fg.y = bg2.y - 40;
        this.addChild(fg);
        var rechargeArr = [];
        var rechargeArr2 = Config.RechargeCfg.getNormalRechargeCfg();
        for (var i = 0; i < rechargeArr2.length; i++) {
            var _id = rechargeArr2[i].id;
            var boo = Config.SecondchargeCfg.getneedRecharge(_id);
            if (boo) {
                rechargeArr.push(rechargeArr2[i]);
            }
        }
        rechargeArr = rechargeArr.reverse();
        this.showReward(bg2, bg2.y + 569);
        var starX = 90;
        var payflag = Api.shopVoApi.getSecondRateCharge();
        this._container = new BaseDisplayObjectContainer();
        this.addChild(this._container);
        var getBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "taskCollect", this.clickBtnHandler, this);
        getBtn.x = 220;
        getBtn.y = this.viewBg.y + 770;
        this.addChild(getBtn);
        this._getBtn = getBtn;
        getBtn.visible = false;
        if (payflag == 0 && Api.wifeVoApi.getWifeInfoVoById(Config.SecondchargeCfg.getWifeId()) == null) {
            App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_PAYMENT, this.useCallback2, this);
            var butStr = ButtonConst.BTN_NORMAL_ORANGE;
            for (var i = 0; i < rechargeArr.length; i++) {
                if (i >= 2) {
                    butStr = ButtonConst.BTN_NORMAL_YELLOW;
                }
                var getBtn_1 = ComponentManager.getButton(butStr, "", this.clickGetBtnHandler, this, [rechargeArr[i]["id"]]);
                var num = i % 2;
                getBtn_1.setPosition(starX + (getBtn_1.width + 75) * num, (getBtn_1.height + 40) * Math.floor(i / 2) + bg2.y + 680);
                var btnStr = LanguageManager.getlocal("firstRecharge" + (i + 1), [rechargeArr[i].cost + ""]);
                getBtn_1.setText(btnStr, false);
                // getBtn.setColor(TextFieldConst.COLOR_BROWN);
                this._container.addChild(getBtn_1);
                var btnMark = BaseBitmap.create("firstchargemark2_4");
                btnMark.x = getBtn_1.x + 17;
                btnMark.y = getBtn_1.y + 3;
                this._container.addChild(btnMark);
                if (i == rechargeArr.length - 1) {
                    var btnMark2 = BaseBitmap.create("firstchargemark");
                    btnMark2.x = getBtn_1.x + getBtn_1.width - btnMark2.width / 2 - 25;
                    btnMark2.y = getBtn_1.y - btnMark2.height / 2 + 3;
                    this._container.addChild(btnMark2);
                }
                var rechargeDes = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, 0xfdda38);
                rechargeDes.text = LanguageManager.getlocal("firstRechargeDes1", [rechargeArr[i].gemCost * Config.SecondchargeCfg.getextra() + ""]);
                rechargeDes.x = getBtn_1.x + 30;
                rechargeDes.y = getBtn_1.y + getBtn_1.height + 5;
                this._container.addChild(rechargeDes);
            }
            var firstDes = ComponentManager.getTextField(LanguageManager.getlocal("firstRechargeNewDes", [String(Config.SecondchargeCfg.getextra())]), TextFieldConst.FONTSIZE_CONTENT_COMMON, 0xf2e6ab);
            firstDes.width = GameConfig.stageWidth;
            firstDes.textAlign = TextFieldConst.ALIGH_CENTER;
            firstDes.y = bg2.y + 885 - 9;
            this._container.addChild(firstDes);
        }
        else if (payflag == 1 && Api.wifeVoApi.getWifeInfoVoById(Config.SecondchargeCfg.getWifeId()) == null) {
            var getBtn_2 = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "taskCollect", this.clickBtnHandler, this);
            // this.setLayoutPosition(LayoutConst.horizontalCenter, getBtn, this.viewBg);  
            getBtn_2.x = 220;
            getBtn_2.y = this.viewBg.y + 770;
            this.addChild(getBtn_2);
            this._getBtn = getBtn_2;
        }
        // this.closeBtn.x =510; 
        this.closeBtn.x = bg2.x + bg2.width - this.closeBtn.width;
        this.closeBtn.y = bg2.y - this.closeBtn.height / 2 + 20;
        this.setChildIndex(this.closeBtn, this.numChildren - 3);
    };
    SecondRechargeView.prototype.showReward = function (bg, iconY) {
        if (iconY === void 0) { iconY = 0; }
        var temScale = 0.78;
        var spaceW = 8;
        var spaceH = 10;
        var rewardList = Config.SecondchargeCfg.getRewardItemVoList();
        var totalNum = rewardList.length;
        for (var i = 0; i < rewardList.length; i++) {
            var icon = GameData.getItemIcon(rewardList[i], true, true);
            icon.scaleX = icon.scaleY = temScale;
            icon.x = bg.x + 75 + (bg.width - 150) / 2 + (icon.width * temScale) * (i - totalNum / 2) + spaceW * (i - (totalNum - 1) / 2);
            icon.y = iconY;
            this.addChild(icon);
        }
    };
    SecondRechargeView.prototype.clickBtnHandler = function () {
        var payflag = Api.shopVoApi.getSecondRateCharge();
        if (payflag == 1 && Api.wifeVoApi.getWifeInfoVoById(Config.SecondchargeCfg.getWifeId()) == null) {
            NetManager.request(NetRequestConst.REQUEST_SHOP_SECONDCHARGEREWARD, null);
        }
        else {
            ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
        }
    };
    SecondRechargeView.prototype.useCallback2 = function (evt) {
        var payflag = Api.shopVoApi.getSecondRateCharge();
        if (payflag == 1 && Api.wifeVoApi.getWifeInfoVoById(Config.SecondchargeCfg.getWifeId()) == null) {
            if (this._container) {
                this._container.visible = false;
            }
            if (this._getBtn) {
                this._getBtn.visible = true;
            }
        }
    };
    SecondRechargeView.prototype.useCallback = function (event) {
        if (event === void 0) { event = null; }
        var payflag = Api.shopVoApi.getSecondRateCharge();
        if ((payflag == 2 || Api.wifeVoApi.getWifeInfoVoById(Config.SecondchargeCfg.getWifeId()) != null) && this._getBtn) {
            this._getBtn.visible = false;
            var hasGetSp = BaseBitmap.create("collectflag");
            hasGetSp.x = this._getBtn.x + this._getBtn.width / 2 - hasGetSp.width / 2;
            hasGetSp.y = this._getBtn.y + this._getBtn.height / 2 - hasGetSp.height / 2;
            this.addChild(hasGetSp);
            var rewardList = Config.SecondchargeCfg.getRewardItemVoList();
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
    SecondRechargeView.prototype.clickGetBtnHandler = function (id) {
        // ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
        PlatformManager.pay(id);
    };
    SecondRechargeView.prototype.initBg = function () {
        this.viewBg = BaseLoadBitmap.create("firstchargebg01");
        // this.viewBg.height = 960;
        // this.viewBg.width = 640;
        // this.viewBg.setPosition(GameConfig.stageWidth / 2 - this.viewBg.width / 2,GameConfig.stageHeigth / 2 - this.viewBg.height / 2);
        this.addChild(this.viewBg);
    };
    /**
     * 重置背景的高度 主要设置 btn的位置
     * 仅适用于新的分享
     */
    SecondRechargeView.prototype.resetBgSize = function () {
        // this.closeBtn.setPosition(480,40);
        // this.closeBtn.setPosition(480,GameConfig.stageHeigth / 2 - 958/2 + 40 );
        // if(PlatformManager.hasSpcialCloseBtn()){
        // 	this.closeBtn.setPosition(520,100);
        // } else {
        // 	this.closeBtn.setPosition(480,40);
        // }
    };
    SecondRechargeView.prototype.getTitleBgName = function () {
        return null;
    };
    SecondRechargeView.prototype.getCloseBtnName = function () {
        return "btn_win_closebtn";
    };
    SecondRechargeView.prototype.getTitleStr = function () {
        return null;
    };
    SecondRechargeView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "firstchargebutton01",
            "firstchargebutton02",
            // "firstchargebg",
            "firstchargemask_new",
            // "firstchargefg",
            "firstchargemark2_4",
            "firstchargemark"
        ]);
    };
    SecondRechargeView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_SHOP_SECONDCHARGEREWARD), this.useCallback, this);
        this._getBtn = null;
        this._container = null;
        this._lightArr = [];
    };
    return SecondRechargeView;
}(PopupView));
__reflect(SecondRechargeView.prototype, "SecondRechargeView");
