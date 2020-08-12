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
 * --原名称：暴击骰子  --新名称：会心
 * 增加周围暴击
*/
var Dice205 = (function (_super) {
    __extends(Dice205, _super);
    function Dice205(data, appearEff) {
        return _super.call(this, data, appearEff) || this;
    }
    Dice205.prototype.dispose = function () {
        var x = this.getPos().x;
        var y = this.getPos().y;
        if (BattleStatus.scene) {
            var list = BattleStatus.scene.getDiceList(this.checkIsMe());
            for (var i = 1; i < 5; ++i) {
                var posx = x;
                var posy = y;
                if (i == 1) {
                    posy -= 1;
                }
                else if (i == 2) {
                    posy += 1;
                }
                else if (i == 3) {
                    posx -= 1;
                }
                else if (i == 4) {
                    posx += 1;
                }
                var dice_1 = list[posx + "_" + posy];
                if (dice_1 && Config.DiceCfg.checkHasNmAtk(dice_1.getDiceId())) {
                    dice_1.removeBuff(this.getDiceId(), x + "_" + y);
                }
            }
        }
        _super.prototype.dispose.call(this);
    };
    return Dice205;
}(BaseDice));
__reflect(Dice205.prototype, "Dice205");
//# sourceMappingURL=Dice205.js.map