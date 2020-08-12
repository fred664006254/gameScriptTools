class  BattleBaseEffect extends CustomMovieClip
{
    public constructor()
    {
        super();
    }
    public set frameImages(textureNames:string[])
    {
        this._frameImages = textureNames;
    }
}

class BattleCustomEffect extends BattleBaseEffect
{
    public constructor()
    {
        super();
    }
    
    protected updateFrame(timeStamp:number):boolean
    {
        let hasTexture:boolean=!!this.texture;
        let result=super.updateFrame(timeStamp);
        if(this.texture)
        {
            this.anchorOffsetX=this.width*0.5;
            this.anchorOffsetY=this.height*0.5;
            if(!hasTexture)
            {
                this.dispatchEvent(new egret.Event(MsgConst.BT_EFFECT_FIRST_SHOW));
            }
            if(BattleStatus.stopActEffect)
            {
                this.stop();
                this.exceEndCallback();
            }
        }
        return result;
    }
}

class BattleDiceEffect extends BattleBaseEffect
{
    // private status:0|1=0; //0待机，1攻击
    private idleImgs:string[];
    private atkImgs:string[];
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
            this.anchorOffsetY=this.height-4;
            if(BattleStatus.stopActEffect)
            {
                this.stop();
                this.exceEndCallback();
            }
        }
        return result;
    }

    public playIdle():void
    {
        this.stop();
        if(!this.idleImgs)
        {
            this.idleImgs=this._frameImages;
        }
        else
        {
            this._frameImages=this.idleImgs;
        }
        this.playFrameRate=150;
        this.setEndCallBack(null,null);
        this.playWithTime();
    }

    public playAtk(resName?:string):void
    {
        if(BattleStatus.stopActEffect)
        {
            this.stop();
            this.exceEndCallback();
        }
        this.stop();
        if(!this.atkImgs)
        {
            this.setFramesByNamePre(resName)
            this.atkImgs=this._frameImages;
        }
        else
        {
            this._frameImages=this.atkImgs;
        }
        this.playFrameRate=40;
        this.setEndCallBack(this.playIdle,this);
        this.playWithTime(1);
    }

    public dispose():void
    {
        this.idleImgs=null;
        super.dispose();
    }
}