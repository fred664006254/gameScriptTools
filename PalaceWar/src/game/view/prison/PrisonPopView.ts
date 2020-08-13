class PrisonPopView extends PopupView
{
    //囚犯主图
    private prisonerDescribe:BaseTextField= null;
    private currContainer:BaseDisplayObjectContainer =null;
    private _bg:BaseBitmap = null;
    private _mainTaskHandKey:string = null;

    public constructor() 
	{
		super();
	}

	protected initView():void
	{
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_CLOSE_POPUPVIEW,this.hide,this);
 
         

        this.touchEnabled =false;
        let bg:BaseBitmap = BaseBitmap.create("prisonview_small_bg");
        bg.x=this.viewBg.width/2 - bg.width/2;
        bg.y = -2;
        this.addChildToContainer(bg);
        this._bg = bg;
        // this.currContainer.addChild(bg);
           

        //人物大头像  story_npc_
        var currNum= Api.prisonVoApi.getCurrPrisonId()+20;
        let prisonHead:BaseBitmap = BaseLoadBitmap.create("story_npc_"+ currNum);
        prisonHead.x=this.viewBg.width/2 - prisonHead.width/2-150;
        prisonHead.y+=15;
        
        prisonHead.scaleX =0.8;
        prisonHead.scaleY =0.8;
        this.addChildToContainer(prisonHead);
        // this.currContainer.addChild(prisonHead);
    
        var bg2:BaseBitmap = BaseBitmap.create("prisonview_itembg"); 
        bg2.x = this.viewBg.width/2 - bg2.width/2;
        bg2.y = -2;
        this.addChildToContainer(bg2); 

        //人物描述
	    this.prisonerDescribe =	ComponentManager.getTextField("0",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_WHITE);
		this.prisonerDescribe.text = LanguageManager.getlocal("prisonerDescription"+Api.prisonVoApi.getCurrPrisonId());
        this.prisonerDescribe.width=bg.width-30;
        this.prisonerDescribe.setPosition(this.viewBg.width/2 - this.prisonerDescribe.width/2,bg2.y+bg2.height-62);
        this.prisonerDescribe.lineSpacing=4;
		this.addChildToContainer(this.prisonerDescribe);
        // this.currContainer.addChild(this.prisonerDescribe);
        
        this.y =-200;
        this.alpha=0;
        egret.Tween.get(this).to({alpha:1,y:0},800).call(this.remove,this);
        
    }

    public hide():void
    {
        
         if(this.touchEnabled==true)
         {
           super.hide();
           App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_CLOSE_BLACKPANEL);	
         }
    }
   
    protected isShowMask():boolean
	{
		return false;
	}
    private remove():void
	{
        //  this.drawblackMask();
         this.touchEnabled =true; 
         this.addTouchTap(this.hide,this); 
        
         this._mainTaskHandKey = App.MainTaskHandUtil.addHandNode(
            this.container,
            this._bg.x + this._bg.width/2 - 10,
            this._bg.y + this._bg.height/2 + 10,
            [this],
            116,
            true,
            function(){
                return true;
            },
            this
         );
	}

    protected getShowHeight():number
	{
		return 510+8;
	}

    protected getTitleStr():string
    {
       return  Api.prisonVoApi.getPrisonTitleStr();
    }

    //是否展示弹窗动效
	protected isShowOpenAni():boolean
	{
		return false;
    }
    
    public dispose(): void
    {
        this.prisonerDescribe =null;
        this.currContainer=null;
        this._bg = null;
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_CLOSE_POPUPVIEW,this.hide,this);
        App.MainTaskHandUtil.releaseHandKey(this._mainTaskHandKey);
        this._mainTaskHandKey = null;
        super.dispose();
    }
   
}