/**
 * 每次間隔10秒將所有骰子任意轉換為其他骰子（场上各个骰子的点数不会变，但会被随机变换类型以及摆放位置）    参数：{ X 秒}
*/
class Boss1004 extends BossMonster
{
    public constructor(data:MonsterVo,isMe:boolean, isAdd?:boolean)
    {
        super(data,isMe,isAdd);
    }
   
    public getMonsterType():number
    {
        return 4;
    }

    protected getMonsterImg():string{
        return Config.BattleCfg.getMonsterIcon(3)
    }

    protected checkAtk():void
    {
        if(BattleStatus.scene){
            let isMe=this._data.isMe
            let data = <Boss1004Vo>this._data;

            let tmpY = this.y;

            let img = BaseLoadBitmap.create(`boss1004hurt`);
            img.width = 118;
            img.height = 62;
            img.anchorOffsetX = 118 / 2;
            img.anchorOffsetY = 62 / 2;
            this.addChildAt(img, 0);
            img.alpha = 0;

            egret.Tween.get(this).wait(3 * BattleStatus.timeparam).to({y : tmpY - 15}, 3 * BattleStatus.timeparam).to({y : tmpY}, 3 * BattleStatus.timeparam).call(()=>{
                img.alpha = 1;
            },this).wait(200).call(()=>{
                img.alpha = 0;
                img.dispose();
                img = null;
                egret.Tween.removeTweens(this);
            },this);


            let clip = ComponentMgr.getCustomMovieClip(`bosseff1004`, null, 70);
            clip.anchorOffsetX = 228 / 2;
            clip.anchorOffsetY = 202 / 2;
            this.addChild(clip);

            clip.playWithTime(1);
            this.playAtkSound(`effect_boss_1004`);
            clip.setEndCallBack(()=>{
                clip.dispose();
                clip = null;
                this._isSkill = false;
            }, this);

            BattleStatus.scene.setBossSkill(`1004`, BattleStatus.battleLogicHasTickTime + (Math.ceil(9*BattleStatus.timeparam/BattleStatus.minLogicFrame) * BattleStatus.minLogicFrame), {isMe : this._data.isMe, boss : this});
        }
    }
    

    public dispose():void
    {
        super.dispose();
    }
}