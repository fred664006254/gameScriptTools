class AcAC2020AwardTaixue extends PopupView
{	

	private _bgname:string = null;

	public constructor(){
		super();
	}
	
	private get cfg() : Config.AcCfg.AnnualCelebration2020Cfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
	}
	
    private get vo() : AcAnnualCelebration2020Vo{
        return <AcAnnualCelebration2020Vo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
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
			"enjoynight_name_"+this.type,this.getBgName2(),
		]);
    }

	private getBgName2():string
	{
		if (this._bgname)
		{
			return this._bgname;
		}

		this._bgname = "enjoynight_awardbg";

		let random = 0;
		if (this.type == "huanggong")
		{
			this._bgname = "acac2020_rewardbg_huanggong";
			random = 1;
		}
		else if (this.type == "banghui")
		{
			this._bgname = "acac2020_rewardbg_banghui";
			random = 3;
		}
		else if (this.type == "paihangbang")
		{
			this._bgname = "acac2020_rewardbg_paihangbang";
			random = 2;
		}
		if (random)
		{
			this._bgname = this._bgname + App.MathUtil.getRandom(1,random+1);
		}

		return this._bgname;
	}

	public initView():void{		


		let view = this;

        let topbg = BaseBitmap.create(this.getBgName2());
		topbg.setPosition(this.viewBg.width/2 - topbg.width/2,0);
		view.addChildToContainer(topbg);

        //人物、
        let rect = new egret.Rectangle(0,0,300,345);
		rect.setTo(0,0,300,394);
		let npcPic:string ;
		if (this.type == "taixue")
		{
			npcPic = "wife_full_310";
		}
		else if (this.type == "huanggong")
		{
			npcPic = "wife_full_101";
		}
		else if (this.type == "leitai")
		{
			npcPic = "wife_full_220";
		}
		else if (this.type == "xunfang")
		{
			npcPic = "wife_full_204";
		}
		else if (this.type == "yanwuchang")
		{
			npcPic = "wife_full_206";
		}
		else if (this.type == "banghui")
		{
			npcPic = "wife_full_218";
		}
		else if (this.type == "jiulou")
		{
			npcPic = "wife_full_101_male";
		}
		else if (this.type == "paihangbang")
		{
			npcPic = "wife_full_211";
		}


        let servant = BaseLoadBitmap.create(npcPic,rect);
        servant.setScale(0.75);
		servant.setPosition(10+GameData.popupviewOffsetX,10);
		view.addChildToContainer(servant);
        servant.mask = new egret.Rectangle(0,0,300,308);
        
        let nameIcon = BaseBitmap.create("enjoynight_name_"+this.type);
		nameIcon.setPosition(256+GameData.popupviewOffsetX,10);
		view.addChildToContainer(nameIcon);

		
	
        let onecfg:Config.AcCfg.AC2020MapItemCfg = this.cfg.map[this.id];
		let descTxt = ComponentManager.getTextField(LanguageManager.getlocal(`acAC2020AwardDesc_${view.type}-${view.uicode}`), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        descTxt.width = 290;
        descTxt.lineSpacing = 6;
		descTxt.setPosition(nameIcon.x,nameIcon.y+nameIcon.height+5);
		view.addChildToContainer(descTxt);
        
        let descTxt3 = ComponentManager.getTextField(LanguageManager.getlocal(`acEnjoyNightMaybeAnswer`), 24, TextFieldConst.COLOR_BROWN);
        descTxt3.width = 518;
        descTxt3.lineSpacing = 5;
        descTxt3.textAlign = egret.HorizontalAlign.CENTER;
		descTxt3.setPosition(this.viewBg.width/2 - descTxt3.width/2,topbg.y+topbg.height+8);
		view.addChildToContainer(descTxt3);

        let itemBg:BaseBitmap = BaseBitmap.create("public_9_bg4");
		itemBg.width = 518;
		itemBg.height = 127;
		itemBg.setPosition(this.viewBg.width/2 - itemBg.width/2,descTxt3.y+descTxt3.height+8);
		view.addChildToContainer(itemBg);
        
		
        let rewarsStr = onecfg.getRewards() //+ "|" + this.cfg.getNormalPointAwards();
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

		this._bgname = null;
		super.dispose();
	}
}