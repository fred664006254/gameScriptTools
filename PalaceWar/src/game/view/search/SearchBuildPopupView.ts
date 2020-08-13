class SearchBuildPopupView extends PopupView
{
	public constructor()
	{
		super();
	}

	protected getResourceList():string[]
	{
		return super.getResourceList().concat([
			"searchbinfowifebg",
			"progress3","progress3_bg"
		]);
	}

	protected initView():void
	{
		let itemVoList:SearchBuildInfoItemVo[]=Api.searchVoApi.getPersonListByBuildId(this.getBuildId());
		let rect:egret.Rectangle=egret.Rectangle.create();
		rect.setTo(0,0,520,800);
		let scrollList:ScrollList=ComponentManager.getScrollList(SearchBuildScrollItem,itemVoList,rect);
		this.addChildToContainer(scrollList);
		scrollList.setPosition((this.viewBg.width-scrollList.width)/2,15);
	}

	private getBuildId():number
	{
		return this.param.data;
	}

	protected getTitleStr():string
	{
		return "searchBuild"+this.getBuildId();
	}

	public dispose():void
	{
		super.dispose();
	}
}

class SearchBuildScrollItem extends ScrollListItem
{
	public constructor()
	{
		super();
	}

	protected initItem(index:number,data:any):void
	{
		let itemVo:SearchBuildInfoItemVo=data;
		let itemCfg=Config.SearchCfg.getPersonItemCfgByPersonId(itemVo.personId);
		let bg:BaseBitmap=BaseBitmap.create("public_9_bg4");
		bg.width=520;
		bg.height=300;
		this.addChild(bg);
		this.height=bg.height+this.getSpaceY();
		this.width=bg.width;

		let descBg:BaseBitmap=BaseBitmap.create("public_9_probiginnerbg");
		descBg.width=254;
		if(itemVo.isShowProgress)
		{
			descBg.height=248;
		}
		else
		{
			descBg.height=248;
		}
		descBg.setPosition(bg.x+bg.width-descBg.width-8,bg.y+25);
		this.addChild(descBg);
		let txtWidth:number=descBg.width-10;

		let headBg:BaseBitmap=BaseBitmap.create("searchbinfowifebg");
		headBg.setPosition(bg.x+(descBg.x-bg.x-headBg.width)/2,bg.y+(bg.height-headBg.height)/2);
		this.addChild(headBg);

		let personIcon:BaseLoadBitmap=BaseLoadBitmap.create(itemCfg.personFullIcon);
		let size = itemCfg.fullIconSize;
		personIcon.width=size.width;
		personIcon.height=size.height;
		personIcon.setScale(210/personIcon.width);
		personIcon.setPosition(20,bg.y+bg.height-personIcon.height*personIcon.scaleY-10);
		this.addChild(personIcon);

		if(itemVo.type == 1){
			personIcon.setScale(245/personIcon.width);
			personIcon.setPosition(15,bg.y+bg.height-personIcon.height*personIcon.scaleY-10);
		}

		let nameTxt:BaseTextField=ComponentManager.getTextField(itemCfg.name,TextFieldConst.FONTSIZE_TITLE_SMALL,TextFieldConst.COLOR_WARN_YELLOW);
		nameTxt.width=txtWidth;
		nameTxt.setPosition(descBg.x+8,descBg.y+8);
		this.addChild(nameTxt);
		
		let shortNameTxt:BaseTextField=ComponentManager.getTextField(itemCfg.shortDesc,TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_WARN_YELLOW);
		shortNameTxt.width=txtWidth;
		shortNameTxt.setPosition(nameTxt.x,nameTxt.y+nameTxt.height+5);
		this.addChild(shortNameTxt);

		let descTxt:BaseTextField=ComponentManager.getTextField(itemCfg.desc,TextFieldConst.FONTSIZE_CONTENT_SMALL);
		descTxt.width=txtWidth;
		descTxt.setPosition(shortNameTxt.x,shortNameTxt.y+shortNameTxt.height+20);
		this.addChild(descTxt);

		let eventTxt:BaseTextField=ComponentManager.getTextField(itemVo.eventDesc,TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_WARN_GREEN);
		eventTxt.width=txtWidth;
		eventTxt.setPosition(descTxt.x,descBg.y+descBg.height-eventTxt.height-10);
		this.addChild(eventTxt);


		let maskBg:BaseBitmap=BaseBitmap.create("public_searchmask");
		maskBg.width = 255;
		// maskBg.height = 200;
		maskBg.setPosition(10,bg.y+bg.height-maskBg.height-5);
		this.addChild(maskBg);
		// if(itemVo.isShowProgress)
		// {
		// 	let progressBar:ProgressBar=ComponentManager.getProgressBar("progress3","progress3_bg",512);
		// 	progressBar.setPosition(bg.x+(bg.width-progressBar.width)/2,bg.y+bg.height-progressBar.height-5);
		// 	progressBar.setPercentage(itemVo.value/itemVo.maxValue,itemVo.value+"/"+itemVo.maxValue);
		// 	this.addChild(progressBar);
		// }
	}

	public getSpaceX():number
	{
		return 0;
	}

	public getSpaceY():number
	{
		return 10;
	}
}