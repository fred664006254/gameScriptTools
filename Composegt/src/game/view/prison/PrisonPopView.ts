class PrisonPopView extends PopupView
{
    //囚犯主图
    private prisonerDescribe:BaseTextField= null;
    private currContainer:BaseDisplayObjectContainer =null;
 

    public constructor() 
	{
		super();
	}

	protected initView():void
	{
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_CLOSE_POPUPVIEW,this.hide,this);
 
        let public_tc_bg01:BaseBitmap = BaseBitmap.create("public_tc_bg01");
        this.addChildToContainer(public_tc_bg01);
        public_tc_bg01.width = 537;
        public_tc_bg01.height =387;
        // public_tc_bg01.x =42;
         public_tc_bg01.x = this.viewBg.width/2 - public_tc_bg01.width/2;
        public_tc_bg01.y =5;
    

        this.touchEnabled =false;
        let bg:BaseBitmap = BaseBitmap.create("prisonview_small_bg");
        bg.x=47;
        bg.y=10;
        this.addChildToContainer(bg); 
        
        //人物大头像  story_npc_
        var currNum= Api.prisonVoApi.getCurrPrisonId()+20;
        let prisonHead:BaseBitmap = BaseLoadBitmap.create("story_npc_"+ currNum);
        prisonHead.x =140;
        prisonHead.y =15;
        
        prisonHead.scaleX =0.8;
        prisonHead.scaleY =0.8;
        this.addChildToContainer(prisonHead);
      
    
        var bg2:BaseBitmap = BaseBitmap.create("prisonview_itembg"); 
        bg2.x =bg.x;
        bg2.y = 10;
        this.addChildToContainer(bg2);  


        let nameBottom = BaseBitmap.create("public_tc_hd01"); 
        nameBottom.width =525;
        nameBottom.height =76;
        nameBottom.x= 50
        nameBottom.y=315;
        this.addChildToContainer(nameBottom);


        //人物描述
	    this.prisonerDescribe =	ComponentManager.getTextField("0",TextFieldConst.FONTSIZE_CONTENT_COMMON);
		this.prisonerDescribe.text = LanguageManager.getlocal("prisonerDescription"+Api.prisonVoApi.getCurrPrisonId());
		this.prisonerDescribe.setPosition(55,330);
        this.prisonerDescribe.lineSpacing =8;
        this.prisonerDescribe.width=bg.width-20;
		this.addChildToContainer(this.prisonerDescribe); 
        
        this.y =-200;
        this.alpha=0;
        egret.Tween.get(this).to({alpha:1,y:0},800).call(this.remove,this);
        
    }

    protected isShowOpenAni():boolean
	{
		return false;
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
         this.touchEnabled =true; 
         this.addTouchTap(this.hide,this); 
	}

    protected getShowHeight():number
	{
		return 500;
	}

    protected getTitleStr():string
    {
       return  Api.prisonVoApi.getPrisonTitleStr();
    }
    public dispose(): void
    {
        this.prisonerDescribe =null;
        this.currContainer=null;
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_CLOSE_POPUPVIEW,this.hide,this);
        super.dispose();
    }
   
}