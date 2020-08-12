class Bullet203 extends Bullet
{
    public constructor()
    {
        super();
    }
    protected extraDamage():void
    {
        let monstersList=this.diceData.isMe?BattleStatus.meMonsterList:BattleStatus.targetMonsterList;
        let findmonsterDataList = DiceHelper.findRangMonster(this.mVoList[0].getCenterDis(),this.diceData.property3[0],this.diceData.isMe);
        let l=findmonsterDataList.length;
        for (let i = 0; i < l; i++) 
        {
            const mData = findmonsterDataList[i];
            if(!mData.lost(this.diceData.isMe))
            {
                const monster=monstersList[mData.getName()];
                monster.beAtk({hp:this.diceData.property1,isMe:this.diceData.isMe,crit:false});
            }
            
        }
    }
}