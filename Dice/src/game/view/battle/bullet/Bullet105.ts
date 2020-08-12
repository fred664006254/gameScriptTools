class Bullet105 extends Bullet
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
            let buffData:IBuffData={diceId:diceData.id,keep:0,speed:diceData.property1,cd:0,isMe:diceData.isMe,maxOverlap:diceData.property3[0]};
            MonsterBuff.addBuff(buffData,vo);
        }
    }
    public reset():void
    {
        super.reset();
    }
}