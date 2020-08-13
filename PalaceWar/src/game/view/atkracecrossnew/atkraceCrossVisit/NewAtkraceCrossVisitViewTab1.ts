/**
 * 防守消息
 */
class NewAtkraceCrossVisitViewTab1 extends PopupViewTab
{

	public defenseList=[];
	public _scrollList: ScrollList=null;

	private noDataTxt:BaseTextField =null;
	public static AtkaceType:number =0;
    public constructor() 
	{
		super();
		this.initView();
	}
	
	public initView():void
	{
	
		let bg= BaseBitmap.create("public_9_probiginnerbg");
		bg.width=516;
		bg.height=618;
		bg.x =25;
		bg.y =55 ;
		this.addChild(bg);
		
		AtkraceVisitViewTab1.AtkaceType =0;
		NetManager.request(NetRequestConst.REQUEST_NEWATKRACECROSS_GETMODEL, {});
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_NEWATKRACECROSS_GETMODEL), this.useCallback, this);
    }
	public  useCallback(data:any):void
	{
		if(data.data.ret)
		{
			if(data.data.data.data.atkracecross.dinfo&&data.data.data.data.atkracecross.dinfo.length>=1)
			{
				this.defenseList=data.data.data.data.atkracecross.dinfo;
				if(AtkraceVisitViewTab1.AtkaceType ==0)
				{
					this.showList();
				}
			}
			else 
			{
				//没有数据消息
				if(this.noDataTxt==null)
				{
					this.noDataTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_QUALITY_WHITE);
					this.noDataTxt.text =LanguageManager.getlocal("atkracedes1");
					this.noDataTxt.x = 220 ;//rankImg.x+60
					this.noDataTxt.y = 300;//rankImg.y+10;
				}
				this.addChild(this.noDataTxt);
			}	
		}
		else if(data.data.data.ret==-2)
		{
			//没有数据消息
			if(this.noDataTxt==null)
			{
				this.noDataTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_QUALITY_WHITE);
				this.noDataTxt.text =LanguageManager.getlocal("atkracedes1");
				this.noDataTxt.x = 220 ;//rankImg.x+60
				this.noDataTxt.y = 300;//rankImg.y+10;
			}
			this.addChild(this.noDataTxt);
		}
	}

   public  showList(): void 
   {
	
	   if(this._scrollList==null)
	   {
		    let rect = egret.Rectangle.create();
			rect.setTo(0, 0, 640, 610);
			this._scrollList = ComponentManager.getScrollList(NewActrackCrossVisitTab1Item, this.defenseList, rect);
			this.addChild(this._scrollList);
			this._scrollList.setPosition(-35 , 60);
	   }
	}

    public dispose():void
	{

		this.noDataTxt  =null;
		this.defenseList =[];
		this._scrollList=null;
   		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_NEWATKRACECROSS_GETMODEL), this.useCallback, this);
		AtkraceCrossVisitViewTab1.AtkaceType =0;
		super.dispose();
   }
}