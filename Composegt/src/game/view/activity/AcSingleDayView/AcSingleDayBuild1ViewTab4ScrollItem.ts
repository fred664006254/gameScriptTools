/**
 * 双11  排行榜 item
 * @author 张朝阳
 * date 2018/10/24
 * @class AcSingleDayBuild1ViewTab4ScrollItem
 */
class AcSingleDayBuild1ViewTab4ScrollItem extends ScrollListItem {
	public constructor() {
		super();
		
	}

	protected initItem(index:number,data:any){

		let bg = BaseBitmap.create("rechargevie_db_01");
		bg.width = GameConfig.stageWidth - 20;
		this.addChild(bg);

		let titleStr:string = null; 
		if(data.maxRank != data.minRank)
		{
			titleStr = LanguageManager.getlocal("acSingleDayBuild1ViewTab4ItemTile2",[data.minRank,data.maxRank]);
		}
		else
		{
			titleStr = LanguageManager.getlocal("acSingleDayBuild1ViewTab4ItemTile1",[data.minRank]);
		}
		let titleTxt = ComponentManager.getTextField(titleStr,TextFieldConst.FONTSIZE_CONTENT_COMMON,0xa87e00);
		titleTxt.setPosition(bg.x + bg.width / 2 - titleTxt.width / 2,bg.y + 20);
		this.addChild(titleTxt);

		let leftLine = BaseBitmap.create("public_v_huawen01");
		leftLine.setPosition(titleTxt.x - leftLine.width - 35,titleTxt.y + titleTxt.height / 2 - leftLine.height / 2);
		this.addChild(leftLine);

		let rightLine = BaseBitmap.create("public_v_huawen01");
		rightLine.anchorOffsetX = rightLine.width / 2;
		rightLine.anchorOffsetY = rightLine.height / 2;
		rightLine.rotation = 180;
		rightLine.setPosition(titleTxt.x + titleTxt.width + rightLine.width / 2 + 35,titleTxt.y + titleTxt.height / 2);
		this.addChild(rightLine);

		let rewardVoList = GameData.formatRewardItem(data.getReward);
		let offsetHeigth:number = 0
		for(let i = 0;i < rewardVoList.length;i++)
		{
			let itemDB = GameData.getItemIcon(rewardVoList[i],true,false);
			itemDB.setPosition(bg.x + 15 + (itemDB.width + 15) * (i % 5),bg.y + 60 + (itemDB.height + 15) * Math.floor(i / 5));
			this.addChild(itemDB);
			offsetHeigth = itemDB.height;
		}
		bg.height = offsetHeigth * (Math.floor(rewardVoList.length / 6) + 1) + 115;
	}
	public dispose(): void {
		super.dispose();
	}


}