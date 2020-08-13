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
 * @class AcOneYearoackSkinScrollItem
 */
var AcOneYearoackSkinScrollItem = (function (_super) {
    __extends(AcOneYearoackSkinScrollItem, _super);
    function AcOneYearoackSkinScrollItem() {
        var _this = _super.call(this) || this;
        _this._uiData = undefined;
        _this._nodeContainer = undefined;
        return _this;
    }
    AcOneYearoackSkinScrollItem.prototype.initItem = function (index, data) {
        this._uiData = data;
        var serSkincfg = undefined;
        var wifeSkincfg = Config.WifeskinCfg.getWifeCfgById(this._uiData);
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
        var isOwn = true;
        var uiType = data["uiType"];
        uiType = uiType ? uiType : 0;
        tarY = bg.y + 15;
        bg.texture = ResourceManager.getRes("skin_boxbg2");
        var info = Api.wifeSkinVoApi.getWifeskinInfoVoById(wifeSkincfg.wifeId);
        skinImgPath = wifeSkincfg.body;
        skinNameStr = skinNameStr = wifeSkincfg.name + " " + LanguageManager.getlocal("wifeName_" + wifeSkincfg.wifeId);
        tarScale = 0.45;
        rect.width = 640;
        rect.height = 655;
        tarY = bg.y + 15;
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
        if (info && info.skin && info.skin[this._uiData]) {
            var lv = info.getLvBySkinId(this._uiData);
            var lvtxt = ComponentManager.getTextField("", 20, TextFieldConst.COLOR_LIGHT_YELLOW);
            lvtxt.text = LanguageManager.getlocal("atkraceChallengeleve", ["" + lv]);
            lvtxt.x = bg.x + bg.width / 2 - lvtxt.width / 2;
            lvtxt.y = skinNameTxt.y + 25;
            this._nodeContainer.addChild(lvtxt);
        }
        else {
            skinNameTxt.y = bg.y + bg.height - 40;
            isOwn = false;
        }
        if (!isOwn) {
            var flag = BaseBitmap.create("oneyearpack_flag1");
            flag.x = bg.x + 3;
            flag.y = bg.y + 3;
            this._nodeContainer.addChild(flag);
        }
        this.addTouch(this.touchHandler, this, null, true);
        this._nodeContainer.anchorOffsetX = this._nodeContainer.width / 2;
        this._nodeContainer.anchorOffsetY = this._nodeContainer.height / 2;
        this._nodeContainer.x = this._nodeContainer.width / 2;
        this._nodeContainer.y = this._nodeContainer.height / 2;
    };
    AcOneYearoackSkinScrollItem.prototype.touchHandler = function (event) {
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
                var wifeSkincfg = Config.WifeskinCfg.getWifeCfgById(this._uiData);
                ViewController.getInstance().openView(ViewConst.COMMON.ACONEYEARPACKSKINDETAILVIEW, { wifeskinid: this._uiData });
                break;
        }
    };
    AcOneYearoackSkinScrollItem.prototype.getSpaceX = function () {
        return 3;
    };
    AcOneYearoackSkinScrollItem.prototype.getSpaceY = function () {
        return 5;
    };
    AcOneYearoackSkinScrollItem.prototype.dispose = function () {
        this._nodeContainer = null;
        this._uiData = null;
        _super.prototype.dispose.call(this);
    };
    return AcOneYearoackSkinScrollItem;
}(ScrollListItem));
__reflect(AcOneYearoackSkinScrollItem.prototype, "AcOneYearoackSkinScrollItem");
