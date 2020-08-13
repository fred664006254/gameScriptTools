class WelfareViewRebate extends WelfareViewTab
{
	
	private _scrollList:ScrollList = null;  
	public constructor() 
	{
		super();
	}

	protected init():void
	{
		super.init(); 
	 
		let arr =[0,1,2,3];
		let info = arr; 
		let rect = egret.Rectangle.create();
		rect.setTo(0,0,492,GameConfig.stageHeigth - 304);
		this._scrollList = ComponentManager.getScrollList(WelfareViewRebateScrollItem,info,rect);
		this.addChild(this._scrollList);
		this._scrollList.setPosition(0,195); 
	}
 
	public dispose():void
	{ 
		this._scrollList=null;
		super.dispose();
	}
}