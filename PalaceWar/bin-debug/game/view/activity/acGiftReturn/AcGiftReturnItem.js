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
  * 好礼相送 活动   目前只做了 红颜， 红颜皮肤， 门客皮肤，
  * @author 张朝阳
  * date 2019/7/2
  * @class AcGiftReturnItem
  */
var AcGiftReturnItem = (function (_super) {
    __extends(AcGiftReturnItem, _super);
    function AcGiftReturnItem() {
        var _this = _super.call(this) || this;
        _this.aid = null;
        _this.code = null;
        _this._itemCfg = null;
        _this._itemBg = null;
        _this._claimBtn = null;
        _this._claimBM = null;
        return _this;
    }
    AcGiftReturnItem.prototype.init = function (itemCfg, aid, code) {
        var _this = this;
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreashView, this);
        this.aid = aid;
        this.code = code;
        this._itemCfg = itemCfg;
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(aid, code);
        var vo = Api.acVoApi.getActivityVoByAidAndCode(aid, code);
        this.width = 179;
        this.height = 530;
        this._itemBg = BaseLoadBitmap.create("acgiftreturnview_itembg-" + this.getUiCode());
        this._itemBg.width = 173;
        this._itemBg.height = 480;
        this.addChild(this._itemBg);
        // 显示
        if (this._itemCfg.logic) {
            var rewardVoList = GameData.formatRewardItem(this._itemCfg.logic);
            var rewardVo = null;
            for (var i = 0; i < rewardVoList.length; i++) {
                if (rewardVoList[i].type != 6) {
                    rewardVo = rewardVoList[i];
                    break;
                }
            }
            if (rewardVo.type == 10) {
                var wifeCfg_1 = Config.WifeCfg.getWifeCfgById(rewardVo.id);
                var wifeName = ComponentManager.getTextField(wifeCfg_1.name, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
                wifeName.setPosition(this._itemBg.x + this._itemBg.width / 2 - wifeName.width / 2, this._itemBg.y + 36 - wifeName.height / 2);
                this.addChild(wifeName);
                var mask = BaseLoadBitmap.create("tailor_skinMask");
                mask.width = 155;
                mask.height = 358;
                var container = new BaseDisplayObjectContainer();
                container.addChild(mask);
                this.addChild(container);
                container.setPosition(this._itemBg.x + this._itemBg.width / 2 - container.width / 2, this._itemBg.y + this._itemBg.height / 2 - container.height / 2 + 9);
                var wifeImgSclae = 0.54;
                var wifeImg = BaseLoadBitmap.create("wife_full_" + wifeCfg_1.id);
                wifeImg.width = 640;
                wifeImg.height = 840;
                wifeImg.setScale(wifeImgSclae);
                wifeImg.mask = mask;
                wifeImg.setPosition(this._itemBg.x + this._itemBg.width / 2 - wifeImg.width / 2 * wifeImgSclae, container.y + 10);
                this.addChild(wifeImg);
                var skinTxtEffect = ComponentManager.getCustomMovieClip("acwealthcarpview_skineffect", 10, 70);
                var skinTxtEffectBM = BaseBitmap.create("acwealthcarpview_skineffect1");
                skinTxtEffect.setPosition(this._itemBg.x + this._itemBg.width / 2 - skinTxtEffectBM.width / 2, this._itemBg.y + 400 - skinTxtEffectBM.height / 2);
                skinTxtEffect.blendMode = egret.BlendMode.ADD;
                this.addChild(skinTxtEffect);
                skinTxtEffect.playWithTime(-1);
                skinTxtEffect.addTouchTap(function () {
                    ViewController.getInstance().openView(ViewConst.POPUP.ACCOMMONWIFEPOPUPVIEW, { wifeId: wifeCfg_1.id });
                    // ViewController.getInstance().openView(ViewConst.POPUP.ACCOMMONSERVANTPOPUPVIEW, { servantId: "1050" });
                }, this);
                var skinTxt = BaseBitmap.create("acgiftreturnview_common_skintxt");
                skinTxt.anchorOffsetX = skinTxt.width / 2;
                skinTxt.anchorOffsetY = skinTxt.height / 2;
                skinTxt.setPosition(this._itemBg.x + this._itemBg.width / 2, this._itemBg.y + 400);
                this.addChild(skinTxt);
                egret.Tween.get(skinTxt, { loop: true }).to({ scaleX: 1.05, scaleY: 1.05 }, 400).to({ scaleX: 1, scaleY: 1 }, 400);
                var skinTxteffect = BaseBitmap.create("acgiftreturnview_common_skintxt");
                skinTxteffect.anchorOffsetX = skinTxteffect.width / 2;
                skinTxteffect.anchorOffsetY = skinTxteffect.height / 2;
                skinTxteffect.setPosition(skinTxt.x, skinTxt.y);
                this.addChild(skinTxteffect);
                skinTxteffect.blendMode = egret.BlendMode.ADD;
                skinTxteffect.alpha = 0;
                egret.Tween.get(skinTxteffect, { loop: true }).to({ alpha: 0.7, scaleX: 1.05, scaleY: 1.05 }, 400).to({ alpha: 0, scaleX: 1, scaleY: 1 }, 400);
            }
            else if (rewardVo.type == 16) {
                var wifeSkinCfg_1 = Config.WifeskinCfg.getWifeCfgById(rewardVo.id);
                var wifeCfg = Config.WifeCfg.getWifeCfgById(wifeSkinCfg_1.wifeId);
                var wifeName = ComponentManager.getTextField(wifeCfg.name, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
                wifeName.setPosition(this._itemBg.x + this._itemBg.width / 2 - wifeName.width / 2, this._itemBg.y + 13);
                this.addChild(wifeName);
                var wifeSkinName = ComponentManager.getTextField(wifeSkinCfg_1.name, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WARN_GREEN2);
                wifeSkinName.setPosition(this._itemBg.x + this._itemBg.width / 2 - wifeSkinName.width / 2, this._itemBg.y + 38);
                this.addChild(wifeSkinName);
                var mask = BaseLoadBitmap.create("tailor_skinMask");
                mask.width = 155;
                mask.height = 358;
                var container = new BaseDisplayObjectContainer();
                container.addChild(mask);
                this.addChild(container);
                container.setPosition(this._itemBg.x + this._itemBg.width / 2 - container.width / 2, this._itemBg.y + this._itemBg.height / 2 - container.height / 2 + 9);
                var wifeSkinImgSclae = 0.54;
                var wifeSkinImg = BaseLoadBitmap.create("wife_skin_" + wifeSkinCfg_1.id);
                wifeSkinImg.width = 640;
                wifeSkinImg.height = 840;
                wifeSkinImg.setScale(wifeSkinImgSclae);
                wifeSkinImg.mask = mask;
                wifeSkinImg.setPosition(this._itemBg.x + this._itemBg.width / 2 - wifeSkinImg.width / 2 * wifeSkinImgSclae, container.y + 10);
                this.addChild(wifeSkinImg);
                var skinTxtEffect = ComponentManager.getCustomMovieClip("acwealthcarpview_skineffect", 10, 70);
                var skinTxtEffectBM = BaseBitmap.create("acwealthcarpview_skineffect1");
                skinTxtEffect.setPosition(this._itemBg.x + this._itemBg.width / 2 - skinTxtEffectBM.width / 2, this._itemBg.y + 400 - skinTxtEffectBM.height / 2);
                skinTxtEffect.blendMode = egret.BlendMode.ADD;
                this.addChild(skinTxtEffect);
                skinTxtEffect.playWithTime(-1);
                skinTxtEffect.addTouchTap(function () {
                    var topMsg = LanguageManager.getlocal("acGiftReturnItemWifeSkinTopMsg-" + _this.code);
                    ViewController.getInstance().openView(ViewConst.POPUP.ACCOMMONWIFESKINREWARDPOPUPVIEW, { skinId: wifeSkinCfg_1.id, topMsg: topMsg });
                }, this);
                var skinTxt = BaseBitmap.create("acgiftreturnview_common_skintxt");
                skinTxt.anchorOffsetX = skinTxt.width / 2;
                skinTxt.anchorOffsetY = skinTxt.height / 2;
                skinTxt.setPosition(this._itemBg.x + this._itemBg.width / 2, this._itemBg.y + 400);
                this.addChild(skinTxt);
                egret.Tween.get(skinTxt, { loop: true }).to({ scaleX: 1.05, scaleY: 1.05 }, 400).to({ scaleX: 1, scaleY: 1 }, 400);
                var skinTxteffect = BaseBitmap.create("acgiftreturnview_common_skintxt");
                skinTxteffect.anchorOffsetX = skinTxteffect.width / 2;
                skinTxteffect.anchorOffsetY = skinTxteffect.height / 2;
                skinTxteffect.setPosition(skinTxt.x, skinTxt.y);
                this.addChild(skinTxteffect);
                skinTxteffect.blendMode = egret.BlendMode.ADD;
                skinTxteffect.alpha = 0;
                egret.Tween.get(skinTxteffect, { loop: true }).to({ alpha: 0.7, scaleX: 1.05, scaleY: 1.05 }, 400).to({ alpha: 0, scaleX: 1, scaleY: 1 }, 400);
            }
            else if (rewardVo.type == 19) {
                var servantSkinCfg_1 = Config.ServantskinCfg.getServantSkinItemById(rewardVo.id);
                var servantCfg = Config.ServantCfg.getServantItemById(servantSkinCfg_1.servantId);
                var servantName = ComponentManager.getTextField(servantCfg.name, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
                servantName.setPosition(this._itemBg.x + this._itemBg.width / 2 - servantName.width / 2, this._itemBg.y + 13);
                this.addChild(servantName);
                var servantSkinName = ComponentManager.getTextField(servantSkinCfg_1.name, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WARN_GREEN2);
                servantSkinName.setPosition(this._itemBg.x + this._itemBg.width / 2 - servantSkinName.width / 2, this._itemBg.y + 38);
                this.addChild(servantSkinName);
                var mask = BaseLoadBitmap.create("tailor_skinMask");
                mask.width = 155;
                mask.height = 358;
                var container = new BaseDisplayObjectContainer();
                container.addChild(mask);
                this.addChild(container);
                container.setPosition(this._itemBg.x + this._itemBg.width / 2 - container.width / 2, this._itemBg.y + this._itemBg.height / 2 - container.height / 2 + 9);
                var servantSkinImgSclae = 0.9;
                var servantSkinImg = BaseLoadBitmap.create("skin_full_" + servantSkinCfg_1.id);
                servantSkinImg.width = 405;
                servantSkinImg.height = 467;
                servantSkinImg.setScale(servantSkinImgSclae);
                servantSkinImg.mask = mask;
                servantSkinImg.setPosition(this._itemBg.x + this._itemBg.width / 2 - servantSkinImg.width / 2 * servantSkinImgSclae, container.y + 10);
                this.addChild(servantSkinImg);
                var skinTxtEffect = ComponentManager.getCustomMovieClip("acwealthcarpview_skineffect", 10, 70);
                var skinTxtEffectBM = BaseBitmap.create("acwealthcarpview_skineffect1");
                skinTxtEffect.setPosition(this._itemBg.x + this._itemBg.width / 2 - skinTxtEffectBM.width / 2, this._itemBg.y + 400 - skinTxtEffectBM.height / 2);
                skinTxtEffect.blendMode = egret.BlendMode.ADD;
                this.addChild(skinTxtEffect);
                skinTxtEffect.playWithTime(-1);
                skinTxtEffect.addTouchTap(function () {
                    var topMsg = LanguageManager.getlocal("acGiftReturnItemServantSkinTopMsg-" + _this.code);
                    ViewController.getInstance().openView(ViewConst.POPUP.ACCOMMONSERVANTSKINPOPUPVIEW, { aid: _this.aid, code: _this.code, skin: servantSkinCfg_1.id, topMsg: topMsg });
                }, this);
                var skinTxt = BaseBitmap.create("acgiftreturnview_common_skintxt");
                skinTxt.anchorOffsetX = skinTxt.width / 2;
                skinTxt.anchorOffsetY = skinTxt.height / 2;
                skinTxt.setPosition(this._itemBg.x + this._itemBg.width / 2, this._itemBg.y + 400);
                this.addChild(skinTxt);
                egret.Tween.get(skinTxt, { loop: true }).to({ scaleX: 1.05, scaleY: 1.05 }, 400).to({ scaleX: 1, scaleY: 1 }, 400);
                var skinTxteffect = BaseBitmap.create("acgiftreturnview_common_skintxt");
                skinTxteffect.anchorOffsetX = skinTxteffect.width / 2;
                skinTxteffect.anchorOffsetY = skinTxteffect.height / 2;
                skinTxteffect.setPosition(skinTxt.x, skinTxt.y);
                this.addChild(skinTxteffect);
                skinTxteffect.blendMode = egret.BlendMode.ADD;
                skinTxteffect.alpha = 0;
                egret.Tween.get(skinTxteffect, { loop: true }).to({ alpha: 0.7, scaleX: 1.05, scaleY: 1.05 }, 400).to({ alpha: 0, scaleX: 1, scaleY: 1 }, 400);
            }
            else if (rewardVo.type == 8) {
                var servantCfg_1 = Config.ServantCfg.getServantItemById(rewardVo.id);
                var servantName = ComponentManager.getTextField(servantCfg_1.name, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
                servantName.setPosition(this._itemBg.x + this._itemBg.width / 2 - servantName.width / 2, this._itemBg.y + 36 - servantName.height / 2);
                this.addChild(servantName);
                var mask = BaseLoadBitmap.create("tailor_skinMask");
                mask.width = 155;
                mask.height = 358;
                var container = new BaseDisplayObjectContainer();
                container.addChild(mask);
                this.addChild(container);
                container.setPosition(this._itemBg.x + this._itemBg.width / 2 - container.width / 2, this._itemBg.y + this._itemBg.height / 2 - container.height / 2 + 9);
                var servantSkinImgSclae = 0.9;
                var servantSkinImg = BaseLoadBitmap.create("servant_full_" + servantCfg_1.id);
                servantSkinImg.width = 405;
                servantSkinImg.height = 467;
                servantSkinImg.setScale(servantSkinImgSclae);
                servantSkinImg.mask = mask;
                servantSkinImg.setPosition(this._itemBg.x + this._itemBg.width / 2 - servantSkinImg.width / 2 * servantSkinImgSclae, container.y + 10);
                this.addChild(servantSkinImg);
                var skinTxtEffect = ComponentManager.getCustomMovieClip("acwealthcarpview_skineffect", 10, 70);
                var skinTxtEffectBM = BaseBitmap.create("acwealthcarpview_skineffect1");
                skinTxtEffect.setPosition(this._itemBg.x + this._itemBg.width / 2 - skinTxtEffectBM.width / 2, this._itemBg.y + 400 - skinTxtEffectBM.height / 2);
                skinTxtEffect.blendMode = egret.BlendMode.ADD;
                this.addChild(skinTxtEffect);
                skinTxtEffect.playWithTime(-1);
                skinTxtEffect.addTouchTap(function () {
                    ViewController.getInstance().openView(ViewConst.POPUP.ACCOMMONSERVANTPOPUPVIEW, { servantId: servantCfg_1.id });
                }, this);
                var skinTxt = BaseBitmap.create("acgiftreturnview_common_skintxt");
                skinTxt.anchorOffsetX = skinTxt.width / 2;
                skinTxt.anchorOffsetY = skinTxt.height / 2;
                skinTxt.setPosition(this._itemBg.x + this._itemBg.width / 2, this._itemBg.y + 400);
                this.addChild(skinTxt);
                egret.Tween.get(skinTxt, { loop: true }).to({ scaleX: 1.05, scaleY: 1.05 }, 400).to({ scaleX: 1, scaleY: 1 }, 400);
                var skinTxteffect = BaseBitmap.create("acgiftreturnview_common_skintxt");
                skinTxteffect.anchorOffsetX = skinTxteffect.width / 2;
                skinTxteffect.anchorOffsetY = skinTxteffect.height / 2;
                skinTxteffect.setPosition(skinTxt.x, skinTxt.y);
                this.addChild(skinTxteffect);
                skinTxteffect.blendMode = egret.BlendMode.ADD;
                skinTxteffect.alpha = 0;
                egret.Tween.get(skinTxteffect, { loop: true }).to({ alpha: 0.7, scaleX: 1.05, scaleY: 1.05 }, 400).to({ alpha: 0, scaleX: 1, scaleY: 1 }, 400);
            }
            else if (rewardVo.type == 11) {
                var titleCfg_1 = Config.TitleCfg.getTitleCfgById(rewardVo.id);
                if (titleCfg_1.isTitle == 2) {
                    var itemName = ComponentManager.getTextField(titleCfg_1.name, TextFieldConst.FONTSIZE_CONTENT_SMALL, rewardVo.nameColor);
                    itemName.setPosition(this._itemBg.x + this._itemBg.width / 2 - itemName.width / 2, this._itemBg.y + 36 - itemName.height / 2);
                    this.addChild(itemName);
                    var itemScale = 1.5;
                    var item = BaseLoadBitmap.create("itemicon" + rewardVo.id);
                    item.width = 100;
                    item.height = 100;
                    item.setScale(itemScale);
                    item.setPosition(this._itemBg.x + this._itemBg.width / 2 - item.width / 2 * itemScale, this._itemBg.y + this._itemBg.height / 2 - item.height / 2 * itemScale);
                    this.addChild(item);
                    var skinTxtEffect = ComponentManager.getCustomMovieClip("acwealthcarpview_skineffect", 10, 70);
                    var skinTxtEffectBM = BaseBitmap.create("acwealthcarpview_skineffect1");
                    skinTxtEffect.setPosition(this._itemBg.x + this._itemBg.width / 2 - skinTxtEffectBM.width / 2, this._itemBg.y + 400 - skinTxtEffectBM.height / 2);
                    skinTxtEffect.blendMode = egret.BlendMode.ADD;
                    this.addChild(skinTxtEffect);
                    skinTxtEffect.playWithTime(-1);
                    skinTxtEffect.addTouchTap(function () {
                        var topMsg = LanguageManager.getlocal("acGiftReturnItemTitleTopMsg-" + _this.code);
                        ViewController.getInstance().openView(ViewConst.POPUP.ACCOMMONTITLEPOPUPVIEW, { titleId: titleCfg_1.id, topMsg: topMsg });
                    }, this);
                    var skinTxt = BaseBitmap.create("acgiftreturnview_common_skintxt");
                    skinTxt.anchorOffsetX = skinTxt.width / 2;
                    skinTxt.anchorOffsetY = skinTxt.height / 2;
                    skinTxt.setPosition(this._itemBg.x + this._itemBg.width / 2, this._itemBg.y + 400);
                    this.addChild(skinTxt);
                    egret.Tween.get(skinTxt, { loop: true }).to({ scaleX: 1.05, scaleY: 1.05 }, 400).to({ scaleX: 1, scaleY: 1 }, 400);
                    var skinTxteffect = BaseBitmap.create("acgiftreturnview_common_skintxt");
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
                    var itemName = ComponentManager.getTextField(rewardVo.name, TextFieldConst.FONTSIZE_CONTENT_SMALL, rewardVo.nameColor);
                    itemName.setPosition(this._itemBg.x + this._itemBg.width / 2 - itemName.width / 2, this._itemBg.y + 36 - itemName.height / 2);
                    this.addChild(itemName);
                    var item = BaseLoadBitmap.create("itemicon" + rewardVo.id);
                    item.width = 100;
                    item.height = 100;
                    item.setPosition(this._itemBg.x + this._itemBg.width / 2 - item.width / 2, this._itemBg.y + this._itemBg.height / 2 - item.height / 2);
                    this.addChild(item);
                    item.addTouchTap(function (event, item) {
                        ViewController.getInstance().openView(ViewConst.POPUP.ITEMINFOPOPUPVIEW, item);
                    }, GameData, [rewardVo]);
                }
            }
            else {
                var itemName = ComponentManager.getTextField(rewardVo.name, TextFieldConst.FONTSIZE_CONTENT_SMALL, rewardVo.nameColor);
                itemName.setPosition(this._itemBg.x + this._itemBg.width / 2 - itemName.width / 2, this._itemBg.y + 36 - itemName.height / 2);
                this.addChild(itemName);
                var item = BaseLoadBitmap.create("itemicon" + rewardVo.id);
                item.width = 100;
                item.height = 100;
                item.setPosition(this._itemBg.x + this._itemBg.width / 2 - item.width / 2, this._itemBg.y + this._itemBg.height / 2 - item.height / 2);
                this.addChild(item);
                item.addTouchTap(function (event, item) {
                    ViewController.getInstance().openView(ViewConst.POPUP.ITEMINFOPOPUPVIEW, item);
                }, GameData, [rewardVo]);
            }
        }
        else {
            var rewardVo = GameData.formatRewardItem(this._itemCfg.item)[0];
            var itemName = ComponentManager.getTextField(rewardVo.name, TextFieldConst.FONTSIZE_CONTENT_SMALL, rewardVo.nameColor);
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
            var itemContainer = GameData.getItemIcon(rewardVo);
            itemContainer.setPosition(this._itemBg.x + this._itemBg.width / 2 - itemContainer.width / 2, this._itemBg.y + this._itemBg.height / 2 - itemContainer.height / 2);
            this.addChild(itemContainer);
        }
        var itemIcon = BaseLoadBitmap.create("itemicon" + cfg.getItemVo().id, null, {
            callback: function () {
                if (!_this._itemCfg) {
                    return;
                }
                var num = GameData.formatRewardItem(_this._itemCfg.needItem)[0].num;
                _this._claimBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "", function () {
                    var v = Api.acVoApi.getActivityVoByAidAndCode(_this.aid, _this.code);
                    var rv = GameData.formatRewardItem(_this._itemCfg.needItem)[0];
                    var bv = GameData.formatRewardItem(_this._itemCfg.item)[0];
                    // if (this._itemCfg.itemExchange)
                    // {
                    //     bv = GameData.formatRewardItem(this._itemCfg.itemExchange)[0];
                    // }
                    if ((!v.isStart)) {
                        App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
                        return;
                    }
                    var msg = LanguageManager.getlocal("acGiftReturnItemTipMsg-" + _this.code, [String(rv.num), rv.name, bv.name]);
                    var title = "itemUseConstPopupViewTitle";
                    ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW, {
                        msg: msg, title: title, needCancel: true, confirmTxt: "acGiftReturnItemGoBuy-" + _this.code, handler: _this, callback: function () {
                            var itemNum = Api.itemVoApi.getItemNumInfoVoById(cfg.getItemVo().id);
                            if (itemNum < rv.num) {
                                App.CommonUtil.showTip(LanguageManager.getlocal("acGiftReturnItemNotBuy-" + _this.code));
                                return;
                            }
                            NetManager.request(NetRequestConst.REQUEST_ACTIVITY_GIFTRETURNEXCHANGE, { activeId: v.aidAndCode, rkey: _this._itemCfg.id });
                        }
                    });
                }, _this);
                _this._claimBtn.setPosition(_this._itemBg.x + _this._itemBg.width / 2 - _this._claimBtn.width / 2, _this._itemBg.y + _this._itemBg.height + 25 - _this._claimBtn.height / 2);
                _this.addChild(_this._claimBtn);
                _this._claimBtn.setText("X" + String(num), false);
                _this._claimBtn.addTextIcon("itemicon" + cfg.getItemVo().id);
                _this._claimBM = BaseBitmap.create("acgiftreturnview_common_own");
                _this._claimBM.setPosition(_this._itemBg.x + _this._itemBg.width / 2 - _this._claimBM.width / 2, _this._itemBg.y + _this._itemBg.height + 25 - _this._claimBM.height / 2);
                _this.addChild(_this._claimBM);
                _this.refreashView();
            }, callbackThisObj: this, callbackParams: null
        });
    };
    AcGiftReturnItem.prototype.refreashView = function () {
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        if (!this._itemCfg) {
            return;
        }
        //按钮显示相关
        if (this._itemCfg.logic) {
            var rewardVoList = GameData.formatRewardItem(this._itemCfg.logic);
            var rewardVo = null;
            var rewardVo2 = null;
            for (var i = 0; i < rewardVoList.length; i++) {
                if (rewardVoList[i].type != 6) {
                    rewardVo = rewardVoList[i];
                }
                else {
                    rewardVo2 = rewardVoList[i];
                }
            }
            if (rewardVo.type == 10) {
                var wifeCfg = Config.WifeCfg.getWifeCfgById(rewardVo.id);
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
                var wifeSkinCfg = Config.WifeskinCfg.getWifeCfgById(rewardVo.id);
                var wifeCfg = Config.WifeCfg.getWifeCfgById(wifeSkinCfg.wifeId);
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
                var servantSkinCfg = Config.ServantskinCfg.getServantSkinItemById(rewardVo.id);
                var servantCfg = Config.ServantCfg.getServantItemById(servantSkinCfg.servantId);
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
                var servantCfg = Config.ServantCfg.getServantItemById(rewardVo.id);
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
                var titleCfg = Config.TitleCfg.getTitleCfgById(rewardVo.id);
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
    };
    AcGiftReturnItem.prototype.getUiCode = function () {
        return this.code;
    };
    AcGiftReturnItem.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreashView, this);
        this.aid = null;
        this.code = null;
        this._itemCfg = null;
        this._itemBg = null;
        this._claimBtn = null;
        this._claimBM = null;
        _super.prototype.dispose.call(this);
    };
    return AcGiftReturnItem;
}(BaseDisplayObjectContainer));
__reflect(AcGiftReturnItem.prototype, "AcGiftReturnItem");
//# sourceMappingURL=AcGiftReturnItem.js.map