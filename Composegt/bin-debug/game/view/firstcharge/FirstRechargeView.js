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
        // let bg2 = BaseLoadBitmap.create("firstchargebg02"); 
        var bg2 = null;
        if (App.CommonUtil.check_dragon() && RES.hasRes("servant_full2_1033_ske")) {
            bg2 = BaseLoadBitmap.create("firstchargebg_new");
            // bg2.height =942;
            // bg2.width = 640;
            bg2.height = 913;
            bg2.width = 611;
            bg2.x = GameConfig.stageWidth / 2 - bg2.width / 2;
            bg2.y = bg2.y + (GameConfig.stageHeigth - bg2.height) / 2;
            this.addChild(bg2);
            var mask = BaseBitmap.create("firstchargemask_new");
            mask.x = bg2.x;
            mask.y = bg2.y;
            this.addChild(mask);
            var droContainer = new BaseDisplayObjectContainer();
            this.addChild(droContainer);
            var lvbu = App.DragonBonesUtil.getLoadDragonBones("servant_full2_1033");
            lvbu.scaleX = 0.8;
            lvbu.scaleY = 0.8;
            lvbu.x = 270;
            lvbu.y = bg2.y + 650 - 120;
            // if(PlatformManager.checkIsKRNewSp())
            // {
            // 	lvbu.scaleX = 0.7;
            // 	lvbu.scaleY = 0.7;
            // }
            droContainer.addChild(lvbu);
            droContainer.mask = mask;
            var fg = null;
            if (Api.switchVoApi.checkOpenFirstCharge6Times()) {
                fg = BaseLoadBitmap.create("firstchargefg_new_6");
            }
            else {
                fg = BaseLoadBitmap.create("firstchargefg_new_4");
            }
            fg.height = 611;
            fg.width = 606;
            fg.y = bg2.y - 40;
            this.addChild(fg);
        }
        else {
            // servant_full_1033
            // bg2 = BaseLoadBitmap.create("firstchargebg02"); 
            // bg2.height =942;
            // bg2.width = 640;
            // bg2.y =bg2.y+(GameConfig.stageHeigth -bg2.height )/2;
            // this.addChild(bg2); 
            bg2 = BaseLoadBitmap.create("firstchargebg_new");
            bg2.height = 913;
            bg2.width = 611;
            bg2.x = GameConfig.stageWidth / 2 - bg2.width / 2;
            bg2.y = bg2.y + (GameConfig.stageHeigth - bg2.height) / 2;
            this.addChild(bg2);
            var mask = BaseBitmap.create("firstchargemask_new");
            mask.x = bg2.x;
            mask.y = bg2.y;
            this.addChild(mask);
            var lvbu = BaseLoadBitmap.create("servant_full_1033");
            lvbu.width = 640;
            lvbu.height = 482;
            lvbu.scaleX = 1;
            lvbu.scaleY = 1;
            lvbu.x = 270 - 320 + 40;
            lvbu.y = bg2.y + 650 - 120 - 482;
            lvbu.mask = mask;
            // if(PlatformManager.checkIsKRNewSp())
            // {
            // 	lvbu.scaleX = 0.7;
            // 	lvbu.scaleY = 0.7;
            // }
            this.addChild(lvbu);
            var fg = null;
            if (Api.switchVoApi.checkOpenFirstCharge6Times()) {
                fg = BaseLoadBitmap.create("firstchargefg_new_6");
            }
            else {
                fg = BaseLoadBitmap.create("firstchargefg_new_4");
            }
            fg.height = 611;
            fg.width = 606;
            fg.y = bg2.y - 40;
            this.addChild(fg);
        }
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
        this.showReward(bg2, bg2.y + 569);
        // console.log(rechargeArr);
        var starX = 90;
        var payflag = Api.shopVoApi.getPayFlag();
        this._container = new BaseDisplayObjectContainer();
        this.addChild(this._container);
        var getBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "taskCollect", this.clickBtnHandler, this);
        getBtn.x = 220;
        getBtn.y = this.viewBg.y + 770;
        this.addChild(getBtn);
        this._getBtn = getBtn;
        getBtn.visible = false;
        if (payflag == 0 && Api.servantVoApi.getServantObj("1033") == null) {
            App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_PAYMENT, this.useCallback2, this);
            var butStr = ButtonConst.BTN_NORMAL_ORANGE;
            var markStr = null;
            if (Api.switchVoApi.checkOpenFirstCharge6Times()) {
                markStr = "firstchargemark2_6";
            }
            else {
                markStr = "firstchargemark2_4";
            }
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
                var btnMark = BaseBitmap.create(markStr);
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
                rechargeDes.text = LanguageManager.getlocal("firstRechargeDes1", [rechargeArr[i].gemCost * Config.FirstchargeCfg.getextra() + ""]);
                rechargeDes.x = getBtn_1.x + 30;
                rechargeDes.y = getBtn_1.y + getBtn_1.height + 5;
                this._container.addChild(rechargeDes);
            }
            var firstDes = ComponentManager.getTextField(LanguageManager.getlocal("firstRechargeNewDes", [String(Config.FirstchargeCfg.getextra())]), TextFieldConst.FONTSIZE_CONTENT_COMMON, 0xf2e6ab);
            firstDes.width = GameConfig.stageWidth;
            firstDes.textAlign = TextFieldConst.ALIGH_CENTER;
            firstDes.y = bg2.y + 885 - 9;
            this._container.addChild(firstDes);
        }
        else if (payflag == 1 && Api.servantVoApi.getServantObj("1033") == null) {
            var getBtn_2 = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "taskCollect", this.clickBtnHandler, this);
            // this.setLayoutPosition(LayoutConst.horizontalCenter, getBtn, this.viewBg);  
            getBtn_2.x = 220;
            getBtn_2.y = this.viewBg.y + 770;
            this.addChild(getBtn_2);
            this._getBtn = getBtn_2;
        }
        this.closeBtn.x = bg2.x + bg2.width - this.closeBtn.width;
        this.closeBtn.y = bg2.y - this.closeBtn.height / 2 + 20;
        this.setChildIndex(this.closeBtn, this.numChildren - 3);
        // todo 门客羁绊&技能
        var _sid = Api.shopVoApi.firstChargeServantId.toString();
        var _fetterBtn = ComponentManager.getButton("servantjibanicon", "", function () {
            ViewController.getInstance().openView(ViewConst.POPUP.SERVANTJIBANBUFFPOPUPVUEW, { sid: _sid });
        }, this, null, 0);
        var _fetterText = BaseBitmap.create("servantjibantxt");
        _fetterText.width = 67;
        _fetterText.height = 43;
        _fetterBtn.addChild(_fetterText);
        _fetterText.setPosition((_fetterBtn.width - _fetterText.width) / 2, _fetterBtn.height - _fetterText.height);
        this.addChild(_fetterBtn);
        _fetterBtn.setPosition(463, bg2.y + 435);
        _fetterBtn.setScale(100 / _fetterBtn.width);
        var skillBar = ComponentManager.getSkillBar(_sid, 86);
        this.addChild(skillBar);
        skillBar.setPosition(84, bg2.y + 445);
    };
    FirstRechargeView.prototype.showReward = function (bg, iconY) {
        if (iconY === void 0) { iconY = 0; }
        var temScale = 0.78;
        var spaceW = 8; //15;
        var spaceH = 10;
        var rewardList = Config.FirstchargeCfg.getRewardItemVoList();
        var totalNum = rewardList.length;
        for (var i = 0; i < rewardList.length; i++) {
            var icon = GameData.getItemIcon(rewardList[i], true, true);
            icon.scaleX = icon.scaleY = temScale;
            icon.x = bg.x + 75 + (bg.width - 150) / 2 + (icon.width * temScale) * (i - totalNum / 2) + spaceW * (i - (totalNum - 1) / 2);
            icon.y = iconY;
            this.addChild(icon);
        }
    };
    FirstRechargeView.prototype.clickBtnHandler = function () {
        var payflag = Api.shopVoApi.getPayFlag();
        if (payflag == 1 && Api.servantVoApi.getServantObj("1033") == null) {
            NetManager.request(NetRequestConst.REQUEST_SHOP_FIRSTCHARGEREWARD, null);
        }
        else {
            ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
        }
    };
    FirstRechargeView.prototype.useCallback2 = function (evt) {
        var payflag = Api.shopVoApi.getPayFlag();
        if (payflag == 1 && Api.servantVoApi.getServantObj("1033") == null) {
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
        if ((payflag == 2 || Api.servantVoApi.getServantObj("1033") != null) && this._getBtn) {
            this._getBtn.visible = false;
            var hasGetSp = BaseBitmap.create("collectflag");
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
        if (Api.switchVoApi.checkOpenSecondCharge() && Api.shopVoApi.getPayFlag() == 2 && Api.shopVoApi.getSecondRateCharge() != 2) {
            this.hide();
            ViewController.getInstance().openView(ViewConst.POPUP.SECONDRECHARGEVIEW);
        }
    };
    FirstRechargeView.prototype.clickGetBtnHandler = function (id) {
        // console.log(id);
        // ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
        PlatformManager.pay(id);
    };
    FirstRechargeView.prototype.initBg = function () {
        this.viewBg = BaseLoadBitmap.create("firstchargebg01_new");
        // this.viewBg.height = 960;
        // this.viewBg.width = 640;
        // this.viewBg.setPosition(GameConfig.stageWidth / 2 - this.viewBg.width / 2,GameConfig.stageHeigth / 2 - this.viewBg.height / 2);
        this.addChild(this.viewBg);
    };
    /**
     * 重置背景的高度 主要设置 btn的位置
     * 仅适用于新的分享
     */
    FirstRechargeView.prototype.resetBgSize = function () {
        // this.closeBtn.setPosition(480,40);
        // if(PlatformManager.hasSpcialCloseBtn()){
        // 	this.closeBtn.setPosition(540,90);
        // } else {
        // 	this.closeBtn.setPosition(540,90);
        // }
    };
    FirstRechargeView.prototype.getTitleBgName = function () {
        return null;
    };
    FirstRechargeView.prototype.getCloseBtnName = function () {
        return "btn_win_closebtn";
    };
    FirstRechargeView.prototype.getTitleStr = function () {
        return null;
    };
    FirstRechargeView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "firstchargebutton01",
            "firstchargebutton02",
            "firstchargemark",
            // "firstchargebg",
            // "firstchargemask",
            "firstchargemask_new",
            "firstchargemark2_6",
            "firstchargemark2_4",
            "servantjibantxt",
            "servantjibanicon"
            // "firstchargefg",
        ]);
    };
    FirstRechargeView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_SHOP_FIRSTCHARGEREWARD), this.useCallback, this);
        this._getBtn = null;
        this._container = null;
        this._lightArr = [];
    };
    return FirstRechargeView;
}(PopupView));
__reflect(FirstRechargeView.prototype, "FirstRechargeView");
