/**
 * - --原名称：吸收骰子  --新名称：汲取
 * 从敌人身上吸收SP
*/
class Dice310 extends BaseDice
{
    public constructor(data:DiceData, appearEff?:string)
    {
        super(data,appearEff);
    }

    protected init(data:DiceData,appeareff?:string):void
    {
        super.init(data,appeareff);
        let dicedata = this.getDiceData();
        dicedata.special2cd = (dicedata.property2) * 1000;
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
        super.checkDoAction();
    }

    protected createBullet(starIdx:number,findmonsterDataList:MonsterVo[]):void
    {
        let dicedata = this.getDiceData();
        // let starX=BattleStatus.starCfg[dicedata.star-1][starIdx].x*DiceScaleEnum.scale_41;
        // let starY=BattleStatus.starCfg[dicedata.star-1][starIdx].y*DiceScaleEnum.scale_41;
        let fpos={x:this.x,y:this.y};
        let bullet=<Bullet310>Bullet.createBullet(dicedata,fpos);
        if(this.checkHasBuff(dicedata.id)){
            bullet.setAddSp();
            this.removeBuff(dicedata.id);
        }
        bullet.atk(findmonsterDataList);
    }

    protected checkSpecial2Atk(starIdx:number):void{
        let dicedata = this.getDiceData();
        let buffData:IDiceBuffData={diceId:dicedata.id, keep:0, cd:0, isMe:dicedata.isMe};//this._keep
        DiceBuff.addBuff(buffData,this);
    }

    public dispose():void{
        super.dispose();
    }
}