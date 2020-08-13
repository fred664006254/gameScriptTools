class AcEnjoyNightAwardTaixue extends PopupView
{
	public constructor(){
		super();
	}
	
	private get cfg() : Config.AcCfg.EnjoyNightCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
	}
	
    private get vo() : AcEnjoyNightVo{
        return <AcEnjoyNightVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get code():string{
        return this.param.data.code;
    }

	 private get uicode():string{
        return this.param.data.uicode;
    }

    private get aid():string{
        return this.param.data.aid;
	}

    private get type():string{
        return this.param.data.buildingType;
	}

    private get id():string{
        return this.param.data.mapId;
	}

	protected getResourceList():string[]{
		return super.getResourceList().concat([
            "enjoynight_name_"+this.type,"enjoynight_awardbg","enjoynight_awardbg2"
		]);
    }

	public initView():void{		


		let view = this;

        let topbg = BaseBitmap.create("enjoynight_awardbg");
		topbg.setPosition(this.viewBg.width/2 - topbg.width/2,0);
		view.addChildToContainer(topbg);

        //人物、
        let rect = new egret.Rectangle(0,0,300,345);

		let npcPic:string ;
		if (this.type == "taixue")
		{
			npcPic = "servant_full_1030";
		}
		else if (this.type == "huanggong")
		{
			npcPic = "empshopman";
			rect.setTo(0,0,282,866);
		}
		else if (this.type == "leitai")
		{
			npcPic = "servant_full_1002";
		}
		else if (this.type == "xunfang")
		{
			npcPic = "wife_full_204";
			rect.setTo(0,0,300,394);
		}
		else if (this.type == "yanwuchang")
		{
			npcPic = "story_npc_7";
		}
		else if (this.type == "banghui")
		{
			npcPic = "servant_full_1031";
		}
		else if (this.type == "jiulou")
		{
			npcPic = "story_npc_2";
		}
		else if (this.type == "paihangbang")
		{
			npcPic = "searchnpc_full41";
		}


        let servant = BaseLoadBitmap.create(npcPic,rect);
        servant.setScale(0.75);
		servant.setPosition(10+GameData.popupviewOffsetX,10);
		view.addChildToContainer(servant);
        servant.mask = new egret.Rectangle(0,0,300,308);
        
        let nameIcon = BaseBitmap.create("enjoynight_name_"+this.type);
		nameIcon.setPosition(256+GameData.popupviewOffsetX,10);
		view.addChildToContainer(nameIcon);

		
	
        let onecfg:Config.AcCfg.EnjoyNightMapCfg = this.cfg.map[this.id];
		let descTxt = ComponentManager.getTextField(LanguageManager.getlocal(`acEnjoyNightAwardDesc_${view.type}-${view.uicode}`,[String(this.cfg.addValue)]), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        descTxt.width = 290;
        descTxt.lineSpacing = 6;
		descTxt.setPosition(nameIcon.x,nameIcon.y+nameIcon.height+5);
		view.addChildToContainer(descTxt);

		let descBg = BaseBitmap.create("enjoynight_awardbg2");
		descBg.setPosition(topbg.x+topbg.width-descBg.width,topbg.y+130);
		view.addChildToContainer(descBg);
		

        let descTxt2 = ComponentManager.getTextField(LanguageManager.getlocal(`acEnjoyNightAwardDesc2_${view.type}-${view.uicode}`,[String(onecfg.addValueMore)]), 18, TextFieldConst.COLOR_LIGHT_YELLOW);
        descTxt2.width = 290;
        descTxt2.lineSpacing = 5;
		descTxt2.setPosition(nameIcon.x,descBg.y+12);
		view.addChildToContainer(descTxt2);

		let descTxt22 = ComponentManager.getTextField(LanguageManager.getlocal(`acEnjoyNightAwardDesc2_2_${view.type}-${view.uicode}`,[String(onecfg.addValueLess)]), 18, TextFieldConst.COLOR_LIGHT_YELLOW);
        descTxt22.width = 290;
        descTxt22.lineSpacing = 5;
		descTxt22.setPosition(nameIcon.x,descTxt2.y+descTxt2.height+8);
		view.addChildToContainer(descTxt22);

		descBg.height = descTxt22.y+descTxt22.height+12-descBg.y;
		// let tipdesc = ComponentManager.getTextField(LanguageManager.getlocal(`acEnjoyNightTenTip`), 18, TextFieldConst.COLOR_GRAY_LIGHT);
        // tipdesc.width = 290;
        // tipdesc.lineSpacing = 4;
		// tipdesc.setPosition(nameIcon.x,topbg.y+topbg.height-tipdesc.height - 10);
		// view.addChildToContainer(tipdesc);
        
        let descTxt3 = ComponentManager.getTextField(LanguageManager.getlocal(`acEnjoyNightMaybeAnswer`), 24, TextFieldConst.COLOR_BROWN);
        descTxt3.width = 518;
        descTxt3.lineSpacing = 5;
        descTxt3.textAlign = egret.HorizontalAlign.CENTER;
		descTxt3.setPosition(this.viewBg.width/2 - descTxt3.width/2,topbg.y+topbg.height+8);
		view.addChildToContainer(descTxt3);

        let itemBg:BaseBitmap = BaseBitmap.create("public_9_bg4");
		itemBg.width = 518;
		itemBg.height = 338;
		itemBg.setPosition(this.viewBg.width/2 - itemBg.width/2,descTxt3.y+descTxt3.height+8);
		view.addChildToContainer(itemBg);
        
		
        let rewarsStr = onecfg.getRewards() + "|" + this.cfg.getNormalPointAwards();
		let icons:BaseDisplayObjectContainer[] = GameData.getRewardItemIcons(rewarsStr,true,true);

		for(let i:number = 0; i<icons.length; i++ ){

			let icon = icons[i];
			icon.setScale(0.8);
			icon.setPosition(45+98*(i%5)+GameData.popupviewOffsetX,310+Math.floor(i/5)*98);
			view.addChildToContainer(icon);
		}
	}
	
	protected getTitleStr():string{
		return `acEnjoyNightAwardTitle-${this.uicode}`;
	}

    protected getBgExtraHeight():number
	{
		return 10;
	}

	public dispose():void{

		super.dispose();
	}
}