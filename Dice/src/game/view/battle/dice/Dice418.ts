/**
 * --原名称：时间骰子  --新名称：时光骰子
*/
class Dice418 extends BaseDice
{
    public constructor(data:DiceData, appearEff?:string){
        super(data,appearEff);
    }

    protected init(data:DiceData,appeareff?:string):void{
        super.init(data,appeareff);
        //敌对骰子 同等星级的 pvp降低攻速 pve提升攻速
        let ispvp = BattleStatus.battleType == 1;
        BattleStatus.scene.addTimeBuff(!data.isMe, data.star, data.property1*(ispvp?-1:1));
    }

    public refresh(data:DiceData,appeareff?:string):void{
        BattleStatus.scene.removeTimeBuff(!data.isMe, this.getDiceStars());
        super.refresh(data, appeareff);
        let ispvp = BattleStatus.battleType == 1;
        BattleStatus.scene.addTimeBuff(!data.isMe, data.star, data.property1*(ispvp?-1:1));
    }

    public powerup(pwlv:number):void{
        super.powerup(pwlv);
        let data = this.getDiceData();
        let ispvp = BattleStatus.battleType == 1;
        BattleStatus.scene.changeTimeBuffSpeed(!data.isMe, data.property1*(ispvp?-1:1));
    }

    public dispose():void{
        let data = this.getDiceData();
        if(BattleStatus.scene){
            BattleStatus.scene.removeTimeBuff(!data.isMe, data.star);
        }
        super.dispose();
    }
}