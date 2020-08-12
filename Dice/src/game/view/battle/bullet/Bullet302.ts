/**
 * --原名称：瞬移骰子  --新名称：回溯
 * 有一定概率把敌人送回初始位置
*/
class Bullet302 extends Bullet{
    private _isback : boolean = false;

    public constructor(){
        super();
    }

    protected reset():void
    {
        this._isback = false;
        super.reset();
    }

    protected damage():void{
        let self = this;
        let diceData = self.diceData;
        let mvo = self.mVoList[0];
        let nmDmgData =this.nmDmgData;

        let lost=false;
        if(!!nmDmgData)
        {
            if(!this.target.lost(this.diceData.isMe))
            {
                let damage=this.calDamageNum(this.target);
                let ratio =  App.MathUtil.seededRandom(0, 1, BattleStatus.battleLogicHasTickTime/(this.diceData.index));
                let back = false;
                
                if(ratio > 0 && ratio <= diceData.property1 && !mvo.isHasBack){
                    //传回位置
                    mvo.isHasBack = true;
                    back = true;
                    this._isback = true; 
                }
                this.target.beAtk({hp:damage,isMe:this.diceData.isMe,crit:nmDmgData.isCrit,addStatus:back?this.diceData.id:null});
                if(back){
                    //回溯
                    this.target.resetToStart();  
                }
                //普通怪物受到伤害后
                this.playAtkSound();
            }
            else
            {
                lost=true;
            }
        }
        if(((this.target&&!lost)||(!this.target))&&this.diceData.checkExtDamage())
        {
            this.extraDamage();
        }
    }

    protected playAtkSound():void{
        if(this.diceData.isMe){
            let name = `effect_dice_${this.diceData.id}`;
            if(RES.hasRes(name) && this._isback){
                SoundMgr.playEffect(name);
            }
            else{
                name = `effect_attack_${App.MathUtil.getRandom(1,4)}`
                SoundMgr.playEffect(name);
            }
        }
    }

    public dispose():void{
        this._isback = false;
        super.dispose();
    }

}