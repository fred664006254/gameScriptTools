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
		bg.y = 9;
		this.addChildToContainer(bg);

		let messageTF:BaseTextField =ComponentMgr.getTextField(this.getMessage(),TextFieldConst.SIZE_CONTENT_COMMON,ColorEnums.black);
		messageTF.x = this.getShowWidth()/2 - messageTF.width/2;
		messageTF.y = 30;
		this.height = 200;
		this.addChildToContainer(messageTF);
	}

	protected getMessage():string
	{
		return LangMger.getlocal("netErrorDesc");
	}

	protected getResourceList():string[]
	{
		return [];
	}

	protected getParent():egret.DisplayObjectContainer
	{
		return LayerMgr.msgLayer;
	}

	protected resetBgSize():void
	{
		super.resetBgSize();
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, this._confirmBtn, this.viewBg, [0,17]);
		
	}

    protected getConfirmBtnStr():string
	{
		return LangMger.getlocal("confirmBtn");
	}
    protected getConfirmBtnName():string
	{
		return ButtonConst.BTN_CONFIRM;
	}
    protected getTitleStr(){
        
        return LangMger.getlocal("sysTip");
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
	}
}