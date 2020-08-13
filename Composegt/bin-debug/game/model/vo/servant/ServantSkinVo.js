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
var ServantSkinVo = (function (_super) {
    __extends(ServantSkinVo, _super);
    function ServantSkinVo() {
        var _this = _super.call(this) || this;
        _this.skinid = ""; //皮肤id
        _this.slv = 0; //皮肤等级
        _this.aura = undefined; //书籍信息
        _this.amuletAura = undefined; //书籍信息
        return _this;
    }
    ServantSkinVo.prototype.initData = function (data) {
        if (data) {
            this.slv = data.slv;
            this.ability = data.ability;
            this.aura = data.aura;
            this.amuletAura = data.amuletAura;
        }
    };
    ServantSkinVo.prototype.getbookLv = function (bid) {
        var lv = this.ability[bid].alv;
        lv = lv ? lv : 0;
        return lv;
    };
    ServantSkinVo.prototype.getbookIdList = function () {
        return Object.keys(this.ability);
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
    ServantSkinVo.prototype.getSkinBookValue = function () {
        var num = 0;
        for (var key in this.ability) {
            if (this.ability.hasOwnProperty(key)) {
                var tmpAcfg = GameConfig.config.abilityCfg[key];
                num += tmpAcfg.num * this.getbookLv(key);
            }
        }
        return num;
    };
    ServantSkinVo.prototype.getSkinAuraIdList = function () {
        var cfg = Config.ServantskinCfg.getServantSkinItemById(this.skinid);
        return cfg.aura;
    };
    // public getAmura
    ServantSkinVo.prototype.dispose = function () {
        this.skinid = "";
        this.slv = 0;
        this.ability = null;
    };
    return ServantSkinVo;
}(BaseVo));
__reflect(ServantSkinVo.prototype, "ServantSkinVo");
