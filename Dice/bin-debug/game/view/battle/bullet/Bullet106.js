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
 *新名称：斩首 对boss2倍伤害
*/
var Bullet106 = (function (_super) {
    __extends(Bullet106, _super);
    function Bullet106() {
        return _super.call(this) || this;
    }
    Bullet106.prototype.calDamageNum = function (monster) {
        var nmDmgData = this.nmDmgData;
        var num = nmDmgData.dmg;
        if (monster.isBoss() || monster.getMonsterType() == 3) {
            num *= 2;
        }
        var initInfo = Api.BattleVoApi.getInitInfo(this.diceData.isMe);
        if (this.diceData.checkIsKill(initInfo.uid) && monster && monster.getMonsterType() != 3 && !monster.isBoss()) {
            this.isKillByOne = true;
            num = monster.getCurHp();
        }
        return num;
    };
    Bullet106.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return Bullet106;
}(Bullet));
__reflect(Bullet106.prototype, "Bullet106");
//# sourceMappingURL=Bullet106.js.map