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
 * 特殊奖励--称号
 * @author 张朝阳
 * date 2019/3/27
 * @class SpecialTitleGetView
 */
var SpecialTitleGetView = (function (_super) {
    __extends(SpecialTitleGetView, _super);
    function SpecialTitleGetView() {
        var _this = _super.call(this) || this;
        _this._playerContainer = null;
        _this._buttombg = null;
        _this._titleDescTF = null;
        _this._title = null;
        _this._titleTFLine = null;
        _this._itembg = null;
        _this._item = null;
        _this._buttomContainer = null;
        _this._titleId = null;
        _this._titleScale = 0;
        return _this;
    }
    SpecialTitleGetView.prototype.createView = function (id) {
        var _this = this;
        var titlecfg = Config.TitleCfg.getTitleCfgById(id);
        this._titleId = id;
        if (Api.playerVoApi.getNewPalaceRole(this._titleId) || Api.playerVoApi.checkHasDragonBones(id)) {
            this._titleScale = 0.93;
        }
        else {
            this._titleScale = 1;
        }
        if (Api.playerVoApi.checkHasDragonBones(id)) {
            this._playerContainer = App.CommonUtil.getPlayerDragonRole(String(id), Api.playerVoApi.getPlayePicId(), 1);
            this._playerContainer.setScale(this._titleScale);
            this._playerContainer.setPosition(GameConfig.stageWidth / 2, GameConfig.stageHeigth - 115 - 766 + 115);
            this._container.addChild(this._playerContainer);
        }
        else {
            this._playerContainer = Api.playerVoApi.getPlayerPortrait(Number(titlecfg.id), Api.playerVoApi.getPlayePicId());
            this._playerContainer.setScale(this._titleScale);
            this._playerContainer.setPosition(GameConfig.stageWidth / 2 - this._playerContainer.width / 2 * this._titleScale, GameConfig.stageHeigth - this._playerContainer.height * this._titleScale - 115);
            this._container.addChild(this._playerContainer);
        }
        this._buttomContainer = new BaseDisplayObjectContainer();
        this._buttomContainer.width = 640;
        this._buttomContainer.anchorOffsetX = this._buttomContainer.width / 2;
        this._buttomContainer.x = 320;
        this._container.addChild(this._buttomContainer);
        this._buttombg = BaseLoadBitmap.create("specialview_buttombg1");
        this._buttombg.width = 640;
        this._itembg = BaseBitmap.create("specialview_commoni_itembg");
        // this._buttombg.height = this._itembg.height - 10 + 108;
        // this._buttombg.setPosition(0, GameConfig.stageHeigth - this._buttombg.height - 80);
        this._buttomContainer.addChild(this._buttombg);
        this._buttombg.alpha = 0.8;
        // this._itembg.setPosition(this._buttombg.x + this._buttombg.width - this._itembg.width - 20, this._buttombg.y + 60);
        this._buttomContainer.addChild(this._itembg);
        this._titleDescTF = ComponentManager.getTextField(LanguageManager.getlocal("itemDesc_" + titlecfg.id), TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        // this._titleDescTF.setPosition(this._buttombg.x + 75, this._buttombg.y + 75);
        this._titleDescTF.lineSpacing = 20;
        this._titleDescTF.width = 440;
        this._buttomContainer.addChild(this._titleDescTF);
        // this._buttombg.height = this._titleDescTF.height + 10 + 108;
        var h = this._titleDescTF.height > this._itembg.height ? this._titleDescTF.height : this._itembg.height;
        this._buttombg.height = h - 10 + 108;
        this._buttombg.setPosition(0, GameConfig.stageHeigth - this._buttombg.height - 80);
        this._itembg.setPosition(this._buttombg.x + this._buttombg.width - this._itembg.width - 20, this._buttombg.y + 60);
        this._titleDescTF.setPosition(this._buttombg.x + 75, this._buttombg.y + 75);
        this._item = BaseLoadBitmap.create("itemicon" + titlecfg.id, null, {
            callback: function () {
                _this._item.setPosition(_this._itembg.x + _this._itembg.width / 2 - _this._item.width / 2, _this._itembg.y + _this._itembg.height / 2 - _this._item.height / 2);
            }, callbackThisObj: this, callbackParams: null
        });
        this._buttomContainer.addChild(this._item);
        this._titleTFLine = BaseBitmap.create("public_line3");
        this._buttomContainer.addChild(this._titleTFLine);
        this._title = BaseLoadBitmap.create(titlecfg.titleIcon3, null, {
            callback: function () {
                _this._title.setPosition(_this._buttombg.x + _this._buttombg.width / 2 - _this._title.width / 2, _this._buttombg.y + 35 - _this._title.height / 2);
                _this._titleTFLine.width = 281 + _this._title.width;
                _this._titleTFLine.setPosition(_this._buttombg.x + _this._buttombg.width / 2 - _this._titleTFLine.width / 2, _this._title.y + _this._title.height / 2 - _this._titleTFLine.height / 2);
            }, callbackThisObj: this, callbackParams: null
        });
        this._buttomContainer.addChild(this._title);
        if (this._golookInfoBtn) {
            // this.setgolookPos(this._buttombg.x + this._buttombg.width - this._golookInfoBtn.width - 10, this._buttombg.y - this._golookInfoBtn.height - 17);
            this.setgolookPos(this._buttombg.x + this._buttombg.width / 2 - this._golookInfoBtn.width / 2, this._buttombg.y + this._buttombg.height + 10);
        }
        this.playAni();
    };
    SpecialTitleGetView.prototype.refreashView = function (id) {
        var _this = this;
        var titlecfg = Config.TitleCfg.getTitleCfgById(id);
        this._titleId = id;
        var depth = 0;
        if (this._playerContainer) {
            depth = this._container.getChildIndex(this._playerContainer);
            this._container.removeChild(this._playerContainer);
            this._playerContainer.dispose();
            this._playerContainer = null;
        }
        if (Api.playerVoApi.getNewPalaceRole(this._titleId) || Api.playerVoApi.checkHasDragonBones(id)) {
            this._titleScale = 0.93;
        }
        else {
            this._titleScale = 1;
        }
        if (Api.playerVoApi.checkHasDragonBones(id)) {
            this._playerContainer = Api.playerVoApi.getPlayerDragonBonesPortrait(id, Api.playerVoApi.getPlayePicId());
            this._playerContainer.setScale(this._titleScale);
            this._playerContainer.setPosition(GameConfig.stageWidth / 2 - this._playerContainer.width / 2 * this._titleScale, GameConfig.stageHeigth - 115 - 766 + 115);
            this._container.addChildAt(this._playerContainer, depth);
        }
        else {
            this._playerContainer = Api.playerVoApi.getPlayerPortrait(Number(titlecfg.id), Api.playerVoApi.getPlayePicId());
            this._playerContainer.setScale(this._titleScale);
            this._playerContainer.setPosition(GameConfig.stageWidth / 2 - this._playerContainer.width / 2 * this._titleScale, GameConfig.stageHeigth - this._playerContainer.height * this._titleScale - 115);
            this._container.addChildAt(this._playerContainer, depth);
        }
        // this._playerContainer = Api.playerVoApi.getPlayerPortrait(Number(titlecfg.id), Api.playerVoApi.getPlayePicId());
        // this._playerContainer.setPosition(GameConfig.stageWidth / 2 - this._playerContainer.width / 2 * this._titleScale, GameConfig.stageHeigth - this._playerContainer.height * this._titleScale - 115);
        // this._container.addChildAt(this._playerContainer, depth);
        // this._item.setload("itemicon" + titlecfg.id);
        this._titleDescTF.text = LanguageManager.getlocal("itemDesc_" + titlecfg.id);
        var h = this._titleDescTF.height > this._itembg.height ? this._titleDescTF.height : this._itembg.height;
        this._buttombg.height = h - 10 + 108;
        this._buttombg.setPosition(0, GameConfig.stageHeigth - this._buttombg.height - 80);
        this._itembg.setPosition(this._buttombg.x + this._buttombg.width - this._itembg.width - 20, this._buttombg.y + 60);
        this._titleDescTF.setPosition(this._buttombg.x + 75, this._buttombg.y + 75);
        this._item.setload("itemicon" + titlecfg.id, null, {
            callback: function () {
                _this._item.setPosition(_this._itembg.x + _this._itembg.width / 2 - _this._item.width / 2, _this._itembg.y + _this._itembg.height / 2 - _this._item.height / 2);
            }, callbackThisObj: this, callbackParams: null
        });
        this._title.setload(titlecfg.titleIcon3, null, {
            callback: function () {
                _this._title.setPosition(_this._buttombg.x + _this._buttombg.width / 2 - _this._title.width / 2, _this._buttombg.y + 35 - _this._title.height / 2);
                _this._titleTFLine.width = 281 + _this._title.width;
                _this._titleTFLine.setPosition(_this._buttombg.x + _this._buttombg.width / 2 - _this._titleTFLine.width / 2, _this._title.y + _this._title.height / 2 - _this._titleTFLine.height / 2);
            }, callbackThisObj: this, callbackParams: null
        });
        if (this._golookInfoBtn) {
            // this.setgolookPos(this._buttombg.x + this._buttombg.width - this._golookInfoBtn.width - 10, this._buttombg.y - this._golookInfoBtn.height - 17);
            this.setgolookPos(this._buttombg.x + this._buttombg.width / 2 - this._golookInfoBtn.width / 2, this._buttombg.y + this._buttombg.height + 10);
        }
        this.playAni();
    };
    SpecialTitleGetView.prototype.playAni = function () {
        var _this = this;
        _super.prototype.playAni.call(this);
        this._buttomContainer.scaleX = 0;
        this._playerContainer.alpha = 0;
        egret.Tween.get(this._buttomContainer).to({ scaleX: 1 }, 350).call(function () {
            egret.Tween.removeTweens(_this._buttomContainer);
        }, this);
        egret.Tween.get(this._playerContainer).wait(500).to({ alpha: 1 }, 100).call(function () {
            egret.Tween.removeTweens(_this._playerContainer);
        }, this);
    };
    SpecialTitleGetView.prototype.golookInfoBtnClick = function () {
        var titleId = this._titleId;
        var titlecfg = Config.TitleCfg.getTitleCfgById(titleId);
        var allVoList = Api.itemVoApi.getTitleVoListByType(3);
        var titleTypes = [];
        var type = null;
        var idx = 0;
        // for (let k in allVoList) {
        //     let typeKey: string = allVoList[k].titleKey;
        //     if (!GameData.isInArray(typeKey, titleTypes)) {
        //         titleTypes.push(typeKey);
        //     }
        //     if (allVoList[k].id == titleId) {
        //         type = typeKey;
        //     }
        // }
        for (var k in allVoList) {
            var typeKey = allVoList[k].titleKey;
            if (allVoList[k].id == titleId) {
                type = typeKey;
            }
            if (!GameData.isInArray(typeKey, titleTypes)) {
                if (typeKey == "1_5") {
                    var idx_1 = -1;
                    for (var i = 0; i < titleTypes.length; i++) {
                        if (titleTypes[i] == "1_3" || titleTypes[i] == "1_4") {
                            idx_1 = i;
                            break;
                        }
                    }
                    if (idx_1 >= 0) {
                        titleTypes.splice(idx_1, 0, typeKey);
                        continue;
                    }
                }
                else if (typeKey == "1_6") {
                    var idx_2 = -1;
                    for (var i = 0; i < titleTypes.length; i++) {
                        if (titleTypes[i] == "1_3" || titleTypes[i] == "1_4") {
                            idx_2 = i;
                            break;
                        }
                    }
                    if (idx_2 >= 0) {
                        titleTypes.splice(idx_2, 0, typeKey);
                        continue;
                    }
                }
                //皇位排在第一位
                if (typeKey == "1_7") {
                    titleTypes.unshift(typeKey);
                }
                else {
                    titleTypes.push(typeKey);
                }
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
    SpecialTitleGetView.prototype.isShowBtn = function () {
        return true;
    };
    SpecialTitleGetView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "specialview_commoni_itembg"
        ]);
    };
    SpecialTitleGetView.prototype.dispose = function () {
        egret.Tween.removeTweens(this._playerContainer);
        egret.Tween.removeTweens(this._buttomContainer);
        this._buttomContainer = null;
        this._playerContainer = null;
        this._buttombg = null;
        this._titleDescTF = null;
        this._title = null;
        this._titleTFLine = null;
        this._itembg = null;
        this._item = null;
        this._titleId = null;
        this._titleScale = 0;
        _super.prototype.dispose.call(this);
    };
    return SpecialTitleGetView;
}(SpecialBaseView));
__reflect(SpecialTitleGetView.prototype, "SpecialTitleGetView");
//# sourceMappingURL=SpecialTitleGetView.js.map