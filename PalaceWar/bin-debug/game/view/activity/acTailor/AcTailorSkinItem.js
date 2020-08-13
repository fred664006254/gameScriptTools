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
 * 裁缝 皮肤
 * author yanyuling
 * date 2018/03/01
 * @class AcTailorSkinItem
 */
var AcTailorSkinItem = (function (_super) {
    __extends(AcTailorSkinItem, _super);
    function AcTailorSkinItem() {
        var _this = _super.call(this) || this;
        _this._wifeImg = null;
        _this._wifeNameTxt = null;
        _this._skinNameTxt = null;
        _this._skin_box = null;
        _this._goldNumTxt = null;
        return _this;
    }
    AcTailorSkinItem.prototype.init = function (skininfo, aid, code) {
        var diffX = (_a = {},
            _a["101"] = 20,
            _a["102"] = 0,
            _a["103"] = 20,
            _a["104"] = 0,
            _a["105"] = 0,
            _a["106"] = -40,
            _a["107"] = 0,
            _a["108"] = -30,
            _a["109"] = 0,
            _a["201"] = -10,
            _a["202"] = 0,
            _a["203"] = 0,
            _a["204"] = 0,
            _a["205"] = 0,
            _a["206"] = 0,
            _a["207"] = 0,
            _a["208"] = -60,
            _a["209"] = -20,
            _a["210"] = 0,
            _a["303"] = -10,
            _a["302"] = 0,
            _a["304"] = 0,
            _a["305"] = 0,
            _a["306"] = 0,
            _a["307"] = -20,
            _a["310"] = 0,
            _a);
        this._skinId = "" + skininfo[0];
        var tailorCfg = Config.AcCfg.getCfgByActivityIdAndCode(aid, code);
        var skin_box = BaseBitmap.create("tailor_box");
        this.addChild(skin_box);
        this.width = skin_box.width + 5;
        this.height = skin_box.height;
        var skinCfg = Config.WifeskinCfg.getWifeCfgById(this._skinId);
        var wifeId = skinCfg.wifeId;
        var offestX = 0;
        if (diffX[wifeId]) {
            offestX = diffX[wifeId];
        }
        else {
            offestX = 0;
        }
        var wifeImg = BaseLoadBitmap.create("wife_skin_" + this._skinId);
        wifeImg.width = 540;
        wifeImg.height = 760;
        wifeImg.anchorOffsetX = wifeImg.width / 2 + offestX;
        wifeImg.setScale(0.5);
        var mask = BaseLoadBitmap.create("tailor_skinMask");
        var container = new BaseDisplayObjectContainer();
        container.addChild(mask);
        this.addChild(container);
        wifeImg.mask = mask;
        wifeImg.x = skin_box.width / 2;
        wifeImg.y = 80;
        container.x = 8;
        container.y = 70;
        this.addChild(wifeImg);
        var wifeNameTxt = ComponentManager.getTextField(LanguageManager.getlocal("wifeName_" + wifeId), 22, TextFieldConst.COLOR_BROWN);
        wifeNameTxt.x = skin_box.x + skin_box.width / 2 - wifeNameTxt.width / 2;
        wifeNameTxt.y = skin_box.y + 15;
        this.addChild(wifeNameTxt);
        var skinNameTxt = ComponentManager.getTextField(LanguageManager.getlocal("skinName" + this._skinId), 22, TextFieldConst.COLOR_WARN_GREEN2);
        skinNameTxt.x = skin_box.x + skin_box.width / 2 - skinNameTxt.width / 2;
        skinNameTxt.y = wifeNameTxt.y + 22;
        this.addChild(skinNameTxt);
        var resIcon1 = BaseLoadBitmap.create("tailor_icon2");
        // resIcon1.setScale(0.4)
        resIcon1.x = skin_box.x + 40;
        resIcon1.y = skin_box.y + skin_box.height - 45;
        this.addChild(resIcon1);
        var goldNumTxt = ComponentManager.getTextField(skininfo[1], 20);
        goldNumTxt.x = resIcon1.x + 55;
        goldNumTxt.y = resIcon1.y + 8;
        this.addChild(goldNumTxt);
        // this.cacheAsBitmap = true;
        this._wifeImg = wifeImg;
        this._wifeNameTxt = wifeNameTxt;
        this._skinNameTxt = skinNameTxt;
        this._skin_box = skin_box;
        this._goldNumTxt = goldNumTxt;
        var _a;
        // this._wifeImg = wifeImg;
    };
    AcTailorSkinItem.prototype.refreashView = function (skininfo, aid, code) {
        this._skinId = "" + skininfo[0];
        var skinCfg = Config.WifeskinCfg.getWifeCfgById(this._skinId);
        var tailorCfg = Config.AcCfg.getCfgByActivityIdAndCode(aid, code);
        this._wifeImg.setload("wife_skin_" + this._skinId);
        this._wifeNameTxt.text = LanguageManager.getlocal("wifeName_" + skinCfg.wifeId);
        this._wifeNameTxt.x = this._skin_box.x + this._skin_box.width / 2 - this._wifeNameTxt.width / 2;
        this._skinNameTxt.text = LanguageManager.getlocal("skinName" + this._skinId);
        this._skinNameTxt.x = this._skin_box.x + this._skin_box.width / 2 - this._skinNameTxt.width / 2;
        this._goldNumTxt.text = skininfo[1];
    };
    AcTailorSkinItem.prototype.dispose = function () {
        this._skinId = "";
        this._wifeImg = null;
        this._wifeNameTxt = null;
        this._skinNameTxt = null;
        this._skin_box = null;
        this._goldNumTxt = null;
        // this.cacheAsBitmap = false;
        _super.prototype.dispose.call(this);
    };
    return AcTailorSkinItem;
}(BaseDisplayObjectContainer));
__reflect(AcTailorSkinItem.prototype, "AcTailorSkinItem");
//# sourceMappingURL=AcTailorSkinItem.js.map