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
 * @class AcTailorSkinHeadItem
 */
var AcTailorSkinHeadItem = (function (_super) {
    __extends(AcTailorSkinHeadItem, _super);
    function AcTailorSkinHeadItem() {
        return _super.call(this) || this;
    }
    AcTailorSkinHeadItem.prototype.init = function (skinId) {
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_REFRESH_SKIN_HEADBG, this.refreshStatus, this);
        this._skinId = "" + skinId;
        // let skinCfg = GameConfig.config.wifeskinCfg[this._skinId];
        var skinCfg = Config.WifeskinCfg.getWifeCfgById(this._skinId);
        this._headBg = BaseBitmap.create("tailor_iconBtn");
        this._headBg.addTouchTap(this.bgClickHandler, this);
        this.addChild(this._headBg);
        var headImg = BaseLoadBitmap.create("wife_skinhalf_" + this._skinId);
        headImg.width = 205;
        headImg.height = 196;
        var tailor_headmask = BaseBitmap.create("tailor_headmask");
        var container = new BaseDisplayObjectContainer();
        container.addChild(tailor_headmask);
        this.addChild(container);
        headImg.setScale(0.5);
        headImg.anchorOffsetX = headImg.width / 2;
        headImg.x = this._headBg.x + this._headBg.width / 2;
        headImg.y = 5;
        container.x = 17;
        container.y = 12;
        headImg.mask = tailor_headmask;
        this.addChild(headImg);
        this._ownBg = BaseBitmap.create("tailor_namebg");
        this._ownBg.visible = false;
        this._ownBg.x = this._headBg.x + this._headBg.width / 2 - this._ownBg.width / 2;
        this._ownBg.y = this._headBg.y + this._headBg.height - 35;
        this.addChild(this._ownBg);
        this._ownTxt = ComponentManager.getTextField(LanguageManager.getlocal("acTailOwn"), 20, TextFieldConst.COLOR_QUALITY_GREEN);
        this._ownTxt.visible = false;
        this._ownTxt.x = this._ownBg.x + this._ownBg.width / 2 - this._ownTxt.width / 2;
        this._ownTxt.y = this._ownBg.y + 5;
        this.addChild(this._ownTxt);
        this.cacheAsBitmap = true;
    };
    AcTailorSkinHeadItem.prototype.bgClickHandler = function () {
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_REFRESH_SKIN_HEADBG, this._skinId);
    };
    AcTailorSkinHeadItem.prototype.refreshStatus = function (params) {
        var tmpskinId = params.data;
        var isOwn = Api.wifeSkinVoApi.isOwnSkinOfSkinId(this._skinId);
        if (tmpskinId == this._skinId) {
            this._headBg.texture = ResourceManager.getRes("tailor_iconBtn_down");
        }
        else {
            this._headBg.texture = ResourceManager.getRes("tailor_iconBtn");
        }
        if (isOwn) {
            this._ownBg.visible = true;
            this._ownTxt.visible = true;
        }
        else {
            this._ownBg.visible = false;
            this._ownTxt.visible = false;
        }
    };
    AcTailorSkinHeadItem.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_REFRESH_SKIN_HEADBG, this.refreshStatus, this);
        this.cacheAsBitmap = false;
        this._skinId = "";
        this._headBg = null;
        this._ownBg = null;
        this._ownTxt = null;
        _super.prototype.dispose.call(this);
    };
    return AcTailorSkinHeadItem;
}(BaseDisplayObjectContainer));
__reflect(AcTailorSkinHeadItem.prototype, "AcTailorSkinHeadItem");
//# sourceMappingURL=AcTailorSkinHeadItem.js.map