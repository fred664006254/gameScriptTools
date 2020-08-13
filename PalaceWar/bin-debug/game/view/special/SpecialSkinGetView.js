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
 * 特殊奖励--角色皮肤
 * @author 张朝阳
 * date 2019/3/27
 * @class SpecialSkinGetView
 */
var SpecialSkinGetView = (function (_super) {
    __extends(SpecialSkinGetView, _super);
    function SpecialSkinGetView() {
        var _this = _super.call(this) || this;
        _this._playerContainer = null;
        _this._buttombg = null;
        _this._buttomDesc = null;
        _this._namebg = null;
        _this._nameTF = null;
        _this._buttomContainer = null;
        _this._nameContainer = null;
        _this._titleId = null;
        return _this;
    }
    /**创建view */
    SpecialSkinGetView.prototype.createView = function (id) {
        var titlecfg = Config.TitleCfg.getTitleCfgById(id);
        this._titleId = id;
        this._playerContainer = Api.playerVoApi.getPlayerPortrait(Number(titlecfg.id), Api.playerVoApi.getPlayePicId());
        this._playerContainer.setPosition(GameConfig.stageWidth / 2 - this._playerContainer.width / 2, GameConfig.stageHeigth - this._playerContainer.height - 115);
        this._container.addChild(this._playerContainer);
        this._buttomContainer = new BaseDisplayObjectContainer();
        this._buttomContainer.width = 640;
        this._buttomContainer.anchorOffsetX = this._buttomContainer.width / 2;
        this._buttomContainer.x = 320;
        this._container.addChild(this._buttomContainer);
        this._buttombg = BaseBitmap.create("acchristmasview_smalldescbg");
        this._buttombg.width = 510;
        this._buttomDesc = ComponentManager.getTextField(titlecfg.desc, TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._buttomDesc.width = 480;
        this._buttombg.height = 21 + this._buttomDesc.height;
        this._buttombg.setPosition(GameConfig.stageWidth / 2 - this._buttombg.width / 2, GameConfig.stageHeigth - this._buttombg.height - 65 - 20);
        this._buttomContainer.addChild(this._buttombg);
        this._buttomDesc.setPosition(this._buttombg.x + this._buttombg.width / 2 - this._buttomDesc.width / 2, this._buttombg.y + this._buttombg.height / 2 - this._buttomDesc.height / 2);
        this._buttomDesc.textAlign = egret.HorizontalAlign.CENTER;
        this._buttomContainer.addChild(this._buttomDesc);
        this._nameContainer = new BaseDisplayObjectContainer();
        this._nameContainer.width = 640;
        this._nameContainer.anchorOffsetX = this._buttomContainer.width / 2;
        this._nameContainer.x = 320;
        this._container.addChild(this._nameContainer);
        this._namebg = BaseBitmap.create("specialview_commoni_namebg");
        this._nameTF = ComponentManager.getTextField(titlecfg.name, TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._namebg.width = this._nameTF.width + 30;
        this._namebg.setPosition(this._buttombg.x + this._buttombg.width / 2 - this._namebg.width / 2, this._buttombg.y - this._namebg.height - 10);
        this._nameContainer.addChild(this._namebg);
        this._nameTF.setPosition(this._namebg.x + this._namebg.width / 2 - this._nameTF.width / 2, this._namebg.y + this._namebg.height / 2 - this._nameTF.height / 2);
        this._nameContainer.addChild(this._nameTF);
        if (this._golookInfoBtn) {
            // this.setgolookPos(this._buttombg.x + this._buttombg.width - this._golookInfoBtn.width - 10, this._buttombg.y - this._golookInfoBtn.height - 17);
            this.setgolookPos(this._buttombg.x + this._buttombg.width / 2 - this._golookInfoBtn.width / 2, this._buttombg.y + this._buttombg.height + 10);
        }
        this.playAni();
    };
    /**同类型刷新view */
    SpecialSkinGetView.prototype.refreashView = function (id) {
        var titlecfg = Config.TitleCfg.getTitleCfgById(id);
        this._titleId = id;
        var depth = 0;
        if (this._playerContainer) {
            depth = this._container.getChildIndex(this._playerContainer);
            this._container.removeChild(this._playerContainer);
            this._playerContainer.dispose();
            this._playerContainer = null;
        }
        this._playerContainer = Api.playerVoApi.getPlayerPortrait(Number(titlecfg.id), Api.playerVoApi.getPlayePicId());
        this._playerContainer.setPosition(GameConfig.stageWidth / 2 - this._playerContainer.width / 2, GameConfig.stageHeigth - this._playerContainer.height - 115);
        this._container.addChildAt(this._playerContainer, depth);
        this._buttomDesc.text = LanguageManager.getlocal("itemDesc_" + titlecfg.id);
        this._buttombg.height = 21 + this._buttomDesc.height;
        this._buttombg.setPosition(GameConfig.stageWidth / 2 - this._buttombg.width / 2, GameConfig.stageHeigth - this._buttombg.height - 65 - 20);
        this._buttomDesc.setPosition(this._buttombg.x + this._buttombg.width / 2 - this._buttomDesc.width / 2, this._buttombg.y + this._buttombg.height / 2 - this._buttomDesc.height / 2);
        this._nameTF.text = titlecfg.name;
        this._namebg.width = this._nameTF.width + 30;
        this._namebg.setPosition(this._buttombg.x + this._buttombg.width / 2 - this._namebg.width / 2, this._buttombg.y - this._namebg.height - 10);
        this._nameTF.setPosition(this._namebg.x + this._namebg.width / 2 - this._nameTF.width / 2, this._namebg.y + this._namebg.height / 2 - this._nameTF.height / 2);
        if (this._golookInfoBtn) {
            // this.setgolookPos(this._buttombg.x + this._buttombg.width - this._golookInfoBtn.width - 10, this._buttombg.y - this._golookInfoBtn.height - 17);
            this.setgolookPos(this._buttombg.x + this._buttombg.width / 2 - this._golookInfoBtn.width / 2, this._buttombg.y + this._buttombg.height + 10);
        }
        this.playAni();
    };
    SpecialSkinGetView.prototype.playAni = function () {
        var _this = this;
        _super.prototype.playAni.call(this);
        this._buttomContainer.scaleX = 0;
        this._playerContainer.alpha = 0;
        this._nameContainer.alpha = 0;
        egret.Tween.get(this._buttomContainer).to({ scaleX: 1 }, 350).call(function () {
            egret.Tween.removeTweens(_this._buttomContainer);
        }, this);
        egret.Tween.get(this._playerContainer).wait(500).to({ alpha: 1 }, 100).call(function () {
            egret.Tween.removeTweens(_this._playerContainer);
        }, this);
        egret.Tween.get(this._nameContainer).wait(600).to({ alpha: 1 }, 100).call(function () {
            egret.Tween.removeTweens(_this._nameContainer);
        }, this);
    };
    SpecialSkinGetView.prototype.golookInfoBtnClick = function () {
        var titleId = this._titleId;
        // let idx = 3;
        var idx = 0;
        var allVoList = Api.itemVoApi.getTitleVoListByType(3);
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
        for (var k in titleTypes) {
            if (titleTypes[k] == type) {
                idx = Number(k);
            }
        }
        this.callBack();
        ViewController.getInstance().openView(ViewConst.COMMON.ITEMVIEW_TAB3, { titleId: titleId, idx: idx });
    };
    SpecialSkinGetView.prototype.isShowBtn = function () {
        return true;
    };
    SpecialSkinGetView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "acchristmasview_smalldescbg", "specialview_commoni_namebg"
        ]);
    };
    SpecialSkinGetView.prototype.dispose = function () {
        egret.Tween.removeTweens(this._nameContainer);
        egret.Tween.removeTweens(this._buttomContainer);
        this._buttomContainer = null;
        this._nameContainer = null;
        this._playerContainer = null;
        this._buttombg = null;
        this._buttomDesc = null;
        this._namebg = null;
        this._nameTF = null;
        this._titleId = null;
        _super.prototype.dispose.call(this);
    };
    return SpecialSkinGetView;
}(SpecialBaseView));
__reflect(SpecialSkinGetView.prototype, "SpecialSkinGetView");
//# sourceMappingURL=SpecialSkinGetView.js.map