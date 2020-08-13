/**
  * 赵云活动排行榜奖励
  * author 张朝阳
  * date 2018/7/11
  * @class AcMazeRankRewardScrollItem
  */
class AcMazeRankRewardScrollItem extends ScrollListItem
{
	public constructor() 
	{
		super();
	}
	/**
	 * 初始化viewItem
	 */
	public initItem(index:number,data:any):void
	{
		let itemBg:BaseBitmap = BaseBitmap.create("public_9_probiginnerbg");
		itemBg.width = 516;
		itemBg.height = 10;
		this.addChild(itemBg);

		let itemTopBg:BaseBitmap = BaseBitmap.create("public_9_bg37");
		itemTopBg.width = itemBg.width;
		itemTopBg.height = 35;
		itemTopBg.setPosition(itemBg.x,itemBg.y);
		this.addChild(itemTopBg);

		let itemTopLine:BaseBitmap = BaseBitmap.create("public_line3");
		itemTopLine.width = itemTopBg.width - 60;
		itemTopLine.setPosition(itemTopBg.x + 30,itemTopBg.y + itemTopBg.height / 2 - itemTopLine.height / 2);
		this.addChild(itemTopLine);

		let itemTitleTF:BaseTextField;
		if(index < 3 )
		{
			itemTitleTF = ComponentManager.getTextField(LanguageManager.getlocal("acRank_rank" + String(index + 1)),TextFieldConst.FONTSIZE_CONTENT_COMMON);
		}
		else
		{
			itemTitleTF = ComponentManager.getTextField(LanguageManager.getlocal( "acRank_rank4",[data.rank[0],data.rank[1]]),TextFieldConst.FONTSIZE_CONTENT_COMMON);

		}
		
		 
		itemTitleTF.setPosition(itemTopBg.x + itemTopBg.width / 2 - itemTitleTF.width / 2, itemTopBg.y + itemTopBg.height / 2 - itemTitleTF.height / 2);
		this.addChild(itemTitleTF);
		//15

		let rewardArr:RewardItemVo[] =  GameData.formatRewardItem(data.getReward);
		let itemHeigth:number;
        for(var i = 0;i < rewardArr.length;i++)
        {
            let rewardItem: BaseDisplayObjectContainer = GameData.getItemIcon(rewardArr[i],true,true);
            rewardItem.setScale(0.83);
            rewardItem.setPosition(itemTopBg.x + i % 5 * (rewardItem.width - 12) + 20,itemTopBg.y + itemTopBg.height + Math.floor(i / 5) * (rewardItem.height - 10) + 15);
            this.addChild(rewardItem);
            //记录item的高度
            itemHeigth = rewardItem.height;
        }
		itemBg.height += (Math.floor(rewardArr.length / 5) + 1) * itemHeigth;
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