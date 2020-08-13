class AcDailyActivityScrollItem  extends ScrollListItem
{
    public constructor()
    {
        super();
    }
    
    protected initItem(index:number,data:RewardItemVo)
    {
        
        let reward = GameData.getItemIcon(data,true,true);
        //透明图填充Item
        let fillBg = BaseBitmap.create("public_9_alpha0");
        fillBg.width = reward.width + 10;
        fillBg.height = reward.height + 20;
        reward.setPosition(fillBg.x + fillBg.width  - reward.width ,fillBg.y + fillBg.height / 2 - reward.height / 2 );
        this.width = fillBg.width + 8;
        this.height = fillBg.height + 8;
        this.addChild(fillBg);
        this.addChild(reward);
    }


    public getSpaceX():number
	{
		return 15;
	}
	/**
	 * 不同格子Y间距
	 */
	public getSpaceY():number
	{
		return 15;
	}
    public dispose():void
    {
        super.dispose();
    }
}