/**
 * 原名称：太阳骰子
 * * 打同一名敵人時，傷害會逐漸增加，是唯二能無限疊加攻擊力的骰子  而且場上有1或4顆太陽骰時，太陽骰能變身，打出的攻擊會產生爆炸，爆炸的傷害也會疊   
 * 打BOSS時能順便打後方小怪，但被小怪超前時一樣會傷害重置
*/
class Bullet411 extends Bullet{

    public constructor(){
        super();
    }

    protected damage():void
    {
        let lost=false;
        if(!!this.nmDmgData)
        {
            if(!this.target.lost(this.diceData.isMe))
            {
                let damage=this.calDamageNum(this.target);
                if(this.diceData.isMe)
                {
                    App.LogUtil.log((this.nmDmgData.isCrit?"暴击:":"普攻:")+damage);
                }
                this.target.beAtk({hp:damage,isMe:this.diceData.isMe,crit:this.nmDmgData.isCrit,addStatus:this.isKillByOne?`301`:null});
                //普通怪物受到伤害后
                this.playAtkSound();
            }
            else
            {
                lost=true;
            }
        }
        this.extraDamage();
    }

    protected playHitEffect(hit:boolean):void
    {
        if(this.status!=2)
        {
            hit&&this.damage();
            this.status=2;
            let useDid=this.diceData.id;
            let effectKey="bthiteffect"+useDid;
            if((!hit)||(!ResMgr.hasRes(effectKey+"1")))
            {
                effectKey="bthiteffect";
            }
            else
            {
                this.setScale(2);
            }
            // if(BattleStatus.stopActEffect)
            // {
            //     this.dispose();
            // }
            // else
            // {
            let frameCount=this.frameCount(effectKey);
            let resArr:string[]=[];
            for(var i:number=1;i<=frameCount;i++)
            {
                resArr.push(effectKey+i);
            }
            this.frameImages = resArr;
            this.playFrameRate=50;
            // this.playFrameRate
            this.setEndCallBack(this.dispose,this);
            this.texture=null;
            this.width=this.height=NaN;
            this.playWithTime(1);
            // }
                
        }
    }

    protected extraDamage():void
    {
        let diceData=this.diceData;
        let monstersList=this.diceData.isMe?BattleStatus.meMonsterList:BattleStatus.targetMonsterList;
        let vo = this.mVoList[0];
        if(vo && !vo.lost(this.diceData.isMe))
        {
            let diceData=this.diceData;
            if(diceData.getDiceIsChangeSun()){
                let buffData={diceId:`${diceData.id}_${this.diceData.posStr}_${this.diceData.isMe?1:2}`,keep:0,cd:0,isMe:diceData.isMe,atknum:1,maxOverlap:BattleStatus.maxAtkNum};
                MonsterBuff.addBuff(buffData,vo);
            }
        }
        if(diceData.getDiceIsChangeSun()){
            //有爆炸范围伤害
            let findmonsterDataList = DiceHelper.findRangMonster(this.mVoList[0].getCenterDis(),this.diceData.property3[0],this.diceData.isMe);
            let l=findmonsterDataList.length;
            for (let i = 0; i < l; i++) 
            {
                const mData = findmonsterDataList[i];
                if(!mData.lost(this.diceData.isMe))
                {
                    const monster=monstersList[mData.getName()];
                    let buffname = `${this.diceData.id}_${this.diceData.posStr}_${this.diceData.isMe?1:2}_boom`;
                    let boombuffData={diceId:buffname,keep:0,cd:0,isMe:diceData.isMe,boomnum:1,maxOverlap:BattleStatus.maxAtkNum};
                    let buff = monster.checkHasBuff(buffname);
                    let damage = this.diceData.property1;
                    if(buff && buff.boomnum){
                        damage += (buff.boomnum * this.diceData.property1);
                    }
                    monster.beAtk({hp:damage,isMe:this.diceData.isMe,crit:false,addStatus:`411`});
                    MonsterBuff.addBuff(boombuffData,mData);
                }
            }
        }
    }

    //疊加攻擊力
    protected calDamageNum(monster:BaseMonster):number{
        let nmDmgData = this.nmDmgData;
        let damage = nmDmgData.dmg;
        if(this.diceData.getDiceIsChangeSun()){
            let buffname = `${this.diceData.id}_${this.diceData.posStr}_${this.diceData.isMe?1:2}`;
            let buff = monster.checkHasBuff(buffname);
            if(buff && buff.atknum){
                damage += buff.atknum * this.diceData.property3[1];
            }
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