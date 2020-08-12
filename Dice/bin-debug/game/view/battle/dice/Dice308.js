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
 * --原名称：感染骰子  --新名称：感染
*/
var Dice308 = (function (_super) {
    __extends(Dice308, _super);
    function Dice308(data, appearEff) {
        return _super.call(this, data, appearEff) || this;
    }
    Dice308.prototype.checkAtk = function (starIdx) {
        var dicedata = this.getDiceData();
        var isMe = dicedata.isMe;
        var initInfo = Api.BattleVoApi.getInitInfo(isMe);
        var monstersList = isMe ? BattleStatus.meMonsterList : BattleStatus.targetMonsterList;
        var findmonsterDataList = DiceHelper.diceFindMonster(dicedata, isMe);
        var l = findmonsterDataList ? findmonsterDataList.length : 0;
        if (l > 0) {
            var vo = findmonsterDataList[0];
            if (vo && !vo.lost(isMe)) {
                this.createBullet(starIdx, findmonsterDataList);
                // let buffData:IBuffData={diceId:`${dicedata.id}`,keep:0,cd:0,isMe:dicedata.isMe,posion:true,dicedata:App.CommonUtil.object_clone(dicedata)};
                // MonsterBuff.addBuff(buffData,vo);
            }
        }
    };
    return Dice308;
}(BaseDice));
__reflect(Dice308.prototype, "Dice308");
//# sourceMappingURL=Dice308.js.map