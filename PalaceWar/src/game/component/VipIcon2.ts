class VipIcon2 extends BaseDisplayObjectContainer
{
    private _effect:CustomMovieClip=null;
    private _vipIcon:BaseLoadBitmap=null;
    private _vipLevel:number=0;
    public constructor() 
	{
		super();
    }
    
    public init(vipLevel:number):void
    {
        if(!vipLevel)
		{
			vipLevel=0;
        }
        this._vipLevel=vipLevel;
		let vipIcon:BaseLoadBitmap=BaseLoadBitmap.create(Api.vipVoApi.getVipCfgByLevel(vipLevel).icon2);
		vipIcon.width=152;
		vipIcon.height=56;
		vipIcon.name="vipIcon";
        this.addChild(vipIcon);
        this._vipIcon=vipIcon;
		this.checkAndInitEffect();
		this.width=vipIcon.width;
		this.height=vipIcon.height;
    }

    private vipscale = {
        9 : [0.95,0.85],
        10 : [0.95,0.8],
        11 : [0.95,0.9],
        12 : [1,1],
        13 : [1.05,1.05],
        14 : [1.1,1.05],
        15 : [1.15,1.1],
        16 : [1.15,1.1],
        17 : [1.15,1.1],
    };

    private checkAndInitEffect():void
    {
        if(this._vipLevel>=9)
		{
            if(!this._effect)
            {
                let effect:CustomMovieClip=ComponentManager.getCustomMovieClip("vipeffect",12,100);
                effect.anchorOffsetX = 156 / 2;
                effect.anchorOffsetY = 92 / 2;
                effect.scaleX = this.vipscale[this._vipLevel][0];
                effect.scaleY = this.vipscale[this._vipLevel][1];
                this.addChild(effect);
                effect.setPosition(152/2,56/2);
                this._effect=effect;
                
            }
            this.startPlayEffect();
		}
        else
        {
            this.hideEffect();
        }
    }
    private startPlayEffect():void
    {
        if(this._effect)
        {
            if(this._effect.isPlaying==false)
            {
                this._effect.playWithTime(0);
                this._effect.goToAndPlay(1+Math.floor(Math.random()*12));
            }
            this._effect.visible=true;
        }
    }
    private hideEffect():void
    {
        if(this._effect)
        {
            if(this._effect.isPlaying)
            {
                this._effect.stop();
            }
            this._effect.visible=false;
        }
    }
    public setVipLevel(vipLevel:number):void
    {
        this._vipLevel=vipLevel;
        this._vipIcon.setload(Api.vipVoApi.getVipCfgByLevel(vipLevel).icon2);
        this.checkAndInitEffect();
    }
    public dispose():void
    {
        this._effect=null;
        this._vipIcon=null;
        this._vipLevel=0;
        super.dispose();
    }
}