/**
 * --原名称：盾牌骰子  --新名称：圣盾
*/
class Dice407 extends BaseDice
{
    public constructor(data:DiceData, appearEff?:string)
    {
        super(data,appearEff);
    }

    protected init(data:DiceData,appeareff?:string):void
    {
        super.init(data,appeareff);
        let dicedata = this.getDiceData();
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
        this.createObstacle(starIdx);
    }
}