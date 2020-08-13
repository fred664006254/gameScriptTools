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
 * author wxz
 * date 2020.6.22
 * @class AcSkyArmorRewardPopViewTab4
 */
var AcSkyArmorRewardPopViewTab4 = /** @class */ (function (_super) {
    __extends(AcSkyArmorRewardPopViewTab4, _super);
    function AcSkyArmorRewardPopViewTab4(data) {
        var _this = _super.call(this) || this;
        _this._progress = null;
        _this.param = data;
        _this.initView();
        return _this;
    }
    AcSkyArmorRewardPopViewTab4.prototype.initView = function () {
        var _this = this;
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACSKYARMOR_EXCHANGE, this.changeHandle, this);
        var container = new BaseDisplayObjectContainer();
        container.width = GameConfig.stageWidth - 60;
        var skinId = this.cfg.show;
        var skinCfg = Config.ServantskinCfg.getServantSkinItemById(skinId);
        var bbg = BaseBitmap.create("public_9_bg4");
        bbg.width = 530;
        bbg.height = 705;
        bbg.setPosition(container.width / 2 - bbg.width / 2, 55);
        container.addChild(bbg);
        var servantCfg = Config.ServantCfg.getServantItemById(skinCfg.servantId);
        var bgstr = "previewbg_servantskin";
        var isOwn = false;
        var skinBg = skinCfg.getSkinPreviewBg();
        if (skinBg && ResourceManager.hasRes(skinBg)) {
            bgstr = skinBg;
            isOwn = true;
        }
        var bg = BaseLoadBitmap.create(bgstr);
        bg.width = 525;
        bg.height = 400;
        bg.setPosition(container.width / 2 - bg.width / 2, 57);
        container.addChild(bg);
        var rect = new egret.Rectangle(0, 0, 522, 370);
        var maskContan = new BaseDisplayObjectContainer();
        maskContan.width = 530;
        maskContan.height = 364;
        maskContan.mask = rect;
        maskContan.setPosition(bg.x + bg.width / 2 - maskContan.width / 2 + 5, bg.y + 30);
        container.addChild(maskContan);
        var skinEffBone = skinCfg.getSkinEffectBone();
        var skinEffBoneName = skinEffBone + "_ske";
        if (isOwn) {
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
            var droWifeIcon = App.DragonBonesUtil.getLoadDragonBones(skinCfg.bone);
            droWifeIcon.scaleY = 0.8;
            droWifeIcon.scaleX = 0.8;
            droWifeIcon.anchorOffsetY = droWifeIcon.height;
            droWifeIcon.anchorOffsetX = droWifeIcon.width / 2;
            droWifeIcon.x = maskContan.width / 2 - 10;
            droWifeIcon.y = maskContan.y + maskContan.height - 35;
            maskContan.addChild(droWifeIcon);
        }
        else {
            var skinImg = BaseLoadBitmap.create(skinCfg.body);
            skinImg.width = 405;
            skinImg.height = 467;
            skinImg.anchorOffsetY = skinImg.height;
            skinImg.anchorOffsetX = skinImg.width / 2;
            skinImg.setScale(0.9);
            skinImg.x = maskContan.width / 2;
            skinImg.y = maskContan.y + maskContan.height - 20;
            maskContan.addChild(skinImg);
        }
        var topbg = BaseLoadBitmap.create("acchristmasview_rewardtopbg");
        topbg.width = 525;
        topbg.height = 36;
        topbg.setPosition(container.width / 2 - topbg.width / 2, 57);
        container.addChild(topbg);
        var skinTitle = App.CommonUtil.getServantSkinFlagById(skinId);
        if (skinTitle) {
            skinTitle.setPosition(bg.x + bg.width / 2 - skinTitle.width / 2, bg.y + bg.height - skinTitle.height - 65);
            container.addChild(skinTitle);
        }
        var con = this.vo.getAuraCon();
        con.x = topbg.x + topbg.width - con.width * con.scaleX - 10;
        con.y = topbg.y + topbg.height * con.scaleY + 10;
        container.addChild(con);
        var str = this.cfg.change.needItem;
        var itemCfg = Config.ItemCfg.getItemCfgById(str.split("_")[1]);
        var showstr = LanguageManager.getlocal("acSkyArmorExchangeTopMsg", [str.split("_")[2], itemCfg.name]);
        var topDesc = ComponentManager.getTextField(showstr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        topDesc.setPosition(topbg.x + topbg.width / 2 - topDesc.width / 2, topbg.y + topbg.height / 2 - topDesc.height / 2);
        container.addChild(topDesc);
        var skinnamebg = BaseBitmap.create("skin_detail_namebg");
        skinnamebg.setPosition(bg.x, bg.y + 25);
        container.addChild(skinnamebg);
        var skinNameTxt = ComponentManager.getTextField(skinCfg.getSkinName(), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_QUALITY_ORANGE);
        skinNameTxt.setPosition(skinnamebg.x + skinnamebg.width / 2 - skinNameTxt.width / 2, skinnamebg.y + 33);
        container.addChild(skinNameTxt);
        var servantNameTxt = ComponentManager.getTextField(servantCfg.name, TextFieldConst.FONTSIZE_BUTTON_COMMON);
        servantNameTxt.setPosition(skinnamebg.x + skinnamebg.width / 2 - servantNameTxt.width / 2, skinNameTxt.y + 28);
        container.addChild(servantNameTxt);
        var buttomBg = BaseBitmap.create("public_popupscrollitembg");
        buttomBg.width = 520;
        buttomBg.height = 275 + 20;
        buttomBg.setPosition(container.width / 2 - buttomBg.width / 2, bg.y + bg.height + 5);
        container.addChild(buttomBg);
        var buttomBg2 = BaseBitmap.create("public_9_managebg");
        buttomBg2.width = 515;
        buttomBg2.height = 269 + 20;
        buttomBg2.setPosition(buttomBg.x + buttomBg.width / 2 - buttomBg2.width / 2, buttomBg.y + buttomBg.height / 2 - buttomBg2.height / 2);
        container.addChild(buttomBg2);
        buttomBg2.visible = false;
        var skinTipTxt = ComponentManager.getTextField(LanguageManager.getlocal("servantSkinEffect" + skinCfg.id), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
        skinTipTxt.width = 480;
        skinTipTxt.lineSpacing = 3;
        skinTipTxt.setPosition(buttomBg2.x + buttomBg2.width / 2 - skinTipTxt.width / 2, buttomBg2.y + 20);
        container.addChild(skinTipTxt);
        var addAbility = skinCfg.addAbility;
        for (var index = 0; index < addAbility.length; index++) {
            var bnode = new ServantChangeSkinBookItem();
            bnode.initItem(index, addAbility[index], [skinCfg.id]);
            bnode.setPosition(skinTipTxt.x - 5 + index % 2 * 245, skinTipTxt.y + skinTipTxt.height + 15 + Math.floor(index / 2) * 92);
            container.addChild(bnode);
        }
        this.addChild(container);
        var exchangeBg = BaseBitmap.create(App.CommonUtil.getResByCode("acskyarmor_skinprocessbg", this.getTypeCode()));
        container.addChild(exchangeBg);
        exchangeBg.setPosition(container.width / 2 - exchangeBg.width / 2, bg.y + bg.height - exchangeBg.height);
        var itemicon = BaseLoadBitmap.create("itemicon" + itemCfg.id);
        itemicon.width = 60;
        itemicon.height = 60;
        itemicon.setPosition(buttomBg.x + 5, buttomBg.y - itemicon.height - 10);
        this._progress = ComponentManager.getProgressBar("progress5", "progress3_bg", 315);
        this._progress.setPosition(itemicon.x + itemicon.width - 10, itemicon.y + 15);
        container.addChild(this._progress);
        container.addChild(itemicon);
        var btn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "acSkyArmorExchangeBtnTxt", function () {
            if (!_this.vo.isStart) {
                App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
                return;
            }
            if (_this._progress.getPercent() < 1) {
                App.CommonUtil.showTip(LanguageManager.getlocal("acSkyArmorExchangeNoTxt"));
                return;
            }
            NetManager.request(NetRequestConst.REQUEST_ACSKYARMOR_EXCHANGE, { activeId: _this.vo.aidAndCode });
        }, this);
        btn.setPosition(this._progress.x + this._progress.width + 5, this._progress.y - 10);
        container.addChild(btn);
        this.freshProcess();
    };
    AcSkyArmorRewardPopViewTab4.prototype.freshProcess = function () {
        var change = this.cfg.change.needItem;
        var changearr = change.split("_");
        var itemCfg = Config.ItemCfg.getItemCfgById(changearr[1]);
        var have = Api.itemVoApi.getItemNumInfoVoById(itemCfg.id);
        var need = parseInt(changearr[2]);
        this._progress.setPercentage(have / need, String(have) + "/" + String(need));
    };
    AcSkyArmorRewardPopViewTab4.prototype.changeHandle = function (event) {
        if (!event.data.ret) {
            App.CommonUtil.showTip(LanguageManager.getlocal("time_error"));
            return;
        }
        var rdata = event.data.data.data;
        var replacerewards = rdata.replacerewards;
        if (replacerewards) {
            ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD, { "replacerewards": replacerewards });
        }
        if (rdata.rewards) {
            var rewardVoList = GameData.formatRewardItem(rdata.rewards);
            App.CommonUtil.playRewardFlyAction(rewardVoList);
        }
        this.freshProcess();
    };
    Object.defineProperty(AcSkyArmorRewardPopViewTab4.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    AcSkyArmorRewardPopViewTab4.prototype.getTypeCode = function () {
        if (this.code == "2") {
            return "1";
        }
        return this.code;
    };
    Object.defineProperty(AcSkyArmorRewardPopViewTab4.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcSkyArmorRewardPopViewTab4.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcSkyArmorRewardPopViewTab4.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    AcSkyArmorRewardPopViewTab4.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this._progress = null;
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACSKYARMOR_EXCHANGE, this.changeHandle, this);
    };
    return AcSkyArmorRewardPopViewTab4;
}(CommonViewTab));
//# sourceMappingURL=AcSkyArmorRewardPopViewTab4.js.map