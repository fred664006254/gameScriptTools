
interface IBuffData
{
    diceId:string;
    keep:number;
    damage?:number;
    cd:number;
    isMe:boolean;
    speed?:number;
    maxOverlap?:number;
    adddmg?:number;
    atknum?:number;
    posion?:boolean;
    dicedata?:DiceData;
    boomnum?:number;
}
class MonsterBuff
{
    public birthTime:number=0;
    /**0永久存在 */
    public keep:number=0;
    public cd:number=0;
    public damage:number=0;
    public diceId:string=null;
    public isMe:boolean=false;
    public maxOverlap:number=1;
    public overlap:number=0;
    public speed:number=0;
    public adddmg:number=0;
    public atknum:number=0;
    public posion:boolean=false;
    public dicedata:DiceData=null;
    public boomnum:number=0;

    public init(data:IBuffData):void
    {
        this.birthTime=BattleStatus.battleLogicHasTickTime;
        this.keep=data.keep||0;
        this.cd=data.cd;
        this.damage=data.damage;
        this.diceId=data.diceId;
        this.isMe=data.isMe;
        this.maxOverlap=data.maxOverlap||1;
        this.overlap=1;
        this.speed=data.speed;
        this.adddmg = data.adddmg;
        this.atknum = data.atknum;
        this.posion = data.posion;
        this.dicedata = data.dicedata;
        this.boomnum = data.boomnum;
    }

    public update(data:IBuffData):void
    {
        if(data.atknum)
        {
            this.atknum+=data.atknum;
        }
        if(data.boomnum)
        {
            this.boomnum+=data.boomnum;
        }
        else{
            this.overlap++;
        }
    }

    public checkDoTime():boolean
    {
        if(!this.cd)
        {
            return false;
        }
        return !!BattleStatus.checkCdDoTime(this.cd,this.birthTime);
    }

    public checkEnd():boolean
    {
        if(this.keep > 0){
            return BattleStatus.battleLogicHasTickTime>this.birthTime+this.keep;
        }
        return false;
    }

    public reset():void
    {
        this.birthTime=this.keep=this.cd=this.damage=0;
        this.maxOverlap=1;
        this.overlap=1;
        this.diceId=null;
        this.posion = false;
    }
    public static addBuff(data:IBuffData,mstVo:MonsterVo):void
    {
        let monstList=mstVo.isMe?BattleStatus.meMonsterList:BattleStatus.targetMonsterList;
        let mst=monstList[mstVo.getName()];
        if(mst){
            let buff=mst.checkHasBuff(data.diceId);
            if(!buff)
            {
                buff=new MonsterBuff();
                buff.init(data);
                mst.addBuff(buff);
            }
            else
            {
                if(Config.DiceCfg.getCanAddEffById(data.diceId)){
                    buff.update(data);
                    //最多叠加3张图
                    if(buff.overlap < 4){
                        mst.addBeAtkStatus(buff.diceId, true);
                    }
                }
                else{
                    if(buff.maxOverlap>buff.overlap)
                    {
                        buff.update(data);
                        mst.updateBuff(buff);
                    }
                }
            }   
        }
    }
}