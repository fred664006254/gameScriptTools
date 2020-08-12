class Bullet104 extends Bullet
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
            let buffData={diceId:diceData.id,keep:0,damage:diceData.property1,cd:1000,isMe:diceData.isMe};
            MonsterBuff.addBuff(buffData,vo);
        }
    }
    public reset():void
    {
        super.reset();
    }
}