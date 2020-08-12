/**
 * 原名称：死亡骰子  --新名称：瞬杀
 * 一击必杀概率
*/
class Bullet301 extends Bullet{

    private _isKill : boolean = false;

    public constructor(){
        super();
    }

    protected damage():void{
        let self = this;
        let diceData = self.diceData;
        let mvo = self.mVoList[0];
        let nmDmgData = this.nmDmgData;
        let monstersList=mvo.isMe?BattleStatus.meMonsterList:BattleStatus.targetMonsterList;
        let target = monstersList[mvo.getName()];
        if(!!nmDmgData){
            if(!target.lost(this.diceData.isMe)){
                let damage=this.calDamageNum(target);
                target.beAtk({hp:damage,isMe:diceData.isMe,crit:self._isKill?false:nmDmgData.isCrit,addStatus:self._isKill?String(this.diceData.id):null});
                //普通怪物受到伤害后
                this.playAtkSound();
            }
        }
    }

    protected playAtkSound():void{
        if(this.diceData.isMe){
            let name = `effect_dice_${this.diceData.id}`;
            if(RES.hasRes(name) && this._isKill){
                SoundMgr.playEffect(name);
            }
            else{
                name = `effect_attack_${App.MathUtil.getRandom(1,4)}`
                SoundMgr.playEffect(name);
            }
        }
    }

    protected reset():void
    {
        this._isKill = false;
        super.reset();
    }

    //一击必杀概率 对boss无效
    protected calDamageNum(monster:BaseMonster):number{
        let self = this;
        let diceData = self.diceData;
        let ratio =  App.MathUtil.seededRandom(0, 1, BattleStatus.battleLogicHasTickTime/(this.diceData.index));
        let nmDmgData = this.nmDmgData;
        let num = nmDmgData.dmg;
        let mvo = self.mVoList[0];
        if(ratio <= (diceData.property1+diceData.kill) && monster && monster.getMonsterType() != 3 && !monster.isBoss()){//
            self._isKill = true;
            this.isKillByOne = true;
            num = monster.getCurHp();
        }
        return num;
    }

    public dispose():void{
        this._isKill = false;
        super.dispose();
    }
}