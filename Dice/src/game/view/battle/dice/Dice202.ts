/**
 * --原名称：光骰子  --新名称：祷告
 * 增加周围攻速
*/
class Dice202 extends BaseDice
{
    public constructor(data:DiceData, appearEff?:string)
    {
        super(data,appearEff);
    }
    public dispose():void
    {
        let x = this.getPos().x;
        let y = this.getPos().y;
        if(BattleStatus.scene){
            let list = BattleStatus.scene.getDiceList(this.checkIsMe());
            for(let i = 1 ; i < 5; ++ i){
                let posx = x;
                let posy = y;
                if(i == 1){
                    posy -= 1;
                }
                else if(i == 2){
                    posy += 1;
                }
                else if(i == 3){
                    posx -= 1;
                }
                else if(i == 4){
                    posx += 1;
                }
                let dice  = list[`${posx}_${posy}`];
                if(dice && Config.DiceCfg.checkHasNmAtk(dice.getDiceId())){
                    dice.removeBuff(this.getDiceId(), `${x}_${y}`);
                }
            }
        }
        super.dispose();
    }

}