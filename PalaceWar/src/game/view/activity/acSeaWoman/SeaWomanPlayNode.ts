/**
  * 海滨伊人 次数领奖
  * @author shaoliang
  * date 2020/7/9
  * @class SeaWomanPlayNode
  */


class SeaWomanPlayNode extends BaseDisplayObjectContainer 
{   
    private _code:string = null;
    public _id:number = 0;
    private _iconId:number = 0;

    private _myClip:CustomMovieClip = null;
    private _iconNode:BaseDisplayObjectContainer = null;
    private _icon:BaseBitmap = null;
    private _iconbg:BaseBitmap = null;

    private _closedFrames:string[] = [];
	private _openingFrames:string[] = [];
	private _openedByFrames:string[] = [];
    private _closingFrames:string[] = [];

    public _show:boolean= false;
    public _empty:boolean = false;

    private ballClip1:CustomMovieClip = null;
    private ballClip2:CustomMovieClip = null;

    public constructor() 
	{
		super();
	}

    public init(id:number,code:string,f:Function,o:any):void
    {
        this._id = id;
        this._code = code;

        this._closedFrames = ["seawoman_effect_open1"];
		this._openedByFrames= ["seawoman_effect_open5"];
        for(var i:number=2;i<=5;i++)
		{
			this._openingFrames.push("seawoman_effect_open"+i);
		}

        for(var i:number=4;i>=1;i--)
		{
			this._closingFrames.push("seawoman_effect_open"+i);
		}


        this._myClip = ComponentManager.getCustomMovieClip();
		this._myClip.frameRate = 35;
		this.addChild(this._myClip);

        let tempicon = BaseBitmap.create("seawoman_effect_open1");

        this._iconNode = new BaseDisplayObjectContainer();
        this._iconNode.setPosition(tempicon.width/2,tempicon.height/2);
        this.addChild(this._iconNode);

        let icon = BaseBitmap.create("seawoman_icon1-"+code);
        this._iconNode.addChild(icon);
        this._icon = icon;

        let iconbg = BaseBitmap.create("seawoman_iconbg-"+code);
        this._iconNode.addChild(iconbg);
        this._iconbg = iconbg;

        this._iconNode.anchorOffsetX = this._iconNode.width/2;
        this._iconNode.anchorOffsetY = this._iconNode.height/2;


        this.addTouchTap(()=>{
            if (this._empty)
            {
                return;
            }
            f.apply(o,[this]);
        },this);
    }

    public setInfo(v:any):void
    {   
        this._icon.texture = ResourceManager.getRes("seawoman_icon"+v.icon+"-"+this._code);
        this._iconId = v.icon;
        let show:boolean = v.onlyshow ? true:false;
        this.setShow(show,false,null,null);
        this._empty = false;
        this.visible = true;
    }

    public setShow(show:boolean,anim:boolean,f:Function,o:any):void
    {
        this._show = show;

        if (show)
        {
            if (anim)
            {
                if (this.ballClip1)
                {
                    this.ballClip1.dispose();
                    this.ballClip1=null;
                }

                this.ballClip1 =  ComponentManager.getCustomMovieClip();
                 let frameArray = [];
                for(var i:number=1;i<=8;i++)
                {
                    frameArray.push("seawoman_effect_openball"+i);
                }
                this.ballClip1.frameImages = frameArray;
                this.ballClip1.frameRate = 35;
                this.ballClip1.setPosition(-15,-40);
                this.addChild(this.ballClip1);
                this.ballClip1.setEndCallBack(()=>{

                    this.ballClip1.dispose();
                    this.ballClip1=null;
                    if (f && o)
                    {
                        f.apply(o);
                    }

                },this);
                

                this._myClip.frameImages = this._openingFrames;
                this._myClip.playWithTime(1);
                this._myClip.setFrameEvent(3,()=>{

                    if (this.ballClip1)
                    {
                         this.ballClip1.playWithTime(1);
                    }
                    this._iconNode.visible = true;
                    this._iconbg.visible = (this._iconId != 1)
                    this._myClip.removeFrameEvent();
                    this._iconNode.setScale(0.2);
                    egret.Tween.get(this._iconNode).to({scaleX:1.1,scaleY:1.1},100,).to({scaleX:1,scaleY:1},50);

                },this);
            }
            else
            {
                this._iconNode.visible = true;
                this._iconbg.visible = (this._iconId != 1)
     
                this._myClip.frameImages = this._openedByFrames;
                this._myClip.playWithTime(1);
            }
        }
        else
        {   
            if (anim)
            {
                this._iconNode.visible = false;
                this._myClip.frameImages = this._closingFrames;
                this._myClip.playWithTime(1);

                this._myClip.setEndCallBack(()=>{

                    if (f && o)
                    {
                        f.apply(o);
                    }
                    this._myClip.setEndCallBack(null,null);

                },this);
            }
            else
            {
                this._iconNode.visible = false;
                this._myClip.frameImages = this._closedFrames;
                this._myClip.playWithTime(1);
            }

           
        }
    }

    public setEmpty():void
    {
        this._empty = true;
        
        // this._iconNode.visible = false;
        // this._myClip.frameImages = this._openedByFrames;
        // this._myClip.playWithTime(1);
        this.visible = false;
    }

    public setRemove(f:Function,o:any):void
    {
        this._empty = true;
        
        this._iconNode.visible = false;

        if (this.ballClip2)
        {
            this.ballClip2.dispose();
            this.ballClip2=null;
        }

        this.ballClip2 =  ComponentManager.getCustomMovieClip();
        let frameArray = [];
        for(var i:number=1;i<=6;i++)
		{
			frameArray.push("seawoman_effect_bomb"+i);
		}
        this.ballClip2.frameImages = frameArray;
        this.ballClip2.frameRate = 35;
        this.ballClip2.setPosition(-50,-40);
        this.addChild(this.ballClip2);
        this.ballClip2.setEndCallBack(()=>{

            this.ballClip2.dispose();
            this.ballClip2=null;
            if (f && o)
            {
                f.apply(o);
            }
            this.visible = false;

        },this);
         this.ballClip2.playWithTime(1);
    }

    public setShake(v:boolean):void
    {   
        egret.Tween.removeTweens(this);
        this.rotation = 0;
        if (v)
        {
            egret.Tween.get(this,{loop:true}).to({rotation:10},50).to({rotation:-10},100).to({rotation:10},100).to({rotation:0},50).wait(500);
        }
    }

    public dispose():void
	{	
        this._code = null;
        this._id = 0;
        
        this._myClip = null;
        this._iconNode = null;
        this._closedFrames.length = 0;
        this._openingFrames.length = 0;
        this._openedByFrames.length = 0;

        this.ballClip1 = null;
        this.ballClip2 = null;
        this._show = false;
        this._iconId = 0;
        this._icon = null;
        this._iconbg = null;
        this._empty = false;
        this._closingFrames.length =0;

		super.dispose();
	}
}