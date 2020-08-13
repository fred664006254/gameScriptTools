class MailRewardScrollItem extends ScrollListItem
{
	public constructor() 
	{
		super();
	}

	protected initItem(index:number,rewardInfoVo:RewardItemVo):void
	{
		let temW = 95;
		let temH = 94;
		let icon = GameData.getItemIcon(rewardInfoVo,true);
		icon.scaleX = temW/icon.width;
		icon.scaleY = temH/icon.height;
		this.addChild(icon);
		this.width = temW + this.getSpaceX();
		this.height = temH + this.getSpaceY();
	}

	public getSpaceX():number
	{
		return 4.1;
	}

	public getSpaceY():number
	{
		return 5;
	}

	public dispose():void
	{	
		super.dispose();
	}
}