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
 * 特殊奖励--聊天框
 * @author yangchengguo
 * date 2019.9.6
 * @class SpecialChatBoxGetView
 */
var SpecialChatBoxGetView = (function (_super) {
    __extends(SpecialChatBoxGetView, _super);
    function SpecialChatBoxGetView() {
        var _this = _super.call(this) || this;
        _this._smallThorn1 = null;
        _this._smallThorn2 = null;
        _this._sweepLight1 = null;
        _this._sweepLight2 = null;
        _this._textLight1 = null;
        _this._textLight2 = null;
        _this._titleBM = null;
        _this._titleEffectBM = null;
        _this._buttombg = null;
        _this._titleTF = null;
        _this._titleTFLine = null;
        _this._titleInfoTFList = [];
        _this._buttomContainer = null;
        _this._titleId = null;
        return _this;
    }
    SpecialChatBoxGetView.prototype.createView = function (id) {
        var _this = this;
        var titlecfg = Config.TitleCfg.getTitleCfgById(id);
        this._titleId = id;
        this._smallThorn1 = BaseLoadBitmap.create("specialview_effect_smallyellowthorn");
        this._smallThorn1.width = 250;
        this._smallThorn1.height = 265;
        this._smallThorn1.anchorOffsetX = this._smallThorn1.width / 2;
        this._smallThorn1.anchorOffsetY = this._smallThorn1.height / 2;
        this._smallThorn1.setPosition(GameConfig.stageWidth / 2, 370);
        this._smallThorn1.blendMode = egret.BlendMode.ADD;
        this.addChildToContainer(this._smallThorn1);
        this._smallThorn2 = BaseLoadBitmap.create("specialview_effect_smallyellowthorn");
        this._smallThorn2.width = 250;
        this._smallThorn2.height = 265;
        this._smallThorn2.anchorOffsetX = this._smallThorn2.width / 2;
        this._smallThorn2.anchorOffsetY = this._smallThorn2.height / 2;
        this._smallThorn2.setPosition(this._smallThorn1.x, this._smallThorn1.y);
        this._smallThorn2.blendMode = egret.BlendMode.ADD;
        this.addChildToContainer(this._smallThorn2);
        this._sweepLight1 = BaseLoadBitmap.create("specialview_effect_sweeplight");
        this._sweepLight1.width = 230;
        this._sweepLight1.height = 70;
        this._sweepLight1.anchorOffsetX = 0;
        this._sweepLight1.anchorOffsetY = this._sweepLight1.height / 2;
        this._sweepLight1.setPosition(this._smallThorn1.x - this._sweepLight1.width / 2, this._smallThorn1.y);
        this._sweepLight1.blendMode = egret.BlendMode.ADD;
        this.addChildToContainer(this._sweepLight1);
        this._sweepLight2 = BaseLoadBitmap.create("specialview_effect_sweeplight");
        this._sweepLight2.width = 230;
        this._sweepLight2.height = 70;
        this._sweepLight2.anchorOffsetX = this._sweepLight1.width;
        this._sweepLight2.anchorOffsetY = this._sweepLight2.height / 2;
        this._sweepLight2.skewX = 180;
        this._sweepLight2.setPosition(this._smallThorn1.x + this._sweepLight2.width / 2, this._smallThorn1.y);
        this._sweepLight2.blendMode = egret.BlendMode.ADD;
        this.addChildToContainer(this._sweepLight2);
        this._titleBM = BaseLoadBitmap.create(titlecfg.icon, null, {
            callback: function () {
                _this._titleBM.anchorOffsetX = _this._titleBM.width / 2;
                _this._titleBM.anchorOffsetY = _this._titleBM.height / 2;
                _this._titleBM.setScale(2);
                _this._titleBM.setPosition(_this._smallThorn1.x, _this._smallThorn1.y);
            }, callbackThisObj: this, callbackParams: null
        });
        this.addChildToContainer(this._titleBM);
        this._titleEffectBM = BaseLoadBitmap.create(titlecfg.icon, null, {
            callback: function () {
                _this._titleEffectBM.anchorOffsetX = _this._titleEffectBM.width / 2;
                _this._titleEffectBM.anchorOffsetY = _this._titleEffectBM.height / 2;
                _this._titleEffectBM.setScale(2);
                _this._titleEffectBM.setPosition(_this._smallThorn1.x, _this._smallThorn1.y);
                _this._titleEffectBM.blendMode = egret.BlendMode.ADD;
            }, callbackThisObj: this, callbackParams: null
        });
        this.addChildToContainer(this._titleEffectBM);
        this._textLight1 = BaseLoadBitmap.create("specialview_effect_textlight");
        this._textLight1.width = 367;
        this._textLight1.height = 164;
        this._textLight1.anchorOffsetX = this._textLight1.width / 2;
        this._textLight1.anchorOffsetY = this._textLight1.height / 2;
        this._textLight1.setPosition(this._smallThorn1.x - 75, this._sweepLight1.y - this._sweepLight1.height / 2 - 4); //x - 66 
        this._textLight1.blendMode = egret.BlendMode.ADD;
        this.addChildToContainer(this._textLight1);
        this._textLight2 = BaseLoadBitmap.create("specialview_effect_textlight");
        this._textLight2.width = 367;
        this._textLight2.height = 164;
        this._textLight2.anchorOffsetX = this._textLight2.width / 2;
        this._textLight2.anchorOffsetY = this._textLight2.height / 2;
        this._textLight2.setPosition(this._smallThorn1.x + 86, this._sweepLight2.y + this._sweepLight2.height / 2 + 4);
        this._textLight2.blendMode = egret.BlendMode.ADD;
        this.addChildToContainer(this._textLight2);
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
            this.setgolookPos(this._buttombg.x + this._buttombg.width / 2 - this._golookInfoBtn.width / 2, this._buttombg.y + this._buttombg.height + 10);
        }
        this.playAni();
    };
    SpecialChatBoxGetView.prototype.refreashView = function (id) {
        var titlecfg = Config.TitleCfg.getTitleCfgById(id);
        this._titleId = id;
        var titleInfo = this.dealAttrChangeInfo(titlecfg);
        this._titleBM.setload(titlecfg.icon);
        this._titleEffectBM.setload(titlecfg.icon);
        for (var i = 0; i < titleInfo.length; i++) {
            this._titleInfoTFList[i].text = titleInfo[i];
        }
        this._titleTF.text = titlecfg.name;
        this._titleTF.setPosition(this._buttombg.x + this._buttombg.width / 2 - this._titleTF.width / 2, this._buttombg.y + 35 - this._titleTF.height / 2);
        this._titleTFLine.width = 281 + this._titleTF.width;
        this._titleTFLine.setPosition(this._buttombg.x + this._buttombg.width / 2 - this._titleTFLine.width / 2, this._titleTF.y + this._titleTF.height / 2 - this._titleTFLine.height / 2);
        if (this._golookInfoBtn) {
            this.setgolookPos(this._buttombg.x + this._buttombg.width / 2 - this._golookInfoBtn.width / 2, this._buttombg.y + this._buttombg.height + 10);
        }
        this.playAni();
    };
    SpecialChatBoxGetView.prototype.dealAttrChangeInfo = function (titlecfg) {
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
    SpecialChatBoxGetView.prototype.playAni = function () {
        var _this = this;
        _super.prototype.playAni.call(this);
        this._smallThorn1.setScale(0);
        this._smallThorn1.setScale(0);
        this._titleBM.scaleX = 0;
        this._titleEffectBM.scaleX = 0;
        this._titleEffectBM.alpha = 0;
        this._textLight1.alpha = 0;
        this._textLight1.setScale(1);
        this._textLight2.alpha = 0;
        this._textLight2.setScale(1);
        this._sweepLight1.setPosition(this._smallThorn1.x - this._sweepLight1.width / 2 - 162, this._smallThorn1.y);
        this._sweepLight2.setPosition(this._smallThorn1.x + this._sweepLight2.width / 2 + 162, this._smallThorn1.y);
        egret.Tween.removeTweens(this._smallThorn1);
        egret.Tween.removeTweens(this._smallThorn2);
        egret.Tween.removeTweens(this._titleBM);
        egret.Tween.removeTweens(this._titleEffectBM);
        egret.Tween.removeTweens(this._textLight1);
        egret.Tween.removeTweens(this._textLight2);
        egret.Tween.removeTweens(this._sweepLight1);
        egret.Tween.removeTweens(this._sweepLight2);
        egret.Tween.removeTweens(this._buttomContainer);
        egret.Tween.get(this._smallThorn1).to({ scaleX: 1.4, scaleY: 1.4 }, 500).call(function () {
            egret.Tween.removeTweens(_this._smallThorn1);
            _this._smallThorn1.rotation = 180;
            egret.Tween.get(_this._smallThorn1, { loop: true }).to({ rotation: -180 }, 40000).call(function () {
                _this._smallThorn1.rotation = 180;
            }, _this);
        }, this);
        egret.Tween.get(this._smallThorn2).to({ scaleX: 2, scaleY: 2 }, 500).call(function () {
            egret.Tween.removeTweens(_this._smallThorn2);
            _this._smallThorn2.rotation = 0;
            egret.Tween.get(_this._smallThorn2, { loop: true }).to({ rotation: 360 }, 20000).call(function () {
                _this._smallThorn2.rotation = 0;
            }, _this);
        }, this);
        egret.Tween.get(this._titleBM).wait(150).to({ scaleX: 2 }, 150);
        egret.Tween.get(this._titleEffectBM).wait(150).to({ scaleX: 2 }, 150).call(function () {
            egret.Tween.removeTweens(_this._titleEffectBM);
            egret.Tween.get(_this._titleEffectBM, { loop: true }).to({ alpha: 1 }, 150).to({ alpha: 0 }, 500);
        }, this);
        egret.Tween.get(this._textLight1).wait(150).to({ alpha: 1 }, 150).call(function () {
            egret.Tween.removeTweens(_this._textLight1);
            egret.Tween.get(_this._textLight1, { loop: true }).to({ scaleX: 0.3, scaleY: 0.3 }, 1000).to({ scaleX: 1, scaleY: 1 }, 1000);
        }, this);
        egret.Tween.get(this._textLight2).wait(150).to({ alpha: 1 }, 150).call(function () {
            egret.Tween.removeTweens(_this._textLight2);
            egret.Tween.get(_this._textLight2, { loop: true }).to({ scaleX: 0.3, scaleY: 0.3 }, 1000).to({ scaleX: 1, scaleY: 1 }, 1000);
        }, this);
        egret.Tween.get(this._sweepLight1).to({ x: this._smallThorn1.x - this._sweepLight1.width / 2 }, 450);
        egret.Tween.get(this._sweepLight1).to({ scaleX: 1 }, 130);
        egret.Tween.get(this._sweepLight1).wait(320).to({ alpha: 0 }, 130);
        egret.Tween.get(this._sweepLight2).to({ x: this._smallThorn1.x + this._sweepLight2.width / 2 }, 450);
        egret.Tween.get(this._sweepLight2).to({ scaleX: 1 }, 130);
        egret.Tween.get(this._sweepLight2).wait(320).to({ alpha: 0 }, 130);
        this._buttomContainer.scaleX = 0;
        egret.Tween.get(this._buttomContainer).to({ scaleX: 1 }, 350).call(function () {
            egret.Tween.removeTweens(_this._buttomContainer);
        }, this);
    };
    SpecialChatBoxGetView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "specialview_commoni_itembg"
        ]);
    };
    SpecialChatBoxGetView.prototype.golookInfoBtnClick = function () {
        var titleId = this._titleId;
        var idx = 0;
        var titleTypes = [];
        var type = null;
        var allVoList = Api.itemVoApi.getTitleVoListByType(4);
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
        ViewController.getInstance().openView(ViewConst.COMMON.ITEMVIEW_TAB4, { titleId: titleId, idx: idx });
    };
    SpecialChatBoxGetView.prototype.isShowBtn = function () {
        return true;
    };
    SpecialChatBoxGetView.prototype.dispose = function () {
        egret.Tween.removeTweens(this._smallThorn1);
        egret.Tween.removeTweens(this._smallThorn2);
        egret.Tween.removeTweens(this._titleBM);
        egret.Tween.removeTweens(this._titleEffectBM);
        egret.Tween.removeTweens(this._textLight1);
        egret.Tween.removeTweens(this._textLight2);
        egret.Tween.removeTweens(this._sweepLight1);
        egret.Tween.removeTweens(this._sweepLight2);
        egret.Tween.removeTweens(this._buttomContainer);
        this._smallThorn1 = null;
        this._smallThorn2 = null;
        this._sweepLight1 = null;
        this._sweepLight2 = null;
        this._textLight1 = null;
        this._textLight2 = null;
        this._titleBM = null;
        this._titleEffectBM = null;
        this._buttomContainer = null;
        this._buttombg = null;
        this._titleTF = null;
        this._titleTFLine = null;
        this._titleInfoTFList = [];
        this._titleId = null;
        _super.prototype.dispose.call(this);
    };
    return SpecialChatBoxGetView;
}(SpecialBaseView));
__reflect(SpecialChatBoxGetView.prototype, "SpecialChatBoxGetView");
//# sourceMappingURL=SpecialChatBoxGetView.js.map