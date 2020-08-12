/**
 * 沉默王----每間隔7秒隨機封鎖任一骰子，該骰子喪失能力    参数：{ X 秒，沉默Y个骰子 }
*/
class Boss1002 extends BossMonster
{
    private _arr = [];

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
            let data = <Boss1002Vo>this._data;

            let tmpY = this.y;
            egret.Tween.get(this).wait(3 * BattleStatus.timeparam).to({y : tmpY - 15}, 3 * BattleStatus.timeparam).to({y : tmpY}, 3 * BattleStatus.timeparam).call(()=>{
                egret.Tween.removeTweens(this);
            },this);

            let clip = ComponentMgr.getCustomMovieClip(`bosseff1002`, null, 70);
            clip.anchorOffsetX = 240 / 2;
            clip.anchorOffsetY = 240 / 2;
            this.addChild(clip);

            clip.playWithTime(1);
            this.playAtkSound(`effect_boss_1002`);
            clip.setEndCallBack(()=>{
                clip.dispose();
                clip = null;
                this._isSkill = false;
            }, this);

            //每間隔7秒隨機封鎖任一骰子，該骰子喪失能力    参数：{ X 秒，沉默Y个骰子 }
            let effectnum = data.effectNum;
            let dicelist = BattleStatus.scene.getDiceList(isMe);
            let keys = Object.keys(dicelist);
            for(let i = 0; i < this._arr.length; ++ i){
                keys.splice(keys.indexOf(this._arr[i]), 1);
            }
            let selectarr = [];

            let loopnum = Math.min(effectnum, keys.length);
            while(loopnum > 0 && selectarr.length < loopnum){
                let randomvalue = Math.floor(App.MathUtil.seededRandom(0, keys.length, BattleStatus.battleLogicHasTickTime + (selectarr.length * 100)));
                selectarr.push(keys[randomvalue]);
                keys.splice(keys.indexOf(keys[randomvalue]), 1);
            }
            this._arr = this._arr.concat(selectarr);
            BattleStatus.scene.setBossSkill(`1002`, BattleStatus.battleLogicHasTickTime + (Math.ceil(10*70/BattleStatus.minLogicFrame) * BattleStatus.minLogicFrame), {isMe : this._data.isMe, arr : selectarr, boss : this});
        }
    }
    

    public dispose():void
    {
        if(BattleStatus.scene){
            let isMe=this._data.isMe;
            BattleStatus.scene.removeSilence(isMe);
        }
        super.dispose();
    }
}