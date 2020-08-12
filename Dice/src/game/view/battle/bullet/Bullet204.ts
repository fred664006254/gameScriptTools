/**
 * --原名称：龟裂骰子  --新名称：虚弱
*/
class Bullet204 extends Bullet
{
    public constructor()
    {
        super();
    }

    protected extraDamage():void
    {
        let monstersList=this.diceData.isMe?BattleStatus.meMonsterList:BattleStatus.targetMonsterList;
        let vo = this.mVoList[0];
        if(!vo.lost(this.diceData.isMe))
        {

            let diceData=this.diceData;
            let buffData={diceId:diceData.id,keep:0,adddmg:diceData.property1,cd:0,isMe:diceData.isMe};
            MonsterBuff.addBuff(buffData,vo);
        }
    }
    public reset():void
    {
        super.reset();
    }
}