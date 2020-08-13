

class CatchPrisonPopupView extends PopupView
{
    //囚犯主图
    private prisonerDescribe:BaseTextField= null;
	private _prisonerId:string;
	private _showBoss:string;

    public constructor() 
	{
		super();
	}

	protected getResourceList():string[]
	{
		this._prisonerId =  this.param.data.unlockPrison;
		this._showBoss =  this.param.data.showBoss;

		return super.getResourceList().concat(["prisonview_small_bg","catch_prisoner_text","prisonview_itembg","catch_prisoner_text_laoyitype"]);
	}

	protected initView():void
	{	
		

        this.touchEnabled =false;
        let bg:BaseBitmap = BaseBitmap.create("prisonview_small_bg");
        bg.x=this.viewBg.width/2 - bg.width/2;
        this.addChildToContainer(bg);

        //人物大头像 
        let prisonHead:BaseBitmap = BaseLoadBitmap.create("story_npc_"+this._showBoss);
        prisonHead.x+=100+GameData.popupviewOffsetX;
        prisonHead.y+=15;
        
        prisonHead.scaleX =0.8;
        prisonHead.scaleY =0.8;
        this.addChildToContainer(prisonHead);
    
        let bg2:BaseBitmap = BaseBitmap.create("prisonview_itembg");
        bg2.x+=13.5+GameData.popupviewOffsetX;
        this.addChildToContainer(bg2);

        //人物描述
		let textStr:string = LanguageManager.getlocal("prisonerName"+this._prisonerId)+" ("+LanguageManager.getlocal("prisonerOffice"+this._prisonerId)+")";
	    this.prisonerDescribe =	ComponentManager.getTextField(textStr,TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_WHITE);
		this.prisonerDescribe.setPosition(this.viewBg.width/2 - this.prisonerDescribe.width/2,bg2.y+bg2.height-50);
		this.addChildToContainer(this.prisonerDescribe);

      
		let btnBg:BaseBitmap = BaseBitmap.create("catch_prisoner_text");
        if(Api.switchVoApi.checkOpenNewPrison())
        {
           btnBg = BaseBitmap.create("catch_prisoner_text_laoyitype");
        }
		btnBg.setPosition(GameConfig.stageWidth/2 - btnBg.width/2,  GameConfig.stageHeigth/2 + 260);
		this.addChild(btnBg);
        
        this.y =-200;
        this.alpha=0;
        egret.Tween.get(this).to({alpha:1,y:0},800).call(this.remove,this);
        
    }
    private drawblackMask():void
    {
        let _maskBmp = BaseBitmap.create("public_9_viewmask");
		_maskBmp.width=GameConfig.stageWidth;
		_maskBmp.height=GameConfig.stageHeigth;
		_maskBmp.touchEnabled = true;
		this.addChild(_maskBmp);
        this.setChildIndex(_maskBmp,0);
    }

    protected isShowMask():boolean
	{
		return false;
	}
    private remove():void
	{
         this.drawblackMask();
         this.touchEnabled =true;
         this.addTouchTap(this.touchHandler,this);
	}
    private touchHandler():void
    {
          this.dispose();
    }

    protected getShowHeight():number
	{
		return 510+10;
	}

    protected getTitleStr():string
    {
       return  "prisonCatch";
    }

    //是否展示弹窗动效
	protected isShowOpenAni():boolean
	{
		return false;
    }
    
    public dispose(): void
    {
        this.prisonerDescribe =null;
		this._prisonerId = null;
		this._showBoss = null;

        super.dispose();
    }
   
}