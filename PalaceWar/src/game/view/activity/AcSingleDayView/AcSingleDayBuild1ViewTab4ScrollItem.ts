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

		let bg = BaseBitmap.create("public_9_bg14");
		bg.width = 600;
		this.addChild(bg);

		let titleBg = BaseLoadBitmap.create("acmidautumnview_titlebg");
		titleBg.width = 600;
		titleBg.height = 35;
		titleBg.setPosition( bg.x +  bg.width / 2 - titleBg.width / 2 ,bg.y + 5);
		this.addChild(titleBg);

		let titleStr:string = null; 
		if(data.maxRank != data.minRank)
		{
			titleStr = LanguageManager.getlocal("acSingleDayBuild1ViewTab4ItemTile2",[data.minRank,data.maxRank]);
		}
		else
		{
			titleStr = LanguageManager.getlocal("acSingleDayBuild1ViewTab4ItemTile1",[data.minRank]);
		}
		let titleTxt = ComponentManager.getTextField(titleStr,TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
		titleTxt.setPosition(titleBg.x + titleBg.width / 2 - titleTxt.width / 2,titleBg.y  + titleBg.height / 2 - titleTxt.height / 2);
		this.addChild(titleTxt);

		let leftLine = BaseBitmap.create("public_line3");
		leftLine.width += titleTxt.width;
		leftLine.setPosition(titleTxt.x + titleTxt.width / 2 - leftLine.width / 2, titleTxt.y + titleTxt.height / 2 - leftLine.height / 2);
		this.addChild(leftLine);


		let rewardVoList = GameData.formatRewardItem(data.getReward);
		let offsetHeigth:number = 0
		for(let i = 0;i < rewardVoList.length;i++)
		{
			let itemDB = GameData.getItemIcon(rewardVoList[i],true);
			itemDB.setPosition(bg.x + 17 + (itemDB.width + 7) * (i % 5),bg.y + 60 + (itemDB.height + 15) * Math.floor(i / 5));
			this.addChild(itemDB);
			offsetHeigth = itemDB.height;
		}
		bg.height = offsetHeigth * (Math.floor(rewardVoList.length / 6) + 1) + 115;
		this.height = bg.height;
	}
	public dispose(): void {
		super.dispose();
	}


}