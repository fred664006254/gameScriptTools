var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * 衣装预览
 * date 2020.6.2
 * @class AcPowerFullDetailViewTab4
 */
var AcPowerFullDetailViewTab4 = /** @class */ (function (_super) {
    __extends(AcPowerFullDetailViewTab4, _super);
    function AcPowerFullDetailViewTab4(data) {
        var _this = _super.call(this) || this;
        _this._exchangeContainer = null;
        _this.param = data;
        _this.initView();
        return _this;
    }
    Object.defineProperty(AcPowerFullDetailViewTab4.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcPowerFullDetailViewTab4.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcPowerFullDetailViewTab4.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcPowerFullDetailViewTab4.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    AcPowerFullDetailViewTab4.prototype.getTypeCode = function () {
        if (this.code == "2") {
            return "1";
        }
        return this.code;
    };
    AcPowerFullDetailViewTab4.prototype.initView = function () {
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACPOWERFULL_EXCHANGE, this.exchangeCallback, this);
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
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
        var skinBg = skinCfg.getSkinPreviewBg();
        var isOwn = false;
        var bgStr = "previewbg_servantskin";
        if (skinBg && ResourceManager.hasRes(skinBg)) {
            bgStr = skinBg;
            isOwn = true;
        }
        var bg = BaseLoadBitmap.create(bgStr); //544 400  522 393
        container.addChild(bg);
        // let bgMask = new egret.Rectangle(0, 4, 522, 393);
        // bg.mask = bgMask;
        // // bg.x = container.width/2 - bg.width/2;
        // bg.y = -4;
        if (isOwn) {
            bg.width = 544;
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
        maskContan.width = 522; // 544
        maskContan.height = 364;
        maskContan.mask = rect;
        maskContan.setPosition(container.width / 2 - maskContan.width / 2, bg.y + 29);
        container.addChild(maskContan);
        var boneName = undefined;
        if (skinCfg && skinCfg.bone) {
            boneName = skinCfg.bone + "_ske";
        }
        if ((!Api.switchVoApi.checkCloseBone()) && boneName && RES.hasRes(boneName) && App.CommonUtil.check_dragon()) {
            var servantIcon = App.DragonBonesUtil.getLoadDragonBones(skinCfg.bone);
            servantIcon.setScale(0.75);
            servantIcon.anchorOffsetY = servantIcon.height;
            servantIcon.anchorOffsetX = servantIcon.width / 2;
            servantIcon.x = maskContan.width / 2;
            servantIcon.y = maskContan.y + maskContan.height - 6; //-5
            maskContan.addChild(servantIcon);
        }
        else {
            var skinImg = BaseLoadBitmap.create(skinCfg.body);
            skinImg.width = 405;
            skinImg.height = 467;
            skinImg.anchorOffsetY = skinImg.height;
            skinImg.anchorOffsetX = skinImg.width / 2;
            skinImg.setScale(0.8);
            skinImg.x = maskContan.width / 2;
            skinImg.y = maskContan.y + maskContan.height - 5;
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
        var skinTitle = App.CommonUtil.getServantSkinFlagById(skinId);
        if (skinTitle) {
            skinTitle.setPosition(bg.x + bg.width / 2 - skinTitle.width / 2, bg.y + bg.height - skinTitle.height - 70);
            container.addChild(skinTitle);
        }
        var buttomBg = BaseBitmap.create("public_popupscrollitembg");
        buttomBg.width = 522; //525
        buttomBg.height = 286; //274
        buttomBg.setPosition(container.width / 2 - buttomBg.width / 2, bg.y + bg.height + 3);
        container.addChild(buttomBg);
        var skinTipTxt = ComponentManager.getTextField(LanguageManager.getlocal("servantSkinEffect" + skinCfg.id), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
        skinTipTxt.width = 480;
        skinTipTxt.lineSpacing = 3;
        skinTipTxt.setPosition(buttomBg.x + buttomBg.width / 2 - skinTipTxt.width / 2, buttomBg.y + 20);
        container.addChild(skinTipTxt);
        var addAbility = skinCfg.addAbility;
        for (var index = 0; index < addAbility.length; index++) {
            var bnode = new ServantChangeSkinBookItem();
            bnode.initItem(index, addAbility[index], [skinCfg.id]);
            bnode.setPosition(buttomBg.x + 10 + index % 2 * 250, skinTipTxt.y + skinTipTxt.height + 5 + Math.floor(index / 2) * 92);
            container.addChild(bnode);
        }
        // let buttomTipTxt = ComponentManager.getTextField(LanguageManager.getlocal("skin_servantInTip"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
        // buttomTipTxt.setPosition(buttomBg.x + buttomBg.width / 2 - buttomTipTxt.width / 2, buttomBg.y + buttomBg.height - buttomTipTxt.height - 10);
        // container.addChild(buttomTipTxt);
        var topbg = BaseBitmap.create("ackite_skintopbg");
        topbg.setPosition(container.width / 2 - topbg.width / 2, 1);
        container.addChild(topbg);
        var toolItemVo = this.vo.getShowSkinData();
        var topStr = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acPowerFullDetailSkinTopmsg", this.getTypeCode()), ["" + toolItemVo.num, toolItemVo.name]);
        var topDesc = ComponentManager.getTextField(topStr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        topDesc.setPosition(topbg.x + topbg.width / 2 - topDesc.width / 2, topbg.y + topbg.height / 2 - topDesc.height / 2 + 2);
        container.addChild(topDesc);
        var topbgLine = BaseBitmap.create("ackite_skintopline");
        topbgLine.setPosition(container.width / 2 - topbgLine.width / 2, topbg.y + topbg.height);
        container.addChild(topbgLine);
        //兑换
        var exchangeContainer = new BaseDisplayObjectContainer();
        container.addChild(exchangeContainer);
        this._exchangeContainer = exchangeContainer;
        var exchangeBg = BaseBitmap.create("acpowerfull_skinexchangebg");
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
        var exchangeBtn = ComponentManager.getButton(ButtonConst.BTN2_SMALL_YELLOW, App.CommonUtil.getCnByCode("acPowerFullDetailSKinExchange", this.getTypeCode()), this.exchangeBtnClick, this);
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
    AcPowerFullDetailViewTab4.prototype.exchangeBtnClick = function () {
        var toolItemVo = this.vo.getShowSkinData();
        var toolData = Api.itemVoApi.getItemInfoVoById(toolItemVo.id);
        var currNum = 0;
        if (toolData) {
            currNum = toolData.num;
        }
        if (currNum >= toolItemVo.num) {
            //兑换
            NetManager.request(NetRequestConst.REQUEST_ACPOWERFULL_EXCHANGE, { activeId: this.vo.aidAndCode });
        }
    };
    AcPowerFullDetailViewTab4.prototype.exchangeCallback = function (evt) {
        if (!evt.data.ret) {
            return;
        }
        var rData = evt.data.data.data;
        var localKey = "exchangeDialog" + this.vo.aidAndCode + Api.playerVoApi.getPlayerID() + this.vo.st;
        var isShow = LocalStorageManager.get(localKey);
        if (isShow && isShow != "") {
            this.showRewardView(rData);
        }
        else {
            var view_1 = this;
            var keyStr = "exchangeDialog_" + this.getTypeCode();
            var startCfg = view_1.cfg[keyStr];
            LocalStorageManager.set(localKey, String(this.vo.st));
            var bgName = App.CommonUtil.getResByCode("acpowerfull_bg", this.getTypeCode());
            ViewController.getInstance().openView(ViewConst.POPUP.ACYIYIBUSHEAVGVIEW, {
                aid: view_1.aid,
                code: view_1.getTypeCode(),
                AVGDialog: startCfg,
                visitId: "1",
                talkKey: "acPowerFullExchangeDialog",
                bgName: bgName,
                callBack: function () {
                    view_1.showRewardView(rData);
                },
                obj: view_1
            });
        }
        this.refreshView();
    };
    AcPowerFullDetailViewTab4.prototype.showRewardView = function (rData) {
        var rewardVoList = GameData.formatRewardItem(rData.rewards);
        App.CommonUtil.playRewardFlyAction(rewardVoList);
        if (rData.replacerewards) {
            ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD, { "replacerewards": rData.replacerewards });
        }
    };
    AcPowerFullDetailViewTab4.prototype.refreshView = function () {
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
    AcPowerFullDetailViewTab4.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACPOWERFULL_EXCHANGE, this.exchangeCallback, this);
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        this._exchangeContainer = null;
        _super.prototype.dispose.call(this);
    };
    return AcPowerFullDetailViewTab4;
}(CommonViewTab));
//# sourceMappingURL=AcPowerFullDetailViewTab4.js.map