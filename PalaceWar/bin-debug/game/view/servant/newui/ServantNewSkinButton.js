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
var ServantNewSkinButton = (function (_super) {
    __extends(ServantNewSkinButton, _super);
    function ServantNewSkinButton() {
        var _this = _super.call(this) || this;
        _this._selectLight = null;
        _this._servantSkinId = null;
        return _this;
    }
    ServantNewSkinButton.prototype.init = function (skinId, servantId, f, o) {
        this._servantSkinId = skinId;
        var btnBg = "servant_skin_bg";
        var btnType = 1;
        var titleBg = null;
        var picStr;
        if (this._servantSkinId == "") {
            picStr = "servant_half_" + servantId;
        }
        else {
            var skincfg = Config.ServantskinCfg.getServantSkinItemById(skinId);
            picStr = skincfg.icon;
            if (skincfg.type && (skincfg.type == 2 || skincfg.type == 3)) {
                btnType = skincfg.type;
                btnBg = "servant_skin_bg_" + btnType;
                btnBg = ResourceManager.hasRes("servant_skin_bg_" + btnType) ? "servant_skin_bg_" + btnType : "servant_skin_bg";
                // titleBg = "servant_skin_title_"+btnType;
            }
        }
        var bgButton = ComponentManager.getButton(btnBg, null, f, o, [skinId, this], 3);
        this.addChild(bgButton);
        var icon = BaseLoadBitmap.create(picStr);
        icon.setScale(0.5);
        var circle = new egret.Shape();
        circle.graphics.beginFill(0x0000ff);
        circle.graphics.drawRect(0, 0, 72, 72);
        circle.graphics.endFill();
        circle.rotation = 45;
        circle.x = 58;
        circle.y = 8;
        this.addChild(circle);
        icon.mask = circle;
        this.cacheAsBitmap = true;
        icon.x = 10;
        icon.y = 20;
        this.addChild(icon);
        //btnEffect
        var btnEffect = null;
        if (btnType > 1) {
            btnEffect = ComponentManager.getCustomMovieClip("servant_skinbtn_selecteffect", 16, 70); // w133 h 105 
            btnEffect.setPosition(bgButton.x - 8, bgButton.y + 6);
            btnEffect.playWithTime(0);
            this.addChild(btnEffect);
        }
        this._selectLight = BaseBitmap.create("servant_skin_selected");
        this.addChild(this._selectLight);
        if (this._servantSkinId != "" && !Api.servantVoApi.isOwnSkinOfSkinId(this._servantSkinId)) {
            App.DisplayUtil.changeToGray(bgButton);
            App.DisplayUtil.changeToGray(icon);
            if (btnEffect) {
                App.DisplayUtil.changeToGray(btnEffect);
            }
        }
        var flag = App.CommonUtil.getServantSkinFlagById(this._servantSkinId);
        if (flag) {
            flag.setScale(0.8);
            this.addChild(flag);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, flag, bgButton, [0, -flag.height * flag.scaleY / 2]);
        }
    };
    ServantNewSkinButton.prototype.setSelect = function (b) {
        this._selectLight.visible = b;
    };
    ServantNewSkinButton.prototype.dispose = function () {
        this._selectLight = null;
        this._servantSkinId = null;
        _super.prototype.dispose.call(this);
    };
    return ServantNewSkinButton;
}(BaseDisplayObjectContainer));
__reflect(ServantNewSkinButton.prototype, "ServantNewSkinButton");
//# sourceMappingURL=ServantNewSkinButton.js.map