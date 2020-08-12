/**
 * 原名称：-原名称：激光骰子  --新名称：激光
*/
class Bullet303 extends Bullet{

    public constructor(){
        super();
    }

    protected setBulletRes(){
        super.setBulletRes();
        this.alpha = 0;
    }

    // 42 902  172 828
    protected playHitEffect(hit:boolean):void{
        if(this.status!=2){
            hit&&this.damage();
            this.status=2;
            if(this.target){
                let boomeff = ComponentMgr.getCustomMovieClip(`bthiteffect303`, null, 40,BattleBaseEffect);
                boomeff.anchorOffsetX = 150 / 2;
                boomeff.anchorOffsetY = 150 / 2;
                boomeff.setPosition(this.target.x, this.target.y);
                boomeff.setScale(this.target.getMonsterType() > 2 ? 0.6 : 0.4);
                boomeff.setEndCallBack(()=>{
                    boomeff.dispose();
                    boomeff = null;
                    this.dispose();
                },this);
                if(this.parent){
                    this.parent.addChild(boomeff);
                }
                boomeff.playWithTime(1);
            }
        }
    }

    public atk(mVoList:MonsterVo[]):void
    {
        super.atk(mVoList);
        let line = ComponentMgr.getCustomMovieClip(`atkeffect303`, null, 40,BattleBaseEffect); 
            
        line.anchorOffsetY = 90 / 2;
        line.scaleY = 0.4;
        if(this.parent){
            this.parent.addChild(line);
        }
        let diffX=this.target.x-this.startPoint.x;
        let diffY=this.target.y-this.startPoint.y;
        let angle = Math.atan2(diffY,diffX) * 180/Math.PI;
        line.rotation = angle;
        line.width = App.MathUtil.getDistance(this.startPoint, new egret.Point(this.target.x, this.target.y));
        line.x = this.startPoint.x;
        line.y = this.startPoint.y;
        line.setEndCallBack(()=>{
            line.dispose();
            line = null;
            this.dispose();
        }, this);

        line.playWithTime(1);
    }

    protected extraDamage():void
    {
        let monstersList=this.diceData.isMe?BattleStatus.meMonsterList:BattleStatus.targetMonsterList;
        let vo = this.mVoList[0];
        if(!vo.lost(this.diceData.isMe))
        {

            let diceData=this.diceData;
            let buffData={diceId:`${diceData.id}_${this.diceData.posStr}_${this.diceData.isMe?1:2}`,keep:0,cd:0,isMe:diceData.isMe,atknum:1,maxOverlap:BattleStatus.maxAtkNum};
            MonsterBuff.addBuff(buffData,vo);
        }
    }

    //可能有加血 +/-都有可能
    protected calDamageNum(monster:BaseMonster):number{
        let nmDmgData = this.nmDmgData;
        let damage = nmDmgData.dmg;
        let buffname = `${this.diceData.id}_${this.diceData.posStr}_${this.diceData.isMe?1:2}`;
        let buff = monster.checkHasBuff(buffname);
        if(buff && buff.atknum){
            let cfg=Config.DiceCfg.getCfgById(this.diceData.id);
            let pwadd=cfg.getPowerAtkByLv(this.diceData.pwlv);
            let maxnum = this.diceData.property3[1] * (this.diceData.initdamage+pwadd)
            damage = Math.min(buff.atknum * this.diceData.property3[0], maxnum);
        }
        let initInfo=Api.BattleVoApi.getInitInfo(this.diceData.isMe);
        if(this.diceData.checkIsKill(initInfo.uid) && monster && monster.getMonsterType() != 3 && !monster.isBoss()){
            this.isKillByOne = true;
            damage = monster.getCurHp();
        }
        return damage;
    }

    public dispose():void{
        super.dispose();
    }
}