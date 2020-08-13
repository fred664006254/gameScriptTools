
class AcEnjoyNightAwardCommon extends PopupView
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

	protected getResourceList():string[]{
		return super.getResourceList().concat([
		]);
    }

	public initView():void{		


		let view = this;

		let itemBg:BaseBitmap = BaseBitmap.create("public_9_bg4");
		itemBg.width = 518;
		itemBg.height = 300;
		itemBg.setPosition(this.viewBg.width/2 - itemBg.width/2,10);
		view.addChildToContainer(itemBg);
		
		let listbg = BaseBitmap.create(`public_9_probiginnerbg`);
		listbg.width = itemBg.width-4;
		listbg.height = 65;
		listbg.setPosition(itemBg.x+2,itemBg.y+2);
		view.addChildToContainer(listbg);

		let tipTxt = ComponentManager.getTextField(LanguageManager.getlocal(`acEnjoyNightAward_common-${view.uicode}`), 24, TextFieldConst.COLOR_LIGHT_YELLOW);
		tipTxt.setPosition(this.viewBg.width/2 - tipTxt.width/2,18);
		view.addChildToContainer(tipTxt);

		let descTxt = ComponentManager.getTextField(LanguageManager.getlocal(`acEnjoyNightAwardDesc_common-${view.uicode}`,[String(this.cfg.addValue)]), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
		descTxt.setPosition(this.viewBg.width/2 - descTxt.width/2,tipTxt.y+tipTxt.height+5);
		view.addChildToContainer(descTxt);
		
		let icons:BaseDisplayObjectContainer[] = GameData.getRewardItemIcons(this.cfg.getNormalPointAwards(),true,true);
		for(let i:number = 0; i<icons.length; i++ ){

			let icon = icons[i];
			icon.setScale(0.8);
			icon.setPosition(45+98*(i%5)+GameData.popupviewOffsetX,95+Math.floor(i/5)*98);
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