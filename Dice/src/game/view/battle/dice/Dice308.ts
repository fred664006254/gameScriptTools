/**
 * --原名称：感染骰子  --新名称：感染
*/
class Dice308 extends BaseDice{
    public constructor(data:DiceData, appearEff?:string)
    {
        super(data,appearEff);
    }

    protected checkAtk(starIdx:number):void
    {
        let dicedata = this.getDiceData();
        let isMe=dicedata.isMe
        let initInfo=Api.BattleVoApi.getInitInfo(isMe);
        let monstersList=isMe?BattleStatus.meMonsterList:BattleStatus.targetMonsterList;
        let findmonsterDataList = DiceHelper.diceFindMonster(dicedata,isMe);
        let l=findmonsterDataList?findmonsterDataList.length:0;

        if(l>0)
        {
            const vo = findmonsterDataList[0];
            if(vo && !vo.lost(isMe)){
                this.createBullet(starIdx,findmonsterDataList);
                // let buffData:IBuffData={diceId:`${dicedata.id}`,keep:0,cd:0,isMe:dicedata.isMe,posion:true,dicedata:App.CommonUtil.object_clone(dicedata)};
                // MonsterBuff.addBuff(buffData,vo);
            }
        }
    }
}