class DailybossRankRewardPopupView extends PopupView
{
	public constructor() 
	{
		super();
	}
	protected getResourceList():string[]
	{
		return super.getResourceList().concat([
			"dailybossranktitle"
		]);
	}
	protected initView():void
	{
		let title:BaseBitmap=BaseBitmap.create("dailybossranktitle");
		title.setPosition((this.viewBg.width-title.width)/2,10);
		this.addChildToContainer(title);

		let descTxt:BaseTextField=ComponentManager.getTextField(LanguageManager.getlocal("dailybossType2RankDesc",[Config.DailybossCfg.getBossNameByType(2),this.getBattleData().myrank.toString()]),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_WHITE);
		descTxt.textAlign=egret.HorizontalAlign.CENTER;
		descTxt.lineSpacing=5;
		descTxt.width=450;
		descTxt.setPosition((this.viewBg.width-descTxt.width)/2,title.y+title.height+30);
		this.addChildToContainer(descTxt);

		let rewardVo:RewardItemVo=GameData.formatRewardItem(this.getBattleData().rewards)[0];
		if(rewardVo)
		{
			let rewardTxt:BaseTextField=ComponentManager.getTextField(rewardVo.name+App.StringUtil.formatStringColor("+"+rewardVo.num,TextFieldConst.COLOR_WARN_GREEN),TextFieldConst.FONTSIZE_CONTENT_COMMON);
			rewardTxt.setPosition(descTxt.x+30,descTxt.y+descTxt.height+20);
			this.addChildToContainer(rewardTxt);
	
			let rightScoreTxt:BaseTextField=ComponentManager.getTextField(LanguageManager.getlocal("dailybossRankValue1Desc")+App.StringUtil.formatStringColor("+"+this.getBattleData().score,TextFieldConst.COLOR_WARN_GREEN),TextFieldConst.FONTSIZE_CONTENT_COMMON);
			rightScoreTxt.setPosition(descTxt.x+descTxt.width-rightScoreTxt.width-30,rewardTxt.y);
			this.addChildToContainer(rightScoreTxt);
		}

		this.addTouchTap(this.hide,this);
	}

	protected getTitleStr():string
	{
		return null;
	}

	protected getCloseBtnName():string
	{
		return null;
	}

	protected isTouchMaskClose():boolean
	{
		return true;
	}



	private getBattleData():{score:number,myrank:number,rewardType:number,joinNum:number,rewards:string}
	{
		return this.param.data;
	}

	protected getBgName():string
	{
		return "public_9_wordbg";
	}
}