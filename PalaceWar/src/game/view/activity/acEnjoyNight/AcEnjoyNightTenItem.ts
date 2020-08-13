class AcEnjoyNightTenItem  extends ScrollListItem
{
    public constructor() 
	{
		super();
	}

    private itemData:any =null;

    private get vo():AcEnjoyNightVo
	{
		 let springCelebrateVo = <AcEnjoyNightVo>Api.acVoApi.getActivityVoByAidAndCode(this.itemData.aid, this.itemData.code); 
		 return  springCelebrateVo;
	} 

    private get cfg() : Config.AcCfg.EnjoyNightCfg
    {
        return Config.AcCfg.getCfgByActivityIdAndCode(this.itemData.aid, this.itemData.code);
	}

    protected initItem(index:number,data:any,itemParam:any)
    {	
        this.itemData = itemParam;
		let aid = itemParam.aid;
		let code = itemParam.code;

        let bg = BaseBitmap.create("public_9_bg14");
		bg.width = 502;
		bg.height = 203;
		this.addChild(bg);

        
		let unit = this.cfg.map[data.pos];
                
		
		let value1 = data.randNumber;
        let desc1 = ComponentManager.getTextField(LanguageManager.getlocal("acEnjoyNightThrowTimes", [App.StringUtil.changeIntToCharText(index+1),String(value1)]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
		desc1.setPosition(24, 12)
		this.addChild(desc1);

        let picName:string = "common";
		if (unit.buildingType)
		{
			picName = unit.buildingType;
		}
		let value2 = LanguageManager.getlocal("acEnjoyNightAward_"+picName+"-1");
        let desc2 = ComponentManager.getTextField(LanguageManager.getlocal("acEnjoyNightArrive", [value2]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
		desc2.setPosition(desc1.x, desc1.y+desc1.height+4);
		this.addChild(desc2);

        let value3:number = data.addValue;
        let desc3 = ComponentManager.getTextField(LanguageManager.getlocal("acEnjoyNightGetValue", [String(value3)]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
		desc3.setPosition(desc1.x, desc2.y+desc2.height+4)
		this.addChild(desc3);

        let line = BaseBitmap.create("public_line1");
		line.setPosition(bg.width/2 - line.width/2,desc3.y+desc3.height+8);
		this.addChild(line);
        let posy = line.y+10;

        let rewardVoList = GameData.formatRewardItem(data.rewards);
		let scale = 0.8;

		for (let i = 0; i < rewardVoList.length; i++) {
			let rewardDB = GameData.getItemIcon(rewardVoList[i], true);
			rewardDB.setScale(scale);
			rewardDB.setPosition(18 + ((rewardDB.width - 13) * (i % 5)), posy + ((rewardDB.height - 8) * Math.floor(i / 5)))
			this.addChild(rewardDB);
		}
        
    }

}