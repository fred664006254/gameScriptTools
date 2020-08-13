/**
 * 参加门客的信息
 * author 张朝阳
 * date 2018/10/15
 * @class AcCrossServerHegemonyWarJoinScrollItem
 */
class AcCrossServerHegemonyWarJoinScrollItem extends ScrollListItem {

    private _aid:string = "";
    private _code:string = "";
	public constructor() {
		super();
	}
	private get cfg() : Config.AcCfg.CrossServerHegemonyCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this._aid, this._code);
    }
	public initItem(index: number, data: {po:number,poList:{id:string,servant:string,stra:number,st:number,po:number,name:string,dps:number}[]}, itemParam?:any): void {
	// public initItem(index: number, data: any, itemParam?:any): void {    
        // console.log(data, itemParam);
        this._aid = itemParam.aid;
        this._code = itemParam.code;
		this.width = 520;
		let bg = BaseBitmap.create("public_popupscrollitembg"); //public_9_bg14
		bg.width = 510;
		bg.x = this.width/2 - bg.width/2;
		this.addChild(bg);

		let titleBg = BaseBitmap.create("acsevenitemtopbg");
		// titleBg.width = 280;
		titleBg.setPosition(bg.x + bg.width / 2 - titleBg.width / 2, bg.y + 5);
		this.addChild(titleBg);

		let titleTxt = ComponentManager.getTextField(LanguageManager.getlocal("allianceWarJoinBattleInfoPo" + data.po), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
		titleTxt.setPosition(this.width/2 - titleTxt.width/2, titleBg.y + titleBg.height / 2 - titleTxt.height / 2);
		this.addChild(titleTxt);

		let leftLine = BaseBitmap.create("acsevenitemzshi");
		leftLine.anchorOffsetX = leftLine.width / 2;
		leftLine.anchorOffsetY = leftLine.height / 2;
		leftLine.setPosition(titleTxt.x - leftLine.width / 2 - 10, titleTxt.y + titleTxt.height / 2)
		this.addChild(leftLine);

		let rightLine = BaseBitmap.create("acsevenitemzshi");
		rightLine.anchorOffsetX = rightLine.width / 2;
		rightLine.anchorOffsetY = rightLine.height / 2;
		rightLine.rotation = 180;
		rightLine.setPosition(titleTxt.x + titleTxt.width + rightLine.width / 2 + 10, leftLine.y)
		this.addChild(rightLine);

		let addInfo = this.cfg.getAddition(data.po,itemParam.level);
		let tipTxt = ComponentManager.getTextField(LanguageManager.getlocal("allianceWarJoinBattleInfoAdditionPo" + data.po,[String(addInfo.level),addInfo.addition]), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_WARN_GREEN4);
		tipTxt.setPosition(titleBg.x + titleBg.width / 2 - tipTxt.width / 2, titleBg.y + titleBg.height + 12);
		this.addChild(tipTxt);

		let offsetHeight:number = 80;
		let infoColor = 0x635346;
		App.LogUtil.log("data.po "+data.po);
		if(data.po == 1){
			for(let i = 0;i < data.poList.length; i++)
			{
				let line = BaseBitmap.create("public_cut_line");
				// line.width = 460;
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
				let servantNameTxt = ComponentManager.getTextField(LanguageManager.getlocal("allianceWarJoinBattleInfoServantName",[servantNamrStr]),20,infoColor);
				servantNameTxt.setPosition(playerNameTxt.x,playerNameTxt.y + playerNameTxt.height + 10);
				this.addChild(servantNameTxt);

				let fightTxt = ComponentManager.getTextField(LanguageManager.getlocal("allianceWarJoinBattleInfoServantFight"),20,infoColor);
				fightTxt.setPosition(bg.x + bg.width  - fightTxt.width - 150,servantNameTxt.y);
				this.addChild(fightTxt);

				let fightTxt2 = ComponentManager.getTextField(LanguageManager.getlocal("allianceWarJoinBattleInfoServantFight2",[App.StringUtil.changeIntToText(Math.floor(data.poList[i].dps))]),TextFieldConst.FONTSIZE_CONTENT_SMALL,infoColor);
				fightTxt2.setPosition(fightTxt.x + fightTxt.width,servantNameTxt.y);
				this.addChild(fightTxt2);

				if(String(Api.playerVoApi.getPlayerID()) == data.poList[i].id)
				{
					playerNameTxt.setColor(0xa87e00);
					servantNameTxt.setColor(0xa87e00);
					fightTxt.setColor(0xa87e00);
					fightTxt2.setColor(0xa87e00);
				}

				// let titleAdd = 	Api.allianceWarVoApi.getAddTitle(data.poList[i].id);
				// if(titleAdd)
				// {
				// 	let titelTxt = ComponentManager.getTextField(LanguageManager.getlocal("allianceWarTitleAdd",[String(titleAdd)]),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_WARN_GREEN4);
				// 	titelTxt.setPosition(fightTxt.x,playerNameTxt.y);
				// 	this.addChild(titelTxt);
				// }
			}
			bg.height = offsetHeight * data.poList.length + tipTxt.y + tipTxt.height + 15;
			App.LogUtil.log("bg.height "+bg.height);
			if (bg.height < 126){
				bg.height = 126;
			}
			this.height = bg.height + 5;
		} else {
			// let b = BaseBitmap.create("accshegemony_battlembg");
			// b.width = 500;
			// b.height = data.poList.length * (78 + 5) + 5 + 3;
			// b.x = this.width/2 - b.width/2;
			// b.y = 84;
			// this.addChild(b);
			for(let i = 0;i < data.poList.length; i++)
			{
				// let res = "accshegemony_battlembg2";
				// if(String(Api.playerVoApi.getPlayerID()) == data.poList[i].id)
				// {
				// 	res = "accshegemony_battlembg1";
				// }
				// let line = BaseBitmap.create(res);
				// line.width = 500;
				// line.x = b.x - 5;
				// line.y = b.y + 5+3 + i * (78 + 5);
				// this.addChild(line);

				let line = BaseBitmap.create("public_cut_line");
				// line.width = 460;
				line.setPosition(bg.x + bg.width / 2 - line.width / 2, i * offsetHeight + tipTxt.y + tipTxt.height + 5);
				this.addChild(line);

				let playerNameTxt = ComponentManager.getTextField(data.poList[i].name,20,infoColor);
				playerNameTxt.setPosition(bg.x + 45,line.y + 10 + line.height);
				this.addChild(playerNameTxt);
				if(data.poList[i].stra)
				{
					let straTxt = ComponentManager.getTextField(LanguageManager.getlocal("allianceWarPlanType" + data.poList[i].stra),20);
					straTxt.setPosition(playerNameTxt.x + playerNameTxt.width + 10,playerNameTxt.y);
					this.addChild(straTxt);
				}
				let servantNamrStr:string = Config.ServantCfg.getServantItemById(data.poList[i].servant).name;
				let servantNameTxt = ComponentManager.getTextField(LanguageManager.getlocal("allianceWarJoinBattleInfoServantName",[servantNamrStr]),20,infoColor);
				servantNameTxt.setPosition(playerNameTxt.x,playerNameTxt.y + playerNameTxt.height + 10);
				this.addChild(servantNameTxt);

				let fightTxt = ComponentManager.getTextField(LanguageManager.getlocal("allianceWarJoinBattleInfoServantFight"),20,infoColor);
				fightTxt.setPosition(bg.x + bg.width  - fightTxt.width - 150,servantNameTxt.y);
				this.addChild(fightTxt);

				let fightTxt2 = ComponentManager.getTextField(LanguageManager.getlocal("allianceWarJoinBattleInfoServantFight2",[App.StringUtil.changeIntToText(Math.floor(data.poList[i].dps))]),TextFieldConst.FONTSIZE_CONTENT_SMALL,infoColor);
				fightTxt2.setPosition(fightTxt.x + fightTxt.width,servantNameTxt.y);
				this.addChild(fightTxt2);

				if(String(Api.playerVoApi.getPlayerID()) == data.poList[i].id)
				{
					playerNameTxt.setColor(0xa87e00);
					servantNameTxt.setColor(0xa87e00);
					fightTxt.setColor(0xa87e00);
					fightTxt2.setColor(0xa87e00);
				}

				// let titleAdd = 	Api.allianceWarVoApi.getAddTitle(data.poList[i].id);
				// if(titleAdd)
				// {
				// 	let titelTxt = ComponentManager.getTextField(LanguageManager.getlocal("allianceWarTitleAdd",[String(titleAdd)]),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_WARN_GREEN4);
				// 	titelTxt.setPosition(fightTxt.x,playerNameTxt.y);
				// 	this.addChild(titelTxt);
				// }
				
			}
			bg.height = offsetHeight * data.poList.length + tipTxt.y + tipTxt.height + 15;
			App.LogUtil.log("bg.height "+bg.height);
			if (bg.height < 126){
				bg.height = 126;
			}
			this.height = bg.height + 5;
		}




	}

	public getSpaceY(): number {
		return 5;
	}

	public dispose(): void {

		super.dispose();
	}
}