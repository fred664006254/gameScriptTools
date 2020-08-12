class BossMonster extends BaseMonster
{
    private _first = true;
    protected _isSkill = false;

    public constructor(data:MonsterVo,isMe:boolean, isAdd?:boolean)
    {
        super(data,isMe,isAdd);
    }
   
    public getMonsterType():number
    {
        return 3;
    }

    protected init(data:MonsterVo,isAdd?:boolean):void{
        super.init(data,isAdd);
        let clip = ComponentMgr.getCustomMovieClip(`bossbom_effect`, null, 70);
        clip.anchorOffsetX = 140 / 2;
        clip.anchorOffsetY = 140 / 2;
        clip.y = 30;
        clip.playWithTime(-1);
        this.addChildAt(clip, 0);
    }

    public setHp():void{
        this._hpTxt.setString(`0`);
        this._hpTxt.anchorOffsetX=this._hpTxt.width*0.5+0.5;
    }

    public hpTxtTween():void{
        App.TweenUtil.numTween(this._hpTxt, 0, this._data.hp);
    }

    public fastTick():void
    {
        this.checkDoAction();
    }

    public checkDoAction():void
    {
        let data = <BossVo>this._data;
        if(data)
        {
            let arr=data.cdTimeArr;
            let l=arr.length;
            for (let i = 0; i < l; i++) 
            {
                let t=arr[i];
                let cd = data.skillcd;
                if(this._first){
                    cd = data.initcd;
                }
                if(BattleStatus.checkCdDoTime(cd,t)>0)
                {
                    this._isSkill = true;
                    this.checkAtk();
                    if(this._first){
                        this._first = false;
                        data.cdTimeArr = [];
                        data.cdTimeArr = BattleStatus.formatCdPartTime(data.skillcd,BattleStatus.battleLogicHasTickTime);
                    }
                }
            }
        }
    }

    protected checkAtk():void
    {
    }

    protected playAtkSound(sound:string):void{
        if(this._data.isMe){
            if(RES.hasRes(sound)){
                SoundMgr.playEffect(sound);
            }
        }
    }

    public move(moveCallback:(monsterData:MonsterVo)=>void,thisObj:any):void
    {
        if(this._isSkill){

        }
        else{
            super.move(moveCallback, thisObj);   
        }
    }

    public setSkill():void{
        this._isSkill = false;
    }

    public dispose():void
    {   
        this._first = true;
        this._isSkill = false;
        super.dispose();
    }
}