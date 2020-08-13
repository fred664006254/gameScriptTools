class AutoResPopupView extends PopupView
{
	public constructor()
	{
		super();
	}

	protected getResourceList():string[]
	{
		return super.getResourceList().concat([]);
	}
	private typeCfg={
		"1":"onhookDesc",//挂机
		"2":"offlieDesc"//离线
	}

	private getTypeLocalKey():string
	{
		return this.typeCfg[this.param.data.type];
	}

	protected getTitleParams():string[]
	{
		return [LanguageManager.getlocal(this.getTypeLocalKey())];
	}

	protected initView():void
	{
		let containerBg:BaseBitmap = BaseBitmap.create("public_9_bg4");
		containerBg.width=520;
		containerBg.height=224;
		containerBg.setPosition((this.viewBg.width-containerBg.width)/2,containerBg.y+15);
		this.addChildToContainer(containerBg);
		let descText:BaseTextField=ComponentManager.getTextField(LanguageManager.getlocal("autoResPopupViewDesc",this.getTitleParams()),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BLACK);
		descText.setPosition(containerBg.x+(containerBg.width-descText.width)/2,containerBg.y+20);
		this.addChildToContainer(descText);
		let confirmBtn:BaseButton=ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW,"sysConfirm",this.hide,this);
		confirmBtn.setPosition(containerBg.x+(containerBg.width-confirmBtn.width)/2,containerBg.y+containerBg.height+20);
		this.addChildToContainer(confirmBtn);
		let index:number=0;
		if(Api.manageVoApi.getAutoGold()!=0)
		{
			this.getResIcon("gold",index);
			index++;
		}
		if(Api.manageVoApi.getAutoFood()!=0)
		{
			this.getResIcon("food",index);
			index++;
		}
		if(Api.manageVoApi.getAutoSoldier()!=0)
		{
			this.getResIcon("soldier",index);
			index++;
		}
	}

	private getResIcon(type:string,index:number):void
	{
		let resBg:BaseBitmap=BaseBitmap.create("public_resnumbg");
		resBg.setPosition(200,80+50*index);
		this.addChildToContainer(resBg);
		let resName:string;
		let resNum:number;
		if(type=="gold")
		{
			resName="public_icon2";
			resNum=Api.manageVoApi.getAutoGold();
		}
		else if(type=="food")
		{
			resName="public_icon3";
			resNum=Api.manageVoApi.getAutoFood();
		}
		else if(type=="soldier")
		{
			resName="public_icon4";
			resNum=Api.manageVoApi.getAutoSoldier();
		}
		let resIcon:BaseBitmap=BaseBitmap.create(resName);
		resIcon.setPosition(resBg.x,resBg.y+(resBg.height-resIcon.height)/2-3);
		this.addChildToContainer(resIcon);
		let resNumText:BaseTextField=ComponentManager.getTextField(resNum.toString(),TextFieldConst.FONTSIZE_CONTENT_SMALL);
		resNumText.setPosition(resIcon.x+resIcon.width,resBg.y+(resBg.height-resNumText.height)/2);
		this.addChildToContainer(resNumText);
	}
	
}