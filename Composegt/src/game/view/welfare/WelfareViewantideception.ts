class WelfareViewantideception extends WelfareViewTab
{

	//领取按钮
	private _getBtn:BaseButton = null;

	public constructor() {
		super();
	}

	protected init():void
	{
		super.init();
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_USER_GETANTIDECEPTION),this.updateButtonState,this);

		let image1 = BaseBitmap.create("antideception_img1");
		image1.x = 20;
		image1.y=this.bottomBg.y+50;
		this.addChild(image1);

		let image2 = BaseBitmap.create("antideception_img2");
		image2.x = image1.x + image1.width+10;
		image2.y=image1.y;
		this.addChild(image2);

		let image3 = BaseBitmap.create("antideception_img3");
		image3.x = 20;
		image3.y=image1.y+image1.height+10;
		this.addChild(image3);

		let image4 = BaseBitmap.create("antideception_img4");
		image4.x = image3.x + image3.width+10;;
		image4.y=image3.y;
		this.addChild(image4);

		// LanguageManager.getlocal("antideceptionTitle")
		let text = LanguageManager.getlocal("antideceptionTitle");
		let text5 = LanguageManager.getlocal("antideceptionDesc");

		let TextLable:BaseTextField = ComponentManager.getTextField(text,TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BROWN);
		TextLable.x = this.bottomBg.x + this.bottomBg.width/2 - TextLable.width/2;
		TextLable.y = this.bottomBg.y + TextLable.height/2 + 10;
		this.addChild(TextLable);
	
		let descText:BaseTextField = ComponentManager.getTextField(text5,TextFieldConst.FONTSIZE_ACTIVITY_COMMON,TextFieldConst.COLOR_BROWN);
		descText.x = this.bottomBg.x + 15;
		descText.y = this.bottomBg.y+this.bottomBg.height-80;
		descText.lineSpacing = 5;
		this.addChild(descText);


		let goToRechargeBtn:BaseButton = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW,"DragonBoatDayLq",this.clickGetBtnHandler,this);
		goToRechargeBtn.setScale(0.7);
		goToRechargeBtn.x = this.bottomBg.x + this.bottomBg.width - goToRechargeBtn.width + 50;
		goToRechargeBtn.y = this.bottomBg.y+this.bottomBg.height-75;;
		this.addChild(goToRechargeBtn); 
		this._getBtn = goToRechargeBtn;

		let flag = Api.otherInfoVoApi.getAntiDeception();

		if(flag == 1 && this._getBtn)
		{
			this._getBtn.visible = false;
			let hasGetSp = BaseBitmap.create("collectflag");
			hasGetSp.x = 340;
			hasGetSp.y = this._getBtn.y + this._getBtn.height/2 - hasGetSp.height/2 - 10;
			this.addChild(hasGetSp);
		}
	}

	protected getResourceList():string[]
	{
		return super.getResourceList().concat([
			"ntideception_bg","antideception_img1","antideception_img2","antideception_img3","antideception_img4"
			]);
	}

	public updateButtonState(event:egret.Event):void
	{
		let rData = event.data.data.data;
		let rewards = rData.rewards;
        let rewardList =  GameData.formatRewardItem(rewards);
		App.CommonUtil.playRewardFlyAction(rewardList);

		let flag = Api.otherInfoVoApi.getAntiDeception();

		if(flag == 1 && this._getBtn)
		{
			this._getBtn.visible = false;
			let hasGetSp = BaseBitmap.create("collectflag");
			hasGetSp.x = 340;
			hasGetSp.y = this._getBtn.y + this._getBtn.height/2 - hasGetSp.height/2 - 10;
			this.addChild(hasGetSp);
		}

	}

	private clickGetBtnHandler():void
	{	
		NetManager.request(NetRequestConst.REQUEST_USER_GETANTIDECEPTION,null);

	}

	public dispose():void
	{
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_USER_GETANTIDECEPTION),this.updateButtonState,this);
		super.dispose();
	}
}