/**
 * --原名称：枪械 现在：乱舞
 * 1-6正常 7星直接变狙击 秒百分比血量
*/
class Dice414 extends BaseDice
{
    private _isFirst1 = false;
    public constructor(data:DiceData, appearEff?:string)
    {
        super(data,appearEff);
    }

    protected resetStar():void
    {
        let dicedata = this.getDiceData();

        let index = this.getChildIndex(this._bg);
        this._bg.dispose();
        this._bg = null;

        let iconUrl=Config.DiceCfg.getIconById(String(dicedata.id));
        let idleKey=Config.DiceCfg.getIdceEffect(String(dicedata.id), this.getDiceStars());
        let dice:BattleDiceEffect=<BattleDiceEffect>ComponentMgr.getCustomMovieClip(idleKey,NaN,150,BattleDiceEffect);
        dice.playIdle();
        this.addChildAt(dice, index);
        this._bg = dice;

        if(dicedata.checkMaxStar()){
            dicedata.cd = dicedata.property3[0] * 1000;
            dicedata.cdTimeArr = [];
            dicedata.setCdTimeArr(BattleStatus.battleLogicHasTickTime);
        }
        else{
            dicedata.cd = dicedata.initcd;
            dicedata.cdTimeArr = [];
            dicedata.setCdTimeArr(BattleStatus.battleLogicHasTickTime);
            dicedata.special1cdTimeArr = [];
        }
        super.resetStar();
    }
    
    public refresh(data:DiceData,appeareff?:string):void
    {
        let dicedata = this.getDiceData();
        super.refresh(data, appeareff);
        if(dicedata.checkMaxStar()){
            dicedata.cd = dicedata.property3[0] * 1000;
            dicedata.cdTimeArr = [];
            dicedata.setCdTimeArr(BattleStatus.battleLogicHasTickTime);
        }
        else{
            dicedata.cd = data.initcd;
            dicedata.cdTimeArr = [];
            dicedata.setCdTimeArr(BattleStatus.battleLogicHasTickTime);
            dicedata.special1cdTimeArr = [];
        }
    }

    //手槍及狙擊槍固定打一名敵人，雙手槍跟霰彈槍則根據星數打對應數量的敵人 1+n随机(不重复)
    protected checkAtk(starIdx:number):void
    {
        let data = this.getDiceData();
        let isMe=data.isMe;
        let initInfo=Api.BattleVoApi.getInitInfo(isMe);
        let num = 1;
        if(data.star > 1 && data.star < 7){
            num = data.star;
        }

        let isplay = false;
        let findmonsterDataList = DiceHelper.GunDiceFindMonster(data,isMe,num);
        let len = findmonsterDataList.length;
        for(let i = 0; i < len; ++ i){
           // let monster=monstersList[vo.getName()];
           const vo = findmonsterDataList[i];
           if(vo && !vo.lost(isMe))
           {
               if(!isplay){
                   isplay = true;
                   this.playAtkAction();
               }
               this.createBullet(i-1,[vo]);
           }
        }
    }

    
    protected createBullet(starIdx:number,findmonsterDataList:MonsterVo[]):void
    {
        let fpos={x:this.x,y:this.y};
        let data = this.getDiceData();
        let bullet=Bullet.createBullet(data,fpos);
        bullet.atk(findmonsterDataList);
    }

    public dispose():void{
        this._isFirst1 = false;
        super.dispose();
    }
}