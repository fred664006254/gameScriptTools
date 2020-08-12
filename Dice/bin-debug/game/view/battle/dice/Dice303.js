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
 * --原名称：激光骰子  --新名称：激光
*/
var Dice303 = (function (_super) {
    __extends(Dice303, _super);
    function Dice303(data, appearEff) {
        var _this = _super.call(this, data, appearEff) || this;
        _this._curmonstername = "";
        return _this;
    }
    Dice303.prototype.createBullet = function (starIdx, findmonsterDataList) {
        var dicedata = this.getDiceData();
        var monstersList = dicedata.isMe ? BattleStatus.meMonsterList : BattleStatus.targetMonsterList;
        var monstername = "";
        if (findmonsterDataList[0]) {
            monstername = findmonsterDataList[0].getName();
        }
        if (this._curmonstername != monstername) {
            var monster = monstersList[this._curmonstername];
            if (monster) {
                monster.removeBuff(dicedata.id + "_" + dicedata.posStr + "_" + (dicedata.isMe ? 1 : 2));
            }
        }
        this._curmonstername = monstername;
        this.playAtkAction();
        var fpos = { x: this.x - 15, y: this.y - 45 };
        var bullet = Bullet.createBullet(this.getDiceData(), fpos);
        bullet.atk(findmonsterDataList);
    };
    Dice303.prototype.dispose = function () {
        this._curmonstername = "";
        _super.prototype.dispose.call(this);
    };
    return Dice303;
}(BaseDice));
__reflect(Dice303.prototype, "Dice303");
//# sourceMappingURL=Dice303.js.map