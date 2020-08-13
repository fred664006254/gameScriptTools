class PlayerReturnPopupView extends PopupView
{
	public constructor(){
		super();
	}

    private get cfg(){
        return Config.PlayerreturnCfg;
    }

    private get api(){
        return Api.playerReturnVoApi;
	}
	
	protected initView():void{
		let view = this;

		
		let toptxt =  BaseBitmap.create("playerrebackbg_txt");
		toptxt.setPosition(GameConfig.stageWidth / 2 - toptxt.width / 2,  this.viewBg.y - toptxt.height+20);
		this.addChild(toptxt);

		let descTxt = ComponentManager.getTextField(LanguageManager.getlocal('PlayerReturn_Desc'), 20, TextFieldConst.COLOR_BROWN);
		descTxt.width = 300;
		descTxt.lineSpacing = 5;
		descTxt.textAlign = egret.HorizontalAlign.LEFT;
		view.setLayoutPosition(LayoutConst.righttop, descTxt, view.viewBg, [50,50]);
		view.addChild(descTxt);
		//创建奖励列表
		let rewardArr : Array<RewardItemVo> =  GameData.formatRewardItem(`${view.api.getRebackRewards()}`);
		let scroStartY = view.viewBg.y + 130;// (Api.playerVoApi.getPlayerVipLevel() < view.cfg.needVip ? 197.5 : 157.5);
		let tmpX = 250;
		let rewScNode = new BaseDisplayObjectContainer();
		scroStartY = 0;
		tmpX = 0;
		for (let index = 0; index < rewardArr.length; index++) {
			let iconItem = GameData.getItemIcon(rewardArr[index],true,false);
			iconItem.setScale(0.7);
			iconItem.x = tmpX;
			iconItem.y = scroStartY;
			tmpX += (108 * iconItem.scaleX + 10);
			// if (tmpX > (260 + 5 * 108 * iconItem.scaleX + 4 * 10)){
			if (index%4 == 0 && index > 0 ){
				tmpX = 0;
				scroStartY += iconItem.height * iconItem.scaleY + 10;
				iconItem.x = tmpX;
				iconItem.y = scroStartY;
				tmpX += (108 * iconItem.scaleX + 10);
			}
			// view.addChild(iconItem);
			rewScNode.addChild(iconItem);
		}
		let srect = new egret.Rectangle(0,0,400,180);
		let rewardScr = ComponentManager.getScrollView(rewScNode,srect);
		rewardScr.x = 250;
		rewardScr.y = view.viewBg.y + 120;
		rewardScr.horizontalScrollPolicy = "off";
		view.addChild(rewardScr);

		let mailTxt = ComponentManager.getTextField(LanguageManager.getlocal('PlayerReturnTip6'), 20, 0xbb2800);
		view.setLayoutPosition(LayoutConst.leftbottom, mailTxt, view.viewBg, [300,115]);
		view.addChild(mailTxt);

		let tipTxt = ComponentManager.getTextField(LanguageManager.getlocal('PlayerReturn_Tip'), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
		tipTxt.width = 500;
		tipTxt.lineSpacing = 5;
		view.setLayoutPosition(LayoutConst.horizontalCentertop, tipTxt, view.viewBg, [0,373.5]);
		view.addChild(tipTxt);

		let goBtn = ComponentManager.getButton(ButtonConst.BTN_BIG_YELLOW, 'PlayerReturn_Btn', view.goForReback, view);
		view.setLayoutPosition(LayoutConst.horizontalCentertop, goBtn, view.viewBg, [0,view.viewBg.height]);
		view.addChild(goBtn);
	}

	private goForReback():void{
		let view = this;
		ViewController.getInstance().openView(ViewConst.COMMON.PLAYERRETURNVIEW);
		view.hide();
	}

	protected isTouchMaskClose():boolean{
		return true;
	}

	protected getTitleStr():string{
		return '';
	}

	/**
	 * 重新一下关闭按钮 
	 * 仅适用于新的分享
	 */
	protected getCloseBtnName():string
	{
		return "";
	}
	/**
	 * 重新一下title按钮 
	 * 仅适用于新的分享
	 */
	protected getTitleBgName():string
	{
		return "";
	}
	/**
	 * 重写 初始化viewbg
	 * 仅适用于新的分享
	 */
	protected initBg():void
	{
		this.viewBg = BaseBitmap.create("playerrebackbg");
		this.viewBg.height = 451;
		this.viewBg.width = 604;
		this.viewBg.setPosition(GameConfig.stageWidth / 2 - this.viewBg.width / 2,GameConfig.stageHeigth / 2 - this.viewBg.height / 2);
		this.addChild(this.viewBg);
	}

	protected getResourceList():string[]
	{
		return super.getResourceList().concat([
			"playerrebackbg","playerrebackbg_txt",
		]);
	}

	public dispose():void
	{
		super.dispose();
	}
}
 