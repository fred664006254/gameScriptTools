var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var ServantSkinVo = /** @class */ (function (_super) {
    __extends(ServantSkinVo, _super);
    function ServantSkinVo() {
        var _this = _super.call(this) || this;
        _this.skinid = ""; //皮肤id
        _this.slv = 0; //皮肤等级
        _this.aura = []; //皮肤光环等级
        _this.specialAura = 1; //皮肤开启门客光环等级
        return _this;
    }
    ServantSkinVo.prototype.initData = function (data) {
        if (data) {
            this.slv = data.slv;
            this.ability = data.ability;
            this.aura = data.aura ? data.aura : [];
            this.specialAura = data.specialAura ? data.specialAura : 1;
        }
    };
    ServantSkinVo.prototype.getbookLv = function (bid) {
        var lv = 0;
        if (this.ability[bid] && this.ability[bid].alv) {
            lv = this.ability[bid].alv;
        }
        return lv;
    };
    ServantSkinVo.prototype.getbookIdList = function () {
        return Object.keys(this.ability);
    };
    /**
     * 是否还有可以学习的书籍
     */
    ServantSkinVo.prototype.hasBookCanGet = function () {
        var skincfg = Config.ServantskinCfg.getServantSkinItemById(this.skinid);
        return this.getbookIdList().length < skincfg.ability.length;
    };
    ServantSkinVo.prototype.getSkinStarNum = function () {
        var num = 0;
        for (var key in this.ability) {
            if (this.ability.hasOwnProperty(key)) {
                var tmpAcfg = GameConfig.config.abilityCfg[key];
                num += tmpAcfg.num;
            }
        }
        return num;
    };
    //书籍资质加成
    ServantSkinVo.prototype.getSkinBookNum = function (_servantId) {
        var _servantInfoObj = Api.servantVoApi.getServantObj(_servantId);
        var servantCfg = GameConfig.config.servantCfg[_servantId];
        var ability = _servantInfoObj.getAbilityIdList();
        var tmpAcfg = undefined;
        var totalBookV = 0;
        for (var index2 = 0; index2 < ability.length; index2++) {
            var aid = ability[index2];
            var tmpability = servantCfg.ability;
            var aLv = 0;
            var oriidx = tmpability.indexOf(aid);
            if (oriidx > -1) {
            }
            else {
                aLv = _servantInfoObj.getSkinBookLv2(aid);
            }
            tmpAcfg = GameConfig.config.abilityCfg[aid];
            totalBookV += aLv * tmpAcfg.num;
        }
        return totalBookV;
    };
    ServantSkinVo.prototype.getSkinAuraLv = function (id) {
        var num = 0;
        if (this.aura[id]) {
            num = this.aura[id];
        }
        return num;
    };
    ServantSkinVo.prototype.dispose = function () {
        this.skinid = "";
        this.slv = 0;
        this.ability = null;
        this.aura = [];
    };
    return ServantSkinVo;
}(BaseVo));
//# sourceMappingURL=ServantSkinVo.js.map