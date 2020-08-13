/**
 * 任务详情弹板
 * author yanyuling
 * date 2017/10/13
 * @class MainTaskDetailPopupView
 */
class AdultMarryEndFailReturnPopupView  extends PopupView
{
	private _nodeContainer:BaseDisplayObjectContainer;
	private _rewardContainer:BaseDisplayObjectContainer;
	public constructor() 
	{
		super();
	}

	protected initView():void
	{
        let rewards = this.param.data.rewards;

		this._nodeContainer = new BaseDisplayObjectContainer();
		this.addChildToContainer(this._nodeContainer);

		let bg:BaseBitmap = BaseBitmap.create("public_tc_bg01");
		bg.width = 528;
		bg.height = 292+25;
		bg.setPosition((this.viewBg.width-bg.width)/2,10);
		this._nodeContainer.addChild(bg);
		
		let rbg:BaseBitmap = BaseBitmap.create("public_tc_bg03");
		rbg.width = 502;
		rbg.height = 145;
		rbg.setPosition(bg.x+(bg.width-rbg.width)/2,bg.y + 15);
		this._nodeContainer.addChild(rbg);


		let leftF = BaseBitmap.create("public_tcdw_bg01");
		leftF.x = rbg.x + 5 ;
		leftF.y = rbg.y + 3;
		this._nodeContainer.addChild(leftF);

		let rightF = BaseBitmap.create("public_tcdw_bg02");
		rightF.x = rbg.x + rbg.width - rightF.width - 5 ;
		rightF.y = rbg.y + 3;
		this._nodeContainer.addChild(rightF);


		this._rewardContainer = new BaseDisplayObjectContainer();
        this._nodeContainer.addChild(this._rewardContainer);
        

		let tipText = ComponentManager.getTextField(LanguageManager.getlocal("adultMarryEndFailReturnTip"),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN);
		tipText.x = rbg.x + 40;
        tipText.y = rbg.y + 40;
        tipText.width = rbg.width - 80;
		this._nodeContainer.addChild(tipText);

		let rewardArr =  GameData.formatRewardItem(rewards);
		this._rewardContainer.removeChildren();
		for (var index = 0; index < rewardArr.length; index++) {
			let iconItem = GameData.getItemIcon(rewardArr[index],true,true);
			iconItem.x =   index * (iconItem.width+10);
			this._rewardContainer.addChild(iconItem);
        }
        this._rewardContainer.y = rbg.y + rbg.height + 20;
        this._rewardContainer.x = rbg.x + rbg.width/2 - this._rewardContainer.width/2 + 10;
        
		let goBtn:BaseButton = ComponentManager.getButton(ButtonConst.BTN_BIG_YELLOW,"sysConfirm",this.hide,this);
		goBtn.x = bg.x + bg.width/2 - goBtn.width/2;
		goBtn.y = bg.y + bg.height + 15;
		// goBtn.setColor(TextFieldConst.COLOR_BLACK);
		this._nodeContainer.addChild(goBtn);


	}
	



	protected getResourceList():string[]
	{
		return super.getResourceList().concat([
			// "itemeffect"
		]);
	}

	public dispose():void
	{
		this._nodeContainer = null;
		this._rewardContainer = null;

		super.dispose();
	}
}