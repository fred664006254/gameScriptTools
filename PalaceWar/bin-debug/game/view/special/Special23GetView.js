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
 * 特殊奖励--神器
 * @author shaoliang
 * date 2019/7/23
 * @class Special23GetView
 */
var Special23GetView = (function (_super) {
    __extends(Special23GetView, _super);
    function Special23GetView() {
        var _this = _super.call(this) || this;
        _this._weaponImg = null;
        _this._weaponId = null;
        /**淡光 */
        _this._shimmer = null;
        /**光刺1 */
        _this._thorn1 = null;
        /**光刺2 */
        _this._thorn2 = null;
        _this._sVContainer = null;
        _this._buttomContainer = null;
        _this._nameContainer = null;
        _this._buttombg = null;
        _this._titleTF = null;
        _this._titleTFLine = null;
        _this._nameTF = null;
        _this._namebg = null;
        _this._textTab = [];
        _this._scrollView = null;
        return _this;
    }
    /**创建view */
    Special23GetView.prototype.createView = function (id) {
        var _this = this;
        var weaponCfg = Config.ServantweaponCfg.getWeaponItemById(id);
        var servantCfg = Config.ServantCfg.getServantItemById(weaponCfg.servantID);
        this._weaponId = id;
        if (this._weaponId == "1001") {
            Api.rookieVoApi.insertWaitingGuide({ idx: "weapon_4" }, true);
        }
        this._shimmer = BaseLoadBitmap.create("specialview_effect_blue");
        this._shimmer.width = 320;
        this._shimmer.height = 413;
        this._shimmer.anchorOffsetX = this._shimmer.width / 2;
        this._shimmer.anchorOffsetY = this._shimmer.height / 2;
        this._shimmer.setScale(2);
        this._shimmer.setPosition(GameConfig.stageWidth / 2, GameConfig.stageHeigth - 522);
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
        this._weaponImg = BaseLoadBitmap.create(weaponCfg.icon);
        this._weaponImg.width = 346;
        this._weaponImg.height = 346;
        this._weaponImg.anchorOffsetY = this._weaponImg.height;
        this._weaponImg.anchorOffsetX = this._weaponImg.width / 2;
        this._weaponImg.setPosition(GameConfig.stageWidth / 2, GameConfig.stageHeigth - 380);
        this._container.addChild(this._weaponImg);
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
        this._buttombg.height = 256;
        this._buttombg.setPosition(0, GameConfig.stageHeigth - 310 - 20);
        this._buttomContainer.addChild(this._buttombg);
        //底部信息
        this._sVContainer = new BaseDisplayObjectContainer();
        var rect = new egret.Rectangle(0, 0, 640, 148);
        this._scrollView = ComponentManager.getScrollView(this._sVContainer, rect);
        this._scrollView.setPosition(0, this._buttombg.y + 75);
        this._buttomContainer.addChild(this._scrollView);
        var str1 = LanguageManager.getlocal("weapon_belong", [servantCfg.name]);
        var skill1 = String(weaponCfg.skill1[0] * 100);
        var str2 = LanguageManager.getlocal("weapon_skill1_desc", [servantCfg.name, skill1]);
        var skill2 = String(weaponCfg.skill2[0] * 100);
        var str4 = LanguageManager.getlocal("weapon_skill2_desc", [skill2]);
        var str3 = LanguageManager.getlocal("weapon_immediately");
        var desc1 = ComponentManager.getTextField(str1, TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        desc1.width = 540;
        desc1.lineSpacing = 6;
        desc1.setPosition(50, 3);
        this._sVContainer.addChild(desc1);
        var desc2 = ComponentManager.getTextField(str2, TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        desc2.width = desc1.width;
        desc2.lineSpacing = 6;
        desc2.setPosition(desc1.x, desc1.y + desc1.height + 15);
        this._sVContainer.addChild(desc2);
        var desc3 = ComponentManager.getTextField(str3, TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_QUALITY_GREEN);
        desc3.width = desc1.width;
        desc3.lineSpacing = 6;
        desc3.setPosition(desc1.x, desc2.y + desc2.height + 6);
        this._sVContainer.addChild(desc3);
        var desc4 = ComponentManager.getTextField(str4, TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        desc4.width = desc1.width;
        desc4.lineSpacing = 6;
        desc4.setPosition(desc1.x, desc3.y + desc3.height + 15);
        this._sVContainer.addChild(desc4);
        this._textTab = [desc1, desc2, desc3, desc4];
        this._namebg = BaseBitmap.create("specialview_commoni_namebg");
        this._nameTF = ComponentManager.getTextField(weaponCfg.name, TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._namebg.width = this._nameTF.width + 30;
        this._namebg.setPosition(this._buttombg.x + this._buttombg.width / 2 - this._namebg.width / 2, this._buttombg.y - this._namebg.height - 10);
        this._nameContainer.addChild(this._namebg);
        this._nameTF.setPosition(this._namebg.x + this._namebg.width / 2 - this._nameTF.width / 2, this._namebg.y + this._namebg.height / 2 - this._nameTF.height / 2);
        this._nameContainer.addChild(this._nameTF);
        this._titleTF = ComponentManager.getTextField(LanguageManager.getlocal("weapon_detail"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._titleTF.setPosition(this._buttombg.x + this._buttombg.width / 2 - this._titleTF.width / 2, this._buttombg.y + 35 - this._titleTF.height / 2);
        this._nameContainer.addChild(this._titleTF);
        this._titleTFLine = BaseBitmap.create("public_line3");
        this._titleTFLine.width = 281 + this._titleTF.width;
        this._titleTFLine.setPosition(this._buttombg.x + this._buttombg.width / 2 - this._titleTFLine.width / 2, this._titleTF.y + this._titleTF.height / 2 - this._titleTFLine.height / 2);
        this._buttomContainer.addChild(this._titleTFLine);
        // 分享按钮
        App.ShareGuideUtil.addShareNode(this._container, App.ShareGuideUtil.TYPE_SERVANTGET);
        if (this._golookInfoBtn) {
            if (this._weaponId == "1001") {
                this._golookInfoBtn.visible = false;
            }
            this.setgolookPos(this._buttombg.x + this._buttombg.width / 2 - this._golookInfoBtn.width / 2, this._buttombg.y + this._buttombg.height + 10);
        }
        this.playAni();
    };
    /**同类型刷新view */
    Special23GetView.prototype.refreashView = function (id) {
        var weaponCfg = Config.ServantweaponCfg.getWeaponItemById(id);
        var servantCfg = Config.ServantCfg.getServantItemById(weaponCfg.servantID);
        this._weaponId = id;
        if (this._weaponImg) {
            this._weaponImg.setload(weaponCfg.icon);
        }
        else {
            this._buttombg = BaseLoadBitmap.create("specialview_buttombg3");
            this._buttombg.width = 640;
            this._buttombg.height = 256;
            this._buttombg.setPosition(0, GameConfig.stageHeigth - 310 - 20);
            this._buttomContainer.addChild(this._buttombg);
        }
        for (var i = 0; i < this._textTab.length; i++) {
            this._textTab[i].dispose();
        }
        this._textTab.length = 0;
        this._sVContainer.dispose();
        this._sVContainer = null;
        this._buttomContainer.removeChild(this._scrollView);
        this._scrollView.dispose();
        this._scrollView = null;
        this._sVContainer = new BaseDisplayObjectContainer();
        var rect = new egret.Rectangle(0, 0, 640, 148);
        this._scrollView = ComponentManager.getScrollView(this._sVContainer, rect);
        this._scrollView.setPosition(0, this._buttombg.y + 75);
        this._buttomContainer.addChild(this._scrollView);
        var str1 = LanguageManager.getlocal("weapon_belong", [servantCfg.name]);
        var skill1 = String(weaponCfg.skill1[0] * 100);
        var str2 = LanguageManager.getlocal("weapon_skill1_desc", [servantCfg.name, skill1]);
        var skill2 = String(weaponCfg.skill2[0] * 100);
        var str4 = LanguageManager.getlocal("weapon_skill2_desc", [skill2]);
        var str3 = LanguageManager.getlocal("weapon_immediately");
        var desc1 = ComponentManager.getTextField(str1, TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        desc1.width = 540;
        desc1.lineSpacing = 6;
        desc1.setPosition(50, 3);
        this._sVContainer.addChild(desc1);
        var desc2 = ComponentManager.getTextField(str2, TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        desc2.width = desc1.width;
        desc2.lineSpacing = 6;
        desc2.setPosition(desc1.x, desc1.y + desc1.height + 15);
        this._sVContainer.addChild(desc2);
        var desc3 = ComponentManager.getTextField(str3, TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_QUALITY_GREEN);
        desc3.width = desc1.width;
        desc3.lineSpacing = 6;
        desc3.setPosition(desc1.x, desc2.y + desc2.height + 6);
        this._sVContainer.addChild(desc3);
        var desc4 = ComponentManager.getTextField(str4, TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        desc4.width = desc1.width;
        desc4.lineSpacing = 6;
        desc4.setPosition(desc1.x, desc3.y + desc3.height + 15);
        this._sVContainer.addChild(desc4);
        this._textTab = [desc1, desc2, desc3, desc4];
        this._nameTF.text = weaponCfg.name;
        this._namebg.width = this._nameTF.width + 30;
        this._namebg.setPosition(this._buttombg.x + this._buttombg.width / 2 - this._namebg.width / 2, this._buttombg.y - this._namebg.height - 10);
        this._nameTF.setPosition(this._namebg.x + this._namebg.width / 2 - this._nameTF.width / 2, this._namebg.y + this._namebg.height / 2 - this._nameTF.height / 2);
        if (this._golookInfoBtn) {
            this.setgolookPos(this._buttombg.x + this._buttombg.width / 2 - this._golookInfoBtn.width / 2, this._buttombg.y + this._buttombg.height + 10);
        }
        this.playAni();
    };
    Special23GetView.prototype.playAni = function () {
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
        this._weaponImg.alpha = 0;
        egret.Tween.get(this._weaponImg).wait(500).to({ alpha: 1 }, 100).call(function () {
            egret.Tween.removeTweens(_this._weaponImg);
        }, this);
        egret.Tween.get(this._nameContainer).wait(600).to({ alpha: 1 }, 100).call(function () {
            egret.Tween.removeTweens(_this._nameContainer);
        }, this);
        egret.Tween.get(this._shimmer).to({ alpha: 1 }, 500).call(function () {
            egret.Tween.removeTweens(_this._shimmer);
            _this._thorn1.setVisible(true);
            _this._thorn2.setVisible(true);
        }, this);
    };
    Special23GetView.prototype.golookInfoBtnClick = function () {
        if (this._isplay) {
            return;
        }
        var weaponId = this._weaponId;
        var sid = Config.ServantweaponCfg.getWeaponItemById(weaponId).servantID;
        this.callBack();
        ViewController.getInstance().openView(ViewConst.COMMON.SERVANTNEWUIVIEW, { servantId: sid, showweapon: true });
    };
    Special23GetView.prototype.isShowBtn = function () {
        return true;
    };
    Special23GetView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "specialview_commoni_namebg", "shareBtn",
        ]);
    };
    Special23GetView.prototype.closePaneliew = function () {
        _super.prototype.closePaneliew.call(this);
        Api.rookieVoApi.checkWaitingGuide();
    };
    Special23GetView.prototype.dispose = function () {
        egret.Tween.removeTweens(this._shimmer);
        egret.Tween.removeTweens(this._thorn1);
        egret.Tween.removeTweens(this._thorn2);
        this._weaponImg = null;
        this._shimmer = null;
        this._thorn1 = null;
        this._thorn2 = null;
        this._weaponId = null;
        this._sVContainer = null;
        this._buttomContainer = null;
        this._nameContainer = null;
        this._buttombg = null;
        this._textTab.length = 0;
        this._scrollView = null;
        _super.prototype.dispose.call(this);
    };
    return Special23GetView;
}(SpecialBaseView));
__reflect(Special23GetView.prototype, "Special23GetView");
//# sourceMappingURL=Special23GetView.js.map