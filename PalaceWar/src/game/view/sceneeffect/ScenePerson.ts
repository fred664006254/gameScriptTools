class ScenePerson extends BaseDisplayObjectContainer 
{   
    
    private _myClip:CustomMovieClip;
    private _cfg:any[] = null;
    private _curIdx:number = 0;
    private _name:string[] = [];

    public constructor() 
	{
		super();
	}

    public init(name:string,sceneId:string):void
	{
        this._cfg = Config.SceneeffectCfg.getEffectCfg(name,sceneId);
        this._name = name.split("_");

        

        this._myClip = ComponentManager.getCustomMovieClip();
		this._myClip.frameRate = 167;
		this.addChild(this._myClip);

        if (name == "dageng_2")
        {
            this._myClip.setScale(1.3);
        }

        this.showAnim();
    }

    private showAnim():void
    {
        let cfglength:number = this._cfg.length;

        if (this._curIdx >= cfglength)
        {
            this._curIdx = 0;
        }

        if (this._myClip.isPlaying == true)
		{
			this._myClip.stop();
		}
		this._myClip.setEndCallBack(null,null);

        let curCfg:any = this._cfg[this._curIdx];
        this._myClip.visible = true;

        if (curCfg.wait) //等待
        {
            this._myClip.visible = false;
            egret.Tween.get(this._myClip).wait(curCfg.wait*1000).call(this.animCallback,this);
        }
        else //动画 必有 frames
        {   
            if (curCfg.pos)
            {
                this.x = curCfg.pos.x;
                this.y = curCfg.pos.y;
            }

            if (curCfg.scalex)
            {
                this.scaleX = curCfg.scalex;
            }

            let framess:string[] = []
            for(var i:number=1;i<=curCfg.frames;i++)
            {   
                if (this._name[0] == "cruise" && this._name[1] == "2")
                {
                    let realIdx = this._curIdx==0 ? 1 :0;
                    framess.push("scene_ef_"+this._name[0]+"_"+realIdx+"_"+i);
                }
                else
                {   
                    let reskey = this._curIdx;
                    if (curCfg.framekey != null)
                    {
                        reskey = curCfg.framekey;
                    }
                    framess.push("scene_ef_"+this._name[0]+"_"+reskey+"_"+i);
                }
            }
            this._myClip.frameImages = framess;
            this._myClip.setStopFrame(0);

            if (cfglength == 1) // 单个动画 无限循环
            {
                this._myClip.playWithTime(0);
            }
            else if (curCfg.endcall == true) // 播放一次 进入下一动作
            {
		        this._myClip.setEndCallBack(this.animCallback,this);
                this._myClip.playWithTime(1);
            }
            else if (curCfg.pos2) // A点移动到B点 必有 movetime
            {
                this._myClip.playWithTime(0);
                egret.Tween.get(this).to({x:curCfg.pos2.x,y:curCfg.pos2.y},curCfg.movetime*1000 ).call(this.animCallback,this);
            }
            else if (curCfg.timeinter) //有动画 随机时间
            {
                this._myClip.playWithTime(0);
                let t:number =  App.MathUtil.getRandom(curCfg.timeinter[0],curCfg.timeinter[1]);
                egret.Tween.get(this._myClip).wait(t*1000).call(this.animCallback,this);
            }
        }
    }

    private animCallback():void
    {
        this._curIdx++;
        this.showAnim();
    }

    public dispose():void
	{
        egret.Tween.removeTweens(this._myClip);
		this._myClip.dispose();
		this._myClip = null;
        this._cfg = null;
        this._curIdx = 0;
        this._name.length = 0;

        super.dispose();
    }
}