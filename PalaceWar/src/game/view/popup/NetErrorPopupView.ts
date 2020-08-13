class NetErrorPopupView extends PopupView
{
	public constructor() 
	{
		super();
	}

	protected initView():void
	{
		let bg:BaseBitmap = BaseBitmap.create("public_9_bg4");
		bg.width = 520;
		bg.height = 124;
		bg.x = this.viewBg.x + this.viewBg.width/2 - bg.width/2;
		bg.y = 19;
		this.addChildToContainer(bg);

		let messageTF:BaseTextField = new BaseTextField();
		messageTF.text = this.getMessage();
		messageTF.size = TextFieldConst.FONTSIZE_CONTENT_COMMON;
		messageTF.x = this.getShowWidth()/2 - messageTF.width/2;
		messageTF.y = bg.y+bg.height/2-messageTF.height/2;
		this.height = 200;
		this.addChildToContainer(messageTF);
	}

	protected getMessage():string
	{
		return LanguageManager.getlocal("netErrorDesc");
	}

	protected getParent():egret.DisplayObjectContainer
	{
		return LayerManager.msgLayer;
	}

	protected resetBgSize():void
	{
		super.resetBgSize();
		this.setConfirmBtnPosition(this.viewBg.x + this.viewBg.width/2- 84,170);
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

	protected isShowOpenAni():boolean
	{
		return false;
	}

	protected clickConfirmHandler(data:any):void
	{
		this.hide();
		// ViewController.getInstance().hideAllView();
		NetManager.socket.checkAndReConnect();
		NetManager.chat.checkAndReConnect();
	}
}