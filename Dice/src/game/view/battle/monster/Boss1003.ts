/**
 * 魔术师----每次間隔4秒按 隕石>淨化>恢復 的順序使用技能    
 * 参数:{ X 秒， 净化范围Y(以boss为中心，往两边，各净化 Y 像素)， 恢复血量的百分比 Z}    
 * 隕石:隨機摧毀任一骰子，任何骰子點數都會直接從場上移除，如果在隕石砸落期間，拿到別處合成則可以免疫攻擊       
 * 淨化:移除路径上所有物品，如地雷或尖刺等，並覆蓋一層護罩（移除身上所有附加状态，毒、减防、冰冻、吸收等）   
 * 恢復:恢復25%的血量，BOSS原本最大血量
 * 
*/
class Boss1003 extends BossMonster
{
    private _curSkill = 1;

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
            let data = <Boss1003Vo>this._data;

            let clip = ComponentMgr.getCustomMovieClip(`1003skill${this._curSkill}`, null, 70);
            clip.anchorOffsetX = 316 / 2;
            clip.anchorOffsetY = 316 / 2;
            this.addChild(clip);

            //每次間隔4秒按 隕石>淨化>恢復 的順序使用技能
            if(this._curSkill == 1){
                BattleStatus.scene.setBossSkill(`1003_1`, BattleStatus.battleLogicHasTickTime + (Math.ceil(9*70/BattleStatus.minLogicFrame) * BattleStatus.minLogicFrame), {isMe : this._data.isMe, pos : {x : this.x, y : this.y}, boss : this});

                clip.setEndCallBack(()=>{
                    clip.dispose();
                    clip = null;
                    this._isSkill = false;
                }, this);
            }
            else if(this._curSkill == 2){
                let img = BaseLoadBitmap.create(`1003jinghua`);
                img.width = 249;
                img.height = 233;
                img.anchorOffsetX = 249 / 2;
                img.anchorOffsetY = 233 / 2;
                this.addChildAt(img, 1);
                img.setScale(0);
                egret.Tween.get(img).to({rotation : 360, scaleX : 4, scaleY : 4, alpha : 0}, 1000).call(()=>{
                    img.dispose();
                    img = null;
                }, this);

                clip.setEndCallBack(()=>{
                    clip.dispose();
                    clip = null;
                    this._isSkill = false;
                }, this);

                BattleStatus.scene.setBossSkill(`1003_2`, BattleStatus.battleLogicHasTickTime + (Math.ceil(15*70/BattleStatus.minLogicFrame) * BattleStatus.minLogicFrame), {radius : data.radius, boss : this, isMe : this._data.isMe});
                this.playAtkSound(`effect_boss_1003_2`);
            }
            else if(this._curSkill == 3){
                let heal = Math.floor(data.inithp * data.healhpscale);
                this.healnum = heal;
                BattleStatus.scene.setBossSkill(`1003_3`, BattleStatus.battleLogicHasTickTime + (Math.ceil(15*70/BattleStatus.minLogicFrame) * BattleStatus.minLogicFrame), {boss : this});
                clip.setEndCallBack(()=>{
                    clip.dispose();
                    clip = null;
                    this._isSkill = false;
                }, this);
                this.playAtkSound(`effect_boss_1003_3`);
            }
            clip.playWithTime(1);
            
            ++ this._curSkill;
            if(this._curSkill > 3){
                this._curSkill = 1;
            }
        }
    }

    private healnum = 0;
    private heal():void{
        let data = <Boss1003Vo>this._data;
        if(data && !data.isDie()){
            //恢復:恢復25%的血量，BOSS原本最大血量
            data.setHp(-this.healnum);
            this.setHpTxt();
            
            let healclip = ComponentMgr.getCustomMovieClip(`monsterheal`, null, 70);
            healclip.playWithTime(1);
            healclip.setEndCallBack(()=>{
                healclip.dispose();
                healclip = null;
            },this);
            healclip.anchorOffsetX = 316 / 2;
            healclip.anchorOffsetY = 316 / 2;
            this.addChild(healclip);
        }
    }
    

    public dispose():void
    {
        this.healnum = 0;
        this._curSkill = 1;
        super.dispose();
    }
}