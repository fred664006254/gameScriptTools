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
var BossVo = (function (_super) {
    __extends(BossVo, _super);
    function BossVo() {
        var _this = _super.call(this) || this;
        _this.skillcd = 0;
        _this.cdTimeArr = [];
        _this.initcd = 0;
        return _this;
    }
    BossVo.prototype.initData = function (cfg) {
        _super.prototype.initData.call(this, cfg);
        this.monsterSp = Config.BattleCfg.getBossSp(BattleStatus.battleType == 1 ? BattleStatus.round : Math.floor(BattleStatus.round / 10));
        this.setCdTimeArr(BattleStatus.battleType == 1 ? 0 : BattleStatus.battleLogicHasTickTime);
        this.inithp = this.hp;
    };
    BossVo.prototype.setCdTimeArr = function (time) {
        if (!time) {
            time = this.birthTime;
        }
        this.cdTimeArr = BattleStatus.formatCdPartTime(this.initcd, time);
    };
    BossVo.prototype.dispose = function () {
        this.skillcd = 0;
        this.initcd = 0;
        _super.prototype.dispose.call(this);
    };
    return BossVo;
}(MonsterVo));
__reflect(BossVo.prototype, "BossVo");
//# sourceMappingURL=BossVo.js.map