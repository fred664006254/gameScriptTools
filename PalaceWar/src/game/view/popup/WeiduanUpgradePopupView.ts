class WeiduanUpgradePopupView extends PopupView
{
	public constructor() 
	{
		super();
	}

	protected initView():void
	{
		let mask:BaseShape=new BaseShape();
		mask.graphics.beginFill(0,0.7);
		mask.graphics.drawRect(0,0,GameConfig.stageWidth,GameConfig.stageHeigth);
		this.addChildAt(mask,0);
		mask.touchEnabled=true;
		let nameStr:string="更新";
		this.titleTF.text=nameStr;
		this.titleTF.x=(this.width-this.titleTF.width)/2;
		let msgTxt:BaseTextField=ComponentManager.getTextField("发现新版本，请更新",TextFieldConst.FONTSIZE_BUTTON_COMMON,TextFieldConst.COLOR_BROWN);
		msgTxt.setPosition((this.viewBg.width-msgTxt.width)/2,30);
		this.addChildToContainer(msgTxt);

		let btn:BaseButton=ComponentManager.getButton("btn_upgrade_yellow","",this.clickConfirmHandler,this);
		btn.setText("更新",false);
		btn.setPosition((this.viewBg.width-btn.width)/2,msgTxt.y+msgTxt.height+20);
		this.addChildToContainer(btn);
	}

	protected getCloseBtnName():string
	{
		return null;
	}
	protected clickConfirmHandler(data:any):void
	{
		if(App.DeviceUtil.IsHtml5())
		{
			window.open(this.param.data);
		}
	}

	public hide():void
	{
		//不关
	}

	public dispose():void
	{
		//不释放
	}
}