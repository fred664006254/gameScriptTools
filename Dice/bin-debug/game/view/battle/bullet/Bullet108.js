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
 * --原名称：赌博 现在：命运
 * 实际伤害额外增加0--最大暴击伤害的随机值   例：最大暴击伤害351% ， 则是 0--351 的随机值
*/
var Bullet108 = (function (_super) {
    __extends(Bullet108, _super);
    function Bullet108() {
        return _super.call(this) || this;
    }
    //实际伤害额外增加0--最大暴击伤害的随机值   例：最大暴击伤害351% ， 则是 0--351 的随机值
    Bullet108.prototype.calDamageNum = function (monster) {
        var nmDmgData = this.nmDmgData;
        var num = nmDmgData.dmg;
        var initInfo = Api.BattleVoApi.getInitInfo(this.diceData.isMe);
        var maxcrit = initInfo.crivalue;
        var randomvalue = App.MathUtil.seededRandom(0, maxcrit, BattleStatus.battleLogicHasTickTime / (this.diceData.index));
        if (this.diceData.checkIsKill(initInfo.uid) && monster && monster.getMonsterType() != 3 && !monster.isBoss()) {
            this.isKillByOne = true;
            num = monster.getCurHp();
        }
        else {
            num += randomvalue;
        }
        return num;
    };
    Bullet108.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return Bullet108;
}(Bullet));
__reflect(Bullet108.prototype, "Bullet108");
//# sourceMappingURL=Bullet108.js.map