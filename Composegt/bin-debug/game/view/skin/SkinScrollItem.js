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
 * 皮肤
 * author yanyuling
 * date 2018/08/13
 * @class SkinScrollItem
 */
var SkinScrollItem = (function (_super) {
    __extends(SkinScrollItem, _super);
    function SkinScrollItem() {
        var _this = _super.call(this) || this;
        _this._uiData = undefined;
        _this._isGray = false;
        _this._nodeContainer = undefined;
        return _this;
    }
    SkinScrollItem.prototype.initItem = function (index, data) {
        this._uiData = data;
        var serSkincfg = undefined;
        var wifeSkincfg = undefined;
        this._nodeContainer = new BaseDisplayObjectContainer();
        this.addChild(this._nodeContainer);
        var bg = BaseBitmap.create("skin_boxbg");
        // bg.anchorOffsetX = bg.width/2;
        bg.x = 1;
        this._nodeContainer.addChild(bg);
        var rect = new egret.Rectangle(0, 0, 640, 480);
        var tarScale = 0.61;
        var tarY = bg.y;
        var skinImgPath = "";
        var skinNameStr = "";
        var skinNameStr2 = "";
        var ownerNameStr = LanguageManager.getlocal("skin_ownerNameStr2");
        var isGray = true;
        var uiType = data["uiType"];
        uiType = uiType ? uiType : 0;
        tarY = bg.y + 15;
        if (data.wifeId) {
            bg.texture = ResourceManager.getRes("skin_boxbg2");
            wifeSkincfg = data;
            if (uiType == 2) {
                if (Api.wifeSkinVoApi.isOwnSkinOfSkinId(wifeSkincfg.id)) {
                    ownerNameStr = LanguageManager.getlocal("skin_myOwn1");
                    isGray = false;
                }
                else {
                    isGray = true;
                    ownerNameStr = LanguageManager.getlocal("skin_myOwn2");
                }
            }
            else {
                var info = Api.skinVoApi.getWifeSkinFirstInfo(wifeSkincfg.id);
                if (info) {
                    isGray = false;
                    if (info.qu) {
                        ownerNameStr = LanguageManager.getlocal("skin_ownerNameStr3", [info.name, info.qu, info.zid]);
                    }
                    else {
                        ownerNameStr = LanguageManager.getlocal("skin_ownerNameStr", [info.name, info.zid]);
                    }
                }
            }
            skinImgPath = wifeSkincfg.body;
            skinNameStr = skinNameStr = wifeSkincfg.name + " " + LanguageManager.getlocal("wifeName_" + wifeSkincfg.wifeId);
            tarScale = 0.45;
            rect.width = 640;
            rect.height = 655;
            tarY = bg.y + 15;
        }
        else if (data.servantId) {
            serSkincfg = data;
            if (uiType == 1) {
                var sLv = Api.servantVoApi.getServantSkinLV(data.id);
                if (sLv) {
                    ownerNameStr = LanguageManager.getlocal("skin_myOwn1");
                    isGray = false;
                }
                else {
                    ownerNameStr = LanguageManager.getlocal("skin_notOwnTip");
                    isGray = true;
                    ownerNameStr = LanguageManager.getlocal("skin_myOwn2");
                }
            }
            else {
                var info = Api.skinVoApi.getServantSkinFirstInfo(serSkincfg.id);
                if (info) {
                    isGray = false;
                    if (info.qu) {
                        ownerNameStr = LanguageManager.getlocal("skin_ownerNameStr3", [info.name, info.qu, info.zid]);
                    }
                    else {
                        ownerNameStr = LanguageManager.getlocal("skin_ownerNameStr", [info.name, info.zid]);
                    }
                }
            }
            var serCfg = Config.ServantCfg.getServantItemById(serSkincfg.servantId);
            skinImgPath = serSkincfg.body;
            skinNameStr = skinNameStr = serSkincfg.getSkinName() + " " + serCfg.name;
            tarY = bg.y + 15;
        }
        var skinImg = BaseLoadBitmap.create(skinImgPath);
        skinImg.mask = rect;
        skinImg.setScale(tarScale);
        skinImg.x = bg.x + bg.width / 2 - rect.width * tarScale / 2;
        skinImg.y = tarY;
        this._nodeContainer.addChild(skinImg);
        var skinNameTxt = ComponentManager.getTextField(skinNameStr, 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        skinNameTxt.x = bg.x + bg.width / 2 - skinNameTxt.width / 2;
        skinNameTxt.y = bg.y + bg.height - 55;
        this._nodeContainer.addChild(skinNameTxt);
        var ownerNameTxt = ComponentManager.getTextField(ownerNameStr, 20, 0x999999);
        ownerNameTxt.x = bg.x + bg.width / 2 - ownerNameTxt.width / 2;
        ownerNameTxt.y = skinNameTxt.y + 25;
        this._nodeContainer.addChild(ownerNameTxt);
        this._isGray = isGray;
        if (this._isGray) {
            App.DisplayUtil.changeToGray(this);
            if (!data["myown"]) {
                this.addTouch(this.touchHandler, this, null, true);
            }
        }
        else {
            App.DisplayUtil.changeToNormal(this);
            this.addTouch(this.touchHandler, this, null, true);
        }
        this._nodeContainer.anchorOffsetX = this._nodeContainer.width / 2;
        this._nodeContainer.anchorOffsetY = this._nodeContainer.height / 2;
        this._nodeContainer.x = this._nodeContainer.width / 2;
        this._nodeContainer.y = this._nodeContainer.height / 2;
    };
    SkinScrollItem.prototype.touchHandler = function (event) {
        var scalV = 0.97;
        switch (event.type) {
            case egret.TouchEvent.TOUCH_BEGIN:
                this._nodeContainer.setScale(scalV);
                break;
            case egret.TouchEvent.TOUCH_CANCEL:
                this._nodeContainer.setScale(1.0);
                break;
            case egret.TouchEvent.TOUCH_END:
                this._nodeContainer.setScale(1.0);
                ViewController.getInstance().openView(ViewConst.COMMON.SKINDETAILVIEW, this._uiData);
                break;
        }
    };
    SkinScrollItem.prototype.getSpaceX = function () {
        return 3;
    };
    SkinScrollItem.prototype.getSpaceY = function () {
        return 5;
    };
    SkinScrollItem.prototype.dispose = function () {
        this._nodeContainer = null;
        this._uiData = null;
        this._isGray = false;
        _super.prototype.dispose.call(this);
    };
    return SkinScrollItem;
}(ScrollListItem));
__reflect(SkinScrollItem.prototype, "SkinScrollItem");
