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
 * 地雷骰子
*/
var Dice402 = (function (_super) {
    __extends(Dice402, _super);
    function Dice402(data, appearEff) {
        return _super.call(this, data, appearEff) || this;
    }
    Dice402.prototype.checkAtk = function (starIdx) {
        var dicedata = this.getDiceData();
        var isMe = dicedata.isMe;
        var initInfo = Api.BattleVoApi.getInitInfo(isMe);
        // let monsterDataList=isMe?BattleStatus.meMonsterDataList:BattleStatus.targetMonsterDataList;
        var monstersList = isMe ? BattleStatus.meMonsterList : BattleStatus.targetMonsterList;
        var findmonsterDataList = DiceHelper.diceFindMonster(dicedata, isMe);
        var l = findmonsterDataList ? findmonsterDataList.length : 0;
        if (l > 0) {
            var vo = findmonsterDataList[0];
            // let monster=monstersList[vo.getName()];
            this.createBullet(starIdx, findmonsterDataList);
            // this.normalAtk(monster,initInfo);
            // this.propertyAtk(findmonsterDataList);
        }
        else {
            if (dicedata.type == 5) {
                this.createObstacle(starIdx);
            }
        }
    };
    return Dice402;
}(BaseDice));
__reflect(Dice402.prototype, "Dice402");
//# sourceMappingURL=Dice402.js.map