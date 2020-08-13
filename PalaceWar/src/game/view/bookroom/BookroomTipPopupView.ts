/**
 * 确认取消弹板
 * author dmj
 * date 2017/10/10
 * @class ItemUseConstPopupView
 */
class BookroomTipPopupView extends PopupView
{
	private _cancelCallback:Function;
	private _confirmCallback:Function;
	private _handler:any;
	private _cancelBtn:BaseButton;
	public constructor() 
	{
		super();
	}

	protected getBgExtraHeight():number
	{
		return 30;
	}

	protected initView():void
	{
		let data = this.param.data; 
		if(data.cancelCallback)
		{
			this._cancelCallback = data.cancelCallback;
		}
		
		this._confirmCallback = data.confirmCallback;
		this._handler = data.handler; 
		let msg:string = ""; 
		if(data.type==1)
		{
			if(data.month==2)
			{
				msg = LanguageManager.getlocal("bookroomnobuydes1");
			}
			if(data.year==2)
			{
				msg = LanguageManager.getlocal("bookroomnobuydes2");
			}
			
		}
		  
		let bg:BaseBitmap = BaseBitmap.create("public_9_bg4");
		bg.width = 520;
		bg.height = data.height || 224;
		bg.x = this.viewBg.x + this.viewBg.width/2 - bg.width/2;
		bg.y = 9;
		this.addChildToContainer(bg);

		 
		let temY = 29;
		let temW = 100;
		let temH = 100;
 
		let msgTF:BaseTextField = ComponentManager.getTextField(msg,TextFieldConst.FONTSIZE_CONTENT_SMALL);
		msgTF.width = 480;
		// msgTF.height = bg.height;
		msgTF.setColor(TextFieldConst.COLOR_LIGHT_YELLOW); 
		// msgTF.textAlign =TextFieldConst.ALIGH_CENTER;
		msgTF.textAlign = TextFieldConst.ALIGH_MIDDLE;//TextFieldConst.ALIGH_MIDDLE;
		msgTF.x = this.viewBg.x + this.viewBg.width/2 - msgTF.width/2;
		msgTF.y = bg.y+ bg.height/2-msgTF.height/2; //temY + temH + 25;
		msgTF.lineSpacing = 3;
		this.addChildToContainer(msgTF);
		// this.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter,msgTF,bg);
 

		this._cancelBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_RED,"cancelBtn",this.clickCancelHandler,this);
		this._cancelBtn.x = this.viewBg.x + this.viewBg.width/2 - this._cancelBtn.width-50;
		this._cancelBtn.y = bg.y + bg.height + 25;
		this._cancelBtn.setColor(TextFieldConst.COLOR_BLACK);
		this.addChildToContainer(this._cancelBtn);

		
	}

	protected resetBgSize():void
	{
		super.resetBgSize();
		this.setConfirmBtnPosition(this.viewBg.x + this.viewBg.width/2 +50,this._cancelBtn.y);
	}

	protected clickConfirmHandler(data:any):void
	{ 
		if(this._confirmCallback)
		{
			this._confirmCallback.apply(this._handler,[]);
		} 
		this.hide();
	}

	protected getConfirmBtnStr():string
	{
		return "sysConfirm";
	}
	protected getTitleStr():string
	{
		return "itemUseConstPopupViewTitle";
	} 
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