/**
 * -1001:蛇王----每間隔10秒召喚2個方小怪和1個圓小怪，小怪的血量與boss剩餘血量成正比    
 * 参数:{ X 秒 ，方形怪数量Y，方形怪血量比例Z，方形怪移速W（X像素/10MS），圆形怪数量Y2，圆形怪血量比例Z2，圆形怪移速W2}   
 * 击杀召唤出的小怪获得的SP，和前一波，小怪的SP相同
*/
class Boss1001 extends BossMonster
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
            //先播放特效
            let bossdata = <Boss1001Vo>this._data;

            let posAllCfg=BattleStatus.getLimitPos();
            let posCfg = bossdata.isMe ? posAllCfg.me : posAllCfg.target;

            let fazhen1 = BaseLoadBitmap.create(`boss1001fazhen1`);
            fazhen1.width = 125;
            fazhen1.height = 117;
            fazhen1.anchorOffsetX = 125 / 2;
            fazhen1.anchorOffsetY = 117 / 2;
            // this.addChild(fazhen1);
            fazhen1.setPosition(posCfg.pos0.x, posCfg.pos0.y);
            BattleStatus.scene.addChild(fazhen1);
            fazhen1.alpha = 0;

            egret.Tween.get(fazhen1).to({alpha : 1}, 5 * BattleStatus.timeparam).wait(30 * BattleStatus.timeparam).to({alpha : 0}, 5 * BattleStatus.timeparam).call(()=>{
                fazhen1.dispose();
                fazhen1 = null;
            },this);

            let fazhen2 = BaseLoadBitmap.create(`boss1001fazhen2`);
            fazhen1.width = 92;
            fazhen1.height = 93;
            fazhen2.anchorOffsetX = 92 / 2;
            fazhen2.anchorOffsetY = 93 / 2;
            // this.addChild(fazhen2);
            fazhen2.alpha = 0;
            fazhen2.setScale(2.7);
            fazhen2.setPosition(posCfg.pos0.x, posCfg.pos0.y);
            BattleStatus.scene.addChild(fazhen2);

            egret.Tween.get(fazhen2).to({scaleX : 1, scaleY : 1, alpha : 1}, 5 * BattleStatus.timeparam).to({scaleX : 1.3, scaleY : 1.3}, 30 * BattleStatus.timeparam).to({alpha : 0, scaleX : 0.6, scaleY : 0.6}, 5 * BattleStatus.timeparam);
            egret.Tween.get(fazhen2).to({rotation : 264}, 40 * BattleStatus.timeparam);

            let clip = ComponentMgr.getCustomMovieClip(`bosseff1001`, null, 70);
            clip.anchorOffsetX = 228 / 2;
            clip.anchorOffsetY = 218 / 2;
            this.addChild(clip);
            this.playAtkSound(`effect_boss_1001`);

            clip.playWithTime(1);
            clip.setEndCallBack(()=>{
                clip.dispose();
                clip = null;

                fazhen2.dispose();
                fazhen2 = null;
                this._isSkill = false;
            }, this);

            let round=BattleStatus.round;
            // let roundCfg = ispvp?Config.BattleCfg.getChallangeCfg(round,Api.GameinfoVoApi.getIsGuiding()):Config.TogetherCfg.getChallangeCfg(round - 1);
            let roundCfg=Api.BattleVoApi.getNormalChallangeCfg();
            let keys = Object.keys(roundCfg);
            let unit = roundCfg[keys[0]][0];
            let monsterVoarr = [];
            //方形怪
            for(let i = 1; i <= bossdata.monster3num; ++ i){
                let itemCfg : Config.ChallengeItemCfg = new Config.ChallengeItemCfg();
                let data = {
                    monsterType : unit.monsterType,
                    monsterAdd : 0,
                    monsterNum : 1,
                    monsterSp : unit.monsterSp,
                    monsterHp : [],
                    monsterSpeed : bossdata.monster3speed,
                    addSpeed : unit.addSpeed,
                    startTime : 0,
                    internalTime : 0
                }
                itemCfg.initData(unit);
                itemCfg.initData(data);

                if(bossdata.hp>0){
                    let vo = new MonsterVo();
                    vo.birthTime = i * 500;
                    vo.hp = Math.floor(bossdata.hp * bossdata.monster3hpscale);
                    vo.initData(itemCfg);
                    vo.tmpCfg=itemCfg;
                    monsterVoarr.push(vo);
                }
            }

            //圆形怪
            for(let i = 1; i <= bossdata.monster2num; ++ i){
                let itemCfg : Config.ChallengeItemCfg = new Config.ChallengeItemCfg();
                let data = {
                    monsterType : 2,
                    monsterAdd : 0,
                    monsterNum : 1,
                    monsterSp : unit.monsterSp,
                    monsterHp : [],
                    monsterSpeed : bossdata.monster2speed,
                    addSpeed : unit.addSpeed,
                    startTime : 0,
                    internalTime : 0
                }
                itemCfg.initData(data);

                if(bossdata.hp>0){
                    let vo = new MonsterVo();
                    vo.birthTime = 0;
                    vo.hp = Math.floor(bossdata.hp * bossdata.monster2hpscale);
                    vo.initData(itemCfg);
                    monsterVoarr.push(vo);
                }
            }
            BattleStatus.scene.setBossSkill(`1001`, BattleStatus.battleLogicHasTickTime + (Math.ceil(10*70/BattleStatus.minLogicFrame) * BattleStatus.minLogicFrame), {isMe : this._data.isMe, monsterVoarr : monsterVoarr, boss : this});
            //BattleStatus.scene.createSnakeMonster(this._data.isMe, monsterVoarr);

        }
    }
    
    public dispose():void
    {
        super.dispose();
    }
}