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
* 进度奖励
* date 2020.7.21
* author ycg
* @name AcGoodMatchDetailPopupViewTab4
*/
var AcGoodMatchDetailPopupViewTab4 = /** @class */ (function (_super) {
    __extends(AcGoodMatchDetailPopupViewTab4, _super);
    function AcGoodMatchDetailPopupViewTab4(data) {
        var _this = _super.call(this) || this;
        _this._exchangeContainer = null;
        _this.param = data;
        _this.initView();
        return _this;
    }
    Object.defineProperty(AcGoodMatchDetailPopupViewTab4.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcGoodMatchDetailPopupViewTab4.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcGoodMatchDetailPopupViewTab4.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcGoodMatchDetailPopupViewTab4.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    AcGoodMatchDetailPopupViewTab4.prototype.getTypeCode = function () {
        if (this.code == "2") {
            return "1";
        }
        return this.code;
    };
    AcGoodMatchDetailPopupViewTab4.prototype.initView = function () {
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACGOODMATCH_EXCHANGE, this.exchangeCallback, this);
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
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
        var skinCfg = Config.WifeCfg.getWifeCfgById(skinId);
        var bgStr = "previewbg_wifeskin";
        var bg = BaseLoadBitmap.create(bgStr); //544 400  522 393
        container.addChild(bg);
        bg.width = 522;
        bg.height = 400;
        var bgMask = new egret.Rectangle(0, 4, 522, 393);
        bg.mask = bgMask;
        bg.x = container.width / 2 - bg.width / 2;
        bg.y = -4;
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
            var wifeIcon = App.DragonBonesUtil.getLoadDragonBones(skinCfg.bone);
            wifeIcon.setScale(0.65);
            wifeIcon.anchorOffsetY = wifeIcon.height;
            wifeIcon.anchorOffsetX = wifeIcon.width / 2;
            wifeIcon.x = maskContan.width / 2;
            wifeIcon.y = maskContan.y + maskContan.height - 6; //-5
            maskContan.addChild(wifeIcon);
        }
        else {
            var wifeImg = BaseLoadBitmap.create(skinCfg.body);
            wifeImg.width = 640;
            wifeImg.height = 840;
            wifeImg.anchorOffsetY = wifeImg.height;
            wifeImg.anchorOffsetX = wifeImg.width / 2;
            wifeImg.setScale(0.45);
            wifeImg.x = maskContan.width / 2;
            wifeImg.y = maskContan.y + maskContan.height - 5;
            maskContan.addChild(wifeImg);
        }
        var skinnamebg = BaseBitmap.create("skin_detail_namebg");
        skinnamebg.setPosition(bg.x + 10, bg.y + 35);
        container.addChild(skinnamebg);
        var skinNameTxt = ComponentManager.getTextField(skinCfg.name, TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_QUALITY_ORANGE);
        skinNameTxt.setPosition(skinnamebg.x + skinnamebg.width / 2 - skinNameTxt.width / 2, skinnamebg.y + 60 - skinNameTxt.height / 2);
        container.addChild(skinNameTxt);
        var buttomBg = BaseBitmap.create("public_popupscrollitembg");
        buttomBg.width = 522; //525
        buttomBg.height = 286; //274
        buttomBg.setPosition(container.width / 2 - buttomBg.width / 2, bg.y + bg.height + 3);
        container.addChild(buttomBg);
        //初始魅力
        var initialCharmStr = LanguageManager.getlocal('acCommonWifePopupViewcCharm', [skinCfg.glamour + '']);
        var initialCharmTxt = ComponentManager.getTextField(initialCharmStr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
        initialCharmTxt.setPosition(buttomBg.x + 30, buttomBg.y + 30);
        container.addChild(initialCharmTxt);
        //加成门客
        var servantCfg = Config.ServantCfg.getServantItemById(skinCfg.servantId);
        var servantAddStr = LanguageManager.getlocal('acCommonWifePopupViewcServant', [servantCfg.name]);
        var servantAddTxt = ComponentManager.getTextField(servantAddStr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
        servantAddTxt.setPosition(buttomBg.x + 30, initialCharmTxt.y + 30);
        container.addChild(servantAddTxt);
        var descBg = BaseBitmap.create("public_scrolllistbg"); //public_9_managebg
        descBg.width = 500;
        descBg.height = 130;
        descBg.setPosition(buttomBg.x + buttomBg.width / 2 - descBg.width / 2, servantAddTxt.y + servantAddTxt.height + 20);
        container.addChild(descBg);
        var wifeDescTxt = ComponentManager.getTextField(skinCfg.desc, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
        wifeDescTxt.lineSpacing = 3;
        wifeDescTxt.width = descBg.width - 40;
        wifeDescTxt.setPosition(descBg.x + 20, descBg.y + descBg.height / 2 - wifeDescTxt.height / 2);
        container.addChild(wifeDescTxt);
        var topbg = BaseBitmap.create("ackite_skintopbg");
        topbg.setPosition(container.width / 2 - topbg.width / 2, 1);
        container.addChild(topbg);
        var toolItemVo = this.vo.getShowSkinData();
        var topStr = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acGoodMatchDetailSkinTopMsg", this.getTypeCode()), ["" + toolItemVo.num, toolItemVo.name]);
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
        var exchangeBtn = ComponentManager.getButton(ButtonConst.BTN2_SMALL_YELLOW, App.CommonUtil.getCnByCode("acGoodMatchDetailSKinExchange", this.getTypeCode()), this.exchangeBtnClick, this);
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
    AcGoodMatchDetailPopupViewTab4.prototype.exchangeBtnClick = function () {
        var toolItemVo = this.vo.getShowSkinData();
        var toolData = Api.itemVoApi.getItemInfoVoById(toolItemVo.id);
        var currNum = 0;
        if (toolData) {
            currNum = toolData.num;
        }
        if (currNum >= toolItemVo.num) {
            //兑换
            NetManager.request(NetRequestConst.REQUEST_ACGOODMATCH_EXCHANGE, { activeId: this.vo.aidAndCode });
        }
    };
    AcGoodMatchDetailPopupViewTab4.prototype.exchangeCallback = function (evt) {
        if (!evt.data.ret) {
            return;
        }
        var rData = evt.data.data.data;
        var rewardVoList = GameData.formatRewardItem(rData.rewards);
        App.CommonUtil.playRewardFlyAction(rewardVoList);
        if (rData.replacerewards) {
            ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD, { "replacerewards": rData.replacerewards });
        }
    };
    AcGoodMatchDetailPopupViewTab4.prototype.refreshView = function () {
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
    AcGoodMatchDetailPopupViewTab4.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACGOODMATCH_EXCHANGE, this.exchangeCallback, this);
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        this._exchangeContainer = null;
        _super.prototype.dispose.call(this);
    };
    return AcGoodMatchDetailPopupViewTab4;
}(CommonViewTab));
//# sourceMappingURL=AcGoodMatchDetailPopupViewTab4.js.map