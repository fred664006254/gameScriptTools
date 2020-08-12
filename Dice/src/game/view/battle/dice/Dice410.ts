/**
 * -原名称：召唤骰子  --新名称：召唤
 * 合并骰子时，随机召唤1个骰子
*/
class Dice410 extends BaseDice
{
    public constructor(data:DiceData, appearEff?:string)
    {
        super(data,appearEff);
    }

    public dispose():void{
        super.dispose();
    }
}