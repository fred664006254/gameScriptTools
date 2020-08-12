
interface IDiceBuffData
{
    diceId:string;
    keep:number;
    damage?:number;
    cd:number;
    isMe:boolean;
    atkspeed?:number;
    maxOverlap?:number;
    crit?:number;
    kill?:number;
    from?:string;
    timespeed?:number;
    overlap?:number;
}
class DiceBuff
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
    public atkspeed:number=0;
    public crit:number=0;
    public kill:number=0;
    public from:string=``;
    public timespeed:number=0;

    public init(data:IDiceBuffData):void
    {
        this.birthTime=BattleStatus.battleLogicHasTickTime;
        this.keep=data.keep||0;
        this.cd=data.cd;
        this.damage=data.damage;
        this.diceId=data.diceId;
        this.isMe=data.isMe;
        this.maxOverlap=data.maxOverlap||1;
        this.overlap=data.overlap||1;
        this.atkspeed=data.atkspeed;
        this.crit=data.crit;
        this.kill=data.kill;
        this.from=data.from;
        this.timespeed=data.timespeed;
    }

    public update(data:IDiceBuffData):void
    {
        if(data.crit)
        {
            this.crit+=data.crit;
        }
        if(data.kill)
        {
            this.kill+=data.kill;
        }
        this.overlap++;
        if(data.from){
            this.from += `|${data.from}`;
        }
    }

    public checkEnd():boolean
    {
        if(this.keep > 0){
            return BattleStatus.battleLogicHasTickTime>this.birthTime+this.keep;
        }
        return false;
    }

    public checkDoTime():boolean
    {
        if(!this.cd)
        {
            return false;
        }
        return !!BattleStatus.checkCdDoTime(this.cd,this.birthTime);
    }

    public reset():void
    {
        this.birthTime=this.keep=this.cd=this.damage=0;
        this.maxOverlap=1;
        this.overlap=1;
        this.diceId=null;
        this.crit=0;
    }

    public judgeFromPos(pos : string):boolean{
        let bool = false;
        if(this.from){
            let arr = this.from.split(`|`);
            bool = arr.indexOf(pos) > -1;
        }
        return bool;
    }

    public getFromPos():string{
        return this.from;
    }

    public removeFromPos(pos : string):void{
        if(this.from){
            let arr = this.from.split(`|`);
            arr.splice(arr.indexOf(pos), 1);

            let str = ``;
            for(let i = 0; i < arr.length; ++ i){
                str += `${arr[i]}|`;
            }
            str = str.substring(0, str.length - 1);
            this.from = str;
        }
    }

    public static addBuff(data:IDiceBuffData,dice:BaseDice):void
    {
        let dicedata = dice.getDiceData();
        let buff=dice.checkHasBuff(data.diceId);
        if(!buff)
        {
            buff=new DiceBuff();
            buff.init(data);
            dice.addBuff(buff);
        }
        else
        {
            if(buff.maxOverlap>buff.overlap)
            {
                buff.update(data);
                dice.updateBuff(buff);
            }
        }
    }
}