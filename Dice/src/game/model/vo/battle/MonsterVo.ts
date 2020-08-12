class MonsterVo extends BaseVo
{
    public hp=0;
    private speed:number=0;
    public type:number=0;
    public add:number=0;
    public moveDis:number=0;
    private _lastmoveDis:number=0;//上次移动距离
    public birthTime:number=0;
    public survive=false;
    public isMe:boolean=false;
    public moveStatus:number=0
    public monsterSp:number=0;
    private _name:string="";
    private _initSpeed:number=0;
    private _speedScale:number=0;
    private _checkAdd:boolean=false;
    private _addSpeed:number=0;//加速
    private _parameter:number[]=[];
    private _bossId:string=null;
    public offPos:number=0;
    public highHp:boolean=false;
    public inithp=0;
    public isEnemy:boolean=false;
    public _round:number;//配置的round，查找用
    public _cfgKey:string;//配置的key
    public isStun : boolean = false;
    public isHasBack : boolean = false;
    private _isBack:boolean=false;// 被回溯
    public tmpCfg:Config.ChallengeItemCfg=null;
    public inBaseRound:boolean=false;//是否是配置初始怪

    public constructor()
    {
        super();
    }

    public initData(cfg:Config.ChallengeItemCfg|Config.BossItemCfg)
    {
        this._initSpeed=cfg.monsterSpeed;
        this._addSpeed=cfg.addSpeed;
        this.speed=this._initSpeed*BattleStatus.logicScale;
        if(cfg instanceof Config.ChallengeItemCfg)
        {
            this._speedScale=0;
            this.type=cfg.monsterType;
            this.add=cfg.monsterAdd||0;
            this.monsterSp=cfg.monsterSp;
            this._round=cfg.round;
            this._cfgKey=cfg.cfgKey;
        }
        else
        {
            this._parameter=cfg.parameter;
            this._bossId=cfg.id;
            this.type=4;
        }
        this.inithp=this.hp;//注意hp在initData之前已经赋值，否则就统一处理
    }

    public getSpeed():number
    {
        if(this.speed)
        {
            this.speed=(this._initSpeed+Math.floor(this.moveDis/this._initSpeed)*this._addSpeed)*(1-this._speedScale)*BattleStatus.logicScale;
        }
        return this.speed;
    }

    public getCfg():Config.ChallengeItemCfg
    {
        if(this.tmpCfg)
        {
            return this.tmpCfg;
        }
        return Api.BattleVoApi.getItemCfgByRoundAndKey(this._round,this._cfgKey);
    }

    public getCenterDis():number
    {
        return this.moveDis-this.offPos;
    }

    /**
     * 获取中心点的距离
     * @param centerDis 
     */
    public getdisRange(centerDis:number):number
    {
        let dis=0;
        let {min,max}=this.getRange();
        if(centerDis<min)
        {
            dis=min-centerDis;
        }
        else if(centerDis>max)
        {
            dis=centerDis-max;
        }
        return dis;
    }

    public getRange():{min:number,max:number}
    {
        return {min:this.moveDis-this.offPos*2,max:this.moveDis};
    }

    public getLastRange():{min:number,max:number}
    {
        return {min:this._lastmoveDis-this.offPos*2,max:this._lastmoveDis};
    }

    public move(speed:number):void
    {
        this._lastmoveDis=this.moveDis;
        this.moveDis+=speed;
    }

    public isMoveEnd():boolean
    {
        return BattleStatus.battleType==2?this.moveStatus==MonsterMoveStatus.BACK:this.moveStatus==MonsterMoveStatus.END;
    }

    public getName():string
    {
        if(!this._name)
        {
            this._name=(this.isMe?"me_":"target_")+this.hashCode;
        }
        return this._name;
    }

    public isPublic():boolean
    {
        return (BattleStatus.battleType==2&&this.moveStatus>=MonsterMoveStatus.PUBLIC);
    }
    

    public setHp(hp:number):void
    {
        this.hp=Math.min(Math.max(0,this.hp-hp), this.inithp);
        // if(this.hp>0)
        // {
        //     if(this.highHp)
        //     {
        //         BattleStatus.checkMaxHp(this,this.isMe,1);
        //         if(this.isPublic())
        //         {
        //             BattleStatus.checkMaxHp(this,!this.isMe,1);
        //         }
        //     }
        // }
    }

    public isDie():boolean
    {
        return this.hp<=0;
    }

     /**
     * 是否是首领
     */
    public getIsBoss():boolean{
        return !!this._bossId;
    }
    public getBossId():string{
        return this._bossId;
    }

    public getAddStatus(diceId:string):string
    {
        let type=this.type;
        if(diceId=="102"&&this.type==3)
        {
            type=1;
        }
        return `${diceId}_${type}`;
    }

    /**
     * 改变速度
     * @param speedScale 百分比
     * @param isAdd 是否是加速
     */
    public changeSpeed(speedScale:number,isAdd:boolean,stop:boolean=false):void
    {
        let speed = 0;
        if(stop){
            speed = 0;
        }
        else{
            this._speedScale=Math.min(Config.GamebaseCfg.maxDeSpeed,speedScale);
            // this.speed=this._initSpeed*(1-this._speedScale)**BattleStatus.logicScale;
            speed=(this._initSpeed+Math.floor(this.moveDis/this._initSpeed)*this._addSpeed)*(1-this._speedScale)*BattleStatus.logicScale;
            // let minspeed = this._initSpeed * (1-Config.GamebaseCfg.maxDeSpeed);
            // let tmpSpeed = this._initSpeed * (1 - speedScale);
            // this.speed = Math.max(tmpSpeed,minspeed)*BattleStatus.logicScale;
        }
        if(speed !== this.speed){
            this.speed = speed;
        }
    }

    public getIsStun():boolean{
        return this.isStun;
    }

    public getIsReback():boolean{
        return this.isHasBack;
    }

     /**
     * 丢失目标，跑了或者打死，如果isMe是对方，则是被回溯鸟打回了
     * @param isMe 攻击发起者是否是自己
     */
    public lost(isMe:boolean):boolean
    {
        return this.isDie()||this.survive||(isMe==(!this.isMe)&&this._isBack);
    }

    public clearBack():void
    {
        this._isBack=false;
    }

    public reset():void{
        this._lastmoveDis=this.moveDis;
        this.moveDis = 0;
        this.moveStatus = 0;
        this._isBack=true;
        BattleStatus.checkGroup(this);
    }

    public dispose():void
    {
        this._checkAdd=false;
        this.isStun = false;
        this.isHasBack = false;
        this.hp=this.speed=this.type=0;
        // this.tmpCfg=null;
    }
}