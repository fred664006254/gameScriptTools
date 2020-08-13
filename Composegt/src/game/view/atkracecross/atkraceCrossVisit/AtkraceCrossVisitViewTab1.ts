/**
 * 防守消息
 */
class AtkraceCrossVisitViewTab1 extends PopupViewTab
{

	public defenseList=[];
	public _scrollList: ScrollList=null;

	private noDataTxt:BaseTextField =null;
	public static AtkaceType:number =0;
	public  _bg:BaseBitmap=null;
    public constructor() 
	{
		super();
		this.initView();
	}
	
	public initView():void
	{
	
		this._bg= BaseBitmap.create("public_9v_bg12");
		this._bg.width=530;
		this._bg.height=678;
		this._bg.x =GameConfig.stageWidth/2 - this._bg.width/2 -5;
		this._bg.y =75;
		this.addChild(this._bg);
		
		// AtkraceVisitViewTab1.AtkaceType =0;
		NetManager.request(NetRequestConst.REQUEST_ATKRACECROSS_GETMODEL, {});
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ATKRACECROSS_GETMODEL), this.useCallback, this);
    }
	public  useCallback(data:any):void
	{
		if(data.data.ret)
		{
			if(data.data.data.data.atkracecross.dinfo&&data.data.data.data.atkracecross.dinfo.length>=1)
			{
				this.defenseList=data.data.data.data.atkracecross.dinfo;
				
				// if(AtkraceVisitViewTab1.AtkaceType ==0)
				// {
					this.showList();
				// }
			}
			else 
			{
				//没有数据消息
				if(this.noDataTxt==null)
				{
					this.noDataTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BROWN_NEW);
					this.noDataTxt.text =LanguageManager.getlocal("atkracedes1");
					this.noDataTxt.x =this._bg.x;
					this.noDataTxt.width =this._bg.width;
					this.noDataTxt.textAlign ="center";
					this.noDataTxt.y = 300;
				}
				this.addChild(this.noDataTxt);
			}	
		}
		else if(data.data.data.ret==-2)
		{
			//没有数据消息
			if(this.noDataTxt==null)
			{
				this.noDataTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BROWN_NEW);
				this.noDataTxt.text =LanguageManager.getlocal("atkracedes1");
				this.noDataTxt.x =this._bg.x;
				this.noDataTxt.width =this._bg.width;
				this.noDataTxt.textAlign ="center";
				this.noDataTxt.y = 300;
			}
			this.addChild(this.noDataTxt);
		}
	}

   public  showList(): void 
   {
	
	   if(this._scrollList==null)
	   {
		    let rect = egret.Rectangle.create();
			rect.setTo(0, 0, 640, 655);
			this._scrollList = ComponentManager.getScrollList(ActrackCrossVisitTab1Item, this.defenseList, rect);
			this.addChild(this._scrollList);
			this._scrollList.setPosition(GameConfig.stageWidth/2 - this._scrollList.width/2 - 5, 85); 
	   }
	}

    public dispose():void
	{

		this.noDataTxt  =null;
		this.defenseList =[];
		this._scrollList=null;
   		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ATKRACECROSS_GETMODEL), this.useCallback, this);
		AtkraceCrossVisitViewTab1.AtkaceType =0;
		super.dispose();
   }
}