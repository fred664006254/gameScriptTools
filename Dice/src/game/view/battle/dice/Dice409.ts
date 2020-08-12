/**
 * --原名称：成长骰子  --新名称：生长
*/
class Dice409 extends BaseDice
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
        if(!dicedata.checkMaxStar()){
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
    }

    protected checkSpecial2Atk(starIdx:number):void
    {
        //成长一次
        this.playAtkSound();
        if(BattleStatus.scene){
           App.MsgHelper.dispEvt(MsgConst.BATTLECREATE_DICE, {
               type : `grow`,
               pos : `${this.getPos().x}_${this.getPos().y}`,
               isMe : this.getDiceData().isMe,
               seed : BattleStatus.battleLogicHasTickTime / (this.getDiceData().index)
           });
        //    this.alpha = 0;
        }
    }

    public dispose():void{
        super.dispose();
    }
}