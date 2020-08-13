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
		this._bg= BaseBitmap.create("public_9v_bg12");
		this._bg.width=530;
		this._bg.height=678;
		this._bg.x =GameConfig.stageWidth/2 - this._bg.width/2 -5;
		this._bg.y =75;
		this.addChild(this._bg);

		// AtkraceVisitViewTab1.AtkaceType =1;
		NetManager.request(NetRequestConst.REQUEST_ATKRACECROSS_GETMODEL, {});
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ATKRACECROSS_GETMODEL), this.useCallback, this);
    }
	public  useCallback(data:any):void
	{
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
		let noDataTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BROWN_NEW);
		noDataTxt.text =LanguageManager.getlocal("atkracedes2");
		noDataTxt.width =this._bg.width;
		noDataTxt.textAlign ="center";
		noDataTxt.x = this._bg.x; 
		noDataTxt.y = 300;
		this.addChild(noDataTxt);
	}
    public showList():void
    {
	
		let rect = egret.Rectangle.create();
		rect.setTo(0, 0, 640, 655);
		this._scrollList = ComponentManager.getScrollList(ActrackCrossVisitTab2Item, this.einList, rect);
		this.addChild(this._scrollList);
		this._scrollList.setPosition(GameConfig.stageWidth/2 - this._scrollList.width/2 - 5, 85); 
    }


    public dispose():void
	{
		this.einList=[];
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ATKRACECROSS_GETMODEL), this.useCallback, this);
		super.dispose();
		AtkraceCrossVisitViewTab1.AtkaceType=1;
		
   	}

}