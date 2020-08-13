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
		title.setPosition((this.viewBg.width-title.width)/2,10 );//+ 37
		this.addChildToContainer(title);

		let leftLine = BaseBitmap.create("public_v_huawen01");
		leftLine.x = title.x - 40 - leftLine.width;
		leftLine.y = title.y + title.height/2 - leftLine.height/2

		let rightLine = BaseBitmap.create("public_v_huawen01");
		rightLine.scaleX = -1;
		rightLine.x = title.x + title.width + 40 + rightLine.width;
		rightLine.y = title.y + title.height/2 - rightLine.height/2

		this.addChildToContainer(leftLine);
		this.addChildToContainer(rightLine);

		let descTxt:BaseTextField=ComponentManager.getTextField(LanguageManager.getlocal("dailybossType2RankDesc",[Config.DailybossCfg.getBossNameByType(2),this.getBattleData().myrank.toString()]),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_WHITE);
		descTxt.textAlign=egret.HorizontalAlign.CENTER;
		descTxt.lineSpacing=5;
		descTxt.width=450;
		descTxt.setPosition((this.viewBg.width-descTxt.width)/2,title.y+title.height+30);
		this.addChildToContainer(descTxt);

		let rewardVo:RewardItemVo=GameData.formatRewardItem(this.getBattleData().rewards)[0];
		if(rewardVo){
			let rewardTxt:BaseTextField=ComponentManager.getTextField(rewardVo.name+App.StringUtil.formatStringColor("+"+rewardVo.num,TextFieldConst.COLOR_WARN_GREEN2),TextFieldConst.FONTSIZE_CONTENT_COMMON);
			rewardTxt.setPosition(descTxt.x+30,descTxt.y+descTxt.height+20);
			this.addChildToContainer(rewardTxt);
		}


		let rightScoreTxt:BaseTextField=ComponentManager.getTextField(LanguageManager.getlocal("dailybossRankValue1Desc")+App.StringUtil.formatStringColor("+"+this.getBattleData().score,TextFieldConst.COLOR_WARN_GREEN2),TextFieldConst.FONTSIZE_CONTENT_COMMON);
		rightScoreTxt.setPosition(descTxt.x+descTxt.width-rightScoreTxt.width-30,descTxt.y+descTxt.height+20);
		this.addChildToContainer(rightScoreTxt);

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

	protected initBg():void
	{
		let bgName:string="dailybosslastattacktitle_di";
		if(bgName)
		{
			
			this.viewBg = BaseBitmap.create(bgName);
			
			if(this.isTouchMaskClose())
			{
				this.viewBg.touchEnabled=true;
			}
			this.addChild(this.viewBg);
		}
	}
}