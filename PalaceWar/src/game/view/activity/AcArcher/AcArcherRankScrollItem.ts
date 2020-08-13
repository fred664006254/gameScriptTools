/**
  * 黄忠活动排行榜
  * author 张朝阳
  * date 2018/6/22
  * @class AcArcherRankScrollItem
  */
class AcArcherRankScrollItem extends ScrollListItem
{

	public constructor() 
	{
		super();
	}
	/**
	 * 初始化itemview
	 */
	public initItem(index:number,data:any):void
	{
		
		let itemData = data;
		let itemIndex = index + 1;
		this.width = 516;
		this.height = 52;
		//排名
		if(itemIndex <= 3)
		{
			let rankBM = BaseLoadBitmap.create("rank_"+String(itemIndex));
            rankBM.width = 42;
            rankBM.height = 41;
            rankBM.setPosition(this.x -  rankBM.width / 2 + 55,this.y + this.height / 2 - rankBM.height / 2)
            this.addChild(rankBM);
		}
		else
		{
			let rankTF = ComponentManager.getTextField(String(itemIndex),TextFieldConst.FONTSIZE_CONTENT_COMMON);
			rankTF.setPosition(this.x -  rankTF.width / 2 + 55,this.y + this.height / 2 - rankTF.height / 2);
			this.addChild(rankTF);
			if(itemData.uid == Api.playerVoApi.getPlayerID())
			{
				rankTF.setColor(TextFieldConst.COLOR_QUALITY_YELLOW);
			}
		}
		//名字
		let nameTF = ComponentManager.getTextField(data.name,TextFieldConst.FONTSIZE_CONTENT_COMMON);
		nameTF.setPosition(this.x + this.width / 2 - nameTF.width / 2,this.y + this.height / 2 - nameTF.height / 2);
		this.addChild(nameTF);
		//杀敌数
		let killTF = ComponentManager.getTextField(data.value,TextFieldConst.FONTSIZE_CONTENT_COMMON);
		killTF.setPosition(this.x + this.width - killTF.width / 2 - 110 ,this.y + this.height / 2 - killTF.height / 2);
		this.addChild(killTF);
		//文本线
		let lineSp = BaseBitmap.create("public_line1");
		lineSp.setPosition(this.x + this.width / 2 - lineSp.width / 2,this.y + this.height - lineSp.height);
		this.addChild(lineSp);

		if(itemData.uid == Api.playerVoApi.getPlayerID())
		{
			nameTF.setColor(TextFieldConst.COLOR_QUALITY_YELLOW);
			killTF.setColor(TextFieldConst.COLOR_QUALITY_YELLOW);
		}

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