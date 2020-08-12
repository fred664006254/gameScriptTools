class Bullet extends BattleBaseEffect
{
    protected target:BaseMonster;
    protected mVoList:MonsterVo[];
    protected diceData:DiceData;

    /**子弹状态 0待机状态攻击完后放到对象池，1子弹飞行中还未攻击到，2命中播放特效中 */
    protected status:(0|1|2)=0;
    private static bulletPool:{[key:string]:Bullet[]}={};
    private static maxNum:number=50;
    protected nmDmgData:{dmg:number,isCrit:boolean}=null;
    protected startPoint:egret.Point;
    protected isKillByOne : boolean=false;
    private _mvEt:number=0;
    public constructor()
    {
        super();
    }

    protected updateFrame(timeStamp:number):boolean
    {
        let result=super.updateFrame(timeStamp);
        if(this.texture)
        {
            this.anchorOffsetX=this.width*0.5;
            this.anchorOffsetY=this.height*0.5;
        }
        return result;
    }

    public init(diceData:DiceData,stPos:{x:number,y:number}):void
    {
        this.diceData=diceData;
        // diceData.property1

        this.setBulletRes();
        this.x=stPos.x;
        this.y=stPos.y;
        this.startPoint = new egret.Point(stPos.x, stPos.y);
    }

    protected setBulletRes(){
        let icon=Config.DiceCfg.getStarByLv(String(this.diceData.id),this.diceData.star);
        this.texture=ResMgr.getRes(icon);
        // this.initLoadRes(icon);
        let scale=DiceScaleEnum.scale_41;
        this.width=this.width*scale;
        this.height=this.height*scale;
        this.anchorOffsetX=this.width*0.5;
        this.anchorOffsetY=this.height*0.5;
    }

    protected playAtkSound():void{
        if(this.diceData.isMe){
            let name = `effect_dice_${this.diceData.id}`;
            if(RES.hasRes(name) && !Config.DiceCfg.hasSpecialSoundAtk(this.diceData.id)){
                SoundMgr.playEffect(name);
            }
            else{
                name = `effect_attack_${App.MathUtil.getRandom(1,4)}`
                SoundMgr.playEffect(name);
            }

            if(this.isKillByOne){
                SoundMgr.playEffect(`effect_dice_406`);
            }
        }
    }

    public atk(mVoList:MonsterVo[]):void
    {
        // this.startTick();
        this.mVoList=mVoList;
        if(mVoList.length>0)
        {
            let mVo=this.mVoList[0];
            let monstersList=mVo.isMe?BattleStatus.meMonsterList:BattleStatus.targetMonsterList;
            this.target=monstersList[mVo.getName()];
            if(!this.target)
            {
                console.log("0001212");
            }
            this.nmDmgData = this.diceData.getDmgData();
        }
        this.status=1;
        this._mvEt=BattleStatus.battleLogicHasTickTime+300;//30*BattleStatus.minLogicFrame;
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
        if(((this.target&&!lost)||(!this.target))&&this.diceData.checkExtDamage())
        {
            this.extraDamage();
        }
    }

    //可能有加血 +/-都有可能
    protected calDamageNum(monster:BaseMonster):number{
        let initInfo=Api.BattleVoApi.getInitInfo(this.diceData.isMe);
        let damage = this.nmDmgData.dmg;
        if(this.diceData.checkIsKill(initInfo.uid) && monster && monster.getMonsterType() != 3 && !monster.isBoss()){
            this.isKillByOne = true;
            
            damage = monster.getCurHp();
        }
        return damage;
    }

    protected extraDamage():void
    {
    }

    protected move(addT:number):boolean
    {
        if((this.target&&this.target.lost(this.diceData.isMe)) || !this.target)
        {
            this.playHitEffect(false);
            return false;
        }
        let diffX=this.target.x-this.x;
        let diffY=this.target.y-this.y;
        let diffT=(this._mvEt-BattleStatus.battleLogicHasTickTime)/BattleStatus.minLogicFrame;
        if(diffT>0)
        {
            this.x+=diffX/diffT;
            this.y+=diffY/diffT;
            if(diffT==1)
            {
                this.playHitEffect(true);
            }
        }

        return true;
    }

    public checkTick():boolean
    {
        return !!this.status;
    }

    /**
     * 命中效果或者怪物死了子弹爆炸
     * @param hit 是否攻击到了
     */
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

    protected frameCount(effectKey:string):number
    {
        let frameCount=0;
        while(ResMgr.hasRes(effectKey+(frameCount+1)))
        {
            frameCount++;
        }
        return frameCount;
    }

    public fastTick(addT:number):void
    {
        switch (this.status) {
            case 1:
                this.move(addT);
                break;
            default:
                break;
        }
    }

    protected reset():void
    {
        if(this.diceData){
            Bullet.removeBullet(this,this.diceData.id);
        }
        // TickMgr.removeFastTick(this.move,this);
        this.stop();
        // this.setEndCallBack(null,null);
        this.texture=null;
        this.width=this.height=NaN;
        this.status=0;
        this.nmDmgData=null;
        this.diceData=null;
        this.target=null;
        this.mVoList.length=0;
        this.startPoint=null;
        this.isKillByOne = false;
        this._mvEt=0;
    }

    public dispose():void
    {
        this.reset();
        super.dispose();
    }

    public static removeBullet(bullet:Bullet,diceId:string):void
    {
        let bulletname = Bullet.getBltCName(diceId);
        let arr:Bullet[]=Bullet.bulletPool[bulletname];
        if(arr)
        {
            let idx=arr.indexOf(bullet);
            if(idx>-1)
            {
                arr.splice(idx,1);
            }
        }
    }

    public static createBullet(diceData:DiceData,stPos:{x:number,y:number},bulletname?:string):Bullet
    {
        let l=Bullet.bulletPool.length;
        let bullet:Bullet=null;
        if(!bulletname){
            bulletname = Bullet.getBltCName(diceData.id);
        }
		// if (l<Bullet.maxNum)
		// {
            let cClass=egret.getDefinitionByName(bulletname);
			bullet = new cClass();
        // }
        // else
        // {
        //     bullet=Bullet.bulletPool.shift();
        //     bullet.reset();
        // }
        let arr:Bullet[]=Bullet.bulletPool[bulletname];
        if(!arr)
        {
            arr=[];
            Bullet.bulletPool[bulletname]=arr;
        }
        arr.push(bullet);
        bullet.init(diceData,stPos);
        BattleStatus.scene.addToEffectLayer(bullet);

        return bullet;
    }

    private static getBltCName(id:string|number):string
    {
        let cName="Bullet"+id;
        if(!egret.hasDefinition(cName))
        {
            cName="Bullet";
        }
        return cName;
    }

    public static releaseAllBullet():void
    {
        let bulletPoll=Bullet.bulletPool;
        for (const key in bulletPoll) 
        {
            if (bulletPoll.hasOwnProperty(key)) 
            {
                const bulletArr = bulletPoll[key];
                bulletArr.length=0;
                delete bulletPoll[key];
            }
        }
    }

    public static fastTick(addT:number):void
    {
        let bulletPoll=Bullet.bulletPool;
        let battleview : any = BattleStatus.scene;
        let keys=Object.keys(bulletPoll);
        keys.sort((a,b)=>{
            let ta=Number(a.replace("Bullet",""))||0;
            let tb=Number(b.replace("Bullet",""))||0;
            return ta-tb;
        });
        let kl=keys.length;
        for (var k=0;k<kl;k++) 
        {
            let key=keys[k];
            if (bulletPoll.hasOwnProperty(key)) 
            {
                const bullets = bulletPoll[key];
                let l=bullets.length;
                for (let i = 0; i < l; i++) 
                {
                    let bullet=bullets[i];
                    if(battleview && battleview.isInRound()){
                        if(bullet){
                            bullet.dispose();
                            bullet = null;
                        }
                    }
                    else{
                        if(bullet && bullet.checkTick())
                        {
                            bullet.fastTick(addT);
                        }
                    }
                }
            }
        }
    }
}