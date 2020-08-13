/**
 * 道具不足跳转弹板
 * author dky
 * date 2018/3/26
 * @class ItemJumpPopupView
 */
class ItemJumpPopupView extends PopupView
{
	private _cancelCallback:Function;
	private _confirmCallback:Function;
	private _handler:any;
	private _cancelBtn:BaseButton;
	public constructor() 
	{
		super();
	}

	protected initView():void
	{
		if(this.param.data.cancelCallback)
		{
			this._cancelCallback = this.param.data.cancelCallback;
		}
		
		this._confirmCallback = this.param.data.confirmCallback;
		this._handler = this.param.data.handler;
		// let iconPic:string = this.param.data.icon;
		// let iconBg:string = this.param.data.iconBg;
		// let msg:string = this.param.data.msg;
		// let num = this.param.data.num;

		let itemCfg = Config.ItemCfg.getItemCfgById(Number(this.param.data.itemId));
		let iconPic = itemCfg.icon;
		let iconBg:string = itemCfg.iconBg;
		let msg:string = LanguageManager.getlocal("itemJumpDesc",[itemCfg.name]);

		// let bg:BaseBitmap = BaseBitmap.create("public_9_bg4");
		// bg.width = 520;
		// bg.height = 224;
		// bg.x = this.viewBg.x + this.viewBg.width/2 - bg.width/2;
		// bg.y = 9;
		// this.addChildToContainer(bg);
		let bg:BaseBitmap = BaseBitmap.create("public_tc_bg01");
		bg.width = 530;
		bg.height = 284;
		bg.x = this.viewBg.x + this.viewBg.width/2 - bg.width/2;
		bg.y = 9;
		this.addChildToContainer(bg);

		let bg2:BaseBitmap = BaseBitmap.create("public_tc_bg03");
		bg2.width = 510;
		bg2.height = 134;
		bg2.x = this.viewBg.x + this.viewBg.width/2 - bg2.width/2;
		bg2.y = bg.y + 10;
		this.addChildToContainer(bg2);

		let cor1 = BaseBitmap.create("public_tcdw_bg01");
		cor1.x = bg2.x;
		cor1.y = bg2.y;
		this.addChildToContainer(cor1);

		let cor2 = BaseBitmap.create("public_tcdw_bg02");
		cor2.x = bg2.x + bg2.width-cor2.width;
		cor2.y = bg2.y;
		this.addChildToContainer(cor2);

		let temX = this.viewBg.x + this.viewBg.width/2 - 50;
		let temY = 29;
		let temW = 100;
		let temH = 100;

		let itembg:BaseBitmap = BaseBitmap.create(iconBg);
		itembg.x = temX
		itembg.y = temY;
		this.addChildToContainer(itembg);

		// let icon:BaseBitmap = BaseLoadBitmap.create(iconPic);
		// icon.x = temX;
		// icon.y = temY;
		// this.addChildToContainer(icon);
		//点击物品增加文字说明 添加物品iconitem
		let iconItem = GameData.getItemIcon(itemCfg,true);
		iconItem.x =  temX;
		iconItem.y =  temY;
		this.addChildToContainer(iconItem);

		// let numTF:BaseTextField = ComponentManager.getTextField(num.toString(),TextFieldConst.FONTSIZE_CONTENT_SMALL);;
		// numTF.x = temX + 98 - numTF.width;
		// numTF.y = temY + 98 - numTF.height;
		// this.addChildToContainer(numTF);
		

		let msgTF:BaseTextField = ComponentManager.getTextField(msg,TextFieldConst.FONTSIZE_CONTENT_SMALL);
		msgTF.width = 480;
		msgTF.setColor(TextFieldConst.COLOR_BROWN_NEW);
		msgTF.textAlign = TextFieldConst.ALIGH_CENTER;
		msgTF.x = this.viewBg.x + this.viewBg.width/2 - msgTF.width/2;
		msgTF.y = temY + temH + 65;
		this.addChildToContainer(msgTF);


		this._cancelBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_BLUE,"cancelBtn",this.clickCancelHandler,this);
		this._cancelBtn.x = this.viewBg.x + this.viewBg.width/4 - this._cancelBtn.width/2;
		this._cancelBtn.y = bg.y + bg.height + 15;
		// this._cancelBtn.setColor(TextFieldConst.COLOR_BLACK);
		this.addChildToContainer(this._cancelBtn);

		
	}

	protected resetBgSize():void
	{
		super.resetBgSize();
		this.setConfirmBtnPosition(this.viewBg.x + this.viewBg.width/4*3 - this._cancelBtn.width/2 - 35,this._cancelBtn.y);
	}

	protected clickConfirmHandler(data:any):void
	{
		// if(this.param.data.useNum && this.param.data.useNum > this.param.data.num)
		// {
		// 	if(this.param.data.icon == "itemicon1"){
		// 		App.CommonUtil.showTip(LanguageManager.getlocal("gemNotEnough"))
		// 	}
		// 	else{
		// 		App.CommonUtil.showTip(LanguageManager.getlocal("itemNumNotEnough"))
		// 	}
			
		// 	this.hide();
		// 	return;
		// }
		// App.LogUtil.log("clickConfirmHandler");
		// if(this._confirmCallback)
		// {
		// 	this._confirmCallback.apply(this._handler,[]);
		// }
		ViewController.getInstance().openView(ViewConst.COMMON.SHOPVIEW_TAB1);
		
		this.hide();
	}

	protected getConfirmBtnStr():string
	{
		return "sysConfirm";
	}

	// protected getContainerY():number
	// {
	// 	return 0;
	// }

	private clickCancelHandler(param:any):void
	{
		if(this._cancelCallback)
		{
			this._cancelCallback.apply(this._handler,[]);
		}
		this.hide();
	}
	protected getResourceList():string[]
	{
		return super.getResourceList().concat([
		]);
	}

	protected getTitleStr():string
	{
		return "itemUseConstPopupViewTitle";
	}


	protected getConfirmBtnName():string
	{
		return ButtonConst.BTN_NORMAL_YELLOW;
	}

	public dispose():void
	{
		this._cancelCallback = null;
		this._confirmCallback = null;
		this._handler = null;
		this._cancelBtn = null;
		super.dispose();
	}
}