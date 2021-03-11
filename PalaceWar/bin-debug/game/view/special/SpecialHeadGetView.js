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
 * 特殊奖励--头像
 * @author 张朝阳
 * date 2019/7/17
 * @class SpecialHeadGetView
 */
var SpecialHeadGetView = (function (_super) {
    __extends(SpecialHeadGetView, _super);
    function SpecialHeadGetView() {
        var _this = _super.call(this) || this;
        _this._headPortrait = null;
        _this._buttombg = null;
        _this._titleTF = null;
        _this._titleTFLine = null;
        _this._titleInfoTFList = [];
        _this._buttomContainer = null;
        _this._headPortraitContainer = null;
        _this._titleId = null;
        return _this;
    }
    /**创建view */
    SpecialHeadGetView.prototype.createView = function (id) {
        var titlecfg = Config.TitleCfg.getTitleCfgById(id);
        this._titleId = id;
        this._headPortraitContainer = new BaseDisplayObjectContainer();
        this._container.addChild(this._headPortraitContainer);
        this.playHeadEffect(id);
        var titleInfo = this.dealAttrChangeInfo(titlecfg);
        this._buttomContainer = new BaseDisplayObjectContainer();
        this._buttomContainer.width = 640;
        this._buttomContainer.anchorOffsetX = this._buttomContainer.width / 2;
        this._buttomContainer.x = 320;
        this._container.addChild(this._buttomContainer);
        this._buttombg = BaseLoadBitmap.create("specialview_buttombg1");
        this._buttombg.width = 640;
        this._buttombg.height = 222;
        this._buttombg.setPosition(0, GameConfig.stageHeigth - 390);
        this._buttomContainer.addChild(this._buttombg);
        for (var i = 0; i < titleInfo.length; i++) {
            var titleInfoTF = ComponentManager.getTextField(titleInfo[i], TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
            if (i % 2 == 0) {
                titleInfoTF.x = this._buttombg.x + 100;
            }
            else {
                titleInfoTF.x = this._buttombg.x + 340;
            }
            titleInfoTF.y = this._buttombg.y + 85 + Math.floor(i / 2) * 50;
            this._buttomContainer.addChild(titleInfoTF);
            this._titleInfoTFList.push(titleInfoTF);
        }
        this._titleTF = ComponentManager.getTextField(titlecfg.name, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
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
    SpecialHeadGetView.prototype.refreashView = function (id) {
        var titlecfg = Config.TitleCfg.getTitleCfgById(id);
        this._titleId = id;
        var titleInfo = this.dealAttrChangeInfo(titlecfg);
        var depth = 0;
        if (this._headPortrait) {
            depth = this._headPortraitContainer.getChildIndex(this._headPortrait);
            this._headPortraitContainer.removeChild(this._headPortrait);
            this._headPortrait.dispose();
            this._headPortrait = null;
            this._headPortrait = Api.playerVoApi.getPlayerCircleHead(Number(titlecfg.id));
            this._headPortrait.setPosition(GameConfig.stageWidth / 2 - this._headPortrait.width / 2 + 5, GameConfig.stageHeigth - this._headPortrait.height / 2 - 653);
            this._headPortraitContainer.addChildAt(this._headPortrait, depth);
        }
        for (var i = 0; i < titleInfo.length; i++) {
            this._titleInfoTFList[i].text = titleInfo[i];
        }
        this._titleTF.text = titlecfg.name;
        this._titleTF.setPosition(this._buttombg.x + this._buttombg.width / 2 - this._titleTF.width / 2, this._buttombg.y + 35 - this._titleTF.height / 2);
        this._titleTFLine.width = 281 + this._titleTF.width;
        this._titleTFLine.setPosition(this._buttombg.x + this._buttombg.width / 2 - this._titleTFLine.width / 2, this._titleTF.y + this._titleTF.height / 2 - this._titleTFLine.height / 2);
        if (this._golookInfoBtn) {
            // this.setgolookPos(this._buttombg.x + this._buttombg.width - this._golookInfoBtn.width - 10, this._buttombg.y - this._golookInfoBtn.height - 17);
            this.setgolookPos(this._buttombg.x + this._buttombg.width / 2 - this._golookInfoBtn.width / 2, this._buttombg.y + this._buttombg.height + 10);
        }
        this.playAni();
    };
    SpecialHeadGetView.prototype.playAni = function () {
        var _this = this;
        _super.prototype.playAni.call(this);
        this._buttomContainer.scaleX = 0;
        this._headPortraitContainer.alpha = 0;
        egret.Tween.get(this._buttomContainer).to({ scaleX: 1 }, 350).call(function () {
            egret.Tween.removeTweens(_this._buttomContainer);
        }, this);
        egret.Tween.get(this._headPortraitContainer).wait(500).to({ alpha: 1 }, 100).call(function () {
            egret.Tween.removeTweens(_this._headPortraitContainer);
        }, this);
    };
    SpecialHeadGetView.prototype.dealAttrChangeInfo = function (titlecfg) {
        var titleInfoList = [];
        for (var i = 1; i <= 4; i++) {
            var str = "";
            if (titlecfg.effect1) {
                str = LanguageManager.getlocal("SpecialHeadPortraitGetViewDesc" + i, [String(titlecfg.effect1)]);
            }
            else if (titlecfg.effect2) {
                str = LanguageManager.getlocal("SpecialHeadPortraitGetViewDesc" + i, [String(titlecfg.effect1 * 100) + "%"]);
            }
            titleInfoList.push(str);
        }
        return titleInfoList;
    };
    /**特效 */
    SpecialHeadGetView.prototype.playHeadEffect = function (id) {
        var titlecfg = Config.TitleCfg.getTitleCfgById(id);
        //头像的bg
        var headbg = BaseLoadBitmap.create("acluckycarpheadbg-1");
        headbg.width = 351;
        headbg.height = 336;
        // let headbgPosY = titlebg.y + titlebg.height + ((buttombg.y - titlebg.y - titlebg.height) / 2) - headbg.height / 2;
        headbg.setPosition(GameConfig.stageWidth / 2 - headbg.width / 2, GameConfig.stageHeigth - headbg.height - 500);
        //光1
        var effectLight1 = BaseLoadBitmap.create("acluckycarpview_effect_light1");
        effectLight1.width = 293;
        effectLight1.height = 295;
        effectLight1.anchorOffsetX = effectLight1.width / 2;
        effectLight1.anchorOffsetY = effectLight1.height / 2;
        effectLight1.setPosition(headbg.x + headbg.width / 2, headbg.y + headbg.height / 2);
        this._headPortraitContainer.addChild(effectLight1);
        egret.Tween.get(effectLight1, { loop: true }).to({ rotation: 360 }, 19000).call(function () {
            effectLight1.rotation = 0;
        }, this);
        effectLight1.blendMode = egret.BlendMode.ADD;
        //光2
        var effectLight2 = BaseLoadBitmap.create("acluckycarpview_effect_light2");
        effectLight2.width = 293;
        effectLight2.height = 295;
        effectLight2.anchorOffsetX = effectLight2.width / 2;
        effectLight2.anchorOffsetY = effectLight2.height / 2;
        effectLight2.setPosition(headbg.x + headbg.width / 2, headbg.y + headbg.height / 2);
        this._headPortraitContainer.addChild(effectLight2);
        egret.Tween.get(effectLight2, { loop: true }).to({ rotation: -360 }, 19000).call(function () {
            effectLight2.rotation = 0;
        }, this);
        effectLight2.blendMode = egret.BlendMode.ADD;
        this._headPortraitContainer.addChild(headbg);
        //头像
        this._headPortrait = Api.playerVoApi.getPlayerCircleHead(Number(titlecfg.id));
        this._headPortrait.setPosition(GameConfig.stageWidth / 2 - this._headPortrait.width / 2 + 5, GameConfig.stageHeigth - this._headPortrait.height / 2 - 653); //+ headbg.height / 2
        this._headPortraitContainer.addChild(this._headPortrait);
        //光环
        var effectCircle = BaseLoadBitmap.create("acluckycarpview_effect_circle");
        effectCircle.width = 174;
        effectCircle.height = 166;
        effectCircle.anchorOffsetX = effectCircle.width / 2;
        effectCircle.anchorOffsetY = effectCircle.height / 2;
        effectCircle.setPosition(headbg.x + headbg.width / 2, headbg.y + headbg.height / 2 + 18);
        this._headPortraitContainer.addChild(effectCircle);
        egret.Tween.get(effectCircle, { loop: true }).to({ rotation: -360 }, 4000).call(function () {
            effectCircle.rotation = 0;
        }, this);
        effectCircle.blendMode = egret.BlendMode.ADD;
        var effectContainer = new BaseDisplayObjectContainer();
        this._headPortraitContainer.addChild(effectContainer);
        effectContainer.width = 174;
        effectContainer.height = 166;
        effectContainer.anchorOffsetX = effectContainer.width / 2;
        effectContainer.anchorOffsetY = effectContainer.height / 2;
        effectContainer.setPosition(headbg.x + headbg.width / 2, headbg.y + headbg.height / 2 + 18);
        egret.Tween.get(effectContainer, { loop: true }).to({ rotation: 360 }, 7500).call(function () {
            effectContainer.rotation = 0;
        }, this);
        var effectPoint1 = BaseBitmap.create("acluckycarpview_effect_lightpoint");
        effectPoint1.anchorOffsetX = effectPoint1.width / 2;
        effectPoint1.anchorOffsetY = effectPoint1.height / 2;
        effectPoint1.setPosition(20, 83);
        effectContainer.addChild(effectPoint1);
        egret.Tween.get(effectPoint1, { loop: true }).to({ rotation: 360 }, 8000).call(function () {
            effectPoint1.rotation = 0;
        }, this);
        effectPoint1.blendMode = egret.BlendMode.ADD;
        var effectPoint2 = BaseBitmap.create("acluckycarpview_effect_lightpoint");
        effectPoint2.anchorOffsetX = effectPoint2.width / 2;
        effectPoint2.anchorOffsetY = effectPoint2.height / 2;
        effectPoint2.setPosition(154, 83);
        effectContainer.addChild(effectPoint2);
        egret.Tween.get(effectPoint2, { loop: true }).to({ rotation: 360 }, 8000).call(function () {
            effectPoint2.rotation = 0;
        }, this);
        effectPoint2.blendMode = egret.BlendMode.ADD;
    };
    SpecialHeadGetView.prototype.golookInfoBtnClick = function () {
        var titleId = this._titleId;
        var idx = 0;
        var allVoList = Api.itemVoApi.getTitleVoListByType(4);
        var titleTypes = [];
        var type = null;
        for (var k in allVoList) {
            var typeKey = allVoList[k].titleKey;
            if (!GameData.isInArray(typeKey, titleTypes)) {
                titleTypes.push(typeKey);
            }
            if (allVoList[k].id == titleId) {
                type = typeKey;
            }
        }
        GameData.arrayPutItemLast("5", titleTypes);
        GameData.arrayPutItemLast("7", titleTypes);
        GameData.arrayPutItemLast("8", titleTypes);
        for (var k in titleTypes) {
            if (titleTypes[k] == type) {
                idx = Number(k);
            }
        }
        this.callBack();
        var openview = ViewController.getInstance().getView(ViewConst.COMMON.ITEMVIEW_TAB4);
        if (openview && openview.isShow()) {
        }
        else {
            ViewController.getInstance().openView(ViewConst.COMMON.ITEMVIEW_TAB4, { titleId: titleId, idx: idx });
        }
    };
    SpecialHeadGetView.prototype.isShowBtn = function () {
        return true;
    };
    SpecialHeadGetView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "acluckycarpview_effect_lightpoint"
        ]);
    };
    SpecialHeadGetView.prototype.dispose = function () {
        egret.Tween.removeTweens(this._headPortraitContainer);
        egret.Tween.removeTweens(this._buttomContainer);
        this._buttomContainer = null;
        this._headPortraitContainer = null;
        this._headPortrait = null;
        this._buttombg = null;
        this._titleTF = null;
        this._titleTFLine = null;
        this._titleInfoTFList = [];
        this._titleId = null;
        _super.prototype.dispose.call(this);
    };
    return SpecialHeadGetView;
}(SpecialBaseView));
__reflect(SpecialHeadGetView.prototype, "SpecialHeadGetView");
//# sourceMappingURL=SpecialHeadGetView.js.map