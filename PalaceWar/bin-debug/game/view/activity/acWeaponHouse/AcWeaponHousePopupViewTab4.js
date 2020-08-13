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
 * 武器架
 * date 2020.6.15
 * @class AcWeaponHousePopupViewTab4
 */
var AcWeaponHousePopupViewTab4 = (function (_super) {
    __extends(AcWeaponHousePopupViewTab4, _super);
    function AcWeaponHousePopupViewTab4(data) {
        var _this = _super.call(this) || this;
        _this.param = data;
        _this.initView();
        return _this;
    }
    AcWeaponHousePopupViewTab4.prototype.initView = function () {
        var rewardBg = BaseBitmap.create(App.CommonUtil.getResByCode("ac_weaponhousetab4bg", this.getTypeCode()));
        rewardBg.setPosition(29, 57);
        this.addChild(rewardBg);
        var cfgs = this.cfg.addScoreList;
        var arr = [[407, 670], [283, 670], [159, 670], [33, 670], [382, 521], [222, 521], [60, 521], [344, 375], [92, 375], [220, 220]];
        for (var i = cfgs.length - 1; i >= 0; i--) {
            var txt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acWeaponHouse_reward_tab4txt", this.getTypeCode()), ["" + cfgs[i].lvScore]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
            txt.width = 140;
            txt.textAlign = egret.HorizontalAlign.CENTER;
            txt.x = arr[i][0];
            txt.y = arr[i][1];
            this.addChild(txt);
        }
        var tiptxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acWeaponHouse_reward_tab4tip", this.getTypeCode())), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, tiptxt, rewardBg, [0, -95]);
        this.addChild(tiptxt);
    };
    AcWeaponHousePopupViewTab4.prototype.refreshView = function () {
    };
    Object.defineProperty(AcWeaponHousePopupViewTab4.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcWeaponHousePopupViewTab4.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcWeaponHousePopupViewTab4.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcWeaponHousePopupViewTab4.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    AcWeaponHousePopupViewTab4.prototype.getTypeCode = function () {
        if (this.code == "2") {
            return "1";
        }
        return this.code;
    };
    AcWeaponHousePopupViewTab4.prototype.dispose = function () {
        var view = this;
        _super.prototype.dispose.call(this);
    };
    return AcWeaponHousePopupViewTab4;
}(CommonViewTab));
__reflect(AcWeaponHousePopupViewTab4.prototype, "AcWeaponHousePopupViewTab4");
//# sourceMappingURL=AcWeaponHousePopupViewTab4.js.map