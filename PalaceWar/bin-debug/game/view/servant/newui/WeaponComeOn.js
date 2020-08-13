/**
 * 神器登场
 * author shaoliang
 * date 2019/8/28
 * @class WeaponComeOnView
 */
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
var WeaponComeOnView = (function (_super) {
    __extends(WeaponComeOnView, _super);
    function WeaponComeOnView() {
        var _this = _super.call(this) || this;
        _this._function = null;
        _this._obj = null;
        _this._showType = 0;
        return _this;
    }
    WeaponComeOnView.prototype.getTitleBgName = function () {
        return null;
    };
    WeaponComeOnView.prototype.getTitleStr = function () {
        return null;
    };
    WeaponComeOnView.prototype.getBgName = function () {
        return "public_alphabg";
    };
    WeaponComeOnView.prototype.isShowMask = function () {
        return false;
    };
    WeaponComeOnView.prototype.getResourceList = function () {
        var rewardPic = _super.prototype.getResourceList.call(this);
        return rewardPic.concat([
            "weapon_show_bg", "wifestatus_namebg", "servant_upgrade_frame",
        ]);
    };
    //type 1我方左 2我方中 3我放右 4敌方右 5敌方中
    //atype 属性类型
    WeaponComeOnView.prototype.initView = function () {
        var type = this.param.data.type;
        var sid = this.param.data.sid;
        var value = this.param.data.value;
        var atype = this.param.data.atype;
        var type2 = this.param.data.type2;
        var sid2 = this.param.data.sid2;
        var value2 = this.param.data.value2;
        var atype2 = this.param.data.atype2;
        this._function = this.param.data.f;
        this._obj = this.param.data.o;
        if (type == 1 || type == 2 || type == 6 || type == 7) {
            var weaponCfg = Config.ServantweaponCfg.getWeaponItemByServantId(sid);
            var weaponVo = null;
            if (weaponCfg) {
                weaponVo = Api.weaponVoApi.getWeaponInfoVoById(weaponCfg.id);
            }
            if (!value && weaponVo) {
                value = weaponVo.getSpecialityByType(atype);
            }
        }
        this.touchEnabled = true;
        this.addTouchTap(this.hide, this, null);
        if (value && value2) {
            this._showType = 3;
            this.showWeapon(type, sid, value, atype);
            this.showWeapon(type2, sid2, value2, atype2);
        }
        else if (value) {
            this._showType = 1;
            this.showWeapon(type, sid, value, atype);
        }
        else if (value2) {
            this._showType = 2;
            this.showWeapon(type2, sid2, value2, atype2);
        }
        else {
            this.hide();
        }
    };
    //type 7 削藩平乱 右 
    WeaponComeOnView.prototype.showWeapon = function (type, sid, value, atype) {
        var weaponCfg = Config.ServantweaponCfg.getWeaponItemByServantId(sid);
        var auto = this.param.data.auto;
        var posX = 300;
        var posY = GameConfig.stageHeigth - 460;
        var posYO = GameConfig.stageHeigth - 200;
        var posY1 = GameConfig.stageHeigth - 330;
        if (type == 3) {
            posX = 10;
        }
        else if (type > 3) {
            posX = 60;
            posYO = 400;
        }
        if (atype == 3 || atype == 5) {
            posYO = GameConfig.stageHeigth - 480;
            if (type == 1) {
                posX = 390;
            }
        }
        else if (atype == 8) {
            if (type == 1) {
                posX = 390;
            }
        }
        posY = posYO - 260;
        posY1 = posYO - 130;
        ;
        var weaponNode = new BaseDisplayObjectContainer();
        weaponNode.setPosition(posX, posYO);
        var weaponbg = BaseBitmap.create("weapon_show_bg");
        weaponbg.setScale(0.5);
        weaponNode.addChild(weaponbg);
        var weaponImg = BaseLoadBitmap.create(weaponCfg.icon);
        weaponImg.width = 346 * 0.4;
        weaponImg.height = 346 * 0.4;
        weaponImg.setPosition(weaponbg.width * weaponbg.scaleX / 2 - weaponImg.width / 2, weaponbg.height * weaponbg.scaleY / 2 - weaponImg.height / 2 - 20);
        weaponNode.addChild(weaponImg);
        var nameBg = BaseBitmap.create("wifestatus_namebg");
        nameBg.width = 170;
        nameBg.height = 66;
        nameBg.setPosition(weaponbg.width * weaponbg.scaleX - 20, weaponbg.height * weaponbg.scaleY / 2 - nameBg.height / 2);
        weaponNode.addChild(nameBg);
        var name = ComponentManager.getTextField(weaponCfg.name, 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        name.setPosition(nameBg.x + nameBg.width / 2 - name.width / 2, nameBg.y + 10);
        weaponNode.addChild(name);
        var add = ComponentManager.getTextField(LanguageManager.getlocal("weapon_attack", [String(value)]), 18, TextFieldConst.COLOR_QUALITY_GREEN);
        add.setPosition(nameBg.x + nameBg.width / 2 - add.width / 2, nameBg.y + 34);
        weaponNode.addChild(add);
        var temp = BaseBitmap.create("servant_upgrade_frame1");
        var clip = ComponentManager.getCustomMovieClip("servant_upgrade_frame", 5, 100);
        clip.setScale(2);
        clip.setPosition(posX - 90, posY - 70);
        this.addChild(clip);
        var view = this;
        clip.setEndCallBack(function () {
            clip.visible = false;
        }, this);
        clip.playWithTime(1);
        this.addChild(weaponNode);
        egret.Tween.get(weaponNode).to({ y: posY1 }, 250).to({ y: posY, alpha: 0 }, 300).call(this.hide, this);
    };
    WeaponComeOnView.prototype.hide = function () {
        if (this._function && this._obj) {
            this._function.apply(this._obj, [this._showType]);
        }
        _super.prototype.hide.call(this);
    };
    WeaponComeOnView.prototype.dispose = function () {
        this._function = null;
        this._obj = null;
        this._showType = 0;
        _super.prototype.dispose.call(this);
    };
    return WeaponComeOnView;
}(BaseView));
__reflect(WeaponComeOnView.prototype, "WeaponComeOnView");
//# sourceMappingURL=WeaponComeOn.js.map