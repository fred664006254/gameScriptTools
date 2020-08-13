class GiveRewardsPopupView extends PopupView
{   

	public constructor() 
	{
		super();
	}

    protected getTitleStr()
    {
        return "itemUseConstPopupViewTitle";
    }

    protected get uiType():string
	{
		return "2";
	}

    public initView():void
    {
		let descstr = LanguageManager.getlocal("childGiveItmeDesc");
		let desc = ComponentManager.getTextField(descstr,TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BLACK);
		desc.width = 500;
		desc.lineSpacing = 5;
		desc.textAlign = egret.HorizontalAlign.CENTER;
		desc.setPosition(this.viewBg.width/2-desc.width/2,25);
		this.addChildToContainer(desc);

		let rewards = this.param.data.rewards;
		let icon = GameData.getRewardItemIcons(rewards)[0];
		icon.setPosition(this.viewBg.width/2-icon.width/2,desc.y+desc.height+20);
		this.addChildToContainer(icon);

		let view = this;
		let button = ComponentManager.getButton(ButtonConst.BTN2_SMALL_YELLOW,"sysConfirm",()=>{

			let rewardList = GameData.formatRewardItem(rewards);
			App.CommonUtil.playRewardFlyAction(rewardList);
			view.hide();
		},this);
		button.setPosition(this.viewBg.width/2-button.width/2,icon.y+icon.height+30);
		this.addChildToContainer(button);
		
    }

	protected getCloseBtnName():string
	{	
		return null;
	}

	protected getBgExtraHeight():number
	{
		return 25;
	}

    public dispose():void
	{
		
		super.dispose();
	}
}