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
		console.log("InviteViewTab1.initView");
		this.friendNumList = Api.inviteVoApi.getFriendNumList();
		let rect = egret.Rectangle.create();
		rect.setTo(0,0,GameConfig.stageWidth,GameConfig.stageHeigth - 350 - 80);
		this._scrollList = ComponentManager.getScrollList(InviteViewTab1ScrollItem,this.friendNumList,rect);
		this.addChild(this._scrollList);
		this._scrollList.y = 80;
		console.log("InviteViewTab1.initView over");
	}

	public dispose():void
	{
		super.dispose();
	}
}