class DailybossnewRewardItem extends ScrollListItem 
{


	public constructor() {
		super();
	}

	public initItem(index: number, data: any): void {

		let bg = BaseBitmap.create("public_9_bg14");
		bg.width = 510;
		bg.height = 168;
		this.addChild(bg);

		let titleBg = BaseLoadBitmap.create("countrywarrewardview_itembg");
		titleBg.width = 508;
		titleBg.height = 35;
		titleBg.setPosition(bg.x + bg.width / 2 - titleBg.width / 2, bg.y + 10);
		this.addChild(titleBg);

        let rank:number[] = data.rank;
        let parmStr:string;
        if (rank[0] == rank[1])
        {
            parmStr = App.StringUtil.changeIntToCharText(rank[0]);
        }
        else
        {
            parmStr = String(rank[0])+"~"+rank[1];
        }
		let titleTF = ComponentManager.getTextField(LanguageManager.getlocal("acSingleDayBuild1ViewTab4ItemTile1", [parmStr]), 
        TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
		titleTF.setPosition(titleBg.x + titleBg.width / 2 - titleTF.width / 2, titleBg.y + titleBg.height / 2 - titleTF.height / 2)
		this.addChild(titleTF);

		let itemTopLine: BaseBitmap = BaseBitmap.create("public_line3");
		itemTopLine.width += titleTF.width;
		itemTopLine.setPosition(titleBg.x + titleBg.width / 2 - itemTopLine.width / 2, titleBg.y + titleBg.height / 2 - itemTopLine.height / 2);
		this.addChild(itemTopLine);

		let awardstr = `1022_0_${data.score}|`+data.getReward;

		let rewardVoList = GameData.formatRewardItem(awardstr);
		let scale = 0.85;
		let itemHeight = 0;
		let rewardbg = BaseBitmap.create("public_9_managebg");
		rewardbg.width = 484;
        rewardbg.height = 100;
		rewardbg.setPosition(titleBg.x + titleBg.width / 2 - rewardbg.width / 2, titleBg.y + titleBg.height + 5);
		this.addChild(rewardbg);
		for (let i = 0; i < rewardVoList.length; i++) {
			let rewardDB = GameData.getItemIcon(rewardVoList[i], true);
			rewardDB.setScale(scale);
			rewardDB.setPosition(rewardbg.x + 5 + ((rewardDB.width - 8) * (i % 5)), rewardbg.y + 5 + ((rewardDB.height - 8) * Math.floor(i / 5)))
			this.addChild(rewardDB);
		}

		
	}



	public getSpaceY(): number {
		return 5;
	}

	public dispose(): void {

		super.dispose();
	}
}