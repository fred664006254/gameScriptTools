/**
 * --原名称：暴风雪骰子  --新名称：极寒
*/
class Dice408 extends BaseDice
{
    private isFirst = false;

    public constructor(data:DiceData, appearEff?:string)
    {
        super(data,appearEff);
    }

    protected init(data:DiceData,appeareff?:string):void
    {
        super.init(data,appeareff);
        let dicedata = this.getDiceData();
        this.isFirst = false;
        dicedata.special2cd = dicedata.property2 * 1000;
        dicedata.setspecial2CdTimeArr();
    }

    public refresh(data:DiceData,appeareff?:string):void
    {
        super.refresh(data, appeareff);
        let dicedata = this.getDiceData();
        dicedata.special2cd = dicedata.property2 * 1000;
        dicedata.setspecial2CdTimeArr(BattleStatus.battleLogicHasTickTime);
    }

    public checkDoAction():void{
        super.checkDoAction();
        let dicedata = this.getDiceData();
        let arr3=dicedata.special2cdTimeArr;
        let l3=arr3.length;
        for (let i = 0; i < l3; i++) 
        {
            let t=arr3[i];
            if(!!BattleStatus.checkCdDoTime(dicedata.special2cd,t))
            {
                this.checkSpecial2Atk(i);
            }
        }
    }

    protected checkSpecial2Atk(starIdx:number):void
    {
        let dicedata = this.getDiceData();
        this.playAtkSound();
        // this.createObstacle(starIdx);
        let monstersdataList=dicedata.isMe?BattleStatus.meMonsterDataList:BattleStatus.targetMonsterDataList;
        let monstersList=dicedata.isMe?BattleStatus.meMonsterList:BattleStatus.targetMonsterList;
        let keys = Object.keys(monstersdataList);
        let l = keys.length;
        for (let i = 0; i < l; i++) 
        {
            const monstervo = monstersdataList[i];
            const monster = monstersList[monstervo.getName()];
            if(!monstervo.lost(dicedata.isMe))
            {
                //dicedata
                let buffData:IBuffData={diceId:dicedata.id, keep:0, speed:dicedata.property1, cd:0, isMe:dicedata.isMe};//this._keep
                MonsterBuff.addBuff(buffData,monstervo);
            }
        }
        BattleStatus.scene.stormIceEff(dicedata.isMe);
    }

    public dispose():void{
        this.isFirst = false;
        super.dispose();
    }
}