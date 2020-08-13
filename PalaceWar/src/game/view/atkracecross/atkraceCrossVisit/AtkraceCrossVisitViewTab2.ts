/**
 * 仇人
 */
class AtkraceCrossVisitViewTab2 extends PopupViewTab
{

    public einList=[];
	public _scrollList: ScrollList=null;
	public  _bg:BaseBitmap=null;

    public constructor() 
	{
		super();
        this.initView();
	} 

	protected initView():void
	{
		this._bg= BaseBitmap.create("public_9_probiginnerbg");
		this._bg.width=516;
		this._bg.height=618;
		this._bg.x =25 ;
		this._bg.y =55;
		this.addChild(this._bg);

		AtkraceVisitViewTab1.AtkaceType =1;
		NetManager.request(NetRequestConst.REQUEST_ATKRACECROSS_GETMODEL, {});
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ATKRACECROSS_GETMODEL), this.useCallback, this);
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_RESET_ATKRACECROSS,this.battleCallback,this);
    }

	private battleCallback():void
	{	 
		NetManager.request(NetRequestConst.REQUEST_ATKRACE_GETMODEL, {});
	}


	public  useCallback(data:any):void
	{

		if (this._scrollList)
		{
			this._scrollList.dispose();
			this._scrollList = null;
		}

		if(data.data.ret)
		{
			if(data.data.data.data.atkracecross.einfo)
			{
				this.einList=data.data.data.data.atkracecross.einfo;
			
				if(this.einList.length>0)
				{
						AtkraceCrossVisitViewTab1.AtkaceType=1;
						if(AtkraceCrossVisitViewTab1.AtkaceType ==1)
						{
							this.showList();
						}
				}
				else
				{
					this.shownoDataTxt();
				}
			}
			
		}
		else 
		{	
			this.shownoDataTxt();
		}	
	}
	private shownoDataTxt():void
	{
		//没有仇人消息
		let noDataTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_QUALITY_WHITE);
		noDataTxt.text =LanguageManager.getlocal("atkracedes2");
		noDataTxt.x = 220 ;//rankImg.x+60
		noDataTxt.y = 300;//rankImg.y+10;
		this.addChild(noDataTxt);
	}
    public showList():void
    {
	
		let rect = egret.Rectangle.create();
		rect.setTo(0, 0, 640, 610);
		this._scrollList = ComponentManager.getScrollList(ActrackCrossVisitTab2Item, this.einList, rect);
		this.addChild(this._scrollList);
		this._scrollList.setPosition(-35 , 60);
    }


    public dispose():void
	{
		this.einList=[];
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_RESET_ATKRACECROSS,this.battleCallback,this);
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ATKRACECROSS_GETMODEL), this.useCallback, this);
		super.dispose();
		AtkraceCrossVisitViewTab1.AtkaceType=1;
		
   	}

}