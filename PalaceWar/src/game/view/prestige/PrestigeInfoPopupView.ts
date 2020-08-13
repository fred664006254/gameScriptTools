class PrestigeInfoPopupView extends PopupView
{

	public constructor() {
		super();
	}

	protected getResourceList():string[]
	{
		return super.getResourceList().concat([
		"atkracecross_explain_bg","prestige_info_bg"
		]);
	}

	protected getTitleStr():string
	{
		return "prestigeInfo";
	}

	protected initView():void
	{
		let typeBg:BaseBitmap = BaseBitmap.create("public_9_bg4");
		typeBg.width = 524;
		typeBg.height = 441;
		typeBg.setPosition(this.viewBg.width/2-typeBg.width/2, 12);
		this.addChildToContainer(typeBg);

		let topPic:BaseBitmap = BaseBitmap.create("prestige_info_bg");
		topPic.setPosition(this.viewBg.width/2-topPic.width/2, typeBg.y+4);
		this.addChildToContainer(topPic);

		//奖励
		let awardRank:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("prestigeInfoReward"), TextFieldConst.FONTSIZE_TITLE_SMALL,TextFieldConst.COLOR_BROWN);
		awardRank.setPosition(topPic.x+5,topPic.y+topPic.height+8);
		this.addChildToContainer(awardRank);

		let rankBg:BaseBitmap = BaseBitmap.create("atkracecross_explain_bg");
		rankBg.width = 518;
		rankBg.setPosition(this.viewBg.width/2-rankBg.width/2, awardRank.y+awardRank.height+8);
		this.addChildToContainer(rankBg);

		let rankDesc:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("prestigeInfoRewardDesc"), TextFieldConst.FONTSIZE_CONTENT_SMALL);
		rankDesc.setPosition(rankBg.x+20, rankBg.y+8);
		rankDesc.width = rankBg.width-40;
		rankDesc.lineSpacing = 6;
		this.addChildToContainer(rankDesc);
		rankBg.height = rankDesc.height+ 20;

		//规则
		let ruleText:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("prestigeInfoRule"), TextFieldConst.FONTSIZE_TITLE_SMALL,TextFieldConst.COLOR_BROWN);
		ruleText.setPosition(awardRank.x, rankBg.y+rankBg.height+12);
		this.addChildToContainer(ruleText);

		let persionBg:BaseBitmap = BaseBitmap.create("atkracecross_explain_bg");
		persionBg.width = 518;
		
		persionBg.setPosition(this.viewBg.width/2-persionBg.width/2, ruleText.y+ruleText.height+8);
		this.addChildToContainer(persionBg);

		let persionDesc:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("prestigeInfoRuleDesc"), TextFieldConst.FONTSIZE_CONTENT_SMALL);
		persionDesc.setPosition(persionBg.x+20, persionBg.y+12);
		persionDesc.width = rankBg.width-40;
		persionDesc.lineSpacing = 6;
		this.addChildToContainer(persionDesc);

		persionBg.height = persionDesc.height+ 20;

		let closeButton = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"sysConfirm",this.hide,this);
       	closeButton.setPosition(this.viewBg.width/2-closeButton.width/2, typeBg.y+typeBg.height+20);
		this.addChildToContainer(closeButton);

	}

	protected getBgExtraHeight():number
	{
		return 20;
	}
	public dispose():void
	{
		super.dispose();
	}
}