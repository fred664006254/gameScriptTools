/**
 * --原名称：激光骰子  --新名称：激光
*/
class Dice303 extends BaseDice
{
    private _curmonstername = ``;
    public constructor(data:DiceData, appearEff?:string){
        super(data,appearEff);
    }

    protected createBullet(starIdx:number,findmonsterDataList:MonsterVo[]):void
    {
        let dicedata = this.getDiceData();
        let monstersList=dicedata.isMe?BattleStatus.meMonsterList:BattleStatus.targetMonsterList;
        let monstername = ``;
        if(findmonsterDataList[0]){
            monstername = findmonsterDataList[0].getName();
        }

        if(this._curmonstername != monstername){
            let monster = monstersList[this._curmonstername];
            if(monster){
                monster.removeBuff(`${dicedata.id}_${dicedata.posStr}_${dicedata.isMe?1:2}`);
            }
        }
        
        this._curmonstername = monstername;

        this.playAtkAction();
        let fpos={x:this.x-15,y:this.y-45};
        let bullet=Bullet.createBullet(this.getDiceData(),fpos);
        bullet.atk(findmonsterDataList);
    }

    public dispose():void{
        this._curmonstername = ``;
        super.dispose();
    }
}