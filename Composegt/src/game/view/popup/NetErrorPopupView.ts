class NetErrorPopupView extends PopupView
{
	public constructor() 
	{
		super();
	}

	protected initView():void
	{
		let bg:BaseBitmap = BaseBitmap.create("public_tc_bg01");
		bg.width = 520;
		bg.height = 124;
		bg.x = this.viewBg.x + this.viewBg.width/2 - bg.width/2;
		bg.y = 9;
		this.addChildToContainer(bg);

		let messageTF:BaseTextField = new BaseTextField();
		messageTF.text = this.getMessage();
		messageTF.size = TextFieldConst.FONTSIZE_CONTENT_COMMON;
		messageTF.x = this.getShowWidth()/2 - messageTF.width/2;
		messageTF.y = 30;
		this.height = 200;
		this.addChildToContainer(messageTF);
	}

	private getMessage():string
	{
		return LanguageManager.getlocal("netErrorDesc");
	}

	protected getResourceList():string[]
	{
		return [];
	}

	protected getParent():egret.DisplayObjectContainer
	{
		return LayerManager.msgLayer;
	}

	protected resetBgSize():void
	{
		super.resetBgSize();
		this.setConfirmBtnPosition(this.viewBg.x + this.viewBg.width/2- 86 -27,70);
	}

    protected getConfirmBtnStr():string
	{
		return "sysConfirm";
	}
    protected getConfirmBtnName():string
	{
		return ButtonConst.BTN_NORMAL_YELLOW;
	}
    protected getTitleStr(){
        
        return "itemUseConstPopupViewTitle"
    }
	protected getCloseBtnName():string
	{
		return  null;
	}

	protected clickConfirmHandler(data:any):void
	{
		this.hide();
		NetManager.socket.checkAndReConnect();
		NetManager.chat.checkAndReConnect();
	}
}