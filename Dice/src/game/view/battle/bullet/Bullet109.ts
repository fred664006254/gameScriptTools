/**
 * -原名称：锁骰子  --新名称：眩晕
*/
class Bullet109 extends Bullet
{
    private _isKill : boolean = false;
    public constructor()
    {
        super();
    }

    protected extraDamage():void
    {
        let monstersList=this.diceData.isMe?BattleStatus.meMonsterList:BattleStatus.targetMonsterList;
        let vo = this.mVoList[0];
        if(!vo.lost(this.diceData.isMe))
        {

            let diceData=this.diceData;
            let randomvalue = App.MathUtil.seededRandom(0,1,BattleStatus.battleLogicHasTickTime/(this.diceData.index));
            if(randomvalue > 0 && randomvalue <= diceData.property1 && !vo.getIsStun()){
                vo.isStun = true;
                this._isKill = true;
                let buffData={diceId:diceData.id,keep:diceData.property2*1000,damage:0,cd:0,isMe:diceData.isMe,speed:1};
                MonsterBuff.addBuff(buffData,vo);
                this.playAtkSound();
            }
        }
    }

    protected playAtkSound():void{
        if(this.diceData.isMe){
            if(this._isKill){
                this._isKill = false;
                let name = `effect_dice_${this.diceData.id}`;
                if(RES.hasRes(name)){
                    SoundMgr.playEffect(name);
                }
            }
            else{
                super.playAtkSound();
            }
        }
    }

    public reset():void
    {
        this._isKill = false;
        super.reset();
    }
}