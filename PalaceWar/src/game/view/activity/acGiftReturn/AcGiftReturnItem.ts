/**
  * 好礼相送 活动   目前只做了 红颜， 红颜皮肤， 门客皮肤，
  * @author 张朝阳
  * date 2019/7/2
  * @class AcGiftReturnItem
  */
class AcGiftReturnItem extends BaseDisplayObjectContainer {
    private aid: string = null;
    private code: string = null;
    private _itemCfg: Config.AcCfg.GiftReturnClaimItemCfg = null;
    private _itemBg: BaseLoadBitmap = null;
    private _claimBtn: BaseButton = null;
    private _claimBM: BaseBitmap = null;
    public constructor() {
        super();
    }
    public init(itemCfg: Config.AcCfg.GiftReturnClaimItemCfg, aid: string, code: string): void {
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreashView, this);
        this.aid = aid;
        this.code = code;
        this._itemCfg = itemCfg;
        let cfg = <Config.AcCfg.GiftReturnCfg>Config.AcCfg.getCfgByActivityIdAndCode(aid, code);
        let vo = <AcGiftReturnVo>Api.acVoApi.getActivityVoByAidAndCode(aid, code);
        this.width = 179;
        this.height = 530;


        this._itemBg = BaseLoadBitmap.create("acgiftreturnview_itembg-" + this.getUiCode());
        this._itemBg.width = 173;
        this._itemBg.height = 480;
        this.addChild(this._itemBg);

        // 显示
        if (this._itemCfg.logic) {
            let rewardVoList = GameData.formatRewardItem(this._itemCfg.logic);
            let rewardVo: RewardItemVo = null;
            for (let i = 0; i < rewardVoList.length; i++) {
                if (rewardVoList[i].type != 6) {
                    rewardVo = rewardVoList[i];
                    break;
                }
            }

            if (rewardVo.type == 10) {
                let wifeCfg = Config.WifeCfg.getWifeCfgById(rewardVo.id);

                let wifeName = ComponentManager.getTextField(wifeCfg.name, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
                wifeName.setPosition(this._itemBg.x + this._itemBg.width / 2 - wifeName.width / 2, this._itemBg.y + 36 - wifeName.height / 2);
                this.addChild(wifeName);

                let mask = BaseLoadBitmap.create("tailor_skinMask");
                mask.width = 155;
                mask.height = 358;
                let container = new BaseDisplayObjectContainer();
                container.addChild(mask);
                this.addChild(container);
                container.setPosition(this._itemBg.x + this._itemBg.width / 2 - container.width / 2, this._itemBg.y + this._itemBg.height / 2 - container.height / 2 + 9);

                let wifeImgSclae = 0.54;
                let wifeImg = BaseLoadBitmap.create("wife_full_" + wifeCfg.id);
                wifeImg.width = 640;
                wifeImg.height = 840;
                wifeImg.setScale(wifeImgSclae);
                wifeImg.mask = mask;
                wifeImg.setPosition(this._itemBg.x + this._itemBg.width / 2 - wifeImg.width / 2 * wifeImgSclae, container.y + 10);
                this.addChild(wifeImg);

                let skinTxtEffect = ComponentManager.getCustomMovieClip("acwealthcarpview_skineffect", 10, 70);
                let skinTxtEffectBM = BaseBitmap.create("acwealthcarpview_skineffect1");
                skinTxtEffect.setPosition(this._itemBg.x + this._itemBg.width / 2 - skinTxtEffectBM.width / 2, this._itemBg.y + 400 - skinTxtEffectBM.height / 2);
                skinTxtEffect.blendMode = egret.BlendMode.ADD;
                this.addChild(skinTxtEffect);
                skinTxtEffect.playWithTime(-1);
                skinTxtEffect.addTouchTap(() => {
                    ViewController.getInstance().openView(ViewConst.POPUP.ACCOMMONWIFEPOPUPVIEW, { wifeId: wifeCfg.id });
                    // ViewController.getInstance().openView(ViewConst.POPUP.ACCOMMONSERVANTPOPUPVIEW, { servantId: "1050" });
                }, this);


                let skinTxt = BaseBitmap.create("acgiftreturnview_common_skintxt");
                skinTxt.anchorOffsetX = skinTxt.width / 2;
                skinTxt.anchorOffsetY = skinTxt.height / 2;
                skinTxt.setPosition(this._itemBg.x + this._itemBg.width / 2, this._itemBg.y + 400);
                this.addChild(skinTxt);
                egret.Tween.get(skinTxt, { loop: true }).to({ scaleX: 1.05, scaleY: 1.05 }, 400).to({ scaleX: 1, scaleY: 1 }, 400);

                let skinTxteffect = BaseBitmap.create("acgiftreturnview_common_skintxt");
                skinTxteffect.anchorOffsetX = skinTxteffect.width / 2;
                skinTxteffect.anchorOffsetY = skinTxteffect.height / 2;
                skinTxteffect.setPosition(skinTxt.x, skinTxt.y);
                this.addChild(skinTxteffect);
                skinTxteffect.blendMode = egret.BlendMode.ADD;
                skinTxteffect.alpha = 0;
                egret.Tween.get(skinTxteffect, { loop: true }).to({ alpha: 0.7, scaleX: 1.05, scaleY: 1.05 }, 400).to({ alpha: 0, scaleX: 1, scaleY: 1 }, 400);


            }
            else if (rewardVo.type == 16) {
                let wifeSkinCfg = Config.WifeskinCfg.getWifeCfgById(rewardVo.id);
                let wifeCfg = Config.WifeCfg.getWifeCfgById(wifeSkinCfg.wifeId);

                let wifeName = ComponentManager.getTextField(wifeCfg.name, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
                wifeName.setPosition(this._itemBg.x + this._itemBg.width / 2 - wifeName.width / 2, this._itemBg.y + 13);
                this.addChild(wifeName);

                let wifeSkinName = ComponentManager.getTextField(wifeSkinCfg.name, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WARN_GREEN2);
                wifeSkinName.setPosition(this._itemBg.x + this._itemBg.width / 2 - wifeSkinName.width / 2, this._itemBg.y + 38);
                this.addChild(wifeSkinName);

                let mask = BaseLoadBitmap.create("tailor_skinMask");
                mask.width = 155;
                mask.height = 358;
                let container = new BaseDisplayObjectContainer();
                container.addChild(mask);
                this.addChild(container);
                container.setPosition(this._itemBg.x + this._itemBg.width / 2 - container.width / 2, this._itemBg.y + this._itemBg.height / 2 - container.height / 2 + 9);

                let wifeSkinImgSclae = 0.54;
                let wifeSkinImg = BaseLoadBitmap.create("wife_skin_" + wifeSkinCfg.id);
                wifeSkinImg.width = 640;
                wifeSkinImg.height = 840;
                wifeSkinImg.setScale(wifeSkinImgSclae);
                wifeSkinImg.mask = mask;
                wifeSkinImg.setPosition(this._itemBg.x + this._itemBg.width / 2 - wifeSkinImg.width / 2 * wifeSkinImgSclae, container.y + 10);
                this.addChild(wifeSkinImg);

                let skinTxtEffect = ComponentManager.getCustomMovieClip("acwealthcarpview_skineffect", 10, 70);
                let skinTxtEffectBM = BaseBitmap.create("acwealthcarpview_skineffect1");
                skinTxtEffect.setPosition(this._itemBg.x + this._itemBg.width / 2 - skinTxtEffectBM.width / 2, this._itemBg.y + 400 - skinTxtEffectBM.height / 2);
                skinTxtEffect.blendMode = egret.BlendMode.ADD;
                this.addChild(skinTxtEffect);
                skinTxtEffect.playWithTime(-1);
                skinTxtEffect.addTouchTap(() => {
                    let topMsg = LanguageManager.getlocal("acGiftReturnItemWifeSkinTopMsg-" + this.code);
                    ViewController.getInstance().openView(ViewConst.POPUP.ACCOMMONWIFESKINREWARDPOPUPVIEW, { skinId: wifeSkinCfg.id, topMsg: topMsg });
                }, this);

                let skinTxt = BaseBitmap.create("acgiftreturnview_common_skintxt");
                skinTxt.anchorOffsetX = skinTxt.width / 2;
                skinTxt.anchorOffsetY = skinTxt.height / 2;
                skinTxt.setPosition(this._itemBg.x + this._itemBg.width / 2, this._itemBg.y + 400);
                this.addChild(skinTxt);
                egret.Tween.get(skinTxt, { loop: true }).to({ scaleX: 1.05, scaleY: 1.05 }, 400).to({ scaleX: 1, scaleY: 1 }, 400);

                let skinTxteffect = BaseBitmap.create("acgiftreturnview_common_skintxt");
                skinTxteffect.anchorOffsetX = skinTxteffect.width / 2;
                skinTxteffect.anchorOffsetY = skinTxteffect.height / 2;
                skinTxteffect.setPosition(skinTxt.x, skinTxt.y);
                this.addChild(skinTxteffect);
                skinTxteffect.blendMode = egret.BlendMode.ADD;
                skinTxteffect.alpha = 0;
                egret.Tween.get(skinTxteffect, { loop: true }).to({ alpha: 0.7, scaleX: 1.05, scaleY: 1.05 }, 400).to({ alpha: 0, scaleX: 1, scaleY: 1 }, 400);

            }
            else if (rewardVo.type == 19) {
                let servantSkinCfg = Config.ServantskinCfg.getServantSkinItemById(rewardVo.id);
                let servantCfg = Config.ServantCfg.getServantItemById(servantSkinCfg.servantId);

                let servantName = ComponentManager.getTextField(servantCfg.name, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
                servantName.setPosition(this._itemBg.x + this._itemBg.width / 2 - servantName.width / 2, this._itemBg.y + 13);
                this.addChild(servantName);

                let servantSkinName = ComponentManager.getTextField(servantSkinCfg.name, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WARN_GREEN2);
                servantSkinName.setPosition(this._itemBg.x + this._itemBg.width / 2 - servantSkinName.width / 2, this._itemBg.y + 38);
                this.addChild(servantSkinName);

                let mask = BaseLoadBitmap.create("tailor_skinMask");
                mask.width = 155;
                mask.height = 358;
                let container = new BaseDisplayObjectContainer();
                container.addChild(mask);
                this.addChild(container);
                container.setPosition(this._itemBg.x + this._itemBg.width / 2 - container.width / 2, this._itemBg.y + this._itemBg.height / 2 - container.height / 2 + 9);

                let servantSkinImgSclae = 0.9;
                let servantSkinImg = BaseLoadBitmap.create("skin_full_" + servantSkinCfg.id);
                servantSkinImg.width = 405;
                servantSkinImg.height = 467;
                servantSkinImg.setScale(servantSkinImgSclae);
                servantSkinImg.mask = mask;
                servantSkinImg.setPosition(this._itemBg.x + this._itemBg.width / 2 - servantSkinImg.width / 2 * servantSkinImgSclae, container.y + 10);
                this.addChild(servantSkinImg);

                let skinTxtEffect = ComponentManager.getCustomMovieClip("acwealthcarpview_skineffect", 10, 70);
                let skinTxtEffectBM = BaseBitmap.create("acwealthcarpview_skineffect1");
                skinTxtEffect.setPosition(this._itemBg.x + this._itemBg.width / 2 - skinTxtEffectBM.width / 2, this._itemBg.y + 400 - skinTxtEffectBM.height / 2);
                skinTxtEffect.blendMode = egret.BlendMode.ADD;
                this.addChild(skinTxtEffect);
                skinTxtEffect.playWithTime(-1);
                skinTxtEffect.addTouchTap(() => {
                    let topMsg = LanguageManager.getlocal("acGiftReturnItemServantSkinTopMsg-" + this.code);
                    ViewController.getInstance().openView(ViewConst.POPUP.ACCOMMONSERVANTSKINPOPUPVIEW, { aid: this.aid, code: this.code, skin: servantSkinCfg.id, topMsg: topMsg });
                }, this);

                let skinTxt = BaseBitmap.create("acgiftreturnview_common_skintxt");
                skinTxt.anchorOffsetX = skinTxt.width / 2;
                skinTxt.anchorOffsetY = skinTxt.height / 2;
                skinTxt.setPosition(this._itemBg.x + this._itemBg.width / 2, this._itemBg.y + 400);
                this.addChild(skinTxt);
                egret.Tween.get(skinTxt, { loop: true }).to({ scaleX: 1.05, scaleY: 1.05 }, 400).to({ scaleX: 1, scaleY: 1 }, 400);

                let skinTxteffect = BaseBitmap.create("acgiftreturnview_common_skintxt");
                skinTxteffect.anchorOffsetX = skinTxteffect.width / 2;
                skinTxteffect.anchorOffsetY = skinTxteffect.height / 2;
                skinTxteffect.setPosition(skinTxt.x, skinTxt.y);
                this.addChild(skinTxteffect);
                skinTxteffect.blendMode = egret.BlendMode.ADD;
                skinTxteffect.alpha = 0;
                egret.Tween.get(skinTxteffect, { loop: true }).to({ alpha: 0.7, scaleX: 1.05, scaleY: 1.05 }, 400).to({ alpha: 0, scaleX: 1, scaleY: 1 }, 400);

            }
            else if (rewardVo.type == 8) {
                let servantCfg = Config.ServantCfg.getServantItemById(rewardVo.id);

                let servantName = ComponentManager.getTextField(servantCfg.name, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
                servantName.setPosition(this._itemBg.x + this._itemBg.width / 2 - servantName.width / 2, this._itemBg.y + 36 - servantName.height / 2);
                this.addChild(servantName);

                let mask = BaseLoadBitmap.create("tailor_skinMask");
                mask.width = 155;
                mask.height = 358;
                let container = new BaseDisplayObjectContainer();
                container.addChild(mask);
                this.addChild(container);
                container.setPosition(this._itemBg.x + this._itemBg.width / 2 - container.width / 2, this._itemBg.y + this._itemBg.height / 2 - container.height / 2 + 9);

                let servantSkinImgSclae = 0.9;
                let servantSkinImg = BaseLoadBitmap.create("servant_full_" + servantCfg.id);
                servantSkinImg.width = 405;
                servantSkinImg.height = 467;
                servantSkinImg.setScale(servantSkinImgSclae);
                servantSkinImg.mask = mask;
                servantSkinImg.setPosition(this._itemBg.x + this._itemBg.width / 2 - servantSkinImg.width / 2 * servantSkinImgSclae, container.y + 10);
                this.addChild(servantSkinImg);

                let skinTxtEffect = ComponentManager.getCustomMovieClip("acwealthcarpview_skineffect", 10, 70);
                let skinTxtEffectBM = BaseBitmap.create("acwealthcarpview_skineffect1");
                skinTxtEffect.setPosition(this._itemBg.x + this._itemBg.width / 2 - skinTxtEffectBM.width / 2, this._itemBg.y + 400 - skinTxtEffectBM.height / 2);
                skinTxtEffect.blendMode = egret.BlendMode.ADD;
                this.addChild(skinTxtEffect);
                skinTxtEffect.playWithTime(-1);
                skinTxtEffect.addTouchTap(() => {
                    ViewController.getInstance().openView(ViewConst.POPUP.ACCOMMONSERVANTPOPUPVIEW, { servantId: servantCfg.id });
                }, this);

                let skinTxt = BaseBitmap.create("acgiftreturnview_common_skintxt");
                skinTxt.anchorOffsetX = skinTxt.width / 2;
                skinTxt.anchorOffsetY = skinTxt.height / 2;
                skinTxt.setPosition(this._itemBg.x + this._itemBg.width / 2, this._itemBg.y + 400);
                this.addChild(skinTxt);
                egret.Tween.get(skinTxt, { loop: true }).to({ scaleX: 1.05, scaleY: 1.05 }, 400).to({ scaleX: 1, scaleY: 1 }, 400);

                let skinTxteffect = BaseBitmap.create("acgiftreturnview_common_skintxt");
                skinTxteffect.anchorOffsetX = skinTxteffect.width / 2;
                skinTxteffect.anchorOffsetY = skinTxteffect.height / 2;
                skinTxteffect.setPosition(skinTxt.x, skinTxt.y);
                this.addChild(skinTxteffect);
                skinTxteffect.blendMode = egret.BlendMode.ADD;
                skinTxteffect.alpha = 0;
                egret.Tween.get(skinTxteffect, { loop: true }).to({ alpha: 0.7, scaleX: 1.05, scaleY: 1.05 }, 400).to({ alpha: 0, scaleX: 1, scaleY: 1 }, 400);
            }
            else if (rewardVo.type == 11) {
                let titleCfg = Config.TitleCfg.getTitleCfgById(rewardVo.id);
                if (titleCfg.isTitle == 2) {
                    let itemName = ComponentManager.getTextField(titleCfg.name, TextFieldConst.FONTSIZE_CONTENT_SMALL, rewardVo.nameColor);
                    itemName.setPosition(this._itemBg.x + this._itemBg.width / 2 - itemName.width / 2, this._itemBg.y + 36 - itemName.height / 2);
                    this.addChild(itemName);

                    let itemScale = 1.5;
                    let item = BaseLoadBitmap.create("itemicon" + rewardVo.id);
                    item.width = 100;
                    item.height = 100;
                    item.setScale(itemScale);
                    item.setPosition(this._itemBg.x + this._itemBg.width / 2 - item.width / 2 * itemScale, this._itemBg.y + this._itemBg.height / 2 - item.height / 2 * itemScale);
                    this.addChild(item);


                    let skinTxtEffect = ComponentManager.getCustomMovieClip("acwealthcarpview_skineffect", 10, 70);
                    let skinTxtEffectBM = BaseBitmap.create("acwealthcarpview_skineffect1");
                    skinTxtEffect.setPosition(this._itemBg.x + this._itemBg.width / 2 - skinTxtEffectBM.width / 2, this._itemBg.y + 400 - skinTxtEffectBM.height / 2);
                    skinTxtEffect.blendMode = egret.BlendMode.ADD;
                    this.addChild(skinTxtEffect);
                    skinTxtEffect.playWithTime(-1);
                    skinTxtEffect.addTouchTap(() => {
                        let topMsg = LanguageManager.getlocal("acGiftReturnItemTitleTopMsg-" + this.code);
                        ViewController.getInstance().openView(ViewConst.POPUP.ACCOMMONTITLEPOPUPVIEW, { titleId: titleCfg.id, topMsg: topMsg });
                    }, this);

                    let skinTxt = BaseBitmap.create("acgiftreturnview_common_skintxt");
                    skinTxt.anchorOffsetX = skinTxt.width / 2;
                    skinTxt.anchorOffsetY = skinTxt.height / 2;
                    skinTxt.setPosition(this._itemBg.x + this._itemBg.width / 2, this._itemBg.y + 400);
                    this.addChild(skinTxt);
                    egret.Tween.get(skinTxt, { loop: true }).to({ scaleX: 1.05, scaleY: 1.05 }, 400).to({ scaleX: 1, scaleY: 1 }, 400);

                    let skinTxteffect = BaseBitmap.create("acgiftreturnview_common_skintxt");
                    skinTxteffect.anchorOffsetX = skinTxteffect.width / 2;
                    skinTxteffect.anchorOffsetY = skinTxteffect.height / 2;
                    skinTxteffect.setPosition(skinTxt.x, skinTxt.y);
                    this.addChild(skinTxteffect);
                    skinTxteffect.blendMode = egret.BlendMode.ADD;
                    skinTxteffect.alpha = 0;
                    egret.Tween.get(skinTxteffect, { loop: true }).to({ alpha: 0.7, scaleX: 1.05, scaleY: 1.05 }, 400).to({ alpha: 0, scaleX: 1, scaleY: 1 }, 400);

                    // item.addTouchTap((event: egret.TouchEvent, item: RewardItemVo) => {
                    //     ViewController.getInstance().openView(ViewConst.POPUP.ITEMINFOPOPUPVIEW, item);
                    // }, GameData, [rewardVo]);
                }
                else {

                    let itemName = ComponentManager.getTextField(rewardVo.name, TextFieldConst.FONTSIZE_CONTENT_SMALL, rewardVo.nameColor);
                    itemName.setPosition(this._itemBg.x + this._itemBg.width / 2 - itemName.width / 2, this._itemBg.y + 36 - itemName.height / 2);
                    this.addChild(itemName);

                    let item = BaseLoadBitmap.create("itemicon" + rewardVo.id);
                    item.width = 100;
                    item.height = 100;
                    item.setPosition(this._itemBg.x + this._itemBg.width / 2 - item.width / 2, this._itemBg.y + this._itemBg.height / 2 - item.height / 2);
                    this.addChild(item);

                    item.addTouchTap((event: egret.TouchEvent, item: RewardItemVo) => {
                        ViewController.getInstance().openView(ViewConst.POPUP.ITEMINFOPOPUPVIEW, item);
                    }, GameData, [rewardVo]);
                }
            }
            else {

                let itemName = ComponentManager.getTextField(rewardVo.name, TextFieldConst.FONTSIZE_CONTENT_SMALL, rewardVo.nameColor);
                itemName.setPosition(this._itemBg.x + this._itemBg.width / 2 - itemName.width / 2, this._itemBg.y + 36 - itemName.height / 2);
                this.addChild(itemName);

                let item = BaseLoadBitmap.create("itemicon" + rewardVo.id);
                item.width = 100;
                item.height = 100;
                item.setPosition(this._itemBg.x + this._itemBg.width / 2 - item.width / 2, this._itemBg.y + this._itemBg.height / 2 - item.height / 2);
                this.addChild(item);

                item.addTouchTap((event: egret.TouchEvent, item: RewardItemVo) => {
                    ViewController.getInstance().openView(ViewConst.POPUP.ITEMINFOPOPUPVIEW, item);
                }, GameData, [rewardVo]);
            }


        }
        else {
            let rewardVo = GameData.formatRewardItem(this._itemCfg.item)[0];

            let itemName = ComponentManager.getTextField(rewardVo.name, TextFieldConst.FONTSIZE_CONTENT_SMALL, rewardVo.nameColor);
            itemName.setPosition(this._itemBg.x + this._itemBg.width / 2 - itemName.width / 2, this._itemBg.y + 36 - itemName.height / 2);
            this.addChild(itemName);

            // let item = BaseLoadBitmap.create("itemicon" + rewardVo.id);
            // item.width = 100;
            // item.height = 100;
            // item.setPosition(this._itemBg.x + this._itemBg.width / 2 - item.width / 2, this._itemBg.y + this._itemBg.height / 2 - item.height / 2);
            // this.addChild(item);

            // item.addTouchTap((event: egret.TouchEvent, item: RewardItemVo) => {
            //     ViewController.getInstance().openView(ViewConst.POPUP.ITEMINFOPOPUPVIEW, item);
            // }, GameData, [rewardVo]);

            let itemContainer = GameData.getItemIcon(rewardVo);
            itemContainer.setPosition(this._itemBg.x + this._itemBg.width / 2 - itemContainer.width / 2, this._itemBg.y + this._itemBg.height / 2 - itemContainer.height / 2);
            this.addChild(itemContainer);
        }

        let itemIcon = BaseLoadBitmap.create("itemicon" + cfg.getItemVo().id, null, {
            callback: () => {
                if (!this._itemCfg)
                {
                    return;
                }
                let num = GameData.formatRewardItem(this._itemCfg.needItem)[0].num;
                this._claimBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "", () => {
                    let v = <AcGiftReturnVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
                    let rv = GameData.formatRewardItem(this._itemCfg.needItem)[0];
                    let bv = GameData.formatRewardItem(this._itemCfg.item)[0];
                    // if (this._itemCfg.itemExchange)
                    // {
                    //     bv = GameData.formatRewardItem(this._itemCfg.itemExchange)[0];
                    // }
                    if ((!v.isStart)) {
                        App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
                        return;
                    }
                    let msg = LanguageManager.getlocal("acGiftReturnItemTipMsg-" + this.code, [String(rv.num), rv.name, bv.name]);
                    let title = "itemUseConstPopupViewTitle";
                    ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW, {
                        msg: msg, title: title, needCancel: true, confirmTxt: "acGiftReturnItemGoBuy-" + this.code, handler: this, callback: () => {
                            let itemNum = Api.itemVoApi.getItemNumInfoVoById(cfg.getItemVo().id);
                            if (itemNum < rv.num) {
                                App.CommonUtil.showTip(LanguageManager.getlocal("acGiftReturnItemNotBuy-" + this.code));
                                return;
                            }
                            NetManager.request(NetRequestConst.REQUEST_ACTIVITY_GIFTRETURNEXCHANGE, { activeId: v.aidAndCode, rkey: this._itemCfg.id });
                        }
                    });


                }, this);
                this._claimBtn.setPosition(this._itemBg.x + this._itemBg.width / 2 - this._claimBtn.width / 2, this._itemBg.y + this._itemBg.height + 25 - this._claimBtn.height / 2);
                this.addChild(this._claimBtn);
                this._claimBtn.setText("X" + String(num), false);
                this._claimBtn.addTextIcon("itemicon" + cfg.getItemVo().id);

                this._claimBM = BaseBitmap.create("acgiftreturnview_common_own");
                this._claimBM.setPosition(this._itemBg.x + this._itemBg.width / 2 - this._claimBM.width / 2, this._itemBg.y + this._itemBg.height + 25 - this._claimBM.height / 2);
                this.addChild(this._claimBM);
                this.refreashView();
            }, callbackThisObj: this, callbackParams: null
        })
    }

    public refreashView() {
        let cfg = <Config.AcCfg.GiftReturnCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        let vo = <AcGiftReturnVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);

        if (!this._itemCfg)
        {
            return;
        }
        //按钮显示相关
        if (this._itemCfg.logic) {
            let rewardVoList = GameData.formatRewardItem(this._itemCfg.logic);
            let rewardVo: RewardItemVo = null;
            let rewardVo2: RewardItemVo = null;
            for (let i = 0; i < rewardVoList.length; i++) {
                if (rewardVoList[i].type != 6) {
                    rewardVo = rewardVoList[i];
                }
                else {
                    rewardVo2 = rewardVoList[i];
                }
            }
            if (rewardVo.type == 10) {
                let wifeCfg = Config.WifeCfg.getWifeCfgById(rewardVo.id);
                if (Api.wifeVoApi.getWifeInfoVoById(wifeCfg.id)) {
                    this._claimBtn.setVisible(false);
                    this._claimBM.setVisible(true);
                }
                else {
                    this._claimBtn.setVisible(true);
                    this._claimBM.setVisible(false);
                }
            }
            else if (rewardVo.type == 16) {
                let wifeSkinCfg = Config.WifeskinCfg.getWifeCfgById(rewardVo.id);
                let wifeCfg = Config.WifeCfg.getWifeCfgById(wifeSkinCfg.wifeId);
                if (Api.wifeSkinVoApi.isOwnSkinOfSkinId(wifeSkinCfg.id)) {
                    this._claimBtn.setVisible(false);
                    this._claimBM.setVisible(true);
                }
                else {
                    this._claimBtn.setVisible(true);
                    this._claimBM.setVisible(false);
                }
            }
            else if (rewardVo.type == 19) {
                let servantSkinCfg = Config.ServantskinCfg.getServantSkinItemById(rewardVo.id);
                let servantCfg = Config.ServantCfg.getServantItemById(servantSkinCfg.servantId);
                if ((Api.servantVoApi.isOwnSkinOfSkinId(servantSkinCfg.id)) || (rewardVo2 && Api.itemVoApi.getItemInfoVoById(rewardVo2.id))) {
                    this._claimBtn.setVisible(false);
                    this._claimBM.setVisible(true);
                }
                else {
                    this._claimBtn.setVisible(true);
                    this._claimBM.setVisible(false);
                }
            }
            else if (rewardVo.type == 8) {
                let servantCfg = Config.ServantCfg.getServantItemById(rewardVo.id);
                if (Api.servantVoApi.getServantObj(servantCfg.id)) {
                    this._claimBtn.setVisible(false);
                    this._claimBM.setVisible(true);
                }
                else {
                    this._claimBtn.setVisible(true);
                    this._claimBM.setVisible(false);
                }
            }
            else if (rewardVo.type == 11) {
                let titleCfg = Config.TitleCfg.getTitleCfgById(rewardVo.id);
                // if (titleCfg.isTitle == 2) {
                if (Api.itemVoApi.getItemInfoVoById(Number(titleCfg.id))) {
                    this._claimBtn.setVisible(false);
                    this._claimBM.setVisible(true);
                }
                else {
                    this._claimBtn.setVisible(true);
                    this._claimBM.setVisible(false);
                }
                // }
                // else {
                //     let rewardVo = GameData.formatRewardItem(this._itemCfg.item)[0];
                //     this._claimBtn.setVisible(true);
                //     this._claimBM.setVisible(false);
                // }
            }
        }
        else {
            this._claimBtn.setVisible(true);
            this._claimBM.setVisible(false);
        }
    }



    protected getUiCode(): string {
        return this.code;
    }

    public dispose() {
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreashView, this);
        this.aid = null;
        this.code = null;
        this._itemCfg = null;
        this._itemBg = null;
        this._claimBtn = null;
        this._claimBM = null;
        super.dispose();
    }

}