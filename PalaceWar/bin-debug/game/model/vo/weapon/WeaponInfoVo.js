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
var WeaponInfoVo = (function (_super) {
    __extends(WeaponInfoVo, _super);
    function WeaponInfoVo() {
        var _this = _super.call(this) || this;
        _this.id = "";
        // 强化等级
        _this.lv = 0;
        // 加工等级
        _this.clv = 0;
        _this.attrAdd = [];
        // 总属性
        _this.total = 0;
        // 四种属性
        _this.attr = [];
        // 资质值
        _this.ability = [];
        // 技能等级
        _this.skill2 = 0;
        return _this;
    }
    WeaponInfoVo.prototype.initData = function (data) {
        if (data) {
            if (data.lv != null) {
                this.lv = Number(data.lv);
            }
            if (data.clv != null) {
                this.clv = Number(data.clv);
            }
            if (data.attrAdd != null) {
                this.attrAdd = data.attrAdd;
            }
            if (data.total != null) {
                this.total = Number(data.total);
            }
            if (data.attr != null) {
                this.attr = data.attr;
            }
            if (data.ability != null) {
                this.ability = data.ability;
            }
            if (data.skill2 != null) {
                this.skill2 = Number(data.skill2);
            }
        }
    };
    WeaponInfoVo.prototype.getTotalAbility = function () {
        var t = 0;
        for (var key in this.ability) {
            t += this.ability[key];
        }
        return t;
    };
    /**
     * t : 类型 1～8 。 1本服擂台攻击 2雁门关战斗力 3帮会争霸战力 4八王夺帝攻击 5削藩平乱势力 6跨服擂台攻击 7绝地擂台攻击 8定军中原攻击
     */
    WeaponInfoVo.prototype.getSpecialityByType = function (t) {
        var value = 0;
        var pTab = this.cfg.getWeaponPromotionValue(this.clv);
        if (t == 1) {
            value = pTab[0] * 30 + this.lv * 2;
        }
        else if (t == 2) {
            value = pTab[1] * 1000 * this.lv + pTab[1] * 5000 + 1000 * this.lv;
        }
        else if (t == 3) {
            value = pTab[2] * 1000 * this.lv + pTab[2] * 5000 + 1000 * this.lv;
        }
        else if (t == 4) {
            value = pTab[3] * 30 + this.lv * 2;
        }
        else if (t == 5) {
            value = Math.floor(0.5 * (pTab[4] * (this.lv * this.lv + this.lv + 98) / 10));
        }
        else if (t == 6) {
            value = pTab[4] * 30 + this.lv * 2;
        }
        else if (t == 7) {
            value = pTab[4] * 30 + this.lv * 2;
        }
        else if (t == 8) {
            value = Math.floor(0.5 * (pTab[4] * (this.lv * this.lv + this.lv + 98) / 10));
        }
        return value;
    };
    //门客洁面神器按钮的红点
    WeaponInfoVo.prototype.checkRedDot = function () {
        if (this.lv == 1 && this.clv == 1 && this.skill2 == 1) {
            if (LocalStorageManager.get('weapon_reddot' + this.id) == '') {
                return true;
            }
        }
        return false;
    };
    WeaponInfoVo.prototype.setRedDot = function () {
        LocalStorageManager.set('weapon_reddot' + this.id, '1');
    };
    Object.defineProperty(WeaponInfoVo.prototype, "cfg", {
        get: function () {
            return Config.ServantweaponCfg.getWeaponItemById(this.id);
        },
        enumerable: true,
        configurable: true
    });
    //小红点
    WeaponInfoVo.prototype.checkCanMakeUp = function () {
        if (this.checkLevelUp1() || this.checkLevelUp2() || this.checkLevelUp3()) {
            return true;
        }
        return false;
    };
    //锻造
    WeaponInfoVo.prototype.checkLevelUp1 = function () {
        if (this.lv >= this.cfg.getMaxLv()) {
            return false;
        }
        var servantInfoObj = Api.servantVoApi.getServantObj(String(this.cfg.servantID));
        if (this.lv >= servantInfoObj.level) {
            return false;
        }
        var itemString = Config.ServantweaponCfg.weaponLv[String(this.lv)].needItem;
        var itemsVo = GameData.formatRewardItem(itemString);
        var canLevlup = true;
        for (var i = 0; i < itemsVo.length; i++) {
            var oneVo = itemsVo[i];
            var hasNum = Api.itemVoApi.getItemNumInfoVoById(oneVo.id);
            if (hasNum < oneVo.num) {
                canLevlup = false;
                break;
            }
        }
        if (canLevlup) {
            return true;
        }
        return false;
    };
    //加工
    WeaponInfoVo.prototype.checkLevelUp2 = function () {
        if (this.clv >= this.cfg.getMaxPromotionLv()) {
            return false;
        }
        if (this.clv >= this.lv) {
            return false;
        }
        var itemString = Config.ServantweaponCfg.getWeaponPromotionItemById(String(this.clv)).needItem;
        var itemsVo = GameData.formatRewardItem(itemString);
        var canLevlup = true;
        for (var i = 0; i < itemsVo.length; i++) {
            var oneVo = itemsVo[i];
            var hasNum = Api.itemVoApi.getItemNumInfoVoById(oneVo.id);
            if (hasNum < oneVo.num) {
                canLevlup = false;
                break;
            }
        }
        if (canLevlup) {
            return true;
        }
        return false;
    };
    WeaponInfoVo.prototype.checkLevelUp3 = function () {
        if (this.skill2 >= this.cfg.getMaxSoulLv()) {
            return false;
        }
        var servantCfg = Config.ServantCfg.getServantItemById(this.cfg.servantID);
        if (servantCfg.aura) {
            var sids = servantCfg.aura["1"]["growNeed1"];
            for (var i = 0; i < sids.length; i++) {
                var sid = sids[i];
                var oneweaponVo = Api.weaponVoApi.getWeaponInfoVoByServantId(sid);
                if (!oneweaponVo || oneweaponVo.skill2 < this.skill2) {
                    return false;
                }
            }
        }
        var needNum = Config.ServantweaponCfg.weaponSoul[String(this.skill2)].needItem;
        var hasNum = Api.itemVoApi.getItemNumInfoVoById(this.cfg.itemID);
        if (hasNum >= needNum) {
            return true;
        }
        return false;
    };
    WeaponInfoVo.prototype.getAttributeValueByType = function (t) {
        if (this["getAttributeValueType" + t]) {
            return this["getAttributeValueType" + t]();
        }
        return "0";
    };
    /**
     * 三国争霸神器属性 暴击是百分比
    */
    WeaponInfoVo.prototype.getAttributeValueType1 = function () {
        var type = this.cfg.attributeType1;
        var add = 0;
        var total = this.getTotalAbility();
        switch (type) {
            case 1:
                add = total * 200 + this.lv * 5;
                break;
            case 2:
                add = Math.floor(1 * (total * (this.lv * this.lv + this.lv + 98) / 10));
                break;
            case 3:
                add = total * 0.01 + this.lv * 0.005;
                break;
            case 4:
                add = total * 4 + this.lv * 0.1;
                break;
            case 5:
                add = Math.floor(0.02 * (total * (this.lv * this.lv + this.lv + 98) / 10));
                break;
            case 6:
                add = total * 0.0002 + this.lv * 0.0001;
                break;
            case 7:
                add = total * 400 + this.lv * 10;
                break;
        }
        var v = this.cfg.attribute1 + add;
        var strV;
        if (type == 3 || type == 6) {
            v *= 10000;
            v = Math.floor(v + 0.5);
            strV = String(v / 100) + "%";
        }
        else {
            v = Math.floor(v + 0.5);
            strV = String(v);
        }
        return strV;
    };
    WeaponInfoVo.prototype.dispose = function () {
        this.id = "";
        this.lv = 0;
        this.clv = 0;
        this.attrAdd.length = 0;
        this.total = 0;
        this.attr.length = 0;
        this.ability.length = 0;
        this.total = 0;
    };
    return WeaponInfoVo;
}(BaseVo));
__reflect(WeaponInfoVo.prototype, "WeaponInfoVo");
//# sourceMappingURL=WeaponInfoVo.js.map