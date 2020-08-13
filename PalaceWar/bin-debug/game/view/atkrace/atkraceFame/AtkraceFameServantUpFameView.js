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
 * 门客名望提升板子
 * @author hyd
 * date 2019/8/29
 * @class AtkraceFameServantUpFameView
 */
var AtkraceFameServantUpFameView = (function (_super) {
    __extends(AtkraceFameServantUpFameView, _super);
    function AtkraceFameServantUpFameView() {
        var _this = _super.call(this) || this;
        _this._servantSkinDragonBones = null;
        _this._servantSkinImg = null;
        _this._buttombg = null;
        _this._titleBM = null;
        _this._titleTFLine = null;
        _this._nameTF = null;
        _this._namebg = null;
        _this._buttomContainer = null;
        _this._nameContainer = null;
        _this._detailContainer = null;
        /**淡光 */
        _this._shimmer = null;
        /**光刺1 */
        _this._thorn1 = null;
        /**光刺2 */
        _this._thorn2 = null;
        _this._servantId = null;
        return _this;
    }
    /**创建view */
    AtkraceFameServantUpFameView.prototype.createView = function (id) {
        var _this = this;
        var servantId = String(id.id);
        var beforeLv = Number(id.beforeLv);
        var afterLv = Number(id.afterLv);
        this._servantId = servantId;
        this._servantInfoObj = Api.servantVoApi.getServantObj(servantId);
        this._shimmer = BaseLoadBitmap.create("specialview_effect_blue");
        this._shimmer.width = 320;
        this._shimmer.height = 413;
        this._shimmer.anchorOffsetX = this._shimmer.width / 2;
        this._shimmer.anchorOffsetY = this._shimmer.height / 2;
        this._shimmer.setScale(2);
        this._shimmer.setPosition(GameConfig.stageWidth / 2, GameConfig.stageHeigth - 482);
        this._container.addChild(this._shimmer);
        this._shimmer.alpha = 0;
        this._thorn1 = BaseLoadBitmap.create("specialview_effect_bluethorn");
        this._thorn1.width = 320;
        this._thorn1.height = 413;
        this._thorn1.anchorOffsetX = this._thorn1.width / 2;
        this._thorn1.anchorOffsetY = this._thorn1.height / 2;
        this._thorn1.setScale(1.25);
        this._thorn1.alpha = 1;
        this._thorn1.rotation = 0;
        this._thorn1.blendMode = egret.BlendMode.ADD;
        this._thorn1.setPosition(this._shimmer.x, this._shimmer.y);
        this._container.addChild(this._thorn1);
        egret.Tween.get(this._thorn1, { loop: true }).call(function () {
            _this._thorn1.rotation = 0;
        }, this).to({ alpha: 0.2, rotation: 180 }, 10000).to({ alpha: 1, rotation: 360 }, 10000);
        this._thorn1.setVisible(false);
        this._thorn2 = BaseLoadBitmap.create("specialview_effect_bluethorn");
        this._thorn2.width = 320;
        this._thorn2.height = 413;
        this._thorn2.anchorOffsetX = this._thorn2.width / 2;
        this._thorn2.anchorOffsetY = this._thorn2.height / 2;
        this._thorn2.setScale(1.25);
        this._thorn2.alpha = 0.2;
        this._thorn2.rotation = 180;
        this._thorn2.blendMode = egret.BlendMode.ADD;
        this._thorn2.setPosition(this._shimmer.x, this._shimmer.y);
        this._container.addChild(this._thorn2);
        egret.Tween.get(this._thorn2, { loop: true }).call(function () {
            _this._thorn2.rotation = 180;
        }, this).to({ alpha: 1, rotation: 0 }, 10000).to({ alpha: 0.2, rotation: -180 }, 10000);
        this._thorn2.setVisible(false);
        this.roleContainer = new BaseDisplayObjectContainer();
        this._container.addChild(this.roleContainer);
        var serImg = this._servantInfoObj.fullImgPath;
        var wear = Api.servantVoApi.getservantSkinIdInWear(servantId);
        this._servantSkinImg = BaseLoadBitmap.create(serImg);
        this._servantSkinImg.width = 405;
        this._servantSkinImg.height = 467;
        this._servantSkinImg.x = GameConfig.stageWidth / 2 - this._servantSkinImg.width / 2;
        this._servantSkinImg.y = GameConfig.stageHeigth - this._servantSkinImg.height - 293;
        this.roleContainer.addChild(this._servantSkinImg);
        var skincfg = null;
        if (!Api.switchVoApi.checkCloseBone()) {
            var boneName = undefined;
            var dagonBonesName = null;
            if (wear && wear != "") {
                skincfg = Config.ServantskinCfg.getServantSkinItemById(wear);
                serImg = skincfg.body;
                if (skincfg && skincfg.bone) {
                    boneName = skincfg.bone + "_ske";
                    dagonBonesName = skincfg.bone;
                }
            }
            else {
                dagonBonesName = Api.servantVoApi.getServantBoneId(servantId);
                boneName = dagonBonesName + "_ske";
            }
            if (boneName && RES.hasRes(boneName) && App.CommonUtil.check_dragon()) {
                if (this._servantSkinImg) {
                    this._servantSkinImg.visible = false;
                }
                if (this._servantSkinDragonBones) {
                    this._servantSkinDragonBones.stop();
                    this._servantSkinDragonBones.dispose();
                    this._servantSkinDragonBones = null;
                }
                this._servantSkinDragonBones = App.DragonBonesUtil.getLoadDragonBones(dagonBonesName);
                this._servantSkinDragonBones.visible = true;
                this._servantSkinDragonBones.x = this._servantSkinImg.x + 200;
                this._servantSkinDragonBones.y = this._servantSkinImg.y + 450;
                this.roleContainer.addChild(this._servantSkinDragonBones);
                // let mask = egret.Rectangle.create();
                // let offX = Math.abs(0 - this._servantSkinDragonBones.x);
                // mask.setTo(0 - this._servantSkinDragonBones.x, 0 - this._servantSkinDragonBones.y, 500, 500);
                // this._servantSkinImg.visible = false;
                // this._servantSkinDragonBones.mask = mask;
            }
            else {
                if (this._servantSkinDragonBones) {
                    this._servantSkinDragonBones.stop();
                    this._servantSkinDragonBones.dispose();
                    this._servantSkinDragonBones = null;
                }
                this._servantSkinImg.setload(serImg); //0611
                this._servantSkinImg.visible = true;
            }
        }
        else {
            if (this._servantSkinDragonBones) {
                this._servantSkinDragonBones.stop();
                this._servantSkinDragonBones.dispose();
                this._servantSkinDragonBones = null;
            }
            this._servantSkinImg.setload(serImg); //0611
            this._servantSkinImg.visible = true;
        }
        this._buttomContainer = new BaseDisplayObjectContainer();
        this._buttomContainer.width = 640;
        this._buttomContainer.anchorOffsetX = this._buttomContainer.width / 2;
        this._buttomContainer.x = 320;
        this._container.addChild(this._buttomContainer);
        this._nameContainer = new BaseDisplayObjectContainer();
        this._nameContainer.width = 640;
        this._nameContainer.anchorOffsetX = this._buttomContainer.width / 2;
        this._nameContainer.x = 320;
        this._container.addChild(this._nameContainer);
        this._buttombg = BaseLoadBitmap.create("specialview_buttombg3");
        this._buttombg.width = 640;
        this._detailContainer = this.getDetailTextsContainer(beforeLv, afterLv);
        this._buttombg.height = 108 + this._detailContainer.height + 10;
        this._buttombg.setPosition(0, GameConfig.stageHeigth - this._buttombg.height - 55);
        this._buttomContainer.addChild(this._buttombg);
        this._detailContainer.setPosition(this._buttombg.x + this._buttombg.width / 2 - this._detailContainer.width / 2, this._buttombg.y + 80);
        this._buttomContainer.addChild(this._detailContainer);
        this._namebg = BaseBitmap.create("specialview_commoni_namebg");
        this._nameTF = ComponentManager.getTextField(this._servantInfoObj.servantName, TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._namebg.width = this._nameTF.width + 30;
        this._namebg.setPosition(this._buttombg.x + this._buttombg.width / 2 - this._namebg.width / 2, this._buttombg.y - this._namebg.height - 10);
        this._nameContainer.addChild(this._namebg);
        this._nameTF.setPosition(this._namebg.x + this._namebg.width / 2 - this._nameTF.width / 2, this._namebg.y + this._namebg.height / 2 - this._nameTF.height / 2);
        this._nameContainer.addChild(this._nameTF);
        this._titleBM = BaseBitmap.create("atkracefame_level" + this._servantInfoObj.fameLv);
        this._titleBM.setPosition(this._buttombg.x + this._buttombg.width / 2 - this._titleBM.width / 2, this._buttombg.y + 35 - this._titleBM.height / 2);
        this._buttomContainer.addChild(this._titleBM);
        this._titleTFLine = BaseBitmap.create("public_line3");
        this._titleTFLine.width = 281 + this._titleBM.width;
        this._titleTFLine.setPosition(this._buttombg.x + this._buttombg.width / 2 - this._titleTFLine.width / 2, this._titleBM.y + this._titleBM.height / 2 - this._titleTFLine.height / 2);
        this._buttomContainer.addChild(this._titleTFLine);
        this.playAni();
    };
    AtkraceFameServantUpFameView.prototype.getDetailTextsContainer = function (beforeLv, afterLv) {
        var detailTextsContainer = new BaseDisplayObjectContainer();
        var beforeFame = Config.AtkraceCfg.getFameCfgBylevel(beforeLv);
        var afterFame = Config.AtkraceCfg.getFameCfgBylevel(afterLv);
        var atkDesc = ComponentManager.getTextField(LanguageManager.getlocal('atkraceFameUpTip1'), TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        var crtDesc = ComponentManager.getTextField(LanguageManager.getlocal('atkraceFameUpTip2'), TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        var serDesc = ComponentManager.getTextField(LanguageManager.getlocal('atkraceFameUpTip3', [this._servantInfoObj.servantName]), TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        var beforeAtkStr = beforeFame.att1 + '';
        var afterAtkStr = afterFame.att1 + '';
        if (beforeFame.att1Type == 2) {
            beforeAtkStr = App.MathUtil.toFixed(beforeFame.att1 * 100, 1) + '%';
        }
        if (afterFame.att1Type == 2) {
            afterAtkStr = App.MathUtil.toFixed(afterFame.att1 * 100, 1) + '%';
        }
        var beforeAtk = ComponentManager.getTextField(beforeAtkStr, TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        var afterAtk = ComponentManager.getTextField(App.StringUtil.formatStringColor(afterAtkStr, TextFieldConst.COLOR_WARN_GREEN), TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        var beforeCrt = ComponentManager.getTextField(App.MathUtil.toFixed(beforeFame.att2 * 100, 1) + '%', TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        var afterCrt = ComponentManager.getTextField(App.StringUtil.formatStringColor(App.MathUtil.toFixed(afterFame.att2 * 100, 1) + '%', TextFieldConst.COLOR_WARN_GREEN), TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        var beforeSer = ComponentManager.getTextField(beforeFame.att3 + '', TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        var afterSer = ComponentManager.getTextField(App.StringUtil.formatStringColor(afterFame.att3 + '', TextFieldConst.COLOR_WARN_GREEN), TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        var arrowBM1 = BaseBitmap.create('acduanwu_arrow');
        var arrowBM2 = BaseBitmap.create('acduanwu_arrow');
        var arrowBM3 = BaseBitmap.create('acduanwu_arrow');
        detailTextsContainer.addChild(atkDesc);
        detailTextsContainer.addChild(crtDesc);
        detailTextsContainer.addChild(serDesc);
        detailTextsContainer.addChild(beforeAtk);
        detailTextsContainer.addChild(afterAtk);
        detailTextsContainer.addChild(beforeCrt);
        detailTextsContainer.addChild(afterCrt);
        detailTextsContainer.addChild(beforeSer);
        detailTextsContainer.addChild(afterSer);
        detailTextsContainer.addChild(arrowBM1);
        detailTextsContainer.addChild(arrowBM2);
        detailTextsContainer.addChild(arrowBM3);
        var _a = [0, 270, 350, 430, 0, 50, 100], x1 = _a[0], x2 = _a[1], x3 = _a[2], x4 = _a[3], y1 = _a[4], y2 = _a[5], y3 = _a[6];
        atkDesc.setPosition(x1, y1);
        crtDesc.setPosition(x1, y2);
        serDesc.setPosition(x1, y3);
        beforeAtk.setPosition(x2, y1);
        afterAtk.setPosition(x4, y1);
        beforeCrt.setPosition(x2, y2);
        afterCrt.setPosition(x4, y2);
        beforeSer.setPosition(x2, y3);
        afterSer.setPosition(x4, y3);
        arrowBM1.setPosition(x3, y1 - 7);
        arrowBM2.setPosition(x3, y2 - 7);
        arrowBM3.setPosition(x3, y3 - 7);
        return detailTextsContainer;
    };
    AtkraceFameServantUpFameView.prototype.playAni = function () {
        var _this = this;
        _super.prototype.playAni.call(this);
        this._shimmer.alpha = 0;
        this._thorn1.setVisible(false);
        this._thorn2.setVisible(false);
        this._buttomContainer.scaleX = 0;
        this._nameContainer.alpha = 0;
        egret.Tween.get(this._buttomContainer).to({ scaleX: 1 }, 350).call(function () {
            egret.Tween.removeTweens(_this._buttomContainer);
        }, this);
        if (this._servantSkinImg) {
            this._servantSkinImg.alpha = 0;
            egret.Tween.get(this._servantSkinImg).wait(500).to({ alpha: 1 }, 100).call(function () {
                egret.Tween.removeTweens(_this._servantSkinImg);
            }, this);
        }
        else {
            this._servantSkinDragonBones.alpha = 0;
            egret.Tween.get(this._servantSkinDragonBones).wait(500).to({ alpha: 1 }, 100).call(function () {
                egret.Tween.removeTweens(_this._servantSkinDragonBones);
            }, this);
        }
        egret.Tween.get(this._nameContainer).wait(600).to({ alpha: 1 }, 100).call(function () {
            egret.Tween.removeTweens(_this._nameContainer);
        }, this);
        egret.Tween.get(this._shimmer).to({ alpha: 1 }, 500).call(function () {
            egret.Tween.removeTweens(_this._shimmer);
            _this._thorn1.setVisible(true);
            _this._thorn2.setVisible(true);
        }, this);
    };
    /**同类型刷新view */
    AtkraceFameServantUpFameView.prototype.refreashView = function (id) {
        var servantId = String(id.id);
        var beforeLv = Number(id.beforeLv);
        var afterLv = Number(id.afterLv);
        this._servantId = servantId;
        this._servantInfoObj = Api.servantVoApi.getServantObj(servantId);
        if (this._servantSkinDragonBones) {
            this.roleContainer.removeChild(this._servantSkinDragonBones);
            this._servantSkinDragonBones.visible = false;
            this._servantSkinDragonBones.stop();
            this._servantSkinDragonBones.dispose();
            this._servantSkinDragonBones = null;
        }
        if (this._servantSkinImg) {
            this._servantSkinImg.visible = false;
        }
        this._detailContainer.removeChildren();
        this._detailContainer.dispose();
        this._detailContainer = null;
        var skincfg = null;
        var serImg = this._servantInfoObj.fullImgPath;
        var wear = Api.servantVoApi.getservantSkinIdInWear(servantId);
        if (!Api.switchVoApi.checkCloseBone()) {
            var boneName = undefined;
            var dagonBonesName = null;
            if (wear && wear != "") {
                skincfg = Config.ServantskinCfg.getServantSkinItemById(wear);
                serImg = skincfg.body;
                if (skincfg && skincfg.bone) {
                    boneName = skincfg.bone + "_ske";
                    dagonBonesName = skincfg.bone;
                }
            }
            else {
                dagonBonesName = Api.servantVoApi.getServantBoneId(servantId);
                boneName = dagonBonesName + "_ske";
            }
            if (boneName && RES.hasRes(boneName) && App.CommonUtil.check_dragon()) {
                if (this._servantSkinImg) {
                    this._servantSkinImg.visible = false;
                }
                if (this._servantSkinDragonBones) {
                    this._servantSkinDragonBones.stop();
                    this._servantSkinDragonBones.dispose();
                    this._servantSkinDragonBones = null;
                }
                this._servantSkinDragonBones = App.DragonBonesUtil.getLoadDragonBones(dagonBonesName);
                this._servantSkinDragonBones.visible = true;
                this.roleContainer.addChild(this._servantSkinDragonBones);
                this._servantSkinDragonBones.x = this._servantSkinImg.x + 200;
                this._servantSkinDragonBones.y = this._servantSkinImg.y + 450;
            }
            else {
                if (this._servantSkinDragonBones) {
                    this._servantSkinDragonBones.stop();
                    this._servantSkinDragonBones.dispose();
                    this._servantSkinDragonBones = null;
                }
                this._servantSkinImg.setload(serImg);
                this._servantSkinImg.visible = true;
            }
        }
        else {
            if (this._servantSkinDragonBones) {
                this._servantSkinDragonBones.stop();
                this._servantSkinDragonBones.dispose();
                this._servantSkinDragonBones = null;
            }
            this._servantSkinImg.setload(serImg);
            this._servantSkinImg.visible = true;
        }
        this._nameTF.text = this._servantInfoObj.servantName;
        this._titleBM.setRes("atkracefame_level" + this._servantInfoObj.fameLv);
        this._detailContainer = this.getDetailTextsContainer(beforeLv, afterLv);
        this._detailContainer.setPosition(this._buttombg.x + this._buttombg.width / 2 - this._detailContainer.width / 2, this._buttombg.y + 80);
        this._buttomContainer.addChild(this._detailContainer);
        this.playAni();
    };
    AtkraceFameServantUpFameView.prototype.getArtRes = function () {
        return "atkracefame_upfametitle";
    };
    AtkraceFameServantUpFameView.prototype.isShowBtn = function () {
        return false;
    };
    AtkraceFameServantUpFameView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "specialview_commoni_namebg", "acduanwu_arrow", "atkracefame_upfametitle"
        ]);
    };
    AtkraceFameServantUpFameView.prototype.dispose = function () {
        egret.Tween.removeTweens(this._shimmer);
        egret.Tween.removeTweens(this._thorn1);
        egret.Tween.removeTweens(this._thorn2);
        egret.Tween.removeTweens(this._nameContainer);
        egret.Tween.removeTweens(this._buttomContainer);
        this._buttomContainer = null;
        this._nameContainer = null;
        this._servantSkinDragonBones = null;
        this._servantSkinImg = null;
        this._buttombg = null;
        this._titleBM = null;
        this._titleTFLine = null;
        this._nameTF = null;
        this._namebg = null;
        this._servantId = null;
        this._servantInfoObj = null;
        this.roleContainer = null;
        _super.prototype.dispose.call(this);
    };
    return AtkraceFameServantUpFameView;
}(SpecialBaseView));
__reflect(AtkraceFameServantUpFameView.prototype, "AtkraceFameServantUpFameView");
//# sourceMappingURL=AtkraceFameServantUpFameView.js.map