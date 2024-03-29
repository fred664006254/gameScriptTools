/**
 * 参加门客的信息
 * author 张朝阳
 * date 2018/10/15
 * @class AllianceWarJoinBattleInfoScrollItem
 */
class AllianceWarJoinBattleInfoScrollItem extends ScrollListItem {

	public constructor() {
		super();
	}

	public initItem(index: number, data: {po:number,poList:{id:string,servant:string,stra:number,st:number,po:number,name:string,dps:number}[]}): void {

		this.width = 514;
		let bg = BaseBitmap.create("public_listbg");
		bg.width = this.width;
		this.addChild(bg);

		let titleBg = BaseBitmap.create("public_up3");
		titleBg.width = bg.width-5;
		titleBg.height = 35;
		titleBg.setPosition(bg.x + bg.width / 2 - titleBg.width / 2, bg.y + 5);
		this.addChild(titleBg);

		let titleTxt = ComponentManager.getTextField(LanguageManager.getlocal("allianceWarJoinBattleInfoPo" + data.po), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
		titleTxt.setPosition(titleBg.x + titleBg.width / 2 - titleTxt.width / 2, titleBg.y + titleBg.height / 2 - titleTxt.height / 2);
		this.addChild(titleTxt);

		let leftLine = BaseBitmap.create("public_v_huawen01");
		// leftLine.anchorOffsetX = leftLine.width / 2;
		leftLine.anchorOffsetY = leftLine.height / 2;
		leftLine.setPosition(titleBg.x + titleBg.width / 2  - leftLine.width - 70, titleTxt.y + titleTxt.height / 2)
		this.addChild(leftLine);

		let rightLine = BaseBitmap.create("public_v_huawen01");
		rightLine.anchorOffsetX = rightLine.width / 2;
		rightLine.anchorOffsetY = rightLine.height / 2;
		rightLine.rotation = 180;
		rightLine.setPosition(titleBg.x + titleBg.width / 2 + rightLine.width / 2 + 70, leftLine.y)
		this.addChild(rightLine);


		let addInfo = Config.AlliancewarCfg.getAddition(data.po);
		let tipTxt = ComponentManager.getTextField(LanguageManager.getlocal("allianceWarJoinBattleInfoAdditionPo" + data.po,[String(addInfo.level),addInfo.addition]), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_WARN_GREEN);
		tipTxt.setPosition(titleBg.x + titleBg.width / 2 - tipTxt.width / 2, titleBg.x + titleBg.height + 12);
		this.addChild(tipTxt);

		let offsetHeight:number = 70;
		for(let i = 0;i < data.poList.length; i++)
		{
			let line = BaseBitmap.create("public_line1");
			line.setPosition(bg.x + bg.width / 2 - line.width / 2, i * offsetHeight + tipTxt.y + tipTxt.height + 5);
			this.addChild(line);

			let playerNameTxt = ComponentManager.getTextField(data.poList[i].name,20,TextFieldConst.COLOR_BROWN);
			playerNameTxt.setPosition(bg.x + 45,line.y + line.height + 10);
			this.addChild(playerNameTxt);
			if(data.poList[i].stra)
			{
				let straTxt = ComponentManager.getTextField(LanguageManager.getlocal("allianceWarPlanType" + data.poList[i].stra),20);
				straTxt.setPosition(playerNameTxt.x + playerNameTxt.width + 10,playerNameTxt.y);
				this.addChild(straTxt);
			}
			let servantNamrStr:string = Config.ServantCfg.getServantItemById(data.poList[i].servant).name;
			let servantNameTxt = ComponentManager.getTextField(LanguageManager.getlocal("allianceWarJoinBattleInfoServantName",[servantNamrStr]),20,TextFieldConst.COLOR_BROWN);
			servantNameTxt.setPosition(playerNameTxt.x,playerNameTxt.y + playerNameTxt.height + 10);
			this.addChild(servantNameTxt);

			let fightTxt = ComponentManager.getTextField(LanguageManager.getlocal("allianceWarJoinBattleInfoServantFight"),20,TextFieldConst.COLOR_BROWN);
			fightTxt.setPosition(bg.x + bg.width  - fightTxt.width - 150,servantNameTxt.y);
			this.addChild(fightTxt);

			let fightTxt2 = ComponentManager.getTextField(LanguageManager.getlocal("allianceWarJoinBattleInfoServantFight2",[App.StringUtil.changeIntToText(Math.floor(data.poList[i].dps))]),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BROWN);
			fightTxt2.setPosition(fightTxt.x + fightTxt.width,servantNameTxt.y);
			this.addChild(fightTxt2);

			if(String(Api.playerVoApi.getPlayerID()) == data.poList[i].id)
			{
				playerNameTxt.setColor(0xa87e00);
				servantNameTxt.setColor(0xa87e00);
				fightTxt.setColor(0xa87e00);
				fightTxt2.setColor(0xa87e00);
			}

			let titleAdd = 	Api.allianceWarVoApi.getAddTitle(data.poList[i].id);
			if(titleAdd)
			{
				let titelTxt = ComponentManager.getTextField(LanguageManager.getlocal("allianceWarTitleAdd",[String(titleAdd)]),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_WARN_GREEN);
				titelTxt.setPosition(fightTxt.x,playerNameTxt.y);
				this.addChild(titelTxt);
			}
		}

		bg.height += offsetHeight * data.poList.length + 30;
		this.height = bg.height;

	}

	public getSpaceY(): number {
		return 5;
	}

	public dispose(): void {

		super.dispose();
	}
}