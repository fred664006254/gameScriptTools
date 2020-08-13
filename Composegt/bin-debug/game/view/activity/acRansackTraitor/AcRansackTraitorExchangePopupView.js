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
 * 20190401
 * 奸臣皮肤兑换
 */
var AcRansackTraitorExchangePopupView = (function (_super) {
    __extends(AcRansackTraitorExchangePopupView, _super);
    function AcRansackTraitorExchangePopupView() {
        var _this = _super.call(this) || this;
        _this._droWifeIcon = undefined;
        _this._skinImg = undefined;
        _this._acvo = undefined;
        return _this;
    }
    AcRansackTraitorExchangePopupView.prototype.decode = function () {
        switch (String(this.param.data.code)) {
            case "1":
                return "1";
            case "2":
                return "2";
            case "3":
                return "3";
            case "4":
                return "4";
            case "5":
                return "1";
            case "6":
                return "2";
            case "7":
                return "3";
            case "8":
                return "4";
        }
    };
    AcRansackTraitorExchangePopupView.prototype.initView = function () {
        // {"aid":this.aid,"code":this.code}
        var aid = this.param.data.aid;
        var code = this.param.data.code;
        this._acvo = Api.acVoApi.getActivityVoByAidAndCode(aid, code);
        var cfg = this._acvo.config;
        var skinId = cfg.getRewardSkinId();
        var skincfg = Config.ServantskinCfg.getServantSkinItemById(skinId);
        var bg = BaseBitmap.create("ransackTraitor_bg4");
        bg.setPosition((this.viewBg.width - bg.width) / 2, 90);
        this.addChildToContainer(bg);
        var topflag = BaseBitmap.create("ransackTraitor_txt3");
        topflag.setPosition(bg.x + bg.width / 2 - topflag.width / 2, 0);
        this.addChildToContainer(topflag);
        var leftflag = BaseBitmap.create("ransackTraitor_leftimg");
        leftflag.setPosition(0, 65);
        this.addChildToContainer(leftflag);
        this.showDBDragon(skincfg.id, bg.y + bg.height);
        var skinnamebg = BaseBitmap.create("servant_skinnamebg");
        skinnamebg.x = bg.x + 10;
        skinnamebg.y = bg.y + 30;
        this.addChildToContainer(skinnamebg);
        var skinNameTxt = ComponentManager.getTextField(skincfg.getSkinName(), 20, 0xBEA48D);
        skinNameTxt.x = skinnamebg.x + 35;
        skinNameTxt.y = skinnamebg.y + 16;
        this.addChildToContainer(skinNameTxt);
        var ownerTxt = ComponentManager.getTextField("", 20, 0xBEA48D);
        ownerTxt.text = LanguageManager.getlocal("servant_name" + skincfg.servantId);
        ownerTxt.x = skinNameTxt.x;
        ownerTxt.y = skinNameTxt.y + 23;
        this.addChildToContainer(ownerTxt);
        var bottomBg = BaseBitmap.create("wifeview_xinxibanbg");
        bottomBg.width = 550;
        bottomBg.height = 390;
        bottomBg.x = bg.x + bg.width / 2 - bottomBg.width / 2;
        bottomBg.y = bg.y + bg.height - 80;
        this.addChildToContainer(bottomBg);
        var servantcfg = Config.ServantCfg.getServantItemById(skincfg.servantId);
        var aura = servantcfg.aura;
        var auraIdList = [];
        for (var key in aura) {
            if (aura.hasOwnProperty(key)) {
                var element = aura[key];
                if (element.startDemand) {
                    var did = element.startDemand.split("_")[1];
                    if (did && did == skincfg.id) {
                        auraIdList.push(key);
                    }
                }
            }
        }
        var innerbg = BaseBitmap.create("public_9v_bg09");
        innerbg.width = 520;
        innerbg.height = bottomBg.height - 60;
        innerbg.x = bottomBg.x + bottomBg.width / 2 - innerbg.width / 2;
        innerbg.y = bottomBg.y + 26;
        this.addChildToContainer(innerbg);
        var innerTopBg = BaseBitmap.create("public_up3");
        innerTopBg.width = innerbg.width - 10;
        innerTopBg.height = 50;
        innerTopBg.x = bottomBg.x + bottomBg.width / 2 - innerTopBg.width / 2;
        innerTopBg.y = bottomBg.y + 29.5;
        this.addChildToContainer(innerTopBg);
        this._ownTxt = ComponentManager.getTextField("", 18, TextFieldConst.COLOR_BROWN);
        this._ownTxt.text = LanguageManager.getlocal("ransackTraitor_ownTxt", [this._acvo.chipnum + "/" + this._acvo.config.RansackItemNum]);
        this._ownTxt.x = innerTopBg.x + 70;
        this._ownTxt.y = innerTopBg.y + innerTopBg.height / 2 - this._ownTxt.height / 2;
        this.addChildToContainer(this._ownTxt);
        var exchangeBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "ransackTraitor_btn3", this.exchangeBtnHandler, this, null, null, 36);
        exchangeBtn.setScale(0.6);
        exchangeBtn.x = innerTopBg.x + innerTopBg.width / 2 + 20;
        exchangeBtn.y = innerTopBg.y + innerTopBg.height / 2 - exchangeBtn.height / 2 * exchangeBtn.scaleX;
        this.addChildToContainer(exchangeBtn);
        this._exchangeBtn = exchangeBtn;
        if (Api.servantVoApi.isOwnSkinOfSkinId(this._acvo.config.getRewardSkinId())) {
            // exchangeBtn.
            App.DisplayUtil.changeToGray(exchangeBtn);
            this._exchangeBtn.setText("ransackTraitor_btn3");
        }
        var isexcge = this._acvo.isExchangeEnable();
        if (isexcge) {
            App.CommonUtil.addIconToBDOC(this._exchangeBtn);
        }
        else {
            App.CommonUtil.removeIconFromBDOC(this._exchangeBtn);
        }
        var skinTipTxt = ComponentManager.getTextField(LanguageManager.getlocal("servantSkinEffect" + skinId), 18, TextFieldConst.COLOR_BROWN);
        skinTipTxt.width = innerbg.width - 10;
        skinTipTxt.textAlign = egret.HorizontalAlign.LEFT;
        skinTipTxt.multiline = true;
        skinTipTxt.lineSpacing = 5;
        skinTipTxt.x = innerbg.x + 5;
        skinTipTxt.y = innerTopBg.y + innerTopBg.height + 3;
        this.addChildToContainer(skinTipTxt);
        var rect = new egret.Rectangle(0, 0, innerTopBg.width, innerbg.height - 150);
        var listNode = new BaseDisplayObjectContainer();
        var addAbility = skincfg.addAbility;
        var startY = 0;
        AcRansackTraitorScrollItem.servantId = skincfg.servantId;
        for (var index = 0; index < auraIdList.length; index++) {
            var element_1 = auraIdList[index];
            var bnode = new AcRansackTraitorScrollItem();
            bnode.init(element_1);
            bnode.x = 5;
            bnode.y = startY;
            startY += bnode.height + 5;
            listNode.addChild(bnode);
        }
        for (var index2 = 0; index2 < addAbility.length; index2++) {
            var bnode = new AcRansackTraitorBookScrollItem();
            bnode.init(skincfg.id, index2, skincfg.servantId);
            bnode.x = 5;
            bnode.y = startY;
            startY += bnode.height + 5;
            listNode.addChild(bnode);
        }
        listNode.height += 10;
        var scrollView = ComponentManager.getScrollView(listNode, rect);
        scrollView.x = innerTopBg.x;
        ;
        scrollView.y = skinTipTxt.y + skinTipTxt.height + 5;
        ;
        scrollView.horizontalScrollPolicy = "off";
        this.addChildToContainer(scrollView);
        var probg3 = BaseBitmap.create("public_left2");
        probg3.width = innerTopBg.width;
        probg3.height = 35;
        probg3.x = innerTopBg.x;
        probg3.y = bottomBg.y + bottomBg.height - 75;
        this.addChildToContainer(probg3);
        var btmTip = ComponentManager.getTextField(LanguageManager.getlocal("skin_servantInTip"), 18, TextFieldConst.COLOR_BROWN);
        btmTip.x = bottomBg.x + bottomBg.width / 2 - btmTip.width / 2;
        btmTip.y = probg3.y + probg3.height / 2 - btmTip.height / 2;
        this.addChildToContainer(btmTip);
        this.closeBtn.y = 40;
    };
    AcRansackTraitorExchangePopupView.prototype.exchangeBtnHandler = function () {
        if (!this._acvo.isStart) {
            App.CommonUtil.showTip(LanguageManager.getlocal('acPunishEnd'));
            return;
        }
        if (Api.servantVoApi.isOwnSkinOfSkinId(this._acvo.config.getRewardSkinId())) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acRansackTraitor_nettip3"));
            return;
        }
        if (this._acvo.chipnum < this._acvo.config.RansackItemNum) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acRansackTraitor_nettip1" + this.decode()));
            return;
        }
        var skinId = this._acvo.config.getRewardSkinId();
        var sid = Config.ServantskinCfg.getServantSkinItemById(skinId).servantId;
        if (!Api.servantVoApi.getServantObj(sid)) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acRansackTraitor_nettip2"));
            return;
        }
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY_RANSTACKATTACK_SKIN, this.searchHandlerNetBack, this);
        var _activeId = this.param.data.aid + "-" + this.param.data.code;
        NetManager.request(NetRequestConst.REQUEST_ACTIVITY_RANSTACKATTACK_SKIN, { activeId: _activeId });
    };
    AcRansackTraitorExchangePopupView.prototype.searchHandlerNetBack = function (event) {
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_RANSTACKATTACK_SKIN, this.searchHandlerNetBack, this);
        if (event.data.data.ret === 0) {
            var rdata = event.data.data.data;
            var rewards = rdata.rewards;
            this._exchangeBtn.setText("ransackTraitor_btn3");
            // let rewardList =  GameData.formatRewardItem(rewards);
            // App.CommonUtil.playRewardFlyAction(rewardList);
            ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW, { "rewards": rewards, "otherRewards": null, "isPlayAni": true });
            this._ownTxt.text = LanguageManager.getlocal("ransackTraitor_ownTxt", [this._acvo.chipnum + "/" + this._acvo.config.RansackItemNum]);
            // let idfall = this._acvo.isFineAll() ;
            // if(idfall){
            // 	App.CommonUtil.addIconToBDOC(this._exchangeBtn);
            // }else{
            App.CommonUtil.removeIconFromBDOC(this._exchangeBtn);
            // }
            // if(Api.servantVoApi.isOwnSkinOfSkinId(this._acvo.config.getRewardSkinId()) ){
            App.DisplayUtil.changeToGray(this._exchangeBtn);
            this._exchangeBtn.setText("ransackTraitor_btn3");
            // }
        }
    };
    AcRansackTraitorExchangePopupView.prototype.showDBDragon = function (skinId, tarY) {
        var serSkincfg = Config.ServantskinCfg.getServantSkinItemById(skinId);
        // let sercfg = Config.ServantCfg.getServantItemById(serSkincfg.servantId);
        var boneName = "";
        var dagonBonesName = serSkincfg.bone;
        if (serSkincfg && serSkincfg.bone) {
            boneName = serSkincfg.bone + "_ske";
        }
        if (!Api.switchVoApi.checkServantCloseBone() && boneName && RES.hasRes(boneName) && App.CommonUtil.check_dragon()) {
            if (this._skinImg) {
                this._skinImg.visible = false;
            }
            if (this._droWifeIcon) {
                this._droWifeIcon.dispose();
                this._droWifeIcon = null;
            }
            this._droWifeIcon = App.DragonBonesUtil.getLoadDragonBones(dagonBonesName);
            this._droWifeIcon.visible = true;
            this._droWifeIcon.setScale(0.9);
            this._droWifeIcon.anchorOffsetY = this._droWifeIcon.height;
            this._droWifeIcon.anchorOffsetX = this._droWifeIcon.width / 2 * this._droWifeIcon.scaleX;
            this._droWifeIcon.x = GameConfig.stageWidth / 2;
            this._droWifeIcon.y = tarY - this._droWifeIcon.height * 0.9 + 80;
            this._droWifeIcon.mask = new egret.Rectangle(-320, -680, 640, 600);
            // this._droWifeIcon.y = GameConfig.stageHeigth - this.container.y - 120;
            this.addChildToContainer(this._droWifeIcon);
        }
        else {
            if (!this._skinImg) {
                var skinW = 640;
                var skinH = 482;
                var tarScale = 1.0;
                var skinImgPath = serSkincfg.body;
                this._skinImg = BaseLoadBitmap.create(skinImgPath);
                this._skinImg.width = skinW;
                this._skinImg.height = skinH;
                this._skinImg.setScale(tarScale);
                // this._skinImg.anchorOffsetY = this._skinImg.height;
                this._skinImg.anchorOffsetX = this._skinImg.width / 2;
                this._skinImg.x = GameConfig.stageWidth / 2;
                this._skinImg.y = tarY - this._skinImg.height;
                this.addChildToContainer(this._skinImg);
            }
        }
    };
    AcRansackTraitorExchangePopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "ransackTraitor_bg4", "ransackTraitor_bg2", "ransackTraitor_leftimg", "servant_skinnamebg", "wifeview_xinxibanbg", "servant_star",
        ]);
    };
    // protected getShowHeight():number
    // {
    // 	return 800;
    // }
    // // 计算背景高度时使用，在container高度的基础上添加该高度
    // protected getBgExtraHeight():number
    // {
    // 	return 40;
    // }
    AcRansackTraitorExchangePopupView.prototype.getTitleStr = function () {
        return null;
    };
    AcRansackTraitorExchangePopupView.prototype.getBgName = function () {
        return "ransackTraitor_bg2";
    };
    AcRansackTraitorExchangePopupView.prototype.dispose = function () {
        this._ownTxt = null;
        this._droWifeIcon = null;
        this._skinImg = null;
        this._acvo = undefined;
        this._exchangeBtn = null;
        _super.prototype.dispose.call(this);
    };
    return AcRansackTraitorExchangePopupView;
}(PopupView));
__reflect(AcRansackTraitorExchangePopupView.prototype, "AcRansackTraitorExchangePopupView");
