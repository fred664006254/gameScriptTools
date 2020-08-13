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
 * 衣装预览
 * date 2020.6.15
 * @class AcNightSkyDetailPopupViewTab3
 */
var AcNightSkyDetailPopupViewTab3 = (function (_super) {
    __extends(AcNightSkyDetailPopupViewTab3, _super);
    function AcNightSkyDetailPopupViewTab3(data) {
        var _this = _super.call(this) || this;
        _this._exchangeContainer = null;
        _this.param = data;
        _this.initView();
        return _this;
    }
    AcNightSkyDetailPopupViewTab3.prototype.initView = function () {
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACNIGHTSKY_EXCHANGE, this.exchangeCallback, this);
        var view = this;
        var rewardBg = BaseBitmap.create("public_9_bg93");
        rewardBg.width = 530;
        rewardBg.height = 695;
        rewardBg.setPosition(26, 53);
        this.addChild(rewardBg);
        var container = new BaseDisplayObjectContainer();
        container.width = 530;
        this.addChild(container);
        container.x = rewardBg.x;
        container.y = 57;
        var skinId = this.cfg.show;
        var skinCfg = Config.ServantskinCfg.getServantSkinItemById(skinId);
        var bgStr = "acthreekingdomrecharge_skinbg";
        var skinBg = skinCfg.getSkinPreviewBg();
        var isOwn = false;
        if (skinBg && ResourceManager.hasRes(skinBg)) {
            bgStr = skinBg;
            isOwn = true;
        }
        var bg = BaseLoadBitmap.create(bgStr); //540 400  522 393
        container.addChild(bg);
        if (!isOwn) {
            bg.width = 540;
            bg.height = 400;
            var bgMask = new egret.Rectangle(18, 4, 522, 393);
            bg.mask = bgMask;
            bg.x = container.width / 2 - bg.width / 2 - 7;
            bg.y = -4;
        }
        else {
            bg.width = 522;
            bg.height = 400;
            var bgMask = new egret.Rectangle(0, 4, 522, 393);
            bg.mask = bgMask;
            bg.x = container.width / 2 - bg.width / 2;
            bg.y = -4;
        }
        var rect = new egret.Rectangle(0, 0, 522, 364);
        var maskContan = new BaseDisplayObjectContainer();
        maskContan.width = 522;
        maskContan.height = 364;
        maskContan.mask = rect;
        maskContan.setPosition(bg.x + bg.width / 2 - maskContan.width / 2, bg.y + 29);
        container.addChild(maskContan);
        if (isOwn) {
            var skinEffBone = skinCfg.getSkinEffectBone();
            var skinEffBoneName = skinEffBone + "_ske";
            if (!Api.switchVoApi.checkCloseBone() && App.CommonUtil.check_dragon() && skinEffBoneName && RES.hasRes(skinEffBoneName)) {
                var skinEff = App.DragonBonesUtil.getLoadDragonBones(skinEffBone);
                skinEff.setScale(0.8);
                skinEff.setPosition(maskContan.width / 2, 140);
                maskContan.addChild(skinEff);
            }
        }
        var boneName = undefined;
        if (skinCfg && skinCfg.bone) {
            boneName = skinCfg.bone + "_ske";
        }
        if ((!Api.switchVoApi.checkCloseBone()) && boneName && RES.hasRes(boneName) && App.CommonUtil.check_dragon()) {
            var droIcon = App.DragonBonesUtil.getLoadDragonBones(skinCfg.bone);
            droIcon.setScale(0.8);
            droIcon.anchorOffsetY = droIcon.height;
            droIcon.anchorOffsetX = droIcon.width / 2;
            droIcon.x = maskContan.width / 2;
            droIcon.y = maskContan.y + maskContan.height;
            maskContan.addChild(droIcon);
        }
        else {
            var skinImg = BaseLoadBitmap.create(skinCfg.body);
            skinImg.width = 406;
            skinImg.height = 467;
            skinImg.anchorOffsetY = skinImg.height;
            skinImg.anchorOffsetX = skinImg.width / 2;
            skinImg.setScale(0.85);
            skinImg.x = maskContan.width / 2;
            skinImg.y = maskContan.y + maskContan.height;
            maskContan.addChild(skinImg);
        }
        var skinnamebg = BaseBitmap.create("skin_detail_namebg");
        skinnamebg.setPosition(bg.x + 14, bg.y + 35);
        container.addChild(skinnamebg);
        var skinNameTxt = ComponentManager.getTextField(skinCfg.name, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_QUALITY_ORANGE);
        skinNameTxt.setPosition(skinnamebg.x + skinnamebg.width / 2 - skinNameTxt.width / 2, skinnamebg.y + 33);
        container.addChild(skinNameTxt);
        var servantCfg = Config.ServantCfg.getServantItemById(skinCfg.servantId);
        var servantNameTxt = ComponentManager.getTextField(servantCfg.name, TextFieldConst.FONTSIZE_BUTTON_COMMON);
        servantNameTxt.setPosition(skinnamebg.x + skinnamebg.width / 2 - servantNameTxt.width / 2, skinNameTxt.y + 28);
        container.addChild(servantNameTxt);
        var skinTitle = App.CommonUtil.getWifeSkinFlagById(skinId);
        if (skinTitle) {
            skinTitle.setPosition(bg.x + bg.width / 2 - skinTitle.width / 2, bg.y + bg.height - skinTitle.height - 60);
            container.addChild(skinTitle);
        }
        var topbg = BaseBitmap.create("ackite_skintopbg");
        topbg.setPosition(container.width / 2 - topbg.width / 2, 1);
        container.addChild(topbg);
        var toolItemVo = this.vo.getShowSkinData();
        var topStr = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acNightSkySkinTopMsg", this.getTypeCode()), ["" + toolItemVo.num, toolItemVo.name]);
        var topDesc = ComponentManager.getTextField(topStr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        topDesc.setPosition(topbg.x + topbg.width / 2 - topDesc.width / 2, topbg.y + topbg.height / 2 - topDesc.height / 2 + 2);
        container.addChild(topDesc);
        var topbgLine = BaseBitmap.create("ackite_skintopline");
        topbgLine.setPosition(container.width / 2 - topbgLine.width / 2, topbg.y + topbg.height);
        container.addChild(topbgLine);
        var buttomBg = BaseBitmap.create("public_popupscrollitembg");
        buttomBg.width = 520;
        buttomBg.height = 285;
        buttomBg.setPosition(container.width / 2 - buttomBg.width / 2, bg.y + bg.height + 4);
        container.addChild(buttomBg);
        var skinTipTxt = ComponentManager.getTextField(LanguageManager.getlocal("servantSkinEffect" + skinCfg.id), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
        skinTipTxt.width = 480;
        skinTipTxt.lineSpacing = 3;
        skinTipTxt.setPosition(buttomBg.x + buttomBg.width / 2 - skinTipTxt.width / 2, buttomBg.y + 15);
        container.addChild(skinTipTxt);
        var addAbility = skinCfg.addAbility;
        for (var index = 0; index < addAbility.length; index++) {
            var bnode = new ServantChangeSkinBookItem();
            bnode.initItem(index, addAbility[index], [skinCfg.id, null, "public_scrolllistbg"]);
            bnode.setPosition(skinTipTxt.x - 5 + index % 2 * 245, skinTipTxt.y + skinTipTxt.height + 15 + Math.floor(index / 2) * 92);
            container.addChild(bnode);
        }
        //兑换
        var exchangeContainer = new BaseDisplayObjectContainer();
        container.addChild(exchangeContainer);
        this._exchangeContainer = exchangeContainer;
        var exchangeBg = BaseBitmap.create(App.CommonUtil.getResByCode("acnightsky_skinprocessbg", this.getTypeCode()));
        exchangeContainer.addChild(exchangeBg);
        exchangeContainer.width = exchangeBg.width;
        exchangeContainer.height = exchangeBg.height;
        exchangeContainer.setPosition(container.width / 2 - exchangeBg.width / 2, bg.y + bg.height - exchangeBg.height);
        var toolIcon = BaseLoadBitmap.create(toolItemVo.icon);
        toolIcon.width = 100;
        toolIcon.height = 100;
        toolIcon.setScale(0.7);
        toolIcon.setPosition(10, exchangeContainer.height / 2 - toolIcon.height * toolIcon.scaleY / 2 - 5);
        var progress = ComponentManager.getProgressBar("progress3", "progress3_bg", 300);
        progress.setPosition(toolIcon.x + toolIcon.width * toolIcon.scaleX - 15, exchangeContainer.height / 2 - progress.height / 2);
        exchangeContainer.addChild(progress);
        exchangeContainer.addChild(toolIcon);
        progress.name = "progress";
        var exchangeBtn = ComponentManager.getButton(ButtonConst.BTN2_SMALL_YELLOW, App.CommonUtil.getCnByCode("acNightSkyDetailSkinget", this.getTypeCode()), this.exchangeBtnClick, this);
        exchangeBtn.setPosition(exchangeContainer.width - exchangeBtn.width - 5, exchangeContainer.height / 2 - exchangeBtn.height / 2);
        exchangeContainer.addChild(exchangeBtn);
        exchangeBtn.name = "exchangeBtn";
        var toolData = Api.itemVoApi.getItemInfoVoById(toolItemVo.id);
        var currNum = 0;
        if (toolData) {
            currNum = toolData.num;
        }
        if (currNum < toolItemVo.num) {
            exchangeBtn.setEnable(false);
        }
        progress.setPercentage(currNum / toolItemVo.num);
        progress.setText("" + currNum + "/" + toolItemVo.num);
    };
    AcNightSkyDetailPopupViewTab3.prototype.exchangeBtnClick = function () {
        var toolItemVo = this.vo.getShowSkinData();
        var toolData = Api.itemVoApi.getItemInfoVoById(toolItemVo.id);
        var currNum = 0;
        if (toolData) {
            currNum = toolData.num;
        }
        if (currNum >= toolItemVo.num) {
            //兑换
            NetManager.request(NetRequestConst.REQUEST_ACNIGHTSKY_EXCHANGE, { activeId: this.vo.aidAndCode });
        }
    };
    AcNightSkyDetailPopupViewTab3.prototype.exchangeCallback = function (evt) {
        if (!evt.data.ret) {
            return;
        }
        var rData = evt.data.data.data;
        var rewardVoList = GameData.formatRewardItem(rData.rewards);
        App.CommonUtil.playRewardFlyAction(rewardVoList);
        if (rData.replacerewards) {
            ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD, { "replacerewards": rData.replacerewards });
        }
        this.refreshUi();
    };
    AcNightSkyDetailPopupViewTab3.prototype.refreshUi = function () {
        var toolItemVo = this.vo.getShowSkinData();
        var toolData = Api.itemVoApi.getItemInfoVoById(toolItemVo.id);
        var currNum = 0;
        if (toolData) {
            currNum = toolData.num;
        }
        var progress = this._exchangeContainer.getChildByName("progress");
        progress.setPercentage(currNum / toolItemVo.num);
        progress.setText("" + currNum + "/" + toolItemVo.num);
        var exchangeBtn = this._exchangeContainer.getChildByName("exchangeBtn");
        if (currNum < toolItemVo.num) {
            exchangeBtn.setEnable(false);
        }
        else {
            exchangeBtn.setEnable(true);
        }
    };
    Object.defineProperty(AcNightSkyDetailPopupViewTab3.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcNightSkyDetailPopupViewTab3.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcNightSkyDetailPopupViewTab3.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcNightSkyDetailPopupViewTab3.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    AcNightSkyDetailPopupViewTab3.prototype.getTypeCode = function () {
        if (this.code == "2") {
            return "1";
        }
    };
    AcNightSkyDetailPopupViewTab3.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACNIGHTSKY_EXCHANGE, this.exchangeCallback, this);
        this._exchangeContainer = null;
        _super.prototype.dispose.call(this);
    };
    return AcNightSkyDetailPopupViewTab3;
}(CommonViewTab));
__reflect(AcNightSkyDetailPopupViewTab3.prototype, "AcNightSkyDetailPopupViewTab3");
//# sourceMappingURL=AcNightSkyDetailPopupViewtTab3.js.map