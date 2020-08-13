class Realname3InputView extends PopupView
{
    private goButton:BaseButton;
    private nameInput:BaseTextField = null;
    private idInput:BaseTextField = null;
    
	protected initView():void
	{
		var nameInput:BaseTextField = new BaseTextField();
		nameInput.type = egret.TextFieldType.INPUT;
		nameInput.width = 360;
		nameInput.height = 42;
		this.addChild(nameInput);
        this.nameInput = nameInput;

		var idInput:BaseTextField = new BaseTextField();
		idInput.type = egret.TextFieldType.INPUT;
		idInput.width = 360;
		idInput.height = 42;
		this.addChild(idInput);
        this.idInput = idInput;

        this.goButton = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "sysConfirm", this.goButtonClick, this);
        this.addChild(this.goButton);
	}
    private goButtonClick():void
    {
		let nameStr = this.nameInput.text.trim();
		let idStr = this.idInput.text.trim();
        console.log("goButtonClick", nameStr, idStr);
		if ((!App.CommonUtil.isCardNo(idStr)) || (!App.CommonUtil.isTrueName(nameStr))) {
            App.CommonUtil.showTip(LanguageManager.getlocal("realname_noid"));
            return;
        }

		this.request(NetRequestConst.REQUEST_OTHERINFO_IDCARDVERIFY, {idcardname:nameStr, idcardnum:idStr});
		
    }
	protected receiveData(data:{ret:boolean, data:any}):void
	{
		if (data.ret) {
			App.CommonUtil.showTip(LanguageManager.getlocal("realname_ok"));

			let rewards = data.data.data.rewards;
            let rewardList = GameData.formatRewardItem(rewards);
            App.CommonUtil.playRewardFlyAction(rewardList);
			this.hide();
		}
	}
	protected getCloseBtnName():string
	{
		return "btn_lantern";
	}
	protected getTitleBgName():string
	{
		return "";
	}
	protected initBg():void
	{
		this.viewBg = BaseBitmap.create("realname3_bg2");	
		this.viewBg.setPosition(GameConfig.stageWidth / 2 - this.viewBg.width / 2,GameConfig.stageHeigth / 2 - this.viewBg.height / 2);
		this.addChild(this.viewBg);
	}
	protected resetBgSize():void
	{
		this.closeBtn.setPosition(this.viewBg.x + 460, this.viewBg.y);
		this.nameInput.x = this.viewBg.x + 140;
		this.nameInput.y = this.viewBg.y + 260;
		this.idInput.x = this.viewBg.x + 140;
		this.idInput.y = this.viewBg.y + 350;
        this.goButton.x = this.viewBg.x + this.viewBg.width/2 - this.goButton.width/2;
        this.goButton.y = this.viewBg.y + this.viewBg.height -78 - this.goButton.height/2;
	}
	protected getResourceList():string[]
	{
		return super.getResourceList().concat(["realname3_bg2"]);
	}
	protected getTitleStr():string
	{
		return null;
	}
	public dispose(){
		this.goButton = null;
		this.nameInput = null;
		this.idInput = null;
		super.dispose();
	}
}