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
var Dice103 = (function (_super) {
    __extends(Dice103, _super);
    function Dice103(data, appearEff) {
        var _this = _super.call(this, data, appearEff) || this;
        _this.changeAtkspeed();
        return _this;
    }
    Dice103.prototype.changeAtkspeed = function () {
        var dicedata = this.getDiceData();
        var cfg = Config.DiceCfg.getCfgById(dicedata.id);
        dicedata.cd = Math.ceil(cfg.getAtkSpeedByLv(dicedata.lv) * 1000 * (1 - dicedata.property1) / BattleStatus.minLogicFrame) * BattleStatus.minLogicFrame;
        dicedata.initcd = dicedata.cd;
        dicedata.setCdTimeArr(BattleStatus.battleLogicHasTickTime);
        this.buffExec();
    };
    Dice103.prototype.refresh = function (data, appeareff) {
        _super.prototype.refresh.call(this, data, appeareff);
        this.changeAtkspeed();
    };
    Dice103.prototype.powerup = function (pwlv) {
        _super.prototype.powerup.call(this, pwlv);
        this.changeAtkspeed();
    };
    return Dice103;
}(BaseDice));
__reflect(Dice103.prototype, "Dice103");
//# sourceMappingURL=Dice103.js.map