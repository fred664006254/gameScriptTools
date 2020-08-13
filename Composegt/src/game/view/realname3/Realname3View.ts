class Realname3View extends PopupView
{
    private goButton:BaseButton;

	protected initView():void
	{
        this.goButton = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "realnamedes5", this.goButtonClick, this);
        this.addChild(this.goButton);
	}
    private goButtonClick():void
    {
        console.log("goButtonClick");
        ViewController.getInstance().openView(ViewConst.POPUP.REALNAME3INPUTVIEW);
        this.hide();
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
		this.viewBg = BaseBitmap.create("realname3_bg1");	
		this.viewBg.setPosition(GameConfig.stageWidth / 2 - this.viewBg.width / 2,GameConfig.stageHeigth / 2 - this.viewBg.height / 2);
		this.addChild(this.viewBg);
	}
	protected resetBgSize():void
	{
		this.closeBtn.setPosition(this.viewBg.x + 460, this.viewBg.y);
        this.goButton.x = this.viewBg.x + this.viewBg.width/2 + 96 - this.goButton.width/2;
        this.goButton.y = this.viewBg.y + this.viewBg.height/2 + 16 - this.goButton.height/2;
	}
	protected getResourceList():string[]
	{
		return super.getResourceList().concat(["realname3_bg1"]);
	}
	protected getTitleStr():string
	{
		return null;
	}

	public dispose(){
		this.goButton = null;
		super.dispose();
	}
}