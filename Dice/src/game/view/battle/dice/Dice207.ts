/**
 * 祭品骰子，摧毁 合成后增加sp
*/
class Dice207 extends BaseDice{
    public constructor(data:DiceData, appearEff?:string)
    {
        super(data,appearEff);
    }

    public addSp(star : number):void{
        //祭品骰子加sp
        this.playAtkSound();
        let data = this.getDiceData();
        let spnum = data.property1 * star;
        let isMe = data.isMe;
        Api.BattleVoApi.addSp(spnum,isMe);
        if(isMe){
            if(this.x == data.getShowPos(isMe).x){
                if(BattleStatus.scene){
                    BattleStatus.scene.showNum(spnum, {x : this.x, y : this.y});
                }
            }
        }
    }

    public dispose():void
    {
        //祭品骰子被合成、被暗杀、被boss打、变化等等都加sp
        if(this.getDiceData()){
            this.addSp(this.getDiceData().star);
        }
        super.dispose();
    }
}