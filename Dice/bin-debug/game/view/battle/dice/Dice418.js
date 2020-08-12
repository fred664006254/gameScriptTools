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
 * --原名称：时间骰子  --新名称：时光骰子
*/
var Dice418 = (function (_super) {
    __extends(Dice418, _super);
    function Dice418(data, appearEff) {
        return _super.call(this, data, appearEff) || this;
    }
    Dice418.prototype.init = function (data, appeareff) {
        _super.prototype.init.call(this, data, appeareff);
        //敌对骰子 同等星级的 pvp降低攻速 pve提升攻速
        var ispvp = BattleStatus.battleType == 1;
        BattleStatus.scene.addTimeBuff(!data.isMe, data.star, data.property1 * (ispvp ? -1 : 1));
    };
    Dice418.prototype.refresh = function (data, appeareff) {
        BattleStatus.scene.removeTimeBuff(!data.isMe, this.getDiceStars());
        _super.prototype.refresh.call(this, data, appeareff);
        var ispvp = BattleStatus.battleType == 1;
        BattleStatus.scene.addTimeBuff(!data.isMe, data.star, data.property1 * (ispvp ? -1 : 1));
    };
    Dice418.prototype.powerup = function (pwlv) {
        _super.prototype.powerup.call(this, pwlv);
        var data = this.getDiceData();
        var ispvp = BattleStatus.battleType == 1;
        BattleStatus.scene.changeTimeBuffSpeed(!data.isMe, data.property1 * (ispvp ? -1 : 1));
    };
    Dice418.prototype.dispose = function () {
        var data = this.getDiceData();
        if (BattleStatus.scene) {
            BattleStatus.scene.removeTimeBuff(!data.isMe, data.star);
        }
        _super.prototype.dispose.call(this);
    };
    return Dice418;
}(BaseDice));
__reflect(Dice418.prototype, "Dice418");
//# sourceMappingURL=Dice418.js.map