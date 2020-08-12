/**
 * 暗影骰子 地刺
*/
class Dice203 extends BaseDice{
    public constructor(data:DiceData, appearEff?:string)
    {
        super(data,appearEff);
    }

    protected checkAtk(starIdx:number):void
    {
        let dicedata = this.getDiceData();
        let isMe=dicedata.isMe
        let initInfo=Api.BattleVoApi.getInitInfo(isMe);
        // let monsterDataList=isMe?BattleStatus.meMonsterDataList:BattleStatus.targetMonsterDataList;
        let monstersList=isMe?BattleStatus.meMonsterList:BattleStatus.targetMonsterList;
        let findmonsterDataList = DiceHelper.diceFindMonster(dicedata,isMe);
        let l=findmonsterDataList?findmonsterDataList.length:0;
        if(l>0)
        {
            
            const vo = findmonsterDataList[0];
            // let monster=monstersList[vo.getName()];
            this.createBullet(starIdx,findmonsterDataList);
            // this.normalAtk(monster,initInfo);
            // this.propertyAtk(findmonsterDataList);
        }
        else
        {
            if(dicedata.type==5)
            {
                this.createObstacle(starIdx);
                this.playAtkSound();
            }
        }
    }
}