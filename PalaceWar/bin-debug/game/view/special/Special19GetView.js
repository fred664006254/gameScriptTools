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
 * 特殊奖励--门客皮肤
 * @author 张朝阳
 * date 2019/3/27
 * @class Special19GetView
 */
var Special19GetView = (function (_super) {
    __extends(Special19GetView, _super);
    function Special19GetView() {
        var _this = _super.call(this) || this;
        _this._servantSkinDragonBones = null;
        _this._servantSkinImg = null;
        _this._buttombg = null;
        _this._buttomDesc = null;
        _this._titleTF = null;
        _this._titleTFLine = null;
        _this._nameTF = null;
        _this._namebg = null;
        _this._buttomTip = null;
        _this._buttomContainer = null;
        _this._nameContainer = null;
        /**淡光 */
        _this._shimmer = null;
        /**光刺1 */
        _this._thorn1 = null;
        /**光刺2 */
        _this._thorn2 = null;
        _this._servantId = null;
        _this._servantSkinId = null;
        return _this;
    }
    /**创建view */
    Special19GetView.prototype.createView = function (id) {
        var _this = this;
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_UPGRADE_SERVANT_REDSKINRED, this.redSkinHandle, this);
        if (Api.servantVoApi.getAllServantSkinNums() == 3) {
            PlatformManager.analyticsByHyKey("achieved_3retainer_suits");
        }
        var servantSkinCfg = Config.ServantskinCfg.getServantSkinItemById(id);
        var servantCfg = Config.ServantCfg.getServantItemById(servantSkinCfg.servantId);
        this._servantId = servantCfg.id;
        this._servantSkinId = id;
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
        var boneName = "";
        if (servantSkinCfg && servantSkinCfg.bone) {
            boneName = servantSkinCfg.bone + "_ske";
        }
        if ((!Api.switchVoApi.checkCloseBone()) && boneName && RES.hasRes(boneName) && App.CommonUtil.check_dragon()) {
            this._servantSkinDragonBones = App.DragonBonesUtil.getLoadDragonBones(servantSkinCfg.bone);
            this._servantSkinDragonBones.setScale(1.03);
            this._servantSkinDragonBones.setPosition(GameConfig.stageWidth / 2, GameConfig.stageHeigth - 280);
            this._container.addChild(this._servantSkinDragonBones);
        }
        else {
            this._servantSkinImg = BaseLoadBitmap.create(servantSkinCfg.body);
            this._servantSkinImg.width = 405;
            this._servantSkinImg.height = 467;
            this._servantSkinImg.anchorOffsetY = this._servantSkinImg.height;
            this._servantSkinImg.anchorOffsetX = this._servantSkinImg.width / 2;
            this._servantSkinImg.setPosition(GameConfig.stageWidth / 2, GameConfig.stageHeigth - 280);
            this._container.addChild(this._servantSkinImg);
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
        this._buttomDesc = ComponentManager.getTextField(LanguageManager.getlocal("servantSkinEffect" + servantSkinCfg.id), TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_WHITE);
        this._buttomDesc.width = 530;
        this._buttomDesc.lineSpacing = 20;
        this._buttombg.height = 108 + this._buttomDesc.height + 24;
        this._buttombg.setPosition(0, GameConfig.stageHeigth - this._buttombg.height - 110);
        this._buttomContainer.addChild(this._buttombg);
        this._buttomDesc.setPosition(this._buttombg.x + this._buttombg.width / 2 - this._buttomDesc.width / 2, this._buttombg.y + 60);
        this._buttomContainer.addChild(this._buttomDesc);
        this._buttomTip = ComponentManager.getTextField(LanguageManager.getlocal("special19GetViewButtomDesc"), TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_WARN_GREEN);
        this._buttomTip.setPosition(this._buttombg.x + this._buttombg.width / 2 - this._buttomTip.width / 2, this._buttomDesc.y + this._buttomDesc.height + 20);
        this._buttomContainer.addChild(this._buttomTip);
        this._namebg = BaseBitmap.create("specialview_commoni_namebg");
        this._nameTF = ComponentManager.getTextField(servantCfg.name, TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._namebg.width = this._nameTF.width + 30;
        this._namebg.setPosition(this._buttombg.x + this._buttombg.width / 2 - this._namebg.width / 2, this._buttombg.y - this._namebg.height - 10);
        this._nameContainer.addChild(this._namebg);
        this._nameTF.setPosition(this._namebg.x + this._namebg.width / 2 - this._nameTF.width / 2, this._namebg.y + this._namebg.height / 2 - this._nameTF.height / 2);
        this._nameContainer.addChild(this._nameTF);
        this._titleTF = ComponentManager.getTextField(servantSkinCfg.getSkinName(), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._titleTF.setPosition(this._buttombg.x + this._buttombg.width / 2 - this._titleTF.width / 2, this._buttombg.y + 35 - this._titleTF.height / 2);
        this._buttomContainer.addChild(this._titleTF);
        this._titleTFLine = BaseBitmap.create("public_line3");
        this._titleTFLine.width = 281 + this._titleTF.width;
        this._titleTFLine.setPosition(this._buttombg.x + this._buttombg.width / 2 - this._titleTFLine.width / 2, this._titleTF.y + this._titleTF.height / 2 - this._titleTFLine.height / 2);
        this._buttomContainer.addChild(this._titleTFLine);
        if (this._golookInfoBtn) {
            // this.setgolookPos(this._buttombg.x + this._buttombg.width - this._golookInfoBtn.width - 10, this._buttombg.y - this._golookInfoBtn.height - 17);
            this.setgolookPos(this._buttombg.x + this._buttombg.width / 2 - this._golookInfoBtn.width / 2, this._buttombg.y + this._buttombg.height + 10);
        }
        this.playAni();
    };
    /**同类型刷新view */
    Special19GetView.prototype.refreashView = function (id) {
        var servantSkinCfg = Config.ServantskinCfg.getServantSkinItemById(id);
        var servantCfg = Config.ServantCfg.getServantItemById(servantSkinCfg.servantId);
        this._servantId = servantCfg.id;
        this._servantSkinId = id;
        var boneName = "";
        if (servantSkinCfg && servantSkinCfg.bone) {
            boneName = servantSkinCfg.bone + "_ske";
        }
        var depth = 0;
        if ((!Api.switchVoApi.checkCloseBone()) && boneName && RES.hasRes(boneName) && App.CommonUtil.check_dragon()) {
            if (this._servantSkinDragonBones) {
                depth = this._container.getChildIndex(this._servantSkinDragonBones);
                this._container.removeChild(this._servantSkinDragonBones);
                this._servantSkinDragonBones.dispose();
                this._servantSkinDragonBones = null;
            }
            if (this._servantSkinImg) {
                depth = this._container.getChildIndex(this._servantSkinImg);
                this._container.removeChild(this._servantSkinImg);
                this._servantSkinImg.dispose();
                this._servantSkinImg = null;
            }
            this._servantSkinDragonBones = App.DragonBonesUtil.getLoadDragonBones(servantSkinCfg.bone);
            this._servantSkinDragonBones.setScale(1.03);
            this._servantSkinDragonBones.setPosition(GameConfig.stageWidth / 2, GameConfig.stageHeigth - 280);
            this._container.addChildAt(this._servantSkinDragonBones, depth);
        }
        else {
            if (this._servantSkinDragonBones) {
                depth = this._container.getChildIndex(this._servantSkinDragonBones);
                this._container.removeChild(this._servantSkinDragonBones);
                this._servantSkinDragonBones.dispose();
                this._servantSkinDragonBones = null;
            }
            if (this._servantSkinImg) {
                this._servantSkinImg.setload(servantSkinCfg.body);
            }
            else {
                this._servantSkinImg = BaseLoadBitmap.create(servantSkinCfg.body);
                this._servantSkinImg.width = 405;
                this._servantSkinImg.height = 467;
                this._servantSkinImg.anchorOffsetY = this._servantSkinImg.height;
                this._servantSkinImg.anchorOffsetX = this._servantSkinImg.width / 2;
                this._servantSkinImg.setPosition(GameConfig.stageWidth / 2, GameConfig.stageHeigth - 280);
                this._container.addChildAt(this._servantSkinImg, depth);
            }
        }
        this._buttomDesc.text = LanguageManager.getlocal("servantSkinEffect" + servantSkinCfg.id);
        this._buttombg.height = 108 + this._buttomDesc.height + 24;
        this._buttombg.setPosition(0, GameConfig.stageHeigth - this._buttombg.height - 110);
        this._buttomDesc.setPosition(this._buttombg.x + this._buttombg.width / 2 - this._buttomDesc.width / 2, this._buttombg.y + 60);
        this._buttomTip.setPosition(this._buttombg.x + this._buttombg.width / 2 - this._buttomTip.width / 2, this._buttomDesc.y + this._buttomDesc.height + 20);
        this._nameTF.text = servantCfg.name;
        this._namebg.width = this._nameTF.width + 30;
        this._namebg.setPosition(this._buttombg.x + this._buttombg.width / 2 - this._namebg.width / 2, this._buttombg.y - this._namebg.height - 10);
        this._nameTF.setPosition(this._namebg.x + this._namebg.width / 2 - this._nameTF.width / 2, this._namebg.y + this._namebg.height / 2 - this._nameTF.height / 2);
        this._titleTF.text = servantSkinCfg.getSkinName();
        this._titleTF.setPosition(this._buttombg.x + this._buttombg.width / 2 - this._titleTF.width / 2, this._buttombg.y + 35 - this._titleTF.height / 2);
        this._titleTFLine.width = 281 + this._titleTF.width;
        this._titleTFLine.setPosition(this._buttombg.x + this._buttombg.width / 2 - this._titleTFLine.width / 2, this._titleTF.y + this._titleTF.height / 2 - this._titleTFLine.height / 2);
        if (this._golookInfoBtn) {
            // this.setgolookPos(this._buttombg.x + this._buttombg.width - this._golookInfoBtn.width - 10, this._buttombg.y - this._golookInfoBtn.height - 17);
            this.setgolookPos(this._buttombg.x + this._buttombg.width / 2 - this._golookInfoBtn.width / 2, this._buttombg.y + this._buttombg.height + 10);
        }
        this.playAni();
    };
    Special19GetView.prototype.playAni = function () {
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
    Special19GetView.prototype.golookInfoBtnClick = function () {
        var servantId = this._servantId;
        var servantSkinId = this._servantSkinId;
        // this.callBack();
        // ViewController.getInstance().openView(ViewConst.COMMON.SERVANTINFOVIEW, servantId);
        // ViewController.getInstance().openView(ViewConst.COMMON.SERVANTINFOVIEW, { servantId: servantId, servantSkinId: servantSkinId });
        NetManager.request(NetRequestConst.REQUEST_UPGRADE_SERVANT_REDSKINRED, { servantId: servantId, servantSkinId: servantSkinId });
    };
    Special19GetView.prototype.redSkinHandle = function (event) {
        if (event.data.ret) {
            var servantId = this._servantId;
            var servantSkinId = this._servantSkinId;
            this.callBack();
            ViewController.getInstance().openView(ViewConst.COMMON.SERVANTINFOVIEW, { servantId: servantId, servantSkinId: servantSkinId });
        }
    };
    Special19GetView.prototype.isShowBtn = function () {
        if (this.param.data) {
            var servantSkinCfg = Config.ServantskinCfg.getServantSkinItemById(this.param.data.id);
            var servantVo = Api.servantVoApi.getServantObj(servantSkinCfg.servantId);
            if (!servantVo) {
                return false;
            }
        }
        return true;
    };
    Special19GetView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "specialview_commoni_namebg"
        ]);
    };
    Special19GetView.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_UPGRADE_SERVANT_REDSKINRED, this.redSkinHandle, this);
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
        this._buttomDesc = null;
        this._titleTF = null;
        this._titleTFLine = null;
        this._nameTF = null;
        this._namebg = null;
        this._buttomTip = null;
        this._servantId = null;
        this._servantSkinId = null;
        _super.prototype.dispose.call(this);
    };
    return Special19GetView;
}(SpecialBaseView));
__reflect(Special19GetView.prototype, "Special19GetView");
//# sourceMappingURL=Special19GetView.js.map