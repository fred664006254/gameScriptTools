// AllianceExpLogItem
class AllianceExpLogItem extends ScrollListItem
{
	public constructor() {
		super();
	}

	protected initItem(index:number,data:any[])
    {
        this.width = 526;
        this.height = 75;

        let bgImg:BaseBitmap = BaseBitmap.create("public_9_probiginnerbg");
		bgImg.width = 526;
		bgImg.height = 71;
		this.addChild(bgImg);


        let typeStr:string;
		if (data[0] == 1)
        {   
            let bossName:string = LanguageManager.getlocal("allianceBoss_monsterName"+data[4]);
			typeStr = LanguageManager.getlocal("allianceExpLogDesc1",[data[3],bossName,data[1]]);
		}
		else if (data[0] == 2)
        {   
            let itemName:string = LanguageManager.getlocal("allianceBuildName"+data[4]);
			typeStr = LanguageManager.getlocal("allianceExpLogDesc2",[data[3],itemName,data[1]]);
		}
        else 
        {   
			let winStr:string = data[5]>0 ? LanguageManager.getlocal("allianceWarHistoryWin") : LanguageManager.getlocal("allianceWarHistoryFail");
			if (data[4])
			{
				
				typeStr = LanguageManager.getlocal("allianceExpLogDesc3",[data[3],winStr,data[4],data[1]]);
			}
			else
			{
				typeStr = LanguageManager.getlocal("allianceExpLogDesc4",[data[1]]);
			}


            
		}

		let descTxt:BaseTextField = ComponentManager.getTextField(typeStr,TextFieldConst.FONTSIZE_CONTENT_COMMON);
		descTxt.x = 13;
		descTxt.y = 10;
		descTxt.width = 500;
		descTxt.lineSpacing = 5;
		this.addChild(descTxt);
		

        let timeTxt = ComponentManager.getTextField(App.DateUtil.getFormatBySecond(data[2],2),TextFieldConst.FONTSIZE_CONTENT_SMALL);
		timeTxt.x = bgImg.width - timeTxt.width - 10;
        timeTxt.y = 43;
        this.addChild(timeTxt);
    }

}