
class RewardItemScrollItem extends ScrollListItem
{
	public constructor() 
	{
		super();
	}

	protected initItem(index:number,itemInfoVo:RewardItemVo,scale:any):void
	{
		if(!scale){
			scale = 1;
		}
		this.width = 108 * scale + 8;
		this.height = 108 * scale;
		if(itemInfoVo.type==1)
		{
			let itemCfg =  Config.ItemCfg.getItemCfgById(itemInfoVo.id);  
			let iconItem = GameData.getItemIcon(itemCfg,true); 
			iconItem.x =4;
			iconItem.y =4; 
			iconItem.setScale(scale);
			this.addChild(iconItem);
		}
		else
		{		
			let iconItem = GameData.getItemIcon(itemInfoVo,true); 
			iconItem.setScale(scale);
			iconItem.x = iconItem.y = 5;
			this.addChild(iconItem); 
		}

		if(itemInfoVo.id == Config.ZhenqifangCfg.needItem){
			let clip = ComponentManager.getCustomMovieClip(`zqfsaoguang`, 7);
			clip.setEndFrameAndPlay(20);
			this.addChild(clip);
			clip.playWithTime(-1);
			clip.setScale(0.8);
			clip.x = -8;
			clip.y = -2;
		}
	}


	public getSpaceX():number
	{
		return 0;
	}

	public getSpaceY():number
	{
		return 0;
	}

	public dispose():void
	{	
		super.dispose();
	}
}