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
 * 门客皮肤头像
 * author yanyuling
 * date 2018/3/5
 * @class ServantSkinScrollItem
 */
var ServantSkinScrollItem = (function (_super) {
    __extends(ServantSkinScrollItem, _super);
    function ServantSkinScrollItem() {
        var _this = _super.call(this) || this;
        _this._skincfg = undefined;
        _this._skinId = undefined;
        _this._isDown = false;
        _this._bgTouched = false;
        return _this;
    }
    ServantSkinScrollItem.prototype.init = function (skinId, index, serId, parmServantId) {
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_SERVANT_SKIN_SWITCH, this.bgSwitchHandler, this);
        this._skinId = "" + skinId;
        this._skincfg = Config.ServantskinCfg.getServantSkinItemById(this._skinId);
        this.width = 115 + this.getSpaceX();
        this.height = 110;
        var iconbgStr = "tailor_iconBtn";
        var wearId = Api.servantVoApi.isServantSkinInWear(this._skinId);
        if (parmServantId) {
            wearId = false;
            if (parmServantId == skinId) {
                wearId = true;
            }
        }
        var iconStr = "";
        if (this._skincfg) {
            iconStr = this._skincfg.icon;
        }
        else {
            iconStr = "servant_half_" + serId;
        }
        if (wearId) {
            iconbgStr = "tailor_iconBtn_down";
            this._isDown = true;
        }
        else {
            if (!parmServantId) {
                if (!Api.servantVoApi.getservantSkinIdInWear(serId) && index == 0) {
                    iconbgStr = "tailor_iconBtn_down";
                    this._isDown = true;
                }
            }
        }
        var iconBg = BaseBitmap.create(iconbgStr);
        iconBg.name = "bg2";
        iconBg.addTouchTap(this.bgTouchHandler, this);
        this._iconBg = iconBg;
        this.addChild(iconBg);
        var icon = BaseLoadBitmap.create(iconStr);
        icon.setScale(0.5);
        var circle = new egret.Shape();
        circle.graphics.beginFill(0x0000ff);
        circle.graphics.drawCircle(55, 44, 44);
        circle.graphics.endFill();
        this.addChild(circle);
        icon.mask = circle;
        this.cacheAsBitmap = true;
        icon.x = 10;
        this.addChild(icon);
        if (this._skincfg && Api.servantVoApi.getSkinOneRed(this._skincfg.servantId, this._skinId)) {
            var skillDotSp = BaseBitmap.create("public_dot2");
            skillDotSp.x = 80;
            skillDotSp.y = 5;
            skillDotSp.name = "skillDotSp";
            this.addChild(skillDotSp);
        }
        // if(Api.switchVoApi.checkOpenSkinLvup()){
        // 	this.refreshLv();
        // }
    };
    ServantSkinScrollItem.prototype.bgSwitchHandler = function (params) {
        var sid = params.data.skinId;
        if (sid == this._skinId) {
            this._iconBg.texture = ResourceManager.getRes("tailor_iconBtn_down");
            this._isDown = true;
        }
        else {
            this._iconBg.texture = ResourceManager.getRes("tailor_iconBtn");
            this._isDown = false;
        }
    };
    ServantSkinScrollItem.prototype.bgTouchHandler = function () {
        if (this._isDown) {
            return;
        }
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_SERVANT_SKIN_SWITCH, { skinId: this._skinId });
        if (this._skincfg && Api.servantVoApi.getSkinOneRed(this._skincfg.servantId, this._skinId)) {
            NetManager.request(NetRequestConst.REQUEST_UPGRADE_SERVANT_REDSKINRED, { servantId: this._skincfg.servantId, servantSkinId: this._skinId });
            this.getChildByName("skillDotSp").visible = false;
        }
    };
    ServantSkinScrollItem.prototype.refreshLv = function () {
        var lvTxt = this.getChildByName("lvTxt");
        if (!lvTxt) {
            var iconBg = this.getChildByName("bg2");
            var lvimg = BaseLoadBitmap.create("skin_lv_img");
            lvimg.x = iconBg.x + iconBg.width / 2 - 30;
            lvimg.y = iconBg.y + iconBg.height - 30;
            this.addChild(lvimg);
            lvTxt = ComponentManager.getBitmapText("", "tip_fnt");
            lvTxt.setScale(0.7);
            lvTxt.name = "lvTxt";
            lvTxt.x = lvimg.x + 41;
            lvTxt.y = lvimg.y + 1;
            this.addChild(lvTxt);
        }
        // 等级信息 
        if (this._skincfg && Api.servantVoApi.isOwnSkinOfSkinId(this._skinId)) {
            lvTxt.text = "" + Api.servantVoApi.getServantSkinLV(this._skinId);
        }
        else {
            lvTxt.text = "";
        }
    };
    ServantSkinScrollItem.prototype.getSpaceX = function () {
        return 10;
    };
    ServantSkinScrollItem.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_SERVANT_SKIN_SWITCH, this.bgSwitchHandler, this);
        this._skincfg = null;
        this._skinId = null;
        this._iconBg = null;
        this._isDown = false;
        _super.prototype.dispose.call(this);
    };
    return ServantSkinScrollItem;
}(BaseDisplayObjectContainer));
__reflect(ServantSkinScrollItem.prototype, "ServantSkinScrollItem");
//# sourceMappingURL=ServantSkinScrollItem.js.map