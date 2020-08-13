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
 * 门客详情new 神器ServantNewUIWeaponItem部分
 * author shaoliang
 * date 2019/7/31
 * @class ServantNewUIWeaponItem
 */
var ServantNewUIWeaponItem = (function (_super) {
    __extends(ServantNewUIWeaponItem, _super);
    function ServantNewUIWeaponItem() {
        var _this = _super.call(this) || this;
        _this._servantId = null;
        _this._bottomH = 0;
        _this._barGroup = null;
        _this._containerTab = {};
        return _this;
    }
    ServantNewUIWeaponItem.prototype.init = function (servantId, bottomH) {
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WEAPON_UPGRADE), this.checkWeaponRed, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WEAPON_UPGRADETEN), this.checkWeaponRed, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WEAPON_UPABILITY), this.checkWeaponRed, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WEAPON_UPSKILL), this.checkWeaponRed, this);
        this._servantId = servantId;
        this._bottomH = bottomH;
        var weaponVo = Api.weaponVoApi.getWeaponInfoVoByServantId(servantId);
        if (!weaponVo) {
            var blackBg = BaseBitmap.create("public_9_bg11");
            blackBg.width = GameConfig.stageWidth;
            blackBg.height = bottomH;
            this.addChild(blackBg);
            var noGetText = ComponentManager.getTextField(LanguageManager.getlocal("weapon_not_get"), TextFieldConst.FONTSIZE_CONTENT_COMMON);
            noGetText.setPosition(blackBg.width / 2 - noGetText.width / 2, bottomH / 2 - 12);
            this.addChild(noGetText);
            return;
        }
        var barTabNames = ["weapon_info_btn1", "weapon_info_btn2", "weapon_info_btn3"];
        this._barGroup = ComponentManager.getTabBarGroup(barTabNames, barTabNames, this.tabBtnClickHandler, this, null, TabBarGroup.ALIGN_VERTICAL, null, true);
        this._barGroup.x = 0;
        this._barGroup.y = 30;
        this.addChild(this._barGroup);
        this.tabBtnClickHandler({ index: 0 });
        this.checkWeaponRed();
    };
    ServantNewUIWeaponItem.prototype.checkWeaponRed = function () {
        var weaponVo = Api.weaponVoApi.getWeaponInfoVoByServantId(this._servantId);
        for (var i = 0; i < 3; i++) {
            var showred = false;
            if (i == 0) {
                showred = weaponVo.checkLevelUp1();
            }
            if (i == 1) {
                showred = weaponVo.checkLevelUp2();
            }
            else if (i == 2) {
                showred = weaponVo.checkLevelUp3();
            }
            if (showred) {
                this._barGroup.addRedPoint(i);
            }
            else {
                this._barGroup.removeRedPoint(i);
            }
        }
    };
    ServantNewUIWeaponItem.prototype.tabBtnClickHandler = function (params) {
        var tarIdx = params.index;
        var btnKey = String(tarIdx + 1);
        for (var key in this._containerTab) {
            this._containerTab[key].visible = false;
        }
        if (this._containerTab[btnKey]) {
            this._containerTab[btnKey].visible = true;
        }
        else {
            this.initContainer(btnKey);
        }
        if (btnKey == "1" || btnKey == "3") {
            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_SELECTED_WEAPON_PROMATION, [1]);
        }
        else if (btnKey == "2") {
            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_SELECTED_WEAPON_PROMATION, [2]);
        }
    };
    ServantNewUIWeaponItem.prototype.initContainer = function (btnKey) {
        var tmpNode = new BaseDisplayObjectContainer();
        this.addChild(tmpNode);
        if (btnKey == "1") {
            var node1 = new ServantWeaponNode1();
            node1.init(this._servantId, this._bottomH);
            tmpNode.addChild(node1);
        }
        else if (btnKey == "2") {
            var node2 = new ServantWeaponNode2();
            node2.init(this._servantId, this._bottomH);
            tmpNode.addChild(node2);
        }
        else if (btnKey == "3") {
            var node3 = new ServantWeaponNode3();
            node3.init(this._servantId, this._bottomH);
            tmpNode.addChild(node3);
        }
        this._containerTab[btnKey] = tmpNode;
    };
    ServantNewUIWeaponItem.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WEAPON_UPGRADE), this.checkWeaponRed, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WEAPON_UPGRADETEN), this.checkWeaponRed, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WEAPON_UPABILITY), this.checkWeaponRed, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WEAPON_UPSKILL), this.checkWeaponRed, this);
        this._servantId = null;
        this._barGroup = null;
        this._containerTab = null;
        this._bottomH = 0;
        _super.prototype.dispose.call(this);
    };
    return ServantNewUIWeaponItem;
}(BaseDisplayObjectContainer));
__reflect(ServantNewUIWeaponItem.prototype, "ServantNewUIWeaponItem");
//# sourceMappingURL=ServantNewUIWeaponItem.js.map