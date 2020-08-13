class InviteViewTab3 extends CommonViewTab
{
	private _scrollList:ScrollList;
	private friendRechargeList:string[];
	public constructor() 
	{
		super();
		this.initView();
	}

	protected initView():void
	{
		this.friendRechargeList = Api.inviteVoApi.getFriendRechargeList();
		let rect = egret.Rectangle.create();
		rect.setTo(0,0,GameConfig.stageWidth,GameConfig.stageHeigth - 350 - 80);
		this._scrollList = ComponentManager.getScrollList(InviteViewTab3ScrollItem,this.friendRechargeList,rect);
		this.addChild(this._scrollList);
		this._scrollList.y = 80;
	}

	public dispose():void
	{
		super.dispose();
	}
}