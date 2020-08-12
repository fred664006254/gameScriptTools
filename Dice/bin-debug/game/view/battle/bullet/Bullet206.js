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
 *  --原名称：能量骰子  --新名称：聚能
 * 造成持有SP百分比的伤害
*/
var Bullet206 = (function (_super) {
    __extends(Bullet206, _super);
    function Bullet206() {
        return _super.call(this) || this;
    }
    //附加持有SP百分比的伤害
    Bullet206.prototype.calDamageNum = function (monster) {
        var nmDmgData = this.nmDmgData;
        var selfSpnum = Api.BattleVoApi.getSpNum(this.diceData.isMe);
        var num = nmDmgData.dmg + selfSpnum * this.diceData.property1;
        var initInfo = Api.BattleVoApi.getInitInfo(this.diceData.isMe);
        if (this.diceData.checkIsKill(initInfo.uid) && monster && monster.getMonsterType() != 3 && !monster.isBoss()) {
            this.isKillByOne = true;
            num = monster.getCurHp();
        }
        return num;
    };
    Bullet206.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return Bullet206;
}(Bullet));
__reflect(Bullet206.prototype, "Bullet206");
//# sourceMappingURL=Bullet206.js.map