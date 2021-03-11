class InviteViewTab1 extends CommonViewTab
{
	private _scrollList:ScrollList;
	private friendNumList:string[];
	public constructor() 
	{
		super();
		this.initView();
	}

	protected initView():void
	{
		this.friendNumList = Api.inviteVoApi.getFriendNumList();
		let rect = egret.Rectangle.create();
		rect.setTo(0,0,GameConfig.stageWidth,GameConfig.stageHeigth - 490);
		this._scrollList = ComponentManager.getScrollList(InviteViewTab1ScrollItem,this.friendNumList,rect);
		this.addChild(this._scrollList);
		this._scrollList.y = 90;
		
		let borderBg = BaseBitmap.create("public_9v_bg03");
		borderBg.width = GameConfig.stageWidth;
		borderBg.height = GameConfig.stageHeigth - 455;
		borderBg.x = 0;
		borderBg.y = 80;
		this.addChild(borderBg); 
	}

	public dispose():void
	{
		super.dispose();
	}
}