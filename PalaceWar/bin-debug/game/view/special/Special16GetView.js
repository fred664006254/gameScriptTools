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
 * 特殊奖励--红颜皮肤
 * @author 张朝阳
 * date 2019/3/27
 * @class Special16GetView
 */
var Special16GetView = (function (_super) {
    __extends(Special16GetView, _super);
    function Special16GetView() {
        var _this = _super.call(this) || this;
        _this._buttombg = null;
        _this._sceneDescTF = null;
        _this._titleTF = null;
        _this._titleTFLine = null;
        _this._wifeSkinDragonBones = null;
        _this._wifeSkinImg = null;
        _this._wifeInfoTFList = [];
        _this._buttomDescTF = null;
        _this._nameTF = null;
        _this._namebg = null;
        _this._buttomContainer = null;
        _this._nameContainer = null;
        /**淡光 */
        _this._shimmer = null;
        /**光刺1 */
        _this._thorn1 = null;
        /**光刺2 */
        _this._thorn2 = null;
        _this._wifeId = null;
        _this._wifeSkinId = null;
        _this._isHas3101 = false;
        return _this;
    }
    /**创建view */
    Special16GetView.prototype.createView = function (id) {
        var _this = this;
        if (String(id) == "3101") {
            PlatformManager.analyticsByHyKey("achieved_7days_login_beauty_suit");
            this._isHas3101 = true;
        }
        if (Api.wifeSkinVoApi.getWifeSkinNums() == 4) {
            PlatformManager.analyticsByHyKey("achieved_4beauty_suits");
        }
        else if (Api.wifeSkinVoApi.getWifeSkinNums() == 8) {
            PlatformManager.analyticsByHyKey("achieved_8beauty_suits");
        }
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_WIFE_READSKINRED, this.redSkinHandle, this);
        var wifeSkinCfg = Config.WifeskinCfg.getWifeCfgById(id);
        var wifeCfg = Config.WifeCfg.getWifeCfgById(wifeSkinCfg.wifeId);
        var wifeInfo = this.dealAttrChangeInfo(wifeSkinCfg.id);
        this._wifeId = wifeCfg.id;
        this._wifeSkinId = id;
        this._shimmer = BaseLoadBitmap.create("specialview_effect_purple");
        this._shimmer.width = 320;
        this._shimmer.height = 413;
        this._shimmer.anchorOffsetX = this._shimmer.width / 2;
        this._shimmer.anchorOffsetY = this._shimmer.height / 2;
        this._shimmer.setScale(2);
        this._shimmer.setPosition(GameConfig.stageWidth / 2, GameConfig.stageHeigth - 492);
        this._container.addChild(this._shimmer);
        this._shimmer.alpha = 0;
        this._thorn1 = BaseLoadBitmap.create("specialview_effect_purplethorn");
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
        this._thorn2 = BaseLoadBitmap.create("specialview_effect_purplethorn");
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
        if (wifeSkinCfg && wifeSkinCfg.bone) {
            boneName = wifeSkinCfg.bone + "_ske";
        }
        if ((!Api.switchVoApi.checkCloseBone()) && boneName && RES.hasRes(boneName) && App.CommonUtil.check_dragon() && Api.wifeVoApi.isHaveBone(boneName)) {
            this._wifeSkinDragonBones = App.DragonBonesUtil.getLoadDragonBones(wifeSkinCfg.bone);
            this._wifeSkinDragonBones.setScale(0.93);
            this._wifeSkinDragonBones.setPosition(GameConfig.stageWidth / 2, GameConfig.stageHeigth - 250);
            this._container.addChild(this._wifeSkinDragonBones);
        }
        else {
            this._wifeSkinImg = BaseLoadBitmap.create(wifeSkinCfg.body);
            this._wifeSkinImg.width = 640;
            this._wifeSkinImg.height = 840;
            this._wifeSkinImg.anchorOffsetY = this._wifeSkinImg.height;
            this._wifeSkinImg.anchorOffsetX = this._wifeSkinImg.width / 2;
            this._wifeSkinImg.setScale(0.6);
            this._wifeSkinImg.setPosition(GameConfig.stageWidth / 2, GameConfig.stageHeigth - 250);
            this._container.addChild(this._wifeSkinImg);
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
        this._buttombg = BaseLoadBitmap.create("specialview_buttombg2");
        this._buttombg.width = 640;
        this._buttombg.height = 252;
        this._buttombg.setPosition(0, GameConfig.stageHeigth - this._buttombg.height - 60 - 20);
        this._buttomContainer.addChild(this._buttombg);
        this._namebg = BaseBitmap.create("specialview_commoni_namebg");
        this._nameTF = ComponentManager.getTextField(LanguageManager.getlocal(wifeSkinCfg.isBlueSkin ? "wifeName_" + wifeCfg.id + "_male" : "wifeName_" + wifeCfg.id), TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._namebg.width = this._nameTF.width + 30;
        this._namebg.setPosition(this._buttombg.x + this._buttombg.width / 2 - this._namebg.width / 2, this._buttombg.y - this._namebg.height - 10);
        this._nameContainer.addChild(this._namebg);
        this._nameTF.setPosition(this._namebg.x + this._namebg.width / 2 - this._nameTF.width / 2, this._namebg.y + this._namebg.height / 2 - this._nameTF.height / 2);
        this._nameContainer.addChild(this._nameTF);
        var group = new BaseDisplayObjectContainer();
        group.width = this._buttombg.width;
        this._buttomContainer.addChild(group);
        var infoSize = TextFieldConst.FONTSIZE_BUTTON_COMMON;
        if (PlatformManager.checkIsThSp() && String(id) == "2241") {
            infoSize = 20;
        }
        var offsetY = 0;
        for (var i = 0; i < wifeInfo.length; i++) {
            var wifeInfoTF = ComponentManager.getTextField(wifeInfo[i], infoSize, TextFieldConst.COLOR_LIGHT_YELLOW);
            if (i % 2 == 0) {
                wifeInfoTF.x = 60;
                if (PlatformManager.checkIsRuLang() || PlatformManager.checkIsPtLang() || PlatformManager.checkIsThSp()) {
                    wifeInfoTF.x = 40;
                }
            }
            else {
                wifeInfoTF.x = 340;
                if (PlatformManager.checkIsRuLang() || PlatformManager.checkIsPtLang() || PlatformManager.checkIsThSp()) {
                    wifeInfoTF.x = 350;
                }
            }
            wifeInfoTF.y = Math.floor(i / 2) * 40 + 5;
            group.addChild(wifeInfoTF);
            this._wifeInfoTFList.push(wifeInfoTF);
            offsetY = wifeInfoTF.y;
        }
        var mask = BaseBitmap.create("public_alpha");
        mask.width = group.width;
        mask.height = group.height;
        group.addChildAt(mask, 0);
        var scrollview = ComponentManager.getScrollView(group, new egret.Rectangle(0, 0, this._buttombg.width, 125));
        this._buttomContainer.addChild(scrollview);
        scrollview.x = this._buttombg.x;
        scrollview.y = this._buttombg.y + 75;
        this._buttomDescTF = ComponentManager.getTextField(LanguageManager.getlocal("special16GetViewButtomDesc"), TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_WARN_GREEN);
        this._buttomDescTF.setPosition(this._buttombg.x + this._buttombg.width / 2 - this._buttomDescTF.width / 2, scrollview.y + scrollview.height + 10);
        this._buttomContainer.addChild(this._buttomDescTF);
        this._titleTF = ComponentManager.getTextField(LanguageManager.getlocal("skinName" + wifeSkinCfg.id), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
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
    Special16GetView.prototype.refreashView = function (id) {
        if (String(id) == "3101") {
            PlatformManager.analyticsByHyKey("achieved_7days_login_beauty_suit");
            this._isHas3101 = true;
        }
        var wifeSkinCfg = Config.WifeskinCfg.getWifeCfgById(id);
        var wifeCfg = Config.WifeCfg.getWifeCfgById(wifeSkinCfg.wifeId);
        var wifeInfo = this.dealAttrChangeInfo(wifeSkinCfg.id);
        this._wifeId = wifeCfg.id;
        this._wifeSkinId = id;
        var boneName = "";
        if (wifeSkinCfg && wifeSkinCfg.bone) {
            boneName = wifeSkinCfg.bone + "_ske";
        }
        var depth = 0;
        if ((!Api.switchVoApi.checkCloseBone()) && boneName && RES.hasRes(boneName) && App.CommonUtil.check_dragon() && Api.wifeVoApi.isHaveBone(boneName)) {
            if (this._wifeSkinDragonBones) {
                depth = this._container.getChildIndex(this._wifeSkinDragonBones);
                this._container.removeChild(this._wifeSkinDragonBones);
                this._wifeSkinDragonBones.dispose();
                this._wifeSkinDragonBones = null;
            }
            if (this._wifeSkinImg) {
                depth = this._container.getChildIndex(this._wifeSkinImg);
                this._container.removeChild(this._wifeSkinImg);
                this._wifeSkinImg.dispose();
                this._wifeSkinImg = null;
            }
            this._wifeSkinDragonBones = App.DragonBonesUtil.getLoadDragonBones(wifeSkinCfg.bone);
            this._wifeSkinDragonBones.setScale(0.93);
            this._wifeSkinDragonBones.setPosition(GameConfig.stageWidth / 2, GameConfig.stageHeigth - 250);
            this._container.addChildAt(this._wifeSkinDragonBones, depth);
        }
        else {
            if (this._wifeSkinDragonBones) {
                depth = this._container.getChildIndex(this._wifeSkinDragonBones);
                this._container.removeChild(this._wifeSkinDragonBones);
                this._wifeSkinDragonBones.dispose();
                this._wifeSkinDragonBones = null;
            }
            if (this._wifeSkinImg) {
                this._wifeSkinImg.setload(wifeSkinCfg.body);
            }
            else {
                this._wifeSkinImg = BaseLoadBitmap.create(wifeSkinCfg.body);
                this._wifeSkinImg.width = 640;
                this._wifeSkinImg.height = 840;
                this._wifeSkinImg.anchorOffsetY = this._wifeSkinImg.height;
                this._wifeSkinImg.anchorOffsetX = this._wifeSkinImg.width / 2;
                this._wifeSkinImg.setScale(0.6);
                this._wifeSkinImg.setPosition(GameConfig.stageWidth / 2, GameConfig.stageHeigth - 250);
                this._container.addChildAt(this._wifeSkinImg, depth);
            }
        }
        this._nameTF.text = wifeCfg.name;
        this._namebg.width = this._nameTF.width + 30;
        this._namebg.setPosition(this._buttombg.x + this._buttombg.width / 2 - this._namebg.width / 2, this._buttombg.y - this._namebg.height - 10);
        this._nameTF.setPosition(this._namebg.x + this._namebg.width / 2 - this._nameTF.width / 2, this._namebg.y + this._namebg.height / 2 - this._nameTF.height / 2);
        for (var i = 0; i < wifeInfo.length; i++) {
            this._wifeInfoTFList[i].text = wifeInfo[i];
        }
        this._titleTF.text = LanguageManager.getlocal("skinName" + wifeSkinCfg.id);
        this._titleTF.setPosition(this._buttombg.x + this._buttombg.width / 2 - this._titleTF.width / 2, this._buttombg.y + 35 - this._titleTF.height / 2);
        this._titleTFLine.width = 281 + this._titleTF.width;
        this._titleTFLine.setPosition(this._buttombg.x + this._buttombg.width / 2 - this._titleTFLine.width / 2, this._titleTF.y + this._titleTF.height / 2 - this._titleTFLine.height / 2);
        if (this._golookInfoBtn) {
            // this.setgolookPos(this._buttombg.x + this._buttombg.width - this._golookInfoBtn.width - 10, this._buttombg.y - this._golookInfoBtn.height - 17);
            this.setgolookPos(this._buttombg.x + this._buttombg.width / 2 - this._golookInfoBtn.width / 2, this._buttombg.y + this._buttombg.height + 10);
        }
        this.playAni();
    };
    Special16GetView.prototype.playAni = function () {
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
        if (this._wifeSkinImg) {
            this._wifeSkinImg.alpha = 0;
            egret.Tween.get(this._wifeSkinImg).wait(500).to({ alpha: 1 }, 100).call(function () {
                egret.Tween.removeTweens(_this._wifeSkinImg);
            }, this);
        }
        else {
            this._wifeSkinDragonBones.alpha = 0;
            egret.Tween.get(this._wifeSkinDragonBones).wait(500).to({ alpha: 1 }, 100).call(function () {
                egret.Tween.removeTweens(_this._wifeSkinDragonBones);
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
    Special16GetView.prototype.golookInfoBtnClick = function () {
        // if(this._wifeSkinDragonBones)
        // {
        //     this._wifeSkinDragonBones.stop()
        // }
        var id = this._wifeId;
        var wifeSkinId = this._wifeSkinId;
        // this.callBack();
        // ViewController.getInstance().openView(ViewConst.COMMON.WIFEOPTVIEW, { id: id, wifeSkinId: wifeSkinId, confirmCallback: null, handler: null });
        NetManager.request(NetRequestConst.REQUEST_WIFE_READSKINRED, { wifeId: String(id), wifeSkinId: wifeSkinId });
    };
    /**
     * 红颜加成的属性
     */
    Special16GetView.prototype.dealAttrChangeInfo = function (skinId) {
        var skinCfg = Config.WifeskinCfg.getWifeCfgById(skinId);
        var resultStr = [];
        var atkAdd = skinCfg.atkAdd; //武力
        var inteAdd = skinCfg.inteAdd; //智力
        var politicsAdd = skinCfg.politicsAdd; //政治
        var charmAdd = skinCfg.charmAdd; //魅力
        var wifeIntimacy = skinCfg.wifeIntimacy; //佳人亲密
        var wifeGlamour = skinCfg.wifeGlamour; //佳人魅力
        var atkAdd2 = skinCfg.atkAdd2;
        var inteAdd2 = skinCfg.inteAdd2;
        var politicsAdd2 = skinCfg.politicsAdd2;
        var charmAdd2 = skinCfg.charmAdd2;
        if (atkAdd) {
            if (atkAdd[0] == 1) {
                resultStr.push(LanguageManager.getlocal("acTailAttrAdd1", [atkAdd[1]]));
            }
            else if (atkAdd[0] == 2) {
                resultStr.push(LanguageManager.getlocal("acTailAttrAdd1", [atkAdd[1] * 100 + "%"]));
            }
            else if (atkAdd[0] == 3) {
                resultStr.push(LanguageManager.getlocal("acTailAttrAdd14", [atkAdd[1]]));
            }
            else if (atkAdd[0] == 4) {
                resultStr.push(LanguageManager.getlocal("acTailAttrAdd14", [atkAdd[1] * 100 + "%"]));
            }
        }
        if (inteAdd) {
            if (inteAdd[0] == 1) {
                resultStr.push(LanguageManager.getlocal("acTailAttrAdd2", [inteAdd[1]]));
            }
            else if (inteAdd[0] == 2) {
                resultStr.push(LanguageManager.getlocal("acTailAttrAdd2", [inteAdd[1] * 100 + "%"]));
            }
            else if (inteAdd[0] == 3) {
                resultStr.push(LanguageManager.getlocal("acTailAttrAdd15", [inteAdd[1]]));
            }
            else if (inteAdd[0] == 4) {
                resultStr.push(LanguageManager.getlocal("acTailAttrAdd15", [inteAdd[1] * 100 + "%"]));
            }
        }
        if (politicsAdd) {
            if (politicsAdd[0] == 1) {
                resultStr.push(LanguageManager.getlocal("acTailAttrAdd3", [politicsAdd[1]]));
            }
            else if (politicsAdd[0] == 2) {
                resultStr.push(LanguageManager.getlocal("acTailAttrAdd3", [politicsAdd[1] * 100 + "%"]));
            }
            else if (politicsAdd[0] == 3) {
                resultStr.push(LanguageManager.getlocal("acTailAttrAdd16", [politicsAdd[1]]));
            }
            else if (politicsAdd[0] == 4) {
                resultStr.push(LanguageManager.getlocal("acTailAttrAdd16", [politicsAdd[1] * 100 + "%"]));
            }
        }
        if (charmAdd) {
            if (charmAdd[0] == 1) {
                resultStr.push(LanguageManager.getlocal("acTailAttrAdd4", [charmAdd[1]]));
            }
            else if (charmAdd[0] == 2) {
                resultStr.push(LanguageManager.getlocal("acTailAttrAdd4", [charmAdd[1] * 100 + "%"]));
            }
            else if (charmAdd[0] == 3) {
                resultStr.push(LanguageManager.getlocal("acTailAttrAdd17", [charmAdd[1]]));
            }
            else if (charmAdd[0] == 4) {
                resultStr.push(LanguageManager.getlocal("acTailAttrAdd17", [charmAdd[1] * 100 + "%"]));
            }
        }
        var wifeCfg = Config.WifeCfg.getWifeCfgById(skinCfg.wifeId);
        var servantName = LanguageManager.getlocal("servant_name" + wifeCfg.servantId);
        if (atkAdd2) {
            if (atkAdd2[0] == 1) {
                resultStr.push(LanguageManager.getlocal("acTailAttrAdd10", [servantName, atkAdd2[1]]));
            }
            else {
                resultStr.push(LanguageManager.getlocal("acTailAttrAdd10", [servantName, atkAdd2[1] * 100 + "%"]));
            }
        }
        if (inteAdd2) {
            if (inteAdd2[0] == 1) {
                resultStr.push(LanguageManager.getlocal("acTailAttrAdd11", [servantName, inteAdd2[1]]));
            }
            else {
                resultStr.push(LanguageManager.getlocal("acTailAttrAdd11", [servantName, inteAdd2[1] * 100 + "%"]));
            }
        }
        if (politicsAdd2) {
            if (politicsAdd2[0] == 1) {
                resultStr.push(LanguageManager.getlocal("acTailAttrAdd12", [servantName, politicsAdd2[1]]));
            }
            else {
                resultStr.push(LanguageManager.getlocal("acTailAttrAdd12", [servantName, politicsAdd2[1] * 100 + "%"]));
            }
        }
        if (charmAdd2) {
            if (charmAdd2[0] == 1) {
                resultStr.push(LanguageManager.getlocal("acTailAttrAdd13", [servantName, charmAdd2[1]]));
            }
            else {
                resultStr.push(LanguageManager.getlocal("acTailAttrAdd13", [servantName, charmAdd2[1] * 100 + "%"]));
            }
        }
        if (wifeIntimacy && wifeIntimacy > 0) {
            resultStr.push(LanguageManager.getlocal("acTailAttrAdd5", [wifeIntimacy.toString()]));
        }
        if (wifeGlamour && wifeGlamour > 0) {
            resultStr.push(LanguageManager.getlocal("acTailAttrAdd6", [wifeGlamour.toString()]));
        }
        return resultStr;
    };
    Special16GetView.prototype.redSkinHandle = function (event) {
        if (event.data.ret) {
            var id = this._wifeId;
            var wifeSkinId = this._wifeSkinId;
            this.callBack();
            ViewController.getInstance().openView(ViewConst.COMMON.WIFEOPTVIEW, { id: id, wifeSkinId: wifeSkinId, confirmCallback: null, handler: null });
        }
    };
    Special16GetView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "specialview_commoni_namebg"
        ]);
    };
    Special16GetView.prototype.isShowBtn = function () {
        if (this.param.data) {
            var wifeSkinCfg = Config.WifeskinCfg.getWifeCfgById(this.param.data.id);
            var wifeVo = Api.wifeVoApi.getWifeInfoVoById(wifeSkinCfg.wifeId);
            var wifeCfg = Config.WifeCfg.getWifeCfgById(wifeSkinCfg.wifeId);
            if (!wifeVo) {
                return false;
            }
            if (!(wifeSkinCfg.isBlue == 1 && wifeCfg.isBule() || wifeSkinCfg.isBlue == 0 && !wifeCfg.isBule())) {
                return false;
            }
        }
        return true;
    };
    Special16GetView.prototype.hide = function () {
        if (this._isHas3101) {
            PlatformManager.openAppStoreScore();
        }
        _super.prototype.hide.call(this);
    };
    Special16GetView.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_WIFE_READSKINRED, this.redSkinHandle, this);
        egret.Tween.removeTweens(this._shimmer);
        egret.Tween.removeTweens(this._thorn1);
        egret.Tween.removeTweens(this._thorn2);
        egret.Tween.removeTweens(this._nameContainer);
        egret.Tween.removeTweens(this._buttomContainer);
        this._buttomContainer = null;
        this._nameContainer = null;
        this._buttombg = null;
        this._sceneDescTF = null;
        this._titleTF = null;
        this._titleTFLine = null;
        this._wifeSkinDragonBones = null;
        this._wifeSkinImg = null;
        this._wifeInfoTFList = [];
        this._buttomDescTF = null;
        this._nameTF = null;
        this._namebg = null;
        this._shimmer = null;
        this._thorn1 = null;
        this._thorn2 = null;
        this._wifeId = null;
        this._isHas3101 = false;
        this._wifeSkinId = null;
        _super.prototype.dispose.call(this);
    };
    return Special16GetView;
}(SpecialBaseView));
__reflect(Special16GetView.prototype, "Special16GetView");
//# sourceMappingURL=Special16GetView.js.map