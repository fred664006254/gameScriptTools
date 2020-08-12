/**
 * --原名称：光剑骰子  --新名称：圣剑
 * 掉半血
*/
class Bullet405 extends Bullet{

    private _isHalf : boolean = false;

    public constructor(){
        super();
    }

    protected reset():void
    {
        this._isHalf = false;
        super.reset();
    }


    //光剑 附加当前生命值一半伤害 对boss无效
    protected extraDamage():void{
        let self = this;
        let diceData = self.diceData;
        let mvo = self.mVoList[0];
        let monstersList=mvo.isMe?BattleStatus.meMonsterList:BattleStatus.targetMonsterList;
        let target=monstersList[mvo.getName()];

        let ratio =  App.MathUtil.seededRandom(0, 1, BattleStatus.battleLogicHasTickTime/(this.diceData.index));
        let nmDmgData = this.nmDmgData;
        let num = nmDmgData.dmg;

        if(ratio <= diceData.property1 && !mvo.getIsBoss() && target && mvo.type != 3){//
            num = Math.ceil(target.getCurHp() * 0.5);
            if(num != 0){
                self._isHalf = true;
                target.beAtk({hp:num,isMe:this.diceData.isMe,crit:false,addStatus:String(this.diceData.id),isPercent:true});
                this.playAtkSound();
            }
        }
    }

    protected playAtkSound():void{
        if(this.diceData.isMe){
            if(this._isHalf){
                this._isHalf = false;
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

    public dispose():void{
        this._isHalf = false;
        super.dispose();
    }
}