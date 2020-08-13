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
  * 诸葛亮传活动view
  * @author 张朝阳
  * date 2019/5/15
  * @class AcLiangBiographyView
  */
var AcLiangBiographyView = (function (_super) {
    __extends(AcLiangBiographyView, _super);
    function AcLiangBiographyView() {
        var _this = _super.call(this) || this;
        _this._countDownTime = null;
        _this._countDownTimeBg = null;
        _this._painting1 = null;
        _this._painting2 = null;
        _this._scrollView = null;
        _this._svContainer = null;
        _this._paintingMask = null;
        _this._boat = null;
        _this._chargeBtn = null;
        _this._lampholder = null;
        _this._lampholderLight = null;
        _this._flameseffect = null;
        _this._vortexeffect = null;
        _this._reviewTF = null;
        _this._scrollInfoList = [];
        _this._beginContainer = null;
        _this._beginMask = null;
        _this._beginReview = null;
        _this._beginServant = null;
        _this._isBeginPlay = false;
        _this._beginLeftYun = null;
        _this._beginRightYun = null;
        _this._whiteEffect = null;
        _this._orangeEffect = null;
        _this._cloudEffect = null;
        /**灯座 闪 */
        _this._lampholderbrightEffect = null;
        /**灯座 单图 */
        _this._lampholderEffect = null;
        /**灯座亮 */
        _this._lampholderLightEffect = null;
        _this._rewards = null;
        _this._isPlayAni = false;
        _this._leftArrow = null;
        _this._rightArrow = null;
        _this._oldProgressValue = 0;
        _this._isFree = false;
        _this._redDot = null;
        _this._scheduleTF = null;
        _this._scheduleLine = null;
        _this._useNum = 0;
        return _this;
    }
    AcLiangBiographyView.prototype.initView = function () {
        var _this = this;
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        var key = Api.playerVoApi.getPlayerID() + String(vo.st);
        var storage = LocalStorageManager.get(key);
        if (!storage) {
            ViewController.getInstance().openView(ViewConst.BASE.ROOKIEVIEW, {
                idx: "acLiangBiography_1-" + this.getUiCode(), f: function () {
                    _this.initBeginView();
                }, o: this
            });
            LocalStorageManager.set(key, vo.aidAndCode);
        }
        else {
            this.initBeginView();
        }
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY_USESEVENSTARLAMP, this.useLampHandle, this);
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY_GETLIANGREWARDS, this.refreshProcessInfo, this);
        var bg = BaseLoadBitmap.create("acliangbiographyview_bg-" + this.getUiCode());
        bg.width = 640;
        bg.height = 1136;
        bg.setPosition(0, GameConfig.stageHeigth - bg.height);
        this.addChildToContainer(bg);
        var dragonBone = "acliangbiography_dragon";
        var dragonBoneName = "acliangbiography_dragon_ske";
        if (this.getUiCode() == "3") {
            dragonBone = "acliangbiography_phoenix";
            dragonBoneName = "acliangbiography_phoenix_ske";
        }
        if (this.getUiCode() == "5") {
            dragonBone = "acliangbiography_horse";
            dragonBoneName = "acliangbiography_horse_ske";
        }
        if (this.getUiCode() == "7") {
            dragonBone = "acliangbiography_tiger";
            dragonBoneName = "acliangbiography_tiger_ske";
        }
        var servantBone = "servant_full2_" + cfg.show;
        var servantBoneName = "servant_full2_" + cfg.show + "_ske";
        if (App.CommonUtil.check_dragon() && ResourceManager.hasRes(dragonBoneName) && ResourceManager.hasRes(servantBoneName)) {
            var dragonDB = App.DragonBonesUtil.getLoadDragonBones(dragonBone);
            this.addChildToContainer(dragonDB);
            var servantDB = App.DragonBonesUtil.getLoadDragonBones(servantBone);
            servantDB.setPosition(bg.x + bg.width / 2, bg.y + bg.height - 170);
            servantDB.setScale(1.3);
            if (this.getUiCode() == "7") {
                servantDB.x = bg.x + bg.width / 2 - 40;
            }
            dragonDB.setPosition(servantDB.x, servantDB.y + 200);
            this.addChildToContainer(servantDB);
            var atmospherebg = BaseLoadBitmap.create("acliangbiographyview_atmospherebg");
            atmospherebg.width = 640;
            atmospherebg.height = 733;
            atmospherebg.blendMode = egret.BlendMode.ADD;
            atmospherebg.setPosition(GameConfig.stageWidth / 2 - atmospherebg.width / 2, GameConfig.stageHeigth - atmospherebg.height);
            this.addChildToContainer(atmospherebg);
            if (this.getUiCode() == "7") {
                atmospherebg.visible = false;
            }
            if (this.getUiCode() != '5') {
                var fireDB = App.DragonBonesUtil.getLoadDragonBones("servantskinauraman_bg_1");
                fireDB.setPosition(bg.x + bg.width / 2, bg.y + bg.height - 220);
                this.addChildToContainer(fireDB);
            }
            //郭嘉传合作方要求不显示天马
            if (this.getUiCode() == '5') {
                dragonDB.visible = false;
            }
        }
        else {
            var dragonBM = BaseLoadBitmap.create("acliangbiographyview_dragoneffect");
            dragonBM.width = 586;
            dragonBM.height = 897;
            dragonBM.setPosition(bg.x + bg.width / 2 - dragonBM.width / 2, bg.y + bg.height - dragonBM.height);
            this.addChildToContainer(dragonBM);
            var servantBM = BaseLoadBitmap.create("skin_full_" + cfg.show);
            servantBM.width = 405;
            servantBM.height = 467;
            servantBM.setScale(1.3);
            servantBM.setPosition(bg.x + bg.width / 2 - servantBM.width * 1.3 / 2, bg.y + bg.height - servantBM.height * 1.3 - 170);
            dragonBM.setPosition(bg.x + bg.width / 2 - dragonBM.width / 2, servantBM.y + servantBM.height * 1.3 / 2 - dragonBM.height / 2);
            this.addChildToContainer(servantBM);
            if (this.getUiCode() == "3") {
                dragonBM.setload("acliangbiographyview_phoenixeffect");
                dragonBM.width = 640;
                dragonBM.height = 836;
                dragonBM.setPosition(0, 206);
            }
            if (this.getUiCode() == "5") {
                dragonBM.setload("acliangbiographyview_pegasuseffect");
                dragonBM.width = 640;
                dragonBM.height = 836;
                dragonBM.setPosition(0, 206);
            }
            if (this.getUiCode() == "7") {
                dragonBM.setload("acliangbiographyview_tigereffect");
                dragonBM.width = 640;
                dragonBM.height = 572;
                dragonBM.setPosition(0, 206);
            }
            var atmospherebg = BaseLoadBitmap.create("acliangbiographyview_atmospherebg");
            atmospherebg.width = 640;
            atmospherebg.height = 733;
            atmospherebg.blendMode = egret.BlendMode.ADD;
            atmospherebg.setPosition(GameConfig.stageWidth / 2 - atmospherebg.width / 2, GameConfig.stageHeigth - atmospherebg.height);
            this.addChildToContainer(atmospherebg);
            if (this.getUiCode() == "7") {
                atmospherebg.visible = false;
            }
            var firebg = BaseLoadBitmap.create("acliangbiographyview_fire");
            firebg.width = 629;
            firebg.height = 708;
            firebg.setPosition(GameConfig.stageWidth / 2 - firebg.width / 2, GameConfig.stageHeigth - firebg.height - 170);
            this.addChildToContainer(firebg);
            //郭嘉传合作方要求不显示天马
            if (this.getUiCode() == '5') {
                dragonBM.visible = false;
            }
        }
        var titleBg = BaseLoadBitmap.create("acliangbiographyview_titlebg-" + this.getUiCode());
        titleBg.width = 640;
        titleBg.height = 92;
        titleBg.setPosition(0, 0);
        var acDescBg = BaseBitmap.create("acliangbiographyview_common_acbg");
        acDescBg.width = 640;
        acDescBg.height = 155;
        acDescBg.setPosition(titleBg.x, titleBg.y + titleBg.height - 7);
        this.addChildToContainer(acDescBg);
        this.addChildToContainer(titleBg);
        var acTimeDesc = ComponentManager.getTextField(LanguageManager.getlocal("acLiangBiographyView_acTime-" + this.code, [vo.acTimeAndHour]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
        acTimeDesc.setPosition(titleBg.x + 20, acDescBg.y + 15);
        this.addChildToContainer(acTimeDesc);
        var descTF = ComponentManager.getTextField(LanguageManager.getlocal("acLiangBiographyView_acDesc-" + this.code, [String(cfg.addValue)]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        descTF.width = 600;
        descTF.lineSpacing = 3;
        descTF.setPosition(acTimeDesc.x, acTimeDesc.y + acTimeDesc.height + 10);
        this.addChildToContainer(descTF);
        this._countDownTimeBg = BaseBitmap.create("public_9_bg61");
        this._countDownTimeBg.y = acDescBg.y + acDescBg.height - this._countDownTimeBg.height / 2;
        this.addChildToContainer(this._countDownTimeBg);
        this._countDownTime = ComponentManager.getTextField(LanguageManager.getlocal("acLiangBiographyView_acCountTime-" + this.code, [vo.acCountDown]), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_WHITE);
        this._countDownTimeBg.width = 60 + this._countDownTime.width;
        this._countDownTimeBg.x = GameConfig.stageWidth - this._countDownTimeBg.width - 15;
        this._countDownTime.setPosition(this._countDownTimeBg.x + this._countDownTimeBg.width / 2 - this._countDownTime.width / 2, this._countDownTimeBg.y + this._countDownTimeBg.height / 2 - this._countDownTime.height / 2);
        this.addChildToContainer(this._countDownTime);
        this._chargeBtn = ComponentManager.getButton("acliangbiographyview_chargebtn-" + this.getUiCode(), null, function () {
            if (_this._isPlayAni) {
                return;
            }
            ViewController.getInstance().openView(ViewConst.POPUP.ACLIANGBIOGRAPHYCHARGEPOPUPVIEW, { aid: _this.aid, code: _this.code });
        }, this);
        this._chargeBtn.setPosition(acDescBg.x + 15, acDescBg.y + acDescBg.height + 22);
        this.addChildToContainer(this._chargeBtn);
        var rewardbtn = ComponentManager.getButton("acliangbiographyview_rewardbtn-" + this.getUiCode(), null, function () {
            if (_this._isPlayAni) {
                return;
            }
            ViewController.getInstance().openView(ViewConst.POPUP.ACLIANGBIOGRAPHYREWARDPOPUPVIEW, { aid: _this.aid, code: _this.code });
        }, this);
        rewardbtn.setPosition(this._chargeBtn.x, this._chargeBtn.y + this._chargeBtn.height + 15);
        this.addChildToContainer(rewardbtn);
        var buttomBg = BaseLoadBitmap.create("acliangbiographyview_buttombg-" + this.getUiCode());
        buttomBg.width = 640;
        buttomBg.height = 309;
        buttomBg.setPosition(0, GameConfig.stageHeigth - buttomBg.height);
        this.addChildToContainer(buttomBg);
        this._scheduleTF = ComponentManager.getTextField(LanguageManager.getlocal("acLiangBiographyViewSchedule-" + this.code, ["20"]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._scheduleTF.setPosition(buttomBg.x + 17, buttomBg.y + 100);
        this.addChildToContainer(this._scheduleTF);
        this._svContainer = new BaseDisplayObjectContainer();
        this._svContainer.width = 1280;
        this._svContainer.height = 190;
        var rect = new egret.Rectangle(0, 0, 640, 198);
        this._scrollView = ComponentManager.getScrollView(this._svContainer, rect);
        this._scrollView.setPosition(buttomBg.x, buttomBg.y + buttomBg.height - this._scrollView.height);
        this._scrollView.bounces = false;
        this.addChildToContainer(this._scrollView);
        this._scrollView.bindMoveCompleteCallback(function () {
            if (_this._scrollView.scrollLeft <= 2) {
                _this._leftArrow.setVisible(false);
                _this._rightArrow.setVisible(true);
            }
            else if (_this._scrollView.scrollLeft >= 638) {
                _this._leftArrow.setVisible(true);
                _this._rightArrow.setVisible(false);
            }
            else {
                _this._leftArrow.setVisible(true);
                _this._rightArrow.setVisible(true);
            }
        }, this);
        this._painting1 = BaseLoadBitmap.create("acliangbiographyview_painting1-" + this.getUiCode());
        this._painting1.width = 640;
        this._painting1.height = 198;
        this._painting1.setPosition(0, 0);
        this._svContainer.addChild(this._painting1);
        this._painting2 = BaseLoadBitmap.create("acliangbiographyview_painting2-" + this.getUiCode());
        this._painting2.width = 640;
        this._painting2.height = 198;
        this._painting2.setPosition(640, 0);
        this._svContainer.addChild(this._painting2);
        this._boat = BaseBitmap.create("acliangbiographyview_boat-" + this.getUiCode());
        this._boat.setPosition(23, this._svContainer.height / 2 + 70 - this._boat.height);
        this._svContainer.addChild(this._boat);
        this._paintingMask = BaseLoadBitmap.create("acliangbiographyview_paintingmask"); //46
        this._paintingMask.width = 1234;
        this._paintingMask.height = 140;
        // this._paintingMask.anchorOffsetX = this._paintingMask.width;
        // this._paintingMask.alpha = 0.6;
        this._paintingMask.setPosition(23, this._svContainer.height / 2 - this._paintingMask.height / 2 + 1);
        this._svContainer.addChild(this._paintingMask);
        this._paintingMask.mask = new egret.Rectangle(0, 0, 1234, 140);
        this._scheduleLine = BaseBitmap.create("acliangbiographyview_common_jindu");
        this._scheduleLine.setPosition(this._paintingMask.mask.x - this._scheduleLine.width / 2 + 23, this._paintingMask.y + this._paintingMask.height / 2 - this._scheduleLine.height / 2);
        this._svContainer.addChild(this._scheduleLine);
        this._scheduleLine.setVisible(false);
        this._leftArrow = ComponentManager.getButton("palace_arrow_left", null, function () {
            _this._scrollView.setScrollLeft(0);
        }, this);
        this._leftArrow.setPosition(0, GameConfig.stageHeigth - 95 - this._leftArrow.height / 2);
        this.addChildToContainer(this._leftArrow);
        this._leftArrow.setVisible(false);
        this._rightArrow = ComponentManager.getButton("palace_arrow_right", null, function () {
            _this._scrollView.setScrollLeft(640);
        }, this);
        this._rightArrow.setPosition(GameConfig.stageWidth - this._rightArrow.width, this._leftArrow.y);
        this.addChildToContainer(this._rightArrow);
        this._rightArrow.setVisible(true);
        var skinTxtEffect = ComponentManager.getCustomMovieClip("acwealthcarpview_skineffect", 10, 70);
        var skinTxtEffectBM = BaseBitmap.create("acwealthcarpview_skineffect1");
        skinTxtEffect.setPosition(bg.x + bg.width / 2 - skinTxtEffectBM.width / 2, bg.y + bg.height - 208 - skinTxtEffectBM.height / 2);
        skinTxtEffect.blendMode = egret.BlendMode.ADD;
        this.addChildToContainer(skinTxtEffect);
        skinTxtEffect.playWithTime(-1);
        var skinTxt = BaseBitmap.create("acwealthcarpview_servantskintxt");
        skinTxt.anchorOffsetX = skinTxt.width / 2;
        skinTxt.anchorOffsetY = skinTxt.height / 2;
        skinTxt.setPosition(bg.x + bg.width / 2, bg.y + bg.height - 208);
        this.addChildToContainer(skinTxt);
        egret.Tween.get(skinTxt, { loop: true }).to({ scaleX: 1.05, scaleY: 1.05 }, 400).to({ scaleX: 1, scaleY: 1 }, 400);
        skinTxt.addTouchTap(function () {
            ViewController.getInstance().openView(ViewConst.POPUP.ACLIANGBIOGRAPHYSERVANTSKINPOPUPVIEW, { aid: _this.aid, code: _this.code });
        }, this);
        var skinTxteffect = BaseBitmap.create("acwealthcarpview_servantskintxt");
        skinTxteffect.anchorOffsetX = skinTxteffect.width / 2;
        skinTxteffect.anchorOffsetY = skinTxteffect.height / 2;
        skinTxteffect.setPosition(bg.x + bg.width / 2, bg.y + bg.height - 208);
        this.addChildToContainer(skinTxteffect);
        skinTxteffect.blendMode = egret.BlendMode.ADD;
        skinTxteffect.alpha = 0;
        egret.Tween.get(skinTxteffect, { loop: true }).to({ alpha: 0.7, scaleX: 1.05, scaleY: 1.05 }, 400).to({ alpha: 0, scaleX: 1, scaleY: 1 }, 400);
        this.initProcessInfo();
        this.initEffect();
        this.tick();
        this.refreshView();
        this.refreshScheduleTF();
        var v = vo.getNum() / cfg.maxProcessValue();
        this.refreshProcessView(v);
    };
    /**特效情况 */
    AcLiangBiographyView.prototype.initEffect = function () {
        var _this = this;
        this._whiteEffect = BaseBitmap.create("acliangbiographyview_effect_white");
        this._whiteEffect.anchorOffsetX = this._whiteEffect.width / 2;
        this._whiteEffect.anchorOffsetY = this._whiteEffect.height / 2;
        this._whiteEffect.setPosition(GameConfig.stageWidth / 2, GameConfig.stageHeigth / 2);
        this.addChildToContainer(this._whiteEffect);
        this._whiteEffect.alpha = 0;
        this._orangeEffect = BaseBitmap.create("acliangbiographyview_effect_orange");
        this._orangeEffect.anchorOffsetX = this._orangeEffect.width / 2;
        this._orangeEffect.anchorOffsetY = this._orangeEffect.height / 2;
        this._orangeEffect.setPosition(GameConfig.stageWidth / 2, GameConfig.stageHeigth / 2);
        this.addChildToContainer(this._orangeEffect);
        this._orangeEffect.alpha = 0;
        this._lampholder = BaseBitmap.create("acliangbiographyview_lampholder-" + this.getUiCode());
        this._lampholder.anchorOffsetX = this._lampholder.width / 2;
        this._lampholder.anchorOffsetY = this._lampholder.height / 2;
        this._lampholder.setPosition(GameConfig.stageWidth - this._lampholder.width / 2 - 40, GameConfig.stageHeigth - this._lampholder.height / 2 - 220);
        if (this.getUiCode() == "3" || this.getUiCode() == "5" || this.getUiCode() == "7") {
            this._lampholder.setPosition(GameConfig.stageWidth - this._lampholder.width / 2 - 40, GameConfig.stageHeigth - this._lampholder.height / 2 - 200);
        }
        this._lampholder.addTouchTap(function () {
            if (_this._isPlayAni) {
                return;
            }
            var cfg = Config.AcCfg.getCfgByActivityIdAndCode(_this.aid, _this.code);
            var vo = Api.acVoApi.getActivityVoByAidAndCode(_this.aid, _this.code);
            if ((!vo.checkIsInEndShowTime()) && vo.isStart) {
                if (vo.isFree()) {
                    _this._isPlayAni = true;
                    _this._isFree = true;
                    _this._oldProgressValue = vo.getNum() / cfg.maxProcessValue();
                    NetManager.request(NetRequestConst.REQUEST_ACTIVITY_USESEVENSTARLAMP, { activeId: vo.aidAndCode, isFree: 1 });
                }
                else {
                    if (vo.getItemValue() > 0) {
                        _this._isPlayAni = true;
                        _this._isFree = false;
                        _this._oldProgressValue = vo.getNum() / cfg.maxProcessValue();
                        NetManager.request(NetRequestConst.REQUEST_ACTIVITY_USESEVENSTARLAMP, { activeId: vo.aidAndCode, isFree: 0 });
                    }
                    else {
                        var msg = LanguageManager.getlocal("acLiangBiographyViewTipMsg-" + _this.code);
                        var title = "itemUseConstPopupViewTitle";
                        ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW, {
                            msg: msg, title: title, needCancel: true, confirmTxt: "acLiangBiographyViewGoCharge-" + _this.code, handler: _this, callback: function () {
                                ViewController.getInstance().openView(ViewConst.POPUP.ACLIANGBIOGRAPHYCHARGEPOPUPVIEW, { aid: _this.aid, code: _this.code });
                            }
                        });
                        // App.CommonUtil.showTip(LanguageManager.getlocal("acLiangBiographyView_NoreviewTip-" + this.code));
                        return;
                    }
                }
            }
            else {
                App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
                return;
            }
        }, this);
        this._vortexeffect = ComponentManager.getCustomMovieClip("acliangbiographyeffect_vortexeffect", 18, 70);
        var vortexBM = BaseBitmap.create("acliangbiographyeffect_vortexeffect1");
        this._vortexeffect.setPosition(this._lampholder.x - vortexBM.width / 2, this._lampholder.y - vortexBM.height / 2 + 15);
        this.addChildToContainer(this._vortexeffect);
        this._vortexeffect.playWithTime(-1);
        if (this.getUiCode() == "3" || this.getUiCode() == "5" || this.getUiCode() == "7") {
            this._lampholderLight = BaseBitmap.create("acliangbiographyview_lampholder-" + this.getUiCode());
        }
        else {
            this._lampholderLight = BaseBitmap.create("acliangbiographyview_effect_lampholderlight");
        }
        this._lampholderLight.anchorOffsetX = this._lampholderLight.width / 2;
        this._lampholderLight.anchorOffsetY = this._lampholderLight.height / 2;
        this._lampholderLight.setPosition(this._lampholder.x, this._lampholder.y);
        this._lampholderLight.blendMode = egret.BlendMode.ADD;
        this.addChildToContainer(this._lampholderLight);
        this.addChildToContainer(this._lampholder);
        this._redDot = BaseBitmap.create("public_dot2");
        this._redDot.setPosition(this._lampholder.x + this._lampholder.width / 2, this._lampholder.y - this._lampholder.height / 2);
        this.addChildToContainer(this._redDot);
        var lampholderbrightEffectStr = "acliangbiographyview_effect_lampholderbright";
        if (this.getUiCode() == "3" || this.getUiCode() == "5" || this.getUiCode() == "7") {
            lampholderbrightEffectStr = "acliangbiographyview_effect_bookbright";
        }
        this._lampholderbrightEffect = BaseBitmap.create(lampholderbrightEffectStr);
        this._lampholderbrightEffect.name = '_lampholderbrightEffect';
        this._lampholderbrightEffect.anchorOffsetX = this._lampholderbrightEffect.width / 2;
        this._lampholderbrightEffect.anchorOffsetY = this._lampholderbrightEffect.height / 2;
        this._lampholderbrightEffect.setPosition(this._lampholder.x, this._lampholder.y);
        this._lampholderbrightEffect.blendMode = egret.BlendMode.ADD;
        this.addChildToContainer(this._lampholderbrightEffect);
        this._lampholderbrightEffect.alpha = 0;
        this._lampholderEffect = BaseBitmap.create("acliangbiographyview_lampholder-" + this.getUiCode());
        this._lampholderEffect.anchorOffsetX = this._lampholderEffect.width / 2;
        this._lampholderEffect.anchorOffsetY = this._lampholderEffect.height / 2;
        this._lampholderEffect.blendMode = egret.BlendMode.ADD;
        this._lampholderEffect.setPosition(this._lampholder.x, this._lampholder.y);
        this.addChildToContainer(this._lampholderEffect);
        this._lampholderEffect.alpha = 0;
        if (this.getUiCode() == "3" || this.getUiCode() == "5" || this.getUiCode() == "7") {
            this._flameseffect = ComponentManager.getCustomMovieClip("acliangbiographyeffect_bookeffect", 11, 70);
            var flameseBM = BaseBitmap.create("acliangbiographyeffect_bookeffect1");
            this._flameseffect.anchorOffsetX = flameseBM.width / 2;
            this._flameseffect.anchorOffsetY = flameseBM.height / 2;
            this._flameseffect.setPosition(this._lampholder.x, this._lampholder.y);
            this._flameseffect.blendMode = egret.BlendMode.ADD;
            this.addChildToContainer(this._flameseffect);
            this._flameseffect.playWithTime(-1);
        }
        else {
            this._flameseffect = ComponentManager.getCustomMovieClip("acliangbiographyeffect_flameseffect", 6, 70);
            var flameseBM = BaseBitmap.create("acliangbiographyeffect_flameseffect1");
            this._flameseffect.anchorOffsetX = flameseBM.width / 2;
            this._flameseffect.anchorOffsetY = flameseBM.height / 2;
            this._flameseffect.setPosition(this._lampholder.x, this._lampholder.y - this._lampholder.height / 2);
            this._flameseffect.blendMode = egret.BlendMode.ADD;
            this.addChildToContainer(this._flameseffect);
            this._flameseffect.playWithTime(-1);
        }
        var lampholderLightEffectStr = "acliangbiographyview_effect_lampholderflash";
        if (this.getUiCode() == "3" || this.getUiCode() == "5" || this.getUiCode() == "7") {
            lampholderLightEffectStr = "acliangbiographyview_effect_bookflash";
        }
        this._lampholderLightEffect = BaseBitmap.create(lampholderLightEffectStr);
        this._lampholderLightEffect.name = '_lampholderLightEffect';
        this._lampholderLightEffect.anchorOffsetX = this._lampholderLightEffect.width / 2;
        this._lampholderLightEffect.anchorOffsetY = this._lampholderLightEffect.height / 2;
        this._lampholderLightEffect.setPosition(this._lampholder.x, this._lampholder.y);
        this.addChildToContainer(this._lampholderLightEffect);
        this._lampholderLightEffect.alpha = 0;
        this._cloudEffect = ComponentManager.getCustomMovieClip("acliangbiographyeffect_cloudeffect", 10, 70);
        var cloudBM = BaseBitmap.create("acliangbiographyeffect_cloudeffect1");
        this._cloudEffect.anchorOffsetX = cloudBM.width / 2;
        this._cloudEffect.anchorOffsetY = cloudBM.height / 2;
        this._cloudEffect.setPosition(GameConfig.stageWidth / 2, GameConfig.stageHeigth / 2);
        this.addChildToContainer(this._cloudEffect);
        var review = BaseBitmap.create("acliangbiographyview_review-" + this.getUiCode());
        review.setPosition(GameConfig.stageWidth - review.width, this._lampholder.y - this._lampholder.height / 2 + 30);
        this.addChildToContainer(review);
        review.addTouchTap(function () {
            if (_this._isPlayAni) {
                return;
            }
            var cfg = Config.AcCfg.getCfgByActivityIdAndCode(_this.aid, _this.code);
            var vo = Api.acVoApi.getActivityVoByAidAndCode(_this.aid, _this.code);
            if ((!vo.checkIsInEndShowTime()) && vo.isStart) {
                if (vo.isFree()) {
                    _this._isPlayAni = true;
                    _this._isFree = true;
                    _this._oldProgressValue = vo.getNum() / cfg.maxProcessValue();
                    NetManager.request(NetRequestConst.REQUEST_ACTIVITY_USESEVENSTARLAMP, { activeId: vo.aidAndCode, isFree: 1 });
                }
                else {
                    if (vo.getItemValue() > 0) {
                        _this._isPlayAni = true;
                        _this._isFree = false;
                        _this._oldProgressValue = vo.getNum() / cfg.maxProcessValue();
                        NetManager.request(NetRequestConst.REQUEST_ACTIVITY_USESEVENSTARLAMP, { activeId: vo.aidAndCode, isFree: 0 });
                    }
                    else {
                        var msg = LanguageManager.getlocal("acLiangBiographyViewTipMsg-" + _this.code);
                        var title = "itemUseConstPopupViewTitle";
                        ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW, {
                            msg: msg, title: title, needCancel: true, confirmTxt: "acLiangBiographyViewGoCharge-" + _this.code, handler: _this, callback: function () {
                                ViewController.getInstance().openView(ViewConst.POPUP.ACLIANGBIOGRAPHYCHARGEPOPUPVIEW, { aid: _this.aid, code: _this.code });
                            }
                        });
                        // App.CommonUtil.showTip(LanguageManager.getlocal("acLiangBiographyView_NoreviewTip-" + this.code));
                        return;
                    }
                }
            }
            else {
                App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
                return;
            }
        }, this);
        this._reviewTF = ComponentManager.getTextField(LanguageManager.getlocal("acLiangBiographyView_reviewFree-" + this.code), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
        this._reviewTF.setPosition(this._lampholder.x - this._reviewTF.width / 2, review.y + review.height - 3);
        this.addChildToContainer(this._reviewTF);
    };
    AcLiangBiographyView.prototype.initProcessInfo = function () {
        var _this = this;
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        this._scrollInfoList = [];
        var maxValue = cfg.maxProcessValue();
        var maxL = 1234;
        var _loop_1 = function (i) {
            var itemcfg = cfg.liangBiographyProcessingRewardItemCfgList[i];
            var pgValue = itemcfg.reviewTime / maxValue;
            var pgbg = BaseBitmap.create("acliangbiographyview_progressbuttom-" + this_1.getUiCode());
            pgbg.setPosition(23 + maxL * pgValue - pgbg.width / 2, this_1._svContainer.height / 2 + 85 - pgbg.height / 2);
            if (i == (cfg.liangBiographyProcessingRewardItemCfgList.length - 1)) {
                pgbg.setPosition(23 + maxL * pgValue - pgbg.width, this_1._svContainer.height / 2 + 85 - pgbg.height / 2);
            }
            this_1._svContainer.addChild(pgbg);
            pgbg.addTouchTap(function () {
                var voo = Api.acVoApi.getActivityVoByAidAndCode(_this.aid, _this.code);
                if (voo.checkRewardFlag(itemcfg.id)) {
                    ViewController.getInstance().openView(ViewConst.POPUP.ACLIANGBIOGRAPHYSCROLLPOPUPVIEW, { aid: _this.aid, code: _this.code, id: itemcfg.id });
                }
                else {
                    ViewController.getInstance().openView(ViewConst.POPUP.ACLIANGBIOGRAPHYPROCESSPOPUPVIEW, { aid: _this.aid, code: _this.code, id: itemcfg.id });
                }
            }, this_1);
            var scrollTF = ComponentManager.getTextField(Math.round(pgValue * 100) + "%", TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_WHITE);
            scrollTF.setPosition(pgbg.x + 10, pgbg.y + pgbg.height / 2 - scrollTF.height / 2);
            var scroll_1 = BaseBitmap.create("acliangbiographyview_scroll1-" + this_1.getUiCode());
            scroll_1.anchorOffsetX = scroll_1.width / 2;
            scroll_1.anchorOffsetY = scroll_1.height / 2;
            scroll_1.setPosition(scrollTF.x + scrollTF.width + scroll_1.width / 2, pgbg.y + pgbg.height / 2);
            var boxLight = BaseBitmap.create("acturantable_taskbox_light");
            boxLight.anchorOffsetX = boxLight.width / 2;
            boxLight.anchorOffsetY = boxLight.height / 2;
            boxLight.setPosition(scroll_1.x, scroll_1.y);
            this_1._svContainer.addChild(boxLight);
            this_1._svContainer.addChild(scrollTF);
            this_1._svContainer.addChild(scroll_1);
            var scrollInfo = { pgbg: pgbg, scrollTF: scrollTF, scroll: scroll_1, boxLight: boxLight, itemcfg: itemcfg };
            this_1._scrollInfoList.push(scrollInfo);
        };
        var this_1 = this;
        for (var i = 0; i < cfg.liangBiographyProcessingRewardItemCfgList.length; i++) {
            _loop_1(i);
        }
        this.refreshProcessInfo();
    };
    /**云UI */
    AcLiangBiographyView.prototype.initBeginView = function () {
        var _this = this;
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        var servantSkin = Config.ServantskinCfg.getServantSkinItemById(cfg.show);
        var servantCfg = Config.ServantCfg.getServantItemById(servantSkin.servantId);
        this._beginContainer = new BaseDisplayObjectContainer();
        this.addChild(this._beginContainer);
        this._beginMask = BaseBitmap.create("public_9_viewmask");
        this._beginMask.width = GameConfig.stageWidth;
        this._beginMask.height = GameConfig.stageHeigth;
        this._beginMask.addTouchTap(function () {
            if (_this._isBeginPlay) {
                return;
            }
            _this._isBeginPlay = true;
            egret.Tween.get(_this._beginLeftYun).to({ x: _this._beginMask.x - 235 }, 700).call(function () {
                egret.Tween.removeTweens(_this._beginLeftYun);
                egret.Tween.get(_this._beginContainer).to({ alpha: 0 }, 400).call(function () {
                    egret.Tween.removeTweens(_this._beginContainer);
                    _this._beginContainer.setVisible(false);
                });
            }, _this);
            egret.Tween.get(_this._beginRightYun).to({ x: _this._beginMask.x + _this._beginMask.width + 153 }, 700).call(function () {
                egret.Tween.removeTweens(_this._beginRightYun);
            }, _this);
        }, this);
        this._beginContainer.addChild(this._beginMask);
        this._beginServant = BaseLoadBitmap.create("skin_full_" + cfg.show);
        //BaseLoadBitmap.create(servantCfg.fullIcon);
        this._beginServant.width = 405;
        this._beginServant.height = 467;
        this._beginServant.setPosition(this._beginMask.x + this._beginMask.width / 2 - this._beginServant.width / 2, this._beginMask.y + this._beginMask.height / 2 - this._beginServant.height / 2);
        this._beginContainer.addChild(this._beginServant);
        this._beginReview = BaseLoadBitmap.create("acliangbiographyview_reviewbg-" + this.getUiCode());
        this._beginReview.width = 563;
        this._beginReview.height = 181;
        this._beginReview.setPosition(this._beginServant.x + this._beginServant.width / 2 - this._beginReview.width / 2, this._beginServant.y + this._beginServant.height - 115);
        this._beginContainer.addChild(this._beginReview);
        this._beginLeftYun = BaseLoadBitmap.create("acliangbiographyview_leftyun", null, {
            callback: function () {
                _this._beginLeftYun.setPosition(_this._beginMask.x, _this._beginServant.y + _this._beginServant.height - 140);
            }, callbackThisObj: this, callbackParams: null
        });
        this._beginContainer.addChild(this._beginLeftYun);
        this._beginRightYun = BaseLoadBitmap.create("acliangbiographyview_rightyun", null, {
            callback: function () {
                _this._beginRightYun.setPosition(_this._beginMask.x + _this._beginMask.width - _this._beginRightYun.width, _this._beginServant.y + _this._beginServant.height - 180);
            }, callbackThisObj: this, callbackParams: null
        });
        this._beginContainer.addChild(this._beginRightYun);
    };
    AcLiangBiographyView.prototype.tick = function () {
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        if (vo.checkIsInEndShowTime()) {
            this._countDownTime.text = LanguageManager.getlocal("acPunishEnd");
        }
        else {
            this._countDownTime.text = LanguageManager.getlocal("acLiangBiographyView_acCountTime-" + this.code, [vo.acCountDown]);
        }
        this._countDownTimeBg.width = 60 + this._countDownTime.width;
        this._countDownTimeBg.x = GameConfig.stageWidth - this._countDownTimeBg.width - 15;
        this._countDownTime.setPosition(this._countDownTimeBg.x + this._countDownTimeBg.width / 2 - this._countDownTime.width / 2, this._countDownTimeBg.y + this._countDownTimeBg.height / 2 - this._countDownTime.height / 2);
    };
    AcLiangBiographyView.prototype.refreshView = function () {
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        if (vo.isFree()) {
            this._reviewTF.text = LanguageManager.getlocal("acLiangBiographyView_reviewFree-" + this.code);
        }
        else {
            this._reviewTF.text = LanguageManager.getlocal("acLiangBiographyView_reviewValue-" + this.code, [String(vo.getItemValue())]);
        }
        this.refreshViewLampholder();
        this._reviewTF.x = this._lampholder.x - this._reviewTF.width / 2;
        if (vo.checkRechargeRedDot()) {
            App.CommonUtil.addIconToBDOC(this._chargeBtn);
        }
        else {
            App.CommonUtil.removeIconFromBDOC(this._chargeBtn);
        }
    };
    AcLiangBiographyView.prototype.refreshScheduleTF = function () {
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        var num = vo.getNum() / cfg.maxProcessValue() >= 1 ? 1 : vo.getNum() / cfg.maxProcessValue();
        var v = Math.round(num * 100);
        this._scheduleTF.text = LanguageManager.getlocal("acLiangBiographyViewSchedule-" + this.code, [String(v)]);
    };
    AcLiangBiographyView.prototype.refreshViewLampholder = function () {
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        this._lampholder.setScale(1);
        this._lampholder.alpha = 1;
        this._lampholder.setPosition(GameConfig.stageWidth - this._lampholder.width / 2 - 40, GameConfig.stageHeigth - this._lampholder.height / 2 - 220);
        if (this.getUiCode() == "3" || this.getUiCode() == "5" || this.getUiCode() == "7") {
            this._lampholder.setPosition(GameConfig.stageWidth - this._lampholder.width / 2 - 40, GameConfig.stageHeigth - this._lampholder.height / 2 - 200);
        }
        if (vo.isFree() || vo.getItemValue() > 0) {
            this._lampholderLight.alpha = 1;
            this._flameseffect.alpha = 1;
            this._vortexeffect.alpha = 1;
            this._redDot.setVisible(true);
        }
        else {
            this._lampholderLight.alpha = 0;
            this._flameseffect.alpha = 0;
            this._vortexeffect.alpha = 0;
            this._redDot.setVisible(false);
        }
        this._lampholderLight.setScale(1);
        this._flameseffect.setScale(1);
        this._lampholderLight.setPosition(this._lampholder.x, this._lampholder.y);
        this._flameseffect.setPosition(this._lampholder.x, this._lampholder.y - this._lampholder.height / 2);
        if (this.getUiCode() == "3" || this.getUiCode() == "5" || this.getUiCode() == "7") {
            this._flameseffect.setPosition(this._lampholder.x, this._lampholder.y);
        }
    };
    AcLiangBiographyView.prototype.refreshProcessInfo = function () {
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        for (var i = 0; i < this._scrollInfoList.length; i++) {
            var scrollInfo = this._scrollInfoList[i];
            if (vo.checkRewardFlag(scrollInfo.itemcfg.id)) {
                egret.Tween.removeTweens(scrollInfo.scroll);
                egret.Tween.removeTweens(scrollInfo.boxLight);
                scrollInfo.scroll.setRes("acliangbiographyview_scroll2-" + this.getUiCode());
                scrollInfo.boxLight.setVisible(false);
            }
            else {
                if (vo.getNum() >= scrollInfo.itemcfg.reviewTime) {
                    scrollInfo.scroll.setRes("acliangbiographyview_scroll1-" + this.getUiCode());
                    scrollInfo.boxLight.setVisible(true);
                    egret.Tween.get(scrollInfo.boxLight, { loop: true }).to({ rotation: scrollInfo.boxLight.rotation + 360 }, 10000);
                    egret.Tween.get(scrollInfo.scroll, { loop: true }).to({ rotation: 10 }, 50).to({ rotation: -10 }, 100).to({ rotation: 10 }, 100).to({ rotation: 0 }, 50).wait(500);
                }
                else {
                    egret.Tween.removeTweens(scrollInfo.scroll);
                    egret.Tween.removeTweens(scrollInfo.boxLight);
                    scrollInfo.scroll.setRes("acliangbiographyview_scroll1-" + this.getUiCode());
                    scrollInfo.boxLight.setVisible(false);
                }
            }
        }
    };
    //位置动画
    AcLiangBiographyView.prototype.refreshProcessView = function (v) {
        v = v >= 1 ? 1 : v;
        var n = 1 - v;
        var s = 1234 * v;
        var rect = this._paintingMask.mask;
        rect.x = s;
        rect.width = 1234 * n;
        this._paintingMask.mask = rect;
        // this._paintingMask.mask.x = 1234 * v;
        // this._paintingMask.mask.width = 1234 * n;
        if (s >= this._boat.width) {
            this._boat.x = 23 + s - this._boat.width;
            if (this._boat.x >= 320) {
                var m = this._boat.x - 320;
                m = m >= 640 ? 640 : m;
                if (m <= 640) {
                    this._scrollView.setScrollLeft(m);
                }
            }
        }
        else {
            this._boat.x = 23;
        }
        this._scheduleLine.setPosition(this._paintingMask.mask.x - this._scheduleLine.width / 2 + 23, this._paintingMask.y + this._paintingMask.height / 2 - this._scheduleLine.height / 2);
        if (v >= 1) {
            this._scheduleLine.setVisible(false);
        }
        else {
            this._scheduleLine.setVisible(true);
        }
    };
    AcLiangBiographyView.prototype.useLampHandle = function (event) {
        if (event.data.ret) {
            this._rewards = event.data.data.data.rewards;
            this._useNum = event.data.data.data.useNum;
            this.playReviewAni();
        }
    };
    /**回顾动画 */
    AcLiangBiographyView.prototype.playReviewAni = function () {
        var _this = this;
        //白色
        this._whiteEffect.alpha = 0;
        this._whiteEffect.setScale(1);
        egret.Tween.removeTweens(this._whiteEffect);
        egret.Tween.get(this._whiteEffect).wait(670).to({ alpha: 1, scaleX: 568, scaleY: 568 }, 330).to({ alpha: 0, scaleX: 1136, scaleY: 1136 }, 330).call(function () { egret.Tween.removeTweens(_this._whiteEffect); }, this);
        //橙色
        this._orangeEffect.alpha = 0;
        this._orangeEffect.setScale(1);
        egret.Tween.removeTweens(this._orangeEffect);
        egret.Tween.get(this._orangeEffect).wait(530).to({ scaleX: 1136, scaleY: 1136 }, 200).call(function () { egret.Tween.removeTweens(_this._orangeEffect); }, this);
        //漩涡
        this._vortexeffect.alpha = 1;
        egret.Tween.removeTweens(this._vortexeffect);
        egret.Tween.get(this._vortexeffect).to({ alpha: 0 }, 130).call(function () { egret.Tween.removeTweens(_this._vortexeffect); }, this);
        //云序列帧
        this._cloudEffect.setScale(1);
        egret.Tween.removeTweens(this._cloudEffect);
        egret.Tween.get(this._cloudEffect).wait(1000).call(function () {
            _this._cloudEffect.setScale(16);
            _this._cloudEffect.playWithTime(1);
            egret.Tween.removeTweens(_this._cloudEffect);
            _this._cloudEffect.setEndCallBack(function () {
                ViewController.getInstance().openView(ViewConst.POPUP.ACLIANGBIOGRAPHYREWARDSHOWVIEW, {
                    code: _this.code,
                    aid: _this.aid,
                    useNum: _this._useNum,
                    rewards: _this._rewards, callback: function () {
                        _this.refreshView();
                        _this._isPlayAni = false;
                        _this.playBoatAni();
                    }, callobj: _this
                });
            }, _this);
        }, this);
        //灯闪
        this._lampholderbrightEffect.alpha = 1;
        egret.Tween.removeTweens(this._lampholderbrightEffect);
        egret.Tween.get(this._lampholderbrightEffect).to({ alpha: 0 }, 270).call(function () { egret.Tween.removeTweens(_this._lampholderbrightEffect); }, this);
        //灯座特效
        this._lampholderEffect.setScale(1.2);
        this._lampholderEffect.alpha = 1;
        egret.Tween.removeTweens(this._lampholderEffect);
        egret.Tween.get(this._lampholderEffect).to({ scaleX: 1, scaleY: 1 }, 130).to({ scaleX: 1.28, scaleY: 1.28, alpha: 0 }, 70).to({ scaleX: 1.56, scaleY: 1.56, alpha: 1 }, 70).to({ scaleX: 2.6, scaleY: 2.6, alpha: 0 }, 2.6).call(function () { egret.Tween.removeTweens(_this._lampholderEffect); }, this);
        //灯座
        this._lampholder.setScale(1);
        this._lampholder.alpha = 1;
        this._lampholder.setPosition(GameConfig.stageWidth - this._lampholder.width / 2 - 40, GameConfig.stageHeigth - this._lampholder.height / 2 - 220);
        egret.Tween.removeTweens(this._lampholder);
        egret.Tween.get(this._lampholder).wait(330).to({ scaleX: 6, scaleY: 6, alpha: 0, x: GameConfig.stageWidth / 2, y: GameConfig.stageHeigth / 2 }, 340).to({ scaleX: 20, scaleY: 20 }, 260).call(function () { egret.Tween.removeTweens(_this._lampholder); }, this);
        //灯光
        this._lampholderLight.setScale(1);
        this._lampholderLight.alpha = 1;
        this._lampholderLight.setPosition(this._lampholder.x, this._lampholder.y);
        egret.Tween.removeTweens(this._lampholderLight);
        egret.Tween.get(this._lampholderLight).wait(330).to({ scaleX: 6, scaleY: 6, alpha: 0, x: GameConfig.stageWidth / 2, y: GameConfig.stageHeigth / 2 }, 340).to({ scaleX: 20, scaleY: 20 }, 260).call(function () { egret.Tween.removeTweens(_this._lampholderLight); }, this);
        //火苗
        this._flameseffect.setScale(1);
        this._flameseffect.alpha = 1;
        this._flameseffect.setPosition(this._lampholder.x, this._lampholder.y - this._lampholder.height / 2);
        if (this.getUiCode() == "3" || this.getUiCode() == "5" || this.getUiCode() == "7") {
            this._flameseffect.setPosition(this._lampholder.x, this._lampholder.y);
        }
        egret.Tween.removeTweens(this._flameseffect);
        egret.Tween.get(this._flameseffect).wait(330).to({ scaleX: 6, scaleY: 6, alpha: 0, x: GameConfig.stageWidth / 2, y: GameConfig.stageHeigth / 2 - this._lampholderLight.height / 2 * 6 }, 340).to({ scaleX: 20, scaleY: 20 }, 260).call(function () { egret.Tween.removeTweens(_this._flameseffect); }, this);
        //灯座亮
        this._lampholderLightEffect.setScale(1);
        this._lampholderLightEffect.alpha = 0;
        this._lampholderLightEffect.setPosition(this._lampholder.x, this._lampholder.y);
        egret.Tween.removeTweens(this._lampholderLightEffect);
        egret.Tween.get(this._lampholderLightEffect).wait(330).to({ x: GameConfig.stageWidth / 2, y: GameConfig.stageHeigth / 2 }, 340);
        egret.Tween.get(this._lampholderLightEffect).wait(330).to({ alpha: 0.5 }, 540).to({ alpha: 0 }, 200);
        egret.Tween.get(this._lampholderLightEffect).wait(330).to({ scaleX: 20, scaleY: 20 }, 740).call(function () { egret.Tween.removeTweens(_this._lampholderLightEffect); }, this);
    };
    /**小船动画 */
    AcLiangBiographyView.prototype.playBoatAni = function () {
        var _this = this;
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        egret.Tween.removeTweens(this);
        var sumTime = 5000;
        var oldv = this._oldProgressValue;
        var v = vo.getNum() / cfg.maxProcessValue();
        if (oldv >= 1) {
            this._scheduleLine.setVisible(false);
            return;
        }
        var sum = 1234;
        var bw = this._boat.width / sum;
        v = v >= 1 ? 1 : v;
        if (v >= 1) {
            this._scheduleLine.setVisible(false);
        }
        else {
            this._scheduleLine.setVisible(true);
        }
        var boatTime = 0;
        var boatV = 0;
        if (bw >= oldv && v >= bw) {
            boatV = bw - oldv;
            boatTime = sumTime * boatV;
        }
        var offsetV = v - oldv;
        var offsetTime = sumTime * offsetV;
        var n = 1 - v;
        var ms = sum * v;
        var s = 23 + ms - this._boat.width;
        // this._scheduleLine.setVisible(true);
        egret.Tween.get(this._paintingMask.mask, {
            loop: false, onChange: function () {
                if (_this._paintingMask) {
                    _this._paintingMask.mask = _this._paintingMask.mask;
                }
                if (_this._scheduleLine) {
                    _this._scheduleLine.setPosition(_this._paintingMask.mask.x - _this._scheduleLine.width / 2 + 23, _this._paintingMask.y + _this._paintingMask.height / 2 - _this._scheduleLine.height / 2);
                }
            }, onChangeObj: this
        }).to({ x: sum * v, width: sum * n }, offsetTime).call(function () {
            if (_this._paintingMask) {
                _this._paintingMask.mask = _this._paintingMask.mask;
            }
            egret.Tween.removeTweens(_this._paintingMask.mask);
            _this.refreshProcessInfo();
            _this.refreshScheduleTF();
            if (v >= 1) {
                _this._scheduleLine.setVisible(false);
            }
            else {
                _this._scheduleLine.setVisible(true);
            }
            // this._scheduleLine.setVisible(false);
        }, this);
        if (ms >= this._boat.width) {
            egret.Tween.get(this._boat, {
                loop: false, onChange: function () {
                    if (_this._boat) {
                        if (_this._boat.x >= 320) {
                            var m = _this._boat.x - 320;
                            if (m <= 640) {
                                _this._scrollView.setScrollLeft(m);
                            }
                        }
                    }
                }, onChangeObj: this
            }).wait(boatTime).to({ x: s }, offsetTime - boatTime).call(function () {
                egret.Tween.removeTweens(_this._boat);
            }, this);
        }
    };
    AcLiangBiographyView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "acliangbiographyview_common_acbg", "acbeautyvoteview_black", "acliangbiographyview-" + this.getUiCode(), "accarnivalview_tab_green",
            "accarnivalview_tab_red", "progress5", "progress3_bg", "acliangbiographyeffect_flameseffect", "acliangbiographyeffect_vortexeffect",
            "acliangbiographyview_effect_lampholderbright", "acliangbiographyview_effect_lampholderflash", "acliangbiographyview_effect_lampholderlight",
            "acliangbiographyview_effect_orange", "acliangbiographyview_effect_white", "acwealthcarpview_servantskintxt", "acwealthcarpview_skineffect",
            "acturantable_taskbox_light", "common_box_2", "sharepopupview_closebtn", "palace_arrow_left", "palace_arrow_right", "acliangbiographyeffect_cloudeffect",
            "acliangbiographyview_common_jindu", "acliangbiographyview_effect_bookbright", "acliangbiographyview_effect_bookflash", "acliangbiographyeffect_bookeffect"
        ]);
    };
    AcLiangBiographyView.prototype.getBgName = function () {
        return null;
    };
    AcLiangBiographyView.prototype.getTitleBgName = function () {
        return null;
    };
    AcLiangBiographyView.prototype.getRuleInfo = function () {
        return "acLiangBiographyViewRuleInfo-" + this.code;
    };
    AcLiangBiographyView.prototype.getRuleInfoParam = function () {
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        return [String(cfg.addValue)];
    };
    AcLiangBiographyView.prototype.getProbablyInfo = function () {
        return "acLiangBiographyViewProbablyInfo-" + this.code;
    };
    AcLiangBiographyView.prototype.getUiCode = function () {
        if (this.code == "2") {
            return "1";
        }
        if (this.code == "4") {
            return "3";
        }
        if (this.code == "6") {
            return "5";
        }
        if (this.code == "8") {
            return "7";
        }
        return _super.prototype.getUiCode.call(this);
    };
    AcLiangBiographyView.prototype.getTitleStr = function () {
        return null;
    };
    AcLiangBiographyView.prototype.dispose = function () {
        egret.Tween.removeTweens(this._paintingMask.mask);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_USESEVENSTARLAMP, this.useLampHandle, this);
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_GETLIANGREWARDS, this.refreshProcessInfo, this);
        this._countDownTime = null;
        this._countDownTimeBg = null;
        this._painting1 = null;
        this._painting2 = null;
        this._scrollView = null;
        this._svContainer = null;
        this._paintingMask = null;
        this._boat = null;
        this._chargeBtn = null;
        this._lampholder = null;
        this._lampholderLight = null;
        this._flameseffect = null;
        this._vortexeffect = null;
        this._reviewTF = null;
        this._scrollInfoList = [];
        this._beginContainer = null;
        this._beginMask = null;
        this._beginReview = null;
        this._beginServant = null;
        this._isBeginPlay = false;
        this._beginLeftYun = null;
        this._beginRightYun = null;
        this._whiteEffect = null;
        this._orangeEffect = null;
        this._cloudEffect = null;
        this._lampholderbrightEffect = null;
        this._lampholderEffect = null;
        this._lampholderLightEffect = null;
        this._rewards = null;
        this._isPlayAni = false;
        this._leftArrow = null;
        this._rightArrow = null;
        this._oldProgressValue = 0;
        this._isFree = false;
        this._redDot = null;
        this._scheduleTF = null;
        this._scheduleLine = null;
        this._useNum = 0;
        _super.prototype.dispose.call(this);
    };
    return AcLiangBiographyView;
}(AcCommonView));
__reflect(AcLiangBiographyView.prototype, "AcLiangBiographyView");
//# sourceMappingURL=AcLiangBiographyView.js.map