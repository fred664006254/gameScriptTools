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
 * 搜查魏府 皮肤兑换
 * author 张朝阳
 * date 2019/6/25
 * @class AcChristmasBigRewardPopupView
 */
var AcSearchProofSkinPopupView = (function (_super) {
    __extends(AcSearchProofSkinPopupView, _super);
    function AcSearchProofSkinPopupView() {
        var _this = _super.call(this) || this;
        _this._progress = null;
        _this._desc = null;
        return _this;
    }
    AcSearchProofSkinPopupView.prototype.initView = function () {
        var _this = this;
        this.aid = this.param.data.aid;
        this.code = this.param.data.code;
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY_CLAIMPROOF, this.claimRewardsHandle, this);
        var acCfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        var skinCfg = Config.ServantskinCfg.getServantSkinItemById(acCfg.show);
        var servantCfg = Config.ServantCfg.getServantItemById(skinCfg.servantId);
        var rewardsVo = GameData.formatRewardItem(acCfg.itemExchange[0].costProof)[0];
        var rewardsVo2 = GameData.formatRewardItem(acCfg.itemExchange[0].getReward)[0];
        var rewardsVo3 = GameData.formatRewardItem(acCfg.itemExchange[1].costProof)[0];
        var rewardsVo4 = GameData.formatRewardItem(acCfg.itemExchange[1].getReward)[0];
        var proofNum = Api.itemVoApi.getItemNumInfoVoById(GameData.formatRewardItem(acCfg.mustGet2)[0].id);
        var bg = BaseLoadBitmap.create("acchristmasview_rewardmidbg");
        bg.width = 544;
        bg.height = 400;
        bg.setPosition(this.viewBg.x + this.viewBg.width / 2 - bg.width / 2, 0);
        this.addChildToContainer(bg);
        var rect = new egret.Rectangle(0, 0, 544, 364);
        var maskContan = new BaseDisplayObjectContainer();
        maskContan.width = 544;
        maskContan.height = 364;
        maskContan.mask = rect;
        maskContan.setPosition(bg.x + bg.width / 2 - maskContan.width / 2, bg.y + 30);
        this.addChildToContainer(maskContan);
        var boneName = undefined;
        if (skinCfg && skinCfg.bone) {
            boneName = skinCfg.bone + "_ske";
        }
        if ((!Api.switchVoApi.checkCloseBone()) && boneName && RES.hasRes(boneName) && App.CommonUtil.check_dragon()) {
            var droWifeIcon = App.DragonBonesUtil.getLoadDragonBones(skinCfg.bone);
            droWifeIcon.setScale(0.9);
            droWifeIcon.anchorOffsetY = droWifeIcon.height;
            droWifeIcon.anchorOffsetX = droWifeIcon.width / 2;
            droWifeIcon.x = maskContan.width / 2;
            droWifeIcon.y = maskContan.y + maskContan.height - 5;
            maskContan.addChild(droWifeIcon);
        }
        else {
            var skinImg = BaseLoadBitmap.create(skinCfg.body);
            skinImg.width = 405;
            skinImg.height = 467;
            skinImg.anchorOffsetY = skinImg.height;
            skinImg.anchorOffsetX = skinImg.width / 2;
            skinImg.setScale(0.87);
            skinImg.x = maskContan.width / 2;
            skinImg.y = maskContan.y + maskContan.height - 5;
            maskContan.addChild(skinImg);
        }
        var topbg = BaseLoadBitmap.create("acchristmasview_rewardtopbg");
        topbg.width = 544;
        topbg.height = 36;
        topbg.setPosition(this.viewBg.x + this.viewBg.width / 2 - topbg.width / 2, 0);
        this.addChildToContainer(topbg);
        var topDesc = ComponentManager.getTextField(LanguageManager.getlocal("acSearchProofSkinPopupViewTopDesc-" + this.code, [String(rewardsVo.num)]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        topDesc.setPosition(topbg.x + topbg.width / 2 - topDesc.width / 2, topbg.y + topbg.height / 2 - topDesc.height / 2);
        this.addChildToContainer(topDesc);
        var skinnamebg = BaseBitmap.create("skin_detail_namebg");
        skinnamebg.setPosition(bg.x, bg.y + 20);
        this.addChildToContainer(skinnamebg);
        var skinNameTxt = ComponentManager.getTextField(skinCfg.getSkinName(), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_QUALITY_ORANGE);
        skinNameTxt.setPosition(skinnamebg.x + skinnamebg.width / 2 - skinNameTxt.width / 2, skinnamebg.y + 33);
        this.addChildToContainer(skinNameTxt);
        var servantNameTxt = ComponentManager.getTextField(servantCfg.name, TextFieldConst.FONTSIZE_BUTTON_COMMON);
        servantNameTxt.setPosition(skinnamebg.x + skinnamebg.width / 2 - servantNameTxt.width / 2, skinNameTxt.y + 28);
        this.addChildToContainer(servantNameTxt);
        var itemicon = BaseLoadBitmap.create("itemicon" + rewardsVo.id);
        itemicon.width = 90;
        itemicon.height = 90;
        itemicon.setPosition(bg.x + 10, bg.y + bg.height);
        this.addChildToContainer(itemicon);
        this._progress = ComponentManager.getProgressBar("progress5", "progress3_bg", 300);
        this._progress.setPosition(itemicon.x + itemicon.width, itemicon.y + 15);
        this.addChildToContainer(this._progress);
        this._desc = ComponentManager.getTextField(LanguageManager.getlocal("acSearchProofSkinPopupViewDesc-" + this.code, [String(rewardsVo.num)]), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_BLACK);
        this._desc.width = 300;
        this._desc.setPosition(this._progress.x, this._progress.y + this._progress.height + 2);
        this.addChildToContainer(this._desc);
        var btn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "acSearchProofSkinPopupViewExchange-" + this.code, function () {
            var vo = Api.acVoApi.getActivityVoByAidAndCode(_this.aid, _this.code);
            if (!vo.isStart) {
                App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
                return;
            }
            if (_this._progress.getPercent() < 1) {
                App.CommonUtil.showTip(LanguageManager.getlocal("acSearchProofViewNotEnoughProof-" + _this.code));
                return;
            }
            NetManager.request(NetRequestConst.REQUEST_ACTIVITY_CLAIMPROOF, { activeId: vo.aidAndCode });
        }, this);
        btn.setScale(0.95);
        btn.setPosition(this._progress.x + this._progress.width + 3, this._progress.y);
        this.addChildToContainer(btn);
        var cfg = Config.ServantskinCfg.getServantSkinItemById(String(acCfg.show));
        if (!cfg.canExchangeItem()) {
            this._progress.setPercentage(proofNum / rewardsVo3.num, String(proofNum) + "/" + String(rewardsVo3.num));
            this._desc.text = LanguageManager.getlocal("acSearchProofSkinPopupViewDesc2-" + this.code);
        }
        else {
            this._progress.setPercentage(proofNum / rewardsVo.num, String(proofNum) + "/" + String(rewardsVo.num));
            this._desc.text = LanguageManager.getlocal("acSearchProofSkinPopupViewDesc-" + this.code, [String(rewardsVo.num)]);
        }
        var buttomBg = BaseBitmap.create("public_9_probiginnerbg");
        buttomBg.width = 530;
        buttomBg.height = 275 + 20;
        buttomBg.setPosition(this.viewBg.x + this.viewBg.width / 2 - buttomBg.width / 2, bg.y + bg.height + 5 + 95);
        this.addChildToContainer(buttomBg);
        var buttomBg2 = BaseBitmap.create("public_9_bg14");
        buttomBg2.width = 525;
        buttomBg2.height = 269 + 20;
        buttomBg2.setPosition(buttomBg.x + buttomBg.width / 2 - buttomBg2.width / 2, buttomBg.y + buttomBg.height / 2 - buttomBg2.height / 2);
        this.addChildToContainer(buttomBg2);
        var skinTipTxt = ComponentManager.getTextField(LanguageManager.getlocal("servantSkinEffect" + skinCfg.id), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
        skinTipTxt.width = 480;
        skinTipTxt.lineSpacing = 3;
        skinTipTxt.setPosition(buttomBg2.x + buttomBg2.width / 2 - skinTipTxt.width / 2, buttomBg2.y + 20);
        this.addChildToContainer(skinTipTxt);
        var addAbility = skinCfg.addAbility;
        for (var index = 0; index < addAbility.length; index++) {
            var bnode = new ServantChangeSkinBookItem();
            bnode.initItem(index, addAbility[index], [skinCfg.id]);
            bnode.setPosition(skinTipTxt.x - 5 + index % 2 * 245, skinTipTxt.y + skinTipTxt.height + 15 + Math.floor(index / 2) * 92);
            this.addChildToContainer(bnode);
        }
        // let buttomTipTxt = ComponentManager.getTextField(LanguageManager.getlocal("acChristmasBigRewardPopupViewButtomDesc"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
        // buttomTipTxt.setPosition(buttomBg2.x + buttomBg2.width / 2 - buttomTipTxt.width / 2, buttomBg2.y + buttomBg2.height - buttomTipTxt.height - 15);
        // this.addChildToContainer(buttomTipTxt);
    };
    AcSearchProofSkinPopupView.prototype.claimRewardsHandle = function (event) {
        if (event.data.ret) {
            var rewards = event.data.data.data.rewards;
            var rewardsVo = GameData.formatRewardItem(rewards);
            App.CommonUtil.playRewardFlyAction(rewardsVo);
            var acCfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
            var rewardsVo1 = GameData.formatRewardItem(acCfg.itemExchange[0].costProof)[0];
            var rewardsVo2 = GameData.formatRewardItem(acCfg.itemExchange[0].getReward)[0];
            var rewardsVo3 = GameData.formatRewardItem(acCfg.itemExchange[1].costProof)[0];
            var proofNum = Api.itemVoApi.getItemNumInfoVoById(GameData.formatRewardItem(acCfg.mustGet2)[0].id);
            var cfg = Config.ServantskinCfg.getServantSkinItemById(String(acCfg.show));
            if (!cfg.canExchangeItem()) {
                this._progress.setPercentage(proofNum / rewardsVo3.num, String(proofNum) + "/" + String(rewardsVo3.num));
                this._desc.text = LanguageManager.getlocal("acSearchProofSkinPopupViewDesc2-" + this.code);
            }
            else {
                this._progress.setPercentage(proofNum / rewardsVo1.num, String(proofNum) + "/" + String(rewardsVo1.num));
                this._desc.text = LanguageManager.getlocal("acSearchProofSkinPopupViewDesc-" + this.code, [String(rewardsVo1.num)]);
            }
        }
    };
    AcSearchProofSkinPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "skin_detail_namebg", "progress3_bg", "progress5", "servant_star",
            "servant_infoPro1", "servant_infoPro2", "servant_infoPro3", "servant_infoPro4",
        ]);
    };
    AcSearchProofSkinPopupView.prototype.getTitleStr = function () {
        return "acSearchProofSkinPopupViewTitle-" + this.param.data.code;
    };
    // protected getShowHeight() {
    // 	return 815+40;
    // }
    AcSearchProofSkinPopupView.prototype.getBgExtraHeight = function () {
        return 20;
    };
    AcSearchProofSkinPopupView.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_CLAIMPROOF, this.claimRewardsHandle, this);
        this.aid = null;
        this.code = null;
        this._progress = null;
        this._desc = null;
        _super.prototype.dispose.call(this);
    };
    return AcSearchProofSkinPopupView;
}(PopupView));
__reflect(AcSearchProofSkinPopupView.prototype, "AcSearchProofSkinPopupView");
//# sourceMappingURL=AcSearchProofSkinPopupView.js.map