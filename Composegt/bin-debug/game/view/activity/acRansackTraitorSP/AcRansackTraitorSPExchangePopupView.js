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
var AcRansackTraitorSPExchangePopupView = (function (_super) {
    __extends(AcRansackTraitorSPExchangePopupView, _super);
    function AcRansackTraitorSPExchangePopupView() {
        var _this = _super.call(this) || this;
        _this._droWifeIcon = undefined;
        _this._skinImg = undefined;
        _this._acvo = undefined;
        _this._skinIdIndex = 0;
        _this._innerbg = null;
        return _this;
    }
    Object.defineProperty(AcRansackTraitorSPExchangePopupView.prototype, "cfg", {
        get: function () {
            var cfg = this._acvo.config;
            return cfg;
        },
        enumerable: true,
        configurable: true
    });
    AcRansackTraitorSPExchangePopupView.prototype.initView = function () {
        // {"aid":this.aid,"code":this.code}
        var aid = this.param.data.aid;
        var code = this.param.data.code;
        this._acvo = Api.acVoApi.getActivityVoByAidAndCode(aid, code);
        // let cfg = <Config.AcCfg.RansackTraitorSPCfg>this._acvo.config;
        this._skinIdIndex = this._acvo.canExchangeIndex();
        var exchangeShopItem = this.cfg.getRewardSkinIdByIndex(this._skinIdIndex);
        var skincfg = Config.ServantskinCfg.getServantSkinItemById(exchangeShopItem.skinID);
        var bg = BaseBitmap.create("ransackTraitor_bg4");
        bg.setPosition((this.viewBg.width - bg.width) / 2, 90);
        this.addChildToContainer(bg);
        var topflag = BaseBitmap.create("ransackTraitor_txt3");
        topflag.setPosition(bg.x + bg.width / 2 - topflag.width / 2, 0);
        this.addChildToContainer(topflag);
        var leftflag = BaseBitmap.create("ransackTraitor_leftimg");
        leftflag.setPosition(0, 65);
        this.addChildToContainer(leftflag);
        this._servantContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(this._servantContainer);
        this.showDBDragon(skincfg.id, bg.y + bg.height);
        var leftBtn = ComponentManager.getButton("ransackTraitorSP_leftbtn", null, this.leftBtnHandler, this);
        leftBtn.x = this.viewBg.x + 10;
        leftBtn.y = this.viewBg.y + 400;
        this.addChildToContainer(leftBtn);
        var rightBtn = ComponentManager.getButton("ransackTraitorSP_leftbtn", null, this.rightBtnHandler, this);
        // rightBtn.skewX
        // rightBtn.rotation = 180;
        rightBtn.scaleX = -1;
        rightBtn.x = this.viewBg.x + this.viewBg.width - 10;
        rightBtn.y = this.viewBg.y + 400;
        this.addChildToContainer(rightBtn);
        var skinnamebg = BaseBitmap.create("servant_skinnamebg");
        skinnamebg.x = bg.x + 10;
        skinnamebg.y = bg.y + 30;
        this.addChildToContainer(skinnamebg);
        this._skinnamebg = skinnamebg;
        var skinNameTxt = ComponentManager.getTextField(skincfg.getSkinName(), 20, 0xBEA48D);
        skinNameTxt.x = skinnamebg.x + 35;
        skinNameTxt.y = skinnamebg.y + 16;
        this.addChildToContainer(skinNameTxt);
        this._skinNameTxt = skinNameTxt;
        var ownerTxt = ComponentManager.getTextField("", 20, 0xBEA48D);
        ownerTxt.text = LanguageManager.getlocal("servant_name" + skincfg.servantId);
        ownerTxt.x = skinNameTxt.x;
        ownerTxt.y = skinNameTxt.y + 23;
        this.addChildToContainer(ownerTxt);
        this._ownerTxt = ownerTxt;
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
        this._innerbg = innerbg;
        var innerTopBg = BaseBitmap.create("public_up3");
        innerTopBg.width = innerbg.width - 10;
        innerTopBg.height = 50;
        innerTopBg.x = bottomBg.x + bottomBg.width / 2 - innerTopBg.width / 2;
        innerTopBg.y = bottomBg.y + 29.5;
        this.addChildToContainer(innerTopBg);
        this._innerTopBg = innerTopBg;
        this._ownTxt = ComponentManager.getTextField("", 18, TextFieldConst.COLOR_BROWN);
        this._ownTxt.text = LanguageManager.getlocal("ransackTraitorSP_ownTxt", [this._acvo.getItemNumByIndex(String(exchangeShopItem.itemID)) + "/" + exchangeShopItem["proofNum"]]);
        this._ownTxt.x = innerTopBg.x + 70;
        this._ownTxt.y = innerTopBg.y + innerTopBg.height / 2 - this._ownTxt.height / 2;
        this.addChildToContainer(this._ownTxt);
        var exchangeBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "ransackTraitorSP_btn3", this.exchangeBtnHandler, this, null, null, 36);
        exchangeBtn.setScale(0.6);
        exchangeBtn.x = innerTopBg.x + innerTopBg.width / 2 + 20;
        exchangeBtn.y = innerTopBg.y + innerTopBg.height / 2 - exchangeBtn.height / 2 * exchangeBtn.scaleX;
        this.addChildToContainer(exchangeBtn);
        this._exchangeBtn = exchangeBtn;
        if (Api.servantVoApi.isOwnSkinOfSkinId(String(exchangeShopItem.skinID))) {
            // exchangeBtn.
            App.DisplayUtil.changeToGray(exchangeBtn);
            this._exchangeBtn.setText("ransackTraitorSP_btn3");
        }
        var isexcge = this._acvo.checkCanExchangeByIndex(this._skinIdIndex); //(this._acvo as AcRansackTraitorSPVo ).isExchangeEnable();
        if (isexcge) {
            App.CommonUtil.addIconToBDOC(this._exchangeBtn);
        }
        else {
            App.CommonUtil.removeIconFromBDOC(this._exchangeBtn);
        }
        var skinTipTxt = ComponentManager.getTextField(LanguageManager.getlocal("servantSkinEffect" + exchangeShopItem.skinID), 18, TextFieldConst.COLOR_BROWN);
        skinTipTxt.width = innerbg.width - 10;
        skinTipTxt.textAlign = egret.HorizontalAlign.LEFT;
        skinTipTxt.multiline = true;
        skinTipTxt.lineSpacing = 5;
        skinTipTxt.x = innerbg.x + 5;
        skinTipTxt.y = innerTopBg.y + innerTopBg.height + 3;
        this.addChildToContainer(skinTipTxt);
        this._skinTipTxt = skinTipTxt;
        var rect = new egret.Rectangle(0, 0, innerTopBg.width, innerbg.height - 150 - (skinTipTxt.height - 41));
        this._rect = rect;
        var listNode = new BaseDisplayObjectContainer();
        var addAbility = skincfg.addAbility;
        var startY = 0;
        AcRansackTraitorSPScrollItem.servantId = skincfg.servantId;
        for (var index = 0; index < auraIdList.length; index++) {
            var element_1 = auraIdList[index];
            var bnode = new AcRansackTraitorSPScrollItem();
            bnode.init(element_1);
            bnode.x = 5;
            bnode.y = startY;
            startY += bnode.height + 5;
            listNode.addChild(bnode);
        }
        for (var index2 = 0; index2 < addAbility.length; index2++) {
            var bnode = new AcRansackTraitorSPBookScrollItem();
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
        this._scrollView = scrollView;
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
    AcRansackTraitorSPExchangePopupView.prototype.leftBtnHandler = function () {
        this._skinIdIndex--;
        if (this._skinIdIndex < 0) {
            this._skinIdIndex = 3;
        }
        this.refreshView();
    };
    AcRansackTraitorSPExchangePopupView.prototype.rightBtnHandler = function () {
        this._skinIdIndex++;
        if (this._skinIdIndex > 3) {
            this._skinIdIndex = 0;
        }
        this.refreshView();
    };
    AcRansackTraitorSPExchangePopupView.prototype.refreshView = function () {
        var exchangeShopItem = this.cfg.getRewardSkinIdByIndex(this._skinIdIndex);
        var skincfg = Config.ServantskinCfg.getServantSkinItemById(exchangeShopItem.skinID);
        this.showDBDragon(skincfg.id);
        this._skinNameTxt.text = skincfg.getSkinName();
        this._skinNameTxt.x = this._skinnamebg.x + 35;
        this._skinNameTxt.y = this._skinnamebg.y + 16;
        this._ownerTxt.text = LanguageManager.getlocal("servant_name" + skincfg.servantId);
        this._ownerTxt.x = this._skinNameTxt.x;
        this._ownerTxt.y = this._skinNameTxt.y + 23;
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
        this._ownTxt.text = LanguageManager.getlocal("ransackTraitorSP_ownTxt", [this._acvo.getItemNumByIndex(String(exchangeShopItem.itemID)) + "/" + exchangeShopItem["proofNum"]]);
        if (Api.servantVoApi.isOwnSkinOfSkinId(String(exchangeShopItem.skinID))) {
            // exchangeBtn.
            App.DisplayUtil.changeToGray(this._exchangeBtn);
            this._exchangeBtn.setText("ransackTraitorSP_btn4");
            this._ownTxt.text = LanguageManager.getlocal("ransackTraitorSP_ownTxt", ["0/" + exchangeShopItem["proofNum"]]);
        }
        else {
            App.DisplayUtil.changeToNormal(this._exchangeBtn);
            this._exchangeBtn.setText("ransackTraitorSP_btn3");
        }
        this._ownTxt.x = this._innerTopBg.x + 70;
        this._ownTxt.y = this._innerTopBg.y + this._innerTopBg.height / 2 - this._ownTxt.height / 2;
        var isexcge = this._acvo.checkCanExchangeByIndex(this._skinIdIndex); //(this._acvo as AcRansackTraitorSPVo ).isExchangeEnable();
        if (isexcge) {
            App.CommonUtil.addIconToBDOC(this._exchangeBtn);
        }
        else {
            App.CommonUtil.removeIconFromBDOC(this._exchangeBtn);
        }
        this._skinTipTxt.text = LanguageManager.getlocal("servantSkinEffect" + exchangeShopItem.skinID);
        this.container.removeChild(this._scrollView);
        var listNode = new BaseDisplayObjectContainer();
        var addAbility = skincfg.addAbility;
        var startY = 0;
        AcRansackTraitorSPScrollItem.servantId = skincfg.servantId;
        for (var index = 0; index < auraIdList.length; index++) {
            var element_2 = auraIdList[index];
            var bnode = new AcRansackTraitorSPScrollItem();
            bnode.init(element_2);
            bnode.x = 5;
            bnode.y = startY;
            startY += bnode.height + 5;
            listNode.addChild(bnode);
        }
        for (var index2 = 0; index2 < addAbility.length; index2++) {
            var bnode = new AcRansackTraitorSPBookScrollItem();
            bnode.init(skincfg.id, index2, skincfg.servantId);
            bnode.x = 5;
            bnode.y = startY;
            startY += bnode.height + 5;
            listNode.addChild(bnode);
        }
        listNode.height += 10;
        // this._rect = new egret.Rectangle(0,0,innerTopBg.width,innerbg.height - 150 - (skinTipTxt.height - 41));
        // this._rect = rect;
        // this._rect.height 
        var rect = new egret.Rectangle(0, 0, this._rect.width, this._innerbg.height - 150 - (this._skinTipTxt.height - 41));
        var scrollView = ComponentManager.getScrollView(listNode, rect);
        scrollView.x = this._innerTopBg.x;
        ;
        scrollView.y = this._skinTipTxt.y + this._skinTipTxt.height + 5;
        ;
        scrollView.horizontalScrollPolicy = "off";
        this._scrollView = scrollView;
        this.addChildToContainer(scrollView);
    };
    AcRansackTraitorSPExchangePopupView.prototype.exchangeBtnHandler = function () {
        if (!this._acvo.isStart) {
            App.CommonUtil.showTip(LanguageManager.getlocal('acPunishEnd'));
            return;
        }
        var exchangeShopItem = this.cfg.getRewardSkinIdByIndex(this._skinIdIndex);
        var skincfg = Config.ServantskinCfg.getServantSkinItemById(exchangeShopItem.skinID);
        if (Api.servantVoApi.isOwnSkinOfSkinId(String(exchangeShopItem.skinID))) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acRansackTraitorSP_nettip3"));
            return;
        }
        if (this._acvo.getItemNumByIndex(String(exchangeShopItem.itemID)) < exchangeShopItem["proofNum"]) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acRansackTraitorSP_nettip1" + String(this._skinIdIndex + 1)));
            return;
        }
        var sid = Config.ServantskinCfg.getServantSkinItemById(exchangeShopItem.skinID).servantId;
        if (!Api.servantVoApi.getServantObj(sid)) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acRansackTraitorSP_nettip2"));
            return;
        }
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY2S_RSTSPEXCHANGE, this.searchHandlerNetBack, this);
        var _activeId = this.param.data.aid + "-" + this.param.data.code;
        NetManager.request(NetRequestConst.REQUEST_ACTIVITY2S_RSTSPEXCHANGE, { activeId: _activeId, shopid: this._skinIdIndex + 1 });
    };
    AcRansackTraitorSPExchangePopupView.prototype.searchHandlerNetBack = function (event) {
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY2S_RSTSPEXCHANGE, this.searchHandlerNetBack, this);
        if (event.data.data.ret === 0) {
            var rdata = event.data.data.data;
            var rewards = rdata.rewards;
            // this._exchangeBtn.setText("ransackTraitorSP_btn3");
            // this._ownTxt.text = LanguageManager.getlocal("ransackTraitorSP_ownTxt",[this._acvo.chipnum + "/"+this._acvo.config.RansackItemNum]);
            ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW, { "rewards": rewards, "otherRewards": null, "isPlayAni": true });
            App.CommonUtil.removeIconFromBDOC(this._exchangeBtn);
            App.DisplayUtil.changeToGray(this._exchangeBtn);
            this._exchangeBtn.setText("ransackTraitorSP_btn4");
            //////////
            this._ownTxt.text = LanguageManager.getlocal("ransackTraitorSP_ownTxt", ["0/" + this.cfg.RansackItemNum]);
            this._ownTxt.x = this._innerTopBg.x + 70;
            this._ownTxt.y = this._innerTopBg.y + this._innerTopBg.height / 2 - this._ownTxt.height / 2;
            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_RANSACTARTIORSP_REFRESH);
            var isexcge = this._acvo.checkCanExchangeByIndex(this._skinIdIndex); //(this._acvo as AcRansackTraitorSPVo ).isExchangeEnable();
            if (isexcge) {
                App.CommonUtil.addIconToBDOC(this._exchangeBtn);
            }
            else {
                App.CommonUtil.removeIconFromBDOC(this._exchangeBtn);
            }
        }
    };
    AcRansackTraitorSPExchangePopupView.prototype.showDBDragon = function (skinId, tarY) {
        if (tarY) {
            this._tarY = tarY;
        }
        else {
            tarY = this._tarY;
        }
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
                this._servantContainer.removeChild(this._droWifeIcon);
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
            this._droWifeIcon.mask = new egret.Rectangle(-292, -680, 584, 600); //526  263
            // this._droWifeIcon.y = GameConfig.stageHeigth - this.container.y - 120;
            this._servantContainer.addChild(this._droWifeIcon);
        }
        else {
            if (!this._skinImg) {
                this._servantContainer.removeChild(this._skinImg);
                this._skinImg = null;
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
                this._servantContainer.addChild(this._skinImg);
            }
        }
    };
    AcRansackTraitorSPExchangePopupView.prototype.getResourceList = function () {
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
    AcRansackTraitorSPExchangePopupView.prototype.getTitleStr = function () {
        return null;
    };
    AcRansackTraitorSPExchangePopupView.prototype.getBgName = function () {
        return "ransackTraitor_bg2";
    };
    AcRansackTraitorSPExchangePopupView.prototype.dispose = function () {
        this._ownTxt = null;
        this._droWifeIcon = undefined;
        this._skinImg = undefined;
        this._acvo = undefined;
        this._exchangeBtn = null;
        this._skinTipTxt = null;
        this._ownerTxt = null;
        this._skinNameTxt = null;
        this._skinnamebg = null;
        this._innerTopBg = null;
        this._rect = null;
        this._scrollView = null;
        this._tarY = 0;
        this._servantContainer = null;
        this._skinIdIndex = 0;
        this._innerbg = null;
        _super.prototype.dispose.call(this);
    };
    return AcRansackTraitorSPExchangePopupView;
}(PopupView));
__reflect(AcRansackTraitorSPExchangePopupView.prototype, "AcRansackTraitorSPExchangePopupView");
